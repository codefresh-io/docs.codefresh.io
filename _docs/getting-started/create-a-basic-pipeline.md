---
title: "Getting Started - Create a Basic Pipeline"
description: "Continuous Integration with Codefresh"
excerpt: ""
group: getting-started
redirect_from:
  - /docs/getting-started-create-a-basic-pipeline/
  - /docs/build-your-image/
toc: true
---

In this tutorial we will setup a [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) pipeline
within Codefresh using an example application. You will learn:

* How to connect your Git repository
* How to connect your Docker registry
* How to build a Docker image from the source code
* How to push a Docker image to your registry
* How to run unit tests for your application
* How to publish your image to Dockerhub

Codefresh is the fastest way to get from your source code to a Docker image. Codefresh allows you
to create a Docker image from its friendly UI without any local Docker installation (Docker building as a service).

You can store the resulting image on a public or private Docker registry that your organization already uses, or any other Docker registry
service that you connect to your Codefresh account.

Codefresh also has built-in support for [unit]({{site.baseurl}}/docs/testing/unit-tests/) and [integration testing]({{site.baseurl}}/docs/testing/integration-tests/) allowing you to only push Docker images that pass your testing suite. Finally, you can [add annotations]({{site.baseurl}}/docs/docker-registries/metadata-annotations/) to your Docker images to better track your releases (e.g. you can mark a Docker image with an annotation that shows a successful unit test run).

