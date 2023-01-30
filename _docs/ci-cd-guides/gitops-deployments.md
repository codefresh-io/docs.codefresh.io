---
title: "GitOps deployments"
description: "Deploy with Codefresh and ArgoCD"
group: ci-cd-guides
redirect_from:
  - /docs/ci-cd-guides/gitops-deployments/
toc: true
---

Apart from traditional push-based Helm deployments, you can use Codefresh for [GitOps deployments](https://codefresh.io/gitops/){:target="\_blank"} powered by Argo CD.  

For an overview on GitOps, Argo CD, and how Codefresh implements both, see [Codefresh and GitOps]({{site.baseurl}}docs/getting-started/gitops-codefresh/).


Even though GitOps is not specific to Kubernetes, current GitOps tools work great with Kubernetes in the form of cluster controllers. The GitOps controller monitors the state of the Git repository, and when there is a commit, the cluster is instructed to match the same state.

<!--- replace this with the Home dashboard??>
Codefresh has native support for GitOps including a graphical dashboard for handling your GitOps deployments:

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/gitops-dashboard.png"
  url="/images/guides/gitops/gitops-dashboard.png"
  alt="The GitOps dashboard"
  caption="The GitOps dashboard"  
  max-width="100%"
 %}
-->
This guide will explain how to use GitOps for your own applications.

## Setting up your Git repositories

One of the central ideas of GitOps is to use Git for _ALL_ project resources. Which means that you need to store every resource of the application in Git, and not just the source code as most developers using Git are familiar with. 

