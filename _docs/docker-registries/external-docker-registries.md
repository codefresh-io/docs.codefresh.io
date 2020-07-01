---
title: "External Docker Registries"
description: ""
group: docker-registries
redirect_from:
  - /docs/docker-registry/
toc: true
---
Codefresh enables you to integrate with several Docker container registries, including:

  * [Docker Hub]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/)
  * [Azure Container Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/azure-docker-registry/)
  * [Google Container Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/google-container-registry/)
  * [Amazon EC2 Container Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/)
  * [Bintray.io/Artifactory]({{site.baseurl}}/docs/docker-registries/external-docker-registries/bintray-io/)
  * [Quay.io]({{site.baseurl}}/docs/docker-registries/external-docker-registries/quay-io/)
  * [Other Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/other-registries/)

For a different registry choose to configure using the [Other]({{site.baseurl}}/docs/docker-registries/external-docker-registries/other-registries/) option.

The registries can either be public or private.

## General configuration
To configure your registries go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *Docker Registry*.

{% include image.html lightbox="true" file="/images/integrations/codefresh-integrations.png" url="/images/integrations/codefresh-integrations.png" alt="Codefresh Account Integration" max-width="80%" %}

Add a new registry configuration from the drop down.

{% include image.html lightbox="true" file="/images/artifacts/registry/add-docker-registry.png" url="/images/artifacts/registry/add-docker-registry.png" alt="Add Docker Registry" max-width="45%" %}

Each configuration must be given a unique name, which you can later reference in a codefresh.yml file.

{% include image.html lightbox="true" file="/images/2924d81-registry-name.png" url="/images/2924d81-registry-name.png" alt="Specify Docker Registry Name" max-width="40%" %}

## Pushing an image

Once your registry configuration is all set up you can start pushing your images to it.

In a [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)  you can place your registry configuration name in the `registry` field

  `codefresh.yml`
{% highlight yaml %}
push_step:
  type: push
  description: Free text description
  candidate: {% raw %}${{build_step}}{% endraw %}
  tag: {% raw %}${{CF_BRANCH}}{% endraw %}
  registry: <your-registry-configuration-name>
{% endhighlight %}

For more details see the [the image pushing example]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/).

## Using an optional repository prefix

Codefresh allows you to setup globally for each supported Registry a prefix string for your Docker images.


This is handy for registries that require a prefix (usually the name of an organization or repository) as you can set it once, instead
of having each pipeline using the prefix by itself.

{% include image.html 
  lightbox="true" 
  file="/images/artifacts/registry/repository-prefix.png" 
  url="/images/artifacts/registry/repository-prefix.png" 
  alt="Setting a Registry prefix" 
  caption="Setting a Registry prefix"
  max-width="60%" 
  %}

See more details at [pushing Docker images]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#pushing-docker-images)


## Internal caching registry

You can also select a single registry that will serve as your [caching registry]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/#docker-registry-caching).

> You cannot select Dockerhub as a caching registry, because it has very strict requirements for naming images, and our caching mechanism needs capabilities which are not possible with Dockerhub.

Codefresh will efficiently use that registry to perform advanced caching logic for your builds

  * Codefresh will automatically examine the stored metadata to decide which past image is most relevant for caching purposes
  * Codefresh will automatically pull images from this registry for cache purposes
  * Codefresh will automatically use that registry for distributed Docker layer caching to make your Docker builds faster

We give you the ability to define a separate registry for caching purposes for the following scenarios

1. You don't want extra traffic to be sent to your main deployment registry.  Maybe you want to avoid bandwidth/storage limits in your production registry
1. You have lots of build steps in pipelines with intermediate docker images that you are certain you don't need outside of the pipeline itself. In that case you can use the `disable_push` property in those pipelines.
1. You have speed concerns regarding image pulling/pushing. For example your development team is in Europe, but your production servers are in the USA. You would probably choose a caching registry in a European region (so that developers get the best experience), where your main registry is in the USA (close to your production servers)

Therefore in most cases you should make your main registry your caching registry as well. For extra control you can either define a different caching registry or disable selectively automatic pushes with the `disable_push` property.

>Notice that the dynamic image feature of Codefresh (creating docker images on demand in the same pipeline that is using them) will always work regardless of a caching registry.

## The default registry

If you define more than one registries you can also click the *default* button in the UI to define the registry that will be used in both [build]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) and [push steps]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) if they don't already contain a `registry` property.

Notice that successful [build steps]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)  will always push to the default Codefresh registry unless you also define the `disable_push` property.


## What to read next


- [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
- [Push pipeline step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) 
- [Pushing docker images with the UI]({{site.baseurl}}/docs/docker-registries/push-image-to-a-docker-registry/) 
- [Examples of pushing Docker images]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/) 
