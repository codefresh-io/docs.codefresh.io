---
title: "How-to: Stop a freestyle step from failing on a first command with non-zero exitcode"
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

By default codefresh adds `set -e` to the beginning of the freestyle step commands list so the step will be considered as failed on first command returning non-zero exitcode. However, you might need to reconfigure what is considered an error for some commands for example `terraform plan` with `--detailed-exitcode` flag which will return 2 when there are changes to apply

## Details

To override the default behavior you just need to put `set +e` before the command (or a group of commands) that shouldn't fail the whole step and set it back with `set -e` to get back to the default behavior for all further commands in the step.

### Example

```yaml
commands:  
  - |-
    set +e
    terraform plan -out terraform-plan -input=false -detailed-exitcode
    export t_exitcode=$?
    set -e
    echo $t_exitcode
  ...
```
