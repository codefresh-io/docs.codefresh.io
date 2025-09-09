---
title: "Jira GitOps integration"
description: "Integrate Jira with GitOps for image enrichment with ticket information"
group: gitops-integrations
sub_group: issue-tracking
toc: true
---

{% if page.collection == site.gitops_collection %}
>**Early Access**  
This feature is available upon request through our Early Access Program. As it is still in development, you may encounter occasional bugs or limitations.
{% endif %}

Codefresh offers native integration with Atlassian Jira, enabling you to enrich images with Jira ticket information. This integration allows you to track a feature from its creation in Jira through to its implementation and deployment across environments, providing visibility into the full lifecycle.

For general information on issue-tracking integrations, see [Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/).


## Prerequisites

1. Get your Jira instance credentials by following the [Atlassian documentation](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/){:target="\_blank"}.
1. Note down the following as you will need them to complete the integration with Codefresh:  
  * Jira URL
  * Jira username/email to be used for the integration
  * Jira password/token created for this user


## Jira-GitOps integration settings in Codefresh

For the complete argument reference, see [GitOps integration argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-argument-reference/).


{: .table .table-bordered .table-hover}
| Setting    | Description     | 
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br>The integration resource is created in the Git repository with the shared configuration, within <code class="highlighter-rouge">resources</code>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <code class="highlighter-rouge">resources/all-runtimes-all-clusters/</code></li><li>Selected runtimes: Created in <code class="highlighter-rouge">resources/runtimes/<runtime-name>/</code></li></ul> You can reference the Docker Hub integration in the CI tool. {:/}|
|**Jira Host**| The URL of your Jira instance. For example, `https://<company>.atlassian.net`|
|**API Token**| The Jira password/token you noted down when you created the Jira instance.<br>To authenticate through a PAT (Personal Access Token) from your Git provider, see [Using PAT instead of API token for Jira authentication](#using-pat-instead-of-api-token-for-jira-authentication). |
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
 


## Using PAT instead of API token for Jira authentication
In addition to API tokens, Codefresh supports using a PAT (Personal Access Token) from your Git provider for authentication to Jira servers. PAT-based authentication provides an alternative method to access Jira integrations for image enrichment with issue tracking information.


To authenticate through a PAT, you need to:
* Explicitly configure the PAT through the `CF_JIRA_SERVER_PAT` argument. 
* Use `CF_JIRA_HOST_URL` with the URL of your Jira instance (instead of `CF_ISSUE_TRACKING_INTEGRATION` with the name of the Jira integration in Codefresh).

Here's an example with the subset of JIRA-specific arguments you would use with PAT authentication:  
`CF_JIRA_HOST_URL`: `"https://codefresh-io.atlassian.net"`  
`CF_JIRA_SERVER_PAT`: `"***"`  
`CF_JIRA_MESSAGE`: `"wip CR-1"`  
`CF_JIRA_PROJECT_PREFIX`: `"CR"`


## Using GitHub Action with Jira in CI pipelines
For pipelines based on GitHub Actions, configure the Jira integration in Codefresh, and then connect your GitHub Action to Codefresh, referencing the Jira integration by name.  
Codefresh uses the Secret Key stored in the runtime cluster to securely access Jira and retrieve the information. 



## Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
