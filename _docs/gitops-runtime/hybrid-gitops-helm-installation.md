---
title: "Hybrid GitOps Runtime installation"
description: "Provision Hybrid GitOps Runtimes through Helm"
group: gitops-runtime
redirect_from:
  - /docs/installation/gitops/hybrid-gitops/
  - /docs/installation/gitops/
toc: true
---

<!--- {{site.data.callout.callout_warning}}
**IMPORTANT**   
We have transitioned to a Helm-based installation for Hybrid GitOps Runtimes for improved experience and performance, which is now the default Runtime for GitOps. <br><br>
The CLI-based installation for Hybrid GitOps is considered legacy. We will deprecate this installation mode permanently in the coming months.<br>
You can migrate existing CLI-based GitOps Runtimes to Helm-based ones, as described in [Migrating GitOps Runtimes from CLI to Helm]({{site.baseurl}}/docs/gitops-runtime/migrate-cli-runtimes-helm/). 
{{site.data.callout.end}}

 For GitOps, Codefresh offers the option of installing Hosted and Hybrid GitOps Runtimes. For a comparison, see [Hosted vs. Hybrid GitOps]({{site.baseurl}}/docs/gitops-runtime/#hosted-vshybrid-gitops). --> 


This article walks you through the process of installing Hybrid GitOps Runtimes in your Codefresh accounts using Helm charts on a _clean cluster_.  
To install the GitOps Runtime an existing Argo CD installation, see [Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/gitops-runtime/argo-with-gitops-side-by-side/).

You can install a single GitOps Runtime on a cluster. To install additional Runtimes in the same account, each account must be on a different cluster. Every Runtime within the same account must have a unique name.


## GitOps Runtime installation


##### First-time GitOps Runtime installation
If this is your first time installing a GitOps Runtime in your Codefresh account on a clean cluster:
  * [System requirements](#minimum-system-requirements): Check the minimum system requirements to ensure smooth installation.
  * [Complete prerequisites](#preparing-for-hybrid-gitops-runtime-installation): Before starting the installation, complete prerequisites.
  * [Review values.yaml validation](#valuesyaml-validation)
  * [Step-by-step installation](#install-first-gitops-runtime-in-account): Follow our step-by-step guide to install the Hybrid GitOps Runtime from the Codefresh UI.



##### Additional GitOps Runtime installations  
If you have already installed a GitOps Runtime in your account and want to install additional Runtimes on different clusters within the same account, you can continue with a [simplified installation](#install-additional-gitops-runtimes-in-account) from the Codefresh UI, or use [Terraform](/install-gitops-runtime-via-terraform).  

When installing additional GitOps Runtimes, Git provider, Shared Configuration Repository, and the repository for the Helm chart, for example, are not required, as they have been already set up for your account.



 
{{site.data.callout.callout_warning}}
**ArgoCD password WARNING**  
  Avoid changing the Argo CD password using the `argocd-initial-admin-secret` via the Argo CD UI. Doing so can cause system instability and disrupt the Codefresh platform.  
{{site.data.callout.end}}




Terminology clarifications:  
In the documentation, Hybrid GitOps Runtimes are also referred to as GitOps Runtimes.  


## `values.yaml` validation
Before initiating the installation, Codefresh automatically validates the `values.yaml` file to verify that the supplied values are correct.
A validation error will automatically terminate the installation.

You can disable automated validation globally for all installation settings, or for only the ingress controller for example, and run validation manually. 

### Validated settings
The table below lists the settings validated in the `values` file.

{: .table .table-bordered .table-hover}
|**Setting**              |**Validation**            | 
| --------------         | --------------           |  
|**userToken**            |If explicitly defined, or defined as a `secretKeyRef` which exists in the current k8s context and the defined namespace.|
|**Account permissions**  |If the user has admin permissions for the account in which they are installing the runtime. |
| **Runtime name**        |If defined, and is unique to the account. |
|**Access mode**          |{::nomarkdown}<ul><li>For tunnel-based (the default), if <code class="highlighter-rouge">accountId</code> is defined, and matches the account of the <code class="highlighter-rouge">userToken</code> defined in the file.</li><li>For ingress-based, if the hosts array contains at least one entry that is a valid URL (successful HTTP GET).</li><li>If both tunnel-based and ingress-based access modes are disabled, if <code class="highlighter-rouge">runtime.ingressUrl</code> is defined.</li></ul>{:/} |
|**gitCredentials**      |{::nomarkdown}<ul><li>When defined, if includes a Git password either explicitly, or as a <code class="highlighter-rouge">secretKeyRef</code>, similar to <code class="highlighter-rouge">userToken</code>.</li><li>The password or token has the required permissions in the Git provider.</li></ul>{:/} |

### Validation failures
If there is a validation failure, Codefresh terminates the installation with the error message:  
`Job has reached the specified backoff limit`  

To get more detailed and meaningful information on the reason for the validation failure, run:  
`kubectl logs jobs/validate-values -n ${NAMESPACE}`  
where:  
* `{NAMESPACE}` must be replaced with the namespace of the Hybrid GitOps Runtime.

### Disable global installation validation
You may want to disable automated validation for specific scenarios, such as to address false-negatives.

To do so, either add the `--set installer.skipValidation=true` flag to the Helm install command, or the `installer.skipValidation: true` the `values` file. 


##### In install command 
`--set installer.skipValidation=true` 

##### In values file 
{% highlight yaml %}
{% raw %} 
...
installer: skipValidation: true
... 
{% endraw %}
{% endhighlight %}

### Disable ingress validation
Ingress validation checks if the ingress URL exists and responds to web requests. 
During a GitOps Runtime installation, the ingress might not be active yet, causing DNS errors despite correct configuration. Disabling ingress validation allows the installation to proceed, assuming the ingress will work once the Runtime is fully operational.

Similar to disabling installation validation globally, you disable the validation for ingress by either adding the flag to the Helm install command, or by adding the line to the relevant section in the `values` file. 

##### In install command

`--set global.runtime.ingress.skipValidation=true`

##### In values file 

{% highlight yaml %}
{% raw %} 
...
global:
  runtime:
    ingress:
      skipValidation: true
... 
{% endraw %}
{% endhighlight %}

### Manually validate values.yaml
To manually validate the values file, run:  
`cf helm validate --values <values_file> --namespace <namespace> --version <version>`  
where:  
* `<values_file>` is the name of the `values.yaml` used by the Helm installation.
* `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either the default `codefresh`, or the custom name you intend to use for the installation. The Namespace must conform to the naming conventions for Kubernetes objects.
* `<version>` is the version of the runtime to install.

## Install first GitOps Runtime in account
If this is the first GitOps Runtime installation in your Codefresh account, install the Runtime from the Codefresh UI, following the step-by-step installation procedure.

The Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}, contains all the arguments you can configure, including optional ones. 


### Before you begin
* Make sure you meet the [minimum requirements]({{site.baseurl}}/docs/gitops-runtime/runtime-system-requirements.md#minimum-system-requirements) for installation
* Verify that you complete all the prerequisites:  
  * [Switch ownership of Argo Project CRDs]
  * [Prerequisites: Clean-cluster installation](#preparing-for-hybrid-gitops-runtime-installation)  
  * [Cluster with Community Argo CD]({{site.baseurl}}/docs/gitops-runtime/argo-with-gitops-side-by-side/#prepare-argo-cd-cluster-for-gitops-runtime-installation)
* Git provider requirements:
    * [Git Runtime token with the required scopes]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-token-scopes) which you need to supply as part of the Helm install command
    * [Git user token]({{site.baseurl}}/docs/security/git-tokens/#git-personal-tokens) with the required scopes for Git-based actions 
    * Server URLs for on-premises Git providers
* For ingress-based runtimes only, verify that these ingress controllers are configured correctly:
  * [Ambassador ingress configuration]({{site.baseurl}}/docs/gitops-runtime/runtime-ingress-configuration/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/gitops-runtime/runtime-ingress-configuration/#aws-alb-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/gitops-runtime/runtime-ingress-configuration/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/gitops-runtime/runtime-ingress-configuration/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/gitops-runtime/runtime-ingress-configuration/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/gitops-runtime/runtime-ingress-configuration/#traefik-ingress-configuration)



### Step 1: Select Hybrid Runtime install option

1. In the Welcome page, select **+ Install Runtime**.
1. Select **Hybrid Runtime**, and click **Add**.

 {% include
image.html
lightbox="true"
file="/images/runtime/helm/helm-select-hybrid-runtime.png"
url="/images/runtime/helm/helm-select-hybrid-runtime.png"
alt="Select Hybrid GitOps Runtime for installation"
caption="Select Hybrid GitOps Runtime for installation"
max-width="40%"
%}

{:start="3"}
1. Continue with [Step 2: Set up GitOps Git provider](#step-2-set-up-gitops-git-provider).

### Step 2: Set up GitOps Git provider
As a one-time action, define the Shared Configuration Repository and the Git provider to associate with your account.  

The Git provider you select for the first GitOps Runtime in your account is used for all the other Runtimes installed in the same account.

#### Shared Configuration Repository
The [Shared Configuration Repository]({{site.baseurl}}/docs/gitops-runtime/shared-configuration/) is a Git repository with configuration manifests shared between all the Hybrid GitOps Runtimes within the same account. Codefresh identifies the Git provider from the URL of the Shared Configuration Repo, and for cloud providers, automatically populates the Git Provider and the API URL fields.

You can specify only the repository URL, or add the path, reference a branch, or both:

`<repo_url>.git[/<path>][?ref=<branch>]`

where:
* `<repo_url>.git` is required and is the repository URL. This is the standard URL format which references the root of the default branch in the repository. The `.git` suffix is recommended. 
  Example: `https://github.com/codefresh-io/our-isc.git`  

* `<path>` is optional, and points to a specific path within the repository.  
  Use `<path>` if you want your configuration files within a subdirectory.  
  Example: `https://github.com/codefresh-io/our-isc.git/some/path`

* `<branch>` is optional, and references a specific branch in the repository.  
  Example: `https://github.com/codefresh-io/our-isc.git?ref=isc-branch`

#### Git providers <!--- is this relevant for Argohub -->
On-premises Git providers require you to define the API URL:
* GitHub Enterprise: `https://<server-url>/api/v3`
* GitLab Server: `<server-url>/api/v4`
* Bitbucket Server: `<server-url>`


<br>

##### How to

1. Define the URL of the **Shared Configuration Repository**.
1. If required, select the **Git provider** from the list.
1. If required, define the **API URL** for the Git provider you selected.

 {% include
image.html
lightbox="true"
file="/images/runtime/helm/helm-define-isc-git-provider.png"
url="/images/runtime/helm/helm-define-isc-git-provider.png"
alt="Define Shared Configuration Repo and Git provider"
caption="Define Shared Configuration Repo and Git provider"
max-width="40%"
%}

{:start="4"}
1. Click **Next**.
1. Continue with [Step 3: Install Hybrid Runtime](#step-3-install-hybrid-gitops-runtime).

### Step 3: Install Hybrid GitOps Runtime

Install the Hybrid GitOps Runtime through the Helm chart. The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/tree/main/charts/gitops-runtime){:target="\_blank"}.


{{site.data.callout.callout_tip}}
**TIP**   
  Before initiating the installation, Codefresh automatically validates the `values.yaml` file to verify that the supplied values are correct.<br> 
  If the Helm installation is terminated with the error message: `Job has reached the specified backoff limit`, get more detailed information on the reason for the validation failure with:  
  `kubectl logs jobs/validate-values -n ${NAMESPACE}`, replacing `{NAMESPACE}` with the namespace of the Hybrid GitOps Runtime. 
{{site.data.callout.end}}
<br><br>


**Runtime Name**  
If you define a custom name for the Hybrid GitOps Runtime, it must start with a lower-case character, and can include up to 38 lower-case characters and numbers.

**Namespace**  
The Namespace must conform to the naming conventions for Kubernetes objects.

**Access modes**  
You can define one of three different access modes:
* Tunnel-based, the default mode, is automatically enabled when the other access modes are not defined in the installation command.
* Ingress-based, uses an ingress controller, which, depending on the type of ingress controller, may need to be configured both before and after installation. See [Ingress controller configuration](#ingress-controller-configuration) in this article.
* Service-mesh-based, which requires explicitly disabling the tunnel- and ingress-based modes in the installation command. The service mesh may also need to be configured before and after installation. See [Ingress controller configuration](#ingress-controller-configuration) in this article.

<br>

##### How to
1. To generate your Codefresh API key, click **Generate**. 

 {% include 
image.html 
lightbox="true" 
file="/images/runtime/helm/helm-install-hybrid-runtime.png" 
url="/images/runtime/helm/helm-install-hybrid-runtime.png" 
alt="Install Hybrid GitOps Runtime" 
caption="Install Hybrid GitOps Runtime" 
max-width="50%" 
%}

{:start="2"}
1. If needed, select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   The default names are `codefresh` for both.
1. Copy and run the command to install the runtime Helm chart:  
  The commands differ depending on the access mode. Ingress-based or service-mesh-based access modes for the Runtime require additional flags.<br>
  Unless otherwise indicated, values are automatically populated by Codefresh. If you're using a terminal, remember to copy the values from the UI beforehand.<br>

{{site.data.callout.callout_warning}}
**IMPORTANT**    
  For installations alongside Community Argo CD, you must add three mandatory flags. See [Additional installation flags for GitOps Runtime with Community Argo CD]({{site.baseurl}}/docs/gitops-runtime/argo-with-gitops-side-by-side#additional-installation-flags-for-gitops-runtime-with-community-argo-cd). 
{{site.data.callout.end}}

  

  **Tunnel-based install chart command:**<br>
{% highlight yaml %}
helm upgrade --install <helm-release-name> \
  --create-namespace \
  --namespace <namespace> \
  --set global.codefresh.accountId=<codefresh-account-id> \
  --set global.codefresh.userToken.token=<codefresh-api-key> \
  --set global.runtime.name=<runtime-name> \
  oci://quay.io/codefresh/gitops-runtime \
  --wait
{% endhighlight %}

<br>

  **Ingress-based install chart command:**
{% highlight yaml %}
helm upgrade --install <helm-release-name> \
  --create-namespace \
  --namespace <namespace> \
  --set global.codefresh.userToken.token=<codefresh-api-key> \
  --set global.runtime.name=<runtime-name> \
  --set global.runtime.ingress.enabled=true \
  --set "global.runtime.ingress.hosts[0]"=<ingress-host> \
  --set global.runtime.ingress.className=<ingress-class> \
  oci://quay.io/codefresh/gitops-runtime \
  --wait  
{% endhighlight %}
<br>

  **Service-mesh-based install command (without ingress and tunnel):**
  {% highlight yaml %}
helm upgrade --install <helm-release-name> \
  --create-namespace \
  --namespace <namespace> \
  --set global.codefresh.userToken.token=<codefresh-api-key> \
  --set global.runtime.name=<runtime-name> \
  --set global.runtime.ingressUrl=<ingress-url> \
  --set global.runtime.ingress.enabled=false \
  --set tunnel-client.enabled=false \
  oci://quay.io/codefresh/gitops-runtime \
  --wait  
{% endhighlight %}

&nbsp;&nbsp;&nbsp;&nbsp;where:  
  *  
      * `<helm-release-name>` is the name of the Helm release, and is either `cf-gitops-runtime` which is the default, or the release name you define.
      * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, and is either `codefresh` which is the default, or the custom name you define.
      * `<codefresh-account-id>` is mandatory only for _tunnel-based Hybrid GitOps Runtimes_ , which is also the default access mode. Automatically populated by Codefresh in the installation command.
      * `<codefresh-api-key>` is the API key, either an existing one or a new API key you generated. When generated, it is automatically populated in the command.
      * `<runtime-name>` is the name of the GitOps Runtime, and is either `codefresh` which is the default, or the custom name you define.
      * `gitops-runtime` is the chart name defined by Codefresh, and cannot be changed.
      * Ingress-based Runtimes:  
        * `global.runtime.ingress.enabled=true` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and indicates that the runtime is ingress-based.
        * `<ingress-host>` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and is the IP address or host name of the ingress controller component.
        * `<ingress-class>` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and is the ingress class of the ingress controller. For example, `nginx` for the NGINX ingress controller.
      * Service-mesh-based Runtimes:
        * `global.runtime.ingressUrl=<ingress-url>` is the ingress URL that is the entry point to the cluster.
        * `global.runtime.ingress.enabled=false` disables the ingress-based access mode.
        * `tunnel-client.enabled=false` disables the tunnel-based access mode.
      * `--wait` is optional, and when defined, waits until all the pods are up and running for the deployment.



{:start="5"}
1. Wait for a few minutes, and then click **Close**.
  You are taken to the List View for GitOps Runtimes where:
  * The Hybrid GitOps Runtime you added is prefixed with a green dot indicating that it is online.
  * The Type column for the Runtime displays **Helm**.
  * The Sync Status column displays **Complete Installation**, indicating that there are pending steps to complete the installation.  
  * Drilling down into the Runtime shows empty tabs for Runtime Components, Git Sources, and Managed Clusters.  
    The Runtime Components are populated only when the GitOps Runtime is configured as an Argo Application, described later on in the installation process.
 
{% include
   image.html
   lightbox="true"
   file="/images/runtime/helm/helm-runtime-view-complete-install.png"
   url="/images/runtime/helm/helm-runtime-view-complete-install.png"
  alt="Newly installed Hybrid GitOps Runtime with Complete Installation notification"
  caption="Newly installed Hybrid GitOps Runtime with Complete Installation notification"
  max-width="60%"
%}


{:start="6"}
1. Continue with [Step 4: Configure Git credentials for runtime](#step-4-configure-git-credentials-for-hybrid-gitops-runtime).



### Step 4: Configure Git credentials for Hybrid GitOps Runtime
Configure Git credentials to authorize access to and ensure proper functioning of the GitOps Runtime.  
This is the first of the three steps needed to complete installing Hybrid GitOps Runtimes, the others being to add a Git user token and configure the Runtime as an Argo Application, described in the steps that follow this one.

Git credentials include authorizing access to Git repositories through OAuth2 or a Git Runtime token, and optionally configuring SSH access to the Git installation repo for the Runtime.

**Git OAuth2 authorization**  
OAuth2 authorization is possible if your admin has registered an OAuth Application for Codefresh. See [OAuth2 setup for GitOps]({{site.baseurl}}/docs/administration/account-user-management/oauth-setup/).

**Git access token authorization**  
Git access token authentication requires you to generate an access token in your Git provider account for the GitOps Runtime with the required scopes. For detailed information on Git Runtime token, including using tokens with custom scopes, review [GitOps Runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes).

**SSH access to Git**  
By default, Git repositories use the HTTPS protocol. You can also use SSH to connect Git repositories by entering the SSH private key.
When SSH is configured for a GitOps Runtime, on creating/editing Git-Source applications, you can select HTTPS OR SSH as the protocol to connect to the Git repository. See [Repository URL in Application Source definitions]({{site.baseurl}}/docs/deployments/gitops/create-application/#source).

For more information on generating SSH private keys, see the official documentation:
* [GitHub](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent){:target="\_blank"}
* [GitLab](https://docs.gitlab.com/ee/ssh/#generating-a-new-ssh-key-pair){:target="\_blank"}
* [Bitbucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html){:target="\_blank"}
* [Azure](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops&tabs=current-page){:target="\_blank"}

<br>

##### Before you begin
* To authenticate through a Git Runtime access token, make sure your [token is valid and has the required scopes and is set up as required]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes)
* To use SSH, copy the SSH private key for your Git provider

<br>

##### How to
1. In the Sync Status column for the Runtime you just installed, click **Complete Installation**.
  Codefresh displays the steps needed to complete the installation.

   {% include
image.html
lightbox="true"
file="/images/runtime/helm/helm-complete-install-widgets.png"
url="/images/runtime/helm/helm-complete-install-widgets.png"
alt="Steps to complete installing Hybrid GitOps Runtime"
caption="Steps to complete installing Hybrid GitOps Runtime"
max-width="60%"
%}

{:start="2"}
1. Do one of the following:
  * If your admin has set up OAuth access, click **Authorize Access to Git Provider**. Go to _step 3_.
  * Alternatively, authenticate with an access token from your Git provider. Go to _step 4_.

 {% include
image.html
lightbox="true"
file="/images/runtime/helm/helm-git-runtime-token.png"
url="/images/runtime/helm/helm-git-runtime-token.png"
alt="Configure Git Runtime credentials"
caption="Configure Git Runtime credentials"
max-width="50%"
%}

{:start="3"}
1. For OAuth2 authorization:
  > **NOTE**  
    If the application is not registered and you get an error, contact your admin for help.

      * Enter your credentials, and select **Sign In**.
      * If required, as for example with two-factor authentication, complete the verification.

    {% include
      image.html
      lightbox="true"
      file="/images/administration/user-settings/oauth-user-authentication.png"
      url="/images/administration/user-settings/oauth-user-authentication.png"
      alt="Authorizing access with OAuth2"
      caption="Authorizing access with OAuth2"
      max-width="60%"
   %}

{:start="4"}
1. For Git token authentication, in the **Git Runtime Token** field, paste the Git Runtime token you generated.
1. Optional. To configure SSH access to Git, expand **Connect Repo using SSH**, and then paste the raw SSH private key into the field.
1. Click **Update Credentials**. Codefresh displays a message that the Git Runtime credentials have been updated.
1. Continue with [Step 5: Add Git user token](#step-5-add-git-user-token).


### Step 5: Add Git user token
Add a Git user token, as a personal access token unique to every user. The permissions for the Git user token are different from those of the Git Runtime token.
Verify that you have an [access token from your Git provider with the correct scopes]({{site.baseurl}}/docs/security/git-tokens/#git-user-access-token-scopes).

This is the second of three steps needed to complete installing Hybrid GitOps Runtimes, the others being to add a Git Runtime token (previous step) and configure the Runtime as an Argo Application (following step).

{{site.data.callout.callout_tip}}
**TIP**  
If you already have added a Git user token, you can skip this step.  
{{site.data.callout.end}}

1. Click **Git user token** to add your personal access token to authorize actions to Git repositories. 
1. Continue with [Step 6: (Optional) Configure Hybrid GitOps Runtime as Argo Application](#step-6-optional-configure-hybrid-gitops-runtime-as-argo-application).



### Step 6: (Optional) Configure Hybrid GitOps Runtime as Argo Application

Configure the Hybrid GitOps Runtime as an Argo Application as the final step in the installation process.
By doing so, you can view the Runtime components, monitor health and sync statuses, and ensure that GitOps is the single source of truth for the Runtime.

>**NOTE**  
You cannot configure the Runtime as an Argo Application if you have not configured Git credentials for the Runtime, as described in the previous step.


1. Go back to the List view.
1. Click **Configure as Argo Application**. Codefresh takes care of the configuration for you. 
  If you drill down into the Runtime and click Runtime Components, you'll see the list of components with their Health status. 

  {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/helm-runtime-components.png" 
      url="/images/runtime/helm/helm-runtime-components.png" 
      alt="Runtime Components after configuring GitOps Runtime as Argo Application" 
      caption="Runtime Components after configuring GitOps Runtime as Argo Application"
      max-width="50%" 
   %}

{:start="3"}  
1. Continue with [Step 7: (Optional) Create a Git Source](#step-7-optional-create-a-git-source).


### Step 7: (Optional) Create a Git Source
Create a Git Source for the Runtime. A Git Source is a Git repository managed by Codefresh as an Argo CD application.  
You can always create Git Sources after installation whenever you need to in the Codefresh UI.

1. Optional. Create a [Git Source]({{site.baseurl}}/docs/gitops-runtime/git-sources/#create-a-git-source).
1. Continue with [Step 8: (Optional) Configure ingress-controllers](#step-8-optional-configure-ingress-controllers).

### Step 8: (Optional) Configure ingress-controllers
Required only for ALB AWS and NGINX Enterprise ingress-controllers, and Istio service meshes.<br>

* Complete configuring these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer](#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service](#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret](#patch-certificate-secret)

That's it! You have successfully completed installing a Hybrid GitOps Runtime with Helm. View the Runtime in the [Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#gitops-runtime-views) page.

<br>

### (Optional) Post-installation steps
Depending on your configuration, or if you have installed alongside Community Argo CD, you may need additional configuration. 

##### Private registries/on-premises Git servers  
If you have private registries, you need to override specific image values, and if your Git servers are on-premises, you need to add custom repository certificates. See [Optional GitOps Runtime configuration](#optional-gitops-runtime-configuration) in this article. 

##### GitOps alongside Community Argo CD
If you completed installation on a cluster with Community Argo CD, do the following:
  * [Remove Rollouts controller deployment]({{site.baseurl}}/docs/gitops-runtime/argo-with-gitops-side-by-side/#remove-rollouts-controller-deployment)
  * [Migrate Community Argo CD Applications to Codefresh GitOps Runtime]({{site.baseurl}}/docs/gitops-runtime/argo-with-gitops-side-by-side/#migrate-community-argo-cd-applications-to-codefresh-gitops-runtime)

### What to do next
You can now add [external clusters]({{site.baseurl}}/docs/gitops-runtime/managed-cluster/), and [create and deploy Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).



## Install additional GitOps Runtimes in account
Install additional Hybrid GitOps Runtimes on different clusters within the same account.<br>
Copy the Helm install command from the Codefresh UI, and run the command. Codefresh validates every GitOps Runtime you install, and guides you through the tasks to complete the installation to ensure a fully functional GitOps Runtime.


The Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}, contains all the arguments you can configure, including optional ones.

### Step 1: Copy & run Helm install command

**Shared Configuration Repository and Git provider**  
The Shared Configuration Repository and Git provider are configured once per account, and not required for additional installations.


**Access mode**  
You can define the tunnel/ingress/service-mesh-based access mode for the additional GitOps Runtimes you install. The command in the How To below is valid for the tunnel-based access mode. For ingress-based or service-mesh-based access modes, add the required arguments and values, as described in the step-by-step section, [Step 3: Install Hybrid GitOps Runtime](#step-3-install-hybrid-gitops-runtime).

**Runtime name**  
The name of the Runtime must be unique within the same account.


##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Copy the command in _Step 4_ and define the values that are not automatically populated.
  
{% include
image.html
lightbox="true"
file="/images/runtime/hybrid-helm-quick-install-copy-values.png"
url="/images/runtime/hybrid-helm-quick-install-copy-values.png"
alt="Copy command with automatically populated values from UI"
caption="Copy command with automatically populated values from UI"
max-width="40%"
%}

  where:
  * `<helm-release-name>` is the name of the Helm release, and you can either retain the default `cf-gitops-runtime`, or define a custom release name.
  * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, and is either `codefresh` which is the default, or any custom name that you define.
  * `<codefresh-account-id>` is mandatory only for _tunnel-based Hybrid GitOps Runtimes_ which is also the default access mode. Automatically populated by Codefresh in the command if other access modes are not explicitly defined.
  * `<codefresh-token>` is the API key, either an existing one or the new API key you generated. When generated, it is automatically populated in the command.
  * `<runtime-name>` is the name of the Runtime, and must be unique in your account.
  * `<helm-repo-chart-name>` is the name of the repo in which to add the Helm chart, and is either `cf-gitops-runtime` which is the default, or any custom name you define.
  * `--wait` waits until all the pods are up and running for the deployment.

{:start="4"}
1. Continue with [Step 2: Complete GitOps Runtime installation](#step-2-complete-gitops-runtime-installation).

### Step 2: Complete GitOps Runtime installation
Complete Runtime installation by completing the required configuration:  
* Git credentials to authorize access to and ensure proper functioning of the GitOps Runtime
* Git user token to authorize actions on your Git repositories
* Convert Runtime to an Argo Application

<br>

**Git Runtime token**  
You can use the same Git Runtime token you used for the first Runtime. 

**Git user token**  
The Git user token is a personal access token unique to every user. The permissions for the Git user token are different from those of the Git Runtime token.
Verify that you have an [access token from your Git provider with the correct scopes]({{site.baseurl}}/docs/security/git-tokens/#git-user-access-token-scopes).

**Configure as Argo CD application**  
Configuring the Runtime an an Argo CD application to view the Runtime components, monitor health and sync statuses, and ensure that GitOps is the single source of truth for the Runtime.   


<br><br>

##### How to
1. In the Codefresh UI, go to the [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes/info/list){:target="\_blank"} page.
  Codefresh displays the steps needed to complete the installation.
  You may see a message that the Runtime is missing a Git user token. You can ignore this message and continue to complete the installation.

    {% include
   image.html
   lightbox="true"
   file="/images/runtime/helm/helm-complete-install-widgets.png"
   url="/images/runtime/helm/helm-complete-install-widgets.png"
  alt="Steps to complete installing Hybrid GitOps Runtime"
  caption="Steps to complete installing Hybrid GitOps Runtime"
  max-width="60%"
%}


{:start="2"}
1. Click **Git Runtime token** to configure Git credentials for the GitOps Runtime:
    1. For OAuth authorization:
      * Click **Authorize Access to Git Provider**.
      * Enter your credentials, and select **Sign In**.
      * If required, as for example with two-factor authentication, complete the verification.
   1. For Git token authentication, in the **Git Runtime Token** field, paste the Git Runtime token you generated.
   1. Optional. To configure SSH access to Git, expand **Connect Repo using SSH**, and then paste the raw SSH private key into the field.

{% include
      image.html
      lightbox="true"
      file="/images/administration/user-settings/oauth-user-authentication.png"
      url="/images/administration/user-settings/oauth-user-authentication.png"
      alt="Authorizing access with OAuth2"
      caption="Authorizing access with OAuth2"
      max-width="30%"
   %}

{:start="3"}
1. Click **Git user token** to add your personal access token to authorize actions to Git repositories.
1. In **Configure as Argo Application**, click **Configure**. Codefresh takes care of the configuration for you.
1. Once complete, drill down into the Runtime and click the **Runtime Components** tab.
  The tab is populated with the list of components including their Health status.

  {% include
      image.html
      lightbox="true"
      file="/images/runtime/helm/helm-runtime-components.png"
      url="/images/runtime/helm/helm-runtime-components.png"
      alt="Runtime Components after configuring GitOps Runtime as Argo Application"
      caption="Runtime Components after configuring GitOps Runtime as Argo Application"
      max-width="60%"
   %}

{:start="6"}
1. For GitOps with Community Argo CD, after confirming successful installation, remove the duplicate Argo Rollouts controller `deployment` to avoid having two controllers in the cluster.   
  
  {{site.data.callout.callout_warning}}
  **IMPORTANT**  
  Make sure to remove only the `deployment` and not the CRDs. Removing the CRDs also removes Rollout objects resulting in downtime for workloads.  
    `kubectl delete deployment <argo-rollouts-controller-name> -n <argo-rollouts-controller-namespace>`
  {{site.data.callout.end}}

### (Optional) Post-install steps
Depending on your configuration or if you have installed alongside Community Argo CD, you may need to complete configuration. 

##### Private registries  
If you have private registries, you need to override specific image values, and if your Git servers are on-premises, you need to add custom repository certificates. See [Optional GitOps Runtime configuration](#optional-gitops-runtime-configuration) in this article. 

##### GitOps alongside Community Argo CD
If you completed installation on a cluster with Community Argo CD, do the following:
  * [Remove Rollouts controller deployment]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/#remove-rollouts-controller-deployment)
  * [Migrate Community Argo CD Applications to Codefresh GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/#migrate-community-argo-cd-applications-to-codefresh-gitops-runtime)



### What to do next  
You can now add [Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources), [external clusters]({{site.baseurl}}/docs/gitops-runtime/managed-cluster/), and [create and deploy Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).



## Install GitOps Runtime via Terraform

You can also use Terraform to install a GitOps Runtime with the [Helm provider](https://registry.terraform.io/providers/hashicorp/helm/latest/docs){:target="\_blank"}.


Here is an example:

```hcl
resource "helm_release" "my_gitops_runtime" {
  name = "my-codefresh-runtime"

  repository       = "oci://quay.io/codefresh"
  chart            = "gitops-runtime"
  namespace        = "my-codefresh-runtime"
  version          = "0.2.14"
  create_namespace = true
  set {
    name  = "global.codefresh.accountId"
    value = var.cf_account_id
  }
  set {
    name  = "global.codefresh.userToken.token"
    value = var.cf_token
  }
  set {
    name  = "global.runtime.name"
    value = "from-terraform"
  }
}
```

Feel free to use a different chart version and a unique name for the Runtime. You can get the values for both the Codefresh API token and account ID from the Codefresh UI as explained in the previous section.

The example is valid for the tunnel-based access mode. For ingress-based or service-mesh-based access modes, add the required arguments and values, as described in [Step 3: Install Hybrid GitOps Runtime](#step-3-install-hybrid-gitops-runtime).

Depending on your configuration:  
* If you have private registries, you need to override specific image values, and if your Git servers are on-premises, you need to add custom repository certificates. See [Optional GitOps Runtime configuration](#optional-gitops-runtime-configuration) in this article. 
* If you installed the GitOps Runtime on a cluster with Argo CD, you can [migrate Community Argo CD Applications](#migrate-argo-cd-applications-to-codefresh-gitops-runtime) to GitOps applications.


By default, the GitOps Runtime can deploy to the cluster it is installed on. You can add [Git Sources]({{site.baseurl}}/docs/gitops-runtime/git-sources/), use [Terraform to connect external clusters]({{site.baseurl}}/docs/gitops-runtime/managed-cluster/#add-a-managed-cluster-with-terraform), and [create and deploy GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).


## Optional GitOps Runtime configuration

### Image overrides for private registries
If you use private registries, you must override specific image values for the different subcharts and container images.
Our utility helps override image values for GitOps Runtimes by creating `values` files that match the structure of the subcharts, allowing you to easily replace image registries. During chart installation, you can provide these `values` files to override the images, as needed.
For more details, see [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-gitops-runtime/gitops-runtime#using-with-private-registries---helper-utility){:target="\_blank"}.

### Custom repository certificates

Repository certificates are required to authenticate users to on-premises Git servers.

If your Git servers are on-premises, add the repository certificates to your Codefresh `values` file, in `.values.argo-cd`. These values are used by the Argo CD that Codefresh deploys. For details on adding repository certificates, see this [section](https://github.com/codefresh-io/argo-helm/blob/argo-cd-5.29.2-cap-CR-18430/charts/argo-cd/values.yaml#LL336C7-L336C7){:target="\_blank"}.

{% highlight yaml %}
global:
  codefresh:
    tls:
      caCerts:
        # optional - use an existing secret that contains the cert
        # secretKeyRef:
        #   name: my-certificate-secret
        #   key: ca-bundle.crt
        # or create "codefresh-tls-certs" secret
        secret:
          create: true
          content: |
            -----BEGIN CERTIFICATE-----
            ...
            -----END CERTIFICATE-----
{% endhighlight yaml %}




You can [monitor]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/) and [manage]({{site.baseurl}}/docs/deployments/gitops/manage-application/) the application you migrated as any other Argo CD application in Codefresh.





## Upgrade Runtimes 
For upgrade instructions, see [Upgrade GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/monitor-manage-runtimes/#hybrid-gitops-upgrade-gitops-runtimes/).  

For details on Argo CD versions and their compatible Kubernetes versions, see [Argo CD versioning information](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/overview/){:target="\_block"} and [Kubernetes tested versions](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/#tested-versions){:target="\_block"}. 




## Related articles
[Managing and monitoring GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/monitor-manage-runtimes/)  
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/managed-cluster/)  
[GitOps Runtime architecture]({{site.baseurl}}/docs/gitops-runtime/runtime-architecture)  

