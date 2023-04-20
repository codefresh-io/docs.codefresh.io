---
title: "CLI: How to list all pipelines that use a specific shared configuration"
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

Using the CLI to get all Pipelines that is using a shared configuration

## Details

Use the query below:

    
    
    codefresh get pip --limit 1000  -o json | jq '.[] | select(contains({"spec":{"contexts":["<CONTEXT_NAME>"]}}) )  | {PipelineName:.metadata.name}' | jq -r '.[]'
    

