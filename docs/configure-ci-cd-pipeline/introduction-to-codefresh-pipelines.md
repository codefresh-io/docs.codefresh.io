---
layout: docs
title: "Introduction to Codefresh pipelines"
description: ""
group: configure-ci-cd-pipeline
redirect_from:
  - /docs/introduction-to-codefresh-pipelines
  - /docs/configure-ci-cd-pipeline
toc: true
---
### What are Codefresh pipelines?
Codefresh pipelines are container native and can be configured to automate a sequence of steps that can ends in a deployment to production, push of an image to a Docker registry and more.

### Key Benefits
- Every step in the pipeline is running inside a container. 
- Steps in the pipeline share the same volume, hence later steps can use artifacts from previous steps.
- Steps can export [environment variables]({{ site.baseurl }}/docs/codefresh-yaml/variables/) that can be used in later steps in the pipeline.
- Steps can be set to run on certain conditions (branch, value of environment variable etc..)
- Steps can annotate the built Docker image with any attribute (test status, link to detailed test report etc...
- There are out of the box steps to spin up a composition (multiple services at once), then run UI / Integration / Performance text, then shut down the composition. Learn more about [Codefresh pipeline's steps]({{ site.baseurl }}/docs/codefresh-yaml/steps/) 

### Pipeline configuration
To configure existing pipeline or add new pipeline, click on the cogwheel icon on the relevant repository.
{% include image.html lightbox="true" file="/images/2254889-pipeline.png" url="/images/2254889-pipeline.png" alt="Add repository" max-width="40%" %}
You can have one or more pipeline for the same repository. click on the '+' to add a new pipeline
{% include image.html lightbox="true" file="/images/33f2a22-multi-pipeline.png" url="/images/33f2a22-multi-pipeline.png" alt="Add repository" max-width="40%" %}

### Editing pipeline steps and flow
There are two modes to define the pipeline workflow/steps. 
- Using the built-in pre-defined steps in the UI
- Using [Codefresh's Yaml format]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)

You can switch between Yaml and the Built-in steps using the toggle in the pipeline's configuration view.
{% include image.html lightbox="true" file="/images/2d0c3d5-toggle.png" url="/images/2d0c3d5-toggle.png" alt="Add repository" max-width="40%" %}

### Pipeline Triggers and webhook
On the General settings of the pipeline, you can configure the trigger for the pipeline. You can at any time trigger a pipeline manually as well.
Here are the options to trigger pipeline execution
- Manual from the **Build** button at the bottom of the pipeline or on the repository
- Setting a webhook on any commit or pull request on all branches or on specific branches (using a regular expression)
- From any other tool or command line by copying the webhook and calling it directly.
- Using the Jenkins plug-in to invoke it from Jenkins

{% include image.html lightbox="true" file="/images/8f77ae1-pipeline-trigger.png" url="/images/8f77ae1-pipeline-trigger.png" alt="Add repository" max-width="40%" %}

