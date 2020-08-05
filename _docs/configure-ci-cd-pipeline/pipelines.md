---
title: "Creating pipelines"
description: "How to define pipelines in Codefresh"
group: configure-ci-cd-pipeline
redirect_from:
  - /docs/pipeline
  - /docs/pipeline/
  - /docs/pipelines
  - /docs/pipelines/
  - /docs/pipelines/introduction/
  - /docs/pipelines/introduction
  - /docs/inline-yaml-editing
  - /docs/inline-yaml-editing/
toc: true
---

Before reading this page make sure that you are familiar with the [theory behind Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/).

## Pipeline Concepts

The aim of Codefresh pipelines is to have re-usable sequences of steps that can be used for different applications (or micro-services) via the use of git triggers.

All the main concepts are shown below:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/concepts.png" 
url="/images/pipeline/create/concepts.png"
alt="Pipeline concepts" 
caption="Pipeline concepts"
max-width="60%"
%}

* **Projects**: the top-level concept in Codefresh. You can create projects to group pipelines that are related. In most cases a single project will be a single application (that itself contains many micro-services). You are free to use projects as you see fit. For example, you could create a project for a specific Kubernetes cluster or a specific team/department.

* **Pipelines**: each project can have multiple pipelines.  Pipelines that belong to a single project are easily managed all together. It is also very easy to create a new pipeline in a project by copying an existing pipeline. Notice that unlike other CI solutions a pipeline in Codefresh is **NOT** tied to a specific git repository. You should try to make your pipelines generic enough so that they can be reused for similar applications even when they exist in different git repositories (a fairly typical setup for microservices).

* **Pipeline Steps**: each pipeline has a definition that defines the [pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) that are executed each time this pipeline is triggered. The definition of a pipeline is described in a special [codefresh.yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file. The `codefresh.yml` file can be fetched from the same repository of the source code, from a completely different repository or even defined in-place in the Codefresh pipeline editor. Again, notice that it is possible to have a pipeline that checks out its source code from git repository A, but actually defines its steps in a `codefresh.yml` file that is fetched from git repository B.

* **Triggers**: each pipeline can have zero, one, or more [triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/). Codefresh supports several kinds of triggers such as Git, Cron or Docker push triggers. Triggers that happen with Git webhooks can come from the same git repository that contains the git code **OR** any other completely different repository. Triggers are the linking medium between a pipeline and a git repository. You can have a pipeline with many triggers so it will be executed when a code change happens to any of them.

With these basic building blocks, you can define many complex workflows. In particular, it is very easy in Codefresh to create a scenario where:

1. A pipeline is launched because a trigger exists for Git repository A
1. The pipeline reads its `codefresh.yml` file from Git repository B
1. The pipeline clones source code from Git repository C (and starts packaging/compiling it)

Of course, it also possible to have a simpler scenario where the trigger, the pipeline steps and the source code of the application are all defined for the same GIT repository.


## Creating new pipelines

You can create new projects by clicking on *Projects* in the left sidebar and then selecting the *New Project* button on the top right corner. A dialog will appear that will ask you for the project name and optional tags that you can use for [access control]({{site.baseurl}}/docs/enterprise/access-control/).

Once you are inside the project view you can start editing pipelines with a UI environment that works similar to a traditional IDE.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipeline-manager.png" 
url="/images/pipeline/create/pipeline-manager.png"
alt="Pipeline manager" 
caption="Pipeline manager"
max-width="70%"
%}

1. On the top left you can see your current project. You can also change it by clicking on the drop-down on the top left corner.

1. On the left side of the screen you can see all pipelines that currently belong to this project. Click on each one to edit it.
On the bottom part of this panel the *New pipeline* button allows you to create a new pipeline on the same project either from scratch
or by copying an existing one from the same project or a completely different project.

1. The name of the currently edited pipeline is shown at the top of the window.

1. The main window shows the definition of the current pipeline. The screenshot shows the inline editor but pipelines can also be defined from external files (checked into source control) as explained later.

1. The right part of the window shows extra settings for this pipeline such as [premade steps]({{site.baseurl}}/docs/codefresh-yaml/steps/), [triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/) and launch variables/parameters.




### Using the inline pipeline editor

When first creating a pipeline you will see an inline editor that allows you to define the [pipeline yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) right there in the Codefresh UI. This is great when you are starting a new project because it offers you really quick feedback. You can edit the yml steps, run a build, edit again, run a build and so on. 


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/inline-editor.png" 
url="/images/pipeline/create/inline-editor.png"
alt="Inline Pipeline editor" 
caption="Inline Pipeline editor"
max-width="60%"
%}

On the top right of the panel you have additional controls:

* The *import* button allows you to bring a `codefresh.yml` from your local workstation into the editor
* The *comment* button allows you to quickly comment/uncomment the currently selected text. The hotkey `Ctrl-/` also performs the same action
* The *formatting* button enriches the editor with special symbols for line breaks, spaces and tabs. This allows you to easily fix common formatting errors
* The *copy* button quickly copies the **whole** pipeline text in your clipboard


Notice that in the editor you can expand/collapse individual yaml blocks using the arrow triangles on the left of each blocks. The initial pipeline presented in the editor is suggested by Codefresh according to the contents of your Git repository.

> You can also see the suggested Codefresh pipeline for any public git repository by using the [analyze option](https://codefresh-io.github.io/cli/analyzer/) of the Codefresh CLI.


## Loading codefresh.yml from version control

Working with the inline editor is very convenient in the beginning, but it makes your pipeline definition only exist within the Codefresh UI and therefore goes against the basic principles of [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_Code). Once you are happy with how your pipeline works you should commit it to a Git repository (which can be the same one that has the source code of the application or a completely different one).

You can click on the *Inline YAML* header and switch it to *Use YAML from URL*.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipeline-from-internal-repo.png" 
url="/images/pipeline/create/pipeline-from-internal-repo.png"
alt="Pipeline from internal repo" 
caption="Pipeline from internal repo"
max-width="60%"
%}

