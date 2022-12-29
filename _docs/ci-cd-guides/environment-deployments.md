---
title: "Deploying to predefined environments"
description: "Deploy to different production and staging environments from Codefresh pipelines"
group: ci-cd-guides
toc: true
---

With Codefresh, you can deploy a single application to multiple environments, such as, qa, staging, prod, and manage all of them with single or multiple pipelines.
This guide describes how an example application can be deployed with different configurations and various workflows for handling environment deployment.

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/image-promotion.png" 
url="/images/guides/promotion/image-promotion.png" 
alt="Using multiple environments" 
caption="Using multiple environments"
max-width="80%" 
%}

## Prerequisites

Before starting, you will need to: 
<!--- xrefs -->
 1. [Create a Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/)
 1. Get access to a Kubernetes cluster on any cloud provider
 1. [Connect the Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster/) to your account
 1. Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/){:target="\_blank"} and [helm](https://helm.sh/docs/intro/install/):target="\_blank"} and point them to your cluster
 1. Have [Docker](https://docs.docker.com/get-docker/){:target="\_blank"} installed locally (optional)

## Example application

As a running example, we will use a simple application with a Helm chart. [Helm is the package manager]({{site.baseurl}}/docs/deployments/helm/helm-best-practices/) for Kubernetes and has built-in support for passing different configuration settings for each environment.

You can find the example Helm application at [https://github.com/codefresh-contrib/helm-promotion-sample-app](https://github.com/codefresh-contrib/helm-promotion-sample-app){:target="\_blank"}. If you want to follow along feel free to fork it on your own account.

The application is a web page that prints out its own configuration as loaded from `/config/settings.ini`.
You can run the application locally on your own workstation with:

```
git clone https://github.com/codefresh-contrib/helm-promotion-sample-app.git
cd helm-promotion-sample-app
docker build . -t my-app
docker run -p 8080:8080 my-app
```

and then visit `http://localhost:8080` in your browser.

In this example, we use a settings file in the [INI format](https://en.wikipedia.org/wiki/INI_file){:target="\_blank"}, but the same things apply with other configuration methods such as env files, Java properties, YAML/JSON configurations etc. 

### Different environment configurations

The application includes a [Helm chart](https://github.com/codefresh-contrib/helm-promotion-sample-app/tree/master/chart/sample-app){:target="\_blank"} that contains values for three different environments:

* [values-qa.yaml](https://github.com/codefresh-contrib/helm-promotion-sample-app/blob/master/chart/values-qa.yaml){:target="\_blank"} for the "QA" environment
* [values-staging.yaml](https://github.com/codefresh-contrib/helm-promotion-sample-app/blob/master/chart/values-staging.yaml){:target="\_blank"} for the "Staging" environment
* [values-prod.yaml](https://github.com/codefresh-contrib/helm-promotion-sample-app/blob/master/chart/values-prod.yaml){:target="\_blank"} for the "Production" environment

The values contained in the files are both for the application (e.g. payment service URL), as well as the infrastructure level (number of replicas inside the cluster).
Note that the values for the application are dummy values that are not actually used by the application (they are simply shown in the web page). The number of replicas will take real effect on the cluster (the production configuration defines 2 replicas instead of 1).

>For simplicity reasons, the chart of the application is hosted in the same Git repository as the source code. As an alternative, you could also have a second Git repository with just the chart. Codefresh supports both ways.

### Manual deployment to different environments

First let's run the application manually in all three environments. Later we will automate the whole process with Codefresh pipelines. We wil create each environment as a namespace in the cluster:

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

At this point all three copies of the application should be up. You might need to wait some time until all the load balancers are up. You can see the running URLs with:

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

Note that the application uses a [Load Balancer](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/){:target="\_blank"} and this means extra costs on your cloud provider. When you are ready to clean up the application run the following:

```
helm uninstall example-staging -n staging
helm uninstall example-prod -n production
helm uninstall example-qa -n qa
```

Note that for this guide, all three environments run on the same cluster. In a real application, you should use a separate cluster for production, and never mix production and non-production workloads. Also notice that the chart refers to the `latest` tag of the application container which is **NOT** a recommended practice. In a real application the chart should specify a specific tag that is versioned.

## Basic deployment pipeline for different environments

Now that we have seen how manual deployment works, let's automate the whole process with Codefresh. We [will create a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/) that:

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

1. A [clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) to get the source code plus the Helm chart
1. A [build step]({{site.baseurl}}/docs/pipelines/steps/build/) to create and push the container image to Dockerhub
1. A [Helm  step]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/) to perform the deployment. The step has [pipeline conditions]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) to select which environment will be used.

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

1. Fork the [Git repository](https://github.com/codefresh-contrib/helm-promotion-sample-app){:target="\_blank"} to your own GitHub account
1. Commit a dummy change in the `master` branch, and you will see a deployment to the production namespace
1. Commit a dummy change to the `staging` branch or any other branch of your choosing, and you will see a deployment to the staging namespace.

Here is how the pipeline looks when a commit happens to a branch that is not `master`:

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

>Note that for brevity reasons, the pipeline deploys the Helm chart directly from the Git repo. In an actual pipeline, you [should also store the Helm chart
in a Helm repository]({{site.baseurl}}/docs/ci-cd-guides/helm-best-practices/#packagepush-and-then-deploy).

For more details on Helm deployments see our [dedicated Helm example]({{site.baseurl}}/docs/example-catalog/cd-examples/helm/). 

## Viewing your Helm Releases

The previous pipeline works great as an automation mechanism. Wouldn't it be great if you could also *visualize* your deployments? 
Codefresh includes a [Helm release dashboard]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/) to help you understand your deployments.

1. In the Codefresh UI, from the Ops section in the sidebar, select [Helm Releases](https://g.codefresh.io/helm/releases/releasesNew/){:target="\_blank"}.

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/helm-releases.png" 
url="/images/guides/promotion/helm-releases.png" 
alt="Helm releases" 
caption="Helm releases"
max-width="80%" 
%}

{:start="2"}
1. To get extra information such as the services exposed and active replicas for a release, click on the release.

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/services.png" 
url="/images/guides/promotion/services.png" 
alt="Helm service information" 
caption="Helm service information"
max-width="80%" 
%}

  In the History tab, you can view the deployment history, and even [rollback]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/#rolling-back-a-helm-release) to a previous release:

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/history.png" 
url="/images/guides/promotion/history.png" 
alt="Helm deployment history" 
caption="Helm deployment history"
max-width="80%" 
%}

  And most importantly in the Values tab, the values applied for each release.  
  This way you can also verify that the correct values are applied to the respective environment.

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/helm-values.png" 
url="/images/guides/promotion/helm-values.png" 
alt="Helm values used" 
caption="Helm values used"
max-width="80%" 
%}




## Using the Environment dashboard
Codefresh also includes an optional [environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/) that you can use to track down your environments and their current status. The dashboard is especially helpful if you have a large number of environments.

{% include
image.html
lightbox="true"
file="/images/guides/environments/environments.png"
url="/images/guides/environments/environments.png"
alt="Codefresh Environment Dashboard"
caption="Codefresh Environment Dashboard"
max-width="70%"
%}


To activate your environment dashboard you need to add an [env block]({{site.baseurl}}/docs/pipelines/deployment-environments/) to each of the deployment steps in the pipeline.
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


Notice that we use the `CF_COMMIT_MESSAGE` [variable]({{site.baseurl}}/docs/pipelines/variables/) to annotate each environment with each build message. After you deploy at least once to each environment, you should see the following in your [Environment dashboard](https://g.codefresh.io/environments).

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/deployment-dashboard.png" 
url="/images/guides/promotion/deployment-dashboard.png" 
alt="Environment inspection" 
caption="Environment inspection"
max-width="80%" 
%}

Just by looking at the builds of each environment, it is clear that the staging environment is one commit ahead (for feature 4689).
Clicking an environment shows several details such as active services, deployment history, rollback options, manifests rendered etc as in the Helm releases page.

## Using Approvals in a pipeline

Deploying straight to production after a commit is a worthy goal, but not all organizations want to work like this. In several cases, a human must approve a production deployment with a manual step. 

An alternative pipeline pattern is to have a single pipeline that automatically deploys to the "staging" environment but pauses before releasing to production. 

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/with-approval.png" 
url="/images/guides/promotion/with-approval.png" 
alt="Asking for approval before a production deployment" 
caption="Asking for approval before a production deployment"
max-width="80%" 
%}

Once the pipeline is paused, all project stakeholders can examine the state of the application in the staging environment (either manually or by running automated tests), and if everything looks good, promote the application to production.

This is easily accomplished through the [Codefresh approval step]({{site.baseurl}}/docs/pipelines/steps/approval/). The pipeline is stopped, and a yes/no button is shown in the UI. The pipeline can continue only if approved by selecting `yes`.

Here is the whole pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "staging"
  - "prod"

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
    stage: staging
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
  askForPermission:
    type: pending-approval
    stage: prod
    title: Deploy to production?
  deployProd:
    title: Deploying to Production
    type: helm
    stage: prod
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
{% endraw %}
{% endhighlight %}

The approval step has many more options such as a timeout or even choosing a different flow in the pipeline if the approval is declined.

## Using multiple pipelines for deployments

Having a single pipeline that deals with all deployment environments can work great with a small team. As an organization grows, and more steps are added to the pipeline, it becomes very hard to use conditions to enable/disable specific steps in pipelines.

With Codefresh, you can create as many pipelines as you want for a single project. It is therefore very easy to employ different simple pipelines for specific purposes, instead of working with a complex monolithic pipeline.

In our example we will create two pipelines:

1. The "staging" pipeline performs linting and security scans in the source code before creating the Docker image
1. The "production" pipeline runs integration tests *after* the creation of the Docker image

Here is how the staging pipeline looks:

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/staging-pipeline.png" 
url="/images/guides/promotion/staging-pipeline.png" 
alt="A pipeline only for staging deployments" 
caption="A pipeline only for staging deployments"
max-width="80%" 
%}

This pipeline uses [parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/#inserting-parallel-steps-in-a-sequential-pipeline) to run linting and security scanning at the same time. 

Here is the whole pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "validate"
  - "build"
  - "staging"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefresh-contrib/helm-promotion-sample-app"
    revision: '${{CF_REVISION}}'
    stage: "clone"
  prechecks:
    type: parallel
    stage: 'validate'
    steps:
      lint:
        title: Lint
        working_directory: "${{clone}}"
        image: golangci/golangci-lint:v1.33.0
        commands:
          - golangci-lint run -v .
      securityAnalysis:
        title: Security Scan
        working_directory: "${{clone}}"
        image: 'securego/gosec:v2.5.0'
        commands:
          - gosec ./...      
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
    stage: staging
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
{% endraw %}
{% endhighlight %}

The production pipeline assumes that the code has been scanned/validated already, and runs some integration tests as a final validation check before deploying the release to production:

{% include image.html 
lightbox="true" 
file="/images/guides/promotion/production-pipeline.png" 
url="/images/guides/promotion/production-pipeline.png" 
alt="A pipeline only for production deployments" 
caption="A pipeline only for production deployments"
max-width="80%" 
%}

This pipeline uses [service containers]({{site.baseurl}}/docs/pipelines/service-containers/) to run [integration tests]({{site.baseurl}}/docs/testing/integration-tests/). 

Here is the whole pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "testing"
  - "prod"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefresh-contrib/helm-promotion-sample-app"
    revision: '${{CF_REVISION}}'
    stage: "clone"   
  build_app_image:
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
  myTests:
    title: Integration Tests
    type: freestyle
    working_directory: "${{clone}}"
    stage: "testing"
    arguments:
      image: 'byrnedo/alpine-curl'
      commands:
        - "curl http://app:8080/health"
    services:
      composition:
        app:
          image: '${{build_app_image}}'
          ports:
            - 8080     
  deployProd:
    title: Deploying to Production
    type: helm
    stage: prod
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
{% endraw %}
{% endhighlight %}

Now that you have created the pipelines, you have several options on how to trigger them.  
Some common workflows are:

1. Automate the staging pipeline when a commit lands in `master`, and only launch the production pipeline manually.
1. Automate the staging pipeline when a commit lands in `master`, and use an [approval step]({{site.baseurl}}/docs/pipelines/steps/approval/) to call the production pipeline as a [child pipeline]({{site.baseurl}}/docs/example-catalog/ci-examples/call-child-pipelines/).
1. Set the [trigger]({{site.baseurl}}/docs/pipeline/triggers/git-triggers/) of the production pipeline to [launch only]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/#restricting-which-branches-to-build) on `master`, and the trigger of the staging pipeline to launch only for `non-master` branches.
1. Set the production pipeline to launch only for commits on `master`, and the staging pipeline only for pull requests (PRs).

The exact mechanism depends on the workflow of your team. For more information, see [the guide on branches and pull requests]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/), especially [trunk based development]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/#trunk-based-development), as a good starting point.

## Promoting releases between environments

If you have a large number of environments, we also suggest looking at the Helm promotion board provided by Codefresh.  
For more details, see [Helm promotion board]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/).


{% include 
image.html 
lightbox="true" 
file="/images/guides/environments/board.png" 
url="/images/guides/environments/board.png"
alt="Helm Promotion Dashboard" 
caption="Helm Promotion Dashboard" 
max-width="80%"
%}


## Related articles
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Pull requests and branches]({{site.baseurl}}/docs/ci-cd-guides/pull-request-branches/)  
[Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)  





