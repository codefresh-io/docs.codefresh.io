---
title: "Add Git Sources to GitOps Runtimes"
description: "Manage Git Sources storing resources"
group: installation
toc: true
---

A Git Source is a Custom Resource Definition (CRD) created by Codefresh, connected to a Git repository in your organization.  It serves as an easy way to manage the deployment and configuration of Argo CD applications on clusters, as every resource in the Git repo referenced by the Git Source is always synced to the cluster. Codefresh manages the Git Source itself as an Argo CD application.  

<!-- verify: The Git repository adheres to an opinionated folder structure, also managed by Codefresh. -->
To understand the relationship between Git Sources, GitOps Runtimes, and Argo CD applications, review [Git Source Concepts](#git-source-concepts).

Codefresh supports [Standard and Restricted Git Sources](#standard-and-restricted-git-sources). You can create, edit, and delete both types Git Sources directly in the Codefresh UI.




## Git Source concepts

To understand how Git Sources work, let's look at a few central concepts around Git Sources in Codefresh which illustrate how the Git Source interacts with other entities, mainly GitOps Runtimes and Argo CD applications.

DIAGRAM: tree diagram of Runtime > Git source > App folders

### Git Sources & GitOps Runtimes

Git Sources are always connected to GitOps Runtimes in Codefresh's GitOps ecosystem in Codefresh. Every GitOps Runtime can have one or more Git Sources. 

Git Sources are created in the account's Shared Configuration Repository, typically in `.resources/<runtime-name>/`. The [Shared Config repo]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) is a designated Git repo storing configuration settings and manifests shared among Runtimes in the same account. 



### Git Sources & Argo CD applications
On creating an Argo CD application in Codefresh, before you can commit the application manifest, you need to select the GitOps Runtime and the Git Source to which to commit it. 

PIC 

Committing an Argo CD application to a Git Source, ensures that:
* The application's manifest in the Git repository referenced by the Git Source is always synced to the cluster.
* The application hierarchy is rendered correctly in the GitOps Apps dashboard as an application set with the Git Source as the parent application.

PIC

If the Argo CD application is not part of a Git Source:
* The hierarchy is not correctly rendered in the GitOPs dashboard, even if the Argo CD application is part of an application set.
* You cannot modify the application's settings nor delete the application in Codefresh. These options are disabled in the UI with a notification that "there was an issue with the application's Git Source."

PIC 

### Git Sources & Application Projects
Application Projects serve as a way to group and organize related Argo CD applications. All Argo CD applications are assigned to the default project without any deployment restrictions as a rule. 

For Standard Git Sources, users can choose a different Application Project for their Argo CD applications.

In the context of Restricted Git Sources, Application Projects play a critical role, not just for organization purposes, but also for access control by teams, and source and deployment destinations.






## Standard and Restricted Git Sources
Codefresh allows you to create two types of Git Sources:
* Standard Git Source
* Restricted Git Source

### Standard Git Source
The Standard Git Source is an Argo CD application created in the GitOps Runtime namespace and automatically assigned to the default or a user-defined Application Project. Manifests of Argo CD applications committed to a Standard Git Source are deployed  same namespace as the Runtime. 

* Application Project  
  The default or user-defined Application Project which permits deployments from any Git source repo to any destination cluster and namespace(s). 
* Git repositories  
  The Git repository referenced by the Standard Git Source contains the YAMLs of both the Standard Git Source Argo CD application, and that of other Argo CD applications. The repo can also contain other resource types such as config maps, Argo Workflow templates, and more.
* Deployment destinations
  Argo CD applications from Standard Git Sources can be deployed any destination cluster and namespaces.



### Restricted Git Source
The Restricted Git Source is an Argo CD application created in a namespace distinct from that of the GitOps Runtime. Its primary feature lies in its ability, through Application Projects, to control access to Git repositories housing Argo CD application manifests, as well as to the clusters and namespaces for deploying the applications.

**Characteristics of Restricted Git Sources**  

* Application Projects
  All Argo CD applications committed to the same Restricted Git Source must also belong to the same Application Project.  
  Codefresh streamlines this process by automatically generating the corresponding Application Project when creating the Restricted Git Source. As a user, you do not have to manually set up Application Projects with the correct deployment permissions when working with Restricted Git Sources.

* Git repositories
  There are two different source Git repositories:
  *  The first is for the Restricted Git Source application manifest and that of the associated Application Project. 
  *  The second is a list of trusted Git repositories containing YAMLs of the Argo CD applications and Application sets. Each application manifest must reference at least one of these trusted Git repositories for the manifest to be synced to the cluster. <br>
    Argo CD applications that are part of Restricted Git Sources have the label `codefresh.io/is-restricted: "true"`.

* Deployment destinations
  Applications committed to a Restricted Git Source can be deployed only to the clusters and namespaces defined by the Restricted Git Source. 


The table highlights the main differences between the two types of Git Sources.

{: .table .table-bordered .table-hover}
| Aspect            | Standard Git Source | Restricted Git Source |
|-------------------|---------------------|------------------------|
| Application Project | Default or user-selected                    | Automatically created by Codefresh  |
| Source Namespace            | GitOps Runtime namespace   | User-defined namespace               |
| Application manifests  | From any Git repo     | From only allowed Git repos |
| Application deployment  | Any cluster and any namespace     | Only defined clusters and namespaces |





## Git Source settings

{: .table .table-bordered .table-hover}
| Setting            | Description      |
|-------------------|----------------------|
| **Name**| The name of the Git Source, which must be unique within the cluster. The syntax must conform to that of Kubernetes objects.|
| **Type**| The type of Git Source to create. {::nomarkdown}<ul><li><b>Standard Git Source</b>: The Git Source is created as an Argo CD Application in the Runtime's namespace, and belongs to the default or user-defined Application Project without deployment and repo restrictions.</li><li><b>Restricted Git Source</b>: The Git Source is created as an Argo CD application in a defined namespace (not the Runtime's), and belongs to the same Application Project created and automatically assigned by Codefresh. Applications committed to this Git Source must belong to the same Application Project and can deploy only to allowed clusters and namespaces.</li></ul>{:/}|
| **Namespace**| The namespace where the manifest Git Source application manifest is created. {::nomarkdown}<ul><li><b>Repository</b>: Mandatory. The URL of the Git repo.</li><li><b>Branch</b>: Optional. The specific branch within the repo in which to create the Git Source application.</li><li><b>Path</b>: Optional. The specific path within the repo, and branch if one is specified, in which to create the Git Source application.</li></ul>{:/}|
| **Include Files** and **Exclude Files** |The file or files to include or exclude from the Git repo when syncing to the destination cluster. <br>Use GLOB to define patterns using wildcards to match path names in the source Git repo. <br><br>For example, `workflows/**/*.yaml`, in the Include Files field would include all files in the `workflows` directory and all its child directories, with `.yaml` as the extension. <br><br>`**/images/**/*` in the Exclude Files field, would ignore all directories entitled `images`. <br>For GLOB guidelines and examples, see this [article](https://deepsource.io/blog/glob-file-patterns/){:target="\_blank"}.|
|**Source Namespace** | Applies to Restricted Git Sources only. <br>The namespace in the cluster to which the manifests of Argo CD applications committed to this Git Source are synced.|
| **Application Project Scope** | Applies to Restricted Git Sources only. <br>The destination clusters and namespaces to which the applications belonging to this Application Project can be deployed, and the trusted Git repos for application resources.{::nomarkdown}<ul><li><b>Allowed clusters and namespaces</b>: Single or multiple pairs of clusters and namespaces to which applications belonging to the Application Project can be deployed.<br>For example, specifying a cluster-namespace pair `codefresh-production/game-apps:marvel-apps` will deploy the applications only to the defined cluster and namespace.<br>You can add multiple namespaces to the cluster-namespace pair. <br><br>You can also use pattern matching for clusters and namespaces with the * wildcard for broad matching. For example, `marvel-apps*` as the namespace would include the `marvel-apps-asia`, `marvel-apps-eu`, and `marvel-apps-us` namespaces. </li><li><b>Allowed Git Repos</b>: One or more trusted Git repositories for Argo CD applications committed to this Git Source. An Argo CD application that references a repository not in the trusted list is not synced to the Source Namespace in the cluster. </li></ul>{::}| 

## Create a Git Source
Create Standard or Restricted Git Sources for any provisioned GitOps Runtime.  You can then commit manifests of Argo CD applications to any of these Git Sources. 

>**NOTE**:  
You must be in the List View for GitOps Runtimes to create Git Sources. 

**Before you begin**  
* Review [Git Source settings](#git-source-settings)  


**How to**
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes**){:target="\_blank"}.
1. In the List View, select the Runtime for which to create a Git Source, and then click the **Git Sources** tab.  
1. Click **Create Git Source**, and in the Create Git Source panel, follow the instructions to define the settings for the Git Source.  
<!--- change screenshot -->
     {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/create-git-source.png" 
	url="/images/runtime/create-git-source.png" 
	alt="Create Git Source" 
	caption="Create Git Source"
    max-width="60%" 
%}


{:start="4"}
1. Click **+ Create Git Source**.



### Example: Default Git Source

### Example: Restricted Git Source
Here's an example of the YAML of a Restricted Git Source.



{% highlight yaml %}
{% raw %}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  creationTimestamp: "2023-09-26T11:38:25Z"
  generation: 23398
  labels:
    app.kubernetes.io/instance: in-cluster
    codefresh.io/entity: git-source
    codefresh.io/internal: "false"
    codefresh.io/is-restricted: "true"
  name: restricted-gs
  namespace: runtime
  ownerReferences:
  - apiVersion: csdp.codefresh.io/v1
    blockOwnerDeletion: true
    controller: true
    kind: RestrictedGitSource
    name: restricted-gs
    uid: 135affb7-a9e8-4063-b14d-c32ee8a5b479
  resourceVersion: "123576526"
  uid: b41ddbd5-cc51-47a0-ba15-76a82af442b8
spec:
  destination:
    namespace: marvel-team
    server: https://kubernetes.default.svc
  project: restricted-gs-restricted
  source:
    path: git-source-2
    repoURL: https://github.com/noam-codefresh/git-source.git
    targetRevision: HEAD
  syncPolicy:
    automated:
      allowEmpty: true
      prune: true
      selfHeal: true
    syncOptions:
    - allowEmpty=true
    - CreateNamespace=true
status:
  conditions:
  - lastTransitionTime: "2023-10-01T08:07:28Z"
    message: 'Failed to load target state: failed to generate manifest for source
      1 of 1: rpc error: code = Unknown desc = Manifest generation error (cached):
      git-source-2: app path does not exist'
    type: ComparisonError
  controllerNamespace: runtime
  health:
    status: Healthy
  history:
  - deployStartedAt: "2023-09-26T11:52:49Z"
    deployedAt: "2023-09-26T11:52:50Z"
    id: 0
    revision: 50240d9d473c490f6b1263c3c50f6369a446dce1
    source:
      path: git-source-1
      repoURL: https://github.com/noam-codefresh/git-source.git
      targetRevision: HEAD
  - deployStartedAt: "2023-09-26T13:39:33Z"
    deployedAt: "2023-09-26T13:39:34Z"
    id: 1
    revision: a656a333006bb50b480d00c42370bbbd1f45555d
    source:
      path: git-source-1
      repoURL: https://github.com/noam-codefresh/git-source.git
      targetRevision: HEAD
  operationState:
    finishedAt: "2023-09-26T13:39:34Z"
    message: successfully synced (all tasks run)
    operation:
      initiatedBy:
        username: admin
      retry: {}
      sync:
        revision: a656a333006bb50b480d00c42370bbbd1f45555d
        syncOptions:
        - allowEmpty=true
        - CreateNamespace=true
        syncStrategy:
          hook: {}
    phase: Succeeded
    startedAt: "2023-09-26T13:39:33Z"
    syncResult:
      resources:
      - group: argoproj.io
        hookPhase: Running
        kind: Application
        message: application.argoproj.io/wrong-dest-ns unchanged
        name: wrong-dest-ns
        namespace: marvel-team
        status: Synced
        syncPhase: Sync
        version: v1alpha1
      - group: argoproj.io
        hookPhase: Running
        kind: Application
        message: application.argoproj.io/good-app unchanged
        name: good-app
        namespace: marvel-team
        status: Synced
        syncPhase: Sync
        version: v1alpha1
      - group: argoproj.io
        hookPhase: Running
        kind: Application
        message: application.argoproj.io/wrong-project unchanged
        name: wrong-project
        namespace: marvel-team
        status: Synced
        syncPhase: Sync
        version: v1alpha1
      revision: a656a333006bb50b480d00c42370bbbd1f45555d
      source:
        path: git-source-1
        repoURL: https://github.com/noam-codefresh/git-source.git
        targetRevision: HEAD
  reconciledAt: "2023-10-01T08:54:48Z"
  resources:
  - group: argoproj.io
    kind: Application
    name: good-app
    namespace: marvel-team
    requiresPruning: true
    status: Unknown
    version: v1alpha1
  - group: argoproj.io
    kind: Application
    name: wrong-dest-ns
    namespace: marvel-team
    requiresPruning: true
    status: Unknown
    version: v1alpha1
  - group: argoproj.io
    kind: Application
    name: wrong-project
    namespace: marvel-team
    requiresPruning: true
    status: Unknown
    version: v1alpha1
  summary: {}
  sync:
    comparedTo:
      destination:
        namespace: marvel-team
        server: https://kubernetes.default.svc
      source:
        path: git-source-2
        repoURL: https://github.com/noam-codefresh/git-source.git
        targetRevision: HEAD
    status: Unknown
{% endraw %}
{% endhighlight %}  

## View Git Sources and settings
Drill down on a GitOps Runtime in List View to see its Git Sources. The 

1. In the Codefresh UI, go to the [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page.
1. From the **List View** (the default), select a Runtime name, and then select the **Git Sources** tab.  

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
1. To see the settings for the Git Source, select the three dots at the end of the row.



## Edit Git Source settings
Edit an existing Git Source by changing the source and destination definitions, and included/excluded files.  

>**NOTE**:  
You cannot change the name of the Git Source.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes**){:target="\_blank"}.
1. From the **List View** (the default), select the Runtime with the Git Source, and then select the **Git Sources** tab.  
1. In the row with the Git Source to edit, from the context menu select **Details**.
1. In the panel that appears, click **Edit**.

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

## Delete a Git Source
Delete a Git Source i

## Related articles
[Monitoring & managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)  


