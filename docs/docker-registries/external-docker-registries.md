---
layout: docs
title: "External Docker Registries"
description: ""
group: docker-registries
redirect_from:
  - /docs/docker-registry
toc: true
---
Codefresh enables you to integrate with several Docker container registries, including:

  * [Docker Hub]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/docker-hub/)
  * [Google Container Registry]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/google-container-registry/)
  * [Amazon EC2 Container Registry]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/)
  * [Bintray.io]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/bintray-io/)
  * [Quay.io]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/quay-io/)
  * [Other Registries]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/other-registries/)

For a different registry choose to configure using the [Other]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/other-registries/) option.

The registries can either be public or private.

## General configuration
To configure your registries navigate to the **Docker Registry** view under `Account Management` &#8594; `Integrations`.

{% include image.html lightbox="true" file="/images/c355ce9-integrations-page.png" url="/images/c355ce9-integrations-page.png" alt="Codefresh Account Integration" max-width="45%" %}

Add a new registry configuration from the drop down.

{% include image.html lightbox="true" file="/images/cf0975d-add-registry.png" url="/images/cf0975d-add-registry.png" alt="Add Docker Registry" max-width="45%" %}

Each configuration must be given a unique name, which you can later reference in a Codefresh.yaml file.

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
### Using a Codefresh.yaml file
In a push step you can place your registry configuration name in the `registry` field

  `Codefresh.yaml`
{% highlight yaml %}
push_step:
  type: push
  description: Free text description
  candidate: {% raw %}${{build_step}}{% endraw %}
  tag: {% raw %}${{CF_BRANCH}}{% endraw %}
  registry: <your-registry-configuration-name>
{% endhighlight %}
