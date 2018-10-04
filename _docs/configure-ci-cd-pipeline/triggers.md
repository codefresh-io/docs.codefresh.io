---
title: "Pipeline Triggers"
description: ""
group: configure-ci-cd-pipeline
redirect_from:
  - /docs/pipeline-triggers/
  - /docs/pipeline-triggers/introduction-triggers/
toc: true
---


To create an effective CI/CD process, it should be possible to trigger a Codefresh pipeline execution not only on code repository events (like `push` or `PR`), but also on any "interesting" CD-related event, coming from some external system.

Codefresh not only allows you to define different pipelines on a single project but it also offers you the capability to trigger them with completely separate mechanisms.

>Note that before you add any trigger to a new pipeline you must save it first

## Codefresh Trigger Types

Trigger types currently supported by Codefresh are:

* [Git Triggers](git-triggers)
* [Dockerhub Triggers](dockerhub-triggers)
* [Quay Triggers](quay-triggers)
* [Cron Trigger](cron-triggers)

As an example, this project contains 4 pipelines:

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/pipeline-examples.png"
url="/images/pipeline/triggers/pipeline-examples.png"
alt="Sample pipelines"
max-width="100%"
%}

Behind the scenes these pipelines are triggered from different events

* Pipeline "CI-build" is using a GIT trigger and starts after every commit to the code repository
* Pipeline "Sonarcloud" is executed every weekend using a cron (timed) trigger
* Pipeline "integration-test" is executed whenever a commit happens in a Pull request on the code
* Pipeline "deploy-prod-k8s" is executed whenever a Docker image is pushed to the Docker registry

This is just an example. You are free to create your own triggers that match your own internal process.
It is also possible to add multiple triggers for a pipeline so that it is executed for more than one type of events.

If a pipeline has no defined trigger you can still start it manually.

For all trigger types you can also use the [Codefresh CLI](https://codefresh-io.github.io/cli/triggers/) to manage them.



## Creating a new trigger for a pipeline

By default when you create a new project from a GIT provider it will start with a GIT trigger that runs on every commit.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/default-git-trigger.png"
url="/images/pipeline/triggers/default-git-trigger.png"
alt="Default GIT Trigger"
max-width="50%"
%}

You can either delete this trigger, modify it, or add new ones.

To add a new trigger expand the "Triggers" section in your pipeline and click the "Add Trigger button". This will bring up the respective dialog where you are add a new trigger.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="60%"
%}

For more information see:

* [Git Triggers](git-triggers)
* [Dockerhub Triggers](dockerhub-triggers)
* [Quay Triggers](quay-triggers)
* [Cron Trigger](cron-triggers)

