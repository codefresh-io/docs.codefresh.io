---
title: "Promotion Template CRD"
description: ""
group: promotions
toc: true
---


## Promotion Template CRD

Here's an example of the Promotion Template CRD. The table describes the fields in the Promotion Template CRD. 

```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionTemplate
metadata:
  name: base-helm                     # any valid k8s name
spec:
  applicationSourceSelector:          # valid k8s LabelSelector
    matchExpressions:                 # can be either matchExpressions or matchLabels 
    - key: codefresh.io/product
      operator: Exists
  priority: 0                         # applied in ascending order; can be negative
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

{: .table .table-bordered .table-hover}
| Field            | Description                                            | Type  |  Required/Optional|
| `metadata.name`  | The name of the Promotion Template, which can correspond to the name of the Product, or any other meaningful identifier.|Optional|
| `.applicationSourceSelector`  | The label used to match the application to which to apply the Promotion Template. Application selectors conform to Kubernetes _label selectors_, defined as `matchLabels` with `key-value` pairs, `matchExpressions` with `key-operator-value` arrays, or a combination of both. The values identify all the Promotion Template manifests that match the specific application or applications within the target environment.|  | Required|
|          | `.applicationSourceSelector.matchLabels`: One or more `key-value` pairs. <br>For example:{::nomarkdown}<ul><li><code class="highlighter-rouge">codefresh.io/environment: production</code> applies the Promotion Template to all applications within the Production Environment.</li><li><code class="highlighter-rouge">codefresh.io/product: loans</code> applies the Promotion Template only to applications belonging to the Loans Product.</li></ul>{:/}| object  | Optional |
|          | `.applicationSourceSelector.matchExpressions`: List of expressions, each with a `key`, an `operator`, and a set of `values`. <br>The `operator` defines the relationship between the `key` and its `values`, and can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">In</code>: The value _must match_ one of those specified in the <code class="highlighter-rouge">values</code> array.</li> <li><code class="highlighter-rouge">NotIn</code>: The value _must NOT match_ any of  those in the <code class="highlighter-rouge">values</code> array.</li><li><code class="highlighter-rouge">Exists</code>: Only the <code class="highlighter-rouge">key</code> must exist regardless of its values.<br>The <code class="highlighter-rouge">values</code> array must be empty. </li><li><code class="highlighter-rouge">DoesNotExist</code>: The <code class="highlighter-rouge">key</code> must not exist.<br>The <code class="highlighter-rouge">values</code> array must be empty.</li></ul>{:/}For example:<br>`key: codefresh.io/product` and `operator: Exists` applies the Promotion Template to any application containing the label `codefresh.io/product`.| string  | Optional |
| `.priority`  | The priority of the Promotion Template, determining the order in which Promotion Templates are applied when multiple Promotion Templates match the same application. The priority is ranked in ascending order, ranging from 0 or a negative number to higher values.   |integer |Optional|
|  `.versionSource`      |  The location of the file and the attribute from which to extract the product's application release version. This is the version displayed in the Products and Environments dashboards.|   |Required | 
|       | `versionSource.file`: The file path relative to the application's file path from which to extract the application's release version. For example, `chart.yaml` indicates that the release version should be extracted from this file.| string | Required |
|       | `versionSource.jsonPath`: The JSON path expression pointing to the location of the attribute containing the application version within the specified `file`.<br>For example, `$.appVersion` indicates the value should be extracted from the field `appVersion` in `chart.yaml`.| string| Required |
|`promotion`| The top-level element defining the specific changes to be promoted to the target environment, through a single or a list of `<filename>:jsonPaths`.<br>`jsonPaths` can define the path to single or multiple attributes within the same file. <br>When omitted, *all* changes in *all* applications connected to the Product are promoted.<br><br>Examples:<ul><li>Extract `name` attribute from `chart.yaml`<br>JSON path: `$.name`</li><li>Extract all properties of the `dependencies` object from `chart.yaml`<br>JSON path: `$..dependencies.*`</li><li>Extract the `repository` property from the `image` object in `values.yaml`<br>JSON path: `$..image.repository`</li></ul></ul> |array | Optional |
|       | `promotion.filename`: The file path relative to the application's file path from which to select properties to promote.  | string | Optional |
|       | `promotion.jsonPath`: The JSON path expression pointing to the location of the attribute with the value to be promoted within the specified `filename`.<br>For example, `$.appVersion` indicates the value should be extracted from the field `appVersion` in `chart.yaml`.| string| Optional |







