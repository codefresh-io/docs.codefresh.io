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

## Explaination

The intention for this condition check is that it takes advantage of variable substitution behavior when a specific variable does not exist at all on a pipeline. When that is the case, Codefresh leaves the variable name string as-is and does not substitute any values.
 
So in a pipeline where there is no variable named MyVar, references in the pipeline yaml for this variable will stay as the exact string ${{MyVar}}. This includes condition checks for whether or not this is happening, by checking for the presence of part of the string {{MyVar}}.
 
Note that {{MyVar}} will remain as-is and not be substituted by any value even when the variable exists, because it's missing the "$" notation. When the variable MyVar does exist, ${{MyVar}} will be substituted by the variable value, which should not contain the substring {{MyVar}} for standard use cases.

So this condition:
    {% raw %}

    ```yaml
    'includes("${{CF_RELEASE_TAG}}", "{{CF_RELEASE_TAG}}") == true'
    ```

    {% endraw %}

is expected to evaluate to true if MyVar does not exist, and false if it does exist.

## Related Items

[Conditional Execution of Steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)
