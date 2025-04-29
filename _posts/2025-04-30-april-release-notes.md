---
title: "Release Notes: March 2025"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements







## Bug fixes

##### General
* Empty screen after login to Codefresh for new users. (CR-28034 - Vasil)

##### Pipelines 
* Git trigger for "Release published" fires incorrectly when any release-related trigger is enabled. (CR-28415 - Vasil)
* Webhook events for Bitbucket ignored when pipeline trigger use different Bitbucket integrations. (CR-28075 - Vasil)
* Postgres Connectivity Issues: Azure Compatibility & Networking (CR-28067)
* For GitHub, list of files modified by PR (pull request) does not include all modified files. 

##### GitOps
* Unknown status for applications added from Helm repository in GitOps Apps dashboard for installations with existing Argo CD 
OR
For installation with existing Argo CD, applications added from Helm repository show Unknown status in GitOps Apps dashboard. (CR-28732 Daniel Maizel)

* Unable to commit GitOps Runtime OAuth Config with Hybrid GitOps runtime (CR-28543 - Oleksander)
* Product Promotable Properties replace array instead of merge support (CR-28393 - Chen)
* Slow load times for Promotion Workflows. (CR-27581 - Eti)
