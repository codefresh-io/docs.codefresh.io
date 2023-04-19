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

# Attaching volume to composition

#

## Overview

You are attempting to access the shared volume from a composition or service,
but you are not able to.

## Details

You have not mounted the volume, or you have used incorrect syntax.

Mount the volume as part of your composition.

    
    
    services:
      composition:
        mongodb:
          image: 'mongo:4.2'
          ports:
            - '27017:27017'
          volumes: 
            - '${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}'
    

_Notes_

`CF_VOLUME_PATH` refers to /codefresh/volume. You may use that, or any other
directory, you wish.

## Related Items

[Codefresh Docs: Accessing your project folder from a
composition](https://codefresh.io/docs/docs/codefresh-
yaml/steps/composition/#accessing-your-project-folder-from-a-composition)

