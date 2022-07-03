---
title: "Add and manage Git Sources"
description: ""
group: runtime
toc: true
---


A Git Source is the equivalent of an Argo CD application that tracks a Git repository and syncs the desired state of the repo to the destination K8s cluster. In addition to application resources, the Git Source can store resources for Codefresh runtimes, and CI/CD entities such as delivery pipelines, Workflow Templates, workflows, and applications.  
  
Provisioning a runtime automatically creates a Git Source that stores resources for the runtime and for the demo CI pipelines that are optionally installed with the runtime. Every Git Source is associated with a Codefresh runtime. A runtime can have one or more Git Sources. You can add Git Sources at any time, to the same or to different runtimes.  

Once you create a Git Source for a runtime, you can store resources for CI/CD entities associated with that runtime. For example, when creating pipelines or applications, you can select the Git Source to which to store manifest definitions.


### View Git Sources and definitions
Drill down on a runtime in List View to see its Git Sources. 

1. In the Codefresh UI, go to the [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page.
1. From the **List View** (the default), select a runtime name, and then select the **Git Sources** tab.  

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/git-source-list.png" 
	url="/images/runtime/git-source-list.png" 
	alt="Git Sources in runtime" 
	caption="Git Sources in runtime"
    max-width="30%" 
%}

{:start="3"}
1. To go to the repo tracked by the Git Source, in the Repo column, mouse over the repo name and select **Go to Git repo**.
1. To see the definitions for the Git Source, select the three dots at the end of the row.

### Create a Git Source
Create Git Sources for any provisioned runtime.  The Git Sources will be available to store resources for pipelines or applications when you create them. 

>Make sure you are in the List View to create Git Sources. 

1. In the Codefresh UI, go to the [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes**){:target="\_blank"} page.
1. In the List View, select the runtime for which to add a Git Source, and then select the **Git Sources** tab.  
1. Select **Create Git Sources**, and in the Create Git Source panel, define the definitions for the Git Source: 

     {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/create-git-source.png" 
	url="/images/runtime/create-git-source.png" 
	alt="Create Git Source" 
	caption="Create Git Source"
    max-width="30%" 
%}

  * **Git Source Name**: The name of the Git Source, which must be unique within the cluster.
  * **Source**: The Git repo with the desired state, tracked by the Git Source, and synced to the destination cluster.  
    * **Repository**: Mandatory. The URL to the Git repo.  
    * **Branch**: Optional. The specific branch within the repo to track.  
    * **Path**: Optional. The specific path within the repo, and branch, if one is specified, to track.  
  * **Destination**: The destination cluster with the actual state to which to apply the changes from the **Source**.  
    * **Namespace**: The namespace in the destination cluster to which to sync the changes.  

  * **Include Files** and **Exclude Files**: The file or files to include or exclude from the Git repo when syncing to the destination cluster.  
    Use GLOB to define patterns using wildcards to match path names in the source Git repo.  
	For example, `workflows/**/*.yaml`, in the Include Files field would include all files in the `workflows` directory and all its child directories, with `.yaml` as the extension.  
    `**/images/**/*` in the Exclude Files field, would ignore all directories entitled `images`.  
	For GLOB guidelines and examples, see this [article](https://deepsource.io/blog/glob-file-patterns/){:target="\_blank"}.

{:start="4"}
1. Select **+ Create Git Source**.

### Edit Git Source definitions
Edit an existing Git Source by changing the source and destination definitions.  
> You cannot change the name of the Git Source.

1. In the Codefresh UI, go to the [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes**){:target="\_blank"} page.
1. From the **List View** (the default), select the runtime with the Git Source, and then select the **Git Sources** tab.  
1. In the row with the Git Source to edit, select the three dots, and then select **Edit** in the panel that appears.

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
1. Change the **Source** and **Destination** definitions for the Git Source, and select **Save**. 

### What to read next
[Manage runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)
[Recover runtimes]({{site.baseurl}}/docs/runtime/runtime-recovery/)

