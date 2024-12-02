---
title: "Release Notes: November 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### General: Annotate image by name via CLI
Now using the CLI, you can annotate your images also by their names, instead of only the image SHA.


You can easily find and copy the image name from the Images dashboard.

{% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/nov24/image-name-images-dashboard.png" 
   url="/images/whats-new/nov24/image-name-images-dashboard.png" 
   alt="Copy image name from Images dashboard" 
   caption="Copy image name from Images dashboard" 
   max-width="60%" 
   %}


Here's an example of the CLI command:
`codefresh annotate image docker.io/codefresh-io/cli:latest -l coverage=75% -l tests_passed=true`

To use this feature, make sure to upgrade to the latest CLI version.


### Pipelines: Octopus Deploy integration
We're excited to announce the first set of official Codefresh steps for Octopus Deploy! 
With these steps, you can streamline your pipeline and integrate your Codefresh builds with deployments in Octopus Deploy. 

Explore these steps in the [Codefresh steps marketplace](https://codefresh.io/steps){:target="\_blank"}:
* Log in to Octopus Deploy
* Push packages to Octopus Deploy
* Create releases in Octopus Deploy
* Deploy a release in Octopus Deploy
* Deploy a tenanted release in Octopus Deploy
* Run a runbook in Octopus Deploy
* Push build information to Octopus Deploy

For details, see [Octopus Deploy pipeline integration]({{site.baseurl}}/docs/integrations/octopus-deploy/).




### GitOps: Reporting for multi-architecture images
Image reporting is now available for multi-architecture images.  
On drill down into the image from the Images dashboard, the OS/Arch column displays digests for each OS architecture.




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
* Engine pod logs display values of secret variables.
* Pipelines in debug mode terminated even when there is no active debug session.  
* Container file system changes owner when cached using composition.

##### GitOps
* Multi-arch images not reported in Images dashboard.


