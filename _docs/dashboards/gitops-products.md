---
title: "GitOps Products"
description: "Create Products to group and manage interrelated Argo CD applications environments"
group: dashboards
toc: true
---


>**NOTE**  
This feature is currently in Beta.

Explore the power of Products for Argo CD applications in Codefresh GitOps. 

Managing complex applications across multiple environments is a common challenge faced by developers and platform engineers. The diverse nature of applications and the variety of environments they deploy to can lead to fragmented management and deployment processes.

In Codefresh GitOps, Products serve as a strategic layer that bridges this gap. Products group different yet interconnected applications based on their similarities and dependencies. 
By grouping applications, Products enhance Environments, allowing complete visibility for efficient management across Environments.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="70%" 
%}

Read more on the world's first dashboard for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.


##### What is a Product in Codefresh GitOps?
In Codefresh GitOps, a Product is a custom entity that allows you to group interconnected Argo CD applications, providing a cohesive view as the applications progress through the development and deployment lifecyle.  

Consider a practical scenario of numerous applications connected to billing or payment. Instead of monitoring each application separately, creating a Product enables you to track and manage them collectively.

The diagram illustrates how Argo CD applications connected to a Product are grouped by that Product and organized by Environments. It also shows applications not assigned to any Product.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by Products and organized by Environments" 
	caption="Argo CD applications grouped by Products and organized by Environments"
  max-width="70%" 
%}

##### Benefits of Products
* **Unified application management**  
  Managing complex Argo CD applications across multiple Environments can be challenging.  
  By grouping similar Argo CD applications into a unit, Products allow you to also efficiently manage them cohesively.

* **Bridging applications and Environments**  
  Products act as a bridge between applications and their respective Environments. By linking applications to Products, you can easily track their deployment across different environments, providing clarity and control over your deployment pipelines.

* **Effortless creation**  
  As with Environments, creating a Product is equally straightforward. You can create Products from the UI, or declaratively through annotations in your application manifests.

* **Real-time insights with integrated views**  
  The Products dashboard offers three distinct views - Pods, Git, and Features. These views provide real-time insights into the changes in the application repo, deployment details, code changes, and feature tracking. Whether you're a developer tracking the latest commits or a project manager monitoring feature releases, these integrated views offer valuable insights tailored to your role.


##### How do you view applications by Product?  
In two simple steps:

