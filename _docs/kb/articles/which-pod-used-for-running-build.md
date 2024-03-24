---
title: "How To: Know the builder pod used to run build"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

This article describes how to retrieve the specific builder pod used to run a build. 

## Multiple builders
By default, Codefresh on-premises uses Codefresh builders to run your builds. 

If you configured more than one builder, you might need to know the builder pod that the specific build was run on, for debug purposes for example, to resolve networking issues in your k8s cluster.

To always locate the builder pod, simply output the builder pod name to the build logs. 

## How to

* Add `echo $CF_HOST_NAME` to the commands list of one of the `freestyle` steps in the pipeline for which you need to track the builder name it runs on.

