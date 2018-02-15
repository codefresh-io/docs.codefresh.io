---
layout: docs
title: "Getting Started - Create a Basic Pipeline"
description: "Configure a basic single-service container-based CI/CD pipeline."
excerpt: ""
group: getting-started
redirect_from:
  - /docs/getting-started-create-a-basic-pipeline
toc: true
---

Welcome to Codefresh, the Docker-native CI/CD platform. 

This getting started guide will show you how to configure a basic single-service container-based CI/CD pipeline. At the end of the configuration process you will see how a “commit” will automatically initiate the newly created pipeline process, including creating a Docker image, pushing it to the Docker Hub registry, and viewing the result in a production/staging environment.   
For multi-service pipelines, on-demand dev and test environments, image management and other advanced features, please refer to the Codefresh documentation.  

## What is a CI/CD pipeline?

Basically a pipeline automates steps in your software delivery process. A typical single-service pipeline includes the following basic steps:

- **Build** - initiates a build process, in which the code is turned into a compiled artifact and packaged in a Docker image. 
- **Test** - runs unit tests inside the Docker container using any testing tool that supports your framework.  
- **Push** - pushes the tested Docker Image to a Docker registry service, such as Docker Hub.  
- **Deploy** - uploads the docker images to staging/production environment, such as ECS, Kubernetes.

## What you need to get started: 

