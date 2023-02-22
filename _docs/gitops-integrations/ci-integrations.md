---
title: "GitOps CI integrations"
description: ""
group: gitops-integrations
toc: true
---

Use Codefresh Hosted GitOps with any popular Continuous Integration (CI) solution, not just with Codefresh CI.

You can connect a third-party CI solution to Codefresh, such as GitHub Actions for example, to take care of common CI tasks such as building/testing/scanning source code, and have Codefresh Hosted GitOps still responsible for the deployment, including image enrichment and reporting.  
The integration brings in all the CI information to your images which you can see in the Images dashboard.   

See [Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).

## Codefresh image reporting and enrichment action
To support the integration between Codefresh and third-party CI platforms and tools, we have created dedicated actions for supported CI tools in the Codefresh Marketplace. These actions combine image enrichment and reporting through integrations with issue tracking and container registry tools. 

>You can also configure the integration directly in the Codefresh UI, as described in [Connect a third-party CI platform/tool to Codefresh](#connect-a-third-party-ci-platformtool-to-gitops).


Use the action as follows:

1. Create your pipeline with your CI platform/tool as you usually do.
1. Use existing CI actions for compiling code, running unit tests, security scanning etc.
1. Place the final action in the pipeline as the "report image" action provided by Codefresh.  
  See:  
  [GitHub Action Codefresh report image](https://github.com/marketplace/actions/codefresh-report-image){:target="\_blank"}  
  [Codefresh pipeline Codefresh report image](https://codefresh.io/steps/step/codefresh-report-image){:target="\_blank"}  
1. When the pipeline completes execution, Codefresh retrieves the information on the image that was built and its metadata through the integration names specified (essentially the same data that Codefresh CI would send automatically).
1. View the image in Codefresh's [Images dashboard]({{site.baseurl}}/docs/deployments/gitops/images/), and in any [application]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/) in which it is used.

## Connect a third-party CI platform/tool to GitOps
Connecting the CI platform/tool to GitOps from the UI includes configuring the required arguments, and then generating and copying the YAML manifest for the report image to your pipeline.  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**GitOps Integrations**](https://g.codefresh.io/2.0/account-settings/integrations){:target="\_blank"}. 
1. Filter by **CI tools**, then select the CI tool and click **Add**.
1. Define the arguments for the CI tool:  
  [Codefresh pipelines]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/codefresh-classic/)  
  [GitHub Actions]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/github-actions/)  
  [Jenkins]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/jenkins/)  
    
  >For the complete list of arguments you can use, see [CI integration for GitOps argument reference](#ci-integration-argument-reference) in this article.

{:start="4"}
1. To generate a YAML snippet with the arguments, on the top-right, click **Generate Manifest**.  
   Codefresh validates the generated manifest, and alerts you to undefined arguments that are required, and other errors. 

   {% include image.html 
lightbox="true" 
file="/images/integrations/generated-manifest-with-error.png" 
url="/images/integrations/generated-manifest-with-error.png"
alt="Example of manifest generated for Codefresh pipeline with validation errors"
caption="Example of manifest generated for Codefresh pipeline with validation errors"
max-width="50%"
%}

{:start="5"}
1. If required, click **Close**, update as needed and generate the manifest again.
1. If there are no validation errors, click **Copy**.

{% include image.html 
lightbox="true" 
file="/images/integrations/classic/classic-manifest.png" 
url="/images/integrations/classic/classic-manifest.png"
alt="Example of manifest generated for Codefresh pipeline"
caption="Example of manifest generated for Codefresh pipeline"
max-width="50%"
%}

{:start="6"}
1. Paste the copied manifest as the last step in your CI pipeline.

### CI integration argument reference 
The table describes _all_ the arguments required for CI integrations in general. The actual arguments required, differs according to the CI integration tool.

{: .table .table-bordered .table-hover}
| Argument    | Description     | Required/Optional/Default |
| ----------  |  -------- | ------------------------- |
| `CF_HOST`                      | _Deprecated from v 0.0.460 and higher._ Recommend using `CF_RUNTIME_NAME` instead. {::nomarkdown}<br><span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_HOST</span> has been deprecated because the URL is not static, and any change can fail the enrichment.<br><br>  The URL to the cluster with the Codefresh runtime to integrate with. If you have more than one runtime, select the runtime from the list. Codefresh displays the URL of the selected runtime cluster.{:/}   | _Deprecated_  |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |
| `CF_PLATFORM_URL`       | The root URL of the Codefresh application. The default value is `https://g.codefresh.io`.  | Optional  |
| `CF_API_KEY`            | The API key for authentication. Generate the key for the integration.  | Required  |
| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored. See [Container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/). | Optional  |
| `CF_JIRA_INTEGRATION`               | _Deprecated from version 0.0.565 and higher._ Replaced by `CF_ISSUE_TRACKING_INTEGRATION`. |  _Deprecated_
| `CF_ISSUE_TRACKING_INTEGRATION` | The name of the issue tracking integration created in Codefresh to use for image enrichment. Relevant only if Jira enrichment is required for the image. If you don't have a Jira integration, click **Create Atlassian Jira Integration** and configure settings. See [Jira integration]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/).  | Optional  |
| `CF_IMAGE`                    | The image to be enriched and reported in Codefresh. Pass the `[account-name]/[image-name]:[tag]` built in your CI. | Required  |
| `CF_WORKFLOW_NAME`           | The name assigned to the workflow that builds the image. When defined, the name is displayed in the Codefresh platform. Example, `Staging step` | Optional  |
| `CF_GIT_BRANCH`              | The Git branch with the commit and PR (pull request) data to add to the image. Pass the Branch from the event payload used to trigger your action.  | Required  |
| `CF_GIT_REPO`                | The Git repository with the configuration and code used to build the image. {::nomarkdown} <ul><li>Optional for GitHub Actions. <li>Required for Codefresh pipelines and Jenkins.</li><ul>{:/} | Required  |
| `CF_GIT_PROVIDER`            | The Git provider for the integration, and can be either `github`, `gitlab`, or `bitbucket`. {::nomarkdown} <ul><li>Optional when you don't define other related Git provider arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Git provider arguments. For example, when you define <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GITLAB_TOKEN</span>, then you <i>must</i> define all Git provider arguments, in this case, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gitlab</span>, and <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GITLAB_HOST_URL</span>.</li><ul>{:/}| Optional  |
| `CF_GITLAB_TOKEN`      | The token to authenticate the GitLab account. {::nomarkdown} <ul><li>Optional when you don't define any GitLab-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the GitLab-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gitlab</span>, or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GITLAB_HOST_URL</span>.</li><ul>{:/} | Optional  |
| `CF_GITLAB_HOST_URL`      | The URL address of your GitLab Cloud/Server instance.  {::nomarkdown} <ul><li>Optional when you don't define other related GitLab-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the GitLab-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gitlab</span>, or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GITLAB_TOKEN</span>.</li><ul>{:/} | Optional  |
| `CF_BITBUCKET_USERNAME`      | The username for the Bitbucket or the Bitbucket Server (on-prem) account. {::nomarkdown}<ul><li>Optional when you don't define other related Bitbucket-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Bitbucket-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">bitbucket</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_PASSWORD</span> or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_HOST_URL</span>.</li><ul>{:/}| Optional  |
| `CF_BITBUCKET_PASSWORD`      | The password for the Bitbucket or the BitBucket Server (on-prem) account. {::nomarkdown} <ul><li>Optional when you don't define other related Bitbucket-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Bitbucket-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">bitbucket</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_USERNAME</span>, or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_HOST_URL</span>.</li><ul>{:/}| Optional  |
| `CF_BITBUCKET_HOST_URL`      | Relevant for Bitbucket Server accounts only. The URL address of your Bitbucket Server instance. Example, `https://bitbucket-server:7990`. {::nomarkdown}<ul><li>Optional when you don't define other related Bitbucket Server-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. </li><li>Required when you define at least one of the Bitbucket Server-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">bitbucket</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_USERNAME</span> or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_PASSWORD</span>.</li></ul>{:/} | Optional  |
|`CF_JIRA_PROJECT_PREFIX` | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The Jira project prefix that identifies the ticket number to use.| Required|
| `CF_JIRA_MESSAGE`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The Jira issue IDs matching the string to associate with the image.  | Required  |
| `CF_JIRA_FAIL_ON_NOT_FOUND`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The report image action when the `CF_JIRA_MESSAGE` is not found. When set to `true`, the report image action is failed.  | Required  |

## Related articles
[Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
[Issue tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  






