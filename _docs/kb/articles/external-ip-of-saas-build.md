---
title: "How To: get the external IP of a Codefresh SAAS build"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

Need to get the public IP of the current SAAS Build

## Details

To get the current external IP during a Codefresh SAAS build, you can run
`curl ifconfig.me` within a step in the pipeline:

```yaml
steps:  
  getIP:  
    image: curlimages/curl  
    commands:  
      - curl ifconfig.me
```

>_**Note**_
>
>This IP will vary between builds. Please refer to our [documentation here]({{site.baseurl}}/docs/administration/platform-ip-addresses/) for the full list of Codefresh SAAS platform IP addresses.
