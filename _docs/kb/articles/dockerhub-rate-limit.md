---
title: "Error pulling image configuration: toomanyrequests"
description: "Too many requests to Docker Hub"
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: true
categories: [Pipelines, General]
support-reviewed: 2023-04-18 LG
---

## Issue

Pipeline fails with the following error:

```shell
Continuing execution.
Pulling image codefresh/cfstep-helm:3.0.2 
error pulling image configuration: toomanyrequests: Too Many Requests. Please see https://docs.docker.com/docker-hub/download-rate-limit/ 
```

The image `codefresh/cfstep-helm` is just an example. This error can happen for other Docker images as well.

Or, with this error message from Docker Hub:

```shell
You have reached your pull rate limit. You may increase the limit by authenticating and upgrading: https://www.docker.com/increase-rate-limit
```

## Possible cause

This issue occurs because your pipeline has triggered the [Docker Hub limit](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/){:target="\_blank"} announced in August 2020.

Users who pull Docker images have the following limits:

* Free plan: Anonymous users: 100 pulls per 6 hours
* Free plan: Authenticated users: 200 pulls per 6 hours
* Pro plan: Unlimited
* Team plan: Unlimited

> The limits depend on the [pricing plan](https://www.docker.com/pricing){:target="\_blank"} of the _user who performs the pull action_, and not the user who owns the Docker image.

If you don't have a Docker Hub integration in Codefresh, all your Docker images are pulled as an anonymous user and because Docker Hub [applies the rate limit for each IP address](https://docs.docker.com/docker-hub/download-rate-limit/){:target="\_blank"}, your whole Codefresh installation can easily hit the limits if you have many teams and users.

## Solution

* Add at least one Docker Hub integration in Codefresh, as described in [Docker Hub integrations]({{site.baseurl}}/docs/integrations/docker-registries/docker-hub/).

{% include image.html
lightbox="true"
file="/images/troubleshooting/two-dockerhub-integrations.png"
url="/images/troubleshooting/two-dockerhub-integrations.png"
alt="Docker Hub integrations in Codefresh"
caption="Docker Hub integrations in Codefresh"
max-width="90%"
%}

This way, when Codefresh tries to pull an image, it uses the connected integration instead of sending anonymous requests.

If the integration is for a Docker Hub pro/team plan, you have unlimited pulls. If the integration is for the free plan your rate limit is doubled.  

We also advise to you add multiple Docker Hub integrations if it makes sense for your teams, as this action spreads the pull actions to multiple DockerHub accounts.

## Related articles

[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)
