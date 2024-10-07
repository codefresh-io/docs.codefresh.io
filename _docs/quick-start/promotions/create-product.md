


You are all fmailiar with Argo CD applications! 
If you are a developer that;s what you develop and then deploy 


We are now going to introduce you to the concept of Products in GitOps.

Let's go back to Argo CD applications in Codefresh.

What would you want to create Products?

Explore the power of GitOps Products for Argo CD applications.

A Product unifies individual Argo CD applications that share a common element between them. Consider your payment applications organized by Environments that correspond to the regions they are deployed in. With Products, Codefresh allows you to group and track them as a cohesive entity as they move through different Environments.

We'll start by creating a Product, view and explore how it is displayed in the GitOps Products dashboard.
We'll then connect 

## View appplications

In the GitOps Apps dashboard, identify the applications you want to group as a Product.
In the example below you can see that there are four versions of the trio application, one for each environment. 
These are essentially the same application, using more or less the same microservices with similar dependencies. 
We want to track and monitor this set of applications as the same product.

SCREENSHOT OF 

## Create a Product
Once you identify or have an idea of the applications you want to group as a Product, let's create the Product.
The Product requires a unique name, optionally an annotation using which you can connect different Argo CD applications to it.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for the Product, `trio-apps` for the quick start.
    1. **Connect Applications**: The annotation to associate with this Product, and to use to connect different applications to it. For the quick start, we'll use the default annotation automatically created, c`odefresh.io/product: trio-apps`. Copy the annotatopn to the cli[pboard]
    1. **Tags**: For the quick start, leave empty.

REPLACE WITH SCREENSHOT WITH FILLED IN FIELDS AS ABOVE
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
1. Click **Add**. The Product is displayed in the Products dashboard. 

## Explore the GitOps Products dashboard
You'll see the Product we added, trio-apps in the Products dashboard.
There are filters to focus on those proc


## Connect applications to the trio-apps products
The next step is 


Simply creating the Product is not usefule. You must connect any application to the Product for it to be included as and treated it as part of the product.

There are two ways to connect applications to Products.

1. Declarativley: By adding the Product's annotation to the application 
1. UI: By assigning an application to the Product

## Add product annotation to the application manifest

1. In the Products dashboard, if needed, mouse over the row with the trio-apps product, and click ??Edit.
1. Copy the default annotation.
1.