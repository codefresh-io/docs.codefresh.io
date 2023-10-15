---
title: "Release Notes: April 2023"
description: "Changelog and Release Notes for Codefresh Pipelines and GitOps"
---

## Features & Enhancements

### Pipelines: Annotations for builds

We are happy to introduce two cool features to annotations for pipeline builds! It’s now easier than ever to find the builds you’re looking for, and customize your build views.

First, you can configure an annotation as the build's _display_ annotation, from among the available annotations. Why would you do this? When configured, the annotation is displayed for the build in the Builds page, making it easy to see which builds share common properties like target environments.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-apr23-builds-list-with-display-annotation.png"
 url="/images/whats-new/rel-notes-apr23-builds-list-with-display-annotation.png"
 alt="Builds page with `display` annotations"
 caption="Builds page with `display` annotations"
 max-width="50%"
%}

For details, see [Configure display annotation for builds]({{site.baseurl}}/docs/pipelines/annotations/#configure-annotation-to-display-for-build).

Second, as an obvious extension, you can filter builds by annotations. Filter builds by any annotation added for the build, whether it’s a display annotation or any other annotation with the Annotation filter in the Builds page.
For details, see [Applying filters to build views]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#applying-filters-on-the-build-view).

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-apr23-builds-annotation-filter.png"
 url="/images/whats-new/rel-notes-apr23-builds-annotation-filter.png"
 alt="Annotation filter for builds"
 caption="Annotation filter for builds"
 max-width="50%"
%}

Here's an example of builds filtered by `display` annotations.

### Pipelines: Project-based ABAC

We are excited to announce project-level Attribute-Based Access Control (ABAC) in this month's release. ABAC for projects saves a lot of effort without compromising security, as now you can control access to the project entity and to pipeline entities based on project tags.

How can you do this?
First by creating projects and by assigning tags to projects and then creating rules.

* Project access to teams with project-tags
  Decide which teams have access to which projects, and at which level. By adding tags to projects, you can define rules for different teams who can create, update, delete, and view projects. For example, you may decide that the DevOps team has full access to all projects with all tags, but the Users team has view-only access to projects with `Shared` tag.
  Also, read the next feature description, [Pipelines: Auto-create projects for teams](#pipelines-auto-create-projects-for-teams).

* Pipeline access to teams with project-tags
  Create rules for pipeline entities by project tags instead of pipeline tags. Define access to pipelines on the basis of the projects that house the pipelines. Instead of tagging each pipeline, you add tags to the project, and define rules that determine the teams who can access the pipelines which share the project tags.

  Builds now honor the permissions of the pipelines. If you don't have access to the pipeline, you will not have access to its builds.
  This also means fewer email notifications, as these are only sent for builds you have access to.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-apr23-project-tags-devops.png"
 url="/images/whats-new/rel-notes-apr23-project-tags-devops.png"
 alt="Example of rules for pipelines with project tags"
 caption="Example of rules for pipelines with project tags "
 max-width="50%"
%}

For details, see [ABAC for entities with tags and rules]({{site.baseurl}}/docs/administration/account-user-management/access-control/#abac-for-entities-with-tags-and-rules).

### Pipelines: Auto-create projects for teams

Simplify access control and setup with `Auto-create projects for teams`. Enabled by default, this global pipeline setting automatically creates projects whenever you create teams in your account.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-apr23-auto-create-projects-setting.png"
 url="/images/whats-new/rel-notes-apr23-auto-create-projects-setting.png"
 alt="Auto-create projects for teams in Pipeline settings"
 caption="Auto-create projects for teams in Pipeline settings"
 max-width="50%"
%}

In addition to automatically creating a project for the team, it also automatically creates a Project rule, and a Pipeline rule for the same team, with basic permissions.
For details, see [Auto-create projects for teams]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams).

### Pipelines: Multi-platform builds in Codefresh

Build and push Docker images, including multi-platform images in Codefresh with BuildX.

We have extended the capabilities of our `build` step with the new `buildx` field. Leverage Docker’s support for multi-architecture/multi-platform support right here in Codefresh. Build an image once and reuse it on multiple architectures/platforms.
We also support custom `buildx` configurations with QEMU and Builder, giving you all the options you may need.  

For details, see [Build step field descriptions]({{site.baseurl}}/docs/pipelines/steps/build/#fields).

### Pipelines: (On-premises) Custom root CA for services

On-premises installations can now configure custom Root CA for volumes and containers.  
Reference the K8s secret containing the root CA in `config.yaml`. Define the volume or volumes with the K8s secret objects, and then the volume mounts for the container.  

For details, see [Configure custom Root CA for volumes and containers]({{site.baseurl}}/docs/installation/codefresh-on-prem/#configure-custom-root-ca-for-volumes-and-containers).

### GitOps: Rollback Argo CD applications

We now have the Rollback feature for Argo CD applications! With just a click of a button, you can rollback any new or active version of an application directly from the GitOps Apps dashboard in Codefresh.

Like Argo CD, Codefresh allows you to rollback to any of the ten previous deployment versions.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-apr23-app-rollback.png"
 url="/images/whats-new/rel-notes-apr23-app-rollback.png"
 alt="Rollback for Argo CD applications"
 caption="Rollback for Argo CD applications"
 max-width="50%"
%}

For details, see [Rollback Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#rollback-gitops-applications).

### GitOps: Static integration option for Amazon ECR

We extended the integration options for Amazon Elastic Container Registry (ECR) in GitOps to include static integrations with Access keys.

You can now set up the integration with Amazon ECR using an access key and secret (static integration). Unlike IAM roles, access keys are long-term credentials, without a default expiration date.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-ecr-access-key-int.png"
 url="/images/whats-new/rel-notes-ecr-access-key-int.png"
 alt="Access Key (static) integration for GitOps Amazon ECR"
 caption="Access Key (static) integration for GitOps Amazon ECR"
 max-width="50%"
%}

For details, see [GitOps Amazon ECR integration]({{site.baseurl}}/docs/gitops-integrations/container-registries/amazon-ecr).

## Bug fixes

### Pipelines

* Clicking Add Shared Configuration for Variables from the Workflows tab does not open panel.
* Memory usage banner warning not synced with actual usage by build.
* Undefined module causes broken `cfstep-helmfile:2.17.0-0.135.0`.
* Generating an API token from Pipeline > Settings > Build Runtime results in `Failed to create api token` error.
* Modifying encrypted variable for a manual trigger converts it to decrypted version.
* Build fails with validation errors when creating pipeline with step dependencies using Terraform.
* `Error: failed to register layer: file exists on Init stage` in pipeline initialization phase.
* (On-premises only) Modified files option for Git triggers not available for Bitbucket Cloud.
* (On-premises only) Incorrect start time for builds in offline logs.

### GitOps

* Sync issues for Hosted Runtime with CSDP-APP_PROXY.
* `Invalid Git runtime token` notification reappears even when Runtime has a valid token.
* Incorrect `Insecure mode` warning when a node is down.
* New rollout not reflected in Codefresh UI when the same manifest has two (new and old) rollout occurrences.
* Inconsistent formats for date and time displays in Codefresh UI.
* Setting up API permissions for Azure SSO shows `...Misconfigured application...` error.
