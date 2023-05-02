---
title: "Hangs on restoring data from pre-existing image"
description: ""
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: true
categories: [Pipeline]
support-reviewed: 2023-04-18 LG
---

## Issue

Restoring data from pre-existing image step seems to hang when starting new build for pipeline.

## Possible cause

This issue might occur when your volume size is large.

Codefresh has the unique capability of working on a single file system between different builds, by provisioning a volume per pipeline and restoring it upon starting a new build.

If the first step seems to hang for a significant amount of time when restoring the data, this might suggest that your volume size is very big.

{% include
image.html
lightbox="true"
file="/images/troubleshooting/restore-data-hangs-example.png"
url="/images/troubleshooting/restore-data-hangs-example.png"
alt="First build step hangs when starting new build - example"
caption="First build step hangs when starting new build - example"
max-width="60%"
%}

## Solution

Delete that volume and start from scratch.

* In the build wizard pop-up, from **Advanced Options**, select **Reset pipeline volume**.

{% include
image.html
lightbox="true"
file="/images/troubleshooting/reset-volume-for-hanging-step.png"
url="/images/troubleshooting/reset-volume-for-hanging-step.png"
alt="Reset volume for pipeline build"
caption="Reset volume for pipeline build"
max-width="60%"
%}

>Reseting the pipeline volume may cause your build to take longer than usual.

## Related articles

[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)
