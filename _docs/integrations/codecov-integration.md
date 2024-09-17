---
title: "Codecov pipeline integration"
description: "Create Code Coverage Reports with Codefresh and Codecov"
group: integrations
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

{{site.data.callout.callout_warning}}
**IMPORTANT**     
The name assigned to the integration must be unique within the account. Using the same name for other integrations or Shared Configuration contexts within pipelines will result in conflicts.<br>For troubleshooting, see [Error: context already exists]({{site.baseurl}}/docs/kb/articles/error-context-already-exists/).
{{site.data.callout.end}}

<br>

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



## Using Codecov in a CI pipeline

With the integration in place, you can reference it by name in any Codefresh pipeline by using the [Codecov reporter step](https://codefresh.io/steps/step/codecov-reporter){:target="\_blank"}.

`codefresh.yml`
```yaml
codecov-report:
  stage: "prepare"
  title: Codecov report
  type: codecov-reporter:2.1.0
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