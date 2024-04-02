---
title: "Release Notes: March 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---


## Bug fixes


##### Pipelines 
* "Failed to run pipeline" error on clicking Run for a pipeline.
* “Unknown error” failure on cloning a pipeline that includes a trigger. 
* Debug mode fails to execute or hangs with Docker engine version 1.169.3 and higher.
* Long loading time for Git repos when creating new pipelines and triggers.
* "ABAC validation error" in `argocd-sync` step in pipeline builds. 
* (On-premises only) External MongoDB outage when increasing the number of connections to the permitted limit.
* (On-premises only) No access to Helm boards after upgrading to v 2.2.4.


##### GitOps 
* API error "Cannot return null for non-nullable field".   
* Empty Runtime Components tab on selecting Hosted GitOps Runtime. 
* New Argo CD application deployed in Codefresh remains as Out of Sync in GitOps Apps > Current State.
* Delay for new Argo CD applications to appear in Codefresh GitOps Apps dashboard. 

* Error on enabling Argo CD notifications in Helm chart `values.yaml` for Codefresh GitOps Runtime v0.4.2 













