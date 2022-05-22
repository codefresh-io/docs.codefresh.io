---
title: "Applications dashboard"
description: ""
group: deployment
toc: true
---

View, monitor, and analyze deployments across your enterprise in the Applications dashboard. As a one-stop shop for Argo Rollouts and Argo CD in Codefresh, the Applications dashboard delivers on the challenge of keeping track of deployments, whatever the frequency and scale. A wide range of filters, enriched CI and CD information, provide full traceability and visibility to continuous deployments. 



Here are some insights you can derive from the Applications dashboard:   
* Visibility into deployments from all the clusters associated with the provisioned runtimes, in-cluster and managed
* Timeline on current and historical deployments 
* Enriched CI information for deployments, including links to container images, Git hashes correlated with feature requests, Jira issues
* Microservices deployed by the application
* Hierarchical view of the resources in the application in the Current State



### Applications main view

The main view shows all deployed applications, sorted by the most recent deployments (default).   

Here is an example of the main page in the Applications dashboard. 

  {% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="Applications Dashboard"
caption="Applications Dashboard"
max-width="70%"
%}  

#### Application inventory and state 

The application state snapshot shows at a glance both the total number of applications that are deployed and their breakdown according to state.

> The state snapshot works also as a quick filter. Selecting a state filters the application view by that state.

####  Filters and favorites
Similar to other dashboards, the Applications dashboard also offers a set of filters designed to bring you the information you need as quickly as possible.  
You can also mark applications as favorites to focus on the applications of interest.

**Filters**  

