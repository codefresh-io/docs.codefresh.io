---
title:  "Application Groups for Argo CD applications"
description: "View deployment info for Argo CD applications through Application Groups"
group: deployments
sub_group: gitops
toc: true
---


The **Group** view for Argo CD applications in Codefresh GitOps is a streamlined way to focus on deployments of specific application. Instead of navigating between individual applications, the Group view consolidates deployment data, making it easier to track the applications. 

Groups are flexible and customizable, allowing you to organize applications based on your organization’s needs. Each Group is defined as an annotation in the application manifest, functioning like a tag.

{% include image.html 
lightbox="true" 
file="/images/applications/app-groups/app-group-timeline.png" 
url="/images/applications/app-groups/app-group-timeline.png" 
alt="Example of the Timeline view for an Application Group"
caption="Example of the Timeline view for an Application Group"
max-width="60%" 
%}

Assign applications to one or more Groups when creating them or update existing applications through the Configuration settings. Changes to Groups do not affect the applications themselves.

Additionally, you can monitor and manage applications in Groups from the Environments and Products dashboards after creating [environments]({{site.baseurl}}/docs/environments/create-manage-environments/) and [products]({{site.baseurl}}/docs/products/create-product/).



## Working with Application Groups


### Assign applications to Application Groups

You must first assign applications to one or more Groups.  
Applications can belong to multiple Groups, and you can update these assignments at any time.

 


* **New applications**  
  When creating an application, assign it to one or more existing Groups, or create a new Group for the application. See [Group settings]({{site.baseurl}}/docs/deployments/gitops/create-application/#groups).

         {% include image.html 
lightbox="true" 
file="/images/applications/app-groups/assigning-new-app.png" 
url="/images/applications/app-groups/assigning-new-app.png" 
alt="Assigning a new application to a Group"
caption="Assigning a new application to a Group"
max-width="60%" 
%}



* **Existing applications**  
  Edit the General settings in the **Configuration** tab and select the groups.  
  See [Groups in General Configuration settings]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings#group).

     {% include image.html 
lightbox="true" 
file="/images/applications/app-groups/assigning-existing-app.png" 
url="/images/applications/app-groups/assigning-existing-app.png" 
alt="Assigning an existing application to a Group"
caption="Assigning an existing application to a Group"
max-width="60%" 
%}


When an application is assigned to a Group, Codefresh adds an annotation to its manifest.  
Example:

```yaml
name: example-usa
  finalizers:
    - resources-finalizer.argocd.argoproj.io/foreground
  annotations:
    codefresh.io/app-group: three-regions
spec:
  project: default
  source:
```


### Navigate to the Group view
After assigning applications to Groups, navigate to the Groups tab in the GitOps Apps dashboard. 

1. In the Codefresh UI, from the sidebar, select **GitOps Groups**.
1. Click the **Groups** tab.

{% include image.html 
lightbox="true" 
file="/images/applications/app-groups/app-group-page.png" 
url="/images/applications/app-groups/app-group-page.png" 
alt="Application Group"
caption="Application Group"
max-width="60%" 
%}

You can: 
* Filter by one or more applications to find the Groups they belong to.
* Star one or more Application Groups as favorites for single-click access to them.{::nomarkdown}<br>Click <img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star a Group, and click <img src="../../../../images/icons/icon-fav-starred.png?display=inline-block"> to view starred Groups.{:}.
* Select a Group to view the Timelines of the applications in it. 
* Navigate to the Card views of its applications by clicking Applications. 



### Monitor application Timelines by Group
Select a Group to view the Timelines of the applications in the group. The data shows the collective deployments of all the applications in the Group. 

The deployment chart displays the deployment history for the selected time period for all the applications in the Group.
The deployment records are sorted to show the current versions for each application.  As with deployments for individual applications, to pull up a specific historicial deployment, click the dot corresponding to that deployment in the chart.

 The deployments are sorted by date, with the most recent deployment of each application labeled **Current Version**. Every deployment record shows the related Build, PR, and Jira information. 


{% include image.html 
lightbox="true" 
file="/images/applications/app-groups/app-group-timeline-2.png" 
url="/images/applications/app-groups/app-group-timeline-2.png" 
alt="Application Group: Timeline view"
caption="Application Group: Timeline view"
max-width="60%" 
%}








### Monitor applications by Group 

To get information on the health and sync statuses of individual applications in the Group, click the Applications tab next to the Timeline tab.
Here you can see a Card view of each application with key information for each.

{% include image.html 
lightbox="true" 
file="/images/applications/app-groups/app-group-card-view.png" 
url="/images/applications/app-groups/app-group-card-view.png" 
alt="Application Group: Card view"
caption="Application Group: Card view"
max-width="60%" 
%}



## Manage Application Groups
Add or remove an application from the Group or Groups it belongs to. Changes to Application Groups do not affect the applications which are part of the Groups.

Groups exist as metadata annotations in application manifests, so deleting a Group requires removing the annotation from all applications assigned to it. Once no applications reference the Group, it is not displayed in the GitOps Apps dashboard.

## Related articles
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/)  
[Managing Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
{% if page.collection != site.gitops_collection %}[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/){% endif %}  
