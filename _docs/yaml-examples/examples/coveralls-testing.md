---
title: "Coveralls Coverage Reports"
description: "How to forward coverage reports to Coveralls"
group: yaml-examples
toc: true
---

[Coveralls](https://coveralls.io/) is a web service that allows users to track the code coverage of their application over time to optimise test coverage. This section details how coverage reports can be generated and forwarded to Coveralls with every Codefresh build.

Analysis reports displayed within Coveralls dashboard:
{% include image.html 
lightbox="true" 
file="/images/testing/coveralls/coveralls-sample-app.png" 
url="/images/testing/coveralls/coveralls-sample-app.png"
alt="Coveralls UI Analysis reports" 
max-width="50%" 
%}

## Prerequisites for using Coveralls

* A simple [Codefresh pipeline up and running](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
* A [Coveralls account](https://coveralls.io/) (free or enterprise) -- Note that all open-source projects are free on Coveralls
* A testing tool added to your project that produces coverage reports

Coveralls supports [22 different language integrations](https://docs.coveralls.io/about-coveralls). Each example provided in the official documentation suggests several coverage report tools that can be used in combination with Coveralls.

You could try it out by cloning our [node example application](https://github.com/codefresh-contrib/coveralls-sample-app) that utilises [jest](https://jestjs.io/).

## Prepare your Repository

In case that you are using your own application, you have to make a few modifications to the repository. Please have a look at the Coveralls example section for other languages.

First, install Coveralls in your project:
{% highlight yaml %}
{% raw %}
npm install coveralls --save-dev
{% endraw %}
{% endhighlight %}

Coveralls requires a [script](https://github.com/nickmerwin/node-coveralls) that takes standard input and sends it to coveralls.io to report your code coverage. Any coverage reports can be forwarded that are within a lcov data format (including mocha's LCOV reporter). For this, we are going to set-up a “bin” folder, and within the folder a coveralls.js file that contains the following content:

{% highlight yaml %}
{% raw %}
#!/usr/bin/env node
 
'use strict';
 
const { handleInput } = require('..');
 
process.stdin.resume();
process.stdin.setEncoding('utf8');
 
let input = '';
 
process.stdin.on('data', chunk => {
 input += chunk;
});
 
process.stdin.on('end', () => {
 handleInput(input, err => {
   if (err) {
     throw err;
   }
 });
});
{% endraw %}
{% endhighlight %}

## Create an Account with Coveralls

Once you sign-up to Coveralls, you can add a new repository. The UI will then provide you with an access token to the repository. Take note of the token since it will be required in the next sections.

{% include image.html 
lightbox="true" 
file="/images/testing/coveralls/add-repository.png" 
url="/images/testing/coveralls/add-repository.png" 
alt="Coveralls repository" 
max-width="50%" 
%}

## Codefresh Pipeline

In case the project that you want to use Coveralls in does not have a pipeline, [create a new pipeline](https://codefresh.io/docs/docs/getting-started/create-a-basic-pipeline/).

{% include image.html 
lightbox="true" 
file="/images/testing/coveralls/create-coveralls-pipeline.png" 
url="/images/testing/coveralls/create-coveralls-pipeline.png" 
alt="Create Coveralls Pipeline" 
max-width="50%" 
%}

Once you ’create’ the pipeline, a standard codefresh.yml file is generated with three steps:
* The first step will clone your repository;
* The second step will both, build and push your repository to the container registry that you have connected with Codefresh;
* And the third step currently does not do much. 
In the next section, we will modify the testing step.

**Testing step**

The testing step requires three different environment variables to connect to Coveralls:
* `export COVERALLS_SERVICE_NAME="codefresh"`
* `export COVERALLS_GIT_BRANCH="insert the branch that you will be using with your application"`
* `export COVERALLS_REPO_TOKEN="insert the secret repo token from coveralls.io"`

{% highlight yaml %}
{% raw %}
   test:
    title: "Running test"
    type: "freestyle" # Run any command
    image: "node:15.2" # The image in which command will be executed
    working_directory: "${{clone}}" # Running command where code cloned
    commands:
      - "export COVERALLS_SERVICE_NAME=${{COVERALLS_SERVICE_NAME}}"
      - "export COVERALLS_GIT_BRANCH=${{CF_BRANCH}}"
      - "export COVERALLS_REPO_TOKEN=${{COVERALLS_REPO_TOKEN}}"
      - "npm install --save-dev jest"
      - "npm run test"
    stage: "test"
{% endraw %}
{% endhighlight %}

We specify several variables within this step. Those, which start with ’CF’ are [Codefresh-specific steps](https://codefresh.io/docs/docs/codefresh-yaml/variables/) and the value is automatically provided by Codefresh once you run the pipeline. Our entire codefresh.yml will look as such:

{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "test"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "anais-codefresh/coveralls-sample-app"
    # CF_BRANCH value is auto set when pipeline is triggered
    # Learn more at codefresh.io/docs/docs/codefresh-yaml/variables/
    revision: "${{CF_BRANCH}}"
    git: "github"
    stage: "clone"

  build:
    title: "Building Docker image"
    type: "build"
    image_name: "anaisurlichs/coveralls-sample-app"
    working_directory: "${{clone}}"
    tag: "${{CF_BRANCH_TAG_NORMALIZED}}"
    dockerfile: "Dockerfile"
    stage: "build"
    registry: "dockerhub"
    
  test:
    title: "Running test"
    type: "freestyle" # Run any command
    image: "node:15.2" # The image in which command will be executed
    working_directory: "${{clone}}" # Running command where code cloned
    commands:
      - "export COVERALLS_SERVICE_NAME=${{COVERALLS_SERVICE_NAME}}"
      - "export COVERALLS_GIT_BRANCH=${{CF_BRANCH}}"
      - "export COVERALLS_REPO_TOKEN=${{COVERALLS_REPO_TOKEN}}"
      - "npm install --save-dev jest"
      - "npm run test"
    stage: "test"
{% endraw %}
{% endhighlight %}

Once you run the pipeline the steps will create the coverage report and forward it to Coveralls.

{% include image.html 
lightbox="true" 
file="/images/testing/coveralls/coveralls-pipeline.png" 
url="/images/testing/coveralls/coveralls-pipeline.png" 
alt="Pipeline with Coveralls step" 
max-width="50%" 
%}

## View reports

This will allow you to view the updated coverage reports within Coveralls UI every time you make a commit and/or run the Codefresh pipeline directly.

{% include image.html 
lightbox="true" 
file="/images/testing/coveralls/coveralls-sample-app.png" 
url="/images/testing/coveralls/coveralls-sample-app.png"
alt="Coveralls UI Analysis reports" 
max-width="50%" 
%}

You can access further information on the coverage report by opening the link to the file displayed in the table.

{% include image.html 
lightbox="true" 
file="/images/testing/coveralls/coveralls-specific-report.png" 
url="/images/testing/coveralls/coveralls-specific-report.png" 
alt="Coveralls report details" 
max-width="50%" 
%}

And view a the code coverage of a specific file:
{% include image.html 
lightbox="true" 
file="/images/testing/coveralls/coveralls-coverage.png" 
url="/images/testing/coveralls/coveralls-coverage.png" 
alt="Coveralls report details" 
max-width="50%" 
%}

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Unit tests]({{site.baseurl}}/docs/testing/unit-tests/)
* [Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)
* [Sonarqube Integration]({{site.baseurl}}/docs/testing/sonarqube-integration/) 