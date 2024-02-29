---
title: "Provision a Hosted GitOps Runtime"
description: "Install the GitOps Runtime hosted by Codefresh"
group: getting-started
sub-group: gitops-quick-start
toc: true
---

If you have Hosted GitOps, set up your hosted Runtime environment:   

1. Provision the Hosted GitOps Runtime with a single click.
1. Authorize access through your OAuth token to the organization where Codefresh creates the Git runtime repo and the [Shared Configuration Repo]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).
1. Connect to an external K8s cluster with access to the internet, to which you can deploy applications.
  This is important as you cannot deploy to the in-cluster with the Hosted GitOps Runtime. 
1. Install Argo Rollouts on the cluster.   

Read our [blog on Hosted GitOps](https://codefresh.io/blog/codefresh-upends-continuous-delivery-with-hosted-gitops-platform-featuring-dora-dashboards-and-first-class-integrations-for-ci/).  
For detailed information on each of the steps below, see [Set up a Hosted GitOps Runtime environment]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).  

## Before you begin

Verify that you have:  
* A Kubernetes cluster with access to the internet
* An OAuth token 

## How to
1. In the Codefresh UI, go to Codefresh [Home Dashboard](https://g.codefresh.io/2.0/?time=LAST_7_DAYS){:target="\_blank"}.

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-gitops-initial-view.png"
url="/images/runtime/hosted-gitops-initial-view.png"
alt="Hosted GitOps setup"
caption="Hosted GitOps setup"
max-width="80%"
%}

{:start="2"}
1. Provision the Hosted GitOps Runtime:
  * Click **Install**, and wait for Codefresh to complete provisioning your Hosted GitOps Runtime (may take up to ten minutes).

{% include
image.html
lightbox="true"
file="/images/runtime/hosted-installing.png"
url="/images/runtime/hosted-installing.png"
alt="Installing hosted runtime"
caption="Installing hosted runtime"
max-width="80%"
%}

{:start="3"}
1. Select the Git organization for the runtime installation and the Shared Configuration Repo:
  * Click **Connect**.
  * Click **Authorize Access** and enter your OAuth token.
  * Select the **Git Organization for which to create the repos**.
  * Click **Create**.
  Codefresh creates the two Git repositories in the paths shown.

  {% include 
image.html 
lightbox="true" 
file="/images/runtime/hosted-connect-git.png" 
url="/images/runtime/hosted-connect-git.png" 
alt="Connect to Git provider" 
caption="Connect to Git provider"
max-width="80%" 
%}

{:start="4"}
1. Connect a K8s cluster:
  * Click **Connect**.
  * In the Add Managed Cluster panel, copy the command `cf cluster add`, and run it in the terminal.  
  * When prompted to select the `kube-context`, select from the list of available clusters as defined in `kubeconfig`. 
  * Verify that you have configured access to the required IP addresses required. See [Codefresh IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/). 

{% include 
image.html 
lightbox="true" 
file="/images/runtime/hosted-connect-cluster-step.png" 
url="/images/runtime/hosted-connect-cluster-step.png" 
alt="Connect a K8s cluster for hosted runtime" 
caption="Connect a K8s cluster for hosted runtime"
max-width="70%" 
%}

{:start="5"}
1. Install Argo Rollouts on the cluster you added. You'll need this to apply the `rollout` resource we will create for the application in the next task.
  * Go to [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
  * In either the **List View** or **Topology View**, click the name of the cluster on which to install Argo Rollouts.
  * Click **+ Install Argo Rollouts**.

{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/cdops-app-install-rollout.png" 
   url="/images/getting-started/quick-start/cdops-app-install-rollout.png" 
   alt="Install Argo Rollouts on managed cluster" 
   caption="Install Argo Rollouts on managed cluster"
   max-width="50%" 
   %}

You are now ready to create and deploy an Argo CD application.

## What to do next
[Create resources for codefresh-guestbook application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-specs/) 

