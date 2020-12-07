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

As a running example we will use a simple application with a Helm chart. [Helm is the package manager](https://helm.sh/docs/intro/using_helm/) for Kubernetes and has built-in support for passing different
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

>Note for simplicity the chart of the application is hosted in the same Git repository as the source code. As an alternative you could also
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

At this point all 3 copies of the application should be up. Allows some time for the load balancers to activate. You can see the running URLs with:

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

Note that for this guide all 3 environments are running on the same cluster. In a real application you should use a separate cluster for production and never mix production and non-production workloads.








Basic pipeline with master and !not master

Environment dashboard

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





