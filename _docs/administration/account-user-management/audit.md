---
title: "Auditing actions in Codefresh"
description: "Getlogs of all actions in Codefresh"
group: administration
sub_group: account-user-management
redirect_from:
  - /docs/administration/audit-logs/
  - /docs/enterprise/audit-logs/
toc: true
---

Codefresh keeps a log of all actions that happen at all times based on API calls that reach Codefresh.  
The time frames covered by audit logs depends on the pricing tier of your Codefresh account.  

The audit log includes:   
* UI actions from users
* [CLI](https://codefresh-io.github.io/cli/){:target="\_blank"} invocations
* Any [external integrations]({{site.baseurl}}/docs/integrations/codefresh-api/) used with Codefresh

You can:  
* View, filter, and search for audited events
* View API payload for an event
* Download the audit log file in CSV

## View audit logs
The Audit Log is divided into actions audited (All Audit), and tiggers and webhooks processed by Codefresh (Triggers).


1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. On the sidebar, from Access & Collaboration, select [**Audit**](https://g.codefresh.io/account-admin/audit/audit-all){:target="\_blank"}.  
1. To focus on a specific time frame, select the date range from the toolbar.  
  The All Audit tab includes all Codefresh events in your account, sorted by the most recent events.  
  Each event shows the following details:  
  * `Entity ID/Name`: The entity that was affected.
  * `Entity type`: The type of entity on which the action was action, such as user, team, build, pipeline, project, etc.
  * `Action`: The action that was taken on the entity.
  * `Status`: The result of the API call.
  * `User`: The name of the user who performed the action.
  * `Last Request`: The time of the event.


{% include image.html
lightbox="true"
file="/images/administration/audit/audit-logs.png"
url="/images/administration/audit/audit-logs.png"
alt="Audit Logs view"
caption="Audit Logs view"
max-width="70%"
%} 


The Triggers tab includes all the triggers/webhooks that were processed by Codefresh, with the same information as the Audit tab.

{% include image.html
lightbox="true"
file="/images/administration/audit/audit-triggers.png"
url="/images/administration/audit/audit-triggers.png"
alt="Audit Triggers view"
caption="Audit Triggers view"
max-width="70%"
%}


Both tabs have built-in paging and filtering.



### Filter audited events

Filter audited events to focus on a specific entity or user.

{% include image.html
lightbox="true"
file="/images/administration/audit/audit-filter.png"
url="/images/administration/audit/audit-filter.png"
alt="Filtering audit actions"
caption="Filtering audit actions"
max-width="40%"
%}


### Get more details for audited events

You can get the exact API payload for each event as it was sent to Codefresh, including the URL and other call parameters used for the selected event.

*  At the right of the row with the event, click the **More Details** (book) icon.


{% include image.html
lightbox="true"
file="/images/administration/audit/api-call-details.png"
url="/images/administration/audit/api-call-details.png"
alt="API call details for audited event"
caption="API call details for audited event"
max-width="40%"
%}



## Export audit logs

Export all audited events, both Audits and Triggers, to a  `CSV` file, for offline processing with your own tools or for viewing in external applications such as Microsoft Excel.

* On the top right of the toolbar, click **Download Audit**.
  The downloaded file includes in addition to the events themselves, the API call information (payload and parameters) for each event.



## Related articles
[Codefresh installation options]({{site.baseurl}}/docs/installation/installation-options/)  
[Configuring access Control]({{site.baseurl}}/docs/administration/account-user-management/access-control/)  
[Codefresh API integration]({{site.baseurl}}/docs/integrations/codefresh-api/)  
