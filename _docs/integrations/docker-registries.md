---
title: "Docker Registries for pipeline integrations"
description: "Connect your Docker Registry to Codefresh CI pipelines"
group: integrations
redirect_from:
  - /docs/docker-registry/
  - /docs/docker-registries/external-docker-registries/
  - /docs/docker-registries/
  - /docs/codefresh-registry/  
  - /docs/docker-registries/codefresh-registry/
toc: true
---
Codefresh enables you to integrate with several Docker container registries, including (but not limited to):

* [Docker Hub](docker-hub)
* [Azure Container Registry](azure-docker-registry)
* [Google Container Registry](google-container-registry)
* [Google Artifact Registry](google-artifact-registry)
* [Amazon EC2 Container Registry](amazon-ec2-container-registry)
* [Bintray.io/Artifactory](bintray-io)
* [Quay.io](quay-io)
* [GitHub Container Registry](github-container-registry)

For a different registry choose to configure using the [Other](other-registries) option.

The registries can either be public or private.

## General Configuration


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.

{% include image.html
  lightbox="true"
  file="/images/integrations/codefresh-integrations.png"
  url="/images/integrations/codefresh-integrations.png"
  alt="Codefresh Account Integration"
  max-width="80%" %}

{:start="4"}
1. From the **Add Registry Provider** drop-down, select the regsitry type to add.

{% include image.html
  lightbox="true"
  file="/images/integrations/docker-registries/add-docker-registry.png"
  url="/images/integrations/docker-registries/add-docker-registry.png"
  alt="Add Docker Registry"
  max-width="45%" %}

{:start="5"}
1. Each configuration must be given a unique name, which you can later reference in a codefresh.yml file.

<!--- {% include image.html
  lightbox="true"
  file="/images/integrations/docker-registries/registry-name.png"
  url="/images/integrations/docker-registries/registry-name.png"
  alt="Specify Docker registry name"
  max-width="40%" %} -->

## Define fallback registry

Codefresh has a feature that allows users to designate a fallback registry for Docker integrations. If a Codefresh pipeline attempts to pull an image and that image fails for any reason (authorization issue, the registry server is down, etc.), a retry mechanism will attempt to pull it successfully. If this mechanism fails, the fallback registry feature provides the opportunity to pull the image from a different registry you have specified.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. In the list of registries, select the registry to configure as the fallback registry, and click **Edit**.
1. Expand **Advanced Options**, and select the registry from the **Fallback Registry** list.   
  You can also specify a fallback registry when creating a new integration as long as another integration exists.

## Using an optional repository prefix

For each supported Registry, define a prefix string for your Docker images to be used globally.

This is handy for registries that require a prefix (usually the name of an organization or repository) as you can set it once, instead of having each pipeline using the prefix by itself.

{% include image.html
  lightbox="true"
  file="/images/integrations/docker-registries/repository-prefix.png"
  url="/images/integrations/docker-registries/repository-prefix.png"
  alt="Setting a Registry prefix"
  caption="Setting a Registry prefix"
  max-width="60%"
  %}

See more details at [pushing Docker images]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#pushing-docker-images).

## Pushing an image

Once your registry configuration is all set up you can start pushing your images to it.

Within a [push step]({{site.baseurl}}/docs/pipelines/steps/push/), add your registry configuration name in the `registry` field

  `codefresh.yml`
{% highlight yaml %}
push_step:
  type: push
  description: Free text description
  candidate: {% raw %}${{build_step}}{% endraw %}
  tag: {% raw %}${{CF_BRANCH}}{% endraw %}
  registry: your-registry-configuration-name
{% endhighlight %}

For more details, see the [example for image push]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/).

## Internal caching registry

You can also select a single registry that will serve as your [caching registry]({{site.baseurl}}/docs/pipelines/pipeline-caching/#docker-registry-caching).

> You cannot select Dockerhub as a caching registry, because it has very strict requirements for naming images, and our caching mechanism needs capabilities which are not possible with Dockerhub.

Codefresh uses that registry efficiently to perform advanced caching logic for your builds by automatically:

* Checking the stored metadata to decide which past image is most relevant for caching purposes
* Pulling images from this registry for caching purposes
* Using that registry for distributed Docker layer caching to make your Docker builds faster

We give you the ability to define a separate registry for caching purposes for the following scenarios:

1. You don't want extra traffic to be sent to your main deployment registry.  Maybe you want to avoid bandwidth/storage limits in your production registry
1. You have lots of build steps in pipelines with intermediate docker images that you are certain you don't need outside of the pipeline itself. In that case you can use the `disable_push` property in those pipelines.
1. You have speed concerns regarding image pulling/pushing. For example your development team is in Europe, but your production servers are in the USA. You would probably choose a caching registry in a European region (so that developers get the best experience), where your main registry is in the USA (close to your production servers)

Therefore, in most cases you should make your main registry your caching registry as well. For extra control, you can either define a different caching registry or disable selectively automatic pushes with the `disable_push` property.

>Notice that the dynamic image feature of Codefresh (creating docker images on demand in the same pipeline that is using them) will always work regardless of a caching registry.

## Default registry

If you define more than one registry, you can select a registry as the default one. Codefresh uses the default registry in both [build]({{site.baseurl}}/docs/pipelines/steps/build/) and [push]({{site.baseurl}}/docs/pipelines/steps/push/) steps if they don't already include a `registry` property.  

> Successful build steps always push to the default Codefresh registry, unless you also define the `disable_push` property.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the context menu of the Docker registry integration to be used as the default registry, select **Set as default**. 
 


## Related articles 
[Examples of pushing Docker images]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  
