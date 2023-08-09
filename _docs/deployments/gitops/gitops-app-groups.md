---
title:  "Application Groups for GitOps applications"
description: "View deployments of GitOps applications through Application Groups"
group: deployments
sub_group: gitops
toc: true
---


The GitOps Apps dashboard is your one-stop shop for monitoring and managing GitOps applications across clusters in the enterprise. Even with its sophisticated viewing and filtering capabilities, focusing on a specific set  of applications among  a multitude of applications.

The Group view, is a simple and efficient way to focus on deployments of the specific apps you're interested in, amidst potentially numerous apps within your enterprise.  The Group view consolidates deployment information for all applications within a group, <!--- significantly improves the user experience by -->eliminating the need to navigate to and switch between different applications to get the information. 

As it is part of the GitOps Apps dashboard, not only does is the navigation seamless the Group view ensures seamless navigation between the Groups and Applications tabs, and the information is .


  See [Application Group information](#application-group-information).
screenshot 

## Assign applications to Groups
You can either assign a new application to a Group when you create the applicationWhen you create a new application, you can either assign it to one or more existing groups, or create a new Group and assign it to that Group.

For exising applciationd a yet unassigned to a Group, you can edit the application definitions in the Configuration tab,and select the Gorups.
See

Once you assign an application to a group, you can add it to or remove it from different Application Groups through the application's Configuration settings.
## Go to the Gorup  Application Groups
1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Click the **Groups** tab.


### Application Group information


Here's a description of the information you can see for Application Groups in the Groups tab of the GitOps Apps dashboard.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|Applications            | The application by which to filter the application groups. Selecting an application filters the list of groups to show the group or groups to which the application belongs.|
|{::nomarkdown}<img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/}| Star one or more application groups as favorites and view only the starred groups.{::nomarkdown}<br>Select the <img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star an application group as a favorite.<br><br>To filter by favorite Groups, select <img src="../../../../images/icons/icon-fav-starred.png?display=inline-block">. <!--- ask if it affects any other views>  |
| Sorting | Sort the Groups list either by group name or by the groups most recently updated.|
| Group name | The name of the application group with the number of applications it includes. <br>Selecting an application group, switches to Timeline tab with deployment information for every application in the Group. See  add here what happens on clicking an app group |

## Monitor deployments by Application Group
Monitor ongoing and historical deployments for an Application Group in the Timeline view specific to the group. 

The collective Timeline view eliminates the need to navigate through the Timelines of individual applications separately. The high-level perspective of multiple deployments of similar applications in the same view, together with the context for the deployments, makes it easier to identify trends or patterns across these applications.

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