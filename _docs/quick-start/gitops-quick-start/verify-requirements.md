---
title: "Prepare for Hybrid GitOps Runtime installation"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---

Hybrid GitOps Runtimes are installed via Helm charts. 


## New installation 
If this is your first time installing GitOps in Codefresh, review and confirm that your deployment environment conforms to the minimum requirements for Hybrid GitOps installation. Check the [system requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#minimum-system-requirements).  


## Existing CLI-based Hybrid GitOps installation  
If you already have a CLI-based Hybrid GitOps Runtime installed on your cluster, you have two options:
1. To install on the same cluster, first uninstall the existing CLI-based Hybrid GitOps Runtime. 
  This is the recommended option.
1. Install on a different cluster, verifying that you meet the minimum requirements.  

## Uninstallation tips for existing CLI-based Hybrid GitOps Runtimes
* Before you run uninstall an existing CLI-based Hybrid GitOps Runtime from the Codefresh UI, or run `cf runtime <name> uninstall` from the CLI, _delete_ all Codefresh-related namespaces.
* If a namespace is frozen in the `Terminating` status, it could be because the namespace has resources with `finalizers` that are preventing deletion.
  Here's how you can remove `finalizers` using `k9s`:
  * In the `applications` view, do the following for each application:
    * Hit `e` to edit the YAML.
    * Scroll down to the section entitled `finalizers`.
    * Move cursor to the line with the finalizer definition, and then hit `dd` to delete the line.
    * Delete also the `finalizers` key.
    * To save and exit, hit `escape` `wq:` `enter`.
  * Try deleting the namespace again.

## What to do next
[Install a Hybrid GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)
