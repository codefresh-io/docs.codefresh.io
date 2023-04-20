---
title: "How-to: Get the Jira and PR annotations from an image using CLI"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

## Overview

You want to get the image Jira and PR annotations programmatically.

## Details

To get the issues annotations on the image, you can use this CLI command:  
  

    
    
    codefresh get annotation image-issues <image_id> -o json

  
To get the PR information:  
  

    
    
    codefresh get annotation image-prs <image_id> -o json

## Related Items

[CLI documentation for annotations](https://codefresh-
io.github.io/cli/annotations/get/)

