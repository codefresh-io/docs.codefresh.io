---
title: "Artifactory trigger"
description: "Trigger Codefresh pipelines from Artifactory"
group: configure-ci-cd-pipeline
sub_group: triggers
redirect_from:
  - /docs/pipeline-triggers/configure-jfrog-trigger/
toc: true
---

Define and manage Artifactory pipeline triggers with the Codefresh UI.
This allows you to trigger Codefresh pipelines when an Artifactory event occurs (i.e. a new Docker image is uploaded).

## Manage Artifactory Triggers with Codefresh UI


The process involves two parts:

1. Creating a trigger in Codefresh. This will result in a special Codefresh webhook URL
1. Activating the [webhook plugin](https://github.com/jfrog/artifactory-user-plugins/tree/master/webhook) in Artifactory and setting it up to call the Codefresh URL

> Make sure that you have admin access to your Artifactory instance in order to setup its webhook plugin.

### Create a new Artifactory trigger

To add a new Artifactory trigger, navigate to a Codefresh Pipeline *Configuration* view and expand the *Triggers* section. Press the `Add Trigger` button and select a `Registry` trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="40%"
%}

Fill the following information:

* *Registry Provider* - select `JFrog`.
* *Repository Name* - put JFrog name of repository.
* *Docker Image Name* - put name of Docker image.
* *Action* - select `Push Image` action.
* *Tag* - optional filter to specify which image *tags* will trigger pipeline execution: [Re2](https://github.com/google/re2/wiki/Syntax) regular expression.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/jfrog/configure-trigger.png"
url="/images/pipeline/triggers/jfrog/configure-trigger.png"
alt="Artifactory Registry settings"
max-width="50%"
%}

Click next and a new Dialog will appear that shows you the Codefresh webhook URL. Copy it to your clipboard. 


{% include image.html
lightbox="true"
file="/images/pipeline/triggers/jfrog/view-trigger-dialog.png"
url="/images/pipeline/triggers/jfrog/view-trigger-dialog.png"
alt="Codefresh webhook URL"
max-width="50%"
%}

Now we must set JFrog Artifactory to call this URL when an event takes place.

### Set up JFrog Artifactory webhook plugin

The [webhook functionality](https://github.com/jfrog/artifactory-user-plugins/tree/master/webhook) in JFrog artifactory comes in plugin.
You can read [detailed documentation](https://www.jfrog.com/confluence/display/RTF/User+Plugins) for JFrog plugins but in summary:

* The file `webhook.groovy` needs to be copied to `ARTIFACTORY_HOME/etc/plugins` (the plugin itself)
* A file `webhook.config.json` should also be placed in the same folder (the plugin setup)

Here is an example for Codefresh.

`webhook.config.json` 
{% highlight json %}
{% raw %}
{
 "webhooks": {
   "mywebhook": {
     "url": "https://g.codefresh.io/nomios/jfrog?account=2dfdf89f235bfe&sefgt=EvQf9bBS55UPekCu",
     "events": [
       "docker.tagCreated"
     ]
   }
 },
 "debug": false,
 "timeout": 15000
}
{% endraw %}
{% endhighlight %}



### Trigger a Codefresh pipeline with an Artifactory push

Now, every time you push/tag a Docker image to the selected Artifactory repository, manually, with Codefresh or any other CI/CD tool, Codefresh will trigger execution of all pipelines associated with that Artifactory Push trigger event.

## Related articles
[Triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  