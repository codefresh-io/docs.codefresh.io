---
title: "Prepare for hybrid runtime installation"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---


**New installation**  
If this is your first time installing GitOps in Codefresh, review and confirm that your deployment environment conforms to the minimum requirements for hybrid runtime installation. Check the [system requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#minimum-system-requirements).  


**Existing installation**  
If you already have a hybrid runtime installation on your cluster, you have two options:
1. To install on the same cluster, first uninstall the existing hybrid runtime. Currently, you can install a single hybrid runtime per cluster.
1. Install on a different cluster, verifying that you meet the minimum requirements.  

**Uninstallation tips for existing runtimes**  
* Before you run uninstall an existing hybrid runtime from the Codefresh UI, or run `cf runtime <name> uninstall` from the CLI, _delete_ all Codefresh-related namespaces.
* If a namespace is frozen in the `Terminating` status, it could be because the namespace has resources with finalizers that are preventing deletion.
  Here's how you can remove finalizers using `k9s`:
  * In the `applications` view, do the following for each application:
    * Hit `e` to edit the YAML.
    * Scroll down to the section entitled `finalizers`.
    * Move cursor to the line with the finalizer definition, and then hit `dd` to delete the line.
    * Delete also the `finalizers` key.
    * To save and exit, hit `escape` `wq:` `enter`.
  * Try deleting the namespace again.

### What to do next
[Install a hybrid runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)
