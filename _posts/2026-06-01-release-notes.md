---
title: "Release Notes: June 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### Classic Pipelines

#### Reauthorize Bitbucket OAuth Git contexts

Bitbucket Git contexts that use OAuth could not be de-authorized and then authorized again. This became a problem when the underlying OAuth application credentials changed, because existing contexts stopped working and could not be reconnected.

You can now de-authorize a Bitbucket OAuth Git context and authorize it again, so that existing contexts can be reconnected against the current OAuth application without recreating them.

For details on Bitbucket authentication methods, see [Git provider pipeline integrations]({{site.baseurl}}/docs/integrations/git-providers/).

#### GitHub Action Executor step deprecated

The `github-action-executor` step in the Steps Marketplace relied on the layout of GitHub Marketplace pages, and stopped working after GitHub changed those pages. The functionality has been unsupported for some time, and the step is now formally deprecated. The related page has been removed from the Codefresh documentation.

If your pipelines use this step, replace it with a freestyle step that runs the tools you need.

### GitOps

#### Choose between Git permissions and rules for View access to applications

By default, access to view GitOps applications is evaluated against the user's permissions in the Git repositories of the applications. This made it hard to move to rule-based access control, because Git permissions kept applying on top of the rules.

You can now disable Git-based View permissions for your account and rely only on the permission rules you configure. You manage this yourself on the GitOps Permissions page, in **Account settings → Permissions**, and you can switch back at any time.

Adding View rules has no effect on access until you turn off Git-based permissions. Permission rules do not restrict account administrators.

For details on defining rules, see [Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/).

## Bug fixes

### Classic Pipelines

#### Build status was sometimes incorrect with `strict_fail_fast: true`

For pipelines that used `mode: parallel` together with `fail_fast: false` and `strict_fail_fast: true`, the build status was sometimes reported as successful even though a step had failed. Running the same build repeatedly could produce different final statuses.

Builds with these settings now always finish with the correct status. The fix is available in Classic Runtime 10.3.4.

#### Builds failed with `Cannot read properties of undefined (reading 'serviceNetworkName')` for pipelines managed with Terraform

When a pipeline was created or updated through the Codefresh Terraform provider with `original_yaml_string`, the `services` section of the YAML was not saved in the pipeline specification. Builds that used service containers then failed with `Cannot read properties of undefined (reading 'serviceNetworkName')`.

The Terraform provider now reads the `services` section from `original_yaml_string` and saves it in the pipeline specification. The fix is available in version 1.2.1 of the Terraform provider.

#### Okta team sync failed with a concurrency limit error

Syncing teams from Okta sent many requests in parallel. Okta rejected them with `This API token has made too many concurrent requests`, so the sync did not complete.

Codefresh now keeps the sync within the Okta concurrency limit.

### GitOps

#### Commit statuses request failed for releases without commits

Requesting commit statuses for a release that had no commits failed with an error, and commit statuses were not displayed.

The request now completes for releases without commits.
