---
title: "Release Notes: September 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### Classic Pipelines

#### Request caching for Bitbucket integrations

Every pipeline build sends a number of API requests to Bitbucket, for example, to read the pipeline YAML or to fetch commit details. Busy accounts can hit the Bitbucket API rate limit because the same content is requested many times a day.

You can now enable request caching for a Bitbucket Git integration. When it is on, Codefresh stores Bitbucket API responses and serves repeated reads of the same content from the cache, so they no longer count against your rate limit.

Caching is safe to use because only content pinned to a specific commit SHA is cached, such as file contents, commit objects, and diffstats. Anything that can change, including which commit a branch or tag points to, is always resolved live against Bitbucket, so builds never read stale data. If the cache is unavailable, Codefresh falls back to a live request.

To enable it, edit your Bitbucket integration in **Pipeline Integrations → Git** and turn on **Cache requests to Bitbucket** in the **Caching** section. The same section has a **Clear cache** button for account administrators, which removes all stored entries for the integration, for example, after rotating its credentials.

For details, see [Request caching]({{site.baseurl}}/docs/integrations/git-providers/#request-caching) for Bitbucket.

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Available now | None |
| On-premises | Planned for Codefresh Platform 2.13 | Upgrade to Platform 2.13 when it is released, enable `enableGitRequestsCache` feature flag. |

### GitOps

#### Argo CD upgraded to 3.5 in GitOps Runtime

GitOps Runtime 0.31.0 bumps the bundled Argo CD to version 3.5.2, bringing the latest upstream fixes and features to Codefresh GitOps. If you bring your own Argo CD (BYOA), the supported version range is now 3.3.x to 3.5.x.

For the full list of changes and upgrade steps, see the [GitOps Runtime 0.31.0 release notes](https://github.com/codefresh-io/gitops-runtime-helm/releases/tag/0.31.0){:target="_blank"} and the [Argo CD 3.4 to 3.5 upgrade guide](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/3.4-3.5/){:target="_blank"}.

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Hybrid | GitOps Runtime [0.31.0](https://github.com/codefresh-io/gitops-runtime-helm/releases/tag/0.31.0){:target="_blank"} | Upgrade to GitOps Runtime 0.31.0 or later. Review the breaking changes first. |
| On-premises | Planned for Codefresh Platform 2.13 | Upgrade to Platform 2.13 when it is released, then upgrade to GitOps Runtime 0.31.0 or later. Review the breaking changes first. |

## Bug fixes

### Classic Pipelines

#### Entity name and ID were not displayed in the Audit Log for some entities

In the Audit Log, the `Entity ID/Name` column was empty for some entity types, such as Git contexts.

Audited events for these entities now show the name and ID of the affected entity.

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Available now | None |
| On-premises | Planned for Codefresh Platform 2.13 | Upgrade to Platform 2.13 when it is released. |

#### Variables exported with `cf_export` could resolve to an outdated value

When a variable was exported with `cf_export` more than once during a build, a following step could receive an earlier value instead of the last exported one. This happened whenever the latest exported value was identical to a value the variable had held before, whether from an earlier `cf_export`, from the pipeline variables, or from the step's own `environment`. For example, exporting `MY_VAR=v1`, then `MY_VAR=v2`, then `MY_VAR=v1` again resulted in `v2` in the next step.

Steps now always receive the value that was exported last for each variable.

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Classic Runtime [10.5.6](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime/10.5.6){:target="_blank"} | Upgrade to Runtime 10.5.6 or later. |
| On-premises | Codefresh Platform [2.12.15](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.12.15){:target="_blank"} | Upgrade to Platform 2.12.15 or later. |

#### Typed steps elected on `workflow.result` no longer fail with `plugin failed`

Typed steps, such as `codefresh-run` or any other plugin-based step, that were elected through a `when.condition` on `workflow.result` (for example, `workflow.result == 'terminated'`) always failed with an internal `plugin failed` error. An equivalent freestyle step in the same position ran and completed successfully.

Typed steps elected as a reaction to `workflow.result` now run to completion and conclude on their real result.

Additionally, typed steps now correctly work when a termination signal arrives before the step has started, instead of crashing.

##### Availability

{: .table .table-bordered .table-hover}
| Installation | Status | Action required |
|---|---|---|
| Cloud | Available now | None |
| Hybrid | Classic Runtime [10.5.6](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime/10.5.6){:target="_blank"} | Upgrade to Runtime 10.5.6 or later. |
| On-premises | Codefresh Platform [2.12.15](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.12.15){:target="_blank"} | Upgrade to Platform 2.12.15 or later. |
