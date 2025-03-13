---
title: "Install GitOps Runtime"
description: "Provision Hybrid GitOps Runtimes through Helm"
toc: true
---



## GitOps Runtime installation
This article walks you through the process of installing GitOps Runtimes in your Codefresh accounts using a Helm chart on a _cluster without an Argo CD instance_.   
{% if page.collection != site.gitops_collection %}
To install the GitOps Runtime alongside your community Argo CD installation, see [Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/).
{% endif %}


**Runtimes in account**
The installation process varies depending on whether you are installing your first Runtime or installing additional Runtimes in your account.

* **First Runtime in account**: This requires a one-time setup before running the installation command. See [Install first GitOps Runtime in account](#install-first-gitops-runtime-in-account).
* **Additional Runtimes in account**: You can install additional Runtimes by simply running the Install Runtime command. See [Install additional GitOps Runtimes in account](#install-additional-gitops-runtimes-in-account). You can also use [Terraform](/install-gitops-runtime-via-terraform). 

For both first-time and additional GitOps Runtime installations:
* Match [system requirements and prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/) to confirm your environment meets the necessary conditions.
* Review your `values.yaml` for accuracy and how [Codefresh validates the settings](#valuesyaml-validation).

**Runtime configuration**
After installing a Runtime, you can configure it by following the steps in the Configuration & Management section of the Runtime Installation wizard. Alternatively, you can complete the configuration later through the Codefresh UI. Configuration includes setting up Git credentials, configuring the Runtime as an Argo application, and adding a Git Source to the Runtime.


{{site.data.callout.callout_warning}}
**ArgoCD password WARNING**  
  Avoid changing the Argo CD password using the `argocd-initial-admin-secret` via the Argo CD UI. Doing so can cause system instability and disrupt the Codefresh platform.  
{{site.data.callout.end}}



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
|**userToken**            |If explicitly defined, or defined as a `secretKeyRef` which exists in the current K8s context and the defined namespace.|
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

### Disabling validation for custom/fine-grained Git tokens
If you use tokens with custom scopes, or GitHub's fine-grained tokens (currently not officially supported by Codefresh), _skip token validation_ to avoid validation failures when installing GitOps Runtimes.  

Add the `skipGitPermissionValidation` flag to your `values.yaml` file: 

```yaml
app-proxy:
  config:
    skipGitPermissionValidation: "true"
```

If you set this flag, make sure that:
1. The Git user token defined for the GitOps Runtime (the token defined for `runtime-repo-creds-secret`), has read and write access to the Shared Configuration Repository.
1. The Git user tokens for the different Git repositories associated with the Runtimes have read and write permissions to those Git repositories they expect to write to and read from.  
  Read more on configuring the repositories with multiple `repo-creds` secrets in [Argo CD Repositories](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#repositories).

For details on Git token usage, see [Git tokens]({{site.baseurl}}/docs/security/git-tokens/).

### Manually validate values.yaml
To manually validate the values file, run:  
`cf helm validate --values <values_file> --namespace <namespace> --version <version>`  
where:  
* `<values_file>` is the name of the `values.yaml` used by the Helm installation.
* `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either the default `codefresh`, or the custom name you intend to use for the installation. The Namespace must conform to the naming conventions for Kubernetes objects.
* `<version>` is the version of the runtime to install.

## Install first GitOps Runtime in account
If you are installing the first GitOps Runtime in your Codefresh account, follow the Runtime Installation wizard for guided instructions.

The Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}, contains all the arguments you can configure, including optional ones. 


### Before you begin
* Make sure you meet the [minimum requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/) for installation
* Verify that you complete all the prerequisites:  
  * [Switch ownership of Argo Project CRDs]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/#switch-ownership-of-argo-project-crds)
  * [Prerequisites: Clean-cluster installation]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/#prerequisites-clean-cluster-installation)  
  * [Prerequisites: Cluster with Community Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/#prerequisites-cluster-with-community-argo-cd-installation)
* Git provider requirements:
    * [Git Runtime token with the required scopes]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-token-scopes) which you need to supply as part of the Helm install command
    * [Git user token with the required scopes]({{site.baseurl}}/docs/security/git-tokens/#git-personal-tokens) to authorize Git-based actions per user
    {% if page.collection != site.gitops_collection %} 
    * Server URLs for on-premises Git providers
    {% endif %}
* For ingress-based and service-mesh based Runtimes only, verify that these ingress controllers are configured correctly:
  * [Ambassador ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#aws-alb-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#traefik-ingress-configuration)



### Step 1: Select Hybrid Runtime install option

1. On the Getting Started page, click **Install Runtime**.
1. Continue with [Step 2: Set up GitOps Git provider](#step-2-set-up-gitops-git-provider).

### Step 2: Set up GitOps Git provider
As a one-time action, define the Shared Configuration Repository and the Git provider to associate with your account.  
The Git provider you select for the first GitOps Runtime in your account is used for all the other Runtimes installed in the same account.

#### Shared Configuration Repository
The [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) is a Git repository which stores configuration manifests shared between all the GitOps Runtimes within the same account. Codefresh identifies the Git provider from the URL of the Shared Configuration Repo, and for cloud providers, automatically populates the Git Provider and the API URL fields.

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
* Bitbucket Data Center: `<server-url>`
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
1. Continue with [Step 3: Install GitOps Runtime](#step-3-install-gitops-runtime).

### Step 3: Install GitOps Runtime

To install the GitOps Runtime, follow the instructions in the Runtime Installation Wizard. The wizard provides an Install Runtime command with pre-populated values, making installation quick and straightforward.

#### Installation Parameters

##### Runtime Name
By default, the runtime name is `codefresh`.  
If you define a custom name, it must:
* Start with a lowercase letter
* Contain only lowercase letters and numbers
* Be no longer than 38 characters

##### Namespace
The namespace must follow Kubernetes naming conventions.

##### Codefresh API Key
The API 

#### Access modes
You can install the GitOps Runtime using one of the following access modes: 
* **Tunnel-based (default)**: The default access mode when other access mode are not specified. No additional configuration is needed. 	
* **Ingress-based**: Uses an ingress controller. May require pre- and post-installation setup.	See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).
* **Service-mesh-based**: Requires explictly disabling tunnel-based and ingress-based access modes. May require pre- and post-installation setup. See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).

#### Install Runtime command
When you copy the Install Runtime Command to the terminal, the command will differ depending on the access mode. Ingress-based or service-mesh-based access modes for the Runtime require additional flags.<br>


##### Tunnel-based install chart command
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


##### Ingress-based install chart command
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

##### Service-mesh-based install command (without ingress and tunnel)
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


#### Install command parameters

| Parameter | Description |
|-----------|------------|
| `<helm-release-name>` | Name of the Helm release. The default is `cf-gitops-runtime`, which you can change if needed. |
| `<namespace>` | Namespace where the GitOps Runtime is installed. Default is `codefresh`, or a custom name you define. |
| `<codefresh-account-id>` | Mandatory only for _tunnel-based Runtimes_ (default access mode). Automatically populated by Codefresh. |
| `<codefresh-api-key>` | API key used for authentication. You can use an existing key or generate a new one. Automatically populated in the command when generated. |
| `<runtime-name>` | Name of the GitOps Runtime. Default is `codefresh`, or a custom name you define. |
| `gitops-runtime` | Chart name defined by Codefresh. Cannot be changed. |
| **Ingress-based parameters** | |
| `global.runtime.ingress.enabled=true` | Mandatory for ingress-based Runtimes. Indicates the runtime is ingress-based. |
| `<ingress-host>` | IP address or hostname of the ingress controller. Mandatory for ingress-based Runtimes. |
| `<ingress-class>` | Ingress class of the ingress controller (e.g., `nginx` for the NGINX ingress controller). Mandatory for ingress-based Runtimes. |
| **Service-mesh-based parameters** | |
| `global.runtime.ingressUrl=<ingress-url>` | Ingress URL that serves as the entry point to the cluster. |
| `global.runtime.ingress.enabled=false` | Disables ingress-based access mode. |
| `tunnel-client.enabled=false` | Disables tunnel-based access mode. |
| `--wait` | Optional. The duration the installation process waits for all pods to become ready before timing out. Recommend to set it to a period longer than 5 minutes which is the default if not set. |


#### Completing Installation
Once installation is complete, you can:
* Continue with the Configuration & Management steps in the Wizard. See [Configure GitOps Runtime](#configure-gitops-runtime).  
OR
Go to the Runtimes page and view the installed Runtime.

#### View installed Runtime
After installation, go to **GitOps Runtimes > List View**:
* The GitOps Runtime you added is prefixed with a green dot indicating that it is online.
* The Type column for the Runtime displays **Helm**, and the label **Config Runtime**, indicating it has been designated as the Configuration Runtime. 
* The Sync Status column displays either:
  * **Synced**: Configuration is complete
  * **Complete Installation**: Pending configuration steps  
* Drilling down into the Runtime shows tabs for Runtime Components, Git Sources, and Managed Clusters.  
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

### Step 4: (Optional) Configure ingress-controllers/service meshes
Required only for ALB AWS and NGINX Enterprise ingress-controllers, and Istio service meshes.<br>

* Complete configuring these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#patch-certificate-secret)


## Install additional GitOps Runtimes in account
Install additional GitOps Runtimes on different clusters within the same account.<br>
The Shared Configuration Repository and Git provider are configured once per account, and not required for additional Runtime installations.

Copy the Helm install command from the Codefresh UI, and run the command. Codefresh validates every GitOps Runtime you install, and guides you through the tasks to complete the installation to ensure a fully functional GitOps Runtime.


The Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}, contains all the arguments you can configure, including optional ones.

### Step 1: Copy & run Install Runtime command

##### Runtime name


##### Access mode 
You can define the tunnel-/ingress-/service-mesh-based access mode for the additional GitOps Runtimes you install. 




1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select **GitOps Runtimes**.
1. Click **+ Add Runtimes**.
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
#### Installation Parameters

##### Runtime Name
The name of the Runtime must be unique within the same account.  
If you already used `codefresh` (the default) for the first Runtime in your account, make sure you define a different name to prevent Runtime installation from failing.
 
The name must:
* Start with a lowercase letter
* Contain only lowercase letters and numbers
* Be no longer than 38 characters

##### Namespace
The namespace must follow Kubernetes naming conventions.

##### Codefresh API Key
(NIMA: Add instructions for users who skip this step.)

#### Access modes
You can install the GitOps Runtime using one of the following access modes: 
* **Tunnel-based (default)**: Automatically enabled if no other mode is specified. No additional configuration is needed. 	
* **Ingress-based**:Uses an ingress controller. May require pre- and post-installation setup.	See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).
* **Service-mesh-based**: Requires disabling tunnel and ingress modes. May require pre- and post-installation setup. See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).

#### Install Runtime command
When you copy the Install Runtime Command to the terminal, the command will differ depending on the access mode. Ingress-based or service-mesh-based access modes for the Runtime require additional flags.<br>


##### Tunnel-based install chart command
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


##### Ingress-based install chart command
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

##### Service-mesh-based install command (without ingress and tunnel)
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


#### Install command parameters

| Parameter | Description |
|-----------|------------|
| `<helm-release-name>` | Name of the Helm release. The default is `cf-gitops-runtime`, which you can change if needed. |
| `<namespace>` | Namespace where the GitOps Runtime is installed. Default is `codefresh`, or a custom name you define. |
| `<codefresh-account-id>` | Mandatory only for _tunnel-based Runtimes_ (default access mode). Automatically populated by Codefresh. |
| `<codefresh-api-key>` | API key used for authentication. You can use an existing key or generate a new one. Automatically populated in the command when generated. |
| `<runtime-name>` | Name of the GitOps Runtime. Default is `codefresh`, or a custom name you define. |
| `gitops-runtime` | Chart name defined by Codefresh. Cannot be changed. |
| **Ingress-based parameters** | |
| `global.runtime.ingress.enabled=true` | Mandatory for ingress-based Runtimes. Indicates the runtime is ingress-based. |
| `<ingress-host>` | IP address or hostname of the ingress controller. Mandatory for ingress-based Runtimes. |
| `<ingress-class>` | Ingress class of the ingress controller (e.g., `nginx` for the NGINX ingress controller). Mandatory for ingress-based Runtimes. |
| **Service-mesh-based parameters** | |
| `global.runtime.ingressUrl=<ingress-url>` | Ingress URL that serves as the entry point to the cluster. |
| `global.runtime.ingress.enabled=false` | Disables ingress-based access mode. |
| `tunnel-client.enabled=false` | Disables tunnel-based access mode. |
| `--wait` | Optional. The duration the installation process waits for all pods to become ready before timing out. Recommend to set it to a period longer than 5 minutes which is the default if not set. |










## Configure GitOps Runtime 
Once you install the GitOps Runtime, you can configure essential settings to integrate applications into the GitOps process. 

### Step 1: Configure Git credentials for Runtime
Git credentials for the Runtime include defining Git tokens 



### Step 2: Configure Runtime as Argo application
Configure the GitOps Runtime as an Argo Application to view the Runtime components, monitor health and sync statuses, and ensure that Git is the single source of truth for the Runtime.

Configuring the GitOps Runtime as an Argo application ensures:
* Git as the single source of truth: The Runtime’s state is declaratively managed in Git, ensuring consistency, traceability, and version control over all its configurations.
* Automated reconciliation: Argo CD continuously monitors the Runtime’s desired state (as defined in Git), and automatically corrects any drift, ensuring alignment between the cluster and the Git repository.
* Visibility & monitoring: The Runtime is displayed in the GitOps Apps dashboard where you can view and check health and sync statuses.

When you click **Configure as Argo Application**, Codefresh takes care of the configuration for you. 

### Step 3: Add a Git Source to Runtime

A **Git Source** is a critical component in GitOps Runtimes, serving as a connection between a Git repository and the cluster. serving as an easy way to manage the deployment and configuration of Argo CD applications on clusters.  
The Git repository referenced by the Git Source stores application manifests and other resources which are always synced to the cluster. Codefresh manages the Git Source itself as an Argo CD application.

#### Git Source settings  

| Setting                  | Description |
|--------------------------|-------------|
| **Git Source Name**      | A unique name for the Git Source within the cluster. Must follow Kubernetes naming conventions. |
| **Git Source Type**      | Select **Standard Git Source** to create the Git Source as an Argo CD application in the Runtime's namespace. It belongs to the default or user-defined Application Project, without deployment or repo restrictions. |
| **Git Repository Source** | The Git repository which stores the application manifests, including the Git Source application manifest. Choose one of the following: <br> **Use an existing repository**: <br> - **Repository (Required):** The URL of the Git repository. <br> - **Branch (Optional):** The branch in which to create the Git Source application manifest. <br> - **Path (Optional):** The directory within the repo where the manifest will be stored. <br> **Create a new repository**: <br> - **Organization Name:** Select the organization for which to create the repository. <br> - **Repository Name:** The name of the new repository. |
| **Included and Excluded Files** | Define patterns to specify which files should be included or excluded when syncing the repository to the cluster. Use **GLOB patterns** to define paths: <br> - `workflows/**/*.yaml` → Includes all YAML files in `workflows` and its subdirectories. <br> - `**/images/**/*` → Excludes all directories named `images`. <br> For GLOB guidelines, see this [guide](https://deepsource.io/blog/glob-file-patterns/). |





### Step 5: Add Git user token
Add a Git user token, as a personal access token unique to every user. The permissions for the Git user token are different from those of the Git Runtime token.
Verify that you have an [access token from your Git provider with the correct scopes]({{site.baseurl}}/docs/security/git-tokens/#git-user-access-token-scopes).













{% if page.url != "argohub" %}
### (Optional) Post-installation configuration
After completing the installation, you may need to perform additional configuration depending on your setup.  
* For private registries, you need to [override specific image values](#image-overrides-for-private-registries).  
* If your Git servers are on-premises, [add custom repository certificates](#custom-repository-certificates). 
{% endif %}




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


By default, the GitOps Runtime can deploy to the cluster it is installed on. You can add [Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources/), use [Terraform to connect external clusters]({{site.baseurl}}/docs/installation/gitops/managed-cluster/#add-a-managed-cluster-with-terraform), and [create and deploy GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).


{% if page.url != "argohub" %}
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
{% endif %}

## Upgrade Runtimes 
For upgrade instructions, see [Upgrade GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#upgrade-gitops-runtimes/).  

For details on Argo CD versions and their compatible Kubernetes versions, see [Argo CD versioning information](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/overview/){:target="\_blank"} and [Kubernetes tested versions](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/#tested-versions){:target="\_blank"}. -->




## Related articles
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/) 
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  



