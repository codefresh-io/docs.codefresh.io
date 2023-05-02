---
title: 403 Forbidden Error On Codefresh CLI Commands Within Build
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
ht: false
common: false
categories: [CLI, Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

When running a Codefresh CLI command from within a build, it fails with a 403 forbidden error.

## Details

Builds are run with the user context of the user who started it. So if any Codefresh CLI commands within a build fails with a 403 error, that means the user who started the build does not have the permissions to run this command.

1. Make sure this user is intended to have permissions to the actions performed by these CLI commands.
2. As an account admin, make modifications to this user's team assignment and/or your account's permissions rules to grant this user access on relevant objects and actions.

## Related Items

[Configuring Access Control]({{site.baseurl}}/docs/administration/account-user-management/access-control/)
