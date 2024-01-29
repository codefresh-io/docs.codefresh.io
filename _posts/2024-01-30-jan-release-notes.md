---
title: "Release Notes: January 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements


### Pipelines: Share build run settings
Our newest enhancement to pipeline builds is designed to increase collaboration and productivity! How? Instead of redefining build settings manually, you can effortlessly share pipeline build settings with colleagues who have access to the same account.

**How does it work?**
By sharing build settings, you enable colleagues to pre-populate build configurations without the need for redundant manual input. This feature is useful for various scenarios, whether it's for testing automation integration with third-party tools or triggering pipelines in specific situations.

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
As you're aware, Codefresh consistently enhances our typed step library in the Marketplace.

When typed steps in pipelines lack a specified version, Codefresh automatically associates them with the latest version of the step. To avoid potential issues with breaking changes in typed steps, we now provide a warning if there are steps in your pipelines without an explicit version number.

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-typed-step-warning.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-typed-step-warning.png" 
	alt="Warning for typed steps without version numbers" 
	caption="Warning for typed steps without version numbers"
  max-width="60%" 
%}

For details, see [Versioning in typed steps]({{site.baseurl}}/docs/pipelines/steps/#versioning-for-typed-steps).

### GitOps: View/download logs for GitOps Runtime components
We are glad to announce that you can now view and download logs for individual GitOps Runtime components!
Previously available for legacy CLI Runtimes, this functionality is now back for Helm GitOps Runtimes, with online viewing in our smart terminal and offline downloads as you need.

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

<!--- ## GitOps: Argo Events upgrade
We've recently upgraded Argo Events to its latest version, v1.9.0, ensuring you can leverage all enhancements. For detailed information about the changes in this version, please refer to the [Argo documentation](https://github.com/argoproj/argo-events/releases).

Please be aware that this upgrade may introduce a potential breaking change for existing event sources that have defined `githubBaseUrl` without defining `githubUploadURL` which is required. In such cases, event sources will fail to sync, and the Git Source application will return a `..githubUploadURL is required when githubBaseURL is set` error.

To address this, you'll need to edit the event source YAMLs and add `githubUploadURL` where required.
 -->

## Bug fixes

**Pipelines**  
* For Bitbucket Cloud, `codefresh-report-image` step fails with errors to get Pull Requests (PRs) and branches. (CR-22200 vadim)
* Builds for Gerrit in Codefresh are triggered twice at random. (CR-20179 Olek)
* Replaced misleading warning message "The security token included in the request is invalid" for successful builds. (CR-18186 kim)

<!--- * Notifications not send for builds triggered by Cron timers. (CR-3927 Franscisco) -->

<br>

**GitOps**  

* Codefresh UI unresponsive when clicking Warnings/Errors button in the **GitOps Apps** dashboard.
* `Failed to create binary image error` from Image reporter for images exceeding 2GB.
* Audit log missing manual actions executed in Rollouts Player.
* Long time for new Argo CD applications to appear in Codefresh GitOps Apps dashboard. (CR-21281 Yarik)
* For GitLab Actions, `codefresh-image-reporter` log displays actual values of encrypted secrets.
* Codefresh UI not in sync with native Argo CD UI. (CR-20811 Yarik)


