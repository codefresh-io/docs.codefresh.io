---
title: "How To: list all pipelines that are associated with a Runtime Environment"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines, CLI]
support-reviewed: 2023-04-18 LG
---

## Overview

Using the CLI to get pipelines that are associated with a Runtime Environment

## Details

Use the query below (requires [jq](https://stedolan.github.io/jq/)):

```shell
codefresh get pipelines -o json --limit 1000 | jq '.[] | select(.spec.runtimeEnvironment.name=="<your_runtime_name>") | .metadata.name'
```
