---
title: "Promotion Template YAML"
description: "YAML specifications for the Promotion Template defining version info and properties to promote"
group: promotions
redirect-from: 
 - /docs/promotions/configuration/yaml
 - /docs/promotions/entities/yaml/
toc: true
---

>**Promotions is currently in development**  
This feature is still under active development and we've identified some issues with its resilience and reliability, particularly with recovery from cluster and network problems. We are currently upgrading our architecture to resolve these known issues and add self-healing capabilities.
We don't recommend using Promotions for mission-critical or production deployments at this time.

Codefresh provides two options for defining manifests for promotion entities: Form mode and YAML mode.

If you prefer working with YAML, create the manifest using the example Promotion Template YAML below, and the table with field descriptions.

Once configured and committed, the settings are saved as a Custom Resource Definition (CRD) within the Shared Configuration Repository in the GitOps Runtime specified as the Configuration Runtime.


## Promotion Template YAML example

Here's an example of the Promotion Template manifest. The table describes the fields in the Promotion Template manifest. 

```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionTemplate
metadata:
  name: base-helm                     # any valid k8s name
spec:
  applicationSourceSelector:
    matchLabels:
      codefresh.io/product: loans
  priority: 1
  versionSource:                      # get release version from this file 
    file: Chart.yaml
    jsonPath: $appVersion
  promotion:                         #  promote defined changes in files; leave empty to promote all changes
    Chart.yaml:
      jsonPaths:
      - $.appVersion
      - $.version
      - $.dependencies
    values.yaml:
      jsonPaths:
      - $..image
    requirements.yaml:
      jsonPaths:
      - "$.dependencies"
```

## Promotion Template YAML field descriptions


{: .table .table-bordered .table-hover}
| Field            | Description                        | Type  |  Required/Optional|
|-------           |-------------                       |------|-------------------|
| `metadata.name`  | The name of the Promotion Template, which can correspond to the name of the Product, or any other meaningful identifier.| string | Required
| `spec.applicationSourceSelector`  | The label used to match the application to which to apply the Promotion Template. Application selectors conform to Kubernetes _label selectors_, defined as `matchLabels` with `key-value` pairs, `matchExpressions` with `key-operator-value` arrays, or a combination of both. The values identify all the Promotion Template manifests that match the specific application or applications within the target environment.| - | Required|
| `spec.applicationSourceSelector.matchLabels`         | One or more `key-value` pairs, where each pair is equivalent to a condition in `matchExpressions`. If there are multiple `key-value` pairs, the AND operator is used. <br>For example:{::nomarkdown}<ul><li><code class="highlighter-rouge">codefresh.io/environment: production</code> applies the Promotion Template to all applications within the Production Environment.</li><li><code class="highlighter-rouge">codefresh.io/product: loans</code> applies the Promotion Template only to applications belonging to the Loans product.</li></ul>{:/}| object  | Optional |
| `spec.applicationSourceSelector.matchExpressions`         | List of expressions, each with a `key`, an `operator`, and a set of `values`. <br>The `operator` defines the relationship between the `key` and its `values`, and can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">In</code>: The value _must match_ one of those specified in the <code class="highlighter-rouge">values</code> array.</li> <li><code class="highlighter-rouge">NotIn</code>: The value _must NOT match_ any of  those in the <code class="highlighter-rouge">values</code> array.</li><li><code class="highlighter-rouge">Exists</code>: Only the <code class="highlighter-rouge">key</code> must exist regardless of its values.<br>The <code class="highlighter-rouge">values</code> array must be empty. </li><li><code class="highlighter-rouge">DoesNotExist</code>: The <code class="highlighter-rouge">key</code> must not exist.<br>The <code class="highlighter-rouge">values</code> array must be empty.</li></ul>{:/}For example:<br>`key: codefresh.io/product` and `operator: Exists` applies the Promotion Template to any application containing the label `codefresh.io/product`.| string  | Optional |
| `spec.priority`  | The priority of the Promotion Template, determining the order in which Promotion Templates are applied when multiple Promotion Templates match the same application. The priority is ranked in ascending order, ranging from 0 or a negative number to higher values.   |integer | Required | 
|  `spec.versionSource`      |  The location of the file and the attribute in the file from which to extract the product's application release version. This is the version displayed in the Product, Environment, and GitOps Apps dashboards.|  - |Required | 
| `spec.versionSource.file`     |  The file path relative to the application's file path from which to extract the application's release version. For example, `chart.yaml` indicates that the release version should be extracted from this file.| string | Required |
| `spec.versionSource.jsonPath`      | The JSON path expression pointing to the location of the attribute containing the application version within the specified `file`.<br>For example, `$.appVersion` indicates the value should be extracted from the field `appVersion` in `chart.yaml`.| string| Required |
|`spec.promotion`| The top-level element defining the specific changes to be promoted to the target environment, through a single or a list of `<filename>:jsonPaths`.<br>`jsonPaths` can define the path to single or multiple attributes within the same file. <br>When omitted, *all* changes in *all* applications connected to the Product are promoted.<br><br>Examples:{::nomarkdown}<ul><li>Extract <code class="highlighter-rouge">name</code> attribute from <code class="highlighter-rouge">chart.yaml</code><br>JSON path: <code class="highlighter-rouge">$.name</code></li><li>Extract all properties of the <code class="highlighter-rouge">dependencies</code> object from  <code class="highlighter-rouge">chart.yaml</code><br>JSON path: <code class="highlighter-rouge">$..dependencies.*</code></li><li>Extract the <code class="highlighter-rouge">repository</code> property from the <code class="highlighter-rouge">image</code> object in <code class="highlighter-rouge">values.yaml</code><br>JSON path: <code class="highlighter-rouge">$..image.repository</code></li></ul>{:/} |array | Optional |
|`spec.promotion.filename`       | The file path relative to the application's file path from which to select properties to promote.  | string | Optional |
|`spec.promotion.jsonPath`      | The JSON path expression pointing to the location of the attribute with the value to be promoted within the specified `filename`.<br>For example, `$.appVersion` indicates the value should be extracted from the field `appVersion` in `chart.yaml`.| string| Optional |


## Related articles
[Product YAML]({{site.baseurl}}/docs/promotions/yaml/product-crd/)  
[Promotion Policy YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-policy-crd/)  
[Promotion Template YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-template-crd/)   




