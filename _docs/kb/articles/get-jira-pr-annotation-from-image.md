---
title: "How To: Get the Jira and PR annotations from an image using CLI"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

## Overview

You want to get the image Jira and PR annotations programmatically.

## Details

To get the issues annotations on the image, you can use this CLI command:  
  
```shell
codefresh get annotation image-issues <image_id> -o json
```

To get the PR information:  

```shell
codefresh get annotation image-prs <image_id> -o json
```

## Related Items

[CLI documentation for annotations](https://codefresh-io.github.io/cli/annotations/get/)
