---
title: "DockerHub Trigger"
description: ""
group: pipeline-triggers
redirect_from:
  - /docs/configure-dockerhub-trigger/
toc: true
---

### DockerHub Trigger

It is possible to trigger a Codefresh CD pipeline(s) when a new Docker image pushed into DockerHub.

You can use [Codefresh CLI](https://cli.codefresh.io/) to setup a Codefresh trigger for DockerHub.

#### Create DockerHub trigger-event

First, create a `trigger-event` for every DockerHub image, you would like to setup a Codefresh trigger.

```sh
# create DockerHub trigger event for codefresh/fortune
codefresh create trigger-event --type registry --kind dockerhub --value namespace=codefresh --value name=fortune

# on success trigger-event UID will be printed out
Trigger event: registry:dockerhub:codefresh:fortune:push:107e9db97062 was successfully created.
```

#### Setup DockerHub Webhook

Currently, an additional manual work is required to bind DockerHub `push` image event to the Codefresh `trigger-event`.

```sh
# get trigger-event details for previously created trigger-event
codefresh get trigger-event -o yaml registry:dockerhub:codefresh:fortune:push:107e9db97062
```

... command output:

```yaml
uri: 'registry:dockerhub:codefresh:fortune:push:107e9db97062'
type: registry
kind: dockerhub
public: false
secret: aGao5weuez2G6WF9
status: active
endpoint: >-
  https://g.codefresh.io/nomios/dockerhub?account=107e9db97062&secret=aGao5weuez2G6WF9
description: Docker Hub codefresh/fortune push event
help: >-
  Docker Hub webhooks fire when an image is built in, pushed or a new tag is
  added to, your repository.


  Configure Docker Hub webhooks on
  https://hub.docker.com/r/codefresh/fortune/~/settings/webhooks/


  Add following Codefresh Docker Hub webhook endpoint
  https://g.codefresh.io/nomios/dockerhub?account=107e9db97062&secret=aGao5weuez2G6WF9
```

1. copy `endpoint` URL
1. visit DockerHub settings page [https://hub.docker.com/r/codefresh/fortune/~/settings/webhooks/](https://hub.docker.com/r/codefresh/fortune/~/settings/webhooks/)
1. add a new Webhook with previously copied `endpoint` URL


#### Link Codefresh trigger-event to the pipeline

Now, link previously defined DockerHub push `codefresh/fortune` `trigger-event` to one ore more Codefresh pipelines.

```sh
# link trigger-event UID to the pipeline UID
codefresh link "registry:dockerhub:codefresh:fortune:push:107e9db97062" 7a5622e4b1ad5ba0018a3c9c

# link the same trigger-event to another pipeline
codefresh link "registry:dockerhub:codefresh:fortune:push:107e9db97062" 4a5634e4b2cd6baf021a3c0a
```

From now on, Codefresh will trigger pipeline execution when new `codefresh/fortune` image is pushed to the DockerHub.

#### DockerHub Event payload

The following variables will be available for any Codefresh pipeline linked to a DockerHub `trigger-event`.

- `EVENT_NAMESPACE` - DockerHub namespace (alias `organization`)
- `EVENT_NAME` - DockerHub image name (alias `repository`)
- `EVENT_TAG` - Docker image tag
- `EVENT_PUSHER` - user who pushed this Docker image
- `EVENT_PUSHED_AT` - timestamp for push event
- `EVENT_PAYLOAD` - original DockerHub Webhook JSON payload
