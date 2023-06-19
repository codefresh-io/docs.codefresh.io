---
title: "GitOps Jenkins integration"
description: ""
group: gitops-integrations
sub_group: ci-integrations
toc: true
---

 Use Hosted GitOps with any popular Continuous Integration (CI) solution, not just with Codefresh CI. Jenkins is one of the third-party CI platform/tools that you can connect to Codefresh for deployment with image enrichment and reporting.  

 Connecting a Jenkins pipeline, adds the CI information to images which are displayed in the Images dashboard, as in the example below.  

  {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/images-dashboard.png" 
   url="/images/integrations/images-dashboard.png" 
   alt="Images dashboard with enriched image information" 
   caption="Images dashboard with enriched image information"
   max-width="70%" 
   %} 


For information on how to use the image reporting action in your Jenkins pipeline and how to configure the integration, see [CI Integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/). 

## Example of Jenkins pipeline with report image step

{% highlight yaml %}
{% raw %}

pipeline {
    
    agent any
    stages {
        stage('Clone repository') {               
            steps {
                checkout scm 
            }
        }
        stage ('Build & Push ') {
            environment {
                CF_IMAGE= credentials('CF_IMAGE')
            }
            steps {
                sh 'echo "Building $CF_IMAGE"'
                script {
                    def app
                    app = docker.build("${env.CF_IMAGE}")
                    // require credentials to be stored under DOCKERHUB
                    docker.withRegistry('https://registry.hub.docker.com', 'DOCKERHUB') {   
                            app.push("latest")        
                    }
                }
                sh '''
                    # test we have image in repository.
                    docker pull $CF_IMAGE
                    '''
            }
        }
        
        stage('report image') {
            environment {
                // Name of runtime to implement the enrichment
                CF_RUNTIME_NAME= 'codefresh-hosted'

                // Image path to enrich
                CF_IMAGE= credentials('CF_IMAGE')

                // Codefresh API key !! Committing a plain text token is a security risk. We highly recommend using encrypted secrets. !!
                // Documentation - https://www.jenkins.io/doc/book/using/using-credentials
                CF_API_KEY= credentials('CF_API_KEY')

                // Name of Container registry integration
                CF_CONTAINER_REGISTRY_INTEGRATION= 'docker'
                
                // Name of Jira integration
                CF_ISSUE_TRACKING_INTEGRATION= 'jira'
                
                // String starting with the issue ID to associate with image
                CF_JIRA_MESSAGE= 'CR-11027'
                
                // Jira project filter
                CF_JIRA_PROJECT_PREFIX= 'CR'

                // GitHub Access token !! Committing a plain text token is a security risk. We highly recommend using encrypted secrets. !!
                // Documentation - https://www.jenkins.io/doc/book/using/using-credentials
                CF_GITHUB_TOKEN= credentials('CF_GITHUB_TOKEN')
            }
            steps {
                sh '''
                    export CF_CI_TYPE="jenkins"
                    # add workflow details
                    export CF_WORKFLOW_NAME="${CF_WORKFLOW_NAME:-$JOB_NAME}"
                    export CF_WORKFLOW_URL="${CF_WORKFLOW_URL:-$BUILD_URL}"
                    # add git branch
                    export CF_GIT_PROVIDER="${CF_GIT_PROVIDER:-github}"
                    WITHOUT_POSTFIX="${GIT_URL%.*}"
                    export CF_GIT_REPO="${CF_GIT_REPO:-${WITHOUT_POSTFIX#*//*/}}"
                    # slice branch name from repo/branch
                    export CF_GIT_BRANCH="${CF_GIT_BRANCH:-${GIT_BRANCH#*/}}"
                    env | cut -f 1 -d "=" | grep -E "^CF_"  > cf_env
                    docker run --env-file=cf_env "quay.io/codefresh/codefresh-report-image:latest"
                '''
            }
        }
        
    }
}

{% endraw %}
{% endhighlight yaml %}

