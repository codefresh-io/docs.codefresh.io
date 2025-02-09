---
title: "Install GitOps Runtime alongside Community Argo CD"
description: "Install GitOps Runtime on cluster with existing Argo CD"
toc: true
---


## GitOps Runtime alongside Community Argo CD
If you have a cluster with a version of Community Argo CD already installed, you can install the GitOps Runtime to co-exist with your existing Argo CD installation.  This option enables you to extend your environment with Codefresh's GitOps capabilities through a few simple configuration changes, without the need to uninstall Argo CD. 

* **Enhance CI/CD with Codefresh GitOps**  
  Dive into the world of Codefresh GitOps, exploring its capabilities and features without having to uninstall or reconfigure existing Argo CD installations. Read about our GitOps offering in [Codefresh for GitOps]({{site.baseurl}}/docs/getting-started/gitops-codefresh/).


* **Gradual migration to GitOps applications**  
  After becoming familiar with Codefresh GitOps, make informed decisions when migrating your Argo CD Applications to Codefresh GitOps.  

  For a smooth transition from Argo CD Applications to the same managed by Codefresh, migrate them at your preferred pace. After successful migration, view, track, and manage all aspects of the applications in Codefresh.

## What you need to be aware of
Installing alongside Community Argo CD requires additional flags in the installation command for all access modes: tunnel, ingress, and service-mesh:

* `fullnameOverride` configuration for resource conflicts  
  Conflicts can occur when resources in both Community and Codefresh's Argo CD instances have the same name or attempt to control the same objects.
  Customizing `fullnameOverride` values for Argo CD (and Argo Rollouts if installed) in the GitOps Runtime's `values` file prevents these conflicts.


* Resource tracking with `annotation`  
  Installing the GitOps Runtime on the same cluster as Argo CD requires that each Argo CD instance uses a different method to track resources. Using the same tracking method can result in conflicts when both instances have applications with the same names or when tracking the same resource. Setting the GitOps Runtime's Argo CD resource tracking to `annotation+label` prevents such conflicts. 



## `values.yaml` validation
The Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/installation/gitops/){:target="\_blank"}, contains all the arguments you can configure, including optional ones. 

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



