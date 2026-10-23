---
title: "Release Notes: August 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### Classic Pipelines

#### Fewer redundant API calls to Bitbucket

Busy accounts that use Bitbucket Git integrations could hit the Bitbucket API rate limit because Codefresh sent redundant API requests.

Codefresh now avoids redundant calls to the Bitbucket API, which significantly reduces the number of requests sent to Bitbucket for some endpoints.

### GitOps

#### Argo CD upgraded to 3.4 in GitOps Runtime

The Argo CD bundled with the GitOps Runtime is upgraded to version 3.4.

For upgrade considerations, see the [Argo CD 3.3 to 3.4 upgrade guide](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/3.3-3.4/){:target="_blank"}.

## Bug fixes

### Classic Pipelines

#### One `codefresh-run` step could start duplicate child builds

In some cases, a single `codefresh-run` step started two child builds instead of one. Codefresh protects against duplicate runs when a request is retried, and this protection had gaps.

The handling of repeated run requests is reworked to cover the gaps, so each `codefresh-run` step starts only one build.

#### Builds failed to start when Bitbucket returned a temporary server error

When Bitbucket returned a 500 error while Codefresh was reading the pipeline specification or commit details, the build failed with `Failed to run pipeline`.

Codefresh now retries such requests in more cases and writes clearer log messages about the failed call.

#### `Reset volume` step failed after upgrading to Classic Runtime 10.5.1

After upgrading to Classic Runtime 10.5.1, the `Reset volume` step failed on some builds, which sometimes prevented builds from starting.

The issue is fixed now.

#### Docker cleaner in the `dind` pod used an outdated Docker API version

The `docker-cleaner` that runs inside the `dind` pod used a hardcoded Docker API version. With a current Docker daemon, `dind` logged `client version <x> is too old. Minimum supported API version is <y>`, and the cleaner could not work correctly.

The cleaner no longer uses a fixed version and negotiates the API version with the Docker daemon.

#### Pipeline name and description were rendered incorrectly on the pipeline settings page

On the pipeline settings page, the pipeline name was displayed as plain text instead of a non-editable field, and the description field looked incorrect.

Both fields are now displayed correctly.

### GitOps

#### Runtime Health did not show the real status of runtime applications

When the runtime could not clone its Git sources, for example, because the runtime token expired, the runtime applications changed to the `Unknown` sync status. The Runtime Status panel still showed the runtime and its sources as healthy (green).

The Runtime Status panel now reflects the status of the runtime applications.