1. [Create the Product](#create-products)  
  Begin by creating a Product, and assigning a meaningful name based on your use case. You can do this in the UI, or through annotations in app manifests.

1. [Connect applications to the Product](#assigning-applications-to-products)  
  Bring your applications into the picture. Link applications to the Products you've created to create the associations you need. 

Codefresh seamlessly identifies and organizes the applications in the correct [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/).  
You can then [work with Products](#working-with-products), and with [applications in Products](#working-with-applications-in-products).

## Understanding the role of Environments for Products

In the Products dashboard, application visibility is closely tied to the definition and mapping of Environments. 

Note that Products will not display any applications in these scenarios:

* No Environments defined  
  If you have not created Environments in Codefresh, the Products dashboard will not display any applications, even when applications are assigned to Products. 

* Unmapped cluster-namespace  
  Even if Environments are defined, applications are not displayed within Products if the corresponding clusters or namespaces are not mapped to any existing Environment. 




## Create Products
Create a Product with a unique name and define the annotations through which to connect related Argo CD applications to it.



##### Before you begin
* Create one or more [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-gitops-environments) for applications

##### How to
1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for your Product, which is also unique in the cluster. 
    1. **Connect Applications**: The applications to associate with this Product by adding the default or custom annotation to the application manifest.  
      *  To use the default annotation, copy and paste it into the application's manifest.
      *  To use a custom annotation, click **Add custom annotation**, and then define the Key-Value for the annotation. Copy and paste it into the manifest.
    1. **Tags**: Any metadata providing additional context and information about the Product, used for filtering and organization purposes.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/create-product.png" 
	url="/images/gitops-products/create-product.png" 
	alt="Add Product" 
	caption="Add Product"
  max-width="60%" 
%}

{:start="4"}
1. Click **Add**. 
   The Product is displayed in the Products dashboard. 




## Products dashboard

Here's an example of the Products dashboard.


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="60%" 
%}


As with all Codefresh dashboards, filter the view of the Products dashboard by Product Name, Application, or  Environment. 

Here are some key features of the Products dashboard.

### Collapsed & expanded views
* **Collapsed view**: The default view, displays the Product name alongside the Environments with the number of applications in each Environment.<br> The options on the right allow you to manage Product.  
* **Expanded view**: The expanded view displays the applications in the Product organized by their Environments.</li></ul>{:/} 

### Product management options
Mouse over the row with the Product to display possible actions:
{::nomarkdown}<ul><li><img src="../../../images/icons/edit.png?display=inline-block"> <b>Edit</b>: Edit the Product's settings. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete Product</a>.</li><li><img src="../../../images/icons/settings.png?display=inline-block"> <b>Manage Applications</b>: Manually assign unassigned applications to environments in the Products dashboard. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#manually-assign-applications-to-products">Manually assign applications to Products</a>.</li><li><img src="../../../images/icons/trash.png?display=inline-block"> <b>Delete</b>: Remove the Product from the Products dashboard, unassigning any manually-assigned applications. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete Product</a>.</li></ul>{:/} 


### Drill into individual Products
Clicking a Product name navigates you to a detailed view of the Product and its applications. Unique to Product view are integrated insights into Git and issue-tracking systems and how they relate to deployments. 
 
In addition, the application version and enriched image information are especially useful.


##### Application release version
* Version information, currently supported for Helm-based applications, identifies the specific release of the application in different Environments.
* Clicking the version displays the application's dependencies, enabling comparison across different applications.

See [View and compare deployed versions for dependencies](#view-and-compare-deployed-versions-for-dependencies).

##### Integrated Pod/Git/Feature information
* The Products dashboard correlates sync information with other parts of the software lifecycle, such as issue-tracking systems.
* Switch between Pods, Git, and Features views to gain insights beyond development, including source code commits, affected services, commit authorship, and incorporated features in releases. 

See [Application lifecycle insights with pods, Git and features](#application-lifecycle-insights-with-pods-git-feature-views).


##### Manage applications
Manage individual applications without navigating away from the Products dashboard. The actions available mirror those in the GitOps Apps dashboard. 




## Working with Products


### Assigning applications to Products
There are two methods of assigning applications to a Product:

* Manual assignment from the Products dashboard  
  A one-click action, this method is for quick assignment from the UI. Unlike other UI actions, manual assignment does not require a commit action.
  Recommended for testing and not as the preferred method.

* Declarative assignment through annotations  
  This method defines an annotation with the Product name in the application manifest. If the Product doesn’t exist, Codefresh automatically creates it for you.  
  Recommended method which is fully GitOps-compatible.

#### Manually assign applications to Products
Manually assign an application to a Product directly from the Product dashboard. 

This is one of two methods for assigning applications to Products. The other method involves adding annotations to the application's manifest, as described in [Use annotations to connect applications to Products](#use-annotations-to-connect-applications-to-products).


1. In the Codefresh UI, from the sidebar, select **Products**.
1. If needed, search for the application, or use the Application and Environment filters.
1. Do one of the following:
  * Click the name of the Product for which to assign applications, and then click **Manage Apps** on the right.
  * Mouse over the row with the Product to which to assign the application, and click {::nomarkdown}<img src="../../../images/icons/settings.png?display=inline-block">{:/}.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-apps-option.png" 
	url="/images/gitops-products/assign-apps-option.png" 
	alt="Options to manually assign applications to Product" 
	caption="Options to manually assign applications to Product"
  max-width="60%" 
%}

{:start="3"}
1. In the list of **Unassigned apps** on the left, if you have created Environments, select the **Environment** by which to filter unassigned applications, or in the search field, type a part of the application name.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-apps-in-product.png" 
	url="/images/gitops-products/unassigned-apps-in-product.png" 
	alt="Unassigned applications in Product" 
	caption="Unassigned applications in Product"
  max-width="60%" 
%}

{:start="4"}
1. To assign the application, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/}.  
1. To confirm the assignment, click **Save**. 
  If you have defined an Environment for the application, Codefresh adds it to the Environment defined for it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-to-env.png" 
	url="/images/gitops-products/assign-app-to-env.png" 
	alt="Application assigned to Product in defined Environment" 
	caption="Application assigned to Product in defined Environment"
  max-width="60%" 
