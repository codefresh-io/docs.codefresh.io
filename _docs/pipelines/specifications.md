---
title: "Pipeline schema"
description: "Understand how to configure the pipeline through YAML file"
group: pipelines
toc: true
---
Pipeline settings can be configured in different ways, with different levels of customization:

* **Account-level settings**  
  Defined by the Codefresh account administrator in the UI, these settings apply globally to all pipelines within the account. Pipelines in the same account inherit these settings by default unless overridden for the individual pipeline.  
  See [Account-level settings for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/).

* **Pipeline-specific settings**  
  Configurable within the UI for individual pipelines. Some settings are inherited from the account-level configuration, while others are unique to each pipeline. Users with the appropriate permissions can override account-level settings and customize them for the individual pipeline.  
  See [Pipeline settings]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings/).

* **Schema-based settings**  
  These are settings defined for the pipeline object using the schema definition, described in this article.  
   Schema-based settings should not be confused with the pipeline's YAML definitions, described in [Pipeline definitions YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/).

When the same setting is defined at more than one level, the [priority](#priority-for-pipeline-settings) determines the setting and value used.


## Priority for pipeline settings

Pipeline settings can be defined at different levels, and not all settings are available at every level.  
It's important to understand the order of priority when settings overlap.

The priority (override behavior) is as follows, from highest to lowest:

1. Schema settings
1. Pipeline-specific settings
  If no YAML definitions exist, the settings for the individual pipeline take precedence over the corresponding account-level settings, unless they are explicitly set to inherit from the account-level.
1. Account-level settings
  Account-level settings are applied when the corresponding settings are not defined either in a YAML file or at the pipeline level. 


## .version

{: .table .table-bordered .table-hover}

| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `.version`      | The version of the pipeline schema, always set to `'1.0'`.  | string    | Required |

## .kind

{: .table .table-bordered .table-hover}

| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `.kind`      | The kind object type for the schema and is always set to `pipeline`.  | string    | Required |

## .metadata

{: .table .table-bordered .table-hover}

| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `metadata.id`        | The ID of the pipeline. The ID is generated when the pipeline is created. Available in **Pipeline > Settings > General > Pipeline ID**.  | string    | Optional |
| `metadata.name`      | The full path to the pipeline, including the name of the project to which the pipeline belongs, in the format `<project_name>/<pipeline_name>`.  For example, `marvel/smoke-tests` | string | Required |
| `metadata.shortName`      | The name of the pipeline without the `<project_name>`. For example, `smoke-tests`. |  string | Optional  |
| `metadata.revision`      | Automatically updated for each update of the pipeline. Default is `0`. |  integer | Optional  |
| `metadata.isPublic`     | Determines if public logs are enabled or disabled for the pipeline. By default, public logs are disabled.<br>When set to `true`, clicking the build badge allows all users with access to the pipeline to also view the build logs, even if they are not logged into Codefresh. See [Public build logs]({{site.baseurl}}//docs/pipelines/configuration/build-status/#public-build-logs).| boolean  | Optional |
| `metadata.description`   | A meaningful description of the pipeline. <!--- (NIMA: is there a a max limit)--> | string | Optional |
| `metadata.labels`        | The parent object for `metadata.labelKeys` defining the `tags` assigned to the pipeline.   | object |  Optional |
| `metadata.labelKeys`    | The tag or tags to assign to the pipeline. The tags are used to define [RBAC rules]({{site.baseurl}}/docs/administration/account-user-management/access-control/#marking-pipelines-with-policy-attributes) for this pipeline. | string |  Optional |
| `metadata.created_at`    | The date and time at which the pipeline was created, in ISO 8601 format.<br>For example, `2024-09-18T16:43:16.751+00:00`.| date |  Optional |
| `metadata.updated_at`    | The date and time at which the pipeline was last updated, in ISO 8601 format.<br>For example, `2024-10-18T10:43:16.751+00:00`.| date |  Optional |
| `metadata.accountId`    | The ID of the account to which the pipeline belongs.<br>For example, `65c5386d7b71f25b3bbb8006`. The account ID is available by clicking the Settings icon in the toolbar, in **Organization Information > General**.| objectId |  Optional |
| `metadata.originalYamlString` | The full content of the `Inline YAML` pipeline editor, either with only the default settings or with user-defined settings.  | string  | Optional |
| `metadata.projectId`        | The ID of the project to which the pipeline belongs.  | obejctId  | Optional |
| `metadata.project`        | The name of the project to which the pipeline belongs.  | string  | Optional |
| `metadata.template`       | Determines if the pipeline is designated and available as a template when creating a new pipeline. |  |  |
| `metadata.template.isTemplate` | When set to `true`, the pipeline name is displayed in the Pipeline Template list. | boolean | Optional |
| `metadata.template.generatedFrom` | The ID of the template pipeline from which the pipeline is created.  | objectId | Optional |
| `metadata.executionContextId`  |  The name of the specific execution context to use for the pipeline to makes API calls to the pipeline.<br>See [Pipeline execution context]({{site.baseurl}}/docs/administration/account-user-management/pipeline-execution-context/).    | string | Optional |

## .spec


{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.scopes`           | <!--- Need to verify what this is. --> The custom API scopes controlling access to the pipeline. Configuring custom scopes will override the account-level defaults for this pipeline.  | array of strings    | Optional |
| `spec.scopeSnapshot`    | The ID of the scope snapshot. | string    | Optional |
| `spec.permitRestartFromFailedSteps` | Determines if users can restart the pipeline from the failed step, instead of from the beginning of the pipeline. <br>Leave empty to inherit the account-level setting.<br>When set to `true`, users can restart the pipeline from the failed step. <br>See [Restarting a failed pipeline]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#restarting-the-pipeline).| boolean    | Optional |
| `spec.build_version`    | <!--- Need to verify what this is. --> `v1` or `v2` | string    | Optional |
| `spec.triggers`    | The list of Git triggers defined for the pipeline. For details, see [`spec.triggers`](#spectriggers). | array    | Optional |
| `spec.cronTriggers`    | The list of Cron or timer-based triggers defined for the pipeline. For details, see [`spec.cronTriggers`](#speccrontriggers). | array    | Optional |
| `spec.runtimeEnvironment`    | The runtime environment selected for the pipeline and its configuration settings such as memory and CPU. For details, see [`spec.runtimeEnvironments`](#specruntimeenvironment).  | object    | Optional |
| `spec.requiredAvailableStorage`    | The minimum disk space for the pipeline’s build volume in `Gi`. <br> When defined, Codefresh assigns either a cached disk with sufficient disk space or a new empty disk at the start of the build. <br>When empty, only the space not allocated for caching is available for the build volume. <br>See [Set minimum disk space for a pipeline build]({{site.baseurl}}/docs/pipelines/pipelines/#set-minimum-disk-space-for-a-pipeline-build).  | string    | Optional |
| `spec.lowMemoryWarningThreshold`    | The memory-usage threshold for the pipeline's build exceeding which to display banner alerts. Useful to get timely warnings and prevent build failures. <br>Can be one of the following:{::nomarkdown}<ul><li><b>WARNING</b>: Displays a banner when memory usage exceeds 70% of the available memory. </li><li><b>CRITICAL</b>: Displays a banner when memory usage exceeds 90% of the available memory. </li><li><b>REACHED_LIMIT</b>: Displays a banner when memory usage exceeds 100% of the available memory. Setting this threshold means that the pipeline build has already failed when the banner is displayed.</li></ul>{:/}See also [Set memory usage threshold for pipeline build]({{site.baseurl}}/docs/pipelines/pipelines/#set-memory-usage-threshold-for-pipeline-build).| string    | Optional|
| `spec.packId`    | Required for SaaS environments. Optional for hybrid environments.<br>The package identifier based on the resource size. Can be one of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">5cd1746617313f468d669013</code>: Small</li><li><code class="highlighter-rouge">5cd1746717313f468d669014</code>: Medium</li><li><code class="highlighter-rouge">5cd1746817313f468d669015</code>: Large</li><li><code class="highlighter-rouge">5cd1746817313f468d669017</code>: Extra large</li><li><code class="highlighter-rouge">5cd1746817313f468d669018</code>: XXL</li><li><code class="highlighter-rouge">5cd1746817313f468d669020</code>: 4XL</li></ul>{:/} | string | Required (for SaaS) |
| `spec.context`    | Single or multiple comma-separated shared configuration contexts, including shared secrets to add to the pipeline. <br>See [Shared configuration contexts]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/).   | array   | Optional |
| `spec.clustersInfo`    | Determines if all or specific Kubernetes clusters are available for the pipeline build. Leave empty to inherit the account-level setting. <!--- how can the user know what the account-level setting is? Do they have to go manually to the Settings to see if there are restrictions? --> <br>See [Select Kubernetes cluster contexts]({{site.baseurl}}/docs/pipelines/pipelines/#select-kubernetes-cluster-contexts).  | object  | Optional |
| `spec.variables`    | The variables defined in the pipeline. See [spec.variables](#specvariables). | array    | Optional |
| `spec.specTemplate`    | See [spec.specTemplate](#specspectemplate). | object    | Optional |
| `spec.steps`    | The steps to be executed by the pipeline, as a list of key-value pairs. <br>See [Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/). | object    | Required |
| `spec.services`    | Auto-generated based on the content of `metadata.originalYamlString`.<br>See [Service containers in pipelines]({{site.baseurl}}/docs/pipelines/service-containers/). | object    | Optional |
| `spec.hooks`    | Auto-generated based on the content of `metadata.originalYamlString`. <br>See [Hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/).| object    | Optional |
| `spec.stages`    | The stages into which to group the pipeline's steps. <br>When defined, each stage is displayed as a separate column in the pipeline's build view.<br>Stages are only for visualization and do not affect pipeline execution.<br>See [Grouping steps into stages]({{site.baseurl}}/docs/pipelines/stages/).   | array    | Optional |
| `spec.mode`    | The execution mode for the pipeline. Leave empty to use the default. <br>Can be one of the following:{::nomarkdown}<ul><li><code class=highlighter-rouge>sequential</code>: The default, executes the steps in the order in which they are listed.</li><li><code class=highlighter-rouge>parallel</code>: Evaluates all step conditions at the same time and executes those steps that meet the requirements in parallel. Parallel execution mode allows you to order steps in ways not possible with sequential mode.</li></ul>{:/}See [Advanced workflows for pipelines]({{site.baseurl}}/docs/pipelines/advanced-workflows/). | string    | Optional |
| `spec.fail_fast`    | Determines pipeline execution behavior in case of step failure. Leave empty to use the default. {::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>: The default, terminates pipeline execution upon step failure. The Build status returns <code class="highlighter-rouge">Failed to execute</code>.</li><li><code class="highlighter-rouge">false</code>: Continues pipeline execution upon step failure. The Build status returns <code class="highlighter-rouge">Build completed successfully</code>. <br>To change the Build status, set <code class="highlighter-rouge">spec.strict_fail_fast</code> to <code class="highlighter-rouge">true</code>.</li></ul>{:/} | boolean    | Optional |
| `spec.strict_fail_fast`    | Specifies how to report the Build status when `fail_fast` is set to `false`.<br>**NOTE**:<br>Requires Runner chart v6.3.9 or higher.<br><br>You can set the Build status reporting behavior at the root-level or at the step-level for the pipeline.{::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>:<ul><li>When set at the  <i>root-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the  <i>step-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> and <code class="highlighter-rouge">strict_fail_fast=true</code> fails to execute.</li></ul></li><li><code class="highlighter-rouge">false</code>:<ul><li>When set at the  <i>root-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li></ul> {:/} |
| `spec.debug.steps.phases`     |The phase or stage at which the debug step should run.{::nomarkdown}<ul><li><code class="highlighter-rouge">before</code>: The step runs before the build starts.</li><li><code class="highlighter-rouge">after</code>: The step runs after the build starts.</li><li><code class="highlighter-rouge">override</code>: ???.</li></ul> {:/} |boolean   | Optional |









### spec.triggers

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.triggers.type`     | Always set to `git`.         | string   | Required |
| `spec.triggers.id`       | The ObjectID which is auto generated on creating a trigger. | string   | Optional |
| `spec.triggers.createdFromRepositoryMigration`       | Determines if the trigger was automatically created when migrating repositories. <!--- Deprecated???  -->                       | boolean   | Optional |
| `spec.triggers.name`       | The user-defined name of the Git trigger. Can have a minimum of one and maximum of 200 characters, including these special characters `/`, `^`, `\`, `S`, `*`, `$`, and without spaces. Regex expressions are also supported. | string | Required|
| `spec.triggers.description`       | A meaningful of the Git trigger. Can have a minimum of one and maximum of 150 characters. | string | Optional|
| `spec.triggers.commitStatusTitle` | The title of the commit message when the Git trigger is activated. Can have a minimum of one and maximum of 200 characters. | string | Optional|
| `spec.triggers.contexts`       | The variable sets imported from [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/). |array | Optional |
| `spec.triggers.verified`       | Determines if to validate access to the Git repo for which trigger is created.<br> When set to `true`, the default, always validates access to the Git repo.  |boolean | Optional |
| `spec.triggers.status`       | ?? |string | Optional |
| `spec.triggers.repo`       | The Git repo to track for this trigger, in the format `<git_repo_owner>/<git_repo_name>`.  |string | Optional |
| `spec.triggers.provider`  | The name of the Git provider as defined in the Git integrations set up for pipelines. See [Git provider pipeline integrations]({{site.baseurl}}/docs/integrations/git-providers/| string |Optional  |
| `spec.triggers.disabled`   |  Determines if the Git trigger is enabled for activation or always disabled. <br> When set to `true`, the trigger is always disabled and never activated.  | boolean | Optional |
| `spec.triggers.skipCommentAuthorAssociationValidation`   |  ???| boolean | Optional |
| `spec.triggers.events`       |  The possible list of Git events that can be configured to activate the trigger depending on the Git provider. See [spec.triggers.events](#spectriggersevents). | array | Required |
| `spec.triggers.commentRegex`       | Defines if to activate the trigger only if the pull request (PR) comment matches a specific pattern defined by a regular expression (regex).  | string | Optional |
| `spec.triggers.branchRegex `       |  Defines if to activate the trigger only if the regex expression/string matches the branch name as defined by `branchRegexInput`. | string | Optional|
| `spec.triggers.branchRegexInput`  |  Defines the type of content used in `branchRegex`, and can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">regex</code>: Match branch names based on specific patterns.<br>For example, `feature/.*` would match any branch that starts with `feature/`. </li><li><code class="highlighter-rouge">multiselect</code>: Match one or more of the predefined list of branch names.</li><li><code class="highlighter-rouge">multiselect-exclude</code>: Does <i>not match</i> any of the predefined branch names in the list. </li></ul>{:/}  | string | Optional  | 
| `spec.triggers.pullRequestTargetBranchRegex`       |  ???  | string | Optional |
| `spec.triggers.pullRequestAllowForkEvents`       |  Determines if the Git trigger is also valid for Git forks.<br>When set to `true`, the default, the trigger is also activated for Git repos forked from `spec.triggers.repo`.   | boolean | Optional |
| `modifiedFilesGlob`       |  Defines if to activate the trigger when the changed files match glob expression. Glob expressions can have maximum of 65500/65536 characters, including `' '`| string | Optional  |
| `spec.triggers.gerritCIStatusLabels`       | The labels indicating the CI status. | array | Optional  |
| `spec.triggers.context`       | The name of the Git integration to use.  | string | Optional |
| `spec.triggers.concurrency`   | The maximum number of concurrent builds for this trigger, and can range from `1` (the default), to `15`, or unlimited). Define the trigger concurrency when your pipeline has multiple triggers. | string | Optional |
| `spec.triggers.priority`   | ?? | integer | Optional |
| `spec.triggers.terminationPolicy`   | The options that determine when to terminate the build from the pipeline. See [spec.terminationPolicy](#specterminationpolicy). | integer | Optional |







### spec.triggers.events

Trigger events depend on and are specific to every Git provider.

See trigger events for:

{: .table .table-bordered .table-hover}
|Git provider | Field           | Description                 | Type      | Required/Optional |
|-------------| --------------  | |-----------| -------------------------|
|GitHub | `spec.triggers.events.push`     |          | string   | Required |
|       | `spec.triggers.events.push.heads`     |          | string   | Required |
|       | `spec.triggers.events.push.tags`     |          | string   | Required |
|       | `spec.triggers.events.push.newBranch`     |          | string   | Required |
|       | `spec.triggers.events.push.deleteBranch`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.opened`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.closed`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.reopened`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.edited`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.assigned`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.unassigned`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.review_requested`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.review_request_removed`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.reviewRequested`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.reviewRequestRemoved`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.submitted.approved`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.submitted.commented`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.submitted.changes_requested`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.pushCommit`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.labeled`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.unlabeled`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.synchronize`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.commentAdded`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.commentAddedUnrestricted`     |          | string   | Required |
|AzureDevOps| `spec.triggers.events.pullrequest.reviewersUpdate`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.statusUpdate`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.reviewerVote`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.created`     |          | string   | Required |
|       | `spec.triggers.events.pullrequest.merged`     |           | string   | Required |
|       | `spec.triggers.events.pullrequest.unmerged-closed` |      | string   | Required |
|       | `spec.triggers.events.pullrequest.updated`     |          | string   | Required |
|       | `spec.triggers.events.release.unpublished`     |          | string   | Required |
|       | `spec.triggers.events.release.created`     |              | string   | Required |
|       | `spec.triggers.events.release.edited`     |               | string   | Required |
|       | `spec.triggers.events.release.deleted`     |              | string   | Required |
|       | `spec.triggers.events.release.prereleased`     |          | string   | Required |
|       | `spec.triggers.events.release.released`     |             | string   | Required |
|Bitbucket| `spec.triggers.events.pullrequest.created`     |        | string   | Required |
|         | `spec.triggers.events.pullrequest.updatedButNoPush` |   | string   | Required |
|        | `spec.triggers.events.pullrequest.deleted`       |       | string   | Required |
|       | `spec.triggers.events.pullrequest.fulfilled`            |       | string   | Required |
|       | `spec.triggers.events.pullrequest.rejected`             |       | string   | Required |
|       | `spec.triggers.events.pullrequest.merged`               |       | string   | Required |
|       | `spec.triggers.events.pullrequest.declined`             |       | string   | Required |
|       | `spec.triggers.events.pullrequest.comment_created`      |       | string   | Required |
|       | `spec.triggers.events.pullrequest.comment_updated`      |       | string   | Required |
|       | `spec.triggers.events.pullrequest.comment_deleted`      |       | string   | Required |
|       | `spec.triggers.events.pullrequest.approved`             |       | string   | Required |
|       | `spec.triggers.events.pullrequest.unapproved`           |       | string   | Required |
|Bitbucket-server | `spec.triggers.events.pullrequest.push_commit` |       | string   | Required |
|       | `spec.triggers.events.pullrequest.needsWork`            |       | string   | Required |
|Gerrit| `spec.triggers.events.change-abandoned`                 |       | string   | Required |
|       | `spec.triggers.events.change-deleted`                   |       | string   | Required |
|       | `spec.triggers.events.change-merged`                    |       | string   | Required |
|       | `spec.triggers.events.change-restored`                  |       | string   | Required |
|       | `spec.triggers.events.comment-added`                    |       | string   | Required |
|       | `spec.triggers.events.dropped-output`                   |       | string   | Required |
|       | `spec.triggers.events.hashtags-changed`                 |       | string   | Required |
|       |`spec.triggers.events.project-created`                   |      | string   | Required |
|       | `spec.triggers.events.patchset-created`                 |      | string   | Required |
|       | `spec.triggers.events.ref-updated`                      |       | string   | Required |
|       | `spec.triggers.events.reviewer-added`                   |      | string   | Required |
|       | `spec.triggers.events.reviewer-deleted`                 |       | string   | Required |
|       | `spec.triggers.events.topic-changed`                    |       | string   | Required |
|       | `spec.triggers.events.wip-state-changed`                |       | string   | Required |
|       | `spec.triggers.events.private-state-changed`            |       | string   | Required |
|       | `spec.triggers.events.vote-deleted`                     |       | string   | Required |
|       | `spec.triggers.events.project-head-update`              |       | string   | Required |



######
* [GitHub]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#github-trigger-events)
* [Azure DevOps]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#azure-devops-trigger-events)
* [BitBucket Cloud]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#bitbucket-cloud-trigger-events)
* [BitBucket Server]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#bitbucket-server-trigger-events)
* [GitLab]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#gitlab-trigger-events)
* [Gerrit]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#gerrit-trigger-events)


### spec.cronTriggers

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.cronTriggers.type`     | Always set to `cron`.         | string   | Required |
| `spec.cronTriggers.id`       | The ID of the Cron trigger, automatically generated when created.                       | string   | Optional |
| `spec.cronTriggers.event`    |  Leave empty. Automatically generated by Codefresh for internal use. | string | Optional |
| `spec.cronTriggers.name`       | The user-defined name of the Cron trigger. Can have a minimum of one and maximum of 200 characters. ???? including these special characters `/`, `^`, `\`, `S`, `*`, `$`, and without spaces. Regex expressions are also supported. | string | Required|
| `spec.cronTriggers.message`       | The free-text message to be sent as an additional event payload every time the Cron trigger is activated. For example, `Successful ingress tests`.| string | Required|
| `spec.cronTriggers.expression` | The Cron expression that defines the time and frequency of the Cron trigger.<br>For example, `0 3 * * 1-5`  triggers the pipeline at _3:00 AM every weekday (Monday to Friday)_.  | string | Required|
| `spec.cronTriggers.verified`       | ?? |boolean | Optional |
| `spec.cronTriggers.disabled `     | Determines if the Cron trigger is enabled for activation. <br>By default, set to `false` meaning that it is always enabled. <br>To disable the trigger, set to `true`. | boolean | Optional |
| `spec.cronTriggers.status`       | ?? |string | Optional |
| `spec.cronTriggers.lastExecutionDate`       | T???? |date | Optional |
| `spec.cronTriggers.gitTriggerId`  |The ID of the Git trigger to simulate for the pipeline, retrieved from the pipeline for which it is defined.<br>To simulate a Git trigger, the pipeline must have at least one Git trigger defined for it.<br>See [Git triggers](#git-triggers) in this article.| string |Optional  |
| `spec.cronTriggers.branch`   |  Valid only when a Git trigger is simulated.<br> The branch of the repo retrieved from the Git trigger defined in `spec.cronTriggers.gitTriggerId`.  | string | Optional |








### spec.runtimeEnvironment

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.runtimeEnvironment.name`     | The name of the runtime environment to use for the pipeline.  <!-- does this override the account-level setting? Or must it one of those REs allowed for the pipeline? Should I add it's also based on permissions? --> |string   | Required |
| `spec.runtimeEnvironment.memory`     | The memory threshold for the pipeline using Kubernetes notation.   <!--- NIMA: does this override the account-level setting? Or must it one of those in the UI? --> |string   | Optional |
| `spec.runtimeEnvironment.cpu`     | The number of CPUs to use for the pipeline using Kubernetes notation. <!--- NIMA: does this override the account-level setting? Or must it one of those in the UI? -->|string   | Optional |
| `spec.runtimeEnvironment.dindStorage`     | The DIND storage size using Kubernetes notation. |string   | Optional |
| `spec.runtimeEnvironment.requiredAvailableStorage`    | The minimum disk space for the pipeline’s build volume in `Gi`. <br> When defined, Codefresh assigns either a cached disk with sufficient disk space or a new empty disk at the start of the build. <br>When empty, only the space not allocated for caching is available for the build volume. <br>See [Set minimum disk space for a pipeline build]({{site.baseurl}}/docs/pipelines/pipelines/#set-minimum-disk-space-for-a-pipeline-build).  | string    | Optional |


### spec.clustersInfo

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.clustersInfo.injectAll`     | When set as `true`, the default, injects all clusters integrated with Codefresh into the pipeline build.   | boolean    | Optional |
| `spec.clustersInfo.clusters`     | Applicable only when `injectAll`is set to `false`.<br>One or more comma-separated names of clusters to inject during the pipeline build. For example, `aws`, `eks-prod`. | array      | Optional |


### spec.variables

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.variables.key`     | The name of the variable. |string   | Required |
| `spec.variables.value`       | The value of the variable defined by `spec.variables.key` | string | Required |
| `spec.variables.encrypted`       | Determines if to encrypt the stored value of the variable. When set to `false`, the default, variable values are not encrypted.<br>To encrypt, set to `true`. | boolean | Optional |


### spec.specTemplate

{: .table .table-bordered .table-hover}
| Field                         | Description                 | Type      | Required/Optional |
| --------------                | ---------------------------- |-----------| -------------------------|
| `spec.specTemplate.location`  | The location of the source YAML. Can be one of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">YAML_LOCATION.URL</code>: The default, the URL of the YAML with the pipeline definitions.</li><li><code class="highlighter-rouge">YAML_LOCATION.GIT</code>: The Git repository with the YAML of the pipeline definitions.</li></ul>{:/}| string   | Required |
| `spec.specTemplate.context`   | The name of the Git integration to use from the pipeline integrations configured. | string  |   
| `spec.specTemplate.url`       | Applicable only when `spec.specTemplate.location` is set to `YAML_LOCATION.URL`.<br>The URL of the YAML file. | string  | Required |
| `spec.specTemplate.repo`      | Applicable only when `spec.specTemplate.location` is set to `YAML_LOCATION.GIT`.<br> The Git repository where the pipeline definition YAML is stored, as regex, or in the format, `repoOwner/repoName`. | string  | Required |
| `spec.specTemplate.path`      | Applicable only when `spec.specTemplate.location` is set to `YAML_LOCATION.GIT`.<br>The directory within the repository with the  YAML file.  | string  | Required |
| `spec.specTemplate.revision`  | Applicable only when `spec.specTemplate.location` is set to `YAML_LOCATION.GIT`.<br>The version of the YAML file to retrieve, based on the Git reference such as the branch, tag, or commit hash.| string  | Optional |


### spec.options

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.options.noCache`     | When set to `false`, the default, use the last build's cache. <br>To ignore the last build's cache, set to `true`. Selecting this option may slow down your build.<br>See [Last build cache]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/). |boolean   | Optional |
| `spec.options.noCfCache`     | When set to `false`, the default, uses Docker engine cache for build. <br> To ignore Docker engine cache for build, set to `true`. <br>See [Docker engine cache]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/). |boolean   | Optional |
| `spec.options.resetVolume`     | When set to `false`, the default, _does not reset_ the pipeline volume. <br>To reset the pipeline volume, set to `true`. This is useful for troubleshooting a build that hangs on the first step. <br>See [Hangs on restoring data from pre-existing image]({{site.baseurl}}/docs/kb/articles/restoring-data-from-pre-existing-image-hangs-on/). |boolean   | Optional |
| `spec.options.enableNotifications`     | When set to `false`, the default, only sends status updates to your Git provider. <br>To send email and Slack notifications, in addition to status updates, set to `true`. <br>See [Slack notifications]({{site.baseurl}}//docs/integrations/notifications/slack-integration/). |boolean   | Optional |
| `spec.options.keepPVCsForPendingApproval`     | Determines if PVC volumes are retained  when the pipeline is waiting for approval. ????? |boolean   | Optional |
| `spec.options.pendingApprovalConcurrencyApplied`     | Determines if the pipeline build that is pending approval is counted against the number of concurrent builds defined for the pipeline. By default, left empty.<br>See [Define concurrency limits]({{site.baseurl}}/docs/pipelines/steps/approval/#define-concurrency-limits) |boolean   | Optional |


### spec.terminationPolicy

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.terminationPolicy.type`   |Can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">branch</code>: Terminate builds based on <code class="highlighter-rouge">spec.terminationPolicy.ignoreBranch</code>, <code class="highlighter-rouge">spec.terminationPolicy.ignoreTrigger</code>, and <code class="highlighter-rouge">spec.terminationPolicy.branchName</code> options.</li><li><code class="highlighter-rouge">annotation</code>: Terminate builds based on <code class="highlighter-rouge">spec.terminationPolicy.key</code> and <code class="highlighter-rouge">spec.terminationPolicy.value</code> options.</li></ul>{:/}  |string   | Optional |
| `spec.terminationPolicy.event`  |Determines how builds for the same pipeline are terminated. Can be one of the following:{::nomarkdown}<ul><li><code class="highlighter-rouge">onCreate</code>: Terminates other builds from the same pipeline when a build is created based on the `type`.</li><li><code class="highlighter-rouge">onTerminate</code>: Terminates child builds initiated from the same pipeline when the parent build is terminated.</li></ul>{:/} | string   | Optional |
| `spec.terminationPolicy.ignoreBranch` | Applicable only when `spec.terminationPolicy.type` is set to `branch`.<br>When set to `false`, the default, once the build is created, terminates previous builds from the same branch.<br>To allow previous builds from the same branch to continue running, set to `true`.  |boolean   | Optional |
| `spec.terminationPolicy.ignoreTrigger` | Applicable only when `spec.terminationPolicy.type` is set to `branch`.<br>When set to `false`, the default, once the build is created, terminates all other builds that are running.<br>To allow all running builds to continue, set to `true`.  |boolean   | Optional |
| `spec.terminationPolicy.branchName`     | Applicable only when `spec.terminationPolicy.type` is set to `branch`.<br>Once the build is created, terminates previous builds from the specific branch that matches the name defined (NIMA: can it be a regex?) .   | string   | Optional |
| `spec.terminationPolicy.key`     | Applicable only when `spec.terminationPolicy.type` is set to `annotation`.<br> Terminates all builds that match the annotation defined in `spec.terminationPolicy.value`.  | string   | Required |
| `spec.terminationPolicy.value`     | Applicable only when `spec.terminationPolicy.type` is set to `annotation`.<br> The value defined for `spec.terminationPolicy.key`. |boolean   | Optional |


### spec.externalResources

See [External resources]({{site.baseurl}}/docs/pipelines/pipelines/#external-resources).

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.externalResources.id`     The ID of the external  |boolean   | Optional |
| `spec.externalResources.type`     | Only `git` is supported. |string   | Optional |
| `spec.externalResources.source`     | The source folder or the file path in the Git repo from which to copy/retrieve the external resource. (NIMA: is there a format to use)  | string   | Required |
| `spec.externalResources.context`     | The name of the Git provider to use for the external resource. |string   | Optional |
| `spec.externalResources.destination`     |The target folder or the file path to which to copy the external resource.  |string   | Required |
| `spec.externalResources.isFolder`     |Defines if the source external resource is stored in a folder or a file.<br>If stored in a folder, set to `true`.<br>If the resource is a single file, set to `false`, the default.  |boolean    | Optional |
| `spec.externalResources.repo`     | The Git repository name for the external resource, in the format `git_repo_owner/git_repo_name`.  | string   | Optional |
| `spec.externalResources.revision`     | The name of the branch or git hash to check out. | string   | Optional |


