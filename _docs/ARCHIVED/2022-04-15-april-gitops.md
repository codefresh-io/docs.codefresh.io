---
title: "GitOps Release Notes: April 2022"
description: "Changelog and Release Notes for GitOps"
---

## Features & enhancements

### Kubernetes version runtime support

We now support the latest Kubernetes server versions, 1.22 and 1.23.

### Ingress controllers

We are continually working on supporting additional Ingress controllers, and this release adds support for:

* Ambassador
* NGINX Enterprise
* Istio
* Traefik

All ingress controllers must be configured to report their status.
For details, see [System requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#minimum-system-requirements).

### Argo CD managed cluster support

Argo CD can manage clusters without Argo CD installed on them. Now you have the same functionality in Codefresh, to add, view, and manage remote clusters.  
Admins can add an external cluster to a Codefresh runtime, and register it automatically as a managed cluster. From that point on, you have complete visibility into health and sync status, and options to manage them, including installing Argo Rollouts.  

With managed clusters in Codefresh, you get:

* Streamlined management: All cluster- and cluster-component level operations are managed through the runtime, in a centralized location. You can install new components, uninstall existing components, and remove the cluster from the runtime's managed list. A single click installs Argo Rollouts on the managed cluster.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-argo-rollouts.png"
url="/images/whats-new/rel-notes-argo-rollouts.png"
alt="Install Argo Rollouts for managed cluster in topology view"
caption="Install Argo Rollouts for managed cluster in topology view"
  max-width="70%"
%}

* Seamless upgrades: Upgrades to runtimes or to runtime components in the local cluster automatically upgrades those in managed clusters as well.
* Integration with dashboards: Applications dashboards reflect deployment information for applications in all managed clusters. When Argo Rollouts are installed, application rollouts are also reported to the dashboard.

For details, see [Managed clusters]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).

### Topology views for runtimes
  
Get a visual representation of the runtimes in your deployments, managed clusters, and cluster components with the Topology view for runtimes.
Quickly identify key information such as health and sync status, and version.
Add new clusters to or remove existing clusters from runtime management.  

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-runtime-topology-view.png"
url="/images/whats-new/rel-notes-runtime-topology-view.png"
alt="Runtime topology view"
caption="Runtime topology view"
max-width="70%"
%}

For details, see [Topology view for runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#topology-view).

### Analytics dashboard

In addition to Delivery Pipelines, the Analytics dashboard shows Runtimes, Managed Clusters, Deployments, and Applications, to give you the complete CI/CD picture with key facts and insights.  

#### Usability enhancements

* Global filters are now located at the top of the dashboard.
* Resource-specific filters are available for that resource.
* A convenient View button takes you to the dedicated resource view for additional analysis.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-analytics-dashboard.png"
url="/images/whats-new/rel-notes-analytics-dashboard.png"
alt="Analytics dashboard"
caption="Analytics dashboard"
max-width="70%"
%}

### Applications dashboard

The Applications dashboard displays the individual deployments across your enterprise.  Here are the main enhancements:  

#### Application inventory and status filters
  
The health status snapshot in the Applications dashboard also works as a quick filter. Selecting a status filters applications by that status. Filter criteria that match child applications automatically expands the parent application to show the child applications.

{% include
image.html
lightbox="true"
file="/images/whats-new/app-dashboard-status-filter.png"
url="/images/whats-new/app-dashboard-status-filter.png"
alt="Applications dashboard: Filter by status"
caption="Applications dashboard: Filter by status"
max-width="70%"
%}

#### Rollouts

Intuitive visualization with the option to open the Images view in a new browser window.  

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-apps-open-image.png"
url="/images/whats-new/rel-notes-apps-open-image.png"
alt="Applications dashboard: Link to Image view"
caption="Applications dashboard: Link to Image view"
max-width="70%"
%}

#### Git committers

Hovering over an avatar shows all commits made by that committer.  

#### Current state of cluster resources
  
Hierarchical representation of the resources deployed by this application in the cluster.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-app-current-state.png"
url="/images/whats-new/rel-notes-app-current-state.png"
alt="Applications dashboard: Current State"
caption="Applications dashboard: Current State"
max-width="70%"
%}

### Workflow Templates

Codefresh provides full-fledged management for the Workflow Template resource, from optimizing existing Workflow Templates, to creating new ones, and testing Workflow Templates before commit.

{% include
image.html
lightbox="true"
file="/images/whats-new/wrkflow-template-main.png"
url="/images/whats-new/wrkflow-template-main.png"
alt="Workflow Templates"
caption="Workflow Templates"
max-width="70%"
%}

#### Create, test, and optimize Workflow Templates
  
Create Workflow Templates in three steps. Start by selecting one from the Codefresh Hub for Argo, or start with a blank template form. Customize the Workflow Template, and either run the template to test it or commit to submit it.  

{% include
image.html
lightbox="true"
file="/images/whats-new/wrkflow-template-add.png"
url="/images/whats-new/wrkflow-template-add.png"
alt="Add Workflow Template panel"
caption="Add Workflow Template panel"
max-width="50%"
%}

For both new and existing Workflow Templates, the **Run** option enables you to test a new template, or changes to an existing template, without needing to first commit the changes. If the Workflow Template has previous iterations, you can view the arguments and values used in those iterations.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-wrkflow-temp-manifest-run.png"
url="/images/whats-new/rel-notes-wrkflow-temp-manifest-run.png"
alt="Run option for Workflow Templates"
caption="Run option for Workflow Templates"
max-width="70%"
%}

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-wrkflow-temp-run-args-view.png"
url="/images/whats-new/rel-notes-wrkflow-temp-run-args-view.png"
alt="Run Workflow Template: Arguments list"
caption="Run Workflow Template: Arguments list"
max-width="40%"
%}

