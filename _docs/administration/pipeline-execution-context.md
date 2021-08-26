---
title: "Pipeline Execution Context"
description: "A managed entity to make API calls on your behalf during pipeline execution"
group: administration
toc: true
---

## Prerequisites

**Account Level:** Pro and above

> At this time, you will need to reach out to support to enable pipeline execution context.

## About Pipeline Execution Context

A pipeline execution context is an entity attached to the pipeline that makes API calls on your behalf. To create an execution context, navigate to Account Settings then Execution Context under the Security section. The execution context does not have permission at first. To control what this execution context can access, you will need to define ABAC rules. You can create multiple execution contexts in the account, but only one can be set as the default.  The default execution context is there for a pipeline that does not have a specific execution context associated with it. As with all other integration contexts, you will not be able to delete an execution context if linked to a pipeline.  

## Permissions

When a new execution context is created, it has no permissions at first. An account admin must add ABAC rules to grant permissions to that execution context. The enforcement of the execution context permissions will be based on the existing [ABAC model](https://codefresh.io/docs/docs/administration/access-control/) that we have today on our platform. The available permissions for execution context will be the same as we have today for codefresh teams. There will be a new tab on the Permissions page for assigning ABAC rules to the execution context.

In addition, there will be a new action for team rules: assigning execution context to pipelines. Account admins will be able to control which teams will be able to set execution contexts to certain pipelines by creating a rule like: “Dev team can assign execution context with tags ‘dev-context’ to pipelines that have ‘dev’ tags.”

## Restrictions

Pipeline execution contexts are restricted to the "[pipelines](https://codefresh-io.github.io/cli/pipelines/)" and "[builds](https://codefresh-io.github.io/cli/builds/)" endpoints of the CLI. Also, there are some additional resources related to pipeline resources in the "[Operate On Resources](https://codefresh-io.github.io/cli/operate-on-resources/)" section. Any other endpoints will be blocked when using the execution context. With that being said, some of Codefresh’s Steps in the Steps Marketplace will not work when using execution contexts. Some known steps to not work are argocd-rollout, argocd-sync, and launch-composition, as they use additional endpoints behind the scenes.

A user can override the environment variable CF_API_KEY with their API Key to access other endpoints. Below is an example of how to do this in a single step.

{% highlight yaml %}
{% raw %}
steps:
  this _step_will_ succeed:
    title: "will succeed"
    type: "freestyle" # Run any command
    image: "quay.io/codefresh/cli"
    commands:
      - "export CF_API_KEY=${{MY_API_KEY}}" # this will override the default token with my own token
      - "codefresh create team ${{TEAM_NAME}}"
{% endraw %}
{% endhighlight %}

You can use the cf_export option for the following steps if needed.
