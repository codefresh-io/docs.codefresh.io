---
title: "Codefresh On-Prem: Mongo Topology was destroyed error"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [On-Prem]
support-reviewed: 2023-04-18 LG
---

## Overview

Platform is not functioning properly after restart of one of the k8s nodes or after in-cluster networking issues

## Details

Some of the codefresh microservices lost connection to mongo DB or rabbitmq and unable to reconnect

Restart the pods in the codefresh installation namespace in the following order:

* `cf-mongodb-XXXX`
* `cf-rabbitmq-XXXX`
* `cf-redis-XXXX`
* `cf-store-XXXX`
* `all other pods`

Wait until all the pods are in `Running` status and check the UI behavior
