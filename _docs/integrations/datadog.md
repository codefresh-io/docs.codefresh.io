---
title: "Datadog integration"
description: "Integrate Codefresh with Datadog for monitoring and analysis"
group: integrations
toc: true
---

Codefresh allows you to integrate with Datadog to analyze monitoring and performance data within Codefresh.  
For 

To integrate, you need:
A Datadog account, and know the region to which to connect
An API token



To enable the analysis sign up for a free account with Codecov and add a new project.
## Get API token from Datadog account
If you already have a Datadog account, you can copy the API key from your account. Otherwise, generate a new API key. 

1. Log in to your Datadog account.
1. Go to **Organization Settings**, and select **API Keys**.
    
  {% include image.html 
lightbox="true" 
file="/images/integrations/datadog/datadog-api-key.png" 
url="/images/integrations/datadog/datadog-api-key.png"
max-width="70%"
caption="Getting an API Key from Datadog"
alt="Getting an API Key from Datadog"
%}
 
From this screen make sure you note down the Token as you will use it in Codefresh.

Next, go into your Codefresh account settings and choose CodeCov from [integrations](https://g.codefresh.io/account-admin/account-conf/integration). Click the add integration button:

{% include image.html 
lightbox="true" 
file="/images/integrations/codecov-integration/codecovintegration.png" 
url="/images/integrations/codecov-integration/codecovintegration.png"
max-width="70%"
caption="Enter Token"
alt="Enter Token"
%}

Enter the following:
* **Integration name**: The user-defined name for this integration. The name should be unique for each integration that you add. 
* **Token**: The token (see the previous section) for this integration. 
* **Url**: The base URL for this integration. Do not add the trailing slash to the URL definition. For more information, see the [official Codecov documentation](https://docs.codecov.com/docs/configuration#codecov-url){:target="\_blank"}. 


Using Codecov in a Codefresh Pipeline:

With the integration in place, you can use it by name in any Codefresh pipeline by using the [Codecov reporter step](https://codefresh.io/steps/step/codecov-reporter).

`codefresh.yml`
```yaml
  codecov-report:
	stage: "prepare"
	title: Codecov report
	type: codecov-reporter
	arguments:
  	codecov_integration: my-codecov-integration
```	  

For more details see our [Codecov example](https://codefresh.io/docs/docs/yaml-examples/examples/codecov-testing/).

