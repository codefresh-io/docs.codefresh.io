---
title: "How-to: Using variables across steps"
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

A variable is created in a step that needs to be used for a later step.

## Details

Use cf_export. Example follows:

    
    
    export_var:
        description: Declaring variable
        title: Declaring variable
        image: alpine:latest
        commands:
        - cf_export myVar=valueOfVar
    

  * If you have an existing variable, you can simply run `cf_export variableName`
  * Write directly to the variables file, which is located at `${{CF_VOLUME_PATH}}/env_vars_to_export`

    
    
    freestyle-step-1:
    
    description: Declaring variable
    title: Declaring variable
    image: alpine:latest
    commands:
        - echo VAR1=192.168.0.1 >> ${{CF_VOLUME_PATH}}/env_vars_to_export
        - echo hey=alpine:3.9 >> ${{CF_VOLUME_PATH}}/env_vars_to_export
    

_**Note** :_

  * When writing variables, do not include the leading `$` symbol.
  * If you want to use a Variable in the same step, you can instead use the standard `export` command.

## Related Items

[Using Variables in Codefresh](https://codefresh.io/docs/docs/codefresh-
yaml/variables/)

