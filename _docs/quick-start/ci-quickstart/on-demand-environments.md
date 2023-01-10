---
title: "On-demand environment quick start"
description: "Code collaboration with Codefresh"
group: quick-start
sub_group: ci-quickstart
toc: true

---

This quick start guides you through creating separate demo environments to test different features that developers are working on. 

Codefresh has the unique capability of launching Docker images in temporary test environments. These test environments
are ephemeral, and are perfect for quick demos. Use them to quickly share a feature with a colleague or a customer.  

> Test environments are not intended to be used as QA (let alone production) environments. 

## Launch a Docker image using Codefresh

Docker images play a central role in Codefresh. 
In the [CI pipeline quick start]({{site.baseurl}}/docs/quick-start/ci-quickstart/create-ci-pipeline/), you saw how to easily create a Docker image from your source code.

In this quick start, we will take this one step further, and launch the resulting Docker image.
Codefresh has the unique capability of launching a Docker image (using [Docker Swarm](https://docs.docker.com/engine/swarm/) behind the scenes) on the same hosted environment that Codefresh itself runs on.  
This means that with zero effort from your side, you can quickly inspect the status of your application using the Codefresh infrastructure. 

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/quick-start-test-pr/demo-stage.jpg" 
url="/images/quick-start/quick-start-test-pr/demo-stage.jpg" 
max-width="80%" 
%}



1. In the Codefresh UI, go to [Images](https://g.codefresh.io/2.0/images){:target="\_blank"}.
1. Select the image and click **Launch**.

<!--- remember to change screenshot>
{% include 
image.html 
lightbox="true" 
file="/images/quick-start/quick-start-test-pr/launch.png" 
url="/images/quick-start/quick-start-test-pr/launch.png" 
alt="Launching a Docker image" 
caption="Launching a Docker image" 
max-width="80%" 
%}

-->
1. As our sample application consists of only a single Docker image, select **standalone**. 
  Codefresh automatically knows which port should be exposed in the test environment, that is, which port of the Docker container should be made available for external connections.  
  Our sample application exposes its web interface at port 5000, but a random port is actually assigned for external connections.
1. Once the application is launched, Codefresh displays the run log. You will see the same messages that would appear if you executed the `docker run` command locally. 

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-test-pr/launch-url.png" 
url="/images/getting-started/quick-start-test-pr/launch-url.png" 
alt="Start logs" 
caption="Start logs (click image to enlarge)" 
max-width="60%" 
%}

## Access the test environment

Once launch is complete, Codefresh prints a dynamic URL for the deployed environment.  
Now you have a demo environment created just for you! You can send this link with an email to a colleague to ask for feedback or to a customer to show progress.  


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/quick-start-test-pr/demo-environment.png" 
url="/images/quick-start/quick-start-test-pr/demo-environment.png" 
alt="Test environment" 
caption="Test environment" 
max-width="60%" 
%}

>If the environment is not functioning correctly for your own application, make sure that the port exposed by Codefresh in the **Launch settings** is the one that is actually used in your application as an HTTP endpoint. 

You can also view your on-demand environment in Codefresh, and get additional details on the environment.

1. In the Codefresh UI, go to [Compositions](https://g.codefresh.io/compositions){:target="\_blank"}.
1. Click the **Running Compositions** tab.    
  You will see the test environment you created, and details such as:
  * The branch from which this environment is created
  * The Git commit that represents this environment
  * The URL endpoint created by Codefresh
  * On the right, action button that allow you to visit the environment directly, share the link on Slack, and most importantly, stop the environment, so that it doesn't count against your account.  
    It is a good practice to launch environments only when you need them and clean them up once you are done with them.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/quick-start-test-pr/env-details.png" 
url="/images/quick-start/quick-start-test-pr/env-details.png" 
alt="Details for an active on-demand environment" 
caption="Details for active on-demand environment" 
max-width="70%" 
%}



## Read more
[Kubernetes deployment quick start]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)  
[Introduction to Codefresh pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)



