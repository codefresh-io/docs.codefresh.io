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

Now that we know the [theory behind Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/), we can see how you can create pipelines for your own project.

## Pipeline Concepts

The main concepts are shown below:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/concepts.png" 
url="/images/pipeline/create/concepts.png"
alt="Pipeline concepts" 
caption="Pipeline concepts"
max-width="70%"
%}

* **Projects** are the top level concept in Codefresh. You can create projects to group pipelines that are related. In most cases a single project will be a single application (that itself contains many micro-services). You are free to use projects as you see fit. For example you could create a project for a specific Kubernetes cluster or a specific team/department.

* Each project can have multiple **pipelines**. Pipelines that belong to a single project are easily managed all together. It is also very easy to create a new pipeline in a project by copying an existing pipeline.

* Each pipeline has a definition that defines the [pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) that are executed each time this pipeline is triggered. The definition of a pipeline is described in a special [codefresh.yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file. The `codefresh.yml` file can be fetched from the same repository of the source code, from a completely different repository or even defined in-place in the Codefresh pipeline editor.

* Each pipeline can have zero, one or more [triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/). Codefresh supports several kind of triggers such as Git, Cron or Docker push triggers. Triggers that happen with Git webhooks can come from the same git repository that contains the git code **OR** any other completely different repository.

With these basic building blocks you can define many complex workflows.

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

1. The name of the currently edited pipeline is shown at the top of the window

1. The main window shows the definition of the current pipeline. The screenshot shows the inline editor but pipelines can also be defined from external files (checked into source control) as explained later.

1. The right part of the window shows extra settings for this pipeline such as triggers and launch variables/parameters.


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

On the top right of the panel you have additional controls

* The *import* button allows you to bring a `codefresh.yml` from your local workstation into the editor
* The *comment* button allows you to quickly comment/uncomment the currently selected text. The hotkey `Ctrl-/` also performs the same action
* The *formatting* button enriches the editor with special symbols for linebreaks, spaces and tabs. This allows you to easily fix common formatting errors
* The *copy* button quickly copies the **whole** pipeline text in your clipboard.


Notice that in the editor you can expand/collapse individual yaml blocks using the arrow triangles on the left of each blocks


## Loading codefresh.yml from version control

Working with the inline editor is very convenient in the beginning, but it makes your pipeline definition only exist with the Codefresh UI and therefore goes against the basic principles of [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_Code). Once you are happy with how your pipeline works you should commit it to your repository.

You can click on the *Inline YAML* header and switch it to *Use YAML from repository*.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipeline-from-internal-repo.png" 
url="/images/pipeline/create/pipeline-from-internal-repo.png"
alt="Pipeline from internal repo" 
caption="Pipeline from internal repo"
max-width="60%"
%}

You can then select **any** git repository accessible to you and load the `codefresh.yml` from there. You also setup two additional settings:

* The path of the file inside the repository. This allows you to have special folders for pipeline definitions
* The branch of the repository to use for loading the `codefresh.yml` file if you have more than one.

In the branch drop down you can also choose the option **DYNAMIC**. This will use the same branch as the one mentioned in the trigger event. If for example your pipeline is triggered by a commit in the `staging` branch of the source code, the pipeline definition will also be loaded from the `staging` branch of the git repository that contains the `codefresh.yml` file.

This allows you to have complex pipeline definitions per branch but you have to be careful to match git branch names between the repository that holds the source code and the repository that holds the pipeline definition. It is much easier to pick a specific branch for the pipeline definitions that will always be the same.

It is also possible to switch the header to *Use YAML from URL*. This will allow you to load a codefresh yaml from any public URL. Notice that a raw URL is needed in the case of github. As an example instead of using `https://github.com/codefresh-contrib/example-voting-app/blob/master/codefresh.yml` you should enter `https://raw.githubusercontent.com/codefresh-contrib/example-voting-app/master/codefresh.yml`

## Legacy Repository pipelines

If you have a Codefresh account created before May 2019 you will still get access to the *Repository* view. This view will still be available for a transition period to help you migrate to the project concept. Both views are still valid and operating on the same pipelines behind the scenes.

All you repositories should be migrated on projects with the same name so you can edit your pipelines from either view.

You can also add detached pipelines (i.e. pipelines not connected to a repository or project) manually from the 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/add-pipeline-to-project.png" 
url="/images/pipeline/create/add-pipeline-to-project.png"
alt="Changing the project of a pipeline" 
caption="Changing the project of a pipeline"
max-width="90%"
%}

This procedure is only needed for detached pipelines which do not belong to a repository. Pipelines that were connected to a git repository will also be connected to the project with the same name.


## Pipeline creation modes (Legacy)

You can start the creation of a pipeline from two places in the Codefresh UI

1. From a specific repository as found in the repositories view 
1. From the dedicated pipelines view on the left sidebar

