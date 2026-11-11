---
name: onprem-release-notes
description: Write or extend the Codefresh on-premises release notes for a new version (e.g. 2.13, 2.14) in _docs/whats-new/on-prem-release-notes.md. Gets the release window from the codefresh-onprem-helm GitHub release dates (previous X.Y.0 to the new X.Y.0-rc.1), collects every Codefresh team Linear issue closed in that window, then drafts Installation & Upgrade, Features & enhancements, Feature Flags and Bug fixes sections following the house structure used for v2.12, with a docs link for every feature and caveat. Use when the user asks for on-prem / onprem release notes, a "what's new" entry for an on-prem version, or to collect what shipped in an on-prem release.
---

# On-prem release notes

Target file: `_docs/whats-new/on-prem-release-notes.md`. Versions are listed newest first, directly under the intro sentence. The v2.12 section is the reference for structure and tone, so read it before writing.

## 1. Inputs to confirm

- **Version** (`X.Y`). The section heading uses `X.Y`.
- **Release window**: the GitHub publish dates of two Helm chart releases (step 2a). It runs from the previous minor's GA release to the first pre-release of the new version.
- **Helm chart upgrade anchor** (`#to-X-Y-0`). Confirm it exists in the README of https://github.com/codefresh-io/codefresh-onprem-helm (the heading is `### To X-Y-0`).
- Don't state a maximum supported GitOps runtime version. Older sections have that line, but new notes no longer include it.
- If the section already exists (partially written), extend it. Do not rewrite content someone else wrote.
- Ask whether there's a **draft** (e.g. `draft —onprem-X.Y-release-notes.md` in the repo root). If there is, use it as the base. Still check every entry against Linear (step 2) and the flag defaults (step 2d), because drafts often get flag defaults wrong.

## 2. Collect what shipped from Linear

Not every closed issue is linked to a Linear release. Don't rely on the release linkage. The source of truth is **every Codefresh team issue closed between two Helm chart release dates**.

### 2a. Determine the release window from GitHub
Releases of https://github.com/codefresh-io/codefresh-onprem-helm are tagged `codefresh-<version>`:

- **Start**: when `codefresh-X.(Y-1).0`, the previous minor's GA release, was published.
- **End**: when `codefresh-X.Y.0-rc.1`, the first pre-release of the new version, was published.

Example for 2.13: `codefresh-2.12.0` was published `2026-08-04T10:15:10Z` and `codefresh-2.13.0-rc.1` was published `2026-11-06T16:16:08Z`. Every Codefresh issue closed between these two moments is in scope.

```bash
for t in codefresh-X.(Y-1).0 codefresh-X.Y.0-rc.1; do
  gh release view "$t" -R codefresh-io/codefresh-onprem-helm --json tagName,publishedAt,isPrerelease
done
```

- If `rc.1` doesn't exist yet, list the latest releases (`gh release list -R codefresh-io/codefresh-onprem-helm --limit 30`) and tell the user. Use now as a provisional end date only if they agree, and flag the notes as provisional.
- If later RCs (`rc.2`, …) exist, ask whether the window should end at a later RC instead, since fixes may have been added after `rc.1`.

### 2b. Collect the Codefresh team issues closed in the window
Use the Linear MCP tools (`mcp__claude_ai_Linear__*`, loaded via ToolSearch). If they are not available, stop and ask the user to connect the Linear MCP server.

- `list_issues(team: "Codefresh", completedAt: "<start ISO>", fields: [id,title,labels,status,project,completedAt,url], limit: 250)`. Paginate with `cursor` while `hasNextPage` is true. `completedAt` only sets a lower bound, so **drop issues whose `completedAt` is after the end date yourself**. Canceled and duplicate issues have no `completedAt`, so they are excluded automatically.
- Group the results by **project**. A project usually becomes one feature entry: for example, the "Hardened API Keys -- IP allow list" project became *IP Allowlist for API Keys* in v2.12. Issues labeled `Support Bug`, `SEV *`, or in a "Customer Issues …" project are bug-fix candidates.
- Use `get_issue(id)` for the description, and `list_comments(issueId)` when you need behavior, UI location, defaults or the feature flag name.

### 2c. Linear releases (cross-check only)
The `CF Onprem` release pipeline (`list_releases(pipeline: "cf-onprem", query: "X.Y")`, then `list_issues(release: "<slug>")`) is incomplete. Use it only as a cross-check. Linked issues are mostly `CFS-*` "Ready for release: `codefresh/<image>:vN`" security bumps (label `Security: ready-for-release`). Don't list these one by one. At most, add a single line under Bug fixes → General ("Updated platform and pipeline-step images with security fixes").

### 2d. Feature flag defaults (source of truth)
Never take flag defaults from a draft or from SaaS behavior. On-prem defaults are the `onPremDefault` values in `cf-api`'s `openapi.json`, at the cf-api version each chart release ships.

