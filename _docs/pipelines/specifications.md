---
title: "Pipeline specifications"
description: "Complete schema for pipelines"
group: pipelines
toc: true
---



## .version

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Value |
| --------------  | ---------------------------- |-----------| -------------------------|
| `.version`      | The version of the pipeline schema and is always a fixed version.  | string    | `1.0` |

## .kind
{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Value |
| --------------  | ---------------------------- |-----------| -------------------------|
| `.kind`      | The kind object type for the schema and is always set to `pipeline`.  | string    | `pipeline'` |

## .metadata

{: .table .table-bordered .table-hover}
| Field           | Description                 | Type      | Value |
| --------------  | ---------------------------- |-----------| -------------------------|
| `.kind`      | The object type for the schema and is always set to `pipeline`.  | string    | `pipeline'` |



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





