---
title: "Install GitOps Runtime with existing Argo CD"
description: "Provision GitOps Runtimes alongside existing Argo CD instance"
toc: true
---



## GitOps Runtime with existing Argo CD
This article walks you through the process of installing GitOps Runtimes in your Codefresh accounts using a Helm chart on a _cluster with an existing Argo CD instance_.

This option allows you to install the GitOps Runtime without deploying a new Argo CD instance. Instead, you install the GitOps Runtime in the same namespace as the existing Argo CD instance. The Runtime integrates with Argo CD through key Argo CD services.


To install the GitOps Runtime with a new Argo CD instance, see [Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).



**Runtimes in account**
The installation process varies depending on whether you are installing your first Runtime or installing additional Runtimes in your account.

* **First Runtime in account**: This requires a one-time setup before running the installation command. See [Install first GitOps Runtime in account](#install-first-gitops-runtime-in-account).
* **Additional Runtimes in account**: You can install additional Runtimes by simply running the Install Runtime command. See [Install additional GitOps Runtimes in account](#install-additional-gitops-runtimes-in-account). You can also use [Terraform](/install-gitops-runtime-via-terraform). 

For both first-time and additional GitOps Runtime installations:
* Match [system requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/) to confirm your environment meets the necessary conditions.
* Complete the [prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-prerequsites/): 
* Review the Runtime's `values.yaml` for accuracy, and also how Codefresh [validates the settings](#valuesyaml-validation).

**Runtime configuration**
After installing the Runtime, you can configure it by following the steps in the Configuration & Management section of the installation wizard.  
Alternatively, you can complete the configuration later through the Codefresh UI. Configuration includes setting up Git credentials, configuring the Runtime as an Argo application, and adding a Git Source to the Runtime.
See [Configuring the GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/runtime-configuration/).

{{site.data.callout.callout_warning}}
**ArgoCD password WARNING**  
  Avoid changing the Argo CD password using the `argocd-initial-admin-secret` via the Argo CD UI. Doing so can cause system instability and disrupt the Codefresh platform.  
{{site.data.callout.end}}



## `values.yaml` validation
The Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/installation/gitops/){:target="\_blank"}, contains all the arguments you can configure, including optional ones. 

Before initiating the installation, Codefresh automatically validates the `values.yaml` file to verify that the supplied values are correct.
A validation error will automatically terminate the installation.

You can disable automated validation globally for all installation settings, or for only specific settings such as the ingress controller for example, and run validation manually. 

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
If you are installing the first GitOps Runtime in your Codefresh account, follow the installation wizard for guided instructions.

The Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}, contains all the arguments you can configure, including optional ones. 