Filters are divided into frequently used and advanced filters.
* Frequently-used filters: Available at the top of the dashboard. These filters support multi-selection, and results are based on an OR relationship within the same filter with multiple options, and an AND relationship between filters.
* Advanced filters: Available on selecting **More Filters**. These filters include application type, health, and labels. 

  * Application type  
    Applications and ApplicationSet
    
  * Health filters  
    The built-in Argo CD set of health filters.  
    For more information, see [Health sets](https://argo-cd.readthedocs.io/en/stable/operator-manual/health/){:target="\_blank"}. 

  
  * Labels  
    The K8s labels defined for the applications. The list displays labels of _all_ the applications, even if you have applied filters.

    To see the available labels, select **Add**, and then select the required label and one or more values.  
    To filter by the labels, select **Add** and then **Apply**.  

    For more information, see [Labels and selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/){:target="\_blank"}.

    {% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-adv-filters.png"
url="/images/applications/app-dashboard-adv-filters.png"
alt="Advanced filters in Applications Dashboard"
caption="Advanced filters in Applications Dashboard"
max-width="70%"
%}


**'Favorite' applications**  

Mark applications as favorites, and view them with a click.  
* Select the {::nomarkdown}<img src="../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/} to the left of the application name to mark it as a favorite. 
* To view only favorites, on the filters bar, select {::nomarkdown}<img src="../../../images/icons/icon-fav-starred.png?display=inline-block">{:/}.



#### Deployment type
Applications are displayed according to their deployment type which can be one of the following:
* Applications  
  Standalone applications. For more information, see [Applications](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#applications){:target="\_blank"}.  

  {% include
image.html
lightbox="true"
file="/images/applications/apps-standalone.png"
url="/images/applications/apps-standalone.png"
alt="Standalone applications in Applications Dashboard"
caption="Standalone applications in Applications Dashboard"
max-width="70%"
%}

* Application set  
  Based on the Argo CD's ApplicationSet CRD, where several applications are always deployed as a set. For more information, see [Generating Applications with ApplicationSet](https://argo-cd.readthedocs.io/en/stable/user-guide/application-set/){:target="\_blank"}.

  {% include
image.html
lightbox="true"
file="/images/applications/app-appset-model.png"
url="/images/applications/app-appset-model.png"
alt="Application Set in Applications Dashboard"
caption="Application Set in Applications Dashboard"
max-width="70%"
%}
  
* App-of-apps  
  In this deployment model, the parent application deploys a set of child applications.  For more information, see [App of Apps](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#app-of-apps){:target="\_blank"}. 

{% include
image.html
lightbox="true"
file="/images/applications/app-appofapps-model.png"
url="/images/applications/app-appofapps-model.png"
alt="App of Apps in Applications Dashboard"
caption="App of Apps in Applications Dashboard"
max-width="70%"
%}


### Application timeline 
The Timeline tab displays the history of deployments for the selected application, sorted by the most recent update (default), and enriched with image, Pull Request (PR), Jira issues, and commit information, for each deployment. 

Each application displays up to ten of the most recent deployments through deployment cards. 

{% include
image.html
lightbox="true"
file="/images/applications/apps-dashboard-timeline-collapsed.png"
url="/images/applications/apps-dashboard-timeline-collapsed.png"
alt="Applications Dashboard: Timeline tab"
caption="Applications Dashboard: Timeline tab"
max-width="70%"
%}



**Filters**  

View the subset of deployments of interest to you. Filter by Date range, PRs, issues, committers, and more.  

**Deployment chart**  

View day-to-day deployment information for the selected time period. The deployment chart is useful to get information on historical deployments, as deployment cards are shown for up to ten of the most recent deployments.  

* To jump to a specific deployment, click the dot on the chart that represents the deployment. 
* To see GitOps details, mouse over the dot that represents the deployment. 

{% include
image.html
lightbox="true"
file="/images/applications/apps-historical-deployment.png"
url="/images/applications/apps-historical-deployment.png"
alt="Applications Dashboard: Deployment chart"
caption="Applications Dashboard: Deployment chart"
max-width="70%"
%}

**Deployment card**  

Each deployment card displays the complete history of that deployment, by Git hash, Kubernetes services, Argo rollouts and applications:

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-time-expanded-card.png"
url="/images/applications/app-dashboard-time-expanded-card.png"
alt="Applications Dashboard: Deployment card in Timeline tab"
caption="Applications Dashboard: Deployment card in Timeline tab"
max-width="70%"
%}

* The **CI Builds** showing the image(s) created or updated during deployment. Click to see the **Images** view in a browser window.
* The **Pull Request (PRs)** used for the commit.
* The Jira **Issues** the PR aims to resolve or has resolved, with the current status.
* The **Committer** who made the changes.
* The Kubernetes **Services** updated during the deployment, according to the Argo rollout strategy, and the current rollout status. 
  The example above shows the rollouts according to the canary rollout strategy. The blue line shows the progress of rollout with the current step versus the total number of steps.  
  Expanding the live version deployment shows the number of replicas currently deployed in the stable version (green).
* The Argo **Applications** updated during this deployment.


### Application services
The Services tab for an application shows the K8s services for each deployment of the application. 
Each service shows the number of replicas, the endpoint IP, the labels that reference the application, and the health status.  

For more information, see [Services](https://kubernetes.io/docs/concepts/services-networking/service/){:target="\_blank"}.

{% include
image.html
lightbox="true"
file="/images/applications/apps-dashboard-services.png"
url="/images/applications/apps-dashboard-services.png"
alt="Applications Dashboard: Services tab"
caption="Applications Dashboard: Services tab"
max-width="70%"
%}

### Application current state
The Current State tab for an application shows the live state of all the application's resources (Kubernetes objects) in the cluster, in a hierarchical view, sorted by the Last Update.
Every resource is identified by a unique icon and an indication of the K8s resource type. 

{% include
image.html
lightbox="true"
file="/images/applications/apps-current-state.png"
url="/images/applications/apps-current-state.png"
alt="Applications Dashboard: Current State tab"
caption="Applications Dashboard: Current State tab"
max-width="70%"
%}

You can filter by:
* **Kind**: The type of Kubernetes resource. 
* **Health**: The status of the resource.

For more information, see [Working with Kubernetes objects](https://kubernetes.io/docs/concepts/overview/working-with-objects/){:target="\_blank"}.

