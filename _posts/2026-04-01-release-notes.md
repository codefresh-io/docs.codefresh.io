---
title: "Release Notes: April 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### GitOps

#### `cap-app-proxy` runs as a non-root user

Security policies in some organizations do not allow containers to run as root, which blocked the use of the `cap-app-proxy` component of the GitOps Runtime.

`cap-app-proxy` now runs under a non-root user. This change is available starting with GitOps Runtime 0.29.4.

## Bug fixes

### Classic Pipelines

#### `git-clone` step failed with `grep: command not found` and could use outdated code

A recent update of the `git-clone` step image was built without the `grep` utility. The step logged `grep: command not found`, and as a result skipped resetting the checked-out branch to the latest commit. Builds that reused an existing volume could therefore build outdated code, unless **Reset pipeline volume** was enabled in the trigger settings.

The image now includes all required utilities, and the step updates the branch to the latest changes again. The fix is available in Classic Runtime 10.0.13.

#### Bitbucket integrations failed after Bitbucket deprecated some API endpoints

Bitbucket deprecated several API endpoints that Codefresh relied on, and calls to them started to return HTTP 410. As a result, creating a Bitbucket integration with an API token failed with `Error occurred while verifying credentials`, and builds that used a Bitbucket OAuth integration intermittently failed with rate limit errors.

Codefresh no longer uses the deprecated endpoints, so you can create Bitbucket integrations with an API token again, and builds with OAuth integrations no longer fail with these rate limit errors.

All Codefresh accounts that use OAuth share a single Bitbucket OAuth consumer and its rate limit quota, so we recommend the API token method for busy accounts. For details, see [Bitbucket]({{site.baseurl}}/docs/integrations/git-providers/#bitbucket) in the Git provider integrations documentation.

### GitOps

#### GitHub token link generated after runtime installation did not request all required permissions

After you installed a GitOps Runtime, the link that Codefresh generated for creating a GitHub token did not include the `user:email` permission. This permission is required to initialize the Internal Shared Configuration repository from the Runtime.

The generated link now requests all required permissions.
