---
title: "Release Notes: May 2025"
description: ""
---

This release addresses a number of fixes to improve your experience across the platform.

## Features & enhancements

{% if page.collection == "posts" %}
### Pipelines: Manage pipeline runner ABAC rules with Terraform

Managing access policies and environment isolation just got easier! You can now define runner permissions—controlling which teams can use which runners—directly through our Terraform provider.

This update helps you eliminate manual UI configuration, reduce human error, and scale access management more efficiently across teams.

##### Key benefits

* **Declare ABAC policies in Terraform** alongside other team and pipeline configurations.
* **Define team-runner relationships** to control who can run what.
* **Filter runner access by tags** to fine-tune permissions.
* **Support multiple rules per team** for flexible access control.
* **Match existing ABAC behavior** found in the UI and API.

This feature helps teams maintain consistent, automated access control at scale.

For details, see [Codefresh Terraform Provider documentation]({{site.baseurl}}/docs/integrations/terraform/).
{% endif %}

## Bug fixes

### Pipelines

* Fixed an issue where Git triggers using `release.published` were incorrectly executing matching rules for other release sub-events (such as `release.unpublished`), even when those sub-events weren’t explicitly configured. The webhook event handler now correctly distinguishes between sub-event types and only triggers builds on exact matches.
* Fixed an issue where Bitbucket webhook events were ignored when the same trigger was configured across two Bitbucket integrations. The fix ensures uniqueness by properly identifying each webhook event and its destination.
* Removed the limit on the number of modified files returned in the GitHub pull request file list.

##### GitOps
* Wrong revision promoted when a Promotion Flow is triggered manually by clicking Trigger button or automatically. 
* Release status not updated for product when a Promotion Flow is triggered manually by clicking the Trigger button. <!--- runtime version with fix to be released -->
* Updated validation for the Name field in Promotion Workflows to not allow underscores.
* GitOps permission rule for applications including the Git Source attribute not supported for applications from ApplicationSets.<!--- runtime version with fix to be released  -->
* Removed the **SSH** option from the **Repository** field in the Create Git Source form. Selecting SSH resulted in the error `failed creating git-source. error: Invalid URL`, as SSH is not a valid option for Git Sources. 
{% if page.collection == "posts" %}
* Inaccurate change failure rate for DORA metrics. 
{% endif %}

