---
title: "Release Notes: October 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### Pipelines:  Expanded support for `buildx qemu` images
For Docker `build` steps, you can specify a `buildx qemu` image from any container registry, allowing users to use self-hosted registries, including Artifactory.  
Previously, with `buildx qemu`, we only supported the default image.


<!--- ##### Multi-architecture images
Image reporting is now available for multi-architecture images.  
On drilldown into the image from the Images dashboard, the OS/Arch column displays digests for each OS architecture.

Mult-arch images are supported from GitOps Runtime v0.1.62 (chart:0.13.4) and higher.


{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-multi-arch-image.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-multi-arch-image.png" 
   alt="Multi-arch image in Images dashboard" 
   caption="Multi-arch image in Images dashboard" 
   max-width="80%" 
   %}
-->

### Pipelines: Consume step outputs in plugins

Plugins in pipelines can now consume outputs directly from previous steps, streamlining data transfer and expanding integration capabilities across your pipeline stages.

```yaml
...
  plugin_consume:
    title: consume var in plugin step
    type: codefresh/consume-variable
    arguments:
      output_variable: '${{steps.output_variable.output.EXPORTED}}'
...
```
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

### GitOps: Display full name for applications

Here's a usability enhancement that's sure to resonate: display full name of applications in the Current State tab of the GitOps Apps dashboard.

If you have naming conventions that result in long application names, easily toggle between displaying the full/truncated application name with a handy button in the 

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

##### General
* Active user gets logged out from account due to inactivity even when session is active.


##### Pipelines 
* Docker `build` steps fail to run when setting `buildx qemu` image to any image that is not the default.
* DIND pod not created when `runtime.dind.env` values are defined. 
* Clicking **Save** does not save new variable in Shared Configuration or triggers.
* Trigger settings not refreshed for selected pipeline when switching between pipelines in Workflows > Triggers.



##### GitOps 
* `failed to retrieve application version, app name: <"app_name>": unknown key appVersion` error when application versioning is not configured.
* Application validations use destination cluster instead of application cluster.
