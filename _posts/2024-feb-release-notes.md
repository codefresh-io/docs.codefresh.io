---
title: "Release Notes: February 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements



## Bug fixes

**General**  
* (On-premises) Unable to access Account Settings from the Admin Management panel. (CR-21125 - Denis)
Multiple ABAC rules in GO for the same user in not correctlyIncorrect handling for ABAC rules intersections in GO. (CR-2264 - Andrii)
* Unmasked access token for Okta (CR-19131 Alina)
<br>

**Pipelines**  
(On-premises) Unable to deploy Helm charts to Helm boards after upgrade to v2.2.4 (CR-22370 - Denis)






<br>

**GitOps**  
* `Prune skipped` message for Argo CD applications after upgrading to GitOps Runtime v0.4.2.
* Unable to delete clusters in the Codefresh UI. (CR_22346 Daniel Maizel)
* Error on enabling Argo CD notifications in Helm chart `values.yaml` for Codefresh GitOps Runtime v0.4.2 (CR-22345 - Mikhail)
* When adding a Git Source and manually defining the branch, metacharacters are not encoded as HTML in the YAML. (CR-22192 - Noam)
* Renaming an ApplicationSet or GitSource removes all application's resources and then readds them. (Pasha)
* (Onpremises)On-premises GitOps Runtime causes Mongo read-models database to grow unmanagabky (CR-21738 Noam)
* Quay.io registir (CR-21342 Ilia)
* Empty page on clicking **View Native Workflow** for the selected workflow in the Workflows tab. (CR-17118 Ilia/Zhenya)





