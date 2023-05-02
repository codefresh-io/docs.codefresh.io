---
title: "Codefresh CLI returns error 403: Permission Denied"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [CLI]
support-reviewed: 2023-04-18 LG
---

## Overview

When running the CLI to use Codefresh, it returns error 403: Permission Denied.

## Details

The API key does not have the correct access permissions, or your user doesnot have access. If the user does have correct access permissions, you may need to refresh the API key.

### Updating API Key

1. Log in to Codefresh
2. Select "User Settings"
3. Generate a new API key.
4. Ensure you have the appropriate permissions set.
5. In your CLI, update your context. `codefresh auth create-context --api-key [KEY]`

>_Note:_
>
>If you have multiple contexts, specify this in your command above. `codefreshcauth create-context [name] --api-key <KEY>`

Contact one of your administrators if your user lacks access.

## Related Items

[Codefresh CLI](https://codefresh-io.github.io/cli/)
