---
title: "GitOps GitHub Actions integration"
description: ""
group: gitops-integrations
sub_group: ci-integrations
toc: true
---

Use Hosted GitOps with any popular Continuous Integration (CI) solution, not just with Codefresh CI.  
GitHub Actions is one of the third-party CI solutions that you can connect to Hosted GitOps for deployment with image reporting and enrichment.  

 Connecting a GitHub Action, adds the CI information to images which are displayed in the Images dashboard, as in the example below.  

  {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/images-dashboard.png" 
   url="/images/integrations/images-dashboard.png" 
   alt="Images dashboard with enriched image information" 
   caption="Images dashboard with enriched image information"
   max-width="70%" 
   %}

For information on how to use the image reporting action in your GitHub Action pipeline and how to configure the integration, see [CI Integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/).


## Example of GitHub Actions pipeline with Codefresh report image action


Here is an example pipeline that uses GitHub Actions to build a container image, and the Codefresh action to enrich and report the resulting image to Codefresh.  

Because a Jira integration account is configured in Codefresh, the step needs only the name for `CF_JIRA_INTEGRATION`, instead of explicit credentials `CF_JIRA_API_TOKEN`, `CF_JIRA_HOST_URL`, and `CF_JIRA_EMAIL`. 


{% highlight yaml %}
{% raw %}

name: Docker Image CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
jobs:
  build:
    environment:
      name: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build & push the Docker image
        env:
          CF_IMAGE: ${{ secrets.DOCKERHUB_USERNAME }}/build-by-github-action:0.0.1
        run: |
          docker build . --file Dockerfile --tag $CF_IMAGE && docker push $CF_IMAGE
          echo "Image should be accessible to your local machine (after docker login) by:"
          echo "docker pull $CF_IMAGE"
          docker pull $CF_IMAGE
          echo "On the next step, the report image would use the integration to pull information on the reported image, using the specified enrichers."
      - name: report image by action
        with:
          # Name of runtime to implement the enrichment
          CF_RUNTIME_NAME: 'codefresh-hosted'

          # Codefresh API key !! Committing a plain text token is a security risk. We highly recommend using encrypted secrets. !!
          # Documentation - https://docs.github.com/en/actions/security-guides/encrypted-secrets
          CF_API_KEY: ${{ secrets.USER_TOKEN }}

          # Name of Container registry integration
          CF_CONTAINER_REGISTRY_INTEGRATION: 'docker'

          # The git branch which is related for the commit
          CF_GIT_BRANCH: 'main'

          # Image path to enrich 
          CF_IMAGE: ${{ secrets.DOCKERHUB_USERNAME }}/build-by-github-action:0.0.1

          # GitHub Access token !! Committing a plain text token is a security risk. We highly recommend using encrypted secrets. !!
          # Documentation - https://docs.github.com/en/actions/security-guides/encrypted-secrets
          CF_GITHUB_TOKEN: ${{ secrets.CF_GITHUB_TOKEN }}    

          # Name of Jira integration
          CF_ISSUE_TRACKING_INTEGRATION: 'jira' 

         # String starting with the issue ID to associate with image
          CF_JIRA_MESSAGE: 'CR-11027'

          # Jira project filter
          CF_JIRA_PROJECT_PREFIX: "CR"
        uses: codefresh-io/codefresh-report-image@latest
        
        
{% endraw %}
{% endhighlight yaml %}

## GitHub Action-GitOps integration settings
The table describes the arguments required to connect a GitHub Action to Codefresh. 


 {: .table .table-bordered .table-hover}
