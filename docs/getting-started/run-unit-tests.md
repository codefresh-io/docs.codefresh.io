---
layout: docs
title: "Run Unit Tests"
excerpt: ""
description: ""
excerpt: ""
group: getting-started
redirect_from:
  - /docs/testrun-unit-tests
toc: true
old_url: /docs/testrun-unit-tests
was_hidden: true
---
With Codefresh, you can easily set your unit tests to run on every build.

You configure your unit test script inside the service's settings page.

## 1. Access Your Service

{:.text-secondary}
### **Procedure**:

{:start="1"}
1. Click the **Services** view icon to display the service you created.
 
{:start="2"}
2. Click the **Gear** icon on the service profile.

{% include image.html 
lightbox="true" 
file="/images/b2e9629-a59e344-2016-09-29_1224.png" 
url="/images/b2e9629-a59e344-2016-09-29_1224.png"
alt="a59e344-2016-09-29_1224.png"
max-width="40%"
caption="Services view (click image to enlarge)"
%}

### **Result**:
You are directed to the **Pipelines** tab of the **Services** view.

## 2. Define Your Unit Test Script

{:.text-secondary}
### **Procedure**:

{:start="1"}
1. Scroll to the Build and Unit Test section.

{:start="2"}
2. In the **Unit Test Script** area, insert your unit test bash script.
Please note,  you need to ensure your testing frameworks are installed in your service Docker image. For full documentation on Dockerfile commands please visit the [Dockerfile reference](https://docs.docker.com/engine/reference/builder/).

{:start="3"}
3. Scroll to the bottom of the page, and click the **SAVE** button.

{% include image.html 
lightbox="true" 
file="/images/990987d-Screen_Shot_2016-09-29_at_2.26.44_PM.png" 
url="/images/990987d-Screen_Shot_2016-09-29_at_2.26.44_PM.png"
alt="Screen Shot 2016-09-29 at 2.26.44 PM.png"
max-width="40%"
caption="Unit Test Script box (click image to enlarge)"
%}

## Run tests with composition

{:.text-secondary}
### **Procedure**:

{:start="1"}
1. Enable checkbox 'Run tests with composition':

{% include image.html 
lightbox="true" 
file="/images/6c54eef-2016-10-13_20-09-41.png" 
url="/images/6c54eef-2016-10-13_20-09-41.png"
alt="2016-10-13_20-09-41.png"
max-width="40%"
%}

{:start="2"}
2. Choose you composition:

{% include image.html 
lightbox="true" 
file="/images/acce127-2016-10-13_20-15-53.png" 
url="/images/acce127-2016-10-13_20-15-53.png"
alt="2016-10-13_20-15-53.png"
max-width="40%"
%}

{:start="3"}
3. Click Save and build the project.

{:.text-secondary}
### **Result**: In the log of process “Running unit tests”, we can see which actions the test makes.

## Set the Unit Test execution script
At this step, you can configure the command to run your unit tests such as "npm test" , "gulp test", etc. Please note, in order for the unit tests to run, the testing frameworks in use have to be installed in your Docker image. Check your repo’s Docker file and ensure your testing framework installed there (for example adding the command “RUN npm install -g mocha” will install the mocha testing framework in your Docker image).
