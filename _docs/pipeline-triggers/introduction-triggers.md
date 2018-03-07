---
title: "Pipeline Triggers"
description: ""
group: pipeline-triggers
redirect_from:
  - /docs/pipeline-triggers/
toc: true
---

### Pipeline Triggers

To create an effective CD process, it should be possible to trigger Codefresh pipeline execution not only on code repository events (like `push` or `PR`), but also on any "interesting" CD-related event, coming from some external system.

With Codefresh, we've defined a new and extensible architecure that allows us to support triggering pipeline(s) on any "interesting" events happening in external systems.

Currently, we are supporting:

- Docker image push event for DockerHub
- Periodic pipeline execution, using `cron` timers

**Note:** we are going to extend this list constantly

### Core Concepts

There are 3 core concepts behind Codefresh Pipeline Triggers

1. Trigger Type (`trigger-type`)
1. Trigger Event (`trigger-event`)
1. Trigger (`trigger`)

#### Trigger Type

To be able to subscribe to interesting events from external (or internal) system, Codefresh support this with a new `trigger-type`.

`trigger-type` examples:

- Docker image push to DockerHub/Codefresh CFCR/Google GCR/AWS ECR/Azure ACR or any other Docker registry public or private
- `cron` timers
- Helm package update in S3, GCS, Chartmuseum and others
- Kubernetes cluster events
- CI job completion (Jenkins, TravisCI, others)
- GitHub Release update
- more to come ...

#### Trigger Event

The `trigger-event` represents a specific *event channel* (of supported `trigger-type`) in external system that can be linked to single or multiple Codefresh pipelines.

`trigger-event` examples:

- `repo/test:tag` Docker image push to DockerHub
- `@daily` cron expression
- `build-production-image` Jenkins job
- `repo/app:version` GitHub release

#### Trigger

`trigger` is a link between a `trigger-event` and a Codefresh `pipeline`. When new `event` happens on `trigger-event` channel, Codefresh will execute all linked pipelines.

### Trigger Event Payload

Every triggered pipeline get an `event` payload as environment variables with `EVENT_` prefix.

There are two types of payload. Most interesting event properties are passed as individual variables (depending on `trigger-type`) and the original event payload is also passed inside the `EVENT_PAYLOAD` variable.

Any step, within triggered Codefresh pipeline, has access to above `EVENT_*` variables.
