---
title: "Quick start: Installing a Hybrid GitOps Runtime"
description: "Install the Helm-based Hybrid GitOps Runtime"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/quick-start/gitops-quick-start/runtime/
---



If you've reviewed and verified that you meet the requirements for a GitOps Runtime, let's go ahead and install the Runtime.

## Before you begin
Verify you have completed the [prerequisites]({{site.baseurl}}/docs/gitops-quick-start/gitops-runtimes/verify-requirements/)

## Install the GitOps Runtime
1. On the Getting Started page, click **Install Runtime**.
1. Define the URL of the **Shared Configuration Repository**.
1. If required, select the **Git provider** from the list.
1. Install the Hybrid GitOps Runtime:
    1. Click **Generate** to create a new API key.
    1. Retain the default values for the GitOps Runtime name and namespace, `codefresh`.
    1. Copy the command displayed in _Step 3_ in the UI, making sure you add the flag for the Runtime Git token `--set global.runtime.gitCredentials.password.value` and its value:  

  {% highlight yaml %}
  helm upgrade --install <helm-release-name> \
  --create-namespace \
  --namespace <namespace> \
  --set global.codefresh.accountId=<codefresh-account-id> \
  --set global.codefresh.userToken.token=<codefresh-api-key> \
  --set global.runtime.gitCredentials.password.value=<git-runtime-token> \
  --set global.runtime.name=<runtime-name> \
  oci://quay.io/codefresh/gitops-runtime \
  --wait
  {% endhighlight %}
 
  &nbsp;&nbsp;&nbsp;&nbsp;where:  
  *  
        * `cf-gitops-runtime` is the default name of the Helm release, which you can change if needed.  
        * `codefresh` is the default namespace in which to install the Hybrid GitOps runtime.
        * `<codefresh-account-id>` is mandatory for _tunnel-based Hybrid GitOps Runtimes_, and is automatically populated by Codefresh in the command. 
        * `<codefresh-token>` is the API key you generated, and is also automatically populated in the command.
        * `<git-runtime-token>` is the token used for Runtime installation.
        * `codefresh` is the default name of the Runtime. 
        * `oci://quay.io/codefresh/gitops-runtime` is the name of the Helm chart, predefined by Codefresh, and cannot be changed.
        * `--wait` is the duration the installation process waits for all pods to become ready before timing out. We recommend to set it to a period longer than 5 minutes which is the default if not set.

{% include
image.html
lightbox="true"
file="/images/runtime/helm/helm-install-hybrid-runtime.png"
url="/images/runtime/helm/helm-install-hybrid-runtime.png"
alt="Runtime quick start: Install Hybrid GitOps Runtime"
caption="Runtime quick start: Install Hybrid GitOps Runtime"
max-width="60%"
%}

{:start="5"}
1. Wait for a few minutes, and then click **Close**.  
  You are taken to the List View for GitOps Runtimes, where the Sync Status column displays Complete Installation. 
1. In the Sync Status column, click **Complete Installation**.  
  Codefresh displays the steps to complete installing the GitOps Runtime. 
   
   {% include
image.html
lightbox="true"
file="/images/runtime/helm/helm-complete-install-widgets.png"
url="/images/runtime/helm/helm-complete-install-widgets.png"
alt="Runtime quick start: Steps to complete installation"
caption="Runtime quick start: Steps to complete installation"
max-width="60%"
%}

{:start="7"}
1. Click **Add** to integrate the Runtime token for your Git provider account:
    1. If not GitHub, select the Git provider.  
    1. Define the provider's API URL.
    1. Define the URL of the **Shared Configuration Repository**.
1. Click **Add** to add the user token for your Git provider account, and then paste the token in the field.
1. Complete the installation by clicking **Configure as Argo Application**.  
  There is no need for any further action from you, as Codefresh takes care of the configuration.
  Configuring the Hybrid GitOps Runtime as an Argo CD application ensures:
    * Git as the single source of truth: The Runtime’s state is declaratively managed in Git, ensuring consistency, traceability, and version control over all its configurations.
    * Automated reconciliation: Argo CD continuously monitors the Runtime’s desired state (as defined in Git) and automatically corrects any drift, ensuring alignment between the cluster and the Git repository.
    * Visibility & monitoring: The Runtime is displayed in the GitOps Apps dashboard where you can view and check health and sync statuses.


## What's next
Let's create a Git Source to which we'll link the applications we'll create later in the quick start series.  

[Quick start: Creating a Git Source]({{site.baseurl}}/docs/gitops-quick-start/create-git-source/)




