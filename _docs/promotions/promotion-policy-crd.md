---
title: "Promotion Policy CRD"
description: ""
group: promotions
toc: true
---

## Promotion Policy CRD

```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionPolicy
metadata:
  name: pp-all-values
spec:
  priority: 2
  selector:
    product:
      names:
      - p1
    targetEnvironment:
      names:
      - staging
      types:
      - NON_PROD
      tags:
      - t1
      - t2
  policy:
    action: commit
    preAction: smoketests
    postAction: slack-notification
```


## Promotion Policy CRD field descriptions

| Field              | Description                       | Type   | Required/Optional |
|------------------- |-------------------------------|--------|--------------------|
| `metadata.name`    | The name of the Promotion Policy, which must conform to the naming conventions for Kubernetes resources. Useful if the name indicates the purpose of this Promotion Policy - where and how it is intended to be used. For example, `productionDeployments`.  | string |Required |
| `spec.priority`   | The priority of the Promotion Policy, determining which Pre-Action Workflow, Action, and Post-Action Workflow is applied for policy evaluation <!--- (add xref)--> and policy implementation when multiple Promotion Policies match the same product or environment. The priority is ranked in ascending order, ranging from 0 or a negative number to higher values. <!---(TBD link to topic explaining how it is applied) --> |integer | Required  |
| `spec.selector`   | The product or target environment to which to apply the Promotion Policy.  |   object        | Optional  |
| `spec.selector.product` | The product to which to apply or match this Promotion Policy by either `names` or `tags`. Required when `.selector.product.targetEnvironment` is not defined.   |   object   | Optional |
| `spec.selector.product.names` | The name of a single product or a list of multiple products to which to apply the Promotion Policy. Required if `spec.selector.product.tags` are not used to match the Promotion Policy to the product. For example, `billing` or `- billing  - guestbook-helm, - demo-trioapp`.  |    array | Optional |
<!--- | `spec.selector.product.tags`  | The tag or a list of tags associated with a single or multiple products to which to match the Promotion Policy. Required if `spec.selector.product.names` are not used to match the Promotion Policy to the product. For example, `???`.  |   array | Optional | -->
| `spec.selector.targetEnvironment`  | The target environments to which to apply the Promotion Policy based on the `name`, `type`, or `tag`. <!--- is this correct? If multiple criteria are provided, all criteria must be matched.--><br>Required when `.selector.product.product` is not defined. | object   | Optional |
| `spec.selector.targetEnvironment.name` | The name of the target environment, or the list of target environments to which to apply the Promotion Policy. <!--- to verify: If at least one name in the list does not exist, the target environment is not defined -->.<br>Required when `.targetEnvironment.type` or `.targetEnvironment.tags` are not defined. |  array | Optional  |
| `spec.selector.targetEnvironment.type` | The type of target environments to which to apply the Promotion Policy. Can be one of these: `PROD`for production environments, or `NON_PROD` for any other environment such as `dev`, `qa`. <br>Required when `.targetEnvironment.name` or `.targetEnvironment.tags` are not defined.  |  array | Optional  |
| `spec.selector.targetEnvironment.tags`  | The tag, or the list tags associated with a single or multiple target environments to which to apply the Promotion Policy. <br>Required when `.targetEnvironment.name` or `.targetEnvironment.type` are not defined. | array | Optional  |
| `spec.policy`  | The Pre-Action Workflow, Action, and Post-Action Workflow to implement for the Promotion Policy through the `action`, `preAction`, and `postAction` attributes. <br>At least one attirbute is required.<!--- add xref to topic on how this is implemented --> | object   | Optional |
| `spec.policy.action` | <!---Is this by default set to commit? -->The action that should trigger the promotion in the target environment for this Promotion Policy.<br>Can be one of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">commit</code>: Executes a commit operation on the target application.</li><li><code class="highlighter-rouge">pr</code>: Executes a commit and opens a pull request for the target application.<br>Useful when you need manual approval before commit.</li><li><code class="highlighter-rouge">none</code>: Does not execute any action on the target application. This value requires the `spec.policy.preAction` that includes a step equivalent to a promote action. </li></ul>{:/}|  enum | Optional  |
| `spec.policy.preAction` | The Argo Workflow to execute _before_ `spec.policy.action`. <br><br>Required if `spec.policy.action` is not defined or set to `none`, and `spec.policy.postAction` is not defined. |  string | Optional  |
| `spec.policy.postAction`  | The Argo Workflow to execute after `spec.policy.action`. <br><br>Required if `spec.policy.action` and `spec.policy.preAction` are not defined.| string | Optional  |


