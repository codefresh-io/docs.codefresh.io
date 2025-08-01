---
title: "Release Notes: July 2025"
description: ""
---
## Features & enhancements
### GitOps: Runtime v0.22: Argo CD 3.0 Upgrade

This runtime release upgrades **Argo CD to version 3.0**, bringing the latest features and improvements to Codefresh GitOps.

While we haven't identified any breaking changes for standard Codefresh deployments, please review the following recommendations:  

* If you have **customized any default Argo CD values** beyond what Codefresh distributes, you may be affected by changes introduced in Argo CD 3.0.  
* Review the official [Argo CD 3.0 migration guide](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/3.0-migration/) if you maintain custom configurations.  
* If you have made **extensive customizations**, test this runtime upgrade in a **non-production environment first**.

For details, see the [runtime v0.22.1 release notes](https://github.com/codefresh-io/gitops-runtime-helm/releases/tag/0.22.1).



## Bug fixes
##### General
* Fixed an issue where Quick Search (CMD + K) did not return any GitOps-related items, including applications. Users can now search and access GitOps items directly through Quick Search as expected.
{% if page.collection == "posts" %}
##### Pipelines
* Fixed an issue that caused timeouts when loading UI pages for pipelines with a large number of triggers.
* Fixed an issue where MacOS builds failed with an Unauthorized error when provisioning the runtime, preventing customers from running MacOS builds successfully.
* Fixed an issue where builds intermittently failed with a Failed to prepare dockerfile error, preventing the Dockerfile from being fetched correctly during the build process.
* Fixed an issue where SaaS builds failed due to insufficient disk space by re-enabling cleanup processes.

##### GitOps
{% endif %}
* Fixed an issue where applications nested more than three layers deep were not displayed in the UI tree view. The full application hierarchy now appears correctly in the tree view.
