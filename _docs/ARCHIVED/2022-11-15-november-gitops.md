---
title: "GitOps Release Notes: November 2022"
description: "Changelog and Release Notes for GitOps"
---

## Features & enhancements

### Tunnel-based hybrid runtimes

Simplify installation without compromising on security with our tunnel-based installation option for hybrid runtimes.  

Tunnel-based runtimes use tunneling for communication between the customer cluster and the Codefresh platform, with the customer cluster initiating the tunneling request. Simply add the flag `--access-mode` with `tunnel` as the value and you have your tunnel-based runtime without an ingress controller.



### Bitbucket Cloud for hosted runtimes

Hosted runtimes now support Bitbucket Cloud as a Git provider.

### Card view for applications

A scannable Card view offers a new layout for applications in the Applications dashboard.
Quickly scan application information top-down, starting with the health and sync statuses, followed by repo and runtime information, and easy access to the available actions at the bottom of the card.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-nov22-card-view.png"
 url="/images/whats-new/rel-notes-nov22-card-view.png"
 alt="Card view of applications"
 caption="Card view of applications"
 max-width="60%"
%}

### More application alerts

We added custom warnings for common scenarios with application deployment to our Errors/Warning panel, that both alert you to the problems and possible actions to resolve them.

**Missing Argo Rollouts controller**  
Applications with rollout resources need Argo Rollouts on the managed cluster to execute rollout instructions and deploy the application.
If the Argo Rollouts controller is missing, you get a warning with the option to install Argo Rollouts on the cluster.  

**Long application sync**  
Application sync can continue indefinitely because of issues with the application that you need to troubleshoot, unrelated to Codefresh.  
A new warning alerts you to sync operations that exceed 30 minutes.  
The View Details option takes you directly to the Sync Results tab with details on the sync job and failed hooks, and the option to terminate the sync, and then troubleshoot the application.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-nov22-app-warnings.png"
 url="/images/whats-new/rel-notes-nov22-app-warnings.png"
 alt="Example of warning for missing Argo Rollouts controller"
 caption="Example of warning for missing Argo Rollouts controller"
 max-width="60%"
%}

See [Identify applications with errors/warnings]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#identify-applications-with-warningserrors).

### Hide extraneous resources from Current State views

Streamline Current State views for your application's resources by hiding resources not native to the application.
The Ignore Extraneous filter allows you to hide resources generated by tools, whose sync status _does not_ affect the sync status of the application. `ConfigMap` and `pods` are examples of such resources.  
Once you add the  `IgnoreExtraneous` annotation to the resource, clicking the Ignore Extraneous filter hides the resource from the Current State views.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-nov-22-ignore-extraneous-annotation.png"
 url="/images/whats-new/rel-notes-nov-22-ignore-extraneous-annotation.png"
 alt="Example of resource with IgnoreExtraneous annotation"
 caption="Example of resource with IgnoreExtraneous annotation"
 max-width="60%"
%}

See [Filters for application resources]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#filters-for-application-resources).

## Bug fixes

### Runtimes

* "Failed to create default-git-source" error during hybrid runtime installation.
* Self-signed certificates and private root CA (Certificate Authority) not supported for on-premises Git providers.
* Upgrade runtime failure when copying and pasting CLI command from Codfresh UI.
* Runtime installation reports errors as warnings.
* Invalid GitLab token passes validation.
* Status not updated for deleted PAT (Personal Access Token) in User Settings.
* GitLab repos with multiple levels incorrectly truncated to the first level in Codefresh UI.
* Missing `--provider` flag when creating Git Sources via CLI.
* INTERNAL_SERVER_ERROR when installing a runtime using `--shared-config-repo` flag with GitLab.

### Applications

* Incorrect status for current sync operation.
* No results on applying filters in DORA metrics dashboard.
* Broken links between parent and child applications in Application Set in Applications dashboard > List view.
* Discrepancy between status in health snapshot filter and corresponding list of applications.
* Resources with Missing health status not displayed in Current State.
* "No Git Source with write permissions" error on creating application.
* Deleted applications shown as errors in the Error/Warning panel.
* Wrong commit message in the Timelines tab for Git Source-applications.
* PR (Pull Request) number in the  Timelines tab does not match the commit in the Application header.
* No indication for extended application sync operations.
* Codefresh UI does not sync applications as part of Application Set.
* No option to terminate sync for indefinitely syncing applications.
* Scrolling up/down in Current State > Tree View causes resource nodes to move off the screen.

### Delivery Pipelines and workflows

* Pipeline failure when there are two or more trigger conditions with the same event.
* Formatting issues for logs with timestamps.
* Change in Delivery Pipeline manifest overrides current sensor configuration.
* No error message for step with invalid dependency.

### Others

* Safari: Clicking Settings icon on the toolbar does not open Configuration page.
* No option to log out on selecting an incorrect authentication provider.
