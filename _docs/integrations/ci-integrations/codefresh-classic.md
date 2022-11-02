---
title: "Codefresh Classic"
description: ""
group: integrations
sub_group: ci-integrations
toc: true
---

 Use Hosted GitOps with any popular Continuous Integration (CI) solution, not just with Codefresh CI. Codefresh Classic is one of the third-party CI platform/tools that you can connect to Codefresh for deployment with image enrichment and reporting. 

For information on how to use the image reporting action in your Codefresh Classic pipeline and how to configure the integration, see [CI Integrations]({{site.baseurl}}/docs/integrations/ci-integrations/). 


### Codefresh Classic-Codefresh integration arguments
The table describes the arguments required to connect Codefresh Classic to Codefresh.  

{: .table .table-bordered .table-hover}
| Argument    | Description     | Required/Optional/Default |
| ----------  |  -------- | ------------------------- |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |
| `CF_API_KEY`            | The API key to authenticate the Codefresh Classic user to Codefresh. Generate the key for the integration.  | Required  |
| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored. To create a container registry integration if you don't have one, click **Create Container Registry Integration**, and then configure the settings. See [Container registry integrations]({{site.baseurl}}/docs/integrations/container-registries/). | Optional  |
| `CF_JIRA_INTEGRATION`               | The name of the issue tracking integration created in Codefresh to use to enrich the image. Relevant only if Jira enrichment is required for the image. If you don't have a Jira integration, click **Create Atlassian Jira Integration** and configure settings. See [Jira integration]({{site.baseurl}}/docs/integrations/issue-tracking/jira/).  | Optional  |
| `CF_IMAGE`                    | The image to be enriched and reported in Codefresh. Pass the `[account-name]/[image-name]:[tag]` built in your CI. | Required  |
| `CF_WORKFLOW_NAME`           | The name assigned to the workflow that builds the image. When defined, the name is displayed in the Codefresh platform. Example, `Staging step` | Optional  |
| `CF_GIT_BRANCH`              | The Git branch with the commit and PR (pull request) data to add to the image. Pass the Branch from the event payload used to trigger your action.  | Required  |
| `CF_GIT_REPO`                | The Git repository with the configuration and code used to build the image.  | Required  |
| `CF_GIT_PROVIDER`            | The Git provider for the integration, and can be either GitHub, GitLab, or Bitbucket.  | Required  |
| `CF_GITHUB_TOKEN`            | The GitHub authentication token. The token must have `repo` scope. See [Git tokens]({{site.baseurl}}/docs/reference/git-tokens/). | Required  |
| `CF_GITHUB_API_URL`          | The URL to the GitHub developer site.  | Required  |
| `CF_BITBUCKET_USERNAME`      | The username for the Bitbucket or the BitBucket Server (on-prem) account. | Required  |
| `CF_BITBUCKET_PASSWORD`      | The password for the Bitbucket or the BitBucket Server (on-prem) account. | Required  |
| `CF_BITBUCKET_HOST_URL`      | Relevant for Bitbucket Server accounts only. The URL address of your Bitbucket Server instance. Example, `https://bitbucket-server:7990`. | Required  |
|`CF_JIRA_PROJECT_PREFIX` | Relevant only when `CF_JIRA_INTEGRATION` is defined. The Jira project prefix that identifies the ticket number to use.| Required|
| `CF_JIRA_MESSAGE`            | Relevant only when `CF_JIRA_INTEGRATION` is defined. The Jira issue IDs matching the string to associate with the image.  | Required  |
| `CF_JIRA_FAIL_ON_NOT_FOUND`            | Relevant only when `CF_JIRA_INTEGRATION` is defined. The report image action when the `CF_JIRA_MESSAGE` is not found. When set to `true`, the report image action is failed.  | Required  |

For how-to instructions, see [Connect a third-party CI platform/tool to Codefresh]({{site.baseurl}}/docs/integrations/ci-integrations/#connect-a-third-party-ci-platformtool-to-codefresh/).  


### Example of report image step in Codefresh Classic pipeline 

{% highlight yaml %}
{% raw %}

reportImage:
  title: Report image to Codefresh CD
  type: codefresh-report-image
  working_directory: /code
  arguments:
     # The URL to the cluster with the Codefresh runtime to integrate with.
     CF_HOST: '[runtime-host-url]'

     # Codefresh API key !! Committing a plain text token is a security risk. We highly recommend using encrypted secrets !!
     # Documentation - https://codefresh.io/docs/docs/configure-ci-cd-pipeline/secrets-store/
     CF_API_KEY: ${{API_KEY}}

     # Image path to enrich
     CF_IMAGE: '[full image path here, including tag]'

     # Name of Container registry integration
     CF_CONTAINER_REGISTRY_INTEGRATION: 'v2'

     # The git branch which is related for the commit
     CF_GIT_BRANCH: '[name-of-your-git-branch]'

     # Name of Jira integration
     CF_JIRA_INTEGRATION: 'jira'

     # Jira project filter
     CF_JIRA_PROJECT_PREFIX: '[jira-project-prefix]'

     # String starting with the issue ID to associate with image
     CF_JIRA_MESSAGE: '[issue-id]'

{% endraw %}
{% endhighlight yaml %}

### Codefresh Classic integration logs
View and analyze logs for Codefresh Classic workflows through the Logs tab. When a Codefresh Classic pipeline is run, it is added to the Logs tab.  
You can:  
* Filter by status or by date range to view a subset of actions
* Navigate to the build file in Codefresh Classic, and view the Codefresh report image step

{% include image.html 
lightbox="true" 
file="/images/integrations/classic/classic-logs-tab.png" 
url="/images/integrations/classic/classic-logs-tab.png"
alt="Codefresh Classic: Logs tab"
caption="Codefresh Classic: Logs tab"
max-width="50%"
%}

**Build in Codefresh Classic**  

The Run column includes the link to the pipeline in Codefresh Classic.  

Here is an example of the pipeline build  in Codefresh Classic with the Enrich image for CSDP step (top) and the log (down). 

{% include image.html 
lightbox="true" 
file="/images/integrations/classic/classic-pipeline-enrich-step.png" 
url="/images/integrations/classic/classic-pipeline-enrich-step.png"
alt="Codefresh Classic pipeline with Codefresh enrich image step"
caption="Codefresh Classic pipeline with Codefresh enrich image step"
max-width="50%"
%}

{% include image.html 
lightbox="true" 
file="/images/integrations/classic/classic-logs.png" 
url="/images/integrations/classic/classic-logs.png"
alt="Logs for Codefresh report image step in Codefresh Classic build"
caption="Logs for Codefresh report image step in Codefresh Classic build"
max-width="50%"
%}

### Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with integrations]({{site.baseurl}}/docs/integrations/image-enrichment-overview/)  
[Container registry integrations]({{site.baseurl}}/docs/integrations/container-registries/)  
[Issue-tracking integrations]({{site.baseurl}}/docs/integrations/issue-tracking/)  