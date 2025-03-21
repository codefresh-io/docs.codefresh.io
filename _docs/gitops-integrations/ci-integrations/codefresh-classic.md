---
title: "GitOps Codefresh pipeline integration"
description: "Connect CI pipelines with GitOps for enriched image data"
group: gitops-integrations
toc: true
---


If Codefresh Pipelines is your CI tool, you can integrate it with GitOps for streamlined deployment, image enrichment, and reporting. This integration allows you to leverage Codefresh Pipelines for CI tasks—such as building, testing, and scanning code—while using GitOps for managing deployments and tracking enriched image metadata.

 Connecting a Codefresh Pipeline, adds the CI information to images which are displayed in the Images dashboard, as in the example below.  


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
    type: codefresh-report-image:1.0.10
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

## Codefresh pipeline-GitOps integration settings
The table describes the arguments required to connect Codefresh pipelines to Codefresh GitOps. 

{{site.data.callout.callout_tip}}
**TIP**  
Except for Git branch and Git repo which are required, you can omit other Git provider arguments. Codefresh retrieves the required values from the Runtime context selected for the integration.
{{site.data.callout.end}}

For the complete argument reference, see [GitOps integrations argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-argument-reference/).


{: .table .table-bordered .table-hover}
| Argument    | Description     | Required/Optional/Default |
| ----------  |  -------- | ------------------------- |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |
| `CF_PLATFORM_URL`       | The root URL of the Codefresh application. The default value is `https://g.codefresh.io`.  | Optional  |
| `CF_API_KEY`            | The API key to authenticate the Codefresh pipeline user to Codefresh. Generate the key for the integration.  | Required  |
| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored to reference in the CI pipeline. See [Container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).<br><br>Alternatively, you can use _one_ of these container registries with explicit credentials:{::nomarkdown} <ul><li>DockerHub registry with <code class="highlighter-rouge"> CF_DOCKERHUB_USERNAME</code> and <code class="highlighter-rouge">CF_DOCKERHUB_PASSWORD</code>.</li><li><a href="https://docs.docker.com/registry/spec/api/">Docker Registry Protocol v2</a> with <code class="highlighter-rouge"> CF_REGISTRY_DOMAIN</code>, <code class="highlighter-rouge"> CF_REGISTRY_USERNAME</code>, and <code class="highlighter-rouge">CF_REGISTRY_PASSWORD</code>.</li><li>Google Artifact Registry (GAR)  with <code class="highlighter-rouge"> CF_GOOGLE_JSON_KEY</code> and <code class="highlighter-rouge">CF_GOOGLE_REGISTRY_HOST</code>.</li></ul>{:/}| Optional  |
| `CF_DOCKERHUB_USERNAME` | Relevant only to provide explicit credentials to the Docker Hub container registry where the image is stored. <br>The username for the Docker Hub container registry.<br><br>To use a Docker Hub container registry integration created in Codefresh, set `CF_CONTAINER_REGISTRY_INTEGRATION` instead. | Optional  |
| `CF_DOCKERHUB_PASSWORD` | Relevant only if `CF_DOCKERHUB_USERNAME` is specified.<br>The password for the Docker Hub container registry. | Optional  |
| `CF_REGISTRY_USERNAME` | Relevant for container registries that support [Docker Registry Protocol v2](https://docs.docker.com/registry/spec/api/){:target="\_blank"}. <br>The username for the Docker Registry Protocol v2 container registry. <br><br>To use a container registry integration created in Codefresh, set `CF_CONTAINER_REGISTRY_INTEGRATION` instead. | Optional  |
| `CF_REGISTRY_PASSWORD` | Relevant only if `CF_REGISTRY_USERNAME` is specified.<br> The password for the Docker Registry Protocol v2 container registry.  | Optional  |
| `CF_REGISTRY_DOMAIN` | Relevant only if `CF_REGISTRY_USERNAME` and `CF_REGISTRY_PASSWORD` are specified. <br> The domain for the Docker Registry Protocol v2 container registry.  | Optional  |
| `CF_GOOGLE_JSON_KEY` | Relevant only for Google Artifact Registry (GAR) or Google Container Registry (GCR).<br> The Google Cloud Platform Service Account key in JSON format to authenticate to GAR or GCR.  | Optional  |
| `CF_GOOGLE_REGISTRY_HOST` | Relevant only if `CF_GOOGLE_JSON_KEY` is specified.<br>The GAR or GCR host. <br>For example, `us-central1-docker.pkg.dev` or `gcr.io`.| Optional  |
| `CF_JIRA_INTEGRATION`               | Deprecated from version 0.0.565. Replaced by `CF_ISSUE_TRACKING_INTEGRATION`. |  _Deprecated_
| `CF_ISSUE_TRACKING_INTEGRATION` | The name of the issue tracking integration created in Codefresh to use to enrich the image. Relevant only if Jira enrichment is required for the image. If you don't have a Jira integration, click **Create Atlassian Jira Integration** and configure settings. See [Jira integration]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/).  | Optional  |
| `CF_IMAGE`                    | The image to be enriched and reported in Codefresh. Pass the `[account-name]/[image-name]:[tag]` built in your CI. | Required  |
| `CF_WORKFLOW_NAME`           | The name assigned to the workflow that builds the image. When defined, the name is displayed in the Codefresh platform. Example, `Staging step` | Optional  |
| `CF_GIT_BRANCH`              | The Git branch with the commit and PR (pull request) data to add to the image. Pass the Branch from the event payload used to trigger your action.  | Required  |
| `CF_GIT_REPO`                | The Git repository with the configuration and code used to build the image.  | Required  |
| `CF_GIT_PROVIDER`            | The Git provider for the integration, and can be either `github`, `gitlab`, or `bitbucket`. {::nomarkdown} <ul><li>Optional when you don't define other related Git provider arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Git provider arguments. For example, when you define <code class="highlighter-rouge">CF_GITLAB_TOKEN</code>, then you <i>must</i> define all Git provider arguments, in this case, <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">gitlab</code>, and <code class="highlighter-rouge">CF_GITLAB_HOST_URL</code>.</li><ul>{:/}| Optional  |
| `CF_GITLAB_TOKEN`      | The token to authenticate the GitLab account. {::nomarkdown} <ul><li>Optional when you don't define any GitLab-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the GitLab-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">gitlab</code>, or <code class="highlighter-rouge">CF_GITLAB_HOST_URL</code>.</li><ul>{:/} | Optional  |
| `CF_GITLAB_HOST_URL`      | The URL address of your GitLab Cloud/Server instance.  {::nomarkdown} <ul><li>Optional when you don't define other related GitLab-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the GitLab-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">gitlab</code>, or <code class="highlighter-rouge">CF_GITLAB_TOKEN</code>.</li><ul>{:/} | Optional  |
| `CF_BITBUCKET_USERNAME`      | The username for the Bitbucket or the Bitbucket Data Center (on-prem) account. {::nomarkdown}<ul><li>Optional when you don't define other related Bitbucket-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Bitbucket-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">bitbucket</code>, <code class="highlighter-rouge">CF_BITBUCKET_PASSWORD</code> or <code class="highlighter-rouge">CF_BITBUCKET_HOST_URL</code>.</li><ul>{:/}| Optional  |
| `CF_BITBUCKET_PASSWORD`      | The password for the Bitbucket or the Bitbucket Data Center (on-prem) account. {::nomarkdown} <ul><li>Optional when you don't define other related Bitbucket-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Bitbucket-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">bitbucket</code>, <code class="highlighter-rouge">CF_BITBUCKET_USERNAME</code>, or <code class="highlighter-rouge">CF_BITBUCKET_HOST_URL</code>.</li><ul>{:/}| Optional  |
| `CF_BITBUCKET_HOST_URL`      | Relevant for Bitbucket Data Center accounts only. The URL address of your Bitbucket Data Center instance. Example, `https://bitbucket-server:7990`. {::nomarkdown}<ul><li>Optional when you don't define other related Bitbucket Data Center-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration.</li><li>Required when you define at least one of the Bitbucket Data Center-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">bitbucket</code>, <code class="highlighter-rouge">CF_BITBUCKET_USERNAME</code> or <code class="highlighter-rouge">CF_BITBUCKET_PASSWORD</code>.</li></ul>{:/}  | Optional  |
| `CF_GERRIT_CHANGE_ID`              | Relevant only for Gerrit accounts. <br>The change ID or the commit message containing the Change ID to add to the image. For Gerrit, use this instead of `CF_GIT_BRANCH`.    | Required  |
| `CF_GERRIT_HOST_URL`              | Relevant only for Gerrit accounts. <br> The URL of your website with the Gerrit instance, for example, `https://git.company-name.io`.   | Required  |
| `CF_GERRIT_USERNAME`              | Relevant only for Gerrit accounts. <br> The username for your user account in Gerrit.| Required  |
| `CF_GERRIT_PASSWORD`              | Relevant only for Gerrit accounts. <br> The HTTP password for your user account in Gerrit, to use as the access token to authenticate HTTP requests to Gerrit. | Required  |
|`CF_JIRA_PROJECT_PREFIX` | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. One or more project prefixes in Jira to identify the Jira ticket number to use.<br>**NOTE**: Multiple project prefixes require version 0.1.30 or higher. <br>To specify more than one prefix, use a comma-separated list or a regex.  {::nomarkdown}<ul><li>Comma-separated list: <code class="highlighter-rouge">DEV,PROD,SAAS</code></li><li>Regex: Regex must start with a front slash <code class="highlighter-rouge">/</code> and end with <code class="highlighter-rouge">/g</code>. <br>Example: <code class="highlighter-rouge">/[A-Z]{2,}-\d+/g</code>.</li></ul>{:/} | Required|
| `CF_JIRA_MESSAGE`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The Jira issue IDs matching the string to associate with the image.  | Required  |
| `CF_JIRA_FAIL_ON_NOT_FOUND`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The report image action when the `CF_JIRA_MESSAGE` is not found. When set to `true`, the report image action is failed.  | Required  |

For how-to instructions, see [Connect a third-party CI platform/tool to Codefresh GitOps]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/#connect-a-third-party-ci-platformtool-to-codefresh/).  

## Templatization examples for CF arguments

Arguments such as `CF_IMAGE`, `CF_GIT_BRANCH`, and `CF_JIRA_MESSAGE` are populated dynamically when the Codefresh pipeline used for integration is triggered. You can templatize the values of these arguments to ensure that the required information is included in the reported image.

{% if page.url contains '/docs/' %}
Codefresh pipelines have [system variables]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables) you can use to templatize argument values.
{% endif %}

