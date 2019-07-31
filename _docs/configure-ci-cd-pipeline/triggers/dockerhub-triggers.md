---
title: "DockerHub Trigger"
description: ""
group: configure-ci-cd-pipeline
sub_group: triggers
redirect_from:
  - /docs/configure-dockerhub-trigger/
  - /docs/pipeline-triggers/configure-dockerhub-trigger/
toc: true
---

## Manage DockerHub Triggers with Codefresh UI

It is possible to define and manage DockerHub pipeline triggers with Codefresh UI.

### Create a new DockerHub Trigger

To add a new DockerHub trigger, navigate to Codefresh Pipeline *Configuration* view and expand *Triggers* section. Press the `Add Trigger` button and select a `Registry` trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="60%"
%}

Fill the following information:

* Registry Provider - select `DockerHub`
* *Namespace* - put DockerHub user name or organization name here
* *Name* - DockerHub image repository name
* *Action* - select `Push Image` action
* *Filter* - optional filter to specify which image *tags* will trigger pipeline execution: [Re2](https://github.com/google/re2/wiki/Syntax) regular expression

{% include image.html
lightbox="true"
file="/images/dockerhub_trigger_1.png"
url="/images/dockerhub_trigger_1.png"
alt="Add Registry Trigger"
max-width="70%"
%}

### Setup DockerHub Webhook

Currently Codefresh does not support to automatically setup a DockerHub webhook. You need to do this manually. Press `View Trigger` button and see detailed instructions with URL links and secrets of how-to setup a DockerHub Webhook.


{% include image.html
lightbox="true"
file="/images/dockerhub_trigger_edit.png"
url="/images/dockerhub_trigger_edit.png"
alt="Edit DockerHub Trigger"
max-width="70%"
%}

1. copy `Endpoint` URL,
1. visit DockerHub image settings page following link in help, and 
1. add a new DockerHub Webhook with previously copied `Endpoint` URL.

### Triggering Codefresh pipeline with DockerHub push

Now, every time you push a new Docker image to selected DockerHub repository, manually, with Codefresh or any other CI/CD tool, Codefresh will trigger execution of all pipelines associated with this DockerHub Push trigger event.

## Manage DockerHub Triggers with Codefresh CLI

It is possible to use `codefresh` command line client (`CLI`) to manage DockerHub pipeline triggers.

### Docker Hub Trigger

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

1. copy `endpoint` URL,
1. visit DockerHub settings page [https://hub.docker.com/r/codefresh/fortune/~/settings/webhooks/](https://hub.docker.com/r/codefresh/fortune/~/settings/webhooks/), and
1. add a new Webhook with previously copied `endpoint` URL


#### Setup pipeline trigger

Now, lets setup a new pipeline trigger, linking previously defined DockerHub push `codefresh/fortune` `trigger-event` to one ore more Codefresh pipelines.

```sh
# create trigger, linking trigger-event UID to the pipeline UID
codefresh create trigger "registry:dockerhub:codefresh:fortune:push:107e9db97062" 7a5622e4b1ad5ba0018a3c9c

# create another trigger, linking the same trigger-event to another pipeline
codefresh create trigger "registry:dockerhub:codefresh:fortune:push:107e9db97062" 4a5634e4b2cd6baf021a3c0a
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
