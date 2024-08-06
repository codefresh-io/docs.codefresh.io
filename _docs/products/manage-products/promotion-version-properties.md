---
title: "Configuring promotion settings"
description: "Configure version and properties to promote in products"
group: products
toc: true
---



Through Promotion Settings for Products, you can automate and customize the changes to promote between different environments. By defining precise promotion criteria, you can ensure that only the necessary changes are promoted, enhancing both accuracy and efficiency.

Promotion Settings serve two primary functions for the applications being promoted.  
1. Defining the source for the [application's release version](#version-for-promoted-applications)
1. Defining the [changes to promote](#promotable-properties) across multiple files in the applications 

##### Benefits of configuring Promotion Settings

* Precision through automation  
  Provides an automated mechanism to precisely define which changes to promote for the application, avoiding the need to manually review and approve or reject diffs. This functionality is invaluable when promoting multiple applications with many microservices or files. 


* Enforce environment-specific requirements  
  Different environments have distinct constraints and requirements. Promotion Settings enable you to specify which changes are valid for each environment, ensuring compliance with environment-specific needs.  
  While artifact versions and image tags typically warrant promotion for example, other changes may need to be excluded based on the target environment.  



##  Promotion Settings & Promotion Templates

Promotion Settings can be configured in either Form or YAML modes. Once configured and committed, these settings are saved as a CRD (Custom Resource Definition) entitled Promotion Template within the GitOps Runtime selected as the Configuration Runtime. This allows for a declarative and consistent approach to defining promotion criteria across environments.

To configure directly in YAML, refer to our ???? Promotion Template CRD for the syntax requirements and descriptions.

## Version for promoted applications
The Version attribute specifies the location for version information for the applications in the Product, defined  
using a JSON path expression.  

The Version attribute in the Promotion Settings/Template is relative to the `spec.source.repoURL` and `spec.source.path` attributes defined in the application's configuration manifest. Codefresh retrieves version information from this file.  


For example:
`$.appVersion` and `chart.yaml` configured for Version indicates that the version should be extracted from the `appVersion` field in the specified file, `chart.yaml`.
Codefresh goes to the application manifest configuration to get the repo URL and the path to the  

If the version is not displayed in the dashboards, or what's displayed is incorrect, it could be because Codefresh could not find the values in the `repoURL` and `path`.
Double check that the Source settings for the application correspond to the Version attribute in the Product's Promotion Settings.

### Examples of version attributes

<!---
| Version attribute | Example  configuration     | JSON Path expression  | Possible use case     |
|--------------------|--------------------------    |-----------------------|------------------------------------|
| Default version attribute | {::nomarkdown}<pre> {YAML: <br><p>appVersion: "1.2.3"</p></pre>{:/} | `$.appVersion`        | Commonly used in Helm charts or deployment manifests for explicit version management.  |
| Semantic versioning      | {% highlight yaml %}{% raw %}version: "2.3.4" {% endraw %}{% endhighlight %}    | `$.version`          | Indicates backward-compatible changes, new features, and bug fixes. |
| Image tag                | {% highlight yaml %}{% raw %}image:<br>repository:&nbsp;&nbsp;"myrepo/app"<br>&nbsp;&nbsp;&nbsp;&nbsp;tag: "1"{% endraw %}{% endhighlight %}| `$.image.tag` |Used in containerized environments to manage versions tied to Docker images. |
| Git commit SHA           | {% highlight yaml %}{% raw %}git:<br>&nbsp;&nbsp;commitSha:&nbsp;&nbsp;&nbsp;&nbsp;"abc123def456"{% endraw %}{% endhighlight %}| `$.git.commitSha` | Tracks versions using specific Git commit SHAs, useful in CI/CD pipelines. |
| Build number             |{% highlight yaml %}{% raw %}build:<br>&nbsp;&nbsp;number:<br>&nbsp;&nbsp;&nbsp;&nbsp;"20230801-001" {% endraw %}{% endhighlight %}  | `$.build.number`  | Automatically generated during builds, often including timestamps or incremental identifiers.  
| Release version          | {% highlight yaml %}{% raw %}release:<br>&nbsp;&nbsp;version:&nbsp;&nbsp;&nbsp;&nbsp;"v4.5.6" {% endraw %}{% endhighlight %} | `$.release.version`  |Differentiates between stages of software maturity and deployment readiness (e.g., alpha, beta, production).  |
| Deployment version           |{% highlight yaml %}{% raw %}deployment:<br>&nbsp;&nbsp;version:&nbsp;&nbsp;&nbsp;&nbsp;"3.2.1"{% endraw %}{% endhighlight %}  | `$.deployment.version` | Manages versioning per deployment unit in environments with multiple components or microservices.             |
| Custom metadata version      | {% highlight yaml %}{% raw %}metadata:<br>&nbsp;&nbsp;name:&nbsp;&nbsp;&nbsp;&nbsp;"my-application"<br>&nbsp;&nbsp;version:<br>&nbsp;&nbsp;&nbsp;&nbsp;"5.4.3"{% endraw %}{% endhighlight %} | `$.metadata.version` | Uses custom metadata fields for additional versioning information specific to the organization or project.    |

-->


#### Default version attribute  

##### Possible use case
In Helm charts or deployment manifests for explicit version management.

##### Example configuration
```yaml
appVersion: "1.2.3"
```

{::nomarkdown<pre><code class="language-yaml"><br>image:<br>&nbsp;&nbsp;repository: "myrepo/app"<br>&nbsp;&nbsp;tag: "1.0.0"</code></pre>{:/}

##### JSON path expression: 
`$.appVersion`

#### Semantic versioning 

##### Possible use case
Indicates backward-compatible changes, new features, and bug fixes.

##### Example configuration
```yaml
version: "2.3.4"
```
##### JSON path expression: 
`$.version`
 

#### Image tag 
Version of the application represented by the Docker image tag.

##### Possible use case
In containerized environments to manage versions tied to Docker images.

##### Example configuration
```yaml
image:
  repository: "myrepo/app"
  tag: "1.0.0"
```
##### JSON path expression
`$.image.tag`

#### Git commit SHA 
Version of the application tracked using a specific Git commit SHA.

##### Possible use case
Track versions using specific Git commit SHAs, useful in CI/CD pipelines. 

##### Example configuration
```yaml
git:
  commitSha: "abc123def456"
```
##### JSON path expression
`$.git.commitSha`



#### Build number 

Uses a build number to represent the version, often including a date or sequential identifier.

##### Possible use case
Use automatically generated number including timestamps or incremental identifiers.  

##### Example configuration

```yaml
build:
  number: "20230801-001"
```
##### JSON path expression

`$.build.number`

#### Release version 

Release-specific context.

##### Possible use case
Versioning per deployment unit in environments with multiple components or microservices. 

##### Example configuration

```yaml
release:
  version: "v4.5.6"
```
##### JSON path expression
`$.release.version`



## Promotable properties 
Promotable Properties define the specific files or the attributes within files, to be promoted between environments.  
Defining these properties allow for precise control over what changes are included in a promotion, adhering to environment-specific requirements and avoiding unwanted modifications.

When no promotable properties are configured, all changes are promoted between all environments.

Like the Version attribute, Promotable Properties are defined through JSON path expressions. Unlike the Version attribute, you can define multiple JSON path expressions to different files and multiple attributes in the same file. 

### Examples of Promotable Properties 


#### Promotable Properties configured

Here's an example of the Promotable Properties configured for the applications of a Product.

You can see that there are properties to be promoted from three different files, with the values.yaml file having more than one promotable property.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promotable-properties-configured.png" 
	url="/images/gitops-products/settings/promotable-properties-configured.png" 
	alt="Promotable Properties configured for product" 
	caption="Promotable Properties configured for product"
  max-width="60%" 
%}

The examples that follow show how the JSON path expressions are resolved in the different yamls. 
The yaml manifests are on the left and the preview for the trio-prod application shows the resolved value  

#### `version.yaml' promotable property resolution & preview

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promote-properties-version-source-and-preview.png" 
	url="/images/gitops-products/settings/promote-properties-version-source-and-preview.png" 
	alt="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression" 
	caption="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression"
  max-width="60%" 
%}

#### `chart.yaml' promotable property resolution & preview

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promote-properties-chart-source-and-preview.png" 
	url="/images/gitops-products/settings/promote-properties-chart-source-and-preview.png" 
	alt="`chart.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression" 
	caption="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression"
  max-width="60%" 
%}

#### `values.yaml' promotable property resolution & preview

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promote-properties-values-source-and-preview.png" 
	url="/images/gitops-products/settings/promote-properties-values-source-and-preview.png" 
	alt="`values.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression" 
	caption="`values.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression"
  max-width="60%" 
%}




