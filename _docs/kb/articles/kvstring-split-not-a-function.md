---
title: "Error: kvString.split is not a function"
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

Pipeline fails with following error:

```shell
Message             Failed to prepare composition: services
Caused by           kvString.split is not a function
```

## Details

Environment variables are defined as `<KEY>: <VALUE>`

Instead, define environment variables as follows: `<KEY>=<VALUE>` An example follows:

```yaml
services:
  composition:
    test_db:
      image: 'mysql:5.6.45'
      environment:
        - MYSQL_ROOT_PASSWORD=admin
```

## Related Items

[Service Containers]({{site.baseurl}}/docs/pipelines/service-containers/)
