---
title: "Datadog integration"
description: "Integrate Codefresh pipelines with Datadog for monitoring and analysis"
group: integrations
toc: true
---

Datadog is a SaaS-based monitoring and analytics platform for large-scale applications and infrastructure. Integrating Datadog with Codefresh allows you to leverage Codefresh to create your pipelines, and Datadog to monitor and analyze them.  

When a pipeline completes execution in Codefresh, Codefresh reports pipeline-execution data to Datadog for viewing in Datadog's Continuous Integration (CI) Visibility interface.

For Datadog and Codefresh integration, you need:
* An API token from your Datadog account
* To define the settings in Codefresh

> Note: Please reach out to Support if you’re interested in enabling Datadog for your account.

## Get API token from Datadog account
If you already have a Datadog account, you can copy the API key if you have one, or generate a new API key. 

1. Log in to your Datadog account.
1. Go to **Organization Settings**, and select **API Keys**.
    
  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-api-key.png" 
url="/images/integrations/datadog/datadog-api-key.png"
max-width="30%"
caption="Getting an API Key from your Datadog account"
alt="Getting an API Key from your Datadog account"
%}

{:start="3"}
1. Copy the API key to use with your Codefresh integration.

## Set up Datadog integration in Codefresh

Configure the integration settings for Datadog within Codefresh.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Datadog**, and then **Configure**.
1. Click **Add Integration**.
  
  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-config-settings.png" 
url="/images/integrations/datadog/datadog-config-settings.png"
max-width="30%"
caption="Datadog configuration settings"
alt="Datadog configuration settings"
%}

{:start="4"}
1. Define the following:
  * **Datadog site**: Select the site with your data. If you are not sure which Datadog site to select, select the _View documentation_ link below the field, and read Datadog's official documentation. 
  * **Token**: The API token you copied from your Datadog account. 
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.


## Pipeline data from Codefresh in Datadog
See pipeline data in Datadog's CI Visibility interface.  

We have highlighted the main features in Datadog for Codefresh pipelines. For detailed descriptions and options, see [Datadog documentation on Exploring Pipelines](https://docs.datadoghq.com/continuous_integration/explore_pipelines/){:target="\_blank"}.  


### Pipelines page in Datadog 

The Pipelines page shows aggregated data for each pipeline, for the selected time range.  You can see the failure rate and average build duration against the total number of executions of a pipeline, alongside the metrics from the most recent build of the same pipeline.  

Below is an example of the Pipelines page with Codefresh pipelines, prefixed by the Codefresh logo. 

  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-pipelines-page.png" 
url="/images/integrations/datadog/datadog-pipelines-page.png"
max-width="30%"
caption="Pipelines page in Datadog with Codefresh pipelines"
alt="Pipelines page in Datadog with Codefresh pipelines"
%}

### Pipeline Details page in Datadog

Selecting a pipeline takes you to the Pipeline Details page in Datadog which provides in-depth data for the pipeline. 
Here you can see the failure rate and average build duration for the selected pipeline, and data on its branches, and jobs (referred to as steps in Codefresh). 
You also have the option of viewing executions in the dedicated Pipeline Executions page.

Below is an example of the Pipeline Details page for the selected Codefresh pipeline.  


  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-pipeline-drilldown.png" 
url="/images/integrations/datadog/datadog-pipeline-drilldown.png"
max-width="30%"
caption="Drilldown view for selected pipeline in Datadog Pipeline Details page"
alt="Drilldown view for selected pipeline in Datadog Pipeline Details page"
%}

### Pipeline Executions page in Datadog 

The Pipeline Executions page shows day-by-day execution data for the selected pipeline or pipelines.  

Below is an example of the Pipeline Executions page with execution data for Codefresh pipelines.  


  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-pipeline-executions.png" 
url="/images/integrations/datadog/datadog-pipeline-executions.png"
max-width="30%"
caption="Execution timeline view in Datadog Pipeline Executions page"
alt="Execution timeline view in Datadog Pipeline Executions page"
%}

### Pipeline Dashboards page in Datadog 

Pipeline Dashboards is your go-to location for a quick look at performance and step metrics across pipelines. You can customize the widgets in the dashboard to display the data that is of interest to you.

Below is an example of the Pipeline Dashboards page.  


  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-pipeline-dashboard.png" 
url="/images/integrations/datadog/datadog-pipeline-dashboard.png"
max-width="30%"
caption="Pipelines Dashboards page in Datadog"
alt="Pipelines Dashboards in Datadog"
%}

## Related articles
[Integration Tests]({{site.baseurl}}/docs/testing/integration-tests/)  