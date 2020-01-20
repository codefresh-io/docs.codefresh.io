---
title: "Docker Hub"
description: "Integrate DockerHub in Codefresh pipelines"
group: docker-registries
sub_group: external-docker-registries
redirect_from:
  - /docs/dockerhub/
toc: true
---
To configure Docker Hub so that your pipelines can push images to it, first select **Docker Hub** from the new registry drop down and then provide the following:

* Registry Name - a unique name for this configuration.
* Username - Docker Hub username.
* Password - Docker Hub [personal account token](https://docs.docker.com/docker-hub/access-tokens/) or Dockerhub account password (not recommended)

{% include image.html 
	lightbox="true" 
	file="/images/artifacts/registry/add-dockerhub-registry.png" 
	url="/images/artifacts/registry/add-dockerhub-registry.png" 
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

You can add additional Dockerhub accounts by using the *Other Registries* option from the drop-down.


{% include image.html 
	lightbox="true" 
	file="/images/artifacts/registry/second-dockerhub.png" 
	url="/images/artifacts/registry/second-dockerhub.png" 
	alt="Additional Docker Hub integrations" 
	caption="Additional Docker Hub integrations" 
	max-width="70%" 
%}


Use your Dockerhub credentials and `docker.com` as the domain.

Use the appropriate `registry name` value in your pipelines in order to decide which Dockerhub account will be used.

## What to read next

* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)





