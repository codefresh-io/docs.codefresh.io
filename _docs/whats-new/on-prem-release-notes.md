---
title: "Codefresh On-premises Release Notes"
description: "New features, bug fixes, feature flags for on-premises releases"
toc: true
---

Welcome to the release notes for our on-premises releases.
## On-premises version 2.10

### Installation & Upgrade

#### Installing v2.10
For detailed instructions on installing v2.10, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.


#### Upgrading to v2.10
The maximum GitOps runtime that is supported for this version is **0.26.x**.


### Features & enhancements in 2.10
**Pipeline Trigger Optimization** 
Improves the efficiency of how trigger information is retrieved by optimizing internal requests between the pipeline manager and the cf-api, resulting in faster and more reliable trigger evaluation:
- Reduces the number and cost of internal API calls when resolving pipeline triggers.
- Improves trigger evaluation performance, especially in environments with many pipelines or triggers.
- Lowers internal API load, contributing to overall platform stability


### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.


#### Updated Feature Flags
The table below describes the changes to existing Feature Flags in the Codefresh On-Premises release v2.10.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description  | Default Value |
| -----------        | --------------| ------------- |
| `pipelineTriggerOptimization`  | Enables optimization for requests from pipeline manager to cf-api internal for getting trigger information | TRUE |



### Bug fixes


##### Pipelines 
* Fixed an issue where the branch selection dropdown in trigger configuration and run dialogs failed to load branches for some GitHub integrations, preventing users from selecting existing branches.
* Fixed an issue where pipelines stopped triggering for newly created pull requests after a commit containing a [skip ci] tag, while older branches continued to trigger as expected.
* Improved Hybrid and Classic Runtime documentation to clarify how Helm chart values, upgrade/install hooks, and reconciliation jobs affect the runtime specification, helping prevent issues caused by excessive runtime spec updates.
* Fixed an issue where the Manage Runtime Environments modal in on-prem installations returned an INTERNAL_SERVER_ERROR despite changes applying correctly, reducing user confusion in the Admin panel.
* Fixed an issue in new Windows runtimes where image pulls could fail due to temporary files being written to the system drive despite a custom Docker root directory, causing disk-space errors during builds.


##### GitOps
* Fixed an issue where installing a Hybrid GitOps Runtime failed if the shared configuration Git repository was empty, ensuring runtime setup now succeeds on first-time installations.
* Fixed an issue where some Git source and child applications were shown multiple times in the Codefresh UI, ensuring the application list now correctly matches what is displayed in the native Argo UI.



## On-premises version 2.9

### Installation & Upgrade

#### Installing v2.9
For detailed instructions on installing v2.9, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.


#### Upgrading to v2.9
The maximum GitOps runtime that is supported for this version is **0.24.x**.

>**NOTE**  
⚠️ Breaking Changes in On-Prem 2.9

