---
title: "Jira pipeline integration"
description: ""
group: integrations
redirect_from:
  - /docs/jira-integration-1/
  - /docs/integrations/jira-integration-1/
toc: true
---
Codefresh integrates with Jira in several ways. This article describes how to integrate Codefresh pipelines with Jira for the highest visibility into your CD deployments.
What are the benefits of Jira integration into Codefresh pipelines?
Auotmated authentication
When set up, you can reference the specific Jira integration in the pipelinbe by name, instead of having to repeatedly define authentication credentials. Codefresh retrieves the integration credentials for authentication   
Image enrichment
Jira integration for pipelines enriches the deployment image. Image enrichment exposes metadata such as feature requests, pull requests, and logs as part of the application's deployment.  for visibility into all aspects of the deployment, making it easier to track actions and identify root cause of failures.  

When you add a new Jira integration in Codefresh, you can authenticate either using the:  
* [Codefresh Marketplace App]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#authenticate-with-the-jira-client-key)  
  We recommended setting up your Jira integration through our Marketplace App.  
  > Note that Codefresh currently has to provide you with access to use the Jira Marketplace App. Please get in touch for more information.
 
* [Jira Account Details]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#provide-account-details)This article describes  can set up the pipeline integration with Jira in one of two modes:

* Jira Marketplace App


* User/password

 

## Prerequisites

Before

### Jira Marketplace App
For integration with the Jira Marketplace App, you need to:
Add the Codefresh App to Jira
Get the Client ID for the Codefresh App



1. In the Atlassian Marketplace, go to the [Codefresh Application](https://marketplace.atlassian.com/apps/1224560/codefresh){:target="\_blank"}.
    
    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/add-app.png" 
    url="/images/integrations/jira/add-app.png" 
    alt="Add Codefresh from Jira App Marketplace" 
    caption="Add Codefresh from Jira App Marketplace" 
    max-width="90%" 
    %}

{:start="2"}    
1. To install the application, click **Get it now**. When prompted, confirm the installation.
    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/confirm.png" 
    url="/images/integrations/jira/confirm.png" 
    alt="Confirm installation" 
    caption="Confirm installation" 
    max-width="90%" 
    %}

{:start="3"}     
1. When the installation has completed, log in to your organization's Jira account.
1. From the **Apps** dropdown, select **Explore more apps**.

    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/manage-apps.png" 
    url="/images/integrations/jira/manage-apps.png" 
    alt="Select Manage Apps within Your Jira Account" 
    caption="Select Manage Apps within Your Jira Account" 
    max-width="90%" 
    %}

{:start="5"}  
1. In **User-installed apps**, locate the Codefresh CI/CD platform integration.
1. Click **Configure**.
  This action will provide you with your Organization URL and the Client Key. 

    {% include image.html 
    lightbox="true" 
    file="/images/integrations/jira/configure.png" 
    url="/images/integrations/jira/configure.png" 
    alt="Account information" 
    caption="Account information" 
    max-width="90%" 
    %}

  
{:start="7"} 
1. Copy the **Client Key**. You will need these to set up Jira integration for pipelines with the Codefresh Marketplace App. 

### Username-password integration
[Jira Account](https://www.atlassian.com/software/jira){:target="\_blank"} 


## Jira-pipeline intgeration settings in Codefresh

The settings 

{: .table .table-bordered .table-hover}
| Setting    | Description     | 
| ----------  |  -------- | 
|**Integration name**       | A friendly name for the integration. This is the name you will reference in your Codefresh pipeline to retrieve the Jira information. |
|**Jira Marketplace App settings**| **Client Key**: The client key for the Codefresh application from Jira. See [Client Key for the Codfresh App from Jira](#jira-integration-with-marketplace-app).|
|**User/pass settings** | {::nomarkdown}<ul><li><b>Jira URL</b>: The URL of your Jira instance. For example, `https://<company>.atlassian.net`.</li><li><b>Username</b>: The username of your Jira account.<li><li><b>Password</b>: The Jira password/token you noted down when you created the Jira instance.<li> </ul> {::/} |




* 

## Set up Jira integration in Codefresh
<!---The goal of the Codefresh [GitOps Dashboard]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/) is to provide the highest observability into your deployments. The Codefresh GitOps Dashboard tags the Jira issues associated to deployments automatically through the Codefresh Jira Integration. This section will provide an overview of setting up the integration. -->



<br />

**Before you begin**  

* To authenticate through the Marketplace App:
  * Get the [Organization URL and the Client Key for the Codfresh App from Jira](#jira-integration-with-marketplace-app)

**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Atlassian Jira** and then click **Configure**.
1. Click **Add Jira**.
1. In the **Integration Name** field, enter a name for the integration which is used to reference it in `codefresh.yaml`.
1. To restrict access to only Codefresh admins, toggle **Allow access to all users** to OFF.
  <!--- >>When access is restricted, users **cannot** use the [CLI](https://codefresh-io.github.io/cli/){:target="\_blank"} or [API]({{site.baseurl}}/docs/integrations/codefresh-api/) to [programmatically access this Helm repository](https://codefresh-io.github.io/cli/contexts/){:target="\_blank"}.  
   Otherwise, all users from all your Codefresh teams will be able to access this Helm repository with CLI commands or API calls.  -->
1. To integrate with the Codefresh Marketplace App, click **Jira Marketplace App**:
   * Paste the **Organization URL** and the **Client Key** you generated for the Codefresh App in Jira. 
1. To integrate with your Jira account details, select **User/Pass**, and define the following:
  * **Jira URL**: The URL of your organization, for example, `https://company-name.atlassian.net’.
  * **Username**: Your Jira username, usually the e-mail with which you are logged in to Jira.
  * **Password**: Your Jira password, or alternatively, the Jira Client Key. 

{% include image.html 
lightbox="true" 
file="/images/integrations/jira/add-jira-password.png" 
url="/images/integrations/jira/add-jira-password.png" 
alt="Account Information" 
max-width="90%" 
%}

{:start="7"}
1. For integration with Jira Marketplace App, to verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.



## More Jira integration options
Other integration options that Codefresh support include using:

* [Custom step]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#use-jira-within-your-codefresh-pipeline) integration
  Use the custom step from our step marketplace to connect your pipelines with Jira.
* [Jira-cli]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#using-your-own-jira-cli)
* GitOps-Jira integration: Set up a Jira integration for GitOps, connect GitOpsEnrich connect your CI tool with Codefresh for image enrichment and reporting.  
and report images to the Codefresh platform with no disruptions to existing CI processes and flows. 


## Using the Jira Integration

Once Jira is connected to your Codefresh account, you can use both platforms in combination and integrate Jira into your [GitOps workflow]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/).

## Related articles  
[Example for sending notifications to Jira]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-jira/)  
[Examples for Codefresh pipelines]({{site.baseurl}}/docs/example-catalog/examples/)  
[Create a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/)  



 
