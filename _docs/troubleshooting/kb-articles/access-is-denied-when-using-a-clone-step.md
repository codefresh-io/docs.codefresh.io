---
title: Attempting to clone from a repo but access is denied
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

Access is denied when using a clone step

## Details

Insufficient access in the Git integration, or incorrect Git integration
used.:

  * Ensure that the account used in Integrations has the appropriate access.
  * Ensure that in your clone step, you are using the right name for the git provider.
  * If the account used to set up integration is no longer active, you will need to remove the current integration and replace it. 
    1. Go to your [Account Settings -> Integrations -> Git](https://g.codefresh.io/account-admin/account-conf/integration/git).  

      * If you do not have access, please contact one of your team's admins
    2. Update the previous integration with a new token, or delete the previous integration
    3. Create a new integration

_Notes_

When deleting a git integration, you may get an error saying the integration
cannot be deleted while other objects are using it. This means an existing
pipeline is referencing the integration. Please refer to [How-to: Update
Trigger Git Context](https://support.codefresh.io/hc/en-
us/articles/360020967860) on how to find and modify these existing references.