### CF_IMAGE examples

##### Example: Report full repo and branch information
This example illustrates how to define the value for `CF_IMAGE` to report the repo owner, name, and branch, with the Git hash.

  Value:  
  {% raw %}`${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}:${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}`{% endraw %}  

  where:
  * {% raw %}`${{CF_REPO_OWNER}}`{% endraw %} reports the owner of the repository. For example, `nr-codefresh`.
  * {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository. For example, `codefresh-production`. 
  * {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} reports the normalized version of the branch name, without invalid characters in case the branch name is the Docker image tag name. For example, `pr-2345`, `new-auth-strategy` (branch names without normalization required), and `gcr.io/codefresh-inc/codefresh-io/argo-platform-audit.1.1909.0` (normalized version of original branch name `gcr.io/codefresh-inc/codefresh-io/argo-platform-audit:1.1909.0`).
  * {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %} reports the abbreviated 7-character revision hash, as used in Git. For example, `40659e7`.

##### Example: Report a specific image tag  
This example illustrates how to define the value for `CF_IMAGE` value when you know the specific image version you want to report.

  Value:  
  {% raw %}`{{CF_REPO_OWNER}}/${{CF_REPO_NAME}}:<v1.0>` {% endraw %}  

  where:
  * {% raw %}`${{CF_REPO_OWNER}}`{% endraw %} and  {% raw %}`${{CF_REPO_NAME}}`{% endraw %} report the names of the repository owner and the repository, respectively. For example, `nr-codefresh` and `codefresh-production`, respectively.
  * {% raw %}`<v1.0>`{% endraw %} reports the hard-coded tag `v1.0`.  

##### Example: Report the latest Git tag available on repository
This example illustrates how to define the value for `CF_IMAGE` value to report the latest Git tag on the repository.

Value:  
{% raw %}`codefresh/${{CF_REPO_NAME}}:latest`{% endraw %}

where:
* {% raw %}`codefresh`{% endraw %} is the hard-coded owner of the image.
* {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository that triggered the pipeline. For example, `codefresh-production`.
* {% raw %}`latest`{% endraw %} reports the latest Git tag available for the repository defined by {% raw %}`${{CF_REPO_NAME}}`{% endraw %}. For example, `v1.0.4-14-g2414721`. 


### CF_GIT_BRANCH examples

##### Example: Report Git branch or tag with committer and commit message 

This example illustrates how to report the name or tag of the Git branch with committer and commit message.

  Value:   
  {% raw %}`${{CF_REPO_NAME}}/${{CF_BRANCH}}:${{CF_COMMIT_AUTHOR}}/${{CF_COMMIT_MESSAGE}}`{% endraw %}  

  where:  
  * {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository. For example, `codefresh-production`.
  * {% raw %}`${{CF_BRANCH}}`{% endraw %} reports the branch name or tag based on the JSON payload of the Git repository that triggered the pipeline.  For example, `new-auth-strategy`.
  * {% raw %}`${{CF_COMMIT_AUTHOR}}`{% endraw %} reports the name of the user who made the commit. For example, `cf-support`.
  * {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %} reports the commit message of the repository. For example, `support oauth authentication for ci integrations`.


##### Example: Report normalized Git branch or tag with committer and commit message

This example illustrates how to report the normalized name or tag of the Git branch with committer and commit message.  
Normalizing the branch name removes any invalid characters in the name if the branch name is also used as the Docker image tag name.

  Value:  

  {% raw %}`${{CF_REPO_NAME}}/${{CF_BRANCH_TAG_NORMALIZED}}:${{CF_COMMIT_AUTHOR}}/${{CF_COMMIT_MESSAGE}}`{% endraw %}   
  
  where:
  * {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository. For example, `codefresh-production`.
  * {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} reports the normalized version of the branch name or tag based on the JSON payload of the Git repository that triggered the pipeline. 
  * {% raw %}`${{CF_COMMIT_AUTHOR}}`{% endraw %} reports the name of the user who made the commit. For example, `nr-codefresh`.
  * {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %}reports the commit message of the repository. For example, `support oauth authentication for ci integrations`.

##### Example: Report normalized Git branch or tag in lowercase with PR information  

This example illustrates how to report the normalized name or tag of the Git branch in lowercase, with PR (pull request) information.  
Normalizing the branch name removes any invalid characters in the name if the branch name is also used as the Docker image tag name.  

Value:   
  {% raw %}`${{CF_REPO_NAME}}/${{CF_BRANCH_TAG_NORMALIZED}}:${{CF_PULL_REQUEST_TARGET}}/${{CF_PULL_REQUEST_NUMBER}}`{% endraw %}  
  
  where:
  * {% raw %}`${{CF_REPO_NAME}}`{% endraw %} reports the name of the repository. For example, `production`.  
  * {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} reports the normalized version of the branch name or tag based on the JSON payload of the Git repository that triggered the pipeline. For example, `pr-2345`, `new-auth-strategy` (branch names without normalization required), and `gcr.io/codefresh-inc/codefresh-io/argo-platform-audit.1.1909.0` (normalized version of original branch name `gcr.io/codefresh-inc/codefresh-io/argo-platform-audit:1.1909.0`).
  * {% raw %}`${{CF_PULL_REQUEST_TARGET}}`{% endraw %} reports the target branch of the PR. For example, `new-auth-strategy`.
  * {% raw %}`${{CF_PULL_REQUEST_NUMBER}}`{% endraw %} reports the number of the PR. For example, `#323`.


### CF_JIRA_MESSAGE examples
The Jira message represents an existing Jira issue, and must be a literal string.  

  Value:  
  `CR-1246`

## Codefresh pipeline integration logs
View and analyze logs for Codefresh pipelines through the Logs tab. When a Codefresh pipeline is run, it is added to the Logs tab.  
You can:  
* Filter by status or by date range to view a subset of actions
* Navigate to the build file for the pipeline, and view the Codefresh report image step

<!--
{% include image.html 
lightbox="true" 
file="/images/integrations/classic/classic-logs-tab.png" 
url="/images/integrations/classic/classic-logs-tab.png"
alt="Codefresh pipelines: Logs tab"
caption="Codefresh pipelines: Logs tab"
max-width="50%"
%}
-->
##### Build in Codefresh

The Run column includes the link to the pipeline in Codefresh.  

Here is an example of the pipeline build in Codefresh with the Enrich image for GitOps step (top) and the log (down). 

{% include image.html 
lightbox="true" 
file="/images/integrations/classic/classic-pipeline-enrich-step.png" 
url="/images/integrations/classic/classic-pipeline-enrich-step.png"
alt="Codefresh pipeline with Codefresh GitOps enrich image step"
caption="Codefresh pipeline with Codefresh GitOps enrich image step"
max-width="50%"
%}

{% include image.html 
lightbox="true" 
file="/images/integrations/classic/classic-logs.png" 
url="/images/integrations/classic/classic-logs.png"
alt="Logs for Codefresh report image step in Codefresh pipeline build"
caption="Logs for Codefresh report image step in Codefresh pipeline build"
max-width="50%"
%}

## Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  