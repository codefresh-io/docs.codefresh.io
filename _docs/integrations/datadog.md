---
title: "Datadog integration"
description: "Integrate Codefresh with Datadog for monitoring and analysis"
group: integrations
toc: true
---

Codefresh allows you to integrate with Datadog to analyze monitoring and performance data. After every build, you can see the data in Datadog's CI Visibility dashboard.

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
caption="Getting an API Key from Datadog"
alt="Getting an API Key from Datadog"
%}

{:start="3"}
1. Copy the API key to use with your Codefresh integration.

## Configure integration settings for Datadog in Codefresh

Configure the integration settings for Datadog within Codefresh.

1. In the Codefresh UI, go to [integrations](https://g.codefresh.io/account-admin/account-conf/integration). 
1. Select **Datadog**, and then **Configure**.
1. Mouse over **datadog** and select **Edit**.
  
  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datagog-config-settings.png" 
url="/images/integrations/datadog/datagog-config-settings.png"
max-width="30%"
caption="Datadog integration configuration"
alt="Datadog integration configuration"
%}

{:start="4"}
1. Configure the following:
  * **Datadog site**: Select the site with your data. If you are not sure which Datadog site to select, select the View documentation link below the field, and read Datadog's official documentation. 
  * **Token**: The API token you copied from your Datadog account. 
