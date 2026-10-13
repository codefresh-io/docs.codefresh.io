---
title: "Release Notes: October 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

{{site.data.callout.callout_tip}}
This article is updated throughout the month as new releases become available.
{{site.data.callout.end}}

## Features & enhancements

### Classic Pipelines

#### `deploy` step supports Kubernetes 1.35 to 1.37

The [`deploy` step]({{site.baseurl}}/docs/pipelines/steps/deploy/) now supports Kubernetes versions 1.35, 1.36, and 1.37.

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Classic Runtime [11.0.0](https://github.com/codefresh-io/venona/releases/tag/cf-runtime-11.0.0-helm){:target="_blank"} | Upgrade to Runtime 11.0.0 or later. Review the breaking changes first. |
| On-premises | Codefresh Platform [2.12.21](https://github.com/codefresh-io/codefresh-onprem-helm/releases/tag/codefresh-2.12.21){:target="_blank"} | Upgrade to Platform 2.12.21 or later. Review the breaking changes first. |

## Bug fixes

### Classic Pipelines

#### DinD resource limits set to `null` were replaced by parent runtime limits

When `runtime.dind.resources.limits` was set to `null` in the Classic Runtime Helm chart, the limits of the parent runtime (`runtime.runtimeExtends`) were applied instead. If the configured requests exceeded those inherited limits, pipelines failed with `Request resource cannot pass the configured limits`.

You can now set `runtime.dind.resources.limits: null` to run DinD pods without resource limits. You can also remove a single limit by setting only `runtime.dind.resources.limits.cpu: null` or `runtime.dind.resources.limits.memory: null`.

For example:

```yaml
runtime:
  dind:
    resources:
      limits:
        cpu: null
        memory: 16Gi
```

This works when `runtime.runtimeExtends` is set to `[]`, which is the new default in Runtime 11.0.0.

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Not applicable | None |
| Hybrid | Classic Runtime [11.0.0](https://github.com/codefresh-io/venona/releases/tag/cf-runtime-11.0.0-helm){:target="_blank"} | Upgrade to Runtime 11.0.0 or later. Review the breaking changes first. |
| On-premises | Not applicable | None |
