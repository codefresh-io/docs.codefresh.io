---
title: "Create a basic CI pipeline"
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

1. Create your personal token with a valid `expiration` date and `scope` with `base64` encoding.

  For CSDP pipelines, you need `repo` and `admin-repo.hook` scopes:  
  
  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   url="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   alt="GitHub PAT permissions for CI pipeline" 
   caption="GitHub PAT permissions for CI pipeline"
   max-width="30%" 
   %}  

{:start="2"}
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

### Set up `dockerconfig.json`
Required for: Git and CSDP UI  

Create a secret to use with Docker registry in `dockerconfig.json`.  

1. Do one of the following:
  * Follow the instructions in this [link](​​https://jamesdefabia.github.io/docs/user-guide/kubectl/kubectl_create_secret_docker-registry/).
  * Run this command:  

    `kubectl create secret docker-registry <docker-registry-name> --docker-username=<docker-registry-username> --docker-password=<docker-registry-password> --docker-email=<docker-registry-email> [--docker-server=string] [--from-literal=key1=value1] [--dry-run]`    

    where:  

      * `<docker-registry-name>` is the Docker Registry for which to create the secret.
      * `<docker-registry-username>` and `<docker-registry-password>` are your username and password authentication credentials.
      * `<docker-registry-email>` is the email of the Docker registry.

### Git: Create CI pipeline 
Create a CI pipeline via Git. Make sure you have your personal Git token and the secret for the Docker Registry before you start.  

#### Before you begin
1. Create a personal Git token
1. Create the Docker Registry secret
1. Fork the repo, `<repo_name>` to work with the quick start microservice application

#### Download and commit CI pipeline resource files 
The basic CI pipeline comprises resource files that you must download and then commit to the Git repository. For the purposes of the quick start, you will commit them to the Git repo you selected or created during runtime installation.

1. Download the following resource files:
  * Github-ci EventSource (`event-source.git-ci-source.yaml`). Download 
  * Express-ci Sensor (`sensor.express-ci.yaml`). Download 
  * ci-simple WorkflowTemplate (`workflow-template.ci-simple.yaml`). Download 
1. Save and commit to the `resource_<runtime-name>` folder in the `<runtime-name>_git.source` repo that was created during runtime installation.   
  CSDP syncs these resource definitions to your cluster, and create the resources in the cluster.  
1. In the CSDP UI, view the newly created pipeline in [Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}).

#### Configure pipeline with demo microservice application


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
    <br>

  * In line **32**, paste the public URL with access to your cluster to enable the Webhook. Remember not to add the trailing `/`.   

    ```yaml
       ...
       webhook:
       url: <your-public-url>
       ...
  
    ```    

{:start="2"}
1. Commit the file. 
1. Confirm the file has been updated:
  * In the CSDP UI, go to [Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}). 
  * Select the **Manifests** tab, and then select the `eventsource` resource. It may take a few seconds to update. 
  * Verify that you see your changes.
1. From the toolbar, open the **Notifications** panel to see syncs for event start and completion.


#### Trigger an event for the CI pipeline
To complete the CI pipeline, trigger an event that runs the pipeline.    

1. Update the `readme.md` file in the root of the Git repo and commit the changes. 
1. Now navigate to the simple-ci pipeline and see that new workflow has been created.
1. Click on the workflow to view its execution details.  
  This pipeline:
  * Clones the `express-microserivce` repo
  * Builds the image
  * Pushes the image to your Docker Hub
  * Updates CSDP with the image information
1. In the CSDP UI, go to [Images]((https://g.codefresh.io/2.0/images){:target="\_blank"}).


### CSDP: Create a CI pipeline with Create Pipeline wizard
Use our pipeline creation wizard to create the CI pipeline. Make sure you have your personal Git token and the secret for the Docker Registry before you start. 

#### Before you begin
1. Create a personal Git token
1. Create the Docker Registry secret

#### Create the pipeline
1. In the CSDP UI, go to [Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"}).
1. Select **+ Add Pipeline**.

   {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-new-pipeline.png" 
   url="/images/getting-started/quick-start/quick-start-new-pipeline.png" 
   alt="Add Pipeline panel in CSDP" 
   caption="Add Pipeline panel in CSDP"
   max-width="30%" 
   %}  

{:start="3"}
1. Enter a name for the pipeline.  
  The name is created from the names of the sensor and the trigger event for the pipeline.   
  * **Sensor Name**: The name of the sensor resource, for example, `sensor-csdp-ci`.
  * **Trigger Name**: The event configured in the sensor to trigger the Workflow Template, for example, `trigger-csdp-ci`.
1. Select **Codefresh Starter Workflow Template**.
1. From the list of Git Sources, select the Git Source to which to commit the resources for this pipeline.  
  For the quick start, you can select TBD
1. Your workflow template is now set. Select **Next** to define the trigger conditions.
1. In the **Configuration** tab, select **Trigger Conditions**. 
1. From the **Add** dropdown, select **Git Events**.
1. In the **Arguments** field, enter the arguments required by the Workflow Template:  
  These arguments are populated with the required values from the event payload. 
  Type `$` and from the list of predefined variables, select each of these in turn:
  * `GIT_REPO_NAME`  
  * `IMAGE_NAME`
  * `TAG` 
  * `GIT_REVISION` 
  * `GIT_BRANCH` 
  * `GIT_COMMIT_URL`
  * `GIT_COMMIT_MESSAGE`  

  Your Git pipeline is now set up to run with parameters from the commit event.
1. Add a filter on the payload to trigger this pipeline _only_ when there is a commit to the `main` branch:
  * In the Event filter select `BRANCH`, and click **Add**.
  * Make sure you select the `=` operator and in the value field enter `master`.
1. Select **Apply** and then **Commit** to preview the resources you are committing.
1. Enter the commit message and then select **Commit**.
1. In the **Pipelines** page to which you are redirected, verify that your pipeline is displayed.  
  It may take a few seconds while the pipeline is synced from Git to the cluster.

#### Trigger the pipeline with a Git commit event
Make a change to a file in the Git repository to trigger the pipeline.

1. Go to the Git repository you defined or selected for the trigger condition.
1. Make a change to any file to get a commit event.
1. In the CSDP UI, go back to [Pipelines]((https://g.codefresh.io/2.0/pipelines){:target="\_blank"})) to see the new workflow for the pipeline.
1. Select the workflow to see detailed TBD


Continue to tweak the pipeline and add more capabilities. 






  
