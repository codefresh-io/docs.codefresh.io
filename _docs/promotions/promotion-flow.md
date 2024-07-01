---
title: "Promotion Flow CRD for GitOps deployments"
description: "Specifications for a Promotion Flow CRD to define the orchestration flow for product across environments"
group: promotions
toc: true
---

Here's an example of the Promotion Flow CRD. The table that follows describes the fields in the Promotion Flow CRD. 

spec:
  triggerEnvironment: dev
  postTrigger: post-action
  steps:
    - environment: qa
      dependsOn:
        - dev
      policy:
        preAction: pre-action
        postAction: smoketests
        action: commit
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
      policy:
        preAction: pre-action
        postAction: post-action
        action: commit



```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionFlow
metadata:
  name: global-parallel-flow
spec:
  properties:
    triggerEnvironment: dev  # name of the initial environment that triggers promotion flow
    steps:
    - environment: qa
      dependsOn:
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
| Field           | Description                                                | Type  |  Required/Default  |
|---------------------|-----------------------------------------------------------|---------|----------|
| `triggerEnvironment` | The name of the initial environment that triggers the entire Promotion Flow. | string | Required          |
| `steps`              | The top-level element grouping the list of environments defined in the Promotion Flow through the `.environment` and `.dependsOn` attributes.  |  array | Optional   |
|                      | `steps.environment`: The name of the specific environment for which to trigger the promotion. | string |Required        |
|                      |`steps.dependsOn`: One or more environments which must be successfully promoted before the promotion flow can be applied to the target environment.   | array | Required          |
