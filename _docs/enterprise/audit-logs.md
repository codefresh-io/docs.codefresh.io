---
title: "Audit Logs"
description: "Get a list of all actions in Codefresh"
group: enterprise
toc: true
---

Codefresh keeps a log of all actions that happen at all times. The log is actually based on API calls that reach Codefresh, so it includes

* GUI actions from users
* [CLI](https://codefresh-io.github.io/cli/) invocations
* Any [external integrations]({{site.baseurl}}/docs/integrations/codefresh-api/) you are using with Codefresh

The time period offered by audit logs depends on the pricing tier of your Codefresh account.


## Viewing Audit logs

To access the Audit logs click on *Account settings* on the left sidebar and then select *Audit* under *User Management*


{% include image.html
lightbox="true"
file="/images/enterprise/audit/audit-logs.png"
url="/images/enterprise/audit/audit-logs.png"
alt="Audit Logs view"
caption="Audit Logs view"
max-width="70%"
%}

This screen contains a reverse chronological list of all Codefresh events that happened on your account. For each event, the following are recorded:

* `Entity ID/Name` - which entity was affected.
* `Entity type` - types of entities are build, pipeline, project, etc.
* `Action` - what happened to that entity.
* `Status` - what use the result of the API call.
* `User` - name of user that performed the action.
* `Last` Request - time of the event.



There is also a separate tab for all the triggers/webhooks that were processed by Codefresh.

{% include image.html
lightbox="true"
file="/images/enterprise/audit/audit-triggers.png"
url="/images/enterprise/audit/audit-triggers.png"
alt="Audit Triggers view"
caption="Audit Triggers view"
max-width="70%"
%}



Both lists have built-in paging and filtering.


### Filtering Audit events

You can filter the list of events by using the filter menu on the top left.

{% include image.html
lightbox="true"
file="/images/enterprise/audit/audit-filter.png"
url="/images/enterprise/audit/audit-filter.png"
alt="Filtering audit actions"
caption="Filtering audit actions"
max-width="40%"
%}

This allows you to focus on a specific entity or user.



 

### Getting more details for each audit event

You can get the exact API payload as it was sent to Codefresh by clicking on the *book icon* on the right of each event row.


{% include image.html
lightbox="true"
file="/images/enterprise/audit/api-call-details.png"
url="/images/enterprise/audit/api-call-details.png"
alt="Audit Call details"
caption="Audit Call details"
max-width="40%"
%}


This dialog provides you with the URL and other call parameters that were used for that particular event.


## Exporting the audit logs

It is also possible to export all log events, by clicking on the *Download Audit* button on the top right. This will download a `CSV` file that you can further process with your own tools or view in a different application (such as Microsoft Excel).

The Audit Log export also includes all the API call information (payload and parameters) that are shown in the Audit GUI screen.



## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/enterprise/installation-security/)
* [Account management]({{site.baseurl}}/docs/enterprise/ent-account-mng/)
* [Access Control]({{site.baseurl}}/docs/enterprise/access-control/)
* [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)