---
title: .Net Core is unexpectedly slow
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Issue

An image using .Net Core is unexpectedly slow.

## Possible Causes

The official Docker images for .Net Core occasionally have performance issues.

>_**Note** :_ This does not apply to all versions of Dotnet. 3.1 is known to occasionally have this problem.

## Solution

1. Attempt to run the image and tests locally.
   * If the issue persists, continue to step 2.
2. Create a custom image including only the SDK and any other tools required.

This allows a smaller image and is often known to create better performance.

## Related Items

[Create a base image](https://docs.docker.com/develop/develop-images/baseimages/)
