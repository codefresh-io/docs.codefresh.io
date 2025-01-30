---
title: "GitOps issue tracking integrations"
description: "Seamlessly connect issue-trackers with GitOps for image enrichment"
group: gitops-integrations
redirect_from:
  - /csdp-docs/docs/integrations/issue-tracking/jira/
toc: true
---

A key feature of Codefresh GitOps is the ability to automatically correlate software features with their deployments—identifying not just the software version, but also which features are included in each release.

By adding an issue-tracking integration for GitOps, you can link issues (such as user stories, bugs, and feature requests) directly to your deployments. This allows you to track which features are deployed and when, providing better visibility and traceability in your images.

With issue-tracking integrations, you can reference the integration by name in third-party CI tools (e.g., GitHub Actions, Codefresh pipelines) instead of needing to manage explicit credentials. 

See [Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/) and [CI integrations for GitOps]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/).

You add an issue-tracking integration in Codefresh by:
* Defining the integration name 
* Selecting the runtime or runtimes it is shared with
* Defining the arguments
* Committing the changes

Once added, Codefresh displays the list of existing integrations with their sync status. You can edit or delete any integration. 

##  Configure issue tracking integrations for GitOps in Codefresh
Configure the settings for an issue tracking integration for GitOps in Codefresh.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **GitOps Integrations**. 
1. Filter by **Issue Tracking**, select the issue tracking tool to integrate, and click **Configure**.
1. Jira integrations only: For a new Jira integration, from the **Add Integration** dropdown, select the type of integration, as either **Deployment reporting** or **Image enrichment**.
1. If you already have integrations, click **Add**.
1. Define the arguments for the issue tracking tool:  
  [Jira]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/)   
1. To confirm, click **Commit**.
  It may take a few moments for the new integration to be synced to the cluster before it appears in the list.

### Integration resource in shared configuration repo
The resource for the issue-tracking integration is created in the Git repository with the shared configuration, within `resources`.  
The exact location depends on whether the integration is shared with all or specific runtimes:  
* All runtimes: Created in `resources/all-runtimes-all-clusters/`
* Selected runtimes: Created in `resources/runtimes/<runtime-name>/`

### View issue-tracking integrations for GitOps
Selecting an issue tracking tool displays the existing integrations in Codefresh.  

Every issue tracking integration displays the following information:
* Name of the integration
* Runtime or runtimes it is shared with
* Sync status

### Edit/delete issue-tracking integrations for GitOps in Codefresh
If you have existing integrations, you can change the credentials, or delete an integration.

{{site.data.callout.callout_warning}}
**IMPORTANT**  
Deleting an integration deletes the integration resource from the Shared Configuration Repository, its secrets, and the CI workflows that 
use it. 
{{site.data.callout.end}}


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**GitOps Integrations**](https://g.codefresh.io/2.0/account-settings/integrations){:target="\_blank"}. 
1. Filter by **Issue Tracking**, and select the specific integration.
1. In the row with the integration to edit or delete, click the three dots and select **Edit** or **Delete**.
1. To edit, update the **Username** and **Password** fields, and click **Test Connection** to verify the account credentials.
1. To delete, type **DELETE** in the text box as instructed.

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/jira/jira-delete.png" 
   url="/images/integrations/jira/jira-delete.png" 
   alt="Delete issue-tracking integration" 
   caption="Delete issue-tracking integration"
   max-width="50%" 
   %}

### Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  

