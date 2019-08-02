---
title: "Pipeline Triggers"
description: "Choose when your pipelines should run"
group: configure-ci-cd-pipeline
redirect_from:
  - /docs/pipeline-triggers/
  - /docs/pipeline-triggers/introduction-triggers/
toc: true
---


To create an effective CI/CD process, it should be possible to trigger a Codefresh pipeline execution not only on code repository events (like `push` or `PR`), but also on any "interesting" CD-related event, coming from some external system.

Codefresh not only allows you to define different pipelines on a single project but it also offers you the capability to trigger them with completely separate mechanisms.


## Codefresh Trigger Types

Trigger types currently supported by Codefresh are:

* [Git Triggers](git-triggers)
* [Dockerhub Triggers](dockerhub-triggers)
* [Azure Registry Triggers](azure-triggers)
* [Quay Triggers](quay-triggers)
* [Artifactory Triggers](jfrog-triggers)
* [Cron Trigger](cron-triggers)
* [API/CLI Trigger]({{site.baseurl}}/docs/integrations/codefresh-api/)

As an example, this project contains 4 pipelines:

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/pipeline-examples.png"
url="/images/pipeline/triggers/pipeline-examples.png"
alt="Sample pipelines"
caption="Sample pipelines"
max-width="70%"
%}

Behind the scenes these pipelines are triggered from different events:

* Pipeline "CI-build" is using a GIT trigger and starts after every commit to the code repository
* Pipeline "Sonarcloud" is executed every weekend using a cron (timed) trigger
* Pipeline "integration-test" is executed whenever a commit happens in a Pull request on the code
* Pipeline "deploy-prod-k8s" is executed whenever a Docker image is pushed to the Docker registry

This is just an example. You are free to create your own triggers that match your own internal process.
It is also possible to add multiple triggers for a pipeline so that it is executed for more than one type of events.

If a pipeline has no defined trigger you can still start it manually.

For all trigger types you can also use the [Codefresh CLI](https://codefresh-io.github.io/cli/triggers/) to manage them.



## Creating a new trigger for a pipeline

By default, when you create a new project from a GIT provider it will start with a GIT trigger that runs on every commit.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/default-git-trigger.png"
url="/images/pipeline/triggers/default-git-trigger.png"
alt="Default GIT Trigger"
caption="Default GIT Trigger"
max-width="50%"
%}

You can either delete this trigger, modify it, or add new ones.

To add a new trigger, go to the *Triggers* tab in your pipeline editor and click the *Add Trigger* button. This will bring up the respective dialog where you are adding a new trigger.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
caption="Adding new Trigger dialog"
max-width="70%"
%}

For more information see:

* [Git Triggers](git-triggers)
* [Dockerhub Triggers](dockerhub-triggers)
* [Azure Registry Triggers](azure-triggers)
* [Quay Triggers](quay-triggers)
* [Artifactory Triggers](jfrog-triggers)
* [Cron Trigger](cron-triggers)

## Disabling triggers

You can easily disable a trigger manually if you don't want to be active anymore.
On the triggers tab click the gear icon on the top right (*Open advanced options*).

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/enable-triggers.png"
url="/images/pipeline/triggers/enable-triggers.png"
alt="Toggle a trigger on/off"
caption="Toggle a trigger on/off"
max-width="70%"
%}


Then click the toggle switch on each trigger that you want to enable/disable. You can later enable the same trigger again
by clicking the same switch.

## What to read next

* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [Git triggers](git-triggers)
* [Running pipelines locally]({{site.baseurl}}/docs/configure-ci-cd-pipeline/running-pipelines-locally/)

