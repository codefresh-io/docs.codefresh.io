---
title: "Release Notes: February 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Blobless Git clone

Here's one more enhancement which contributes to workflow optimization. Our new field for our `git_clone` step: the `exclude_blob` field.

Filter out blob files from the Git repository to further streamline your development process - fewer unnecessary files to clone and faster cloning times!  Simply set `exclude_blob` to `true`.  
To always include blob files, simply retain the default value of `false`.


### Argo CD application enhancements

We have a couple of usability enhancements for Argo CD applications in Codefresh.  

##### Deployment record for Current Release**
To more accurately represent of the selected application's live deployment status, we now clearly differentiate between current and historical deployments in the Timeline tab.

The Current Release is now prominently displayed as a dedicated deployment record at the top of the Timelines tab, tagged as the Current Version. It is followed by the list of Previous Releases. 

{% include
image.html
lightbox="true"
file="/images/whats-new/feb24/rel-notes-feb24-current-release-record.png"
url="/images/whats-new/feb24/rel-notes-feb24-current-release-record.png"
alt="Current Release deployment record in Timeline tab"
caption="Current Release deployment record in Timeline tab"
max-width="70%"
%}

* To prevent confusion with duplicate statuses, the application's health and sync statuses are now exclusively displayed and tracked within the Application Header. 

* To validate that the current release as the live state, the release revision in the deployment record mirrors the sync revision displayed in Last Sync Result. 

For details, see [Monitoring deployments for selected Argo CD application]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#monitoring-deployments-for-selected-argo-cd-application).

##### Quick links
The Configuration tab displays handy links to the application's GitOps Runtime, Git Source, and YAML manifest in the Git repo.

{% include
image.html
lightbox="true"
file="/images/whats-new/feb24/rel-notes-feb24-apps-quick-links.png"
url="/images/whats-new/feb24/rel-notes-feb24-apps-quick-links.png"
alt="Quick links for application in Configuration tab"
caption="Quick links for application in Configuration tab"
max-width="70%"
%}


### Deprecation for GitOps CLI

As we have transitioned to Helm-based Runtimes for GitOps, we have permanently deprecated the CLI for GitOps.


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





