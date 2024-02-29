---
title: "How To: Acquire webhook information after a Git trigger is created"
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



This article describes how to get webhook information for a Git trigger through the Codefresh CLI or API.  
Currently, you cannot get webhook information through the user interface.

## How to

* Run:  
  `codefresh get pipeline Project/Pipeline -o yaml`

  The `spec.triggers` displays information about each Git trigger.
  Look at the `endpoint` and `secret` fields.

## Related articles
[Git triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/)  
