---
title: "Sending the notification to Jira"
description: ""
group: yaml-examples
sub_group: examples
toc: true
---

The plugin marketplace offers several freestyle steps that can be used in your Codefresh pipeline through plugins.

One of those plugins is the [Jira Issue Manager](https://codefresh.io/steps/step/codefreshdemo%2Fjira-issue-manager). 

Prerequisites
* [Have a Codefresh Pipeline]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/) set-up
* [Have a Jira Account](https://www.atlassian.com/software/jira)

This documentation is using the following [example](https://github.com/codefresh-contrib/jira-demo-app). You can either use the example provided to try out the Jira integration or follow along with your own application. 

1. You need an issue in your Jira account that you want to link to your Codefresh pipeline. If you do not have one yet, please create an issue. (Note that the project type and who is creating the issue etc. does not matter.)

2. Next, add the following step to your Codefresh pipeline. In case that you are using the example, the  [codefresh.yml](https://github.com/codefresh-contrib/jira-demo-app/blob/master/codefresh.yml) file is already added. 

{% highlight yaml %}
  JiraCommentCreate:
    title: "Add Jira Comment"
    type: "codefreshdemo/jira-issue-manager"
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
- `JIRA_API_KEY`: Note that you will have to create this key. The official [Atlassian documentation](https://confluence.atlassian.com/cloud/api-tokens-938839638.html) details how it can be created.

Then we added these arguments for our specific step:
- `JIRA_ISSUE_SOURCE_FIELD`: This is the tag that identifies your issue e.g. MKTG-102
- Within the comment, we are using a [Codefresh native variable](https://codefresh.io/docs/docs/codefresh-yaml/variables/) `CF_BUILD_URL`, which will reference your pipeline build and will allow you to search for your pipeline. 

All variables use the Codefresh specific variable notation ${% raw %}`{{MY_VARIABLE_EXAMPLE}}`{% endraw %}`.

Since it is a new stage in your Codefresh pipeline, you want to add it at the top to your stages, e.g.:

{% highlight yaml %}
  stages:
    - "clone"
    - "build"
    - "JiraCommentCreate"
{% endhighlight yaml %}

Note that you can [provide the variables]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) needed for the Jira step directly in the shared configuration. The benefits are:
* You do not have to post sensitive information, such as the API key, directly in the codefresh.yml. 
* If you use the same step across multiple pipelines, you don't have to copy-paste the same variables. 

Once you run the pipeline, you should be able to see the following output or similar

{% include image.html
lightbox="true"
file="/images/integrations/jira/codefreshpipeline.png"
url="/images/integrations/jira/codefreshpipeline.png"
alt="Pipeline with Jira integration"
max-width="50%"
%}

And the comment, including the URL to the pipeline, should be added to your Jira issue:

{% include image.html
lightbox="true"
file="/images/integrations/jira/jira-comment.png"
url="/images/integrations/jira/jira-comment.png"
alt="Comment in Jira"
max-width="50%"
%}