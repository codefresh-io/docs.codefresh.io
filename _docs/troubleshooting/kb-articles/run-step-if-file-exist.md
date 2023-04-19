---
title: 
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

# How-to: Run a step only if a file exists

#

## Overview

You want to run a step in your pipeline, only if a certain file exists

## Details

  1. Clone your repository
  2. After the clone step, check for existence of file.
  3. If it exists, set your Variable to true. Otherwise, set it to false.
  4. In the appropriate step, check whether the variable is true or not.

    
    
      steps:
        main_clone:
          type: git-clone
          description: Cloning main repository...
          repo: ${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}
          revision: '${{CF_REVISION}}'
        checkFile:
          image: alpine
          commands:
            - if [ -f README.md ]; then cf_export fileExists=true; else cf_export fileExists=false; fi
        confirmFile:
          image: alpine
          commands: 
            - echo $fileExists
          when:
            condition:
              all:
                fileExists: '"${{fileExists}}" == "true"'
    

_**Note** :_

You can use this to also check if a file is missing, or to perform similar
more complicated checks and create a flow for your pipelines.

## Related Items

[Condition Expressions in Codefresh](https://codefresh.io/docs/docs/codefresh-
yaml/conditional-execution-of-steps/#branch-conditions)