## JSON path expressions for files and attributes
Application versions and properties to be promoted are defined through JSON path expressions. These path expressions point to the specified file and the location of the property within the file, and are used to navigate and extract values from the file.

NIMA: add links to JSON syntax and validations are available 

### JSON syntax & rule summary
Here's a short summary of JSON syntax and rules. 
* **`$.`**   
  JSON path expressions begin with the `$` symbol, which represents the root of the YAML document.

* **`..`**   
  Extract from all levels of the matching object.  
  Use `..` (double dot operator) to navigate and extract from any level within the YAML document.

* **`.*`**  
  Extract all properties.  
  Use `.*` to retrieve all properties of the matching object.

This is an extract from a sample values.yaml file.

```yaml
global: 
	codefresh:
		url: g.codefresh.io
		tls:
			create: false
argo-cd: 
	tls:
		create: true
		caCert: 'some-argo-cert'
```

Using the above syntax:  

* `$.global.codefresh.*` extracts all attributes that match the `codefresh` object in the file, which resolves to:  
   `url: g.codefresh.io` and `tls.create.false`.

* `$..tls` extracts values from all levels with `tls`, which resolves to:  
  `create: false` (from `codefresh.tls` object)
  `create: true` and `caCert: some-argo-cert` (both from `argo-cd.tls` object)









Configuration Location
Promotion Templates should be stored in a Git repository synced with your cluster via a Git Source. This approach integrates seamlessly with the GitOps Apps dashboard in Codefresh.


### Configure Promotion Flows for product







### Where are Promotion Settings stored? Promotion Template?
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

### Configure Promotion Settings




1. From the list of Promotion Templates, select a predefined Promotion Template, or select **Inline** and create a new Promotion Template for this product.  
  If you select a predefined Template, the Version and Promotable Properties are populated with the settings already defined.

1. Define the source settings for the application version:
  1. **File**: The name of the file from which to retrieve the version. For example, `chart.yaml`. 
  1. **Path**: The JSON path to the attribute with the value. 
  1. To see the result for any application connected to the product, click **Preview Configuration** and then select an application to see its version. 

1. Define the settings for the Promotable Properties:
  1. **File**: The name of the file with the attributes to promote. For example, `values.yaml`. 
  1. **Paths**: The JSON path or paths to one or more attributes within the file to promote. For example, `$.buslog.image.tag` , `$.ctrlr.image.tag` and `$.flask-ui.image.tag`.
  1. To add more files and paths, click **Add** and define the **File** and **Paths**.
  1. To preview the properties that will be promoted for an application connected to the product, click **Preview Configuration** and then select an application. 