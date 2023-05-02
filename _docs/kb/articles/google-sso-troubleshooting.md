---
title: "Google SSO: Troubleshooting"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Settings]
support-reviewed: 2023-04-18 LG
---

## Overview

You receive a "Problem connecting to your SCM provider" or "Internal Server
Error" error message when testing Google / Google SAML login / team sync

## Details

### OpenID Connect

Legacy People API has not been used in the project before, or it is disabled.

1. We are aware that newer projects cannot enable the Legacy People API.
2. We are currently working on using the newer API.
3. Contact support to enable SAML

Admin SDK API has not been used in the project before, or it is disabled.

1. Enable the Admin SDK API for the project.
2. Wait a few moments and try again.

### SAML

Admin SDK API has not been used in the project before, or it is disabled.

1. Enable the Admin SDK API for the project.
2. Wait a few moments and try again.

### Both

The admin email is not a user in the account or is the email of the service
account

1. Use an email address of a user.
2. There is a note on <https://developers.google.com/admin-sdk/directory/v1/guides/delegation> that mentions:  

> Only users with access to the Admin APIs can access the Admin SDK Directory API, therefore your service account needs to impersonate one of those users to access the Admin SDK Directory API. Additionally, the user must have logged in at least once and accepted the Google Workspace Terms of Service.
