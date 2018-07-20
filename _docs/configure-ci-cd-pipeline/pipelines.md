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
toc: true
---

Now that we know the [theory behind Codefresh pipelines]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/), we can see how you can create pipelines for your own project.

There are 3 ways of creating pipelines in Codefresh

1. Using the GUI (easy but not very flexible)
1. Using a [Codefresh YML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file (recommended)
1. Programmatically using the [API]({{ site.baseurl }}/docs/integrations/codefresh-api/) (Advanced)

We recommend you start with the GUI way if are you still learning about containers and deployments, but for any non trivial project you will soon discover that using the Codefresh YML file is the most flexible way.

## Creating pipelines using the Codefresh GUI

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

The **Push to registry** steps pushes the Docker image to any registry of your choosing as defined in [external registry integrations]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/).
Notice that your image will be uploaded always to the integrated [Codefresh Docker registry]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/) if you don't do something special.

The **Integrations steps** executes any command of your choosing *inside* the Docker image that was created in the *Build* step so the same caveats as unit tests apply. If the integration tests fail however, the Docker image is *already* uploaded in the image registry.

> For both unit and integration tests you can use Codefresh compositions which allow you to launch your container
with other external services (such as a database) and run a more complete environment. For more details
see the [compositions documentation]({{ site.baseurl }}/docs/codefresh-yaml/steps/composition-1/).

The *Deploy Script* step contains some templates for deployment. You can deploy to Kubernetes, ECS and Docker swarm or run a custom deployment command on the container that was created in the build step or any other image of your choosing.

You can find a complete tutorial on how to use the predefined steps in the [basic pipeline guide]({{ site.baseurl }}/docs/getting-started/create-a-basic-pipeline/). Specifically
for Kubernetes deployments you can also see the [basic deployment guide]({{ site.baseurl }}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)



## Creating pipelines using Codefresh YML

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
max-width="70%"
%}

Once you switch to YML mode you have 3 more options on how to select the yml content

1. Inline yml (This is for the initial creation of the project)
1. Read yml from repository (recommended)
1. Read yml from URL (allows re-use of yml files between different projects)

The inline option allows you to define the build yml right there in the Codefresh UI. This is great when you are starting a new project because it offers you really quick feedback. You can edit the yml steps, run a build, edit again, run a build and so on. Even though this is very convenient in the beginning, it makes your pipeline definition only exist with the Codefresh UI and therefore goes against the basic principles of [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_Code). Once you are happy with how your pipeline works you should commit it to your repository and use the second option.

> You can also import directly yml steps from a file on your computer as a starting point by clicking the *import
from file* button.

The repository option is the recommended on. It reads the `codefresh.yml` file from the repository that contains your source code. This way when you change the file you also get history and auditing for free via the GIT functionality. Both the name and location of the file are configurable.

The third option allows you to load the yml from any location, even from a different repository. This allows you to create yml files in a central repository or web server and reuse them in multiple Codefresh pipelines. So if you want
to keep a separation between the code and the pipeline definitions you can select this method instead of having the `codefresh.yml` file in the same place as the source code.

### A starting Codefresh yml file

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

The first step is a [build step]({{ site.baseurl }}/docs/codefresh-yaml/steps/build-1/) that creates a Docker image, using a Dockerfile that is located at the root folder of your repository. The image is tagged with the name of the branch. More information for other ways of tagging can be found in the [variables documentation]({{ site.baseurl }}/docs/codefresh-yaml/variables/).

The second step is a [freestyle step]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/) that runs your unit tests in the context of the image that was just created.

The third step is a [push step]({{ site.baseurl }}/docs/codefresh-yaml/steps/push-1/) that pushes the image with the same tag. Since we haven't defined a registry explicitly, the integrated Codefresh registry is used instead.

> Remember that all Docker images of successful builds are always pushed to the Codefresh registry. The push step here is
shown for demonstration purposes. It can be removed and the image will still be uploaded to the Codefresh registry. The push step is mostly useful for [external Docker registries]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/).

The last step is another freestyle that runs integration tests, again inside the Docker image that was created in the first step.

For more information see the complete [YML syntax]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).

## What to read next

* [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{ site.baseurl }}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{ site.baseurl }}/docs/yaml-examples/examples/)





