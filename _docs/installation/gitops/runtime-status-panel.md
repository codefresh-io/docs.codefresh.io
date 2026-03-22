---
title: "Runtime Status Panel"
description: "Monitor GitOps Runtime health from a single pane — connectivity, applications, components, Git Sources, and managed clusters"
toc: true
---

## Runtime Status Panel

The Runtime Status Panel provides a single-pane view of your GitOps Runtime health, surfacing issues that previously required navigating multiple screens.

**To open the Runtime Status Panel:**
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **GitOps Runtimes**.
1. Click on the name of the runtime to open it.
1. Select the **Runtime Status Panel** tab.

The panel is organized into three main sections:
1. **[Status Summary Bar](#status-summary-bar)** — Quick color-coded health overview across five categories
2. **[Runtime Health Report](#runtime-health-report)** — Actionable issues that need attention
3. **[Detail Tabs](#detail-tabs)** — Deep-dive into connectivity, applications, and components

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-status-panel.jpeg"
   url="/images/runtime/runtime-status-panel.jpeg"
   alt="Runtime Status Panel overview"
   caption="Runtime Status Panel overview"
   max-width="80%"
%}

## Status Summary Bar

Five color-coded boxes at the top of the panel give an at-a-glance health overview of your runtime.

{: .table .table-bordered .table-hover}
| Category | Description |
|---|---|
| **Connectivity** | Network paths between browser, app-proxy, and control plane |
| **Runtime Applications** | Sync status of runtime applications |
| **Runtime Components** | Health of core components (redis, reporters, argo-gateway, etc.) |
| **Git Sources** | Sync status of configured Git Sources |
| **Managed Clusters** | Connection status of managed clusters |

### Color coding

{: .table .table-bordered .table-hover}
| Color | Icon | Meaning |
|---|---|---|
| Green | ✓ checkmark | All healthy — number shows total count |
| Orange | △ warning | Has warnings — number shows warning count |
| Red | ⊗ error | Has errors — number shows error count |

> **Note:** The status boxes are indicators only and are not clickable.

## Runtime Health Report

This section displays actionable issues that require attention. Each issue card includes:
- **Issue type and affected resource** — e.g., "Runtime application OUT_OF_SYNC: cf-gitops-runtime"
- **Description** — Explains what went wrong
- **Quick actions** — Clickable buttons such as **Sync** or **View Application**

### Common issues

{: .table .table-bordered .table-hover}
| Issue | Description | Available Actions |
|---|---|---|
| Runtime application OUT_OF_SYNC | Automated sync was not able to complete | Sync, View Application |
| Git Source sync Failed | Git Source failed to synchronize (e.g., conflicting options) | View Application |
| Cluster connection Failed | Argo CD cannot communicate with the target cluster | View Application |

## Detail Tabs

Three tabs provide detailed information for troubleshooting specific areas of your runtime.

### Connectivity tab

Displays the status of all connection paths between runtime components.

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-status-panel-connectivity.jpeg"
   url="/images/runtime/runtime-status-panel-connectivity.jpeg"
   alt="Runtime Status Panel - Connectivity tab"
   caption="Runtime Status Panel - Connectivity tab"
   max-width="80%"
%}

{: .table .table-bordered .table-hover}
| Connection Path | Description |
|---|---|
| Browser → app-proxy | Connection from your browser to the app proxy |
| app-proxy → Control Plane | Connection from app proxy to Codefresh control plane |
| runtime-event-reporter → Control Plane | Reporter sending application and resource events |
| cluster-event-reporter → Control Plane | Reporter sending cluster events |

**Columns:** Connection Path \| Status \| Last Activity

#### Status behavior

- Connectivity checks **retry every 10 seconds**
- App-proxy shows **Unreachable** after a **1-minute** timeout
- Reporters are flagged as non-reporting after **20 minutes**

#### Connectivity warning

When connectivity issues are detected, a warning banner appears above the connection table.

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-status-panel-connectivity-warning.jpeg"
   url="/images/runtime/runtime-status-panel-connectivity-warning.jpeg"
   alt="Runtime Status Panel - Connectivity warning banner"
   caption="Runtime Status Panel - Connectivity warning banner"
   max-width="80%"
%}

> _"This often indicates an ingress or network configuration problem. Please verify network (VPN/Proxy settings and Ad-blocker status.)"_

A link to the Troubleshooting Guide is provided within the banner for the most common resolution steps.

### Runtime Applications tab

Lists all runtime applications with their sync and health status.

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-status-panel-applications.jpeg"
   url="/images/runtime/runtime-status-panel-applications.jpeg"
   alt="Runtime Status Panel - Runtime Applications tab"
   caption="Runtime Status Panel - Runtime Applications tab"
   max-width="80%"
%}

**Columns:** Name \| Description \| Sync Status \| Health Status \| Actions

{: .table .table-bordered .table-hover}
| Field | Description |
|---|---|
| **Name** | Application name — click to open the application details page |
| **Sync Status** | Synced / Out of Sync |
| **Health Status** | Healthy / Progressing / Degraded |

**Row actions** (⋮ context menu):
- Quick view
- Synchronize
- Refresh
- Hard refresh

### Runtime Components tab

Lists all runtime components with their descriptions and health status. Health statuses are aggregated from the underlying deployments and StatefulSets.

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-status-panel-components.jpeg"
   url="/images/runtime/runtime-status-panel-components.jpeg"
   alt="Runtime Status Panel - Runtime Components tab"
   caption="Runtime Status Panel - Runtime Components tab"
   max-width="80%"
%}

**Columns:** Name \| Description \| Status \| Actions

{: .table .table-bordered .table-hover}
| Component | Description |
|---|---|
| **redis** | High-performance data caching used by the Codefresh runtime |
| **runtime-event-reporter** | Sends application and managed resource events to Codefresh |
| **cluster-event-reporter** | Sends K8s events for rollouts, analysis runs, and replicasets |
| **argo-gateway** | Handles Codefresh-specific API requests (e.g., rollout rollback) |
| **workflow-reporter** | Sends in-cluster K8s events of Argo Workflows to Codefresh |
| **rollout-reporter** | Sends in-cluster K8s events of Argo Rollouts, analysis runs, and replicasets |
| **gitops-operator** | Codefresh controller for restricted Git Sources and promotions |
| **argo-rollouts** | Kubernetes controller and set of CRDs for advanced deployment strategies |
| **sealed-secrets** | Encrypts integration credentials for safe storage in Git repositories |

**Row actions:**
- **View Logs** icon — opens component logs for troubleshooting

## Related articles

[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)   
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/)   
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)   
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)   
[Troubleshooting GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/runtime-troubleshooting/)   
