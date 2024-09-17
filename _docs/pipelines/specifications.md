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
| `.version`      | The version of the pipeline schema and is always set to  `1.0`.  | string    | ?? |

## .kind
{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `.kind`      | The kind object type for the schema and is always set to `pipeline`.  | string    | ?? |

## .metadata

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `metadata.id`        | The ID of the pipeline.  | string    | `????'` |
| `metadata.name`      | The full path to the pipeline, including the name of the project to which the pipeline belongs, in the format `project_name/pipeline_name`. |  string | Required |
| `metadata.shortName`      | The name of the pipeline ???. |  string | Optional  |
| `metadata.revision`      | The ???. |  integer | Optional  |
| `metadata.isPublic `     | Determines if public logs are enabled or disabled for the pipeline. By default, public logs are disabled.<br>When set to `true`, clicking the build badge allows all users with access to the pipeline to also view the build logs, even if they are not logged into Codefresh. See [Public build logs]({{site.baseurl}}//docs/pipelines/configuration/build-status/#public-build-logs).| boolean  | Optional |
| `metadata.description`   | A meaningful description of the pipeline. (NIMA: is there a a max limit) | string | Optional |
| `metadata.labels`        | The parent object for `metadata.labelKeys` defining the `tags` assigned to the pipeline. ????    | object |  Optional |
| `metadata.labelKeys`    | The tags ????/  is this the same as `tags`? A list of [access control tags]({{site.baseurl}}/docs/administration/account-user-management/access-control/#marking-pipelines-with-policy-attributes) for this pipeline | | string |  Optional |
| `metadata.created_at`    | The date and time at which the pipeline was created in the format ????/   | date |  Optional |
| `metadata.updated_at`    | The date and time at which the pipeline YAML was updated, in the format ????/   | date |  Optional |
| `metadata.accountId`    | The ID of the account to which the pipeline belongs.  ????/   | obejctId |  Optional |
| `metadata.originalYamlString` | ?????the full contents of the pipeline editor. Only kept for archival purposes | string  | Optional |
| `metadata.projectId`        | The ID of the project to which the pipeline belongs.  | obejctId  | Optional |
| `metadata.project`        | The name of the project to which the pipeline belongs.  | string  | Optional |
| `metadata.template `       | ????Determines if the pipeline is available as a template when creating a new pipeline. <br>When set to `true`, the pipeline name is displayed in the Pipeline Template list. | boolean | Optional |
| `metadata.template.isTemplate` | When set to `true`, the pipeline name is displayed in the Pipeline Template list. | boolean | Optional |
| `metadata.template.generatedFrom` |????? When set to `true`, the pipeline name is displayed in the Pipeline Template list. | boolean | Optional |
| `metadata.executionContextId`  |  ???The ID of the specific execution context to use for the pipeline to makes API calls to the pipeline.<br>If there are no execution contexts created for the pipeline, the default execution context is used. (NIMA: is this the CF provided one? what are the implications - that it allows all API calls or minimal ones?).<br>See [Pipeline execution context]({{site.baseurl}}/docs/administration/account-user-management/pipeline-execution-context/).    | string | Required???? |










## .spec

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Required/Optional |
| --------------  | ---------------------------- |-----------| -------------------------|
| `spec.scopes`           | ??? | string    | `????'` |
| `spec.scopeSnapshot`    | The ID of the pipeline.  | string    | `????'` |
| `spec.permitRestartFromFailedSteps` | Determines if users can restart a failed pipeline from the failed step, instead of from the beginning of the pipeline.<br>When set to `true`, users can restart the pipeline from the failed step. <br>See [Restarting a failed pipeline]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#restarting-the-pipeline).| boolean    | Optional |
| `spec.build_version`    | ???  | string    | Optional |
| `spec.triggers`    | The list of Git triggers defined for the pipeline. For details, see [`spec.triggers](#spectriggers). | array    | ??? |
| `spec.cronTriggers`    | The list of Cron or timer-based triggers defined for the pipeline. For details, see [`spec.cronTriggers](#speccrontriggers). | array    | `????'` |
| `spec.runtimeEnvironment`    | The runtime environment selected for the pipeline and its configuration settings such as memory and CPU. For details, see [`spec.runtimeEnvironments](#specruntimeenvironment).  | object    | Optional?? |
| `spec.lowMemoryWarningThreshold`    | The memory-usage threshold for the pipelines build exceeding which to display banner alerts. Useful to get timely warnings and prevent build failures. <br>Can be one of the following:{::nomarkdown}<ul><li><b>WARNING</b>: Displays a banner when memory usage exceeds 70% of the available memory. </li><li><b>CRITICAL</b>: Displays a banner when memory usage exceeds 90% of the available memory. </li><li><b>REACHED_LIMIT</b>: Displays a banner when memory usage exceeds 100% of the available memory. Setting this threshold means that the pipeline build has already failed when the banner is displayed.</li> {:/}See also [Set memory usage threshold for pipeline build]({{site.baseurl}}/docs/pipelines/pipelines/#set-memory-usage-threshold-for-pipeline-build).| string    | Optional|
| `spec.packId`    | ??? | string    | `????'` |
| `spec.requiredAvailableStorage`    | ???The minimum disk space for the pipeline’s build volume. <br> When defined, Codefresh assigns either a cached disk with sufficient disk space or a new empty disk at the start of the build. Otherwise, only the space not allocated for caching is available for the build volume. <br>See [Set minimum disk space for a pipeline build]({{site.baseurl}}/docs/pipelines/pipelines/#set-minimum-disk-space-for-a-pipeline-build). (NIMA: is there a default min and max? is it the same as the UI?)  | string    | Optional |
| `spec.contexts`    | ?? The The ID of the pipeline.  | string    | `????'` |
| `spec.clustersInfo`    | Determines if all (`injectAll`) or specific  (`clusters`) Kubernetes cluster contexts are available for the pipeline build.<br>See [Select Kubernetes cluster contexts]({{site.baseurl}}/docs/pipelines/pipelines/#select-kubernetes-cluster-contexts).  | object  | Optional |
| `spec.clustersInfo.injectAll`     | When set as `true` (NIMA is this the default?), injects all clusters integrated with Codefresh into the pipeline build.   | boolean    | Optional |
| `spec.clustersInfo.clusters`     | Applicable only when `injectAll`is set to `false`.<br>One or more comma-separated names of clusters to inject during the pipeline build. For example, `aws`, `eks-prod`. | array      | Optional |
| `spec.variablesSchema`    | The ID of the pipeline.  | string    | `????'` |
| `spec.variables`    | The ID of the pipeline.  | string    | `????'` |
| `spec.specTemplate`    | The ID of the pipeline.  | string    | `????'` |
| `spec.steps`    | The steps to be executed by the pipeline, as a list of key-values pairs.<br>See [Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/). | object    | Required |
| `spec.services`    | The ID of the pipeline.  | string    | `????'` |
| `spec.hooks`    | The ID of the pipeline.  | string    | `????'` |
| `spec.stages`    | The ID of the pipeline.  | string    | `????'` |
| `spec.mode`    | The ID of the pipeline.  | string    | `????'` |
| `spec.fail_fast`    | The ID of the pipeline.  | string    | `????'` |
| `spec.strict_fail_fast`    | The ID of the pipeline.  | string    | `????'` |
| `spec.success_criteria`    | The ID of the pipeline.  | string    | `????'` |
| `spec.options`    | The ID of the pipeline.  | string    | `????'` |
| `spec.concurrency`    | The ID of the pipeline.  | string    | `????'` |
| `spec.triggerConcurrency`    | The ID of the pipeline.  | string    | `????'` |
| `spec.branchConcurrency`    | The ID of the pipeline.  | string    | `????'` |
| `spec.priority`    | The ID of the pipeline.  | string    | `????'` |
| `spec.terminationPolicy`    | The ID of the pipeline.  | string    | `????'` |
| `spec.externalResources`    | The ID of the pipeline.  | string    | `????'` |
| `spec.debug`    | The ID of the pipeline.  | string    | `????'` |
| `spec.serviceAccount`    | The ID of the pipeline.  | string    | `????'` |





### spec.triggers


### spec.triggers.events


### spec.cronTriggers

### spec.runtimeEnvironment

### spec.lowMemoryWarningThreshold


### spec.requiredAvailableStorage

### spec.clustersInfo

### spec.variables


### spec.specTemplate


### spec.debug.steps





