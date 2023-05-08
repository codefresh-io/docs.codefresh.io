---
title: Attaching volume to composition
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

You are attempting to access the shared volume from a composition or service, but you are not able to.

## Details

You have not mounted the volume, or you have used incorrect syntax.

Mount the volume as part of your composition.

{% raw %}

```yaml
    services:
      composition:
        mongodb:
          image: 'mongo:4.2'
          ports:
            - '27017:27017'
          volumes: 
            - '${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}'
    
```

{% endraw %}

>_Notes_
>
>`CF_VOLUME_PATH` refers to /codefresh/volume. You may use that, or any other directory, you wish.

## Related Items

[Codefresh Docs: Accessing your project folder from a composition]({{site.baseurl}}/docs/pipelines/steps/composition/#accessing-your-project-folder-from-a-composition)
