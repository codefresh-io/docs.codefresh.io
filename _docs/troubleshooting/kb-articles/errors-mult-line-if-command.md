---
title: Errors when running multi-line inline "if" command
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

You are attempting to run a multi-line inline "if" command, but it is not
processing correctly.

## Details

Multiline formatting must follow specific syntax.

We suggest that you instead include the script as a file to be downloaded as
part of your Clone step, or an additional step.

If those options are not available, note:

  * Do not use indentation deeper than your first command.
  * Add semi-colons at the appropriate spots.

    
    
      test:
        title: "Running test"
        image: "ubuntu:latest"
        commands:
          - >-
            if [ ${{VAR}} -eq 42 ];
            then 
            echo "true";
            else 
            echo "false";
            fi
    

  * You can concatenate everything onto one line.

_**Note** :_ We strongly suggest making use of script files where possible.
This aids with GitOps and allows easier configuration changes.

## Related Items

[Stack Overflow: How do I break a string over multiple
lines?](https://stackoverflow.com/questions/3790454/how-do-i-break-a-string-
over-multiple-lines/21699210)