You can use either the sample application we provide here to follow along or create your own Docker based
example if you prefer (don't forget to write unit tests).

## Prerequisites for this tutorial

For this tutorial you will need:

 * A free [GitHub account](https://github.com/join)
 * A free [Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/)
 * An account to a Docker registry service (e.g. [GitHub](https://github.com/features/packages) )
 * The source code of the sample application
 * (Optional) an account to Dockerhub if you also want to make your image public

 We also assume that you are familiar with Docker and the build/run workflow it supports. Your applications should already come with their own Dockerfiles. If not, then read the [official documentation first](https://docs.docker.com/get-started/). 

 Apart from Dockerhub, you can use the registry that comes with your cloud account ([Amazon](https://aws.amazon.com/ecr/), [Azure](https://azure.microsoft.com/en-us/services/container-registry/), [Google](https://cloud.google.com/container-registry)) or you can use any other compliant service such as [Quay](https://quay.io/), [Treescale](https://treescale.com/), [Canister.io](https://canister.io/) etc. GitHub also offers [a container registry](https://github.com/features/packages) with each account.

 The sample application can be found at [https://github.com/codefresh-contrib/python-flask-sample-app](https://github.com/codefresh-contrib/python-flask-sample-app). To bring the source
 code to your own account you need to "fork" the repository by clicking the respective button at the top right part of the page.


 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/fork-example-project.png" 
url="/images/getting-started/quick-start-ci/fork-example-project.png" 
alt="Forking the example project" 
caption="Forking the example project (click image to enlarge)" 
max-width="80%" 
%}

After some brief time, the repository should appear in your own GitHub account.
Now you are ready to start building code with Codefresh!


> Codefresh supports GitLab, Bitbucket and Azure GIT repositories apart from GitHub. The
same principles presented in this tutorial apply for all Git providers.


## Continuous Integration with Codefresh

First, let's look at an overview of the process that we will create:

  {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/pipeline-overview.jpg" 
url="/images/getting-started/quick-start-ci/pipeline-overview.jpg" 
alt="Pipeline Overview" 
caption="Pipeline Overview" 
max-width="100%" 
%}

The diagram above shows a full Continuous Integration pipeline for the sample application. Starting from left to right the critical path is:

1. Codefresh connects to GitHub and checks out the source code of the application.
1. Codefresh uses the Dockerfile of the application to create a Docker image.
1. Unit tests are run in the same Docker image to verify the correctness of the code
1. The Docker image is stored in your private Registry
1. The Docker image is also pushed to Dockerhub (optional).


The sample application that we are using is a [Python/Flask](https://www.palletsprojects.com/p/flask/) project with the following key points

 * It already has its own [Dockerfile](https://github.com/codefresh-contrib/python-flask-sample-app/blob/master/Dockerfile) in the root of the repository.
 * It has unit tests.

## Creating a Docker Image

We will start by focusing on the first part of the pipeline overview, the creation of a Docker images.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/docker-build-steps.jpg" 
url="/images/getting-started/quick-start-ci/docker-build-steps.jpg" 
alt="Preparing a Docker image" 
caption="Preparing a Docker image" 
max-width="60%" 
%}

Docker images play a central role in Codefresh pipelines. They are the basic building blocks that serve as the link
between what your source code is producing and what gets deployed. If your own application is not "dockerized" yet, you 
need to create a Dockerfile for it first, before moving it into the Codefresh infrastructure. 

Because all Codefresh capabilities are based on Docker images, Docker is also serving as an abstraction layer over any the implementation language of your source code. Codefresh can work with projects written in Ruby, Python, Java, Node or any other programming language as long as they produce a Docker image. Docker images are a first class citizen in Codefresh pipelines and not just an afterthought.

The example application already comes with its own Dockerfile, making the creation of a Codefresh pipeline very easy.
Let's start by going into the [Codefresh dashboard](https://g.codefresh.io/projects/) (after [creating your account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/)).

### Connecting your Docker registry to Codefresh

Before we create the pipeline you need to connect at least one Docker registry in your Codefresh account. The pipeline will use this registry to store the Docker image of the application.

Go to your [Registry Configuration screen](https://g.codefresh.io/account-admin/account-conf/integration/registry) and connect your Docker registry. Codefresh supports [all popular Docker registries]({{site.baseurl}}/docs/integrations/docker-registries/) as well as any service that follows the registry specification. If you don't already have a registry we recommend you start with the [GitHub Registry]({{site.baseurl}}/docs/integrations/docker-registries/github-container-registry/).


{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/external-registries.png" 
url="/images/getting-started/quick-start-ci/external-registries.png" 
alt="Connecting a Docker registry to Codefresh" 
caption="Connecting a Docker registry to Codefresh" 
max-width="60%" 
%}

If you connect multiple Docker registries make sure that you select one as the "default". This will be used automatically by the pipeline as you will see later in the build stage.


### Creating a new project

With the Docker registry connected, we can now start our pipeline.

Codefresh pipelines are grouped under [projects]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-concepts). Project names can be anything you want with the most common example being the name of an application where all pipelines in the project are packaging/deploying the different microservices. You can think of projects as "folders/directories" for your pipelines.

Make sure that you have selected *Projects* from the left sidebar. Then click on the *New project* button on the top right corner to get started.

Enter a name for your project (e.g. `my-first-project`) and choose a sample icon that you like. You can also optionally add tags that will be used for [access control]({{site.baseurl}}/docs/enterprise/access-control/) (most useful in a organization). For now leave the tags empty.

Click the *Create* button once you are done.
You now have a new project and can start adding pipelines in it.

### Creating a new pipeline

Click the *New pipeline* button in order to create a pipeline.
Enter any name (e.g. `basic-build`). 

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/create-pipeline.png" 
url="/images/getting-started/quick-start-ci/create-pipeline.png" 
alt="Create a new pipeline" 
caption="Create a new pipeline (click image to enlarge)" 
max-width="50%" 
%}

Find your repository from the list and select it. Make sure that the option *Add Git commit trigger* is selected. This way your pipeline will be automatically launched when a commit happens on this repository. 

Click the *Create* button. Your pipeline was created and you should now see the pipeline editor. Here you can describe what the pipeline will do using [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).

###  Build the docker image

Codefresh has already created a sample pipeline which we will not use for this tutorial.

You will create a very simple pipeline that checks out the source code and builds a docker image.
Delete the existing contents on the editor and paste the following:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - package
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    stage: checkout
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: package
    image_name: my-app-image
    working_directory: ./
    tag: v1.0.0
    dockerfile: Dockerfile
{% endraw %}      
{% endhighlight %}

This pipeline contains just two steps.

* A [`git-clone`]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step for checking out the code
* A [`build`]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) step for building the docker image **AND** pushing it to the connected Docker registry.

The clone step is also using some [built-in pipeline variables]({{site.baseurl}}/docs/codefresh-yaml/variables/). They instruct the pipeline to checkout the exact code that is described from the commit of the trigger. Don't worry if the exact details are not clear to you yet. 

The build step uses a [Dockerfile](https://github.com/codefresh-contrib/python-flask-sample-app/blob/master/Dockerfile) that is located at the root folder of the project and creates a Docker image with tag `v1.0.0`.

Click the *Save* button to apply your changes. Then click the *Run* button to start your pipeline.
On the dialog that will appear leave the default selections.


### Starting the first build

Once the build is started Codefresh will navigate you to the build progress of the sample application.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/building.png" 
url="/images/getting-started/quick-start-ci/building.png" 
alt="Monitoring the build" 
caption="Monitoring the build (click image to enlarge)" 
max-width="50%" 
%}

The build output is split into sections. Expand the section *Building Docker Image* and look at the logs. 
After a while the build should finish with success. All previous runs are in the [Builds page](https://g.codefresh.io/builds) from now on.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/finished-build.png" 
url="/images/getting-started/quick-start-ci/finished-build.png" 
alt="Build details" 
caption="Build details (click image to enlarge)" 
max-width="80%" 
%}

## Running unit tests automatically

Like any well-disciplined project, the sample application comes with its associated unit tests. Running unit tests
as part of the build process can validate that the Docker image is indeed correct and satisfies the requested functionality.
This is the next step in the build process described at the beginning of this tutorial.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/unit-test-stage.jpg" 
url="/images/getting-started/quick-start-ci/unit-test-stage.jpg" 
alt="Unit tests workflow" 
caption="Unit tests workflow (click image to enlarge)" 
max-width="80%" 
%}



We need to add the tests in the build process. To do this we will get back to the pipeline settings of the application. Click on the name of the pipeline you created in the build log screen so you can edit the yaml file.

The sample application already has unit tests that can be executed with:

``` 
pip install pytest && pytest
```

Edit the pipeline as below:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - package
  - test  
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    stage: checkout
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: package
    image_name: my-app-image #Change to your image name
    working_directory: ./
    tag: v1.0.1
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    image: '${{MyAppDockerImage}}'
    stage: test 
    commands: 
      - pip install pytest
      - pytest   
{% endraw %}      
{% endhighlight %}

Here we have added a new [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) in its own [stage]({{site.baseurl}}/docs/codefresh-yaml/stages/) that runs unit tests. Freestyle steps are running custom commands inside docker containers and in this case we run the python command [inside the docker image]({{site.baseurl}}/docs/codefresh-yaml/variables/#context-related-variables) that was just created from the previous step (mentioned by the `image` property)

Notice that Codefresh also has the capability to run [integration tests]({{site.baseurl}}/docs/codefresh-yaml/steps/composition/) and get [test results]({{site.baseurl}}/docs/testing/test-reports/) as well. Therefore, regardless of the type of tests you employ, Codefresh can accommodate your testing process in a fully automated manner as part of the main build.

This time the build results will contain a new section labeled *Running unit tests*. It will contain the 
test output of the application.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/unit-test-result.png" 
url="/images/getting-started/quick-start-ci/unit-test-result.png" 
alt="Unit tests results" 
caption="Unit tests results (click image to enlarge)" 
max-width="60%" 
%}

This concludes the basic build for the example application. Codefresh offers several more capabilities 
than the ones shown here. You can read more about pipelines in the [YAML documentation]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).


## Storing Docker images in Codefresh

If you have been following along so far, you might already be wondering what happens with the resulting Docker image of each build. The Codefresh build logs show that a Docker image is created after each successful build. Where does this image go?

Codefresh has the unique feature where the build step automatically pushes the image to your default Docker registry! All the images that we have created so far, are stored in the registry you connected in the previous section.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/docker-store-stage.jpg" 
url="/images/getting-started/quick-start-ci/docker-store-stage.jpg" 
alt="Automatic storage of Docker images" 
caption="Automatic storage of Docker images" 
max-width="80%" 
%}

If you only use a single registry your pipeline is now complete.

You can inspect all your images from your previous builds by clicking on *Images* on the left panel. A list of Docker images will appear sorted starting from the most recent. This dashboard is getting live information from your connected Docker registry.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/docker-images.png" 
url="/images/getting-started/quick-start-ci/docker-images.png" 
alt="Recent Docker images" 
caption="Recent Docker images (click image to enlarge)" 
max-width="100%" 
%}

Among the information shown, you can clearly see:

* What is the Git Branch that created this image
* What is the Git Hash that contained the last commit

This information can help you to easily correlate the changes that exist in each Docker images, which is very important knowledge when it comes to deployments (explained in detail in the next tutorial).

If you click on a Docker image you will get many more details about it including a timeline of the labels for this Docker image. You also have the ability to enter custom comments that describe any event that you consider important. Codefresh
really shines when it comes to annotating your Docker images with metadata. For more details read the section [Annotations]({{site.baseurl}}/docs/docker-registries/metadata-annotations/).

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/docker-timeline.png" 
url="/images/getting-started/quick-start-ci/docker-timeline.png" 
alt="Docker Image timeline" 
caption="Docker Image timeline (click image to enlarge)" 
max-width="50%" 
%}

Codefresh also includes a graphical display of all the layers contained in the Docker image. This can help you identify big layers in your build process and hopefully give you some pointers on how to reduce the size of your deployment binaries.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/docker-layers.png" 
url="/images/getting-started/quick-start-ci/docker-layers.png" 
alt="Docker Layer Analysis" 
caption="Docker Layer Analysis (click image to enlarge)" 
max-width="70%" 
%}

