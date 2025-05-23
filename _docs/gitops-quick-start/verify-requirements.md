---
title: "Quick start: Preparing and installing GitOps Runtime"
description: "Verify you're ready for Hybrid GitOps Runtime installation"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/quick-start/gitops-quick-start/verify-requirements/
---


GitOps Runtime Installation Quick Start
This guide walks you through installing the GitOps Runtime in Codefresh. It covers system requirements, prerequisites, and installation options for both existing and new Argo CD instances.

For detailed configuration, see Configuring the GitOps Runtime.

1. Runtime Installation Modes
Codefresh supports two installation modes for the GitOps Runtime:

Install with an existing Argo CD instance (default)
Install with a new Argo CD instance
2. System Requirements
Before installing, ensure your environment meets the GitOps Runtime system requirements.

3. Prerequisites
Review the prerequisites to prepare your environment, including:

Access to a Kubernetes cluster
Required permissions
Git repository setup for configuration
4. Configuring values.yaml
Customize the installation using a values.yaml file. See values.yaml reference for available options.

5. Installing with an Existing Argo CD Instance (Default)
To install the GitOps Runtime using an existing Argo CD instance, follow these steps:

Ensure Argo CD is already deployed.
Apply the required configuration.
Run the installation command.
For full details, see Installing with an existing Argo CD.

6. Installing with a New Argo CD Instance
If you do not have an existing Argo CD instance, Codefresh can install one for you. This method includes:

Deploying a new Argo CD instance.
Installing the GitOps Runtime alongside it.
See Installing with a new Argo CD instance for more details.

What’s Next?
Continue with Configuring the GitOps Runtime to set up Git sources and other configurations.










The GitOps Runtime is installed through a Helm chart.  
For configuration details, refer to the Codefresh `values.yaml` file, which includes all available arguments (mandatory and optional) with descriptions. Go to [values.yaml](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/values.yaml){:target="\_blank"}. 

## Quick start assumptions for Runtime installation

### First GitOps Runtime in account
The quick start assumes you are installing the first Hybrid GitOps Runtime in your Codefresh account. 

### Tunnel-based access mode
Hybrid GitOps Runtimes support tunnel-based and ingress-based access modes.    
For the quick start, we'll use the default tunnel-based access mode, which does not require an ingress controller.  

For details on access modes, see [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).

### GitHub as the Git provider  
The quick start uses GitHub as the Git provider. 
For the installation, you can
For other Git providers and token requirements, see [Git tokens for GitOps]({{site.baseurl}}/docs/security/git-tokens/).  

##### Git Runtime token
Have your GitHub Runtime token ready with a valid expiration date and access permissions:
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

##### Git user token
Have your GitHub user token ready with a valid expiration date and access permissions:
{::nomarkdown}<ul><li>Classic:<ul><li><code class="highlighter-rouge">repo</code></li></ul><li>Fine-grained:<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code></li><li>Repository permissions:<ul><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li></ul></li></ul></li></ul>{:/}


For detailed information on GitHub tokens, see the [GitHub article](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

### Shared Configuration Repository
As part of the installation, you will be required to define the Shared Configuration Repository for your account. The shared repo stores account-level configuration settings and manifests, common to all Runtimes in the account. 
Because the Shared Configuration Repo is defined at the account-level, the Git provider you select for the first Runtime in your account is used for all the other Runtimes in the same account. 

Learn more on the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).

### Configuration Runtime
A Configuration Runtime is a GitOps Runtime designated to manage platform-level resources that are not tied to a specific Runtime. These resources, essential for features like products and promotions in GitOps ensure smooth platform operations.  

Codefresh automatically designates the first GitOps Runtime in your account as the Configuration Runtime. When designated, Codefresh creates a folder entitled `configuration` within `resources` in the Shared Configuration Repository to store product and promotion configuration settings.  

Learn more on [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/).


## System requirements
Check the [system requirements]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-new-argo-cd/#minimum-system-requirements).  


## Prerequisites





### System requirements 
Verify that your deployment environment meets the minimum requirements for Hybrid GitOps Runtimes.  

### SealedSecret controller
Ensure that the Runtime cluster does not have SealedSecret controller components.

### Argo project components & CRDs
Ensure that the Runtime cluster does not include Argo components or Custom Resource Definitions (CRDs), such as Argo Rollouts, Argo CD, Argo Events, and Argo Workflows.  

##### Verify clean cluster configuration
* Run this command to verify that the Runtime cluster does not include Argo components:

`kubectl get crd | grep -E 'argoproj\.io|sealedsecrets\.bitnami\.com' && printf "\nERROR: Cluster needs cleaning\nUninstall the projects listed above\n" || echo "Cluster is clean. It's safe to install the GitOps Runtime"`

If you have Argo components, the result will be similar to the example below.


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/runtimes/qs-runtime-argo-projects-in-cluster-result.png" 
	url="/images/quick-start/runtimes/qs-runtime-argo-projects-in-cluster-result.png" 
	alt="Argo components on cluster" 
	caption="Argo components on cluster"
  max-width="60%" 
%}

## What's next
You are now ready to install the GitOps Runtime.

[Quick start: Installing a Hybrid GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/runtime/)
