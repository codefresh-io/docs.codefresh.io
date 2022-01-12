---
title: "WIP: 4. Create a basic CI pipeline"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---

Now that you have configured and run the Hello World demo pipeline, let's create a more advanced pipeline.  

You will create a basic CI pipeline, via Git, and from the CSDP UI, that:  

* Clones a Git repository
* Builds a docker image using `kaniko`
* Pushes the built image to Docker Hub
* Sends the image information to CSDP
* Runs an example testing step

Some tasks are common to both methods of creating pipelines.

### Create a Personal Access Token (PAT)
Required for: Git and CSDP UI.

Create your personal token with a valid expiration date and scope.  

 For CSDP pipelines, you need `repo` and `admin-repo.hook`:  
  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   url="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   alt="GitHub PAT permissions for CI pipeline" 
   caption="GitHub PAT permissions for CI pipeline"
   max-width="30%" 
   %}  



1. Create a PAT.
1. Create a new file `github_access.yaml`.
1. Paste the content into the file:
  ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      name: github-access
    type: Opaque
    data:
      token: <paste-your-pat-token-here> 
  ```
1. Replace the placeholder for the `token` field value with your PAT token.
1. Save and apply the file to your cluster:  

   `kubectl apply -n <csdp-runtime-namespace> -f github_access.yaml`  
    where:  
      `<csdp-runtime-namespace>` is the namespace created during runtime installation.
1. Open `workflow-template.ci-simple.yaml`, and update the `value` for `GIT_TOKEN_SECRET`: 
  ```yaml
    ...
    name: GIT_TOKEN_SECRET
    value: <paste-your-pat-token-here> 
    ...
  ```
### Git: Create CI pipeline 

#### Download and commit CI pipeline resource files 
The basic CI pipeline comprises resource files that you must download and then commit to the Git repository. For the purposes of the quick start, you will commit them to the Git repo you selected or created during runtime installation.

1. Download the following resource files:
  * Github-ci EventSource (`event-source.git-ci-source.yaml`). Download 
  * Express-ci Sensor (`sensor.express-ci.yaml`). Download 
  * ci-simple WorkflowTemplate (`workflow-template.ci-simple.yaml`) Download 
1. Save and commit to the `resource_<runtime-name>` folder in the `<runtime-name>-gitsource` repo that was created during runtime installation.   
  CSDP syncs these resource definitions to your cluster, and create the resources in the cluster.  
1. In the CSDP UI, view the newly created pipeline in [Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}).



  
#### Set up `dockerconfig.json`
TBD

#### Configure pipeline with demo micro service application

1. Fork the repository: ??
2. Update the event source to listen to events from the forked repository.
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
  * In line **32**, paste the public URL with access to your cluster to enable the Webhook.  

      > Remember not to add the trailing `/`.   

      ```yaml
       ...
       webhook:
       url: <your-public-url>
       ...
    ```
1. Commit the file. 
1. Confirm the file has been updated:
  * In the CSDP UI, go to [Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}). 
  * Select the **Manifests** tab, and then select the `eventsource` resource. It may take a few seconds to update. 
  * Verify that you see your changes.
1. On the toolbar, select open the  Notifications on sync event start and completion.


#### Trigger an event for the CI pipeline
To complete the CI pipeline, trigger an event that runs the pipeline.  

1. Update the `readme.md` file in the root of the Git repo and commit the changes. 
1. Now navigate to the simple-ci pipeline and see that new workflow has been created.
1. Click on the workflow to view it’s execution details.  
  This pipeline:
  * Clones the `express-microserivce` repo
  * Builds the image
  * Pushes the image to your Docker Hub
  * Updates CSDP with the image information
1. In the CSDP UI, go to Images to view the image.



