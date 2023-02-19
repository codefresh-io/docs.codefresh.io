---
title: "Google Artifact Registry"
description: "Learn how to use Google Artifacrt Registry with Codefresh pipelines"
group: integrations
sub_group: docker-registries
toc: true
---
To configure Google Artifact Registry, select Google Artifact Registry from the new registry drop down and then provide the following:

* Registry Name - A unique name for this configuration.
* Key File - The contents of a JSON key file. See below for [instructions](#generating-a-json-key-file).

## Generating a JSON key file

The JSON key file holds your credentials for a given [Service Account](https://cloud.google.com/compute/docs/access/service-accounts). To generate your key file, follow these instructions:

1. Go to your [Cloud Platform Console Credentials page](https://console.cloud.google.com/apis/credentials).
2. Select the project that you want to use for the credentials.
3. To set up a new service account, click **Create credentials** and then select Service account key.
4. Choose the service account to use for the key.
5. Choose to download the service account's public/private key as a JSON file.

You can find the complete guide [here](https://support.google.com/cloud/answer/6158849#serviceaccounts).

## Working with multiple projects

If you have more than one repository/project in Google Cloud, you can connect multiple Artifact Registries and define one as the “primary” for the `*docker.pkg.dev` domain.

This option means that every time Codefresh needs to pull an image, it will use that integration. If you wish to use another project to pull images, you can use the `registry_context` property as described in [working with multiple registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain).
