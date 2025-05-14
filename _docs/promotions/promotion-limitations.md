---
title: "Promotion limitations"
description: "Review the current limitations when working with promotions"
group: promotions
toc: true
---


## Current limitations for promotions
The table below lists the current limitations when working with promotions.

{: .table .table-bordered .table-hover}
| Item                     | Limitation            |
| --------------         | --------------           |
|Git providers           | GitHub only.<br>The following Git-based actions are supported:{::nomarkdown}<ul><li>Opening a pull request (PR)</li><li>Adding Git commit status updates with a link to the release<li></ul>{:/}|
|Argo Rollouts           | Partially supported.<br>{::nomarkdown}<ul><li>An application that reports a Healthy status may trigger the next stage in the promotion before the rollout is complete.</li><li>Promotion release fails if Argo Rollout remains in Processing state for over two hours <li></ul>{:/}|
|Multi-source applications           | Not supported.<br>{::nomarkdown}<ul><li>Promotion Flows are not supported for Argo CD applications with multiple sources (multi-source applications.) <li></ul>{:/}|
|Promotable files & properties       | {::nomarkdown}<ul><li><b>File scope</b>:Only files in the root or a subdirectory of the <a href="https://codefresh.io/docs/gitops/gitops-applications/#argo-cd-application-source"> Argo CD application source</a> can be promoted. Files outside this scope are ignored.<li><li><b>Value overrides</b>: Inline value overrides in the application manifest through `values:` in `spec.source.helm` for example, are not supported for promotion.<li></ul>{:/}|

## Related articles
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)   
[Tracking product promotions through releases]({{site.baseurl}}/docs/promotions/product-releases/)  
[Promotions: Setup & configuration guidelines]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
