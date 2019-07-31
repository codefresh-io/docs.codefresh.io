---
title: "Push an image"
description: "Using the Codefresh UI to push Docker images to a Registry"
group: docker-registries
redirect_from:
  - /docs/push-image-to-a-docker-registry/
toc: true
---

In Codefresh there are several ways that you can use to push Docker images to a registry:

1. by using the graphical pipeline steps as explained in this page
1. by using the [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) in a [YAML pipeline]({{site.baseurl}}/docs/codefresh-yaml/steps/), and
1. by [promoting]({{site.baseurl}}/docs/docker-registries/codefresh-registry/#promoting-docker-images) an existing image to another registry.

> Notice that all successful builds automatically push their image to built-in Codefresh registry. If you use only this internal registry
all push steps are optional (they are needed only for [external registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)).


## Using the graphical steps for image pushing

With Codefresh, you can automatically push your build images to your Docker registry. First follow the instructions for connecting your [external registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).



### Access Your Pipeline

{:start="1"}
1. Navigate to the **Repositories** view and find your repository.

{:start="2"}
2. Click the **Gear** icon to navigate to the **Pipelines** view.

{% include image.html 
	lightbox="true" 
	file="/images/a59e344-2016-09-29_1224.png" 
	url="/images/a59e344-2016-09-29_1224.png" 
	alt="Viewing the pipelines of a repository" 
	caption="Viewing the pipelines of a repository"
	max-width="65%" 
	%}

You will see all pipelines connected to this repository. Select the pipeline that you want to edit.

### Name your Docker image

{:start="1"}
1. Scroll down and navigate to the **Build and Unit Test** section.

{:start="2"}
2. In the **Image Name** text box, type a name for your image.


{% include image.html 
	lightbox="true" 
	file="/images/69e5ee8-Screen_Shot_2016-09-29_at_12.35.44_PM.png" 
	url="/images/69e5ee8-Screen_Shot_2016-09-29_at_12.35.44_PM.png" 
	alt="Entering name of the docker image" 
	caption="Entering name of the docker image"
	max-width="65%" 
	%}

>The name you provide must be valid by your Docker registry. For example Dockerhub requires your image to be tagged with your Dockerhub username before it can be pushed.

### Select Your Registry

{:start="1"}
1. Scroll down to the **Push to Docker registry** section.

{:start="2"}
2. Select your configured registry.

{% include image.html 
	lightbox="true" 
	file="/images/9512b7a-screenshot-g.codefresh.io-2017-11-21-14-59-59.png" 
	url="/images/9512b7a-screenshot-g.codefresh.io-2017-11-21-14-59-59.png" 
	alt="Choosing the external registry" 
	caption="Choosing the external registry"
	max-width="65%" 
	%}


>Make sure you already have a configured registry. If not refer to the [Docker registry integration documentation]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) to connect it to Codefresh first.


### Trigger a New Build

To trigger a new build, click the **BUILD** button.

{% include image.html 
	lightbox="true" 
	file="/images/50ce3dc-2016-09-29_1229.png" 
	url="/images/50ce3dc-2016-09-29_1229.png" 
	alt="Starting a new Build" 
	caption="Starting a new Build"
	max-width="65%" 
	%}

Once your image is built, it will automatically be pushed to your external registry.

## What to read next

- [Examples of pushing Docker images]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/) 
- [Codefresh Managed Registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) 
- [External Registry integrations]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) 
- [Custom Image annotations]({{site.baseurl}}/docs/docker-registries/metadata-annotations/) 
