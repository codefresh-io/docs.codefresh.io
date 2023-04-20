---
title: Public or private repositories missing from Trigger configuration
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

Unexpected lack of access to public and/or private repositories where it was
present before. An example follows:

![Missing
repositories](https://support.codefresh.io/hc/article_attachments/360016049959/repos-
missing.png)

## Details

  * There is an issue connecting to the Git provider, or
  * The token used for adding Git integration is no longer valid, or lacks access

If the Git provider is currently experiencing issues, we will need to wait
those out.

  * If the Integration is via a user, ensure this user has the appropriate access levels.
  * If the Integration is via a Token, ensure that the token is still valid and has full access.

In the event that you are not able to make these changes, you may need to
create a new integration. This can be done under your account settings.

