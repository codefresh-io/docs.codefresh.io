---
title: "Release Notes: July 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### Classic Pipelines

#### Select multiple Shared Configurations at once

When an account had many Shared Configurations to add as pipeline variables, you had to add them one at a time.

When you add pipeline variables, you can now select multiple Shared Configurations at once in a single dialog.

For details, see [Shared Configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/).

#### `msteams-notifier` step supports Power Automate Workflows

Microsoft is retiring the legacy Office 365 connectors and incoming webhooks in Microsoft Teams, which the `msteams-notifier` step used to post messages.

The step can now send notifications through Power Automate Workflows. Existing pipelines keep working without changes. To use a workflow, set these arguments on the step:

```yaml
MSTeamsNotification:
  type: msteams-notifier
  arguments:
    USE_POWER_AUTOMATE_WORKFLOWS: 'true'
    MSTEAMS_WORKFLOW_URL: <workflow_url>
```

### GitOps

#### Improved "Update Git Runtime Credentials" drawer

For an installed GitOps Runtime, the **Update Git Runtime Credentials** drawer gave little guidance and linked to the page about personal tokens instead of runtime tokens.

The drawer now has the same content as the **Configure Git Credentials** step of the Runtime installation wizard, including a link to the token generation page and instructions about the required token scopes.

For the scopes required for each Git provider, see [Git tokens for GitOps]({{site.baseurl}}/docs/security/git-tokens/).

## Bug fixes

### Classic Pipelines

#### `codecov-reporter` step failed on every run

The `codecov-reporter` step failed with `gpg: no valid OpenPGP data found` on every run.

The step is fixed in version 2.1.1.

#### `deploy` step failed with `ReferenceError: _ is not defined`

In Classic Runtime 10.3.7, the `deploy` step failed with `ReferenceError: _ is not defined` when it created an image pull secret.

This is fixed in Classic Runtime 10.3.8.

#### ECR integration with a service account ignored the configured region

When an Amazon ECR integration resolved credentials from a service account, the region set in the integration was ignored. Builds logged in to ECR using the region of the runtime instead, so images had to be in the same region as the runtime.

The configured region is now used. The fix is available in Classic Runtime 10.3.8.

#### Cron builds were occasionally duplicated

Cron-triggered builds were sometimes started more than once for a single scheduled run, because the idempotency token of a build request was not always handled correctly. It is fixed now.

#### Pipelines using a Git integration with `/` in its name could not be retrieved

When a pipeline had a Git trigger that used a Git integration with a slash in its name, the pipeline was created but could not be opened, edited, or run. Requests for it returned "pipeline not found", and the UI reported that the pipeline was deleted.

Such pipelines can now be retrieved and managed normally.

#### Runtime installation failed when the API token had trailing whitespace

Installing a Classic Runtime failed during certificate signing with `Cannot sign certificates` and `SyntaxError: Unexpected token 'C', "Content-Le"... is not valid JSON`. This happened when the runtime API token contained a trailing newline, for example, when it was stored in a secret with an extra empty line.

This no longer prevents the installation.

### GitOps

#### Incorrect scopes documented for Bitbucket runtime tokens

The documentation listed incorrect scopes for Bitbucket tokens used by a GitOps Runtime, so a token created with the documented scopes could be rejected when you updated the runtime credentials.

The documentation now lists the correct scopes. For the full list, see [Git tokens for GitOps]({{site.baseurl}}/docs/security/git-tokens/).
