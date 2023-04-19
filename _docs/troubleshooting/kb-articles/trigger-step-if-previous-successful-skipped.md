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

# How-to: Trigger a step if two previous steps are either both successful or
skipped

#

## Overview

You have steps one, two, and three. You want to run step three only if steps
one and two are either both successful, or both skipped.

Codefresh allows you to define complex custom condition expressions to control
the flow of your steps. However, it currently only supports "all" and "any"
operators for multiple expressions, not "or". So the following is not
supported syntax:

    
    
    condition:
      or:
        steps_success: steps.bdd_step_1.result == 'success' || steps.bdd_step_2.result == 'success'
        steps_skipped: steps.bdd_step_1.result == 'skipped' || steps.bdd_step_2.result == 'skipped'
    

Note also that the step status "skipped" is only supported in sequential
pipeline mode.

## Details

### Solution 1:

This example assumes that the execution of steps one and two are controlled by
some variable. You should be able to adapt this solution for most other skip
conditions.

If skipping both steps one and two are controlled by a single variable, for
example `SKIP`, then this set of conditions should work:

    
    
    steps:
      ...
      step-3:
         when:
           condition:
             all:
               bdd_step_1_finished: steps.bdd_step_1.result == 'success' || ${{SKIP}} == 'true'
               bdd_step_2_finished: steps.bdd_step_2.result == 'success' || ${{SKIP}} == 'true'
    

### Solution 2:

If skipping these two steps is controlled by two separate flag variables
`SKIPSTEP1` and `SKIPSTEP2`, then this should functionally work. Note the
mismatched step to variable number in each condition - the logic might not be
intuitive but it should behave the way you want:

    
    
    steps:
      ...
      step-3:
        when:
          condition:
            all:
              bdd_step_1_finished: steps.bdd_step_1.result == 'success' || ${{SKIPSTEP2}} == 'true'
              bdd_step_2_finished: steps.bdd_step_2.result == 'success' || ${{SKIPSTEP1}} == 'true'
    

The result of both of these approaches should be that step 3 will only run if
either step 1 and step 2 complete successfully, or if both are skipped. Any
other outcome will skip step 3.