The built-in Docker image storage is very helpful on its own, but it becomes even more impressive when it is coupled with the capability to use it as a basis for temporary demo environments, as we will see in the next section.



## Uploading Docker images to Dockerhub

Using the default Docker registry for automatic pushes is great for simple pipelines. However, sometimes you might also want to push your Docker image to a second registry or make it public in Dockerhub.

Since the build step creates a Docker image and pushes it at the same time, Codefresh also [provides a push pipeline step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) that just pushes an existing Docker image.


{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/docker-push-stage.jpg" 
url="/images/getting-started/quick-start-ci/docker-push-stage.jpg" 
alt="Pushing a Docker image" 
caption="Pushing a Docker image (click image to enlarge)" 
max-width="80%" 
%}


Docker images are one of the central concepts in Codefresh pipelines as everything revolves around them. Powerful Codefresh pipelines can be created by using Docker images as build tools, so it is perfectly normal if you manage a large number of images which are not strictly packaged applications. You may create Docker images that contain building or deployment tools and are used as part of
the build process instead of the build result.

For the purposes of this tutorial we will also push our sample application to [DockerHub](https://cloud.docker.com/) which  is the free public Docker hosting registry of Docker Inc. You need to create a free account with the service first and note down your username and password. In your own projects you can use any other [external registry]({{site.baseurl}}/docs/integrations/docker-registries/) you wish.

>Note that Docker.io only allows you to push images that are tagged with your username. If you have a choice, create
a Dockerhub account with the same username that you have in Codefresh. If not, you need to change the Docker image
created to match your username.

Once you create your Docker Hub account, go to your Account Configuration, by clicking on *Account Settings* on the left sidebar of the Codefresh page. On the first section called *Integrations* click the *Configure* button next to *Docker Registry*.
Finally click the *Add Registry* drop-down menu and select *Docker Hub*.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/add-docker-hub.png" 
url="/images/getting-started/quick-start-ci/add-docker-hub.png" 
alt="Docker Hub credentials" 
caption="Docker Hub credentials (click image to enlarge)" 
max-width="60%" 
%}