%}


#### Use annotations to connect applications to Products
Connect an application to a Product declaratively by adding the default annotation to the application's manifest.
The annotation is defined as part of the Product's settings.

This is one of two methods for assigning applications to Products. The other method is to manually assign them from the Products dashboard, as described in [Manually assigning applications to Prodcuts](#manually-assign-applications-to-products).

1. Copy the Product's annotation:
  1. In the Codefresh UI, from the sidebar, select **Products**.

  1. Click the Product for which to add applications, and then click **Settings**.
  1. In the General section, below Connect Applications , copy the annotation to add to the application's manifest.

  1. Mouse over the row with the Product name, and then select **Edit** {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
  1. In the Edit Product form, copy the annotation to add to the application's manifest and close the form.


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/copy-annotation.png" 
	url="/images/gitops-products/copy-annotation.png" 
	alt="Copy annotation for Product" 
	caption="Copy annotation for Product"
  max-width="60%" 
%}

{:start="2"}
1. Add the annotation to the application's manifest:
  1. From the sidebar, select **GitOps Apps**.
  1. Select the application to which to add the annotation.
  1. Click the **Configuration** tab and switch to **YAML** format.
  1. Add the annotation as in the example below.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/add-annotation-app-manifest.png" 
	url="/images/gitops-products/add-annotation-app-manifest.png" 
	alt="Add annotation to application manifest" 
	caption="Add annotation to application manifest"
  max-width="60%" 
%}

  {:start="7"}
  1. Commit to save the changes.

If you return to the GitOps Products dashboard and expand the Product, you'll now see that the application is part of the Product.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-with-annotation.png" 
	url="/images/gitops-products/assign-app-with-annotation.png" 
	alt="Application assigned to Product through annotation" 
	caption="Application assigned to Product through annotation"
  max-width="60%" 
%}

### Unassigning applications from Products
Depending on how you assigned the application to the Product, unassign it either directly from the Products dashboard or by removing the annotation from its manifest.


#### Unassign application from the GitOps Product dashboard
Unassign an application manually assigned to a Product directly from the GitOps Product dashboard. 

A disabled icon indicates that the application is connected through an annotation. 

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Mouse over the row with the Product from which to unassign the application, and click **Manage Apps**.
1. In the card with the application to unassign, click {::nomarkdown}<img src="../../../images/icons/unassign-app.png?display=inline-block">{:/}.  
  You can see that the Unassign icon is dsiabled for the `guestbook-app-prod`.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassign-app-from-product.png" 
	url="/images/gitops-products/unassign-app-from-product.png" 
	alt="Unassign application from Product" 
	caption="Unassign application from Product"
  max-width="60%" 
%}

{:start="4"}
1. To confirm, click **Save**.
  The application reappears in the list of Unassigned applications. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-app-example.png" 
	url="/images/gitops-products/unassigned-app-example.png" 
	alt="Unassigned application in list" 
	caption="Unassigned application in list"
  max-width="60%" 
%}

#### Unassign application by removing annotation
1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the Product with the application to unassign.
1. In the card with the application to unassign, click the application name, and then click **Go to Full View**.
1. Click the **Configuration** tab and switch to YAML view.
1. Remove the annotation from the application's manifest.

