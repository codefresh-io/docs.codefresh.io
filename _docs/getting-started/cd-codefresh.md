---
title: "Codefresh for CD"
description: "Continuous deployment (CD) with Codefresh pipelines"
group: getting-started
toc: true
---

Work in progress TBD

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
Continuous deployment starts with Kubernetes clusters, and Codefresh integrates with any known cluster provider for Kubernetes through a few simple steps. Connect your Google, Azure, Amazon Kubernetes cluster to Codefresh through simple integration steps. 
For those Kubernetes clusters that are not in our list of cluster providers, you can manually enter your cluster settings to add any generic Kubernetes cluster.

See [Connecting a Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster).

## Deploying to Kubernetes 
Codefresh offers a variety of options for you to choose from when deploying to Kubernetes.
Deploy to Kubernetes from the Codefresh UI, or programmatically through dedicated steps in pipelines, avoiding the need for `kubectl` commands.    

**On-demand deployment**  
For quick and easy deployment, deploy on-demand from the Codefresh UI.

**Dedicated steps in pipelines**  
We have the `deploy` step, and the more advanced `cf-deploy-kubernetes`step that enables simple templating on Kubernetes manifests.   

Codefresh pipelines also support Kustomize and Helm for deployments through freestyle steps. 

Finally, if you are familiar with and want to work with `kubectl`, run your own custom `kubectl` commands in a freestyle step. Read more in [kubectl](#kubectl).

See [Deployment options for Kubernetes]({{site.baseurl}}/docs/deployments/kubernetes/deployment-options-to-kubernetes/).

## kubectl
`kubectl` is the command line interface for managing kubernetes clusters. Running custom `kubectl` commands in a freestyle step gives your maximum flexibility with cluster deployments.
Codefresh automatically sets up your config context with your connected clusters. The config context is the value of the `$CF_KUBECONFIG_PATH` variable, which expands to `/codefresh/volume/sensitive/.kube/config` within the shared step volume.

Codefresh has a public Docker image for kubectl at [Docker Hub](https://hub.docker.com/r/codefresh/kubectl/tags){:target="\_blank"} that you can use.

Because Codefresh automatically sets up your `kubeconfig` files with the information from your cluster integrations, you can modify the current config context and run any `kubectl` command you want applied to that context. For example, leverage the parallel capability of Codefresh pipelines to create two Docker images and deploy them to two different clusters with custom `kubectl` commands. 

See [Running custom kubectl commands]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/).

## Helm and Codefresh
Codefresh supplies a built-in Helm repository with every Codefresh account. And supports, besides public HTTP repositories, several private, authenticated Helm repositories. 

**Connect to Helm repositories**  
In addition to the official Helm repositories which are displayed in the Helm charts, Codefresh allows you connect with any external Helm repository through simple integrations. You can then inject the Helm repository context into your pipelines by selecting the repository name.

**Build Helm charts**  
Install Helm charts from Helm repositories, or build a new one.

<!--Codefresh has a dedicated step for Helm step to easily integrate Helm in Codefresh pipelines, and authenticate, configure, and execute Helm commands.
The Helm step can operate in one of three modes covering most scenarios:
* Install the chart into a Kubernetes cluster. This is the default mode if not explicitly set.
* Package the chart and push it to the defined repository.
Authentication to  set up authentication and add the repo to Helm. This is useful if you want to write your own helm commands using the freestyle step’s commands property, but you still want the step to handle authentication. -->

Deploy Helm charts
Deploy the Helm chart to a Kubernetes cluster, Helm repo, or both.  


## Dashboards

TBD
<!--Dashboards are key to providing the right information at the right time.

Helm Boards


Helm Releases
The Helm Releases dashboard provides a unique view into your production Kubernetes cluster, and actions for . You can see the current status of your cluster, including the currently deployed releases, their previous revisions including change tracking, and even roll back to a previous release.

perational Dashboards ~ Exposing the most commonly needed application and environmental information to developers so that they can troubleshoot without needing assistance from the DevOps teams; even in production

Analytical Dashboards ~ Developers often need to reach out to the DevOps team to get statistics and metrics around builds and deployments. Codefresh automatically generates DORA metrics as well as many other key indicators of build and deployment efficiency, which can be easily viewed in seconds by product owners and management alike.

Kubernetes Services

Environments
-->