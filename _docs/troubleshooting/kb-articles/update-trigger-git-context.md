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

# How-to: Update Trigger Git Context

#

## Overview

You have created a new git integration with updated credentials, and need to
update existing triggers to use this other integration.

## Details

### Recreate the trigger

If you prefer to work through the UI, the solution would be to delete and
recreate the trigger, selecting the proper git integration from the dropdown
list when you define the new trigger.

### Edit the trigger in place

If you would like to edit this trigger in-place rather than totally recreate
it, you will need to do this through the Codefresh CLI or API.

To update the git integration on a trigger via CLI:

  1. Run `codefresh get pipelines [projectname]/[pipelinename] -o yaml > pipeline.yml` to get the pipeline spec yaml for the pipeline you need to update.
  2. In the yaml file, look for `spec.triggers[].context`:

    
    
    spec:
      triggers:
        - name: myrepo
          type: git
          ...
          context: github-1
    

  3. Update this `context` field with the name of the new git integration you would like to use. Note that if there are multiple triggers defined on this pipeline that you would like to update, you will need to change this field under each individual trigger.
  4. Run `codefresh replace -f pipeline.yml` to update your pipeline.

**_Note_** This command can help you find the list of pipelines that reference
a specific git integration in any of its triggers (requires `jq`): `codefresh
get pip --limit 1000 -o json | jq '.[] |
select(contains({"spec":{"triggers":[{"context":"YourGitContextName"}]}}) ) |
{PipelineName:.metadata.name}' | jq -r '.[]'`

