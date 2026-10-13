---
title: "Release Notes: May 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### Classic Pipelines

#### Updated `kubectl` versions in the Kubernetes deploy step

The `deploy` step uses a bundled `kubectl` client and supports the three most recent Kubernetes minor versions. With the release of Kubernetes 1.35 and the end of life of 1.32, the supported `kubectl` versions in the step were updated accordingly.

For details on the step, see [Deploy step]({{site.baseurl}}/docs/pipelines/steps/deploy/).

## Bug fixes

### Classic Pipelines

#### `git-clone` step did not download Git LFS files

After the `git-clone` step release, cloning a repository that tracks files with Git LFS returned only the small pointer files instead of the actual content. This could break later steps that depend on those files, such as image builds.

Git LFS files are now downloaded as expected.

#### Kubernetes resources were not shown in the Codefresh UI

Kubernetes resources were not shown in the Codefresh UI for affected runtimes.

The platform-side configuration that caused this issue was corrected, and resources are now displayed correctly in the Codefresh UI.

#### `codefresh-report-image` step version 1.0.11 was missing from the Step Marketplace

Version 1.0.11 of the `codefresh-report-image` step existed in the public steps repository, but it was not listed in the Step Marketplace and pipelines that referenced it failed.

The version 1.0.11 is now published to the Step Marketplace.

#### Documentation: retries are disabled in debug mode for the Codefresh CLI

Enabling debug mode in the Codefresh CLI turns off automatic retries of failed requests, so that the exact network errors can be captured in the logs. Because of this, temporary network issues, such as socket hangups, fail the command immediately. For example, a `codefresh-run` step could terminate its child build on such a failure.

This behavior is now documented in [How To: Enable debug mode when using Codefresh CLI]({{site.baseurl}}/docs/kb/articles/debug-mode-cli/). Use debug mode for troubleshooting rather than for everyday builds.

### GitOps

#### Image reporting failed in GitOps Runtime

Image reporting steps in GitOps workflows failed after upgrading to GitOps Runtime 0.29.8. Pipelines using the `codefresh-report-image` step failed with `TypeError: Cannot set properties of undefined (setting 'repoDigest')`.

GitOps Runtime 0.29.9 includes updated image enrichment and reporting images that fix the error. If you applied a workaround by overriding the `reportImage`, `gitEnrichment`, and `jiraEnrichment` image tags in your values, remove the override when you upgrade.

#### `cap-app-proxy` could not write to `/tmp` in restricted environments

After upgrading to GitOps Runtime 0.29.9, `cap-app-proxy` failed to clone Git repositories with `could not create leading directories of '/tmp/...': Permission denied`. This affected clusters that run containers with a read-only root file system, such as OpenShift, and blocked the upgrade.

This is fixed in GitOps Runtime 0.29.10. Upgrade to GitOps Runtime 0.29.10 or later. If you added an `emptyDir` volume mounted at `/tmp` for `cap-app-proxy` as a workaround, you can remove it.
