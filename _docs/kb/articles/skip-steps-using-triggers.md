---
title: "How To: Skip steps in your pipeline using Triggers"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

You have certain steps you want to skip over in certain circumstances. You are using a single pipeline for multiple triggers, but need certain tasks split.

## Details

1. Set a pipeline variable with a default value. For example, `SkipTest` set to `false`
2. Select the Trigger (or create a new one) that you will use.
3. Under "Advanced Options" locate Variables.
4. Set a Variable with an appropriate name and value. For example, `SkipTest` set to `true`
5. Add a condition to your step. In this case, we will only run this step if the variable `SkipTest` is true.

{% raw %}

```yaml
when:
  condition:
    all:
      skipdeploy: '${{SkipTest}} == "true"'
```

{% endraw %}

>_Notes_ Other options for skipping steps are available.

## Related Items

[API call for Pipelines](https://g.codefresh.io/api/#operation/pipelines-run)

[CLI call for Pipelines](https://codefresh-io.github.io/cli/pipelines/run-pipeline/)

[More details on Conditionals]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)
