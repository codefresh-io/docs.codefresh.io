---
title: "Pipelines Changelog: January 2022 - January 2023"
description: "Changelog and Release Notes from January 2022 to January 2023"
---

## January 2023
### Features and enhancements

- Git clone step supports shallow clone - [documentation]({{site.baseurl}}/docs/pipelines/steps/git-clone/#fields)

## December 2022
### Features and enhancements
- Track actual disk usage for build in the Disk Usage chart  - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-pipeline-metrics)
- Concurrency limit for pipelines increased to 30 - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#policies)

### Bug fixes
- Runtime monitor fails to start on upgrading EKS (Elastic Cloud Kubernetes) to 1.21.
- Examples missing from the "Workflow" step catalog.

## November 2022

### Features and enhancements

- Set disk space for a pipeline build volume - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#build-runtime)
- Support for latest Kubernetes cluster version 1.24 - [documentation]({{site.baseurl}}/docs/administration/codefresh-runner/#prerequisites)

### Bug fixes

- Workflow API returns 500 Internal Server Error.
- Helm releases not updated by refresh period.
- Get annotations request causes `cf-api` endpoints to restart.

## October 2022

### Features and enhancements

- View/download logs for build or build steps as text, in addition to HTML - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewingdownloading-logs-for-builds-and-build-steps)
- View variables used in pipeline builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-variables-in-pipeline-builds)
- New option to trigger by PR comments from _any_ user - [documentation]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#pull-requests-from-comments)
- macOS/iOS builds are now available for the SaaS platform

### Bug fixes

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


## September 2022

### Features and enhancements

- Pause pipeline execution for account - [documentation]({{site.baseurl}}/docs/administration/pipeline-settings/#pause-pipeline-executions)
- Traceability from child to parent builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#build-details)
- On-premises: `x-hub-signature-256`support for GitHub AE - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#enable-x-hub-signature-256-signature-for-github-ae)
- On-premises: Admins can selectively enable SSO providers for user accounts - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#selectively-enable-sso-providers)
- LDAP login with username and password, with email required only for first time sign-in
- For pipeline triggers/runs with Bitbucket Server, branch selection is supported via pagination or search

### Bug fixes

- Validation error when entering username with period for new user account.
- Filtering pipelines by Tags returns incorrect results when user has read access to a subset of pipelines.



## August 2022

### Features and enhancements

- New setting for Pipeline Concurrency: 0 (maintenance mode) - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#policies)
- Email notifications for successful and failed builds disabled by default for new users - [documentation]({{site.baseurl}}/docs/administration/user-settings/#email-notifications-for-builds)
- Codefresh Classic integration with Codefresh Hosted GitOps - [documentation]({{site.baseurl}}/docs/integrations/codefresh-hosted-gitops/)
- On-premises: New release of Codefresh Classic: v.1.2.12 (July 20, 2022) - [documentation]({{site.baseurl}}/docs/installation/codefresh-on-prem-upgrade/)
- Hosted runtime clusters upgraded to Kubernetes 1.22

### Bug fixes

- Codefresh Classic On-premises: Fixed critical vulnerabilities as of July 2022.
- Resending email invitations results in "Problem sending invite" error.
- Audit search for triggers returns error with no search results (Audit Triggers > Search).
- Pipeline concurrency limit ignored periodically.
- "<" replaced by "&lt;" when creating inline YAML for pipeline via Terraform.
- Step Variables are not resolved in Hooks.

## May 2022
- Datadog integration - [documentation]({{site.baseurl}}/docs/integrations/datadog)

## April 2022
- (On-premises only) Backward compatibility for infrastructure services - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#backward-compatibility-for-infrastructure-services)
- (On-premises only) High-Availability with active-passive clusters - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#high-availability-ha-with-active-passive-clusters)

## March 2022
- Support for Kubernetes 1.21 - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#prerequisites)
- Environment definition enhancements - [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/#creating-an-environment)
- RBAC support for shared configuration - [documentation]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/)
- Cross-account push for Amazon ECR - [documentation]({{site.baseurl}}/docs/pipelines/steps/push/#fields)
- (On-premises only) Retention policy for Codefresh builds - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#retention-policy-for-codefresh-builds)
- Automated termination for 'Delayed' builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#applying-filters-on-the-build-view)



## January 2022 
- Store test results using MinIO objects - [documentation]({{site.baseurl}}/docs/testing/test-reports/#connecting-minio-storage)
- Variables defined in `cf_export` override ones at the pipeline level - [documentation]({{site.baseurl}}/docs/pipelines/variables/#using-cf_export-command)
- Base URL for Codecov integrations - [documentation]({{site.baseurl}}/docs/integrations/codecov-integration)













