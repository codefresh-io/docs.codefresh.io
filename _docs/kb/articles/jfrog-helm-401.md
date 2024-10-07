---
title: Helm error 401 Unauthorized when using Jfrog/Artifactory
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

You get this error message when trying to push\install a chart with
Jfrog/Artifactory:

```shell
Error: looks like "https://example.jfrog.io/artifactory/helm-prod/" is   
not a valid chart repository or cannot be reached: failed to   
fetch https://example.jfrog.io/artifactory/helm-prod/index.yaml : 401 Unauthorized
```

## Details

Add `credentials_in_arguments: true` as an Argument in the Helm step, for example:

```yaml
step-name:  
    title: "Pushing Helm Chart to HELM REPO"  
    type: "helm:1.1.12"  
    arguments:  
      helm_version: "3.0.1"  
      action: "push"  
      chart_name: "chart-name/nginx-test"  
      credentials_in_arguments: true
```

## Related Items

[Release a Helm chart official step description](https://g.codefresh.io/steps/helm)