1. Find the cf-api version in each chart: `gh api "repos/codefresh-io/codefresh-onprem-helm/contents/charts/codefresh/Chart.yaml?ref=<tag>" --jq .content | base64 -d | grep -A1 "alias: cfapi$"`. A version like `22.16.0` is also a git ref in `codefresh-io/cf-api`. For `22.8.7-onprem-13bae1c`, use the commit after `-onprem-`.
2. Download `openapi.json` at both refs (`gh api -H "Accept: application/vnd.github.raw" "repos/codefresh-io/cf-api/contents/openapi.json?ref=<ref>"`). Collect every object that has an `onPremDefault` key, and diff the two sets. The result is every new flag and every changed default.
3. Look for the Linear issue **"Analyze FFs state for X.Y"** in the "Release on-prem X.Y" project. It says which changed flags to document and which to ignore (internal or customer-specific).

### 2e. Triage before writing
Build a working list for yourself (not for the file): `issue → bucket (feature / bug fix / internal / drop) → product area (Pipelines / GitOps / General / Security) → feature flag? → docs page`.
- **Drop internal work**: OOM investigations, metrics and dashboards, refactors, test or CI work, docs-only tickets, "Investigate …" spikes. Keep these only if they change behavior a customer can see (e.g. "Bitbucket: cache outgoing API requests" became part of "Bitbucket Integration stability hardening").
- Issues closed close to either edge of the window (within a few days) may have landed on the other side of the chart cut. List them to the user as "needs confirmation" instead of including or dropping them silently.
- Show the user the triaged list and get confirmation before writing prose when there are more than a handful of items.

## 3. Confidentiality (non-negotiable)

Release notes are public. Linear titles often contain **customer names**. Never copy customer names, internal cluster names, Linear IDs or links, Slack or Jira references, or employee names into the notes. Rewrite every entry from the customer's point of view.

## 4. Section structure (follow v2.12)

```markdown
## On-premises version X.Y

### Installation & Upgrade

#### Installing vX.Y

For detailed instructions on installing vX.Y, visit [Chart Documentation](https://github.com/codefresh-io/codefresh-onprem-helm#codefresh-on-premises){:target="\_blank"}.

#### Upgrading to vX.Y

For detailed instructions on upgrading to vX.Y, visit [Chart Documentation](https://github.com/codefresh-io/codefresh-onprem-helm#to-X-Y-0){:target="\_blank"}.

### Features & enhancements

##### <Area>: <Feature name>
...

### Bug fixes

##### Pipelines

- Fixed: ...

##### GitOps

- Fixed: ...

### Feature Flags
The table below lists the Feature Flags that are new in this release, or whose default value changed compared to the previous release.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description  | Previous Value | New Value |
| -----------        | --------------| -------------- | --------- |
| `newFlagName`  | When enabled, <what it does> | N/A (new flag) | False |
| `existingFlagName`  | When enabled, <what it does> | False | True |
```

The Feature Flags section is always the **last** section of a version, after Bug fixes.

