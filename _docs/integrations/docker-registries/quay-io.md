---
title: "Quay.io"
description: "Learn how to connect Quay registries to Codefresh"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/quayio/
  - /docs/docker-registries/external-docker-registries/quay-io/
toc: true
---
To configure Quay.io first select **Other Registries** from the new registry drop down and then provide the following:

* Registry Name - a unique name for this configuration.
* Username - your Quay.io username.
* Password - your Quay.io encrypted password.
* Domain - quay.io.

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/add-quay-registry.png" 
	url="/images/integrations/docker-registries/add-quay-registry.png" 
	alt="Add Quay.io Docker Registry" 
	max-width="60%" %}

## What to read next

* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)