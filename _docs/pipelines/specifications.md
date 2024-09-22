---
title: "Pipeline specifications"
description: "Complete schema for pipelines"
group: pipelines
toc: true
---



## .version

{: .table .table-bordered .table-hover}

| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `.version`      | The version of the pipeline schema and is always set to  `'1.0'`.  | string    | Required |

## .kind

{: .table .table-bordered .table-hover}

| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `.kind`      | The kind object type for the schema and is always set to `pipeline`.  | string    | Required |

## .metadata

{: .table .table-bordered .table-hover}

| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `metadata.id`        | The ID of the pipeline.  | string    | Optional |
| `metadata.name`      | The full path to the pipeline, including the name of the project to which the pipeline belongs, in the format `project_name/pipeline_name`. |  string | Required |
| `metadata.shortName`      | The name of the pipeline without the `project_name/` |  string | Optional  |
| `metadata.revision`      | An auto updated value for each update of the pipeline. Default is `0` |  integer | Optional  |
| `metadata.isPublic`     | Determines if public logs are enabled or disabled for the pipeline. By default, public logs are disabled.<br>When set to `true`, clicking the build badge allows all users with access to the pipeline to also view the build logs, even if they are not logged into Codefresh. See [Public build logs]({{site.baseurl}}//docs/pipelines/configuration/build-status/#public-build-logs).| boolean  | Optional |
| `metadata.description`   | A meaningful description of the pipeline. (NIMA: is there a a max limit) | string | Optional |
| `metadata.labels`        | The parent object for `metadata.labelKeys` defining the `tags` assigned to the pipeline. ????    | object |  Optional |
| `metadata.labelKeys`    | The tags ????/  is this the same as `tags`? A list of [access control tags]({{site.baseurl}}/docs/administration/account-user-management/access-control/#marking-pipelines-with-policy-attributes) for this pipeline (NIMA: Im not seeing this in the DB when adding tags.) | string |  Optional |
| `metadata.created_at`    | The date and time at which the pipeline was created, in ISO 8601 format.<br>For example, `2024-09-18T16:43:16.751+00:00`.| date |  Optional |
| `metadata.updated_at`    | The date and time at which the pipeline was last updated, in ISO 8601 format.<br>For example, `2024-10-18T16:43:16.751+00:00.| date |  Optional |
| `metadata.accountId`    | The ID of the account to which the pipeline belongs.<br>For example, `65c5386d7b71f25b3bbb8006`.| obejectId |  Optional |
| `metadata.originalYamlString` | The full contents of the pipeline editor (In-line yaml). ????  | string  | Optional |
| `metadata.projectId`        | The ID of the project to which the pipeline belongs.  | obejctId  | Optional |
| `metadata.project`        | The name of the project to which the pipeline belongs.  | string  | Optional |
| `metadata.template`       | ????Determines if the pipeline is available as a template when creating a new pipeline. <br>When set to `true`, the pipeline name is displayed in the Pipeline Template list. | boolean | Optional |
| `metadata.template.isTemplate` | When set to `true`, the pipeline name is displayed in the Pipeline Template list. | boolean | Optional |
| `metadata.template.generatedFrom` | The ID of the template pipeline where the pipeline was created from. ???? | objectId | Optional |
| `metadata.executionContextId`  |  The name of the specific execution context to use for the pipeline to makes API calls to the pipeline.<br>If there are no execution contexts created for the pipeline, the default execution context is used. (NIMA: is this the CF provided one? what are the implications - that it allows all API calls or minimal ones?).<br>See [Pipeline execution context]({{site.baseurl}}/docs/administration/account-user-management/pipeline-execution-context/).    | string | Optional |

## .spec

{: .table .table-bordered .table-hover}

| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.scopes`           | Custom API Scopes that the Pipeline will use. Configuring custom scopes will override the account-level defaults for this pipeline. ???? | array of strings    | Optional |
| `spec.scopeSnapshot`    | The ID of the scope snapshot.  | string    | Optional |
| `spec.permitRestartFromFailedSteps` | Determines if users can restart a failed pipeline from the failed step, instead of from the beginning of the pipeline.<br>When set to `true`, users can restart the pipeline from the failed step. <br>See [Restarting a failed pipeline]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#restarting-the-pipeline).| boolean    | Optional |
| `spec.build_version`    | ??? `v1` or `v2` | string    | Optional |
| `spec.triggers`    | The list of Git triggers defined for the pipeline. For details, see [`spec.triggers](#spectriggers). | array    | Optional |
| `spec.cronTriggers`    | The list of Cron or timer-based triggers defined for the pipeline. For details, see [`spec.cronTriggers](#speccrontriggers). | array    | Optional |
| `spec.runtimeEnvironment`    | The runtime environment selected for the pipeline and its configuration settings such as memory and CPU. For details, see [`spec.runtimeEnvironments](#specruntimeenvironment).  | object    | Optional |
| `spec.lowMemoryWarningThreshold`    | The memory-usage threshold for the pipelines build exceeding which to display banner alerts. Useful to get timely warnings and prevent build failures. <br>Can be one of the following:{::nomarkdown}<ul><li><b>WARNING</b>: Displays a banner when memory usage exceeds 70% of the available memory. </li><li><b>CRITICAL</b>: Displays a banner when memory usage exceeds 90% of the available memory. </li><li><b>REACHED_LIMIT</b>: Displays a banner when memory usage exceeds 100% of the available memory. Setting this threshold means that the pipeline build has already failed when the banner is displayed.</li> {:/}See also [Set memory usage threshold for pipeline build]({{site.baseurl}}/docs/pipelines/pipelines/#set-memory-usage-threshold-for-pipeline-build).| string    | Optional|
| `spec.packId`    | Applicable to SaaS environments. Optional for hybrid environments.<br>The package identifer based on the resource size: (NIMA: is it the number they need to specify or the size as in the UI?) (`5cd1746617313f468d669013` for Small, `5cd1746717313f468d669014` for Medium, `5cd1746817313f468d669015` for Large, `5cd1746817313f468d669017` for XL, `5cd1746817313f468d669018` for XXL, `5cd1746817313f468d669020` for 4XL) | string    | Required for SaaS |
| `spec.requiredAvailableStorage`    | ???The minimum disk space for the pipeline’s build volume. <br> When defined, Codefresh assigns either a cached disk with sufficient disk space or a new empty disk at the start of the build. Otherwise, only the space not allocated for caching is available for the build volume. <br>See [Set minimum disk space for a pipeline build]({{site.baseurl}}/docs/pipelines/pipelines/#set-minimum-disk-space-for-a-pipeline-build). (NIMA: is there a default min and max? is it the same as the UI?)  | string    | Optional |
| `spec.contexts`    | A list of strings representing the names of that [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/) to be added to the pipeline  | Array of strings    | Optional |
| `spec.clustersInfo`    | Determines if all (`injectAll`) or specific  (`clusters`) Kubernetes cluster contexts are available for the pipeline build.<br>See [Select Kubernetes cluster contexts]({{site.baseurl}}/docs/pipelines/pipelines/#select-kubernetes-cluster-contexts).  | object  | Optional |
| `spec.clustersInfo.injectAll`     | When set as `true` (NIMA is this the default?), injects all clusters integrated with Codefresh into the pipeline build.   | boolean    | Optional |
| `spec.clustersInfo.clusters`     | Applicable only when `injectAll`is set to `false`.<br>One or more comma-separated names of clusters to inject during the pipeline build. For example, `aws`, `eks-prod`. | array      | Optional |
| `spec.variablesSchema`    | ??? (NIMA: I THINK THIS CAN BE REMOVED)  | string    | `????'` |
| `spec.variables`    | The variables defined in the pipeline. See [spec.variables](#specvariables). | array    | Optional |
| `spec.specTemplate`    | ???? . See [spec.specTemplate](#specspectemplate). | object    | Optional |
| `spec.steps`    | (**NIMA: THIS IS AUTOGENERATED**) The steps to be executed by the pipeline, as a list of key-values pairs.(NIMA: need to add more info )<br>See [Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/). | object    | Required |
| `spec.services`    | ??? (**NIMA: THIS IS AUTOGENERATED**) | object    | Optional |
| `spec.hooks`    | ?? (**NIMA: THIS IS AUTOGENERATED**) | object    | Optional |
| `spec.stages`    | (**NIMA: THIS IS AUTOGENERATED**) The stages into which to group the pipeline's steps. In the pipeline's build view, each stage is displayed as a separate column.<br>Stages are only for visualization and do not affect pipeline execution.<br>See [Grouping steps into stages]({{site.baseurl}}/docs/pipelines/stages/).   | array    | Optional |
| `spec.mode`    | (**NIMA: THIS IS AUTOGENERATED**) The execution mode for the pipeline, and can be one of the following:{::nomarkdown}<ul><li><code class=highlighter-rouge>sequential</code>: The default, executes the steps in the order in which they are listed.</li><li><code class=highlighter-rouge>parallel</code>: Evaluates all step conditions at the same time and executes those steps that meet the requirements in parallel. Parallel execution mode allows you to order steps in ways not possible with sequential mode.</li>{:/}See [Advanced workflows for pipelines]({{site.baseurl}}/docs/pipelines/advanced-workflows/). | string    | Optional |
| `spec.fail_fast`    | (**NIMA: THIS IS AUTOGENERATED**) Determines pipeline execution behavior in case of step failure. {::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>: The default, terminates pipeline execution upon step failure. The Build status returns <code class="highlighter-rouge">Failed to execute</code>.</li><li><code class="highlighter-rouge">false</code>: Continues pipeline execution upon step failure. The Build status returns <code class="highlighter-rouge">Build completed successfully</code>. <br>To change the Build status, set <code class="highlighter-rouge">spec.strict_fail_fast</code> to <code class="highlighter-rouge">true</code>.</li></ul>{:/} | boolean    | Optional |
| `spec.strict_fail_fast`    | (**NIMA: THIS IS AUTOGENERATED**) Specifies how to report the Build status when `fail_fast` is set to `false`.<br>**NOTE**:<br>Requires Runner chart v6.3.9 or higher.<br><br>You can set the Build status reporting behavior at the root-level or at the step-level for the pipeline.{::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>:<ul><li>When set at the  <i>root-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the  <i>step-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> and <code class="highlighter-rouge">strict_fail_fast=true</code> fails to execute.</li></ul></li><li><code class="highlighter-rouge">false</code>:<ul><li>When set at the  <i>root-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the  <i>step-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li></ul></li></ul>{:/}<br>**NOTES**:<br>`strict_fail_fast` does not impact the Build status reported for parallel steps with `fail_fast` enabled. Even if a child step fails, the parallel step itself is considered successful. See also [Handling error conditions in a pipeline]({{site.baseurl}}/docs/pipelines/advanced-workflows/#handling-error-conditions-in-a-pipeline).  | ???    | Optional |
| `spec.success_criteria`    | ????? (**NIMA: NOT SURE WHAT THIS IS - MAYBE AUTOGENERATED**)  | string    | `????'` |
| `spec.options`    | Advanced options controlling pipeline execution behavior.(NIMA: what happens when not defined? takes the default for each option? (**NIMA: WILL TAKE THE DEFAULTS FOR EACH OPTION WHEN NOT DEFINED**))<br>See [spec.options](#specoptions).  | optionsSchema???    | Optional |
| `spec.concurrency`    | The maximum number of builds that can run simultaneously for the pipeline, and can range from `0` (the default), to `14`, or `unlimited`.<br>A concurrency of `0` freezes execution of the pipeline, switching it to maintenance mode.<br>. Useful when your pipeline has only one trigger.  | integer    | Optional |
| `spec.triggerConcurrency`    | The maximum number of concurrent builds than can run _per trigger defined for the pipeline_.<br>Can range from `1` (the default), to `15`, or `unlimited`.<br>Useful when your pipeline has multiple triggers. | integer    | Optional |
| `spec.branchConcurrency`    |  The maximum number of concurrent builds than can run _per branch defined for the pipeline_.<br>Can range from `1` (the default), to `15`, or `unlimited`.<br>Useful when your pipeline builds different branches. | integer    | Optional |
| `spec.priority`    | ???  | string    | `????'` |
| `spec.terminationPolicy`    | Determines how and when the pipeline build should terminate. See [spec.terminationPolicy](#specterminationpolicy)  | ???    | ?? |
| `spec.externalResources`    | The external files, such as scripts or other resources available to the pipeline.<br>When defined, they are automatically retrieved and available when the pipeline starts execution.<br>See [spec.externalResources](#specexternalresources).  | array    | Optional |
| `spec.debug`    | ???? (**NIMA: THIS IS AUTOGENERATED WHEN USERS START USING DEBUG IN THE UI - CAN BE DEFINED HERE IF USERS WANTS**)  | string    | Optional?? |
| `spec.serviceAccount`    | ???The service account to use for authentication in ECR integrations for this pipeline.  | string    | Optional |

### spec.triggers

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.triggers.type`     | Always set to `git`.         | string   | Required |
| `spec.triggers.id`       | ????                         | ???   | Optional |
| `spec.triggers.createdFromRepositoryMigration`       | Determines if the trigger was automatically created when migrating repositories. Deprecated???                         | boolean   | Optional |
| `spec.triggers.name`       | The user-defined name of the Git trigger. Can have a minimum of one and maximum of 200 characters, including these special characters `/`, `^`, `\`, `S`, `*`, `$`, and without spaces. Regex expressions are also supported. | string | Required|
| `spec.triggers.description`       | A meaningful of the Git trigger. Can have a minimum of one and maximum of 150 characters. | string | Optional|
| `spec.triggers.commitStatusTitle` | The title of the commit message when the Git trigger is activated. ????Can have a minimum of one and maximum of 200 characters. | string | Optional???|
| `spec.triggers.contexts`       | The variable sets imported from [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/). |array | Optional |
| `spec.triggers.verified`       | ?? |boolean | Optional |
| `spec.triggers.status`       | ?? |string | Optional |
| `spec.triggers.repo`       | The Git repo to track for this trigger, in the format `<git_repo_owner>/<git_repo_name>`.  |string | Optional |
| `spec.triggers.provider`  | The name of the Git provider as defined in the Git integrations set up for pipelines. See [Git provider pipeline integrations]({{site.baseurl}}/docs/integrations/git-providers/| string |Optional  |
| `spec.triggers.disabled`   |  Determines if the Git trigger is enabled for activation or always disabled.<br> When set to `true`, the trigger is always disabled and never activated. (NIMA: assum default is False; why or when would you set it to true?) | boolean | Optional |
| `spec.triggers.skipCommentAuthorAssociationValidation`   |  ???| boolean | Optional |
| `spec.triggers.events`       |  The possible list of Git events that can be configured to activate the trigger depending on the Git provider. See [spec.triggers.events](#spectriggersevents). | array | Required |
| `spec.triggers.commentRegex`       | Defines if to activate the trigger only if the pull request (PR) comment matches a specific pattern defined by a regular expression (regex). ??? NIMA: see what the special characters mean int he schema | string | Optional |
| `spec.triggers.branchRegex `       |  Defines if to activate the trigger only if the regex expression/string matches the branch name as defined by `branchRegexInput`. ???| string | Optional|
| `spec.triggers.branchRegexInput`  |  Defines the type of content used in `branchRegex`, and can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">regex</code>: Match branch names based on specific patterns.<br>For example, `feature/.*` would match any branch that starts with `feature/`. </li><li><code class="highlighter-rouge">multiselect</code>: Match one or more of the predefined list of branch names.</li><li><code class="highlighter-rouge">multiselect-exclude</code>: Does <i>not match</i> any of the predefined branch names in the list. </li></ul>{:/}  | string | Optional  | 
| `spec.triggers.pullRequestTargetBranchRegex`       |  ???  | string | Optional |
| `spec.triggers.pullRequestAllowForkEvents`       |  Determines if the Git trigger is also valid for Git forks.<br>When set to `true`, the default???, the trigger is also activated for Git repos forked from `spec.triggers.repo`.   | boolean | Optional |
| `modifiedFilesGlob`       |  Defines if to activate the trigger when the changed files match glob expression. Glob expressions can have maximum of 65500/65536 characters, including `' '`| string | Optional  |
| `spec.triggers.gerritCIStatusLabels`       |  ?????| array | Optional  |
| `spec.triggers.context`       | The name of the Git integration to use????. NIMA what happens when not specified? | string | Optional |
| `spec.triggers.concurrency`   | The maximum number of concurrent builds for this trigger, and can range from `1` (the default), to `15`, or unlimited). Define the trigger concurrency when your pipeline has multiple triggers. | string | Optional |
| `spec.triggers.priority`   | ??? Default 0, min -100, max 100 | integer | Optional |
| `spec.triggers.terminationPolicy`   | ??? | integer | Optional |




Build Termination: Options that determine when a build from the pipeline should terminate:
Once a build is created terminate previous builds from the same branch
Once a build is created terminate previous builds only from a specific branch (name matches a regular expression)
Once a build is created, terminate all other running builds
Once a build is terminated, terminate all child builds initiated from it


### spec.triggers.events

### spec.cronTriggers
{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.cronTriggers.type`     | Always set to `cron`.         | string   | Required |
| `spec.cronTriggers.id`       | ????                         | ???   | Optional |
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
| `spec.runtimeEnvironment.name`     | The name of the runtime environment to use for the pipeline.  NIMA: does this override the account-level setting? Or must it one of those REs allowed for the pipeline? Should I add it's also based on permissions? |string   | Required |
| `spec.runtimeEnvironment.memory`     | The memory threshold for the pipeline. memory share using Kubernetes notation  NIMA: does this override the account-level setting? Must it one of those in the UI? |string   | Optional |
| `spec.runtimeEnvironment.cpu`     | The number of CPUs to use for the pipeline. CPU share using Kubernetes notation ??? NIMA: does this override the account-level setting? Or must it one of those in the UI?|string   | Optional |
| `spec.runtimeEnvironment.dindStorage`     | storage size using Kubernetes notation |string   | Optional |

### spec.lowMemoryWarningThreshold
part of param description

### spec.requiredAvailableStorage
???

### spec.clustersInfo
in parameter description; need to decide if to move here with more details

### spec.variables

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.variables.key`     | The name of the variabl. |string   | Required |
| `spec.variables.value`       | ????| string | Raw value |
| `spec.variables.encrypted`       | Determines if to encrypt the stored value of the variable. When set to `false`, the default, variable values are not encrypted.<br>To encrypt, set to `true`. | boolean | Optional |

### spec.specTemplate

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.specTemplate.location`     | ??? |string   | Required |
| `spec.specTemplate.context`       | ????| string |  |
| `spec.specTemplate.url`       | ?????| string | Optional |
| `spec.specTemplate.repo`       | ?????| string | Optional |
| `spec.specTemplate.path`       | ?????| string | Optional |
| `spec.specTemplate.revision`       | ?????| string | Optional |

### spec.options

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.options.noCache`     | When set to `false`, the default, use the last build's cache. <br>To ignore the last build's cache, set to `true`. Selecting this option may slow down your build.<br>See [Last build cache]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/). |boolean   | Optional |
| `spec.options.noCfCache`     | When set to `false`, the default, uses Docker engine cache for build. <br> To ignore Docker engine cache for build, set to `true`. <br>See [Docker engine cache]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/). |boolean   | Optional |
| `spec.options.resetVolume`     | When set to `false`, the default, does not reset the pipeline volume. <br>To reset the pipeline volume, set to `true`. This is useful for troubleshooting a build that hangs on the first step. <br>See [Hangs on restoring data from pre-existing image]({{site.baseurl}}/docs/kb/articles/restoring-data-from-pre-existing-image-hangs-on/). |boolean   | Optional |
| `spec.options.enableNotifications`     | When set to `false`, the default, only sends status updates to your Git provider. <br>To send email and Slack notifications, in addition to status updates, set to `true`. <br>See [Slack notifications]({{site.baseurl}}//docs/integrations/notifications/slack-integration/). |boolean   | Optional |
| `spec.options.keepPVCsForPendingApproval`     | Determines if PVC volumes are retained  when the pipeline is waiting for approval. ????? |boolean   | Optional |
| `spec.options.pendingApprovalConcurrencyApplied`     | Determines if the pipeline build that is pending approval is counted against the number of concurrent builds defined for the pipeline. By default, left empty. NIMA: what happns then? <br>See [Define concurrency limits]({{site.baseurl}}/docs/pipelines/steps/approval/#define-concurrency-limits) |boolean   | Optional |


### spec.terminationPolicy

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.terminationPolicy.type`     |??? |boolean   | Optional |
| `spec.terminationPolicy.event`     |??? |boolean   | Optional |
| `spec.terminationPolicy.ignoreBranch`     |??? |boolean   | Optional |
| `spec.terminationPolicy.ignoreTrigger`     |??? |boolean   | Optional |
| `spec.terminationPolicy.branchName`     |??? |boolean   | Optional |
| `spec.terminationPolicy.key`     |??? |boolean   | Optional |
| `spec.terminationPolicy.value`     |??? |boolean   | Optional |

### spec.externalResources

See [External resources]({{site.baseurl}}/docs/pipelines/pipelines/#external-resources).

### spec.debug.steps