Both ways are equally valid and differ only in the way the created pipeline is accessing a git repository.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipelines-from-repository.png" 
url="/images/pipeline/create/pipelines-from-repository.png"
alt="Pipeline attached to GIT repository" 
caption="Pipeline attached to GIT repository"
max-width="60%"
%}

Creating a pipeline from a GIT repository gives you immediate access to the contents of that repository. When you run the pipeline, Codefresh will automatically checkout the contents of the GIT repository inside the workspace folder. Your pipeline can then focus
on building and packaging the source code.

Creating a pipeline directly attached to a GIT repository is the recommended way to start using Codefresh pipelines that deal with source code. In most cases, this is the type of pipeline you will use when you start using Codefresh.

If you choose to create instead a pipeline from the *Pipelines* view from the left sidebar, the workspace will start completely empty and it is your responsibility to manually checkout code by using the [git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/).

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/pipelines-no-repository.png" 
url="/images/pipeline/create/pipelines-no-repository.png"
alt="Pipeline without GIT repository" 
caption="Pipeline without GIT repository"
max-width="80%"
%}

This is a more advanced way of creating pipelines. It is ideal if you are creating pipelines that don't deal strictly with source code (e.g. a pipeline that promotes artifacts between Docker repositories) or pipelines that work with multiple git repositories.

If you are unsure which way is appropriate for you, then choose the first one and create your pipelines starting from a GIT repository.

Regardless of the method you select, you will reach the same pipeline definition screen that allows you to define the individual build steps.

## Pipeline definition modes (Legacy)

There are 3 ways to define the build steps of pipelines in Codefresh

1. Using the GUI (easy but not very flexible)
1. Using a [Codefresh YML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file (recommended)
1. Programmatically using the [API]({{site.baseurl}}/docs/integrations/codefresh-api/) (Advanced)

We recommend you start with the GUI way if are you still learning about containers and deployments, but for any non trivial project you will soon discover that using the Codefresh YML file is the most flexible way.

## Creating pipelines using the Codefresh GUI (Legacy)

Creating a pipeline via the GUI is the fastest way of getting a Docker image from your source code and optionally
deploying into Kubernetes if your application matches the expectation of Codefresh.

The GUI steps in Codefresh assume that 

1. Your git repository contains a single application with a single Dockerfile
1. The Dockerfile contains both the application as well as any libraries needed for unit testing
1. The docker image that will be created will be tagged with the name of the branch that built it
1. Your Kubernetes cluster either contains a deployed service already or you have a deployment manifest in the repository

If your application does not match these expectations, then you need to use a `codefresh.yml` file instead (explained later in this page).

The predefined steps for the GUI are shown in the pipeline screen as different sections. You can expand any of these
and change their settings.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/predefined-steps.png" 
url="/images/pipeline/create/predefined-steps.png"
alt="Predefined pipeline steps" 
caption="Predefined pipeline steps"
max-width="70%"
%}

The **Build** step creates a Docker image from your Dockerfile. Note that the Dockerfile should be self-contained
and compile/package all needed resources on its own. If you have a Dockerfile that expects something to be prepared in advance, you need to switch your build to use a `codefresh.yml` file instead.

The **Unit test** step executes any command of your choosing *inside* the Docker image that was created in the previous step. This means that if you need any special unit test libraries, your Dockerfile should keep them intact (So if you are using multi-stage Docker builds, you cannot execute tests using the GUI way). If your unit tests fail, the pipeline stops and the Docker image is not uploaded in any Docker registry.

The **Push to registry** steps pushes the Docker image to any registry of your choosing as defined in [external registry integrations]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).
Notice that your image will be uploaded always to the integrated [Codefresh Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) if you don't do something special.

The **Integrations tests** step executes any command of your choosing *inside* the Docker image that was created in the *Build* step so the same caveats as unit tests apply. If the integration tests fail however, the Docker image is *already* uploaded in the image registry.

> For both unit and integration tests you can use Codefresh compositions which allow you to launch your container
with other external services (such as a database) and run a more complete environment. For more details
see the [compositions documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/composition/).

The **Deploy Script** step contains some templates for deployment. You can deploy to Kubernetes, ECS and Docker swarm or run a custom deployment command on the container that was created in the build step or any other image of your choosing.

You can find a complete tutorial on how to use the predefined steps in the [basic pipeline guide]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/). Specifically
for Kubernetes deployments you can also see the [basic deployment guide]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)



## Creating pipelines using Codefresh YML (Legacy)

The Codefresh YML option offers a special syntax for defining your builds in ways that are not possible with the predefined pipeline steps. With the YML option you can

* create multiple Docker images
* customize the Docker tags
* upload to multiple Docker repositories
* control exactly the services that run during your unit/integration tests
* re-arrange the order of steps
* Use custom images for compilation/package steps
* and much more


To switch to the flexible yml configuration, click the *YAML* toggle on the top right of the interface

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/custom-yml.png" 
url="/images/pipeline/create/custom-yml.png"
alt="Switching to custom yml" 
caption="Switching to custom yml"
max-width="60%"
%}

