---
layout: docs
title: "Integration Test Script"
excerpt: ""
description: ""
excerpt: ""
group: getting-started
redirect_from:
  - /docs/integration-test-script
toc: true
old_url: /docs/integration-test-script
was_hidden: true
---
If your service is part of a micro-services type of application, Codefresh enables you to run your image as part of a composition, and then run your integration tests against it. There are two pre-requisites for this step:

## Pre-Requisites

**Define a Composition**
You must define a composition in the Codefresh composition module. This composition dictates how to spin up your micro-services application before running the integration tests. For more information about compositions, see [Create a Composition](https://docs.codefresh.io/docs/create-composition).

{% include image.html 
lightbox="true" 
file="/images/fb724ab-Screen_Shot_2016-11-10_at_11.37.07_AM.png" 
url="/images/fb724ab-Screen_Shot_2016-11-10_at_11.37.07_AM.png"
alt="Screen Shot 2016-11-10 at 11.37.07 AM.png"
max-width="40%" 
%}

**Create a Composition test image, which is a Docker image with the integration test’s execution engine and scripts**
You can create a service, with the git repo that contains your integration tests scripts, in Codefresh that automatically builds a Docker image with your testing framework’s execution engine.  You can add the integration test scripts as commands in the Dockerfile. Alternatively, you can create the image locally, and make it available to Codefresh in your Docker registry. 

## Run the Integration Tests
Follow these steps to run the the integration test

{:start="1"}
1. Select the **RUN TEST WITH COMPOSITION** check box.

{% include image.html 
lightbox="true" 
file="/images/f504939-Screen_Shot_2016-11-10_at_11.55.04_AM.png" 
url="/images/f504939-Screen_Shot_2016-11-10_at_11.55.04_AM.png"
alt="Screen Shot 2016-11-10 at 11.55.04 AM.png"
max-width="40%" 
%}

{:start="2"}
2. Select a composition to run.

{% include image.html 
lightbox="true" 
file="/images/56fe408-Screen_Shot_2016-11-10_at_11.58.06_AM.png" 
url="/images/56fe408-Screen_Shot_2016-11-10_at_11.58.06_AM.png"
alt="Screen Shot 2016-11-10 at 11.58.06 AM.png"
max-width="40%" 
%}

{:start="3"}
3. Add a Composition test image, which will be added as a new service to your composition

{% include image.html 
lightbox="true" 
file="/images/683f195-Screen_Shot_2016-11-10_at_11.58.39_AM.png" 
url="/images/683f195-Screen_Shot_2016-11-10_at_11.58.39_AM.png"
alt="Screen Shot 2016-11-10 at 11.58.06 AM.png"
max-width="40%"
caption="This is our test image, which contains the integration test code" 
%} 

{:start="4"}
4. Specify the command that will run on the candidate service.

{% include image.html 
lightbox="true" 
file="/images/fd371d0-Screen_Shot_2016-11-10_at_11.59.00_AM.png" 
url="/images/fd371d0-Screen_Shot_2016-11-10_at_11.59.00_AM.png"
alt="Screen Shot 2016-11-10 at 11.59.00 AM.png"
max-width="40%"
%} 
 
## Important Notes
* the Composition test image will be added to your existing composition as a new service. 
* at the moment it is not possible to control other docker-compose fields for the test image service.

{{site.data.callout.callout_info}}
If you have a more complicated scenario, you can use the [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/){:target="_blank"} to define your pipeline 
{{site.data.callout.end}}
