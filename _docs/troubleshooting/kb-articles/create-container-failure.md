---
title: "Failed to create container of image"
description: "Failure creating container"
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: true
categories: []
support-reviewed: 2023-04-18 LG
---

## Issue

Freestyle step fails with message: `Failed to create a container of: <image>`


## Possible cause
This issue occurs if your image filesystem already contains a _file_ in `/codefresh` or `/codefresh/volume`. The Codefresh engine cannot mount the Codefresh volume within a _file_.  


## Solution
Make sure that the filesystem does not contain files entitled `codefresh`, and that the `/codefresh/volume` directory can be created successfully. 