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

# How-to: Ignore errors on steps

#

## Overview

Certain steps should only be considered warnings and not failures, or, You
want to run later tests no matter if previous ones fail.

## Details

Fail Fast is activated by default. You can change this by adding `fail_fast:
false` to your steps. An example follows:

    
    
    steps:
      skip_fail:
        image: alpine
        fail_fast: false
        commands: exit 1
    

_Notes_ Steps marked like this will not cause a build to be marked as a
failure. To mark the pipeline as a failure later, you will need to add a
conditional failing step.

  1. Note all the steps you are disabling `fail_fast` for.
  2. Add a step at a suitable point in your pipeline to check for these steps.
  3. This step should have `fail_fast: true` and exit with an error. For example:

    
    
      check_for_failures:
        image: alpine
        commands: 
          - exit 1
        when:
            condition:
                any:
                    myCondition: steps.step_one.result == 'failure' || steps.step_two.result == 'failure' || etc...
    

## Related Items

[Handling error conditions in a
pipeline](https://codefresh.io/docs/docs/codefresh-yaml/advanced-
workflows/#handling-error-conditions-in-a-pipeline)

