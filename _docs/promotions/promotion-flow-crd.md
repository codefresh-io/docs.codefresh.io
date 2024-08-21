---
title: "Promotion Flow CRD for GitOps deployments"
description: "Specifications for a Promotion Flow CRD to define the orchestration flow for product promotion"
group: promotions
toc: true
---

Codefresh gives you the option of defining Custom Resource Definitions (CRDs) for promotion entities in Form or YAML modes.  
If you are more comfortable working with YAML, create the CRD using the example of the Promotion Policy CRD and the table with the descriptions of the parameters.

## Promotion Flow CRD
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
| `spec.triggerEnvironment` | The name of the initial environment that triggers the entire Promotion Flow.  | string | Required   |
| `spec.steps`              | A list of steps in the Promotion Flow. Each step defines an environment and its dependencies. <br>At least one environment and dependency must be defined. | array  | Required   |
|          |`steps[].environment`: The name of the specific environment for which to trigger the promotion.   | string | Required         |
|          | `steps[].dependsOn`: One or more environments that must be successfully promoted before this step can be triggered.   | array  | Required |

## Related articles
[Product CRD]({{site.baseurl}}/docs/promotions/product-crd/)  
[Promotion Template CRD]({{site.baseurl}}/docs/promotions/promotion-template-crd/)  
[Promotion Policy CRD]({{site.baseurl}}/docs/promotions/promotion-policy-crd/)  
