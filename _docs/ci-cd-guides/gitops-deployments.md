---
title: "GitOps deployments"
description: "Learn how to deploy with Codefresh and ArgoCD"
group: ci-cd-guides
toc: true
---

Apart from traditional push-based Helm deployments, Codefresh can also be used for GitOps deployments. GitOps deployments are powered by [ArgoCD](https://argoproj.github.io/argo-cd/) so you need an active ArgoCD installation in your cluster to take advantage of the GitOps dashboard in Codefresh.

## Connecting ArgoCD and Codefresh

Follow the instructions for [connecting ArgoCD to Codefresh](({{site.baseurl}}/docs/docs/integrations/argo-cd/)) and creating an ArgoCD application

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/argocd-provision-app.png" 
  url="/images/integrations/argocd/argocd-provision-app.png" 
  alt="Creating a new ArgoCD application in a Codefresh environment"
  caption="Creating a new ArgoCD application in a Codefresh environment"  
  max-width="40%"
 %}

 Once you connect your application you will see it under in the [Environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/) in the Codefresh UI.

## Working with the GitOps dashboard

After you create an ArgoCD application, you can click on it in the [Environments screen](https://g.codefresh.io/environment-v2/) and see the respective GitOps dashboard.


{% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/gitops-environment.png" 
  url="/images/guides/gitops/gitops-environment.png" 
  alt="GitOps Dashboard"
  caption="GitOps Dashboard"  
  max-width="100%"
 %}

This dashboard is the central place for monitoring your application and contains the following information:

1. Current health and sync status
1. Deployment graph that shows successful/failed deployments on the selected time period
1. Complete history of deployments according to Git hash. For each deployment you can also see which Pull Request was used for the commit, who was the committer and which JIRA issues this Pull request is solving.
1. The Kubernetes services that belong to this application (on the services tab)

The deployment status is fetched from your ArgoCD integration in a live manner. If at any point, the deployment is not synced with GIT, you will instantly see the out-of-sync status:

{% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/out-of-sync.png" 
  url="/images/guides/gitops/out-of-sync.png" 
  alt="Out of sync status"
  caption="Out of sync status"  
  max-width="60%"
 %}

For each Git hash Codefresh associates the respective Pull Request and Jira issue(s) that affected deployment. To achieve this correlation, Codefresh is enriching the Docker image(s) of the service during the CI process.

You can manually create these annotations with the [standard Codefresh annotation support]({{site.baseurl}}/docs/codefresh-yaml/annotations/) or via the built-in pipeline steps that we will see in the next section. 

### Filtering deployment history with the search field

The search field on the top right allows you to filter the deployment history table and view only a subset of deployments that match your criteria.

Apart from direct text search, the text field also supports a simple query language with the following keywords:

* `issues`
* `issue`
* `prs`
* `pr`
* `committer`
* `committers`
* `service`
* `services`
* `image`
* `images`
* `status`
* `statuses`

The following characters serve as delimiters
* `:` define the value for a keyword
* `,` define multiple values for a single keyword
* `;` define multiple criteria

{% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/search-history.png" 
  url="/images/guides/gitops/search-history.png" 
  alt="Searching deployment history"
  caption="Searching deployment history"  
  max-width="80%"
 %}

Some examples are:

* `pr:2` - filter the deployment history to show only a specific Pull request 
* `issues: SAAS-2111, SAAS-2222` - show only specific issues
* `issue: SAAS-2111; pr:3 ; service: my-app` - searching for multiple criteria in OR behavior

Using the search field allows you to quickly find a specific Git commit in the history of the application (and even rollback the deployment as explained in the next sections).

## Creating a basic CI pipeline for GitOps

Creating a CI pipeline for GitOps is no different that a [standard pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) that [packages your Docker images]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/), runs [tests]({{site.baseurl}}/docs/testing/unit-tests/), performs [security scans]({{site.baseurl}}/docs/testing/security-scanning/) etc.

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/basic-ci-pipeline.png" 
  url="/images/guides/gitops/basic-ci-pipeline.png" 
  alt="Basic CI pipeline"
  caption="Basic CI pipeline"  
  max-width="100%"
 %}

