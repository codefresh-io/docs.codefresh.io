---
title: "Pipeline creation"
description: ""
group: pipelines
toc: true
---

Delivery Pipelines are where all the magic happens in CSDP. Delivery Pipelines connect Argo Workflows and Argo Events with CSDP's unique functionality to implement and optimize CI/CD flows, such as checking out code, building and testing artifacts, running unit and acceptance tests, or any customized flows you need in your enterprise. 

CSDP integrates with Argo Workflows and Argo Events, while greatly simplifying the process of creating pipelines and triggering them to submit workflows. 


### Delivery Pipeline concepts
Let's start by reviewing the main concepts around CSDP Delivery Pipelines.  
In CSDP, the Delivery Pipeline is a logical entity that connects an event-source, a sensor, and a workflow template. A CSDP Delivery Pipeline is not identical to an Argo CD pipeline. 

#### Pipeline per trigger
Every sensor-trigger pair is a unique pipeline in CSDP. The same sensor with multiple triggers creates a different pipeline for every trigger.

#### Git-Ops permission model
Access to Git Sources and Git repositories are based on the user's write permissions, as defined in their Git provider accounts.

#### Git Source for pipeline
The Delivery Pipeline is connected to a specific CSDP runtime installation, and is also run on this runtime, through a Git Source.  

When the pipeline is created and synced with the cluster, all manifests generated for the pipeline are stored in the Git repository. These include the sensor and event-source manifests, and the Workflow Template manifest, if selected from Argo Hub.

#### Centralized location for Argo Event-entities
CSDP uses Argo Events to listen to events from different sources and define the conditions that trigger the events. All entities for creating and managing an Argo Event - from the event-source and its events, the sensor and its triggers - are available in a centralized location in CSDP.  

An intuitive selection mechanism enables you to easily select and configure each entity. Predefined variables and automated mapping to event payload makes parameterization easy. There is no need to manually create the YAML manifests for the different entities, as CSDP automatically generates them after the entities are set up.   


