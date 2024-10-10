---
title: "Product CRD"
description: ""
group: promotions
toc: true
---


Codefresh gives you the option of defining Custom Resource Definitions (CRDs) for promotion entities in Form or YAML modes.  
If you are more comfortable working with YAML, create the CRD using the example of the Product CRD and the table with the descriptions of the parameters.

## Product CRD example
Here's an example of the Product CRD. The table that follows describes the fields in the Product CRD. 


```yaml
apiVersion: codefresh.io/v1beta1
kind: Product
metadata:
  name: helm-guestbook #name of product
spec:
  promotionTemplateRef: gs-promotion-template  #reference to predefined promotion template; optional if using inline template
  promotionTemplate:  # custom inline promotion template; optional if using predefined promotion template
    versionSource:
      file: version.yaml  
      jsonPath: $.appVersionInline
    promotion:
      Chart.yaml:
        jsonPaths:
          - $.appVersion
          - $.version
          - $.dependencies
      version.yaml:
        jsonPaths:
          - $.appVersionInline
      values.yaml:
        jsonPaths:
          - $..image
      requirements.yaml:
        jsonPaths:
          - "$.dependencies"
  promotionFlows:  # orchestration flow to promote product across environments; first flow that matches gitTriggerSelectors is selected
    - name: to-prod
      gitTriggerSelectors:
        - key: commitMessage
          operator: In
          values:
            - "*deploy*"
    - name: demo
      gitTriggerSelectors:
        - key: gitRevision
          operator: In
          values:
            - "hotfix"
```


## Product CRD field descriptions


| Field | Description | Type | Required/Optional |
|-------|-------------|------|-------------------|
| `metadata.name` | The name of the product resource, which must conform to the naming conventions for Kubernetes resources.<br>The name unifies all the applications connected to this product and is displayed in the Products dashboard.<br>For example, `helm-guestbook`. |string | Required |
| `spec.promotionTemplateRef` | The predefined Promotion Template according to which the properties in the product's applications are selected to be promoted across environments.<br>Required if `spec.promotionTemplate` is not defined.<br>When a predefined Promotion Template is defined, both the version of the release and the specific files and attributes to be promoted across environments are taken from the Promotion Template. | | Optional |
| `spec.promotionTemplate` | The custom inline Promotion Template according to which the properties in the product's applications are selected to be promoted across environments.<br>Required if `spec.promotionTemplateRef` is not defined.|    |Optional  |
|  `spec.promotionTemplate.versionSource`      |  The location of the file and the attribute from which to extract the product's application release version. This is the version displayed in the Products and Environments dashboards.| |Optional | 
| `spec.promotionTemplate.versionSource.file`      | The file path relative to the application's file path from which to extract the application's release version. For example, `chart.yaml` indicates that the release version should be extracted from this file.| string | Required |
| `spec.promotionTemplate.versionSource.jsonPath`     | The JSON path expression pointing to the location of the attribute containing the application version within the specified `file`.<br>For example, `$.appVersion` indicates the value should be extracted from the field `appVersion` in `chart.yaml`.| string| Required |
|`spec.promotion`| The top-level element defining the specific changes to be promoted to the target environment, through a single or a list of `<filename>:jsonPaths`.<br>`jsonPaths` can define the path to single or multiple attributes within the same file. <br>When omitted, *all* changes in *all* applications connected to the Product are promoted.<br> Examples:<br>Extract `name` attribute from `chart.yaml` at `JSON path: $.name`<br>Extract all properties of the `dependencies` object from `chart.yaml` at `JSON path: $..dependencies.*`<br>Extract the `repository` property from the `image` object in `values.yaml` at `JSON path: $..image.repository` |array | Optional |
| `spec.promotion.filename`      | The file path relative to the application's file path from which to select properties to promote.  | string | Optional |
| `spec.promotion.jsonPath`      | The JSON path expression pointing to the location of the attribute with the value to be promoted within the specified `filename`.<br>For example, `$.appVersion` indicates the value should be extracted from the field `appVersion` in `chart.yaml`.| string| Optional |
| `spec.promotionFlows` | The top-level element defining one or more Promotion Flows to orchestrate the product's promotion from the trigger environment, across all target environments and up to the final target environment.<br>When there is more than one Promotion Flow, the first one in the list that matches the `gitTriggerSelector` is executed.
|`spec.promotionFlows.name`   | The name of the Promotion Flow to execute.| string | Required| 
| `spec.promotionFlows.gitTriggerSelectors`   |The criteria or conditions to trigger the Promotion Flow, evaluated according to the payload from the application's Git repository.<br>You can have more than one `gitTriggerSelector` for the same Promotion Flow. In such cases, the conditions are matched according to the `key`, `operator`, and `values` fields.<br>Examples:<br>With commit message<br>`key: commitMessage` `operator: In` `values: - "*deploy*" - "*release*"`<br>This selector checks if the `commitMessage` includes either "deploy" or "release" using wildcards for partial matches.<br>With Git revision (commit hash) message<br>`key: gitRevision` `operator: NotIn` `values: - "a1b2c3d4" - "e5f6g7h8"`<br>This selector checks if the `gitRevision` matches exactly either "a1b2c3d4" or "e5f6g7h8".| ??  |Required |
| `spec.promotionFlows.gitTriggerSelectors.key`    | The specific attribute from the Git payload to evaluate, and can be one of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">commitMessage</code>: Trigger the Promotion Flow based on the text description associated with the commit message. The commit message is matched against the values provided.</li><li><code class="highlighter-rouge">gitRevision</code>: Trigger the Promotion Flow based on the commit hash generated by Git as a unique identifier for the commit. The commit hash is matched against the values provided.</li></ul>{:/} | string   | Required    |
|`spec.promotionFlows.gitTriggerSelectors.operator`     | The operator to apply when matching the `gitTriggerSelectors.key`, and can be one of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">In</code>: Checks if the commit message or Git revision <i>includes</i> the specified value or any value within a set of values. The <code class="highlighter-rouge">In</code> operator matches values by exact match, or by partial match when asterisks are used as wildcards.</li><li><code class="highlighter-rouge">NotIn</code>: Checks if the commit message or Git revision <i>does not include</i> the specified value or any value within a set of values. Useful for excluding resources that match any value within a predefined list.<br>The <code class="highlighter-rouge">NotIn</code> operator matches values by exact match, or by partial match when asterisks are used as wildcards.</li></ul></li>{:/} |string  |Required  |
|`spec.promotionFlows.gitTriggerSelectors.values`  |Single or list of comma-separated values used to match or exclude Promotion Flows based on criteria defined by `gitTriggerSelectors.operator`. The values can be strings, numbers, or other data types depending on the context.|??  |Required |

## Related articles
[Promotion Policy CRD]({{site.baseurl}}/docs/promotions/promotion-policy-crd/) 
[Promotion Template CRD]({{site.baseurl}}/docs/promotions/promotion-template-crd/)  
[Promotion Flow CRD]({{site.baseurl}}/docs/promotions/promotion-flow-crd/)  
