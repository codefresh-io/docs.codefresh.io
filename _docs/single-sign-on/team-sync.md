---
title: Synchronize Teams
description: "Syncing of Teams After Initial SSO Setup"
group: single-sign-on
toc: true
---

## Overview

Once the initial setup is done, you can also sync your teams between Codefresh and the Identity provider.
You can do this via the [Codefresh Cli](https://codefresh-io.github.io/cli/) and specifically the [sync command](https://codefresh-io.github.io/cli/teams/synchronize-teams/).

> Note: Team Sync is available for OIDC Providers.  Syncing with SAML is available with Google only.

For example, to sync you azure teams you can execute

```bash
codefresh synchronize teams my-client-name -t azure
```

You can find the client-name from the SSO UI.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/client-name.png"
url="/images/administration/sso/azure/client-name.png"
alt="SSO Client Name"
caption="SSO Client Name"
max-width="40%"
%}

Even though you can run this command manually it makes more sense to run it periodically as a job. And the obvious
way to perform this, is with a Codefresh pipeline. The CLI can be used as a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/).

You can create a git repository with a [codefresh.yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file with the following contents:

```yaml
version: '1.0'
steps:
  syncMyTeams:
    title: syncTeams
    image: codefresh/cli
    commands:
      - 'codefresh synchronize teams my-client-name -t azure'
```

To fully automate this pipeline you should set a [cron trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/cron-triggers/) for this pipeline. The cron-trigger will be responsible for running this pipeline (and therefore synchronizing the teams) in a fully automated manner.

This way you can synchronize your teams every day/week/hour depending on you cron trigger setup.

## Synchronize Teams Not Inviting New Users

When running the codefresh synchronize teams command, new users will not be invited to Codefresh. The output of the command will look similar to the following:

```json
[
  {
    "action": "update",
    "teams": [
      {
        "team": "developers",
        "members": [
          {
            "members": [],
            "action": "create"
          }
        ]
      },
      {
        "team": "DevOps",
        "members": [
          {
            "members": [],
            "action": "create"
          }
        ]
      }
    ]
  }
]
```

The cause of this is the "Restrict inviting additional users by email address domain" is enabled for the account.

1. Navigate to Account Settings > User & Teams > Security
1. Toggle off "Restrict inviting additional users by email address domain."
1. Save.
1. Rerun the sync command.

## Sync GitHub Organization Teams to Codefresh

As an admin, you may want to sync your GitHub Organization Teams with your Codefresh account. At the same time, you do not want to set up an SSO provider and have the users use any login provider they choose.

The Personal Access Token (PAT) from a user will sync ALL Organizations and ALL Teams to which the user has access. It is recommended to use a "machine" account to access the one organization you need.

1. Create a PAT that has access to read organizations and teams
1. Install and configure the Codefresh CLI
codefresh synchronize teams github -t github --tk $GHTOKEN
1. The sync will invite all users except for those that have private email settings turned on.

Once the initial sync happens, you can set up a cron trigger pipeline to run the command on a schedule.