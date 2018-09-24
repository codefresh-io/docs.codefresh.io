---
title: "Test reports"
description: "How to create and view Test reports in Codefresh"
group: configure-ci-cd-pipeline
toc: true
---

Codefresh offers the capability to store your test results for every build and view them
at any point in time.

>You don't have to use Codefresh infrastructure for your tests if you don't want to.
You can always upload test reports and other HTML data in different locations (such as an S3 bucket) of your choosing.



Using the integrated test reporting feature in Codefresh will produce HTML reports like the following:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/sample-test-report.png" 
url="/images/pipeline/test-reports/sample-test-report.png"
alt="Sample test report" 
caption="Sample test report"
max-width="80%"
%}

The graphical reports provided by Codefresh are based on the open source [Allure framework](http://allure.qatools.ru/)

## Steps Required

In order to obtain test reports the general process of a pipeline is the following 

1. Generate test results using Alure and store them in a folder named `alure-results` (which is the default name)
1. Copy this folder to the [Codefresh volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) so that it is available to the next pipeline step
1. Use the special `cf-docker-test-reporting` pipeline step with a working directory the folder that contains the `alure-results` subfolder

Let's see these requirements in order:

### Collecting the test results

The first step is to run your unit/integration tests and use Allure to gather the test results. The process is different for every programming language. Follow the [official Allure documentation](https://docs.qameta.io/allure/). Several popular test frameworks are supported such as:

* Java/junit/testng/cucumber
* Python/pytest
* Javascript/Jasmine/Mocha
* Ruby/Rspec
* Groovy/Spock
* .NET/Nunit/mstest
* Scala/Scalatest
* PHP/PhpUnit

You can also take a look at any of the [examples](https://github.com/allure-examples). 

By default Allure creates a folder named `allure-results` with all the tests. 
The important part regarding Codefresh reporting is to keep this folder name and not change it, as this directory will then be passed to the Codefresh reporting step (which expects a folder with that name).

To pass the reports to the next step you need to place them anywhere in the [Codefresh volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) that is automatically shared between all Codefresh steps.

>It is also possible to leave the test results in the project folder that was checkout from GIT (as this folder is already inside the shared Codefresh volume)

Therefore once you create the reports with your testing framework make sure that you copy them to `{% raw %}${{CF_VOLUME_PATH}}{% endraw %}` the [Codefresh variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) that points to the shared volume. An example for Node tests would be the following:

{% highlight yaml %}
{% raw %}
running_tests:
   image: node
   title: Running Unit tests
   commands:
    - npm test
    - cp -r -f ./allure-results $CF_VOLUME_PATH/allure-results
{% endraw %}
{% endhighlight %}

Here the tests are executed and then they are copied to `/codefresh/volume/allure-results`

It is important that the actual folder is named `allure-results` as this it the name that Codefresh reporting will look at.


### Creating the test reports


Once the test results are collected the next step is the same regardless of your programming language and test framework.

{% highlight yaml %}
{% raw %}
 unit_test_reporting_step:
   title: Generate test reporting
   image: codefresh/cf-docker-test-reporting
   working_directory: '${{CF_VOLUME_PATH}}/'
{% endraw %}
{% endhighlight %}

Here we execute the special `cf-docker-test-reporting` image as a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/). The important point is that this image will search for `allure-results` on its working directory. This is why we pass `/codefresh/volume/` as the working directory as this is the parent folder of the test results.

Once that is done, the results will be uploaded to Codefresh infrastructure. You can access
the report for any build by clicking at the respective button found on the right of each build.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/test-report-button.png" 
url="/images/pipeline/test-reports/test-report-button.png"
alt="Test report button" 
caption="Test report button"
max-width="80%"
%}

## Cleaning the reports from the previous run 

In the most usual case, the tests will run, Allure will collect the results, they will be saved into a folder and then a report will be created by Codefresh.

If however something goes wrong with the actual tests, once the Codefresh reporting step runs it will actually pick the old reports (from the previous build). Remember that everything that is placed in the Codefresh volume not only is shared between build steps, but also persists between different builds of the same pipeline (for cache reasons).

If that is a problem for you, place a "clean up" step that deletes the test results as a **first** step in your pipeline so that old reports are always removed.

Here is an example:

{% highlight yaml %}
{% raw %}
 remove_old_test_report:
   title: Remove previous test reporting
   image: node
   commands:
    - cd '${{CF_VOLUME_PATH}}/'
    - rm -r -f allure-results
{% endraw %}
{% endhighlight %}




## What to read next


* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)

