---
title: "Failed to create container of image"
description: "Failure creating container"
group: troubleshooting
sub_group: common-issues
toc: true
---

## Issue

Freestyle step fails with message: `Failed to create a container of: <image>`


## Possible cause
This issue occurs if your image filesystem already contains a _file_ in `/codefresh` or `/codefresh/volume`. The Codefresh engine cannot mount the Codefresh volume within a _file_.  


## Solution
Make sure that the filesystem does not contain files entitled `codefresh`, and that the `/codefresh/volume` directory can be created successfully. 