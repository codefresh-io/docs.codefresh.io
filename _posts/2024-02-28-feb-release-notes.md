---
title: "Release Notes: February 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Pipelines: Blobless Git clone

Here's another enhancement which contributes to workflow optimization. We have a new field for our `git_clone` step: the `exclude_blob` field.

Further streamline your development process by filtering out blob files from the Git repository - fewer unnecessary files to clone and faster cloning times!  Simply set `exclude_blob` to `true`.   
To always include blob files, you can retain the default value of `false`.


### GitOps: Argo CD application enhancements

We introduced a couple of usability enhancements for Argo CD applications in Codefresh.  

##### Deployment record for Current Release
To more accurately represent the live deployment status of the selected application in the Timeline tab, we now clearly differentiate between current and historical deployments.

The Current Release is prominently displayed as a dedicated deployment record at the top of the Timelines tab, tagged as the Current Version. It is followed by the list of Previous Releases. 

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


### GitOps: Deprecation of GitOps CLI for Runtime installation

As we have transitioned to Helm-based Runtimes for GitOps, we have permanently deprecated the CLI-based installation for GitOps Runtimes.


## Bug fixes

##### General 
* ABAC (Attribute-based access control) rules in GO not correctly resolved when multiple rules are configured for the same user. 
* Access token for Okta in SSO settings is not masked. 
<br>

<!-- ##### Pipelines
(On-premises) Unable to deploy Helm charts to Helm boards after upgrade to v2.2.4 -->

##### GitOps 
* `Prune skipped` message for Argo CD applications after upgrading to GitOps Runtime v0.4.2.
* Unable to delete clusters in the Codefresh UI. 
* Error on enabling Argo CD notifications in Helm chart `values.yaml` for Codefresh GitOps Runtime v0.4.2. 
* When adding a Git Source and manually defining the branch, metacharacters are not encoded as HTML in the YAML. 
* Renaming an ApplicationSet or GitSource removes all application's resources and then adds them again. 
* Empty page on clicking **View Native Workflow** for the selected workflow in the Workflows tab.
* (On-premises) GitOps features not loaded on accessing Account Settings from the Admin Management panel with both GitOps and Pipeline modules.










