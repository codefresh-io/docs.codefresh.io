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

# CLI: list all pipelines that are associated with a Runtime Environment

#

## Overview

Using the CLI to get pipelines that are associated with a Runtime Environment

## Details

Use the query below (requires [jq](https://stedolan.github.io/jq/)):

    
    
    #get list of pipelines that are associated with a specificc RE
    codefresh get pipelines -o json --limit 1000 | jq '.[] | select(.spec.runtimeEnvironment.name=="<your_runtime_name>") | .metadata.name'
    

