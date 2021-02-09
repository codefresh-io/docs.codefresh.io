---
title: "Sending a notification to Slack"
description: "Connect your Codefresh pipelines to Slack"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/sending-the-notification-to-slack/
toc: true
---

There are many ways to integrate slack with Codefresh

1. You can use the [global slack integration]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)
1. You can use individual pipeline plugins such [slack-message-sender](https://codefresh.io/steps/step/slack-message-sender) and [slack-notifier](https://codefresh.io/steps/step/slack-notifier)
1. You use can simple POST requests with Curl (explained in this page)

## Custom webhook to Slack

Use a container image with a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) such as `tuttum/curl` to send a notification to a Slack channel.

{:start="1"}
1. Get the {% raw %}```${{SLACK_WEB_URL}}```{% endraw %} and put it in the Environment Variables or use [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/)

{{site.data.callout.callout_info}}
You can find how to integrate with slack here [https://api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks){:target="_blank"}
{{site.data.callout.end}}

{:start="2"}
2. Add the following step to your `codefresh.yml`:

  `slack step`
{% highlight yaml %}
slack_notify:
  image: tutum/curl
  commands:
    - curl -X POST --data-urlencode 'payload={"text":"Test slack integration via yaml"}' {% raw %}${{SLACK_WEB_URL}}{% endraw %}
{% endhighlight %}


## What to read next

* [Global Slack integration]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)
* [Advanced workflows]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)
* [Pipeline hooks]({{site.baseurl}}/docs/codefresh-yaml/hooks/)
* [Shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/)