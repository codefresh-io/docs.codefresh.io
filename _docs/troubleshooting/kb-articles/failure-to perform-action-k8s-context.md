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

# Failure to perform actions on your selected Kubernetes context

#

## Overview

When trying to perform an action on your selected Kubernetes context (such as
installing a new Codefresh runner), you get the following error:

Kubeconfig user entry is using an invalid API version
client.authentication.k8s.io/v1alpha1.

## Details

Since [kubectl
1.24.0](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.24.md#deprecation),
the client.authentication.k8s.io/v1alpha1 api has been removed. Your installed
kubectl binary is probably at an older version, so it can connect to your
contexts without an issue. Our cli tool is using an updated version of the
Kubernetes client, and so it can not parse your KUBECONFIG file. Make sure you
are running the latest CLI tool for your cloud provider and rerun the
KUBECONFIG generation command for the deprecated contexts. For example if you
are using aws run aws eks update-kubeconfig –name CLUSTER_NAME

  
  

