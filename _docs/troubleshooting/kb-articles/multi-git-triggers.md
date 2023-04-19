---
title: "Using multi-git triggers"
description: "Pinning codefresh.yml to a specific branch"
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: true
categories: []
support-reviewed: 2023-04-18 LG
---

Codefresh has the capability to store the [pipeline definition]({{site.baseurl}}/docs/pipelines/pipelines/#loading-codefreshyml-from-version-control) in the same Git repository as the source code.


{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/from-repo.png" 
url="/images/troubleshooting/from-repo.png"
alt="Storing the pipeline in the repository" 
caption="Storing the pipeline in the repository"
max-width="50%"
%}



By default, when a git trigger is happening, Codefresh will fetch the `codefresh.yml` file from the branch that is mentioned in the webhook. This is the behavior you expect most of the times as it allows you to version your pipelines and have different versions for different branches.

## Overriding the branch of codefresh.yml

Sometimes however, you want a pipeline to be triggered by another git repository (other than the main one). An example would be:

1. Repository A contains a deployment pipeline with associated `codefresh.yml`.
1. Repository B is creating binary artifacts that are deployed by pipeline A.

In those cases, Codefresh supports adding [multiple git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) on the same pipeline. This way pipeline A will be triggered by commits to both repository A and repository B. Notice however that the `codefresh.yml` file used will still be fetched as mentioned in the webhook.

This creates issues with pipeline definitions because repository B might not have a `codefresh.yml` at all, or it might have the wrong one in the branch that actually created the webhook. Another bad scenario is when the branch mentioned in the webhook from repository B does not even exist in repository A.

To solve this issue, you can pin down the branch that will be used for the source of `codefresh.yml`. In the example above, you can specify that no matter the branch of repository B that triggered the commit, the pipeline should only use the `master` branch of pipeline A regardless of what is mentioned in the webhook.

To perform this pinning you need to use the [Codefresh CLI](https://codefresh-io.github.io/cli/installation/){:target="\_blank"} and [set up authentication](https://codefresh-io.github.io/cli/getting-started/){:target="\_blank"} with your Codefresh account.

Once this is done check that your account is locally accessible by running

```
codefresh get pipelines
```

You should see a long list with your pipelines on the terminal output.

Export you pipeline that needs to have the `codefresh.yml` pinned (pipeline A in the example above)

```
codefresh get pipelines kostis-codefresh/trivial-go-web/from-repo --output=yaml > custom-spec.yaml
```

Open the `custom-spec.yaml` file with a text editor and locate the `specTemplate` block. Then add there a new `revision` property with the branch that contains the `codefresh.yml` that you want to always be used (repository A in our example above).


{% highlight yaml %}
{% raw %}
spec:
  triggers: []
  contexts: []
  variables:
    - key: PORT
      value: '8080'
  specTemplate:
    location: git
    repo: kostis-codefresh/trivial-go-web
    path: codefresh.yml
    revision: master
  steps: {}
  stages: []
{% endraw %}
{% endhighlight %}

In the example above we specified the `master` branch. Now even if the webhook from pipeline B mentions another branch (e.g. develop), Codefresh will still use the master branch from pipeline A.

To apply your changes, replace the pipeline in Codefresh from your local copy

```
codefresh replace pipelines kostis-codefresh/trivial-go-web/from-repo -f custom-spec.yaml
```

You should get a message that your pipeline is updated. This concludes the setup of the pipeline specification. Now you also need to override the clone step of the pipeline itself as explained in the next section.

## Overriding the implicit clone step *Deprecated*

*Deprecated*: The information below is only relevant if you are using our old Personal Git Provider system, and not our current one. Therefore, you should only use this for reference when working on old pipelines.

All pipelines in Codefresh that are connected to a git repository have an automatic git clone step defined for them. 
This clone step will also fetch the code from the branch mentioned in the webhook.

To override this default behavior as well and force a specific branch, you can use a [custom clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) like this:


{% highlight yaml %}
{% raw %}
main_clone:
    type: git-clone
    title: Checking out git repository
    repo: ${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}
    git: github
    revision: ${{CF_REVISION}}
{% endraw %}
{% endhighlight %}

In the example above we have forced the git checkout to happen out of the master branch, regardless of the branch mentioned in the webhook.

## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)  
[Git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  




