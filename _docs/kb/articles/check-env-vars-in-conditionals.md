---
title: "How To: Check environment variable value or existence in conditionals"
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

You are trying to run a specific step only if a variable is set. You are trying to have branching logic in one pipeline.


This condition determines how values are substituted for variables, when and if referenced variables do not exist in the pipeline definitions. In such cases, Codefresh retains the variable name string as-is, without substituting it with a value.
 

The following condition:

  {% raw %}

    ```yaml
      'includes("${{CF_RELEASE_TAG}}", "{{CF_RELEASE_TAG}}") == true'
    ```
  {% endraw %}

evaluates to `true` if `CF_RELEASE_TAG` does not exist, and `false` if it does exist.

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
[Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)
