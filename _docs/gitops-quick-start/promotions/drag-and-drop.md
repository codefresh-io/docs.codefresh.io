---
title: "Quick start: Drag-and-drop promotion"
description: "Promote product apps between two environments"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/drag-and-drop/
---

In this first quick start on promotions, we'll see how to promote products using the intuitive drag-and-drop functionality in the Environments dashboard. 

This quick, visual method allows you to manually move changes in applications between two environments in just a few steps.

Use this method when you want to:
* Quickly test changes in a different environment
* Manually promote a product version for validation or further deployment

## In this quick start - drag-and-drop promotions
In this quick start, we'll promote changes in  `demo-trioapp-dev` to `demo-trioapp-qa` across their respective environments.
We are manually promoting the applications due to differences in the application versions between the two environments, ensuring that `demo-trioapp-qa` is updated with the latest changes from `demo-trioapp-dev`.

## Follow-along Git repo
The application version is defined in the  `appVersion` attribute of the `chart.yaml` file.  
To view the current version of `demo-trioapp-dev`, see its [`chart.yaml`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/blob/main/demo-applications/trioapp-dev/Chart.yaml){:target="_blank"} file.


## Before you begin
If you haven't done so already, create:
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/)  
* [Products]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create/)  
* [Applications]({{site.baseurl}}/docs/gitops-quick-start/products/create-app-ui/)  

## Promote product applications through drag-and-drop

1. From the sidebar, select **Environments**.  
    * The `demo-trioapp` product is displayed in the `dev`, `qa`, and `prod` environments. 
    * Note the release versions for the product in each environment.  
      For example, the version in `dev` is different from those in `qa` and `prod`, indicating changes to the application that have not yet been deployed to all environments.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dnd-prod-in-env.png" 
url="/images/quick-start/promotions/quick-start-dnd-prod-in-env.png"
alt="Promotions quick start: `demo-trioapp` product in Environments dashboard" 
caption="Promotions quick start: `demo-trioapp` product in Environments dashboard"
max-width="60%"
%}

{:start="2"}
1. To view the applications linked to the product `demo-trioapp` in each environment, mouse over the product name in each of the environments.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dnd-apps-in-prod.png" 
url="/images/quick-start/promotions/quick-start-dnd-apps-in-prod.png"
alt="Promotions quick start: `demo-trioapp-dev` and `demo-trioapp-qa` applications" 
caption="Promotions quick start: demo-trioapp-dev` and `demo-trioapp-qa` applications"
max-width="60%"
%}

{:start="3"}
1. Drag and drop the application into the desired target environment.  
  For the quick start, we'll promote `demo-trioapp` by dragging `demo-trioapp-dev` from `dev` and dropping it into `demo-trioapp` in the `qa` environment.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dnd-action.png" 
url="/images/quick-start/promotions/quick-start-dnd-action.png"
alt="Promotions quick start: Drag and drop `demo-trioapp-dev` to promote" 
caption="Promotions quick start: Drag and drop `demo-trioapp-dev` to promote"
max-width="60%"
%}

{:start="4"}
1. Click **Commit** to commit the changes.  
  The Commit Changes page displays details about the promotion, including the action used, the files impacted, and the properties being updated.


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-commit.png" 
url="/images/gitops-promotions/tutorials/dnd-commit.png"
alt="Promotions quick start: Commit changes for `demo-trioapp`" 
caption="Promotions quick start: Commit changes for `demo-trioapp`"
max-width="60%"
%}

{:start="5"}
1. Review the changes carefully and click **Promote**. 
1. Continue with [View release created for product](#view-release-created-for-product).


## View release created for product
After committing the changes, the promotion mechanism automatically creates a release for the product, `demo-trioapp` in our case.
Here you can monitor how the promotion is orchestrated between the environments `dev` and `qa`.

* Click **View Release Details** to go to the release view and monitor the release as it progresses between the `dev` and `qa` environments.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dnd-ongoing-release.png" 
url="/images/quick-start/promotions/quick-start-dnd-ongoing-release.png"
alt="Promotions quick start: On-going release for `demo-trioapp`" 
caption="Promotions quick start: On-going release for `demo-trioapp`"
max-width="60%"
%}

When the release completes execution, go to **Product > Releases** to see the information and status for the release.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dnd-releases-page.png" 
url="/images/quick-start/promotions/quick-start-dnd-releases-page.png"
alt="Promotions quick start: Releases list with release record for `demo-trioapp`" 
caption="Promotions quick start: Releases list with release record for `demo-trioapp`"
max-width="60%"
%}


## What's next
Now that you've learned how to promote a product using the drag-and-drop method, we'll explore more advanced promotion scenarios.  
The next quick start demonstrates how to orchestrate a multi-environment promotion through a Promotion Flow, enabling you to automate and streamline deployments across more than two environments.

[Quick start: Multi-environment sequential promotion]({{site.baseurl}}/docs/gitops-quick-start/promotions/multi-env-sequential-flow/)

 
