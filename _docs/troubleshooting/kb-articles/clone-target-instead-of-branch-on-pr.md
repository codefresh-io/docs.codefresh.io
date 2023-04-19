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

# How-to: Clone target instead of source branch on pull request

#

## Overview

In most cases, builds will use the variable `CF_BRANCH` to reference the
branch associated with a git triggered build.

In a pull request triggered build, `CF_BRANCH` specifically refers to the
source branch, and another variable `CF_PULL_REQUEST_TARGET` refers to the
target branch. You may need to use the target branch instead in your merge
build.

## Details

  * Create a separate pipeline that uses `${{CF_PULL_REQUEST_TARGET}}` instead of the standard `${{CF_BRANCH}}  
`or

  * Add the following step before your clone step to check if `CF_PULL_REQUEST_TARGET` exists, and if it does assign its value to `CF_BRANCH`:

    
    
     update_branch_var:
       type: freestyle
       description: "Updating clone branch var to PR target branch"
       stage: 'clone'
       arguments:
         image: 'alpine:3.8'
         commands:
            - cf_export CF_BRANCH='${{CF_PULL_REQUEST_TARGET}}'
        when:
            condition:
              all:
               whenTargetExists: 'includes("${{CF_PULL_REQUEST_TARGET}}", "{{CF_PULL_REQUEST_TARGET}}") == false'
    

_Notes_ `CF_BRANCH` is the source branch in a PR-initiated build. By updating
its value to the value of `CF_PULL_REQUEST_TARGET` the target will be pulled
instead. This variable only exists for PR triggered builds, and if not present
the build will clone the source branch instead.

