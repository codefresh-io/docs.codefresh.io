---
title: "DigitalOcean Container Registry"
description: "Push Docker images to your DigitalOcean Container Registry with pipeline integration"
group: integrations
sub_group: docker-registries
toc: true
---

You can configure [DigitalOcean Container Registry](https://www.digitalocean.com/products/container-registry/){:target="\_blank"} as your Docker Registry, and use it in your Codefresh pipeline. 


The DigitalOcean Container Registry is directly integrated into your DigitalOcean Dashboard. While it is optional to use the DigitalOcean Container registry with your DigitalOcean Kubernetes cluster, it allows for easier integration between resources. 

The next sections will look at:
1. Creating the DigitalOcean Container Registry
2. Generating a DigitalOcean Access token
3. Adding the DigitalOcean Container Registry to our Docker Registry in Codefresh
4. Modifying the Build step in our Codefresh pipeline
5. Viewing the built image in the DigitalOcean Container Registry

## Building and pushing a container image with DigitalOcean and Codefresh

Building and pushing a container image with DigitalOcean and Codefresh, requires:  
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

Now that we are already in DigitalOcean, we have to create an [access token](https://www.digitalocean.com/docs/apis-clis/api/create-personal-access-token/){:target="\_blank"}. Note that it requires read and write access.
Select **API** at the bottom right of your left-side menu under **Tokens/Keys**.   
Copy and paste the token somewhere secure and where you will find it again.

## Set up DigitalOcean Container Registry integration


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Other Registries**.
1. Define the following:  
  * **Registry name**: A unique name for this configuration.
  * **Username**: The DigitalOcean access token you created.
  * **Password**: The DigitalOcean access token you created.
  * **Domain**: `registry.digitalocean.com`.  

  Optional, you can add your registry name to the advanced settings section. For instance, if you named it in Digital Ocean "anais-codefresh", you can ensure that every time the registry is used, it is automatically referenced in the build step of your pipeline.

<!--{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/digital-ocean/codefresh-docker-registry.png" 
	url="/images/integrations/docker-registries/digital-ocean/codefresh-docker-registry.png" 
	alt="DigitalOcean Container Registry settings"
	caption="DigitalOcean Container Registry settings" 
	max-width="100%" 
%}  -->

{:start="5"}
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.



### Modify your build step 

Within your Codefresh YAML file, modify the build step to push to the DigitalOcean Container Registry. If you set the DigitalOcean Container Registry as default registry, note that you do not have to specify the Registry.

Add the following line to your build step:
`registry: "digital-ocean"`

This is an example of the complete build step:

{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "anais-codefresh/react-article-display"
    # CF_BRANCH value is auto set when pipeline is triggered
    # Learn more at codefresh.io/docs/docs/codefresh-yaml/variables/
    revision: "${{CF_BRANCH}}"
    git: "github"
    stage: "clone"

  build:
    title: "Building Docker image"
    type: "build"
    image_name: "anais-codefresh/react-article-display-do-registry"
    tags: 
      - "1.0.0"
    working_directory: "${{clone}}"
    dockerfile: "Dockerfile"
    stage: "build"
    registry: "digital-ocean"
{% endraw %}
{% endhighlight %}

Note that Codefresh builds AND pushes images both in the same step.

### Running the pipeline and viewing the image in the DigitalOcean Container Registry

Once you have modified the step, save and run your pipeline. Below is an example of the pipeline in it's simplest form.

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/digital-ocean/codefresh-pipeline.png" 
	url="/images/integrations/docker-registries/digital-ocean/codefresh-pipeline.png" 
	alt="Codefresh Pipeline"
	caption="Codefresh Pipeline" 
	max-width="100%" 
%}

You can then view the image in the DigitalOcean Container Registry:

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/digital-ocean/container-registry-do.png" 
	url="/images/integrations/docker-registries/digital-ocean/container-registry-do.png" 
	alt="DigitalOcean Container Registry"
	caption="DigitalOcean Container Registry" 
	max-width="100%" 
%}

## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)  
[Building Docker images]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/)  
[Push step]({{site.baseurl}}/docs/pipelines/steps/push/)  
[Building and pushing an image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  

