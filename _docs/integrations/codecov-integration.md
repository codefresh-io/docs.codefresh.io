---
title: "Codecov pipeline integration"
description: "Create Code Coverage Reports with Codefresh and Codecov"
group: integrations
redirect_from:
  - /docs/integrations/codecov-integration/
toc: true
---

Codefresh has native integration for [Codecov analysis](https://about.codecov.io/){:target="\_blank"}.
You need to first set up a new project in Codecov. 

## Set up a new project in Codecov

* Sign up for a free account with Codecov.
* Add a new project.

{% include image.html 
lightbox="true" 
file="/images/integrations/codecov-integration/codecovtoken.png" 
url="/images/integrations/codecov-integration/codecovtoken.png"
max-width="70%"
caption="Getting a Token from Codecov"
alt="Getting a Token from Codecov"
%}
 
* Note down the Token as you will need it to set up the Codecov integration in Codefresh.

## Set up Codecov integration in Codefresh


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Codecov** and then click **Configure**.
1. Click **Add Codecov**.
1. Define the following:  
  * **Integration Name**: Enter a name for the integration which is used to reference it in `codefresh.yaml`.
  * **Token**: Paste the token that you copied when you created the new Codecov project for this integration. 
  * **Url**: The base URL for this integration. Do not add the trailing slash to the URL definition. For more information, see the [official Codecov documentation](https://docs.codecov.com/docs/configuration#codecov-url){:target="\_blank"}. 


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



## Using Codecov in a CI pipeline

With the integration in place, you can reference it by name in any Codefresh pipeline by using the [Codecov reporter step](https://codefresh.io/steps/step/codecov-reporter){:target="\_blank"}.

`codefresh.yml`
```yaml
  codecov-report:
	stage: "prepare"
	title: Codecov report
	type: codecov-reporter
	arguments:
  	codecov_integration: my-codecov-integration
```	  

For more details see our [Codecov example](https://codefresh.io/docs/docs/example-catalog/ci-examples/codecov-testing/).

## Related articles
[Integration Tests]({{site.baseurl}}/docs/testing/integration-tests/)  
[Service containers in pipelines]({{site.baseurl}}/docs/pipelines/service-containers/)  
[Coveralls coverage reports example]({{site.baseurl}}/docs/example-catalog/ci-examples/coveralls-testing/)  
[Codacy coverage reports example]({{site.baseurl}}/docs/example-catalog/ci-examples/codacy-testing/)  
[Creating test reports]({{site.baseurl}}/docs/testing/test-reports/)  