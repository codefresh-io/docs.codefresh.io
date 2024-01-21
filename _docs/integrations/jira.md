---
title: "Jira pipeline integration"
description: ""
group: integrations
redirect_from:
  - /docs/jira-integration-1/
  - /docs/integrations/jira-integration-1/
toc: true
---
Codefresh integrates with Jira in several ways, both to pull information from Jira to Codefresh for enriched images, and to push information from Codefresh to Jira for notifications in Jira.  
This article describes how set up the integration with Jira for the highest visibility into your CD deployments with image enrichment. For information on Jira integration for notifications, see [Jira notification integrations for pipelines]({{site.baseurl}}/docs/integrations/jira/).

Once you set up the Jira integration for pipelines, you can reference it in your pipeline through a custom, or Marketplace step -  [report-image-step](https://codefresh.io/steps/step/codefresh-report-image){:target="\_blank"} or [jira-issue-extractor](https://codefresh.io/steps/step/jira-issue-extractor){:target="\_blank"}.

**What are the benefits of integrating with Jira in Codefresh pipelines?**
* Auotmated authentication  
  When set up, you can reference the specific Jira integration in the pipeline by name, and Codefresh will automatically retrieve the integration credentials for authentication.  
  There is no need to repeatedly define authentication credentials. 

* Image enrichment  
  Jira integration for pipelines enriches the deployment image. Image enrichment exposes metadata such as feature requests, pull requests, and logs for visibility into all aspects of the deployment, making it easier to track actions and identify root cause of failures. 


**Authentication options for Jira integration**  
When you add a new Jira integration in Codefresh, you can authenticate using either the:  
* Jira Marketplace App  
  Authentication through the Jira Marketplace App requires you to get the Client Key for the Codefresh application in Atlassian Jira. 
  Codefresh currently has to provide you with access to use the Jira Marketplace App. Please get in touch for more information. 

* Jira account
  Provide the username and password credentials for your Jira account.



## Set up Jira integration in Codefresh
<!---The goal of the Codefresh [GitOps Dashboard]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/) is to provide the highest observability into your deployments. The Codefresh GitOps Dashboard tags the Jira issues associated to deployments automatically through the Codefresh Jira Integration. This section will provide an overview of setting up the integration. -->

{{site.data.callout.callout_warning}}
**IMPORTANT**  
The name assigned to the integration must be unique within the account. Using the same name for other integrations or Shared Configuration contexts within pipelines will result in conflicts.<br>For troubleshooting, see [Error: context already exists]({{site.baseurl}}/docs/kb/articles/error-context-already-exists/).
{{site.data.callout.end}}

##### Before you begin 

To authenticate through the:
* Marketplace App: Make sure you have the [Client Key for the Codefresh App from Jira](#jira-integration-with-marketplace-app)
* Jira account: Make sure you have username and password for your [Jira account](https://www.atlassian.com/software/jira){:target="\_blank"}

##### How to 
1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Atlassian Jira** and then click **Configure**.
1. Click **Add Jira**.
1. In the **Integration Name** field, enter a name for the integration which will be used to reference it in `codefresh.yaml`.
1. To restrict access to only Codefresh admins, toggle **Allow access to all users** to OFF.
  <!--- >>When access is restricted, users **cannot** use the [CLI](https://codefresh-io.github.io/cli/){:target="\_blank"} or [API]({{site.baseurl}}/docs/integrations/codefresh-api/) to [programmatically access this Helm repository](https://codefresh-io.github.io/cli/contexts/){:target="\_blank"}.  
   Otherwise, all users from all your Codefresh teams will be able to access this Helm repository with CLI commands or API calls.  -->
1. To authenticate through the Codefresh Marketplace App:
  * Click **Jira Marketplace App**.
  * Paste the **Client Key** you generated for the Codefresh App in Jira. 
1. To authenticate with your Jira account details:
  * Select **User/Pass**, and define the following:
  * **Jira URL**: The URL of your organization, for example, `https://company-name.atlassian.net`.
  * **Username**: The username of your Jira account, usually the e-mail with which you are logged in to Jira.
  * **Password**: The Jira password/token of your Jira account. 

{% include image.html 
lightbox="true" 
file="/images/integrations/jira/add-jira-password.png" 
url="/images/integrations/jira/add-jira-password.png" 
alt="Account Information" 
max-width="90%" 
%}

{:start="7"}
1. For integration through Jira Marketplace App authentication, to verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.

You can now use the Jira integration in your pipelines.

### Configure Codefresh app in Atlassian Jira
You need to generate the Organization URL and Client Key for the Codefresh application in Atlassian Jira.

>**NOTE**
Currently Codefresh must provide you with access to use the Codefresh app in the Atlassian Marketplace App. Please get in touch for more information. 

##### Before you begin
* Get access to the Codefresh application in the Atlassian Marketplace


##### How to
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
1. Copy the **Client Key**. You will need these to set up Jira integration for pipelines in Codefresh with the Jira Marketplace App. 

## More Jira integration options
Other integration options that Codefresh supports include using:

* [Custom step]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#use-jira-within-your-codefresh-pipeline) integration
  Use the custom step from our step Marketplace to connect your pipelines with Jira.
* [Jira-cli]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#using-your-own-jira-cli)
* GitOps-Jira integration: Set up a Jira integration for GitOps, connect GitOpsEnrich connect your CI tool with Codefresh to enrich and report images to the Codefresh platform with no disruptions to existing CI processes and flows. 


## Example of Jira integration to enrich image
Here's an example of a pipeline step that 

`YAML`
{% highlight yaml %}
{% raw %}
...
stages:
  - "build"
  - "test"
  - "metadata"
  - "deploy"

steps:
  jira-issue-extractor:
    title: Enrich image with annotations
    type: jira-issue-extractor
    arguments:
      IMAGE: 'docker.io/aperturesci/${{BUILDNAME}}:${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
      JIRA_PROJECT_PREFIX: '${{JIRA_PREFIX}}'
      MESSAGE: '${{CF_COMMIT_MESSAGE}}'
      JIRA_CONTEXT: jira
          
  enrich-image:
    title: Enrich image with annotations
    type: image-enricher
    arguments:
      IMAGE: 'docker.io/aperturesci/${{BUILDNAME}}:${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
      BRANCH: '${{CF_BRANCH}}'
      REPO: 'aperture-sci/trio-app'
      GIT_PROVIDER_NAME: prs
        
  extract_issue:
    title: Add Jira issue to docker image
    type: jira-issue-extractor
    stage: enrich image
    arguments:
      IMAGE: docker.io/codefresh/${{CF_REPO_NAME}}:${{CF_REVISION}}
      JIRA_PROJECT_PREFIX: SA
      MESSAGE: ${{CF_BRANCH_VERSION_NORMALIZED}}
      JIRA_CONTEXT: jira-p
{% endraw %}
{% endhighlight %}

## Using the Jira Integration
Once Jira is connected to your Codefresh account, you can use both platforms in combination and integrate Jira into your [GitOps workflow]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/).

## Related articles  
[Example for sending notifications to Jira]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-jira/)  
[Examples for Codefresh pipelines]({{site.baseurl}}/docs/example-catalog/examples/)  
[Create a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/)  



 
