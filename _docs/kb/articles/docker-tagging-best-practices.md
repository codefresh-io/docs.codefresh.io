---
title: "How To: Docker tagging best practices"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines, General]
support-reviewed: 2023-04-18 LG
---

## Overview

Suggestions and best practices for Docker tags

## Details

* In general, we suggest using {% raw %}`{{CF_REVISION}}`{% endraw %} or {% raw %}`{{CF_SHORT_REVISION}}`{% endraw %} for your tag in addition to any other you use.
* For Branches, it is suggested to prefix this with {% raw %}`{{CF_BRANCH}}`{% endraw %}.
* If you are at a point where you are not making new commits (such as modifying the inline YAML only), you may instead want to consider using an alternative tag. It is not recommended to do this for anything beyond short-term testing.
