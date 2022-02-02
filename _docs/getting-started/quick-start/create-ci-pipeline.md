---
title: "Create a basic CI delivery pipeline"
description: ""
group: getting-started
sub-group: quick-start
toc: true
---

Now that you have configured and run the Hello World demo pipeline, let's create a more advanced pipeline.  

For the quick start, you'll create a basic CI delivery pipeline in CSDP.  

The delivery pipeline:  
* Clones a Git repository
* Builds a docker image using `kaniko`
* Pushes the built image to a Docker Registry
* Runs an example testing step
* Sends the image information to CSDP

Our CI pipeline interacts with third-party services such as GitHub and a Docker Registry. You need to first add secrets to the cluster to store the credentials required. 


### Create a Personal Access Token (PAT)
You must have a PAT to clone the repository. 


1. Create your PAT (Personal Access Token) with a valid `expiration` date and `scope`.  
  Scopes: `repo` and `admin-repo.hook`  
  
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
1. Define your PAT and namespace by replacing the values in these commands:
  ```
   export GIT_TOKEN=[PAT token]
   export NAMESPACE=[CSDP runtime namespace]
  ```
1. Create a generic Kubernetes secret with your PAT token:
  ```
  kubectl create secret generic github-token \
  --from-literal=token=$GIT_TOKEN --dry-run=client \
  --save-config -o yaml | kubectl apply -f - -n $NAMESPACE
  ```

### Create Docker-registry secret
To push the image to a Docker registry, we'll need the credentials on our cluster.

> The Docker registry secret is different from the general registry secret.

1. Export the values for the Docker registry's `server`, `username`, `password`, `email`, and `namespace`:  

  ```
  export DOCKER_REGISTRY_SERVER=[Server]
  export DOCKER_USER=[Username]
  export DOCKER_PASSWORD=[Password]
  export DOCKER_EMAIL=[Email]
  export NAMESPACE=[CSDP runtime namespace]
  ```

{:start="2"}
1. Create the secret:   
  ``` 
  kubectl create secret docker-registry <my-secret> \
  --docker-server=$DOCKER_REGISTRY_SERVER \
  --docker-username=$DOCKER_USER \
  --docker-password=$DOCKER_PASSWORD \
  --docker-email=$DOCKER_EMAIL -n $NAMESPACE
  ```

 > In the Workflow Template, the Docker registry name defaults to `docker-config`.


### Create general registry secret
Create a general registry secret to send the image information to CSDP.

1. Export the values for your registry's `username`, `password`, `domain`, and `namespace`:  
  ```
  export USER=[Username]
  export PASSWORD=[Password]
  export DOMAIN=[Domain]
  export NAMESPACE=[CSDP runtime namespace]
  ```
  
{:start="2"}
1. Create the secret:
  ```
  kubectl create secret generic registry-creds \
  --from-literal=username=$USER \
  --from-literal=password=$PASSWORD \
  --from-literal=domain=$DOMAIN \
  --dry-run=client --save-config -o yaml | kubectl apply -f - -n $NAMESPACE
  ```

### Create the CI delivery pipeline
Now that you have defined the secrets, create the CI delivery pipeline in CSDP.

1. In the CSDP UI, go to [Delivery Pipelines](https://g.codefresh.io/2.0/pipelines){:target="\_blank"}.
1. Select **+ Add Delivery Pipeline**.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-new-pipeline.png" 
   url="/images/getting-started/quick-start/quick-start-new-pipeline.png" 
   alt="Add Delivery Pipeline panel in CSDP" 
   caption="Add Delivery Pipeline panel in CSDP"
   max-width="30%" 
   %}
{:start="3"}
1. Enter a name for the delivery pipeline.  
  The name is created from the names of the sensor and the trigger event for the delivery pipeline.   
  * **Sensor Name**: The name of the sensor resource, for example, `sensor-csdp-ci`.
  * **Trigger Name**: The event configured in the sensor to trigger the Workflow Template, for example, `push-csdp-ci`.
1. From the list of **Git Sources**, select the Git Source to which to commit the resources for this delivery pipeline.  
  > Do not select the marketplace Git Source as you cannot commit to it.   
    If you have multiple runtimes installed, the Git Source you select also determines the runtime that executes the pipeline.
1. Select **Next**.  
  In the **Configuration** tab, **Workflow Templates** is selected. This is our CI Starter Workflow Template, that builds a Docker image using Kaniko, reports image metadata to CSDP, and tests the image.
1. Select **Trigger Conditions**. 
1. From the **Add** dropdown, select **Git Events**.
1. In the **Git Repository URLs** field, select one or more GitHub repositories to listen to for the selected event. 
1. From the **Event** dropdown, select the event, in our case, **Commit pushed**.
  CSDP displays all the **Arguments** available for the selected event.    
  You can map each argument to a single or combination of predefined variables, which CSDP automatically maps to the correct path when you commit the changes. Argo Workflow then instantiates the values from the event payload.  
   
    {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-ci-pipeline-arguments.png" 
   url="/images/getting-started/quick-start/quick-start-ci-pipeline-arguments.png" 
   alt="Predefined variables for arguments" 
   caption="Predefined variables for arguments"
   max-width="30%" 
   %}
     
  In each field, type `$` and from the list of predefined variables, select each of these in turn:  

  * **REPO**: Required. The repository to clone during the build step. Select `Repository name`.  
  * **IMAGE_NAME**: Required. The name for the built image. Enter the name in the format `([docker_url]/[account]/[image_name]`.  
  * **TAG**: Optional. The tag for the built image. If not defined, uses the default tag `latest`. Enter `1.0`.  
  * **GIT_REVISION**: Optional. The Git revision to report to CSDP. Select `Git revision`.  
  * **GIT_BRANCH**: Optional. The Git branch to report to CSDP. Select `Git branch`.  
  * **GIT_COMMIT_URL**: Optional. The Git commit URL to report to CSDP. Select `Commit url`.  
  * **GIT_COMMIT_MESSAGE**: Optional. The Git commit message to report to Codefresh. Select `Commit message`.   
  
  You are now ready to commit the delivery pipeline to the Git Source.  

{:start="10"}
1. Select **Apply**, and then **Commit** on the top-right.
  The Commit Changes panel shows the files to be committed.
1. Enter the commit message and then select **Commit**.
1. In the **Delivery Pipelines** page to which you are redirected, verify that your pipeline is displayed. 

  Behind the scenes, we committed the pipeline to your Git repository, and synced the resources to your cluster.  
  It may take a few seconds for the Git-to-cluster sync to complete, and then your pipeline should be displayed.

### Trigger the pipeline with a Git commit event
Make a change to a file in the Git repository to trigger the pipeline.

1. Go to the Git repository selected for the trigger condition.
1. Make a change to any file to get a commit event.
1. In the CSDP UI, go back to [Delivery Pipelines](https://g.codefresh.io/2.0/pipelines){:target="\_blank"} to see the new workflow for the pipeline.  

Continue to tweak the pipeline and enhance its capabilities. 


