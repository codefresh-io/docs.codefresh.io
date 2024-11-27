---
title: "Release Notes: November 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements


### Pipelines: Octopus Deploy integration
We're excited to announce the first set of official Codefresh steps for Octopus Deploy! 
With steps you can streamline your pipeline and integrate your Codefresh builds with deployments in Octopus Deploy. 

Explore these steps in the [Codefresh steps marketplace](https://codefresh.io/steps){:target="\_blank"}:
* Log in to Octopus Deploy
* Push packages to Octopus Deploy
* Create releases in Octopus Deploy
* Deploy a release in Octopus Deploy
* Deploy a tenanted release in Octopus Deploy
* Run a runbook in Octopus Deploy
* Push build information to Octopus Deploy

For details, see [Octopus Deploy pipeline integration]({{site.baseurl}}/docs/integrations/octopus-deploy/).


### Pipelines: Trusted QEMU images in build steps
We have added a requirement to QEMU images in build steps. To add a QEMU image that is not default, you need to first add these images as trusted images. 
You can then define any one of these images in the build step.

To add one or more trusted images, simply update the `values.yaml` file with the full image name under `runtime.engine.env.TRUSTED_QEMU_IMAGES`.

For details, see [Defining trusted QEMU images]({{site.baseurl}}/docs/pipelines/steps/build/#defining-trusted-qemu-images).


<!--- 
### Pipelines: Revamped variable 

Variables in pipelines are one of the most pouplar and useful fetures we have for our pipelines.

We have redeigned the feature to make it more  the entire feature with a view to usbility and functionality


All the options are now clearly visible and 

Clicking Add immediatelyt opnes the bix
Renabled Import from text to Add multiple variables to better indicate the purpose of the option

-->


### GitOps: Reporting for multi-architecture images
Image reporting is now available for multi-architecture images.  
On drilldown into the image from the Images dashboard, the OS/Arch column displays digests for each OS architecture.




{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/oct24/rel-notes-oct-24-multi-arch-image.png" 
   url="/images/whats-new/oct24/rel-notes-oct-24-multi-arch-image.png" 
   alt="Multi-arch image in Images dashboard" 
   caption="Multi-arch image in Images dashboard" 
   max-width="80%" 
   %}


<!---
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
-->

## Bug fixes

##### General
* Active user gets logged out from account due to inactivity even when session is active.


##### Pipelines 
* Values of secret variables displayed in engine pod logs.
* Pipelines in debug mode are terminated after 15 minutes even when no active debug session was initiated. Andrii https://codefresh-io.atlassian.net/browse/CR-25331
* Container file system changes owner when cached using composition.

##### GitOps
* Multi-arch images not reported in Images dashboard.