## Jenkins-GitOps integration settings
The table describes the arguments to connect Codefresh pipelines to Codefresh GitOps.  

{: .table .table-bordered .table-hover}
| Argument    | Description     | Required/Optional/Default |
| ----------  |  -------- | ------------------------- |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |
| `CF_PLATFORM_URL`       | The root URL of the Codefresh application. The default value is `https://g.codefresh.io`.  | Optional  |
| `CF_API_KEY`            | The API key to authenticate the Codefresh pipeline user to Codefresh. Generate the key for the integration.  | Required  |
| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored. To create a container registry integration if you don't have one, click **Create Container Registry Integration**, and then configure the settings. See [Container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/). | Optional  |
| `CF_JIRA_INTEGRATION`               | Deprecated from version 0.0.565. Replaced by `CF_ISSUE_TRACKING_INTEGRATION`. | _Deprecated_
| `CF_ISSUE_TRACKING_INTEGRATION` | The name of the issue tracking integration created in Codefresh to use to enrich the image. Relevant only if Jira enrichment is required for the image. If you don't have a Jira integration, click **Create Atlassian Jira Integration** and configure settings. See [Jira integration]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/).  | Optional  |
| `CF_IMAGE`                    | The image to be enriched and reported in Codefresh. Pass the `[account-name]/[image-name]:[tag]` built in your CI. | Required  |
| `CF_GIT_BRANCH`              | The Git branch with the commit and PR (pull request) data to add to the image. Pass the Branch from the event payload used to trigger your action.  | Required  |
| `CF_GIT_REPO`                | The Git repository with the configuration and code used to build the image.  | Required  |
| `CF_GIT_PROVIDER`            | The Git provider for the integration, and can be either `github`, `gitlab`, or `bitbucket`. {::nomarkdown} <ul><li>Optional when you don't define other related Git provider arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Git provider arguments. For example, when you define <code class="highlighter-rouge">CF_GITLAB_TOKEN</code>, then you <i>must</i> define all Git provider arguments, in this case, <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">gitlab</code>, and <code class="highlighter-rouge">CF_GITLAB_HOST_URL</code>.</li><ul>{:/}| Optional  |
| `CF_GITLAB_TOKEN`      | The token to authenticate the GitLab account. {::nomarkdown} <ul><li>Optional when you don't define any GitLab-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the GitLab-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">gitlab</code>, or <code class="highlighter-rouge">CF_GITLAB_HOST_URL</code>.</li><ul>{:/} | Optional  |
| `CF_GITLAB_HOST_URL`      | The URL address of your GitLab Cloud/Server instance.  {::nomarkdown} <ul><li>Optional when you don't define other related GitLab-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required if you define at least one of the GitLab-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">gitlab</code>, or <code class="highlighter-rouge">CF_GITLAB_TOKEN</code>.</li><ul>{:/} | Optional  |
| `CF_BITBUCKET_USERNAME`      | The username for the Bitbucket or the Bitbucket Server (on-prem) account. {::nomarkdown}<ul><li>Optional when you don't define other related Bitbucket-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Bitbucket-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">bitbucket</code>, <code class="highlighter-rouge">CF_BITBUCKET_PASSWORD</code> or <code class="highlighter-rouge">CF_BITBUCKET_HOST_URL</code>.</li><ul>{:/}| Optional  |
| `CF_BITBUCKET_PASSWORD`      | The password for the Bitbucket or the Bitbucket Server (on-prem) account. {::nomarkdown} <ul><li>Optional when you don't define other related Bitbucket-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration. <li>Required when you define at least one of the Bitbucket-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">bitbucket</code>, <code class="highlighter-rouge">CF_BITBUCKET_USERNAME</code>, or <code class="highlighter-rouge">CF_BITBUCKET_HOST_URL</code>.</li><ul>{:/}| Optional  |
| `CF_BITBUCKET_HOST_URL`      | Relevant for Bitbucket Server accounts only. The URL address of your Bitbucket Server instance. Example, `https://bitbucket-server:7990`. {::nomarkdown}<ul><li>Optional when you don't define other related Bitbucket Server-specific arguments. When not defined, Codefresh retrieves the required information from the runtime selected for the integration.</li><li>Required when you define at least one of the Bitbucket Server-specific arguments, such as <code class="highlighter-rouge">CF_GIT_PROVIDER</code> as <code class="highlighter-rouge">bitbucket</code>, <code class="highlighter-rouge">CF_BITBUCKET_USERNAME</code> or <code class="highlighter-rouge">CF_BITBUCKET_PASSWORD</code>.</li></ul>{:/} | Optional  |
| `CF_GERRIT_CHANGE_ID`              | Relevant only for Gerrit accounts. <br>The change ID or the commit message containing the Change ID to add to the image. For Gerrit, use this instead of `CF_GIT_BRANCH`.    | Required  |
| `CF_GERRIT_HOST_URL`              | Relevant only for Gerrit accounts. <br> The URL of your website with the Gerrit instance, for example, `https://git.company-name.io`.   | Required  |
| `CF_GERRIT_USERNAME`              | Relevant only for Gerrit accounts. <br> The username for your user account in Gerrit.| Required  |
| `CF_GERRIT_PASSWORD`              | Relevant only for Gerrit accounts. <br> The HTTP password for your user account in Gerrit, to use as the access token to authenticate HTTP requests to Gerrit. | Required  |
|`CF_JIRA_PROJECT_PREFIX` | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. One or more project prefixes in Jira to identify the Jira ticket number to use.<br>**NOTE**: Multiple project prefixes require version 0.1.30 or higher. <br>To specify more than one prefix, use a comma-separated list or a regex.{::nomarkdown}<ul><li>Comma-separated list: <code class="highlighter-rouge">DEV,PROD,SAAS</code></li><li>Regex: Regex must start with a front slash <code class="highlighter-rouge">/</code> and end with <code class="highlighter-rouge">/g</code>. <br>Example: <code class="highlighter-rouge">/[A-Z]{2,}-\d+/g</code>.</li></ul>{:/} | Required|
| `CF_JIRA_MESSAGE`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The Jira issue IDs matching the string to associate with the image.  | Required  |
| `CF_JIRA_FAIL_ON_NOT_FOUND`            | Relevant only when `CF_ISSUE_TRACKING_INTEGRATION` is defined. The report image action when the `CF_JIRA_MESSAGE` is not found. When set to `true`, the report image action is failed.  | Required  |


