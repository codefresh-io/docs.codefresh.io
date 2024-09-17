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
support-reviewed: 2024-07-24 LG
---

## Overview

When running the CLI to use Codefresh, it returns error 403: Permission Denied.

## Details

The API key does not have the correct access permissions, or your user does not have access. If the user does have correct access permissions, you may need to refresh the API key.

If thishappen within a build, builds are ran with the user context of the user who started it. So if any Codefresh CLI commands within a build fails with a 403 error, that means the user who started the build does not have the permissions to run this command.

### Updating API Key

1. Log in to Codefresh
2. Select "User Settings"
3. Generate a new API key.
4. Ensure you have the appropriate permissions set.
5. In your CLI, update your context. `codefresh auth create-context --api-key [KEY]`

>_Note:_
>
>If you have multiple contexts, specify this in your command above. `codefreshcauth create-context [name] --api-key <KEY>`

### Update Permissions

Contact one of your administrators if your user lacks access. As an account admin, make modifications to the user's team assignment and/or your account's permissions rules to grant the user access on relevant objects and actions.
