---
title: "Release Notes: June 2025"
description: ""
---
{% if page.collection == "posts" %}
## Features & enhancements

### Pipelines: Better visibility and control over pipeline resource usage

Based on your feedback, we’ve expanded coverage of pipeline metrics to give you more visibility and control. Until now, CPU and memory usage metrics weren’t available for all steps during builds, making it harder to analyze performance and resource use.

With this update, all steps within builds, except the build step itself, now include CPU and memory metrics. This gives you clearer insight into how your pipeline is performing, where the resource usage is going, and how to optimize accordingly.

* More consistent and reliable pipeline metrics

* Easier analysis of performance and cost for build-heavy pipelines

We’re continuing to work on supporting resource metrics for the build step and the full build process, with additional features planned as part of the ongoing improvements.
{% endif %}

## Bug fixes
{% if page.collection == "posts" %}
##### Pipelines
* For Bitbucket: Fixed an issue where pipelines configured to trigger on the commit event were also being triggered by push.tags events (e.g., when tags were created in Bitbucket). This caused unexpected builds, resource waste, and inaccurate build stats.

##### GitOps
{% endif %}
* Fixed an issue that caused the GitOps Apps view to return empty results or error messages for some users. The problem occurred when the number of applications exceeded MongoDB's aggregation pipeline memory limits.
* Fixed an issue where Promotion Workflows failed in Restricted Git Source scenarios by ensuring promotions always run in the runtime namespace. Previously, running promotions in the application's namespace led to missing secret errors (codefresh-token, argocd-token) and blocked execution.
* Fixed an issue where the version label displayed an outdated value in the Products dashboard and Release objects.
