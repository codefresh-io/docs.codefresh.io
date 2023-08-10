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



## Assign applications to Groups

You need to first to assign applications to a Group. 

Grouping by region: 

For instance, you consider an E-Commerce product with front-end and back-end applications. The front-end application id deployned globally to different regions. Grouping these applications shows their deployment history in the same view and helps track their CI builds, PR, issue to better understand the relationship between  the impact of the changes 

Grouping by environment:


G
* New applications  
  When creating the application, assign it to one or more existing Groups, or create a new Group for the application. See [Group settings]({{site.baseurl}}/docs/deployments/gitops/create-application/#groups).

* Existing applications  
  Edit the application definitions in the Configuration tab and select the groups.

You have the flexibility to assign applications to multiple groups based on your requirements, and manage these assignments at any through the application's Configuration settings. Any changes to the Group has no impact on its applications. 





## Navigate to the Group view
The Group is another tab in the GitOps Apps dashboard. 

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Click the **Groups** tab.

What can you do in the Groups tab?

*  Filter by one or more applications to find the Groups they belong to.
* Star one or more application Groups as favorites for single-click access to them.{::nomarkdown}<br>Select the <img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star a Group, and click <img src="../../../../images/icons/icon-fav-starred.png?display=inline-block"> to filter by them.{:}.
* Monitor the Timelines of the applications in a Group. 
* Navigate to the Card view of the applications by clicking Applications,

Find the Group you want
 to quickly access the starred Groups.<br><br>To filter by favorite Groups, select . <!--- ask if it affects any other views> 
   
   Selecting an application filters the list of groups to show the group or groups to which the application belongs.

Here's a description of the information you can see in the Groups tab of the GitOps Apps dashboard.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|Applications            | The application by which to filter the application groups. |
 |
| Sorting | Sort the Groups list either by group name or by the groups most recently updated.|
| Group name | The name of the application group with the number of applications it includes. <br>Selecting an application group, switches to Timeline tab with deployment information for every application in the Group. See  add here what happens on clicking an app group |

## Monitor deployments by application Groups
Monitor ongoing and historical deployments for an Application Group in the Timeline view specific to the group. 

The collective Timeline view eliminates the need to navigate through the Timelines of individual applications separately. The high-level perspective of multiple deployments of similar applications in the same view, together with the context for the deployments, makes it easier to identify trends or patterns across these applications.

The Timeline view for application Groups is similair to that of an individual application, except it shows the collective deployments for each of teh applications.
You can filter by PR, Isueuns filters 
The deployment chart displays the day-to-day deployments for the selected time period, for all the applications in the Group. Similar to the Timeline for an individual applicatoins, the  over the dot on the deployment chart for information on historical deployments.   
The deployments are sorted by date, with the most recent deployment of each application labeled **Current Version**. Every deployment record shows the related Build, PR, and Jira information. 

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Click the **Groups** tab, and then click an Application Group.  
  You are taken to the **Timeline** tab.
Clicking on an application group in the Group tab navigates to the list of applications in the Group.
You can see the collective timelines for all applications within the group, instead of the individual source, health, or target information for each application.

SCREENSHOT



## Update application assignments to Groups






1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application and then click the **Configuration** tab.
1. From **Groups**, do one of the following:
  * To add the application to one or more groups, select the group or groups.
  * To remove the application from a group, click the remove button for the group.