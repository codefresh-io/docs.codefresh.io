---
title: "Creating Argo CD applications"
description: ""
group: deployments
sub_group: gitops
toc: true
---



## Argo CD applications in Codefresh
Create and manage fully GitOps-compliant Argo CD applications from the GitOps Apps dashboard. 
For example Argo CD applications, see this [repo](https://github.com/oleksandr-codefresh/argocd-example-apps){:target="_blank"}. 

Configuration settings for applications define the application’s structure, sources, destination, and operational behavior. 
For ease of use, settings are organized into distinct categories including:
* [Application definitions](#application-definitions): Basic metadata, such as the application name, GitOps Runtime, and the YAML manifest name. 
* [General configuration settings](#application-general-configuration-settings): Product, Group, source, destination, and sync policies for the application.
* [Advanced configuration settings](#application-advanced-configuration-settings): Tool-specific options, project grouping, and propagation policies for resource and application deletion.

For how-to instructions, see [Create applications](#create-an-argo-cd-application).

## Application: Definitions
Application definitions include the application name, the GitOps Runtime, and the name of the YAML manifest. By default, the YAML manifest has the same name as that of the application. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-definitions.png" 
   url="/images/applications/add-app-definitions.png" 
   alt="Application definitions" 
   caption="Application definitions"
   max-width="50%" 
   %} 


## Application: General configuration settings

General configuration settings define the product, group, to which the application belongs, source, destination, and sync policies for the application. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-general-settings.png" 
   url="/images/applications/add-app-general-settings.png" 
   alt="General configuration settings" 
   caption="General configuration settings"
   max-width="70%" 
   %} 

### Products
Optional. The product to which to assign the application. Select an existing product, or create and add a new product.
Products empower promotions for applications and make for streamlined management and deployments.  
See [Products]({{site.baseurl}}/docs/products/about-products/).


### Groups
Optional. The group or groups to which to add the application. Select an existing group or groups, or create a new application group by typing a name and pressing Enter.
Group applications based on criteria meaningful to your organization, such as environment, region, or any other relevant attribute. You can then view deployments for these applications in the same location in the Groups tab of the GitOps Apps dashboard. A new view for Argo CD applications, Groups allow you to collate multiple applications and view their timelines.  
See [Application Groups]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/).




### Source 
The Git repository with the application resources.  
{::nomarkdown}<ul> <li><b>Repository URL</b>: The URL of the Git repo or the Helm package repo with the application resources. <br>If SSH is configured for the runtime, you can connect to the repo with either HTTPS or SSH. On selecting the repository, Codefresh automatically updates the URL format. See <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#configure-ssh-for-gitops-runtimes">Configure SSH for runtimes</a>.<br>If the Argo CD project is not the <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">default</span> project, make sure that the repo has the correct access roles for your application.<ul><li><b>Revision and Path</b>: Applies to Git repositories. </li><li><b>Chart</b>: Applies to Helm repositories. The name of the Helm package with all the resource definitions for the application, and the version. </li></ul>For more information, see <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/tracking_strategies/" target="\_blank">Tracking and Deployment Strategies</a>.</li></ul>{:/}   



### Destination
The cluster and namespace to which to deploy the application.  
{::nomarkdown}<ul><li><b>Cluster</b>: The cluster to which to deploy the application, defined as a <b>URL</b>, or as the user-defined display <b>NAME</b>.</li> <li><b>Namespace</b>: The namespace in the cluster to which to deploy the application.</li><li><b>Auto-create namespace</b>: When selected, automatically creates the namespace in the cluster if it doesn't exist.</li> </ul>{:/}


### Sync Settings


#### Sync Policy
The synchronization policy to apply when there are differences between the desired state in Git and the actual state in the cluster.{::nomarkdown}<ul><li><b>Manual</b>: Manually sync the changes from the Argo CD UI.</li><li><b>Automatic</b>: Automatically sync changes, with the following options if selected:<ul><li><b>Prune resources</b>:When selected, removes legacy resources that do not exist currently in Git. </li><li><b>Self heal</b>: When selected, always enforces a sync to the desired state in Git, if and when there is a change to the actual state in the cluster. See <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/#automatic-self-healing" target="_blank">Automatic self-healing</a>.</li></li></ul></ul>{:/}



#### Sync Options 
Common to both manual and automatic sync policies.{% raw %}{::nomarkdown}<ul><li><b>Skip schema validation</b>: When selected, bypasses validating the YAML schema.</li><li><b>Auto-create namespace</b>: When selected, automatically create the namespace if the specified namespace does not exist in the cluster.</li><li><b>Prune last</b>: When selected, removes those resources that do not exist in the currently deployed version during the final wave of the sync operation. See <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#prune-last" target="_blank">Prune last</a>.</li><li><b>Apply out of sync only</b>: When selected, syncs only those resources in the application that have been changed and are <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">OutOfSync</span>, instead of syncing every resource regardless of their state. This option is useful to reduce load and save time when you have thousands of resources in an application. See <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#selective-sync" target="_blank">Selective Sync</a>.</li></ul>{:/}{% endraw %} 


#### Prune propagation policy
Defines how resources are pruned, applying Kubernetes cascading deletion prune policies. For more information, see [Kubernetes - Cascading deletion](https://kubernetes.io/docs/concepts/architecture/garbage-collection/#cascading-deletion)){:target="\_blank"}.{::nomarkdown}<ul><li><b>Foreground</b>: The default prune propagation policy used by Argo CD. With this policy, Kubernetes changes the state of the owner resource to `deletion in progress`, until the controller deletes the dependent resources and finally the owner resource itself. </li><li><b>Background</b>: When selected, Kubernetes deletes the owner resource immediately, and then deletes the dependent resources in the background.</li><li><b>Orphan</b>: When selected, Kubernetes deletes the dependent resources that remain orphaned after the owner resource is deleted.</li></ul> </br>{:/}
All Prune propagation policies can be used with:  

**Replace**: When selected, Argo CD executes `kubectl replace` or `kubectl create`, instead of the default `kubectl apply` to enforce the changes in Git. This action will potentially recreate resources and should be used with care. See [Replace Resource Instead Of Applying Change](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#replace-resource-instead-of-applying-changes){:target="\_blank"}.  

**Retry**: When selected, retries a failed sync operation, based on the retry settings configured:   
* Maximum number of sync retries (**Limit**)  
* Duration of each retry attempt in seconds, minutes, or hours (**Duration**)  
* Maximum duration permitted for each retry (**Max Duration**)  
* Factor by which to multiply the Duration in the event of a failed retry (**Factor**). A factor of 2 for example, attempts the second retry in 2 X 2 seconds, where 2 seconds is the Duration.



## Application: Advanced configuration settings

Advanced settings define the tool used to create the application, and related toll-specific settings.

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-advanced-settings.png" 
   url="/images/applications/add-app-advanced-settings.png" 
   alt="Advanced configuration settings" 
   caption="Advanced configuration settings"
   max-width="70%" 
   %} 



### ArgoCD Project
The project group to which the application belongs. A project is useful to enforce restrictions on permitted sources and targets for applications and roles. If not defined, the application is automatically assigned to the `default` project, which is created automatically by Argo CD and has no restrictions.  
For more information, see Argo CD's documentation on [Projects](https://argo-cd.readthedocs.io/en/stable/user-guide/projects/#projects){:target="\_blank"}.



### Propagation policy for application deletion
Defines how resources are pruned, applying Kubernetes cascading deletion prune policies when you delete the application. 
For more information, see [Argo CD's app deletion](https://argo-cd.readthedocs.io/en/stable/user-guide/app_deletion/){:target="_blank"}.
* **Foreground**
  The default prune propagation policy used by Argo CD. With this policy, Kubernetes changes the state of the owner resource to `deletion in progress`, until the controller deletes the dependent resources and finally the owner resource itself. 
* **Background**
   When selected, Kubernetes deletes the owner resource immediately, and then deletes the dependent resources in the background.
* **Non-cascading**
  When selected, Kubernetes deletes only the application and not its resources.  



### Type of Application
The tool used to create the application's manifests.  Codefresh supports defining application manifests as a directory, Helm charts, or Kustomize. If you are using other tools to define application manifests, use the Plugin type. For more information, see the Argo CD's documentation on [Tools](https://argo-cd.readthedocs.io/en/stable/user-guide/application_sources/){:target="_blank"}.


* **Directory**: A `directory` application, which is the default application type in Argo CD.  
  * **Directory recurse**: Optional. Select to include subdirectories.
  * **Top-level arguments**: Optional. Select and define parameters.
  * **External variables**: Optional. Select and define external variables.

* **Helm**: Create the application as a Helm chart.  
   * **Values files**: One or more `values.yaml` files to store the parameters. 
   * **Values**: Optional. When defined, new values not in `values.yaml` files are added, and existing values are overridden. 
   
* **Kustomize**: Create a Kustomize application, with the following settings:  
  * **Version**: The version of Kustomize used to create the application.  
  * **Name Prefix** and **Name Suffix**: Optional. The prefix and suffix to be appended to the resources of the application.
  
* **Plugin**: Use for any other tool. 
  * **Name**: The name of the Plugin used to create the application.
  * **External Variables**: The variables to use in the application.  

For example applications, go to the [Argo CD example applications repo](https://github.com/argoproj/argocd-example-apps){:target="_blank"}.




## Create an Argo CD application
Create a new application from the GitOps Apps dashboard. 
Edit the manifest directly in YAML mode, or define the settings in the Form mode. Toggle between the modes as convenient. 

##### Before you begin
* Make sure you have a valid [Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
* Review:    
  [General configuration settings](#application-general-configuration-settings)  
  [Advanced configuration settings](#application-advanced-configuration-settings)  


##### How to
1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
1. On the top-right, select **Add Application**.
1. In the Add Application panel, add definitions for the application:
  * Application name: Must be unique within the cluster.
  * Runtime: The runtime to associate with the application.  
  * YAML filename: The name of the application's configuration manifest, assigned on commit to Git. By default, the manifest is assigned the application name. Change the name as required.

    >**NOTE**  
    The application definitions cannot be changed after you continue to the Configuration settings.

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-definitions.png" 
   url="/images/applications/add-app-definitions.png" 
   alt="Add Application panel" 
   caption="Add Application panel"
   max-width="50%" 
   %} 

{:start="4"}
1. Select **Next** to go to the Configuration tab.  
  By default you are in Form mode. You can toggle between the Form and YAML modes as you define the application's configuration settings. You can edit the YAML manifest.
1. Define the **General** settings for the application. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-general-settings.png" 
   url="/images/applications/add-app-general-settings.png" 
   alt="Add Application: Advanced settings" 
   caption="Add Application: Advanced settings"
   max-width="70%" 
   %} 


{:start="6"}
1. Define the **Advanced** settings for the application. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-advanced-settings.png" 
   url="/images/applications/add-app-advanced-settings.png" 
   alt="Add Application: Advanced settings" 
   caption="Add Application: Advanced settings"
   max-width="70%" 
   %} 

{:start="7"}   
1. To commit all your changes, click **Commit**.  
  The Commit form is displayed with the application's definition on the left, and the read-only version of the manifest with the configuration settings you defined on the right.
1. Enter the path to the **Git Source** to which to commit the application configuration manifest.

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/add-app-final-commit.png" 
   url="/images/applications/add-app-final-commit.png" 
   alt="Add Application: Commit to Git" 
   caption="Add Application: Commit to Git"
   max-width="70%" 
   %} 

{:start="9"} 
1. Add a commit message and then select **Commit** on the bottom-right of the panel.


Your application is first committed to Git, and then synced to the cluster which may take a few moments.  



## Related articles
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/)  
[Managing Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/)  
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)    
[Product Dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  