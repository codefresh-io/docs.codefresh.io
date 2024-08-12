---
title: "Assigning applications to products"
description: "Manually or declaratively connect applications to products "
group: products
toc: true
---

After creating products, the next step is to assign applications to it.
Assigning applications groups them as a single cohesive entity, enabling efficient maintenamce and easier deployments.

There are two methods of assigning applications to a Product:

* Manual assignment  
  A one-click action for quick assignment within Product Settings.  
  Unlike other UI actions, manual assignment does not require a commit action. Applications assigned to a product are not stored in the product's resource definition.  
  Recommended for testing purposes and not as the preferred method.

* Declarative assignment 
  Defines an annotation with the Product name in the application's manifest. If the Product doesn’t exist, Codefresh automatically creates it for you.  
  The annotation is committed and saved in Git as part of the application definition.   
  Fully GitOps-compatible, this is the preferred method.

## Manually assign applications to Products

Manually assign an application through the Product's settings.

This is one of two methods for assigning applications to Products. The other method involves adding annotations to the application's manifest, as described in [Use annotations to connect applications to Products](#use-annotations-to-connect-applications-to-products).


1. In the Codefresh UI, from the sidebar, select **Products**.
1. If needed, search for the application, or filter by Application or Environment.
1. Do one of the following:
  * Mouse over the row with the Product to which to assign the application, and click {::nomarkdown}<img src="../../../images/icons/settings.png?display=inline-block">{:/}.
  * Click the name of the Product for which to assign application.  
 The list of Unassigned apps is displayed in **Settings > Manage Applications**.

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
1. If needed, again search for applications or filter unassigned applications by **Environment**.
1. To assign an application, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/}.  
1. To confirm the assignment, click **Save**. 
  If you have defined an Environment for the application, the application is automatically added to the Environment defined for it.


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-to-env.png" 
	url="/images/gitops-products/assign-app-to-env.png" 
	alt="Application assigned to Product in defined Environment" 
	caption="Application assigned to Product in defined Environment"
  max-width="60%" 
%}




## Use annotations to connect applications to Products
Connect an application to a Product declaratively by adding the predefined annotation to the application's manifest.

This is one of two methods for assigning applications to Products. The other method is to manually assign them from the product's [Settings](#manually-assign-applications-to-products).

1. Copy the Product's annotation:
  1. In the Codefresh UI, from the sidebar, select **Products**.
  1. Do one of the following:
    * Mouse over the row with the Product to which to assign the application, and click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
    * Click the Product for which to assign applications.
    The **General** section in the Settings tab is displayed.
  1. Below Connect Applications, copy the annotation to add to the application's manifest.


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/general-copy-annotation.png" 
	url="/images/gitops-products/settings/general-copy-annotation.png" 
	alt="Copy annotation for Product" 
	caption="Copy annotation for Product"
  max-width="60%" 
%}

{:start="2"}
1. Add the annotation to the application's manifest:
  1. Click the **Product Dashboard** tab. 
  1. From the context menu of the application, select **Application Info > Go to application**.
  1. Click the **Configuration** tab, and switch to **YAML** mode.
  1. Paste below `metadata.annotations`.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/app-with-annotation.png" 
	url="/images/gitops-products/app-with-annotation.png" 
	alt="Add annotation to application manifest" 
	caption="Add annotation to application manifest"
  max-width="60%" 
%}

  {:start="7"}
  1. Commit to save the changes.

If you return to the GitOps Products dashboard and expand the Product, you'll now see that the application is part of the Product.





## Unassign application from Product Settings
Unassign an application manually assigned to a Product directly from its settings. 

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

## Unassign application by removing annotation

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Click the product from which to unassign the application, and then click the **Product Dashboard** tab.
1. From the context menu of the application, select **Application Info > Go to application**.
1. Click the **Configuration** tab, and switch to **YAML** mode.
1. Below `metadata.annotations`, remove the product annotation.
1. Commit to save the changes.

## Related articles
[Configuring promotion flows and triggers for products]({{site.baseurl}}/docs/products/manage-products/promotion-flow-triggers/)   
[Configuring version and promotable properties for products]({{site.baseurl}}/docs/products/manage-products/promotion-version-properties/)  
[Tracking deployments for products]({{site.baseurl}}/docs/products/product-releases/)  
[Creating products]({{site.baseurl}}/docs/products/create-product/)   