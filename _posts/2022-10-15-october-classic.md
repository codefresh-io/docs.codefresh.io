---
title: "October 2022 - Classic"
description: "Changelog and Release Notes For Classic"
---

## Features and enhancements

- View/download logs for build or build steps as text, in addition to HTML - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewingdownloading-logs-for-builds-and-build-steps)
- View variables used in pipeline builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-variables-in-pipeline-builds)
- New option to trigger by PR comments from _any_ user - [documentation]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#pull-requests-from-comments)
- macOS/iOS builds are now available for the SaaS platform

## Bug fixes

- Selecting Cron trigger when cloning a pipeline, clones the pipeline without the Cron trigger.
- Unable to delete clusters in a runtime even with Admin privileges.
- When creating or editing Helm boards, Promote pipeline selected reverts to Default Pipelines on save.
- Rollback status not updated in the UI after successful completion.
- Failed test report step deletes artifacts instead of retry.  
- `get team users` command does not return User IDs.
- Repo (Origin Repo and Branch) links from the Builds or Build Details pages to GitHub Enterprise go instead to GitHub.  
- Email does not match error during sign-in to Azure with Corporate SSO when already authenticated.
- Authentication required error when pushing images to ACR (Azure Container Registry) using Service Principal credentials.
- Inconsistent results for Test Connection in ACR integration.
- Search results for pipelines in the Pipeline page include _all_ pipelines.
- (On-premises) LDAP login failure after upgrade to latest release.
- (On-premises) Release version either not visible in Codefresh UI, or does not reflect actual version.
