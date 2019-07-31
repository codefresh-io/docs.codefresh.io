---
title: "Quay.io"
description: ""
group: docker-registries
sub_group: external-docker-registries
redirect_from:
  - /docs/quayio/
toc: true
---
To configure Quay.io first select **Other Registries** from the new registry drop down and then provide the following:

* Registry Name - A unique name for this configuration
* Username - Your Quay.io username
* Password - Your Quay.io encrypted password
* Domain - quay.io

{% include image.html lightbox="true" file="/images/artifacts/registry/add-quay-registry.png" url="/images/artifacts/registry/add-quay-registry.png" alt="Add Quay.io Docker Registry" max-width="60%" %}

## What to read next

* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)