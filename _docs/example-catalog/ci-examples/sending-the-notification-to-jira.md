---
title: "Send notification to Jira"
description: ""
group: example-catalog
sub_group: ci-examples
toc: true
---

The plugin marketplace offers several freestyle steps for your Codefresh pipeline.

One of those steps is the [Jira Issue Manager](https://codefresh.io/steps/step/jira-issue-manager){:target:"\_blank"}. 

## Prerequisites
* [Codefresh pipeline]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/)
* [Jira account](https://www.atlassian.com/software/jira){:target:"\_blank"}

## Example
This documentation uses the following [example](https://github.com/codefresh-contrib/jira-demo-app){:target:"\_blank"}. You can either use the example provided to try out the Jira integration or follow along with your own application. 

1. You need an issue in your Jira account that you want to link to your Codefresh pipeline. If you do not have one yet, please create an issue. (Note that the project type and who is creating the issue etc. does not matter.) Alternatively, you can also create an issue first with the Jira step. However, this is not explained in this example.

2. Next, add the following step to your Codefresh pipeline. In case you are using the example, the  [codefresh.yml](https://github.com/codefresh-contrib/jira-demo-app/blob/master/codefresh.yml){:target:"\_blank"} file is already added. 

{% highlight yaml %}
  JiraCommentCreate:
    title: "Add Jira Comment"
    type: "jira-issue-manager"
    stage: "deploy"
    arguments:
      JIRA_BASE_URL: '${{JIRA_BASE_URL}}'
      JIRA_USERNAME: '${{JIRA_USERNAME}}'
      JIRA_API_KEY: '${{JIRA_API_KEY}}'
      JIRA_ISSUE_SOURCE_FIELD: '${{JIRA_ISSUE_SOURCE_FIELD}}'
      ACTION: "comment_create"
      COMMENT_BODY: "Build number ${{CF_BUILD_URL}} finished in Codefresh"
{% endhighlight yaml %}

Let's look in detail at this step.
- Everything up to the arguments is similar to other Codefresh steps.

These arguments are required to use the step:
- `JIRA_BASE_URL`: This is the url of your organisation e.g. 'https://company-name.atlassian.net'
- `JIRA_USERNAME`: This is usually the e-mail that you are logged in with at Jira
- `JIRA_API_KEY`: Note that you will have to create this key. The official [Atlassian documentation](https://confluence.atlassian.com/cloud/api-tokens-938839638.html){:target:"\_blank"} details how it can be created.

Then we added these arguments for our specific step:
- `JIRA_ISSUE_SOURCE_FIELD`: This is the tag that identifies your issue, for example, `MKTG-102`
- Within the comment, we use a [Codefresh native variable]({{site.baseurl}}/docs/docs/pipelines/variables/) `CF_BUILD_URL`, which  references your pipeline build and allows you to search for your pipeline. 

All variables use the Codefresh-specific variable notation ${% raw %}`{{MY_VARIABLE_EXAMPLE}}`{% endraw %}`.

Since it is a new stage in your Codefresh pipeline, you want to add it at the top to your stages, e.g.:

{% highlight yaml %}
  stages:
    - "clone"
    - "build"
    - "JiraCommentCreate"
{% endhighlight yaml %}

Note that you can [provide the variables]({{site.baseurl}}/docs/pipelines/shared-configuration/) needed for the Jira step directly in the shared configuration. The benefits are:
* You do not have to post sensitive information, such as the API key, directly in the codefresh.yml. 
* If you use the same step across multiple pipelines, you don't have to copy-paste the same variables. 

Once you run the pipeline, you should be able to see the following output or similar:

{% include image.html
lightbox="true"
file="/images/integrations/jira/codefreshpipeline.png"
url="/images/integrations/jira/codefreshpipeline.png"
alt="Pipeline with Jira integration"
max-width="80%"
%}

And the comment, including the URL to the pipeline, should be added to your Jira issue:

{% include image.html
lightbox="true"
file="/images/integrations/jira/jira-comment.png"
url="/images/integrations/jira/jira-comment.png"
alt="Comment in Jira"
max-width="80%"
%}

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/ci-examples/)  
[Sending notifications to Slack]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-slack/)  
[Create a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/)  