In the case of Kubernetes, this means that you should store all Kubernetes manifests in a Git repository as well. With the most simple scenario, you have the main repository of your application (mostly interesting to developers), and [a second Git repository with Kubernetes manifests](https://argoproj.github.io/argo-cd/user-guide/best_practices/#separating-config-vs-source-code-repositories){:target="\_blank"} (more relevant to operators/SREs).

As a live example you can use:

* The [https://github.com/codefresh-contrib/gitops-app-source-code](https://github.com/codefresh-contrib/gitops-app-source-code){:target="\_blank"} repository for the application code.  
  The repository with the application code contains the source code plus a Dockerfile. You can use any Git workflow for this repository. We will create a pipeline in Codefresh that creates a container image on each commit.  

* The [https://github.com/codefresh-contrib/gitops-kubernetes-configuration](https://github.com/codefresh-contrib/gitops-kubernetes-configuration){:target="\_blank"} repository for the Kubernetes configuration.   
  The configuration repository holds the kubernetes manifests. This is one of the critical points of GitOps:
    * The configuration repository holds the manifests that are also present in the Kubernetes cluster  
    * Whenever there is a commit to the configuration repository, the cluster is notified to deploy the new version of the files (we will set up a pipeline for this)
    * Every subsequent configuration change should become a Git commit. Ad-hoc changes to the cluster with `kubectl` commands are **NOT** allowed

* The [https://github.com/codefresh-contrib/gitops-pipelines](https://github.com/codefresh-contrib/gitops-pipelines){:target="\_blank"} repository that holds the pipelines.
  The third Git repository house pipelines because pipelines are also part of the application.

**Fork repositories**  

* Before continuing, if don't have already your own example application, fork all three repositories into your own GitHub account.

## Connecting ArgoCD and Codefresh

GitOps deployments are powered by [ArgoCD](https://argoproj.github.io/argo-cd/){:target="\_blank"}, so you need an active ArgoCD installation in your cluster.

This is easy with our GitOps Runtimes. Argo CD is installed automatically when you install a GitOps runtime, either the Hosted or Hybrid versions. See:  
[Hosted GitOps runtime]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)   
[Hybrid GitOps runtime]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/)  

If you don't have a runtime installed already, for this guide, install the Hosted GitOps runtime.

<!--- Add hosted runtime image 
Follow the instructions for [connecting ArgoCD to Codefresh]({{site.baseurl}}/docs/integrations/argocd/) and creating an ArgoCD application

{% include image.html
  lightbox="true"
  file="/images/integrations/argocd/argocd-provision-app.png"
  url="/images/integrations/argocd/argocd-provision-app.png"
  alt="Creating a new ArgoCD application in a Codefresh environment"
  caption="Creating a new ArgoCD application in a Codefresh environment"  
  max-width="40%"
 %}

-->

## Creating a CI Pipeline for GitOps

Creating a CI pipeline for GitOps is no different from creating a standard pipeline. The only difference is that as the final action for the pipeline, you would add the report image action provided by Codefresh. The report image action correlates the Docker image with the Git repository details, Jira issues associated with it, and additional information from the registry that stores the image. 

Follow these steps to create a CI pipeline for GitOps:

1. Set up Codefresh, Jira, and registry integrations for GitOps.
    You need to connect Jira and your container registry to Codefresh. These integrations are specific to GitOps, and differ from the pipeline integrations that you may have already set up.  
    Once you set up the GitOps integrations, you can reference them in the CI pipeline's report image step for Codefresh to retrieve the necessary information.
1. Create your Codefresh pipeline as you usually do:  
   Use existing CI actions for compiling code, running unit tests, security scanning etc.
1. Place the final action in the pipeline as the “report image” action provided by Codefresh.  
  See Codefresh report image
1. When the pipeline completes execution, Codefresh retrieves the information on the image that was built and its metadata through the integration names specified.
1. View the image in Codefresh’s Images dashboard, and in any application in which it is used.

### Example CI pipeline for GitOps

Below is an example of a CI pipeline for GitOps. 

The pipeline:   
* [Packages your Docker images]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/)
* Runs [tests]({{site.baseurl}}/docs/testing/unit-tests/)
* Performs [security scans]({{site.baseurl}}/docs/testing/security-scanning/)
* Reports image information to Codefresh

 `codefresh.yml`
{% highlight yaml %}
{% raw %}

version: "1.0"
stages:
  - "clone"
  - "build"
  - "report"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    stage: "clone"
    
  build:
    title: "Building Docker image"
    type: "build"
    image_name: "${{CF_REPO_OWNER}}/color"
    working_directory: "${{clone}}"
    tag: "${{CF_SHORT_REVISION}}"
    dockerfile: "Dockerfile"
    registry: docker-lr
    stage: "build"

  ReportImageMetadataAll:
    title: Report image to Codefresh CD
    type: codefresh-report-image
    working_directory: /code
    stage: "report"
    arguments:
      CF_API_KEY: '${{CF_API_KEY}}'
      CF_IMAGE: 'docker.io/${{CF_REPO_OWNER}}/color:${{CF_SHORT_REVISION}}'
      CF_CONTAINER_REGISTRY_INTEGRATION: docker
      CF_RUNTIME_NAME: "codefresh-hosted"
      CF_GITHUB_TOKEN: '${{GITHUB_TOKEN}}'
      CF_GIT_PROVIDER: github
      CF_GIT_REPO: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
      CF_GIT_BRANCH: '${{CF_BRANCH}}'
      CF_ISSUE_TRACKING_INTEGRATION: jira
      CF_JIRA_MESSAGE: "${{CF_COMMIT_MESSAGE}}"
      CF_JIRA_PROJECT_PREFIX: CR

{% endraw %}
{% endhighlight yaml %}







1. Checks out the source code of an application with the [git-clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/)
1. [Builds]({{site.baseurl}}/docs/pipelines/steps/build/) a Docker image
1. Reports the Jira and registry information to Codefresh with the `codefresh-report-image` step
   In the report image step, you can see several variables whose values are populated from those you defined in the respec


You can see the associated metadata in the [Images dashboard](https://g.codefresh.io/images/){:target="\_blank"}.

 {% include image.html
  lightbox="true"
  file="/images/guides/gitops/image-annotations.png"
  url="/images/guides/gitops/image-annotations.png"
  alt="Enriched Docker image"
  caption="Enriched Docker image"  
  max-width="80%"
 %}

Codefresh uses information to fill the deployment history in the GitOps dashboard.



### Set up Jira integration for GitOps image enrichment
GitOps integration for Atlassian Jira allows you to both enrich images with information from Jira, and report the deployment information back to Jira. 
For this guide, we will select the image enrichment option.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Configuration in the sidebar, select **GitOps Integrations**.
1. Filter by **Issue Tracking**, select **Atlassian Jira** and click **Configure**.
1. From the **Add Integration** dropdown, select **Image enrichment**.
1. Define the [integration settings for Jira]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/#jira-gitops-integration-settings-in-codefresh).
  The **Integration name** must be unique.
1. To confirm, click **Commit**. It may take a few moments for the new integration to be synced to the cluster before it appears in the list of Active integrations.
1. Continue with [Set up Docker Hub integration for GitOps image enrichment](#set-up-docker-hub-integration-for-gitops-image-enrichment).



### Set up Docker Hub integration for GitOps image enrichment

Now that we have connected Jira to Codefresh, we'll connect a container registry as well.  

Codefresh can integrate with popular container registries such as Docker Hub, JFrog Artifactory, and more. See [GitOps container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).  
For this guide, we'll connect Codefresh with Docker Hub as the container registry.

**Before you begin**  
Complete the [prerequisites]({{site.baseurl}}/docs/gitops-integrations/container-registries/dockerhub/#prerequisites)  

**How to**  
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Configuration in the sidebar, select **GitOps Integrations**.
1. Filter by **Container Registry**, select **Docker Hub**, and click **Configure**.
1. Define the [integration settings for Docker Hub]({{site.baseurl}}/docs/docs/gitops-integrations/container-registries/dockerhub/#docker-hub-gitops-integration-settings-in-codefresh).
1. To confirm, click **Commit**. It may take a few moments for the new integration to be synced to the cluster before it appears in the list of **Active** integrations.


 {% include image.html
  lightbox="true"
  file="/images/guides/gitops/gitops-deploy-active-integrations.png"
  url="/images/guides/gitops/gitops-deploy-active-integrations.png"
  alt="Active Jira and DockerHub integrations for GitOps"
  caption="Active Jira and DockerHub integrations for GitOps"  
  max-width="60%"
 %}

### Set up Codefresh pipeline integration for GitOps
After completing the Jira and Docker Hub integrations, we can set up the pipeline integration for GitOps. 
Why would you do this? When you create the CI pipeline as you usually do, you'll see that the final report image step references several Codefresh variables to report the image information to Codefresh and enrich the image.  

Read more in [GitOps CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/), and make sure to also review [Templatization examples for CF arguments]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/codefresh-classic/#templatization-examples-for-cf-arguments).

**Before you begin**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Configuration in the sidebar, select **GitOps Integrations**.
1. Filter by **CI tools**, select **Codefresh** and click **Add**.
1. Define the i[ntegration settings for Codefresh pipelines]({{site.baseurl}}/docs/docs/gitops-integrations/codefresh-classic/#ci-pipeline-gitops-integration-settings).  





## Creating an Argo CD application for GitOps



## Working with the GitOps Apps dashboard

After you create an ArgoCD application in Codefresh, you can track and monitor the application's deployment, resources and more in the [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"} dashboard.
<!--- replace>
{% include image.html
  lightbox="true"
  file="/images/guides/gitops/real-dashboard.png"
  url="/images/guides/gitops/real-dashboard.png"
  alt="GitOps Dashboard"
  caption="GitOps Dashboard"  
  max-width="100%"
 %} -->


### Customize the dashboard view

  * View format: Select the view format for the GitOps Apps dashboard as List or Card. 

  * Filters: Customize the scope through the global filters to display the [information](#applications-dashboard-information) you need.

  * Detailed info on application: To get detailed information on an application, either select the option/action from the app's context menu, or simply click the application.


### Monitor health and sync status in Application Header
The application header provides a wealth of useful information at a glance. 


### Current State of application resources

Monitor the resources deployed in the current version of the selected application in the Current State tab.  
This is the tab you get to when you select the application from the GitOps Apps dashboard.  

Here you can view live state of the application's resources (Kubernetes objects) on the cluster in List or Tree views](#view-modes-for-application-resources), [set filters](#filters-for-application-resources), and monitor:
* [Health status](#health-status-for-application-resources)
* [Sync status](#sync-status-for-application-resources)
* [Manifests](#manifests-for-application-resources)
* [Logs](#logs-for-application-resources)
* [Events](#events-for-application-resources)
 
<!--- replace >
{% include
image.html
lightbox="true"
file="/images/applications/app-resources-monitor-screen.png"
url="/images/applications/app-resources-monitor-screen.png"
alt="Monitor application resources in Current State tab"
caption="Monitor application resources in Current State tab"
max-width="50%"
%}  -->



>To quickly filter by resource type, click the type in the Resource Inventory (bottom-left)

For detailed descriptions, see ???
### Monitor deployments in Timeline
The Timeline tab (next to the Current State) displays the history of deployments for the selected application. Monitor an ongoing deployment and review historical deployments. The deployments are sorted by the most recent one, labeled Current Version at the top.

You can se

To view day-to-day deployment information for the selected time period, mouse over the dot on the deployment chart 

Application def


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

You can manually create these annotations with the [standard Codefresh annotation support]({{site.baseurl}}/docs/pipelines/annotations/) or via the built-in pipeline steps that we will see in the next section.

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




<!--- ## Rolling Back Git Versions

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
5. Click Add Rule when done.  -->


## Using the App-of-Apps pattern

The GitOps dashboard has native support for the [app-of-apps pattern](https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/){:target="\_blank"}. If you have a number  of applications that are related and you always
install them as a set in your cluster you can group them in a single Application. The parent application can be defined using [declarative Argo Resources](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/){:target="\_blank"}.

As an example, you might find that you always install in your cluster Linkerd, Prometheus and Ambassador. You can group all of them in a single Application and deploy them all at once.

You can find an existing example of app-of-apps at [https://github.com/argoproj/argocd-example-apps/tree/master/apps](https://github.com/argoproj/argocd-example-apps/tree/master/apps){:target="\_blank"}. It uses [Helm]({{site.baseurl}}/docs/example-catlog/cd-examples/helm/), but you can use any other Kubernetes templating mechanism such as [Kustomize]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-with-kustomize/) (or even plain manifests).

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

Our [Jira integration]({{site.baseurl}}/docs/integrations/jira) provides further details on ways to set-up the connection.

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

For more information see the [Atlassian Codefresh page](https://www.atlassian.com/solutions/devops/integrations/codefresh){:target="\_blank"}.

## Using a Git repository for the pipelines

Remember that according to GitOps we should place *all* application resources on Git. This means that the pipelines themselves must also be present in a Git repository and any change on them should pass from source control.

Even though Codefresh has a [powerful inline editor]({{site.baseurl}}/docs/pipelines/pipelines/#using-the-inline-pipeline-editor) for editing pipelines, as soon as you finish with your pipelines you [should commit them to Git](https://github.com/codefresh-contrib/gitops-pipelines){:target="\_blank"}, and load them from the repository.

{% include image.html
  lightbox="true"
  file="/images/guides/gitops/pipeline-from-git.png"
  url="/images/guides/gitops/pipeline-from-git.png"
  alt="Loading a pipeline from GIT"
  caption="Loading a pipeline from GIT"  
  max-width="80%"
 %}

 Once the pipeline is in Git, you should switch the online editor to [load the pipeline from the repository]({{site.baseurl}}/docs/pipelines/pipelines/#loading-codefreshyml-from-version-control) instead of the inline text.

## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[ArgoCD integration]({{site.baseurl}}/docs/integrations/argocd/)  
[Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)  
[Helm promotions]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/)  
