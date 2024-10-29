---
title: "Release Notes: October 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### GitOps: Enhanced visibility and control for Runtimes

We have improved the usability and monitoring of GitOps Runtimes by converting them into applications. Now, you can view GitOps Runtimes and their resources directly in the Current State tab of the GitOps Apps dashboard, with access to all familiar dashboard functionality for intuitive monitoring and streamlined management.

##### What does this mean?
In the Runtime's context menu (List View), you'll find links to these Runtime applications:
* Hosted & Hybrid GitOps Runtimes configured as Argo CD applications
* Hybrid GitOps Runtimes:
    * Runtime Shared Configuration Repo (ISC) resources 
    * Runtime resources in local (in-cluster) environment

{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-runtimes-as-apps.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-runtimes-as-apps.png" 
   alt="Links to Runtimes applications" 
   caption="Links to Runtime applications" 
   max-width="80%" 
   %}

Clicking a link takes you to **GitOps Apps > Current State** tab for the application.


{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-runtime-app-apps-dashboard.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-runtime-app-apps-dashboard.png" 
   alt="Example of Runtime application in GitOps Apps > Current State" 
   caption="Example of Runtime application in GitOps Apps > Current State" 
   max-width="80%" 
   %}


## Bug fixes

##### General
* Active user gets logged out from account due to inactivity even when session is active.


##### Pipelines 
* Docker `build` steps fail to run when setting `buildx qemu` image to any image that is not the default.
* DIND pod not created when `runtime.dind.env` values are defined. 
* Clicking **Save** does not save new variable in Shared Configuration or triggers.
* Trigger settings not refreshed for selected pipeline when switching between pipelines in Workflows > Triggers.



##### GitOps 
* TBD