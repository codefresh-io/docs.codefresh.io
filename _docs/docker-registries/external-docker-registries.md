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

{% include image.html lightbox="true" file="/images/2924d81-registry-name.png" url="/images/2924d81-registry-name.png" alt="Specify Docker Registry Name" max-width="65%" %}

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

For more details see the [image pushing page]({{site.baseurl}}/docs/docker-registries/push-image-to-a-docker-registry/).

## The default registry

If you define more than one registries you can also click the *default* button in the UI to define the registry that will be used in both [build]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) and [push steps]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) if they don't already contain a `registry` property.

Notice that successful [build steps]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)  will always push to the default Codefresh registry unless you also define the `disable_push` property.


## What to read next


- [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
- [Push pipeline step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) 
- [Pushing docker images with the UI]({{site.baseurl}}/docs/docker-registries/push-image-to-a-docker-registry/) 
- [Examples of pushing Docker images]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/) 
