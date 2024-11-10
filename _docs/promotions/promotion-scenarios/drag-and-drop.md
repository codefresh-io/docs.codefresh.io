---
title: "Drag-and-drop promotion"
description: "Promote product apps between two environments"
group: promotions
toc: true
---

In this basic scenario, we'll see how to promote products in the Environments dashboard using drag-and-drop functionality. 
This quick, visual method allows you to move applications across two environments in a few simple steps.

##### Context
In the Environments dashboard, we see the `cf-101` product, in the `dev` and `qa` environments. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-prod-in-env.png" 
url="/images/gitops-promotions/tutorials/dnd-prod-in-env.png"
alt="`cf-101` product in Environments dashboard" 
caption="`cf-101` product in Environments dashboard"
max-width="60%"
%}


##### Linked applications
Mouse over `cf-101` displays the linked applications in each environment, `cf-101-dev` and `cf-101-qa`.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-apps-in-prod.png" 
url="/images/gitops-promotions/tutorials/dnd-apps-in-prod.png"
alt="`cf-101-dev` and `cf-101-qa` applications" 
caption="`cf-101-dev` and `cf-101-qa` applications"
max-width="60%"
%}

##### Product versions
`cf-101` has different versions in `dev` and `qa` environments.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-prod-versions.png" 
url="/images/gitops-promotions/tutorials/dnd-prod-versions.png"
alt="`cf-101` versions in environments" 
caption="``cf-101` versions in environments"
max-width="60%"
%}

##### Promotion with drag-and-drop
To promote, we'll drag `cf-101-dev` from `dev` and drop it into `cf-101` in the `qa` environment.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-action.png" 
url="/images/gitops-promotions/tutorials/dnd-action.png"
alt="Drag and drop `cf-101` to promote" 
caption="Drag and drop `cf-101` to promote"
max-width="60%"
%}

##### Commit changes page
The Commit Changes page shows the action used for the promotion, the files, and the properties in the files that will be changed.
Review the files and properties that will be updated as part of this promotion action.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-commit.png" 
url="/images/gitops-promotions/tutorials/dnd-commit.png"
alt="Commit changes for `cf-101`" 
caption="Commit changes for `cf-101`"
max-width="60%"
%}

##### Release creation and completion
After commit, a release is automatically created for `cf-101` with a new Release ID.  
Clicking **View Release Details** takes you to the release view.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-inital-release.png" 
url="/images/gitops-promotions/tutorials/dnd-inital-release.png"
alt="Running release for `cf-101`" 
caption="Running release for `cf-101`"
max-width="60%"
%}

Wait for the release to complete, and then return to the Releases page to view the Release ID updated with the current status.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-releases-page.png" 
url="/images/gitops-promotions/tutorials/dnd-releases-page.png"
alt="Releases list with new release for `cf-101`" 
caption="Releases list with new release for `cf-101`"
max-width="60%"
%}

## Related articles
[Explore promotion scenarios]({{site.baseurl}}/docs/promotions/promotion-scenarios/)

 
