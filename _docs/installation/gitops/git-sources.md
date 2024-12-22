---
title: "Managing Git Sources in GitOps Runtimes"
description: "Add Standard/Restricted Git Sources to GitOps Runtimes"
group: installation
toc: true
---



A Git Source is a unique entity created for use with GitOps Runtimes in Codefresh. 

The Git Source connects to a Git repository within your organization, serving as an easy way to manage the deployment and configuration of Argo CD applications on clusters.  
The Git repository referenced by the Git Source stores application manifests and other resources. All resources in the Git repo are always synced to the cluster. Codefresh manages the Git Source itself as an Argo CD application.

<br>

##### Types of Git Sources  
Codefresh allows you to create two types of Git Sources: Standard and Restricted Git Sources.

Both types of Git Sources sync Argo CD application manifests. The main difference lies in the namespace to which Argo CD applications are synced. With a Restricted Git Source, you can sync Argo CD applications to the namespace of your choice, instead of to the default namespace which is the Runtime's namespace. 


##### More on Restricted Git Sources 
Restricted Git Sources:
* Are optimized for multi-tenant organizations where multiple development teams create and deploy applications for different customers on the same cluster 
* Control which teams can create what applications and where they can deploy them

Codefresh removes the complexity from the manual configuration required to sync and manage applications and their resources in different namespaces:
* Administrators set up Restricted Git Sources in Codefresh with the Git repo, cluster, and namespace definitions
* Codefresh manages the Argo CD applications synced to the Git Source, ensuring secure compliance without complex administrative overhead 

<br>

[Standard and Restricted Git Sources](#standard-and-restricted-git-sources) further explains the differences between the two types of Git Sources.  
See how the Restricted Git Source enforces secure deployment boundaries in [Use case: Restricted Git Source in multi-tenant environment](#use-case-restricted-git-source-in-multi-tenant-environment).


You can create, and manage both types Git Sources directly in the Codefresh UI. See [Git Source settings](#git-source-settings) and [Create a Git Source](#create-a-git-source).

To understand how the Git Source interacts with GitOps Runtimes and Argo CD applications, explore [Git Sources, GitOps Runtimes, Argo CD applications](#git-sources-gitops-runtimes-argo-cd-applications).




## Standard and Restricted Git Sources
Codefresh allows you to create two types of Git Sources:
* Standard Git Source
* Restricted Git Source

### Standard Git Source
The Standard Git Source is created as an Argo CD application within the GitOps Runtime's namespace. Manifests of Argo CD applications synced to a Standard Git Source are also deployed to the Runtime's namespace. Standard Git Sources are typically assigned to the default Application Project.

##### Features of Standard Git Sources  

* Application Project  
  The default or user-defined Application Project allows deployments from any Git repository, to any destination cluster and namespace(s). 

* Git repository  
  The Git repository linked to the Standard Git Source can store different types of resources, from Argo CD applications to config maps, Argo Workflow templates, and more.


### Restricted Git Source
The Restricted Git Source is also created as an Argo CD application within the GitOps Runtime namespace, with two major differences:
* Manifests of Argo CD applications synced to a Restricted Git Source are _deployed to a user-defined namespace_, not to the Runtime's namespace. 
* Codefresh automatically creates the Application Projects according to the settings defined for the Restricted Git Source. 

The most notable feature of the Restricted Git Source is its ability to control access to the Git repositories with Argo CD applications, and to enforce deployments only to specific clusters and namespaces. 

##### Features of Restricted Git Sources

* Application Projects  
  All Argo CD applications synced to the same Restricted Git Source must belong to the same Application Project. Codefresh simplifies this by automatically creating the Application Project for the Restricted Git Source. As a user, you do not have the option to manually select the Application Project to which your applications should belong to when working with Restricted Git Sources.

  Whenever you create a Restricted Git Source, Codefresh generates two Application Projects for the Git Source with the same name as the Restricted Git Source:  
  * Application Project for the Restricted Git Source application, with the suffix `restricted` added to the name
  * Application Project controlling the Argo CD applications synced to the Restricted Git Source. 


* Git repository  
  The Git repository referenced by the Restricted Git Source can house only manifests of Argo CD applications, Application sets, and Application Projects.

* Deployment destinations  
  The destination clusters and namespaces defined by the Restricted Git Source defines the deployment destinations allowed for applications.



<!---

The table highlights the main differences between the two types of Git Sources.

{: .table .table-bordered .table-hover}
| Aspect            | Standard Git Source | Restricted Git Source |
|-------------------|---------------------|------------------------|
| Application Project | Default or user-selected                    | Automatically created by Codefresh  |
| Source Namespace            | GitOps Runtime namespace   | User-defined namespace               |
| Application sync  | From any Git repo     | From only allowed Git repos |
| Application deployment  | Any cluster and any namespace     | Only defined clusters and namespaces |

-->



## Git Sources, GitOps Runtimes, Argo CD applications

Let's look at how the Git Source interacts with other entities such as GitOps Runtimes and Argo CD applications.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source/relation-git-source-runtime-app.png" 
	url="/images/runtime/git-source/relation-git-source-runtime-app.png" 
	alt="GitOps Runtime, Git Sources, Argo CD applications" 
	caption="GitOps Runtime, Git Sources, Argo CD applications"
  max-width="60%" 
%}


### Git Sources & GitOps Runtimes

Git Sources are always linked to GitOps Runtimes within Codefresh's GitOps ecosystem. Every GitOps Runtime can be associated with one or more Git Sources.

Git Sources are housed in the account's Shared Configuration Repository, typically within `.resources/<runtime-name>/`. The [Shared Config repo]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) is a dedicated Git repository that stores configuration settings and manifests shared between Runtimes within the same account.


   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source/git-source-in-runtime.png" 
	url="/images/runtime/git-source/git-source-in-runtime.png" 
	alt="Git Source tab in GitOps Runtime" 
	caption="Git Source tab in GitOps Runtime"
  max-width="60%" 
%}




### Git Sources & Argo CD applications
When creating an Argo CD application in Codefresh, selecting the Git Source to which it should sync is a critical step before committing the application manifest. 

   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source/select-git-source-for-app.png" 
	url="/images/runtime/git-source/select-git-source-for-app.png" 
	alt="Selecting Git Source for Argo CD application"
	caption="Selecting Git Source for Argo CD application"
  max-width="60%" 
%}

Syncing an Argo CD application to a Git Source, ensures that:
* The application's manifest in the Git repository linked to the Git Source is always synced with the cluster.
* The application hierarchy is accurately displayed in the GitOps Apps dashboard, as one of a set with the Git Source as the parent application.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source/apps-dashboard-git-source-apps.png" 
	url="/images/runtime/git-source/apps-dashboard-git-source-apps.png" 
	alt="Applications synced to Git Source in GitOps Apps dashboard" 
	caption="Applications synced to Git Source in GitOps Apps dashboard"
  max-width="60%" 
%}

