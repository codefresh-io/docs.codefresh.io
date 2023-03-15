---
title: "Deploy with Terraform"
description: "Use Terraform in a Codefresh pipeline with Docker"
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/yaml-examples/examples/terraform/
toc: true
---

[Terraform](https://www.terraform.io/){:target="\_blank"} is a platform for *Infrastructure as Code*. It allows you to describe your cloud infrastructure in a declarative manner.

You can use Terraform to deploy to Kubernetes or any other supported cloud platform. Because Terraform itself is already offered [in a Docker container](https://hub.docker.com/r/hashicorp/terraform/){:target="\_blank"}, it is very easy to run Terraform in a Codefresh pipeline.

 
{% include image.html 
lightbox="true" 
file="/images/examples/terraform/terraform-pipeline.png" 
url="/images/examples/terraform/terraform-pipeline.png" 
alt="Running Terraform inside Codefresh"
caption="Running Terraform inside Codefresh"
max-width="80%" 
%}


> Note that this page explains how to run Terraform inside a Codefresh pipeline. If you want to use Terraform to manage Codefresh itself see the [Terraform provider](https://registry.terraform.io/providers/codefresh-io/codefresh/latest).

## The example Terraform project

You can see the example project at [https://github.com/codefresh-contrib/terraform-sample-app](https://github.com/codefresh-contrib/terraform-sample-app){:target="\_blank"}. The repository contains a simple Terraform definition that creates a VM on Google cloud.

You can play with it locally after installing the `terraform` executable. 

## Prerequisites

You need to [create a Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/) and a Google account first. Then you need to create a [Service account Key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys){:target="\_blank"} which will allow terraform to communicate with Google cloud.


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

1. Clones the source code through a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
1. Creates a pipeline variable with the path of the Google service account by running [cf_export]({{site.baseurl}}/docs/pipelines/variables/#exporting-environment-variables-from-a-freestyle-step). 
1. Creates the VM on Google cloud by running `terraform init/apply`.

>For simplicity, we auto-approve the Terraform plan in the example pipeline. In a production pipeline, you would instead use an [approval step]({{site.baseurl}}/docs/pipelines/steps/approval/) to inspect the plan before actually applying it.

The pipeline needs a [single environment variable]({{site.baseurl}}/docs/pipelines/variables/) that holds the content of the service account.


{% include image.html 
lightbox="true" 
file="/images/examples/terraform/google_cloud_json.png" 
url="/images/examples/terraform/google_cloud_json.png" 
alt="Passing the Google account in the pipeline parameters"
caption="Passing the Google account in the pipeline parameters"
max-width="60%" 
%}


Run the pipeline and see your deployment succeed.


Note that in a production pipeline you should also handle the [Terraform state](https://www.terraform.io/docs/state/){:target="\_blank"} in a proper manner. The example provided is using a file for [state storage](https://www.terraform.io/docs/backends/index.html){:target="\_blank"} which is not appropriate when using Terraform in a team environment. Instead you should use one of the [storage backends](https://www.terraform.io/docs/backends/types/index.html){:target="\_blank"} that support High Availability and Locking.




## Handling Pull requests

You can easily use the same pipeline or a different one for pull requests. In this case replace the `terraform apply` command with `terraform plan`. Even better, you can add an [approval step]({{site.baseurl}}/docs/pipelines/steps/approval/) to allow humans to inspect the pipeline first.


## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)
