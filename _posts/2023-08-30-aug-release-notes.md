---
title: "Release Notes: August 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Pipelines: Enforce access to scopes for account
With this feature, Codefresh admins gain enhanced control over the security of their pipelines by being able to restrict access to specific endpoint scopes.
Scopes are defined at the account level, ensuring a consistent security baseline for all pipelines. These predefined scopes are inherited by every pipeline, which Codefresh admins can override for individual pipelines when necessary.  
To enable this, you need to turn on the `pipelineScopes` feature flag. 

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/aug23/rel-notes-aug23-pipeline-scopes-setting.png" 
url="/images/whats-new/aug23/rel-notes-aug23-pipeline-scopes-setting.png" 
alt="Configure scopes for pipeline" 
caption="Configure scopes for pipeline" 
max-width="60%" 
%}

For details, see [Configure scopes for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#configure-pipeline-scopes).

<br><br>

### Pipelines: Initialization metric in Datadog


<br><br>


### GitOps: Application Groups in GitOps Apps dashboard

Introducing a new view in the GitOps Apps dashboard, the Group view!  
The Group view for GitOps applications is a simple and efficient way to streamline application deployment monitoring within your enterprise. 

With App Groups, you can effortlessly focus on specific app deployments, as it consolidates deployment information for all applications within the group in the same view. This feature eliminates the need to navigate between the different applications for information on them.
Tailor groupings according to the unique requirements of your organization and applications. 

To enable this, you need to turn on the `gitopsAppGroups` feature flag. 

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/aug23/rel-notes-aug23-app-group-page.png" 
url="/images/whats-new/aug23/rel-notes-aug23-app-group-page.png" 
alt="Application Groups in GitOps Apps dashboard" 
caption="Application Groups in GitOps Apps dashboard" 
max-width="60%" 
%}

Codefresh also adds the Group name as an annotation to the application manifest for easy organization and management. 

For details, see [Application Groups for GitOps applications]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/).

<br><br>

### GitOps: Argo Events upgrade
We have upgraded our version of Argo Events to v1.7.3. Read about the changes in this [version](https://github.com/argoproj/argo-events/releases/tag/v1.7.3){:target="\_blank"}.



## Bug fixes

### General
* Auto-sync option not available for Azure SSO.
* For an ECR integration, clicking **Test Connection** or **Commit** results in progress animations persisting instead of creating the integration. 


### Pipelines
* Invalid chart error on trying to access Codefresh Helm repository.
* Builds terminate unexpectedly without clear errors or from prolonged inactivity.
* DIND with service containers ignore IRSA account (IAM Roles for Service Accounts) set for hybrid runtime.
* Commit message passed through the system variable `CF_COMMIT_MESSAGE` is truncated and does not include the full content.
* Delay in start times for child pipelines triggered by parent pipeline including a large set of `codefresh-run` steps set to run in parallel.
* In Pipelines page, the context-menu for the last pipeline in the list does not display all available actions.
* Builds terminated because of pipeline policy leave running `dind` pods on runtime cluster. 
* In Pipelines dashboard (Home Dashboard), for a renamed pipeline, the Pipeline filter displays the original name instead of the new name. 


### GitOps
* **Save** button remains disabled when modifying fields for an existing Git Source.
* Applications show **Unknown** status in Codefresh, while they are **Healthy** in the Argo CD UI. 
* Commits to a second application in the same repository as another application, terminates the on-going rollout for the first application. 
* (On-premises) Unable to create Git Sources both from the Codefesh CLI and UI with Bitbucket Server.
* (On-premises) For Azure, auto-sync operations removes groups that were previously synced.



