---
title: "How To: Switch Git Context from OAuth to PAT"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Settings, CLI]
support-reviewed: 2023-04-18 LG
---

## Overview

Currently, the git context is set to OAuth but would like to use Personal
Access Token (PAT) instead.

## Details

1. Use the [Codefresh CLI](https://codefresh-io.github.io/cli/) to get all available contexts:  
`codefresh get contexts`  

2. In the output, find the name of the git context you want to update.
3. Use the Codefresh CLI to get the YAML version of the git context and save it to a file:  
`codefresh get context [git-context-name] --decrypt -o yaml > gitContext.yaml`
4. Open the file and switch the YAML to the following. The section that needs to be changed is mainly the `spec.data` section.  

    ```yaml
    apiVersion: v1  
    kind: context
    metadata:
      default: false
      system: false
      name: GITCONTEXT
    type: git.github
    spec:
      type: git.github
      data:
        sharingPolicy: AllUsersInAccount
        auth:
          type: basic
          password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxx
        behindFirewall: false
        sshClone: false
        secretStoreReferences: []
    ```

5. Save the File
6. Use the Codefresh CLI to patch the git context  
    `codefresh patch context -f gitContext.yaml`
7. Now all pipelines and triggers will use PAT instead of OAuth.
