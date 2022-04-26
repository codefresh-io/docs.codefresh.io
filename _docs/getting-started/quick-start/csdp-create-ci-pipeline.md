---
title: "Codefresh: Create a basic CI delivery pipeline"
description: ""
group: getting-started
sub-group: ci-pipeline
toc: true
---

Create the CI delivery pipeline in Codefresh with the Delivery Pipeline wizard. Make sure you have your personal Git token and the secret for the Docker Registry before you start.  

### Before you begin
1. [Create a personal Git token]({{site.baseurl}}/docs/getting-started/quick-start/create-ci-pipeline#/#create-a-personal-access-token-pat)
1. [Create the Docker Registry secret]({{site.baseurl}}/docs/getting-started/quick-start/create-ci-pipeline/#create-docker-regsitry-secret)

### Create the CI delivery pipeline

1. In the Codefresh UI, go to [Delivery Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}).
1. Select **+ Add Delivery Pipeline**.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-new-pipeline.png" 
   url="/images/getting-started/quick-start/quick-start-new-pipeline.png" 
   alt="Add Delivery Pipeline panel in Codefresh" 
   caption="Add Delivery Pipeline panel in Codefresh"
   max-width="30%" 
   %}
{:start="3"}
1. Enter a name for the delivery pipeline.  
  The name is created from the names of the sensor and the trigger event for the delivery pipeline.   
  * **Sensor Name**: The name of the sensor resource, for example, `sensor-cf-ci`.
  * **Trigger Name**: The event configured in the sensor to trigger the Workflow Template, for example, `push-cf-ci`.
1. From the list of **Git Sources**, select the Git Source to which to commit the resources for this delivery pipeline.  
  > Do not select the marketplace Git Source as you cannot commit to it.   
    If you have multiple runtimes installed, the Git Source you select also determines the runtime that executes the pipeline.
1. Select **Next**.  
  In the **Configuration** tab, **Workflow Templates** is selected. This is our CI Starter Workflow Template, that builds a Docker image using Kaniko, reports image metadata to Codefresh, and tests the image.
1. Select **Trigger Conditions**. 
1. From the **Add** dropdown, select **Git Events**.
1. In the **Git Repository URLs** field, select one or more GitHub repositories to listen for the selected event. 
1. From the **Event** dropdown, select the event, in our case, **Commit pushed**.
  Codefresh displays all the **Arguments** used by our Starter Workflow Template.    
  For each argument, you can define a value that is instantiated from the event payload, or any custom value.  
  These arguments are populated with the required values from the event payload.  
   
    {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-ci-pipeline-arguments.png" 
   url="/images/getting-started/quick-start/quick-start-ci-pipeline-arguments.png" 
   alt="Add Delivery Pipeline panel in Codefresh" 
   caption="Add Delivery Pipeline panel in Codefresh"
   max-width="30%" 
   %}
     
  In each field, type `$` and from the list of predefined variables, select each of these in turn:  

    **REPO**: Required. The repository to clone during the build step. Select `Repository name`.  
    **IMAGE_NAME**: Required. The name for the built image. Enter the name in the format `([docker_url]/[account]/[image_name]`.  
    **TAG**: Optional. The tag for the built image. If not defined, uses the default tag `latest`. Enter `1.0`.  
    **GIT_REVISION**: Optional. The Git revision to report to Codefresh. Select `Git revision`.  
    **GIT_BRANCH**: Optional. The Git branch to report to Codefresh. Select `Git branch`.  
    **GIT_COMMIT_URL**: Optional. The Git commit URL to report to Codefresh. Select `Commit url`.  
    **GIT_COMMIT_MESSAGE**: Optional. The Git commit message to report to Codefresh. Select `Commit message`.   
  
  You are now ready to commit the delivery pipeline to the Git Source.  

{:start="10"}
1. Select **Apply**, and then **Commit** on the top-right.
  The Commit Changes panel shows the files to be committed.
1. Enter the commit message and then select **Commit**.
1. In the **Delivery Pipelines** page to which you are redirected, verify that your pipeline is displayed. 

  Behind the scenes, we have committed the pipeline to your Git repository, and are syncing the resources to your cluster.  
  It may take a few seconds for the Git-to-cluster sync to complete, and then your pipeline should be displayed.

### Trigger the pipeline with a Git commit event
Make a change to a file in the Git repository to trigger the pipeline.

1. Go to the Git repository selected for the trigger condition.
1. Make a change to any file to get a commit event.
1. In the Codefresh UI, go back to [Delivery Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}) to see the new workflow for the pipeline.  

Continue to tweak the pipeline and enhance its capabilities. 

