
Unveiling the value proposition of Codefresh GitOps

Let's start from the top


Argo CD applications in GitOps Apps 


## GitOps Apps dashboard: Your command center for application management

As a one-stop shop for Argo CD and Argo Rollouts, the GitApps dashboard tackles the challenge of keeping track of your applications and their deployments, whatever the frequency and scale, across all clusters in your enterprise. 

DevOps engineers get a consolidated bird's-eye view of the applications under your care.  Flexible view formats, a wide range of filters, progressive delivery views, and enriched CI and CD information, provide full traceability and visibility of deployments. 

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard: List view"
caption="GitOps Apps dashboard: List view"
max-width="70%"
%}



### Global details

#### Flexible viewing options
View applications in List or Card views, and tailor the information displayed to just what you need with our customizable filters. 


For a hierarchical structure of your applications, switch to List view. The Card view presents applications as a flat list. 

Whichever the view format, a wide range of filters, application- and attribute-based, allow you to customize the data.

Application-based and attribute-based filters. 
The Health status filter brings you a snapshot of deployed applications by their health status. Simply click the status to view the applications with the status. 
Attribute-based filters include Application Type, Clusters, Namespaces and more. 

#### Warnings & errors
Stay on top of issues with instant alerts for problematic applications through the Warnings/Errors button. Whether it's Argo CD-generated errors or custom warnings from Codefresh.

SCREENSHOT

#### Convenient access to actions
* Effortless management  
  Need to take action for a specific application in the GitOps Apps dashboard? Easily take action using the context menu for quick access to commonly-used options, such as diff views, manual sync, edit, refresh, and delete.

* Discrepancy detection with Diff View  
  Spot disparities between desired and live states with the Diff View option in the context menu. Get a visual representation of discrepancies between the desired and live states for out-of-sync applications to troubleshoot issues more effectively.

SCREENSHOT

###  Drill-down 
Dive deeper into individual applications to explore resource states, deployments, configuration, and more. We have dedicated tabs for every aspect of application management.

Here we'll call out tow 

Here are 

#### Instant insights with Application Header
The Application Header provides at-a-glance information on health and sync statuses, plus handy links for more details. 
No matter which tab you navigate to, the Application Header is always in view for always-on access to crucial information.  

Instantly get insights into health and sync statuses, auto-sync enabled/disabled indication, and convenient access to repos via handy links.

SCREENSHOT

#### Monitor live states of app resources
The Current State tab, which is where you get to on drill down to an app, is where as its =title indicates .  Keep track of resources, manifests, and logs, in  hierarchical Tree or flat List views.
in a hierarchical tree view when you have complex deployments with multiple clusters and large numbers of resources or as a flat it. 

Quick actions with Every resource comes with its own context menu, offering options for quick intervention. 



The GitOps Apps Dashboard is your go-to hub for application management, offering unparalleled visibility and control. 
Codefresh GitOps comes with additional dashboards to round out or complement information. Two such dashboards 

## DORA Metrics dashboard: Unlock performance insights

The DORA Metrics dashboard is your key to optimizing your software delivery pipeline. Codefresh supports DORA metrics out-of-the-box 

Platform managers
By monitoring DORA metrics, platform managers can gain insights into team efficiency, identify areas for improvement, and track the impact of process changes over time. This data-driven approach enables organizations to optimize their software delivery pipelines and achieve higher levels of performance and productivity.

DevOps engineers benefit from actionable insights into their development processes, empowering them to identify areas for optimization and enhance collaboration.rs
 gain valuable visibility into team efficiency and effectiveness, enabling data-driven decision-making and fostering a culture of continuous improvement. 
 
 Scenario:
Imagine you're a DevOps engineer responsible for managing the deployment of an e-commerce application. You regularly monitor the application's performance and health using the GitOps Apps Dashboard, which provides a consolidated view of all applications under your care.

For example, correlating a significant increase in deployment lead time for an application in the GitOps Apps Dashboard can lead you to discover that spike in the lead time spike coincides with an uptick in deployment frequency and a higher change failure rate, as indicated by the DORA Metrics Dashboard. This suggests that the team's recent efforts to increase deployment velocity may have inadvertently introduced instability into the deployment process.

Armed with this insight, you collaborate with the development team to identify the root cause of the issue. Through discussions and analysis, you determine that the surge in deployment frequency has led to a higher risk of introducing bugs and errors into the production environment.

As a result, you work with the team to implement stricter testing protocols and improve automation in the deployment pipeline. Over time, you observe a gradual decrease in lead time, accompanied by improvements in deployment frequency and change failure rate, as reflected in the DORA Metrics Dashboard.

By leveraging data from both the GitOps Apps Dashboard and the DORA Metrics Dashboard, you were able to identify potential bottlenecks in the deployment process, collaborate effectively with the development team, and implement targeted improvements to enhance overall delivery efficiency and stability. This scenario highlights how the actionable insights derived from correlating data across dashboards can drive continuous improvement and optimize software delivery pipelines.
 Development teams will  With metrics like lead time, deployment frequency, change failure rate, and mean time to recover (MTTR), everyone from executives to individual contributors can align their efforts to drive DevOps excellence and accelerate delivery cycles.

## Images dashboard for streamlined con
The Images Dashboard streamlines container management for DevOps teams and infrastructure administrators by providing a centralized hub for monitoring and managing container images. Development teams will gain visibility into image versions and deployment locations, enabling them to ensure consistency and reliability across their applications. Operations teams will benefit from real-time insights into image lifecycle statuses and security vulnerabilities, empowering them to proactively manage containerized environments and mitigate risks. Whether you're orchestrating deployments, managing infrastructure, or ensuring compliance, the Images Dashboard equips you with the tools you need to streamline operations and enhance security.

### DORA 





