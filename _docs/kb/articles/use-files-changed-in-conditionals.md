---
title: "How-to: Use files changed in conditionals"
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

You want to make use of the files changed in conditionals to block or allow certain steps.

## Details

Using `git show` will show the latest changes. Combined with Grep, this will allow us to see if a certain file changed, and based on that set a variable.

```shell
if git show | grep filechanged.txt; then
    cf_export variable=true
else
    cf_export variable=false
```

We suggest putting this in a bash script rather than inline. You can then use this variable in conditionals.

>**_Note:_**
>
>If you are looking for an all-or-nothing approach, we suggest using the glob expression checker as part of your trigger. If the logic grows to be significantly different, we would suggest relying on multiple pipelines instead.
