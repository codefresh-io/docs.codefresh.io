---
title: "Installation"
description: ""
group: runtime
toc: true
---


Codefresh runtime installs the Codefresh Software Development Platform (CSDP), comprising Argo CD components and CSDP-specific components. The Argo CD components are derived from a fork of the Argo ecosystem, and do not correspond to the open-source versions available.

There are two parts to installing runtimes:
1. Installing the CSDP CLI
2. Installing the CSDP runtime from the CLI. The runtime is installed in a specific namespace on your cluster. You can install more runtimes on different clusters in your deployment.  
 Every runtime installation makes commits to two Git repos: 
   * Runtime install repo: The installation repo that manages the runtime itself with Argo CD. If the repo URL does not exist, runtime creates it automatically.   
   * Git Source repo: Created automatically during runtime installation. The repo where you store manifests to run CSDP pipelines. 

 See [CSDP architecture]({{site.baseurl}}/docs/getting-started/architecture).

### Where do you install runtimes?
* If this is your first CSDP installation, in the Welcome page, select **+ Install Runtime**.
* To install additional runtimes, in the CSDP UI, go to the [**Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page, and select **+ Add Runtimes**. 

### Installing the CSDP CLI
* CLI mode  
  Install the CSDP CLI using the option that best suits you: `curl`, `brew`, or standard download. If you are not sure which OS to select for `curl`, simply select one, and we automatically identify and select the right OS for CLI installation.

### Installing the CSDP runtime
Install CSDP runtime through the CLI wizard, or by running a silent install:
* CLI wizard: Run `cf runtime install`, and follow the prompts to enter the required values
* Silent install: Pass the mandatory flags in the install command:  
  `cf runtime install <runtime-name> --repo <git-repo> --git-token <git-token> --silent`  

#### Runtime prerequisites
Before you install the CSDP runtime, verify that:
* Your deployment conforms to our [system requirements]({{site.baseurl}}/docs/runtime/requirements)
* You have a Personal Access Token (PAT) for authentication to the Git installation repo that you will create or select during runtime installation.   
  To create a Git token, see [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
  > When you create the Git token, set the correct expiration date and scope: 
   Expiration: Default is `30 days`  
   Scope: `repo` and `admin-repo.hook` 


#### Runtime installation flags

**Runtime name**  
  The runtime name must start with a lower-case character, and can include up to 62 lower-case characters and numbers.  

  Silent install: Mandatory parameter.

**Kube context**  
  If you have more than one Kube context, the current context, which is the cluster currently the default for `kubectl`, is selected by default.  
  * CLI wizard: Select the Kube context from the list displayed.
  * Silent install: Explicitly specify the Kube context with the `--context` flag.

**Ingress class**  
  * If you have more than one ingress class configured on your cluster:
    * CLI wizard: Select the ingress class for runtime installation from the list displayed. 
    * Silent install: Explicitly specify the ingress class through the `--ingress-class` flag. Otherwise, runtime installation fails.
  * If the ingress class does not have a valid SSL certificate, you can continue with the installation in insecure mode, which disables certificate validation.  
    Silent install: If the ingress host does not have a valid certificate, to continue with the installation, add the `--insecure-ingress-host` flag, and set the value to `true`.  

**Insecure flag**  
   For _on-premises installations_, if the Ingress controller does not have a valid SSL certificate, to continue with the installation, add the `--insecure` flag to the installation command.  
   
**Repository URLs**  
  The GitHub repository to house the installation definitions. If the repo doesn't exist, CSDP creates it during runtime installation.  

  Silent install: Mandatory. Add the `--repo` flag. 


**Git provider API token**  
  The Git token authenticating access to the GitHub installation repository.  

  Silent install: Mandatory. Add the `--git-token` flag.

**Codefresh demo resources**  
  Optional. Install demo pipelines to use as a starting point to create your own pipelines. We recommend installing the demo resources as these are used in our quick start tutorials.  

  Silent install: Optional. Add the `--demo-resources` flag. By default, set to `true`.


#### Runtime components

**Git repositories**   
 
* Runtime install repo: The installation repo contains three folders: apps, bootstrap and projects, to manage the runtime itself with Argo CD.  
* Git source repository: Created with the name `[repo_name]_git-source`. This repo stores manifests to run pipelines with sources, events, workflow templates.

**Argo CD components**  

* Project, comprising an Argo CD AppProject and an ApplicationSet
* Installations of the following applications in the project:
  * Argo CD 
  * Argo Workflows 
  * Argo Events
  * Argo Rollouts
  
**Codefresh-specific components**  

* Codefresh Applications in the Argo CD AppProject:  
  * App-proxy facilitating behind-firewall access to Git 
  * Git Source entity that references the`[repo_name]_git-source`  

Once the runtime is successfully installed, it is provisioned on the Kubernetes cluster, and displayed in the **Runtimes** page. 

### What to read next
[Manage runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)  
[Manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/)  
[Troubleshooting runtime installation]({{site.baseurl}}/docs/troubleshooting/runtime-issues/)
