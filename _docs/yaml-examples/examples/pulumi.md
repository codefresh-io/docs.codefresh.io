---
title: "Deploy with Pulumi"
description: "Use Pulumi in a Codefresh pipeline with Docker"
group: yaml-examples
sub_group: examples
toc: true
---

[Pulumi](https://pulumi.io/) is a platform for *Infrastructure as Code*. It works like Terraform but allows you to use a proper programming language (Typescript , Python, Go) in order to describe your infrastructure (instead of a configuration language).

You can use Pulumi to deploy to Kubernetes or any other supported cloud platform. Because Pulumi itself is already offered [in a Docker container](https://hub.docker.com/r/pulumi/pulumi), it is very easy to run Pulumi in a Codefresh pipeline.

 
{% include image.html 
lightbox="true" 
file="/images/examples/pulumi/pulumi-pipeline.png" 
url="/images/examples/pulumi/pulumi-pipeline.png" 
alt="Running Pulumi inside Codefresh"
caption="Running Pulumi inside Codefresh"
max-width="80%" 
%}

## The example Pulumi project

You can see the example project at [https://github.com/codefresh-contrib/pulumi-sample-app](https://github.com/codefresh-contrib/pulumi-sample-app). The repository contains a simple Pulumi stack based on Kubernetes and Typescript.

You can play with it locally after installing the `pulumi` executable.

## Prerequisites

You need to create a Codefresh account and a Pulumi account first. Then you need to create a [Pulumi token](https://app.pulumi.com/account/tokens) which will allows Codefresh to communicate with Pulumi.

[Add a Kubernetes cluster](https://codefresh.io/docs/docs/deploy-to-kubernetes/add-kubernetes-cluster/) in your Codefresh account from any cloud provider.

Codefresh automatically creates a kubeconfig in any [Freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) with all your clusters. This is the same way that Pulumi communicated with Kubernetes, so the integration between Codefresh and Pulumi is ready out of the box.

Create a [stack](https://pulumi.io/reference/stack.html) in Pulumi or use the one provided in the example.

Finally add you Pulumi token as a pipeline variable called `PULUMI_ACCESS_TOKEN`. All freestyle steps have automatic access to all pipeline variables, and Pulumi will search for a token by default with this name when logging in.


## Running Pulumi with Codefresh

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
    title: Cloning main repository...
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    stage: prepare
    git: github-1
  BuildProject:
    title: Build project
    stage: build
    image: pulumi/pulumi
    commands:
      - yarn install
  SelectMyCluster:
    title: Select K8s cluster
    stage: deploy
    image: codefresh/kubectl:1.13.3
    commands: 
      - kubectl config get-contexts
      - kubectl config use-context "kostis-demo@FirstKubernetes"
  RunPulumi:
    title: Deploying
    stage: deploy
    image: pulumi/pulumi
    commands: 
      - pulumi stack select dev --non-interactive
      - pulumi stack --non-interactive
      - pulumi up --non-interactive
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. Runs `yarn install` to download dependencies. In this example we use Typescript, but Go and Python would work as well (or any other language supported by Pulumi)
1. Chooses the cluster that will be used for deployments (if you have more than one). Use your own cluster name as seen in the [Kubernetes dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/) of Codefresh.
1. Runs `pulumi up` with the same target cluster.


Run the pipeline and see your deployment succeed.

## Handling Pull requests

You can easily use the same pipeline or a different one for pull requests. In this case replace the `pulumi up` command with `pulumi preview`. Even better you can add an [approval step]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/) to allows humans to inspect the pipeline first.


## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)