---
title: "Runtime topology view"
description: ""
group: runtime
toc: true
---

The Topology view of the runtime displays a hierarchical view of your deployment layout with all the runtimes and managed clusters.

Thr runtime on the left branches out to all the clusters managed by it, with an add managed cluster option.

{: .table .table-bordered .table-hover}
|#|Runtime Topology View iten|  Description   |   
|--| --------------          | ---------------- |
|1| Runtime                  |The name of the runtime and the cluster on which the runtime is provisioned with the Codefresh logo.  
                              {::nomarkdown}<br><ul><li>![](/images/icons/error.png?display=inline-block) prefixed to the runtime name indicates health or sync errors in the runtime, or a managed cluster if one was added to the runtime.</br> The runtime node is bordered in red and the runtime is highlighted in red.</li>
                              <li>![](/images/icons/cf-sync-status.png?display=inline-block) indicates that the runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |
|2| On Git commit, _only_ when the commit is on a specific branch. This requires a filter to define the target branch.             | `Commit pushed`      | Implicitly on `Commit pushed`, and explicitly when `Git branch`  = `<branch-name>`, for example, `main` |          
|3| On an opened PR                                                                   | `PR opened`          | Implicitly on `PR opened` |                             
|4|On an opened PR, _only_ for a specific branch                                        | `PR opened`          | Implicitly on `PR opened`, and explicitly when `PR target branch`  = `<branch-name>`, for example, `production` | 
|5|On an opened PR, _only_ for a specific branch, and _only_ when the PR name includes the entered value|  `PR opened`      | Implicitly on `PR opened`, and explicitly when `PR target branch` = `<branch-name>`, for example, `production` and when `PR labels` = `<PR-name>`, for example, `cf-hotifx-xxxx`| 
{::nomarkdown}<ul><li>Pipelines without numbers prefixing the names indicate new pipelines.</li><li>Pipeline names prefixed with a green or red number (encircled in the image above) indicate existing pipelines. </br> The number indicates the change in position of the pipeline compared to the reference period. </li><li>To drill down into a specific pipeline, select the pipeline.</li></ul> {:/}





