---
title: "Release Notes: October 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements





## Bug fixes

**General**  
* Slow performance/response within Codefresh UI.
* `codefresh-image-reporter` failure for ECR (Elastic Container Registry) images.
* Events missing from Audit log. Vadim CR-21053
* Build output is colorless. CR-20996

<br>

**Pipelines**  
* Build step fails with error: "Failed to get console: provided file is not a console". Denis CR-21008
* BitBucket builds not triggered for Pull Request (PR) events. Yarik CR-20796 
* BitBucket builds triggered for events not defined in pipeline. Olek CR-20921
* Slow loading for Builds and Workflow pages for pipelines. Sasha CR-20999
* Restarting a Cron build or restarting a Cron build from a failed step results in error: "There was a problem rebuilding the selected item. Please make sure that the branch <BRANCH> is accessible". Olek CR-20968
* Cron validation for Terraform provider not identical to API validation. Yoni CR-20810
* Failure to pull image for Alpine 3.11. Zhenya CR-20492
* Cannot save views including Annotations as filters. Sasha CR-20269
* Runner certificates not rotated with control plane certificates.  Mikhail CR-20138 
* DinD pods stuck at `ContainerCreating`. Noam CR-19669
* Long initialization times for pipelines. Ilia CR-18262
* Save button remains disabled in Add Shared Configuration. Denis CR-20756
* Memory usage graph in Builds page shows **Mib** instead of **MiB**. Sasha CR-19038



<br>


**GitOps**  
* Unable to add cluster for Gerrit providers to GitOps Runtime. Daniel M 20672
* (On-premises only) GitOps Runtime results in error: "rpc error: code = Unknown desc = Manifest generation error (cached)" Pasha CR-20821
* Argo CD applications not displayed in GitOps Apps dashboard for Hosted GitOps Runtime.
* Creating a Git Source using Bitbucket does not load all available repos for selection.
* Rollouts does not display control to expand Analysis Run. Olek

