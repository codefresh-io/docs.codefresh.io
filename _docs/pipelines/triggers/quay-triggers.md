---
title: "Quay Trigger"
description: "Trigger Codefresh pipelines from Quay"
group: pipelines
sub_group: triggers
redirect_from:
  - /docs/configure-ci-cd-pipeline/triggers/quay-triggers/
  - /docs/pipeline-triggers/configure-quay-trigger/
toc: true
---

Define and manage Quay triggers for pipelines with the Codefresh UI.
This allows you to trigger Codefresh pipelines when a Quay event happens (e.g. a new Docker image is uploaded).

## Manage Quay triggers with Codefresh UI


The process involves two parts:

1. Creating a trigger in Codefresh (this will result in a special Codefresh webhook URL)
1. Creating a new notification in Quay that will use this URL to call Codefresh

> Make sure that you have a Quay account and have already [created a repository](https://docs.quay.io/guides/create-repo.html) (or pushed a Docker image at least once).


### Create a new Quay Trigger

To add a new Quay trigger, navigate to a Codefresh Pipeline *Configuration* view and expand the *Triggers* section. Press the `Add Trigger` button and select a `Registry` trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="40%"
%}

Fill the following information:

* *Registry Provider* - select `Quay`.
* *User/Organization Name* - put Quay username or organization name here.
* *Image Repository Name* - Quay image repository name.
* *Action* - select `Push Image` action.
* *Tag* - optional filter to specify which image *tags* will trigger pipeline execution: [Re2](https://github.com/google/re2/wiki/Syntax) regular expression.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/quay/add-trigger-dialog.png"
url="/images/pipeline/triggers/quay/add-trigger-dialog.png"
alt="Quay Registry settings"
max-width="50%"
%}

Click next and a new Dialog will appear that shows you the Codefresh webhook URL. Copy it to your clipboard. 


{% include image.html
lightbox="true"
file="/images/pipeline/triggers/quay/view-trigger-dialog.png"
url="/images/pipeline/triggers/quay/view-trigger-dialog.png"
alt="Codefresh webhook URL"
max-width="50%"
%}

Now we must set Quay to call this URL when an event takes place.

### Set up Quay notification

Log in your Quay account and go to the respective repository. You can also click the link shown in the Codefresh dialog to go directly to the settings of that repository.

Scroll down and under *Events and Notifications* click *Create Notification*.


{% include image.html
lightbox="true"
file="/images/pipeline/triggers/quay/add-quay-notification.png"
url="/images/pipeline/triggers/quay/add-quay-notification.png"
alt="Add Quay Notification"
max-width="50%"
%}

In the new screen select *Push to repository* from the drop-down or any other event that you wish the Codefresh pipeline to trigger.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/quay/edit-quay-notification.png"
url="/images/pipeline/triggers/quay/edit-quay-notification.png"
alt="Edit Quay Notification"
max-width="50%"
%}

From the next dropdown choose *Webhook Post*. In the *Webhook URL entry* paste the Codefresh URL that was created in the Codefresh Trigger dialog.

Finally click *Create Notification*.


### Triggering a Codefresh pipeline with Quay push

Now, every time you push a new Docker image to the selected Quay repository, manually, with Codefresh or any other CI/CD tool, Codefresh will trigger execution of all pipelines associated with that Quay Push trigger event.

## Related articles
[Triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  