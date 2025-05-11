---
title: "Promotion Flow YAML"
description: "YAML specifications for defining the orchestration flow for product promotion"
group: promotions
redirect-from: 
 - /docs/promotions/configuration/yaml
 - /docs/promotions/entities/yaml
toc: true
---


Codefresh provides two options for defining manifests for promotion entities: [Chart mode]({{site.baseurl}}/docs/promotions/promotion-flow/) and YAML mode.

If you prefer working with YAML, create the manifest using the example Promotion Flow YAML below, and the table with field descriptions.

Once configured and committed, the settings are saved as a Custom Resource Definition (CRD) within the Shared Configuration Repository in the GitOps Runtime specified as the Configuration Runtime.

## Promotion Flow YAML example
Here's an example of the Promotion Flow manifest. The table that follows describes the fields in the Promotion Flow manifest. 

```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionFlow
metadata:
  name: global-parallel-flow
spec:
  triggerEnvironment: dev
  steps:
    - environment: staging
      dependsOn:
        - dev
      policy:
        action: commit
      hooks:
        onStart: slack-start-hook
        onSuccess: simple-fail
        onFail: jira-open-bug
    - environment: production
      dependsOn:
        - staging
      policy:
        action: commit
  hooks:
    onStart: slack-start-hook
    onSuccess: success-hook-test
    onFail: slack-fail-hook

```

## Promotion Flow YAML field descriptions

{: .table .table-bordered .table-hover}
| Field                | Description                                                     | Type   | Required/Default |
|----------------------|---------------------------------------------------------------- |--------|------------------|
| `metadata.name`                | The name of the Promotion Policy, which must conform to the naming conventions for Kubernetes resources. Useful if the name indicates the purpose of this Promotion Policy - where and how it is intended to be used. For example, `productionDeployments`.       | string  | Required          |
|`spec.steps`               | The step in the Promotion Flow that defines the list of target environments and their dependencies. <br>At least one target environment and dependency must be defined. | array  | Required   |
|`spec.steps.environment`   | The name of the specific target environment for which to trigger the promotion.   | string | Required         |
|`spec.steps.environment.dependsOn`| One or more environments that must be successfully promoted before promotion can be triggered in the succeeding environments.   | array  | Required |
|`spec.steps.environment.policy`| The Pre-Action Workflow, Action, and Post-Action Workflow to implement for the Promotion Policy through the `action`, `preAction`, and `postAction` attributes. <br>The Action attribute is required.<br>An `policy` attribute defined here overrides global Policies that match the product/environment. See [Promotion Policy implementation logic]({{site.baseurl}}/docs/promotions/promotion-policy/#promotion-policy-implementation-logic) for information on how they are applied.  | object  | Optional          |
| `spec.steps.environment.policy.preAction`        | The name of the Promotion Workflow to execute _before_ `spec.steps.policy.action`.                      | string  | Optional          |
| `spec.steps..environment.policy.postAction`       | The name of the Promotion Workflow to execute _after_ `spec.steps.policy.action`.                         | string  | Optional          |  
| `spec.steps.environment.policy.action`           | The action that should trigger the promotion in the target environment for this Promotion Policy.<br>Can be one of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">commit</code>: Executes a commit operation on the target application.</li><li><code class="highlighter-rouge">pr</code>: Executes a commit and opens a pull request for the target application.<br>Useful when you need manual approval before commit.</li><li><code class="highlighter-rouge">none</code>: Does not execute any action on the target application.<br>In this case, the Post-Action workflow must include a step that is equivalent </li></ul>{:/}| string   | Required          |
|`spec.steps.environment.hooks`       | The promotion hooks to run for the _environment_, and can be any of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">onStart</code>: The promotion hook to run when the promotion reaches the environment.</li><li><code class="highlighter-rouge">onSuccess</code>: The promotion hook to run when the promotion completes successfully in the environment.</li><li><code class="highlighter-rouge">onFail</code>: The promotion hook to run when the promotion fails in the environment.</li></ul>{:/}| string  | Optional          | 
|`spec.hooks`       | The promotion hooks to run for the _product release_, and can be any of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">onStart</code>: The promotion hook to run when the release is initiated.</li><li><code class="highlighter-rouge">onSuccess</code>: The promotion hook to run when the release completes successfully.</li><li><code class="highlighter-rouge">onFail</code>: The promotion hook to run when the release fails.</li></ul>{:/}| string  | Optional          |



## Related articles
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
[Configure hooks in Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-hooks/)  
[Product YAML]({{site.baseurl}}/docs/promotions/yaml/product-crd/)  
[Promotion Policy YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-policy-crd/)  
[Promotion Template YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-template-crd/)  