If the Argo CD application is not synced to a Git Source:
* The hierarchy is not correctly displayed in the GitOps Apps dashboard, even if the Argo CD application is part of an application set.
* You cannot modify the application's settings nor delete the application in Codefresh. The UI displays a notification that "there was an issue with the application's Git Source."

   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source/non-git-source-app-notification.png" 
	url="/images/runtime/git-source/non-git-source-app-notification.png" 
	alt="Notfication for application not synced to Git Source" 
	caption="Notfication for application not synced to Git Source"
  max-width="60%" 
%}


## Use case: Restricted Git Source in multi-tenant environment
The use case illustrates how the Restricted Git Source can handle secure application deployment in multi-tenant environments.

### Scenario
Multiple teams are engaged in creating applications for Marvel characters. Each team must be constrained to create the applications in the Git repos defined for them, and deploy the applications within the namespaces assigned to them.

There are three teams:
* Hulk
* Thor
* Thanos

### Objective
Use Codefresh's Restricted Git Sources to define and enforce restrictions.

### Set up the Restricted Git Source for Hulk 
Let's see how to achieve this for a single team, the Hulk team.

1. **Create Git repo for the Hulk team**  
  Create the Git repo where the developers in the Hulk team can store their application manifests. Make sure to grant write permissions only to members of the Hulk team.  
  Let's name the Git repo `marvel-hulk-team-apps`. 

1. **Create destination namespace for deployment**  
  Create the namespace on the cluster to which Hulk applications can be deployed. Let's name it, `cf-hulk-apps-zone`.  
  Note that the Namespace must start with the prefix `cf-`.  

