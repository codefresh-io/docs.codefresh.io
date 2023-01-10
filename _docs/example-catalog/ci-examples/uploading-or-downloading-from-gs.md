---
title: "Upload/Download files to/from Google Storage"
description: "Upload and download a JAR from Google Storage from within a pipeline"
group: example-catalog
sub_group: ci-examples
toc: true
---

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A [Google Storage Bucket](https://cloud.google.com/storage/docs/creating-buckets){:target="\_blank"} with public read access
- A private key [downloaded](https://cloud.google.com/storage/docs/authentication#gsutilauth){:target="\_blank"} for the existing service account associated with your bucket (for this example, we base64 encoded the key for ease of use in a pipeline variable using `base64 key_file.json > key_file.b64`)

## Example Project

The example project is at [GitHub](https://github.com/codefresh-contrib/gcloud-storage-sample-app.git){:target="\_blank"}.  The application is a simple Scala Hello World application contained in a jar, with a dependency on a scala-library jar which we will download from the bucket and package into a Docker image.

Our project contains two pipelines, one to upload the dependency JAR _to_ our bucket, and the other to download the JAR _from_ the bucket.

## Create the first pipeline

The first pipeline contains one stage/step, to upload the JAR to the Google Storage Bucket.

{% include image.html 
lightbox="true" 
file="/images/examples/gs/gs-upload-pipeline.png"
url="/images/examples/gs/gs-upload-pipeline.png"
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="90%"
%}

You need to define a pipeline variable, KEY_FILE, in the pipeline settings:

{% include image.html 
lightbox="true" 
file="/images/examples/gs/gs-pipeline-vars.png"
url="/images/examples/gs/gs-pipeline-vars.png"
alt="Codefresh UI Pipeline Variables"
caption="Codefresh UI Pipeline Variables"
max-width="70%"
%}

Here is the first pipeline:

`codefresh-upload.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"

stages:
  - "upload"

steps:
  upload:
    title: "Uploading library jar to GS..."
    type: "freestyle"
    stage: "upload"
    arguments:
      image: "google/cloud-sdk:slim"
      commands:
        - echo $KEY_FILE | base64 --decode > key_file.json
        - gcloud auth activate-service-account --key-file=key_file.json
        - curl https://repo1.maven.org/maven2/org/scala-lang/scala-library/2.12.2/scala-library-2.12.2.jar | gsutil cp - gs://anna-demo-bucket/scala-library-2.12.2.jar
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Uploads a JAR from Maven into our Google Storage bucket through a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/). 

## Create the second pipeline

Our second pipeline has four stages:

- A stage for cloning the repository
- A stage for downloading the jar from the bucket
- A stage for building the image
- A stage for pushing the image to the repository

{% include image.html 
lightbox="true" 
file="/images/examples/gs/gs-download-pipeline.png"
url="/images/examples/gs/gs-download-pipeline.png"
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="90%"
%}

Here is the YAML for the second pipeline:

`codefresh-download.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"

stages:
  - "clone"
  - "download"
  - "build"
  - "push"

steps:
  clone:
    title: "Cloning main repository..."
    type: "git-clone"
    stage: "clone"
    arguments:
      repo: "codefresh-contrib/gcloud-storage-sample-app"
      git: "github"
      revision: "master"
  download:
    title: "Downloading dependency lib from GS..."
    type: "freestyle"
    stage: "download"
    working_directory: ${{clone}}
    arguments:
      image: "google/cloud-sdk:slim"
      commands:
        - gsutil cp gs://anna-demo-bucket/scala-library-2.12.2.jar .
  build:
    title: "Building docker image..."
    type: "build"
    stage: "build"
    working_directory: ${{clone}}
    arguments:
      image_name: "annabaker/gcloud-storage-sample-app"
      tag: "master"
  push_to_my_registry:
    stage: "push"
    type: "push"
    title: "Pushing to external registry..."
    arguments:
      candidate: ${{build}}
      tag: '1.0.0'
      registry: "dockerhub"  
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code through a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
2. Downloads the dependency JAR from our publicly-accessible Google Storage bucket through a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).
3. Builds a docker image through a [build step]({{site.baseurl}}/docs/pipelines/steps/build/).
4. Pushes the Docker image to the DockerHub registry you have integrated with Codefresh through a [push step](https://codefresh.io/docs/docs/pipelines/steps/push/).

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/ci-examples/)  
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)   