**[Classic runtime 8.x](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime) now uses Docker v28, which drops support for legacy ([manifest v2 schema 1](https://docs.docker.com/engine/deprecated/#pushing-and-pulling-with-image-manifest-v2-schema-1)) images.**  
Pipelines using these images will fail after upgrade — [update them before proceeding](https://codefresh.io/docs/docs/kb/articles/upgrade-deprecated-docker-images/).

**CLI-based runtime installs are deprecated.**  
To upgrade to the new Docker runtime 8.x, you must first [migrate to the Helm-based runtime](https://codefresh.io/docs/docs/installation/runner/install-codefresh-runner/) in [this repo](https://github.com/codefresh-io/venona/tree/main/charts/cf-runtime#migrating-from-cli-based-installation-to-helm-chart)

### Features & enhancements
[**Enhanced GitOps App Breadcrumbs**](https://app.getbeamer.com/codefreshio7974/en/exciting-new-feature-enhanced-gitops-app-breadcrumbs-9Jr0zhN8)  
Navigation is now clearer and faster with:
- Runtime link in breadcrumbs – click to view all apps for that runtime.
- New icons for Runtime, GitSource, ApplicationSet, and Application, making app hierarchy easier to understand at a glance.

**Applications are now associated with Products only via an Annotation.**  
The older "Manage Apps" section for product association has been deprecated.

[**Easily Add Secret Variables**](https://app.getbeamer.com/codefreshio7974/en/easily-add-secret-variables)  
You can now create secret variables directly in the UI:
- One-step creation – no manual encryption needed.
- Improved security – secrets are encrypted automatically.
- Clearer workflow – easily distinguish regular vs. secret variables.

### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.


#### New Feature Flags in v2.9
The table below describes the _new_ Feature Flags in the Codefresh On-Premises release v2.9.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description  | Default Value |
| -----------        | --------------| ------------- |
| `hideProductManageApps`  | Hide ability to manage apps directly from the product view | TRUE |


#### Updated Feature Flags in v2.9
The table below describes the changes to existing Feature Flags in the Codefresh On-Premises release v2.9.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description  | Default Value |
| -----------        | --------------| ------------- |
| `newVariablesConfiguration`  | New component for variables configuration | TRUE |



### Bug fixes


##### General

* mongoSeedJob now honors RUNTIME_MONGO_TLS_VALIDATE="false", allowing seeds to run against MongoDB with self-signed certificates without manual script changes.
* Removing an LDAP IDP now deactivates and unassigns users from that IDP, preventing broken states and login issues. This approach also avoids accidental removals when users belong to multiple accounts.


##### Pipelines 
* cf-system-etl-postgres pods fail with self-signed certificate errors.
* Windows runtime builds using cf_export no longer fail with exit code 1 when running on Engine v1.178.1.
* Stable feature flags are now enabled by default in RabbitMQ when upgrading from 2.6.7 to 2.8.0/2.8.3, preventing upgrade failures.
* Runtime upgrades no longer hit “Resulting document after update is larger than 16777216.” Fixed in runtime-environment-manager v3.42.1.
* The Terraform codefresh_pipeline resource now correctly updates the permit_restart_from_failed_steps setting, ensuring changes are reflected in pipeline configuration and UI.


##### GitOps
* Added support for self-signed certificates in the cf-argocd-extras event-reporter and sources-server, eliminating the need for insecure config workarounds.


## On-premises version 2.8

### Installation & Upgrade

#### Installing v2.8
For detailed instructions on installing v2.8, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.


#### Upgrading to v2.8
>**NOTE**  
This version includes **breaking changes**. Please review the upgrade documentation carefully before proceeding. See [Upgrade to 2.8 in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-8-0){:target="\_blank"}.

### Features & enhancements
This release focuses on stability for an improved user experience.

### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.


#### New Feature Flags in v2.8
The table below describes the _new_ Feature Flags in the Codefresh On-Premises release v2.8.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description  | Default Value |
| -----------        | --------------| ------------- |
| `newUsersAndTeamsPages`  | Activates the new user and team management experience with an updated layout and streamlined controls. | FALSE         |


#### Updated Feature Flags in v2.8
There are no updated feature flags in this release. 

### Bug fixes


##### General

* Blank screen after login for invited users with SSO sync enabled.


##### Pipelines 
* Git trigger for "Release published" fires incorrectly when any release-related trigger is enabled. 
* Webhook events for Bitbucket ignored when pipeline trigger uses different Bitbucket integrations. 
* For GitHub, list of files modified by PR (pull request) does not include all modified files. 


##### GitOps
* GitOps permission rule for applications including the Git Source attribute not supported for applications from ApplicationSets.<!--- runtime version with fix to be released  -->
* Removed the **SSH** option from the **Repository** field in the Create Git Source form. Selecting SSH resulted in the error `failed creating git-source. error: Invalid URL`, as SSH is not a valid option for Git Sources. 
* Inaccurate change failure rate for DORA metrics. 
* Labels for ingress controllers not supported in GitOps Runtime Helm chart.

## On-premises version 2.7

### Installation & Upgrade

#### Installing v2.7 
For detailed instructions on installing v2.7, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.

#### Upgrading to v2.7
For details, see [Upgrade to 2.7 in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-7-0){:target="\_blank"}

### Features & enhancements

#### General: Increased limit for audit logs

Codefresh keeps a log of all actions that happen at all times based on API calls that reach Codefresh. These include UI actions from users, CLI invocations, and any external integration used with Codefresh.  
We have now increased the audit limit _from 15,000 to 50,000_, which means you can access more data on how you use your Codefresh account.  

For details, see [Auditing actions in Codefresh]({{site.baseurl}}/docs/administration/account-user-management/audit/).

<br><br>


#### GitOps: Promotions with GitOps-the Codefresh advantage
We’re excited to introduce **promotions** in Codefresh GitOps!

In Continuous Delivery (CD), promotions are essential for advancing application versions across environments in a controlled, traceable manner. 
**Promotions in Codefresh GitOps** enhance this process by providing greater visibility, control, and automation while maintaining Git as the single source of truth. Additionally, they integrate with and extend **Argo CD**, enabling structured promotion flows, policy enforcement, and enhanced deployment tracking beyond standard application syncs. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/overview/promos-gitops.png" 
url="/images/gitops-promotions/overview/promos-gitops.png"
alt="GitOps promotions in Codefresh" 
caption="GitOps promotions in Codefresh"
max-width="60%"
%}

>**NOTE**  
GitOps promotions require Runtime version 0.13.4 or higher. Ensure your runtime is updated to access promotion features.

##### Why use GitOps promotions in Codefresh?
Codefresh builds on Argo CD’s deployment model by introducing structured promotion flows with additional context and automation:

* **Declarative and version-controlled**  
  Promotions are fully tracked in Git, tied to commits, ensuring traceability. Teams can see who triggered a promotion and why.

* **Enhanced context and visibility**  
  While Argo CD manages application deployments, Codefresh GitOps provides additional structure with:  
  * **Environments**, defining stages in the software lifecyle, allowing you to track application progress.  
  * **Products**, grouping related applications for unified promotion management. 
  * **Releases**, providing end-to-end visibility into deployments across environments. 


##### Promotion entities
Codefresh GitOps streamlines and automates promotions, eliminating the need for custom scripts. 
* **Promotion properties** to control which application properties are promoted and prevent unnecessary changes.  
* **Promotion Workflows** to enforce environment-specific checks such as validations, compliance, and performance checks at different stages of promotions.    
* **Promotion Policies** to govern advanced promotion behavior for environments.  
* **Promotion Flows** to automate complex promotions across multiple environments.  

For details, see [About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/).

<!--- ## GitOps: Simplified Runtime installation with the installation wizard

Our new installation wizard, designed for ease of use and maximum visibility into every step, makes installing a GitOps Runtime simple, intuitive, and quick.


##### Key features
* **Installation and configuration** steps clearly defined, allowing you to complete the entire setup from the same location.
* **Guided experience** that walks you through each step.
* **Inline parameter descriptions** so you always know what to define.
* **Automatic progress saving** so you can stop anytime and resume exactly where you left off.

##### Installation
Install a Runtime in three simple steps:
* Define the Shared Configuration Repo and Git provider—a one-time action for the first Runtime in your account.
* Review and define installation parameters, which are automatically populated in the install command.
* Run the install command in your terminal.

##### Configuration
Configuration steps are clearly defined, allowing you to complete setup correctly.
* **Define Git credentials**, with the option to use the same token for both the Runtime and user authentication. Required scopes are detailed to ensure the correct permissions.
* **Configure as an Argo CD Application** to take full advantage of GitOps. 
* **Add a Git source** to the Runtime so you are ready to create applications.

-->





### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.

<br>

#### New Feature Flags in v2.7
There are no new feature flags in this release.



#### Updated Feature Flags in v2.7
The table below lists existing Feature Flags which have been updated by default to be either enabled (set to _TRUE_), or disabled (set to _FALSE_).

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `abacAndRule`             | When enabled, supports creating ABAC rules for entities in Codefresh pipelines using "AND".| _FALSE_  |


### Bug fixes
##### General
* Users not removed on selecting **Remove deactivated users during sync** in LDAP SSO settings.

##### Pipelines 
* Builds frozen at the initialization phase when connecting to Vault secret store.
* Build fails with `manifest unknown` error when referencing or including v1.0.12  of `jira-issue-manager` step.
* `build` step fails to build ECR images when base image (`FROM`) is from a different AWS account.



<br>

##### GitOps
* Broken hyperlink to Shared Configuration Repository in the Upgrade Runtime panel.
* Typo in the parameter name in the `values.yaml` file of the `gitops-runtime` chart.

## On-premises version 2.6

### Features & enhancements

#### Installing v2.6 
For detailed instructions on installing v2.6, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.

#### Upgrading to v2.6
For details, see [Upgrade to 2.6 in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-6-0){:target="\_blank"}


#### GitHub repo 
We're excited to announce that the on-prem release is now available on a [public GitHub repository](https://github.com/codefresh-io/codefresh-onprem-helm/tree/release-2.6/codefresh){:target="\_blank"}, in addition to ArtifactHub, providing easier access and transparency for our users.

#### General: Annotate image by name via CLI
Now using the CLI, you can annotate your images also by their names, instead of only the image SHA.


You can easily find and copy the image name from the Images dashboard.


{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/nov24/image-name-images-dashboard.png" 
   url="/images/whats-new/nov24/image-name-images-dashboard.png" 
   alt="Copy image name in Images dashboard" 
   caption="Copy image name in Images dashboard" 
   max-width="60%" 
   %}


Here's an example of the CLI command:
`codefresh annotate image docker.io/codefresh-io/cli:latest -l coverage=75% -l tests_passed=true`

To use this feature, make sure to upgrade to the latest CLI version.

<br>

#### Pipelines: Octopus Deploy integration
We're excited to announce the first set of official Codefresh steps for Octopus Deploy! 
With these steps, you can streamline your pipeline and integrate your Codefresh builds with deployments in Octopus Deploy. 

Explore these steps in the [Codefresh steps marketplace](https://codefresh.io/steps){:target="\_blank"}:
* Log in to Octopus Deploy
* Push packages to Octopus Deploy
* Create releases in Octopus Deploy
* Deploy a release in Octopus Deploy
* Deploy a tenanted release in Octopus Deploy
* Run a runbook in Octopus Deploy
* Push build information to Octopus Deploy

For details, see [Octopus Deploy pipeline integration]({{site.baseurl}}/docs/integrations/octopus-deploy/).

<br>

#### Pipelines: Expanded support for `buildx qemu` images
For Docker `build` steps, you can now specify a `buildx qemu` image from any container registry, allowing users to use self-hosted registries, including Artifactory.  
Previously, `buildx qemu` supported only the default image.


You can now add custom trusted QEMU images to the build step, ensuring support for your preferred configurations. Simply update the `values.yaml` file with the full image name under `runtime.engine.env.TRUSTED_QEMU_IMAGES`.

For example:

```yaml
Copy code
runtime:
  engine:
    env:
      TRUSTED_QEMU_IMAGES: "qemu-user-static,ghcr.io/example/qemu-image"
```

For details, see [Defining trusted QEMU images]({{site.baseurl}}/docs/pipelines/steps/build/#defining-trusted-qemu-images).

<br>

#### Pipelines: Export build cache to external destinations
We've enhanced the `build` step by introducing the `cache_to` parameter. The parameter allows you to export build caches to one or more external destinations, improving portability and enabling faster builds. Combined with the `cache_from` parameter, it provides a powerful mechanism for leveraging cached layers across pipelines and environments.


Here's an example with both `cache_from` and `cache_to` with `buildx`.

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
    buildx:
      builder:
        driver: docker-container
    cache_from:
    - type=registry,ref=my-registry/my-app-image:${{CF_BRANCH}}
    - type=registry,ref=my-registry/my-app-image:master
    cache_to:
    - type=registry,mode=max,oci-mediatypes=true,image-manifest=true,compression=zstd,ref=my-registry/my-app-image:${{CF_BRANCH}}
```

For details, see [Fields in build step]({{site.baseurl}}/docs/pipelines/steps/build/#fields).

<br>

#### Pipelines: Output parameters in `arguments` attribute

Plugins in pipelines can now consume outputs directly from the `arguments` attributes within step definitions, optimizing pipeline functionality.

Now, plugins can consume outputs from both the `arguments` and `commands` attributes.

```yaml
{% raw %}
...
  plugin_consume:
    title: consume var in plugin step
    type: codefresh/consume-variable
    arguments:
      output_variable: ${{steps.<step_name>.output.<var_name>}}
...
{% endraw %}
```

<br>

#### GitOps: Reporting for multi-architecture images
Image reporting is now available for multi-architecture images.  
On drill down into the image from the Images dashboard, the OS/Arch column displays digests for each OS architecture.




{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-multi-arch-image.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-multi-arch-image.png" 
   alt="Multi-arch image in Images dashboard" 
   caption="Multi-arch image in Images dashboard" 
   max-width="80%" 
   %}

<br>

#### GitOps: Display full name for applications
We have improved usability of the Current State tab in the GitOps Apps dashboard by displaying the full name of all resources in Tree view.

If you have naming conventions that result in long names, easily toggle between displaying the full/truncated resource name with a handy button in the Current State toolbar.

{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-show-full-app-name.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-show-full-app-name.png" 
   alt="Show Full Name toggle in Current State tab" 
   caption="Show Full Name toggle in Current State tab" 
   max-width="80%" 
   %}


<br>

#### GitOps: Enhanced visibility and control for Runtimes

We have improved the usability and monitoring of GitOps Runtimes by converting them into applications. Now, you can view GitOps Runtimes and their resources directly in the Current State tab of the GitOps Apps dashboard, with access to all familiar dashboard functionality for intuitive monitoring and streamlined management.

##### What does this mean?
In the Runtime's context menu (List View), you'll find links to these Runtime applications:
* Hosted & Hybrid GitOps Runtimes configured as Argo CD applications
* Hybrid GitOps Runtimes:
    * Runtime Shared Configuration Repo (ISC) resources 
    * Runtime resources in local (in-cluster) environment

{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-runtimes-as-apps.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-runtimes-as-apps.png" 
   alt="Links to Runtimes applications" 
   caption="Links to Runtime applications" 
   max-width="80%" 
   %}

Clicking a link takes you to **GitOps Apps > Current State** tab for the application.


{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-runtime-app-apps-dashboard.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-runtime-app-apps-dashboard.png" 
   alt="Example of Runtime application in GitOps Apps > Current State" 
   caption="Example of Runtime application in GitOps Apps > Current State" 
   max-width="80%" 
   %}

### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.

<br>

##### New Feature Flags in v2.6
The table below describes the _new_ Feature Flags in the Codefresh On-Premises release v2.6.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description  | Default Value |
| -----------        | --------------| ------------- |
| `currentStateNodeExpand`  | When enabled, dynamically expands the nodes in the Current State's Tree view (in the GitOps Apps dashboard) to display the complete content. | FALSE         |
| `gitopsOnboarding` | When enabled, enhances the onboarding user-experience.| FALSE  |
| `gitopsGroupsPage` | When enabled, on selecting **GitOps Apps** from the sidebar, opens the **Groups** tab instead of the Applications tab.| TRUE  |
| `gitopsEnvironments` | When enabled (the default), displays the Environments dashboard option in the sidebar, and enables users to manage environments.| TRUE  |
| `modulesConfigurationPage`     | When enabled (the default), enables administrators to customize the modules and menu items displayed in the sidebar. | TRUE         |
| `multiSource`            | When enabled, supports displaying information for multi-source applications in the **GitOps Apps > Current State** tab, and in the **Product > Releases** tab.   | FALSE|
| `newVariablesConfiguration` | When enabled, displays the new revamped form to add and configure variables in projects, pipelines, and triggers. | TRUE         |
| `newLogo`     | When enabled (the default), displays the new logo in the Codefresh platform. | TRUE         |
| `promotionFlowsManagement`     | When enabled (the default), enables the administrator to add, edit, and delete Promotion Flows. | TRUE         |
| `promotionPolicies`     | When enabled (the default), displays Promotion Policies in the sidebar.  | TRUE         |
| `promotionCommitStatuses`    | When enabled, the promotion mechanism reports the statuses of Git commits to Git providers. | FALSE         |
| `systemFonts`     | When enabled (the default), uses system fonts instead of custom fonts in the UI. | TRUE         |
| `useSeparatePlanner` |When enabled, uses the new version of the Planner for pipelines.  | FALSE    |
| `yamlTreeJsonPathBuilder`     | When enabled, displays the YAML file in tree mode, allowing users to easily select an attribute and automatically generate a JSON path. Available in **Product > Settings > Promotion Settings**.   | TRUE         |

<br>

##### Updated Feature Flags in v2.6
The table below lists existing Feature Flags which have been updated by default to be either enabled (set to _TRUE_), or disabled (set to _FALSE_).

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
|`productCRD`    | When enabled (the default), allows creating a Custom Resource Definition (CRD) for the Product entity in GitOps.| _TRUE_   |
|`promotionOrchestration`        |  When enabled (the default), supports promotion orchestration for products including product's releases API and promotion flow API.| _TRUE_  |
|`promotionFlow`        | When enabled (the default), allows you to drag an application in the GitOps Product dashboard from its current environment to a different environment and trigger a promotion flow.| _TRUE_  |
|`promotionWorkflows` | When enabled (the default), allows you to create and run Promotion Workflows when a promotion is triggered. | _TRUE_         |  
|`useRepoAndBranchesNextPagination`   | When enabled, when adding Triggers to pipeline workflows, the **Repository** dropdown displays repositories and branches in paginated format, with the Next button for navigating between pages.  | _TRUE_         |

### Bug fixes


##### General
* Active user gets logged out from account due to inactivity even when session is active.


##### Pipelines 
* Docker `build` steps fail to run when setting `buildx qemu` image to any image that is not the default.
* Engine pod logs display values of secret variables.
* DIND pod not created when `runtime.dind.env` values are defined. 
* Clicking **Save** does not save new variable in Shared Configuration or triggers.
* Trigger settings not refreshed for selected pipeline when switching between pipelines in **Workflows > Triggers**.
* Pipelines in debug mode terminated even when there is no active debug session.
* Docker Compose files using Version 3 not supported for service containers in pipelines.



##### GitOps 
* `failed to retrieve application version, app name: <"app_name>": unknown key appVersion` error when application versioning is not configured.
* Application validations use destination cluster instead of application cluster.
* Multi-arch images not reported in Images dashboard.


## On-premises version 2.5

### Features & enhancements

#### Installing v2.5 
For detailed instructions on installing v2.5, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.

#### Upgrading to v2.5
For details, see [Upgrade to 2.5 in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-5-0){:target="\_blank"}.


#### General: Service Accounts for centralized administration

We're excited to announce the launch of service accounts in Codefresh.

##### Why service accounts?

Service accounts make administration simpler. They provide automated processes, applications, and services with the necessary permissions to interact securely with your infrastructure.

{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/sep24/rel-notes-sep24-add-service-account.png" 
   url="/images/whats-new/sep24/rel-notes-sep24-add-service-account.png" 
   alt="Create service account" 
   caption="Create service account" 
   max-width="60%" 
   %}

##### Key features of service accounts in Codefresh

* **Toggle status**  
  Easily turn service accounts on or off with a toggle. Deactivate service accounts when not in use or invalidate their API keys without removing the account. Reactivate them when needed.

* **RBAC compliance**  
  Assign service accounts to teams to ensure role-based access control (RBAC) compliance for your pipelines.

* **Multiple API keys for granular access**  
  Manage access effortlessly by allowing each service account to hold multiple API keys, each with specific scopes and purposes.

{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/sep24/rel-notes-sep24-service-account-list.png" 
   url="/images/whats-new/sep24/rel-notes-sep24-service-account-list.png" 
   alt="Service account list" 
   caption="Service account list" 
   max-width="80%" 
   %}

For details, see [Managing service accounts]({{site.baseurl}}/docs/administration/account-user-management/service-accounts/)

#### General: Personalized menus

We have introduced a powerful feature that gives admins even more control over the Codefresh platform: customizable menus!  

Take control of your account's menu items and personalize the interface to create a more user-friendly and productive environment.
Simplify navigation by hiding unnecessary menu items and decluttering the sidebar, ensuring that users can quickly the pages they need.  


We've added a new page to Settings entitled **Modules**. Admins can decide exactly which menu items are displayed in the sidebar for all users in the account. 

##### How it works
We have three main modules for the plaform:
* Continuous Delivery (CD) with GitOps 
* Continuous Integration (CI) with Pipelines 
* Continuous Delivery (CD) with Pipelines 

By default, all modules, submodules, and menu items are enabled. 

Using the toggle method, you can easily customize what's visible: switch to ON to display an item and OFF to hide it. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/administration/sidebar-modules/module-disabled.png" 
   url="/images/administration/sidebar-modules/module-disabled.png" 
   alt="Example of main module toggled OFF" 
   caption="Example of main module toggled OFF" 
   max-width="60%" 
   %}


For even more precise control, you can toggle individual pages on or off.

   {% include 
   image.html 
   lightbox="true" 
   file="/images/administration/sidebar-modules/customized-menu-list.png" 
   url="/images/administration/sidebar-modules/customized-menu-list.png" 
   alt="Example of customized sidebar with pipeline menu items" 
   caption="Example of customized sidebar with pipeline menu items"
   max-width="80%" 
   %}

Admins can always view all hidden items in the sidebar by toggling the **Show in sidebar option...** to ON.

Start streamlining your team's experience today!



#### General: Brand-new search mechanism and experience 
We’re excited to introduce the revamped search mechanism for our doc site!

**Context-aware**  
Wherever you are in Codefresh and open search from the toolbar, either from Global Search & Navigation by typing `help` or by clicking the Help icon, 
you’ll get a curated list of articles that are context-sensitive to your location in the UI to kick-start your search.

Additionally, for an enriched information experience, check out our collection of blog posts from our experts. 

Here are **more reasons** to try the new search:
* **Preview**  
  Check out search results and preview articles before diving in. Just click an article in the list to display it in the Preview panel.
* **View Article**    
  Click View Article on the toolbar of the Preview panel to go straight to the article on the doc site.
* **Share Links**  
  Share useful articles easily with the deep link option, also on the Preview toolbar.
* **Additional Resources**  
  Access handy pages, including our collection of blogs, quickly with permalinks at the bottom of the search results.

{% include
image.html
lightbox="true"
file="/images/whats-new/july24/rel-notes-july-24-search-preview.png"
url="/images/whats-new/july24/rel-notes-july-24-search-preview.png"
alt="Preview pane in search results"
caption="Preview pane in search results"
max-width="60%"
%}

Try our new search and don’t forget to send us your feedback!

#### Pipelines: RBAC for Pipeline Runtimes
We have further strengthened security for pipelines with RBAC permissions for Pipeline Runtimes.  
RBAC for Pipeline Runtimes enhances the permissions system with granular access control not just for Pipeline Runtimes, but also for runtime environments and resources within pipelines.  


##### Key benefits
* Granular control over runtimes  
  Precisely manage access to runtime environments. For example, restrict access to production environments to safeguard production resources, or grant exclusive access to high-performance runtime environments for high-priority projects, ensuring they have the necessary resources.
* Optimized resource management for runtimes  
  Optimize performance without admin intervention by allowing teams to adjust CPU and memory settings for pipeline builds.


##### How does it work?
Similar to other entities, you implement RBAC for Pipeline Runtimes, runtime builds, and resources, through tags and rules. After adding tags to Pipeline Runtimes, you can define rules for the Pipeline Runtimes, and for runtime environments and resources within pipelines. 

{% include
image.html
lightbox="true"
file="/images/whats-new/july24/rel-notes-july-24-pipeline-runtimes-add-tags.png"
url="/images/whats-new/july24/rel-notes-july-24-pipeline-runtimes-add-tags.png"
alt="Tags for Pipeline Runtimes"
caption="Tags for Pipeline Runtimes"
max-width="60%"
%}


{% include
image.html
lightbox="true"
file="/images/whats-new/july24/rel-notes-july-24-runtime-env-permissions.png"
url="/images/whats-new/july24/rel-notes-july-24-runtime-env-permissions.png"
alt="Rules for runtime environments and resources in pipelines"
caption="Rules for runtime environments and resources in pipelines"
max-width="60%"
%}

For details, see [Assign tags to Pipeline Runtimes]({{site.baseurl}}/docs/administration/account-user-management/access-control/#assign-tags-to-pipeline-runtimes) and [Creating rules for Pipeline Runtimes and runtime environments]({{site.baseurl}}/docs/administration/account-user-management/access-control/#creating-rules-for-pipeline-runtimes-and-runtime-environments).


#### Pipelines: Dedicated environment variables for pull request titles

We’ve made a change to how pull request titles are handled by environment variables in pipelines.

The environment variables {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %} and {% raw %}`${{CF_COMMIT_MESSAGE_ESCAPED}}`{% endraw %} now return the commit message instead of the pull request title.

To get the pull request title, use the new environment variables:
* {% raw %}`${{CF_PULL_REQUEST_TITLE}}`{% endraw %}
* {% raw %}`${{CF_PULL_REQUEST_TITLE_ESCAPED}}`{% endraw %}

To use the new variables for pull request titles, update your pipelines accordingly.  As they are already supported by the system, you can begin using them immediately.

For details, see [System variables]({{site.baseurl}}/docs/pipelines/variables/#system-variables).





#### GitOps: Runtime upgrade

The Open Source ArgoCD project published a high-severity security vulnerability. We recommend upgrading your GitOps Runtime to version 0.9.0, which includes a fix for this issue, along with other fixes and features.

This CVE affects webhook processing and is relevant only to customers who have configured webhooks.

To upgrade to the latest release, follow the on-screen instructions to run `helm upgrade`.




#### GitOps: External links for Kubernetes app & ingress resources 
The Current State tab in our GitOps Apps dashboard is the central location to view and manage all the resources in your applications. We are always looking to enhance productivity, and here are the newest features we support: external Links for application and ingress resources! 

##### External links to app resources
External links are user-defined URLs for Kubernetes resources in Argo CD that can point to any external resource such as monitoring pages or documentation. These links, added through annotations in resources, are also rendered in Codefresh, for smooth and easy navigation.    

A Kubernetes resource with external links shows a clickable link icon below the resource's context menu, from which you can navigate to the   next to the resource in the Tree view for easy and smooth navigation. 

{% include
image.html
lightbox="true"
file="/images/whats-new/july24/rel-notes-july-24-resource-ext-link.png"
url="/images/whats-new/july24/rel-notes-july-24-resource-ext-link.png"
alt="External link for resource in Current State Tree view"
caption="External link for resource in Current State Tree view"
max-width="50%"
%}

##### External links for ingress resources
We also support automatic links for ingress resources! Access links to ingress resources are also automatically generated and rendered in the Current State's Tree view for visibility and easier management.

{% include
image.html
lightbox="true"
file="/images/whats-new/july24/rel-notes-july-24-resource-ext-link.png"
url="/images/whats-new/july24/rel-notes-july-24-resource-ext-link.png"
alt="Ingress resource links in Current State Tree view"
caption="Ingress resource links in Current State Tree view"
max-width="50%"
%}

For details, see [Access external links]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#access-external-links).

#### GitOps: Application menu enhancements in Environment & Product dashboards

We’ve restructured and redesigned the context menu for applications in the Environments and Products dashboards for easier navigation and quicker access to the information you need!

{% include
image.html
lightbox="true"
file="/images/whats-new/july24/rel-notes-july-24-app-menu.png"
url="/images/whats-new/july24/rel-notes-july-24-app-menu.png"
alt="Context menu for applications in Environments and Products"
caption="Context menu for applications in Environments and Products"
max-width="60%"
%}

Here’s a round-up of the changes:  
* **Application Info**  
  A new menu groups handy links for direct access to useful application info.
* **Quick View**  
  Now conveniently available in the Application Info menu.
* **Go to application**
  This new option takes you straight to the Current State tab in the GitOps Apps dashboard for the application.
* **Timeline**  
  Directly opens the deployment history for the application for easy access. No need to click the application name.
* **Diff View**  
  Enabled when an app is out-of-sync, providing direct access to our visual Diff View editor to identify discrepancies between desired and live states.

Other actions remain unchanged. 

For details, see [Working with applications in Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/#working-with-applications-in-environments) and [Working with applications in Products]({{site.baseurl}}/docs/dashboards/gitops-products/#working-with-applications-in-products).


#### Usability enhancements

##### General: Seamless redirection for shared links 
We implemented a small but significant improvement to your Codefresh experience. 

Now, when you try to access a shared link while not logged into the platform, you will be automatically redirected to the URL you entered after logging in, instead of being taken to the default Home dashboard view.


##### Pipelines: Project name in breadcrumbs in Builds page
In the Builds page, on selecting a build, the breadcrumbs path displays also the project name.

{% include
  image.html
  lightbox="true"
  file="/images/whats-new/june24/rel-notes-jun24-project-name-in-builds.png"
  url="/images/whats-new/june24/rel-notes-jun24-project-name-in-builds.png"
  alt="Builds page: Project name in breadcrumbs"
  caption="Builds page: Project name in breadcrumbs"
  max-width="60%"
%}


### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.

##### New Feature Flags in v2.5
The table below describes the _new_ Feature Flags in the Codefresh On-Premises release v2.5.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description  | Default Value |
| -----------        | --------------| ------------- |
| `analyticsCommittersListTable` | When enabled, displays the Committers per month table in **Usage > Active Seats**.| FALSE  |
| `batchRefsResolvmentApiGraphql`    | When enabled, improves performance in GitOps. | FALSE         |
| `hideHelmChartsMenuItem`            | When enabled, hides the **Helm Charts** menu item for Pipelines in the sidebar.  | FALSE|
| `hideHelmReleasesMenuItem`                   | When enabled, hides the **Helm Releases** menu item for Pipelines in the sidebar.| FALSE  |
| `hideKubernetesServicesMenuItem`     | When enabled, hides the **Kubernetes Services** menu item for Pipelines in the sidebar.  | FALSE         |
| `hideHelmBoardsMenuItem` | When enabled, hides the **Helm Boards** menu item for Pipelines in the sidebar. | TRUE         |
| `limitAmountOfApplicationTreeWithErrorsRequests`  | When enabled, improves performance in GitOps. | FALSE         |
| `sharedLibTopBar` |When enabled (the default), displays the shared top menu bar common to Pipelines and GitOps.  | FALSE    |
| `sharedLibSideMenu`     | When enabled (the default), displays the shared menu common to Pipelines and GitOps. | TRUE         |




##### Updated Feature Flags in v2.5
The table below lists existing Feature Flags which have been updated by default to be either enabled (set to _TRUE_), or disabled (set to _FALSE_).

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
|`abacRuntimeEnvironments`    | When enabled (the default), allows creating rules in **Permissions** which impacts options in <b>Pipeline > Settings > Build Runtime</b>: {::nomarkdown}<ul><li><b>Build Runtime Environment</b>: When enabled, allows restricting Runtime Environments available for pipelines based on tags. Restricted Runtime Environments are disabled in the Runtime Environments list for the pipeline/build run.</li><li><b>Pipeline</b> actions:<ul><li><b>Manage resources</b>: Select CPU, memory, and minimum disk space for the pipeline/build run.</li><li><b>Set runtime environment</b>: Select a Runtime Environment from those available in the Runtime Environments list for the pipeline/build run.</li><li><b>Set cloud builds</b>: Set Cloud build and select the resource size for the pipeline/build run.</li></ul></li></ul> {:/}| _TRUE_   |
|`abacUIEnforcement`        |  When enabled (the default), for Pipelines, prevents the user from selecting options and performing actions which are not permitted.| _TRUE_  |
|`abacV2UIEnforcement`        | When enabled (the default), for GitOps, prevents the user from selecting options and performing actions which are not permitted.| _TRUE_  |
| `accountInfoCopyButton`  | When enabled (the default), adds the account ID to the URL. When sharing the URL with the account information, recipients can seamlessly switch accounts.   | _TRUE_         |
| `serviceAccounts` | When enabled (the default), allows Codefresh administrators to create shared Service Accounts not associated with specific users for centralized access and permissions management. | _TRUE_         |


### Bug fixes

##### General
* Download Audit downloads empty CSV file. 
* Invite text in Welcome screen displays `undefined` instead of the organization name. 

##### Pipelines
* Secrets store integration breaks after upgrading `dind` to version 26.1.4-1.28.7.
* `Failed to write template value file Arguments to filesystem` error for builds with `codefresh-run` step.
* Permission and missing scope error when running `codefresh validate yaml` command.
* Step-member variables not supported between different parallel blocks.
* Trigger for Azure DevOps creates builds for files ignored in modified files. 
* `Failed - build runtime settings not configured` error for Hybrid Runner.
* `build` step does not support images from different account for Amazon ECR (Elastic Container Registry).

##### GitOps
* Audit log does not show changes made to GitOps permissions.
* Command failure for `argo-platform-analytics-reporter`.
* Manual Rollout actions not available in audit log.
* GitOps permissions do not function correctly when attributes are applied.
* Annotations added during a build run or via CLI not displayed in the Summary tab of the Images dashboard. 
* Current Release not displayed for multi-sourced apps. 
* Sync statuses for applications within ApplicationSets not correctly displayed in Codefresh UI. 
* Unresponsive **Close** button in Rollout drawer. 

## On-premises version 2.4

### Features & enhancements

Welcome to our newest on-premises release!

#### Installing v2.4 
For detailed instructions on installing v2.4, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.

#### Upgrading to v2.4
For details, see [Upgrade to 2.4.0 in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-4-0){:target="\_blank"}.

#### General: New `cfapi-auth` role 
We have introduced the `cfapi-auth` role in v2.4. Make sure it is enabled.

```yaml
cfapi-auth:
  <<: *cf-api
  enabled: true
```
For details, see [`cfapi-auth` role in Artifactory](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-4-0){:target="\_blank"}.

#### General: PROJECT_ONE as default for accounts
From v2.4 and higher, the default `SYSTEM_TYPE` has been changed to `PROJECT_ONE`.    
To retain the original Classic version, you will need to update `cfapi` environment variables. See [Default system type in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#default-system_type-for-acccounts){:target="\_blank"}.

If you need a refresher on the new navigation, see our [documentation]({{site.baseurl}}/docs/new-codefresh/menu-navigation/).

#### General: More power to Global Search & Navigation

We're excited to announce major enhancements powering our Global Search & Navigation: 

* **Actions through Search**  
  Execute actions using search or keyboard shortcuts:
  * Run a pipeline: Search to navigate to a specific pipeline, and then use the `R` and `N` shortcut keys to trigger that pipeline.
  * Refresh an application: Search for the application you need, and then use the `R` and `F` shortcut keys to instantly refresh the application.
  * Sync an application: Within an application, use the `S` and `Y` shortcut keys to open the sync dialog.

* **Quick navigation**  
  * **Integrated link to `app-proxy` logs**  
    We've introduced App-proxy logs as a new navigation item. You can now type `App-proxy logs` to access a list of GitOps Runtimes. From there, simply select a Runtime to view its app-proxy logs in the online terminal. 
  * **GitOps Runtimes for admins**  
    Type `GitOps Runtimes` and click to go directly to the GitOps Runtimes page. 
  * **GitOps Permissions for admins**  
    Type `GitOps Permissions` and click to go directly to the Permissions page.

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/apr24/rel-notes-apr24-app-proxy-logs.png" 
url="/images/whats-new/apr24/rel-notes-apr24-app-proxy-logs.png" 
alt="Global Search & Navigation: app-proxy logs" 
caption="Global Search & Navigation: app-proxy logs" 
max-width="60%" 
%}

#### General: Custom auto-sync intervals for SSO

Previously, integration with different SSO providers allowed automatic user and team synchronization with Codefresh at fixed hourly intervals.

With our latest update, you can now customize the auto-sync intervals to better suit your organization’s needs.  
The new options allow you to set the sync frequency in minutes or hours. Alternatively, you can enable auto-sync without defining a specific interval, and Codefresh will automatically perform the sync every 12 hours. 

This flexibility ensures more timely updates and improved efficiency in user and team management.

For details, see [Syncing teams in IdPs with Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/team-sync/#syncing-teams-in-idps-with-codefresh).



#### Pipelines: Explore build relationships with Build Tree
Introducing Build Tree for easy rendering of relationships between pipeline builds!
Seamlessly visualize complex parent-child-sibling relationships within the context of your selected build, simplifying pipeline monitoring and management.

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/apr24/rel-notes-apr24-build-tree-view.png" 
url="/images/whats-new/apr24/rel-notes-apr24-build-tree-view.png" 
alt="Pipeline builds: Build Tree view" 
caption="Pipeline builds: Build Tree view" 
max-width="60%" 
%}


In addition to the effortless visualization, other key benefits include:
* The selected build as an anchor reference point to linked builds, indicated by the **Current** tag assigned to it.
* Updated status for every build, with failed steps listed for quick alerting.
* Quick access to essential actions without navigating away from the Build Tree, through the build’s context menu.
* Single-click access to the individual build view for detailed insights.

For details, see [Visualize build relationships for pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#visualize-build-relationships-for-pipeline).


#### Pipelines: More Pull Request events support for GitHub
Our integration with GitHub events is now even stronger with the addition of more types of pull request (PR) event triggers.

You can now trigger builds for the following PR events:
* Pull request review approved
* Pull request review changes requested
* Pull request review commented

{% include
  image.html
  lightbox="true"
  file="/images/whats-new/apr24/rel-notes-apr24-github-pr-events.png"
  url="/images/whats-new/apr24/rel-notes-apr24-github-pr-events.png"
  alt="New pull request events for GitHub in Codefresh"
  caption="New pull request events for GitHub in Codefresh"
  max-width="60%"
%}

For details, see [Git triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/).

#### Pipelines: Gerrit topic variable mapping  

We have introduced a new system variable: `CF_GERRIT_CHANGE_TOPIC`. This variable maps directly to Gerrit’s `topic` variable, which groups related changes together in Gerrit, for better organization and management.

With `CF_GERRIT_CHANGE_TOPIC` in Codefresh pipelines, based on the topic’s context, you can:
* Dynamically manage and execute steps .
* Conditionally trigger specific actions or entire pipelines.

For details, see [System variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/#system-variables).

#### Pipelines: Automatic account switching for pipeline builds

Another usability enhancement for a seamless experience when navigating between accounts.  

When accessing pipeline builds from an account different to the one you're logged into, Codefresh automatically switches you to the correct account. This means no more prompts and having to manually select the account.

To support this enhancement, you need to enable the `autoBuildSwitchAccount` Feature Flag.



#### GitOps: GitOps Runtimes as Configuration Runtimes
We added new functionality for GitOps Runtimes. Starting with Runtime v0.1.49, you can now designate a Hosted or any Hybrid GitOps Runtime as a Configuration Runtime.
Configuration Runtimes handle platform-level resources that are runtime-agnostic, such as those for GitOps Products.

{% include
  image.html
  lightbox="true"
  file="/images/whats-new/june24/rel-notes-june-24-set-as-config-runtime.png"
  url="/images/whats-new/june24/rel-notes-june-24-set-as-config-runtime.png"
  alt="Set GitOps Runtime as Configuration Runtime"
  caption="Set GitOps Runtime as Configuration Runtime"
  max-width="60%"
%}


Key features to note:
* Redundancy  
  Designate single or multiple GitOps Runtimes as Configuration Runtimes. Codefresh ensures that resources are not duplicated even when there are multiple Configuration Runtimes.
* Ease of use  
  Set and unset a Configuration Runtime with just a click in the UI or a quick edit in your `values.yaml` file.

For details, see [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/).

#### GitOps: Rollout enhancements 

* **Templated arguments in AnalysisTemplates**  
Codefresh now supports templated arguments declared in AnalysisTemplates for metric configurations in AnalysisRuns. 

* **Rollout Player**  
To make Rollouts easier to manage, we added the Abort and Retry buttons to the Rollout Player. These options were previously available for the Rollout resource only in the Current State tab.

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may24/rel-notes-may24-rollout-player.png" 
url="/images/whats-new/may24/rel-notes-may24-rollout-player.png" 
alt="Abort & Retry in Rollout Player" 
caption="Abort & Retry in Rollout Player" 
max-width="50%" 
%}

For details, see [Manage rollouts for Argo CD application deployments]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manage-rollouts-for-argo-cd-application-deployments).




#### Usability enhancements



##### Pipelines: Project name in breadcrumbs in Builds page
In the Builds page, on selecting a build, the breadcrumbs path displays also the project name.

{% include
  image.html
  lightbox="true"
  file="/images/whats-new/june24/rel-notes-jun24-project-name-in-builds.png"
  url="/images/whats-new/june24/rel-notes-jun24-project-name-in-builds.png"
  alt="Builds page: Project name in breadcrumbs"
  caption="Builds page: Project name in breadcrumbs"
  max-width="60%"
%}


##### GitOps: Breadcrumbs
We have improved the implementation of breadcrumbs for a smoother navigation experience.

**Entity names in lowercase**  
Within the breadcrumbs path, entity names are now consistently displayed in lowercase.

**Sibling display and navigation**    
The end of the path now shows all sibling items if available.  
Clicking the dropdown displays all siblings, and clicking an item navigates directly to it.

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may24/rel-notes-may24-breadcrumbs-siblings.png" 
url="/images/whats-new/may24/rel-notes-may24-breadcrumbs-siblings.png" 
alt="Viewing and navigating to siblings in breadcrumbs" 
caption="Viewing and navigating to siblings in breadcrumbs" 
max-width="40%" 
%}

**Clean selection for copy**  
Clicking any item in the breadcrumb path now selects only that specific item, not the entire path, and also copies that item.  



##### GitOps: Shared Configuration Repo in Organization Information
As a usability enhancement, we have made it easier to locate the Shared Configuration Repository used by GitOps Runtimes. 

You can now find the link to your Shared Configuration Repository directly in the Organization Information page.

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may24/rel-notes-may24-shared-config-repo-org-page.png" 
url="/images/whats-new/may24/rel-notes-may24-shared-config-repo-org-page.png" 
alt="Link to Shared Configuration Repository in Organization Information" 
caption="Link to Shared Configuration Repository in Organization Information" 
max-width="50%" 
%}



### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.

##### New Feature Flags in v2.4
The table below describes the _new_ Feature Flags in the Codefresh On-Premises release v2.4.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description  | Default Value |
| -----------        | --------------| ------------- |
| `abacUIEnforcement`        | When enabled, for Pipelines, prevents the user from selecting options and performing actions which are not permitted.| FALSE  |
| `abacV2UIEnforcement`        | When enabled, for GitOps, prevents the user from selecting options and performing actions which are not permitted.| FALSE  |
| `abacRuntimeEnvironments`    | When enabled, allows creating rules in **Permissions** which impacts options in <b>Pipeline > Settings > Build Runtime</b>: {::nomarkdown}<ul><li><b>Build Runtime Environment</b>: When enabled, allows restricting Runtime Environments available for pipelines based on tags. Restricted Runtime Environments are disabled in the Runtime Environments list for the pipeline/build run.</li><li><b>Pipeline</b> actions:<ul><li><b>Manage resources</b>: Select CPU, memory, and minimum disk space for the pipeline/build run.</li><li><b>Set runtime environment</b>: Select a Runtime Environment from those available in the Runtime Environments list for the pipeline/build run.</li><li><b>Set cloud builds</b>: Set Cloud build and select the resource size for the pipeline/build run.</li></ul></li></ul> {:/}| FALSE  |
| `autoBuildSwitchAccount`  | When enabled, and a user accesses a build from a different account, automatically switches to the corresponding account instead of the user having to do so manually.<br>See [Pipelines: Automatic account switching for pipeline builds](#pipelines-automatic-account-switching-for-pipeline-builds) in this article. | FALSE         |
| `delightedSurvey`            | When enabled (the default), displays Delighted CX surveys in the Codefresh UI.<br>If there are security concerns because of outbound requests from clients, disable this Feature Flag.  | TRUE|
| `fullstory`                   | When enabled, allows Codefresh to track user activity in the Codefresh UI through FullStory.<br>**NOTE**: When enabled for air-gapped environments, client attempts to communicate with a Fullstory service may result in network errors.| FALSE  |
| `gitopsDynamicBreadcrumbs`     | When enabled (the default), supports rendering dynamic breadcrumbs for GitOps.<br>See [GitOps breadcrumbs](#gitops-breadcrumbs) in this article.  | TRUE         |
| `piplineCreditConsumption` | When enabled (the default), supports credit-consumption analytics for pipelines. | TRUE         |
| `productCRD`  | _New feature currently in development for GitOps._<br>When enabled, allows creating a Custom Resource Definition (CRD) for the Product entity in GitOps.  | FALSE         |
| `promotionOrchestration` | _New feature currently in development for GitOps._<br>When enabled, allows promotion orchestration for products including product's releases API and promotion flow API.  | FALSE    |
| `reportBuildStatusPerPipelineTriggerEvent`     | Currently supported for Bitbucket cloud.<br>When enabled, for builds with the same `pipelineId`, reports build statuses separately per `triggerId` and trigger event. | FALSE         |
| `rolloutPlayerLiveState` | When enabled (the default), updates Rollout events directly from AppProxy for faster response times. | TRUE         |
| `serviceAccounts` | _Currently in development._ <br>When enabled, allows Codefresh administrators to create shared Service Accounts not associated with specific users for centralized access and permissions management. | FALSE         |



##### Updated Feature Flags in v2.4
The table below lists existing Feature Flags which have been updated by default to be either enabled (set to _TRUE_), or disabled (set to _FALSE_).

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `buildsTreeView`  | _This feature is now available for on-premises environments._ <br>When enabled (the default), shows a visualization of the parent and child builds of pipelines.<br>See [Explore build relationships with Build Tree](#pipelines-explore-build-relationships-with-build-tree) in this article. | _TRUE_         |

### Bug fixes


##### Pipelines
* “Unknown error” failure on cloning a pipeline that includes a trigger. 
* "Codefresh is unable to reach your Kubernetes cluster, please check if there is a connection issue” error when selecting **Account settings > Pipeline integrations > Kubernetes**.
* Debug mode fails to execute or hangs with engine version 1.169.1 and higher.
* Upgrade to on-premises v2.3.2 causes out-of-disk issue for RabbitM because of dangling queues with no consumers. 
* `error URL using bad/illegal format or missing URL` for `git-commit` steps when password includes special characters.
* Some repositories not displayed in **Repository** list when creating trigger for Bitbucket server. 
* Azure repos with **YAML from repository settings** throws `TimeoutError: Connection to server has timed out` error during trigger creation when listing repositories.
* Builds for Gerrit in Codefresh triggered twice. 
* Metrics tab for pipeline build displays CPU utilization incorrectly as 100% instead of the actual usage. 
* When defining triggers, search in Select Branch does not display branch names including slashes. 
* Long loading time for Git repos when creating new pipelines and triggers.
* For Bitbucket, reported statuses of two builds triggered for the same commit override each other.
* For Bitbucket, build fails as `CF_PULL_REQUEST_ACTION` variable is not populated with correct value. 
* Constant restarts pf `pipeline-manager` pods during marketplace step executions for v2.2 and higher.
* Queue-time metric reported to Datadog from Codefresh includes the duration of pending-approval steps. 
* Build failure for pipeline including mixture of regular and `buildx` parallel build steps.
* Changing LOGGER_LEVEL variable does not impact verbosity of engine logs. 
* For Gerrit, username of build initiator not displayed.
* Usability issues when selecting clone pipeline option from UI. 
* Upgrade to on-premises v2.3.2 causes out-of-disk issue for RabbitM because of dangling queues with no consumers. 


##### GitOps
<!--- * GitOps UI does not show logs for pods. Victor Plakyda to check -->
* New Argo CD application deployed in Codefresh remains as Out of Sync in **GitOps Apps > Current State**.
* Delay for new Argo CD applications to appear in Codefresh GitOps Apps dashboard. 
* Deleting a managed cluster from a GitOps Runtime results in an empty list of clusters for the same Runtime. 
* GitOps Apps dashboard > Applications tab displays `Unknown` status for Argo CD applications. 
* Truncated Kubernetes **Label** names in the GitOps Apps dashboard when selecting **More filters**.  
* Results for Analysis metrics not displayed in Rollout when using arguments from AnalysisTemplates. 
* Multi-container pods display `a container name must be specified for pod....` message without option to select a specific container.





## On-premises version 2.3

### Features & enhancements
Here are the features and enhancements included in Codefresh On-Premises v2.3.

#### Install/upgrade to v2.3
Welcome to our newest on-premises release!

**Installing v2.3**
For detailed instructions on installing v2.3, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.

**Upgrading to v2.3**
In this release, we changed the default registry for Codefresh _private_ images from Google Container Registry (GCR) `gcr.io` to Google Artifact Registry (GAR) `us-docker.pkg.dev`.  
If you are upgrading to v2.3, you will need to update `.Values.imageCredentials.registry` to `us-docker.pkg.dev`. 

For details, see [Upgrade to 2.3.0 in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-3-0){:target="\_blank"}.


#### Pipelines: New `strict_fail_fast` to control pipelines
You’re probably familiar with the `fail_fast` flag available for steps in Codefresh pipelines. The flag determines the pipeline’s behavior when there is a step failure. Accordingly, when set to `false`, the pipeline continues execution and returns a Build status of `Build completed successfully`.  

But what if you want to indicate that a step failed in the Build status even when the pipeline completes execution? Enter our new `strict_fail_fast` flag!  
Now, you can indicate that the step failed execution by simply adding `strict_fail_fast` to the step and setting it to `true`. After the pipeline completes execution, the Build status is designated as Failed.

```yaml
step_name:
  type: git-clone
  title: Step Title
  description: Step description
  ...
  credentials:
    ...
  fail_fast: false
  strict_fail_fast: true
  when:
    branch:
      ignore: [ develop ]
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
  retry:
    ...  
  ...
```
For details, check out the **Fields** table in the documentation for the different step types, as in the [`git-clone` step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) for example. 

#### Pipelines: Empty variables 
We are happy to announce a highly-requested feature: the ability to use _empty variables_ in Codefresh pipelines.  
Now, you can add variables without any values to entities in Codefresh, whether it's a project, pipeline, or trigger. The enhancement unlocks a myriad of possibilities that were previously unavailable. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-empty-variables.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-empty-variables.png" 
	alt="Empty variables in a Codefresh project" 
	caption="Empty variables in a Codefresh project"
  max-width="40%" 
%}


Remember that encryption is not supported for empty variables. The priority for variable overrides remains unchanged. 

For details, see [User-defined variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/#user-defined-variables).

#### Pipelines: Share build run settings
Our newest enhancement to pipeline builds is designed to increase collaboration and productivity! How? Instead of redefining build settings manually, you can effortlessly share pipeline build settings with colleagues who have access to the same account.

**How does it work?**  
By sharing build settings, you enable colleagues to pre-populate build configurations without the need for redundant manual input. This feature is useful for various scenarios, whether it's for testing automation integration with third-party tools or triggering pipelines in specific situations.

**Customizing build settings**  
You can override any existing setting - simulate a different trigger, select a different branch, modify existing or add new build variables, and even modify the build behavior.

With a click of the **Share build settings** button, Codefresh generates a unique URL. The URL includes modified and new settings as query parameters. Encrypted variables are excluded to ensure data protection. 

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-share-run-configuration.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-share-run-configuration.png" 
	alt="Share build settings" 
	caption="Share build settings"
  max-width="40%" 
%}

For details, see [Share build run settings]({{site.baseurl}}/docs/pipelines/run-pipeline/#share-build-run-settings).

#### Pipelines: Restart from failed step 
At Codefresh, we highly value your feedback and are committed to continually enhancing your experience. In response to your feedback, we introduced the ability to configure the default restart behavior for failed steps in a pipeline at the account level. 

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-restart-failed-step.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-restart-failed-step.png" 
	alt="Restart from failed step in Pipeline Settings" 
	caption="Restart from failed step in Pipeline Settings"
  max-width="50%" 
%}

When enabled (the default), the user can restart the pipeline directly from the failed step. Otherwise, users can only restart the pipeline from the beginning.  
By default, individual pipelines are configured to inherit the account setting.  
Note that this does not impact existing pipelines.

Being able to configure the restart behavior for failed steps centrally simplifies management and ensures consistency across pipelines, without the need for individual adjustments.   
Imagine a scenario where you’re onboarding a large team of developers. You can disable failed-step restart for the account, and have the pipelines use the account-level setting, saving valuable time and promoting a consistent experience.  

You can always change the behavior at any time based on evolving requirements. And users have the flexibility to override the account-level behavior for individual pipelines based on specific needs.

For details, see [Restarting from failed steps]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#restarting-from-failed-steps).



#### Pipelines: Explicit versions for typed steps
As you're aware, Codefresh is continually enhancing our typed step library in the Marketplace.

When typed steps in pipelines lack a specified version, Codefresh automatically associates them with the latest version of the step. To avoid potential issues with breaking changes in typed steps, we now provide a warning if there are steps in your pipelines without an explicit version number.

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-typed-step-warning.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-typed-step-warning.png" 
	alt="Warning for typed steps without version numbers" 
	caption="Warning for typed steps without version numbers"
  max-width="60%" 
%}

For details, see [Versioning for typed steps]({{site.baseurl}}/docs/pipelines/steps/#versioning-for-typed-steps).

#### Pipelines: Blobless Git clone

Here's an enhancement which contributes to workflow optimization -  a new field in our `git_clone` step: the `exclude_blob` field.
Filter out blob files from the Git repository and further streamline your development process. Fewer unnecessary files to clone and faster cloning times!  

For blobless cloning, simply set `exclude_blob` to `true`. To always include blob files, you can retain the default value of `false`.

For details, see [Fields in git-clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/#fields).

#### Pipelines: Add tags during pipeline creation
With this update, you can effortlessly add tags when you create a pipeline, further streamlining the pipeline creation process. Add tags as you usually do, and they are instantly available in both the General Settings and the Permissions panel.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-tags-in-create-pipeline.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-tags-in-create-pipeline.png" 
	alt="Add tags when creating pipeline" 
	caption="Add tags when creating pipeline"
  max-width="40%" 
%}


#### GitOps: Diff View for out-of-sync applications
We’re thrilled to introduce a significant enhancement simplifying troubleshooting Argo CD applications within Codefresh.
With our new Diff View feature, you can instantly view the differences between the current and the desired states of out-of-sync applications.
The Diff View option displays all the updated resources within the application, allowing you to easily pinpoint changes and swiftly identify the root cause of the sync failure.

If you have selected an application, the Diff View option is available in the context menu at the top right of the page. The option is enabled whenever the application is out-of-sync. 

>**NOTE**  
Diff View for application resources is supported from Runtime v1.0.38 and higher. <!--- To enable this feature, you need to turn on the `appDiffView` feature flag.  -->

For details, see [Analyze out-of-sync applications with Diff View]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#analyze-out-of-sync-applications-in-diff-view).



#### GitOps: Tailored sync timeouts for Argo CD applications

Tailor the timeout thresholds for sync operations for different applications, and receive instant alerts when the sync duration exceeds the threshold defined.  
Instead of waiting indefinitely for syncs to complete and then navigating through the GitOps Apps dashboard, Codefresh provides you with timely warnings to proactively investigate and resolve sync issues.

Just include an annotation in the application's YAML, and either retain the default timeout of 30 minutes (also Argo CD's default for sync operations), or change it as needed.  
Codefresh will display a warning in the **Warnings/Errors** panel for the app when the sync operation exceeds the timeout.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-sync-timeout.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-sync-timeout.png" 
	alt="Sync timeout warning for Argo CD applications" 
	caption="Sync timeout warning for Argo CD applications"
  max-width="60%" 
%}

For details, see [Configure sync-timeout for Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#configure-sync-timeout-for-argo-cd-applications).

#### GitOps: Argo CD application enhancements

We introduced a couple of usability enhancements for Argo CD applications in Codefresh.  

##### Deployment record for Current Release
To more accurately represent the live deployment status of the selected application in the Timeline tab, we now clearly differentiate between current and historical deployments.

The Current Release is prominently displayed as a dedicated deployment record at the top of the Timelines tab, tagged as the Current Version. It is followed by the list of Previous Releases. 

{% include
image.html
lightbox="true"
file="/images/whats-new/feb24/rel-notes-feb24-current-release-record.png"
url="/images/whats-new/feb24/rel-notes-feb24-current-release-record.png"
alt="Current Release deployment record in Timeline tab"
caption="Current Release deployment record in Timeline tab"
max-width="70%"
%}

* To prevent confusion with duplicate statuses, the application's health and sync statuses are now exclusively displayed and tracked within the Application Header. 

* To validate that the current release as the live state, the release revision in the deployment record mirrors the sync revision displayed in Last Sync Result. 

For details, see [Monitoring deployments for selected Argo CD application]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#monitoring-deployments-for-selected-argo-cd-application).

##### Quick links
The Configuration tab displays handy links to the application's GitOps Runtime, Git Source, and YAML manifest in the Git repo.

{% include
image.html
lightbox="true"
file="/images/whats-new/feb24/rel-notes-feb24-apps-quick-links.png"
url="/images/whats-new/feb24/rel-notes-feb24-apps-quick-links.png"
alt="Quick links for application in Configuration tab"
caption="Quick links for application in Configuration tab"
max-width="70%"
%}


#### GitOps: View/download logs for GitOps Runtime components
We are glad to announce that you can now view and download logs for individual GitOps Runtime components!
Previously available for legacy CLI Runtimes, this functionality is now back for Helm GitOps Runtimes, with online viewing in our smart terminal and offline downloads as you need.

As a reminder, here's where you can find the **View logs** option:

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-runtime-component-log.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-runtime-component-log.png" 
	alt="View logs for GitOps Runtime components" 
	caption="View logs for GitOps Runtime components"
  max-width="70%" 
%}

For details, see [View/download logs for GitOps Runtime components]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#viewdownload-logs-for-runtime-components).


#### GitOps: Argo Events upgrade
We've recently upgraded Argo Events to its latest version, v1.9.0, ensuring you can leverage all enhancements. For detailed information about the changes in this version, please refer to the [Argo documentation](https://github.com/argoproj/argo-events/releases){:target="\_blank"}.

Please be aware that this upgrade may introduce a potential breaking change for existing event sources that have defined `githubBaseUrl` without defining `githubUploadURL` which is required. In such cases, event sources will fail to sync, and the Git Source application will return a `..githubUploadURL is required when githubBaseURL is set` error.

To address this, you'll need to edit the event source YAMLs and add `githubUploadURL` where required.

#### GitOps: Deprecation of GitOps CLI for Runtime installation

As we have transitioned to Helm-based Runtimes for GitOps, we have permanently deprecated the CLI-based installation for GitOps Runtimes.

### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.

##### New Feature Flags in v2.3
The table below describes the _new_ Feature Flags in the Codefresh On-Premises release v2.3.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `buildsTreeView`   | _New feature currently in development._<br>When enabled, shows a visualization of the parent and child builds of pipelines.<br>   | FALSE  |
| `gitopsRuntimeObservability` | _New feature currently in development._ <br>When enabled, displays metrics for GitOps Runtimes in dashboards. | FALSE  |
| `headerLiveState`   | When enabled (the default), in Codefresh GitOps, updates Health and Sync statuses in the Application Header from Argo CD instead of Argo Events.  | TRUE  |
| `preFillBuildVariablesFromURL`   | When enabled (the default), allows sharing pipeline build settings through the **Share build settings** button.<br> See [Pipelines: Share build run settings](#pipelines-share-build-run-settings) in this article.   | TRUE  |
| `promotionFlowsManagement`   | _New feature currently in development._<br>When enabled, allows users to create and execute Promotion Lifecycles in Codefresh.  | FALSE  |
| `productReleasesPage`        | _New feature currently in development._<br>When enabled, displays the Releases tab in the GitOps Products dashboard. | FALSE  |
| `promotionPolicies`   | _New feature currently in development._<br>When enabled, shows the Promotion Policies option in the sidebar. Clicking this displays the Promotion Policy page where you can create and view Promotion Policies.  | FALSE  |
| `helmHostedRuntime`   |_This feature is not relevant for on-premises environments._ <br>When enabled, installs the Hosted GitOps Runtime using the GitOps Runtime's Helm chart.  | FALSE  |



##### Updated Feature Flags in v2.3
The table below lists existing Feature Flags which have been updated by default to be either enabled (set to _TRUE_), or disabled (set to _FALSE_).

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `appDiffView`  | _This feature is now available for on-premises environments._ <br>When enabled, and the application is out of sync, displays the differences for each resource in the application in either Compact or Split view modes.  | _TRUE_         |


### Bug fixes

##### General 
* GitOps features not loaded on accessing Account Settings from the Admin Management panel with both GitOps and Pipeline modules.
* ABAC (Attribute-based access control) rules in GO not correctly resolved when multiple rules are configured for the same user. 

##### Pipelines  
* Unable to deploy Helm charts to Helm boards after upgrade to v2.2.4 
* For Bitbucket Cloud, `codefresh-report-image` step fails with errors to get Pull Requests (PRs) and branches. 
* Builds for Gerrit in Codefresh are triggered twice because of webhook data delivery request timeouts or connection issues.
* Replaced misleading warning message "The security token included in the request is invalid" for successful builds. 
* Cloning a pipeline in UI fails with “Unknown error” when triggered from UI. 
* `build-manager` microservice causing increased number of MongoDB connections.

##### GitOps 
* Renaming an ApplicationSet or GitSource removes all application's resources and then adds them again.  
* Unable to delete clusters in the Codefresh UI. 
* Codefresh UI unresponsive when clicking Warnings/Errors button in the **GitOps Apps** dashboard.
* `Failed to create binary image error` from Image reporter for images exceeding 2GB.
* Audit log missing manual actions executed in Rollouts Player.
* Delay for new Argo CD applications to appear in Codefresh GitOps Apps dashboard. 
* Error on enabling Argo CD notifications in Helm chart `values.yaml` for Codefresh GitOps Runtime v0.4.2. 
* For GitLab Actions, `codefresh-image-reporter` log displays actual values of encrypted secrets.
* Codefresh UI not in sync with native Argo CD UI. 
* When adding a Git Source and manually defining the branch, metacharacters are not encoded as HTML in the YAML. 
* Empty page on clicking **View Native Workflow** for the selected workflow in the Workflows tab.

## On-premises version 2.2


### Features & enhancements
Features and enhancements are divided into those in general availability and those currently in Beta.
<br>

#### Install/upgrade to v2.2
Welcome to our newest on-premises release!

**Installing v2.2**
For detailed instructions on installing v2.2, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.

**Upgrading to v2.2**
Before initiating the upgrade process, review the instructions [here](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-2-0){:target="\_blank"}.

<br>

#### Pipelines: Enhanced RBAC with AND logic for tags

We are excited to introduce a powerful enhancement to Codefresh pipelines: AND logic for rules in RBAC permissions. Now, you have even more control and precision when it comes to managing permissions for entities.

Up until this point, we've been all about OR logic, allowing you to define rules with a choice of **Any of these** tags. But we recognize that you need to be more specific in certain scenarios, and that's where AND logic comes into play.
With AND logic, you can require **All of these** tags to be present, providing a level of granularity to tighten security and ensure that only the right teams have access to entities.

{% include
image.html
lightbox="true"
file="/images/whats-new/sep23/rel-notes-sep23-classic-and-policies.png"
url="/images/whats-new/sep23/rel-notes-sep23-classic-and-policies.png"
alt="Rules with OR/AND logic for tags"
caption="Rules with OR/AND logic for tags"
max-width="40%"
%}

For details, see [ABAC for entities with tags and rules]({{site.baseurl}}/docs/administration/account-user-management/access-control/#abac-for-entities-with-tags-and-rules).

<br>

#### Pipelines: New `timeout` functionality for pipeline steps
We are happy to announce a new field for pipeline steps, the `timeout` flag to further enhance control over your pipelines!
The `timeout` flag, when assigned to a step, prevents that step from running beyond a specific duration if so required.

Add the `timeout` flag with the `<duration>` and `<units>` to any of these step types: `git-clone`, `freestyle`, `build`, `push`, `composition`, `pending-approval`.

**How it works**
* Steps that exceed the timeout limit are automatically terminated. If the steps are completed before the timeout limits are exceeded, the timeout values are ignored.
* Steps terminated through timeouts have the same behavior as failed steps. If you notice any inconsistencies, please report them as bugs.
* In parallel steps, by default, the timeout defined for the parent is inherited by child steps.

**Example**

```yaml
version: '1.0'
steps:
  parallel:
    type: parallel
    timeout: 1m
    steps:
      first:
        image: alpine
      second:
        image: alpine
        timeout: 2m
      third:
        image: alpine
        timeout: null
```
For details, see [Git-clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) and [Add timeouts for parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/#add-timeouts-for-parallel-steps).

<br>

#### Pipelines: Share log URLs for pipeline builds with timestamps
Our latest enhancement simplifies troubleshooting and resolution process for issues in pipeline builds! How? By introducing the ability to share the URL of the build log with your team!

By selecting the part of the build log you want your team to look at for a specific step or for the entire build: a single row, a specific segment, or whatever you need, and clicking **Share**, you get a unique URL.
When colleagues, logged in to the same account, access the shared URL link, the build log opens directly to the highlighted section for easy identification.

{% include
image.html
lightbox="true"
file="/images/whats-new/nov23/rel-notes-nov-23-share-logs-select-lines.png"
url="/images/whats-new/nov23/rel-notes-nov-23-share-logs-select-lines.png"
alt="Sharing URL for build logs"
caption="Sharing URL for build logs"
max-width="50%"
%}

<!-- **Please note**
Sharing build log URLs requires timestamps in the logs. Codefresh will enable timestamps for all accounts, which can affect automation you may have created based on log output formats without timestamps. To opt out, please contact Codefresh Support.
This functionality will be available for all customers starting December 14.  -->

For details, see [Sharing log URLs for pipeline builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#sharing-log-urls-for-pipeline-builds).

<br>

#### Pipelines: Custom audiences for OIDC
You’ll be happy with our latest enhancement for OIDC in Codefresh pipelines. Now, our OIDC integration supports multiple audiences. This flexibility is crucial for working with audiences that require distinct names instead of defaulting to the platform’s hostname, such as the Codefresh platform URL.

**Customize your audience**
In the `obtain-oidc-id-token` step, tailor your audience by defining custom values — either a single value or multiple values separated by commas.

Here’s an example of a single custom audience:

```yaml
obtain_id_token:
  title: Obtain ID Token
  type: obtain-oidc-id-token:1.2.1
  arguments:
    AUDIENCE: "cosign"
```

For details, see [Standard OIDC claims]({{site.baseurl}}/docs/integrations/oidc-pipelines/#standard-oidc-claims).

<br>

#### Other changes
**Pipelines**
* Helm steps now support Helm releases 3.9.0 and higher.
* Glob expressions support up to 65k characters.
* Bitbucket and Azure Devops: Supported events include Pull Request (PR) commit events.
* Higher throttle time ensures that delayed builds for pipelines do not affect performance.
* Accurate memory metrics for pipeline builds that use `buildx` and `docker driver`.

**GitOps**
* Restored option to download logs for GitOps Runtimes from the Codefresh UI.
* Fast loading for Current State tab in the GitOps Apps dashboard for Argo CD applications with hundreds of resources.




### Feature Flags
Feature Flags are divided into new Feature Flags released in the current version, and changes to existing Feature Flags which are now enabled by default.

**New Feature Flags in v2.2**
The table below describes the _new_ Feature Flags in the Codefresh On-Premises release v2.2.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `abacAndRule`       | When enabled, supports creating ABAC rules for entities in Codefresh pipelines using "AND". <br>See [Pipelines: Enhanced RBAC with AND logic for tags](#pipelines-enhanced-rbac-with-and-logic-for-tags) in this article.| TRUE  |
| `appDiffView`       | _This feature is currently in Beta, and the Feature Flag can be enabled only for SaaS environments. We will notify you when you can enable the Feature Flag for on-premises environments._ <br>When enabled, and the application is out of sync, displays the differences for each resource in the application in either Compact or Split view modes.| FALSE  |
|`csdpFilterAppsByGitPermissions`      | When enabled (the default), does not display the Git Sources and the Argo CD applications committed to these Git Sources for users without Git permissions or Git credentials for the same.   | TRUE         |
| `genAICronExpression`       | When enabled, supports generating Cron expressions in the Codefresh UI using Generative AI.| FALSE  |
| `hideCompositionsMenuItem`     | When enabled, does not show Compositions within Artifacts & Insights in the sidebar of the Codefresh UI. | FALSE         |
| `promotionFlow` | New feature currently in development.<br>When enabled, allows you to drag an application in the GitOps Product dashboard from its current Environment to a different Environment and trigger a promotion flow. | FALSE         |
| `promotionWorkflows` | _New feature currently in development._<br>When enabled, allows you create and run workflows when a promotion is triggered. | FALSE         |
| `restrictedGitSource` | _This feature is currently in Beta, and the Feature Flag can be enabled only for SaaS environments. We will notify you when you can enable the Feature Flag for on-premises environments._<br>  When enabled, allows you to create a Restricted Git Source in addition to a standard Git Source. | FALSE         |
| `stepTimeout`  | When enabled (the default), allows you to add the `timeout` flag with the `<duration>` and `<units>` to steps in pipelines. When added, the step terminates execution automatically if the step exceeds the duration of the specified timeout.<br> See [Pipelines: New timeout functionality for pipeline steps](#pipelines-new-timeout-functionality-for-pipeline-steps) in this article.  | TRUE         |
| `useRepoAndBranchesNextPagination`         | When enabled, the **Repository** dropdown to select branches and repositories for Triggers, supports infinite scrolling, and search on the server.  | FALSE         |



**Updated Feature Flags in v2.2**
The table below lists existing Feature Flags which have been updated by default to be either enabled (set to _TRUE_), or disabled (set to _FALSE_).

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `accountInfoCopyButton`  | When enabled, the account ID is added to the URL. When sharing the URL with the account information, recipients can seamlessly switch accounts.   | _FALSE_         |
|`cronTriggersInPipelineSpec`	| When enabled, allows users to define Cron triggers in the pipeline YAMLs as a `spec.cronTriggers` array, instead of using a separate API. <br>See [Cron trigger specifications in pipelines]({{site.baseurl}}/docs/integrations/codefresh-api/#cron-triggers) in our documentation.  | _TRUE_|
| `gitopsAppGroups`       | When enabled, allows users to group Argo CD applications by annotations, and view these applications in the Groups tab of the GitOps Apps dashboard. <br>See [Application Groups for Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/) in our documentation. | _TRUE_   |
| `pipelineScopes`      | When enabled, enables Codefresh administrators to configure the API scopes for pipelines at account level. All pipelines in the account inherit these scopes. Codefresh administrators can also override these scopes for individual pipelines.<br>See [Pipeline settings: Scopes]({{site.baseurl}}/docs/pipelines/pipelines/#scopes) in our documentation.     | _TRUE_         |

### Bug fixes
**General**
* Removing users from Codefresh UI, or via API or Terraform results in 504 error.
* Organizations list not sorted in alphabetical order.
* Page keeps on loading indefinitely when switching active account from a ProjectOne account to a Classic one.

**Pipelines**
* Slow loading for Builds and Workflow pages for pipelines.
* Cannot save views including Annotations as filters.
* In **Use YAML from repository** screen, selecting a new Git integration resets all custom settings, including PATH TO YAML.
* In **Use YAML from repository** screen, selecting a new Git integration without selecting a branch results in "undefined is not an object (evaluating '(0,v.first)(this.branchData.selectedItem).displayName')" error.
* Listing branches when setting up trigger or in **Use YAML from repository** results in error ‘Error: Failed to retrieve file’.
* For Azure DevOps Pull Request (PR) (push commit, push reviewers changed, votes score changed, status changed) events, the build status in Azure DevOps is not identical to the build status in Codefresh.
* Webhook for Bitbucket triggers two-three builds for a single event.
* Builds stuck in Terminating state in Codefresh UI
* Helm step does not support latest Helm versions.
* Frequent timeouts when pushing to Codefresh Helm repo via Helm step.
* Unable to upload more than 100 Allure reports from Codefresh.
* “No such file or directory” error in Test History/Trends page for Allure test reports.
* After upgrade to v2.0.9, Test reports screen does not display all elements.
* For enhanced Cron triggers, restarting a Cron build or restarting a Cron build from a failed step results in error: "There was a problem rebuilding the selected item. Please make sure that the branch <BRANCH> is accessible".
* Bitbucket builds triggered for events not defined in pipeline.
* Incorrect step-level metrics for `build` step when `buildx` is set to `true` and the `builder driver` is set to `docker-container`.
* `stepTemplate`ignores path in `WORKING_DIR` environment variable and runs in default volume path.
* Statuses in build log outputs not color-coded.
* Memory usage graph in Builds page shows **Mib** instead of **MiB**.

<br>

**GitOps**
* Rollouts panel does not display control to expand Analysis Run.
* Incorrect behavior with `ServerSideApply` for Hybrid GitOps Runtimes.
* Incomplete list of Pull Requests and Jira issues in Timeline tab of GitOps Apps dashboard when Kubernetes and deployments and Rollouts are both used in the same application.
* Unable to add managed clusters to GitOps Runtimes.
* Unable to add a non-OpenShift cluster to GitOps Runtimes.
* Creating a Git Source using Bitbucket does not load all available repos for selection.
* `codefresh-image-reporter` failure for ECR (Elastic Container Registry) images.
* Truncated names for the Labels filter when clicking **More filters** in GitOps Apps dashboard.
* Missing Git Runtime tokens in Personal Access Token page.





## On-premises version 2.1

### Features & enhancements
<br>

#### Install/upgrade to v2.1
Welcome to our new major on-premises release!

**Installing v2.1**
For detailed instructions on installing v2.1, visit [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh){:target="\_blank"}.

**Upgrading to v2.1**
This major release includes new services and updates to existing services.
Before initiating the upgrade process, review the instructions [here](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-1-0){:target="\_blank"}.

<br><br>

#### New Helm installation for Codefresh Runner
In this major version, we have completely overhauled the installation process for the Codefresh Runner.
Now, Runner installation is completely Helm-based, making it streamlined and easier to manage.

Starting with this version, Helm becomes the default installation method for the Codefresh Runner. This change has implications for the installation options from previous versions.
* CLI installation is considered legacy, and will not be actively maintained going forward
* For existing Helm installations with chart version 3.x or higher, we recommend migrating to the new chart version for the Runner

The new Helm installation for the Runner is described in [Chart Configuration](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#chart-configuration){:target="\_blank"} on ArtifactHub.

Refer also to [Codefresh Runner installation]({{site.baseurl}}/docs/installation/runner/install-codefresh-runner/) in the documentation.

<br><br>

#### Gerrit as Git provider for Pipelines and GitOps
We are excited to announce the integration of Gerrit, the open-source web-based code review tool for Git repositories, with Codefresh.

**Gerrit and Codefresh Pipelines**
By integrating Gerrit as a Git provider for Codefresh Pipelines, you can leverage its capabilities to trigger builds and tests automatically whenever a new change is pushed to Git repositories hosted in Gerrit. The integration allows you to closely monitor the status of builds and tests within the Gerrit environment itself, providing you with a comprehensive view of your development process.
With Codefresh’s `CF_PULL_REQUEST` group of environment variables, you can achieve similar functionality to Gerrit’s `Changes` directly within Codefresh.

For details, see [Pipeline integrations - Git providers]({{site.baseurl}}/docs/integrations/git-providers/#gerrit).

**Gerrit and Codefresh GitOps**
By configuring Gerrit as the primary Git provider for your Hosted GitOps Runtime, you can integrate Gerrit information into your third-party CI tools or platforms for image enrichment and reporting in Codefresh.
If you are interested in using Gerrit for Hybrid GitOps Runtimes, please contact us.

For details, see [GitOps Gerrit Git provider integration]({{site.baseurl}}/docs/gitops-integrations/gerrit-integration/).

<br><br>

#### Multi-account sync for Okta with OIDC

Check out the latest enhancements to the integration settings for Okta with OIDC: Multi-account sync and automatic deletion of users removed during sync from Codefresh.

**Multi-account sync**
Following the successful implementation of just-in-time provisioning support for Okta, we are taking it a step further by introducing multi-account sync for OIDC-Okta. This feature enables you to synchronize multiple Codefresh accounts in Okta simultaneously in Codefresh, ensuring a seamless SSO setup for enterprise customers.

With multi-account sync, you can easily select additional Codefresh accounts to sync with your Okta OIDC account in Codefresh. Codefresh validates admin privileges and access for each of the selected accounts, guaranteeing secure and reliable authentication.

You have the flexibility to sync users in multiple ways: through the UI's `Auto-group sync`, performing on-demand synchronization through the CLI, or integrating sync into a Codefresh pipeline using the CLI synchronize command.

**Delete users removed during sync**
We added an option to further streamline Okta SSO account and user management in Codefresh. You can now easily remove individual users who are deactivated in Okta from both the current account in Codefresh and any additional accounts defined in your current account.
The Users list is updated accordingly, ensuring that both the Teams and Users lists are always organized.


 {% include
image.html
lightbox="true"
file="/images/whats-new/july23/rel-notes-july23-okta-new-settings.png"
url="/images/whats-new/july23/rel-notes-july23-okta-new-settings.png"
alt="Multi-account sync and remove deactivated users for Okta OIDC"
caption="Multi-account sync and remove deactivated users for Okta OIDC"
max-width="40%"
%}

For details, see [Configure OIDC SSO settings for Okta in Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-okta/#how-to).

<br><br>

#### Codefresh & OpenShift
We are excited to announce that Codefresh now supports OpenShift! Seamlessly integrate with OpenShift for enhanced container orchestration capabilities, and discover new possibilities in your deployment workflows with Codefresh and OpenShift integration.

For details, see [Deploying Codefresh with OpenShift](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#installing-on-openshift){:target="\_blank"}.

<br><br>

#### Pipelines: OpenID Connect (OIDC) integration
Introducing OIDC (OpenID Connect) for Codefresh pipelines! Boost pipeline security and streamline access control with OIDC. Instead of referencing static credentials stored in Codefresh for the cloud provider, allow pipelines to authenticate and authorize actions through short-lived ID tokens.

Configure Codefresh as an OIDC provider with your preferred cloud provider, and let Codefresh handle ID token acquisition, and then add the actions to perform on the cloud provider in the pipeline.

Key benefits:
* Enhanced security
  You no longer need to define, store, and manage cloud-provider credentials in Codefresh.
  Obtain ID tokens from the cloud provider when needed. The ID tokens remain valid only for the duration of the workflow build and automatically expire upon completion.

* Ease of use
  Once the OIDC provider configuration is completed, obtaining the ID token is seamless.
  Our dedicated Marketplace step, the `obtain-oidc-id-token` step, when added to the pipeline, gets the ID token, without additional configuration or parameters on your part.

For details, see [OpenID Connect for Codefresh pipelines]({{site.baseurl}}/docs/integrations/oidc-pipelines/).

<br><br>

#### Pipelines: Access control for endpoints
With this feature, Codefresh admins gain enhanced control over the security of their pipelines by being able to restrict access to specific endpoint scopes.
Scopes are defined at the account level, ensuring a consistent security baseline for all pipelines. These predefined scopes are inherited by every pipeline, which Codefresh admins can override for individual pipelines when necessary.
To enable this, you need to turn on the `pipelineScopes` feature flag.

 {% include
image.html
lightbox="true"
file="/images/whats-new/aug23/rel-notes-aug23-pipeline-scopes-setting.png"
url="/images/whats-new/aug23/rel-notes-aug23-pipeline-scopes-setting.png"
alt="Configure scopes for pipeline"
caption="Configure scopes for pipeline"
max-width="50%"
%}

For details, see [Configure scopes for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#configure-pipeline-scopes).

<br><br>

#### Pipelines: Enhanced version of Cron triggers

We have extended the capabilities of Cron triggers within Codefresh pipelines for a more powerful implementation. The new functionality is available as a Beta version.

Cron triggers can now simulate Git events to enrich pipelines with repository details, include environment variables, and custom settings for caching, volume reuse, and notifications. The new settings are supported in the Codefresh UI and in the pipeline specifications.
To enable this, you need to turn on the `cronTriggersInPipelineSpec` feature flag.


{% include
image.html
lightbox="true"
file="/images/whats-new/aug23/rel-notes-aug23-cron-settings-tab.png"
url="/images/whats-new/aug23/rel-notes-aug23-cron-settings-tab.png"
alt="Extended settings for Cron triggers"
caption="Extended settings for Cron triggers"
max-width="40%"
%}

These additional settings are optional, so you can continue to use just the timer component of the Cron trigger.

Legacy versions of Cron triggers are flagged in the Codefresh UI and include an option to migrate them to the new version.

For details, see [Cron (timer)triggers]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/) and [Cron trigger specifications]({{site.baseurl}}/docs/integrations/codefresh-api/#cron-triggers).

<br><br>

#### Pipelines: Pipeline Dashboard enhancements
Review the latest enhancements in the Pipelines Dashboard.

 {% include
image.html
lightbox="true"
file="/images/whats-new/june23/rel-notes-june23-pipeline-dashboard-updates.png"
url="/images/whats-new/june23/rel-notes-june23-pipeline-dashboard-updates.png"
alt="Favorites filter and Last Update in Pipelines Dashboard"
caption="Favorites filter and Last Update in Pipelines Dashboard"
max-width="60%"
%}

**Filter by favorite pipelines**
The Pipelines Dashboard now has a Favorites filter. If you starred any projects or pipelines as favorites, you can easily view your favorite pipelines, both by projects or individual pipelines.

**Recent update indication**
The Last Update timestamp on the top right of the Pipelines Dashboard, refreshes automatically to show you the exact time the data was retrieved.

**Full path display for pipelines in filter**
Previously, in the Pipelines filter, it was challenging to identify the correct pipeline, when multiple pipelines shared the same name across different projects.
Now, when you mouse over a pipeline name in the list, the tooltip displays the full path, including the name of the project to which the pipeline belongs,
followed by the name of the pipeline.

For details, see [Pipelines Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/#pipelines-dashboard).

<br><br>

#### Pipelines: New icons for pipeline build statuses
Pipeline builds have new status icons. With distinct icons for each status, you can easily differentiate between builds, bringing clarity and saving time. Previously, both terminated and failed builds had the same icon for example, causing confusion.

Here are the icons and the build statuses they represent:
* **Running**: {::nomarkdown}<img src="../../../images/whats-new/june23/pipeline-build-running.png" display=inline-block/> {:/}
* **Completed**: {::nomarkdown}<img src="../../../images/whats-new/june23/pipeline-build-successful.png" display=inline-block/> {:/}
* **Delayed**: {::nomarkdown}<img src="../../../images/whats-new/june23/pipeline-build-delayed.png" display=inline-block/> {:/}
* **Pending approval**: {::nomarkdown}<img src="../../../images/whats-new/june23/pipeline-build-pending-approval.png" display=inline-block/> {:/}
* **Denied approval**: {::nomarkdown}<img src="../../../images/whats-new/june23/pipeline-build-denied.png" display=inline-block/> {:/}
* **Terminating**: {::nomarkdown}<img src="../../../images/whats-new/june23/pipeline-build-terminating.png" display=inline-block/> {:/}
* **Terminated**: {::nomarkdown}<img src="../../../images/whats-new/june23/pipeline-build-terminated.png" display=inline-block/> {:/}
* **Failed**: {::nomarkdown}<img src="../../../images/whats-new/june23/pipeline-build-failed-error.png" display=inline-block/> {:/}

For details, see [Viewing status for pipeline builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-status-for-pipeline-builds).

<br><br>

#### Pipelines: New terminal emulator
In this release, we have introduced a NEW terminal emulator for a superior user experience, featuring lightning-fast scrolling, online rendering for large logs, enhanced accessibility support, and more...

The new terminal emulator provides:
* Improved performance through GPU acceleration
* Convenient online viewing for log files, including large logs with up to 100,000 lines, avoiding the need to download the file
* Faster navigation with improved mouse support
* Improved search functionality
* Accessibility support with Screen Reader Mode

<br><br>

#### Pipelines: Configure limit for project’s pipelines
The `PROJECT_PIPELINES_LIMIT` variable allows to you set a limit for the number of pipelines in a project.
Capping the number of pipelines in a project prevents projects from becoming unwieldy and cluttered, and makes it easier to view the pipelines belonging to a project.
For details, see [Pipeline limit in projects](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#projects-pipelines-limit){:target=”\_blank”}.

<br><br>


#### GitOps: ABAC for Argo CD applications
In this release, we bring the power of ABAC for access control to GitOps for the first time as a Beta version. You can define fine-grained access to Argo CD application entities. Similar to ABAC for pipelines, access is controlled through the use of rules, created by defining teams, actions, and attributes.
To enable this, you need to turn on the `abacV2` feature flag.

 {% include
image.html
lightbox="true"
file="/images/whats-new/aug23/rel-notes-aug23-gitops-add-rule.png"
url="/images/whats-new/aug23/rel-notes-aug23-gitops-add-rule.png"
alt="Access control for Argo CD application entities"
caption="Access control for Argo CD application entities"
max-width="40%"
%}

For details, see [Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/).

<br><br>

#### GitOps: Application Groups in GitOps Apps dashboard

Introducing a new view in the GitOps Apps dashboard, the Group view!
The Group view for GitOps applications is a simple and efficient way to streamline application deployment monitoring within your enterprise.
To enable this, you need to turn on the `gitopsAppGroups` feature flag.

 {% include
image.html
lightbox="true"
file="/images/whats-new/aug23/rel-notes-aug23-app-group-page.png"
url="/images/whats-new/aug23/rel-notes-aug23-app-group-page.png"
alt="Application Groups in GitOps Apps dashboard"
caption="Application Groups in GitOps Apps dashboard"
max-width="40%"
%}

With App Groups, you can effortlessly focus on specific app deployments, as it consolidates deployment information for all applications within the group in the same view. This feature eliminates the need to navigate between the different applications for information on them.
Tailor groupings according to the unique requirements of your organization and applications.

Codefresh also adds the Group name as an annotation to the application manifest for easy organization and management.

For details, see [Application Groups for GitOps applications]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/).

<br><br>


#### GitOps: Customize session cookie
For GitOps app-proxy, when disabling concurrent sessions for `cf-api` through `DISABLE_CONCURRENT_SESSIONS`=`true`, the `CF_UUID_COOKIE_DOMAIN` environment variable allows you to customize the domain for the session cookie. For example, `.mydomain.com`.

For details, see [Customize session cookie](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#enable-session-cookie){:target="\_blank"}.

<!---
#### Frame options for Codefresh pages
We've introduced a new environment variable, `FRAME_OPTIONS`, which is now available for the `cf-api` and `cf-ui` services. This variable allows you to define the frame rendering behavior for Codefresh pages to enhance security and customization. You can control if the Codefresh page is rendered within frames of the same origin as the page or not. -->


### Bug fixes


**General**
* Unable to add users to Codefresh via team sync for Okta.
* Auto-sync option not available for Azure SSO.
* 404 errors on clicking documentation links in Build > Triggers.
* For Azure, auto-sync operations removes groups that were previously synced.
* Page keeps on loading indefinitely when switching active account from a ProjectOne account to a Classic one.



**Pipelines**
* Pipeline builds terminate with error message: `Pipeline could not be executed because retry attempts limit has been exceeded...`.
* Shallow clone for a specific revision with `depth` argument results in error: `pathspec 'test' did not match any file(s) known to git`.
* Pipeline resuming execution after approval shows previously executed steps as skipped in Codefresh UI.
* Cross-account ECR pull in `freestyle` step fails with `(HTTP code 500) server error...`.
* Unable to add Hybrid Runner and run builds in Version 2.0.1.
* Pipeline trigger for BitBucket server does not fire on commit.
* Creating a Git trigger for a repo name containing spaces fails with error: `Failed to create trigger...fails to match the required pattern...`.
* “Internal server error” displayed when creating a pipeline with project-level permissions though pipeline is created.
* Discrepancy in list of builds returned when running `{% raw %}GET {{baseUrl/workflow?pipeline=[pipeline-id]}}{% endraw %} ` query.
* Composition stops randomly with error: `Could not get status for container <container-name>`.
* Image enrichment with GitHub Actions fails with message: `EventSourceError: Request-URI Too Large`.
* In Pipelines dashboard (Home Dashboard), for a renamed pipeline, the Pipeline filter displays the original name instead of the new name.
* In the Pipelines page, the context-menu for the last pipeline in the list does not display all available actions.
* **Save** button remains disabled when modifying an External Resource in Pipeline > Settings.
* Unable to set `requiredAvailableStorage` programmatically for Hybrid Pipeline Runtimes.
* Commit message passed through the system variable `CF_COMMIT_MESSAGE` is truncated and does not include the full content.
* Prefix for Docker registries omitted when using a custom Docker registry as a Public Marketplace Registry.
* DinD pod does not use Service Account (SA) defined in Runner.
* After upgrade to v2.0.9, Test reports screen does not display all elements.
* Invited users prompted for phone number during sign-up.


<!---
* Slow scroll speed for build logs in online terminal view.
* Builds fail intermittently with `ESOCKETTIMEDOUT` error when pulling image for caching.
* Build step fails with "Failed to update your new image" error.
-->

**GitOps**
* **Save** button remains disabled when modifying fields for an existing Git Source.
* `DISABLED_CONCURRENT_SESSIONS` set to `true` results in `UNAUTHORIZED_ERROR token is not valid` error for graphql API call.
* Unable to create Git Sources both from the Codefesh CLI and UI with Bitbucket Server.
* Rollouts Reporter for managed cluster uses SaaS instead of on-premises URL.
* Commits to a second application in the same repository as another application, marks the Rollout for the first application as terminated in the UI when it actually continues execution.
* In the Timeline tab, on-going deployments do not display link to Rollout Player.

### Feature Flags

The table below describes the new Feature Flags in the Codefresh On-Premises release v2.1.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `abacHermesTriggers`       | When enabled, restricts access to the legacy version of Cron triggers for users without permissions to edit pipelines.| FALSE  |
| `accountInfoCopyButton`  | When enabled (the default), the account ID is added to the URL. When sharing the URL with the account information, recipients can seamlessly switch accounts.                                                     | TRUE         |
| `accessibilityContrast` | When enabled, displays an icon in the Codefresh toolbar allowing you to control the contrast by selecting the option that best suits the logged in user:{::nomarkdown}<ul><li><b>Invert colors</b> and <b>Bold colors (saturate)</b>: Optimized for visually impaired users.</li><li><b>Smart Contrast</b>: Increases the contrast between the text and the background to the maximum possible.</li></ul>{:/}| FALSE         |
| `cronTriggersInPipelineSpec`         | When enabled, allows users to define Cron triggers in the pipeline YAMLs as a `spec.cronTriggers` array, instead of using a separate API.<br>See [Pipelines: Enhanced version of Cron triggers](#pipelines-enhanced-version-of-cron-triggers) in this article.  | FALSE         |
| `disableInviteWelcomeMail`     | When enabled, does not send the Welcome email to users invited to an account.      | FALSE         |
|`gerritIntegration`      | When enabled, enables Gerrit integration in Account settings. <br>See [Gerrit as Git provider for Pipelines and GitOps](#gerrit-as-git-provider-for-pipelines-and-gitops) in this article.    | FALSE         |
|`nextGenTerminal` | When enabled, uses the new terminal emulator for improved performance, online rendering for large logs (more than 100,000 lines), search functionality, and Screen Reader support for accessibility. | FALSE|
|`supportOpenIdConnectInBuilds`| When enabled (the default), supports OIDC in pipeline builds, including obtaining and using ID tokens to authenticate and authorize pipeline actions on cloud providers.<br>See [Pipelines: OPenID Connect (OIDC) integration](#pipelines-openid-connect-oidc-integration) in this article. |TRUE|
`supportGerrit`      | When enabled, adds the capability to connect to Gerrit as a Git provider. <br>See [Gerrit as Git provider for Pipelines and GitOps](#gerrit-as-git-provider-for-pipelines-and-gitops) in this article.    | FALSE         |
| `pipelineScopes`      | When enabled, enables Codefresh administrators to configure the API scopes for pipelines at account level. All pipelines in the account inherit these scopes. Codefresh administrators can also override these scopes for individual pipelines.<br>See [Pipelines: Access control for endpoints](#pipelines-access-control-for-endpoints) in this article.    | FALSE         |
| `gitopsAppGroups`       | When enabled, allows users to group Argo CD applications by annotations, and view these applications in the Groups tab of the GitOps Apps dashboard. <br>See [GitOps: Application Groups in GitOps Apps dashboard](#gitops-application-groups-in-gitops-apps-dashboard) in this article. | FALSE   |



## On-premises version 2.0.3
Welcome to our newest On-Premises release, version 2.0.3!  This major release is finally here, and it’s packed with an array of exciting usability enhancements, new features, and improvements. We listened carefully to your feedback, and worked to incorporate your suggestions into this release.

On-premises v2.0.3 comes with the exciting addition of Codefresh GitOps! Set up and deploy applications/infrastructure using Git as the single source of truth. Read the details later in this document.


### Features & enhancements

<br>

#### Upgrading to v2.0.3
In this major release, we have deprecated the `kcfi` installer.  Codefresh on-premises is now installed with Helm.
The `config.yaml` is not compatible for Helm-based installation. To use `config.yaml` in the Helm chart, you need to remove some sections and update others.

Before running the upgrade, read the details [here](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#upgrading){:target="\_blank"}.

<br>

#### GitOps in Codefresh On-Premises
This version includes support for On-Premises GitOps, including an on-premises version of GitOps Runtimes.
With GitOps, Git repositories are the source-control systems that declaratively describe applications and infrastructure using code. The continuous integration and continuous delivery processes synchronize these changes with live environments, making sure that the production state always matches the desired state in Git.

Codefresh is the easiest way to get started with GitOps and Argo CD. Codefresh leverages Argo components to have the entire desired state applied from Git to your Kubernetes cluster, and then reported back to Codefresh.

For details, see [Codefresh for GitOps]({{site.baseurl}}/docs/getting-started/gitops-codefresh/) and [On-premises GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/on-prem-gitops-runtime-install/).

<br>

#### Enabling the new Codefresh experience
After installing/upgrading to version 2.0.3, Codefresh admins can **Enable the new Codefresh experience** through the Account Information option.

The new experience exposes new functionality such as [Universal Search and Navigation](#universal-search--navigation), and the [Pipelines Dashboard](#pipelines-dashboard).

Get up to speed with the navigation improvements in the new Codefresh experience.
See the [navigation quick reference]({{site.baseurl}}/docs/new-codefresh/menu-navigation/#classic--new-navigation) for a detailed breakdown of the navigation options. Navigations options are categorized by user options (accessed by clicking your Avatar in the toolbar), account-level administration and configuration, and features and functionality.

<br>

##### System Type in Accounts
Codefresh admins can now switch between Classic only and the unified version with both Classic and GitOps.

The **Accounts** table has a new column, System Type, that allows you to select the module for the account, as Classic or ProjectOne.

##### Settings in toolbar
We added a new **Settings** icon to the toolbar to simplify account-level management for Codefresh administrators. With the **Settings** icon always available, Codefresh admins have single-click access to account-level options and settings whenever you need.

<br>

#### Global Search & Navigation
Boost your Codefresh experience with our latest feature, Global Search & Navigation! Always available in the toolbar, Global Search & Navigation lets you get to what and where you need to in Codefresh while staying where you are.

**Search & find**
With Global Search & Navigation, you can easily monitor and find resources in your projects, pipelines, and builds, with frequently used entities organized into categories for quick search. Easily find a specific project, pipeline, or build, or browse them all.
In addition, Global Search & Navigation pulls up links to relevant information from our documentation that may be useful within your current context, making it even easier to find what you need.

**Switch accounts**
You can also switch accounts in Codefresh with Global Search & Navigation, without needing to navigate to your avatar drop-down menu. Simply search for the account, select the Switch Account action, and then choose the account you wish to switch to.
We are always adding more options, so stay tuned for announcements.

<br>

#### Pipelines Dashboard
This release introduces the much-awaited Pipelines Dashboard!  The dashboard, dedicated to pipelines and pipeline metrics, is a new experience of pipeline visibility and monitoring.
Clicking Home Dashboard located at the top of the sidebar displays the Pipelines Dashboard.
If you're currently using both GitOps and Pipelines, the Pipelines Dashboard is displayed below the GitOps and Argo Workflow dashboards.

Use the Pipelines dashboard to:
* Identify pipelines with low performance, both in terms of number of executions and execution duration
* Review the performance of a specific pipeline or project
* Compare KPIs to previous time periods to track progress
* Ensure you are meeting your SLA with your customers*

The Pipelines dashboard requires new services and databases, as listed [here](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#-new-services){:target="\_blank"}.

For details, see [Pipelines Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/#pipelines-dashboard) in the Home Dashboard.

<br>

#### Annotations for builds
We are happy to introduce two enhancements to annotations for pipeline builds! It’s now easier than ever to find the builds you’re looking for, and customize your build views.
First, you can configure an annotation as the build's display annotation, from among the available annotations. Why would you do this? When configured, the annotation is displayed for the build in the Builds page, making it easy to see which builds share common properties like target environments.
For details, see [Configure display annotation for builds]({{site.baseurl}}/docs/pipelines/annotations/#configure-annotation-to-display-for-build).

Second, you can filter builds by annotations. Filter builds by any annotation added for the build, whether it’s a display annotation or any other annotation with the Annotation filter in the Builds page.  Note that filtering builds by annotations applies only to those builds created after upgrading to v2.0.3.
For details, see [Applying filters to build views]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#applying-filters-on-the-build-view).

<br>

#### Project-based ABAC
We are excited to announce project-level Attribute-Based Access Control (ABAC) in this release.
ABAC for projects saves a lot of effort without compromising security as now you can control access to both project and to pipeline entities based on project tags.


* Project access to teams with project-tags
  Now you can decide which teams have access to which projects, and at which level. By adding tags to projects, you can define rules for different teams that can create, update, delete, and view projects.
  Also, read the next feature description, _Auto-create projects for teams_.

  **Migrating existing accounts**
   If you have existing accounts with team-based access control for projects, you can either migrate all accounts or a specific account, as described in [Project ABAC migration](https://github.com/codefresh-io/project-abac-migration){:target="\_blank"}.

* Pipeline access to teams with project-tags
  You can define access to pipelines on the basis of the projects that house the pipelines. Instead of tagging each pipeline, you can add tags to the project, and define rules that determine which teams can access the pipelines which share the project tags.
  Builds now honor the permissions of the pipelines. Users without access to the pipeline, will also not have access to its builds. This also means fewer email notifications, as these are only sent for builds that users have access to.

For details, see [ABAC for entities with tags and rules]({{site.baseurl}}/docs/administration/account-user-management/access-control/#abac-for-entities-with-tags-and-rules).

<br>

#### Auto-create projects for teams
Simplify access control and setup with `Auto-create projects for teams`. Enabled by default, this global pipeline setting automatically creates projects whenever you create teams in your account.
In addition to automatically creating a project for the team, it also automatically creates a Project rule, and a Pipeline rule for the same team, with basic permissions.

For details, see [Auto-create projects for teams]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams).

<br>

#### Selective restart for failed build steps
We added the Restart from a failed step as an option to the pipeline's Policy settings, which you can enable/disable per pipeline.
Previously, this option was available for all pipelines in the Builds page. Now, you can make it available according to the requirements of the specific pipeline. When disabled in the pipeline's settings, it is also disabled for that pipeline in the Builds page.

Why did we make this selective per pipeline?
Because restarting from a failed step is not always the answer to the problem, especially as the pipelines restarts with the same state as before.
If you have a failed Helm promotion step, and you updated the image, you would want the pipeline to use the new image. With the Restart option, the pipeline resumes execution at the same state as at the point of failure, never uses the updated image, and continues to fail.

For details, see [Policy settings for pipelines]({{site.baseurl}}/docs/pipelines/pipelines/#policies) and [Restarting pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#restarting-the-pipeline).

<br>

#### Multi-platform builds in Codefresh
Build and push Docker images, including multi-platform images in Codefresh with **BuildX**.

We extended the capabilities of our `build` step with the new `buildx` field. Leverage Docker’s support for multi-architecture/multi-platform support right here in Codefresh. Build an image once and reuse it on multiple architectures/platforms.
We also support custom `buildx` configurations with QEMU and Builder, giving you all the options you may need.

For details, see [Build step field descriptions]({{site.baseurl}}/docs/pipelines/steps/build/#fields).

<br>

#### On-demand encryption for build run variables
Manual build runs allow you to create new and modify existing variables. You can now encrypt sensitive variables on-demand, adding an extra layer of security.

For details, see [Encrypt variables for pipeline build runs]{{site.baseurl}}/docs/pipelines/variables/#encrypt-variables-for-pipeline-build-runs).

<br>

#### Mask variables in cf_export
On the subject of variables, in our latest enhancement to `cf_export` in pipelines, we added support to mask exported variables.
You can now use the `--mask` argument to mask any sensitive variables that you export. The values of these variables are replaced with asterisks in the build logs. This ensures that sensitive information is never exposed, helping to keep your builds and pipelines secure.

For details, see [Masking variables within `cf_export`]({{site.baseurl}}/docs/pipelines/variables/#masking-variables-within-cf_export).

<br>

#### Datadog integration enhancements
We enhanced our integration with Datadog to report additional information from Codefresh pipelines in Datadog.
The new information should make it even easier to monitor and analyze Codefresh pipelines in Datadog:
* For manually triggered pipelines, the name of the user who initiated the pipeline.
* The Resumed field, if the pipeline was resumed after manual approval.
* The Parameters field with user-defined variables and Git parameters.
* Error messages for pipelines with errors.

For details, see [Datadog pipeline integration]({{site.baseurl}}/docs/integrations/datadog/).

<br>

#### Custom certificates
Codefresh allows configuring custom certificates for Pipelines. You can use your own trusted SSL/TLS certificates for secure communication between Codefresh and external services.

For details, see [Configure custom TLS certificates]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem/#configure-custom-certs-for-volumes-and-containers).

<br>

#### TLS and MTLS for Redis
Codefresh On-Premises  supports both TLS (Transport Layer Security) and MTLS (Mutual TLS) for Redis.
This enhancement provides enhanced security and encryption capabilities for Redis data communication with Codefresh in on-premises environments. Administrators can customize the level of security according to their requirements.
Using TLS and MTLS for Redis communication requires additional configuration.

For details, see [Redis with TLS](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#external-redis){:target="\_blank"} and [Redis with MTLS](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#external-redis-with-mtls){:target="\_blank"}.

<br>

#### Preferred date and time format selection
US and international users can  select their preferred format for date and time in the Codefresh UI. With this latest enhancement, you can now choose between US and international date formats, as well as 24 or 12-hour time formats, to best suit your needs.

Simply navigate to **User Settings** and select your preferred format.

For details, see [Customize date and time formats]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#customize-date-and-time-formats).

<br>

#### SAML SSO Okta: auto-sync teams and auto-activate users
Just-in-time (JIT) user provisioning is becoming increasingly  important for IT administrators. The auto-sync and activate-user options when setting up SAML SSO settings for Okta are designed to achieve this without any manual intervention.
* **Auto-Sync** allows you to automatically sync users and teams provisioned in Okta with Codefresh at intervals you define.
* **Auto-Activate** creates and activates personal accounts for synced users in Codefresh, without the need to send an email invite and have the user click on the link.

Both options streamline the  SSO setup for SAML Okta in Codefresh, saving valuable time.

For details, see [Configure SSO settings for SAML Okta in Codefresh]({{site.baseurl}}/docs/single-sign-on/saml/saml-okta/#step-2-configure-sso-settings-for-codefresh-in-oktadefresh).

<br>

#### Runtime environment override for GitOps pipeline integrations
A GitOps pipeline integration uses the default runtime environment. After creating a GitOps pipeline integration, you can now override its runtime environment.
Codefresh uses the runtime environment for system actions such as Rollback.

<br>

#### New layout for Helm Boards
Helm Boards now display information in a horizontal layout. The new layout prevents fields with long names from overlapping with each other.

<br>

#### Builds view improvements
We are pleased to announce infrastructure changes that have significantly improved the responsiveness of the Builds page. You will now experience much faster response times when working with projects that have a large number of pipelines.

### Bug Fixes
* 200 error for inactive webhook triggers.
* Liveness probe failures on cf-api pods.
* Tooltip on hover over build/project names in the Builds page, shows topbar.title instead of the build/project name.
* Opening build deleted by retention policy shows pop-up for switching accounts: Build is from a different account: <account>. To view this build, you must switch accounts.
* Unable to edit Inline YAML when returning to the Workflow tab and switching from Use YAML from repository to Inline YAML.
* Modifying an encrypted variable for a manual build,  decrypts and displays the variable in plain text.
* Removing a trigger from a Git repository, also deletes the associated webhook in Git with other trigger dependencies.
* Git trigger filters allows filtering by deleted branch causing builds to fail.
* In full-screen view mode, the pipeline list panel on the left overlaps the pipeline YAML.
* Incorrect start time for builds in offline logs.
* Enabling `forbidDecrypt` Feature Flag breaks github-release step.
* UI logs not available with on-premises release version 1.3.9.
* Creating account via Terraform results in plugin error.
* Inconsistent formats for date and time across Codefresh UI.
* Modified files filter option for Git trigger events  missing  for Bitbucket Server.
* Selecting Import from text/Import from file/Add shared configuration from the context menu in Workflows tab  Variables does not open the corresponding panel.
* Overrides for pipeline-level variables during manual build run not displayed correctly in Build Variable list .
* Null namespaces result in failure to load Codefresh UI.

### Feature Flags

The table below describes the Feature Flags in the Codefresh On-Premises release v 2.0.3.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `parallelKubectlOperations`  | When enabled, allows running multiple kubectl commands in parallel steps. For example, parallel Helm install steps, or parallel deploy steps.                                                     | FALSE         |
| `gitOpsIntegrationEdit`      | When enabled, allows overriding the runtime environment of an existing GitOps pipeline integration. Codefresh uses the runtime environment for different system actions.                                | FALSE         |
| `disableActionBtnByAbac`     | When ABAC is enabled for the user and the user does not have permissions for the action, disables Create/Edit/Delete action buttons for projects and pipelines.                                          | FALSE         |
| `showBuildAnnotations`       | When enabled, allows users to:{::nomarkdown}<ul><li>Configure a display annotation for a pipeline build in the pipeline’s YAML. The build’s display annotation is then displayed in the build entry’s row (Pipelines > Builds).</li><li>Filter by any annotation assigned to builds. </li></ul>{:/}See [Annotations for builds](#annotations-for-builds) in this article.| FALSE         |
| `filterMailsByAbac `         | When enabled and ABAC permissions are defined for projects, sends email notifications on builds only for those pipelines to which the user has access. <br>See [Project-based ABAC](#project-based-abac) in this article.    | FALSE         |
| `syncClassicAnnotationsToGitOps` | When enabled, displays annotations assigned to entities in the Annotations area of the Images dashboard. The following annotation types are displayed: {::nomarkdown}<ul><li>String</li><li>Boolean</li><li>Link</li><li>Percentage</li><li>Number</li></ul>{:/}**NOTE**: This feature flag does not impact Issue and Git (PR)-based annotations. These are displayed in the Issue and Git areas.     | FALSE         |
| `gitopsArgoCdRollback`       | When enabled, allows users to rollback to a previously deployed version of an active GitOps application.                                                                                            | FALSE         |
| `commandbar`                 | When enabled, activates Codefresh Universal Search & Navigation. Displayed in the top-left of the toolbar, allows users to find and navigate to project/pipeline/build entities, switch accounts, and more. See [Global Search & Navigation](#global-search--navigation) in this article. | FALSE         |
| `gerritIntegration`          | When enabled, allows configuring Git integrations with Gerrit for Codefresh pipelines.                                                                                                                | FALSE         |
| `abacProject`     | When enabled, allows admins to define rule-based access to projects for teams by project tags.<br>**IMPORTANT**: Before enabling this feature flag, make sure to read [Project ABAC migration](https://github.com/codefresh-io/project-abac-migration){:target="\_blank"}.<br>See [Project-based ABAC](#project-based-abac) in this article. | FALSE         |
| `abacRuleRelatedResource`     | When enabled, allows admins to define rule-based access to pipelines for teams by project tags.<br>See [Project-based ABAC](#project-based-abac) in this article. | FALSE         |
| `workflowAbacByPipeline`     | When enabled, builds will not be visible to users who don’t have access to the corresponding pipelines.<br>See [Project-based ABAC](#project-based-abac) in this article. | FALSE         |
|`filterMailsByAbac` |When enabled, together with `workflowAbacByPipeline`, email notifications are not sent for users without access to the builds. <br>See [Project-based ABAC](#project-based-abac) in this article. |FALSE










