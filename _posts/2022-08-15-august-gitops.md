---
title: "GitOps Release Notes: August 2022"
description: "Changelog and Release Notes for GitOps"
---

## Features & enhancements

### GitHub Container Registry

In this release, we added support for GitHub Container Registry (GHCR), a popular container registry tool. The settings for GitHub Container registry integration are identical to that of the other container registry integrations: the integration name, the runtimes to share the integration with, and the domain, username, and token.
You also have the Test Connection option to test credentials before committing the changes.  
Once defined, you can reference the integration by name in the CI platforms.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-github-cr.png"
 url="/images/whats-new/rel-notes-aug22-github-cr.png"
 alt="GitHub Container registry integration"
 caption="GitHub Container registry integration"
    max-width="70%"
%}

See [GitHub Container registry]({{site.baseurl}}/docs/gitops-integrations/container-registries/github-cr/).

### Labels and annotations for managed clusters

The Codefresh CLI supports labels and annotations for managed clusters.  
When you add a managed cluster in Codefresh, you can optionally add labels and annotations with the  `--labels` and the `--annotations` flags.  Codefresh supports the standard key-value formats for both, with multiple items separated by `,`. K8s rules for labels and annotations are valid here as well.  

See [Add a managed cluster with Codefresh CLI]({{site.baseurl}}/docs/installation/gitops/managed-cluster/#add-a-managed-cluster-with-gitops-cli)and [Add a managed cluster with Kustomize]({{site.baseurl}}/docs/installation/gitops/managed-cluster/#add-a-managed-cluster-with-kustomize).

### Event information for application resources

View events for application resources directly in Codefresh.  
While the Applications dashboard flags errors in all applications at the global level, the Events tab isolates successful and failed events per resource within an application, useful for resources such as pods.

Instead of having to navigate to Argo CD to view events for an application resource, clicking the resource in the Current State view in Codefresh displays the Events tab for that resource. Events are displayed in descending order, with the most recent event displayed first.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-events-tab.png"
 url="/images/whats-new/rel-notes-aug22-events-tab.png"
 alt="Events tab for application in Current State"
 caption="Events tab for application in Current State"
    max-width="60%"
%}

### Quick View for applications

Similar to the detailed views for application resources, Codefresh offers a detailed view also for the application itself.
The Quick View for an application, collates definition, deployment, and event information, in the same location. The information is grouped into tabs for intuitive viewing: Summary, Metadata, Parameters,  Sync Options,  Manifest, and Events (as in the picture below).

Easily access the Quick View either by selecting Quick View from the application’s context menu in the Applications dashboard, or by clicking the application resource in the Current State view.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-quickview-events.png"
 url="/images/whats-new/rel-notes-aug22-quickview-events.png"
 alt="Application Quick View: Events tab"
 caption="Application Quick View: Events tab"
    max-width="40%"
%}

See [Application Quick View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#view-deployment-and-configuration-info-for-selected-application).

### Usability enhancements for applications

**Context menu for applications**  
Every application in the Applications dashboard includes a new context menu with access to frequently-used and useful options such as Quick View, synchronize, and edit applications.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-new-app-nav.png"
 url="/images/whats-new/rel-notes-aug22-new-app-nav.png"
 alt="Tab order on application drilldown"
 caption="Tab order on application drilldown"
    max-width="70%"
%}

**Validations before commit with intuitive error message**  
Codefresh validates Source, Destination, and Advanced Settings such as the Argo CD Project, when you create or update applications,  _before_ committing the changes.  
For easy identification, the section with the error is also highlighted in the Form, not only in the YAML manifest. For example, if the Revision or Path is missing in the General settings, the section is highlighted in red and the message displayed includes details on the possible reasons for the error.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-app-validation-errors.png"
 url="/images/whats-new/rel-notes-aug22-app-validation-errors.png"
 alt="Validation errors in Form mode for application"
 caption="Validation errors in Form mode for application"
max-width="60%"
%}

### Miscellaneous changes

{: .table .table-bordered .table-hover}
| Item    | Description     |
| ----------  |  -------- |
| `CF_HOST`       | Deprecated from v 0.0.460 and higher in CI integrations. Recommend using `CF_RUNTIME_NAME` instead. See [CI integrations argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/#ci-integration-argument-reference). |
| `GHCR_GITHUB_TOKEN_AUTHENTICATION`       | New value for `CF_CONTAINER_REGISTRY_INTEGRATION` argument. Can be selected for GitHub Container (GHCR) registries even when you don’t have a GHCR integration in Codefresh. See [GitHub Action-Codefresh integration settings]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/github-actions/#github-action-gitops-integration-settings).|

## Bug fixes

### Runtimes

* Uninstalling runtime does not remove the integrations shared with the runtimes.
* Uninstalling a hosted or hybrid runtime does not remove it from the shared configuration repository.
* Unable to install Argo Rollouts on clusters with long cluster names.
* Empty Argo CD logs with "http internal error" in Codefresh.  
* 500 status code on using default GKE/EKS context/cluster names.

### Applications

* Trying to commit an application that already exists results in a commit failure.

### Images

* Filters are not retained on navigating away from the Images dashboard.

### Pipelines, workflows and Workflow Templates

* Workflow Template filter does not work for Git Source.
* Missing validation for `WORKFLOW_NAME` variable.
* Incorrect sync history date for Workflow Templates.
* Error on detaching predefined filters in pipelines.

### Integrations

* Docker Hub integration list appears empty until refreshed even when there are integrations.
* Test Connection option disabled when integration name is not defined.
