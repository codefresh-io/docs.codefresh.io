---
title: "How-to: Check environment variable value or existence in conditionals"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

You are trying to run a specific step only if a variable is set. You are trying to have branching logic in one pipeline.

## Details

1. Using the following syntax, you can check whether a variable exists for the current build:

   {% raw %}

    ```yaml
    when:
      condition:
        all:
          whenVarIsMissing: 'includes("${{MyVar}}", "{{MyVar}}") == true'
    ```

    {% endraw %}

2. The following syntax can be used to check for a specific value:

   {% raw %}

    ```yaml
    when:
      condition:
        all:
          whenVarValue: '"${{MyVar}}" == "myValue"'
    ```

    {% endraw %}

3. If desired, you can combine multiple checks.

## Related Items

[Conditional Execution of Steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)
