---
title: "Promotable changes"
description: "Declaratively configure changes to promote between applications in Environments"
group: deployments
sub_group: gitops
toc: true
---

After creating Products and setting up Environments in Codefresh, the next step is to promote the Product and its applications between the different Environments. 

TBD




## Promotion changes configuration for applications

The trigger for promotions is the commit action or the pull request (PR) initiated for an application in the source Environment. This Promotion Action triggers the promotion for the corresponding application in the target Environment. 

By default, the Promotion Action promotes all changes made to the source application to its counterpart in the target Environment.  Codefresh offers the ability to customize the default behavior and tailor the precise changes you want to promote for an application between Environments.  

### Why configure promotion changes?
Customizing the changes to be promoted offers the following benefits:

* Precision through automation  
  Provides an automated mechanism to precisely define which changes to promote for the application, avoiding the need to manually review and approve or reject diffs. This functionality is invaluable when promoting multiple applications with many microservices or files. 


* Enforce Environment-specific requirements  
  Different Environments have specific constraints and requirements for the same application. Not all changes in the source Environment are necessarily valid or desirable in the target Environment. While artifact versions and image tags typically warrant promotion, other changes may need to be excluded based on the target Environment.  
  EXAMPLES TBD 



### How to configure promotion changes?
Promotion changes are configured declaratively through the Promotion Template, a Kubernetes CRD (Custom Resource Definition), defining the application, the version, the files, and attributes within the files, to be promoted. 

The Promotion Template serves two primary functions for the application being promoted:
1. Defines the changes to promote across multiple files in the application per Environment
1. Defines the source for the application's release version

### Where to add the Promotion Template?
Codefresh supplies a default Promotion Template for Helm applications in the Shared Configuration Repository of your Runtime.

The simplest and most effective location for your Promotion Template is the Git repository synced to the cluster through a Git Source.  Syncing your Promotion Templates with a Git Source ensures that you can monitor them in the GitOps Apps dashboard in Codefresh.

TBD 

### How does the Promotion Template work?

The criteria you define in the Promotion Template CRD determines the changes which are promoted in applications across Environments:

ADD HERE A FLOW DIAGRAM?

1. Selects the applications to promote  
  Applications are selected for promotion via Kubernetes labels, defined through a key-value/operator pair. This allows flexibility in defining the application identifier as loosely or tightly as needed. 
 
    Examples:
    Select applications based on Environment, Product, or any other relevant criteria.
    Utilize operators like Exists, In, or NotIn for precise application targeting.
  

    EXAMPLES

1. If required, applies the priority  
  When multiple Promotion Templates match the same application, the priority assigned to the Promotion Template comes into play to determines the changes that are promoted.  
  In such cases, the priority, in ascending order, determines the precedence of Promotion Templates that defines which changes are promoted in the application. 
  
    Codefresh generates a composite Promotion Template by merging the specifications from all relevant Promotion Templates: 
      * The Template with the highest priority serves as the _base_ template, with its specifications taking precedence over conflicting specifications from other templates. 
      * Specifications from other templates not present in the base Template are added to it.  
        In case of conflicts, specifications from higher-priority templates _always_ take precedence over those that have lower-priority.

{:start="3"}
1. Applies the changes to promote
  As the final step, the Promotion Template applies the changes defined within it to the application, either at the file level or to attributes in the file. 



EXAMPLES OF TWO TEMPLATES WITH COMPOSITE TEMPLATE 
 



### Promotion Template CRD

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
  versionSource:                      # versionSource or promotion
    file: Chart.yaml
    jsonPath: $appVersion
  promotion:                         #  promotion or versionSource  
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
| Field            | Description                                            | Required/Optional|
| `metadata.name`  | The name of the Promotion Template, which can correspond to the name of the Product, or any other meaningful identifier.|Optional|
| `.applicationSourceSelector`  | The label used to match the application to which to apply the Promotion Template. Application selectors conform to Kubernetes _label selectors_, defined as  `matchLabels` with `key-value` pairs, `matchExpressions` with `key-operator` pairs, or a combination of both. The values identify all the Promotion Template manifests that match the specific application or applications within the target Environment.<br>For example:{::nomarkdown}<ul><li><code class="highlighter-rouge">codefresh.io/environment: production</code> applies the Promotion Template to all applications within the Production Environment.</li><li><code class="highlighter-rouge">codefresh.io/product: loans</code> applies the Promotion Template only to applications belonging to the Loans Product.</li><li><code class="highlighter-rouge">key: codefresh.io/product</code> and <code class="highlighter-rouge">operator: Exists</code> applies the Promotion Template to any application containing the label <code class="highlighter-rouge">codefresh.io/product</code></li></ul>{:/}.|Required|
| `.priority`  | The priority of the Promotion Template, determining the order in which Promotion Templates are applied when multiple Promotion Templates match the same application. The priority is ranked in ascending order, ranging from 0 or a negative number to higher values.   |Optional|
|`.versionSource`|The location of the file and the field from which to extract the release version of the application. This is the version displayed in the Codfresh UI, in the Products and Environments dashboards.<br>If you choose to omit `.versionSource`, you must define at least one `.promotion`element containing the file and the version attribute.   | Optional|
| |{::nomarkdown}<ul><li><code class="highlighter-rouge">.versionSource.file</code>: The file path relative to the application's file path from which to extract the application's release version.  For example, <code class="highlighter-rouge">chart.yaml</code> indicates that the application version should be extracted from this file. </li><li><code class="highlighter-rouge">.versionSource.jsonPath</code>: The JSON path expression pointing to the location of the element containing the application version within the specified <code class="highlighter-rouge">.file</code>.<br>For example, <code class="highlighter-rouge">$.appVersion</code> indicates the value should be extracted from the field <code class="highlighter-rouge">.appVersion</code> in <code class="highlighter-rouge">chart.yaml</code> </li></ul>{:/} | Required|
|`.promotion` |The top-level element listing the files and attributes containing the changes to be promoted to the target Environment, specified through a list of  `<filename>:jsonPaths` pairs.<br>Required when `versionSource` not defined, and must include at least one file and its JSON path containing the application release version.<br>When empty, _all_ changes in _all_ the application's files are promoted.| Optional|



### More about `.versionSource`

Where does Codefresh looks for .versionSource information?

**File and path context**  
The `.versionSource.file` attribute in the Promotion Template CRD is relative to the `spec.source.repoURL` and `spec.source.path` attributes defined in the application's configuration manifest. This is where Codefresh looks for the file from which to retrieve version information.

JSON path expressions
Specifies the JSON path expression pointing to the location of the element containing the application version within the specified file. For example, $..appVersion indicates that the version should be extracted from the appVersion field in the specified file.The file context is the  to the spec.source.repoURL attribute defined in the application's Source settings.
The path is the 

Version does notappear om te If the version does not appear in the UI, after defining the `.versionSource` attributes inthe Promptop Template CRD, it could be because Codefresh could not find the values in the repoURL and path.

Double-chck that the Source settings for the application correspond to the `.versionSource` attributes inthe Promptop Template CRD