Once you switch to YML mode you have 3 more options on how to select the yml content

1. Inline yml (This is for the initial creation of the project)
1. Read yml from repository (recommended)
1. Read yml from URL (allows re-use of yml files between different projects)

### Writing Codefresh YML in the GUI

The inline option allows you to define the build yml right there in the Codefresh UI. This is great when you are starting a new project because it offers you really quick feedback. You can edit the yml steps, run a build, edit again, run a build and so on. Even though this is very convenient in the beginning, it makes your pipeline definition only exist with the Codefresh UI and therefore goes against the basic principles of [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_Code). Once you are happy with how your pipeline works you should commit it to your repository and use the second option.

> You can also import directly yml steps from a file on your computer as a starting point by clicking the *import
from file* button.

Notice that in the editor you can expand/collapse individual yaml blocks using the arrow triangles on the left.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/create/editor.png" 
url="/images/pipeline/create/editor.png"
alt="Inline Editor with collapsed blocks" 
caption="Inline Editor with collapsed blocks"
max-width="60%"
%}


Also you can comment/uncomment any block of code that you select either with the on-screen button or the `Ctrl-/` keyboard shortcut.

### Using a codefresh.yml for the source code repository

The repository option is the recommended on. It reads the `codefresh.yml` file from the repository that contains your source code. This way when you change the file you also get history and auditing for free via the GIT functionality. Both the name and location of the file are configurable.

>This choice is only available if the pipeline was created from a git repository. It is not available for pipelines created from the dedicated *Pipelines* view of the left sidebar.

### Share single Codefresh YAML across different pipelines

The third option allows you to load the yml from any location, even from a different repository. This allows you to create yml files in a central repository or web server and reuse them in multiple Codefresh pipelines. So if you want
to keep a separation between the code and the pipeline definitions you can select this method instead of having the `codefresh.yml` file in the same place as the source code.

{% include 
image.html 
lightbox="true" 
file="/images/e6a4188-Screen_Shot_2017-10-23_at_6.58.06_PM.png" 
url="/images/e6a4188-Screen_Shot_2017-10-23_at_6.58.06_PM.png"
alt="Using an external YAML file" 
caption="Using an external YAML file"
max-width="70%"
%}


The url that you enter must be a public url of a raw YAML file. For example, if you want to add a link to a yaml file located in a public Github repository, you can use the 'Raw' option from the editor menu:

{% include 
image.html 
lightbox="true" 
file="/images/b4edbf2-Screen_Shot_2017-10-25_at_11.31.21_AM.png" 
url="/images/b4edbf2-Screen_Shot_2017-10-25_at_11.31.21_AM.png"
alt="Getting the raw link of a github file" 
caption="Getting the raw link of a github file"
max-width="70%"
%}

This way you can use a single `codefresh.yml` file for different pipelines even in different repositories.




### Switching between YAML and GUI steps

Once you switch to YAML mode, Codefresh will convert the existing GUI steps in the respective YAML syntax. This way you can
easily upgrade a pipeline to YAML mode, after using the GUI steps and keep your custom commands. Note, that the opposite (going from YAML to GUI steps) is not supported or recommended. You will have start over if you switch to GUI mode.


You can easily recreate the predefined GUI steps with the following yml file.

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: kostis-codefresh/my-own-app
    working_directory: ./
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    image: ${{MyAppDockerImage}}
    commands: 
      - ./my-unit-tests.sh
  PushingToRegistry:
    type: push
    title: Pushing To Registry
    candidate: ${{MyAppDockerImage}}
    tag: '${{CF_BRANCH}}'
  MyIntegrationTests:
    title: Running Integration tests
    image: ${{MyAppDockerImage}}
    commands: 
      - ./my-integration-tests.sh
{% endraw %}
{% endhighlight %}

This file contains 4 steps named, *MyAppDockerImage*, *MyUnitTests*, *PushingToRegistry*, *MyIntegrationTests*. Steps in Codefresh can have arbitrary names.

The first step is a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) that creates a Docker image, using a Dockerfile that is located at the root folder of your repository. The image is tagged with the name of the branch. More information for other ways of tagging can be found in the [variables documentation]({{site.baseurl}}/docs/codefresh-yaml/variables/).

The second step is a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that runs your unit tests in the context of the image that was just created.

The third step is a [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) that pushes the image with the same tag. Since we haven't defined a registry explicitly, the integrated Codefresh registry is used instead.

> Remember that all Docker images of successful builds are always pushed to the Codefresh registry. The push step here is
shown for demonstration purposes. It can be removed and the image will still be uploaded to the Codefresh registry. The push step is mostly useful for [external Docker registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).

The last step is another freestyle step that runs integration tests, again inside the Docker image that was created in the first step.

For more information, see the [complete YML syntax]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)





