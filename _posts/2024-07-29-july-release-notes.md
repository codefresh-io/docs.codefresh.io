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

For details, see [Assign tags to Pipeline Runtimes]({{site.baseurl}}/docs/administration/account-user-management/access-control/#assign-tags-to-pipeline-runtimes) and [Creating rules for Pipeline Runtimes and runtime environments]({{site.baseurl}}/docs/administration/account-user-management/access-control/#creating-rules-for-pipeline-runtimes-and-runtime-environments).

### GitOps: Runtime upgrade

The Open Source ArgoCD project published a high-severity security vulnerability. We recommend upgrading your GitOps Runtime to version 0.9.0, which includes a fix for this issue, along with other small fixes and features.

This CVE affects webhook processing and is relevant only to customers who have configured webhooks.

To upgrade to the latest release, follow the on-screen instructions to run `helm upgrade`.


### GitOps: External links for Kubernetes app & ingress resources (probably not in this release)
The Current State tab in our GitOps Apps dashboard is the central location to view and manage all the resources in your applications. We are always looking to enhance productivity and here's the 
newest functionality: external Links for application and ingress resources! 

##### External links to app resources
External links are user-defined URLs in Argo CD that can point to any external resource such as monitoring pages or documentation. These links, added through annotations in resources, are automatically rendered in Codefresh.    
Now you can add external links to your resources in _directly in Codefresh_. Once added, a clickable link icon is displayed next to the resource in the Tree view for easy and smooth navigation. 

{% include
image.html
lightbox="true"
file="/images/whats-new/july24/rel-notes-july-24-resource-ext-link.png"
url="/images/whats-new/july24/rel-notes-july-24-resource-ext-link.png"
alt="External link for resource in Current State Tree view"
caption="External link for resource in Current State Tree view"
max-width="60%"
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
max-width="60%"
%}

For details, see ????


### GitOps: Application menu enhancements in Environments & Products

We’ve restructured and redesigned the context menu for applications in the Environments and Products dashboards for streamlined navigation and quicker access to the information you need!

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



### Docs: Brand-new search mechanism and experience (probably not in this release)
We’re excited to introduce the revamped search mechanism for our doc site!

Wherever you are in Codefresh, open search from the toolbar, either from Global Search & Navigation by typing help or by clicking the Help icon.
You’ll get a curated list of articles that are context-sensitive to your location in the UI to kick-start your search.

To provide even more relevant results, we have also integrated AI with the free-text search.  
Additionally, we have integrated our collection of blog posts from our experts for an enriched information experience. 

{% include
image.html
lightbox="true"
file="/images/whats-new/july24/rel-notes-july-24-search-context-sensitive.png"
url="/images/whats-new/july24/rel-notes-july-24-search-context-sensitive.png"
alt="Curated location-specific search results"
caption="Curated location-specific search results"
max-width="60%"
%}

Here are more reasons to try the new search:
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
* Builds with `codefresh-run` step fails with error `Failed to write template value file Arguments to filesystem`. (Noam 24734 )
builds fails - build runtime settings are not configured (Kim - 24191)
* `build` step does not work with cross-account ECR. (Kim - 19269)


##### GitOps 
* Annotations added during a build run or via CLI not displayed in the Summary tab of the Images dashboard. 
* Secret store integrations broken after upgrade to Helm version 6.3.37. (Zhenya 24332)
* Current Release not displayed for multi-sourced apps. 
* Sync statuses for applications within ApplicationSets not correctly displayed in Codefresh UI. 
* Unresponsive **Close** button in Rollout drawer. 