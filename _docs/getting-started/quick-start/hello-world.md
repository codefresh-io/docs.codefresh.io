---
title: "Trigger the Hello World example pipeline"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---

Now that you have successfully installed the CSDP runtime, you can trigger one of the Hello World demo pipelines included in the runtime package.
The two Hello World example pipelines are triggered by different event conditions:
* Git (GitHub) event 
* Calendar (cron) event

For the quick start, let's focus on the `github/hello-world` pipeline.

### View pipelines
View the pipelines in CSDP. 
1. In the CSDP UI, go to [Pipelines](https://g.codefresh.io/2.0/pipelines){:target="\_blank"}. 

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-pipelines.png" 
   url="/images/getting-started/quick-start/quick-start-pipelines.png" 
   alt="Demo pipelines in the Pipelines page" 
   caption="Demo pipelines in the Pipelines page"
   max-width="30%" 
   %}  

   * The `githb/hello-world` pipeline has not been triggered as it requires a Git event to trigger it. 
   * The `cron/hello-world` pipeline shows statistics as it has already been triggered based on the `cron` interval.  

### View and update manifest
As we don't have a workflow for this pipeline, you will configure the Git Source resource in the pipeline's **Manifest** tab.
1. In the **Pipelines** page, to drill down, select the pipeline name.
1. Select the **Manifest** tab, and click the arrowhead to expand the resource view.
  
   {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-manifest-expand.png" 
   url="/images/getting-started/quick-start/quick-start-manifest-expand.png" 
   alt="Expand resource view in Mainfests tab" 
   caption="Expand resource view in Mainfests tab"
   max-width="30%" 
   %} 
  
  You can see these resources:    

  * Event Source (`event-source.git-source.yaml`)
  * Sensor (`sensor.git-source.yaml`)
  * Workflow Template (`workflow-template.hellow-world.yaml`)  


  > The pipeline is configured to run on a `PUSH` event in the Git repository.

{:start="3"}
1. Update the public URL for the Webhook event:
  * From the expanded resource manifest, select `event-source.git-source.yaml`.
  * Select **Edit** and scroll to **line 29** in the resource file.    
  * Replace the placeholder with a valid URL which can be accessed by the cluster, and to which to send Webhooks. 
  * Select **Commit** to commit your changes.  
  
     {% include 
    image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-source-manifest-edit.png" 
   url="/images/getting-started/quick-start/quick-start-git-source-manifest-edit.png" 
   alt="Edit `event-source.git-source.yaml` in Manifests tab" 
   caption="Edit `event-source.git-source.yaml` in Manifests tab"
   max-width="30%" 
    %} 

CSDP does the following:
* Commits the changes to your Git repository.
* Synchronizes the changes in Git back to your cluster, and updates the `event-source.git-source` resource.
* Triggers this pipeline after the `PUSH` event to your repository.
* Creates a workflow. View it in the CSDP UI, in the [Workflows](https://g.codefresh.io/2.0/workflows){:target="\_blank"} dashboard.  
  Select view workflow details to see the workflow log. 

### What to do next
[Create a basic CI pipeline]({{site.baseurl}}/docs/getting-started/quick-start/create-ci-pipeline)
