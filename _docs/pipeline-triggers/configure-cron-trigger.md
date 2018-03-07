---
title: "Cron Trigger"
description: ""
group: pipeline-triggers
redirect_from:
  - /docs/configure-cron-trigger/
toc: true
---

### Cron Trigger

It is possible to trigger a Codefresh CD pipeline(s) periodically, using `cron` expression.

You can use [Codefresh CLI](https://cli.codefresh.io/) to setup a Codefresh `cron` trigger.

#### Create Cron trigger-event

First, you need to create a new `cron` `trigger-event` to define a recurrent event.

```sh
# create DockerHub recurrent event 'once in 20 minutes'
codefresh create trigger-event --type cron --kind codefresh --value expression="0 */20 * * * *" --value message="hello-once-in-20-min"

# on success trigger-event UID will be printed out
Trigger event: "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" was successfully created.
```

When creating a `cron`` trigger-event`, it is possible to specify a short text message, that will be passed to linked pipelines, every time the specified `cron` timer is triggered.

Visit [this page](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md) to learn about supported `cron` expression format and aliases.

#### Link Codefresh trigger-event to the pipeline

Now, link previously defined `cron` `trigger-event` to one ore more Codefresh pipelines.

```sh
# link trigger-event UID to the pipeline UID
codefresh link "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" 7a5622e4b1ad5ba0018a3c9c

# link the same trigger-event to another pipeline
codefresh link "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" 4a5634e4b2cd6baf021a3c0a
```

From now on, every 20 minutes Codefresh will trigger pipeline execution for 2 pipeline linked to the previously specified `cron` `trigger-event` (once in 20 minutes)

#### Cron Event payload

The following variables will be available for any Codefresh pipeline linked to a `cron` `trigger-event`.

- `EVENT_MESSAGE` - free text message (specified during creation)
- `EVENT_TIMESTAMP` - event timestamp in RFC 3339 format
