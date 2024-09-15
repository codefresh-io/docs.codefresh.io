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

### .spec fields


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





