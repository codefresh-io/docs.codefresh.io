---
title: "Clone error: temp directory .git/rebase-apply"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

A Git clone step fails with the following error:

{% raw %}

```shell
It seems that there is already a rebase-apply directory, and   
I wonder if you are in the middle of another rebase. If that is the  
case, please try  
git rebase (--continue | --abort | --skip)  
If that is not the case, please  
rm -fr ".git/rebase-apply"  
and run me again. I am stopping in case you still have something  
valuable there.
```

{% endraw %}

## Details

This error occurs if there was a conflict during a previous rebase and the rebase was not finished.

  1. [Reset your pipeline volume]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#advanced-options)
  2. If this happens frequently for your repository, consider adding a cleanup step to clear out the clone directory at the beginning of your build:

{% raw %}

```shell
cleanup:  
  title: "Cleanup repo directory"  
  image: "alpine:latest"  
  working_directory: "/codefresh/volume"  
  commands:  
    - rm -rf ${{CF_REPO_NAME}} || true
```

{% endraw %}
