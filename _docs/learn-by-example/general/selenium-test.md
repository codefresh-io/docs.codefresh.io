---
title: "Selenium test"
description: ""
excerpt: ""
group: learn-by-example
sub_group: general
redirect_from:
  - /docs/general/selenium-test/
toc: true
---

[Selenium](https://www.selenium.dev/) is a free, open-source testing framework that is used to automate browser testing. It is encompassed of three different tools, referred to as Selenium Testing.
* Selenium WebDriver -- To interact with the Bowser
* Selenium IDE -- To create scripts for quick, automated testing
* Selenium Grid -- To run tests across multiple environments

The languages supported by Selenium include Java, Perl, Ruby C#, Python, and JavaScript.

In this example, we are going to be looking at the Selenium WebDriver in combination with [Protractor](https://www.protractortest.org/#/). Protractor is another testing framework specifically for Angular. It simulates the interaction that a user would have within your browsers.

In the end, we will have a container image that executes the tests specified through Protractor on our website.

{% include image.html 
  lightbox="true" 
  file="/images/learn-by-example/selenium/pipeline.png" 
  url="/images/learn-by-example/selenium/pipeline.png" 
  alt="Codefresh Pipeline Build with website tests" 
  caption="Codefresh Pipeline Build with website tests" 
  max-width="100%"
%}

## Setting up the Project

We are going to be using the [following repository](https://github.com/codefresh-contrib/selenium-example). The repository itself is only focused on setting up the tests using both frameworks and running those. 

This is our project structure:

{% include image.html 
  lightbox="true" 
  file="/images/learn-by-example/selenium/overview.png" 
  url="/images/learn-by-example/selenium/overview.png" 
  alt="Repository Overview" 
  caption="Repository Overview" 
  max-width="80%"
%}

Overview:
* node_modules, package-lock, package: NodeJS specific
* codefresh.yml: Specifies our Codefresh pipeline
* gitignore: Anything that we do not want to commit
* conf.js: This file is used for our Protractor configuration
* Dockerfile: Our Dockerfile
* spec.js: Our tests

#### Using your own project

If you are using your own project, you will have to install a few prerequisites.

To install Selenium WebDriver on your NodeJS project, run
```
npm install selenium-webdriver
```

Each browser has a specific driver. The driver is the component that [handles the communication](https://www.selenium.dev/documentation/en/getting_started_with_webdriver/) between Selenium and the browser.

Next, install Portractor:
```
npm install protractor
```

#### Using the example repository

To access the dependencies within the [example respository](https://github.com/codefresh-contrib/selenium-example), run
```
npm install
```

## Run tests

We have set-up three tests on an example website within our [spec.js](https://github.com/codefresh-contrib/selenium-example/blob/master/spec.js) file. The website that will be used is referenced within the file. You could adopt the website as well as the tests to fit the needs of your application.

```
beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get('http://juliemr.github.io/protractor-demo/');
    });
```

To run the tests, we are going to execute the following commands 
```
npm update

npm start
```

This will get our Selenium Web Driver up and running, you can find the exact scripts used in the [package.json](https://github.com/codefresh-contrib/selenium-example/blob/master/package.json) file. Now we can run the tests:
```
npm test
```
Please ensure that the binaries of your Browser are within the right path. Otherwise, the tests cannot run as expected.

The output in your terminal will look similar to the following:
{% include image.html 
  lightbox="true" 
  file="/images/learn-by-example/selenium/output.png" 
  url="/images/learn-by-example/selenium/output.png" 
  alt="Test Output" 
  caption="Test Output" 
  max-width="80%"
%}

## Running Tests within Codefresh

The [Dockerfile](https://github.com/codefresh-contrib/selenium-example/blob/master/Dockerfile) within our repository creates a container images that sets up the necessary dependencies needed to run our tests. Once we have build and run our our container image, the tests will be executed within. This way, the tests on your application can be run within the container image in your Codefresh Pipeline. 

{% include image.html 
  lightbox="true" 
  file="/images/learn-by-example/selenium/pipeline.png" 
  url="/images/learn-by-example/selenium/pipeline.png" 
  alt="Codefresh Pipeline Build with website tests" 
  caption="Codefresh Pipeline Build with website tests" 
  max-width="80%"
%}

Within our [codefresh.yml](https://github.com/codefresh-contrib/selenium-example/blob/master/codefresh.yml) file, we have specified three different steps, to clone our repository, build and push our container images, and lastly, run our container image to execute the steps.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
# Stages can help you organize your steps in stages
stages:
  - "clone"
  - "build"
  - "test"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "anais-codefresh/selenium-example"
    # CF_BRANCH value is auto set when pipeline is triggered
    # Learn more at codefresh.io/docs/docs/codefresh-yaml/variables/
    revision: "${{CF_BRANCH}}"
    git: "github"
    stage: "clone"

  build_image:
    title: "Building Docker image"
    type: "build"
    image_name: "anaisurlichs/selenium-example"
    working_directory: "${{clone}}"
    tag: "1.0.0"
    dockerfile: "Dockerfile"
    stage: "build"
    
  test:
    title: "Running test"
    type: "freestyle" # Run any command
    image: "anaisurlichs/selenium-example:1.0.0" # The image in which command will be executed
    working_directory: "${{clone}}" # Running command where code cloned
    stage: "test"
{% endraw %}      
{% endhighlight %}

## Not using NodeJS

If you are interested in executing tests on your application that is not written in NodeJS or an Application without Protractor, you can also run tests using [Selenium directly](https://www.selenium.dev/documentation/en/webdriver/js_alerts_prompts_and_confirmations/).

## What to read next

* [Unit Tests]({{site.baseurl}}/docs/yaml-examples/examples/run-unit-tests/)
* [Integration Tests]({{site.baseurl}}/docs/yaml-examples/examples/run-integration-tests/)
* [Service Container]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
* [Test Report]({{site.baseurl}}/docs/testing/test-reports/)
