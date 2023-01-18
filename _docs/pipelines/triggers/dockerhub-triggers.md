---
title: "DockerHub triggers"
description: ""
group: pipelines
sub_group: triggers
redirect_from:
  - /docs/configure-ci-cd-pipeline/triggers/dockerhub-triggers/
  - /docs/configure-dockerhub-trigger/
  - /docs/pipeline-triggers/configure-dockerhub-trigger/
toc: true
---


You can define and manage DockerHub triggers in Codefresh.

### Create a new DockerHub trigger in Codefresh UI

To add a new DockerHub trigger, navigate to Codefresh Pipeline *Configuration* view and expand *Triggers* section. Press the `Add Trigger` button and select a `Registry` trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="60%"
%}

Fill the following information:

* *Registry Provider* - select `DockerHub`.
* *User/Organization Name* - put DockerHub user name or organization name here.
* *Image Repository Name* - DockerHub image repository name.
* *Action* - select `Push Image` action.
* *Tag* - optional filter to specify which image *tags* will trigger pipeline execution: [Re2](https://github.com/google/re2/wiki/Syntax) regular expression.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/dockerhub/dockerhub_trigger_1.png"
url="/images/pipeline/triggers/dockerhub/dockerhub_trigger_1.png"
alt="Add Registry Trigger"
max-width="70%"
%}

### Setup DockerHub Webhook

Currently Codefresh does not support automatically setting up a DockerHub webhook. You need to do this manually. Press the *Next* button and see detailed instructions with URL links and secrets of how-to setup a DockerHub Webhook.


{% include image.html
lightbox="true"
file="/images/pipeline/triggers/dockerhub/dockerhub_trigger_2.png"
url="/images/pipeline/triggers/dockerhub/dockerhub_trigger_2.png"
alt="Add Webhook"
max-width="70%"
%}

1. Copy `Endpoint` URL
1. Visit DockerHub image settings page following link in help
1. Add a new DockerHub Webhook with previously copied `Endpoint` URL

### Triggering Codefresh pipeline with DockerHub push

Now, every time you push a new Docker image to selected DockerHub repository, manually, with Codefresh or any other CI/CD tool, Codefresh will trigger execution of all pipelines associated with this DockerHub Push trigger event.

## Manage DockerHub triggers with Codefresh CLI

It is possible to use `codefresh` command line client (`CLI`) to manage DockerHub pipeline triggers.

### Docker Hub Trigger

It is possible to trigger Codefresh CD pipeline(s) when a new Docker image pushed into DockerHub.

You can use [Codefresh CLI](https://cli.codefresh.io/) to setup a Codefresh trigger for DockerHub.

#### Create DockerHub trigger-event

First, create a `trigger-event` for every DockerHub image, you would like to setup a Codefresh trigger.

```
# create DockerHub trigger event for codefresh/fortune
codefresh create trigger-event --type registry --kind dockerhub --value namespace=codefresh --value name=fortune --value action=push

# on success trigger-event UID will be printed out
Trigger event: registry:dockerhub:codefresh:fortune:push:107e9db97062 was successfully created.
```

#### Set up DockerHub webhook

Currently, an additional manual action is required to bind DockerHub `push` image event to the Codefresh `trigger-event`.

```
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

1. Copy `endpoint` URL
1. Visit DockerHub settings page [https://hub.docker.com/r/codefresh/fortune/~/settings/webhooks/](https://hub.docker.com/r/codefresh/fortune/~/settings/webhooks/).
1. Add a new Webhook with previously copied `endpoint` URL.


#### Set up pipeline trigger

Now, lets set up a new pipeline trigger, linking previously defined DockerHub push `codefresh/fortune` `trigger-event` to one or more Codefresh pipelines.

```
# create trigger, linking trigger-event UID to the pipeline UID
codefresh create trigger "registry:dockerhub:codefresh:fortune:push:107e9db97062" 7a5622e4b1ad5ba0018a3c9c

# create another trigger, linking the same trigger-event to another pipeline
codefresh create trigger "registry:dockerhub:codefresh:fortune:push:107e9db97062" 4a5634e4b2cd6baf021a3c0a
```

From now on, Codefresh will trigger pipeline execution when new `codefresh/fortune` image is pushed to the DockerHub.

#### DockerHub Event payload

The following variables will be available for any Codefresh pipeline linked to a DockerHub `trigger-event`:

- `EVENT_NAMESPACE` - DockerHub namespace (alias `organization`).
- `EVENT_NAME` - DockerHub image name (alias `repository`).
- `EVENT_TAG` - Docker image tag.
- `EVENT_PUSHER` - user who pushed this Docker image.
- `EVENT_PUSHED_AT` - timestamp for push event.
- `EVENT_PAYLOAD` - original DockerHub Webhook JSON payload.

## Related articles
[Triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
