---
title: "Monitoring Classic Runtime"
description: "How to monitor the Codefresh Classic Runtime"
group: installation
redirect_from:
  - /docs/kb/articles/enable-engine-pod-metrics/
toc: true
---

## `engine` component

Modern versions of the Codefresh Classic Runtime ([`cf-runtime` chart >=8.2.0](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime/){:target="\_blank"}, `engine` >=1.179.1) provide the `engine` component metrics in OpenTelemetry format, with the preferable *push* model.

You can still use the *pull* model by switching to the Prometheus Metrics Exporter, which is fully compatible with Prometheus. However, we recommend using the default configuration, as it is better suited for the short-lived nature of Classic Builds and provides more precise and complete metrics.

Please refer to the `cf-runtime` Chart default values on [Artifact Hub](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime?modal=values&path=runtime.engine.env){:target="\_blank"} for configuration options.

### Resource attributes

By default, the `engine` resource has the following attributes:

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`service.name`** | string | The name of the `engine` component. | `cf-classic-engine` |
| **`service.namespace`** | string | The namespace of the `engine` component. | `cf-classic-runtime` |
| **`service.version`** | string | The version of the `engine` component; in format `<image-tag>@<image-digest>` | `1.179.1@sha256:37caef1e58f8d07ed76da753fb46eb59224e723495c1b9081d3ef7e0bc9449f9` |
| **`cf.classic.runtime.name`** | string | The name of the runtime of which this `engine` component is a part. | `my-runtime` |
| **`cf.classic.runtime.version`** | string | The version of the runtime chart. | `8.2.0` |


### Metrics

#### Default attributes

Attributes below are added to all metrics described in this section.

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.id`** | string | The ID of the build. | `6898c4e4bc5ecdb9f1f95c0c` |
| **`cf.classic.pipeline.id`** | string | The ID of the pipeline to which the build belongs. | `6898c4ea6f064e824a33edc3` |
| **`cf.classic.pipeline.name`** | string | The name of the pipeline to which the build belongs; in format `<project-name>/<pipeline-name>`. | `my-project/my-pipeline` |
| **`cf.classic.account.id`** | string | The ID of the Codefresh account in which the build is running. | `6898c4df2d142ffac1720fbf` |
| **`cf.classic.account.name`** | string | The name of the Codefresh account in which the build is running. | `my-account` |


#### `codefresh.classic.build.info`

The metric is always emitted.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.info`** | Gauge | — | Contains information about the classic build. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.phase`** | string enum | The phase of the build. | `preparing` \| `running` \| `finalizing` \| `failed` \| `succeeded` \| `terminated` |
| **`cf.classic.build.volume`** | string enum | Indicates whether the new or reused volume has been assigned to the build. | `new` \| `reused` |


#### `codefresh.classic.build.start.timestamp`

The metric is always emitted.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.start.timestamp`** | Gauge | `s` | Start time in unix timestamp for a build. |


#### `codefresh.classic.build.completion.timestamp`

The metric is always emitted.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.completion.timestamp`** | Gauge | `s` | Completion time in unix timestamp for a build. |


#### `codefresh.classic.build.phase.start.timestamp`

The metric is always emitted for every build phase.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.phase.start.timestamp`** | Gauge | `s` | Start time in unix timestamp for a build phase. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.phase`** | string enum | The phase of the build. | `preparing` \| `running` \| `finalizing` \| `failed` \| `succeeded` \| `terminated` |


#### `codefresh.classic.build.phase.completion.timestamp`

The metric is always emitted for every build phase.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.phase.completion.timestamp`** | Gauge | `s` | Completion time in unix timestamp for a build phase. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.phase`** | string enum | The phase of the build. | `preparing` \| `running` \| `finalizing` \| `failed` \| `succeeded` \| `terminated` |


#### `codefresh.classic.build.step.info`

The metric is always emitted for every build step.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.info`** | Gauge | — | Contains information about the classic build step. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |
| **`cf.classic.build.step.type`** | string | The type of the step. | `cf-internal` (for internal steps); `freestyle`; `build` |
| **`cf.classic.build.step.version`** | string | The version of the step. | `1.0.0`; `latest` |
| **`cf.classic.build.step.phase`** | string enum | The phase of the build step. | `preparing` \| `running` \| `finalizing` \| `failed` \| `succeeded` \| `terminated` \| `finished` |


