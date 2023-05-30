---
title: "Pipelines Changelog: September 2022"
description: "Changelog and Release Notes for Pipelines"
---

## Features and enhancements

- Pause pipeline execution for account - [documentation]({{site.baseurl}}/docs/administration/pipeline-settings/#pause-pipeline-executions)
- Traceability from child to parent builds - [documentation]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#build-details)
- On-premises: `x-hub-signature-256`support for GitHub AE - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#enable-x-hub-signature-256-signature-for-github-ae)
- On-premises: Admins can selectively enable SSO providers for user accounts - [documentation]({{site.baseurl}}/docs/administration/codefresh-on-prem/#selectively-enable-sso-providers)
- LDAP login with username and password, with email required only for first time sign-in
- For pipeline triggers/runs with Bitbucket Server, branch selection is supported via pagination or search

## Bug fixes

- Validation error when entering username with period for new user account.
- Filtering pipelines by Tags returns incorrect results when user has read access to a subset of pipelines.
