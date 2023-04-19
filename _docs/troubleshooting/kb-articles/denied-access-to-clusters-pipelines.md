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

# Denied access to Clusters or Pipelines

#

## Overview

Unexpectedly denied access to cluster or pipeline.

## Details

Your user is not part of a team with access.

Permissions for non-admin users are assigned through teams. If permissions are
granted through the "user" team, note that the "user" role does not
necessarily mean you are in the "user" team.

  * Ensure you are on the right Team.
  * To add a user to a team: 
    1. With an Administrative user, go to [Account Settings -> Users & Teams -> Teams](https://g.codefresh.io/account-admin/collaborators/teams) and select the appropriate team
    2. In the upper-right corner, select "Invite to Team"
    3. Type in the team member's username and add them.
  * Ensure your team has the correct permissions.
  * To review or change permissions, go to [Account Settings -> Permissions](https://g.codefresh.io/account-admin/permissions/teams) as an administrative user

_**Note** :_ Teams are what controls your access to pipelines and clusters.
For example, if you are listed as a “user” for your role, but you’re **not**
in the “users” **team** , you won’t have access to the pipelines available
only to **users**.

  * Roles refer to access to the billing, integrations, and team-managing views. Admin roles should be limited to only those that need them.
  * Teams refer to what access you have in terms of pipelines and clusters.
  * Members of the "user" role should automatically be added to the "users" team by default, but users can be removed from this team. So it's possible for someone to be in the "users" role and not have the permissions granted to the "users" team.