### Configuring version and promotable properties for Products

Through Promotion Settings for Products, you can automate and customize the changes to promote between different environments. By defining precise promotion criteria, you can ensure that only the necessary changes are promoted, enhancing both accuracy and efficiency.

Promotion Settings serve two primary functions for the applications in the being promoted:
1. Defining the source for the application's release version 
1. Defining the changes to promote across multiple files in the application 

Benefits of configuring Promotion Settings

* Precision through automation  
  Provides an automated mechanism to precisely define which changes to promote for the application, avoiding the need to manually review and approve or reject diffs. This functionality is invaluable when promoting multiple applications with many microservices or files. 


* Enforce environment-specific requirements  
  Different environments have distinct constraints and requirements. Promotion Settings enable you to specify which changes are valid for each environment, ensuring compliance with environment-specific needs.  
  While artifact versions and image tags typically warrant promotion for example, other changes may need to be excluded based on the target environment.  



###  Promotion Settings & Promotion Templates

Promotion Settings can be configured in either Form or YAML modes. Once configured and committed, these settings are saved as a CRD (Custom Resource Definition) named Promotion Template within the defined configuration runtime. This allows for a declarative and consistent approach to defining promotion criteria across environments.

### Version for promoted applications
The Version attribute specifies where Codefresh should look for version information for the applications in the Product, defined  
using a JSON path expression.  

The Version attribute in the Promotion Settings/Template is relative to the `spec.source.repoURL` and `spec.source.path` attributes defined in the application's configuration manifest. This is where Codefresh looks for the file from which to retrieve version information.

For example, `$.appVersion` indicates that the version should be extracted from the `appVersion` field in the specified file, `chart.yaml`.  

If the version is either not displayed in the dashboards, or what's displayed is incorrect, it could be because Codefresh could not find the values in the `repoURL` and `path`.
Double-check that the Source settings for the application correspond to the Version attribute in the Product's Promotion Settings.

#### Examples of version attributes

| Version attribute | Example YAML configuration     | JSON Path expression  | Real-world use case     |
|---------------------|--------------------------    |-----------------------|-------------------------------------------------|
| Default version attribute | appVersion: "1.2.3" | `$.appVersion`        | Commonly used in Helm charts or deployment manifests for explicit version management.  |
| Semantic versioning      | version: "2.3.4"     | `$.version`          | Indicates backward-compatible changes, new features, and bug fixes. |
| Image tag                | image:<br>
                                  repository: "myrepo/app"
                                  tag: "1







| Version attribute            | JSON path expression       | Example configuration      | Possible use case                      |
|------------------------------|----------------------------|---------------------------|--------------------------               |
| Default version attribute    | `$.appVersion`             | {% raw %}appVersion: "1.2.3" {% endraw %}  | Commonly used in Helm charts or deployment manifests for explicit version management. |
| Semantic versioning          | `$.version`                | ```yaml version: "2.3.4" ```            | Indicates backward-compatible changes, new features, and bug fixes.   |
| Image tag                    | `$.image.tag`              | ```yaml<br>image:<br>  repository: "myrepo/app"<br>  tag: "1.0.0"<br>```  | Used in containerized environments to manage versions tied to Docker images.  |
| Git commit SHA               | `$.git.commitSha`          | ```yaml git: commitSha: "abc123def456" ```    | Tracks versions using specific Git commit SHAs, useful in CI/CD pipelines.       |
| Build number                 | `$.build.number`           | ```yaml build: number: "20230801-001" ```     | Automatically generated during builds, often including timestamps or incremental identifiers.   |
| Release version              | `$.release.version`        | ```yaml release: version: "v4.5.6" ```       | Differentiates between stages of software maturity and deployment readiness (e.g., alpha, beta, production).  |
| Deployment version           | `$.deployment.version`     | ```yaml deployment: version: "3.2.1" ```      | Manages versioning per deployment unit in environments with multiple components or microservices.             |
| Custom metadata version      | `$.metadata.version`       | ```yaml metadata: name: "my-application" version: "5.4.3" ```       | Uses custom metadata fields for additional versioning information specific to the organization or project.    |