| Argument  | Description     | Required/Optional/Default |
| ---------- |  -------- | ------------------------- |
| `CF_HOST`                      | _Deprecated from v 0.0.460 and higher._ Recommend using `CF_RUNTIME_NAME` instead. {::nomarkdown}<br><code class="highlighter-rouge">CF_HOST</code> has been deprecated because the URL is not static, and any change can fail the enrichment.<br><br>  The URL to the cluster with the Codefresh runtime to integrate with. If you have more than one runtime, select the runtime from the list. Codefresh displays the URL of the selected runtime cluster.{:/}   | Required  |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |
| `CF_PLATFORM_URL`       | The root URL of the Codefresh application. The default value is `https://g.codefresh.io`.  | Optional  |
| `CF_API_KEY`                   | The API key to authenticate the GitHub Actions user to Codefresh. Generate the key for the GitHub Action. {::nomarkdown}<br>Enter this token in GitHub Actions <a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets" target=”_blank”>as a secret</a> with the name <code class="highlighter-rouge">CF_API_KEY</code>. You can then reference it in all GitHub pipelines as you would any other secret.{:/}| Required  |
| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored. {::nomarkdown}<br><ul><li>For a GitHub Container registry, select <code class="highlighter-rouge">GHCR_GITHUB_TOKEN_AUTHENTICATION</code> even if you have not created an integration in Codefresh.<br>Codefresh retrieves and provides the explicit credentials for the container registry on generating the integration manifest.</li> <li>To create a container registry integration in Codefresh, if you don't have one, click <b>Create Container Registry Integration</b>, and then configure the settings.<br>See <a href="https://codefresh.io/docs/docs/gitops-integrations/container-registries/">Container registry integrations</a>.</li><li>Alternatively, you can use <i>one</i> of these container registries with explicit credentials:<ul><li>DockerHub registry with <code class="highlighter-rouge"> CF_DOCKERHUB_USERNAME</code> and <code class="highlighter-rouge">CF_DOCKERHUB_PASSWORD</code>.</li><li><a href="https://docs.docker.com/registry/spec/api/">Docker Registry Protocol v2</a> with <code class="highlighter-rouge"> CF_REGISTRY_DOMAIN</code>, <code class="highlighter-rouge"> CF_REGISTRY_USERNAME</code>, and <code class="highlighter-rouge">CF_REGISTRY_PASSWORD</code>.</li><li>Google Artifact Registry (GAR)  with <code class="highlighter-rouge"> CF_GOOGLE_JSON_KEY</code> and <code class="highlighter-rouge">CF_GOOGLE_REGISTRY_HOST</code>.</li></li></ul></ul>{:/} | Optional  |
| `CF_DOCKERHUB_USERNAME` | Relevant only to provide explicit credentials to the Docker Hub container registry where the image is stored. <br>The username for the Docker Hub container registry.<br><br>To use a Docker Hub container registry integration created in Codefresh, set `CF_CONTAINER_REGISTRY_INTEGRATION` instead. | Optional  |
| `CF_DOCKERHUB_PASSWORD` | Relevant only if `CF_DOCKERHUB_USERNAME` is specified.<br>The password for the Docker Hub container registry. | Optional  |
| `CF_REGISTRY_USERNAME` | Relevant for container registries that support [Docker Registry Protocol v2](https://docs.docker.com/registry/spec/api/){:target="\_blank"}. <br>The username for the Docker Registry Protocol v2 container registry. <br><br>To use a container registry integration created in Codefresh, set `CF_CONTAINER_REGISTRY_INTEGRATION` instead. | Optional  |
| `CF_REGISTRY_PASSWORD` | Relevant only if `CF_REGISTRY_USERNAME` is specified.<br> The password for the Docker Registry Protocol v2 container registry.  | Optional  |
| `CF_REGISTRY_DOMAIN` | Relevant only if `CF_REGISTRY_USERNAME` and `CF_REGISTRY_PASSWORD` are specified. <br> The domain for the Docker Registry Protocol v2 container registry.  | Optional  |
| `CF_GOOGLE_JSON_KEY` | Relevant only for Google Artifact Registry (GAR) or Google Container Registry (GCR).<br> The Google Cloud Platform Service Account key in JSON format to authenticate to GAR or GCR.  | Optional  |
| `CF_GOOGLE_REGISTRY_HOST` | Relevant only if `CF_GOOGLE_JSON_KEY` is specified.<br>The GAR or GCR host. <br>For example, `us-central1-docker.pkg.dev` or `gcr.io`.| Optional  |
| `CF_GIT_REPO`                       | The Git repository with the configuration and code used to build the image. If not defined, Codefresh retrieves it from the repo defined for the GitHub Action. | Required  |
| `CF_JIRA_INTEGRATION`               | Deprecated from version 0.0.565. Replaced by `CF_ISSUE_TRACKING_INTEGRATION`. |  _Deprecated_
| `CF_ISSUE_TRACKING_INTEGRATION` | The name of the issue tracking integration created in Codefresh to use to enrich the image. Relevant only if Jira enrichment is required for the image. If you don't have a Jira integration, click **Create Atlassian Jira Integration** and configure settings. See [Jira integration]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/).  | Optional  |
| `CF_IMAGE`                    | The image to be enriched and reported in Codefresh. Pass the `[account-name]/[image-name]:[tag]` built in your CI. | Required  |
| `CF_WORKFLOW_NAME`           | The name assigned to the workflow that builds the image. When defined, the name is displayed in the Codefresh platform. Example, `Staging step` | Optional  |
| `CF_GIT_BRANCH`              | The Git branch with the commit and PR (pull request) data to add to the image. Pass the Branch from the event payload used to trigger your action.  | Required  |
| `CF_GITHUB_TOKEN`            | The GitHub authentication token. See [Git tokens]({{site.baseurl}}/docs/reference/git-tokens/#git-personal-tokens). | Required  |
| `CF_GERRIT_CHANGE_ID`              | Relevant only for Gerrit accounts. <br>The change ID or the commit message containing the Change ID to add to the image. For Gerrit, use this instead of `CF_GIT_BRANCH`.    | Required  |
| `CF_GERRIT_HOST_URL`              | Relevant only for Gerrit accounts. <br> The URL of your website with the Gerrit instance, for example, `https://git.company-name.io`.   | Required  |
| `CF_GERRIT_USERNAME`              | Relevant only for Gerrit accounts. <br> The username for your user account in Gerrit.| Required  |
| `CF_GERRIT_PASSWORD`              | Relevant only for Gerrit accounts. <br> The HTTP password for your user account in Gerrit, to use as the access token to authenticate HTTP requests to Gerrit. | Required  |
|`CF_JIRA_PROJECT_PREFIX` | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. One or more project prefixes in Jira to identify the Jira ticket number to use.<br>**NOTE**: Multiple project prefixes require version 0.1.30 or higher. <br>To specify more than one prefix, use a comma-separated list or a regex. {::nomarkdown}<ul><li>Comma-separated list: <code class="highlighter-rouge">DEV,PROD,SAAS</code></li><li>Regex: Regex must start with a front slash <code class="highlighter-rouge">/</code> and end with <code class="highlighter-rouge">/g</code>. <br>Example: <code class="highlighter-rouge">/[A-Z]{2,}-\d+/g</code>.</li></ul>{:/} | Required|
| `CF_JIRA_MESSAGE`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The Jira issue IDs matching the string to associate with the image.  | Required  |
| `CF_JIRA_FAIL_ON_NOT_FOUND`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The report image action when the `CF_JIRA_MESSAGE` is not found. When set to `true`, the report image action is failed.  | Required  |


For how-to instructions, see [Connect a third-party CI platform/tool to Codefresh]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/#connect-a-third-party-ci-platformtool-to-codefresh).  

## Templatization examples for CF arguments

Arguments such as `CF_IMAGE`, `CF_GIT_BRANCH`, and `CF_JIRA_MESSAGE` are populated dynamically when the GitHub Actions pipeline is triggered. You can templatize the values of these arguments to ensure that the required information is included in the reported image.

See GitHub Actions [environment variables](https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables) you can use to templatize argument values.

{::nomarkdown}
<br>
{:/}

### CF_IMAGE

**Example: Report full repo and branch information**  
This example illustrates how to define the value for `CF_IMAGE` to report the repo owner, name, and short branch, with the Git hash.

  Value:  
  {% raw %}`${{ github.repository }}/${{ github.ref_name }}/${{ github.sha }}`{% endraw %}  

  where:
  * {% raw %}`${{ github.repository }}`{% endraw %} reports the owner of the repository and the name of the repository. For example, `nr-codefresh/codefresh-production`. 
  * {% raw %}`${{ github.ref_name }}`{% endraw %} reports the short reference to the branch that triggered the workflow.  For example, `auth-feature-branch`.
  * {% raw %}`${{ github.sha }}`{% endraw %} reports the complete commit SHA that triggered the workflow. For example, `fa53bfa91df14c4c9f46e628a65ee21dd574490a`.
 


**Example: Report a specific image tag**  
This example illustrates how to define the value for `CF_IMAGE`  when you know the specific image version you want to report.

Value:  
{% raw %}`${{ github.repository }}:<v1.0>`{% endraw %}  

where:  
* {% raw %}`${{ github.repository }}`{% endraw %} reports the owner of the repository and the name of the repository. For example, `nr-codefresh/codefresh-production`.  
* `<v1.0>` reports the hard-coded tag `v1.0`.


**Example: Report the latest Git tag available on repository**
This example illustrates how to define the value for `CF_IMAGE` to report the latest Git tag on the repository.

Value:  
{% raw %}`codefresh/${{ github.repository }}/latest`{% endraw %}

where:
* {% raw %}`codefresh`{% endraw %} is the hard-coded owner of the image.
* {% raw %}`${{ github.repository }}`{% endraw %} reports the owner of the repository and the name of the repository. For example, `nr-codefresh/codefresh-production`. 
* {% raw %}`latest`{% endraw %} reports the latest Git tag available for the repository defined by {% raw %}`${{ github.repository }}`{% endraw %}. For example, `v1.0.4-14-g2414721`.

{::nomarkdown}
<br>
{:/}

### CF_GIT_BRANCH 

**Example: Report fully-formed reference of the branch or tag**  
This example illustrates how to define the value for `CF_GIT_BRANCH` to report the fully-formed reference of the branch or tag that triggered the workflow run.  
For workflows triggered by push events, this is the branch or tag ref that was pushed. 
For workflows triggered by pull_requests, this is the pull request merge branch.

Value:  
{% raw %}`${{ github.ref }}`{% endraw %}

where:
* {% raw %}`${{ github.ref }}`{% endraw %} is the reference to the branch or tag. For example, `refs/heads/auth-feature-branch` (branch), and `refs/pull/#843/merge` (pull request).

**Example: Report short reference name of the branch or tag**  
This example illustrates how to define the value for `CF_GIT_BRANCH` to report only the name of the branch or tag that triggered the workflow run.  


Value:  
{% raw %}`${{ github.ref-name }}`{% endraw %}  

where: 
* {% raw %}`${{ github.ref-name }}`{% endraw %} is the name of the target branch or tag. For example, `auth-feature-branch`. 

{::nomarkdown}
<br>
{:/}

### CF_JIRA_MESSAGE
The Jira message represents an existing Jira issue, and must be a literal string.  

  Value:  
  `CR-1246`

## GitHub Action logs
View and analyze logs for GitHub Action workflows through the Logs tab. When a GitHub Action is run, it is added to the Logs tab.  
You can:  
* Filter by status or by date range to view a subset of actions
* Navigate to the build file in GitHub Actions, and view the Codefresh report image step

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-actions-logs.png" 
url="/images/integrations/github-actions/github-actions-logs.png"
alt="GitHub Action: Logs tab"
caption="GitHub Action: Logs tab"
max-width="50%"
%}

**Build YAML in GitHub Action**  

The Run column includes the link to the build files for the actions.  

Here are examples of the build file for the GitHub Action (top) and of the Codefresh report image step in the action (down).

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/action-build-yaml.png" 
url="/images/integrations/github-actions/action-build-yaml.png"
alt="Build file in GitHub Action"
caption="Build file in GitHub Action"
max-width="50%"
%}

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/actiosn-cf-report-image-step.png" 
url="/images/integrations/github-actions/actiosn-cf-report-image-step.png"
alt="Codefresh report image step in GitHub Action build file"
caption="Codefresh report image step in GitHub Action build file"
max-width="50%"
%}


## Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  


