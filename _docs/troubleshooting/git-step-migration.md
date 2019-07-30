---
title: "Projects require git clone steps"
description: "Migrating from implicit to explicit git clone steps"
group: troubleshooting
toc: true
---


On May 2019, Codefresh introduced **Projects** as a way to group pipelines, instead of using *Repositories*. If you create a Codefresh account after this date, then you only get access to Projects and all the pipelines you create are under projects.

If, however, you have an existing Codefresh account, you will still get access to both dashboards (Projects and repositories) and you can work create/edit pipelines using both methods.


## Git steps are now required

If you visit any existing pipeline you will see a warning message about git-clone steps.

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/migration/clone-warning.png" 
url="/images/troubleshooting/migration/clone-warning.png" 
alt="Git clone warning on existing pipeline" 
caption="Git clone warning on existing pipeline" 
max-width="80%" 
%}

First of all, we need to make clear that **your pipeline will still work as before, without any changes**. The migration to projects is a gradual one and Codefresh does not force you to do anything in order to make things work.

The warning message explains how new pipelines need a git-clone step. Codefresh pipelines based on repositories automatically cloned the source code for you.

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/migration/automatic-git-clone.png" 
url="/images/troubleshooting/migration/automatic-git-clone.png" 
alt="Automatic git clone step in repository based pipelines" 
caption="Automatic git clone step in repository based pipelines" 
max-width="60%" 
%}

This means that the repository-based pipelines used to check out the code automatically, and all subsequent pipeline steps could start work with it right away.

 `codefresh.yml` (old syntax)
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
   # Code is already checked out. All files are visible
   PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}

For new pipelines this is no longer true. You need to add an [explicit clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/). The step should be named `main_clone`.

Here is the same pipeline in a project. The only thing you need to do is to add the `main_clone` segment before other steps:

 `codefresh.yml` (new syntax)
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    main_clone:
        title: 'Cloning main repository...'
        type: git-clone
        repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
        revision: '${{CF_REVISION}}'
        git: my-git-provider
    PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}            

The values for `CF_REPO_OWNER`, `CF_REPO_NAME`, `CF_REVISION` will automatically be filled by Codefresh according to the trigger the pipeline has. Make sure to replace the `my-git-provider` value with your own git provider as defined in [git integrations]({{site.baseurl}}/docs/integrations/git-providers/).

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/migration/pipeline-triggers.png" 
url="/images/troubleshooting/migration/pipeline-triggers.png" 
alt="Triggers connected to pipeline" 
caption="Triggers connected to pipeline" 
max-width="60%" 
%}

When you run your pipeline, you can select the trigger that will be used to fill in the values of all the Codefresh variables.


{% include image.html 
lightbox="true" 
file="/images/troubleshooting/migration/trigger-simulate.png" 
url="/images/troubleshooting/migration/trigger-simulate.png" 
alt="Use trigger to fill in CF values" 
caption="Use trigger to fill in CF values" 
max-width="60%" 
%}



## Why projects are better

Git clone steps are now required because pipelines are no longer bound to specific git repositories. Creating pipelines in the old way was restricting in the sense that all pipelines had to be connected to a specific git repository.

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/migration/monolithic-pipelines.png" 
url="/images/troubleshooting/migration/monolithic-pipelines.png" 
alt="Pipeline limited to a single GIT repository" 
caption="Pipeline limited to a single GIT repository" 
max-width="50%" 
%}

This made pipeline re-use very difficult. With the new project grouping the pipeline is not linked to specific repository. Instead it gets all information from triggers.

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/migration/add-new-microservice.png" 
url="/images/troubleshooting/migration/add-new-microservice.png" 
alt="Reusing pipelines for microservices" 
caption="Reusing pipelines for microservices" 
max-width="50%" 
%}

This means that you can easily re-use a single pipeline among different microservices by just adding more triggers.

If for some reason you still want a pipeline that always works against a specific git repository regardless of the trigger, then you can hard-code the details in the git clone step like below:


`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    main_clone:
        title: 'Cloning main repository...'
        type: git-clone
        repo: 'my-github-username/foo'
        revision: 'master'
        git: my-github-integration
    PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}

The pipeline above will always checkout project `foo` regardless of the trigger that was used in order to launch it.
