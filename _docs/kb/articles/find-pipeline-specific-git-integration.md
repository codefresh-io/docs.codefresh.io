---
title: "How To: Find pipelines using specific Git integration"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [CLI, Pipelines]
support-reviewed: 2023-04-18 LG
---


This article describes how to use the Codefresh CLI to find pipelines with legacy Git contexts. 

>**NOTE**  
You need JQuery installed for the command below.

## How to

Get the names of pipelines that reference the Git integration for a trigger.  
The command below supports pipelines with source YAMLs from Git repositories, or those that reference the Git integration in a `git-clone` step with inline YAML.

* Run:

```shell
codefresh get pip --limit 100 -o json | \  
jq --arg v "GIT_INTEGRATION" -r '.[] | select(contains({"spec":{"triggers":[{"type":"git", "context":$v}]}}) or contains({"spec":{"specTemplate":{"context":$v}}}) or contains({"spec":{"steps":$v}})) | .metadata.name'
```
## Related articles
[Creating a pipeline]({{site.baseurl}}/docs/pipelines/pipelines/#creating-a-pipeline)  
