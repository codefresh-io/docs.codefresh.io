---
title: "Email notifications"
description: "Get email notifications for pipeline builds"
group: integrations
sub_group: notifications
toc: true
---

You can enable email notifications for pipeline builds based on the build's status. Email notifications do not require any integration. Each user needs to enable the notifications as part of the user settings.  

## Email notification options

As part of user settings, individual users can enable notifications for pipeline builds based on their status:  
* Successful
* Failed

See [Enable email notifications for pipeline builds]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#enable-email-notifications-for-pipeline-builds).

<!---Here's an example of an email notification for a failed build:
    
    {% include image.html 
    lightbox="true" 
    file="/images/integrations//system-terminate-build-slack-example.png" 
    url="/images/integrations/slack/system-terminate-build-slack-example.png" 
    caption="Example of Slack notification for system-terminated build"
    alt="Example of Slack notification for system-terminated build" 
    max-width="60%" 
%}
-->

## How email notifications work

When you have email notifications enabled for pipeline builds, the default behavior is similar to that of Slack notifications:  

1. All pipelines launched automatically by [Git/Cron triggers]({{site.baseurl}}/docs/pipelines/triggers/) send email notifications.
1. All pipelines executed manually, do **NOT** send email notifications.
  You can override the default behavior for notifications through the **Report notification on pipeline execution** option for pipelines. This is available under **Advanced Settings** for Git and Cron triggers, or the Run settings of a pipeline.
  When selected, sends email notifications for pipelines which are executed manually.

{% include image.html 
lightbox="true" 
file="/images/integrations/slack/report-notifications.png" 
url="/images/integrations/slack/report-notifications.png" 
alt="Select to send notifications for manually executed builds" 
caption="Select to send notifications for manually executed builds" 
max-width="40%" 
%}



## Related articles
[Git triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/)  
[Cron triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/)  
[Slack integration for pipelines]({{site.baseurl}}/_docs/integrations/notifications/slack-integration/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)  
