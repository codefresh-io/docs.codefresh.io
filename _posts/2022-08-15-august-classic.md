---
title: "August 2022 - Classic"
description: "Changelog and Release Notes For Classic"
---

## Features and enhancements

- New setting for Pipeline Concurrency: 0 (maintenance mode) - [documentation]({{site.baseurl}}/docs/pipelines/pipelines/#policies)
- Email notifications for successful and failed builds disabled by default for new users - [documentation]({{site.baseurl}}/docs/administration/user-settings/#email-notifications-for-builds)
- Codefresh Classic integration with Codefresh Hosted GitOps - [documentation]({{site.baseurl}}/docs/integrations/codefresh-hosted-gitops/)
- On-premises: New release of Codefresh Classic: v.1.2.12 (July 20, 2022) - [documentation]({{site.baseurl}}/docs/installation/codefresh-on-prem-upgrade/)
- Hosted runtime clusters upgraded to Kubernetes 1.22

## Bug fixes

- Codefresh Classic On-premises: Fixed critical vulnerabilities as of July 2022.
- Resending email invitations results in "Problem sending invite" error.
- Audit search for triggers returns error with no search results (Audit Triggers > Search).
- Pipeline concurrency limit ignored periodically.
- "<" replaced by "&lt;" when creating inline YAML for pipeline via Terraform.
- Step Variables are not resolved in Hooks.
