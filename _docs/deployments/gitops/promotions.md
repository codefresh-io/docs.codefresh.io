---
title: "Promotions"
description: ""
group: deployments
sub_group: gitops
toc: true
---




## Promotion changes configuration for applications

The commit action or the pull request (PR) initiated for an application in the source Environment is the Promotion Action that triggers the promotion for the corresponding application in the target Environment. 

By default, the Promotion Action promotes all changes made to the source application to its counterpart in the target Environment.  Codefresh offers the ability to customize the default behavior to tailor the precise changes you want to promote for an application between Environments.  

### Why configure promotion changes?
Customizing the changes to be promoted offers the following benefits:

* Precision through automation  
  Provides an automated mechanism to precisely define which changes to promote for the application, avoiding the need to manually review and approve or reject diffs. This functionality is invaluable when promoting multiple applications with many microservices or files. 


* Enforce Environment-specific requirements  
  Different Environments have specific constraints and requirements for the same application. Not all changes in the source Environment are necessarily valid or desirable in the target Environment. While artifact versions and image tags typically warrant promotion, other changes may need to be excluded based on the target Environment.  
  EXAMPLES TBD 



### How to configure promotion changes?
Promotion changes are configured declaratively through the Promotion Template, a Kubernetes CRD (Custom Resource Definition), defining the application, and the files or attributes within the files to be promoted. 

The Promotion Template serves two primary functions for the application being promoted:
1. Defines the changes to promote across multiple files in the application 
1. Defines the source for the application's release version

### Where do you save the Promotion Template?
The Promotion Template is saved in the Shared Configuration Repository to be shared by all Runtimes. Codefresh supplies a default Promotion Template for Helm applications.

TBD 

### How does the Promotion Template work?

The Promotion Template operates based on predefined criteria for selecting the application and its priority.

Applications are selected via key-value/operator pairs, providing the flexibility to define the identifier as loosely or tightly as needed.  
EXAMPLES

If there are multiple Promotion Templates that match the same application, Codefresh determines the behavior based on the priority assigned to each Promotion Template. Codefresh generates a composite Promotion Template by merging the specifications from all relevant Promotion Templates. The Template with the highest priority serves as the _base_ template, with its specifications taking precedence over conflicting specifications from other templates. Specifications present in other Templates are added to the base Template. 

EXAMPLES OF TWO TEMPLATES WITH COMPOSITE TEMPLATE 
 



### Promotion Template CRD fields

Here's an example of the Promotion Template CRD. The table that follows describes the fields in the Promotion Template CRD. 

```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionTemplate
metadata:
  name: base-helm
spec:
  applicationSourceSelector:
    matchExpressions:
    - key: codefresh.io/product
      operator: Exists
  priority: 0
  versionSource:
    file: Chart.yaml
    jsonPath: appVersion
  promotion:
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
| Field       | Description                                            | Required/Optional|
| `metadata.name`  | The name of the Promotion Template, which can correspond to the name of the Product, or any other meaningful identifier.|Optional|
| `.applicationSourceSelector.matchLabels`  | The label to match the application to which to apply the Promotion Template. It comprises either a `key-value` or a `key-operator` pair. For example:{::nomarkdown}<ul><li><code class="highlighter-rouge">codefresh.io/environment: production</code> applies the Promotion Template to all applications within the Production Environment.</li><li><code class="highlighter-rouge">codefresh.io/product: loans</code> applies the Promotion Template only to applications belonging to the Loans Product.</li><li><code class="highlighter-rouge">key: codefresh.io/product</code> and <code class="highlighter-rouge">operator: Exists</code> applies the Promotion Template to any application containing the label <code class="highlighter-rouge">codefresh.io/product</code></li></ul>{:/}.|Required|
| `.priority`  | The priority of the Promotion Template that determines how to apply Promotion Templates when multiple Promotion Templates match the same application. The priority can range from 0 (lowest) and higher.<br>Codefresh creates a composite Promotion Template from all the Promotion Templates that match the same application, with the one having the highest priority as the base. Values present in the base Template overrides those in the other Templates. Values not present in the base Template are added to the composite Template.  |Required|
|`.versionSource`|The location of the file and the field from which to extract the release version of the application, displayed in the UI for that application. For example, in the Products and Environments dashboards. | Required|
| |{::nomarkdown}<ul><li><code class="highlighter-rouge">.versionSource.file</code>: The file from which to extract the application's release version.  For example, <code class="highlighter-rouge">chart.yaml</code> indicates that the application version should be extracted from this file. </li><li><code class="highlighter-rouge">.versionSource.jsonPath</code>: The JSON path expression pointing to the location of the element containing the application version within the specified <code class="highlighter-rouge">.file</code>.<br>For example, <code class="highlighter-rouge">$.appVersion</code> indicates the value should be extracted from the field <code class="highlighter-rouge">.appVersion</code> in <code class="highlighter-rouge">chart.yaml</code> </li></ul>{:/} | Required|
|`.promotion` | When defined, the top-level element that lists the files and attributes with the changes to be promoted to the target environment, through the `<filename>:jsonPaths` list.<br>When not specified, all changes in all the application's files are promoted.| Optional|








