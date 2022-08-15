---
title: "Jenkins"
description: ""
group: integrations
sub_group: ci-integrations
toc: true
---

 Use Hosted GitOps with any popular Continuous Integration (CI) solution, not just with Codefresh CI. Jenkins is one of the third-party CI platform/tools that you can connect to Codefresh for deployment with image enrichment and reporting. 

For information on how to use the image reporting action in your Jenkins pipeline and how to configure the integration, see [CI Integrations]({{site.baseurl}}/docs/integrations/ci-integrations/). 



### Jenkins-Codefresh integration arguments
The table describes the arguments to connect Codefresh Classic to Codefresh.  

{: .table .table-bordered .table-hover}
| Argument    | Description     | Required/Optional/Default |
| ----------  |  -------- | ------------------------- |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |
| `CF_API_KEY`            | The API key to authenticate the Codefresh Classic user to Codefresh. Generate the key for the integration.  | Required  |
| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored. To create a container registry integration if you don't have one, click **Create Container Registry Integration**, and then configure the settings. See [Container registry integrations]({{site.baseurl}}/docs/integrations/container-registries/). | Optional  |
| `CF_JIRA_INTEGRATION`               | The name of the issue tracking integration created in Codefresh to use to enrich the image. Relevant only if Jira enrichment is required for the image. If you don't have a Jira integration, click **Create Atlassian Jira Integration** and configure settings (see [Jira integration]({{site.baseurl}}/docs/integrations/issue-tracking/jira/)).  | Optional  |
| `CF_IMAGE`                    | The image to be enriched and reported in Codefresh. Pass the `[account-name]/[image-name]:[tag]` built in your CI. | Required  |
| `CF_GIT_BRANCH`              | The Git branch with the commit and PR (pull request) data to add to the image. Pass the Branch from the event payload used to trigger your action.  | Required  |
| `CF_GIT_REPO`                | The Git repository with the configuration and code used to build the image.  | Required  |
| `CF_GIT_PROVIDER`            | The Git provider for the integration, and can be either GiitHub, GitLab, or Bitbucket.  | Required  |
| `CF_GITHUB_TOKEN`            | The GitHub authentication token. The token must have `repo` scope. See [Git tokens]({{site.baseurl}}/docs/reference/git-tokens/). | Required  |
| `CF_GITHUB_API_URL`          | The URL to the GitHub developer site.  | Required  |
| `CF_GITLAB_TOKEN`      | The GitLab token for authentication.  | Required  |
| `CF_GITLAB_HOST_URL`      | The URL to the GitLab instance.  | Optional  |
| `CF_BITBUCKET_USERNAME`      | The username for the Bitbucket or the BitBucket Server (on-prem) account. | Required  |
| `CF_BITBUCKET_PASSWORD`      | The password for the Bitbucket or the BitBucket Server (on-prem) account. | Required  |
| `CF_BITBUCKET_HOST_URL`      | Relevant for Bitbucket Server accounts only. The URL address of your Bitbucket Server instance. Example, `https://bitbucket-server:7990`. | Required  |
|`CF_JIRA_PROJECT_PREFIX` | Relevant only when `CF_JIRA_INTEGRATION` is defined. The Jira project prefix that identifies the ticket number to use.| Required|
| `CF_JIRA_MESSAGE`            | Relevant only when `CF_JIRA_INTEGRATION` is defined. The Jira issue IDs matching the string to associate with the image.  | Required  |
| `CF_JIRA_FAIL_ON_NOT_FOUND`            | Relevant only when `CF_JIRA_INTEGRATION` is defined. The report image action when the `CF_JIRA_MESSAGE` is not found. When set to `true`, the report image action is failed.  | Required  |


For how-to instructions, see [Connect a third-party CI platform/tool to Codefresh]({{site.baseurl}}/docs/integrations/ci-integrations/#connect-a-third-party-ci-platform-tool-to-codefresh).  


### Example of Jenkins pipeline with report image step

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
                CF_JIRA_INTEGRATION= 'jira'
                
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

### Jenkins integration logs
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

### Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with integrations]({{site.baseurl}}/docs/integrations/image-enrichment-overview/)  
[Container registry integrations]({{site.baseurl}}/docs/integrations/container-registries/)  
[Issue-tracking integrations]({{site.baseurl}}/docs/integrations/issue-tracking/)  