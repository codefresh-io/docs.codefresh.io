---
title: "Image enrichment with integrations"
description: ""
group: integration
toc: true
---




Image enrichment is a crucial part of the CI/CD process, adding to the quality of deployments. Image enrichment exposes metadata such as feature requests, pull requests, and logs as part of the application's deployment, for visibility into all aspects of the deployment, making it easier to track actions and identify root cause of failures.  

Codefresh has a new [report image template](https://github.com/codefresh-io/csdp-report-image/) that combines image enrichment and reporting. The report image template is optimized to work with external CI platforms for creating pipelines and workflows such as GitHub Actions. Add integration accounts in Codefresh to tools such as Jira, Docker Hub and Quay, and then connect your GitHub Action with Codefresh for image enrichment and reporting. 


### CI integrations for image enrichment
 
Integrate Codefresh with your CI platform/tool account with a unique name per integration account. 

#### 1. Add/configure integration for CI tools

Add/configure the integration account for the third-party CI tool. You can set up multiple integration accounts for the same CI tool.  

When you add an integration, Codefresh creates a Sealed Secret with the integration credentials, and a ConfigMap that references the secret.  

Codefresh supports the following tools:  

* [JIRA]({{site.baseurl}}/docs/integrations/jira/)  
* [DockerHub]({{site.baseurl}}/docs/integrations/dockerhub/)
* [Quay]({{site.baseurl}}/docs/integrations/quay/)  

We are working on supporting integrations for more tools. Stay tuned for the release announcements.  
For image enrichment with a tool that is as yet unsupported, you must define the explicit credentials. 
   
#### 2. Connect GitHub Action to Codefresh

Connect a GitHub Action to Codefresh with an API token for the runtime cluster, the integration accounts, and image information for enrichment and reporting. 

See [GitHub Actions]({{site.baseurl}}/docs/integrations/github-actions/).


#### 3. Add the enrichment step to your GitHub Actions pipeline 

Finally, add the enrichment step to your GitHub Actions pipeline with the API token and integration information. Codefresh uses the integration name to get the corresponding Sealed Secret to securely access and retrieve the information for image enrichment.  

See [Example of GitHub Action pipeline with image enrichment](#example-of-github-action-pipeline-with-image-enrichment) in this article.



#### 4. View enriched image information
Once deployed, view enriched information in the dashboards:  


* [Images](https://g.codefresh.io/2.0/images){:target="\_blank"}  

* [Applications dashboard](https://g.codefresh.io/2.0/applications-dashboard){:target="\_blank"}  


View:  

* Commit information as well as committer
* Links to build and deployment pipelines
* PRs included in the deployment
* Jira issues, status and details for each deployment

### Example of GitHub Action pipeline with image enrichment 
This is an example of a pipeline managed by a GitHub Action that includes the Codefresh step for image enrichment and reporting.  

As you can see, `CF_CONTAINER_REGISTRY_INTEGRATION` references DockerHub by the integration name, `dockerhub` in this example. `CF_JIRA_INTEGRATION` also references the required JIRA account by the integration name, `jira` in the example. Both references do not require explicit credentials.  
In contrast, for Git information, `CF_GITHUB_TOKEN` must be defined.

```yaml
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
          CF_IMAGE: ${{ secrets.DOCKERHUB_USERNAME }}/csdp-report-image-github-action:example-reported-image
        run: |
          docker build . --file Dockerfile --tag $CF_IMAGE && docker push $CF_IMAGE
      - name: report image by action
        with:
          - name: report image by action
      with:
        CF_HOST: "https://my-runtime-url"
        CF_API_KEY: ${{ secrets.CF_TOKEN }}
        
        #Codefresh Integrations to USE
        CF_CONTAINER_REGISTRY_INTEGRATION: "dockerhub"
        CF_JIRA_INTEGRATION: "jira"
    
        CF_ENRICHERS: "jira, git"    
        CF_IMAGE: ${{ secrets.DOCKERHUB_USERNAME }}/my-image-name:tag
        
        CF_GITHUB_TOKEN: ${{ secrets.GIT_TOKEN }}
    
        #Jira issues that match
        CF_JIRA_MESSAGE: "CR-12293"
        CF_JIRA_PROJECT_PREFIX: "CR"
      uses: codefresh-io/csdp-report-image@0.0.47
```
### What to read next
[Images]({{site.baseurl}}/docs/pipelines/images/)  
[Applications dashboard]({{site.baseurl}}/docs/deployment/applications-dashboard/) 

