---
title: Error building service when running pipeline
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

When attempting to start a build manually, an error appears: **Error building
service when running pipeline**

## Details

A connection to the appropriate repository or YAML file cannot be made, or
there is an error in the YAML syntax.

  * If you are [using a legacy pipeline that references a Personal Git Provider](https://codefresh.io/docs/docs/troubleshooting/personal-git-deprecation), this is prone to happen.

    * This requires actions from Codefresh support to resolve. Please contact us by opening a support ticket and providing a link to the affected pipelines.
  * If using pipeline YAML from repository with an "Auto-Select Branch":

    * If build is triggered manually, ensure you select a trigger that is associated to the Git repo containing this pipeline YAML. 
      * Codefresh needs the information provided through a trigger to determine which branch to pull the pipeline YAML from.
    * Ensure that the branch you are using has the associated YAML.
  * If using in-line YAML:

    * Fix any errors indicated in the YAML editor.
    * If no errors appear, ensure that any steps referenced exist. For example, if you have `working_dir` set to `${{colne}}` instead of `${{clone}}`, this error can appear.

_Notes_ If this still does not work, please open a ticket and include a link
to the pipeline(s).

