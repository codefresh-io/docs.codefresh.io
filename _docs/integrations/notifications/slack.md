---
title: "Slack"
description: "Get Slack notifications for Codefresh pipelines"
group: integrations
sub_group: notifications
permalink: /:collection/integrations/notifications/slack-integration/
toc: true
excerpt: "Integrate Codefresh with Slack to get updates on development and testing progress and feedback."
---

You can integrate Slack globally or on specific pipelines and builds.

## Global Slack integration

To integrate Codefresh with Slack
first go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. 

{% include image.html 
lightbox="true" 
file="/images/integrations/codefresh-integrations.png" 
url="/images/integrations/codefresh-integrations.png" 
alt="Codefresh integrations.png" 
max-width="60%" 
%}

Then:


1. Click on *configure* in the Slack section.
1. Select the Slack check box.
1. Click the **`Add to Slack`** button.<br> You are redirected to the Slack sign-in page.
1. Log in with your Slack credentials.
1. Select the check box to enable notifications for Slack.
1. Click **`Save`**.



Codefresh can now post notifications to Slack, for example, notifications of successful and failed builds, and direct messages received within the Codefresh app.

{% include image.html 
lightbox="true" 
file="/images/integrations/slack/add-slack-integration.png" 
url="/images/integrations/slack/add-slack-integration.png" 
alt="Add Slack integration" 
max-width="50%" 
%}

You can also select the checkboxes on the right for the type of messages you want to have.

## How Slack notifications work

When you have Slack integration enabled:

1. All pipelines that are launched automatically by [triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/) will send a Slack notification
1. All pipelines that are executed manually will **NOT** send a Slack notification.

You can override this behavior by toggling the checkbox called *Report notification on pipeline execution* under *Advanced Settings*
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

If you wish for more fine-grained control over slack notifications, then take a look at any of the available slack plugins

* [https://codefresh.io/steps/step/slack-message-sender](https://codefresh.io/steps/step/slack-message-sender)
* [https://codefresh.io/steps/step/slack-notifier](https://codefresh.io/steps/step/slack-notifier)
* [https://github.com/cloudposse/slack-notifier](https://github.com/cloudposse/slack-notifier)


## What to read next

* [Git triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [Monitoring pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/monitoring-pipelines/)