1. **Create a Restricted Git Source**  
  Create the Restricted Git Source for the Hulk team that will define the namespace to which to deploy application manifests, and the namespace to which to deploy the applications themselves.
  For detailed descriptions of the settings, see [Git Source settings](#git-source-settings) in this article.
    1. In the Codefresh UI, go to your GitOps Runtime for which to create Git Sources.
    1. Click the **Git Sources** tab and click **Create Git Source**.
    1. Define the following:
      * **Name**: `hulk-apps`  
      * **Type**: `Restricted`
      * **Source**: `marvel-hulk-team-apps` (this is the Git repo linked to the Restricted Git Source where the Hulk team will store their application manifests)
      * **Branch**: `main`
      * **Path**: `.`
    1. Leave the other settings empty, and click **Next**.
    1. Specify the deployment settings: 
      * **Source Namespace**: Define the namespace to which to deploy the application manifests. Because we want to enforce permissions, we will define `cf-hulk-app-manifests` as the namespace. The `cf-` prefox is mandatory for the namespace. If the namespace does not exist, Codefresh will automatically create it.
      * **Allowed Clusters & Namespaces**: Select the relevant cluster and namespace to which to deploy the applications. Let's select `hulk-apps-zone` as the namespace to which to deploy applications.
    1. Click **Create**.
  You have now created the Restricted Git Source.
  Codefresh creates the Application Projects with the required configurations to enforce the restrictions.    
1. **Create an Argo CD application**  
  When you [create an Argo CD application]({{site.baseurl}}/docs/deployments/gitops/create-application/) in Codefresh, you are prompted to select the:
    * GitOps Runtime for the application
    * Git Source in which to store the application manifest, from among the Git Sources created for the Runtime to which you have write permissions   
      The Restricted Git Source you select dictates which target clusters and namespaces are available for deployment.  
      Codefresh enforces the limitations through both the UI and the GitOps Runtime to ensure that applications cannot be deployed outside their set boundaries.


Repeat this process to set up Restricted Git Sources for other teams.

### How does the Restricted Git Source function?
The diagram below is a visual representation of the above use case, illustrating how a Restricted Git Source functions to deploy Argo CD applications synchronized to it.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source/restricted-git-source-flow.png" 
	url="/images/runtime/git-source/restricted-git-source-flow.png" 
	alt="Restricted Git Source functionality" 
	caption="Restricted Git Source functionality"
  max-width="100%" 
%}



## Create a Git Source
Create Standard or Restricted Git Sources for any provisioned GitOps Runtime.  You can then commit manifests of Argo CD applications to any of these Git Sources. 

>**NOTE**    
You must be in the List View for GitOps Runtimes to create Git Sources. 

**Before you begin**  
* Review [Git Source settings](#git-source-settings)  


**How to**
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes**){:target="\_blank"}.
1. In the List View, select the Runtime for which to create a Git Source, and then click the **Git Sources** tab.  
1. Click **Create Git Source**, and in the Create Git Source panel, follow the instructions to define the settings for the Git Source.  

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source/create-git-source.png" 
	url="/images/runtime/git-source/create-git-source.png" 
	alt="Create Git Source" 
	caption="Create Git Source"
    max-width="60%" 
%}


{:start="4"}
1. Click **+ Create Git Source**.



## Git Source settings
The table describes the settings you can define for Standard and Restricted Git Sources.  
For how-to instructions, see [Create a Git Source](#create-a-git-source).

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source/git-source-settings.png" 
	url="/images/runtime/git-source/git-source-settings.png" 
	alt="Git Source Settings" 
	caption="Git Source Settings"
    max-width="60%" 
%}

