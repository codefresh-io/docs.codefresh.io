---
title: "How-to: Trigger a Codefresh pipeline from an image push to Google Container Registry (GCR) or Google Artifact Registry (GAR)"
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

You want to trigger Codefresh pipelines from an image push to GCR or GCP Artifact Registry

## Details

GCR and Google Artifact Registry require some extra steps to get set up. Here is a guide that you can follow to use the Pub\Sub notifications to trigger the Codefresh pipelines:

<https://github.com/codefresh-contrib/gcr-pubsub-functions/tree/master/gcr-cf-pipeline-invoker>
