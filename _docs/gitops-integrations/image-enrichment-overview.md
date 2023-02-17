---
title: "GitOps image enrichment with integrations"
description: ""
group: gitops-integrations
redirect_from:
  - /csdp-docs/docs/integrations/image-enrichment-overview/
toc: true
---




Image enrichment is a crucial part of the CI/CD process, adding to the quality of deployments. Image enrichment exposes metadata such as feature requests, pull requests, and logs as part of the application's deployment, for visibility into all aspects of the deployment, making it easier to track actions and identify root cause of failures.  

If you have your CI tools and our Hosted GitOps, you can still enrich and report images to the Codefresh platform with no disruptions to existing CI processes and flows.  

Codefresh has new report images templates, optimized to work with third-party CI tools/plaforms for creating pipelines and workflows. Add integration accounts in Codefresh to tools such as Jira, Docker Hub and Quay, and then connect your CI tool with Codefresh for image enrichment and reporting.  



## CI integration flow for image enrichment
 
Integrate Codefresh with your CI platform/tool account with a unique name per integration account. 

### 1. Add/configure integration

Add/configure the integration account for the third-party tools. You can set up multiple integration accounts for the same tool.  
When you add an integration, Codefresh creates a Sealed Secret with the integration credentials, and a ConfigMap that references the secret.  

See:  
* Issue tracking  
  [JIRA]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/) 
 
* Container registries  
  [Amazon ECR]({{site.baseurl}}/docs/gitops-integrations/container-registries/amazon-ecr/)  
  [DockerHub]({{site.baseurl}}/docs/gitops-integrations/container-registries/dockerhub/)  
  [JFrog Artifactory]({{site.baseurl}}/docs/gitops-integrations/container-registries/jfrog/)  
  [Quay]({{site.baseurl}}/docs/gitops-integrations/container-registries/quay/)  

We are working on supporting integrations for more tools. Stay tuned for the release announcements.  
For image enrichment with a tool that is as yet unsupported, you must define the explicit credentials. 
   
### 2. Connect CI platform/tool to GitOps

Connect a CI platform/tool to Codefresh GitOps with an API token for the runtime cluster, the integration accounts, and image information for enrichment and reporting. 
 
[Codefresh pipelines]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/codefresh-classic/)  
[GitHub Actions]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/github-actions/)  
[Jenkins]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/jenkins/)


### 3. Add the enrichment step for the CI platform/tool to your GitHub Actions pipeline 

Finally, add the enrichment step to your CI pipeline with the API token and integration information. Codefresh uses the integration name to get the corresponding Sealed Secret to securely access and retrieve the information for image enrichment.  

 [GitHub Action Codefresh report image](https://github.com/marketplace/actions/codefresh-report-image){:target="\_blank"} 
 [Codefresh pipeline Codefresh report image](https://codefresh.io/steps/step/codefresh-report-image){:target="\_blank"}


### 4. View enriched image information
Once deployed, view enriched information in the Codefresh UI:  
* Go to [Images](https://g.codefresh.io/2.0/images){:target="\_blank"}
* Go to the [Applications dashboard](https://g.codefresh.io/2.0/applications-dashboard){:target="\_blank"}  


View:  

* Commit information as well as committer
* Links to build and deployment pipelines
* PRs included in the deployment
* Jira issues, status and details for each deployment


## Related articles
[Images]({{site.baseurl}}/docs/dashboards/images/)  
[Applications dashboard]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)

