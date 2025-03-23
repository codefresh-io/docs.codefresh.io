---
title: "Install GitOps Runtime with new Argo CD"
description: "Provision GitOps Runtimes with a new Argo CD installation through Helm"
toc: true
---



## GitOps Runtime with new Argo CD
This article describes how to install the GitOps Runtime in a Codefresh accounts using a Helm chart on a _cluster without an Argo CD instance_.   

##### Runtime values.yaml

The Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}, contains all the arguments you can configure, including optional ones. 
Review how Codefresh [validates the Runtime's values.yaml]({{site.baseurl}}/docs/installation/gitops/gitops-values-yaml-validation/).

{% if page.collection != site.gitops_collection %}
To install the GitOps Runtime:  
* With an existing Argo CD instance, see [Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)
* Alongside your community Argo CD installation, see [Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/).
{% endif %}



## Before you begin
* Make sure you meet the [minimum requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/) for installation
* Verify that you complete all the [prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/)
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
### Git providers
On-premises Git providers require you to define the API URL:
* GitHub Enterprise: `https://<server-url>/api/v3`
* GitLab Server: `<server-url>/api/v4`
* Bitbucket Data Center: `<server-url>`
{% endif %}

<br>

<!--- ##### How to

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
1. Continue with [Step 3: Install GitOps Runtime](#step-3-install-gitops-runtime).  -->

## Step 3: Install GitOps Runtime
To install the GitOps Runtime, follow the instructions in the installation wizard which provides an Install Runtime command with pre-populated values.

### Runtime Name
By default, the runtime name is `codefresh`.  
If you define a custom name, it must:
* Start with a lowercase letter
* Contain only lowercase letters and numbers
* Be no longer than 38 characters


### Codefresh API Key
The API key authenticates the GitOps Runtime with the Codefresh platform, enabling secure registration, configuration retrieval, and communication with Codefresh services.   
Generate the API key to automatically include it in the Runtime Install command. 


### Access modes
The GitOps Runtime supports these access modes: 
* **Tunnel-based (default)**: The default access mode when other access mode are not specified. Does not require additional configuration. 	
* **Ingress-based**: Uses an ingress controller. May require pre- and post-installation configuration.	See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).
* **Service-mesh-based**: Requires explictly disabling tunnel-based and ingress-based access modes. May require pre- and post-installation configuration. See [Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).

### Install Runtime command
The Install Runtime Command differs based on the access mode. Ingress-based or service-mesh-based access modes for the Runtime require additional flags.<br>


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


### Install command parameters

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

### Step 5: (Optional) Configure ingress-controllers/service meshes
Required only for ALB AWS and NGINX Enterprise ingress-controllers, and Istio service meshes.<br>

* Complete configuring these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#patch-certificate-secret)




{% if page.collection != site.gitops_collection %}
### (Optional) Post-installation configuration
After completing the installation, you may need to perform additional configuration depending on your setup.  
* For private registries, you need to [override specific image values](#image-overrides-for-private-registries).  
* If your Git servers are on-premises, [add custom repository certificates](#custom-repository-certificates). 
{% endif %}




## Install GitOps Runtime via Terraform

You can also use Terraform to install an additional GitOps Runtime with the [Helm provider](https://registry.terraform.io/providers/hashicorp/helm/latest/docs){:target="\_blank"}.

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


{% endif %}

## Upgrade Runtimes 
For upgrade instructions, see [Upgrade GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#upgrade-gitops-runtimes/).  

For details on Argo CD versions and their compatible Kubernetes versions, see [Argo CD versioning information](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/overview/){:target="\_blank"} and [Kubernetes tested versions](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/#tested-versions){:target="\_blank"}. 




## Related articles
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/) 
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  



