---
title: "Slack"
description: "Get Slack notifications with pipeline integrations"
group: integrations
sub_group: notifications
redirect_from:
 - /docs/integrations/notifications/slack-intergration/
 - /docs/integrations/notifications/slack-integration/
toc: true
---

You can integrate Slack globally, or for specific pipelines and builds.

## Set up global Slack integration in Codefresh
<!--- what about webhooks?  -->
1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Slack** and then click **Configure**.
1. Select **Quick Setup**.
1. Select the types of notifications you want to receive on Slack.
1. Click **Add to Slack**.<br> You are redirected to the Slack sign-in page.
1. Log in with your Slack credentials.
1. Select the check box to enable notifications for Slack.
1. Click **Save**.

{% include image.html 
lightbox="true" 
file="/images/integrations/slack/add-slack-integration.png" 
url="/images/integrations/slack/add-slack-integration.png" 
alt="Add Slack integration" 
max-width="50%" 
%}


Codefresh can now post notifications to Slack, for example, notifications of successful and failed builds, and direct messages received within the Codefresh app.

## How Slack notifications work

When you have Slack integration enabled:

1. All pipelines that are launched automatically by [triggers]({{site.baseurl}}/docs/pipelines/triggers/) send Slack notifications
1. All pipelines that are executed manually do **NOT** send Slack notifications.

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

If you wish for more fine-grained control over Slack notifications, then take a look at any of the available slack plugins

* [https://codefresh.io/steps/step/slack-message-sender](https://codefresh.io/steps/step/slack-message-sender){:target="\_blank"}
* [https://codefresh.io/steps/step/slack-notifier](https://codefresh.io/steps/step/slack-notifier){:target="\_blank"}
* [https://github.com/cloudposse/slack-notifier](https://github.com/cloudposse/slack-notifier){:target="\_blank"}


## Related articles
[Git triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)  
