---
title: File not found from cloned repo
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

A file that is expected to be found is not found, or, Docker Build or other steps fail, stating `missing file`

## Details

Incorrect working directory set.

1. Determine the name of your clone step. For most cases, it is `clone`
   * A note: If you are seeing a message in your pipeline editor stating that you have a default clone step, this hidden step is called `main_clone`.
1. Add the {% raw %}`working_dir: ${{clone}}`{% endraw %} attribute to your other steps (if your clone step name is not `clone`, replace it with your actual step name).

>_Notes_ This will ensure all steps are being run from the clone directory. You can change the value of `working_dir` as needed for your pipeline.
>
>A special note on legacy and `main_clone`:
>
>* When using a legacy pipeline or using a step called `main_clone`, the working directory defaults to that step. This is considered deprecated.
