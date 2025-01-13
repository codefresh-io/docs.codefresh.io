---
title: "Release Notes: December 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

As we share this month's update, we want you to know that we're hard at work on several new features and improvements to make your experience even better. Stay tuned!

### GitOps: Display full name for applications

Here's a usability enhancement that's sure to resonate: display full name of resources in the Current State tab of the GitOps Apps dashboard.

If you have naming conventions that result in long names for applications or resources, easily toggle between displaying the full or truncated name with a handy button in the toolbar.

{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-show-full-app-name.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-show-full-app-name.png" 
   alt="Show Full Name toggle in Current State tab" 
   caption="Show Full Name toggle in Current State tab" 
   max-width="80%" 
   %}


## Bug fixes



##### Pipelines 

* `504 timeout error` on uploading test report to Google Storage Cloud (GSC).
* Docker Compose files using Version 3 not supported for service containers in pipelines.

##### GitOps
* New clusters added to Runtime not displayed in **Runtimes > Managed Clusters** tab.
* `failed to retrieve application version, app name: <"app_name>": unknown key appVersion` error when application versioning is not configured.
* Application validations use destination cluster instead of application cluster.
* `Application includes circular dependencies...` warning in GitOps Apps dashboard when the names of applications and application sets are identical.