The Workflows and Delivery Pipelines tabs associated with the selected Workflow Template are displayed in the respective tabs, giving you all the information in the same location.  

#### Rename Workflow Template

After creating a Workflow Template, you can rename it by selecting the template and clicking **Rename**.  
  The new name must be unique within the cluster.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-rename-workflow-template.png"
url="/images/whats-new/rel-notes-rename-workflow-template.png"
alt="Rename Workflow Template"
caption="Rename Workflow Template"
max-width="70%"
%}
  
### Application creation wizard

Create applications that are fully GitOps-compliant from the Codefresh UI. The application manifest is generated, committed to Git, and synced to your cluster.
When creating the application, you can use the UI forms, or edit the manifest directly.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-app-create-settings.png"
url="/images/whats-new/rel-notes-app-create-settings.png"
alt="Application settings in application creation wizard"
caption="Application settings in application creation wizard"
max-width="70%"
%}

### Delivery Pipeline flows

The Delivery Pipeline flow features several usability and functionality enhancements.

#### Seamless integration of Argo Event information with Argo Workflows

Once a workflow is submitted for a Delivery Pipeline, the Workflows tab visualizes the connections between the steps in the workflow.  
With Argo Event information for the workflow also incorporated into the visualization, you have a unified view of Argo Events and Argo Workflows in one and the same location, the events that triggered the workflow combined with the workflow itself.

The Event Source manifest, the event payload, and the Sensor manifest are displayed as pull-out panels, allowing you to easily copy paths for attributes from event payloads, view logs, and download artifacts.  

This example shows the event payload from Argo Events for the workflow.  

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-event-payload.png"
url="/images/whats-new/rel-notes-event-payload.png"
alt="Panel with Event Payload in Workflows tab"
caption="Panel with Event Payload in Workflows tab"
max-width="70%"
%}

This example shows the sensor manifest from Argo Events for the workflow.  

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-event-srce-manifest.png"
url="/images/whats-new/rel-notes-event-srce-manifest.png"
alt="Panel with Sensor manifest in Workflows tab"
caption="Panel with Sensor manifest in Workflows tab"
max-width="70%"
%}

#### Rename trigger resource

Similar to Workflow Templates, you can now change the trigger name of a Delivery Pipeline. The sensor name cannot be changed.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-rename-pipeline-trigger.png"
url="/images/whats-new/rel-notes-rename-pipeline-trigger.png"
alt="Rename trigger option for Delivery Pipeline"
caption="Rename trigger option for Delivery Pipelines"
max-width="70%"
%}

#### Git repo selection for commits

A dropdown list allows you to select one or more Git repos in the Trigger Conditions tab. Start typing, and use autocomplete to view and select from the available Git repos.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-git-repo-select.png"
url="/images/whats-new/rel-notes-git-repo-select.png"
alt="Git repo selection for Delivery Pipelines"
caption="Git repo selection for Delivery Pipelines"
max-width="70%"
%}

#### Errors/warning in manifests synced with the line number in manifest

Clicking the line number next to an error or a warning changes focus to the line in the manifest file with the error or warning.

### Workflows dashboard enhancements

#### Link from workflows to their pipelines

Workflow names in the dashboard are clickable links. Clicking a workflow name takes you directly to the pipeline associated with that workflow.

#### New status for active workflows without events

Identify workflows that are active but do not have any execution data with the new status filter in the Workflows dashboard. Filtering by Status ‘Unknown’ shows workflows without events for the last hour.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-workflow-unknown-status.png"
url="/images/whats-new/rel-notes-workflow-unknown-status.png"
alt="Unknown status filter for workflows"
caption="Unknown status filter for workflows"
max-width="50%"
%}

### Image reporting with Docker config.json

You can now also authenticate to a Docker registry using `docker./config.json` to report image information. Note that `config.json` is not currently supported for GCR, ECR, and ACR.  
For more information on the required fields, see [Report image info](https://github.com/codefresh-io/argo-hub/blob/main/workflows/codefresh-csdp/versions/0.0.6/docs/report-image-info.md){:target="\_blank"}.

### OpenShift 4.8 support

We now support Red Hat OpenShift 4.8. For detailed information, read their [blog](https://cloud.redhat.com/blog/red-hat-openshift-4.8-is-now-generally-available#:~:text=OpenShift%204.8%20improves%20the%20bare,is%20now%20shipping%20with%20OpenShift){:target="\_blank"}.

## Bug fixes

### Applications Dashboard

* Inaccurate results when filtering by Application type.
* Cluster shows the address of the Argo CD cluster instead of the target cluster.
* Broken Commit link in Application Preview.
* Filter by favorites does not show ApplicationSets.
* Releases not ordered correctly.
* Missing tags for Application/AppllicationSet.
* Loop created on changing date in the Applications dashboard.
* Rollouts in Deployment chart not aligned with the actual order of rollouts.
* Missing current release label.
* Missing commit message
* JIRA annotations not displayed for Images in Docker.io.
* Avatars show up intermittently.
* Incorrect Committers in Applications dashboard.
* Performance issues.

### Images

* Duplicate applications in Images repositories with different tags.
* Unmarked deployed images.

### Pipelines

* Empty event-sources.
* Missing created/updated/deleted status for resources.
* Event mapping issues.
* Creating a new pipeline with an existing Template shows empty Template tab.

### Upgrade

* Agent upgrade overrides configuration in previous release.

### Uninstall

* Artifacts in database after uninstalling with `--force` flag.
* Uninstallation issues with newer K8s versions.
