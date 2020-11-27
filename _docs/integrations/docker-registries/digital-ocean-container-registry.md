---
title: "DigitalOcean Container Registry"
description: "Learn how to push Docker images to your DigitalOcean Container Registry"
group: integrations
sub_group: docker-registries
toc: true
---

You can use the [DigitalOcean Container Registry](https://www.digitalocean.com/products/container-registry/) as your Docker Registry in your Codefresh pipeline. 

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/digital-ocean/container-registry-do.png" 
	url="/images/integrations/docker-registries/digital-ocean/container-registry-do.png" 
	alt="Main Dashboard of the Container Registry in DigitalOcean"
	caption="Main Dashboard of the Container Registry in DigitalOcean" 
	max-width="100%" 
%}

## Overview: DigitalOcean Container Registry

The DigitalOcean Container Registry is directly integrated into your DigitalOcean Dashboard. While it is optional to use the DigitalOcean Container registry with your DigitalOcean Kubernetes cluster, it allows for easier integration between resources. 

The next sections will look at:
* Creating the DigitalOcean Container Registry
* Generating a DigitalOcean Access token
* Adding the DigitalOcean Container Registry to our Docker Registry in Codefresh
* Modifying the Build step in our Codefresh pipeline
* Viewing the built image in the DigitalOcean Container Registry

### Building and pushing a Container image with DigitalOcean and Codefresh

**Prerequisites:**
* A DigitalOcean account (your GitHub username)
* A DigitalOcean access token
* An application with a Dockerfile to build images

### Creating the DigitalOcean Container Registry

Once you are logged into your DigitalOcean Account, open the `Container Registry` tap and provide the name of your registry. Note that the name has to be unique. 

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/digital-ocean/create-registry.png" 
	url="/images/integrations/docker-registries/digital-ocean/create-registry.png" 
	alt="Create Container Registry in DigitalOcean"
	caption="Create Container Registry in DigitalOcean" 
	max-width="100%" 
%}

### Creating an access token

Now that we are already in DigitalOcean, we have to create an [access token](https://www.digitalocean.com/docs/apis-clis/api/create-personal-access-token/). For this head over to **API** in the bottom right of your left-side Menu under **Tokens/Keys** we can create a new access token. Note that it requires read and write access. Copy and paste the token somewhere secure and where you will find it again.

### Add the DigitalOcean Container Registry to our Docker Registry

Within your Codefresh Account go to:

**Codefresh Account => Account Settings (bottom left) => Docker Registries => Integrations => Docker Registries => Add Registry Provider => Other Registries**

Alternatively, you can [follow the direct link.](https://g.codefresh.io/account-admin/account-conf/integration/registryNew)

This should lead you to the following screen:

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/digital-ocean/codefresh-docker-registry.png" 
	url="/images/integrations/docker-registries/digital-ocean/codefresh-docker-registry.png" 
	alt="Codefresh Registry"
	caption="Codefresh Registry" 
	max-width="100%" 
%}

Adding a new Registry within **Other Registries**, we fill out the fields like so:
* Registry name: You can name it anyway you like
* Username: The DigitalOcean access token we created prior
* Password: The DigitalOcean access token we created prior
* URL: `registry.digitalocean.com`
* Optional, you can add your registry name to the advanced settings section. For instance, if you named it in Digital Ocean "anais-codefresh", you can ensure that every time the registry is used, it is automatically referenced in the build step of your pipeline.

### Modify your build step 

Within your Codefresh YAML file, we will have to modify the build step to push to our DigitalOcean Container Registry. Note that you do not have to specify the Registry if you set the DigitalOcean Container Registry as default registry.

We have added the following line to your build step:
`registry: "digital-ocean"`

Our full build step will look as such:

{% highlight yaml %}
{% raw %}
  build:
    title: "Building Docker image"
    type: "build"
    image_name: "anais-codefresh/react-article-display-do-registry"
    tags:
      - "1.0.0"
    dockerfile: "Dockerfile"
    registry: "digital-ocean"
{% endraw %}
{% endhighlight %}

Note that Codefresh builds AND pushes images both in the same step.

### Running the Pipeline and viewing the image in the DigitalOcean Container Registry

Once you modified the step, save and run your pipeline. In it's simplest form this will look as such:

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/digital-ocean/codefresh-pipeline.png" 
	url="/images/integrations/docker-registries/digital-ocean/codefresh-pipeline.png" 
	alt="Codefresh Pipeline"
	caption="Codefresh Pipeline" 
	max-width="100%" 
%}

We can then view our image in the DigitalOcean Container Registry:

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/digital-ocean/container-registry-do.png" 
	url="/images/integrations/docker-registries/digital-ocean/container-registry-do.png" 
	alt="DigitalOcean Container Registry"
	caption="DigitalOcean Container Registry" 
	max-width="100%" 
%}

## What to read next

* [Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)
* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)
