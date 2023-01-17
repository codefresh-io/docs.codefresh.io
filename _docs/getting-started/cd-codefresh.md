---
title: "Codefresh for CD"
description: "Continuous deployment (CD) with Codefresh pipelines"
group: getting-started
toc: true
---

Codefresh is a Continuous Integration/Delivery solution.  
ConThis article reviews main CD concepts and how Codefresh supports and implements them.


<!--Focus on

Connecting K8s cluster
Deploying K8s
Running kubectl
Connecting to Helm registries
Building Helm charts
Pushing Helm charts
Deploying Helm charts
Dashboards -->


## Connecting to Kubernetes 
Connecting your Kubernetes cluster to the CI/CD platform is the first step in continuous deployment. Codefresh integrates with any known cluster provider for Kubernetes through a few simple steps. Connect your Google, Azure, or Amazon Kubernetes cluster to Codefresh through simple integration steps. If your Kubernetes cluster is not in our list of cluster providers, you can manually enter your cluster settings and add it as a generic Kubernetes cluster.

See [Connecting a Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster).

## Deploying to Kubernetes 
Codefresh offers a variety of options for you to choose from when deploying to Kubernetes.
Deploy to Kubernetes from the Codefresh UI, or programmatically through dedicated steps in pipelines avoiding the need for `kubectl` commands.    

**On-demand deployment**  
For quick and easy deployment, you can deploy on-demand from the Codefresh UI.

**Dedicated steps in pipelines**  
For more flexibility, we have dedicated steps for pipelines, the `deploy` step, and the more advanced `cf-deploy-kubernetes`step which enables simple templating on Kubernetes manifests.   

Codefresh pipelines also support Kustomize and Helm for deployments through freestyle steps. 

Finally, if you are familiar with and still want to work with `kubectl`, run your own custom `kubectl` commands in a freestyle step. Read more in [kubectl](#kubectl).

See [Deployment options for Kubernetes]({{site.baseurl}}/docs/deployments/kubernetes/deployment-options-to-kubernetes/).

## kubectl
`kubectl` is the command line interface for managing Kubernetes clusters. Running custom `kubectl` commands in a freestyle step gives maximum flexibility with cluster deployments.
Codefresh automatically sets up your config context with your connected clusters. The config context is the value of the `$CF_KUBECONFIG_PATH` variable, which expands to `/codefresh/volume/sensitive/.kube/config` within the shared step volume.

Codefresh has a public Docker image for kubectl at [Docker Hub](https://hub.docker.com/r/codefresh/kubectl/tags){:target="\_blank"} that you can use.

Because Codefresh automatically sets up your `kubeconfig` files with the information from your cluster integrations, you can modify the current config context and run any `kubectl` command you want applied to that context. For example, leverage the parallel capability of Codefresh pipelines to create two Docker images and deploy them to two different clusters with custom `kubectl` commands. 

See [Running custom kubectl commands]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/).

## Helm deployments
Codefresh supplies a built-in Helm repository with every Codefresh account. And supports, besides public HTTP repositories, several private, authenticated Helm repositories. 

**Connect to Helm repositories**  
In addition to the official Helm repositories which are displayed in the Helm charts, Codefresh allows you to connect with any external Helm repository through simple integrations. You can then inject the Helm repository context into your pipelines by selecting the repository name.

**Build Helm charts**  
Install Helm charts from Helm repositories, or build a new one.  


As with steps for Kubernetes deployments, Codefresh has a dedicated step for Helm deployments. The Helm step easily integrates Helm in Codefresh pipelines, and can authenticate, configure, and execute Helm commands.
The Helm step can operate in one of three modes covering most scenarios:  
* Install the chart into a Kubernetes cluster. This is the default mode if not explicitly set.
* Package the chart and push it to the defined repository.
* Set up authentication and add the repo to Helm. This is useful if you want to write your own Helm commands using the freestyle step’s commands property, but you still want the step to handle authentication. 

**Deploy Helm charts**  
Deploy the Helm chart to a Kubernetes cluster, Helm repo, or both.  

See [Using Helm in Codefresh pipelines]({{site.baseurl}}/docs/deployments/helm//using-helm-in-codefresh-pipeline/), [Using managed Helm repos]({{site.baseurl}}/docs/deployments/helm//managed-helm-repository/), and Helm [charts and repositories]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/).

## Dashboards
Dashboards are key to providing the right information at the right time. Codefresh makes it easy to both access and visualize critical information for any resource at any stage, at any level, and for anyone, from managers to DevOps engineers. Our operational dashboards expose the most critical application and environmental information to developers for troubleshooting without needing assistance from the DevOps teams. Our analytics dashboards expose key statistics and metrics around builds and deployments for product owners and management alike.  


You can customize all dashboards to display just the information  most relevant to your business issues.

**Kubernetes**  
The Kubernetes (Kubernetes Services) dashboard displays the clusters in your environments, their state, and actions if you have the required access privileges.  
The dashboard is a centralized location from which to view, add, modify, and remove Kubernetes services. You can deploy services with images from the Codefresh registry or from external Docker registries.  
See [Accessing the Kubernetes dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#accessing-the-kubernetes-dashboard).

**Helm dashboards**  
For Helm we have a Helm Board, and a Helm Releases dashboard.

* Helm Boards
  The Helm Board is a special environment board that allows you to track one or more applications as they move within your infrastructure. For example, between Dev, QA and Prod environments.  
  Here you can see the lifecycle of the application, and at the same time, use it as a tool shift Helm releases between environments.  

  You can create as many Helm Boards as you want, and customize the Helm Boards with the columns to display, each column being a Helm-enabled Kubernetes cluster.  
  See [Using the Helm Board]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/#using-the-helm-environment-board).

* Helm Releases
  The Helm Releases dashboard provides a unique view into your production Kubernetes cluster, and options to manage deployed releases. See the current status of your cluster, including the currently deployed releases, their previous revisions with change tracking. If needed, you can even roll back to a previous release.  
  See [View Helm releases and release information]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/#view-helm-releases-and-release-information).


**Environment dashboard**

The Kubernetes dashboard shows cluster status and focuses more on the service aspects such as pods and Docker images. The Helm Board offers an application-level view of your cluster, as it applies to Helm deployments.

To bridge this gap, Codefresh also offers an Environment dashboard that combines information for both Kubernetes and Helm releases. You can see cluster status in the context of the pipeline builds that run on and affect the cluster. It links between the status of the cluster and the status of the builds.

See [Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/). 

**DORA metrics**  
The DORA (DevOps Research and Assessment) metrics dashboard pulls out critical metrics for our GitOps deployments. The metrics include deployment frequency, lead time for changes, mean time to recovery, and change failure rate. The metric graphs show performance by default for the last 90 days, with the option to select daily/weekly/monthly granularity views.   
See [DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/).


## Related articles
[Codefresh for CI]({{site.baseurl}}/docs/getting-started/ci-codefresh/)  
[Codefresh for GitOps]({{site.baseurl}}/docs/getting-started/gitops-codefresh/)  
[Concepts in Codefresh]({{site.baseurl}}/docs/getting-started/concepts/)  