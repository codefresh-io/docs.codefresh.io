---
title: "Release Notes: August 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Pipelines: Enforce access to scopes for account
With this feature, Codefresh admins gain enhanced control over the security of their pipelines by being able to restrict access to specific endpoint scopes.
Scopes are defined at the account level, ensuring a consistent security baseline for all pipelines. These predefined scopes are inherited by every pipeline, which Codefresh admins can override for individual pipelines when necessary.  

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
Codefresh now reports an additional pipeline metric to Datadog. Reported metrics includes the duration of the initialization step for pipelines.

<br><br>


### GitOps: Application Groups in GitOps Apps dashboard

Introducing a new view in the GitOps Apps dashboard, the Group view!  
The Group view for GitOps applications is a simple and efficient way to streamline application deployment monitoring within your enterprise. 

With App Groups, you can effortlessly focus on specific app deployments, as it consolidates deployment information for all applications within the group in the same view. This feature eliminates the need to navigate between the different applications for information on them.
Tailor groupings according to the unique requirements of your organization and applications. 


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
* Unable to sign in with SSO (Single Sign-On). 

### Pipelines 
* Prefix for Docker registries omitted when using a custom Docker registry as a Public Marketplace Registry. 
* Pipeline trigger for BitBucket server does not fire on commit.
* Pipeline resuming execution after approval shows previously executed steps as skipped in Codefresh UI.
* Delay in start times for child pipelines triggered by parent pipeline including a large set of codefresh-run steps set to run in parallel.
* Retrying a workflow displays duplicate metrics in Datadog.
 

### GitOps 
* Out of memory for Hosted GitOps Runtimes.
* Clicking the **Current State** or the **Timeline** tab of an application opens the Home dashboard instead of the tabs.
* Unable to connect to a Git provider when installing Hosted GitOps Runtimes.
* Deleted GitOps applications continue to be displayed in the GitOps Apps dashboard.
* (On-premises only) `DISABLED_CONCURRENT_SESSIONS` set to `true` results in `UNAUTHORIZED_ERROR token is not valid` error for graphql API call. 






