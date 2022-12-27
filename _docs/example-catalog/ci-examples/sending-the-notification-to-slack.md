---
title: "Send notification to Slack"
description: "Connect your Codefresh pipelines to Slack"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/sending-the-notification-to-slack/
toc: true
---

There are many ways to integrate Slack with Codefresh:

1. Use the [global slack integration]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)
1. Use individual pipeline plugins such [slack-message-sender](https://codefresh.io/steps/step/slack-message-sender){:target:"\_blank"} and [slack-notifier](https://codefresh.io/steps/step/slack-notifier){:target:"\_blank"}
1. Use simple POST requests with Curl, as explained in this article

## Custom webhook to Slack

Use a container image with a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) such as `byrnedo/alpine-curl` to send a notification to a Slack channel.

{:start="1"}
1. Get the {% raw %}```${{SLACK_WEB_URL}}```{% endraw %} and put it in the Environment Variables or use [shared configuration]({{site.baseurl}}/docs/pipelines/shared-configuration/).

 > To integrate with Slack, see [https://api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks){:target="_blank"}.

{:start="2"}
2. Add the following step to your `codefresh.yml`:

  `slack step`
{% highlight yaml %}
slack_notify:
  image: byrnedo/alpine-curl # curlimages/curl, or any other curl image
  commands:
    - curl -X POST --data-urlencode 'payload={"text":"Test slack integration via yaml"}' {% raw %}${{SLACK_WEB_URL}}{% endraw %}
{% endhighlight %}


## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Global Slack Integration]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)  
[Advanced Workflows]({{site.baseurl}}/docs/pipelines/advanced-workflows/)  
[Hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/)  
[Shared Configuration]({{site.baseurl}}/docs/pipelines/shared-configuration/)  

