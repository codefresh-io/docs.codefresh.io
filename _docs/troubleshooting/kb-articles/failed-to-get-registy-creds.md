---
title: "Failed to get registry credentials (Registry: '#userPassedEcr_%id%' could not be found or invalid credentials)"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

While using AWS ECR as your container registry when using a push step in
pipeline it's failing with "Failed to get registry credentials" error

## Details

Incorrect push step syntax.

Use example below as a reference:

    
    
    push_image_ECR:
      title: Pushing image to ECR
      region: '${{AWS_REGION}}'
      accessKeyId: '${{AWS_ACCESS_KEY_ID}}'
      secretAccessKey: '${{AWS_SECRET_ACCESS_KEY}}'
      type: push
      stage: push
      provider: ecr
      image_name: '${{IMAGE_NAME}}'
      candidate: '${{build_step_name}}'
      tag: '${{CF_BRANCH}}'
    

**_Note_**

This example assumes you're using `provider` name as set in Integrations, not
the `registry` logical name.

