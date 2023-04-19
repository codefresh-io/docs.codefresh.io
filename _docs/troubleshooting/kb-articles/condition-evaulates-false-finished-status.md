---
title: 
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

# Custom condition always evaluates to false if `finished` step-status is used

#

## Overview

A custom step condition using `finished` step-status always evaluates to
`false`

## Details

The `finished` step-status is an alias that includes `success`, `failure` or
`skipped` step-statuses. But it's valid **only** when it's used on **Step
Dependencies** , for example:

    
    
    second_step:
      title: Second step
      when:
        steps:
         - name: first_step
           on:
             - finished
    

Refs.:

  * https://codefresh.io/docs/docs/codefresh-yaml/advanced-workflows/#single-step-dependencies
  * https://codefresh.io/docs/docs/codefresh-yaml/advanced-workflows/#multiple-step-dependencies

It's **not a valid step-status** if used in a custom-condition
([link](https://codefresh.io/docs/docs/codefresh-yaml/advanced-
workflows/#custom-steps-dependencies)). For example, this condition **won't**
work:

    
    
    my_step:
      ...
      when:
        condition:
          any:
            condition_a: steps.step_1.result == 'finished'  # this will always be false
            condition_b: ${{MY_VAR}} == 'VALUE'
    

Since the `finished` alias is just available for step-dependencies|conditions,
then you can workaround this by specifying the possible step-status of the
step you're interested in, applying a logical `OR` (`||`) in the custom-
condition.

For example, following the same example above, this would be the solution:

    
    
    my_step:
      ...
      when:
        condition:
          any:
            condition_a: steps.step_1.result == 'success' || steps.step_1.result == 'failure'
            condition_b: ${{MY_VAR}} == 'VALUE'
    

## Related Items

You can find more information about this topic in the following links:

  * [Single Step Dependencies](https://codefresh.io/docs/docs/codefresh-yaml/advanced-workflows/#single-step-dependencies)
  * [Multiple Step Dependencies](https://codefresh.io/docs/docs/codefresh-yaml/advanced-workflows/#multiple-step-dependencies)
  * [Custom Step Dependencies](https://codefresh.io/docs/docs/codefresh-yaml/advanced-workflows/#custom-steps-dependencies)
  * [Condition Expressions](https://codefresh.io/docs/docs/codefresh-yaml/conditional-execution-of-steps/#condition-expressions)
  * [Condition Expression Syntax](https://codefresh.io/docs/docs/codefresh-yaml/condition-expression-syntax/)

