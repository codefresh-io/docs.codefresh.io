---
title: "How-to: Check against potentially unstable service"
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

You are trying to check against a service that may be inaccessible for a
number of reasons, including:

  * Connectivity issues
  * Connection limits
  * Rate limits
  * Unstable service

## Details

In your step, add the `retry` feature. An example follows:

    
    
    steps:
      test:
        image: ubuntu:latest
        commands:
          - api-test-here.sh
        retry:
          maxAttempts: 5
          delay: 5
          exponentialFactor: 2
    

_**Note** :_

During the retry stages, the build will still use up one of your concurrent
builds. For that reason, we suggest limiting the amount of retries.

## Related Items

[Retrying a step](https://codefresh.io/docs/docs/codefresh-yaml/what-is-the-
codefresh-yaml/#retrying-a-step)

