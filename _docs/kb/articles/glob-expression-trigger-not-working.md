---
title: Glob expression on a trigger is not working
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

The glob expression that is set up for a trigger is not working correctly.

## Details

**Cause** | **Solution**  
---|---  
You are using a single expression, but are encasing them in curly brackets `{folderName/**}` | Do not encase them in in curly brackets. Instead use `folderName/**`<br><br>Curly brackets are only used for multiple expressions.  
Incorrect syntax for negation expressions | Proper syntax: `!folderName/**` for a single path, `!{folderName/**,folder2Name/**}` for multiple expressions. To match all files in a directory except for a specific pattern, use syntax `folderName/!(fileToIgnore)**`.  
Changed files are in hidden directories | Glob expressions will not match for hidden directories unless the directory pattern explicitly starts with `.`.<br><br>For example, to match for all files in all hidden subdirectories immediately under `folderName`, use `folderName/.*/**`.<br><br>Note that you will need an additional expression if you want to also match normal subdirectories under `folderName`.  
List of actual changed files is different than expected | Review the full webhook event payload either in [Codefresh trigger audit logs](https://g.codefresh.io/account-admin/audit/audit-triggers), or in your git provider's webhook event history. The payload will contain the full list of modified files for the specific event, exactly as given by your git provider.  
Incorrect glob expression | You can [check your glob expressions with a tool](https://www.digitalocean.com/community/tools/glob) to ensure the syntax matches the correct files.  
Glob expression is correct; trigger is not starting builds for a different reason | Try removing the glob expression filter to confirm if that's the source of the issue.<br><br>Check your other trigger configs such as event types, target branch, etc.  
Modified file glob expression is not supported for this trigger event type | Support for specific events can vary between different git providers due to differences in the information they include in their webhook event payloads. Please refer to [the documentation on modified files filters]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#using-the-modified-files-field-to-constrain-triggers-to-specific-folderfiles).<br><br>Support for BitBucket branch push is controlled by feature flags that may be off for your account. Please contact support if you would like to enable this.  
  
## Related Items

[Git Triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/)
