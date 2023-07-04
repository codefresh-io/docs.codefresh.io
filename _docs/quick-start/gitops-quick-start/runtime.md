---
title: "Install a Hybrid GitOps Runtime"
description: "Install a "
group: getting-started
sub-group: quick-start
redirect_from
toc: true
---



Get up and running with Codefresh by installing the Hybrid Runtime for GitOps via Helm.
The Runtime is installed through a Helm chart. The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}. It contains all the arguments that can be configured, including optional ones.
 
## Quick start assuptions

### Tunnel-based runtime
Hybrid GitOps Runtimes supports tunnel-based and ingress-based access modes.  
For the quick start, we'll use the tunnel-based mode which is the default access mode and does not require an ingress controller.  
For details, review [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).

### GitHub as Git provider  
Hybrid GitOps Runtimes require Git tokens for authentication to the Git installation repository based on your Git provider.  
The quick start uses GitHub as the Git provider. For other Git providers and token requirements, see ????[Git provider and repo flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#git-provider-and-repo-flags).  

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

### Shared Configuration Repository
When you select the Git provider, Codefresh prompts you to also select the Shared Configuration Repository for your account. The repo stores account-level configuration settings and manifests.
Because the Shared Configuration Repo is defined at the account-level, the Git provider you select for the first Runtime in your account is used for all the other Runtimes in the same account. 
Read up on the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).







## Before you begin

**Notes & assumptions**  
* Your cluster does not have [Argo project components & CRDs](#argo-project-components--crds).

       The [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) is a Git repository with configuration manifests shared between all the Hybrid GitOps Runtimes within the same account.
**Automated validation**  
Codefresh automatically validates the `values` file before initiating the installation. If there is a validation failure, Codefresh terminates the installation.  

* Validation failures  
  To get more details on the reasons for the failure, run:  
    `kubectl logs jobs/validate-values -n ${NAMESPACE}`  
    where:  
      * `{NAMESPACE}` must be replaced with the namespace of the Hybrid GitOps Runtime. 



### Copy & run Helm installation command

<!--- 
1. In the Welcome page, select **+ Install Runtime**.
1. From Runtimes in the sidebar, select **GitOps Runtimes**.
1. Set up your Git provider account:
    1. If not GitHub, select the Git provider.  
    1. Define the provider's API URL.
    1. Define the URL of the **Shared Configuration Repository**.
    1. Click **Next**.
    * For OAuth: 
      * Click **Authorize Access to Git Provider**.
      * Enter your credentials, and select **Sign In**.
      * If required, as for example with two-factor authentication, complete the verification. 
    * For Git token authentication, in the **Git Runtime Token** field, paste the Git runtime token you generated.
1. Optional. To configure SSH access to Git, expand **Connect Repo using SSH**, and then paste the raw SSH private key into the field. 
  For more information on generating SSH private keys, see the official documentation:
  * [GitHub](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent){:target="\_blank"}
  * [GitLab](https://docs.gitlab.com/ee/ssh/#generating-a-new-ssh-key-pair){:target="\_blank"}
  * [Bitbucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html){:target="\_blank"}
  * [Azure](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops&tabs=current-page){:target="\_blank"}
Click **Configure**. 
  
-->



1. In the Welcome page, select **+ Install Runtime**.
1. From Runtimes in the sidebar, select **GitOps Runtimes**.
1. Set up your Git provider account:
    1. If not GitHub, select the Git provider.  
    1. Define the provider's API URL.
    1. Define the URL of the **Shared Configuration Repository**.
    1. Click **Next**.
1. Install the Hybrid GitOps Runtime:
    1. Click **Generate** to create a new API key.
    1. Retain the default values for the runtime name and the runtime namespace, `codefresh`.
    1. Copy the command in _Step 3_ and run it to add the repository for the Helm chart. You don't need to change/add anything to the command.
    1. Copy the command in _Step 4_ and run it to install the Helm chart for the Hybrid GitOps Runtime:   
        where:  
        * `cf-gitops-runtime` is the default name of the Helm release.  
        * `codefresh` is the default namespace in which to install the Hybrid GitOps runtime.
        *  `<codefresh-account-id>` is mandatory only for _tunnel-based Hybrid GitOps Runtimes_ which is the default access mode, and is automatically populated by Codefresh in the command. 
        * `<codefresh-token>` is the API key you generated, and is automatically populated in the command.
        * `codefresh` is the default name of the runtime. 
        * `cf-gitops-runtime` is the default name of the repo in which to add the Helm chart. 
        * `--devel` automatically targets the latest version.???  

{% include
image.html
lightbox="true"
file="/images/quick-start/gitops/install-helm-command.png"
url="/images/quick-start/gitops/install-helm-command.png"
alt="Quick Start: Install Hybrid GitOps Runtime"
caption="Quick Start: Install Hybrid GitOps Runtime"
max-width="60%"
%}

1. Wait for a few minutes, and then click **Close**.
   You are taken to the List View for GitOps Runtimes where you can see the Hybrid GitOps Runtime you added prefixed with a red dot.
1. Optional. Complete the installation by clicking **Configure as Argo Application**.  
  There is no need for any action from you, as Codefresh takes care of the configuration.
  By configuring the Hybrid GitOps Runtime as an Argo Application, you can ensure that GitOps is the single source of truth for the Runtime. 


## What to do next
[Create resources for codefresh-guestbook application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-specs/)  

