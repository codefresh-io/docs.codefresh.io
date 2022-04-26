---
title: "Audit"
description: ""
group: administration
toc: true
---

Most entities in Codefresh are GitOps-compliant, and fully controlled via the GitOps approach. 

For information on which entities and how they are controlled, review [access control]({{site.baseurl}}/docs/administration/access-control/).  

Audit logs are available for GitOps-compliant entities.  

View audit logs:  

* Of Git Sources, in the **Notifications** panel
* Of pipeline entities, in the **Update History** tab
* In your Git repository

### Git Source changes in Notifications
The **Notifications** panel is a pull-down panel, always available in the Codefresh toolbar. The panel shows a recent view of changes to entities such as Git Sources.


{% include
image.html
lightbox="true"
file="/images/administration/audit/notifications.png"
url="/images/administration/audit/notifications.png"
alt="Git Sources change log in Notifications"
caption="Git Sources change log in Notifications"
max-width="30%"
%}

### Pipeline entity changes in Update History 
When you drill down into a pipeline, the **Update History** tab shows the list of changes to all its underlying entities.

{% include
image.html
lightbox="true"
file="/images/administration/audit/update-history.png"
url="/images/administration/audit/update-history.png"
alt="Pipeline entity change log in Update History"
caption="Pipeline entity change log in Update History"
max-width="30%"
%}


### Git repo change log

A change to a GitOps-controlled resource in Codefresh is made by Codefresh impersonating and pushing commits to your Git Sources.
The Git repository linked to the Git Source shows all the commits. 

{% include
image.html
lightbox="true"
file="/images/administration/audit/git-log.png"
url="/images/administration/audit/git-log.png"
alt="Git repo change log"
caption="Git repo change log"
max-width="30%"
%}

### (Future) Centralized audit log in account settings
We plan to create a centralized location from which to view all API operations.

