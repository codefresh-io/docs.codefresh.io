---
title: "WIP: 1. Prepare for runtime installation"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---


**New installation**  
If this is your first CSDP installation, review and confirm that your deployment conforms to the minimum requirements for installing CSDP. See [system requirements]({{site.baseurl}}/docs/runtime/requirements).  

**Existing installation** 

If you already have a runtime installation on your cluster, you have two options:
1. To install on the same cluster, first uninstall the existing runtime. Currently, you can install a single runtime per cluster.
1. Install on a different cluster, verifying that you meet minimum requirements.  

**Uninstallation tips for existing runtimes**
* Before you run uninstall from the CSDP UI or `cf runtime <name> uninstall` from the CLI, delete all CSDP-related namespaces.
* If the namespace is frozen in the Terminating status, it could be that the namespace has resources with finalizers that prevents them from being deleted.
  Here's how you to remove finalizers using `k9s`:
  * In the `applications` view, do the following for each application:
    * Hit `e` to edit the YAML.
    * Scroll down to the section entitled `finalizers`.
    * Move cursor to the line with the finalizer definition, and then hit `dd` to delete the line.
    * Delete also the `finalizers` key.
    * Hit `escape` `wq:` `enter` to save and exit.
  * Try deleting the namespace again.

### What to do next
[Install runtime]({{site.baseurl}}/docs/getting-started/quick-start/runtime)