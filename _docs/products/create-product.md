---
title: "Create Products"
description: "Create Products and connect applications"
group: products
toc: true
---



Create a Product with a unique name and define the annotations through which to connect related Argo CD applications to it.



## Understanding the role of Environments for Products

When you drill down into specific products in the Product dashboard, application visibility is closely tied to the definition and mapping of Environments. 

Note that Products will not display any applications in these scenarios:

* No Environments defined  
  If you have not created Environments in Codefresh, the Products dashboard will not display any applications, even when applications are assigned to Products. 

* Unmapped cluster-namespace  
  Even if Environments are defined, applications are not displayed within Products if the corresponding clusters or namespaces are not mapped to any existing Environment. 


## Create Products

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