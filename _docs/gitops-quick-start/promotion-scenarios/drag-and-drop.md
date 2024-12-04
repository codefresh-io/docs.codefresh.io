---
title: "Drag-and-drop promotion"
description: "Promote product apps between two environments"
group: promotions
toc: true
---

In this quick start, we'll see how to promote products using drag-and-drop functionality. 
This quick, visual method allows you to move applications across two environments in a few simple steps, and is available in the Environments dashboard.



## Identify release versions
1. From the sidebar, select **Environments**.  
  The `demo-trioapp` product is displayed in the `dev`, `qa`, and `prod` environments. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-prod-in-env.png" 
url="/images/gitops-promotions/tutorials/dnd-prod-in-env.png"
alt="`demo-trioapp` product in Environments dashboard" 
caption="`demo-trioapp` product in Environments dashboard"
max-width="60%"
%}

1. Note the release versions for the product.
   `demo-trioapp` has different versions in `dev` and `qa` environments.

1. To view the linked applications in each environment, mouse over `demo-trioapp` in the respective environments.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-apps-in-prod.png" 
url="/images/gitops-promotions/tutorials/dnd-apps-in-prod.png"
alt="`demo-trioapp-dev` and `demo-trioapp-qa` applications" 
caption="`demo-trioapp-dev` and `demo-trioapp-qa` applications"
max-width="60%"
%}



## Promote application with drag-and-drop
Promote the application by dragging and dropping it into the desired target environment.  
For the quick start, we'll promote `demo-trioapp` by dragging `demo-trioapp-dev` from `dev` and drop it into `demo-trioapp` in the `qa` environment.

1. Drag and drop  `demo-trioapp-dev` into  the `qa` environment.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-action.png" 
url="/images/gitops-promotions/tutorials/dnd-action.png"
alt="Drag and drop `demo-trioapp-dev` to promote" 
caption="Drag and drop `demo-trioapp-dev` to promote"
max-width="60%"
%}

1. Commit the changes. 
  The Commit Changes page shows the action used for the promotion, the files, and the properties in the files that will be changed.
  Review the files and properties that will be updated as part of this promotion action.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-commit.png" 
url="/images/gitops-promotions/tutorials/dnd-commit.png"
alt="Commit changes for `demo-trioapp`" 
caption="Commit changes for `demo-trioapp`"
max-width="60%"
%}

## View release for product
After commit, the promotion mechanism automatically creates a release for the product, `demo-trioapp` in our case.
Here you can monitor how the promotion is orchestrated between the environments, `dev` to `qa`.

1. Click **View Release Details** to go to the release view.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-inital-release.png" 
url="/images/gitops-promotions/tutorials/dnd-inital-release.png"
alt="Running release for `demo-trioapp`" 
caption="Running release for `demo-trioapp`"
max-width="60%"
%}

When the release completes execution, go to Product > Releases to see the information and status for the release.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-releases-page.png" 
url="/images/gitops-promotions/tutorials/dnd-releases-page.png"
alt="Releases list with release entry for `demo-trioapp`" 
caption="Releases list with release entry for `demo-trioapp`"
max-width="60%"
%}


## What to do next
[Multi-environment sequential promotion]({{site.baseurl}}/docs/gitops-quick-start/promotion-scenarios/multi-env-sequential-flow/)

 
