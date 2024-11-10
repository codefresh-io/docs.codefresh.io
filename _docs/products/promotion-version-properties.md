---
title: "Configuring app version and promotable properties"
description: "Configure application version and properties to promote for products"
group: products
toc: true
---



Automating and customizing which changes are selected for promotion between environments ensures that only the necessary modifications are advanced, enhancing both accuracy and efficiency. By defining clear criteria for the changes to promote, you can streamline the promotion process while ensuring compliance with environment-specific requirements.

<!--- maybe add diagram -->
##### Benefits of automating selection of changes for promotion

* **Precision through automation**  
  Automating the selection of changes for promotion allows you to define which updates are moved forward, removing the need for manual diff reviews.  This functionality is invaluable when managing promotions for large-scale applications with large numbers of microservices and configuration files. 

* **Enforce environment-specific requirements**  
  Each environment has distinct constraints and requirements. By automating which changes are promoted, you can ensure that only the updates are valid for each environment are promoted, ensuring compliance with environment-specific needs.  
  While artifact versions and image tags typically warrant promotion for instance, other changes may be excluded based on the target environment's specific requirements. 

##### Primary aspects when promoting applications
When defining which changes to promote, there are two primary aspects to focus on:
1. Defining the source for the [application's release version](#version-for-promoted-applications)
1. Defining the [changes to promote](#promotable-properties) across multiple files in the applications 


{{site.data.callout.callout_warning}}
**IMPORTANT**  
For automated retrieval of the application version and promotion of specific attributes from files across environments, _all applications within the same product must maintain an identical structure_.  
Promotion across different environments requires consistent relative paths in each repository. For example, to promote properties from `config/settings.yaml` in environment `dev` to `testing`, `config/settings.yaml` must also exist in the `testing` environment. 
{{site.data.callout.end}}

##### Where can you configure settings for application version and properties? 
In Product > Settings > Promotion Settings, you can configure the changes to promote between the product's applications in the different environments.  
See also [Promotion Settings & Promotion Templates](#promotion-settings--promotion-templates).

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/promotion-settings.png"
 url="/images/gitops-products/settings/promotion-settings.png"
 alt="Configure version and properties to promote in Product Settings"
 caption="Configure version and properties to promote in Product Settings"
    max-width="50%"
%} 


For how-to instructions, see [Configure Promotion Settings]({{site.baseurl}}/docs/products/manage-products/configure-product-settings/#configure-promotion-settings).





## Configuring versions for promoted applications
The Version attribute specifies the location from which to retrieve version information for the applications in the product. This application version is displayed in the Environments, Product, and GitOps Apps dashboards.   

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/promote-version-settings.png"
 url="/images/gitops-products/settings/promote-version-settings.png"
 alt="Example of version settings for promotion"
 caption="Example of version settings for promotion"
    max-width="60%"
%} 


The Version attribute is defined using a [JSON path expression](#json-path-expressions-for-files-and-attributes). It is relative to the `spec.source.repoURL` and `spec.source.path` attributes defined in the source application's configuration manifest.  

The diagram illustrates how the version attributes configured for the product are correlated with the repo URL and path defined in the application's manifest to retrieve the correct version.

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/diagram-retrieve-app-version.png"
 url="/images/gitops-products/settings/diagram-retrieve-app-version.png"
 alt="Retrieving the version attribute"
 caption="Retrieving the version attribute"
    max-width="60%"
%} 



If the version is not displayed in the dashboards, or if the version displayed is not correct, it could be because Codefresh could not find the values in the `repoURL` and `path`. Verify that the Source settings for the application correspond to the Version attribute configured for the product.

### Examples of version attributes

You can extract version information from different attributes to ensure that it aligns with your deployment and business requirements.

{::nomarkdown}
<table>
  <colgroup>
    <col style="width: 10%;">
    <col style="width: 30%;">
    <col style="width: 15%;">
    <col style="width: 35%;">
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
      <td><code class="highlighter-rouge">$.git.commitSha</code></td>
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

## Configuring properties for promotion across applications

Promotable Properties define the specific files or attributes within files which are selected for promotion between environments for the applications in a product.
Although optional, defining these properties allow for precise control over which changes are included in a promotion, ensuring compliance with environment-specific requirements and preventing unwanted modifications.

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/promotable-property-settings.png"
 url="/images/gitops-products/settings/promotable-property-settings.png"
 alt="Example of version settings configured and preview of version retrieved for application"
 caption="Example of version settings configured and preview of version retrieved for application"
    max-width="60%"
%}

{{site.data.callout.callout_tip}}
**TIP**  
When no Promotable Properties are defined, all changes are automatically promoted between all environments.
{{site.data.callout.end}}

Similar to how you define the Version attribute, Promotable Properties are also defined through [JSON path expressions](#json-path-expressions-for-files-and-properties). Unlike the Version attribute, you can define multiple JSON path expressions to different files, or multiple attributes within a single file. 

### Examples of properties for promotion

Here's an example of the Promotable Properties configured for the applications of a Product.

You can see that properties are configured to be promoted from three different files, with `values.yaml` containing multiple properties to promote.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promotable-properties-configured.png" 
	url="/images/gitops-products/settings/promotable-properties-configured.png" 
	alt="Example of properties configured for promotion" 
	caption="Example of properties configured for promotion"
  max-width="60%" 
%}

The following examples show how the JSON path expressions are resolved within the different YAML files. 
On the left, you can see the YAML manifests, on the right, the previews show how the `trio-prod` application resolves these values. 

<br>

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

<br>

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

<br>

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




## JSON path expressions for files and properties
Application versions and properties to be promoted are defined through JSON path expressions. Each JSON expression points to the specified file and the location of the property within the file. 

Instead of having to navigate to GitHub, copy the file name, and then the paths in the file, we have made it easy to both select the file and configure JSON paths to its properties:
* File selector with auto-complete
  Start typing the part of the filename and then select from the list displayed.

* Path-selectors
  The selected file is displayed, and you can simply click the attribute or property in the file to select, and Codefresh generates and adds the correct JSON path.

* Preview configuration
  The Preview Configuration button allows you to select the application and see the version which will be retrieved. 



{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/promote-properties-version-source-and-preview.png"
 url="/images/gitops-products/settings/promote-properties-version-source-and-preview.png"
 alt="Example of manifest (left) and preview (right) with resolved JSON path expression for version"
 caption="Example of manifest (left) and preview (right) with resolved JSON path expression for version"
    max-width="60%"
%} 

You can always add JSON path expressions directly if that's what you prefer.

The table provides a brief summary of JSON syntax and rules.
For detailed information, see [JSON syntax](https://support.smartbear.com/alertsite/docs/monitors/api/endpoint/jsonpath.html){:target="\_blank"}.

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


## Promotion Settings & Promotion Templates

As with other GitOps entities, you can configure Promotion Settings for the product in either Form or YAML modes. 

When you define an Inline template, configure and commit the settings, they are saved as a `promotion-template` resource within the Shared Configuration Repository in the GitOps Runtime selected as the Configuration Runtime. The path in the Shared Configuration Repo is `<gitops-runtime>/<shared-configuration-repo>/resources/configuration/promotion-templates/`.  
See [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) and [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes).  

<!--- To configure directly in YAML, refer to our [Promotion Template CRD](tbd) for the syntax requirements and descriptions.  -->

## Related articles
[Assigning applications to products]({{site.baseurl}}/docs/products/assign-applications/)   
[Configuring promotion flows and triggers for products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Tracking product releases]({{site.baseurl}}/docs/promotions/releases/)  
[Creating products]({{site.baseurl}}/docs/products/create-product/)   
