---
title: "Error loading config file .kube/config"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines, Settings]
support-reviewed: 2023-04-18 LG
---

## Overview

Pipeline is failed with following error: `loading config file
"/codefresh/volume/sensitive/.kube/config": v1.Config.Contexts:
[]v1.NamedContext: Clusters: []v1.NamedCluster: v1.NamedClu ster.Name:
Cluster: v1.Cluster.Server: CertificateAuthorityData: decode base64: illegal
base64 data at input byte 0, error found in #10 byte of ...|-data":"-","s
erver":|..., bigger context ... etc..`

## Details

Kubernetes cluster was reconfigured or deleted from Account settings ->
Integrations -> Kubernetes

  1. Go to your Account Settings. _If you do not have access, please contact one of your team's admins_
  2. Check if there is a cluster that is used in your pipeline, if not, add it
  3. Trigger a new build with [Reset pipeline volume](https://codefresh.io/docs/docs/configure-ci-cd-pipeline/triggers/git-triggers/#advanced-options)

