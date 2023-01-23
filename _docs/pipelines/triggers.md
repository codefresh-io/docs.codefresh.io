---
title: "Triggers in pipelines"
description: "Choose when your pipelines should run"
group: pipelines
redirect_from:
  - /docs/configure-ci-cd-pipeline/triggers/
  - /docs/pipeline-triggers/
  - /docs/pipeline-triggers/introduction-triggers/
toc: true
---


To create an effective CI/CD process, it should be possible to trigger a Codefresh pipeline execution not only on code repository events (like `push` or `PR`), but also on any "interesting" CD-related event, coming from some external system.

Codefresh not only allows you to define different pipelines on a single project but it also offers you the capability to trigger them with completely separate mechanisms.


## Pipeline trigger types

The following types of triggers are currently supported pipelines:

* [Git triggers](git-triggers)
* [Docker Hub triggers](dockerhub-triggers)
* [Azure Registry triggers](azure-triggers)
* [Quay triggers](quay-triggers)
* [Helm triggers](helm-triggers)
* [Artifactory triggers](jfrog-triggers)
* [Cron trigger](cron-triggers)
* [API/CLI trigger]({{site.baseurl}}/docs/integrations/codefresh-api/)

As an example, this project contains four pipelines:

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/pipeline-examples.png"
url="/images/pipeline/triggers/pipeline-examples.png"
alt="Sample pipelines"
caption="Sample pipelines"
max-width="70%"
%}

Behind the scenes these pipelines are triggered from different events:

* Pipeline "CI-build" uses a GIT trigger and starts after every commit to the code repository
* Pipeline "Sonarcloud" is executed every weekend using a cron (timed) trigger
* Pipeline "integration-test" is executed whenever a commit happens in a Pull request on the code
* Pipeline "deploy-prod-k8s" is executed whenever a Docker image is pushed to the Docker registry

This is just an example. You are free to create your own triggers that match your own internal process.
It is also possible to add multiple triggers for a pipeline so that it is executed for more than one type of events.

If a pipeline has no defined trigger you can still start it manually.

You can also manage all trigger types using the [Codefresh CLI](https://codefresh-io.github.io/cli/triggers/){:target="\_blank"}.



## Creating a new trigger for a pipeline

By default, when you create a new project from a Git provider, it will start with a Git trigger that runs on every commit.

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

For more information, see [Pipeline trigger types](#pipeline-trigger-types)


## Disabling triggers

You can easily disable a trigger manually if you don't want it to be active anymore.
On the triggers tab, click the gear icon on the top right (*Open advanced options*).

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

## Related articles
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Running pipelines locally]({{site.baseurl}}/docs/pipelines/running-pipelines-locally/)  
[Trigger a Kubernetes deployment from a Docker Hub push event]({{site.baseurl}}/docs//example-catalog/cd-examples/trigger-a-k8s-deployment-from-docker-registry/)
