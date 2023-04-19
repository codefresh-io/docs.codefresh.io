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

# How-to: Docker tagging best practices

#

## Overview

Suggestions and best practices for Docker tags

## Details

  * In general, we suggest using `{{CF_REVISION}}` or `{{CF_SHORT_REVISION}}` for your tag in addition to any other you use.
  * For Branches, it is suggested to prefix this with `{{CF_BRANCH}}`.
  * If you are at a point where you are not making new commits (such as modifying the inline YAML only), you may instead want to consider using an alternative tag. It is not recommended to do this for anything beyond short-term testing.