## Before you begin
* Make sure you meet the [minimum requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/) for installation
* Verify that you complete all the prerequisites:  
  * [Switch ownership of Argo Project CRDs]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/#switch-ownership-of-argo-project-crds)
  * [Prerequisites: Cluster with Community Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/#prerequisites-cluster-with-community-argo-cd-installation)
* Git provider requirements:
    * [Git Runtime token with the required scopes]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-token-scopes) which you need to supply as part of the Helm install command
    * [Git user token with the required scopes]({{site.baseurl}}/docs/security/git-tokens/#git-personal-tokens) to authorize Git-based actions per user
    * Server URLs for on-premises Git providers
* For ingress-based and service-mesh based Runtimes only, verify that these ingress controllers are configured correctly:
  * [Ambassador ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#aws-alb-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#traefik-ingress-configuration)



## Install Hybrid GitOps Runtime via Helm with Community Argo CD

### Step 1: Select Hybrid Runtime install option

1. On the Getting Started page, click **Install Runtime**.
1. Continue with [Step 2: Set up GitOps Git provider](#step-2-set-up-gitops-git-provider).

### Step 2: Set up GitOps Git provider
As a one-time action, define the Shared Configuration Repository and the Git provider to associate with your account.  

The Git provider you select for the first GitOps Runtime in your account is used for all the other Runtimes installed in the same account.

#### Shared Configuration Repository
The [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) is a Git repository with configuration manifests shared between all the Hybrid GitOps Runtimes within the same account. Codefresh identifies the Git provider from the URL of the Shared Configuration Repo, and for cloud providers, automatically populates the Git Provider and the API URL fields.

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

{% if page.collection != site.gitops_collection %} 
#### Git providers <!--- is this relevant for Argohub -->
On-premises Git providers require you to define the API URL:
* GitHub Enterprise: `https://<server-url>/api/v3`
* GitLab Server: `<server-url>/api/v4`
* Bitbucket Server: `<server-url>`
{% endif %}


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
* Ingress-based, uses an ingress controller, which, depending on the type of ingress controller, may need to be configured both before and after installation. See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).
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

  **Tunnel-based install chart command:**<br>
{% highlight yaml %}
helm upgrade --install <helm-release-name> \
  --create-namespace \
  --namespace <namespace> \
  --set global.codefresh.accountId=<codefresh-account-id> \
  --set global.codefresh.userToken.token=<codefresh-api-key> \
  --set global.runtime.name=<runtime-name> \
  --set argo-cd.fullnameOverride=codefresh-argo-cd \
  --set argo-rollouts.fullnameOverride=codefresh-argo-cd \
  --set argo-cd.configs.cm.application.resourceTrackingMethod=annotation+label \  
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
  --set argo-cd.fullnameOverride=codefresh-argo-cd \
  --set argo-rollouts.fullnameOverride=codefresh-argo-cd \
  --set argo-cd.configs.cm.application.resourceTrackingMethod=annotation+label \  
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
  --set argo-cd.fullnameOverride=codefresh-argo-cd \
  --set argo-rollouts.fullnameOverride=codefresh-argo-cd \
  --set argo-cd.configs.cm.application.resourceTrackingMethod=annotation+label \  
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
      * `argo-cd.fullnameOverride=codefresh-argo-cd` is _mandatory_ to avoid conflicts at the cluster-level for resources in both the Community Argo CD and GitOps Runtime's Argo CD.
      * `argo-rollouts.fullnameOverride=codefresh-argo-rollouts` is _mandatory_ when you have Argo Rollouts in your cluster to avoid conflicts.
      * `argo-cd.configs.cm.application.resourceTrackingMethod=annotation+label` is _mandatory_ to avoid conflicts when tracking resources with the same application names or when tracking the same resource in both the Community Argo CD and GitOps Runtime's Argo CD.
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
Add a Git user token, as a personal access token unique to each user. The permissions for the Git user token are different from those of the Git Runtime token.
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

1. Optional. Create a [Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source).
1. Continue with [Step 8: (Optional) Configure ingress-controllers](#step-8-optional-configure-ingress-controllers).

### Step 8: (Optional) Configure ingress-controllers
Required only for ALB AWS and NGINX Enterprise ingress-controllers, and Istio service meshes.<br>

* Complete configuring these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#patch-certificate-secret)


After successful installation, you may need to complete additional steps based on your Argo CD setup: if you have Argo Rollouts, [remove the Rollouts controller deployment](#remove-rollouts-controller-deployment).  
Based on your requirements, [migrate Community Argo CD Applications to the GitOps Runtime](#migrate-community-argo-cd-applications-to-codefresh-gitops-runtime) to manage them in Codefresh.


## Remove Rollouts controller deployment
If you have Argo Rollouts also installed with Community Argo CD, _after_ confirming successful installation, remove the duplicate Argo Rollouts controller deployment to avoid having two controllers in the cluster. 

{{site.data.callout.callout_warning}}
**IMPORTANT**    
  Make sure to remove only `deployment` and not the CRDs. Removing the CRDs also removes Rollout objects resulting in downtime for workloads. 
{{site.data.callout.end}}

1. Remove the duplicate Argo Rollouts controller:  
  `kubectl delete deployment <argo-rollouts-controller-name> -n <argo-rollouts-controller-namespace>`


## Migrate Community Argo CD Applications to Codefresh GitOps Runtime
The final task, depending on your requirements, is to migrate your Community Argo CD Applications to the Codefresh GitOps Runtime.  

Why would you want to do this?  
Because this allows you to completely and seamlessly manage the applications in Codefresh as GitOps entities.


The process to migrate an Argo CD Application is simple:
1. Add a Git Source to the GitOps Runtime to which to store application manifests
1. Make the needed configuration changes in the Argo CD Application
1. Commit the application to the Git Source for viewing and management in Codefresh


### Step 1: (Optional) Add a Git Source to GitOps Runtime

If you have already added a Git Source as part of the Hybrid GitOps Runtime installation procedure, skip this step.  

Otherwise, add a Git Source to the GitOps Runtime to which you can commit your applications.
A Git Source is a Git repository managed by Codefresh as an Argo CD Application.
Read about [Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources/).


* Add a [Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) to your GitOps Runtime.

### Step 2: Modify Argo CD applications

Modify the Argo CD Application's manifest to remove `finalizers` if any, and also remove the Application from the `argocd` `namespace` it is assigned to by default.

* Remove `metadata.namespace: argocd`.
* Remove `metadata.finalizers`.

Below is an example of a manifest for an Argo CD Application with `finalizers`.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-sample-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    path: guestbooks/apps
    repoURL: https://github.com/codefresh-codefresh/argocd-example-apps
    targetRevision: personal-eks
  destination:
    namespace: my-app
    server: https://kubernetes.default.svc
  syncPolicy:
    automated:
      prune: false
      selfHeal: false
      allowEmpty: false
    syncOptions:
      - PrunePropagationPolicy=foreground
      - Replace=false
      - PruneLast=false
      - Validate=true
      - CreateNamespace=true
      - ApplyOutOfSyncOnly=false
      - ServerSideApply=false
      - RespectIgnoreDifferences=false
```




### Step 3: Commit Argo CD application to Git Source
As the final step in migrating your Argo CD Application to a GitOps Runtime, manually commit the updated application manifest to the Git Source you created.
Once you commit the manifest to the Git Source, it is synced with the Git repo. You can view it in the Codefresh UI, modify definitions, track it through our different dashboards, and in short, manage it as you would any GitOps-controlled resource in Codefresh. 

1. Go to the Git repo where you created the Git Source.
1. Add and commit the Argo CD Application manifest to the Git Source.
   Here's an example of the `my-sample-app` above committed to a Git Source without `metadata.namespace: argocd` and `metadata.finalizers`.

  {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/migrate-app-sample-in-git-source.png" 
      url="/images/runtime/helm/migrate-app-sample-in-git-source.png" 
      alt="Argo CD Application committed to GitOps Git Source" 
      caption="Argo CD Application committed to GitOps Git Source"
      max-width="50%" 
   %}

{:start="3"}
1. In the Codefresh UI, from the sidebar, below Ops, select [**GitOps Apps**](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
  The Applications Dashboard displays the new Git Source application.
  
  {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/migrate-app-apps-dashboard.png" 
      url="/images/runtime/helm/migrate-app-apps-dashboard.png" 
      alt="GitOps Apps dashboard with Git Source and migrated Application" 
      caption="GitOps Apps dashboard with Git Source and migrated Application"
      max-width="50%" 
   %}

{:start="4"}
1. Click the application to drill down to the different tabs. The Configuration tab displays the application's settings which you can modify and update.
  Here's an example of the Current State tab for `my-sample-app`.

  {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/migrate-app-current-state.png" 
      url="/images/runtime/helm/migrate-app-current-state.png" 
      alt="Current State tab for migrated Argo CD application" 
      caption="Current State tab for migrated Argo CD application"
      max-width="50%" 
   %}



## Related articles
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/) 
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  

