---
title: "Google Container Registry"
description: ""
group: docker-registries
sub_group: external-docker-registries
redirect_from:
  - /docs/google-cloud-registry/
toc: true
---
To configure GCR first select **Google Container Registry** from the new registry drop down and then provide the following

* Registry Name - A unique name for this configuration
* Key File - The contents of a JSON key file. See bellow for [instructions](#section-generating-a-json-key-file)

{% include image.html lightbox="true" file="/images/artifacts/registry/add-gcr-registry.png" url="/images/220c472-add-gcr-new.png" alt="Add Google Container Registry" max-width="60%" %}

## Generating a JSON key file
The JSON key file holds your credentials for a given [Service Account](https://cloud.google.com/compute/docs/access/service-accounts). To generate your key file follow these instructions

1. Go to your [Cloud Platform Console Credentials page](https://console.cloud.google.com/apis/credentials)
2. Select the project that you're creating credentials for.
3. To set up a new service account, click **Create credentials** and then select Service account key.
4. Choose the service account to use for the key.
5. Choose to download the service account's public/private key as a JSON file.

You can find the complete guide [here](https://support.google.com/cloud/answer/6158849#serviceaccounts).

## Working with multiple projects

If you have more than one repositories/projects in Google cloud, you have to configure a Google Service Account so that it can access all projects and then use it for the Codefresh integration.

Then you refer to the images according to the repository names, which correspond to the project names

Follow these steps:

1. Create a Service Account in GCP to use with Codefresh, if you have not created it
yet.
1. [Grant the created SA with proper privileges​](https://cloud.google.com/container-registry/docs/access-control) to access GCR ​**across different
projects​​**.
1. [Create a key for the SA](https://support.google.com/cloud/answer/6158849#serviceaccounts)
1. Use the created key to check login to GCR like this: ​`docker login -u _json_key -p "$(cat keyfile.json)" https://gcr.io`
1. Integrate the GCR with Codefresh using​ the [Other registries]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/other-registries/) option​:

* ​Registry name: `<arbitrary_name>`
* ​Username: `_json_key` (literally)
* Password: `<contents_of_the_keyfile.json>`
* ​Domain: `eu.gcr.io` or `us.gcr.io`

Then you can [refer to the registry​](https://cloud.google.com/container-registry/docs/pushing-and-pulling?hl=en_US) like this in [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/):

```
MyPushStep:
  title: pushing to Google Docker registry
  type: push
  candidate: <project_id>/<image_name>
  tag: <your_tag>
  registry: <registry_name_you_gave_in_step_5>
```

