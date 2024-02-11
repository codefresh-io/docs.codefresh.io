 --
title: "How To: External Secrets Operator with AWS Secrets Manager"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: true
categories: [Ops, Runtimes]
support-reviewed: 2024-01-07 LG
---

## Overview

This article explains how to install and use the [External Secrets Operator](https://external-secrets.io/latest/) with [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/).

### Pre-Reqs

- GitOps Runtime Installed
- A Git Source is added to the Runtime
  - Usage in this doc has it pointing to the path of `gitops/argocd`
- AWS Account

## Details

### Installation

First, you need to install the External Secrets Operator. To do that, we are going to add an Application to your Git Source. Create a file in your Git Source called `external-secrets-operator.yaml` and use the below application to install. Once done, save, commit, and push to your repo.


```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: external-secrets-operator
  finalizers:
    - resources-finalizer.argocd.argoproj.io/foreground
spec:
  project: default
  source:
    repoURL: https://charts.external-secrets.io
    targetRevision: 0.9.11 # make sure to change this to the version you need
    chart: external-secrets
  destination:
    name: in-cluster
    namespace: external-secrets # you can use any namespace
  syncPolicy:
    automated:
      prune: false
      selfHeal: false
      allowEmpty: false
    syncOptions:
      - PrunePropagationPolicy=foreground
      - Replace=false
      - PruneLast=false
      - Validate=true
      - CreateNamespace=true
      - ApplyOutOfSyncOnly=false
      - ServerSideApply=true
      - RespectIgnoreDifferences=false
```


You should now see this application when viewing the [application dashboard](https://g.codefresh.io/2.0/applications-dashboard/list).

### Usage