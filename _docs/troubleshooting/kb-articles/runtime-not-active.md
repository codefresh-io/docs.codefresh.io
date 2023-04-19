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

# Runtime Not Active

#

## Overview

  * “Runtime was not active for more than an hour”

![runTimeInactive.png](https://support.codefresh.io/hc/article_attachments/4407771443228/runTimeInactive.png)

  * Upgrade of a runtime still shows the old version in the UI

## Details

  * GitHub Personal Access Token configured in autopilot-secret had expired

Update the value in the git token

    
    
    $ export GIT_TOKEN=*new_GIT_TOKEN*

Create a patch file to patch the secret

    
    
    $ cat << EOF > patch_file.json  
    [  
    {  
    "op" : "replace" ,  
    "path" : "/data/git_token" ,  
    "value" : $( echo -n $GIT_TOKEN | base64)   
    }  
    ]  
    EOF

Update the secret with the new git token value, update '-n codefresh' with the
name of your runtime.

If you use kubectl 1.20.20 and above:

    
    
    $ kubectl patch secret autopilot-secret -n codefresh --type='json' --patch-file patch_file.json

For older kubectl versions:

    
    
    $ kubectl patch secret autopilot-secret -n codefresh --type='json' -p "$(cat patch_file.json)"

Cycle the 'events-reporter-eventsource-' pod

    
    
    $ kubectl delete pod -n codefresh -l eventsource-name=events-reporter  
      
    

