---
title: "Cron Trigger"
description: "Run pipelines with a time schedule"
group: pipelines
sub_group: triggers
redirect_from:
  - /docs/configure-ci-cd-pipeline/triggers/cron-triggers/
  - /docs/configure-cron-trigger/
  - /docs/pipeline-triggers/configure-cron-trigger/
toc: true
---

Cron triggers allow you to create pipelines that start on a specific time schedule. This is very useful for cleanup jobs or periodic checks or any other workflow that needs to run after a time interval.

>All times mentioned in Cron triggers use the UTC time zone. 

## Manage Cron Triggers with Codefresh UI

It is possible to define and manage Cron-based pipeline triggers with Codefresh UI.

### Create a new Cron Trigger

To add a new Cron trigger, navigate to Codefresh Pipeline *Configuration* view and expand *Triggers* section. Press the `Add Trigger` button and select a `Cron` trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="60%"
%}


Visit [this page](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md) to learn about supported `cron` expression format and aliases.


Fill the following information:

* Use Cron helper wizard to build a valid `cron` expression or write custom `cron` expression on the last tab.
* Add a free text message, that will be sent as an additional event payload every time `cron` is executed.

{% include image.html
lightbox="true"
file="/images/cron_trigger.png"
url="/images/cron_trigger.png"
alt="Add Cron Trigger"
max-width="70%"
%}


### Trigger Codefresh pipeline with cron timer

Now, `cron` will trigger a recurrent pipeline execution based on the defined `cron expression`.

## Manage Cron Triggers with Codefresh CLI

It is also possible to use the Codefresh Command Line client (`CLI`) to manage Cron based pipeline triggers.

### Cron trigger

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

When creating a `cron trigger-event`, it is possible to specify a short text message, that will be passed to linked pipelines, every time the specified `cron` timer is triggered.

Visit [this page](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md) to learn about the supported `cron` expression format and aliases.

#### Set up pipeline trigger

Now, lets create a new pipeline trigger, linking previously defined `cron` `trigger-event` to one or more Codefresh pipelines.

```sh
# create trigger, linking trigger-event UID to the pipeline UID
codefresh create trigger "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" 7a5622e4b1ad5ba0018a3c9c

# create another trigger, linking the same trigger-event to another pipeline
codefresh create trigger "cron:codefresh:codefresh:0 */20 * * * *:hello-once-in-20-min:107e9db97062" 4a5634e4b2cd6baf021a3c0a
```

From now on, every 20 minutes Codefresh will trigger a pipeline execution for 2 pipelines linked to the previously specified `cron` `trigger-event` (once in 20 minutes)

#### Cron Event payload

The following variables will be available for any Codefresh pipeline linked to a `cron` `trigger-event`:

- `EVENT_MESSAGE` - free text message (specified during creation)
- `EVENT_TIMESTAMP` - event timestamp in RFC 3339 format

## Related articles
[Triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  