For how-to instructions, see [Connect a third-party CI platform/tool to Codefresh]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/#connect-a-third-party-ci-platform-tool-to-codefresh).  

## Templatization examples for CF arguments

Arguments such as `CF_IMAGE`, `CF_GIT_BRANCH`, and `CF_JIRA_MESSAGE` are populated dynamically when the Jenkins pipeline is triggered. You can templatize the values of these arguments in the pipeline to ensure that the required information is included in the reported image.

Jenkins offers a Git plugin with [environment variables](https://plugins.jenkins.io/git/#plugin-content-environment-variables){:target="\_blank"} you can use to templatize argument values.

{::nomarkdown}
<br>
{:/}

### CF_IMAGE
**Example: Report repo, branch with Git hash**  
This example illustrates how to define the value for `CF_IMAGE` to report Git repo, branch, committer, and Git hash information.

  Value:   
  {% raw %}`${env.GIT_COMMITTER_NAME}/${env.GIT_URL}/${env.GIT_BRANCH}/${env.GIT_REVISION}`{% endraw %}  

  where:
  *  {% raw %}`${env.GIT_COMMITTER_NAME}`{% endraw %} reports the name of the user who made the commit. For example, `nr-codefresh`.
  * {% raw %}`${env.GIT_URL}`{% endraw %} reports the name of the Git repository. For example, `codefresh-production`. 
  * {% raw %}`${env.GIT_BRANCH}`{% endraw %} reports the name of the Git branch. For example, `pr-2345`, `new-auth-strategy`.
  * {% raw %}`${env.GIT_REVISION}`{% endraw %} reports the Git SHA1 commit ID pointing to the commit that was built. For example, `fa53bfa91df14c4c9f46e628a65ee21dd574490a`.


**Example: Report a specific image tag**  
This example illustrates how to define the value for `CF_IMAGE` when you know the specific image version you want to report.

  Value:  
  {% raw %}`${env.GIT_COMMITTER_NAME}/${env.GIT_URL}/<v1.0>`{% endraw %} 
  
  where:
  * {% raw %}`${env.GIT_COMMITTER_NAME}`{% endraw %} and {% raw %}`${env.GIT_URL}`{% endraw %} report the names of the user hwo made the commit and the repository, respectively. For example, `nr-codefresh` and `codefresh-production`, respectively.
  * {% raw %}`<v1.0>`{% endraw %} reports the hard-coded tag `v1.0`.


**Example: Report the latest Git tag available on repository**  
This example illustrates how to define the value for `CF_IMAGE` value to report the latest Git tag on the repository.   
  
  Value:  
  {% raw %}`codefresh/${env.GIT_URL}/latest`{% endraw %}  

  where:
  * {% raw %}`codefresh`{% endraw %} is the hard-coded re  
  * {% raw %}`${env.GIT_URL}`{% endraw %} reports the name of the repository that triggered the integration.  
  * {% raw %}`latest`{% endraw %} reports the latest Git tag available for the repository defined by {% raw %}`${env.GIT_URL}`{% endraw %}. For example, `v1.0.4-14-g2414721`. 

{::nomarkdown}
<br>
{:/}

### CF_GIT_BRANCH

**Example: Report the fully-formed Git branch**  
This example illustrates how to define the value for `CF_GIT_BRANCH` value to report the fully-formed Git branch.   

  Value:  
  {% raw %}`${env.GIT_URL}/${env.GIT_BRANCH}`{% endraw %}    
  
  where:
  * {% raw %}`${env.GIT_URL}`{% endraw %} is the name of the repository that triggered the pipeline. For example, `codefresh-production`.
  * {% raw %}`${env.GIT_BRANCH}`{% endraw %} is the fully-formed name of the Git branch. For example, `origin/auth-feature-branch`. 


**Example: Report the local Git branch**  
This example illustrates how to define the value for `CF_GIT_BRANCH` value to report only the branch in the repository that triggerred the pipeline.   

  Value:  
  {% raw %}`${env.GIT_URL}/${env.GIT_LOCAL_BRANCH}`{% endraw %} 
  
  where:
  * {% raw %}`${env.GIT_URL}`{% endraw %} is the name of the repository that triggered the piepline.
  * {% raw %}`${env.GIT_LOCAL_BRANCH}`{% endraw %} is the name of the Git branch. For example, `auth-feature-branch`. 

{::nomarkdown}
<br>
{:/}

### CF_JIRA_MESSAGE
The Jira message represents an existing Jira issue, and must be a literal string.  

  Value:  
  `CR-1246`

## Jenkins integration logs
View and analyze logs for Jenkins through the Logs tab. When a Jenkins pipeline is run, it is added to the Logs tab.  
You can:  
* Filter by status or by date range to view a subset of actions
* Navigate to the build file in Jenkins, and view the Codefresh report image step.


**Build in Jenkins**  

The Run column includes the link to the pipeline in Jenkins.  

Here is an example of the Jenkins log for the pipeline with the report image step. 

{% include image.html 
lightbox="true" 
file="/images/integrations/jenkins/jenkins-integration-log.png" 
url="/images/integrations/jenkins/jenkins-integration-log.png"
alt="Logs for Codefresh report image step in Jenkins build"
caption="Logs for Codefresh report image step in Jenkins build"
max-width="50%"
%}

## Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