### Before you begin
* Make sure you meet the [minimum requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/) for installation
* Verify that you complete all the [prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/)
    * [Switch ownership of Argo Project CRDs](#switch-ownership-of-argo-project-crds) 
    * [Remove Argo Project and SealedSecret components](#remove-argo-project-and-sealedsecret-components)
    * [Configure connectivity with Argo CD services](#configure-connectivity-with-argo-cd-services-existing-argo-only) 
    * [Verify Argo CD root path configuration](#verify-argo-cd-root-path-configuration-existing-argo-only)

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



### Step 1: Select Runtime install option

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
#### Git providers
On-premises Git providers require you to define the API URL:
* GitHub Enterprise: `https://<server-url>/api/v3`
* GitLab Server: `<server-url>/api/v4`
* Bitbucket Data Center: `<server-url>`
{% endif %}

<br>


### Step 3: Install GitOps Runtime

To install the GitOps Runtime, follow the instructions in the installation wizard which provides an Install Runtime command with pre-populated values, making installation quick and straightforward.

#### Installation Parameters

##### Runtime Name
By default, the runtime name is `codefresh`.  
If you define a custom name, it must:
* Start with a lowercase letter
* Contain only lowercase letters and numbers
* Be no longer than 38 characters

##### Namespace
The namespace for the GitOps Runtime _which must be the same as that of the Argo CD instance_.

##### Argo CD Admin API token
The token through which the GitOps Runtime authenticates with the external Argo CD instance.  
* The token must be a non-expiring API key.  
* The Helm chart automatically creates a secret for the token, which the Runtime uses to authenticate API calls to Argo CD.
* If the token is revoked, GitOps operations will stop until it is updated in the Runtime configuration.    

You can generate the token in the Argo CD UI, or by using the [argocd account generate-token](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_account_generate-token/){:target="\_blank"} command.


Codefresh supports other authentication methods, including username-password authentication.  
To use a different authentication method, leave this field empty and configure the credentials directly in the Runtime's `values.yaml`.  See ???


##### Codefresh API Key
The Codefresh API key authenticates the GitOps Runtime with the Codefresh platform, enabling secure registration, configuration retrieval, and communication with Codefresh services.   
Generate the API key to automatically add it to the Runtime Install command. 


#### Access modes
You can install the GitOps Runtime using one of the following access modes: 
* **Tunnel-based (default)**: The default access mode when other access mode are not specified. No additional configuration is needed. 	
* **Ingress-based**: Uses an ingress controller. May require pre- and post-installation configuration.	See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).
* **Service-mesh-based**: Requires explictly disabling tunnel-based and ingress-based access modes. May require pre- and post-installation configuration. See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).

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


### Step 4: Completing Installation
Once installation is complete, you can:
* Continue with the Configuration & Management steps in the installation wizard. See [Configure GitOps Runtime](#configure-gitops-runtime).  
OR
Go to the Runtimes page and view the installed Runtime.

##### View installed Runtime
After installation, go to **GitOps Runtimes > List View**:
* The GitOps Runtime you added is prefixed with a green dot indicating that it is online.
* The Type column for the Runtime displays **Helm**, and the label **Config Runtime**, indicating it has been designated as the Configuration Runtime. 
* The Sync Status column displays either:
  * **Synced**: Configuration is complete
  * **Complete Installation**: Pending configuration steps  
* Drilling down into the Runtime shows tabs for Runtime Components, Git Sources, and Managed Clusters.  
  The Runtime Components are populated only when the GitOps Runtime is configured as an Argo Application, as described [here]({{site.baseurl}}/docs/installation/gitops/runtime-configuration#configure-runtime-as-argo-application).

{% include
   image.html
   lightbox="true"
   file="/images/runtime/helm/helm-runtime-view-complete-install.png"
   url="/images/runtime/helm/helm-runtime-view-complete-install.png"
  alt="Newly installed Hybrid GitOps Runtime with Complete Installation notification"
  caption="Newly installed Hybrid GitOps Runtime with Complete Installation notification"
  max-width="60%"
%}

### Step 5: (Optional) Configure ingress-controllers/service meshes
Required only for ALB AWS and NGINX Enterprise ingress-controllers, and Istio service meshes.<br>

* Complete configuring these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#patch-certificate-secret)


## Install additional GitOps Runtimes in account
You can install additional GitOps Runtimes on different clusters within the same account.

The installation process is the same as for the [first Runtime](#install-first-gitops-runtime-in-account), with the following key differences:

#### Shared Configuration Repository
The Shared Configuration Repository and Git provider are configured once per account and do not need to be set up again when installing additional Runtimes.

#### Runtime Name
Each Runtime must have a unique name within the account. If you used `codefresh` (the default) for the first Runtime, choose a different name to avoid installation failures.

The Runtime name must:
* Start with a lowercase letter
* Contain only lowercase letters and numbers
* Be no longer than 38 characters


 


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

## Authentication methods for Argo CD Admin API 
The GitOps Runtime authenticates with the external Argo CD instance through a token or a username-password combination.
During installation, the installation wizard supports token-based authentication where you paste the token into the field.  

You can also authenticate referencing a token-secret or a username-password combination.


### Token-based authentication for Argo CD Admin API 
The token must be a non-expiring API key. If revoked, GitOps operations stop until you manually update the token for the Runtime, as the system does not automatically regenerate or validate the token.

You can:
* Provide a token directly  
OR  
* Reference a Kubernetes secret containing the token
    * The secret must already exist and include a key with a valid `argo-cd apiKey` that has no expiration date.  
    * The system injects the key into all required services<!---, including App Proxy (`app-proxy`), Source Server (`sources-server`), Event Reporter (`event-reporter`), and GitOps Operator (`gitops-operator`)-->.  

##### Example configuration of token and secret in `values.yaml 
  
```yaml
global:
  external-arg-cd:
    auth:
      type: token
      tokenSecretKeyRef:
        name: "secret-name"
        key: "secret-key"
```

### Password-based authentication for Argo CD Admin API  
This method uses an Argo CD username and password` to authenticate with Argo CD.  
The system generates both an API key and a session token, which primarily differ in expiration date.  
The system stores the API key in the `argocd-token` Secret and automatically regenerates it when needed. 

You can:   
* Specify the username and password as plain text  
    * The Helm chart creates a secret to store the password. 
    * The App Proxy uses these credentials to generate API keys and session tokens as needed.
OR  
* Specify the username in plain text and reference a Kubernetes secret containing the password  
    * The secret must already exist and contain a key with the password.
    * The App Proxy uses the secret name, key, and the plain-text username to generate API keys and session tokens.

##### Example username and password as plain text 
```yaml
global:
  external-arg-cd:
    auth:
      type: password
      username: "user-name"
      password: "explicit-password"
```

##### Example username as plain text and password as secret reference
```yaml
global:
  external-arg-cd:
    auth:
      type: password
      username: "some-user-name"
      passwordSecretKeyRef:
        name: "secret-name"
        key: "secret-key"
```


## Upgrade Runtimes 
For upgrade instructions, see [Upgrade GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#upgrade-gitops-runtimes/).  

For details on Argo CD versions and their compatible Kubernetes versions, see [Argo CD versioning information](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/overview/){:target="\_blank"} and [Kubernetes tested versions](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/#tested-versions){:target="\_blank"}. 


## Related articles
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/) 
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  



