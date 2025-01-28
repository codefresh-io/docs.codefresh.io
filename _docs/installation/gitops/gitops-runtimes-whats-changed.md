---
title: "What's changed in GitOps Runtimes"
description: "Review list of changes to articles and the reasons for change"
toc: true
---

## GitOps Runtimes documentation changes

The GitOps Runtime documentation has been restructured to enhance usability and make information easier to find. All documentation related to GitOps Runtimes is now consolidated in a dedicated **GitOps Runtime** bucket, instead of within the Installation bucket as in previous version. Additionally, several topics have been split into standalone articles to improve navigation and ensure focused, actionable content for users.

## GitOps Runtimes: Documentation changes at a glance
The table below outlines the updates to the GitOps Runtime documentation, including article relocations, newly introduced standalone topics, and other improvements.
<!--
| **Old location**         | **New Location**    | **Affected Articles**          | **Description of changes**    |
|--------------------------|--                   |--------------------------------|----------------------------------------------------|
| Installation > GitOps  | **GitOps Runtime** | n/a  | Moved from Installation bucket into dedicated GitOps Runtime bucket.  |
|                                |                |[About GitOps Runtime]({{site.baseurl}}/docs/gitops-runtime/gitops-runtime/)  | New overview topic for improved readability. |
|                                |                |[GitOps Runtime Architecture]({{site.baseurl}}/docs/gitops-runtime/runtime-architecture/)     | Moved from Installation > GitOps to GitOps Runtime. |
|                                |                |[Minimum system requirements]({{site.baseurl}}/docs/gitops-runtime/runtime-system-requirements/)     | Split from Hybrid GitOps Runtime article to standalone topic entitled System requirements & Prerequisites for visibility. |
|          |                |[Runtime prerequisites]({{site.baseurl}}/docs/gitops-runtime/runtime-system-requirements/)           | Split from Hybrid GitOps Runtime article to new standalone topic entitled System requirements & Prerequisites for visibility.          |
|                                 |               |[Ingress-controller configuration]({{site.baseurl}}/docs/gitops-runtime/runtime-ingress-configuration/)     | Split from Hybrid GitOps Runtime article to standalone topic entitled Ingress controller coonfiguration          |
|                                |               | [Install GitOps Runtime]({{site.baseurl}}/docs/gitops-runtime/hybrid-gitops-helm-installation/)            | Includes only installation procedures and post-installation configuration options. Renamed as Install Hybrid GitOps Runtime.          |
|                                 |               |[Hybrid GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/gitops-runtime/argo-with-gitops-side-by-side/)    | Moved from Installation > GitOps Runtimes to GitOps Runtimes.|
| Add condition only for docs                                  |              |[On-premises GitOps Runtime]({{site.baseurl}}/docs/gitops-runtime/on-prem-gitops-runtime-install/)            | Moved from Installation > GitOps Runtimes to GitOps Runtimes.        |
|                                   |             |[Migrating Hybrid GitOps Runtimes from CLI to Helm]({{site.baseurl}}/docs/gitops-runtime/migrate-cli-runtimes-helm/)            | Moved from Installation > GitOps Runtimes to GitOps Runtimes. Added deprecation indication.|
|                                    |             |[Shared Configuration Repository]({{site.baseurl}}/docs/gitops-runtime/shared-configuration/)          | Moved from Installation > GitOps Runtimes to GitOps Runtimes. |
|                                    |             |[Monitoring & managing GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/monitor-manage-runtimes/)            | Moved from Installation > GitOps Runtimes to GitOps Runtimes. |
|                                    |             |[Managing external clusters in Runtimes]({{site.baseurl}}/docs/gitops-runtime/managed-cluster/)            | Moved from Installation > GitOps Runtimes to GitOps Runtimes. |
|                                    |             |[Managing Git Sources in Runtimes]({{site.baseurl}}/docs/gitops-runtime/git-sources/)            | Moved from Installation > GitOps Runtimes to GitOps Runtimes. |

-->

| **Location**         |  **Affected Articles**   | **Description of changes**    |
|--------------------------|-----                 |----------------------------------------------------|
| Installation > GitOps   |[About GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/gitops-runtime/gitops-runtime/)  | New overview topic for improved readability. |
|                         |[Runtime essentials]({{site.baseurl}}/docs/installation/gitops/runtime-concepts/)     | New article describing components and concepts used in Runtime installation. |
|                         |[System requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/)     | Split from Hybrid GitOps Runtime installation article to standalone topic entitled System requirements & Prerequisites for visibility. |
|        |[Runtime prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/)           | Split from Hybrid GitOps Runtime article to new standalone topic entitled System requirements & Prerequisites for visibility.          |
|                         |[Ingress-controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/)     | Split from Hybrid GitOps Runtime article to standalone topic entitled Ingress controller coonfiguration          |
|                      | [Install GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)            | Includes only installation procedures and post-installation configuration options.  |
|                      | [Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/)            | Split from Monitoring and managing GitOps Runtime article to standalone topic.  |
|                      | [Monitor GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)            | Split from Monitoring and managing GitOps Runtime article to standalone topic describing the Runtime dashboard views.  |
|                      | [Manage GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/)            | Split from Monitoring and managing GitOps Runtime article to standalone topic describing the options available to manage existing GitOps Runtimes.  |
