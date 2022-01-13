---
title: "Installation"
description: ""
group: runtime
toc: true
---


Codefresh runtime installs the Codefresh Software Development Platform (CSDP), comprising Argo CD components and CSDP-specific components. The Argo CD components are derived from a fork of the Argo ecosystem, and do not correspond to the open-source versions available.

There are two parts to installing runtimes:
1. Installing the CSDP CLI, a one-time action, typically required only for initial CDSP setup.
2. Installing the CSDP runtime from the CLI. The runtime is installed in a specific namespace on your cluster. You can install more runtimes on different clusters in your deployment.  
 Every runtime installation makes commits to two Git repos: 
   * Runtime install repo: The installation repo that manages the runtime itself with Argo CD. If the repo URL does not exist, runtime creates it automatically.   
   * Git Source repo: Created automatically during runtime installation. The repo where you store manifests to run CSDP pipelines. 

Before installation, review [CSDP architecture]({{site.baseurl}}/docs/getting-started/architecture).


### Where do you install runtimes?
* If this is your first CSDP installation, in the Welcome page, select **+ Install Runtime**.
* To install additional runtimes, select **Account Settings**, and then from the sidebar, select **Configuration > Runtimes**. From the top-right, select **+ Add Runtime**.

### Installing the CSDP CLI
* CLI mode  
  Install the Codefresh CLI using the option that best suits you: Curl, Brew, or standard download. If you are not sure which OS to select for Curl and Brew, simply select one, and Codefresh automatically identifies and selects the right OS for CLI installation

### Installing the CSDP runtime

#### Runtime prerequisites
Before you install the CSDP runtime, verify that:
* Your deployment conforms to our [system requirements]({{site.baseurl}}/docs/runtime/requirements)
* You have a Personal Access Token (PAT) for authentication to the Git installation repo, that you will create or select during runtime installation.   
  To create a Git token, see [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
  > When you create the Git token, set the correct expiration date and scope: 
   Expiration: Default is `30 days`  
   Scope: `repo`

#### Runtime installation
To install a CSDP runtime, you can either pass the flags in the runtime install command in the UI, or run `cf runtime install`, and follow the prompts in the CSDP CLI wizard to enter the required values.

#### Runtime installation flags

**Runtime name**  
   The runtime name must start with a lower-case character, and can include up to 62 lower-case characters and numbers.

**Kube context**  
  Select the Kube context from the list of available contexts. The current context, which is the cluster currently the default for `kubectl`,
   is selected by default.  

**Repository URLs**  
  The GitHub repository to house the installation definitions. If the repo doesn't exist, CSDP creates it during runtime installation.  

**Git provider API token**  
  The Git token authenticating access to the GitHub installation repository.  

**Ingress host**  

  The IP address or host name of the ingress controller component.  


**Codefresh demo resources**  

  Optional. Install demo pipelines to use as a starting point to create your own pipelines. We recommend installing the demo resources as these are used in our quick start tutorials.

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

Once the runtime is successfully installed, it is provisioned on the Kubernetes cluster, and displayed in the Runtimes page. 

### What to read next
[Manage runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)
[Manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/)
