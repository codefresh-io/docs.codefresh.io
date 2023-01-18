---
title: "Helm Trigger"
description: ""
group: configure-ci-cd-pipeline
sub_group: triggers
redirect_from:
  - /docs/configure-ci-cd-pipeline/triggers/helm-triggers/
toc: true
---

Codefresh has the option to create pipelines that respond to Helm events. For instance, one pipeline can be set-up to create a Docker image and chart. Once those are created, another pipeline is triggered to implement the actual deployment.  

Define and manage Helm pipeline triggers with the Codefresh UI.

## Create a new Helm Trigger

To add a new Helm trigger, navigate to Codefresh Pipeline *Configuration* view and expand *Triggers* section. Press the `Add Trigger` button and select the `Helm` trigger type to add.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-trigger-dialog.png"
url="/images/pipeline/triggers/add-trigger-dialog.png"
alt="Adding new Trigger dialog"
max-width="60%"
%}

Fill the following information:
* *Helm Provider* - select `JFrog Artifactory`.
* *Repository* - put JFrog name of the Artifactory repository.
* *Chart Name* - put name of the chart in the Artifactory repository.
* *Action* - select `Push Chart` action.

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/jfrog/configure-artifactory.png"
url="/images/pipeline/triggers/jfrog/configure-artifactory.png"
alt="Helm Artifactory settings"
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

Now we must set JFrog Artifactory to call this URL when an event takes place. This can either be done through the [JFrog Artifactory webhook plugin]({{site.baseurl}}/docs/pipelines/triggers/jfrog-triggers/) or through [setting up Webhooks](https://www.jfrog.com/confluence/display/JFROG/Webhooks) in the UI.

## Trigger Codefresh pipeline with an Artifactory push

Now, every time you push a Helm chart to the selected Artifactory repository, manually, with Codefresh or any other CI/CD tool, Codefresh will trigger execution of all pipelines associated with that Artifactory Push trigger event.


## Related articles
[Helm Releases management](https://codefresh.io/docs/docs/new-helm/helm-releases-management/)  
[Custom Helm uploads](https://codefresh.io/docs/docs/new-helm/custom-helm-uploads/)  
[Triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
