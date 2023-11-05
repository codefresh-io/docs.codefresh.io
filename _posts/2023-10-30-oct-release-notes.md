---
title: "Release Notes: October 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Transition to OCI repositories

In a significant upgrade to our repository management system, Codefresh has transitioned from Chart Museum to OCI (Open Container Initiative) repositories. This change enhances the performance and reliability for Codefresh on-premises and GitOps Runtimes.




## Bug fixes

**General**  
* Slow performance/response within Codefresh UI.
* Events missing from Audit log. 

<br>

**Pipelines**  
* BitBucket builds triggered for events not defined in pipeline. 
* Slow loading for Builds and Workflow pages for pipelines. 
* Restarting a Cron build or restarting a Cron build from a failed step results in error: "There was a problem rebuilding the selected item. Please make sure that the branch <BRANCH> is accessible". 
* Plan-time validation of the Cron expression field in `codefresh_pipeline` does not match API constraints.
* Cannot save views including Annotations as filters. 
* Statuses in build log outputs not color-coded.
* Memory usage graph in Builds page shows **Mib** instead of **MiB**. 



<br>


**GitOps**  
* `codefresh-image-reporter` failure for ECR (Elastic Container Registry) images.
* Deleting cluster results `Failed deleting cluster` error message.
* (On-premises only) Cannot apply multiple namespaces to GitOps Runtime via Kustomize. 
* Argo CD applications not displayed in GitOps Apps dashboard for Hosted GitOps Runtime.
* Creating a Git Source using Bitbucket does not load all available repos for selection. 
* Rollouts panel does not display control to expand Analysis Run. 

