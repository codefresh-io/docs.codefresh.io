---
title: "Docker image does not exist or no pull access"
description: ""
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: true
categories: []
support-reviewed: 2023-04-18 LG
---

## Issue
Workflow's process fails with similar error message:  

      [SYSTEM] Error: Failed to pull base image: OWNER/REPO:TAG; caused by Error: (HTTP code 404) no such image - no such image: OWNER/REPO:TAG: No such image: codefreshdemo/demochat:feature_test

{% include 
image.html 
lightbox="true" 
file="/images/troubleshooting/codefresh_image_not_found.png" 
url="/images/troubleshooting/codefresh_image_not_found.png"
alt="Codefresh image not found error" 
caption="Codefresh image not found error" 
max-width="60%"
%}

## Solution 
1. If this docker image was created in Codefresh and hasn't been pushed to docker registry. Go to the tab `Images` and check the tag and name of this image.
2. If this docker image was pushed to docker registry. Go to the Integration page and check that you integrated with this docker registry.

## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)