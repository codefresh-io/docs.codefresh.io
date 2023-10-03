---
title: "Custom condition always evaluates to false if `finished` step-status is used"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

A custom step condition using `finished` step-status always evaluates to
`false`

## Details

The `finished` step-status is an alias that includes `success`, `failure` or
`skipped` step-statuses. But it's valid **only** when it's used on **Step
Dependencies** , for example:

```yaml
second_step:
  title: Second step
  when:
    steps:
      - name: first_step
        on:
          - finished
```  

It's **not a valid step-status** if used in a custom-condition
([link]({{site.baseurl}}/docs/pipelines/advanced-workflows/#custom-steps-dependencies)).

For example, this condition **won't** work:

{% raw %}

```yaml
my_step:
  ...
  when:
    condition:
      any:
        condition_a: steps.step_1.result == 'finished'  # this will always be false
        condition_b: ${{MY_VAR}} == 'VALUE'
```

{% endraw %}

Since the `finished` alias is just available for step-dependencies/conditions, then you can workaround this by specifying the possible step-status of the step you're interested in, applying a logical `OR` (`||`) in the custom-condition.

For example, following the same example above, this would be the solution:

{% raw %}

```yaml
my_step:
  ...
  when:
    condition:
      any:
        condition_a: steps.step_1.result == 'success' || steps.step_1.result == 'failure'
        condition_b: ${{MY_VAR}} == 'VALUE'
```

{% endraw %}

## Related Items

You can find more information about this topic in the following links:

* [Single Step Dependencies]({{site.baseurl}}/docs/pipelines/advanced-workflows/#single-step-dependencies)
* [Multiple Step Dependencies]({{site.baseurl}}/docs/pipelines/advanced-workflows/#multiple-step-dependencies)
* [Custom Step Dependencies]({{site.baseurl}}/docs/pipelines/advanced-workflows/#custom-steps-dependencies)
* [Condition Expressions]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/#condition-expressions)
* [Condition Expression Syntax]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/#condition-expression-syntax)
