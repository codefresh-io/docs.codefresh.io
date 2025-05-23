---
title: "Products dashboard"
description: "Explore the Products page for insights and management options"
group: dashboards
toc: true
---




Explore the power of products for Argo CD applications in Codefresh GitOps. 

Managing complex applications across multiple environments is a common challenge faced by developers and platform engineers. The diverse nature of applications and the variety of environments they deploy to can lead to fragmented management and deployment processes.
In Codefresh GitOps, products serve as a strategic layer that bridges this gap. Products group different yet interconnected applications based on their similarities and dependencies. 

 {% include 
   image.html 
   lightbox="true" 
   file="/images/gitops-products/products-dashboard-view.png" 
   url="/images/gitops-products/products-dashboard-view.png" 
   alt="Products dashboard" 
   caption="Products dashboard" 
   max-width="60%" 
   %}

Read more on the first of their kind dashboards for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.

This article focuses on the two product dashboards: the **Products dashboard**, which lists all products, and the **Product Dashboard**, available when you drill down into a specific product.  

For detailed information on creating products and how to work with them, see [About Products]({{site.baseurl}}/docs/products/about-products/) and [Creating products]({{site.baseurl}}/docs/products/create-product/).


## Products dashboard

The Products dashboard lists all the products created for the account and key information on their releases. 


 {% include 
   image.html 
   lightbox="true" 
   file="/images/gitops-products/products-page.png" 
   url="/images/gitops-products/products-page.png" 
   alt="Products page with product and release information" 
   caption="Products page with product and release information" 
   max-width="60%" 
   %}


### Product release information

View information on the latest release at a glance: release activity and manage your products more efficiently.
* **Latest Release**, date and time
* **User** who initiated the latest release
* **Status** of the latest release 
* **Direct link** to the release view

### Product information and actions
* **Product name**: Click to go to the Product dashboard for the selected product.
* {::nomarkdown}<img src="../../../images/icons/settings-outlined.png?display=inline-block"> <b>Product Settings</b>: Takes you to the Product > Settings tab where you assign applications, configure promotion settings. See <a href="https://codefresh.io/docs/docs/products/configure-product-settings/">Configure product settings</a>.{:/}  
* {::nomarkdown}<img src="../../../images/icons/list.png?display=inline-block"> <b>Releases</b>: Takes you to the Product > Releases tab with the list of releases for the product. See <a href="https://codefresh.io/docs/docs/products/releases-in-products/">Releases for products</a>.{:/}  
* {::nomarkdown}<img src="../../../images/icons/trash.png?display=inline-block"> <b>Delete</b>: Removes the product from the Products dashboard, unassigning any manually-assigned applications.{:/}

 


## Product Dashboard
Clicking a product name navigates you to the Product Dashboard for the selected product with a detailed view of its applications. It also includes integrated insights into Git and issue-tracking systems and how they relate to deployments. 
 

##### Application release version
* Version information, currently supported for Helm-based applications, identifies the specific release of the application in different environments.
* Clicking the version displays the application's dependencies, enabling comparison across different applications.

##### Integrated Pod/Git/Feature information
* The Products dashboard correlates sync information with other parts of the software lifecycle, such as issue-tracking systems.
* Switch between Pods, Git, and Features views to gain insights beyond development, including source code commits, affected services, commit authorship, and incorporated features in releases. 

See [Integrated insights with pod, Git and feature views](#integrated-insights-with-pod-git-feature-views).


##### Manage applications
Manage individual applications without navigating away from the Product Dashboard. The actions available mirror those in the GitOps Apps dashboard. 


## Integrated insights with Pod, Git, Feature views  
Navigate seamlessly between Kubernetes (Pods), [version] control (Git), and issue-tracking (Features) views for the Product to get consolidated data from the same location.



### Pods
Deployment, Rollout, and Promotion information for the application.
* Deployments: Source image, new image and tag, replicas for each deployment
* Rollouts: The services rolled out, the type of rollout, the result of the rollout, promote/pause rollout action
* Promotion: The change that resulted in the promotion, with details on who committed the change, and the commit hash
* Cluster and Namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/product-dashboard.png" 
	url="/images/gitops-products/product-dashboard.png" 
	alt="Product Dashboard: Pod view with deployments" 
	caption="Product Dashboard: Pod view with deployments"
  max-width="60%" 
%}

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/pod-view-rollouts.png" 
	url="/images/gitops-products/pod-view-rollouts.png" 
	alt="Product Dashboard: Pod view with Rollouts" 
	caption="Product Dashboard: Pod view with Rollouts"
  max-width="60%" 
%}

### Git
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
	file="/images/gitops-products/product-dashboard-git-view.png" 
	url="/images/gitops-products/product-dashboard-git-view.png" 
	alt="Product Dashboard: Git view" 
	caption="Product Dashboard: Git view"
  max-width="60%" 
%}

### Features
Connect commits to the application repo to tickets in your issue-tracking tool or system. This integration enhances traceability and context, enabling you to monitor the deployment’s impact by tying deployed features to specific feature requests or bug fixes.
* Gain insights into deployment specifics
* Review all commits leading up to the latest one that triggered the deployment
* Align deployed features with related feature requests

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/product-dashboard-features.png" 
	url="/images/gitops-products/product-dashboard-features.png" 
	alt="Product Dashboard: Features view" 
	caption="Product Dashboard: Features view"
  max-width="60%" 
%}









## Related articles
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
{% if page.collection != site.gitops_collection %}[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/){% endif %}  

