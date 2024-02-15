---
title: "Release Notes: February 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements



## Bug fixes

**General**  
* (On-premises) Unable to access Account Settings from the Admin Managemant panel. (CR-21125 - Denis)
Incorrect handling for ABAC rules intersections in GO. (CR-2264 - Andrii)
* Unmasked access token for Okta (CR-19131 Alina)
<br>

**Pipelines**  
(On-premises) Unable to deploy Helm charts to Helm boards after upgrade to v2.2.4 (CR-22370 - Pasha)
* Slow processing for `git-clone` step even with `depth` attribute set to `1` for shallow clone. (CR-21485 Eti)



* For Bitbucket Cloud, `codefresh-report-image` step fails with errors to get Pull Requests (PRs) and branches. 
* Builds for Gerrit in Codefresh are triggered twice because of webhook data delivery request timeouts or connection issues.
* Replaced misleading warning message "The security token included in the request is invalid" for successful builds. 


<br>

**GitOps**  
* `Prune skipped` message for Argo CD applications after upgrading to GitOps Runtime v0.4.2.
* Unable to delete clusters in the Codefresh UI. (CR_22346 Daniel Maizel)
* Error on enabling Argo CD notifications in Helm chart `values.yaml` for Codefresh GitOps Runtime v0.4.2 (CR-22345 - Mikhail)
* When adding a Git Source and manually defining the branch, metacharacters are not encoded as HTML in the YAML. (CR-22192 - Noam)
* Renaming an ApplicationSet or GitSource removes all application's resources and then readds them. (Pasha)
* (Onpremises)On-premises GitOps Runtime causes Mongo read-models database to grow unmanagabky (CR-21738 Noam)
* Quay.io registir (CR-21342 Ilia)
* Clicking View Native Workflow in ??? opens an empty page. (CR-17118 Ilia/Zhenya)


* Codefresh UI unresponsive when clicking Warnings/Errors button in the **GitOps Apps** dashboard.
* `Failed to create binary image error` from Image reporter for images exceeding 2GB.
* Audit log missing manual actions executed in Rollouts Player.
* Delay for new Argo CD applications to appear in Codefresh GitOps Apps dashboard. 
* For GitLab Actions, `codefresh-image-reporter` log displays actual values of encrypted secrets.
* Codefresh UI not in sync with native Argo CD UI. 


