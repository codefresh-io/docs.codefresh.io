---
layout: docs
title: "Push an image to a Docker registry"
description: ""
group: configure-ci-cd-pipeline
redirect_from:
  - /docs/push-image-to-a-docker-registry
toc: true
---

<div class="bd-callout bd-callout-info" markdown="1">
In Codefresh the build images will be automatically pushed to Codefresh registry and there’s no need to specify the [Codefresh Docker Registry]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/) for the block __Push to Docker Registry__ in the pipeline of repository.
</div>

With Codefresh, you can automatically push your build images to your Docker registry.

You select this option when you configure your service.

<div class="bd-callout bd-callout-info" markdown="1">
##### What's a Docker registry?

To learn about Docker registries please refer to the [Docker Documentation Center](https://docs.docker.com/registry/){:target="_blank"}
</div>

## 1. Access Your Pipeline
{:start="1"}
1. Navigate to the **Repositories** view and find your repository

{:start="2"}
2. Click the **Gear** icon to navigate to the **Pipelines** view

{% include image.html lightbox="true" file="/images/a59e344-2016-09-29_1224.png" url="/images/a59e344-2016-09-29_1224.png" alt="" max-width="65%" %}

## 2. Name Your Image
{:start="1"}
1. Navigate to the **Build and Unit Test** section

{:start="2"}
2. In the **Image Name** text box, type a name for your image.

{% include image.html lightbox="true" file="/images/9512b7a-screenshot-g.codefresh.io-2017-11-21-14-59-59.png" url="/images/9512b7a-screenshot-g.codefresh.io-2017-11-21-14-59-59.png" alt="" max-width="65%" %}

<div class="bd-callout bd-callout-warning" markdown="1">
##### Notice

The name you provide must be valid by your Docker registry.
</div>

{% include image.html lightbox="true" file="/images/69e5ee8-Screen_Shot_2016-09-29_at_12.35.44_PM.png" url="/images/69e5ee8-Screen_Shot_2016-09-29_at_12.35.44_PM.png" alt="" max-width="65%" %}

## 3. Select Your Registry

{:start="1"}
1. Scroll to the **Push to Docker registry** section

{:start="2"}
2. Select your configured registry

{% include image.html lightbox="true" file="/images/9512b7a-screenshot-g.codefresh.io-2017-11-21-14-59-59.png" url="/images/9512b7a-screenshot-g.codefresh.io-2017-11-21-14-59-59.png" alt="" max-width="65%" %}

<div class="bd-callout bd-callout-info" markdown="1">
##### Registry Configuration

Make sure you already have a configured registry. If not refer to the [Docker registry integration documentation]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/)
</div>

## 4. Trigger a New Build

To trigger a new build, click the **BUILD** button.

{% include image.html lightbox="true" file="/images/50ce3dc-2016-09-29_1229.png" url="/images/50ce3dc-2016-09-29_1229.png" alt="Trigger new Build" max-width="65%" %}

Once your image is built, it will automatically be pushed to your registry.
