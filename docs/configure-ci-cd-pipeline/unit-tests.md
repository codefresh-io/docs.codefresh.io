---
layout: docs
title: "Unit Tests"
description: ""
group: configure-ci-cd-pipeline
redirect_from:
  - /docs/setup-unit-tests
toc: true
---
With Codefresh, you can easily set your unit tests to run on every build.
You configure your unit test script inside the service's settings page or YML file.

## Run Unit Tests from the Codefresh UI
1. Click **Pipelines** (gear icon) on your service.
{% include image.html lightbox="true" file="/images/a3236fd-2016-10-14_13-28-57.png" url="/images/a3236fd-2016-10-14_13-28-57.png" alt="Add repository" max-width="40%" %}
2. Define your unit test script.
{% include image.html lightbox="true" file="/images/e70a039-2016-10-14_13-35-42.png" url="/images/e70a039-2016-10-14_13-35-42.png" alt="Add repository" max-width="40%" %}
<div class="bd-callout bd-callout-warning" markdown="1">
##### IMPORTANT:

Make sure your testing frameworks are installed in your service Docker image. For full documentation on Dockerfile commands, visit the [Docker documentation](https://docs.docker.com/engine/reference/builder/).
</div>

3.  Click **Save** and **Build** the project.

## **What to do next**: 
Expand the **Running Unit Tests** section to view the actions taken during the test.
{% include image.html lightbox="true" file="/images/2b48af2-2016-10-14_13-46-53.png" url="/images/2b48af2-2016-10-14_13-46-53.png" alt="Add repository" max-width="40%" %}

## Run unit tests using the codefresh.yml file

{:.text-secondary}
### What is a YAML file?
For more information about the ```codefresh.yml``` file, click [here]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).

{:start="1"}
1. Add a unit-test step to your ```codefresh.yml``` file.

  Example: `codefresh.yml`
{% highlight yaml %}
version: '1.0'

steps:
  build-prj-name:
    type: build
    description: codefresh example
    image-name: codefreshexamples/expressangular
    dockerfile: Dockerfile
    tag: latest
  unit-tests:
    image: node:latest # image that contains installed tools for performing test commands
    commands:
      - echo $(date)
{% endhighlight %}

{:start="2"} 
2. In your pipeline switch to the **Use YML build**
{% include image.html lightbox="true" file="/images/dd47675-codefresh_yml_build.png" url="/images/dd47675-codefresh_yml_build.png" alt="Codefresh YML Build" max-width="40%" %}

{:start="3"}
3. Click **Save** and **Build**
{% include image.html lightbox="true" file="/images/eca7ebb-2016-10-14_14-10-09.png" url="/images/eca7ebb-2016-10-14_14-10-09.png" alt="Codefresh YML Build" max-width="40%" %}

{:.text-secondary}
### **What to do next**: 
Expand the **Running Unit Tests** section to view the actions taken during the test.

## Run tests with composition
A **Composition** is a number of containers that define a micro-services based application. For example, it can include all services, or a sub-subset of services.

{:start="1"}
1. Select the `Run tests with composition` check box.
{% include image.html lightbox="true" file="/images/d4b5997-6c54eef-2016-10-13_20-09-41.png" url="/images/d4b5997-6c54eef-2016-10-13_20-09-41.png" alt="Codefresh YML Build" max-width="40%" %}

{:start="2"}
2. Select a composition.
{% include image.html lightbox="true" file="/images/fde5fc0-acce127-2016-10-13_20-15-53.png" url="/images/fde5fc0-acce127-2016-10-13_20-15-53.png" alt="Codefresh YML Build" max-width="40%" %}

{:start="3"}
3. There are two ways to run with composition: 
   *    **Attach to Composition** - The image will be attached to the composition as a new service named `cf_unit_test` and the script will run inside it.
   *    **Replace service** - Choose a candidate service from your composition which Codefresh will use to run your unit tests on. Notice that the image of that candidate will be replaced with the built image from the previous step and the command will be overridden by the unit test script. 

{% include image.html lightbox="true" file="/images/5052f19-image4.png" url="/images/5052f19-image4.png" alt="Selecting the Replace Service option" caption="Selecting the Replace Service option" max-width="40%" %}

{:start="4"}
4. In Pipelines your service click **Save** and build your project.

##### **Result**: In the log of process “Unit tests”, we can see which actions the test makes.
