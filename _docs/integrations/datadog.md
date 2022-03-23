---
title: "Datadog integration"
description: "Integrate Codefresh with Datadog for monitoring and analysis"
group: integrations
toc: true
---

Datadog is a SaaS-based monitoring and analytics platform for large-scale applications and infrastructure.  
Integrating Datadog with Codefresh allows you to leverage Codefresh for pipeline creation, and Datadog for pipeine monitoring and analysis.  

When you create pipelines are created in Codefresh, Codefresh transfers the pipeline data to Datadog for viewing in Datadog's Continuous Integration (CI) Visibility interface.

For integration, you need:
* An API token from your Datadog account
* To define the settings in Codefresh

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

## Configure integration settings for Datadog in Codefresh

Configure the integration settings for Datadog within Codefresh.

1. In the Codefresh UI, go to [Integrations](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Datadog**, and then **Configure**.
1. Mouse over **datadog** and select **Edit**.
  
  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-config-settings.png" 
url="/images/integrations/datadog/datadog-config-settings.png"
max-width="30%"
caption="Datadog configuration settings"
alt="Datadog configuration settings"
%}

{:start="4"}
1. Configure the following:
  * **Datadog site**: Select the site with your data. If you are not sure which Datadog site to select, select the View documentation link below the field, and read Datadog's official documentation. 
  * **Token**: The API token you copied from your Datadog account. 
1. Select **Save**.


## Pipeline data from Codefresh in Datadog
After integration, data for all pipelines created in Codefresh is available in Datadog's CI Visibility interface.  

Below are the highlights of information you can see in Datadog for Codefresh pipelines. For detailed descriptions and options, see [Datadog documentation on Exploring Pipelines](https://docs.datadoghq.com/continuous_integration/explore_pipelines/){:target="\_blank"}.  


**Pipelines page in Datadog**  

The Pipelines page shows aggregated data for each pipeline, for the selected time range.  You can see the failure rate and average build duration against the total number of executions for a pipeline, alongside the metrics from the most recent build of the same pipeline.  

Below is an example of the Pipelines page showing Codefresh pipelines, prefixed by the Codefresh logo. 

  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-pipelines-page.png" 
url="/images/integrations/datadog/datadog-pipelines-page.png"
max-width="30%"
caption="Pipelines page in Datadog with Codefresh pipelines"
alt="Pipelines page in Datadog with Codefresh pipelines"
%}

**Pipeline Details page in Datadog**  

Selecting a pipeline takes you to the Pipeline Details page in Datadog. 
Here you can the same data for the individual pipeline as in the main Pipelines page, and additional data on branches, stages and jobs.  
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

**Pipeline Executions page in Datadog**  

The Pipeline Executions page shows day-by-day execution data for the selected pipeline or pipelines.  

Below is an example of the Pipeline Executions page for the same Codefresh pipeline.  


  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-pipeline-executions.png" 
url="/images/integrations/datadog/datadog-pipeline-executions.png"
max-width="30%"
caption="Execution timeline view in Datadog Pipeline Executions page"
alt="Execution timeline view in Datadog Pipeline Executions page"
%}