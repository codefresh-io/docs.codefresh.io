---
title: "Promotion Policy YAML"
description: "YAML specifications for the Promotion Policy defining promotion conditions to apply to the environment"
group: promotions
redirect-from: 
 - /docs/promotions/configuration/yaml
 - /docs/promotions/entities/yaml
toc: true
---


Codefresh provides two options for defining manifests for promotion entities: Form mode and YAML mode.

If you prefer working with YAML, create the manifest using the example Promotion Policy YAML below, and the table with field descriptions.

Once configured and committed, the settings are saved as a Custom Resource Definition (CRD) within the Shared Configuration Repository in the GitOps Runtime specified as the Configuration Runtime.

## Promotion Policy YAML example
Here's an example of the Promotion Policy manifest. The table that follows describes the fields in the Promotion Policy manifest. 


```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionPolicy
metadata:
  name: demo-policy
spec:
  priority: 2
  selector:
    product:
      names:
      - trio-dev
    targetEnvironment:
      names:
      - staging
      types:
      - NON_PROD
  policy:
    action: commit
    preAction: smoke-tests
    postAction: slack-notification
```



## Promotion Policy YAML field descriptions

{: .table .table-bordered .table-hover}
| Field                          | Description               | Type    | Required/Optional |
|--------------------------------|----------------------------|---------|-------------------|
| `metadata.name`                | The name of the Promotion Policy, which must conform to the naming conventions for Kubernetes resources. Useful if the name indicates the purpose of this Promotion Policy - where and how it is intended to be used. For example, `productionDeployments`.       | string  | Required          |
| `spec.priority`                | The priority of the Promotion Policy, determining which Pre-Action Workflow, Action, and Post-Action Workflow are applied when [evaluating policies]({{site.baseurl}}/docs/promotions/promotion-policy/#evaluate-promotion-settings-for-products-and-environments) and [implementing policies]({{site.baseurl}}/docs/promotions/promotion-policy/#promotion-policy-implementation-logic) when multiple Promotion Policies match the same product or environment. <br>The priority is ranked in ascending order, ranging from 0 or a negative number to higher values.  | integer | Required          |
| `spec.selector`                | The products and target environments to which to apply the Promotion Policy.<br>You can define multiple products, or environments.<br>If neither a product nor an environment is defined for a policy, it is considered a global policy that matches all products and environments.                  | object  | Optional          |
| `spec.selector.product`        | The product or products to which to apply or match this Promotion Policy by `names`. <br>When not defined, matches all products.   | object  | Optional          |
| `spec.selector.product.names`  | The name of a single product or a list of multiple products to which to apply the Promotion Policy. <!-- Required if `spec.selector.product.tags` are not used to match the Promotion Policy to the product. For example, `billing` or `- billing  - guestbook-helm, - demo-trioapp`. -->            | array   | Optional          |
| `spec.selector.targetEnvironment` | The target environments to which to apply the Promotion Policy based on the `name` or `type`. <!-- or `tag` --> <br>If more than one  criteria are provided, all criteria must be matched.        | object  | Optional          |
| `spec.selector.targetEnvironment.name` | The name of the target environment, or the list of target environments to which to apply the Promotion Policy. <br>When empty, applies to all environments.  | array   | Optional |
| `spec.selector.targetEnvironment.type` | The type of target environments to which to apply the Promotion Policy. Can be one of these: `PROD` for production environments, or `NON_PROD` for any other environment such as `dev`, `qa`.  | array   | Optional          |
| `spec.properties.policy`                  | The Pre-Action Workflow, Action, and Post-Action Workflow to implement for the Promotion Policy through the `action`, `preAction`, and `postAction` attributes. <br>The Action attribute is required.<br>See [Promotion Policy implementation logic]({{site.baseurl}}/docs/promotions/entities/promotion-policy/#promotion-policy-implementation-logic) for information on how promotion settings are used.  | object  | Optional          |
| `spec.policy.action`           | The action that should trigger the promotion in the target environment for this Promotion Policy.<br>Can be one of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">commit</code>: Executes a commit operation on the target application.</li><li><code class="highlighter-rouge">pr</code>: Executes a commit and opens a pull request for the target application.<br>Useful when you need manual approval before commit.</li><li><code class="highlighter-rouge">none</code>: Does not execute any action on the target application. </li></ul>{:/}| enum   | Required          |
| `spec.policy.preAction`        | The name of the Promotion Workflow to execute _before_ `spec.policy.action`.                      | string  | Optional          |
| `spec.policy.postAction`       | The name of the Promotion Workflow to execute _after_ `spec.policy.action`.                         | string  | Optional          |

<!--- `spec.selector.product.tags`    The tag or a list of tags associated with a single or multiple products to which to match the Promotion Policy. Required if `spec.selector.product.names` are not used to match the Promotion Policy to the product. For example, `???`.    array    Optional      
`spec.selector.targetEnvironment.tags`   The tag, or the list tags associated with a single or multiple target environments to which to apply the Promotion Policy. <br>Required when `.targetEnvironment.name` or `.targetEnvironment.type` are not defined.  array    Optional         -->    


## Related articles
[Product YAML]({{site.baseurl}}/docs/promotions/yaml/product-crd/)  
[Promotion Flow YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-flow-crd/)  
[Promotion Template YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-template-crd/)  



