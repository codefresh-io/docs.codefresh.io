---
title: "Release Notes: March 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### Classic Pipelines

#### Force-refresh Bitbucket OAuth tokens with the Codefresh CLI

Pipelines that read a Bitbucket OAuth token from a Git integration, for example, to call the Bitbucket API directly, could receive a token that was already expired or about to expire. The `expires` field in the integration data does not show when the token actually expires, so it cannot be used to decide when to refresh.

You can now get a valid token on demand with `codefresh get context`:

* `--prepare` now works for Bitbucket OAuth integrations. It refreshes the token only if it has expired or expires in less than 10 minutes, so the returned token stays valid for at least the next 10 minutes.
* `--force-prepare` refreshes the token immediately, even if the current one is still valid. It is available in Codefresh CLI 1.1.0 and later.

For example:

```shell
codefresh get context 'Bitbucket-OAuth-integration-name' --force-prepare -o json | jq -r .spec.data.auth.password
```

Run the command before any step that calls Bitbucket. For details on working with contexts, see [Shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/).

#### Stricter AWS region validation for AWS integrations

Region values for AWS-based integrations were not checked on the server. A mistyped region was accepted when saving the integration and only failed later, when a build used it.

When strict validation is enabled for your account, Codefresh now checks the region against the list of public AWS regions supported by the AWS SDK. The check applies to Amazon ECR integrations, AWS S3 Helm integrations, and the `report-image-info` enricher.

## Bug fixes

### Classic Pipelines

#### Pipelines could fail to start when Bitbucket returned an incomplete response

Builds, including builds started by the `codefresh-run` step, sometimes failed with `Failed to run pipeline` when the Bitbucket API timed out or returned an error while Codefresh was reading the latest commit. The underlying error was not retried and was reported as a generic failure. This happened mostly during Bitbucket maintenance windows and incidents, and mainly affected pipelines with Bitbucket triggers.

Codefresh now retries these requests when they fail with a connection error or an error returned by the Git provider, and handles an empty commit response without failing with an internal error.

#### Pipelines could not be started from the UI after a commit made with a Bitbucket repository access token

When the last commit of a branch was made with a Bitbucket repository access token, starting the pipeline manually from the UI failed with the `Error building service` message and the build was not triggered.

Pipelines now start normally when the last commit was made with a repository access token.

#### Builds could fail with "Failed to write template file into filesystem"

On runtimes with a shared filesystem, builds occasionally failed with `Failed to prepare plugin. Failed to write template file into filesystem`, mostly when many pipelines were started at the same time. The failure was caused by a container that could not be stopped after the file was written.

Builds no longer fail when this specific container stop error occurs.

#### Cron triggers sometimes did not start pipelines

Some pipelines with cron triggers were not started at the scheduled time. The services that handle cron triggers were restarted without being reported as crashed, and the scheduled runs that fell into that window were missed.

Scheduled pipelines now start as configured.

#### Quick search opened a malformed link for projects and pipelines with special characters

When a project or pipeline name contained a special character such as `+`, the link from Quick search was not encoded correctly. Opening it either loaded indefinitely or redirected to a different pipeline.

Quick search now encodes project and pipeline names in the link, so the correct pipeline opens.

### GitOps

#### The GitOps Runtime pre-install validation rejected supported Argo CD versions

When upgrading to GitOps Runtime 0.28.0 or later with your own Argo CD (BYOA), the validation hook failed with an error such as `Argo CD version v3.3.2 does not satisfy required range '>=3 <=3.2'`, even though the release notes listed the version as supported. The workaround was to set `installer.skipValidation: true`.

The validation now uses the correct supported Argo CD version range, and the upgrade no longer needs the validation to be skipped.
