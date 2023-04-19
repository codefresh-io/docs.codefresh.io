---
title: 
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

# .Net Core is unexpectedly slow

#

## Overview

An image using .Net Core is unexpectedly slow.

## Details

The official Docker images for .Net Core occasionally have performance issues.

  1. Attempt to run the image and tests locally. 
    1. If the issue persists, continue.
    2. If the issue does not persist, see our performance troubleshooting articles.
  2. Create a custom image including only the SDK and any other tools required.

This allows a smaller image and is often known to create better performance.

_**Note** :_ This does not apply to all versions of Dotnet. 3.1 is known to
occasionally have this problem.

## Related Items:

[Create a base image](https://docs.docker.com/develop/develop-
images/baseimages/)

