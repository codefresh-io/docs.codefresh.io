---
title: "Install GitOps Runtime with existing Argo CD"
description: "Provision GitOps Runtimes alongside existing Argo CD instance"
toc: true
---



## GitOps Runtime with existing Argo CD
This article describes how to install GitOps Runtimes in a Codefresh account using a Helm chart on a _cluster that already has an Argo CD instance_.

This option allows you to install the GitOps Runtime without deploying a new Argo CD instance. Instead, you _install the GitOps Runtime in the same namespace as the existing Argo CD instance_. The Runtime authenticates with the Argo CD instance through the [Argo CD Admin API token](({{site.baseurl}}/docs/installation/gitops/runtime-argocd-admin-api-token/)) which you need to provide, and connects to key Argo CD services.

##### Runtime values.yaml 
The Codefresh `values.yaml` available [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}, contains all the arguments you can configure, including optional ones.  
Review how Codefresh [validates the Runtime's values.yaml]({{site.baseurl}}/docs/installation/gitops/gitops-values-yaml-validation/).


To install the GitOps Runtime with a new Argo CD instance, see [Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

## Before you begin
* Make sure you meet the [minimum requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/) for installation
* Verify that you complete all the [prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/)
* Verify you have a [valid Argo CD Admin API token]({{site.baseurl}}/docs/installation/gitops/runtime-argocd-admin-api-token/)
* For ingress-based and service-mesh based Runtimes only, verify that these ingress controllers are configured correctly:
  * [Ambassador ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#aws-alb-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#traefik-ingress-configuration)



## Step 1: Select Runtime install option

1. On the Getting Started page, click **Install Runtime**.
1. Continue with [Step 2: Set up GitOps Git provider](#step-2-set-up-gitops-git-provider).

## Step 2: Set up GitOps Git provider
As a one-time action, define the Shared Configuration Repository and associate it with your Git provider.  
The Git provider you select for the first GitOps Runtime applies to all Runtimes in the same account.

### Shared Configuration Repository
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


## Step 3: Install GitOps Runtime

To install the GitOps Runtime, follow the instructions in the installation wizard which provides an Install Runtime command with pre-populated values, making installation quick and straightforward.



### Runtime Name
By default, the runtime name is `codefresh`.  
If you define a custom name, it must:
* Start with a lowercase letter
* Contain only lowercase letters and numbers
* Be no longer than 38 characters

### Namespace
The namespace where the GitOps Runtime installed, **_which must be the same namespace as the Argo CD instance_**.

### Argo CD Admin API token
The API token used by the GitOps Runtime to authenticate with the Argo CD instance. If you don't have an Argo CD Admin API token, you can generate it in the Argo CD UI or through the CLI. See [Argo CD Admin API token](#argo-cd-admin-api-token).
* The token must be a non-expiring API key.  
* The Helm chart automatically creates a secret for the token, which the Runtime uses to authenticate API calls to Argo CD.
* If revoked, GitOps operations stop until the token is updated.    

Codefresh supports other authentication mechanisms, including username-password authentication.  
For alternative mechanisms, configure the credentials directly in the Runtime's `values.yaml` file.  See [Authentication methods for existing Argo CD](#authentication-methods-for-existing-argo-cd).


### Codefresh API Key
The API key authenticates the GitOps Runtime with the Codefresh platform, enabling secure registration, configuration retrieval, and communication with Codefresh services.   
Generate the API key to automatically include it in the Runtime Install command. 


### Access modes
The GitOps Runtime is installed by default with the tunnel-based access mode which does not require any additional configuration. 

The Runtime supports two additional access modes:
* **Ingress-based**: Uses an ingress controller. 
* **Service-mesh-based**: Requires explictly disabling tunnel-based and ingress-based access modes. 
Both these access modes require _pre- and post-installation configuration, and  additional flags in the Install Runtime command_.	If you want to use either of these access modes, see [GitOps Runtimes with ingress controllers/service meshes]({{site.baseurl}}/docs/installation/gitops/runtime-install-ingress-service-mesh/).

### Install Runtime command and parameters
The Install Runtime Command is valid for to the default tunnel-based access mode.<br>


##### Default tunnel-based install chart command
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



##### Install command parameters

| Parameter | Description |
|-----------|------------|
| `<helm-release-name>` | Name of the Helm release. The default is `cf-gitops-runtime`, which you can change if needed. |
| `<namespace>` | Namespace where the GitOps Runtime is installed. Default is `codefresh`, or a custom name you define. |
| `<codefresh-account-id>` | Mandatory only for _tunnel-based Runtimes_ (default access mode). Automatically populated by Codefresh. |
| `<codefresh-api-key>` | API key used for authentication. You can use an existing key or generate a new one. Automatically populated in the command when generated. |
| `<runtime-name>` | Name of the GitOps Runtime. Default is `codefresh`, or a custom name you define. |
| `gitops-runtime` | Chart name defined by Codefresh. Cannot be changed. |
| `--wait` | Optional. The duration the installation process waits for all pods to become ready before timing out. Recommend to set it to a period longer than 5 minutes which is the default if not set. |


## Step 4: Completing Installation
After installation, you can:
* Continue with the Configuration & Management steps in the installation wizard. See [Configure GitOps Runtime](#configure-gitops-runtime).  
OR
* View the installed Runtime in the Runtimes page, and complete the configuration at a later time.

##### View installed Runtime
After installation, go to **GitOps Runtimes > List View**:
* A green dot indicates the Runtime is online.
* The Type column shows **Helm** with the label **Config Runtime**, indicating it has been designated as the Configuration Runtime. 
* The Sync Status column displays either:
  * **Synced**: Configuration is complete
  * **Complete Installation**: Pending configuration steps  
* Drill down into the Runtime shows tabs for Runtime Components, Git Sources, and Managed Clusters.  
  The Runtime Components are populated only when the GitOps Runtime is configured as an Argo CD Application, as described [here]({{site.baseurl}}/docs/installation/gitops/runtime-configuration#configure-runtime-as-argo-application).

{% include
   image.html
   lightbox="true"
   file="/images/runtime/helm/helm-runtime-view-complete-install.png"
   url="/images/runtime/helm/helm-runtime-view-complete-install.png"
  alt="Newly installed Hybrid GitOps Runtime with Complete Installation notification"
  caption="Newly installed Hybrid GitOps Runtime with Complete Installation notification"
  max-width="60%"
%}


## Install GitOps Runtime via Terraform

You can also use Terraform to install additional GitOps Runtimes with the [Helm provider](https://registry.terraform.io/providers/hashicorp/helm/latest/docs){:target="\_blank"}.  

* The Shared Configuration Repository and Git provider are configured once per account and do not need to be set up again.
* Each Runtime must have a unique name within the account. If you used `codefresh` (the default) for the first Runtime, choose a different name to avoid installation failures.


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


## Related articles
[Upgrading GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#upgrade-gitops-runtimes/)  
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/) 
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  
