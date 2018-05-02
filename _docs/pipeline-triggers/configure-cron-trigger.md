---
title: "Cron Trigger"
description: ""
group: pipeline-triggers
redirect_from:
  - /docs/configure-cron-trigger/
toc: true
---

## Manage Cron Triggers with Codefresh UI

Use Cron trigger to create a recurrent execution of Codefresh pipeline(s).

It is possible to define and manage Cron-based pipeline triggers with Codefresh UI.

### Create a new Cron Trigger

To add a new Cron trigger, navigate to Codefresh Pipeline *Configuration* view and expand *Triggers* section. Press the `Add Trigger` button and select a `Cron` trigger type to add.

![Create Trigger](/docs/images/create_trigger.png)

Visit [this page](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md) to learn about supported `cron` expression format and aliases.


Fill the following information:

* Use Cron helper wizard to build a valid `cron` expression or write custom `cron` expression on last tab
* Add a free text message, that will be sent as additional event payload every time `cron` is executed

![Add Cron Trigger](/docs/images/cron_trigger.png)

### Triggering Codefresh pipeline with cron timer

Now, `cron` will trigger a recurrent pipeline execution based on defined `cron expression`.

## Manage Cron Triggers with Codefresh CLI

It is possible to use `codefresh` command line client (`CLI`) to manage Cron based pipeline triggers.

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

#### Setup pipeline trigger

Now, lets create a new pipeline trigger, linking previously defined `cron` `trigger-event` to one ore more Codefresh pipelines.

```sh
# create trigger, linking trigger-event UID to the pipeline UID
codefresh create trigger "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" 7a5622e4b1ad5ba0018a3c9c

# create another trigger, linking the same trigger-event to another pipeline
codefresh create trigger "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" 4a5634e4b2cd6baf021a3c0a
```

From now on, every 20 minutes Codefresh will trigger pipeline execution for 2 pipeline linked to the previously specified `cron` `trigger-event` (once in 20 minutes)

#### Cron Event payload

The following variables will be available for any Codefresh pipeline linked to a `cron` `trigger-event`.

- `EVENT_MESSAGE` - free text message (specified during creation)
- `EVENT_TIMESTAMP` - event timestamp in RFC 3339 format
