---
title: "Deploy with Terraform"
description: "Use Terraform in a Codefresh pipeline with Docker"
group: yaml-examples
sub_group: examples
toc: true
---

[Terraform](https://www.terraform.io/) is a platform for *Infrastructure as Code*. It allows you to describe you cloud infrastructure in a declarative manner.

You can use Terraform to deploy to Kubernetes or any other supported cloud platform. Because Terraform itself is already offered [in a Docker container](https://hub.docker.com/r/hashicorp/terraform/), it is very easy to run Terraform in a Codefresh pipeline.

 
{% include image.html 
lightbox="true" 
file="/images/examples/terraform/terraform-pipeline.png" 
url="/images/examples/terraform/terraform-pipeline.png" 
alt="Running Terraform inside Codefresh"
caption="Running Terraform inside Codefresh"
max-width="80%" 
%}

## The example Terraform project

You can see the example project at [https://github.com/codefresh-contrib/terraform-sample-app](https://github.com/codefresh-contrib/terraform-sample-app). The repository contains a simple Terraform definition that creates a VM on Google cloud.

You can play with it locally after installing the `terraform` executable. 

## Prerequisites

You need to create a Codefresh account and a Google account first. Then you need to create a [Service account Key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) which will allow terraform to communicate with Google cloud.


Add your service account json as a pipeline variable called `ACCOUNT_JSON_CONTENT`. The content of this variable will be used
in order to authenticate to Google cloud.

## Create a CI/CD pipeline for Terraform

Here is the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - prepare   
  - deploy
steps:
  main_clone:
    title: Cloning main repository...
    stage: checkout
    type: git-clone
    repo: 'codefresh-contrib/terraform-sample-app'
    revision: master
    git: github      
  SetupAuth:
    image: alpine:3.9
    title: Setting up Google cloud auth
    stage: prepare
    commands:
      - echo $ACCOUNT_JSON_CONTENT > /codefresh/volume/account.json
      - cf_export GOOGLE_CLOUD_KEYFILE_JSON=/codefresh/volume/account.json
  DeployWithTerraform:
    image: hashicorp/terraform:0.12.0
    title: Deploying Terraform plan
    stage: deploy
    commands:
      - terraform init
      - terraform apply -auto-approve 

{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. Runs [cf_export]({{site.baseurl}}/docs/codefresh-yaml/variables/#exporting-environment-variables-from-a-freestyle-step) to create a pipeline variable with the path of the google service account
1. Runs `terraform init/apply` to create the VM on Google cloud.


Run the pipeline and see your deployment succeed.

Note that in a production pipeline you should also handle the [Terraform state](https://www.terraform.io/docs/state/) in a proper manner. The example provided is using a file for [state storage](https://www.terraform.io/docs/backends/index.html) which is not appropriate when using Terraform in a team environment.

## Handling Pull requests

You can easily use the same pipeline or a different one for pull requests. In this case replace the `terraform apply` command with `terraform plan`. Even better, you can add an [approval step]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/) to allow humans to inspect the pipeline first.


## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)