- A Github account (Codefresh also supports Bitbucket, but in the following example we will be using Github).
- On Github, fork our Demo Chat project into your Github account (See [Forking the Demo Project on Github](https://docs.codefresh.io/docs/forking-the-demo-project-on-github) for instructions) 
- A Docker Hub account.  

## Step 1. Add a Repository
A service, also known as micro-service, is a part of an application that is independently deployable (e.g. user authentication service). Each repo may include multiple services, but for the purpose of our example, the repo project that you have forked includes a single service called “demo-chat”. As part of the configuration of the pipeline you will need to configure “demo-chat” as a service.

{:.text-secondary}
### To add a repository:

{:start="1"}
1. In the **Repositories** page, click **Add Repository**.
{% include image.html lightbox="true" file="/images/d7982ed-codefresh_add_repo.png" url="/images/d7982ed-codefresh_add_repo.png" alt="Add repository" max-width="40%" %}
  
{:start="2"}
2. Select the relevant repository. In this case select the **`<your-repo-name>/demochat`**
  {% include image.html lightbox="true" file="/images/94b6a4d-codefresh_demochat_select.png" url="/images/94b6a4d-codefresh_demochat_select.png" alt="Select the relevant repository" max-width="40%" %}
  
  You can use the search box to find the repository. If you can’t find it, turn on **Add by URL**, and type the URL of the repository.
   
{:start="3"}
3. In the **Branch for first build** drop-down menu, select the relevant Branch. By default your repository has one branch named master which is considered to be the definitive branch. If you have not created a feature branch-off, you should select **Master**.

{:start="4"}
4. Click **Next** 
  The Select Build Method screen appears.
  {% include image.html lightbox="true" file="/images/1a40b27-codefresh_demochat_build_method.png" url="/images/1a40b27-codefresh_demochat_build_method.png" alt="Select build method" max-width="40%" %}

  The following options are available:
  - **Use existing Codefresh.yml** - use this option if you have previously created a Codefresh.yml file. Codefresh YAML is used to customize your build environment (pipeline) by configuring specific build specifications that will be executed as part of the build process. This is the most flexible and customizable option as it can include very basic or intricate build specifications.
  - **Use existing Dockerfile** - use this option if you have previously created a Dockerfile. A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Dockerfile is used to instruct Docker how to build images automatically. This is a relatively basic option, as it is based on a predefined codefresh flow. 
  - **Create a new Dockerfile using Codefresh templates** - use this option if you don’t have an existing Codefresh YAML or Dockerfile in your repo. Selecting this option will create a basic pre-defined Dockerfile based on Dockerfile templates that were created by Codefresh. 

    For the purpose of our example we will use the existing Dockerfile, which is located at the root of the “demo-chat” repo.
  
{:start="5"} 
5. Select the **Dockerfile** (middle) option.

{:start="6"} 
6. By default, Codefresh searches for your Dockerfile at the root level of your repository, by the name Dockerfile. The demo-chat example includes a Dockerfile in the root level.
  {% include image.html lightbox="true" file="/images/d81622a-cf_demochat_dockerfile.png" url="/images/d81622a-cf_demochat_dockerfile.png" alt="" max-width="40%" %}

{:start="7"}
7. Click **Next**.

{:start="8"}
8. Review the Dockerfile and when you're done, click **Create**.
{% include image.html lightbox="true" file="/images/30f0a3a-cf_demochat_review.png" url="/images/30f0a3a-cf_demochat_review.png" alt="" max-width="40%" %}

Congratulations, the new service is added!
{% include image.html lightbox="true" file="/images/4c1b6db-cf_demochat_done.png" url="/images/4c1b6db-cf_demochat_done.png" alt="" max-width="40%" %}


## Step 2. Preview your Basic Docker Build Pipeline
At this point you have configured a basic Docker build pipeline that can take code from the repository, run it through a build process, and create a Docker image. To check if this build process runs properly, you can preview it by running a “build” or continue with the configuration of the pipeline (test and deploy processes) in the next step/section.

{:.text-secondary}
### To test the basic build pipeline:

{:start="1"}
1. On the last screen of the service configuration process, click **Build**.
{% include image.html lightbox="true" file="/images/0fa8d30-cf_demochat_done.png" url="/images/0fa8d30-cf_demochat_done.png" alt="" max-width="40%" %}

  The **Builds** screen of the newly created service is displayed showing the build progress.
{% include image.html lightbox="true" file="/images/31e9222-cf_demochat_build.png" url="/images/31e9222-cf_demochat_build.png" alt="" max-width="40%" %}

{:start="2"}
2. Wait until the process has successfully finished:
The new Docker image is saved in Codefresh’s  internal registry.
  
{:start="3"}
3. To view the image details, click **Images** and then click on the relevant image from the list.
{% include image.html lightbox="true" file="/images/5613e4c-codefresh_images_repo.png" url="/images/5613e4c-codefresh_images_repo.png" alt="" max-width="40%" %}

The **Images** screen is displayed with details of the newly created image.
{% include image.html lightbox="true" file="/images/26353f1-codefresh_image_demochat.png" url="/images/26353f1-codefresh_image_demochat.png" alt="" max-width="40%" %}

## Step 3. Add a Unit Test to the Pipeline (Optional)
You can optionally add unit test to the pipeline. The unit test is a bash-like script that will run in the root of the repository, inside the Docker container, using any testing tool that supports your framework. You can either configure your unit test script within the pipeline configuration page itself or, if you have selected to use a YAML file during the configuration of the pipeline, inside the YML script. In this example we will show how to add it within the pipeline configuration page.

{:.text-secondary}
### To add a unit test:

{:start="1"}  
1. On the main navigation menu, click **Services**.

{:start="2"}
2. Click the **Pipelines** icon of the “demochat” service.
{% include image.html lightbox="true" file="/images/15bf4d8-Services_screen.JPG" url="/images/15bf4d8-Services_screen.JPG" alt="" max-width="40%" %}

{:start="3"} 
3. In the **Workflow** section (at the middle of the **Pipelines** screen), in the **Unit Test Script** command line box, type `npm test`.
{% include image.html lightbox="true" file="/images/9832cfd-npmtest.JPG" url="/images/9832cfd-npmtest.JPG" alt="" max-width="40%" %}

{:start="4"}
4. At the bottom of the screen, click **Save**.
The test is added to the pipeline.  

## Step 4. Setting a Webhook to the Pipeline
You can configure your pipeline to automatically trigger by setting a webhook on your git repository. Only the repository owners can set webhooks.
Webhook configuration can be refined to trigger only on specific branches. By default, Codefresh activates a webhook to a Commit submitted in the defined first service, however does not activate this webhook by default for a second service. In our example, we will make sure the webhook to all the branches of our “Demochat” repo is activated. 

You can also trigger codefresh pipelines from command line / build script (or any 3rd party system). 

{:.text-secondary}
### To add a webhook to the pipeline:

{:start="1"}
1. On the main navigation, click **Repositories**.

{:start="2"}
2. Click the gear icon of the “demochat” service.
{% include image.html lightbox="true" file="/images/a8e599a-Screen_Shot_2017-10-23_at_7.17.58_PM.png" url="/images/a8e599a-Screen_Shot_2017-10-23_at_7.17.58_PM.png" alt="" max-width="40%" %} 

{:start="3"}
3. In the **General** section, make sure the **Add webhook** toggle is at **ON** position.

{:start="4"}
4. In the **Trigger flow on** drop down, select the **All Branches and Tags** option.

{:start="5"}  
5. Pipeline default trigger is commit. You can also change/add a pull request trigger (this shall be usually used for last changes before merging to master)

{:start="6"}
6. At the bottom of the screen, click **Save** if changes were made.
{% include image.html lightbox="true" file="/images/5bb09fb-Screen_Shot_2017-10-23_at_7.13.26_PM.png" url="/images/5bb09fb-Screen_Shot_2017-10-23_at_7.13.26_PM.png" alt="" max-width="40%" %}

{:.text-secondary}
### To trigger codefresh pipeline from command line/script/3rd party

Copy CURL command (click “Copy” button) and use it in any place where you want. You can also update command text and replace branch with any other name (by default it’s a master branch).

## Step 5. Add \"Push to Docker Registry\" 
We are almost there. The last step in configuring the pipeline is to configure the mechanism that will push the tested Docker Image to a Docker registry service. In our example, we will use Docker Hub as the Docker registry (public or private). Codefresh also offer its own Docker registry service. In order to push the image to your Dockerhub registry, you must activate this option in the pipeline and add your Dockerhub registry credentials in your account management integration page. If you haven’t done so yet, follow the instructions below.

{:.text-secondary}
### To add Docker Hub credentials:

{:start="1"}
1. On the top navigation bar, click on your user account icon to open the account menu and click **Account Management**.
{% include image.html lightbox="true" file="/images/341ed85-accountmanagement.PNG" url="/images/341ed85-accountmanagement.PNG" alt="" max-width="40%" %}  

{:start="2"}
2. Click the **Integration** tab

{:start="3"}
3. Select the **Docker Registries** section
{% include image.html lightbox="true" file="/images/38e2b04-integrations-page.png" url="/images/38e2b04-integrations-page.png" alt="" max-width="40%" %}

{:start="4"}
4. Configure your registry according to the [Docker Registry Integration Guide](https://docs.codefresh.io/v1.0/docs/docker-registry)

{:.text-secondary}
### Activate Push to Docker Hub option in the **Pipelines** view:

{:start="1"}
1. On the main navigation, click **Services**.

{:start="2"}
2. Click the **Pipelines** icon of the “demochat” service.
{% include image.html lightbox="true" file="/images/3463993-Services_screen.JPG" url="/images/3463993-Services_screen.JPG" alt="" max-width="40%" %} 

{:start="3"}
3. In the Workflow section under the **Push to Registry** section, select your registry configuration
{% include image.html lightbox="true" file="/images/719c804-screenshot-g.codefresh.io-2017-11-21-14-59-59.png" url="/images/719c804-screenshot-g.codefresh.io-2017-11-21-14-59-59.png" alt="" max-width="40%" %}

{:start="4"}
4. At the bottom of the screen, click **Save**.

## Step 6. View the Entire Pipeline in Action
Congratulations! You have just finished configuring an entire pipeline, which includes Build, Test, and Push processes. This means that any “commit” or “Pull request” in the Github repo will initiate the entire pipeline, resulting the the pushing of a new image to Docker Hub. 

{:.text-secondary}
### To see the pipeline in action:

{:start="1"}
1. On Github, go to your Github repository.

{:start="2"}
2. Create a new branch by clicking the drop down at the top of the file list that says **branch: master **and then type **“feature1”** into the new branch text box.

{:start="3"} 
3. Select the blue **Create branch** box or hit “Enter” on your keyboard.
At this point the pipeline has been initiated and a new Docker image has been created. This Docker image can be used to perform Feature Preview and Integration Tests.

{:start="4"} 
4. Now let’s modify the code and submit a new Commit. In Github, go to **`<your-repo-name>/demochat/templates/login.html`**

{:start="5"}  
5. Click the **Edit this file** button and add a line in the code. You can use the following example (the new line is marked in red):
{% include image.html lightbox="true" file="/images/f18d734-Capture10.PNG" url="/images/f18d734-Capture10.PNG" alt="" max-width="40%" %} 

{:start="6"}
6. Add a description for the change and click **Commit Changes**.
{% include image.html lightbox="true" file="/images/e892f64-myfirstcommit.PNG" url="/images/e892f64-myfirstcommit.PNG" alt="" max-width="40%" %} 

The new Commit invokes the Codefresh pipeline, generating a new Docker image.
{% include image.html lightbox="true" file="/images/af69126-Capture3.PNG" url="/images/af69126-Capture3.PNG" alt="" max-width="40%" %} 

The process success is also indicated in Github:
{% include image.html lightbox="true" file="/images/25398b5-Capture4.PNG" url="/images/25398b5-Capture4.PNG" alt="" max-width="40%" %}

After some iterations you are ready to submit a **Pull Request**.

{:start="7"} 
7. In Github, open a **Pull Request**, enter your request message, and click **Create pull request**.
{% include image.html lightbox="true" file="/images/45e070b-Capture6.PNG" url="/images/45e070b-Capture6.PNG" alt="" max-width="40%" %} 

{:start="8"} 
8. The pull request is displayed in Codefresh under the **Services > <your-repo-name> > demochat **under the **Pipelines** tab:
{% include image.html lightbox="true" file="/images/9b6f1da-Capture10.PNG" url="/images/9b6f1da-Capture10.PNG" alt="" max-width="40%" %}
At this point, the Pull Request reviewers could click the **Launch** () button to preview the service/feature in a realistic web environment, however in this case, the Demochat service is part of a composition and would require defining another service (mongo DB).

{:start="9"}    
9. After additional iterations you are ready to merge the pull request. In Github, click the Merge pull request button.
{% include image.html lightbox="true" file="/images/d0eb485-Capture11.PNG" url="/images/d0eb485-Capture11.PNG" alt="" max-width="40%" %} 

{:start="10"}
10. Click **Confirm Merge**. 
  The pipeline is invoked once again and a new image, containing the merged code, is generated in Codefresh:
  {% include image.html lightbox="true" file="/images/b2ac192-Capture15.PNG" url="/images/b2ac192-Capture15.PNG" alt="" max-width="40%" %}
  In the Images screen, you can see the new image, which is labeled as Master, has passed the quality checks, and includes a new SHA:
  {% include image.html lightbox="true" file="/images/2162d7a-Capture16.PNG" url="/images/2162d7a-Capture16.PNG" alt="" max-width="40%" %}

## Congratulations!
By completing this tutorial, you’ve learned how to create a single service pipeline, which includes the following steps:
  * Build 
  * Test  
  * Push
