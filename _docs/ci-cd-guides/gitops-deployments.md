---
title: "GitOps deployments"
description: "Deploy with Codefresh and ArgoCD"
group: ci-cd-guides
toc: true
---

Apart from traditional push-based Helm deployments, Codefresh can also be used for [GitOps deployments](https://codefresh.io/gitops/).

## What is GitOps

GitOps is the practice of performing Operations via Git only. The main principles of GitOps are the following:

* The state of the system/application is always stored in Git.
* Git is always the source of truth for what happens in the system.
* If you want to change the state of the system you need to perform a Git operation such as creating a commit or opening a pull request. Deployments, tests, and rollbacks controlled through git flow.
* Once the Git state is changed, then the cluster (or whatever your deployment target is) state should match what is described in the Git repository.
* No hand rolled deployments, no ad-hoc cluster changes, no live configuration changes are allowed. If a change needs to happen, it must be committed to Git first.

GitOps deployments have several advantages compared to traditional imperative deployments. The main one is that the Git repo represents the state of the system, and Git history
is essentially the same thing as deployment history. Rollbacks are very easy to perform by simply using a previous Git hash.

Even though GitOps is not specific to Kubernetes, current GitOps tools work great with Kubernetes in the form of cluster controllers. The GitOps controller monitors the state of the Git repository and when a commit happens, the cluster is instructed to match the same state.

Codefresh has native support for GitOps including a graphical dashboard for handling your GitOps deployments:

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/gitops-dashboard.png"
  url="/images/guides/gitops/gitops-dashboard.png"
  alt="The GitOps dashboard"
  caption="The GitOps dashboard"  
  max-width="100%"
 %}

This guide will explain how you can use GitOps for your own applications.

## Setting up your Git Repositories

One of the central ideas around GitOps is the usage of Git for ALL project resources. Even though developers are familiar with using Git for the source code of the application, adopting GitOps means that you need to store in Git every other resource of the application (and not just the source code).

