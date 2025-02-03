---
title: "Image enrichment in GitOps with integrations"
description: "Gain full visibility into deployments with metadata from third-party tools"
group: gitops-integrations
redirect_from:
  - /csdp-docs/docs/integrations/image-enrichment-overview/
toc: true
---




Image enrichment enhances visibility into deployments by associating metadata—such as feature requests, pull requests, and logs—with container images. This metadata helps teams track changes, investigate failures, and improve traceability across the CI/CD process.

With Codefresh GitOps, you can enrich and report images to the Codefresh platform, even if you're using third-party CI tools. This allows you to maintain existing workflows while gaining full deployment insights in Codefresh.

  
## Report image templates
Codefresh provides **report image templates** optimized for third-party CI tools, enabling seamless integration with your workflows. By connecting external tools—such as Jira, Docker Hub, and Quay—you can enrich and report images with minimal disruption to existing CI/CD processes.





## How image enrichment works
 
Integrate Codefresh with your CI platform/tool account with a unique name per integration account. 

### 1. Configure integration accounts

Add and configure integration accounts in Codefresh for third-party tools. You can set up multiple integration accounts for the same tool.  

* Codefresh stores integration credentials as Sealed Secrets and references them in a ConfigMap. 
* If an integration with your tool is not yet supported, you must manually define credentials for image enrichment. 

**Supported integrations**:  
* Issue tracking  
  [JIRA]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira/) 
 
* Container registries  
  [Amazon ECR]({{site.baseurl}}/docs/gitops-integrations/container-registries/amazon-ecr/)  
  [DockerHub]({{site.baseurl}}/docs/gitops-integrations/container-registries/dockerhub/)  
  [JFrog Artifactory]({{site.baseurl}}/docs/gitops-integrations/container-registries/jfrog/)  
  [Quay]({{site.baseurl}}/docs/gitops-integrations/container-registries/quay/)  

   
### 2. Connect CI platform/tool to GitOps

To enable image enrichment, connect your CI tool to Codefresh GitOps using:
* A Codefresh API token for the cluster with the GitOps Runtime
* The required integration accounts
* Image metadata for enrichment and reporting
 
**Supported CI tools**:  
* [Codefresh pipelines]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/codefresh-classic/)  
* [GitHub Actions]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/github-actions/)  
* [Jenkins]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/jenkins/)


### 3. Add the image enrichment step to your CI workflow

Modify your CI workflow to include the image enrichment step:
* Use the API token and integration name to securely retrieve metadata.
* Codefresh fetches the corresponding Sealed Secret to securely access image information. 

**Examples**:
* [GitHub Action Codefresh report image](https://github.com/marketplace/actions/codefresh-report-image){:target="\_blank"}  
* [Codefresh pipeline Codefresh report image](https://codefresh.io/steps/step/codefresh-report-image){:target="\_blank"}


### 4. View enriched image metadata
After deployment, view enriched image details in these dashboards :  
* [Images]({{site.baseurl}}/docs/dashboards/images/)  
* [GitOps Apps]({{site.baseurl}}/docs/deployments/gitops/gitops-apps-dashboard/)



Enriched data includes:   
* Commit information as well as committer
* Links to build and deployment pipelines
* PRs included in the deployment
* Jira issues, status and details for each deployment



