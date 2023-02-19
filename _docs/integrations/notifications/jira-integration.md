---
title: "Jira Integration"
description: ""
group: integrations
redirect_from:
  - /docs/jira-integration-1/
  - /docs/integrations/jira-integration-1/
toc: true
---
Codefresh integrates with Jira in a variety of ways:
* Through the [Jira Integration]({{site.baseurl}}/docs/integrations/jira/) for the highest observability of your GitOps deployments
* Through a [custom step]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#use-jira-within-your-codefresh-pipeline) from our step marketplace so that you can connect your pipelines with Jira
* Alternatively, through using your own [jira-cli]({{site.baseurl}}/docs/integrations/notifications/jira-integration/#using-your-own-jira-cli)

**Prerequisites needed**:
* [Codefresh Account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
* [Jira Account](https://www.atlassian.com/software/jira)

## Use Jira Within Your Codefresh Pipeline

The step marketplace offers several freestyle steps that can be used in your Codefresh pipeline through steps.

One of those steps is the [Jira Issue Manager](https://codefresh.io/steps/step/jira-issue-manager). It can be used to:
* Create a Jira issue
* Comment on existing Jira issues
* Change the status of an issue e.g. once the build is successful
* Add a description to your issue
* And more

More information is provided [directly in the example]({{site.baseurl}}/docs/yaml-examples/examples/sending-the-notification-to-jira/).

## Using your own jira-cli

Alternatively, you can use your own jira-cli by adding the following steps to your Dockerfile:

{% highlight yaml %}
FROM python:2-alpine
RUN apk add -U gcc musl-dev linux-headers openssl-dev libffi-dev && pip install jira-cli
{% endhighlight %}

And then running the Dockerfile.

## What to read next

* [Example for sending notifications to Jira]({{site.baseurl}}/docs/yaml-examples/examples/sending-the-notification-to-jira/)
* Have a look at other things that you can do with your Codefresh Pipeline in the [example section]({{site.baseurl}}/docs/yaml-examples/examples/)
* [Create a pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)