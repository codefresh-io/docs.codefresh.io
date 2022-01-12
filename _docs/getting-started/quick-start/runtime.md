---
title: "WIP: 3. Install runtime"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---


Installing the runtime installs the Codefresh Software Development Platform (CSDP), comprising Argo project components and CSDP-specific components. We maintain an enterprise-supported version of the Argo CD components, derived from a conformed fork of the Argo ecosystem.

### About runtime installation
Installing a runtime includes installing the:  
1. CSDP CLI.  
2. CSDP runtime from the CLI in a specific namespace on your cluster. 
  Every runtime installation makes commits to two Git repos: 
   * Runtime install repo: The installation repo that manages the runtime itself with Argo CD. If the repo URL you provide does not exist, CSDP runtime creates it automatically.   
   * Git Source repo: Created automatically during runtime installation. The repo with the demo resources required for the sample `Hello World` pipelines we provide. 

### Before you begin
A runtime requires a Git token for authentication to the Git installation repository.
Have your GitHub Personal Authentication Token (PAT) ready with a valid expiration date and access permissions:
* Expiration: Either the default of 30 days or any duration you consider logical.
* Access scope: Set to `repo`

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/github-pat.png" 
   url="/images/getting-started/github-pat.png" 
   alt="GitHub PAT permissions" 
   caption="GitHub PAT permissions"
   max-width="30%" 
   %}  

  If you need detailed information on GitHub tokens, see the [GitHub article](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

### Download the CSDP CLI
Downloading the CSDP CLI requires you to select the download mode and OS, generate an API key and authentication context, as instructed in the CSDP UI.
1. In the Welcome page, select **+ Install Runtime**.
1. Download the Codefresh CLI:
  * Select one of the methods. 
  * Generate the API key and create the authentication context. 
    {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-download-cli.png" 
   url="/images/getting-started/quick-start/quick-start-download-cli.png" 
   alt="Download CLI to install runtime" 
   caption="Download CLI to install runtime"
   max-width="30%" 
   %} 
### Install CSDP runtime
For the quick start, you will install the runtime through the CSDP CLI that you downloaded previously. 

1. To start runtime installation, run `cf runtime install`.
1. Follow the prompts in the CLI wizard to complete the installation:
   * **Runtime name**: The name of your runtime, starting with a lower-case character, and including up to 63 characters and numbers. Example: `csdpproduction`
	* **Select Kube context**: Your current context is highlighted. Press Enter to select it, or use the arrow keys to select a different context. 
	* **Repository URL**: The GitHub repo for the installation definitions, in the format `https://github.com/[repo_name]`. Example: `https:github.com/cf_production_install`
	* **Git provider API token**: The GitHub PAT for access to the GitHub repo.
	* **Ingress host (required)**: The external IP address or host name of the ingress host controller configured for your cluster.
	* **Install Codefresh demo resources?** Press Enter to confirm. Demo resources are saved in a new Git Source repo, created by CSDP. They include resources for two Hello World pipelines, one with a Cron trigger condition and the other with a Git event trigger condition.
	* **Do you wish to continue with runtime install?** Press Enter to confirm and start runtime installation.
1. Wait for the runtime installed successfully message.

### Validate successful installation 
The **Runtimes** dashboard shows the runtime you just installed. You can drill down into the runtime to see its components and Git Sources.   

1. In the CSDP UI, go to the [**Runtimes**]((https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}) dashboard.  

   {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-runtime-dashboard.png" 
   url="/images/getting-started/quick-start/quick-start-runtime-dashboard.png"
   alt="Runtime dashboard after successful installation" 
   caption="Runtime dashboard after successful installation"
   max-width="30%" 
   %} 

1. Select the runtime name to drill down, and then select the tabs to view the runtime components and Git Sources.
  * Runtime components  
     {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-runtime-components.png" 
   url="/images/getting-started/quick-start/quick-start-runtime-components.png"
   alt="Runtime components tab" 
   caption="Runtime components tab"
   max-width="30%" 
   %} 

 

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-source.png" 
   url="/images/getting-started/quick-start/quick-start-git-source.png"
   alt="Git Source tab" 
   caption="Git Source tab"
   max-width="30%" 
   %} 


### What to do next
[Trigger the demo Hello World pipeline]({{site.baseurl}}/docs/getting-started/quick-start/hello-world)