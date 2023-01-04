---
title: "Codefresh CI pipeline GitOps integration"
description: ""
group: gitops-integrations
sub_group: ci-integrations
toc: true
---


 Use Hosted GitOps with any popular Continuous Integration (CI) solution, not just with Codefresh CI. If you have Hosted or Hybrid GitOps, you can connect your CI pipelines to Hosted GitOps for deployment with image enrichment and reporting.  


 Connecting your CI pipeline, adds the CI information to images which are displayed in the Images dashboard, as in the example below.  

  {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/images-dashboard.png" 
   url="/images/integrations/images-dashboard.png" 
   alt="Images dashboard with enriched image information" 
   caption="Images dashboard with enriched image information"
   max-width="70%" 
   %}



For information on how to use the image reporting action in your Codefresh pipeline and how to configure the integration, see [CI Integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/). 


## Example of Codefresh pipeline with report image step

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

## CI pipeline-GitOps integration settings
The table describes the arguments required to connect Codefresh Classic to Codefresh. 

>Except for Git branch and Git repo which are required, you can omit other Git provider arguments. Codefresh retrieves the required values from the runtime context selected for the integration.

For the complete argument reference, see [CI integration for GitOps argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/#ci-integration-argument-reference).


{: .table .table-bordered .table-hover}
| Argument    | Description     | Required/Optional/Default |
| ----------  |  -------- | ------------------------- |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |
| `CF_PLATFORM_URL`       | The root URL of the Codefresh application. The default value is `https://g.codefresh.io`.  | Optional  |
| `CF_API_KEY`            | The API key to authenticate the Codefresh Classic user to Codefresh. Generate the key for the integration.  | Required  |
| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored. To create a container registry integration if you don't have one, click **Create Container Registry Integration**, and then configure the settings. See [Container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/). | Optional  |
| `CF_JIRA_INTEGRATION`               | Deprecated from version 0.0.565. Replaced by `CF_ISSUE_TRACKING_INTEGRATION`. |  _Deprecated_
| `CF_ISSUE_TRACKING_INTEGRATION` | The name of the issue tracking integration created in Codefresh to use to enrich the image. Relevant only if Jira enrichment is required for the image. If you don't have a Jira integration, click **Create Atlassian Jira Integration** and configure settings. See [Jira integration]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/).  | Optional  |
| `CF_IMAGE`                    | The image to be enriched and reported in Codefresh. Pass the `[account-name]/[image-name]:[tag]` built in your CI. | Required  |
| `CF_WORKFLOW_NAME`           | The name assigned to the workflow that builds the image. When defined, the name is displayed in the Codefresh platform. Example, `Staging step` | Optional  |
| `CF_GIT_BRANCH`              | The Git branch with the commit and PR (pull request) data to add to the image. Pass the Branch from the event payload used to trigger your action.  | Required  |
| `CF_GIT_REPO`                | The Git repository with the configuration and code used to build the image.  | Required  |
| `CF_GIT_PROVIDER`            | The Git provider for the integration, and can be either `github`, `gitlab`, or `bitbucket`. {::nomarkdown} <ul><li>Optional when you don't define other related Git provider arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Git provider arguments. For example, when you define <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GITLAB_TOKEN</span>, then you <i>must</i> define all Git provider arguments, in this case, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gitlab</span>, and <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GITLAB_HOST_URL</span>.</li><ul>{:/}| Optional  |
| `CF_GITLAB_TOKEN`      | The token to authenticate the GitLab account. {::nomarkdown} <ul><li>Optional when you don't define any GitLab-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the GitLab-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gitlab</span>, or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GITLAB_HOST_URL</span>.</li><ul>{:/} | Optional  |
| `CF_GITLAB_HOST_URL`      | The URL address of your GitLab Cloud/Server instance.  {::nomarkdown} <ul><li>Optional when you don't define other related GitLab-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the GitLab-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gitlab</span>, or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GITLAB_TOKEN</span>.</li><ul>{:/} | Optional  |
| `CF_BITBUCKET_USERNAME`      | The username for the Bitbucket or the Bitbucket Server (on-prem) account. {::nomarkdown}<ul><li>Optional when you don't define other related Bitbucket-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Bitbucket-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">bitbucket</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_PASSWORD</span> or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_HOST_URL</span>.</li><ul>{:/}| Optional  |
| `CF_BITBUCKET_PASSWORD`      | The password for the Bitbucket or the Bitbucket Server (on-prem) account. {::nomarkdown} <ul><li>Optional when you don't define other related Bitbucket-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Bitbucket-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">bitbucket</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_USERNAME</span>, or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_HOST_URL</span>.</li><ul>{:/}| Optional  |
| `CF_BITBUCKET_HOST_URL`      | Relevant for Bitbucket Server accounts only. The URL address of your Bitbucket Server instance. Example, `https://bitbucket-server:7990`. {::nomarkdown}<ul><li>Optional when you don't define other related Bitbucket Server-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration.</li><li>Required when you define at least one of the Bitbucket Server-specific arguments, such as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_GIT_PROVIDER</span> as <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">bitbucket</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_USERNAME</span> or <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">CF_BITBUCKET_PASSWORD</span>.</li></ul>{:/}  | Optional  |
|`CF_JIRA_PROJECT_PREFIX` | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The Jira project prefix that identifies the ticket number to use.| Required|
| `CF_JIRA_MESSAGE`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The Jira issue IDs matching the string to associate with the image.  | Required  |
| `CF_JIRA_FAIL_ON_NOT_FOUND`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The report image action when the `CF_JIRA_MESSAGE` is not found. When set to `true`, the report image action is failed.  | Required  |

For how-to instructions, see [Connect a third-party CI platform/tool to Codefresh GitOps]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/#connect-a-third-party-ci-platformtool-to-codefresh/).  

## Templatization examples for CF arguments

Arguments such as `CF_IMAGE`, `CF_GIT_BRANCH`, and `CF_JIRA_MESSAGE` are populated dynamically when the Codefresh integration pipeline is triggered. You can templatize the values of these arguments to ensure that the required information is included in the reported image.

Codefresh pipelines have [system variables]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables) you can use to templatize argument values.