##### Semantic versioning 

Used to follow semantic versioning conventions, representing the application version.

```yaml
version: "2.3.4"
```
JSON path expression: `$.version`
 

##### Image tag 

Version of the application represented by the Docker image tag.

```yaml
image:
  repository: "myrepo/app"
  tag: "1.0.0"
```
JSON path expression: `$.image.tag`

##### Git commit SHA 

Version of the application tracked using a specific Git commit SHA.

```yaml
git:
  commitSha: "abc123def456"
```
JSON path expression: `$.git.commitSha`

##### Build number 

Uses a build number to represent the version, often including a date or sequential identifier.

```yaml
build:
  number: "20230801-001"
```
JSON path expression: `$.build.number`

##### Release version 

Release-specific context.

```yaml
release:
  version: "v4.5.6"
```
JSON path expression: `$.release.version`

##### Release version 

Release-specific context.

```yaml
release:
  version: "v4.5.6"
```
JSON path expression: `$.release.version`

### Promotable properties 
Promotable properties define the specific files and the attributes within those files to be promoted between environments.  
Defining these properties allow for precise control over what changes are included in a promotion, adhering to environment-specific requirements and avoiding unwanted modifications.

Like the Version attribute, promotable properties are defined through JSON path expressions. Unlike the Version attribute, you can define multiple JSON path expressions to different files and multiple attributes in the same file. 


### JSON path expressions for files and attributes
Application versions and promotable properties are defined through JSON path expressions. These path expressions point to the location of the attribute or property within the specified file, and are used to navigate and extract values from the file.

JSON syntax and validations are available 

Here is a short summary of JSON syntax and rules. 
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
Using the above syntax, you
`$.global.codefresh.*` extracts all attributes that match the `codefresh` object in the file, which resolves to `url: g.codefresh.io` and 
`tls.create.false`.

`$..tls` extracts values from all levels with `tls`, which resolves to:
`create: false` (from `codefresh.tls` object)
`create: true` and `caCert: some-argo-cert` (both from `argo-cd.tls` object)



#### Examples of Promotable Properties 


##### Promotable Properties configured

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

##### `version.yaml' promotable property resolution & preview

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promote-properties-version-source-and-preview.png" 
	url="/images/gitops-products/settings/promote-properties-version-source-and-preview.png" 
	alt="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression" 
	caption="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression"
  max-width="60%" 
%}

##### `chart.yaml' promotable property resolution & preview

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promote-properties-chart-source-and-preview.png" 
	url="/images/gitops-products/settings/promote-properties-chart-source-and-preview.png" 
	alt="`chart.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression" 
	caption="`version.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression"
  max-width="60%" 
%}

##### `values.yaml' promotable property resolution & preview

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promote-properties-values-source-and-preview.png" 
	url="/images/gitops-products/settings/promote-properties-values-source-and-preview.png" 
	alt="`values.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression" 
	caption="`values.yaml`: Example of manifest (left) and preview (right) with resolved JSON path expression"
  max-width="60%" 
%}





Configuration Location
Promotion Templates should be stored in a Git repository synced with your cluster via a Git Source. This approach integrates seamlessly with the GitOps Apps dashboard in Codefresh.










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



### Resolve conflicts for application assigned to multiple Products
Resolve conflicts when the same application is assigned to more than one Product. Unassign the application from any one of the Products.

When Codefresh detects an application assigned to two different Products, it alerts you of the same through a popup in the UI.
This conflict typically occurs when you manually assign an application to a Product from the Unassigned list, and then add an annotation to the same application's manifest connecting it to a different Product.



### Edit/delete Products
Edit settings for an existing Product or delete the Product from the Products dashboard.

