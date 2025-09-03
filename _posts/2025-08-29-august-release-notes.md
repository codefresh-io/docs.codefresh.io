---
title: "Release Notes: August 2025"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements
### GitOps Cloud: Enhanced GitOps App Breadcrumbs
We're excited to announce a major enhancement to the GitOps App breadcrumbs, designed to streamline your navigation and provide more insightful context. This update is a huge step toward making your workflow more intuitive and efficient.
* **Direct Runtime navigation**: We added the **Runtime name** directly to your breadcrumb trail. A simple click on the Runtime name will take you to the main applications page, automatically filtered to display only the apps associated with that specific runtime.
* **Visual clarity with new icons**: To help you better understand your application's hierarchy at a glance, we introduced new icons for each breadcrumb component:
* A unique icon for the **Runtime Name**.
* A distinct icon for the **GitSource**, showing you where the application manifest is defined.
* A helpful icon for the **ApplicationSet**, if your application uses one.
* A clear icon for the **Application Name** itself.
These improvements provide a more visually organized and functional navigation system, helping you manage your GitOps applications with greater speed and clarity.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/aug25/new-navigation.png" 
   url="/images/whats-new/aug25/new-navigation.png" 
   alt="New navigation breadcrumbs" 
   caption="New navigation breadcrumbs" 
   max-width="60%" 
   %}
{% if page.collection == "posts" %}

### Pipelines: Classic Runner 8.0 Release – Breaking Changes

On July 17, 2025, we released [Classic Runner version 8.0](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime/8.2.0#to-8-2-x){:target=”\_blank”} (based on Docker v28) for our hybrid customers. This release introduces breaking changes and requires action before upgrading.


**For Hybrid Customers**
If you have not yet upgraded, you have 2 options:


**Option 1**: Use the Modern Helm-Based Runner Installer
* Breaking change: Support for legacy Docker images ([manifest schema v2, schema 1](https://docs.docker.com/engine/deprecated/?utm_source=beamer&utm_medium=sidebar&utm_campaign=Hybrid-Customers-Classic-Runner-80-Is-Here-Action-Required&utm_content=textlink#pushing-and-pulling-with-image-manifest-v2-schema-1){:target=”\_blank”}) has been removed. Pipelines that build or pull these images will fail after upgrade.
* What to do:
*Identify and update deprecated images using our [migration guide](https://codefresh.io/docs/docs/kb/articles/upgrade-deprecated-docker-images/?utm_source=beamer&utm_medium=sidebar&utm_campaign=Hybrid-Customers-Classic-Runner-80-Is-Here-Action-Required&utm_content=textlink){:target=”\_blank”} in [GitHub](https://github.com/codefresh-io/venona/tree/main/charts/cf-runtime#migrating-from-cli-based-installation-to-helm-chart){:target=”\_blank”}.
*Upgrade to Runner 8.0 via the Helm-based installer.
**Option 2**: Continue with the Legacy CLI-Based Runner Installer
* The legacy installer is now deprecated. You will no longer receive upgrades, updates, or security patches. It will remain locked to the last version based on Docker v26.
*What to do:
* We strongly recommend [migrating to the Helm-based installer](https://codefresh.io/docs/docs/installation/runner/install-codefresh-runner/){:target=”\_blank”}.
* This lets you upgrade to Runner 8.0 and continue receiving updates and security patches.

**For SaaS & On-Prem Customers**
* SaaS: We automatically upgraded all SaaS environments to the new runner on **August 17, 2025**.
* On-Prem: Support for Runner 8.0 will be included in On-Prem release 2.9 (due **September 30, 2025**).


### Pipelines: New Security Enhancement: Prevent Unauthorized Changes to ABAC Tags
 
We heard your feedback about accidental changes to tags used in ABAC permission rules, and we’ve addressed this. Until now, users could modify or delete these tags without warning, which risked breaking access controls and unintentionally exposing resources.

With this update, whenever a user tries to edit or remove a tag linked to an ABAC rule, a clear warning message will appear. This helps prevent mistakes that could compromise security or block authorized users.

We’re continuing to explore improvements that make ABAC easier to manage while keeping security controls strong.

**Key benefits**
* Prevents accidental changes to security-critical tags  
* Clear warnings to avoid breaking ABAC rules 
* Stronger protection of your access controls

This enhancement gives teams greater peace of mind, ensuring that access policies remain secure without slowing down development.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/aug25/abac-warning.png" 
   url="/images/whats-new/aug25/abac-warning.png" 
   alt="New ABAC warning" 
   caption="New ABAC warning" 
   max-width="60%" 
   %}
{% endif %}

## Bug fixes
##### General
* Fixed an issue where Quick Search (CMD + K) did not return any GitOps-related items, including applications. Users can now search and access GitOps items directly through Quick Search as expected.
{% if page.collection == "posts" %}
##### Pipelines
* Fixed an issue that caused timeouts when loading UI pages for pipelines with a large number of triggers.
* Fixed an issue where MacOS builds failed with an 'Unauthorized' error when provisioning the runtime, preventing customers from running MacOS builds successfully.
* Fixed an issue where builds intermittently failed with a 'Failed to prepare dockerfile' error, preventing the Dockerfile from being fetched correctly during the build process.
* Fixed an issue where SaaS builds failed due to insufficient disk space by re-enabling cleanup processes.

##### GitOps
{% endif %}
* Fixed an issue where applications nested more than three layers deep were not displayed in the UI tree view. The full application hierarchy now appears correctly in the tree view.
