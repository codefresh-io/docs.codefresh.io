---
title: Composition version not supported
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

The build is getting failed on the "Initializing Process" stage with the following error:

{% raw %}

```shell
{"name":"YAML_PARSING_FAILED","message":"Yaml version not supported yet","original":{"version":"2.3"...
..."name":"FIELD_NOT_SUPPORTED","message":"Field 'healthcheck' is not supported by compose"} 
```

{% endraw %}

## Details

Codefresh only understands Docker compose versions 2 and 3, but not point releases such as 2.3

## Related Items

[Motivation for Compostions]({{site.baseurl}}/docs/pipelines/steps/composition/#motivation-for-compositions)