#### `codefresh.classic.build.step.start.timestamp`

The metric is always emitted for every build step.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.start.timestamp`** | Gauge | `s` | Start time in unix timestamp for a build step. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |


#### `codefresh.classic.build.step.completion.timestamp`

The metric is always emitted for every build step.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.completion.timestamp`** | Gauge | `s` | Completion time in unix timestamp for a build step. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |


#### `codefresh.classic.build.step.phase.start.timestamp`

The metric is always emitted for every build step phase.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.phase.start.timestamp`** | Gauge | `s` | Start time in unix timestamp for a build step phase. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |
| **`cf.classic.build.step.phase`** | string enum | The phase of the build step. | `preparing` \| `running` \| `finalizing` \| `failed` \| `succeeded` \| `terminated` \| `finished` |


#### `codefresh.classic.build.step.phase.completion.timestamp`

The metric is always emitted for every build step phase.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.phase.completion.timestamp`** | Gauge | `s` | Completion time in unix timestamp for a build step phase. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |
| **`cf.classic.build.step.phase`** | string enum | The phase of the build step. | `preparing` \| `running` \| `finalizing` \| `failed` \| `succeeded` \| `terminated` \| `finished` |


#### `codefresh.classic.build.step.cpu.time`

The metric is always emitted for every build step. It may be missing if the step was too short to collect Docker metrics.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.cpu.time`** | Counter | `s` | Cumulative cpu time consumed by step in seconds. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |


<!-- The metrics below are emitted, but are useless until we provide a feature to set CPU limits on steps.

#### `codefresh.classic.build.step.cpu.periods`

The metric is emitted for every build step only if CPU limits has been defined on the step. It may be missing if the step was too short to collect Docker metrics.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.cpu.periods`** | Counter | `{period}` | Number of elapsed enforcement period intervals for step. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |


#### `codefresh.classic.build.step.cpu.throttled.periods`

The metric is emitted for every build step only if CPU limits has been defined on the step. It may be missing if the step was too short to collect Docker metrics.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.cpu.throttled.periods`** | Counter | `{period}` | Number of throttled period intervals for step. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |


#### `codefresh.classic.build.step.cpu.throttled.time`

The metric is emitted for every build step only if CPU limits has been defined on the step. It may be missing if the step was too short to collect Docker metrics.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.cpu.throttled.time`** | Counter | `s` | Total time duration the step has been throttled. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |

-->


#### `codefresh.classic.build.step.memory.usage`

The metric is always emitted for every build step. It may be missing if the step was too short to collect Docker metrics.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.memory.usage`** | Gauge | `By` | Current memory usage for step, including all memory regardless of when it was accessed. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |


#### `codefresh.classic.build.step.memory.working_set`

The metric is always emitted for every build step. It may be missing if the step was too short to collect Docker metrics.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.step.memory.working_set`** | Gauge | `By` | Current working set for step. Calculated as the current memory usage minus `inactive_file`. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.step.name`** | string | The name of the step as defined in the pipeline YAML. Unique per build. | `my-clone` |


#### `codefresh.classic.build.composition.info`

The metric is emitted if the composition is present in build.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.composition.info`** | Gauge | — | Contains information about the classic build composition. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.composition.name`** | string | The name of the build composition. Unique per build. | `my-services` |
| **`cf.classic.build.composition.phase`** | string enum | The phase of the build composition. | `preparing` \| `running` \| `finalizing` \| `finished` |


#### `codefresh.classic.build.composition.start.timestamp`

The metric is emitted if the composition is present in build.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.composition.start.timestamp`** | Gauge | `s` | Start time in unix timestamp for a build composition. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.composition.name`** | string | The name of the build composition. Unique per build. | `my-services` |


#### `codefresh.classic.build.composition.completion.timestamp`

The metric is emitted if the composition is present in build.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.composition.completion.timestamp`** | Gauge | `s` | Completion time in unix timestamp for a build composition. |



