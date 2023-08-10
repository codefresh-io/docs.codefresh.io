---
title:  "Application Groups for GitOps applications"
description: "View deployments of GitOps applications through Application Groups"
group: deployments
sub_group: gitops
toc: true
---

The Group view for GitOps applications is a simple and efficient way to focus on deployments of the specific apps you're interested in, amidst the potentially numerous apps within your enterprise.  
The Group view consolidates deployment information for all applications within the group, <!--- significantly improves the user experience by -->eliminating the need to navigate to and switch between the different applications for information. 

Being an integral part of the GitOps Apps dashboard means that you can easily navigate between the Groups and Applications tabs. 



## Working with Application Groups

Let's go thorough the set 

You need to first assign applications to one or more Groups.

* New applications  
  When creating the application, assign it to one or more existing Groups, or create a new Group for the application. See [Group settings]({{site.baseurl}}/docs/deployments/gitops/create-application/#groups).

  In this example, we are cre the Group when we create the application.


* Existing applications  
  Edit the application definitions in the Configuration tab and select the groups.



Grouping by region: 

For instance, you consider an E-Commerce product with front-end and back-end applications. The front-end application id deployned globally to different regions. Grouping these applications shows their deployment history in the same view and helps track their CI builds, PR, issue to better understand the relationship between  the impact of the changes 

Grouping by environment:


G


You have the flexibility to assign applications to multiple groups based on your requirements, and manage these assignments at any through the application's Configuration settings. Any changes to the Group has no impact on its applications. 





## Navigate to the Group view
After assigning applications to Groups, navigate to the Group tab in the GitOps Apps dashboard. 

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Click the **Groups** tab.

You can: 
* Filter by one or more applications to find the Groups they belong to.
* Star one or more application Groups as favorites for single-click access to them.{::nomarkdown}<br>Click <img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star a Group, and click <img src="../../../../images/icons/icon-fav-starred.png?display=inline-block"> to view starred Groups.{:}.
* Select a Group to view the Timelines of the applications. 
* Navigate to the Card view of the applications by clicking Applications. 



## Timelines by Group
When you select an applicatio Group, you are taken to the Timeline tab. 

The data in the Timeline tab is similar to that of an individual application, except it shows the collective deployments of all the applications in the Group. 

The same filters are available. 
the deployment chart displaying the day-to-day deployments for the selected time period, for all the applications in the Group.

The deployment records are sorted to show the current versions for each application.   the current The collective Timeline view eliminates the need to navigate through the Timelines of individual applications separately. The high-level perspective of multiple deployments of similar applications in the same view, together with the context for the deployments, makes it easier to identify trends or patterns across these applications.

The Timeline view for application Groups is similair to that 
You can filter by PR, Isueuns filters 
The deployment  Similar to the Timeline for an individual applicatoins, the  over the dot on the deployment chart for information on historical deployments.   
The deployments are sorted by date, with the most recent deployment of each application labeled **Current Version**. Every deployment record shows the related Build, PR, and Jira information. 

## Applications in Group 



## Update application assignments to Groups






1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application and then click the **Configuration** tab.
1. From **Groups**, do one of the following:
  * To add the application to one or more groups, select the group or groups.
  * To remove the application from a group, click the remove button for the group.