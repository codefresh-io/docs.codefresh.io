---
title: A variable is inaccessible in a Composition or Service
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

A variable is inaccessible when called from a Composition

## Details

A variable has to be added to your Composition's Environment.

In your Environments settings, you will need to call the Codefresh variable.

{% raw %}

```yaml
services:
  name: yourservice
  composition:
    yourservicename:
      image: yourserviceimage
      ports:
        - 5432
  composition_variables:
      - 'CFVARIABLENAME=${{CFVARIABLENAME}}'
```

{% endraw %}

>_Notes_
>
>In both setup and readiness Service steps, Codefresh exported variables areaccessible by default.
