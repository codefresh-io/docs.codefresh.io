---
title: "Promotion Flow CRD for GitOps deployments"
description: "Specifications for a Promotion Flow CRD to define the orchestration flow for product promotion"
group: promotions
toc: true
---

Here's an example of the Promotion Flow CRD. The table that follows describes the fields in the Promotion Flow CRD. 

```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionFlow
metadata:
  name: global-parallel-flow
spec:
  properties:
    triggerEnvironment: dev  # name of the initial environment that triggers promotion flow
    steps:                   # one or more environments across which to promote product
    - environment: qa        # target environment
      dependsOn:             # environment to successfully promote before triggering promotion for target
        - dev
    - environment: staging
      dependsOn:
        - qa
      policy:
        preAction: pre-action
        postAction: post-action
        action: commit
    - environment: production
      dependsOn:
        - staging
```



{: .table .table-bordered .table-hover}
| Field                | Description                                                     | Type   | Required/Default |
|----------------------|---------------------------------------------------------------- |--------|------------------|
| `triggerEnvironment` | The name of the initial environment that triggers the entire Promotion Flow.  | string | Required   |
| `steps`              | A list of steps in the Promotion Flow. Each step defines an environment and its dependencies. <br>At least one environment and dependency must be defined. | array  | Required   |
|          |`steps[].environment`: The name of the specific environment for which to trigger the promotion.   | string | Required         |
|          | `steps[].dependsOn`: One or more environments that must be successfully promoted before this step can be triggered.   | array  | Required |
