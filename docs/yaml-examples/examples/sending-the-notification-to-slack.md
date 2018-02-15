---
layout: docs
title: "Sending the notification to Slack"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/sending-the-notification-to-slack
toc: true
---
Just use freestyle step with `tuttum/curl` docker image to send the notification to slack channel.

{:start="1"}
1. Get the {% raw %}```${{SLACK_WEB_URL}}```{% endraw %} and put it in the Environment Variables.

{{site.data.callout.callout_info}}
You can find how to integrate with slack here [https://api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks){:target="_blank"}
{{site.data.callout.end}}

{:start="2"}
2. Add the following step to your `codefresh.yml`

  `slack step`
{% highlight yaml %}
slack_notify:
  image: tutum/curl
  commands:
    - curl -X POST --data-urlencode 'payload={"text":"Test slack integration via yaml"}' {% raw %}${{SLACK_WEB_URL}}{% endraw %}
{% endhighlight %}
