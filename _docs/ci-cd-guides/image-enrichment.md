---
title: "Image enrichment"
description: "Enrich images with metadata"
group: ci-cd-guides
toc: true
---

Building Docker images is one of the most basic requirements of Codefresh pipelines and Argo Workflows. 
Once you create an image, push the image to a registry, and report it to Codefresh, image information is continually updated in the Images page. 

By default, each container registry has very basic information for a Docker image, such as timestamp, hash, size etc. 

With Codefresh, you can enrich the basic information reported with the image with issue-tracking metadata and annotations.
For example, information such as:
* Which Pull Request created this image
* What tests and code coverage this image has
* What security scans have run on it (and their results)

## Codefresh pipelines image reporting and enrichment flow 

Complete these steps to view enriched image information in the Images dashboard for Codefresh pipelines.  

1. (Mandatory) Build and push the Docker image  
  Use the `build` step to build a Docker image declaratively in simple or multi-stage Dockerfiles. See [Build step in pipelines]({{site.baseurl}}/docs/pipelines/steps/build/).  
  The pipeline pushes the image to the default Docker registry.
  You can also push the image to any external Docker registry that you integrate with Codefresh. See [Docker Registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries/).  
  Review different scenarios for building and pushing Docker images in  our [Build/push examples]({{site.baseurl}}/docs/example-catalog/examples/#buildpush-examples).

{:start="2"}
1. (Optional) Enrich image with annotations and metadata  
  Enrich the image with metadata such as feature requests, pull requests from issue-tracking tools such as Jira for visibility into all aspects of the deployment.  
  See [Docker image metadata]({{site.baseurl}}/docs/pipelines/docker-image-metadata/)  
  See [GitOps issue tracking integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking) and [Jira]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira) integration.  


## Codefresh GitOps image reporting and enrichment flow 

Complete these steps to view enriched image information in the Images dashboard for Codefresh GitOps deployments.  
 
1. (Mandatory) Connect to Docker registries  
  Connect Docker registries to Codefresh to store Docker images.  
  See [GitOps container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries).

1. (Mandatory) Report image information to Codefresh  
  This is the equivalent to pushing the image in Codefresh pipelines.  
  Use the [report-image-info](https://github.com/codefresh-io/argo-hub/blob/main/workflows/codefresh-csdp/versions/0.0.6/docs/report-image-info.md){:target="\_blank"} DAG template to report image information to Codefresh. 
  
      > **NOTE**:  
      If you are using an external platform or tool for your CI pipelines such as GitHub Actions or Jenkins, or even Codefresh pipelines, we have a new template that combines image reporting and enrichment. See [GitOps CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations) for details.

{:start="3"}
1. (Optional) Enrich image with annotations and metadata  
  Enrich the image with metadata such as feature requests, pull requests from issue-tracking tools such as Jira for visibility into all aspects of the deployment.  
  See [GitOps issue tracking integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking) and [Jira]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira) integration.  

## Related articles
[Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/)