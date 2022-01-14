---
title: "Audit"
description: ""
group: administration
toc: true
---

CSDP platfrom is heavily based on the GitOps approach which means that by definition most entities are fully controlled via the GitOps approach.

Check out the [access control]({{site.baseurl}}/docs/administration/access-control/) page for more information about what and how entities are controlled via the GitOps approach.

There are different ways that a user can view and understand what operations and changes has been made

### Viewing the notification center
CSDP notification center will show a recent view of important changes that have been made to main entities like git sources
{% include
image.html
lightbox="true"
file="/images/administration/audit/notifications.png"
url="/images/administration/audit/notifications.png"
alt="Notifications"
caption="Notifications"
max-width="100%"
%}

### Viewing the update history change log
Each pipeline has a dedicated view for viewing the history of the changes that were made to all its underlying entities
{% include
image.html
lightbox="true"
file="/images/administration/audit/update-history.png"
url="/images/administration/audit/update-history.png"
alt="Update history"
caption="Update history"
max-width="100%"
%}


### Viewing audit log directly in your git provider

Due to the fact that GitOps controlled entities are fully controlled via changes in Git, it means that every such operation will be made by CSDP impersonating and pushing commits to your git sources.

You can navigate to your git source underlying repository and easily see all the commits that were made.

Each pipeline has a dedicated view for viewing the history of the changes that were made to all its underlying entities
{% include
image.html
lightbox="true"
file="/images/administration/audit/git-log.png"
url="/images/administration/audit/git-log.png"
alt="Git log"
caption="Git log"
max-width="100%"
%}

### Viewing a full centralized audit log view in account settings
In upcoming releases a full centralized audit log will be accessible to visualize all api operations in a centralized admin way.