To take advantage of the GitOps dashboard facilities you also need to setup the correlation between the Docker image and the Pull Requests/issues associated with it. This correlation happens via [annotations]({{site.baseurl}}/docs/codefresh-yaml/annotations/). The easiest way to annotate your image is by using the [pipeline plugins](https://codefresh.io/steps/) offered by Codefresh for this purpose. Currently we offer the following plugins:



* [Record Pull Request information](https://codefresh.io/steps/step/image-enricher)
* [Record Jira Issue information](https://codefresh.io/steps/step/jira-issue-extractor)

Here is an example Pipeline definition:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "metadata"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "kostis-codefresh/simple-web-app"
    revision: '${{CF_REVISION}}'
    stage: "clone"
  build:
    title: "Building Docker image"
    type: "build"
    image_name: "kostiscodefresh/simple-web-app"
    working_directory: "${{clone}}"
    tags:
    - "latest"
    - '${{CF_SHORT_REVISION}}'
    dockerfile: "Dockerfile"
    stage: "build"
    registry: dockerhub  
  enrich-image:
    title: Add PR info
    type: image-enricher
    stage: "metadata"
    arguments:
      IMAGE:  docker.io/kostiscodefresh/simple-web-app:latest
      BRANCH: '${{CF_BRANCH}}'
      REPO: 'kostis-codefresh/simple-web-app'
      GIT_PROVIDER_NAME: github-1
  jira-issue-extractor:
    title: Enrich image with jira issues
    type: jira-issue-extractor
    stage: "metadata"
    fail_fast: false
    arguments:
      IMAGE: docker.io/kostiscodefresh/simple-web-app:latest
      JIRA_PROJECT_PREFIX: 'SAAS'
      MESSAGE: SAAS-8431
      JIRA_HOST: codefresh-io.atlassian.net
      JIRA_EMAIL: kostis@codefresh.io
      JIRA_API_TOKEN: '${{JIRA_TOKEN}}'
{% endraw %}
{% endhighlight %}  

This pipeline:

1. Checks out the source code of an application with the [git-clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. [Builds]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) a docker image
1. Annotates the Docker image with the Pull Request information provided by Github
1. Annotates the Docker image with a specific Jira issue ticket


You can see the associated metadata in your [Docker image dashboard](https://g.codefresh.io/images/)


 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/image-annotations.png" 
  url="/images/guides/gitops/image-annotations.png" 
  alt="Enriched Docker image"
  caption="Enriched Docker image"  
  max-width="80%"
 %} 

Codefresh is using this information to fill the deployment history in the GitOps dashboard.

## Creating a basic CD pipeline for GitOps

To create a CD pipeline in Codefresh that is responsible for GitOps deployments you must first disable the auto-sync behavior of ArgoCD. You can disable auto-sync either from the GUI or via the [command line](https://argoproj.github.io/argo-cd/user-guide/auto_sync/):

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/disable-auto-sync.png" 
  url="/images/guides/gitops/disable-auto-sync.png" 
  alt="Basic CD pipeline"
  caption="Basic CD pipeline"  
  max-width="80%"
 %}

 With the auto-sync behavior disabled, all Git pushes that happen on the GitOps repo will be ignored by ArgoCD (however ArgoCD will still mark your application as out-of-sync).

 You can now [create a new pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) in Codefresh using a [standard Git trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) that will monitor the GitOps repository for updates. This way Codefresh is responsible for the GitOps process instead of Argo.


 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/argo-sync-pipeline.png" 
  url="/images/guides/gitops/argo-sync-pipeline.png" 
  alt="Basic CD pipeline"
  caption="Basic CD pipeline"  
  max-width="80%"
 %}

The big advantage here is that you can construct a full pipeline over the sync process with multiple steps before or after the sync. For example you could run some smoke tests after the deployment takes place. Here is an example pipeline:


 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "pre sync"
  - "sync app"
  - "post sync"
steps:
  pre_sync:
    title: "Pre sync commands"
    type: "freestyle" # Run any command
    image: "alpine:3.9" # The image in which command will be executed
    commands:
      - echo "Sending a metrics marker"
    stage: "pre sync"
  sync_and_wait:
    title: Sync ArgoCD app and wait
    type: argocd-sync
    arguments:
      context: "argo-cd"
      app_name: "${{ARGOCD_APP_NAME}}"
      wait_healthy: true   
    stage: "sync app"
  post_sync:
    title: "Post sync commands"
    type: "freestyle" # Run any command
    image: "alpine:3.9" # The image in which command will be executed
    commands:
      - echo "running smoke tests"
    stage: "post sync"
{% endraw %}
{% endhighlight %}  

The pipeline is using the [argo-sync plugin](https://codefresh.io/steps/step/argocd-sync) that can be used by Codefresh to start the sync process of an application from the Git repo to the cluster.

The name of the `context` parameter should be the same name you used for your [ArgoCD integration]({{site.baseurl}}/docs/docs/integrations/argo-cd/).

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/argo-context.png" 
  url="/images/guides/gitops/argo-context.png" 
  alt="Using the Argo integration name as a context"
  caption="Using the Argo integration name as a context"  
  max-width="80%"
 %}

The name of the application should be the same name as the ArgoCD Application.

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/argo-application-name.png" 
  url="/images/guides/gitops/argo-application-name.png" 
  alt="Argo Application name"
  caption="Argo Application name"  
  max-width="80%"
 %}

 You can use pipeline variables or any other familiar Codefresh mechanism such as [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/).

 Once the pipeline has finished running the sync status will updated in your GitOps dashboard to reflect the current state.


## Rolling back Git versions

In the GitOps dashboard you will also see a complete history of all past deployments as recorded in Git. You can select any of the previous version and rollback your application to the respective version.

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/rollback.png" 
  url="/images/guides/gitops/rollback.png" 
  alt="Rolling back to a previous version"
  caption="Rolling back to a previous version"  
  max-width="80%"
 %}

The Rollback simply informs the cluster to use a different git hash for the sync process. It doesn't affect your Git repository and ArgoCD will now show your application as out-of-sync (because the last Git commit no longer matches the status of the cluster).

This rollback behavior is best used as an emergency measure after a failed deployment where you want to bring the cluster back to a previous state in a temporary manner. If you wish to keep the current rollback statue as a permanent status it is best to use the standard `git reset/revert` commands and change the GitOps repository to its desired state. 





## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [ArgoCD integration]({{site.baseurl}}/docs/docs/integrations/argo-cd/)
* [Environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)
* [Helm promotions]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/)