In the case of Kubernetes, this means that all Kubernetes manifests should be stored in a Git repository as well. In the most simple scenario you have the main repository of your application (this is mostly interesting to developers) and [a second Git repository with Kubernetes manifests](https://argoproj.github.io/argo-cd/user-guide/best_practices/#separating-config-vs-source-code-repositories) (this is more relevant to operators/SREs).

As a running example you can use:

* The [https://github.com/codefresh-contrib/gitops-app-source-code](https://github.com/codefresh-contrib/gitops-app-source-code) repository for the application code
* The [https://github.com/codefresh-contrib/gitops-kubernetes-configuration](https://github.com/codefresh-contrib/gitops-kubernetes-configuration) repository for the Kubernetes configuration
* The [https://github.com/codefresh-contrib/gitops-pipelines](https://github.com/codefresh-contrib/gitops-pipelines) repository that holds the pipelines

The application code repository contains the source code plus a dockerfile. You can use any Git workflow for this repository. We will set a pipeline in Codefresh that creates a container image on each commit.

The configuration repository holds the kubernetes manifests. This is one of the critical points of GitOps

* The configuration repository holds the manifests that are also present in the Kubernetes cluster
* Every time a commit happens to the configuration repository the cluster will be notified to deploy the new version of the files (we will setup a pipeline for this)
* Every subsequent configuration change should become a Git commit. Ad-hoc changes to the cluster (i.e. with `kubectl` commands) are **NOT** allowed

We also have a third Git repository for pipelines, because pipelines are also part of the application.

Before continuing fork all 3 repositories in your own GitHub account if don't have already your own example application.

## Connecting ArgoCD and Codefresh

GitOps deployments are powered by [ArgoCD](https://argoproj.github.io/argo-cd/) so you need an active ArgoCD installation in your cluster to take advantage of the GitOps dashboard in Codefresh.

Follow the instructions for [connecting ArgoCD to Codefresh]({{site.baseurl}}/docs/integrations/argocd/) and creating an ArgoCD application

{% include image.html
  lightbox="true"
  file="/images/integrations/argocd/argocd-provision-app.png"
  url="/images/integrations/argocd/argocd-provision-app.png"
  alt="Creating a new ArgoCD application in a Codefresh environment"
  caption="Creating a new ArgoCD application in a Codefresh environment"  
  max-width="40%"
 %}

The options are:

* Name - User defined name of the Codefresh environment dashboard
* Project - A way to [group/secure applications](https://argoproj.github.io/argo-cd/user-guide/projects/). Choose default if you have only one project in ArgoCD.
* Application - name of application
* Manual/automatic sync - If automatic when a git commit happens, a deployment will automatically take place.
* Use schema - Kubernetes manifests will be checked for correctness before deployed to the cluster
* source repository - Git repository that holds your Kubernetes manifests
* revision - Revision to be checked out when a deployment happens
* path - folder inside the Git repository that should be searched for manifests (if your Git repo has multiple applications). Use `./` if all your manifests are in the root folder.
* cluster - Kubernetes cluster when deployment will take place
* namespace - Kubernetes namespace where the application will be deployed to
* directory recurse - whether to check all folders in the Git repository for manifests in a recursive way.

For a sample application you can use the [https://github.com/codefresh-contrib/gitops-kubernetes-configuration](https://github.com/codefresh-contrib/gitops-kubernetes-configuration) repository. Fork the project in your own GitHub account and use that link in the *Source repository* section.

Once you connect your application you will see it under in the GitOps application screen in the Codefresh UI.

## Creating a basic CI Pipeline for GitOps

Creating a CI pipeline for GitOps is no different than a [standard pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) that [packages your Docker images]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/), runs [tests]({{site.baseurl}}/docs/testing/unit-tests/), performs [security scans]({{site.baseurl}}/docs/testing/security-scanning/) etc.

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
    repo: "my-github-username/gitops-app-source-code"
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

## Creating a basic CD Pipeline for GitOps

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

The name of the `context` parameter should be the same name you used for your [ArgoCD integration]({{site.baseurl}}/docs/integrations/argocd/).

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

## Working with the GitOps Dashboard

After you create an ArgoCD application, you can click on it in the [GitOps environment overview](https://g.codefresh.io/gitops) and see the respective GitOps screen.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/real-dashboard.png"
  url="/images/guides/gitops/real-dashboard.png"
  alt="GitOps Dashboard"
  caption="GitOps Dashboard"  
  max-width="100%"
 %}

This dashboard is the central place for monitoring your application and contains the following information:

1. Current health and sync status
1. Deployment graph that shows successful/failed deployments on the selected time period
1. Complete history of deployments according to Git hash. For each deployment you can also see which Pull Request was used for the commit, who was the committer and which JIRA issues this Pull request is solving (provided that the image was built by a Codefresh pipeline)
1. The Kubernetes services that belong to this application (on the services tab)
1. What services and replicas were updated with each deployment.

The deployment status is fetched from your ArgoCD integration in a live manner. If, at any point, the deployment is not synced with GIT, you will instantly see the out-of-sync status. You will get the number of resources that are out of sync. When you click the out-of-sync status, you will get a list of all resources in that status.

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

You can find helpful tips if you hover your mouse on the PR number, the issue, the Git commiter and so on.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/tooltips.png"
  url="/images/guides/gitops/tooltips.png"
  alt="Extra tooltip information"
  caption="Extra tooltip information"  
  max-width="80%"
 %}

For each deployment you can also see a before/after view of the pods/replicas that were affected.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/updated-services.png"
  url="/images/guides/gitops/updated-services.png"
  alt="Updated services"
  caption="Updated services"  
  max-width="100%"
 %}

### Filtering the Deployment History

You can add filters on the deployment history by using the multi-select field on the top left of the screen.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/filter.png"
  url="/images/guides/gitops/filter.png"
  alt="Filtering options"
  caption="Filtering options"  
  max-width="40%"
 %}

 You can add filters for:

* Git committer(s)
* Pull Request number(s)
* Jira issue(s)

 If you define multiple options they work in an OR manner.

### Searching the Deployment History

For advanced filtering options, the search field on the top right allows you to view only the subset of deployments that match your custom criteria.

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
  file="/images/guides/gitops/search.png"
  url="/images/guides/gitops/search.png"
  alt="Searching deployment history"
  caption="Searching deployment history"  
  max-width="80%"
 %}

Some examples are:

* `pr:2` - filter the deployment history to show only a specific Pull request
* `issues: SAAS-2111, SAAS-2222` - show only specific issues
* `issue: SAAS-2111; pr:3 ; service: my-app` - searching for multiple criteria in OR behavior

Using the search field allows you to quickly find a specific Git commit in the history of the application (and even rollback the deployment as explained in the next sections).

## Current State of Application

The current state tab shows a hierarchical view of your cluster resource for your application.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/currentstate.png"
  url="/images/guides/gitops/currentstate.png"
  alt="Current State tab"
  caption="Current State tab"  
  max-width="80%"
 %}

At the top of the screen you have several filters available:

* Kind - choose a specific type of Kubernetes resource
* Health - status of the resource
* Sync state - GitOps status of the resource
* Free search - search any resource by name

## Tagging GitOps Application

1. Navigate to the GitOps dashboard.
2. To the application's right (next to the Health Column), click the three dots to open the More Action Dropdown.
3. Select Add/Edit Tags.
4. Click the +tags to add tags.
5. Alternatively, click the "x" next to the tag to remove it.
6. Click Save.

## Rolling Back Git Versions

In the GitOps dashboard you will also see a complete history of all past deployments as recorded in Git. You can select any of the previous versions and rollback your application to the respective version.

 {% include image.html
  lightbox="true"
  file="/images/guides/gitops/rollback.png"
  url="/images/guides/gitops/rollback.png"
  alt="Rolling back to a previous version"
  caption="Rolling back to a previous version"  
  max-width="80%"
 %}

The Rollback simply informs the cluster to use a different git hash for the sync process. It doesn't affect your Git repository and ArgoCD will now show your application as out-of-sync (because the last Git commit no longer matches the status of the cluster).

This rollback behavior is best used as an emergency measure after a failed deployment where you want to bring the cluster back to a previous state in a temporary manner. If you wish to keep the current rollback status as a permanent status it is best to use the standard `git reset/revert` commands and change the GitOps repository to its desired state.

## Gitops ABAC Support For Rollback Action

1. Go to Account Settings > Permissions > Teams Tab > Gitops.
2. Select the Team.
3. Chose what the Team can do and click apply.
4. Select the tags of the applications and click apply.
5. Click Add Rule when done.

## Performing Automatic Git Commits

Usually the Pull Requests that take part in a GitOps workflow are created and approved in a manual way (after code review). You have the option however to fully automate the whole process and rather than opening a Pull Request on both the application repository and the manifest repository, commit automatically the manifest changes inside the pipeline that creates the artifact.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/gitops-workflow.png"
  url="/images/guides/gitops/gitops-workflow.png"
  alt="Full GitOps workflow"
  caption="Full GitOps workflow"  
  max-width="100%"
 %}

