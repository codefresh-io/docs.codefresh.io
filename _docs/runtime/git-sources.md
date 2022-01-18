---
title: "Git Source management"
description: ""
group: runtime
toc: true
---

A Git Source in CSDP links to a Git repository that stores resources for pipelines. CSDP uses Git Sources to sync Argo Workflow and Argo Events resources to the cluster. A single runtime can have multiple Git Sources.

When you provision a Codefresh runtime, a default Git Source is automatically created. This Git Source houses the Argo Event resources such as Workflow Templates, Event Sources, and Sensors. 


### View Git Sources
Git Sources are displayed when you drill down on a runtime. 

1. Go to **Runtimes**.
1. Click a runtime name, and then select the **Git Sources** tab.  

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
1. To go to the repo linked to the Git Source, click the link in the Repo column.

### Create a new Git Source
1. Drill down into the runtime for which to add a Git Source, and select Git Sources.
1. Select **+Create Git Source**.  

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/create-git-source.png" 
	url="/images/runtime/create-git-source.png" 
	alt="Create Git Source" 
	caption="Create Git Source"
    max-width="30%" 
%}

{:start="3"}
1. If you have already installed the Codefresh CLI, select **I already have...**, and continue with Git Source creation in the lower part of the panel.
  >If you created a new GitOps repo for the Git Source, make sure that the Git token has a valid expiration date, `scopes` (`repo` and `admin-repo.hook`), with `base64` encoding.  

### What to read next
[Manage runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)