You can then copy and paste a URL to a raw Codefresh YAML file.  This will allow you to load a Codefresh YAML from any public URL. Notice that a raw URL is needed in the case of GitHub. 

As an example, instead of using `https://github.com/codefresh-contrib/example-voting-app/blob/master/codefresh.yml` you should enter `https://raw.githubusercontent.com/codefresh-contrib/example-voting-app/master/codefresh.yml`

## Pipeline settings

Once you create your pipeline you can also click on the top tab called *Settings* for some extra parameters.

### General 

- **Pipeline Name**: the name of your pipeline (useful for working with the [Codefresh CLI](https://codefresh-io.github.io/cli/))
- **Pipeline ID**: the ID of your pipeline (useful for working with the [Codefresh CLI](https://codefresh-io.github.io/cli/))
> Note that the Pipeline Name and ID are interchangeable when working with the Codefresh CLI
- **Pipeline Description**: a freetext pipeline description
- **Pipeline Tags**: One or more tags used for [access control]({{site.baseurl}}/docs/enterprise/access-control/)
- **Public Build Logs**: If enabled, the builds of this pipeline will be [viewable by users without a Codefresh account]({{site.baseurl}}/docs/configure-ci-cd-pipeline/build-status/#public-build-logs
)
- **Badges**: simple images that show you the last [build status]({{site.baseurl}}/docs/configure-ci-cd-pipeline/build-status/)

### Policies

- **Pipeline Concurrency**: the maximum amount of concurrent builds (1-15 or unlimited) -- set this when your pipeline has only one trigger
- **Trigger Concurrency**: the maximum amount of concurrent builds per trigger (1-15 or unlimited) -- set this when your pipeline has multiple triggers
- **Branch Concurrency**: the maximum amount of concurrent builds per branch (1-15 or unlimited) -- set this when your pipeline can build different branches
- **Build Termination**: various toggles for when a build from the pipeline should terminate
  - Once a build is created terminate previous builds from the same branch
  - Once a build is created terminate previous builds only from a specific branch (name matches a regular expression)
  - Once a build is created, terminate all other running builds
  - Once a build is terminated, terminate all child builds initiated from it

The **Pipeline and Trigger Concurrency** limits are very important as they allow you to define how many instances of a pipeline can run in parallel when multiple commits or multiple pull requests take place. 

> Notice that these limits are *unrelated* to [parallelism within a single pipeline]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/). 

Some common scenarios are:

* a pipeline that uses a shared resource such as a database or queue and you want to limit how many pipelines can access it 
* a pipeline that deploys to a single production environment (in most cases you only want one active pipeline touching production

The **Build Termination** settings are useful for pipelines where you commit too fast (i.e. faster then the actual runtime of the pipeline).
All these settings allow you to lesser the build instance for pipelines when too many triggers are launched at the same time.
You will find them very useful in cases where too many developers are performing small commits and builds take a long time to finish (i.e. build takes 10 minutes to finish and developers perform multiple pushes every 2 minutes)

Some common scenarios are:

* You are interested only on the latest commit of a branch. If pipelines from earlier commits are still running you want to terminate them.
* You don't want to wait for children pipelines to finish (i.e. when a pipeline calls another pipeline) or when a new build starts for a parent pipeline.

### External Resources

In a big organization you might have some reusable scripts or other resources (such as Dockerfiles) that you want to use in multiple pipelines. Instead of fetching them manually in freestyle steps you can simply define them as *external resources*. When a pipeline runs, Codefresh will fetch them automatically and once the pipeline starts the files/folders will already be available in the paths that you define.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/external-resources.png" 
url="/images/pipeline/create/external-resources.png"
alt="Bringing external resources into a pipeline" 
caption="Bringing external resources into a pipeline"
max-width="80%"
%}

Currently Codefresh supports the automatic fetching of files or folders from another Git repository. To create an external resource click the *Add Resource* button and choose

* The Git repository that contains the files/folder you wish to bring in the pipeline workspace
* The branch from the Git repository that contains the files/folders you wish to bring in the pipeline workspace
* The source folder in the GIT repo (use relative path)
* The target folder in the pipeline workspace where the file folder will be copied to (use absolute path)

Once the pipeline starts, all files will be available to all freestyle steps in the paths mentioned in the target folder field.
You can define multiple external resources in a single pipeline.

### Runtime

- **Runtime Environment**: (by default this is set to SAAS)
- **Runtime OS**: (by default this is set to Linux)
- **Resources Size**: 
  - Small (recommended for 1-2 concurrent steps))
  - Medium (recommended 3-4 steps)
  - Large (recommended 5-6 steps)
  
## Pipelines that do not belong to any project

Although we recommend adding all your pipelines to a project, this is not a hard requirement. You can create pipelines that do not belong to a project from the *Pipelines* section on the left sidebar.
If you have a Codefresh account created before May 2019 you might already have several pipelines that are like this.

If you change your mind, you can also add detached pipelines (i.e. pipelines that are not part of a project) manually from the 3-dot menu that is found on the right of each pipeline. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/add-pipeline-to-project.png" 
url="/images/pipeline/create/add-pipeline-to-project.png"
alt="Changing the project of a pipeline" 
caption="Changing the project of a pipeline"
max-width="90%"
%}

Pipelines that belong to a project will mention it below their name so it is very easy to understand which pipelines belong to a project and which do not.


## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)





