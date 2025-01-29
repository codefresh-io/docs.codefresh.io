---
title: "Release Notes: January 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Pipelines: Empty variables 
We are happy to announce a highly-requested feature: the ability to use _empty variables_ in Codefresh pipelines.  
Now, you can add variables without any values to entities in Codefresh, whether it's a project, pipeline, or trigger. The enhancement unlocks a myriad of possibilities that were previously unavailable. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-empty-variables.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-empty-variables.png" 
	alt="Empty variables in a Codefresh project" 
	caption="Empty variables in a Codefresh project"
  max-width="60%" 
%}


Remember that encryption is not supported for empty variables. The priority for variable overrides remains unchanged. 

For details, see [User-defined variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/#user-defined-variables).

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
  max-width="40%" 
%}

For details, see [Share build run settings]({{site.baseurl}}/docs/pipelines/run-pipeline/#share-build-run-settings).

### Pipelines: Restart from failed step 
At Codefresh, we highly value your feedback and are committed to continually enhancing your experience. In response to your feedback, we introduced the ability to configure the default restart behavior for failed steps in a pipeline at the account level. 

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-restart-failed-step.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-restart-failed-step.png" 
	alt="Restart from failed step in Pipeline Settings" 
	caption="Restart from failed step in Pipeline Settings"
  max-width="50%" 
%}

When enabled (the default), the user can restart the pipeline directly from the failed step. Otherwise, users can only restart the pipeline from the beginning.  
By default, individual pipelines are configured to inherit the account setting.  
Note that this does not impact existing pipelines.

Being able to configure the restart behavior for failed steps centrally simplifies management and ensures consistency across pipelines, without the need for individual adjustments.   
Imagine a scenario where you’re onboarding a large team of developers. You can disable failed-step restart for the account, and have the pipelines use the account-level setting, saving valuable time and promoting a consistent experience.  

You can always change the behavior at any time based on evolving requirements. And users have the flexibility to override the account-level behavior for individual pipelines based on specific needs.

For details, see [Restarting from failed steps]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#restarting-from-failed-steps).

### Pipelines: Add tags during pipeline creation
With this update, you can effortlessly add tags when you create a pipeline, further streamlining the pipeline creation process. Add tags as you usually do, and they are instantly available in both the General Settings and the Permissions panel.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-tags-in-create-pipeline.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-tags-in-create-pipeline.png" 
	alt="Add tags when creating pipeline" 
	caption="Add tags when creating pipeline"
  max-width="40%" 
%}


### Pipelines: Explicit versions for typed steps
As you're aware, Codefresh is continually enhancing our typed step library in the Marketplace.

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

For details, see [Versioning for typed steps]({{site.baseurl}}/docs/pipelines/steps/#versioning-for-typed-steps).



### GitOps: Tailored sync timeouts for Argo CD applications

Tailor the timeout thresholds for sync operations for different applications, and receive instant alerts when the sync duration exceeds the threshold defined.  
Instead of waiting indefinitely for syncs to complete and then navigating through the GitOps Apps dashboard, Codefresh provides you with timely warnings to proactively investigate and resolve sync issues.

Just include an annotation in the application's YAML, and either retain the default timeout of 30 minutes (also Argo CD's default for sync operations), or change it as needed.  
Codefresh will display a warning in the **Warnings/Errors** panel for the app when the sync operation exceeds the timeout.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/jan24/rel-notes-jan-24-sync-timeout.png" 
	url="/images/whats-new/jan24/rel-notes-jan-24-sync-timeout.png" 
	alt="Sync timeout warning for Argo CD applications" 
	caption="Sync timeout warning for Argo CD applications"
  max-width="70%" 
%}

For details, see [Configure sync-timeout for Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#configure-sync-timeout-for-argo-cd-applications).

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
  max-width="70%" 
%}

For details, see [View/download logs for GitOps Runtime components]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#viewdownload-logs-for-runtime-components).

### GitOps: Argo Events upgrade
We've recently upgraded Argo Events to its latest version, v1.9.0, ensuring you can leverage all enhancements. For detailed information about the changes in this version, please refer to the [Argo documentation](https://github.com/argoproj/argo-events/releases){:target="\_blank"}.

Please be aware that this upgrade may introduce a potential breaking change for existing event sources that have defined `githubBaseUrl` without defining `githubUploadURL` which is required. In such cases, event sources will fail to sync, and the Git Source application will return a `..githubUploadURL is required when githubBaseURL is set` error.

To address this, you'll need to edit the event source YAMLs and add `githubUploadURL` where required.
 

## Bug fixes

<br>

**Pipelines**  
* For Bitbucket Cloud, `codefresh-report-image` step fails with errors to get Pull Requests (PRs) and branches. 
* Builds for Gerrit in Codefresh are triggered twice because of webhook data delivery request timeouts or connection issues.
* Replaced misleading warning message "The security token included in the request is invalid" for successful builds. 


<br>

**GitOps**  

* Codefresh UI unresponsive when clicking Warnings/Errors button in the **GitOps Apps** dashboard.
* `Failed to create binary image error` from Image reporter for images exceeding 2GB.
* Audit log missing manual actions executed in Rollouts Player.
* Delay for new Argo CD applications to appear in Codefresh GitOps Apps dashboard. 
* For GitLab Actions, `codefresh-image-reporter` log displays actual values of encrypted secrets.
* Codefresh UI not in sync with native Argo CD UI. 


