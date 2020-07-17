---
title: "Docker Hub"
description: "Integrate DockerHub in Codefresh pipelines"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/dockerhub/
  - /docs/docker-registries/external-docker-registries/docker-hub/
toc: true
---
To configure Docker Hub so that your pipelines can push images to it, first select **Docker Hub** from the new registry drop down and then provide the following:

* Registry Name - a unique name for this configuration.
* Username - Docker Hub username.
* Password - Docker Hub [personal account token](https://docs.docker.com/docker-hub/access-tokens/) or Dockerhub account password (not recommended)

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/dockerhub/add-dockerhub-registry.png" 
	url="/images/integrations/docker-registries/dockerhub/add-dockerhub-registry.png" 
	alt="Add Docker Hub Registry" 
	caption="Add Docker Hub Registry" 
	max-width="50%" 
%}


>Note that Docker.io only allows you to push images that are tagged with your username. If you have a choice, create
a Dockerhub account with the same username that you have in Codefresh. If not, you need to change the Docker image
created to match your username in every [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/#examples).

If you have enabled [two-factor-authentication in Dockerhub](https://docs.docker.com/docker-hub/2fa/), then in the password field above you must put a Docker personal access token (instead of your Dockerhub master password). Otherwise Codefresh will not be able to push your image.

If you don't have 2FA enabled in Dockerhub, then you can also use your Dockerhub account password. But in all cases we suggest you create a personal access token for Codefresh (personal access tokens are more secure as you can revoke them on demand and see when they were last used).

## Adding more Dockerhub integrations

You can add additional Dockerhub accounts using the same process. 


{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/dockerhub/two-dockerhub-integrations.png" 
	url="/images/integrations/docker-registries/dockerhub/two-dockerhub-integrations.png" 
	alt="Additional Docker Hub integrations" 
	caption="Additional Docker Hub integrations" 
	max-width="80%" 
%}


You can specify which registry will be used as primary/default for the docker.io domain.
Use the appropriate `registry name` value in your pipelines in order to decide which Dockerhub account will be used.

Here is a pipeline that is pushing to two different Dockerhub accounts:

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/dockerhub/pushing-two-dockerhub-accounts.png" 
	url="/images/integrations/docker-registries/dockerhub/pushing-two-dockerhub-accounts.png" 
	alt="Pushing to multiple Dockerhub accounts" 
	caption="Pushing to multiple Dockerhub accounts" 
	max-width="90%" 
%}

This is the respective [pipeline definition]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/):

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "push"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "kostis-codefresh/trivial-go-web"
    revision: "master"
    stage: "clone"
  build:
    title: "Building Docker image"
    type: "build"
    image_name: "trivial-go-web"
    working_directory: "${{clone}}"
    tag: "latest"
    dockerfile: "Dockerfile.multistage"
    stage: "build"
    disable_push: true
  push1:
    title: "Pushing 1st Docker image"
    type: push
    image_name: "kostiscodefresh/trivial-go-web"
    tag: "latest"
    stage: "push" 
    registry: dockerhub
    candidate: ${{build}}
  push2:
     title: "Pushing 2nd Docker image"
     type: push
     image_name: "kkapelon/trivial-go-web"
     tag: "latest"
     stage: "push" 
     registry: second-dockerhub
     candidate: ${{build}}
{% endraw %}
{% endhighlight %}

The two Dockerhub accounts are `kkapelon` and `kostiscodefresh`, and Codefresh is automatically using the correct integration by looking at the `image_name` property of the push step.



## What to read next

* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)





