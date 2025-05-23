---
title: "Jira pipeline integration"
description: ""
group: integrations
redirect_from:
  - /docs/jira-integration-1/
  - /docs/integrations/jira-integration-1/
toc: true
---
Codefresh integrates with Jira in several ways, both to pull information from Jira to Codefresh and to push information from Codefresh to Jira for notifications.  

Set up a Jira integration for pipelines, and then reference the integration in your pipeline through a custom step to extract the Jira issue. See [Set up Jira integration for pipelines](#set-up-jira-integration-for-pipelines-in-codefresh) and [Example of Jira integration usage in pipelines](#example-of-jira-integration-usage-in-codefresh-pipeline).

Optionally, a [GitOps-based Jira integration](#gitops-based-jira-integration-for-image-enrichment) allows you to enrich images with Jira information through a different Marketplace step.  

For information on Jira integration for notifications, see [Jira notification integrations for pipelines]({{site.baseurl}}/docs/integrations/notifications/jira-integration/).

## Authentication for Jira integrations

 When set up, you can reference the specific Jira integration in the pipeline by name for Codefresh to automatically retrieve the integration credentials for authentication. This functionality avoids the need to repeatedly define authentication credentials. 
 
When you add a new Jira integration in Codefresh, you can authenticate using the username and password credentials of your Jira account.

## Set up Jira integration for pipelines in Codefresh
<!---The goal of the Codefresh [GitOps Dashboard]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/) is to provide the highest observability into your deployments. The Codefresh GitOps Dashboard tags the Jira issues associated to deployments automatically through the Codefresh Jira Integration. This section will provide an overview of setting up the integration. -->

{{site.data.callout.callout_warning}}
**IMPORTANT**    
The name assigned to the integration must be unique within the account. Using the same name for other integrations or Shared Configuration contexts within pipelines will result in conflicts.<br>For troubleshooting, see [Error: context already exists]({{site.baseurl}}/docs/kb/articles/error-context-already-exists/).
{{site.data.callout.end}}


##### Before you begin 

* Make sure you have the username and password for your [Jira account](https://www.atlassian.com/software/jira){:target="\_blank"} for authentication

##### How to 
1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Atlassian Jira** and then click **Configure**.
1. Click **Add Jira**.
1. In the **Integration Name** field, enter a name for the integration which will be used to reference it in `codefresh.yaml`.
1. To restrict access to only Codefresh admins, toggle **Allow access to all users** to OFF.
  <!--- >>When access is restricted, users **cannot** use the [CLI](https://codefresh-io.github.io/cli/){:target="\_blank"} or [API]({{site.baseurl}}/docs/integrations/codefresh-api/) to [programmatically access this Helm repository](https://codefresh-io.github.io/cli/contexts/){:target="\_blank"}.  
   Otherwise, all users from all your Codefresh teams will be able to access this Helm repository with CLI commands or API calls.  -->
1. To authenticate with your Jira account details, select **User/Pass**, and define the following:
  * **Jira URL**: The URL of your organization, for example, `https://company-name.atlassian.net`.
  * **Username**: The username of your Jira account, usually the e-mail with which you are logged in to Jira.
  * **Password**: The Jira password/token of your Jira account. 

<!--- {% include image.html 
lightbox="true" 
file="/images/integrations/jira/add-jira-password.png" 
url="/images/integrations/jira/add-jira-password.png" 
alt="Account Information" 
max-width="90%" 
%}
-->
{:start="7"}
1. To apply the changes, click **Save**.

You can now use the Jira integration in your pipelines.

## Example of Jira integration usage in Codefresh pipeline
Here's an example of a pipeline with the [`jira-issue-extractor` step](https://codefresh.io/steps/step/jira-issue-extractor){:target="\_blank"} that extracts the Jira issue matching the project prefix defined.

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

## GitOps-based Jira integration for image enrichment
Codefresh also supports [Jira integration for GitOps]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/).  
GitOps-based Jira integration, combined with a registry integration, also GitOps-based, allows you to connect your CI pipeline with the integration to enrich the built image, and report the enriched image to Codefresh. 

Here's how you would do it:
1. Set up Jira and registry integrations for GitOps  
  You need to connect Jira and your container registry to Codefresh. These integrations are specific to GitOps, and differ from the Jira and registry integrations that you may have already set up for your CI pipelines.    
  Once you set up the GitOps-based integrations, you can reference them in the CI pipeline through the report image step for Codefresh to retrieve the necessary information.
1. Create your Codefresh pipeline as you usually do.  
  * Place the final action in the pipeline as the _report image_ action. See the example in the following section. 
  * When the pipeline completes execution, Codefresh retrieves the information on the image that was built and its metadata through the integration names specified.
1. View the enriched image in Codefresh’s Images dashboard, and in any application in which it is used.


### Example CI pipeline with image enrichment step

Below is an example of a CI pipeline using the _Jira and registry integrations for GitOps_. 

The [`codefresh-report-image` step](https://codefresh.io/steps/step/codefresh-report-image){:target="\_blank"}, the last step in the pipeline, reports Jira and registry information to Codefresh. The values of the Git variables are populated from those you defined in the respective GitOps integrations. 

When the build completes execution, you can see the associated metadata in the [Images dashboard]({{site.baseurl}}/docs/dashboards/images/).


`codefresh.yml`
{% highlight yaml %}
{% raw %}

version: "1.0"
stages:
  - "clone"
  - "build"
  - "report"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    stage: "clone"
    
  build:
    title: "Building Docker image"
    type: "build"
    image_name: "${{CF_REPO_OWNER}}/color"
    working_directory: "${{clone}}"
    tag: "${{CF_SHORT_REVISION}}"
    dockerfile: "Dockerfile"
    registry: docker-lr
    stage: "build"

  ReportImageMetadataAll:
    title: Report image to Codefresh CD
    type: codefresh-report-image
    working_directory: /code
    stage: "report"
    arguments:
      CF_API_KEY: '${{CF_API_KEY}}'
      CF_IMAGE: 'docker.io/${{CF_REPO_OWNER}}/color:${{CF_SHORT_REVISION}}'
      CF_CONTAINER_REGISTRY_INTEGRATION: docker
      CF_RUNTIME_NAME: "codefresh-hosted"
      CF_GITHUB_TOKEN: '${{GITHUB_TOKEN}}'
      CF_GIT_PROVIDER: github
      CF_GIT_REPO: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
      CF_GIT_BRANCH: '${{CF_BRANCH}}'
      CF_ISSUE_TRACKING_INTEGRATION: jira
      CF_JIRA_MESSAGE: "${{CF_COMMIT_MESSAGE}}"
      CF_JIRA_PROJECT_PREFIX: CR

{% endraw %}
{% endhighlight yaml %}

## More integration options for Jira
Other integration options that Codefresh supports include using:
* [Custom step]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#use-jira-within-your-codefresh-pipeline) integration  
  Use the custom step from our step Marketplace to connect your pipelines with Jira.
* [Jira-cli]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#using-your-own-jira-cli)


## Related articles  
[Examples for Codefresh pipelines]({{site.baseurl}}/docs/example-catalog/examples/)  
[CI/CD guide for GitOps deployments]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)  
[Example for sending notifications to Jira]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-jira/)  



 