{::nomarkdown}
<br>
{:/}

### CF_IMAGE examples
**Example: Report full repo and branch information**  
This example illustrates how to define the value for `CF_IMAGE` to report the repo owner, name, and branch, with the Git hash.

  Value:  
  {% raw %}`${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}:${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}`{% endraw %}  

  where:
  * {% raw %}`${{CF_REPO_OWNER}}`{% endraw %} reports the owner of the repository. For example, `nr-codefresh`.
  * {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository. For example, `codefresh-production`. 
  * {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} reports the normalized version of the branch name, without invalid characters in case the branch name is the Docker image tag name. For example, `pr-2345`, `new-auth-strategy` (branch names without normalization required), and `gcr.io/codefresh-inc/codefresh-io/argo-platform-audit.1.1909.0` (normalized version of original branch name `gcr.io/codefresh-inc/codefresh-io/argo-platform-audit:1.1909.0`).
  * {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %} reports the abbreviated 7-character revision hash, as used in Git. For example, `40659e7`.

**Example: Report a specific image tag**  
This example illustrates how to define the value for `CF_IMAGE` value when you know the specific image version you want to report.

  Value:  
  {% raw %}`{{CF_REPO_OWNER}}/${{CF_REPO_NAME}}:<v1.0>` {% endraw %}  

  where:
  * {% raw %}`${{CF_REPO_OWNER}}`{% endraw %} and  {% raw %}`${{CF_REPO_NAME}}`{% endraw %} report the names of the repository owner and the repository, respectively. For example, `nr-codefresh` and `codefresh-production`, respectively.
  * {% raw %}`<v1.0>`{% endraw %} reports the hard-coded tag `v1.0`.  

**Example: Report the latest Git tag available on repository**
This example illustrates how to define the value for `CF_IMAGE` value to report the latest Git tag on the repository.

Value:  
{% raw %}`codefresh/${{CF_REPO_NAME}}:latest`{% endraw %}

where:
* {% raw %}`codefresh`{% endraw %} is the hard-coded owner of the image.
* {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository that triggered the pipeline. For example, `codefresh-production`.
* {% raw %}`latest`{% endraw %} reports the latest Git tag available for the repository defined by {% raw %}`${{CF_REPO_NAME}}`{% endraw %}. For example, `v1.0.4-14-g2414721`. 

{::nomarkdown}
<br>
{:/}

### CF_GIT_BRANCH examples

**Example: Report Git branch or tag with committer and commit message**  

This example illustrates how to report the name or tag of the Git branch with committer and commit message.

  Value:   
  {% raw %}`${{CF_REPO_NAME}}/${{CF_BRANCH}}:${{CF_COMMIT_AUTHOR}}/${{CF_COMMIT_MESSAGE}}`{% endraw %}  

  where:  
  * {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository. For example, `codefresh-production`.
  * {% raw %}`${{CF_BRANCH}}`{% endraw %} reports the branch name or tag based on the JSON payload of the Git repository that triggered the pipeline.  For example, `new-auth-strategy`.
  * {% raw %}`${{CF_COMMIT_AUTHOR}}`{% endraw %} reports the name of the user who made the commit. For example, `cf-support`.
  * {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %} reports the commit message of the repository. For example, `support oauth authentication for ci integrations`.


**Example: Report normalized Git branch or tag with committer and commit message**  

This example illustrates how to report the normalized name or tag of the Git branch with committer and commit message.  
Normalizing the branch name removes any invalid characters in the name if the branch name is also used as the Docker image tag name.

  Value:  

  {% raw %}`${{CF_REPO_NAME}}/${{CF_BRANCH_TAG_NORMALIZED}}:${{CF_COMMIT_AUTHOR}}/${{CF_COMMIT_MESSAGE}}`{% endraw %}   
  
  where:
  * {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository. For example, `codefresh-production`.
  * {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} reports the normalized version of the branch name or tag based on the JSON payload of the Git repository that triggered the pipeline. 
  * {% raw %}`${{CF_COMMIT_AUTHOR}}`{% endraw %} reports the name of the user who made the commit. For example, `nr-codefresh`.
  * {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %}reports the commit message of the repository. For example, `support oauth authentication for ci integrations`.

**Example: Report normalized Git branch or tag in lowercase with PR information**  

This example illustrates how to report the normalized name or tag of the Git branch in lowercase, with PR (pull request) information.  
Normalizing the branch name removes any invalid characters in the name if the branch name is also used as the Docker image tag name.  

Value:   
  {% raw %}`${{CF_REPO_NAME}}/${{CF_BRANCH_TAG_NORMALIZED}}:${{CF_PULL_REQUEST_TARGET}}/${{CF_PULL_REQUEST_NUMBER}}`{% endraw %}  
  
  where:
  * {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository. For example, `production`.  
  * {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} reports the normalized version of the branch name or tag based on the JSON payload of the Git repository that triggered the pipeline. For example, `pr-2345`, `new-auth-strategy` (branch names without normalization required), and `gcr.io/codefresh-inc/codefresh-io/argo-platform-audit.1.1909.0` (normalized version of original branch name `gcr.io/codefresh-inc/codefresh-io/argo-platform-audit:1.1909.0`).
  * {% raw %}`${{CF_PULL_REQUEST_TARGET}}`{% endraw %} reports the target branch of the PR. For example, `new-auth-strategy`.
  * {% raw %}`${{CF_PULL_REQUEST_NUMBER}}`{% endraw %} reports the number of the PR. For example, `#323`.

{::nomarkdown}
<br>
{:/}

### CF_JIRA_MESSAGE examples
The Jira message represents an existing Jira issue, and must be a literal string.  

  Value:  
  `CR-1246`

## Codefresh pipeline integration logs
View and analyze logs for Codefresh pipelines through the Logs tab. When a Codefresh pipeline is run, it is added to the Logs tab.  
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

**Build in Codefresh**  

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

## Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  