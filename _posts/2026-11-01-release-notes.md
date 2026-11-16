---
title: "Release Notes: November 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

{{site.data.callout.callout_tip}}
This article is updated throughout the month as new releases become available.
{{site.data.callout.end}}

## Bug fixes

### Classic Pipelines

#### `CF_API_KEY` and `CF_OIDC_REQUEST_TOKEN` were printed in clear text in build logs

With log masking enabled, only encrypted variables were masked in build logs. The system-generated `CF_API_KEY` and `CF_OIDC_REQUEST_TOKEN` variables were not treated as secrets, so commands such as `printenv` or `env` printed their values in clear text.

The values of `CF_API_KEY` and `CF_OIDC_REQUEST_TOKEN` are now masked in build logs, the same as encrypted variables.

For details, see [Masking variables in logs]({{site.baseurl}}/docs/pipelines/variables/#masking-variables-in-logs).

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Available now | None |
| On-premises | Planned for Codefresh Platform 2.13 | Upgrade to Platform 2.13 when it is released. Make sure the `logMasking` feature flag is enabled. |

#### Repository links in the Builds view opened the Git provider API instead of the repository

In the Builds view, the links in the repository column pointed to the Git provider's API, for example, `api.github.com`, instead of the repository page. Clicking a link returned a `404` error.

Repository, branch, and commit links now open the corresponding page in your Git provider.

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Available now | None |
| On-premises | Planned for Codefresh Platform 2.13 | Upgrade to Platform 2.13 when it is released. |

#### Team users could not create pipelines from the CLI when the Create rule was scoped by project tags

When a team had a rule that allowed creating pipelines only in projects with specific tags, team users could not create pipelines in those projects with the Codefresh CLI or API. The request failed with `Access denied for action='create' resource='pipeline'`, although the same users could create pipelines in the UI. Admins, and rules set to **All** tags, were not affected.

Pipelines created from the CLI or API are now checked against the tags of the project they belong to, so team users can create pipelines wherever their rules allow it.

For details, see [Creating rules for pipelines by project tags]({{site.baseurl}}/docs/administration/account-user-management/access-control/#creating-rules-for-pipelines-by-project-tags).

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Available now | None |
| On-premises | Planned for Codefresh Platform 2.13 | Upgrade to Platform 2.13 when it is released. |
