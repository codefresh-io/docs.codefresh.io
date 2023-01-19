---
title: "Jira GitOps integration"
description: " "
group: gitops-integrations
sub_group: issue-tracking
redirect_from:
  - /csdp-docs/docs/integrations/issue-tracking/jira/
toc: true
---


Codefresh has native integration for Atlassian Jira, to enrich images with information from Jira. Codefresh can monitor a feature all the way from the ticket creation phase, up to when it is implemented and deployed to an environment.  

For information on adding a Jira GitOps integration in Codefresh, see [Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/).


## Prerequisites

1. Get your Jira instance credentials by following the [Atlassian documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/){:target="\_blank"}.
1. Note down the following as you will need them to complete the integration with Codefresh:  
  * Jira URL
  * Jira username/email to be used for the integration
  * Jira password/token created for this user


## Jira-GitOps integration settings in Codefresh


{: .table .table-bordered .table-hover}
| Setting    | Description     | 
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br>The integration resource is created in the Git repository with the shared configuration, within <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources</span>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/all-runtimes-all-clusters/</span></li><li>Selected runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/runtimes/<runtime-name>/</span></li></ul> You can reference the Docker Hub integration in the CI tool. {:/}|
|**Jira Host**| The URL of your Jira instance. For example, `https://<company>.atlassian.net`|
|**API Token**| The Jira password/token you noted down when you created the Jira instance.|
|**API Email**| The email for the API token.|


  {% include 
	image.html 
	lightbox="true" 
	file="/images/integrations/jira/jira-int-settings.png" 
	url="/images/integrations/jira/jira-int-settings.png" 
	alt="JIRA integration in Codefresh" 
	caption="JIRA integration in Codefresh"
  max-width="60%" 
%}
 
For information on adding a Jira integration in Codefresh, see [Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/).

## Using Jira integration in pipelines
For pipelines based on GitHub Actions, configure the Jira integration in Codefresh, and then connect your GitHub Action to Codefresh, referencing the Jira integration by name.  
Codefresh uses the Secret Key stored in the runtime cluster to securely access Jira and retrieve the information. 

## Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
