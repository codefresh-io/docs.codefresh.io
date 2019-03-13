---
title: "External Docker Registries"
description: ""
group: docker-registries
redirect_from:
  - /docs/docker-registry/
toc: true
---
Codefresh enables you to integrate with several Docker container registries, including:

  * [Docker Hub]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/docker-hub/)
  * [Google Container Registry]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/google-container-registry/)
  * [Amazon EC2 Container Registry]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/)
  * [Bintray.io/Artifactory]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/bintray-io/)
  * [Quay.io]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/quay-io/)
  * [Other Registries]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/other-registries/)

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
Once your registry configuration is all set up you can start pushing you images to it.

Codefresh provides you with two options of how to push an image to a registry.

{:.text-secondary}
### Using the Pipelines view

{:start="1"}
1. Navigate to a repository **Pipelines** view

{:start="2"}
2. Under **Build and Unit Test** select your preconfigured registry.
{% include image.html lightbox="true" file="/images/22ecd84-pipeline-registry.png" url="/images/22ecd84-pipeline-registry.png" alt="Pipeline Registry" max-width="45%" %}

{:.text-secondary}
### Using a codefresh.yml file
In a push step you can place your registry configuration name in the `registry` field

  `codefresh.yml`
{% highlight yaml %}
push_step:
  type: push
  description: Free text description
  candidate: {% raw %}${{build_step}}{% endraw %}
  tag: {% raw %}${{CF_BRANCH}}{% endraw %}
  registry: <your-registry-configuration-name>
{% endhighlight %}



## What to read next

- [Push pipeline step]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/) 
- [Pushing docker images with the UI]({{site.baseurl}}/docs/docker-registries/push-image-to-a-docker-registry/) 
- [Examples of pushing Docker images]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/) 
