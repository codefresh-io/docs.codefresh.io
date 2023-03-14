---
title: "Slack"
description: "Get Slack notifications with pipeline integrations"
group: integrations
sub_group: notifications
toc: true
---

You can integrate Slack globally, or for specific pipelines and builds. Codefresh can post notifications to Slack, for example, for successful and failed builds, and direct messages received within the Codefresh app.
To integrate through a custom webhook, see the [Slack documentation](https://api.slack.com/messaging/webhooks){:target="\_blank"}.  
You can also look at our example on [how to set up a custom webhook notification to Slack]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-slack/#custom-webhook-to-slack).


## Notification options for Slack 

Enable notifications for builds based on their status:  
* Successful
* Failed
* Pending manual approval to continue
* Terminated by system  
  When selected, you receive notifications based on the build termination policies configured for the pipeline. These can be whenever:   
    * Previous builds from the same or a specific branch are terminated once a build is created for that branch
    * Running builds are terminated once a build is created
    * Child builds are terminated when the parent build is terminated

    Here's an example of the notification in Slack for a system-terminated build:
    
    {% include image.html 
    lightbox="true" 
    file="/images/integrations/slack/system-terminate-build-slack-example.png" 
    url="/images/integrations/slack/system-terminate-build-slack-example.png" 
    caption="Example of Slack notification for system-terminated build"
    alt="Example of Slack notification for system-terminated build" 
    max-width="60%" 
%}


For detailed information, see [Policy settings for pipelines]({{site.baseurl}}/docs/pipelines/pipelines/#policies).




## Set up global Slack integration in Codefresh

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Slack** and then click **Configure**.
1. To enable notifications for Slack, select **Enable this to activate Slack integration**.
1. Select **Quick Setup**, do the following:
      1. Click **Add to Slack**.<br> You are redirected to the Slack sign-in page.
      1. If required log in with your Slack credentials, and then select the destination channels for the notifications.
1. For **Custom Webhooks**, paste the URL of your Slack application. 
1. Select the types of notifications to receive on Slack.
1. Click **Save**.

{% include image.html 
lightbox="true" 
file="/images/integrations/slack/add-slack-integration.png" 
url="/images/integrations/slack/add-slack-integration.png" 
caption="Add Slack integration"
alt="Add Slack integration" 
max-width="50%" 
%}



## How Slack notifications work

When you have Slack integration enabled:

1. All pipelines launched automatically by [triggers]({{site.baseurl}}/docs/pipelines/triggers/), send Slack notifications
1. All pipelines executed manually, do **NOT** send Slack notifications.

You can override this behavior by toggling the checkbox **Report notification on pipeline execution** under **Advanced Settings**
either in a Git trigger dialog or the Run settings of a pipeline.

{% include image.html 
lightbox="true" 
file="/images/integrations/slack/report-notifications.png" 
url="/images/integrations/slack/report-notifications.png" 
alt="Manual Slack override" 
caption="Manual Slack override" 
max-width="40%" 
%}

## Individual pipeline Slack integration

If you wish for more fine-grained control over Slack notifications, then take a look at any of the available slack plugins:

* [https://codefresh.io/steps/step/slack-message-sender](https://codefresh.io/steps/step/slack-message-sender){:target="\_blank"}
* [https://codefresh.io/steps/step/slack-notifier](https://codefresh.io/steps/step/slack-notifier){:target="\_blank"}
* [https://github.com/cloudposse/slack-notifier](https://github.com/cloudposse/slack-notifier){:target="\_blank"}


## Related articles
[Git triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)  
