---
title: "Codefresh On-Prem: no space left on device errors in build log"
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

After some time you can start receiving `no space left on device` errors in the build logs of your codefresh on premises. The article is only applicable in case of using the built-in cf-builder runtime. We strongly recommend using codefresh runner runtimes for any production workload

## Details

For some specific cases our built-in clean-up scripts might not be optimal for your storage size and type of workloads

Exec an interactive shell in all of your cf-builder-xxx pods and check the disk space used in the output of the following command where X is the builder pod number:

`kubectl exec -it -ncodefresh cf-builder-X -- sh -c 'df -i | grep /var/lib/docker'`

and

`kubectl exec -it -ncodefresh cf-builder-X -- sh -c 'df -h | grep /var/lib/docker'`

if confirmed the disk is full you can try the following: exec in every builder pod

`docker rmi -f $(docker images -f "dangling=true" -q)`  

wait before the operation completes

check the disk space one more time to make sure you freed up enough space

>_Notes_  
>If this issue happens quite often, please open a ticket for the support team