### Delivery Pipeline creation flow
Here's a high-level overview of the Delivery Pipeline creation flow.  
For step-by-step instructions, see [How to: Create a Delivery Pipeline]({{site.baseurl}}/docs/pipelines/create-pipeline/#create-a-delivery-pipeline).

1. Define pipeline name and select Workflow Template to execute
1. Define default values for Workflow Template arguments
1. Configure trigger conditions for events
1. Generate manifests
1. Commit resource files and create pipeline

#### Define pipeline name and select Workflow Template to execute
The Delivery Pipeline creation flow starts with defining a name for the pipeline, selecting the Git Source with the runtime, and selecting the Workflow Template to execute when the pipeline is run.  
You can use the CSDP starter Workflow Template, or select an existing Workflow Template you have downloaded to a Git Source.

Both Argo and Codefresh have examples and libraries of Workflow Templates you can use:
* For conceptual information on Argo Workflows, read the [official documentation](https://argoproj.github.io/argo-workflows/){:target="\_blank"}.
* For examples of Workflow Templates in Argo, see their [documentation by example](https://github.com/argoproj/argo-workflows/blob/master/examples/README.md){:target="\_blank"} page.
* For a fully-certified library of ready-to-use Workflow Templates by Codefresh, see [Codefresh Hub for Argo](https://codefresh.io/argohub/){:target="\_blank"}.

In the Delivery Pipeline wizard, we have our starter Workflow Template to use as a base, or select an existing one, or copy and paste any Workflow Template and then modify as needed. 

> To share artifacts between steps in workflows, and to view archived logs for completed workflows, you must [configure an artifact repository in CSDP]({{site.baseurl}}/docs/pipelines/configure-artifact-repository).
 


#### Define default values for Workflow Template arguments
Workflow Template arguments are the list of arguments described in the Workflow Template, and expected to be passed to the workflow when submitted. They are displayed in the **Arguments** tab. You can define the default values for any argument here.

{% include 
   image.html 
   lightbox="true" 
   file="/images/pipeline/create/pipeline-wizard-arguments-tab.png" 
   url="/images/pipeline/create/pipeline-wizard-arguments-tab.png" 
   alt="Arguments tab in Delivery Pipeline wizard" 
   caption="Arguments tab in Delivery Pipeline wizard"
   max-width="30%" 
   %} 

#### Configure Trigger Conditions for events
The **Trigger Conditions** tab in the Delivery Pipeline wizard collates the requirements to set up and configure entities for Argo Events. Here you select the event-source, the event of interest, the Git repositories to listen to for the event, and the sensor trigger for the event.  

> To create a Delivery Pipeline, you must have _at least one_ trigger condition.


{% include 
   image.html 
   lightbox="true" 
   file="/images/pipeline/create/pipeline-wizard-trigger-tab.png" 
   url="/images/pipeline/create/pipeline-wizard-trigger-tab.png" 
   alt="Trigger Conditions tab in Delivery Pipeline wizard" 
   caption="Trigger Conditions tab in Delivery Pipeline wizard"
   max-width="30%" 
   %} 

For conceptual information on Argo Events, read the [official documentation](https://argoproj.github.io/argo-events/){:target="\_blank"}.  

The Delivery Pipeline wizard guides you through selecting the event-source, the event to listen to, and the conditions to trigger the event. 
Let's review the main entities in Trigger Conditions. 

**Git repositories**  
For every sensor trigger condition, you can select single or multiple Git repositories to which to listen to for the event. 
> Only those Git repos to which you have write-permissions are displayed. 

**Event-sources and Events**  
Currently, we support GitHub as an event-source, and an extensive list of GitHub events you can select from.  

**Sensor trigger arguments**  
The sensor trigger arguments are identical to the Workflow Template arguments. If Workflow Template arguments have default values, these values are displayed for the corresponding Sensor arguments as well. (ask)
> If values are defined for an argument both in the Workflow Template and in Trigger Conditions, the value defined in Trigger Conditions takes precedence. 

You can override the default values or define custom values for trigger condition arguments through _parameterization_ and _Sprig template functions for Go_.  

Argo Events uses parameterization to pass data from the event payload to the workflow submitted by the sensor trigger. But where in Argo Workflows you would need to manually define the JSON path to the data in the event payload, our Delivery Pipeline wizard automates path definitions through predefined variables.

Every event has a specific payload and a specific list of predefined variables you can select from. You can either parameterize an argument through one or more predefined variables, or use Sprig template functions to define the values. In either case, when the manifests are generated, CSDP replaces the variables or templated values with the actual JSON path in the event payload.  


**Filters**  
Filters create conditions for event triggers by enforcing validity constraints on when to trigger the event. For example, add a filter to a Git push event that triggers that event only on push to a particular _branch_.  

**Examples of common events and use of filters**  

Here are some examples of common Git events that are triggers to run pipelines, and when you would use filters to further control when these Git events run the pipeline.

* Git commits which are push events 
* Git pull requests (PRs), which are opened PRs

The table below summarizes the use cases, events, and filters that control the events.

{: .table .table-bordered .table-hover}
|#|Trigger requirement                                               | Event   |  Filter          |  
|--| --------------                                                | ---------------- | -----------|
|1| On Git commit                                                |`Commit pushed`      | Implicitly on `Commit pushed` |
|2| On Git commit, _only_ when the commit is on a specific branch. This requires a filter to define the target branch.             | `Commit pushed`      | Implicitly on `Commit pushed`, and explicitly when `Git branch`  = `<branch-name>`, for example, `main` |          
|3| On an opened PR                                                                   | `PR opened`          | Implicitly on `PR opened` |                             
|4|On an opened PR, _only_ for a specific branch                                        | `PR opened`          | Implicitly on `PR opened`, and explicitly when `PR target branch`  = `<branch-name>`, for example, `production` | 
|5|On an opened PR, _only_ for a specific branch, and _only_ when the PR name includes the entered value|  `PR opened`      | Implicitly on `PR opened`, and explicitly when `PR target branch` = `<branch-name>`, for example, `production` and when `PR labels` = `<PR-name>`, for example, `cf-hotifx-xxxx`| 

Now let's review the use cases in more detail.  

#1 The `Commit pushed` event on any of the Git repos defined runs the pipeline.  

#2 The `Commit pushed` event on any of the Git repos runs the pipeline, _but only_ if the branch is `production`, and not if the branch is `staging` for example.  

#3 The `PR opened` event runs the pipeline when any PR is opened on any Git repo defined.  

#4 The `PR opened` event with the `PR Target Branch` filter runs the pipeline _only_ when the PR target branch matches the value entered. You want to run the pipeline when the PR is opened on either `master` or `production`, but not when opened on `staging` or `qa`.

#5 The `PR opened` event with the `PR Target Branch` and `PR label` filters is a more complex scenario that runs the pipeline when a PR is opened on the target branch, but only when the PR name starts with or includes the provided value. Useful when collaborating on features or when deploying a critical fix. Both the `PR Target Branch` and `PR label` must match for the pipeline to run. The filters automatically excludes all PRs opened on the `production` branch but not matching the `PR label`, `hotfix-runtime`.


#### Generate manifests
Manifests are automatically generated on committing changes after defining at least one Trigger Condition.   

Manifests typically include:
* Sensor
* EventSource
* WorkflowTmplate

{% include 
   image.html 
   lightbox="true" 
   file="/images/pipeline/create/pipeline-wizard-resources.png" 
   url="/images/pipeline/create/pipeline-wizard-resources.png" 
   alt="Argo resources in Delivery Pipeline wizard" 
   caption="Argo resources in Delivery Pipeline wizard"
   max-width="30%" 
   %}
#### Commit resource files and create pipeline
Once CSDP generates the manifests, and you validate them, you commit all the changes. The commits are synced to the Git source defined for the pipeline, and then synced to the cluster.


### How to: Create a Delivery Pipeline
Follow the step-by-step instructions to guide you through Delivery Pipeline wizard and create a CSDP pipeline.

1. In the CSDP UI, go to [Delivery Pipelines](https://g.codefresh.io/2.0/pipelines){:target="\_blank"}.
1. Select **+ Add Delivery Pipeline**.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/pipeline/create/create-add-delivery-pipeline.png" 
   url="/images/pipeline/create/create-add-delivery-pipeline.png" 
   alt="Add Delivery Pipeline panel in CSDP" 
   caption="Add Delivery Pipeline panel in CSDP"
   max-width="30%" 
   %}

{:start="3"}
1. Enter a name for the Delivery Pipeline.  
  The name is created from the names of the sensor and the trigger (alphanumeric lowercase, and the - character).   
  * **Sensor Name**: The name of the sensor resource. For example, the application name, `csdp` or `codefresh`.
  * **Trigger Name**: The template that defines the context of the trigger and the actual resources the sensor must execute. For example, the flow that will be run,`ci`.
1. Select the **Codefresh Starter Template** or **Browse Existing Template**.  
1. From the list of **Git Sources**, select the Git Source to which to commit the resources for this pipeline.  
  > Only those Git Sources to which you have write permissions are displayed.   
    If you have multiple runtimes installed, the Git Source you select also determines the runtime on which the pipeline is executed.
1. Select **Next**.
1. If needed, select the Git Source, and then the Workflow Template to work with.  
  In the **Configuration** tab, **Workflow Templates** is selected. Our CI Starter Workflow Template is shown.   
  Copy and paste any Workflow Template you want to work with, or edit the starter template as needed.  
  > Tip:  
  >  CSDP notifies you that you have uncommitted changes. The Commit button remains disabled until you define at least one Trigger Condition.
  
  {% include 
   image.html 
   lightbox="true" 
   file="/images/pipeline/create/pipeline-wizard-workflow-tab.png" 
   url="/images/pipeline/create/pipeline-wizard-workflow-tab.png" 
   alt="Workflow Template tab in Delivery Pipeline wizard" 
   caption="Workflow Template tab in Delivery Pipeline wizard"
   max-width="30%" 
   %}

{:start="8"}
1. Select **Arguments**.  
  The Arguments defined in the Workflow Template and passed to the workflow when the pipeline is run, are displayed. 
1. Enter default values for the arguments as needed.
1. Select **Trigger Conditions**. 
  * From the **Add** dropdown, select **Git Events**.
  * In the **Git Repository URLs** field, select one or more repositories from the list to listen to for the selected event. 
     
     {% include 
      image.html 
      lightbox="true" 
      file="/images/pipeline/create/pipeline-wizard-trigger-git-repos.png" 
      url="/images/pipeline/create/pipeline-wizard-trigger-git-repos.png" 
     alt="Select Git repos to listen to for events" 
     caption="Select Git repos to listen to for events"
     max-width="30%" 
     %}

  * From the **Event** dropdown, select the event for the sensor trigger. For example, **Commit pushed**.  
    CSDP displays all the **Arguments** available for the sensor trigger, identical to the list of Workflow Template arguments. 
  * Customize the value for an argument by selecting single or a combination of predefined variables.  
    In each field, type `$` and from the list of predefined variables, select the one you need.  
    CSDP automatically maps to the correct JSON path in the event payload when manifests are generated before commit. Argo Workflow then instantiates the values from the event payload.  
    
    {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-ci-pipeline-arguments.png" 
   url="/images/getting-started/quick-start/quick-start-ci-pipeline-arguments.png" 
   alt="Predefined variables for sensor arguments" 
   caption="Predefined variables for arguments"
   max-width="30%" 
   %}
{:start="11"}
1. To create filters for the event payload:
  * From **Event Filters**, select the filter, and select **+Add**.
  * Select the operational expression and define the value of the filter.    
  
  {% include 
   image.html 
   lightbox="true" 
   file="/images/pipeline/create/pipeline-wizard-event-filters.png" 
   url="/images/pipeline/create/pipeline-wizard-event-filters.png" 
   alt="Event filters" 
   caption="Event filters"
   max-width="30%" 
   %}

{:start="12"}
1. To transform a predefined filter to a standard data filter, select **Detach & Customize**.
 

{:start="13"}
1. Select **Apply**, and then **Commit** on the top-right.
  The Commit Changes panel shows the resource files created for the pipeline. These files are committed to the repository linked to the Git Source you selected in the first step of the wizard.
    {% include 
   image.html 
   lightbox="true" 
   file="/images/pipeline/create/pipeline-wizard-resources.png" 
   url="/images/pipeline/create/pipeline-wizard-resources.png" 
   alt="Pipeline resource files generated on commit" 
   caption="Pipeline resource files generated on commit"
   max-width="30%" 
   %}
{:start="14"}
1. Enter a message (optional), and then select **Commit**.   

CSDP commits the pipeline to the Git repository, and then syncs it to the cluster. Wait a few seconds for the sync to complete, and verify that the pipeline is displayed in the [Delivery Pipelines](https://g.codefresh.io/2.0/pipelines){:target="\_blank"} page.

