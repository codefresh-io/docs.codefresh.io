---
title: "CLI: How to delete pipelines based on specific repo in git triggers"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [CLI, Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

Using the CLI to delete a pipeline based on a specific repo in the trigger.

## Details

Use the query below:

    
    
    #get list of pipelines that configured with git trigger pointing to specific repository
    PIPELINES=$(codefresh get pip --limit 1000  -o json | jq '.[] | select(contains({"spec":{"triggers":[{"type":"git", "repo":"<ACCOUNT_NAME>/<REPO_NAME>"}]}}) ) | {PipelineName:.metadata.name}' | jq -r '.[]')
    
    #delete pipelines
    for item in $PIPELINES
      do
        codefresh delete pipeline $item
      done 
    

