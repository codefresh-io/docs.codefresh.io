---
title: "Codecov Integration"
description: "Create Code Coverage Reports with Codefresh and Codecov"
group: integrations
toc: true
---

Codefresh has native integration for [Codecov analysis](https://about.codecov.io/).

To enable the analysis sign up for a free account with Codecov and add a new project.

{% include image.html 
lightbox="true" 
file="/images/integrations/codecov-integration/codecovtoken.png" 
url="/images/integrations/codecov-integration/codecovtoken.png"
max-width="70%"
caption="Getting a Token from Codecov"
alt="Getting a Token from Codecov"
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

## What to read next

 - [Integration Tests]({{site.baseurl}}/docs/testing/integration-tests/)
 - [Service Containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
 - [Coveralls Example]({{site.baseurl}}/docs/yaml-examples/examples/coveralls-testing/)
 - [Codacy Example]({{site.baseurl}}/docs/yaml-examples/examples/codacy-testing/)
 - [Test Reports]({{site.baseurl}}/docs/testing/test-reports/)