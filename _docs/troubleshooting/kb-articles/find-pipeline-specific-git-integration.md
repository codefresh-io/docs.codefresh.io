# How To: Find Pipelines Using a Specific Git Integration

#

## Overview

You have an old git context and are unable to delete the integration. Or you
want to migrate to a new Git Integration.

## Details:

Run the following CLI command to get the names of pipelines that reference the
Git Integration for a Trigger, using to get YAML from Repository, or specified
in a git-clone step while using an Inline YAML. You will need to have JQ
installed for this to work.

    
    
    codefresh get pip --limit 100 -o json | \  
    jq --arg v "GIT_INTEGRATION" -r '.[] | select(contains({"spec":{"triggers":[{"type":"git", "context":$v}]}}) or contains({"spec":{"specTemplate":{"context":$v}}}) or contains({"spec":{"steps":$v}})) | .metadata.name'