Enter your Docker Hub credentials and click the *TEST* button to verify the connection details. You should see a success message. We have now connected our Docker Hub account to our Codefresh account. Make sure that you note down the *Registry Name* you used.

To actually use the Docker Hub account in a specific project, go back to your pipeline editor. Change the editor contents to:

{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - package
  - test 
  - upload    
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    stage: checkout
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: package
    image_name: my-app-image
    working_directory: ./
    tag: v1.0.1
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    image: '${{MyAppDockerImage}}'
    stage: test 
    commands: 
      - pip install pytest
      - pytest      
  MyPushStep:
    title: Pushing to Docker Registry
    type: push
    stage: upload
    tag: '${{CF_BRANCH}}'
    candidate: '${{MyAppDockerImage}}'
    image_name: kkapelon/pythonflasksampleapp #Change kkapelon to your dockerhub username
    registry: dockerhub # Name of your integration as was defined in the Registry screen
{% endraw %}      
{% endhighlight %}

We now have added a [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) at the end of the pipeline. The image is tagged with the name of the branch.

Click *Save* to apply your changes and *Run* to start the pipeline again.
In the build logs a new panel will appear that shows the push progress:

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/docker-pushing.png" 
url="/images/getting-started/quick-start-ci/docker-pushing.png" 
alt="Pushing to Docker Hub" 
caption="Pushing to Docker Hub (click image to enlarge)" 
max-width="70%" 
%}

Note that this is in addition to default Docker registry of your Codefresh account. After the build is finished the Docker image of the sample application is stored **both** in the default Docker registry and in Dockerhub.

To verify the latter, you can visit your profile in Dockerhub and look at the image details:

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-ci/docker-hub.png" 
url="/images/getting-started/quick-start-ci/docker-hub.png" 
alt="Docker Image details" 
caption="Docker Image details (click image to enlarge)" 
max-width="60%" 
%}


Pushing to Dockerhub is the last step in the build pipeline. Now that we have the basic functionality ready we can see how Codefresh handles [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) with Pull requests and automatic builds.


## What to read next

* [Introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Working with Docker images]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [On demand environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/)
* [Deploy to Kubernetes]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)