Rules:
- **Installation & Upgrade holds only the two chart links** shown in the template. Never repeat anything the Helm chart docs or the GitHub release already cover, such as upgrade steps, MongoDB index changes, new chart defaults, values to tune, or breaking changes. Readers follow the link for that. Older sections (v2.9, v2.11) have warning boxes here, but new notes don't.
- **Installation or operations guidance that isn't release-specific** (e.g. "don't run workloads in the default `admin-cf` account") belongs in the chart README, not in the release notes. Propose a PR to `codefresh-io/codefresh-onprem-helm` that edits `README.md.gotmpl`, which generates `README.md`, and leave it out of the notes.
- **Feature headings**: `##### <Area>: <Feature name>`, where Area is one of `Pipelines`, `GitOps`, `Security`, `Administration`, `General`. Use `####` only for a large feature that needs its own `#####` sub-sections (as in the v2.13 ABAC entry), and place it **last** in Features & enhancements, so the `#####` entries after it don't nest under it in the table of contents.
- **[Public Preview]**: when a feature ships behind a flag that is **off by default on-prem** (step 2d), prefix the heading with `[Public Preview]` and say "(Default: _off_)" in the callout. For example: `##### [Public Preview] Security: IP Allowlist for API Keys` in v2.12, and `##### [Public Preview] Pipelines: Compute requests and limits per pipeline` in v2.13. Document these features even if the flag review says to enable them later. Name their flag in the callout even if it's a system flag, and add it to the Feature Flags table when it's new or its default changed.
- **Feature body**: start with one or two sentences on what the user can now do and why it matters. Then, if useful, a short bullet list covering where it lives in the UI (**bold UI labels**, `Account Settings → …` paths), behavior and defaults. Then the docs link. A small fix-style enhancement can be a single sentence.
- **Feature-flagged features**: put a callout directly under the heading:
  ```markdown
  {{site.data.callout.callout_info}}
  This feature is behind the feature flag `flagName` (Default: _off_).

  For configuration details, see [<Page title>](<link>).
  {{site.data.callout.end}}
  ```
  **System flags** (`"systemFeature": true` in cf-api's `openapi.json`, step 2d) are named only in two cases:
  - **`[Public Preview]` features**: name the flag, because admins need it to turn the feature on. Put it in the callout, and in the Feature Flags table when it's new or its default changed. In 2.13, `allowClassicPipelineLimitsToBeDefined` (callout and table) and `enableApiKeysIpAllowlist` (callout only, default unchanged) were named this way.
  - **Flags the user approves explicitly**, e.g. `abacV2ViewPermissions` in 2.13. An approved flag can appear in the table even if its default didn't change.

  Otherwise never name a system flag anywhere in the notes: not in callouts, feature text, migration steps or the Feature Flags table. For such a feature, drop the flag sentence and keep the rest of the callout, such as requirements and the docs link. Check `systemFeature` at the new cf-api version, because it can change between releases: `enableApiKeysIpAllowlist` was user-controlled in 2.12 and became a system flag in 2.13.
  Use `(Default: _on_)` when the flag is on by default, so admins know which flag turns the feature off. If the feature also needs a per-integration or per-entity toggle, say so in the callout.
- **Feature Flags section**: one `### Feature Flags` section with the explanatory sentence and **one table**, based on the v2.11 table format. Don't use `New` / `Updated` sub-sections.
  - The table holds the flags that changed compared to the previous release (step 2d): flags introduced in this version, and existing flags whose default changed. List the flags that the "Analyze FFs state for X.Y" issue marks to document, plus the flags of any `[Public Preview]` features. Skip new flags it marks as ignored, such as internal or customer-specific ones. Flags whose default didn't change are never listed, even if a feature entry mentions them.
  - Use the explanatory sentence exactly as written. It has no version numbers.
  - **Previous Value** is the flag's default in the previous release. **New Value** is its default in this release. For a flag introduced in this release, Previous Value is always `N/A (new flag)`.
  - Write descriptions in the "When enabled, …" / "Enables …" style. Write values in Pascal case: `True` / `False`, never `TRUE` / `FALSE`.
  - Omit the whole section if no flags changed.
  - Get flag names and defaults from the issue description or comments, or ask the user. Never invent a flag name.
- **Bug fixes**: if fixes were also backported to patch releases of the previous minor, open the section with an info callout: "Many fixes listed below were also delivered as X.(Y-1).x patch releases. If you are already on the latest X.(Y-1) patch, some of them are already in your installation." Group the fixes under `##### Pipelines`, `##### GitOps`, `##### General` (omit empty groups). Write one line per fix: `- Fixed: <symptom the user saw>.` Describe the symptom, not the root cause, and put step names, errors and flags in backticks.
- Omit any section that has no content. Do not leave empty headings, except for the version's own `### Installation & Upgrade`.

## 5. Docs links (required for every feature and caveat)

Ideally, **every feature, enhancement, breaking change, deprecation and caveat links to a docs page** that explains it in more depth: the configuration page, the how-to, the Helm chart section, or the KB article. The v2.12 notes mostly lacked this, so close that gap for new versions.

- Internal docs links use the repo convention `[Page title]({{site.baseurl}}/docs/<path>/)`, optionally with an `#anchor`. Before linking, confirm the target exists under `_docs/` (e.g. `ls _docs/<path>.md`, or grep the `permalink`/heading for the anchor).
- External links (Helm chart README, ArtifactHub, Kubernetes or Docker deprecation notices) use `[text](url){:target="\_blank"}`. For chart sections, link the specific anchor (e.g. `codefresh-onprem-helm#api-keys-ip-allowlist`).
- If no docs page exists for a feature yet, do not silently drop the link. Leave `<!-- TODO: docs link -->` and list the feature in your final summary under "Missing docs". Suggest the page that should be written or updated. This is the one kind of comment allowed in the file, and the user decides whether to keep it before merging.
- Bug fixes do not need links, unless the fix changes documented behavior or the user needs to take action.

## 6. Style

- Follow the Octopus writing guide (`anthropic-skills:octopus-writing-guide`) for voice: second person, present tense, active voice, short sentences, no marketing filler ("We're excited…", "seamlessly").
- Use the product names the docs use (Shared Configuration, git context, GitOps Runtime, Classic runtime, Account Settings) and the exact capitalization of UI labels.
- Spell-check against `dictionary-codefresh.txt` / `cspell.json` (v2.12 shipped with "occasionaly", so watch for that kind of typo).

## 7. Finish

1. Insert or extend the section at the top of the version list. Do not modify older versions.
2. Re-read the rendered markdown for broken Liquid tags (`{{site.data.callout.*}}` must be paired with `{{site.data.callout.end}}`) and table syntax.
3. Report to the user:
   - the entries written, each with the Linear issues or projects it came from (in the terminal only, never in the file)
   - items that need confirmation (shipped? flag name? default?)
   - features or caveats still missing a docs link
   - placeholders the user must fill in (e.g. a chart anchor that doesn't exist yet)
