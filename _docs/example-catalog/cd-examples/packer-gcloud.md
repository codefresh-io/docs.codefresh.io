---
title: "Deploy to a Virtual Machine"
description: "Deploy to Google Cloud in a Codefresh pipeline with Packer"
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/yaml-examples/examples/packer-gcloud/
toc: true
---

Even though Codefresh is Kubernetes-native and designed for containers, it can still deploy traditional applications in the form of Virtual Machines to any Cloud provider.

In this example, we will use [Packer](http://www.packer.io/){:target="\_blank"} to package an application into a VM disk image that will then be launched in Google Cloud.
Because Packer itself is already offered [in a Docker container](https://hub.docker.com/r/hashicorp/packer/){:target="\_blank"}, it is very easy to run Packer in a Codefresh pipeline.

Google also offers a [Docker image for GCloud](https://hub.docker.com/r/google/cloud-sdk/){:target="\_blank"} making the launching of the VM straightforward in a Codefresh pipeline.

 
{% include image.html 
lightbox="true" 
file="/images/examples/packer-gcloud/packer-codefresh-pipeline.png" 
url="/images/examples/packer-gcloud/packer-codefresh-pipeline.png" 
alt="Running Packer inside Codefresh"
caption="Running Packer inside Codefresh"
max-width="80%" 
%}

This Codefresh pipeline creates a VM image and then uses it to launch a Google Compute instance.


## The example Packer/Gcloud project

You can see the example project at [https://github.com/codefresh-contrib/vm-packer-sample-app](https://github.com/codefresh-contrib/vm-packer-sample-app){:target="\_blank"}. The repository contains a simple Go application as well as a packer template.

You can play with it locally after installing the `packer` and `gcloud` executables. 

## Prerequisites

You need to create a Codefresh account and a Google account first. Then you need to create a [Service account Key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys){:target="\_blank"} which will allow `packer` and `gcloud` to communicate with Google cloud.


Add your service account json as a pipeline variable called `SERVICE_ACCOUNT`. The content of this variable will be used
in order to authenticate to Google cloud.

{% include image.html 
lightbox="true" 
file="/images/examples/packer-gcloud/service-account-variable.png" 
url="/images/examples/packer-gcloud/service-account-variable.png" 
alt="Using a Service Account JSON in Codefresh"
caption="Using a Service Account JSON in Codefresh"
max-width="50%" 
%}

## Create a CI/CD pipeline for Packer/GCloud

Here is the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
  - deploy
steps:
  main_clone:
    title: 'Cloning main repository...'
    type: git-clone
    repo: 'codefresh-contrib/vm-packer-sample-app'
    git: github
    revision: 'master'
    stage: prepare
  SetupAuth:
    title: 'Setup GCloud Auth'
    image: 'alpine'
    stage: prepare
    commands:
      - echo $SERVICE_ACCOUNT > account.json
  BuildMyApp:
    title: Compiling App code
    stage: build
    image: 'golang:1.12'
    commands:
      - go build -o sample src/sample/trivial-web-server.go   
  CreatePackerImage:
    title: Baking VM image
    stage: build
    image: 'hashicorp/packer'
    commands:
      - packer validate my-google-cloud-example.json
      - packer build -force my-google-cloud-example.json
  DeployToVM:
    title: Deploying to VM
    stage: deploy
    image: 'google/cloud-sdk'
    commands:
      - gcloud auth activate-service-account --key-file=account.json
      - gcloud config set project firstkubernetes-176201
      - gcloud compute instances create packer-demo-codefresh --image codefresh-simple-ubuntu-vm --zone europe-west1-b --metadata-from-file startup-script=startup.sh --tags http-server --preemptible --quiet

{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code through a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
1. Saves the content of the variable that holds the Google account as a file called `account.json`.
1. Compiles the Go application through a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).
1. Runs `packer` to create a VM image based on Ubuntu that also contains the simple Go application.
1. Runs `gcloud` to launch a VM with the image that was just created.


Run the pipeline and see your deployment succeed. You can customize the image by editing the [Packer template](https://github.com/codefresh-contrib/vm-packer-sample-app/blob/master/my-google-cloud-example.json){:target="\_blank"}.

Once the VM has finished launching you can access it with your web browser.

{% include image.html 
lightbox="true" 
file="/images/examples/packer-gcloud/web-app-url.png" 
url="/images/examples/packer-gcloud/web-app-url.png" 
alt="Accessing the VM application"
caption="Accessing the VM application"
max-width="70%" 
%}


You can follow the same procedure for any other cloud that has an API/CLI (such as AWS, Azure, Digital Ocean etc).

## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)