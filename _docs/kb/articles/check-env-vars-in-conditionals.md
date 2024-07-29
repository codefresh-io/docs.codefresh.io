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

This article outlines how to execute a specific step conditionally based on the presence or absence of a variable in Codefresh pipelines, enabling branching logic within a single pipeline.

The condition determines how variable values are substituted within the pipeline's build when these variables are not defined in the pipeline configuration. In such instances, Codefresh maintains the variable name string unchanged, without replacing it with a value.

The following condition:

{% raw %}

```yaml
  'includes("${{CF_RELEASE_TAG}}", "{{CF_RELEASE_TAG}}") == true'
```

{% endraw %}

evaluates to `true` if `CF_RELEASE_TAG` does not exist, and `false` if it does exist.

## How to

##### Check if variable exists for the current build

Use the following syntax:

{% raw %}

```yaml
when:
  condition:
    all:
      whenVarIsMissing: 'includes("${{MyVar}}", "{{MyVar}}") == true'
```

{% endraw %}

##### Check if variable has a specific value

Use the following syntax:

{% raw %}

```yaml
when:
  condition:
    all:
      whenVarValue: '"${{MyVar}}" == "myValue"'
```

{% endraw %}

Combine multiple checks as required.

## Related articles

[Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)  
