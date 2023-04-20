---
title: Composition version not supported
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

The build is getting failed on the "Initializing Process" stage with the
following error:

    
    
    {"name":"YAML_PARSING_FAILED","message":"Yaml version not supported yet","original":{"version":"2.3"...
    ..."name":"FIELD_NOT_SUPPORTED","message":"Field 'healthcheck' is not supported by compose"} 
    

## Details

Codefresh does not support compositions version with points

    
    
    Codefresh only understands Docker compose versions 2 and 3, but not point releases such as 2.3
    

Ref.: [Motivation for Compostions](https://codefresh.io/docs/docs/codefresh-
yaml/steps/composition/#motivation-for-compositions)