{: .table .table-bordered .table-hover}
| Setting            | Description      |
|-------------------|----------------------|
| **Name**| The name of the Git Source, which must be unique within the cluster. The syntax must conform to that of Kubernetes objects.|
| **Type**| The type of Git Source to create. {::nomarkdown}<ul><li><b>Standard Git Source</b>: The Git Source is created as an Argo CD Application in the Runtime's namespace, and belongs to the default or user-defined Application Project without deployment and repo restrictions.</li><li><b>Restricted Git Source</b>: The Git Source is created as an Argo CD application also in the Runtime's namespace, and belongs to the Application Projects created and automatically assigned by Codefresh. Applications synced with a Restricted Git Source must belong to the same Application Project and can deploy only to allowed clusters and namespaces.</li></ul>{:/}|
| **Source**| The Git repository where the application manifests, including that of the Git Source application, are stored. {::nomarkdown}<ul><li><b>Repository</b>: Mandatory. The URL of the Git repo.</li><li><b>Branch</b>: Optional. The specific branch within the repo in which to create the Git Source application manifest.</li><li><b>Path</b>: Optional. The specific path within the repo, and branch if one is specified, in which to create the Git Source application manifest.</li></ul>{:/}|
| **Include Files** and **Exclude Files** |The file or files to include or exclude from the Git repo when syncing to the destination cluster. <br>Use GLOB to define patterns using wildcards to match path names in the source Git repo. <br><br>For example, `workflows/**/*.yaml`, in the Include Files field would include all files in the `workflows` directory and all its child directories, with `.yaml` as the extension. <br><br>`**/images/**/*` in the Exclude Files field, would ignore all directories entitled `images`. <br>For GLOB guidelines and examples, see this [article](https://deepsource.io/blog/glob-file-patterns/){:target="\_blank"}.|
|**Namespace** | Applies to Restricted Git Sources only. <br>The namespace in the cluster to which to deploy the manifests of Argo CD applications synced with this Git Source, and _must start_ with the prefix `cf-`.<br>If the namespace doesn't exist on the cluster, Codefresh automatically creates it. <br><br>These namespaces are added to the configmap `argocd-cmd-params-cm` in `data.application.namespaces` as `cf-*`. You can define a different prefix for the namespaces by replacing `cf` with your preferred prefix, `<prefix>-*` and use that prefix in Restricted Git Sources. Argo CD monitors these additional namespaces for application reconciliation.  |
| **Application Project Scope** | Applies to Restricted Git Sources only. <br>The destination clusters and namespaces to which the applications synced to the Git Source and belonging to this Application Project can be deployed, and the trusted Git repos for the applications.{::nomarkdown}<ul><li><b>Allowed clusters and namespaces</b>: Single or multiple pairs of clusters and namespaces to which applications belonging to the Application Project can be deployed. <br>To permit deployment to all clusters, select **All** as the Cluster value.<br>You can add multiple namespaces for a cluster. To deploy to _all_ namespaces in the cluster, leave **Namespaces** empty. <br>For example, specifying a cluster-namespace pair <code class="highlighter-rouge">codefresh-production/game-apps:marvel-apps</code> will deploy the applications only to the defined cluster and namespace.<br> <br><!---<br>You can also use pattern matching for clusters and namespaces with the <code class="highlighter-rouge">* </code> wildcard for broad matching. For example, <code class="highlighter-rouge">marvel-apps*</code> as the namespace would include the <code class="highlighter-rouge">marvel-apps-asia</code>, <code class="highlighter-rouge">marvel-apps-eu</code>, and <code class="highlighter-rouge">marvel-apps-us</code> namespaces.--> </li><li><b>Allowed Git Repos</b>: One or more trusted Git repositories for Argo CD applications synced to this Restricted Git Source. An Argo CD application that references a repository not in the trusted list is not synced to the Source Namespace in the cluster.</li></ul>{:/}| 



## View Git Sources and settings
Drill down on a GitOps Runtime in List View to see its Git Sources. 

1. In the Codefresh UI, go to the [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page.
1. From the **List View** (the default), click a Runtime name, and then select the **Git Sources** tab.  

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source-list.png" 
	url="/images/runtime/git-source-list.png" 
	alt="Git Sources in runtime" 
	caption="Git Sources in runtime"
    max-width="60%" 
%}

{:start="3"}
1. To go to the Git Source repo, in the Repo column, mouse over the repo name and select **Go to Git repo**.
1. To see the settings for the Git Source, select the context menu at the end of the row, and click **Details**.



## Edit Git Source settings
Edit an existing Git Source by changing the source and destination definitions, and included/excluded files.  

>**NOTE**  
You cannot change the name and type of the Git Source.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes**){:target="\_blank"}.
1. From the **List View** (the default), select the Runtime with the Git Source, and then select the **Git Sources** tab.  
1. In the row with the Git Source to edit, from the context menu select **Details**.
1. In the panel that appears, click **Edit**.

<!---
{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/edit-git-source.png" 
	url="/images/runtime/edit-git-source.png" 
	alt="Edit Git Source" 
	caption="Edit Git Source"
    max-width="30%" 
%}
{:start="4"}
1. Update **Source**, **Destination**, and **Include** and **Exclude** definitions for the Git Source, and select **Save**. 
 -->

<!--- ## Delete a Git Source
Delete a Git Source 

-->

