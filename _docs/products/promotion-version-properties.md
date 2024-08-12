---
title: "Configuring app version and promotable properties"
description: "Configure version and properties to promote for applications in Promotion Settings"
group: products
toc: true
---



Through Promotion Settings for Products, you can automate and customize the changes to promote between different environments. By defining precise promotion criteria, you can ensure that only the necessary changes are promoted, enhancing both accuracy and efficiency.

##### Benefits of configuring Promotion Settings

* Precision through automation  
  Provides an automated mechanism to precisely define which changes to promote for the application, avoiding the need to manually review and approve or reject diffs. This functionality is invaluable when promoting multiple applications with many microservices or files. 

* Enforce environment-specific requirements  
  Different environments have distinct constraints and requirements. Promotion Settings enable you to specify which changes are valid for each environment, ensuring compliance with environment-specific needs.  
  While artifact versions and image tags typically warrant promotion for example, other changes may need to be excluded based on the target environment. 

##### Primary functions
Promotion Settings serve two primary functions for the applications being promoted:  
1. Defining the source for the [application's release version](#version-for-promoted-applications)
1. Defining the [changes to promote](#promotable-properties) across multiple files in the applications 


For how to instructions on configuring Promotion Settings, see [Configure Promotion Settings]({{site.baseurl}}docs/products/manage-products/configure-product-settings/#configure-promotion-settings).



##  Promotion Settings & Promotion Templates

As with other GitOps entities, you can configure Promotion Settings in either Form or YAML modes. Once configured and committed, these settings are saved as a CRD (Custom Resource Definition) entitled Promotion Template within the GitOps Runtime selected as the Configuration Runtime. This allows for a declarative and consistent approach to defining orchestration criteria across environments.

If you are more comfortable configuring directly in YAML, refer to our ???? Promotion Template CRD for the syntax requirements and descriptions.

## Versions for promoted applications
The Version attribute specifies the location for version information for the applications in the Product. The application version is displayed in the  Environments, Products, and GitOps Apps dashboards.   


The Version attribute is defined using a [JSON path expression](#json-path-expressions-for-files-and-attributes). It is relative to the `spec.source.repoURL` and `spec.source.path` attributes defined in the source application's configuration manifest.  

DIAGRAM 

For example:
`$.appVersion` and `chart.yaml` configured for Version indicates that the version is extracted from the `appVersion` field in the specified file, `chart.yaml`.
Codefresh retrieves the repo URL and the path to the file from the application manifest.

If the version is either not displayed in the dashboards, or if the version displayed is incorrect, it could be because Codefresh could not find the values in the `repoURL` and `path`. Verify that the Source settings for the application correspond to the Version attribute in the Product's Promotion Settings.

### Examples of version attributes

You can extract version information from different attributes, ensuring it aligns with your deployment and business requirements.

{::nomarkdown}
<table>
  <colgroup>
    <col style="width: 10%;">
    <col style="width: 30%;">
    <col style="width: 10%;">
    <col style="width: 40%;">
  </colgroup>
  <thead>
    <tr>
      <th>Version attribute</th>
      <th>Example configuration</th>
      <th>JSON Path expression</th>
      <th>Possible use case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Default version attribute</td>
      <td><pre><code>appVersion: "1.2.3"</code></pre></td>
      <td><code class="highlighter-rouge">$.appVersion</code></td>
      <td>Commonly used in Helm charts or deployment manifests for explicit version management.</td>
    </tr>
    <tr>
      <td>Semantic versioning</td>
      <td><pre><code>version: "2.3.4"</code></pre></td>
      <td><code class="highlighter-rouge">$.version</code></td>
      <td>Indicate backward-compatible changes, new features, and bug fixes.</td>
    </tr>
    <tr>
      <td>Image tag</td>
      <td><pre><code>image:
  repository: "myrepo/app"
  tag: "1"</code></pre></td>
      <td><code class="highlighter-rouge">$.image.tag</code></td>
      <td>In containerized environments to manage versions tied to Docker images.</td>
    </tr>
    <tr>
      <td>Git commit SHA</td>
      <td><pre><code>git:
  commitSha: "abc123def456"</code></pre></td>
      <td><<code class="highlighter-rouge">$.git.commitSha</code></td>
      <td>Track versions using specific Git commit SHAs, useful in CI/CD pipelines.</td>
    </tr>
    <tr>
      <td>Build number</td>
      <td><pre><code>build:
  number: "20230801-001"</code></pre></td>
      <td><code class="highlighter-rouge">$.build.number</code></td>
      <td>Include timestamps or incremental identifiers automatically generated during builds.</td>
    </tr>
    <tr>
      <td>Release version</td>
      <td><pre><code>release:
  version: "v4.5.6"</code></pre></td>
      <td><code class="highlighter-rouge">$.release.version</code></td>
      <td>Differentiate between stages of software maturity and deployment readiness (e.g., alpha, beta, production).</td>
    </tr>
    <tr>
      <td>Deployment version</td>
      <td><pre><code>deployment:
  version: "3.2.1"</code></pre></td>
      <td><code class="highlighter-rouge">$.deployment.version</code></td>
      <td>Manage versioning per deployment unit in environments with multiple components or microservices.</td>
    </tr>
    <tr>
      <td>Custom metadata version</td>
      <td><pre><code>metadata:
  name: "my-application"
  version: "5.4.3"</code></pre></td>
      <td><<code class="highlighter-rouge">$.metadata.version</code></td>
      <td>Use custom metadata fields for additional versioning information specific to the organization or project.</td>
    </tr>
  </tbody>
</table>

{:/}


<!--- #### Default version attribute  

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

-->

## Promotable Properties for applications

Promotable Properties define the specific files or the attributes within files, to be promoted between environments for applications in the product.  
Though optional, defining these properties allow for precise control over what changes are included in a promotion, adhering to environment-specific requirements and avoiding unwanted modifications.

{{site.data.callout.callout_tip}}
**TIP**  
When no Promotable Properties are configured, all changes are promoted between all environments.
{{site.data.callout.end}}

Similar to the Version attribute, Promotable Properties are defined through [JSON path expressions](#json-path-expressions-for-files-and-attributes). Unlike the Version attribute, for Promotable Properties you can define multiple JSON path expressions to different files, and multiple attributes in the same file. 

### Examples of Promotable Properties 

Here's an example of the Promotable Properties configured for the applications of a Product.

You can see that properties are configured to be promoted from three different files, with `values.yaml` configured with more than one property.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promotable-properties-configured.png" 
	url="/images/gitops-products/settings/promotable-properties-configured.png" 
	alt="Promotable Properties configured for product" 
	caption="Promotable Properties configured for product"
  max-width="60%" 
%}

The examples that follow show how the JSON path expressions are resolved in the different YAMLs. 
The YAML manifests are displayed on the left, and the previews for the `trio-prod` application shows the resolved values. 

#### `version.yaml' promoted property resolution & preview

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promote-properties-version-source-and-preview.png" 
	url="/images/gitops-products/settings/promote-properties-version-source-and-preview.png" 
	alt="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression" 
	caption="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression"
  max-width="60%" 
%}

#### `chart.yaml' promoted property resolution & preview

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promote-properties-chart-source-and-preview.png" 
	url="/images/gitops-products/settings/promote-properties-chart-source-and-preview.png" 
	alt="`chart.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression" 
	caption="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression"
  max-width="60%" 
%}

#### `values.yaml' promoted property resolution & preview

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
Application versions and properties to be promoted are defined through JSON path expressions used to navigate and extract values from files. Each JSON expression points to the specified file and the location of the property within the file. 


### JSON path expression syntax & rules 
The table provides a brief summary of JSON syntax and rules.

For detailed information, see [JSON syntax](https://support.smartbear.com/alertsite/docs/monitors/api/endpoint/jsonpath.html){target="\_blank"}.

{: .table .table-bordered .table-hover}
| JSON syntax       | Description              | 
| --------------    | --------------           |
|**`$.`**           | JSON path expressions begin with the `$` symbol, which represents the root of the YAML file.|
|**`..`**             | Extract from all levels of the matching object. Use `..` (double dot operator) to navigate and extract from any level within the YAML file.|
|**`.*`**           | Extract all properties. Use `.*` to retrieve all properties of the matching object.|


  

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
   `url: g.codefresh.io` and `tls.create.false`

* `$..tls` extracts values from all levels with `tls`, which resolves to:  
  `create: false` (from `codefresh.tls` object)
  `create: true` and `caCert: some-argo-cert` (both from `argo-cd.tls` object)


## Related articles
[Assigning applications to products]({{site.baseurl}}/docs/products/manage-products/assign-applications/)   
[Configuring promotion flows and triggers for products]({{site.baseurl}}/docs/products/manage-products/promotion-flow-triggers/)   
[Tracking deployments for products]({{site.baseurl}}/docs/products/product-releases/)  
[Creating products]({{site.baseurl}}/docs/products/create-product/)   
