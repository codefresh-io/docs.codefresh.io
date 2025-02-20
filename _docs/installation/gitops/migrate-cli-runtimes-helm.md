---
title: "Migrating GitOps Runtimes from CLI to Helm"
description: "Migrate existing Hybrid GitOps Runtimes from CLI-based to Helm-based Runtimes"
toc: true
---

{{site.data.callout.callout_warning}}
**Deprecated**  
This article has been deprecated as we now support only Helm-based GitOps Runtimes.
{{site.data.callout.end}}

Codefresh has transitioned to Helm-based Runtimes for GitOps. CLI-based GitOps Runtimes are deprecated.  
If you have CLI-based GitOps Runtimes, you can migrate the Runtimes to preserve important data and install the new Helm GitOps Runtime.

When you migrate the CLI-based Runtime, the Git Sources, external clusters, and Argo Rollouts installed on external clusters, are moved from the installation repository to the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).

The `values.yaml` file for Helm installation is the central configuration hub for customizing and controlling various aspects of the Runtime installation. You need to replicate all patches and customizations applied to the CLI Runtime to the `values.yaml` for the new Helm Runtime.

>**NOTE**  
Migration from CLI-based to Helm-based Runtimes is supported from GitOps CLI version 0.1.57 and higher. 

## Before you begin
Make sure you have:
* Git user token (see [Git tokens]({{site.baseurl}}/docs/security/git-tokens/#git-user-access-token-scopes))
* Git username, based on the Git provider
  * GitHub and GitHub Enterprise: Not required as Codefresh automatically retrieves and populates it.
  * GitLab Cloud and GitLab Server: Required, and is either your username as the owner, or if your project is within a group, the front-slash separated path to the project. For example, `nr-codefresh` (owner), or `parent-group/child-group` (group hierarchy)
  * Bitbucket Cloud and Bitbucket Data Center: Required, and is your username for the Bitbucket Cloud/Bitbucket Data Center account.  
* CLI version 0.1.57 or higher  
  Run `cf upgrade` if needed to download the latest CLI version

## Step 1: Update `values.yaml`

Before migrating the CLI-based Runtime and installing the Helm-based Runtime, replicate all patches and customizations made to the CLI Runtime to the `values.yaml` file. This action is essential and ensures that the Helm-based Runtime inherits the configuration in the CLI Runtime's setup.  

The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/values.yaml){:target="\_blank"}. Every parameter is annotated in detail.  If you have questions, reach out to Codefresh Support for guidance. 

{{site.data.callout.callout_tip}}
**TIP**  
For info on customizing options for Argo components in the `values.yaml`, check out the following:  
* [Argo CD](https://github.com/codefresh-io/argo-helm/blob/argo-cd/charts/argo-cd/README.md){:target="\_blank"}  
* [Argo Events](https://github.com/codefresh-io/argo-helm/blob/argo-cd/charts/argo-events/README.md){:target="\_blank"}  
* [Argo Workflows](https://github.com/codefresh-io/argo-helm/blob/argo-cd/charts/argo-workflows/README.md){:target="\_blank"}  
* [Argo Rollouts](https://github.com/codefresh-io/argo-helm/blob/argo-cd/charts/argo-rollouts/README.md){:target="\_blank"} 
{{site.data.callout.end}}



1. Update `values.yaml`.
1. Continue with [Step 2: Migrate CLI-based GitOps Runtime](#step-2-migrate-cli-based-gitops-runtime).


## Step 2: Migrate CLI-based GitOps Runtime 
Migrate an existing CLI-based GitOps Runtime to a Helm-based Runtime by running the migration command. 

The migration command does the following: 
* Copies to the Shared Configuration Repository:
  * Git Source information
  * Argo Rollouts and Rollout Reporters
* Uninstalls the CLI-based GitOps Runtime from the cluster, while keeping it in the Codefresh platform and in the database
* Changes the Runtime's installation type from `CLI` to `Helm`

**How to**  
1. Run: 
```yaml
cf migrate <RUNTIME_NAME> \
  --git-token <GIT_TOKEN> \
  [--git-user <GIT_USER>] \
```
  where:  
  * `<RUNTIME_NAME>` is the name of the GitOps Runtime to migrate. When omitted, Codefresh displays the available Runtimes you can select from.
  * `<GIT_TOKEN>` is required, and is the Git user token (not the Git Runtime token).
  * `<GIT_USER>` is optional depending on the Git provider, and is your user or ogranization name:
        * GitHub and GitHub Enterprise: Not required. 
        * GitLab Cloud and GitLab Server: Required, and is either your username as the owner, or if your project is within a group, the front-slash separated path to the project. For example, `nr-codefresh` (owner), or `parent-group/child-group` (group hierarchy).
        * Bitbucket Cloud and Bitbucket Data Center: Required, and is your username for the Bitbucket Cloud/Bitbucket Data Center account. 
1. Continue with [Step 3: Select Hybrid Runtime install option](#step-3-select-hybrid-runtime-install-option). 

## Step 3: Select Hybrid Runtime install option

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Select **Hybrid Runtime**.

 {% include
image.html
lightbox="true"
file="/images/runtime/helm/helm-select-hybrid-runtime.png"
url="/images/runtime/helm/helm-select-hybrid-runtime.png"
alt="Select Hybrid GitOps Runtime for installation"
caption="Select Hybrid GitOps Runtime for installation"
max-width="40%"
%}

{:start="4"}
1. Continue with [Step 4: Install GitOps Helm Runtime](#step-4-install-gitops-helm-runtime).



## Step 4: Install GitOps Helm Runtime
Install a new Helm-based GitOps Runtime to the cluster through the Helm chart. 
This step describes how to install the GitOps Runtime through the UI where you can copy the install command with values automatically populated by Codefresh.  
You can also run the install command by applying the `values.yaml` file with the installation configuration and customizations.


**values.yaml validation**    
Before initiating the installation, Codefresh automatically validates the `values.yaml` file. If the supplied values are incorrect,Codefresh terminates the installation. For troubleshooting details, see [Job has reached the specified backoff limit error during Helm installation]({{site.baseurl}}/docs/kb/articles/runtime-issues/#job-has-reached-the-specified-backoff-limit-error-during-helm-installation).
 
<br>


{{site.data.callout.callout_warning}}
**IMPORTANT**    
**Runtime Name** and **Namespace**  
The name of the Helm-based Runtime _must be identical_ to that of the CLI-based Runtime.  
The `namespace` is required only if it is different from the Runtime name.  
{{site.data.callout.end}}

**Install by applying `values.yaml`**  
Run this command to install the GitOps Helm Runtime by applying `values.yaml`. Remember to replace with the correct name of the file if needed. 

This is an example of the Helm install command with the `values` file to be applied.

{% highlight yaml %}
helm upgrade --install <helm-release-name> \
  --create-namespace \
  --namespace <namespace> \
  -f values.yaml \
  oci://quay.io/codefresh/gitops-runtime \
  --wait
{% endhighlight %}

This is an example of the `values` file with the installation configuration settings applied. 

{% highlight yaml %}
global:
  codefresh:
    accountId: <codefresh-account-id>
    userToken:
      token: <codefresh-api-key>

  runtime:
    name: <runtime-name>
{% endhighlight %}

<br><br>

**How to**  
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
1. Select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   * **Runtime Name**: Enter the name of the CLI-based Runtime you migrated.
   * **Namespace**: Enter namespace to which to install the Helm-based Runtime.
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
      * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, and is required only if it differs from the Runtime name.
      * `<codefresh-account-id>` is mandatory only for _tunnel-based Hybrid GitOps Runtimes_ , which is also the default access mode. Automatically populated by Codefresh in the installation command.
      * `<codefresh-api-key>` is the API key, either an existing one or a new API key you generated. When generated, it is automatically populated in the command.
      * `<runtime-name>` is the name of the GitOps Runtime, and must be identical to that of the CLI-based Runtime you migrated.
      <!--- * `<helm-repo-name>` is the name of the repo in which to store the Helm chart, and must be identical to the `<helm-repo-name>` you defined in _step 3_, either `cf-gitops-runtime` which is the default, or any custom name you define. -->
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



{:start="4"}
1. Wait for a few minutes, and then click **Close**.
  You are taken to the List View for GitOps Runtimes where:
  * The Hybrid GitOps Runtime you migrated is prefixed with a green dot indicating that it is online.
  * The Type column for the Runtime displays **Helm**.
  * The Sync Status column displays **Complete Installation**, indicating that there are pending steps to complete the installation.  
  * Drilling down into the Runtime shows empty tabs for Runtime Components, Git Sources, and Managed Clusters.  
    The Runtime Components are populated only when the GitOps Runtime is configured as an Argo Application, described in the step that follows.
 
{% include
   image.html
   lightbox="true"
   file="/images/runtime/helm/helm-runtime-view-complete-install.png"
   url="/images/runtime/helm/helm-runtime-view-complete-install.png"
  alt="Newly installed Hybrid GitOps Runtime with Complete Installation notification"
  caption="Newly installed Hybrid GitOps Runtime with Complete Installation notification"
  max-width="60%"
%}

{:start="5"}
1. Continue with [Step 5: (Optional) Configure Hybrid GitOps Runtime as Argo Application](#step-6-optional-configure-hybrid-gitops-runtime-as-argo-application).




## Step 5: (Optional) Configure Hybrid GitOps Runtime as Argo Application

Configure the Hybrid GitOps Runtime as an Argo Application as the final step in the migration process.
We recommend completing this step, as by doing so, you can view the Runtime components, monitor health and sync statuses, and ensure that GitOps is the single source of truth for the Runtime.

<!--- >>**NOTE**:
You cannot configure the Runtime as an Argo Application if you have not configured Git credentials for the Runtime, as described in the previous step.  -->


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

You have completed migrating your CLI-based GitOps Runtime to a Helm-based one.  
In the Runtimes page, you can see that the Type column for the Runtime displays Helm. Drill down displays the [Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources/) and [external clusters]({{site.baseurl}}/docs/installation/gitops/managed-cluster/) you had already created for the CLI-based Runtime.

## What to do next

If you have private registries, you need to override specific image values, and if your Git servers are on-premises, you need to add custom repository certificates. See [Optional GitOps Runtime configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#optional-gitops-runtime-configuration). 

You can also create [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/) and [Products]({{site.baseurl}}/docs/dashboards/gitops-products/) for your Argo CD applications.

## Related articles
[Monitor GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Manage GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/)  
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)   
{% if page.collection != site.gitops_collection %}[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/){% endif %}  


