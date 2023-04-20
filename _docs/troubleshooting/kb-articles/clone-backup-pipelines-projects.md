---
title: "How-to: Clone or backup Pipelines or Projects"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines, CLI]
support-reviewed: 2023-04-18 LG
---

## Overview

You would like to back up your Pipelines or Projects locally.

## Details

You will need to have the [Codefresh CLI installed](https://codefresh-
io.github.io/cli/installation/). When installed, run the following command:

    
    
    codefresh get pip "pipeline_name" -o yaml >  pipeline_backup_file

If you would like to export protected variables, run the following:

    
    
    codefresh get pip "pipeline_name" --decrypt-variables -o yaml >  pipeline_backup_file

To recreate a pipeline from a backup file, run the following command:

    
    
    codefresh replace -f pipeline_backup_file

## Related Items

[Codefresh CLI](https://codefresh-io.github.io/cli/installation/)

