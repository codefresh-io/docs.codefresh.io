---
title: "Release Notes: August 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### General: Personalized menus

We have introduced a powerful feature that gives admins even more control over the Codefresh platform: customizable menus!  

Take control of your account's menu items and personalize the interface to create a more user-friendly and productive environment.
Simplify navigation by hiding unnecessary menu items and decluttering the sidebar, ensuring that users can quickly the pages they need.  


We've added a new page to Settings entitled **Modules**. Admins can decide exactly which menu items are displayed in the sidebar for all users in the account. 

##### How it works
We have three main modules for the plaform:
* Continuous Delivery (CD) with GitOps 
* Continuous Integration (CI) with Pipelines 
* Continuous Delivery (CD) with Pipelines 

By default, all modules, submodules, and menu items are enabled. 

Using the toggle method, you can easily customize what's visible: switch to ON to display an item and OFF to hide it. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/administration/sidebar-modules/module-disabled.png" 
   url="/images/administration/sidebar-modules/module-disabled.png" 
   alt="Example of main module toggled OFF" 
   caption="Example of main module toggled OFF" 
   max-width="80%" 
   %}


For even more precise control, you can toggle individual pages on or off.

   {% include 
   image.html 
   lightbox="true" 
   file="/images/administration/sidebar-modules/customized-menu-list.png" 
   url="/images/administration/sidebar-modules/customized-menu-list.png" 
   alt="Example of customized sidebar with pipeline menu items" 
   caption="Example of customized sidebar with pipeline menu items"
   max-width="80%" 
   %}

Admins can always view all hidden items in the sidebar by toggling the **Show in sidebar option...** to ON.

Start streamlining your team's experience today!





### General: Brand-new search mechanism and experience 
We’re excited to introduce the revamped search mechanism for our doc site!

Wherever you are in Codefresh and open search from the toolbar, either from Global Search & Navigation by typing `help` or by clicking the Help icon, 
you’ll get a curated list of articles that are context-sensitive to your location in the UI to kick-start your search.

To provide even more relevant results, we have also integrated AI with the free-text search.  
Additionally, for an enriched information experience, we have integrated our collection of blog posts from our experts. 

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

### Pipelines: Dedicated environment variables for pull request titles

We’ve made a change to how pull request titles are handled by environment variables in pipelines.

The environment variables `${{CF_COMMIT_MESSAGE}}` and `${{CF_COMMIT_MESSAGE_ESCAPED}}` now return the commit message instead of the pull request title.

To get the pull request title, use the new environment variables:
* `${{CF_PULL_REQUEST_TITLE}}`
* `${{CF_PULL_REQUEST_TITLE_ESCAPED}}`

To use the new variables for pull request titles, update your pipelines accordingly.  As they are already supported by the system, you can begin using them immediately.

For details, see [System variables]({{site.baseurl}}/docs/pipelines/variables/#system-variables).


### GitOps: External links for Kubernetes app & ingress resources 
The Current State tab in our GitOps Apps dashboard is the central location to view and manage all the resources in your applications. We are always looking to enhance productivity, and here are the newest features we support: external Links for application and ingress resources! 

##### External links to app resources
External links are user-defined URLs for Kubernetes resources in Argo CD that can point to any external resource such as monitoring pages or documentation. These links, added through annotations in resources, are also rendered in Codefresh, for smooth and easy navigation.    

A Kubernetes resource with external links shows a clickable link icon below the resource's context menu, from which you can navigate to the   next to the resource in the Tree view for easy and smooth navigation. 

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















## Bug fixes

##### General 
* Invite text in Welcome screen displays `undefined` instead of the organization name. 

##### Pipelines 
* Expired certificates causes builds to remain in Pending status.
* Pipeline with two triggers starts two builds on commits to the same file/folder instead of one build.
* Pull request push commit trigger for Bitbucket server not supported. 
* `build` step does not work with cross-account ECR. 


##### GitOps 
<!--- * `fullnameOverride` when set in Argo CD Helm chart results in failure to reach service. (CR-cr-25000 Ilya)-->
* Audit log does not show changes made to GitOps permissions. 
* Manual Rollout actions not available in audit log.
* GitOps permissions do not function correctly when attributes are applied.
