---
title: "Production and Staging deployments"
description: "Learn how to deploy to different environments from Codefresh pipelines"
group: ci-cd-guides
toc: true
---

With Codefresh you can deploy a single application to multiple environments (e.g. qa/staging/prod) and manage all of them with a single or multiple pipelines.
In this guide we will see how an example application can be deployed with different configurations and various workflows for handling environment deployment.

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/image-promotion.png" 
url="/images/guides/promotion/image-promotion.png" 
alt="Using multiple environments" 
caption="Using multiple environments"
max-width="80%" 
%}

## Prerequisites

Before starting you will need to: 

 1. [create a Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/)
 1. Get access to a Kubernetes cluster on any cloud provider
 1. [connect the Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) to your account
 1. install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and [helm](https://helm.sh/docs/intro/install/) and point them to your cluster
 1. have [Docker](https://docs.docker.com/get-docker/) installed locally (optional)

## The example application

As a running example we will use a simple application with a Helm chart. [Helm is the package manager]({{site.baseurl}}/docs/new-helm/helm-best-practices/) for Kubernetes and has built-in support for passing different
configuration settings for each environment.

You can find the example Helm application at [https://github.com/codefresh-contrib/helm-promotion-sample-app](https://github.com/codefresh-contrib/helm-promotion-sample-app). If you want to follow along feel free to fork it on your own account.

The application is a web page that prints out its own configuration as loaded from `/config/settings.ini`.
You can run the application locally on your own workstation with:

```
git clone https://github.com/codefresh-contrib/helm-promotion-sample-app.git
cd helm-promotion-sample-app
docker build . -t my-app
docker run -p 8080:8080 my-app
```

and then visit `http://localhost:8080` in your browser.

Notice that in this example we use a settings file in the [INI format](https://en.wikipedia.org/wiki/INI_file), but the same things apply with other configuration methods such as env files, Java properties, YAML/JSON configurations etc. 

### Different environment configurations

The application includes a [Helm chart](https://github.com/codefresh-contrib/helm-promotion-sample-app/tree/master/chart/sample-app) that contains values for 3 different environments:

* [values-qa.yaml](https://github.com/codefresh-contrib/helm-promotion-sample-app/blob/master/chart/values-qa.yaml) for the "QA" environment
* [values-staging.yaml](https://github.com/codefresh-contrib/helm-promotion-sample-app/blob/master/chart/values-staging.yaml) for the "Staging" environment
* [values-prod.yaml](https://github.com/codefresh-contrib/helm-promotion-sample-app/blob/master/chart/values-prod.yaml) for the "Production" environment

The values contained in the files are both for the application (e.g. payment service URL) as well as the infrastructure level (number of replicas inside the cluster.)
Note however that the application values are dummy and are not actually used by the application (they are simply shown in the web page). The number of replicas will take real effect on the cluster (the production configuration defines 2 replicas instead of 1).

>Note that for simplicity reasons, the chart of the application is hosted in the same Git repository as the source code. As an alternative you could also
have a second Git repository with just the chart. Codefresh supports both ways.

### Manual deployment to different environments

First let's run the application manually in all 3 environments. Later we will automate the whole process with Codefresh pipelines. We wil create each environment as a namespace in the cluster:

```
kubectl create namespace qa
kubectl create namespace staging
kubectl create namespace production
```

Then we will install a copy on the application on each environment with the different values

```
git clone https://github.com/codefresh-contrib/helm-promotion-sample-app.git
cd helm-promotion-sample-app/chart
helm install example-qa sample-app -n qa -f values-qa.yaml
helm install example-staging sample-app -n staging -f values-staging.yaml
helm install example-prod sample-app -n production -f values-prod.yaml
```

At this point all 3 copies of the application should be up. You might need to wait some time until all the load balancers are up. You can see the running URLs with:

```
kubectl get service -A
```

If you visit the URL of each service in your browser you will see how the application looks in each environment.

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/different-settings.png" 
url="/images/guides/promotion/different-settings.png" 
alt="Settings per environment" 
caption="Settings per environment"
max-width="50%" 
%}

Note that the application is using a [Load Balancer](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/) and this means extra costs on your cloud provider. When you are ready to clean up the application run the following:

```
helm uninstall example-staging -n staging
helm uninstall example-prod -n production
helm uninstall example-qa -n qa
```

Note that for this guide all 3 environments are running on the same cluster. In a real application you should use a separate cluster for production and never mix production and non-production workloads. Also notice that the chart refers to the `latest` tag of the application container which is **NOT** a recommended practice. In a real application the chart should specify a specific tag that is versioned.

## Basic deployment pipeline for different environments

Now that we have seen how manual deployment works, let's automate the whole process with Codefresh. We [will create a pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) that:

1. Deploys all commits to the `master` branch in the production environment
1. Deploys all other commits to the staging environment

Here is a commit to master looks like:

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/production-deployment.png" 
url="/images/guides/promotion/production-deployment.png" 
alt="Production deployment" 
caption="Production deployment"
max-width="80%" 
%}

This is a very simple workflow perfect for small teams that follow Continuous Deployment. You can use the same pattern in other workflows such as [trunk based development]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/#trunk-based-development).

The pipeline has the following steps

1. A [clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) to get the source code plus the Helm chart
1. A [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) to create and push the container image to Dockerhub
1. A [Helm  step]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/) to perform the deployment. The step has [pipeline conditionals]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) to select which environment will be used.

Here is the full pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "deployment"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefresh-contrib/helm-promotion-sample-app"
    revision: '${{CF_REVISION}}'
    stage: "clone"

  build:
    title: "Building Docker image"
    type: "build"
    image_name: "kostiscodefresh/helm-promotion-app"
    working_directory: "${{clone}}"
    tags:
    - "latest"
    - '${{CF_SHORT_REVISION}}'
    dockerfile: "Dockerfile"
    stage: "build"
    registry: dockerhub  
  deployStaging:
    title: Deploying to Staging
    type: helm
    stage: deployment
    working_directory: ./helm-promotion-sample-app
    arguments:
      action: install
      chart_name: ./chart/sample-app
      release_name: example-staging
      helm_version: 3.0.2
      kube_context: 'mydemoAkscluster@BizSpark Plus'
      namespace: staging
      custom_value_files:
      - ./chart/values-staging.yaml
    when:
      branch:
        ignore:
          - master 
  deployProd:
    title: Deploying to Production
    type: helm
    stage: deployment
    working_directory: ./helm-promotion-sample-app
    arguments:
      action: install
      chart_name: ./chart/sample-app
      release_name: example-prod
      helm_version: 3.0.2
      kube_context: 'mydemoAkscluster@BizSpark Plus'
      namespace: production
      custom_value_files:
      - ./chart/values-prod.yaml
    when:
      branch:
        only:
          - master  
{% endraw %}
{% endhighlight %}

To test the pipeline and see how it behaves with different environments:

1. Fork [the Git repository](https://github.com/codefresh-contrib/helm-promotion-sample-app) to your own Github account
1. Commit a dummy change in the `master` branch and you will see a deployment to the production namespace
1. Commit a dummy change to the `staging` branch or any other branch of your choosing and you will see a deployment to the staging namespace.

Here is how the pipeline looks when a commit happens to another branch (that is not `master`)

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/non-production-deployment.png" 
url="/images/guides/promotion/non-production-deployment.png" 
alt="Staging deployment" 
caption="Staging deployment"
max-width="80%" 
%}

As you can see the step that deploys to production is now skipped, and the step that deploys to staging is enabled.

This is a great starting point for your own workflows. Codefresh can handle more complicated scenarios as you will see in the later sections.

>Note that for brevity reasons, the pipeline deploys the Helm chart directly from the Git repo. In a real pipeline you [should also store the Helm chart
in a Helm repository]({{site.baseurl}}/docs/new-helm/helm-best-practices/#packagepush-and-then-deploy).

For more details on Helm deployments see our [dedicated Helm example]({{site.baseurl}}/docs/yaml-examples/examples/helm/). 

## Using the Environment Dashboard

The previous pipeline works great as an automation mechanism. Wouldn't it be great if you could also *see* your deployment environments in a visual manner? 
Codefresh includes [an environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/) that you can use to track down your environments and their current status.

{% include
image.html
lightbox="true"
file="/images/codefresh-yaml/environments/environments.png"
url="/images/codefresh-yaml/environments/environments.png"
alt="Codefresh Environment Dashboard"
caption="Codefresh Environment Dashboard"
max-width="70%"
%}

To activate your environment dashboard you need to add an [env block]({{site.baseurl}}/docs/codefresh-yaml/deployment-environments/) to each of the deployment steps in the pipeline.
Here is the whole pipeline:


`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "deployment"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefresh-contrib/helm-promotion-sample-app"
    revision: '${{CF_REVISION}}'
    stage: "clone"

  build:
    title: "Building Docker image"
    type: "build"
    image_name: "kostiscodefresh/helm-promotion-app"
    working_directory: "${{clone}}"
    tags:
    - "latest"
    - '${{CF_SHORT_REVISION}}'
    dockerfile: "Dockerfile"
    stage: "build"
    registry: dockerhub  
  deployStaging:
    title: Deploying to Staging
    type: helm
    stage: deployment
    working_directory: ./helm-promotion-sample-app
    arguments:
      action: install
      chart_name: ./chart/sample-app
      release_name: example-staging
      helm_version: 3.0.2
      kube_context: 'mydemoAkscluster@BizSpark Plus'
      namespace: staging
      custom_value_files:
      - ./chart/values-staging.yaml
    when:
      branch:
        ignore:
          - master 
    env:
      name: Acme Staging
      endpoints:
      - name: app
        url: https://staging.example.com
      type: helm-release
      change: ${{CF_COMMIT_MESSAGE}}
      filters:
      - cluster: 'mydemoAkscluster@BizSpark Plus'
        releaseName: example-staging  
  deployProd:
    title: Deploying to Production
    type: helm
    stage: deployment
    working_directory: ./helm-promotion-sample-app
    arguments:
      action: install
      chart_name: ./chart/sample-app
      release_name: example-prod
      helm_version: 3.0.2
      kube_context: 'mydemoAkscluster@BizSpark Plus'
      namespace: production
      custom_value_files:
      - ./chart/values-prod.yaml
    when:
      branch:
        only:
          - master  
    env:
      name: Acme Production
      endpoints:
      - name: app
        url: https://production.example.com
      type: helm-release
      change: ${{CF_COMMIT_MESSAGE}}
      filters:
      - cluster: 'mydemoAkscluster@BizSpark Plus'
        releaseName: example-prod
{% endraw %}
{% endhighlight %}


Notice that we use the `CF_COMMIT_MESSAGE` [variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) to annotate each environment with each build message. After your deploy at least once to each environment you should see the following in your [dashboard](https://g.codefresh.io/environments).

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/deployment-dashboard.png" 
url="/images/guides/promotion/deployment-dashboard.png" 
alt="Environment inspection" 
caption="Environment inspection"
max-width="80%" 
%}

Just by looking at the builds of each environment, it is clear that the staging environment is one commit ahead (for feature 4689).
If you click on each environment you will see several details such as active services, deployment history, rollback options, manifests rendered etc as in the Helm releases page.

## Using Approvals in a pipeline

Basic pipeline with approval

Parallel deployment

Different pipelines

Helm promotion board manual

Helm promotion board automated




## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)





