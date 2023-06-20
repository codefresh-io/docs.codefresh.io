---
title: "How To: Install from package.json not located in root directory"
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

You want to run npm install from a directory that is not the root directory.

## Details

### Option 1: Set the working directory

In your step, change the `working_directory` setting from {% raw %}`${{clone_step}}`{% endraw %} to {% raw %}`${{clone_step}}/subdir`{% endraw %}.

### Option 2: Change directory in step

In your step, add a command to change the directory:

```yaml
commands:   
  - cd subdir   
  - npm install
```

>**_Note_**
>
>This logic can be applied for anything you need to use subdirectories for.

## Related Items

[Working Directories]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#working-directories)
