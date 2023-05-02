---
title: "Postgres: LOG: received fast shutdown request after initialization"
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

You are seeing `LOG: received fast shutdown request`. You are then experiencing issues with your Postgres service.

## Details

This is normal and part of the Postgres initialization process. You can follow the rest of the logs and see that it is still booting up.

We suggest searching for other logs that could indicate what the problem is.
