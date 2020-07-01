---
title: "Google Container Registry"
description: ""
group: docker-registries
sub_group: external-docker-registries
redirect_from:
  - /docs/google-cloud-registry/
toc: true
---
To configure GCR first select **Google Container Registry** from the new registry drop down and then provide the following:

* Registry Name - A unique name for this configuration
* Key File - The contents of a JSON key file. See below for [instructions](#section-generating-a-json-key-file)

{% include image.html lightbox="true" file="/images/artifacts/registry/add-gcr-registry.png" url="/images/220c472-add-gcr-new.png" alt="Add Google Container Registry" max-width="60%" %}

## Generating a JSON key file
The JSON key file holds your credentials for a given [Service Account](https://cloud.google.com/compute/docs/access/service-accounts). To generate your key file follow these instructions:

1. Go to your [Cloud Platform Console Credentials page](https://console.cloud.google.com/apis/credentials).
2. Select the project that you're creating credentials for.
3. To set up a new service account, click **Create credentials** and then select Service account key.
4. Choose the service account to use for the key.
5. Choose to download the service account's public/private key as a JSON file.

You can find the complete guide [here](https://support.google.com/cloud/answer/6158849#serviceaccounts).

## Working with multiple projects

If you have more than one repositories/projects in Google cloud, you can connect multiple GCR registries and define one as the "primary" for the gcr.io domain.

This means that every time Codefresh needs to pull an image it will use that integration. If you wish to use another project for pulling images,
you can use the `registry_context` property as described in [working with multiple registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain).


## What to read next

* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)