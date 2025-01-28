---
title: "Configure Product Settings"
description: "Configure metadata, promotion settings, and flows for product"
group: products
toc: true
---

After creating a product, configure metadata, Promotion Settings, and Promotion Flows for the Product and the applications connected to it through Product Settings. 

This article describes how to configure the different Product Settings:

* [Declaratively connect applications](#connect-applications-to-product-with-annotations)    
  Declaratively connect an application to a product with the predefined and automatically generated product annotation. 
  

* [Labels](#configure-labels)  
  Add labels for the product. 

* [Manually assign unassigned applications](#manually-assign-unassigned-applications)  
  Click names of unassigned applications to automatically assign them to environments. 


* [Promotion Flows](#configure-promotion-flows)  
  Select one or more predefined Promotion Flows, and customize the trigger conditions for each of the Flows.
  
* [Promotion Settings](#configure-promotion-settings)  
  Define the version and properties to promote for the applications in the product either from a predefined promotion template, or by defining the promotion settings.



## Form & YAML modes
As with most GitOps entities, you have the option to configure Product Settings in Form or YAML modes, and switch seamlessly between them during configuration.

No matter what mode you use to configure Product Settings, all settings, except applications manually assigned to the product are saved as a CRD (Custom Resource Definition) within the Shared Configuration Repository in the GitOps Runtime selected as the Configuration Runtime.  
The path in the Shared Configuration Repo is `<gitops-runtime>/<shared-configuration-repo>/resources/configurations/products/<product-name>.crd`.  

See [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) and [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes).  

For the YAML specifications, see [Product YAML]({{site.baseurl}}/docs/promotion/yaml/product-crd/) and [Promotion Template YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-template-crd/).





## Open Product Settings
1. In the Codefresh UI, from the sidebar, select **Products**.
1. Click the name of the product.
1. Click the **Settings** tab.



## Connect applications to product with annotations
Connect applications to products declaratively by copying the Product annotation to the application's manifest. If the Product doesn’t exist, Codefresh automatically creates it for you. (NIMA: is this correct)

This is the preferred, declarative method of assigning applications to Products. The changes are committed and saved in Git as part of the application definition.    

##### Before you begin
* Review [Assigning applications to products]({{site.baseurl}}/docs/products/assign-applications/)   

##### How to
1. Open [Product Settings](#open-product-settings).
1. Click the **General** tab, and below Connect Applications copy the annotation to add to the application's manifest.

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/general-copy-annotation.png"
 url="/images/gitops-products/settings/general-copy-annotation.png"
 alt="Product Settings: General"
 caption="Product Settings: General"
    max-width="60%"
%} 

{:start="3"}
1. Paste the annotation in the application's manifest:
    1. Click **Product Dashboard**. 
    1. From the context menu of the application, select **Application Info > Go to application**.
    1. Click the **Configuration** tab, and switch to **YAML** mode.
    1. Paste below `metadata.annotations`.

<!--- SCREENSHOT -->

### Unassign applications by removing annotations

To unassign an application assigned declaratively to the product, remove the annotation from the application's manifest.

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Click the product from which to unassign the application, and then click the **Product Dashboard** tab.
1. From the context menu of the application, select **Application Info > Go to application**.
1. Click the **Configuration** tab, and switch to **YAML** mode.
1. Below `metadata.annotations`, remove the product annotation.
1. Commit to save the changes.





## Configure labels

Adding labels to a product lets you create access control rules that govern manual promotion triggers and retry permissions for failed releases for product entities by teams. 

1. If needed, open [Product Settings](#open-product-settings).
1. Click the **General** tab.
1. Below **Labels**, click **Add** and define key-value pairs compatible with Kubernetes conventions for labels.

## Manually assign unassigned applications
Manually assign applications with a one-click action for quick assignment.  
  
This quick assignment option does not require a commit action as applications assigned to a product are not stored as part of the product's resource definition.  

This method is recommended for testing purposes.

##### Before you begin
* Review [Assigning applications to products]({{site.baseurl}}/docs/products/assign-applications/)   

##### How to


1. Open [Product Settings](#open-product-settings).
1. Click **Manage Applications**.
  The list of **Unassigned apps** is displayed on the left.

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/manage-apps.png"
 url="/images/gitops-products/settings/manage-apps.png"
 alt="Product Settings: Manage Applications"
 caption="Product Settings: Manage Applications"
    max-width="60%"
%} 

{:start="3"}
1. If needed, filter unassigned applications by **Environment**, or in the search field type a part of the application name.
1. To assign an application, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/}.  
1. To confirm the assignment, click **Save**. 
  If you have defined an Environment for the application, Codefresh automatically adds the application to the Environment defined for it.

<!--- SCREENSHOT -->

### Unassign manually-assigned applications
Unassign an application manually assigned to a product directly from its settings. 

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Do one of the following:
    * Mouse over the row with the Product from which to unassign the application, and click {::nomarkdown}<img src="../../../images/icons/settings.png?display=inline-block">{:/}.
    * Click the Product from which to unassign applications.
    The **General** section in the Settings tab is displayed.
1. In the environment with the application to unassign, click {::nomarkdown}<img src="../../../images/icons/unassign-app.png?display=inline-block">{:/}.  
  You can see that the Unassign icon is disabled for the `guestbook-app-prod` indicating that it is connected through an annotation.

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
  The application reappears in the list of Unassigned apps. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-app-example.png" 
	url="/images/gitops-products/unassigned-app-example.png" 
	alt="Unassigned application in list" 
	caption="Unassigned application in list"
  max-width="60%" 
%}


## Configure Promotion Flows
Automate and orchestrate promotions across different environments for the Product by:
* Selecting one or more predefined Promotion Flows
* Customizing the conditions that should trigger each Promotion Flow
* Defining the priority when multiple Flows are configured 


##### Before you begin
* Review [Configuring promotion flows and triggers for products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   


##### How to
1. Open [Product Settings](#open-product-settings).
1. Click the **Promotion Flows** tab.
1. To add a Promotion Flow for the product, click **Add**.
1. From the list of Promotion Flows, select a predefined Flow for the product. 
1. Define the conditions to match and trigger the Promotion Flow:
    1. **Property**: The property to monitor for changes, based on either the text description associated with the commit message (`commitMessage`), or the commit hash generated by Git (`gitRevision`). 
    1. **Operator**: The operator to apply when matching the Property, based on inclusion or exclusion, with or without wildcards.  
     `In`: Checks if the commit message or Git revision <i>includes</i> the specified value or any value within a set of values.   
     `NotIn`: Checks if the commit message or Git revision <i>does not include</i> the specified value or any value within a set of values.
    1. **Values**: Single or multiple values used to match or exclude Promotion Flows based on the Property and Operator configured. 
    1. To add more trigger conditions, click **Add** and repeat _steps 4.1 through 4.3_.


{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/promotion-flow.png"
 url="/images/gitops-products/settings/promotion-flow.png"
 alt="Product Settings: Promotion Flows"
 caption="Product Settings: Promotion Flows"
 max-width="50%"
%}

{:start="6"}
1. To confirm, click **Add**.
1. If there is more than one Promotion Flow, click {::nomarkdown}<img src="../../../images/icons/move.png?display=inline-block">{:/} and drag to define the priority and order.  

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/promotion-flow-list.png"
 url="/images/gitops-products/settings/promotion-flow-list.png"
 alt="Product Settings: Promotion Flow list"
 caption="Product Settings: Promotion Flow list"
 max-width="60%"
%}

{:start="8"}
1. Click **Commit**.

## Configure Promotion Settings
Configure Promotion Settings to define:
* The source from which to get application's release version
* The precise changes to promote across multiple files in the applications 


##### Before you begin
* Review [Configuring version and promotable properties for products]({{site.baseurl}}/docs/products/promotion-version-properties/)  


##### How to
1. If needed, open [Product Settings](#open-product-settings).
1. Click the **Promotion Settings** tab.
1. From the list of Promotion Templates, do one of the following:
    * Select a predefined Promotion Template.  
      The Version and Promotable Properties are populated with the settings already defined in the template.
    * Select **Inline** and create a new Promotion Template for this product. Continue from _step 4_.

1. Define the source settings for the application **Version**:
    1. **File**: The name of the file from which to retrieve the version. For example, `chart.yaml`. 
    1. **Path**: The JSON path to the attribute with the value. 
    1. To see the result for any application connected to the product, click **Preview Configuration** and then select an application to see its version. 

{:start="5"}
1. Define the settings for the **Promotable Properties**:
    1. **File**: The name of the file with the attributes to promote. For example, `values.yaml`. 
    1. **Paths**: The JSON path or paths to one or more attributes within the file to promote. For example, `$.buslog.image.tag`, `$.ctrlr.image.tag`, and `$.flask-ui.image.tag`.
    1. To add more files and paths, click **Add** and define the **File** and **Paths**.
    1. To preview the properties that will be promoted for an application connected to the product, click **Preview Configuration** and then select an application. 

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/promotion-settings.png"
 url="/images/gitops-products/settings/promotion-settings.png"
 alt="Product Settings: Promotion Settings"
 caption="Product Settings: Promotion Settings"
 max-width="60%"
%}

{:start="6"}
1. Click **Commit**.





## Related articles
[Tracking product releases]({{site.baseurl}}/docs/promotions/releases/)  
[Creating products]({{site.baseurl}}/docs/products/create-product/)   
[Access control for GitOps products]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/#products)  