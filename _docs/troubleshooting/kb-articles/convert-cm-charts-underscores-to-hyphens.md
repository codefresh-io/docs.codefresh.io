---
title: Convert Chartmuseum charts tag underscores to hyphens
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

```shell
Error: chart "<chart name>" version "1.0.0-cf-<branch name with underscores>-0bdfd2e-1603400374339" not found in cm://charts.<our internal endpoint>/repository 
```

## Details

Branch name contains underscores

Adding this step in the beggining of the pipeline will convert underscores in
branch name to hyphens

{% raw %}

```yaml
rename:
  image: alpine
  commands:
    - cf_export CF_BRANCH_TAG_CHART_COMPATIBLE=$(echo ${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}} | sed 's/_/-/g')
```

{% endraw %}
