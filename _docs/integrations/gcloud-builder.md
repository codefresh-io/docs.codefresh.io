---
title: "Google Cloud Builder pipeline integration"
description: "Use the Google Cloud builder to create Docker images in Codefresh pipelines"
group: integrations
toc: true
---

Google Cloud builder is an online service that allows you to build Docker images using the Google infrastructure and also push them to the Google Cloud registry.

You can also use Cloud builder in a Codefresh pipeline in place of the  standard [build step]({{site.baseurl}}/docs/pipelines/steps/build/). This way you can take advantage of the Cloud builder in your Codefresh pipelines, but still push to other registries that are connected to Codefresh (and not just GCR).


## Prerequisites

To use the Cloud builder service in your Codefresh pipeline you need:

1. A free Docker Hub account and [Docker Hub connected to Codefresh]({{site.baseurl}}/docs/integrations/docker-registries/docker-hub/).
1. A Google Cloud subscription and a [service account for the Cloud builder service](https://cloud.google.com/cloud-build/docs/securing-builds/set-service-account-permissions){:target="\_blank"}.

Save your service account as a JSON file, and make sure you select at least the [following roles](https://cloud.google.com/container-registry/docs/access-control){:target="\_blank"}:

* Cloud storage Admin
* Storage Admin
* Storage Object Viewer
* Storage Object Creator

You will use this JSON file either by integrating a [Google Docker registry]({{site.baseurl}}/docs/integrations/docker-registries/google-container-registry/) in Codefresh, or directly in a pipeline as we will see later.

## How it works

The Google Cloud builder integration/authentication can be used in the following ways:

1. Authentication is retrieved from the GCR integration in your Codefresh account, and the resulting Docker image:
  * Is also be pushed to GCR.
  * Is pushed to any other [external registry connected to Codefresh]({{site.baseurl}}/docs/integrations/docker-registries/).
1. Authentication is defined in the pipeline itself, and the resulting image can be pushed to any registry connected to Codefresh

In the first case, you will define the service account file centrally in the GCR integration screen, and then any pipeline can authenticate to Google Cloud builder without any further configuration.

{% 
	include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/add-gcr-registry.png" 
	url="/images/integrations/docker-registries/add-gcr-registry.png" 
	alt="Using the JSON service account in Codefresh" 
	caption="Using the JSON service account in Codefresh"
	max-width="50%" 
%}



## Using Google Cloud builder in a Codefresh pipeline

In the most straightforward scenario, you want to create a Docker image with Google Cloud builder and also push to GCR.

{% include image.html 
lightbox="true" 
file="/images/integrations/gcloud-builder/build-push-gcr.png" 
url="/images/integrations/gcloud-builder/build-push-gcr.png"
max-width="90%"
caption="Using Google cloud builder in Codefresh"
alt="Using Google cloud builder in Codefresh"
%}

Here is the full pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/golang-sample-app'
    revision: master
    git: github
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-golang-image
    working_directory: ./
    tag: slim
    registry: gcr
    dockerfile: Dockerfile.multistage
    provider:
      type: gcb
      arguments:
        cache:
          repo: "my-kaniko-cache"
          ttl: "10h"
{% endraw %}            
{% endhighlight %}


The `build` step of the pipeline has an extra property, `provider`, that specifies we want to use Cloud builder instead of the Codefresh native build step.

The only required argument is the repository to be used for [Kaniko caching](https://cloud.google.com/cloud-build/docs/kaniko-cache){:target="\_blank"} and speed up subsequent builds. 

>Note that the Kaniko repo should NOT be the same as the repository used for the image itself.

{% include image.html 
lightbox="true" 
file="/images/integrations/gcloud-builder/image-dashboard.png" 
url="/images/integrations/gcloud-builder/image-dashboard.png"
max-width="70%"
caption="Inspecting an image from Google Cloud build"
alt="Inspecting an image from Google Cloud build"
%}

After runing the pipeline, you will see your Docker image in the [Image dashboard]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/).

The Docker image is also visible in the Google Cloud Console view of your registry.

### Pushing to a different registry

Even though the Cloud builder pipeline step authentication is fetched from the GCR configuration, you don't have to push to GCR.
To push the Docker image to another connected registry, simply change the `registry` property in the build step.  

The pipeline in the example below pushes the Docker image created to another registry that is identified by [Azure]({{site.baseurl}}/docs/integrations/docker-registries/azure-docker-registry/).

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/golang-sample-app'
    revision: master
    git: github
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-golang-image
    working_directory: ./
    tag: slim
    registry: azure
    dockerfile: Dockerfile.multistage
    provider:
      type: gcb
      arguments:
        cache:
          repo: "my-kaniko-cache"
          ttl: "10h"
{% endraw %}            
{% endhighlight %}



###  Authenticating to Cloud Builder in the pipeline

If you don't want to reuse the Registry integration provided by Codefresh for easy authentication to Google Cloud builder, you can also use your service account JSON file directly in the pipeline.

You can pass the contents of the JSON file as a variable in the pipeline and the build step will use it to authenticate. 

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/golang-sample-app'
    revision: master
    git: github
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-golang-image
    working_directory: ./
    tag: slim
    registry: azure
    dockerfile: Dockerfile.multistage
    provider:
      type: gcb
      arguments:
        google_app_creds: '${{G_CREDS_B64}}'
        cache:
          repo: "my-kaniko-cache"
          ttl: "10h"
{% endraw %}            
{% endhighlight %}

Here the pipeline will try to authenticate to Google Cloud builder using the contents of the `google_app_creds` property.

The value of this property can be a pipeline variable, or project variable or any other standard Codefresh method such as [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/).

You need to escape the contents of the service account before you use in the pipeline with either of these commands on your local workstation:

* `cat _json_key_file | base64 | tr -d ‘\n’`
* `cat _json_key_file | base64 -w 0`

### Using extra properties for Google Cloud builder

The build step has several other properties can be used to fine-tune the Google Cloud builder behavior.

Here is the full syntax:


{% highlight yaml %}
{% raw %}

step_name:
  type: build
  title: Step Title
  description: Free text description
  working_directory: ${{clone_step_name}}
  dockerfile: path/to/Dockerfile
  image_name: owner/new-image-name
  tag: develop
  build_arguments:
    - key=value
  target: stage1
  no_cache: false
  no_cf_cache: false
  fail_fast: false
  registry: my-registry
  provider:
    type: gcb
    arguments:
      google_app_creds: '${{G_CREDS_B64}}'
      cache:
        repo: "repositoryname/kaniko-cache"
        ttl: "10h"
      timeout: "600s"
      machineType: 'N1_HIGHCPU_8'
      logsBucket: "gs://your-project_cloudbuild/logs"
      diskSizeGb: 10

{% endraw %}        
{% endhighlight %} 

The extra fields are:

{: .table .table-bordered .table-hover}
| Field                                      | Description                                            | Required/Optional/Default |
| ------------------------------------------ | ------------------------------------------------------ | ------------------------- |
| `type`                                    | Defines which provider to use (currently `gcb` and `cf` types are available). It uses `cf` provider by default and the whole provider section can be omitted for a regular build step.   | Required                  |
| `arguments`                  | Parameters  for Google Cloud builder                                  | Required                  |
| `google_app_creds`           | base64 encoded string of the [Google app credentials JSON](https://cloud.google.com/docs/authentication/production){:target="\_blank"}. By default, taken from the existing GCR integration.   | Optional                  | 
| `cache`                  | The list of Kaniko cache parameters                             | Required                  |
| `repo`    | Docker repository path for the Kaniko cache                                  | Required                  |
| `ttl`    | Kaniko cache retention. Default value is `336h`                                  | Optional                 |
| `timeout`    | This field is directly translated into the corresponding field of the [GCB manifest file](https://cloud.google.com/cloud-build/docs/build-config#structure_of_a_build_config_file){:target="\_blank"}. Default is `10m`                                  | Optional                  |
| `machineType`    | This field is directly translated into the corresponding field of the [GCB manifest file](https://cloud.google.com/cloud-build/docs/build-config#structure_of_a_build_config_file){:target="\_blank"}.                                 | Optional                  |
| `diskSizeGb`    | This field is directly translated into the corresponding field of the [GCB manifest file](https://cloud.google.com/cloud-build/docs/build-config#structure_of_a_build_config_file){:target="\_blank"} .                               | Optional                  |
| `logsBucket`     | This field is directly translated into the corresponding field of the [GCB manifest file](https://cloud.google.com/cloud-build/docs/build-config#structure_of_a_build_config_file){:target="\_blank"}.           | Optional                  |




The step also accepts all the fields of the standard [build step]({{site.baseurl}}/docs/pipelines/steps/build/), but notice that the following fields are not supported in the current implementation and simply ignored by the GCB step logic:

* `no_cache`
* All the [buildkit]({{site.baseurl}}/docs/pipelines/steps/build/#buildkit-support)  related fields

Here is an example that uses all possible fields:

  `YAML`
{% highlight yaml %}
{% raw %}
GCBuild:
    type: build
    image_name: '${{IMAGE_NAME}}'
    working_directory: ${{CloneStep}}
    tag: your-tag1
    tags:
     - your-tag2
     - your-tag3
    target: 'test'
    no_cf_cache: false
    metadata:
      set:
        - qa: pending
    build_arguments:
      - WORD=Hello
    registry: 'reg-integration-name'
    dockerfile:
      content: |-
        FROM alpine as test
        RUN apk add skopeo
        ARG WORD
        RUN echo $WORD
    provider:
      type: gcb
      arguments:
        google_app_creds: '${{G_CREDS_B64}}'
        cache:
          repo: "repositoryname/kaniko-cache"
          ttl: "10h"
        timeout: "600s"
        machineType: 'N1_HIGHCPU_8'
        logsBucket: "gs://your-project_cloudbuild/logs"
        diskSizeGb: 10
{% endraw %}        
{% endhighlight %}






## Related articles
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Google Container Registry integration]({{site.baseurl}}/docs/integrations/docker-registries/google-container-registry/)  
[Build and push an image example]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)



