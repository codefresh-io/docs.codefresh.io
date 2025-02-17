---
title: "Shared Configuration Repository"
description: "Share configuration settings across GitOps Runtimes"
toc: true
---

## Shared Configuration Repository
A Codefresh account with <!--- a Hosted or -->a Hybrid GitOps Runtime can store configuration manifests for account-level resources in a Git repository. This repository, the Shared Configuration Repository, can be shared with other GitOps Runtimes in the same account, avoiding the need to create and maintain different configuration manifests for every GitOps Runtime. At the same time, you also have the flexibility to store resources unique to specific Runtimes without affecting other Runtimes. 

Watch this video for an overview:
{::nomarkdown}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{:/} [Shared Configuration Repository](https://www.youtube.com/watch?v=7WNoNZ58IzU){:target="\_blank"}


##### When is it created? 
The Shared Configuration Repository (internally ISO/iso) is created on installing the first Hybrid GitOps Runtime in the account. See [GitOps Runtimes & Shared Configuration Repos](#gitops-runtimes--shared-configuration-repos).


{{site.data.callout.callout_warning}}
**IMPORTANT**  
Only _Codefresh account administrators should have access_ to the Shared Configuration Repository. Its content is automatically generated and maintained by Codefresh.  
While it is useful to understand its structure, we recommend using it for reference only, and _NOT_ for making commits or manual changes. 
{{site.data.callout.end}}

##### Benefits

* **Centralized Runtime configuration management**  
  With the Shared Configuration Repository, you can store configuration manifests for account-level resources in a centralized location. The Git repository is accessible to all GitOps Runtimes within the same Codefresh account, ensuring that account-level resources are consistently deployed and managed across all environments.

* **Runtime-specific configuration**  
   With the Shared Configuration Repository, you can create subdirectories for different GitOps Runtimes, and place configuration manifests that are only applied to specific GitOps Runtimes. You have fine-grained control over the configuration of individual Runtimes without affecting others.


>**NOTE**  
In the documentation, we use Shared Configuration Repository or Shared Config Repo for clarity.
In code samples and internal references, it is represented as `isc`.

## Examples of configuration definitions in Shared Repo

Here are a few types of configuration definitions stored in the Shared Configuration Repository: 
* In-cluster and [managed clusters]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)
* [Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources/)
* [Integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/) between Codefresh and third-parties for GitOps
* [OAuth2]({{site.baseurl}}/docs/administration/account-user-management/oauth-setup/) authentication applications
* Manifests for promotion entities: 
  * [Products]({{site.baseurl}}/docs/products/configure-product-settings/)
  * [Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow)
  * [Promotion Policies]({{site.baseurl}}/docs/promotions/promotion-policy/)
  * [Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/) 
  * [Promotion Templates]({{site.baseurl}}/docs/products/configure-product-settings/#configure-promotion-settings)

See [Shared Configuration Repo structure](#shared-configuration-repo-structure).


## GitOps Runtimes & Shared Configuration Repos

<!--- * Hosted GitOps Runtimes  
  As part of the setup for a Hosted GitOps runtime, Codefresh creates the Shared Configuration Repository in the selected organization, together with the default Git Source repo. See [Connect Git provider]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/#step-2-connect-git-provider) in Hosted GitOps setup.  

* Hybrid GitOps Runtimes -->  
  When you install the first Hybrid GitOps runtime for an account, you are required to define the Shared Configuration Repo as part of setting up your Git account.  See [Installing Hybrid GitOps Helm Runtime installation: Set up Git provider]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#step-2-set-up-gitops-git-provider).  



<!--- 
>>**NOTE**  
  Currently, Codefresh supports a single Shared Configuration Repo per account.
  You may need to reset the Shared Configuration Repo after creating it. See [Reset Shared Configuration Repository for GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#reset-shared-configuration-repository-for-gitops-runtimes).  -->

## Shared Configuration Repo URL formats
When defining the Shared Configuration Repository for the account, you have the option to specify a path, a branch, or both, within the repository URL.
This allows for flexibility in targeting specific directories or branches in the repository. 

`<repo_url>.git[/<path>][?ref=<branch>]`

where:
* `<repo_url>.git` is required and is the repository URL. This is the standard URL format which references the root of the default branch in the repository.  
  Example: `https://github.com/codefresh-io/our-isc.git`  

* `<path>` is optional, and points to a specific path within the repository. Use `<path>` if you want your configuration files within a subdirectory.  
  Example: `https://github.com/codefresh-io/our-isc.git/some/path`

* `<branch>` is optional, and references a specific branch in the repository.  
  Example: `https://github.com/codefresh-io/our-isc.git?ref=isc-branch`

Combining both a path and a branch allows more granular control.  
Example: `https://github.com/codefresh-io/our-isc.git/some/path?ref=isc-branch`.





## Location of the Shared Configuration Repo

You can see the URL of the Shared Configuration Repo for your Runtime in the **Organization Information** page. 

   {% include
	image.html
	lightbox="true"
	file="/images/runtime/shared-isc-repo/shared-isc-location.png"
	url="/images/runtime/shared-isc-repo/shared-isc-location.png"
	alt="Shared Configuration Repo URL"
	caption="Shared Configuration Repo URL"
  max-width="60%"
%}


## Shared Configuration Repo structure
Below is a representation of the structure of the repository with the shared configuration in the GitOps Runtime designated as the Configuration Runtime. 

```

├── resources <───────────────────┐
│   ├── all-runtimes-all-clusters │
│   │   ├── cm-all.yaml           │
│   │   └── subfolder             │
│   │   └── manifest3.yaml        │
│   │   └── promotion-workflows   │ # stores promotion workflow manifests available to all runtimes
│   │       └──  smoke-tests.yaml │
│   ├── runtimes                  │
│   │   ├── runtime1              │
│   │   │   └── manifest4.yaml    │
│   │   └── runtime2              │
│   │       └── manifest5.yaml    │
│   └── manifest6.yaml            │
└── app-projects                  │
└── configurations                │ # syncs to cluster by runtimes designated as Configuration Runtime
│   ├── products                  │ #    stores product manifests with all product settings except assigned applications
│   │   └── loans.yaml            │
│   ├── promotion-flows           │ #    stores promotion flow manifests with promotion orchestration settings 
│   │   ├── base-flow.yaml        │
│   │   └── hot-fix.yaml          │
│   └── promotion-policies        │ #    stores promotion policy manifests for products/environments with promotion workflows & promotion action  
│   │   ├── base-flow.yaml        │
│   │   └── prod-pr.yaml          │
│   │   └── loan-policy.yaml      │
│   └── promotion-templates        │ #    stores promotion template manifests for products with source info for version & properties to promote
│       └── demo-template.yaml          │
└── runtimes                      │
    ├── runtime1                  │ # referenced by "production-isc" argo-cd application, applied to the cluster by "cap-app-proxy"
    │   ├── in-cluster.yaml      ─┤ #     manage `include` field determines which dirs/files to sync to cluster
    │   └── remote-cluster.yaml  ─┤ #     manage `include` field to decide which dirs/files to sync to cluster
    └── runtime2                  │ # referenced by "staging-isc" argo-cd application, applied to the cluster by "cap-app-proxy
        └── in-cluster.yaml      ─┘ #     manage `include` field determines which dirs/files to sync to cluster
```


### `resources` directory 

The `resources` directory contains the resources shared by _all_ clusters managed by GitOps Runtimes.

{: .table .table-bordered .table-hover}
| Shared Configuration Repo    | Description     | 
| ----------                   |  -------- | 
| `resources/all-runtimes-all-clusters` | Contains resource manifests applied to all the GitOps Runtimes in the account and to all the clusters managed by those Runtimes. In the above example, `manifest2.yaml` is applied to both `runtime1` and `runtime2`. |
|`resources/all-runtimes-all-clusters/promotion-workflows` | Stores manifests of Promotion Workflows, available to all Runtimes in the account.<br>See [Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow). |
|`resources/control-planes` |  Optional. When defined, applies every resource manifest to each Runtime’s `in-cluster`. Config map resources for example, when committed to this subdirectory, are deployed to each Runtime’s `in-cluster`. |
| `resources/app-projects` | Contains application project resources which control deployment destinations for applications. | 
| `resources/configurations` | Contains platform-level resources which are Runtime-agnostic, essential for functionality related to product and promotion entities in GitOps. | 
| `resources/configurations/products` |Contains manifests of product entities. All settings including source location for application version, promotable properties, promotion flows with trigger conditions if defined are saved. Note that applications assigned to products are not saved in the manifest. Product manifests are available to users with the required ABAC permissions. <br>See [Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/) and [Product YAML]({{site.baseurl}}/docs/promotions/yaml/product-crd/).| 
| `resources/configurations/promotion-flows`| Contains manifests of promotion flows with the trigger and target environments, and custom promotion policy settings, if any.<br>See [Promotion Flow configuration]({{site.baseurl}}/docs/promotions/promotion-flow/) and [Promotion Flow YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-flow-crd/).|
|`resources/configurations/promotion-policies`| Contains manifests of promotion policies with the Pre- and Post-Action Workflows if defined, the Promotion Action, and target products and environments.<br>See [Promotion Policy configuration]({{site.baseurl}}/docs/promotions/promotion-policy/) and [Promotion Policy YAML]({{site.baseurl}}/docs/promotions/yaml/product-crd/).| 
|`resources/configurations/promotion-templates`| Contains manifests of promotion templates defining the sources for the release version and the properties to be promoted. <br>See [Promotion Template configuration]({{site.baseurl}}/docs/products/configure-product-settings/#configure-promotion-settings) and [Promotion Template YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-template-crd/).| 
|`resources/runtimes/<runtime_name>`| Optional. Runtime-specific subdirectory. Every resource manifest in a runtime-specific subdirectory is applied to only the GitOps Runtime defined by `<runtime_name>`. In the above example, `manifest4.yaml` is applied only to `runtime1`, and `manifest5.yaml` is applied only to `runtime2`. |



### `runtimes` directory 
The `runtimes` directory includes subdirectories specific to each GitOps Runtime installed in the cluster. Every subdirectory always has an `in-cluster.yaml`, and optionally, application manifest YAMLs for other clusters. 
The `runtimes/<runtime1>` subdirectory for example, includes the `in-cluster.yaml`, and a `remote-cluster.yaml` for the remote cluster also managed by the same Runtime.

##### Example application manifest for in-cluster.yaml

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  labels:
    codefresh.io/entity: internal-config
    codefresh.io/internal: 'true'
  name: in-cluster
spec:
  project: default
  source: 
    repoURL: <account's-shared-config-repository>
    path: resources # or shared-config/resources
    directory:
      include: '{all-runtimes-all-clusters/*.yaml,all-runtimes-all-clusters/**/*.yaml,runtimes/<runtime_name>/*.yaml,runtimes/<runtime_name>/**/*.yaml,control-planes/*.yaml,control-planes/**/*.yaml}'
      recurse: true
  destination:
    namespace: <runtime_name>
    server: https://kubernetes.default.svc
  syncPolicy:
    automated:
      allowEmpty: true
      prune: true
      selfHeal: true
    syncOptions:
      - allowEmpty=true
```


## Git Source application per Runtime
In addition to the application manifests for GitOps Runtimes in the Shared Configuration Repository, every GitOps Runtime has a Git Source application that references `runtimes/<runtime-name>`.  

This Git Source application creates an application manifest with the `<cluster-name>` for every cluster managed by the GitOps Runtime. The `include` field in the `<cluster-name>` application manifest determines which subdirectories in the `resources` directory are synced to the target cluster.

##  Shared Configuration Repo as Runtime application
You can view and monitor all resources in the Shared Configuration Repo as any other Argo CD application in the GitOps Apps dashboard's Current State tab.

Select the **Runtime ISC Application** option from the Runtime's context menu. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/shared-isc-repo/isc-runtime-app-context-menu.png" 
	url="/images/runtime/shared-isc-repo/isc-runtime-app-context-menu.png" 
	alt="ISC (Shared Runtime Configuration repo) as Application" 
	caption="ISC (Shared Runtime Configuration repo) as Application"
  max-width="70%" 
  %}


## Reset Shared Configuration Repo

As a Codefresh admin, you can reset the repo defined for your account if the URL is either incorrect or missing, or if there are no active GitOps Runtimes.

### Conditions for reset of Shared Repo

* **Incorrect/missing URL**  
  Mandatory when Codefresh notifies you through the UI that the Shared Configuration Repo URL is either incorrect or missing.

    * Incorrect URL<br>
      The Shared Config Repo details provided during installation in Account Setup are incorrect. Codefresh could not connect to the Shared Repo with the details provided.
    * Undefined URL<br>
      You installed the GitOps Runtime through a script or an automated mechanism without providing the URL to the Shared Configuration Repository.


    {% include
 image.html
 lightbox="true"
 file="/images/runtime/shared-config-repo-missing.png"
 url="/images/runtime/shared-config-repo-missing.png"
 alt="Notification for missing/incorrect Shared Configuration Repository"
 caption="Notification for missing/incorrect Shared Configuration Repository"
  max-width="100%"
%}

* **No active Runtimes**  
  If Codefresh has already validated the existing Shared Configuration Repository, meaning that at least one GitOps Runtime successfully connected to it, you _cannot change_ the Shared Configuration Repo URL.
  To do so, you must contact Codefresh Support.

  Otherwise, you can reset the Shared Config Repo URL only _after uninstalling all the GitOps Runtimes in your account_. This option is useful when moving from a temporary account, for example, a POV account, to your organization's official account to reset the URL.

<!--- ### Reset Shared Config Repo via UI
You can reset the Shared Config Repo via the Codefresh UI when you see the notification that the URL is either incorrect or missing.

**Before you begin**

Verify that you have [authorized access to the Codefresh app's organizations]({{site.baseurl}}/docs/administration/account-user-management/hosted-authorize-orgs/)


1. Click **Update**.
1. In **Add Shared Configuration Repo**, enter your Git username and the URL at which to create the repo.
1. From the list of **Git Organizations**, select the Git organization for the Codefresh application.


You can reset the Shared Configuration Repo via the CLI when:
* You receive the notification that the URL is incorrect or missing
* There are no active GitOps Runtimes in your account.
   To reset the URL for an account with existing GitOps Runtimes, you must [uninstall](#uninstall-gitops-runtimes) all the Runtimes.

-->
### Reset Shared Config Repo via CLI

##### Before you begin
* Make sure you have no active GitOps Runtimes in your account

##### How to


1. Run `cf config update-gitops-settings --shared-config-repo <shared_repo_url>`  
  where:  
  `<shared_repo_url>` is the new URL for the Shared Configuration Repository, optionally including a path, branch or both.
1. When prompted, select the Git provider.
1. Confirm to create the Shared Configuration Repo.



## Use case: Integration resources for Runtimes
When creating a new GitOps Integration resource, such as a container registry integration for example in the Codefresh UI, you can define the GitOps Runtimes to which to apply that resource. The `app-proxy` saves the resource in the correct location in the Shared Configuration Repo, and updates the relevant Argo CD Applications to include it. 

## Use case: Create application for distribution across all GitOps Runtimes
In this scenario, you want to distribute an application configuration to all GitOps Runtimes within your Codefresh account. Storing the application manifest in the `resources/all-runtimes-all-clusters` directory of the Shared Configuration Repository makes it automatically accessible to all the GitOps Runtimes in the account and to all the clusters managed by those Runtimes. 

Here's how to do this with the Shared Configuration Repo:

1. Create or update the application manifest in the `resources/all-runtimes-all-clusters` directory of the Shared Configuration Repository.  
1. Specify the desired configuration settings and resources required for the application in the manifest file.
1. Save and commit the changes to the Git repository.

{{site.data.callout.callout_tip}}
**TIP**    
You can then monitor these applications in the GitOps Apps dashboard, and drill down to each application in the GitOps Apps dashboard. 
{{site.data.callout.end}}




## Related articles
<!--- [Hosted GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)  -->
[GitOps Runtime essentials]({{site.baseurl}}/docs/installation/gitops/runtime-concepts/)  
[Install GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
[Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/)   
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/) 
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  


 










