---
title: "Release Notes: January 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Pipelines: Share build run settings
Our newest enhancement to pipeline build runs is designed to enhance collaboration and productivity! How? Instead of redefining build settings manually, you can effortlessly share pipeline build settings with colleagues who share access to the same account.

**How does it work?**
By sharing settings, you enable colleagues to pre-populate build configurations without the need for redundant manual input. This feature is useful for various scenarios, whether it's testing automation integration with third-party tools or triggering pipelines in specific situations.

**Customizing build settings**
You can override any existing setting - simulate a different trigger, select a different branch, modify existing or add new build variables, and even modify the build behavior.

With a click of the **Share build settings** button, Codefresh generates a unique URL. The URL includes modified and new settings as query parameters. Encrypted variables are excluded to ensure data protection. 

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-share-run-configuration.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-share-run-configuration.png" 
	alt="Share build settings" 
	caption="Share build settings"
  max-width="60%" 
%}

For details, see [Share build run settings]({{site.baseurl}}/docs/pipelines/run-pipeline/#share-build-run-settings).

### Pipelines: Version for typed steps
As you know, Codefresh is continually optimizing our typed step-library in the Marketplace. To prevent breaking changes in typed steps, we will issue a warning when we find typed steps in your pipelines without the version number.

### GitOps: View/download logs for GitOps Runtime components
We're are glad to announce that you can now view and download logs for individual GitOps Runtime components!
Previously available for legacy CLI Runtimes, this functionality is now back for Helm GitOps Runtimes, with online viewing in our terminal and offline downloads as you need.

As a reminder, here's where you can find the **View logs** option:

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-runtime-component-log.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-runtime-component-log.png" 
	alt="View logs for GitOps Runtime components" 
	caption="View logs for GitOps Runtime components"
  max-width="60%" 
%}

For details, see [View/download logs for GitOps Runtime components]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#viewdownload-logs-for-runtime-components).




## Bug fixes

**Pipelines**  
* For Bitbucket Cloud, `codefresh-report-image` step fails with errors to get Pull Requests (PRs) and branches. 
* Builds for Gerrit in Codefresh are triggered twice at random. (CR-20179 Olek)
* Replaced misleading warning message in logs for successful builds: `The security token included in the request is invalid`.
<!--- * Notifications not send for builds triggered by Cron timers. (CR-3927 Franscisco) -->

<br>

**GitOps**  
* Codefresh UI unresponsive when clicking Warnings/Errors button in the **GitOps Apps** dashboard.
* `Failed to create binary image error` from Image reporter for images exceeding 2GB.
* Audit log missing manual actions executed in Rollouts Player.
* Long time for new Argo CD applications to appear in Codefresh GitOps Apps dashboard. (CR-21281 Yarik)
* For GitLab Actions, `codefresh-image-reporter` log displays actual values of encrypted secrets.
* Codefresh UI not in sync with native Argo CD UI. (CR-20811 Yarik)


