---
title: "Add Git Sources to GitOps Runtimes"
description: "Manage Git Sources storing resources"
group: installation
toc: true
---





A Git Source is the equivalent of an Argo CD application that tracks a Git repository and syncs the desired state of the repo to the destination K8s cluster. In addition to application resources, the Git Source can store resources for GitOps Runtimes, and CI/CD entities such as delivery pipelines, Workflow Templates, workflows, and applications.

Provisioning a GitOps Runtime automatically creates a Git Source that stores resources for the Runtime and for the demo CI pipelines that are optionally installed with the Runtime. Every Git Source is associated with a GitOps Runtime. You can add more Git Sources at any time, to the same or to different Runtimes.

Once you create a Git Source for a GitOps Runtime, you can store resources for CI/CD entities associated with it. For example, when creating pipelines or applications, you can select the Git Source to which to store manifest definitions.

What is a Git Source?
A Git Source is a Git repository with an opinionated folder structure, managed by Codefresh. 

The Git Source is created and managed as an Argo CD Application. The Git Source application manifest is created in the Runtime's namespace

The Git Source is always associated with one or more GitOps Runtimes. 

The Git Source can store application and configuration manifests 


What is the usage of the Git Source?


## Types of Git Sources
Codefresh allows you to create two types of Git Sources:

Standard Git Source
The Standard Git Source is created in the GitOps Runtime namespace, with the default Application Project. Manifests of Argo CD applications created as part of this Git Source are also deployed to the Runtime's namespace. The defaukt Application Project permits deployments from any Git source repo, to any destination cluster and namespace or namespaces. 

scope and created for a GitOps Runtime in the Runtime's namespace, which is usually???

Restricted Git Source
The Restricted Git Source is created in a namespace that is different from that of the GitOps Runtime. 
While the Restricted Git Source's app manifest is deployed to the Runtime's namespace, manifests of Argo CD applications that are part of this Restricted Git Source are deployed to a namespace that is not the Runtime's namespace. 
The Application Project is the central factor and common denomnator here: the Restructed Git Source will only look at the only trusted Git source repositoroes, and will ony deploy to the explicitly defined destination clusters and namespaces. 
If the Application Project does not include the same , the applications are not deployed.


 are  are permitted Only those applications belonging to the specific Application Project The applications and restricted to specific Application Projects.

The idea behind the Restricted Git Source is that you can restrict the where and the what: the where, by defining the clusters and namespaces allowed for deployment, and the what, by defining the trusted Git repos from which to pull Argo CD Application manifests.
This feature also allows you to control and simplify access to applications by different teams .  


The diagram illustrates how 

The table provides a comparison of the two types of Git Sources.

{: .table .table-bordered .table-hover}
| Aspect            | Default Git Source | Restricted Git Source |
|-------------------|---------------------|------------------------|
| Application Project | Default                    | Explicitlyy amed  |
| Namespace            | GitOps Runtime namespace   | User-defined namespace               |
| Application deployment  | Any cluster and any namespace     | Only defined clusters and namespaces |
| Application resources  | From any Git repo     | From only allowed Git repos |





## Git Sources and applications
On creating an application, before you can you commit the application manifest, you need to select the GitOps Runtime and the Git Source to which to commit it.

Commiting an applciation to a Git Source?
* The application's manifest is stored in the Git Source repository, in /apps, and changes are reconciled here .  
* The application is rendered in the GitOps Apps dashboard with the Git Source as its parent application.

If the application is not part of a Git Source:
Parent applications The application hierarchy if  not be correctly rendered in teh GitOPs dashboard.
You cannot modify application definitions or delete the application in the Codefresh UI. The UI displays that "the Git Source is not available

### Create Git Source declaratively


## Git Source settings

{: .table .table-bordered .table-hover}
| Setting            | Description      |
|-------------------|----------------------|
| **Name**| The name of the Git Source, which must be unique within the cluster. The syntax must conform to Kubernetes |
| **Type**| The type of Git Source to create. {::nomarkdown}<ul><li><b>Standard Git Source</b>: The Git Source is created as an Argo CD Application in the Runtime's namespace and belongs to the default Appplication Project without deployment and repo restrictions.</li><li><b>Restricted Git Source</b>: The Git Source is created as an Argo CD application in the named namespace (not the Runtime's), and belongs to a specific Application Projectwithin the repo in which to create the Git Source application.</li></ul>{::}|
| **Source**| The Git repo where the Git Source application manifest is created, and the source for all the Argo CD application maniftestts that belongedsynced to the destination cluster.{::nomarkdown}<ul><li><b>Repository</b>: Mandatory. The URL of the Git repo.</li><li><b>Branch</b>: Optional. The specific branch within the repo in which to create the Git Source application.</li><li><b>Path</b>: Optional. The specific path within the repo, and branch if one is specified, in which to create the Git Source application.</li></ul>{::}|
| **Include Files** and **Exclude Files** |The file or files to include or exclude from the Git repo when syncing to the destination cluster.  
    <br>Use GLOB to define patterns using wildcards to match path names in the source Git repo. <br><br>For example, `workflows/**/*.yaml`, in the Include Files field would include all files in the `workflows` directory and all its child directories, with `.yaml` as the extension. <br><br>`**/images/**/*` in the Exclude Files field, would ignore all directories entitled `images`. <br>For GLOB guidelines and examples, see this [article](https://deepsource.io/blog/glob-file-patterns/){:target="\_blank"}.
|**Namespace** | Applies to Restricted Git Sources only. <br>The namespace to which the source code of applications committed to this Git Source.|
| Application Project Scope | Applies to Restricted Git Sources only. <br>The destination clusters and namespaces to which the applications belonging to this Application Project can be deployed, and the  : restrict what may be deployed (trusted Git source repositories) restrict where apps may be deployed to (destination clusters and namespaces)
The cluster, namespaces, and the Git repos to which applications in the Application Project can be deployed.{::nomarkdown}<ul><li><b>Allowed clusters and namespaces</b>: Single or multiple pairs of clusters and namespaces to which applications in this Application Project can be deployed.<br>For example, specifying a cluster codefresh-production/cluster and namespace production will deploy the applications only to the defined cluster and namespace.<br>De and namesor multiple pairs of cluster . The URL of the Git repo.</li><li><b>Branch</b>: Optional. The specific branch within the repo in which to create the Git Source application.</li><li><b>Path</b>: Optional. The specific path within the repo, and branch if one is specified, in which to create the Git Source application.</li></ul>{::}| or pairs, and the Git repos to which it is permitted to deply applications within the Application Project.<br>For example, clusters in which to store the application manifests committed to this Git Source.|


## Example: Default Git Source

## Example: Restricted Git Source

## View Git Sources and settings
Drill down on a GitOps Runtime in List View to see its Git Sources. 

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

## Create a Git Source
Create Default or Restricted Git Sources for any provisioned GitOps Runtime.  You can then commit maninifests of the GitOps Applications to any of these Git Sources. 

>Make sure you are in the List View to create Git Sources. 

**Before you begin**  
* Familiarize yourself with the settings for Git Sources

**How to**

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes**){:target="\_blank"}.
1. In the List View, select the Runtime for which to create a Git Source, and then click the **Git Sources** tab.  
1. Click **Create Git Source**, and in the Create Git Source panel, follow the instructions to define the settings for the Git Source.  

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

## Edit Git Source definitions
Edit an existing Git Source by changing the source and destination definitions, and included/excluded files.  
> You cannot change the name of the Git Source.

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



## Related articles
[Monitoring & managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)  


