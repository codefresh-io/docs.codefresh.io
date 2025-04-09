---
title: "Products dashboard"
description: "Create Products to group and manage interrelated Argo CD applications environments"
group: dashboards
toc: true
---




Explore the power of Products for Argo CD applications in Codefresh GitOps. 

Managing complex applications across multiple environments is a common challenge faced by developers and platform engineers. The diverse nature of applications and the variety of environments they deploy to can lead to fragmented management and deployment processes.

In Codefresh GitOps, Products serve as a strategic layer that bridges this gap. Products group different yet interconnected applications based on their similarities and dependencies. 


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products (expanded view)" 
	caption="GitOps Products (expanded view)"
  max-width="70%" 
%}

Read more on the first of their kind dashboards for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.

This article focuses on the Product Dashboard and the insights you can gain from it. 

For detailed information on creating products and how to work with them, see [About Products]({{site.baseurl}}/docs/products/about-products/) and [Creating products]({{site.baseurl}}/docs/products/create-product/).

<!--- >>**NOTE**  
In the documentation, both Product (capitalized) and product (lowercase) refer to the same entity in Codefresh GitOps. They are used interchangeably for readability and consistency.
-->

## Products page

Here's an example of the Product page with the list of all the products.


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products (expanded view)" 
	caption="GitOps Products (expanded view)"
  max-width="60%" 
%}


 

Here are some key features of the Products page:

### Collapsed & expanded views
* **Collapsed view**: The default view, displays the product name alongside the environments with the number of applications in each environment.<br> The options on the right allow you to manage products.  
* **Expanded view**: The expanded view displays the applications in the product organized by their environments.

### Product management options
Mouse over the row with the product to display possible actions:
{::nomarkdown}<ul><li><img src="../../../images/icons/edit.png?display=inline-block"> <b>Edit</b>: Takes you to the Product > Settings tab where you can configure . See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete product</a>.</li><li><img src="../../../images/icons/settings.png?display=inline-block"> <b>Manage applications</b>: Manually assign unassigned applications to environments in the Products dashboard. See <a href="https://codefresh.io/docs/docs/products/assign-applications">Manually assign applications to products</a>.</li><li><img src="../../../images/icons/trash.png?display=inline-block"> <b>Delete</b>: Remove the product from the Products dashboard, unassigning any manually-assigned applications. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete product</a>.</li></ul>{:/} 




## Product dashboard
Clicking a Product name navigates you to the Product Dashboard for the selected product with a detailed view of its applications. It also includes integrated insights into Git and issue-tracking systems and how they relate to deployments. 
 

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

