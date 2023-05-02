---
title: Duplicate builds created from one trigger
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

When a trigger is fired to build a pipeline, multiple builds are scheduled.

## Details

There may be multiple Codefresh webhooks set up on the same repository.

1. Open your Git provider. In this example, we will use GitHub.
2. Open your repository and click settings.
3. Confirm that there should only be one webhook per trigger. If there are multiples, delete them. ![Web hook example]({{site.baseurl}}/images/troubleshooting/webhook.png)

> _Notes_
>
>Multiple webhook triggers may be created on the same repository if you are using multiple git integrations in Codefresh to access the same repository, as each integration will create its own webhook. Please check your integration usage for any duplication and consolidate if necessary.
>
>There are certain actions that generate two git webhook events on the repository side. For example, a pull request merge will also create a commit, so it will generate both a PR merge webhook event and a commit webhook event. Depending on how your trigger is defined, it might start two builds when this happens, one for each webhook event. Be sure to watch out for such overlaps in your trigger.
