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
This issue occurs if your image filesystem contains a file in `/codefresh` or `/codefresh/volume`. The Codefresh engine cannot mount the Codefresh volume to the container at runtime under `/codefresh/volume`.  


## Solution
Make sure that the `/codefresh/volume` directory can be created successfully.