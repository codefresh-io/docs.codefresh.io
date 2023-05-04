---
title: "Building image failed with exit code: 137"
description: "The command returned a non-zero code: 137"
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: true
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Issue

[Build step]({{site.baseurl}}/docs/pipelines/steps/build/) in pipeline fails with the following error:

```shell
The command 'XXXXXXX' returned a non-zero code: 137                                                          
[SYSTEM]                                                                                                                                  
 Message             Failed to build image: r.cfcr.io/<my-image>:my-tag                    
 Caused by           Container for step title: Building Docker Image, step type: build, operation: Building image                         
                     failed with exit code: 137 
```

## Possible cause

This issue occurs where you are low on pipeline resources. The build step does not have enough memory to finish building. You can get an overview of your build resources by clicking in the [metrics]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-pipeline-metrics) tab in the build screen.

{% include image.html
lightbox="true"
file="/images/troubleshooting/not-enough-resources/not-enough-memory.png"
url="/images/troubleshooting/not-enough-resources/not-enough-memory.png"
alt="Not enough memory"
caption="Not enough memory"
max-width="80%"
%}

The error usually happens when Docker does not have enough memory, but it can also appear if there is not enough disk space.

## Solution

* [Set the build space for each pipeline build]({{site.baseurl}}/docs/pipelines/pipelines/#build-runtime).
* If that doesn't work, you need to either simplify your application, for example, split it to microservices, or run the pipeline on a larger machine. For example if the build fails on a `SMALL` machine you should run it on a `MEDIUM` one.  
  
  You can upgrade your account to get access to more resources by updating your [Billing Settings](https://g.codefresh.io/account-admin/billing/){:target="\_blank"} in Codefresh.

## Related articles

[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)
