---
title: "Release Notes: July 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### Pipelines: RBAC for Pipeline Runtimes
We have further strengthened security for pipelines with RBAC permissions for Pipeline Runtimes.  
RBAC for Pipeline Runtimes enhances the permissions system with granular access control not just for Pipeline Runtimes, but also for runtime environments and resources within pipelines.  



##### Key benefits
* Granular control over runtimes  
  Precisely manage access to runtime environments. For example, restrict access to production environments to safeguard production resources, or grant exclusive access to high-performance runtime environments for high-priority projects, ensuring they have the necessary resources.
* Optimized resource management for runtimes  
  Optimize performance without admin intervention by allowing teams to adjust CPU and memory settings for pipeline builds.
* Optimized cloud builds  
  Optimize performance for cloud builds by enabling teams to set cloud builds and select the appropriate resource sizes for the build.

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

For details, see [Assign tags to Pipeline Runtimes]({{site.baseurl}}/docs/administration/account-user-management/access-control-pipelines/#assign-tags-to-pipeline-runtimes) and [Creating rules for Pipeline Runtimes and runtime environments]({{site.baseurl}}/docs/administration/account-user-management/access-control-pipelines/#creating-rules-for-pipeline-runtimes-and-runtime-environments).

### GitOps: Runtime upgrade

The Open Source ArgoCD project published a high-severity security vulnerability. We recommend upgrading your GitOps Runtime to version 0.9.0, which includes a fix for this issue, along with other fixes and features.

This CVE affects webhook processing and is relevant only to customers who have configured webhooks.

To upgrade to the latest release, follow the on-screen instructions to run `helm upgrade`.




### GitOps: Application menu enhancements in Environments & Products

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


### Usability enhancements

#### General: Seamless redirection for shared links 
We implemented a small but significant improvement to your Codefresh experience. 

Now, when you try to access a shared link while not logged into the platform, you will be automatically redirected to the URL you entered after logging in, instead of being taken to the default Home dashboard view.


#### Pipelines: Project name in breadcrumbs in Builds page
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


## Bug fixes

##### General
* Download Audit downloads empty CSV file. 
* Invite text in Welcome screen displays `undefined` instead of the organization name. 

##### Pipelines 
* `Failed to write template value file Arguments to filesystem` error for builds with `codefresh-run` step.
* `Failed - build runtime settings not configured` error for Hybrid Runner.
* `build` step does not support images from different account for Amazon ECR (Elastic Container Registry).


##### GitOps 
* Annotations added during a build run or via CLI not displayed in the Summary tab of the Images dashboard. 
* Secrets store integration breaks after upgrading `dind` to version 26.1.4-1.28.7.
* Current Release not displayed for multi-sourced apps. 
* Sync statuses for applications within ApplicationSets not correctly displayed in Codefresh UI. 
* Unresponsive **Close** button in Rollout drawer. 