---
title: "Other Registries"
description: ""
group: docker-registries
sub_group: external-docker-registries
redirect_from:
  - /docs/other-registries/
toc: true
---
To configure some other registry which is not officially provided by Codefresh first select **Other Registries** from the new registry drop down and then provide the following

* Registry Name - A unique name for this configuration
* Username - Your registry username
* Password - Your registry encrypted password
* Domain - Your registry address e.g. `mydomain.com`

{% include image.html lightbox="true" file="/images/artifacts/registry/add-other-docker-registry.png" url="/images/artifacts/registry/add-other-docker-registry.png" alt="Add Other Registries" max-width="60%" %}

## What to read next

* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/)
* [Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)