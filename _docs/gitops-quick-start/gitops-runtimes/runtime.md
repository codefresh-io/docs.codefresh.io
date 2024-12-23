---
title: "Quick start: Installing a Hybrid GitOps Runtime"
description: "Install the Helm-based Hybrid GitOps Runtime"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/quick-start/gitops-quick-start/runtime/
---



If you reviewed and verified that you meet the requirements for a GitOps Runtime, let's go ahead and install the Runtime.


1. In the Welcome page, select **+ Install Runtime**.
1. From Runtimes in the sidebar, select **GitOps Runtimes**.
1. Click **Hybrid Runtimes**, and then click **Add**.
1. Set up your Git provider account:
    1. If not GitHub, select the Git provider.  
    1. Define the provider's API URL.
    1. Define the URL of the **Shared Configuration Repository**.
    1. Click **Next**.
1. Install the Hybrid GitOps Runtime:
    1. Click **Generate** to create a new API key.
    1. Retain the default values for the GitOps Runtime name and namespace, `codefresh`.
    1. Copy the command in _Step 3_ and run it to install the Helm chart for the Hybrid GitOps Runtime:   
        where:  
        * `cf-gitops-runtime` is the default name of the Helm release, which you can change if needed.  
        * `codefresh` is the default namespace in which to install the Hybrid GitOps runtime.
        * `<codefresh-account-id>` is mandatory for _tunnel-based Hybrid GitOps Runtimes_, and is automatically populated by Codefresh in the command. 
        * `<codefresh-token>` is the API key you generated, and is automatically populated in the command.
        * `codefresh` is the default name of the Runtime. 
        * `oci://quay.io/codefresh/gitops-runtime` is the name of the Helm chart, predefined by Codefresh, and cannot be changed.

{% include
image.html
lightbox="true"
file="/images/runtime/helm/helm-install-hybrid-runtime.png"
url="/images/runtime/helm/helm-install-hybrid-runtime.png"
alt="Quick Start: Install Hybrid GitOps Runtime"
caption="Quick Start: Install Hybrid GitOps Runtime"
max-width="60%"
%}

{:start="6"}
1. Wait for a few minutes, and then click **Close**.  
   You are taken to the List View for GitOps Runtimes where you can see the Hybrid GitOps Runtime you added with a green dot indicating that it is online, and the Type column for the Runtime displaying Helm.
1. Complete the installation by clicking **Configure as Argo Application**.  
  There is no need for any further action from you, as Codefresh takes care of the configuration.
  By configuring the Hybrid GitOps Runtime as an Argo Application, you can ensure that GitOps is the single source of truth for the Runtime, and view and monitor Runtime components. 




## What's next
Let's create a Git Source to which we'll link the applications we'll create later on in the quick start series. 

Explore Git Sources and why we need them in [Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/gitops-quick-start/products/). 

[Quick start: Creating a Git Source]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create.md)