Here is an example pipeline that creates a Docker image and also commits a version change in the Kubernetes manifest to denote the new Docker tag of the application:

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/ci-cd-pipeline.png"
  url="/images/guides/gitops/ci-cd-pipeline.png"
  alt="Pipeline that commits manifests"
  caption="Pipeline that commits manifests"  
  max-width="80%"
 %}

There are many ways to change a Kubernetes manifest in a programmatic way, and for brevity reasons we use the [yq](https://github.com/mikefarah/yq) command line tool.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "metadata"
  - "gitops"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "my-github-username//gitops-app-source-code"
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
      IMAGE:  docker.io/kostiscodefresh/simple-web-app:${{CF_SHORT_REVISION}}
      BRANCH: '${{CF_BRANCH}}'
      REPO: 'kostis-codefresh/simple-web-app'
      GIT_PROVIDER_NAME: github-1
  jira-issue-extractor:
    title: Enrich image with jira issues
    type: jira-issue-extractor
    stage: "metadata"
    fail_fast: false
    arguments:
      IMAGE: docker.io/kostiscodefresh/simple-web-app:${{CF_SHORT_REVISION}}
      JIRA_PROJECT_PREFIX: 'SAAS'
      MESSAGE: SAAS-8842
      JIRA_HOST: codefresh-io.atlassian.net
      JIRA_EMAIL: kostis@codefresh.io
      JIRA_API_TOKEN: '${{JIRA_TOKEN}}'
  clone_gitops:
    title: cloning gitops repo
    type: git-clone
    arguments:
      repo: 'my-github-username//gitops-kubernetes-configuration'
      revision: 'master'
    stage: "gitops"
    when:
      branch:
        only:
          - master
  change_manifest:
    title: "Update k8s manifest"
    image: "mikefarah/yq:3" # The image in which command will be executed
    commands:
      - yq w -i deployment.yml spec.template.spec.containers[0].image docker.io/kostiscodefresh/simple-web-app:${{CF_SHORT_REVISION}}
      - cat deployment.yml
    working_directory: "${{clone_gitops}}"
    stage: "gitops"
    when:
      branch:
        only:
          - master
  commit_and_push:
    title: Commit manifest
    type: git-commit
    stage: "gitops"
    arguments:
      repo: 'my-github-username//gitops-kubernetes-configuration'
      git: github-1
      working_directory: '/codefresh/volume/gitops-kubernetes-configuration'
      commit_message: Updated manifest
      git_user_name: ${{CF_COMMIT_AUTHOR}}
      git_user_email: ${{CF_COMMIT_AUTHOR}}@acme-inc.com
    when:
      branch:
        only:
          - master
{% endraw %}
{% endhighlight %}  

This pipeline:

1. Checks out the Git repository that contains the source code
1. Builds a Docker image and tags it with the Git hash
1. Enriches the image with the Pull request and ticket information as explained in the previous sections
1. Checks out the Git repository that contains the Kubernetes manifests
1. Performs a text replacement on the manifest updating the `containers` segment with the new Docker image
1. Commits the change back using the [Git commit plugin](https://codefresh.io/steps/step/git-commit) to the Git repository that contains the manifests.

The CD pipeline (described in the previous section) will detect that commit and use the [sync plugin](https://codefresh.io/steps/step/argocd-sync) to instruct ArgoCD to deploy the new tag. Alternatively you can setup the ArgoCD project to auto-sync on its own if it detects changes in the Git repository with the manifests.

## Using the App-of-Apps pattern

The GitOps dashboard has native support for the [app-of-apps pattern](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/). If you have a number  of applications that are related and you always
install them as a set in your cluster you can group them in a single Application. The parent application can be defined using [declarative Argo Resources](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/).

As an example, you might find that you always install in your cluster Linkerd, Prometheus and Ambassador. You can group all of them in a single Application and deploy them all at once.

You can find an existing example of app-of-apps at [https://github.com/argoproj/argocd-example-apps/tree/master/apps](https://github.com/argoproj/argocd-example-apps/tree/master/apps). It is using [Helm]({{site.baseurl}}/docs/yaml-examples/examples/helm/), but you can use any other Kubernetes templating mechanism such as [Kustomize]({{site.baseurl}}/docs/yaml-examples/examples/deploy-with-kustomize/) (or even plain manifests).

Once you deploy the application with Codefresh, you will see the parent app in the dashboard with a small arrow:

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/app-of-apps-closed.png"
  url="/images/guides/gitops/app-of-apps-closed.png"
  alt="App of Apps"
  caption="App of Apps"  
  max-width="90%"
 %}

You can expand the application by clicking on the arrow to inspect its child applications.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/app-of-apps.png"
  url="/images/guides/gitops/app-of-apps.png"
  alt="App of Apps expanded"
  caption="App of Apps expanded"  
  max-width="90%"
 %}

 Then you can either click on the parent application or any of the children to visit the respective dashboard. In the dashboard of the parent application, you will also be notified for its components after each deployment under the "Updated Applications" header:

 {% include image.html
  lightbox="true"
  file="/images/guides/gitops/updated-apps.png"
  url="/images/guides/gitops/updated-apps.png"
  alt="Children applications"
  caption="Children applications"  
  max-width="90%"
 %}

 Note that the app of apps pattern is best used for related but not interdependent applications. If you have applications that depend on each other (e.g. frontend that needs backend and backend that needs a DB) we suggest you use the standard [Helm dependency mechanism](https://helm.sh/docs/helm/helm_dependency/).

## Integrating Codefresh and Jira

> Note that Codefresh currently has to provide you with access to use the Jira Marketplace App. Please get in touch for more information.

Setting up the Codefresh Jira integration provides

* Higher observability of deployments within your GitOps Dashboard
* Higher observability of deployments within your Jira Account

[Our integration section]({{site.baseurl}}/docs/integrations/jira) provides further details on ways to set-up the connection.

Once set-up, you will be able to view information from Jira in the Codefresh GitOps Dashboard. Additionally, Jira will display

* The build status across environments
* The deployment history
* Tickets and how they correlate to deployments

The following screenshots show examples of the provided information. Here is the deployments details for a ticket in JIRA:

{% include image.html
lightbox="true"
file="/images/integrations/jira/jira-integration-one.png"
url="/images/integrations/jira/jira-integration-one.png"
alt="Ticket deployment history"
caption="Ticket deployment history"
max-width="90%"
%}

And here is a complete timeline of your deployments and the feature they contain.

{% include image.html
lightbox="true"
file="/images/integrations/jira/jira-integration-two.png"
url="/images/integrations/jira/jira-integration-two.png"
alt="Jira Deployment timeline"
caption="Jira Deployment timeline"
max-width="90%"
%}

For more information see the [Atlassian Codefresh page](https://www.atlassian.com/solutions/devops/integrations/codefresh) and the [integration documentation]({{site.baseurl}}/docs/integrations/jira/).

## Using a Git repository for the pipelines

Remember that according to GitOps we should place *all* application resources on Git. This means that the pipelines themselves must also be present in a Git repository and any change on them should pass from source control.

Even though Codefresh has a [powerful inline editor]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#using-the-inline-pipeline-editor) for editing pipelines, as soon as you finish with your pipelines you [should commit them in Git](https://github.com/codefresh-contrib/gitops-pipelines)
and load them from the repository.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/pipeline-from-git.png"
  url="/images/guides/gitops/pipeline-from-git.png"
  alt="Loading a pipeline from GIT"
  caption="Loading a pipeline from GIT"  
  max-width="80%"
 %}

 Once the pipeline is in Git, you should switch the online editor to [load the pipeline from the repository]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#loading-codefreshyml-from-version-control) instead of the inline text.

## Related articles
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[ArgoCD integration]({{site.baseurl}}/docs/integrations/argocd/)  
[Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)  
[Helm promotions]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/)  