* **Edit**: Update settings for the Product, including the name of the Product, and the annotations defined for it. 
* **Delete**: Delete a Product from the Products dashboard. Deleting a Product unassigns all the applications manually assigned to it in the Products dashboard. If the application is connected through an annotation, the annotation is not deleted.

##### How to
1. In the Codefresh UI, from the sidebar, select **Products**.
1. From the Products dashboard, select the Product to edit or delete.
1. From the context menu on the right, select the required option.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/edit-delete-product.png" 
	url="/images/gitops-products/edit-delete-product.png" 
	alt="Edit/delete Product" 
	caption="Edit/delete Product"
  max-width="80%" 
%}

{:start="4"}
1. Edit settings, or follow the instructions to delete the Product.

## Working with applications in Products
Selecting a Product displays the applications assigned to that Product, organized by the Environments defined for them.



### View and compare deployed versions for dependencies
View the dependencies included with each application, and compare versions of the application and dependencies deployed in different Environments. 

Helm-based applications show the release version of the application. This is the _app version_ as defined in the Helm chart, identifying the specific release version in the different Environments.

You can:
* View the application’s dependencies and their versions. Useful to identify which version is deployed where.
* Compare release versions of the dependencies across deployments in different Environments.  Useful for troubleshooting as you can identify if the version that works in dev is the same as the version with the problem in staging.


##### How to
1. In the Codefresh UI, from the sidebar, select **Products**.
1. Expand the Product with the applications you want to view/compare. 
1. Click the version number of the application.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/version-info.png" 
	url="/images/gitops-environments/version-info.png" 
	alt="Helm chart version for application" 
	caption="Helm chart version for application"
  max-width="60%" 
%}

{:start="3"}
1. To compare different applications, enable **Compare**.
1. Click within the field **Select applications to compare**, and select the applications.
  * For up to two applications, switch between YAML and Table views.
  * For more than two applications, the comparison view automatically switches to Table.
<!--- add here new screenshot and also step describing what is Summary View> -->  

### Integrated insights with Pod, Git, Feature views  
Navigate seamlessly between Kubernetes (Pods), version control (Git), and issue-tracking (Features) views for the Product to get consolidated data from the same location.



#### Pods
Deployment, Rollout, and Promotion information for the application.
* Deployments: Source image, new image and tag, replicas for each deployment
* Rollouts: The services rolled out, the type of rollout, the result of the rollout, promote/pause rollout action
* Promotion: The change that resulted in the promotion, with details on who committed the change, and the commit hash
* Cluster and Namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/pod-view-deployments.png" 
	url="/images/gitops-products/pod-view-deployments.png" 
	alt="Products: Pod view of application with Deployments" 
	caption="Products: Pod view of application with Deployments"
  max-width="60%" 
%}

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/pod-view-rollouts.png" 
	url="/images/gitops-products/pod-view-rollouts.png" 
	alt="Products: Pod view of application with Rollouts" 
	caption="Products: Pod view of application with Rollouts"
  max-width="60%" 
%}

#### Git
Codefresh retrieves the data here directly _from the application repository_, not the GitOps repository. You can trace the complete commit history of the application’s repo, up to the commit that initiated the build and deployed the new version.  

History of individual commits with deep links to source control.  

Useful for project managers and developers to trace: 
* PR (pull request) history
* Committer and commit information
* Promotion
* Cluster and Namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/git-view.png" 
	url="/images/gitops-products/git-view.png" 
	alt="Products: Git view of application" 
	caption="Products: Git view of application"
  max-width="60%" 
%}

#### Features
Connect commits to the application repo to tickets in your issue-tracking tool or system. This integration enhances traceability and context, enabling you to monitor the deployment’s impact by tying deployed features to specific feature requests or bug fixes.
* Gain insights into deployment specifics
* Review all commits leading up to the latest one that triggered the deployment
* Align deployed features with related feature requests

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/features-view.png" 
	url="/images/gitops-products/features-view.png" 
	alt="Products: Features view of application" 
	caption="Products: Features view of application"
  max-width="60%" 
