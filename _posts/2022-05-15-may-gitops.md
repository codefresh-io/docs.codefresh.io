---
title: "GitOps Release Notes: May 2022"
description: "Changelog and Release Notes for GitOps"
---

## Features & enhancements

### Runtime disaster recovery

Runtimes are integral to all CI/CD actions and operations in Codefresh. In this release, we added the capability to restore runtimes in case of cluster failures, either partial or complete.
All you need is the existing Git repo where you installed the runtime containing the runtime resources. The restore process reinstalls the runtime, leveraging the resources in the existing repo. You can choose to restore the runtime to the failed cluster or to a different cluster.  
For details, see [Restore runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#hybrid-gitops-restoring-provisioned-runtimes).

### AWS ALB ingress controller

AWS Application Load Balancer (ALB) is now part of our list of supported ingress controllers.
For details, see [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#aws-alb-ingress-configuration).

### Labels for runtime namespace

When installing runtimes, the `--namespace-label` flag lets you add labels to the runtime namespace. The labels identify and grant access to the installation network, required with service mesh ingress controllers such as Istio.  
For both CLI-based and silent installations, add the flag followed by one or more labels in `key=value` format. Note that these labels must be identical to those defined in the 'namespace' resource spec.  
For details, see [Runtime flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#runtime-flags).

### Internal and external ingress hosts

Codefresh runtimes support defining two ingress hosts, an internal and an external ingress host, for private and public networks. Previously, runtimes supported a single ingress host for both the app-proxy and webhook ingress resources. Internal and external ingress separation allows you to expose the Codefresh app-proxy service only within your private network, while keeping the webhook ingress unchanged.  

* New runtime installations: The `--internal-ingress-host` flag lets you can define an ingress host for communication with the app-proxy. For details, see [Ingress controller flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#ingress-controller-flags).
* Existing runtimes: To add an internal ingress host, you need to commit changes to the installation repository by modifying `app-proxy ingress` and `<runtime-name>.yaml`.
For details, see _Internal ingress host configuration (optional)_ in [Post-installation configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#optional-internal-ingress-host-configuration-for-existing-hybrid-gitops-runtimes).  

For further customizations, add annotations for internal and external ingress hosts through the `--internal-ingress-annotation` and `--external-ingress-annotation` flags.

### oktapreview domain support

You can set up Okta SSO to log into your Okta preview environment.

### Git Source enhancements

A common scenario when using Git repositories for CI/CD is to include or exclude specific files or directories in the target repository from the destination repo or cluster. When creating or editing Git Sources in Codefresh, you can now include or exclude folders and files in the target Git repo, using Glob patterns for the same.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-may22-git-source-exclude-include.png"
url="/images/whats-new/rel-notes-may22-git-source-exclude-include.png"
alt="Include/exclude options in Git Source"
caption="Include/exclude options in Git Source"
max-width="50%"
%}

You can also delete Git Sources if needed. Selecting additional actions for a Git Source, displays the Git Source details with the Delete option.

{% include
image.html
lightbox="true"
file="/images/whats-new/rel-notes-may22-git-source-delete.png"
url="/images/whats-new/rel-notes-may22-git-source-delete.png"
alt="Delete Git Source"
caption="Delete Git Source"
max-width="90%"
%}

For details, see [Add and manage Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources/).

## Bug fixes

### Runtimes

* With Istio ingress, app proxy communication with Argo CD fails with `Unexpected token u in JSON error`.
* Adding a managed cluster always commits manifests to the main branch and not to the defined default branch.
* Add managed cluster command fails when ingress host includes `/` suffix.
* Application groups not supported in Current State for older runtime versions.
* Retrieving a list of Git Sources for a runtime via CLI, causes the CLI to crash.
* Uninstalling a runtime does not remove runtime-related secrets from the cluster.

### Applications

* Applications deleted from the Argo UI not removed from the Applications dashboard in Codefresh.
* Back button in  Applications > Timeline tab does not work.
* Hierarchy for AppSet application created in Argo CD not rendered correctly in Codefresh.
* Most Active Applications list in the GitOps Overview dashboard is incorrectly sorted.
* Link to CI build on Service in Applications Dashboard is hard-coded to Workflows.
* Add Application wizard creates invalid manifest.
* Removing a resource from an application does not remove it from the application’s Current State list.
* Deleting an application deletes it from the cluster and the Git repo, but not from the database.
* Creating an application without path results in an error.
* On page reload, deployment chart in Application > Timeline tab does not reflect set filters.
* Resources with changed file names are not reported in Argo CD.
* Unknown state for application sets with targets on external clusters.

### Others

* Clicking the Settings icon shows a console error.
* Workflow Templates reported without Git manifests and desired state.
* Get list of workflows for a pipeline via CLI returns 400 bad request.
* GitHub user without a public email address causes autopilot to crash in app-proxy.
* Within a staging app, regular deployment transition is empty and shows only replicas count.
