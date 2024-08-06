





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