#### `codefresh.classic.build.composition.phase.start.timestamp`

The metric is emitted if the composition is present in build.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.composition.phase.start.timestamp`** | Gauge | `s` | Start time in unix timestamp for a build composition phase. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.composition.name`** | string | The name of the build composition. Unique per build. | `my-services` |
| **`cf.classic.build.composition.phase`** | string enum | The phase of the build composition. | `preparing` \| `running` \| `finalizing` \| `finished` |


#### `codefresh.classic.build.composition.phase.completion.timestamp`

The metric is emitted if the composition is present in build.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.composition.phase.completion.timestamp`** | Gauge | `s` | Completion time in unix timestamp for a build composition phase. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.composition.name`** | string | The name of the build composition. Unique per build. | `my-services` |
| **`cf.classic.build.composition.phase`** | string enum | The phase of the build composition. | `preparing` \| `running` \| `finalizing` \| `finished` |


#### `codefresh.classic.build.composition.task.info`

The metric is emitted if the composition is present in build.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.composition.task.info`** | Gauge | — | Contains information about the classic build composition task. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.composition.name`** | string | The name of the build composition. Unique per build. | `my-services` |
| **`cf.classic.build.composition.task.name`** | string | The name of the build composition task. Unique per build composition. | `publishServicePorts`; `start`; `pullAll` |
| **`cf.classic.build.composition.task.phase`** | string enum | The phase of the build composition task. | `running` \| `failed` \| `succeeded` |


#### `codefresh.classic.build.composition.task.start.timestamp`

The metric is emitted if the composition is present in build.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.composition.task.start.timestamp`** | Gauge | `s` | Start time in unix timestamp for a build composition task. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.composition.name`** | string | The name of the build composition. Unique per build. | `my-services` |
| **`cf.classic.build.composition.task.name`** | string | The name of the build composition task. Unique per build composition. | `publishServicePorts`; `start`; `pullAll` |


#### `codefresh.classic.build.composition.task.completion.timestamp`

The metric is emitted if the composition is present in build.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.composition.task.completion.timestamp`** | Gauge | `s` | Completion time in unix timestamp for a build composition task. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`cf.classic.build.composition.name`** | string | The name of the build composition. Unique per build. | `my-services` |
| **`cf.classic.build.composition.task.name`** | string | The name of the build composition task. Unique per build composition. | `publishServicePorts`; `start`; `pullAll` |


#### `codefresh.classic.engine.docker.request_retries`

The metric is emitted when the `engine` retries a request to the Docker daemon.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.engine.docker.request_retries`** | Counter | `{request_retry}` | Total number of retries when making requests to the Docker daemon. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`docker.operation.name`** | string | The name of the Docker operation under retry. | `pull`; `listContainers` |
| **`docker.operation.error`** | string | The error encountered during the Docker operation and caused retry. | `ENOTFOUND`; `ECONNRESET` |


#### `codefresh.classic.engine.docker.request_retries.delay.time`

