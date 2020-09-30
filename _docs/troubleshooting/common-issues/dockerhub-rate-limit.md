---
title: "Error pulling image configuration: toomanyrequests"
description: "Too Many Requests for DockerHub"
group: troubleshooting
sub_group: common-issues
toc: true
---

Your pipeline fails with the following error:

```
Continuing execution.
Pulling image codefresh/cfstep-helm:3.0.2 
error pulling image configuration: toomanyrequests: Too Many Requests. Please see https://docs.docker.com/docker-hub/download-rate-limit/ 
```
The image `codefresh/cfstep-helm` is just an example. This error can happen for other Docker images as well. 

## Problem description

This issue occurs because your pipeline has triggered the [DockerHub limit](https://www.docker.com/blog/scaling-docker-to-serve-millions-more-developers-network-egress/) announced in August 2020. 

Users who pull Docker images have the following limits 

* Free plan – anonymous users: 100 pulls per 6 hours 
* Free plan – authenticated users: 200 pulls per 6 hours
* Pro plan – unlimited
* Team plan – unlimited

Notice that the limits depend on the [pricing plan](https://www.docker.com/pricing) of the user who performs the pull action and not the user who owns the Docker image.


If you don't have a Docker Hub integration in Codefresh, all your Docker images will be pulled as an anonymous user and because Docker Hub [applies the rate limit for each IP address](https://docs.docker.com/docker-hub/download-rate-limit/), your whole Codefresh installation can easily hit the limits if you have many teams and users.

## The solution

You need to add at least one DockerHub integration in Codefresh by following the [instructions]({{site.baseurl}}/docs/integrations/docker-registries/docker-hub/).

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/dockerhub/two-dockerhub-integrations.png" 
	url="/images/integrations/docker-registries/dockerhub/two-dockerhub-integrations.png" 
	alt="Docker Hub integrations in Codefresh" 
	caption="Docker Hub integrations in Codefresh" 
	max-width="90%" 
%}

This way, when Codefresh tries to pull an image it will use the connected integration instead of sending anonymous requests.

If the integration is for a DockerHub pro/team plan, you will have unlimited pulls. If the integration is for the free plan your rate limit will doubled. We also advise to you add multiple DockerHub integration if it makes sense for your teams, as this will spread the pull actions to multiple DockerHub accounts.









