---
title: "Promotions"
description: ""
group: deployments
sub_group: gitops
toc: true
---




## Promotion changes configuration for applications

The commit action or the pull request (PR) initiated for an application in the source Environment is the Promotion Action that triggers the promotion for the corresponding application in the target Environment. 

By default, the Promotion Action promotes all changes made to the source application to its counterpart in the target Environment.  Codefresh offers the ability to customize the default behavior and tailor the precise changes you want to promote for an application between Environments.  

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

### Where to add the Promotion Template?
Codefresh supplies a default Promotion Template for Helm applications in the Shared Configuration Repository of your Runtime.

Add the Promotion Template to a Git Source which you can monitor in Codefresh.

TBD 

### How does the Promotion Template work?

The criteria you define in Promotion Template CRD determines how it operates:

1. Select applications to promote
  Applications are selected for promotion via labels, defined through a key-value/operator pair. This allows flexibility in defining the application identifier as loosely or tightly as needed. 
 
  Examples:
  Select applications based on environment, product, or any other relevant criteria.
  Utilize operators like Exists, In, or NotIn for precise application targeting.
  

EXAMPLES

1. Apply priority if required
  The priority assigned to the Promotion Template comes into play only when multiple Promotion Templates match the same application. In such cases, the priority, indicated as an ascending numerical value, determines the precedence of Promotion Templates to define which changes are promoted in the application.  
  
  Codefresh generates a composite Promotion Template by merging the specifications from all relevant Promotion Templates: 
    * The Template with the highest priority serves as the _base_ template, with its specifications taking precedence over conflicting specifications from other templates. 
    * Specifications from other templates not present in the base Template are added to it. In case of conflicts, specifications from higher-priority templates _always_ take precedence over those that have  lower-priority.



1. Apply changes to promote
  As the final step, the Promotion Template applies the changes defined within it to the application, either at the file level or to attributes in the file. 



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
| `.priority`  | The priority of the Promotion Template that determines the order in which to apply Promotion Templates when multiple Promotion Templates match the same application. The priority can range from 0 (lowest) and higher.<br>See   |Required|
|`.versionSource`|The location of the file and the field from which to extract the release version of the application, displayed in the UI for that application. For example, in the Products and Environments dashboards. | Required|
| |{::nomarkdown}<ul><li><code class="highlighter-rouge">.versionSource.file</code>: The file from which to extract the application's release version.  For example, <code class="highlighter-rouge">chart.yaml</code> indicates that the application version should be extracted from this file. </li><li><code class="highlighter-rouge">.versionSource.jsonPath</code>: The JSON path expression pointing to the location of the element containing the application version within the specified <code class="highlighter-rouge">.file</code>.<br>For example, <code class="highlighter-rouge">$.appVersion</code> indicates the value should be extracted from the field <code class="highlighter-rouge">.appVersion</code> in <code class="highlighter-rouge">chart.yaml</code> </li></ul>{:/} | Required|
|`.promotion` | When defined, the top-level element that lists the files and attributes with the changes to be promoted to the target environment, through the `<filename>:jsonPaths` list.<br>When not specified, all changes in all the application's files are promoted.| Optional|