## Example YAMLs of Git Source resources
 
### Example: Standard Git Source manifest
Here's an example of the Standard Git Source application manifest, which is similar to any Argo CD application. 

{% highlight yaml %}
{% raw %}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    argocd.argoproj.io/tracking-id: in-cluster:argoproj.io/Application:runtime/loans-gs
  finalizers:
    - resources-finalizer.argocd.argoproj.io
  labels:
    app.kubernetes.io/instance: in-cluster
    codefresh.io/entity: git-source
    codefresh.io/internal: "false"
  name: loans-gs
  namespace: runtime
spec:
  destination:
    namespace: runtime
    server: https://kubernetes.default.svc
  project: default
  source:
    directory:
      exclude: ""
      include: "*"
      jsonnet: {}
      recurse: true
    path: atgardner-git-source
    repoURL: https://github.com/noam-codefresh/git-source.git
    targetRevision: main
  syncPolicy:
    automated:
      allowEmpty: true
      prune: true
      selfHeal: true
{% endraw %}
{% endhighlight %} 

### Example: Restricted Git Source app manifest
Here's an example of the Restricted Git Source application manifest.

{% highlight yaml %}
{% raw %}
apiVersion: csdp.codefresh.io/v1
kind: RestrictedGitSource
metadata:
  annotations:
    argocd.argoproj.io/tracking-id: in-cluster:csdp.codefresh.io/RestrictedGitSource:runtime/hulk-apps
  labels:
    app.kubernetes.io/instance: in-cluster
  name: hulk-apps     # taken from the name of the Git Source as the name of the Git Source application and Application Project 
  namespace: runtime
spec:
  destinations:                             # destination clusters and namespaces allowed by the Application Project 
  - namespace: cf-hulk-apps-zone
    server: https://kubernetes.default.svc
  source:                                    # source repos for the Git Source and other Argo CD Applications
    directory:
      exclude: ""
      include: '*'
      recurse: true
    path: applications
    repoURL: https://github.com/team-hulk/marvel-hulk-apps.git/
    targetRevision: HEAD
  sourceNamespace: cf-hulk-app-manifests     # namespace to which to sync application manifests
  sourceRepos:                                   #  Git repos allowed by the Application Project
  - '*'
  syncPolicy:                                    
    automated:
      allowEmpty: true
      prune: true
      selfHeal: true
    syncOptions:
    - allowEmpty=true
    - CreateNamespace=true
{% endraw %}
{% endhighlight %} 



### Example: Application Project for Restricted Git Source application
Codefresh creates two Application Projects for a Restricted Git Source, one for the Restricted Git Source application itself, and the other for the applications synced to the Restricted Git Source.  

Here's an example of the Application Project created for the Restricted Git Source application.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: hulk-apps          # Name of the Restricted Git Source used also for Restricted App Project
  namespace: runtime
spec:
  clusterResourceWhitelist:    # allow all resource types by default
  - group: '*'
    kind: '*'
  destinations:                # Destination Namespace defined in Restricted GitSource
  - namespace: cf-hulk-apps-zone
    server: https://kubernetes.default.svc
  sourceNamespaces:
  - cf-hulk-app-manifests     # Source Namespace defined in Restricted Git Source for syncing apps
  sourceRepos:                    # Allowed Git repos defined in Restricted Git Source; by default allows all source repositories
  - '*'
​
```


### Example: Application Project for Argo CD applications synced to Restricted Git Source
Codefresh creates two Application Projects for a Restricted Git Source, one for the Restricted Git Source application itself, and the other for the applications synced to the Restricted Git Source.  

Here's an example of the Application Project created for the Restricted Git Source application.

```yaml
# Restricted AppProject
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: hulk-apps-restricted             # name is the same as that of RestrictedGitSource with `-restricted` suffix
  namespace: runtime
spec:
  clusterResourceWhitelist:               # allow only Namespace and Application/ApplicationSet resources
  - group: ''
    kind: Namespace
  - group: argoproj.io
    kind: Application
  - group: argoproj.io
    kind: ApplicationSet
  destinations:
  - namespace: cf-hulk-app-manifests     # maps to the Source Namespace defined in Restricted Git Source to sync app manifests
    server: https://kubernetes.default.svc
  sourceRepos:
  - '*'                                     # allowed Git repos defined in Restricted Git Source; by default allows all source repositories
```



## Related articles
[Monitoring & managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)   
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  


