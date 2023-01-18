---
title: "Jira notification integrations for piplines"
description: ""
group: integrations
sub_group: notifications
redirect_from:
  - /docs/integrations/notifications/jira-integration/
  - /docs/jira-integration-1/
  - /docs/integrations/jira-integration-1/
toc: true
---
Codefresh integrates with Jira in several ways:
* Through the [Jira integration]({{site.baseurl}}/docs/integrations/jira/) for the highest visibility into your GitOps deployments
* Through a [custom step](#use-jira-in-your-codefresh-pipeline) from our step marketplace so that you can connect your pipelines with Jira
* Alternatively, through using your own [jira-cli](#using-your-own-jira-cli)


## Prerequisites
* [Codefresh Account]({{site.baseurl}}/docs/administration/account-user-management/create-a-codefresh-account/)
* [Jira Account](https://www.atlassian.com/software/jira){:target="\_blank"}

## Use Jira in your Codefresh pipeline

The step marketplace offers several freestyle steps that can be used in your Codefresh pipeline through steps.

One of those steps is the [Jira Issue Manager](https://codefresh.io/steps/step/jira-issue-manager){:target="\_blank"}.  
It can be used to:
* Create a Jira issue
* Comment on existing Jira issues
* Change the status of an issue, for example, once the build is successful
* Add a description to your issue
* And more

More information is provided [Send notification to Jira example]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-jira/).

## Using your own jira-cli

Alternatively, you can use your own jira-cli by adding the following steps to your Dockerfile:

{% highlight yaml %}
FROM python:2-alpine
RUN apk add -U gcc musl-dev linux-headers openssl-dev libffi-dev && pip install jira-cli
{% endhighlight %}

And then running the Dockerfile.

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/)  
[Create pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  