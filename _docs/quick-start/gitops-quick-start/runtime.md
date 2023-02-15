---
title: "Install a hybrid runtime"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---


Install the hybrid runtime on your K8s cluster. Installing the hybrid runtime installs Argo-project and Codefresh-specific components. The Argo Project is an enterprise-supported version of the Argo CD components, derived from a conformed fork of the Argo ecosystem.

### About hybrid runtime installation
Installing a hybrid runtime includes installing the:  
1. GitOps CLI  
2. Codefresh hybrid runtime from the CLI in a specific namespace on your cluster. 
  Every hybrid runtime installation makes commits to three Git repos: 
   * Runtime installation repo: The installation repo that manages the runtime itself with Argo CD. If the repo URL you provide does not exist, the runtime creates it automatically.   
   * Git Source repo: Created automatically during runtime installation. The repo with the demo resources required for the sample `Hello World` pipelines we provide. 
   * Shared configuration repo: A repository that stores configuration manifests shared across runtimes.
 
### Before you begin

#### Tunnel-based runtime
Hybrid GitOps runtimes supports tunnel-based and ingress-based configurations.  
For the quick start, we will use the tunnel-based mode which is the default access mode and does not require an ingress controller.  
For details, review [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).

#### Git provider tokens  
  A hybrid runtime requires a Git token for authentication to the Git installation repository based on your Git provider.  
  The quick start uses GitHub as the Git provider. For other Git providers and token requirements, see [Git provider and repo flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#git-provider-and-repo-flags).  

  Have your GitHub Personal Authentication Token (PAT) ready with a valid expiration date and access permissions:
    * Expiration: Either the default of 30 days or any duration you consider logical.
    * Access scopes: Set to `repo` and `admin-repo.hook`

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   url="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   alt="GitHub PAT permissions" 
   caption="GitHub PAT permissions"
   max-width="30%" 
   %}  

  If you need detailed information on GitHub tokens, see the [GitHub article](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

### Download the Codefresh CLI
Downloading the Codefresh CLI requires you to select the download mode and OS, generate an API key, and authentication context, as instructed in the UI.
1. In the Welcome page, select **+ Install Runtime**.
1. Download the Codefresh CLI:
  * Select one of the methods. 
  * Generate the API key and create the authentication context. 

   {% include 
   image.html 
   lightbox="true" 
   file="/images/runtime/gitops-cli-download.png" 
   url="/images/runtime/gitops-cli-download.png"
   alt="Download GitOps CLI to install runtime" 
   caption="Download GitOps CLI to install runtime"
   max-width="30%" 
   %} 
### Install hybrid runtime
For the quick start, we will use the CLI wizard to install the Hybrid GitOps Runtime. 

1. To start runtime installation, run `cf runtime install`.  
  >If you don't have a valid SSL certificate for the Ingress controller, and want to continue with the installation, add the `--insecure` flag to the runtime command. 
1. Follow the prompts in the CLI wizard to complete the installation:
  * **Runtime name**: The name of your runtime, starting with a lower-case character, and including up to 63 characters and numbers. Example: `codefreshproduction`
	* **Select Kube context**: Your current context is highlighted. Press Enter to select it, or use the arrow keys to select a different context. 
	* **Repository URL**: The GitHub repo for the installation definitions, in the format `https://github.com/[user-or-org-name]/[repo_name]`. Example: `https//:github.com/codefresh/cf_production_install`. 
	* **Git runtime token**: The GitHub PAT for access to the installation repo.
	* **Install Codefresh demo resources?** Press Enter to confirm. Demo resources are saved in a new Git Source repo, created by Codefresh. They include resources for two Hello World pipelines, one with a Cron trigger condition, and the other with a Git event trigger condition.
	* **Do you wish to continue with runtime install?** Press Enter to confirm and start runtime installation.
1. Wait for the runtime installed successfully message.

### Validate successful installation 
The **Runtimes** dashboard shows the hybrid runtime you just installed. You can drill down into the runtime to see its components and Git Sources.   

1. In the Codefresh UI, go to the [**Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} dashboard.  

   {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/hybrid-runtime-in-list.png" 
   url="/images/quick-start/gitops/hybrid-runtime-in-list.png"
   alt="Succesfully installed Hybrid GitOps runtime in Runtimes > List View" 
   caption="Succesfully installed Hybrid GitOps runtime in Runtimes > List View"
   max-width="60%" 
   %} 

{:start="2"}
1. Select the runtime name to drill down, and then select the tabs to view the runtime components and Git Sources.

     {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/hybrid-runtime-components.png" 
   url="/images/quick-start/gitops/hybrid-runtime-components.png"
   alt="Hybrid GitOps Runtime Components tab" 
   caption="Hybrid GitOps Runtime Components tab"
   max-width="30%" 
   %} 

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/hybrid-runtime-gitsources.png" 
   url="/images/quick-start/gitops/hybrid-runtime-gitsources.png"
   alt="Hybrid GitOps Runtime Git Sources tab" 
   caption="Hybrid GitOps Runtime Git Sources tab"
   max-width="30%" 
   %} 

### What to do next
[Create resources for codefresh-guestbook application]({{site.baseurl}}/docs/getting-started/quick-start/create-app-specs)  
OR  
[Trigger the Hello World example pipeline]({{site.baseurl}}/docs/getting-started/quick-start/hello-world)