%}





### View deployment (Timeline) history for applications
Review the deployments for a specific application in the Products dashboard. 

1. In the Codefresh UI, from the sidebar, select **Products**.
1. In the Environment column with the product you require, click the context menu and then select **Application info > Timeline** to view deployment history.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-timeline-view.png" 
	url="/images/gitops-environments/app-timeline-view.png" 
	alt="View deployment history for application from Products dashboard" 
	caption="View deployment history for application from Products dashboard"
  max-width="60%" 
%}
1. To view all the application’s tabs, including the Current State, Configuration, and others, click the link to **Full View** at the top.


### Manage applications in Products
Manage applications grouped within a Product through each application's context menu, that includes manual sync, refresh, and other options.

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the Product with the application for which to take action.
1. Click the context menu to the right of the application, and select the option:

  * [Quick View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#view-deployment-configuration-info-for-selected-argo-cd-application): View deployment, definition, and event information for the selected application in the same location.
  * [Diff View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#analyze-out-of-sync-applications-with-diff-view): Analyze out of sync applications. This option is disabled when applications are synced.
  * [Synchronize]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-synchronize-an-argo-cd-application): Manually synchronize the application to expedite Git-to-cluster sync. 
  * [Refresh/Hard Refresh]({{site.baseurl}}/docs/deployments/gitops/manage-application/#refreshhard-refresh-argo-cd-applications): As an alternative to manually syncing an application, either sync the application with the desired state in Git (refresh), or sync the application with the desired state Git while removing the cache (hard refresh).
  * [Edit]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-argo-cd-application-definitions): Update General or Advanced configuration settings for the application.
  * [Delete]({{site.baseurl}}/docs/deployments/gitops/manage-application/#delete-argo-cd-applications): Delete the application from Codefresh.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/app-context-menu-in-product.png" 
	url="/images/gitops-products/app-context-menu-in-product.png" 
	alt="Context menu with actions for Argo CD applications within Products" 
	caption="Context menu with actions for Argo CD applications within Products"
  max-width="60%" 
%}

## Troubleshooting Products

Here are a few tips to troubleshoot issues you may encounter 

### Applications not displayed for Product
You have created the Product but not assigned or connected any applications to it.

You must assign every application to the Product, either directly in the Products dashboard or through an annotation in the application's manifest.  
See [Assigning applications to Products](#assigning-applications-to-products).

### Applications assigned to Products not displayed 

##### Issue
Applications assigned to a Product are not displayed in the Products dashboard.

##### Possible cause
One of the following:
* No Environments created
* Application does not exist in the clusters-namespaces mapped to existing Environments.

##### Possible solution
Applications assigned to Products are only relevant in the context of the Environments they are defined in.
Either create an Environment or add the cluster-namespace defined for the application to the existing Environment's definition.

**Step 1: Create an Environment**  
* If required, [Create an Environment]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-environments).


**Step 2: Add application's destination settings to Environment definition** 
1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.  
  In the example below, there are two Environments defined: `test` and `prod`. There are no applications in the `test` Environment.
   
   {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/trble-env-without-apps.png" 
	url="/images/gitops-products/trble-env-without-apps.png" 
	alt="Defined Environment without applications" 
	caption="Defined Environment without applications"
  max-width="60%" 
  %}

{:start="2"}  
1. Mouse over the toolbar for the Environment and click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
1. Check the **Clusters and Namespaces** mapped to the Environment.  
  In the example, the namespace `dev` is mapped to this Environment.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/trble-edit-env-settings.png" 
	url="/images/gitops-products/trble-edit-env-settings.png" 
	alt="Example: Environment settings" 
	caption="Example: Environment settings"
  max-width="60%" 
  %} 

{:start="4"}  
1. Add the namespace defined for the application to the Environment settings.
1. Go back to the Products dashboard.  
  You will now see your application in the Product and in the correct Environment.


## Related articles
[GitOps Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)   
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)