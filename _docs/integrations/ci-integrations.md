---
title: "CI integrations"
description: ""
group: integrations
toc: true
---

Use Codefresh's Hosted GitOps with any popular Continuous Integration (CI) solution, not just with Codefresh CI.

You can connect a third-party CI solution to Codefresh, such as GitHub Actions for example, to take care of common CI tasks such as building/testing/scanning source code, and have Codefresh Hosted GitOps still responsible for the deployment, including image enrichment and reporting.  
See [Image enrichment with integrations]({{site.baseurl}}/docs/integrations/image-enrichment-overview/).

### Codefresh image reporting and enrichment action
To support the integration between Codefresh and third-party CI platforms and tools, we have created dedicated actions for supported CI tools in the Codefresh Marketplace. These actions combine image enrichment and reporting through integrations with issue tracking and container registry tools. 

>You can also configure the integration directly in the Codefresh UI, as described in [Connect a third-party CI platform/tool to Codefresh](#connect-a-third-party-ci-platformtool-to-codefresh).


Use the action as follows:

1. Create your pipeline with your CI platform/tool as you usually do.
1. Use existing CI actions for compiling code, running unit tests, security scanning etc.
1. Place the final action in the pipeline as the "report image" action provided by Codefresh.  
  See:  
 [GitHub Action Codefresh report image](https://github.com/marketplace/actions/codefresh-report-image){:target="\_blank"}
 [Codefresh Classic Codefresh report image](https://codefresh.io/steps/step/codefresh-report-image){:target="\_blank"}   
1. When the pipeline completes execution, Codefresh retrieves the information on the image that was built and its metadata through the integration names specified (essentially the same data that Codefresh CI would send automatically).
1. View the image in Codefresh's [Images dashboard]({{site.baseurl}}/docs/deployment/images/), and in any [application]({{site.baseurl}}/docs/deployment/applications-dashboard/) in which it is used.

### Connect a third-party CI platform/tool to Codefresh
Connecting the CI platform/tool to Codefresh from the UI includes configuring the required arguments, and then generating and copying the YAML manifest for the report image to your pipeline.  

1. In the Codefresh UI, go to [Integrations](https://g.codefresh.io/2.0/account-settings/integrations){:target="\_blank"}.
1. Filter by **CI tools**, select the CI tool, and click **Configure**.
1. Define the arguments for the CI tool:  
  [Codefresh Classic]({{site.baseurl}}/docs/integrations/ci-integrations/codefresh-classic/)  
  [GitHub Action]({{site.baseurl}}/docs/integrations/ci-integrations/github-actions/)  
  [Jenkins]({{site.baseurl}}/docs/integrations/ci-integrations/jenkins/)  

  For the complete list of arguments you can use, see [CI integration argument reference](#ci-integration-argument-reference) later in this article.

1. To generate a YAML snippet with the arguments, on the top-right, click **Generate Manifest**. 
1. In the generated manifest, add fields and values, as needed.
1. To copy the YAML manifest, click **Copy**.

{% include image.html 
lightbox="true" 
file="/images/integrations/classic/classic-manifest.png" 
url="/images/integrationsclassic/classic-manifest.png"
alt="Example of manifest generated for Codefresh Classic"
caption="Example of manifest generated for Codefresh Classic"
max-width="50%"
%}

{:start="6"}
1. Paste it as the last step in your CI pipeline.

### CI integration argument reference 
The table describes _all_ the arguments required for CI integrations in general. The actual arguments required, differs according to the CI integration tool.

{: .table .table-bordered .table-hover}
| Argument    | Description     | Required/Optional/Default |
| ----------  |  -------- | ------------------------- |
| `CF_HOST`                      | _Deprecated from v 0.0.460 and higher._ Recommend using `CF_RUNTIME_NAME` instead. {::nomarkdown}<br><span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_HOST</span> has been deprecated because the URL is not static, and any change can fail the enrichment.<br><br>  The URL to the cluster with the Codefresh runtime to integrate with. If you have more than one runtime, select the runtime from the list. Codefresh displays the URL of the selected runtime cluster.{:/}   | Optional  |
| `CF_PLATFORM_URL`       | Required for integrations in on-premises environments only. The root URL of the codefresh application. If not specified, uses the default value of `https://g.codefresh.io`. | Optional  |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |
| `CF_API_KEY`            | The API key for authentication. Generate the key for the integration.  | Required  |
| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored. See [Container registry integrations]({{site.baseurl}}/docs/integrations/container-registries/). | Optional  |
| `CF_JIRA_INTEGRATION`               | The name of the issue tracking integration created in Codefresh to use to enrich the image. Relevant only if Jira enrichment is required for the image. See [Jira integration]({{site.baseurl}}/docs/integrations/issue-tracking/jira/).  | Optional  |
| `CF_IMAGE`                    | The image to be enriched and reported in Codefresh. Pass the `[account-name]/[image-name]:[tag]` built in your CI. | Required  |
| `CF_WORKFLOW_NAME`           | The name assigned to the workflow that builds the image. When defined, the name is displayed in the Codefresh platform. Example, `Staging step` | Optional  |
| `CF_GIT_BRANCH`              | The Git branch with the commit and PR (pull request) data to add to the image. Pass the Branch from the event payload used to trigger your action.  | Required  |
| `CF_GIT_REPO`                | The Git repository with the configuration and code used to build the image.  | Required  |
| `CF_GIT_PROVIDER`            | The Git provider for the integration, and can be either GitHub, GitLab, Bitbucket, or Bitbucket Server.  | Required  |
| `CF_GITHUB_TOKEN`            | The GitHub authentication token. The token must have `repo` scope. See [Git tokens]({{site.baseurl}}/docs/reference/git-tokens/). | Required  |
| `CF_GITHUB_API_URL`          | The URL to the GitHub developer site.  | Required  |
| `CF_BITBUCKET_USERNAME`      | The username for the Bitbucket or the BitBucket Server (on-prem) account. | Required  |
| `CF_BITBUCKET_PASSWORD`      | The password for the Bitbucket or the BitBucket Server (on-prem) account. | Required  |
| `CF_BITBUCKET_HOST_URL`      | Relevant for Bitbucket Server accounts only. The URL address of your Bitbucker Server instance. Example, `https://bitbucket-server:7990`. | Required  |
|`CF_JIRA_PROJECT_PREFIX` | Relevant only when `CF_JIRA_INTEGRATION` is defined. The Jira project prefix that identifies the ticket number to use.| Required|
| `CF_JIRA_MESSAGE`            | Relevant only when `CF_JIRA_INTEGRATION` is defined. The Jira issue IDs matching the string to associate with the image.  | Required  |
| `CF_JIRA_FAIL_ON_NOT_FOUND`            | Relevant only when `CF_JIRA_INTEGRATION` is defined. The report image action when the `CF_JIRA_MESSAGE` is not found. When set to `true`, the report image action is failed.  | Required  |

### Related articles
[Container registry integrations]({{site.baseurl}}/docs/integrations/container-registries/)  
[Issue tracking intergrations]({{site.baseurl}}/docs/integrations/issue-tracking/)  






