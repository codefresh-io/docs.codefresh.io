---
title: "Azure Registry trigger"
description: "Trigger Codefresh pipelines from Azure Registry events"
group: pipelines
sub_group: triggers
redirect_from:
  - /docs/pipeline-triggers/configure-azure-trigger/
toc: true
---

Define and manage Azure Registry triggers for pipelines with the Codefresh UI.

This allows you to trigger Codefresh pipelines when an Azure Registry event happens (e.g. a new Docker image is uploaded).

## Manage Azure triggers with Codefresh UI


The process involves two parts:

1. Creating a trigger in Codefresh. This will result in a special Codefresh webhook URL.
1. Creating a new notification in the Azure Registry that will use this URL to call Codefresh.

> Make sure that you have an Azure cloud account and have already [created a registry](https://docs.microsoft.com/en-us/azure/container-registry/).


### Create a new Azure trigger

To add a new Azure trigger, navigate to a Codefresh Pipeline *Configuration* view and expand the *Triggers* section. Press the `Add Trigger` button and select a `Registry` trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="40%"
%}

Fill the following information:

* Registry Provider - select `Azure`.
* *Name of Registry* - put Azure name of registry (without `.azurecr.io`).
* *Image Repository Name* - Azure image repository name.
* *Action* - select `Push Image` action.
* *Tags* - optional filter to specify which image *tags* will trigger pipeline execution: [Re2](https://github.com/google/re2/wiki/Syntax) regular expression.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/azure/add-trigger-dialog.png"
url="/images/pipeline/triggers/azure/add-trigger-dialog.png"
alt="Azure Registry settings"
max-width="50%"
%}

Click next and a new dialog will appear that shows you the Codefresh webhook URL. Copy it to your clipboard. 


{% include image.html
lightbox="true"
file="/images/pipeline/triggers/azure/view-trigger-dialog.png"
url="/images/pipeline/triggers/azure/view-trigger-dialog.png"
alt="Codefresh webhook URL"
max-width="50%"
%}

Now we must set Azure to call this URL when an event takes place.

### Set up Azure notification

The easiest way to create an Azure trigger is with the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/acr/webhook?view=azure-cli-latest#az-acr-webhook-create) (Also available in the Azure portal)

Here is the command:

{% highlight shell %}
{% raw %}
az acr webhook create -n MyWebhook -r kostisregistry --uri "https://g.codefresh.io/nomios/azure?account=409f15bdd444&secret=7zyg5Zhb8xYBn4ms" --actions push delete
{% endraw %}
{% endhighlight %}

The name can be anything you want. The URI is the Codefresh URL that was created in the previous step.


### Triggering a Codefresh pipeline with Azure push

Now, every time you push a new Docker image to the selected Azure Docker repository, manually, with Codefresh or any other CI/CD tool, Codefresh will trigger execution of all pipelines associated with that Azure Push trigger event.

## Related articles
[Triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  