---
title: "Add Git Sources to GitOps Runtimes"
description: "Manage Git Sources storing resources"
group: installation
toc: true
---


A Git Source is the equivalent of an Argo CD application that tracks a Git repository and syncs the desired state of the repo to the destination K8s cluster. In addition to application resources, the Git Source can store resources for GitOps Runtimes, and CI/CD entities such as delivery pipelines, Workflow Templates, workflows, and applications.

Provisioning a GitOps Runtime automatically creates a Git Source that stores resources for the Runtime and for the demo CI pipelines that are optionally installed with the Runtime. Every Git Source is associated with a GitOps Runtime. You can add more Git Sources at any time, to the same or to different Runtimes.

Once you create a Git Source for a GitOps Runtime, you can store resources for CI/CD entities associated with it. For example, when creating pipelines or applications, you can select the Git Source to which to store manifest definitions.


## View Git Sources and definitions
Drill down on a runtime in List View to see its Git Sources. 

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
1. To go to the repo tracked by the Git Source, in the Repo column, mouse over the repo name and select **Go to Git repo**.
1. To see the definitions for the Git Source, select the three dots at the end of the row.

## Create a Git Source
Create Git Sources for any provisioned Runtime.  The Git Sources are available to store resources for pipelines or applications when you create them. 

>Make sure you are in the List View to create Git Sources. 

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes**){:target="\_blank"}.
1. In the List View, select the Runtime for which to add a Git Source, and then click the **Git Sources** tab.  
1. Click **Create Git Sources**, and in the Create Git Source panel, define the definitions for the Git Source: 

     {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/create-git-source.png" 
	url="/images/runtime/create-git-source.png" 
	alt="Create Git Source" 
	caption="Create Git Source"
    max-width="60%" 
%}

  * **Git Source Name**: The name of the Git Source, which must be unique within the cluster.
  * **Source**: The Git repo with the desired state, tracked by the Git Source, and synced to the destination cluster.  
    * **Repository**: Mandatory. The URL to the Git repo.  
    * **Branch**: Optional. The specific branch within the repo to track.  
    * **Path**: Optional. The specific path within the repo, and branch if one is specified, to track.  
  * **Destination**: The destination cluster with the actual state to which to apply the changes from the **Source**.  
    * **Namespace**: The namespace in the destination cluster to which to sync the changes.  

  * **Include Files** and **Exclude Files**: The file or files to include or exclude from the Git repo when syncing to the destination cluster.  
    Use GLOB to define patterns using wildcards to match path names in the source Git repo.  
	For example, `workflows/**/*.yaml`, in the Include Files field would include all files in the `workflows` directory and all its child directories, with `.yaml` as the extension.  
    `**/images/**/*` in the Exclude Files field, would ignore all directories entitled `images`.  
	For GLOB guidelines and examples, see this [article](https://deepsource.io/blog/glob-file-patterns/){:target="\_blank"}.

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
[Shared configuration repo]({{site.baseurl}}/docs/installation/gitops/shared-configuration)  


