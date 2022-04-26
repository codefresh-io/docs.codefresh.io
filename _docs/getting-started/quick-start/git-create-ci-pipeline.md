---
title: "Git: Create a basic CI delivery pipeline"
description: ""
group: getting-started
sub-group: ci-pipeline
toc: true
---

Create a CI delivery pipeline via Git. Make sure you have your personal Git token and the secret for the Docker Registry before you start.  

### Before you begin
1. [Create a personal Git token]({{site.baseurl}}/docs/getting-started/quick-start/create-ci-pipeline#/#create-a-personal-access-token-pat)
1. [Create the Docker Registry secret]({{site.baseurl}}/docs/getting-started/quick-start/create-ci-pipeline/#create-docker-regsitry-secret)

### Download and commit CI delivery pipeline resource files 
The basic CI delivery pipeline comprises resource files that you must download and then commit to the Git repository. For the purposes of the quick start, you will commit them to the Git repo you selected or created during runtime installation.

1. Download the following resource files:
  * Github-ci EventSource (`event-source.git-ci-source.yaml`). Download 
  * Express-ci Sensor (`sensor.express-ci.yaml`). Download 
  * ci-simple WorkflowTemplate (`workflow-template.ci-simple.yaml`). Download 
1. Save and commit to the `resource_<runtime-name>` folder in the `<runtime-name>_git.source` repo reated during runtime installation.   
  Codefresh syncs these resource definitions to your cluster, and create the resources in the cluster.  
1. In the Codefresh UI, view the newly created pipeline in [Delivery Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}).

### Configure delivery pipeline with demo microservice application
1. Update the event source to listen to events from the forked repository.
  * Open `eventSource.git-ci-source.yaml`. 
  * In line **22**, update `names` and `owner` for `repositories`:   
    For `names`, verify that `express-microservice`, the name of the forked demo service is displayed.  
    For `owner`, add your GitHub username.  

    ```yaml
     ...
     repositories:
        - names:
          - express-microservice
        owner: <github-user-name>
     ...
    ```  
 
{:start="2"}
1. Commit the file. 
1. Confirm the file has been updated:
  * In the Codefresh UI, go to [Delivery Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}). 
  * Select the **Manifests** tab, and then select the `eventsource` resource. It may take a few seconds to update. 
  * Verify that you see your changes.
1. From the toolbar, open the **Notifications** panel to see syncs for event start and completion.


### Trigger an event for the CI delivery pipeline
To complete the CI delivery pipeline, trigger an event that runs the pipeline.    

1. Update the `readme.md` file in the root of the Git repo and commit the changes. 
1. Now navigate to the simple-ci pipeline and see that new workflow has been created.
1. Click on the workflow to view its execution details.  
  This pipeline:
  * Clones the `express-microserivce` repo
  * Builds the image
  * Pushes the image to your Docker Hub
  * Updates Codefresh with the image information
1. In the Codefresh UI, go to [Images]((https://g.codefresh.io/2.0/images){:target="\_blank"}).