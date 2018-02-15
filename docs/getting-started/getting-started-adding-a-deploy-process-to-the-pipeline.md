---
layout: docs
title: "Getting Started - Adding a Deploy Process to the Pipeline"
excerpt: ""
description: ""
excerpt: ""
group: getting-started
redirect_from:
  - /docs/codefresh-getting-started-adding-a-deploy-process-to-the-pipeline
toc: true
old_url: /docs/codefresh-getting-started-adding-a-deploy-process-to-the-pipeline
was_hidden: true
---
Typically the last step of a CI/CD platform is the Deploy step. As part of this step, a Docker image is deployed to a staging or production environment, which is managed by an orchestration platform, such as Kubernetes, ECS, etc. Codefresh features its own staging environment, which enables all team members to view the container (as standalone or composition) for feature preview, manual testing, bug reproduction and more.

This getting started guide will show you how to configure the Deploy step as part of the pipeline that you have created in the[ Getting Started - Create a Basic Pipeline](https://dash.readme.io/project/codefresh-docs/v1.0/docs/getting-started-create-a-basic-pipeline), which uses the demochat repository on [Github](https://github.com/). We have ended the previous getting started guide with a pipeline that includes the build, test, and push steps for demochat. This means that on every commit, pull request, and merge a new Docker image is created automatically and pushed to Dockerhub. In this guide we will add the last step in the pipeline, which will take the new “master” image on Dockerhub (only images which are tagged as “master”,and will deploy it on the Codefresh staging environment.

## What you need to get started:
  * Complete the [Getting Started - Create a Basic Pipeline](https://dash.readme.io/project/codefresh-docs/v1.0/docs/getting-started-create-a-basic-pipeline)
  * A [Github](https://github.com/) account (Codefresh also supports Bitbucket, but in the following example we will be using Github).
  * A [Docker Hub](https://hub.docker.com/) account.
  * An [mLab](https://mlab.com/) account for to run MongoDB (the free Sandbox account is sufficient)     

## Step 1. Configure the Deploy Script
As part of this step, you will configure the Deploy Script section of the Demochat pipeline.

{:start="1"}
1. On** Codefresh**, in the main navigation, click **Services**.

{:start="2"}
2. Click the **Demochat** service.

{:start="3"}
3.  In the **Pipelines** tab, scroll down to the **Environment Variables**. In the second row, type USER (left field) and type your Codefresh user name in the right field.

{:start="4"}
4. If you want the user name to be encrypted, select the **Encrypt** checkbox. 

{% include image.html 
lightbox="true" 
file="/images/9ad3aab-var.PNG" 
url="/images/9ad3aab-var.PNG"
alt="var.PNG"
max-width="40%" 
%}

{:start="5"}
5. Generate a token by clicking the following link - https://g.codefresh.io/api/

{:start="6"}
6. Copy the token.

{% include image.html 
lightbox="true" 
file="/images/18a442e-swaggertoken.PNG" 
url="/images/18a442e-swaggertoken.PNG"
alt="swaggertoken.PNG"
max-width="40%" 
%}
 
   *> Make sure you copy the entire token. You can use **Ctrl+A** to select the entire token before copying.*  

{:start="7"}
7. In the **Pipelines** tab, scroll down to the **Environment Variables**. In the second row click ADD. \\ 
A new row is added.

{:start="8"}
8. In the left field type TOKEN (left field).

{:start="9"}
9. In the right field, paste the token that you have copied in step 6 above.

{% include image.html 
lightbox="true" 
file="/images/2c9a1d2-token.PNG" 
url="/images/2c9a1d2-token.PNG"
alt="token.PNG"
max-width="40%" 
%}
  
{:start="10"}
10. Scroll up to the **Deploy Script** section and type the following script:

  `Deploy Script`
{% highlight yaml %}
{% raw %}
if [[ $CF_BRANCH == master ]]; then
     #install cf command line
     npm install -g @codefresh-io/cf-cli
     #authenticate as user TOKEN and USER. User is configured in the environment variables
     cf-cli login --token $TOKEN -u $USER
     # cf-cli builds build -a $ACCOUNT -o $REPO_OWNER -r $REPO_NAME
     cf-cli run codefresh/demochat:master
     fi
{% endraw %}
{% endhighlight %}

  * Line 1 - checks that the branch is master. Whenever a change to the master is introduced (usually following a merge) 
  * Line 3 -  installs the Codefresh command line 
  * Line 5 - authenticates using a user token and Codefresh user name (configured in step 3-4 above). 
  * Line 7 - runs the demochat container.

{:start="11"}
11. At the bottom of the screen, click **Save**.

## Congratulations!
The pipeline now include a deploy step. This means that any change to the master branch will invoke the entire pipeline, up to the deployment of the image in
