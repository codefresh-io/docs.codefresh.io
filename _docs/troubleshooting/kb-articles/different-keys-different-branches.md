---
title: "How-to: Use different keys for different branches"
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

You would like different branches to deploy to different locations, or
otherwise use different keys depending on the branch.

## Details

In this article, we will provide an example of using conditionals for the
purposes of selecting the appropriate AWS key. Please see the following
example, which will set the `AWS_ACCESS_KEY_ID` variable based on whether the
branch is master or a dev branch. Note that both `MASTER_AWS_ACCESS_KEY_ID`
and `DEV_AWS_ACCESS_KEY_ID` are set as protected variables in this pipeline.

    
    
    version: '1.0'  
      
    steps:  
      export_master_creds:  
        title: 'Export master branch credentials'  
        image: 'alpine:latest'  
        commands:  
          - cf_export AWS_ACCESS_KEY_ID=$MASTER_AWS_ACCESS_KEY_ID > /dev/null  
        when:  
          branch:  
            only:  
              - master  
      
      export_dev_creds:  
        title: 'Export dev branch credentials'  
        image: 'alpine:latest'  
        commands:   
          - cf_export AWS_ACCESS_KEY_ID=$DEV_AWS_ACCESS_KEY_ID > /dev/null  
        when:  
          branch:  
            only:  
              - /dev-.*/i  
      
      aws_cli_step:   
        image: etc //provide the remainder of your deploy step here 

_Notes_

You can also make use of a single freestyle step to perform this. We would
suggest using a shell script to compare `${{CF_BRANCH}}` according to your use
case.

We suggest looking into Branch Protection from your Git provider if this is
being done for access control.

