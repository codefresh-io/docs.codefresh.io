---
title: "Codefresh runner: Enabling engine pod metrics"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Runtimes]
support-reviewed: 2023-04-18 LG
---


## Overview

To scrape the metrics from the Codefresh Runner to your existing Prometheus/Grafana stack, you must enable the metrics in the Runner's engine pod.

## Details

### How to enable

1. In the Codefresh Runner Helm chart values file, go to `runtime.engine.env.`
1. Add the `METRICS_PROMETHEUS_ENABLED` environment variable for the engine pod.

##### Scrape timeout
During normal shutdown, the engine performs a final scrape of metrics before the terminating the engine pod.  
The timeout is controlled by the `METRICS_PROMETHEUS_SCRAPE_TIMEOUT` engine variable. If you want to include the most recent metrics, we recommend setting this variable to 4 times your scrape interval.

##### Documentation
Complete documentation on all the environment variables available in the engine, including their default values, is on [Artifact Hub](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime?modal=values&path=runtime.engine.env){:target="\_blank"}.


### Available metrics

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