The metric is emitted when the `engine` retries a request to the Docker daemon.

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.engine.docker.request_retries.delay.time`** | Counter | `s` | Total delay in seconds caused by retries when making requests to the Docker daemon. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`docker.operation.name`** | string | The name of the Docker operation under retry. | `pull`; `listContainers` |
| **`docker.operation.error`** | string | The error encountered during the Docker operation and caused retry. | `ENOTFOUND`; `ECONNRESET` |


#### `codefresh.classic.build.deprecated_images.pulled`

The metric is emitted when the `engine` pulls a deprecated "Docker Image Format v1" or "Docker Image manifest version 2, schema 1" image ([Docker docs](https://docs.docker.com/engine/deprecated/#pushing-and-pulling-with-image-manifest-v2-schema-1){:target="\_blank"}).

{: .table .table-bordered .table-hover}
| Name | Instrument Type | Unit | Description |
| ---- | --------------- | ---- | ----------- |
| **`codefresh.classic.build.deprecated_images.pulled`** | Counter | `{pull}` | Total number of deprecated "Docker Image Format v1" or "Docker Image manifest version 2, schema 1" image pulls. |

{: .table .table-bordered .table-hover}
| Attribute | Type | Description | Examples |
| --------- | ---- | ----------- | -------- |
| **`docker.image.name`** | string | The name of the Docker image. | `alpine:latest` |

---

### Metrics for debugging

If needed, you can also collect various process metrics from the `engine`. These Prometheus metrics are available on port `9100` and controlled by the `cf-runtime` chart values `runtime.engine.env.CF_TELEMETRY_PROMETHEUS_ENABLE` and `runtime.engine.env.CF_TELEMETRY_PROMETHEUS_ENABLE_PROCESS_METRICS`.

These metrics are not needed for most users and disabled by default.

---

### Deprecated metrics

{{site.data.callout.callout_tip}} 
Older versions of the Classic Runtime (`cf-runtime` chart <8.2.0, `engine` <1.179.0) provided the following Prometheus metrics on port `9100` of the `engine` pod.
{{site.data.callout.end}}

{{site.data.callout.callout_warning}}
**Deprecated**  
These metrics are deprecated and will be removed in future releases. We recommend migrating to the modern metrics described above as soon as possible.
{{site.data.callout.end}}

Each of the metrics below has the following additional labels: `account_name`, `docker_node_address`, `pipeline_id`, `repo_branch`, `workflow`

* `codefresh_engine_deprecated_images_pulled_total` [since engine:1.177.1]
<br>Total number of deprecated Schema 1 images pulls
<br>Type: Counter
<br>Labels: `image_name`

* `codefresh_engine_docker_daemon_requests_retries_delay_seconds_total`
<br>Total delay in seconds for retry requests to Docker daemon
<br>Type: Counter
<br>Labels: `error`, `operation` [since engine:1.177.0]

* `codefresh_engine_docker_daemon_requests_retries_total`
<br>Total number of retry requests to Docker daemon
<br>Type: Counter
<br>Labels: `error`, `operation` [since engine:1.177.0]

* `codefresh_workflow_composition_duration_seconds`
<br>Composition duration in seconds
<br>Type: Gauge
<br>Labels: `composition_name`, `phase`

* `codefresh_workflow_composition_phase_status`
<br>Composition phase status: 1 for current status, 0 otherwise
<br>Type: Gauge
<br>Labels: `composition_name`, `phase`, `status`

* `codefresh_workflow_composition_status`
<br>Composition status: 1 for current status, 0 otherwise
<br>Type: Gauge
<br>Labels: `composition_name`, `status`

* `codefresh_workflow_duration_seconds`
<br>Workflow duration in seconds
<br>Type: Gauge
<br>Labels: `phase`

* `codefresh_workflow_internal_images_reused`
<br>1 if internal images were reused from cache by workflow, 0 otherwise
<br>Type: Gauge
<br>Labels: —

* `codefresh_workflow_phase_status`
<br>Workflow phase status: 1 for current status, 0 otherwise
<br>Type: Gauge
<br>Labels: `phase`, `status`

* `codefresh_workflow_status`
<br>Workflow status: 1 for current status, 0 otherwise
<br>Type: Gauge
<br>Labels: `status`

* `codefresh_workflow_step_duration_seconds`
<br>Workflow step duration in seconds
<br>Type: Gauge
<br>Labels: `phase`, `step_name`, `step_type`

* `codefresh_workflow_step_status`
<br>Workflow step status: 1 for current status, 0 otherwise
<br>Type: Gauge
<br>Labels: `phase`, `status`, `step_name`, `step_type`

* `codefresh_workflow_volume_reused`
<br>1 if the volume was reused by workflow, 0 otherwise
<br>Type: Gauge
<br>Labels: —
