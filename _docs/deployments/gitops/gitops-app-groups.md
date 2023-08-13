---
title:  "Application Groups for GitOps applications"
description: "View deployments of GitOps applications through Application Groups"
group: deployments
sub_group: gitops
toc: true
---

The Group view for GitOps applications is a simple and efficient way to focus on deployments of the specific apps you're interested in, amidst the potentially numerous apps within your enterprise.  
The Group view consolidates deployment information for all applications within the group, <!--- significantly improves the user experience by -->eliminating the need to navigate to and switch between the different applications for information on them. 

{% include image.html 
lightbox="true" 
file="/images/applications/app-groups/app-group-timeline.png" 
url="/images/applications/app-groups/app-group-timeline.png" 
alt="Example of the Timeline view for an Application Group"
caption="Example of the Timeline view for an Application Group"
max-width="60%" 
%}

Assign applications to one or more Groups on creating new applications, or through the Configuration settings for existing applications. Changes to the Group have no impact on its applications.  

Application Groups is an integral part of the [GitOps Apps dashboard]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/), which makes it easy to navigate between group views and individual applications. 

{% include image.html 
lightbox="true" 
file="/images/applications/app-groups/app-group-timeline.png" 
url="/images/applications/app-groups/app-group-timeline.png" 
alt="Example of the Timeline view for an Application Group"
caption="Example of the Timeline view for an Application Group"
max-width="60%" 
%}


## Working with Application Groups

How would you work with an Application Group?

1. You need to first assign applications to one or more Groups.
   Assign applications to multiple groups based on your requirements and organizational structure. Manage these assignments at any through the application's Configuration settings. Changes to the Group have no impact on its applications.  

   <!--- TBD examples of app groups  -->



  * **New applications**  
    When creating the application, assign it to one or more existing Groups, or create a new Group for the application. See [Group settings]({{site.baseurl}}/docs/deployments/gitops/create-application/#groups).

    In this example, we will create the Group when we create the application.




  * **Existing applications**  
    Edit the application definitions in the [Configuration]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-application-definitions) tab and select the groups.

     {% include image.html 
lightbox="true" 
file="/images/applications/app-groups/assigning-existing-app.png" 
url="/images/applications/app-groups/assigning-existing-app.png" 
alt="Assigning an existing application to a Group"
caption="Assigning an existing application to a Group"
max-width="60%" 
%}




## Navigate to the Group view
After assigning applications to Groups, navigate to the Groups tab in the GitOps Apps dashboard. 

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
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
* Navigate to the Card view of its applications by clicking Applications. 



## Timelines by Group
When you select an application Group, you are taken to the Timeline tab. The data in the Timeline tab is similar to that of an individual application, except it shows the collective deployments of all the applications in the Group. 


{% include image.html 
lightbox="true" 
file="/images/applications/app-groups/app-group-timeline-2.png" 
url="/images/applications/app-groups/app-group-timeline-2.png" 
alt="Application Group: Timeline view"
caption="Application Group: Timeline view"
max-width="60%" 
%}

You have filters to narrow the same filters are available. 


The deployment chart displays the deployment history for the selected time period for all the applications in the Group.
The deployment records are sorted to show the current versions for each application.  As with deployments for individual applications, to pull up a specific historicial deployment, click the dot corresponding to that deployment in the chart.

 The deployments are sorted by date, with the most recent deployment of each application labeled **Current Version**. Every deployment record shows the related Build, PR, and Jira information. 



## Applications by Group 

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



## Update application assignments to Groups
At any time, add or remove an application from the Group or Groups it belongs to. Changes 

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application and then click the **Configuration** tab.
1. From **Groups**, do one of the following:
  * To add the application to one or more groups, select the group or groups.
  * To remove the application from a group, click the remove button for the group.

## Related articles
[Create GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)  
[Monitoring GitOps applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard)  
[Managing GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application)  
[Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  