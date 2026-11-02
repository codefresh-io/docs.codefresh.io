---
name: writing-release-notes
description: Use when adding or updating a monthly Codefresh release notes post in _posts/, or turning a Classic Runtime (venona), GitOps Runtime, or on-premises Helm release into release-note entries.
---

# Writing Release Notes

## Overview

Monthly release notes live in `_posts/YYYY-MM-01-release-notes.md`. Every entry ends with an availability table that covers all three installation types.

## Sources

- Read the release notes from GitHub before writing the entry. If you can't fetch them, ask the user to paste them.
- Classic Runtime: `codefresh-io/venona`, tag `cf-runtime-<ver>-helm`.
- GitOps Runtime: `codefresh-io/gitops-runtime-helm`, tag `<ver>`.
- On-premises: `codefresh-io/codefresh-onprem-helm`, tag `codefresh-<ver>`.
- A runtime release only says what changed in the Helm chart. Ask the user for Cloud and on-premises availability; never guess it.

### Linear ticket

If the user gives a Linear ticket (for example, `https://linear.app/octopus/issue/CF-2428/...`), use the Linear MCP to read it, including its releases (`get_issue` with `includeReleases: true`). Each release's pipeline tells you which row of the availability table it fills:

| Release pipeline | Availability row |
|---|---|
| CF Classic Runtime | Hybrid: `Classic Runtime <version>` |
| CF Onprem | On-premises: `Codefresh Platform <version>` |

- A release in the `Released` stage has shipped. A release that isn't released yet becomes `Planned for ... <version>`.
- If the ticket has no release for an installation type, ask the user about it.
- Use the ticket's description and linked PRs to understand the change. Then read the GitHub release notes for the versions you found.
- If the Linear MCP isn't available, ask the user for the versions.

## Post skeleton

```markdown
---
title: "Release Notes: October 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### Classic Pipelines

#### <Entry title>

##### Availability

### GitOps

#### <Entry title>

##### Availability

## Bug fixes

### Classic Pipelines

#### <Entry title>

##### Availability

### GitOps

#### <Entry title>

##### Availability
```

Leave out any section (Features & enhancements, Bug fixes) or product subsection (Classic Pipelines, GitOps) that has no entries.

## Entry content

- **Feature:** what is new, plus a link to the relevant doc (`{{site.baseurl}}/docs/...`).
- **Bug fix:** title the entry with the old, broken behavior in past tense. The first paragraph says what went wrong and quotes the exact error text. The next paragraph says how it works now.
- **Configuration options:** list each supported variant, including child keys that can be set on their own (for example, `limits.cpu: null` alone, `limits.memory: null` alone, or `limits: null`). Add one short YAML example. If something has to be true for the option to work, state it.
- **Breaking changes:** don't repeat them in the entry or in a callout. In the availability table's Action column, add "Review the breaking changes first." The linked release notes list them.
- **External links:** add `{:target="_blank"}`.

## Availability table

```markdown
##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Classic Runtime [11.0.0](https://github.com/codefresh-io/venona/releases/tag/cf-runtime-11.0.0-helm){:target="_blank"} | Upgrade to Runtime 11.0.0 or later. Review the breaking changes first. |
| On-premises | Codefresh Platform [2.12.21](https://github.com/codefresh-io/codefresh-onprem-helm/releases/tag/codefresh-2.12.21){:target="_blank"} | Upgrade to Platform 2.12.21 or later. |
```

| Situation | Status | Action required |
|---|---|---|
| Shipped | `Available now`, or the version with a GitHub release link | `Upgrade to <X> <ver> or later.` |
| Not yet shipped | `Planned for Codefresh Platform <ver>` | `Upgrade to Platform <ver> when it is released.` |
| Doesn't apply (for example, a Helm-only setting on Cloud) | `Not applicable` | `None` |
| Behind a feature flag, on-premises | as above | Add `Enable <flag> feature flag.` |
| Behind a feature flag, Cloud or Hybrid | as above | `Contact Codefresh Support to enable the feature.` Never name the flag. |

Keep all three rows (Cloud, Hybrid, On-premises), in that order, even when a row is `Not applicable`.
