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

# Failed to push and tag image

#

## Overview

The error `failed to push image` is followed by `failed to tag image`

## Details

Forbidden characters are used in the name or tags. Or there is a lack of
access.

  1. Ensure you have write and tagging access to the Docker registry
  2. Ensure you are using the correct registry in your YAML
  3. Ensure that the Docker image complies to the Docker Naming Policy. Common errors include: 
    * Using an uppercase name
    * Using an invalidly formatted tag, such as starting with a period or dash.
    * [You can read more here on Docker's official website](https://docs.docker.com/engine/reference/commandline/tag/)

