---
title: "Test reports"
description: "How to create and view Test reports in Codefresh"
group: configure-ci-cd-pipeline
toc: true
---

Codefresh offers the capability to store your test results for every build and view them
at any point in time.

Currently Codefresh supports the storage of test reports in [Google buckets](https://cloud.google.com/storage/docs/key-terms#buckets). Support 
for [S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) is also being planned.

## Test report modes

There are two modes for processing test reports in Codefresh.

1. Built-in test reporting based in [Allure framework](http://allure.qatools.ru/)
1. Custom reporting for any static website content (i.e. HTML)

Allure is an open source test framework that can  produce HTML reports like the following:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/sample-test-report.png" 
url="/images/pipeline/test-reports/sample-test-report.png"
alt="Sample Allure test report" 
caption="Sample Allure test report"
max-width="70%"
%}

You can find more details in the [official Allure documentation](https://docs.qameta.io/allure/). Several popular test frameworks are supported such as:

* Java/jUnit/testNG/cucumber
* Python/pytest
* Javascript/Jasmine/Mocha
* Ruby/Rspec
* Groovy/Spock
* .NET/Nunit/mstest
* Scala/Scalatest
* PHP/PhpUnit

If you use the custom reporting mode then you can select any kind of tool that you want (as long as it produces a static website in the end). You can also use the custom reporting mode for things that are not test reports (such as security reports or quality reports).

## Connecting your Google storage account

As a first step you need a Google bucket to store your test results. You can create a bucket either from the Google cloud console or the `gsutil` command line tool. See the [official documentation](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console) for the exact details.

Once the bucket is installed, click on *Integrations* from the left sidebar in your Codefresh account and scroll down to *Cloud Storage*:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/cloud-storage-integrations.png" 
url="/images/pipeline/test-reports/cloud-storage-integrations.png"
alt="Cloud storage Integrations" 
caption="Cloud storage Integrations"
max-width="80%"
%}

Click the *configure* button and in following screen choose *Google Cloud Storage* from the drop-down menu.

The easiest way is to select the *OAuth2* connection method. Enter an arbitrary name for your integration and check the box for read/write access (as Codefresh needs to both write and read from the bucket). 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/cloud-storage-google.png" 
url="/images/pipeline/test-reports/cloud-storage-google.png"
alt="Google cloud storage" 
caption="Google cloud storage"
max-width="80%"
%}


Then click Save and Codefresh will ask extra permissions from your Google account. Accept the permissions and the integration is ready.

An alternative way of authentication is to use a [Google service account key](https://console.cloud.google.com/apis/credentials/serviceaccountkey). In that case download the JSON file locally that represent the key and paste its contents in the *JSON config* field.

For more information see the [official documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys). 


## Producing Allure test reports from Codefresh pipelines

In order to obtain test reports using the first mode (with Allure) the general process of a pipeline is the following 

1. Generate test results using Allure and store them in a folder named `allure-results` (which is the default name)
1. Copy this folder to the [Codefresh volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) so that it is available to the next pipeline step
1. Use the special `cf-docker-test-reporting` pipeline step with a working directory the folder that contains the `allure-results` subfolder

Let's see these requirements in order:

### Collecting the Allure test results

The first step is to run your unit/integration tests and use Allure to gather the test results. The process is different for every programming language. Follow the [official Allure documentation](https://docs.qameta.io/allure/). 
You can also take a look at any of the [examples](https://github.com/allure-examples). 

By default Allure creates a folder named `allure-results` with all the tests. The Codefresh reporting step will look for that folder in order to upload it to the cloud storage. If you change the default name, then you also need to add an extra parameter in the Codefresh reporting step.

To pass the reports to the next step you need to place them anywhere in the [Codefresh volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) that is automatically shared between all Codefresh steps.

>It is also possible to leave the test results in the project folder that was checkout from GIT (as this folder is already inside the shared Codefresh volume)

Therefore once you create the reports with your testing framework make sure that you copy them to `{% raw %}${{CF_VOLUME_PATH}}{% endraw %}` which is the [Codefresh variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) that points to the shared volume. An example for Node tests would be the following:

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


### Creating the Allure test reports


Once the test results are collected the next step is the same regardless of your programming language and test framework.

{% highlight yaml %}
{% raw %}
 unit_test_reporting_step:
   title: Generate test reporting
   image: codefresh/cf-docker-test-reporting
   working_directory: '${{CF_VOLUME_PATH}}/'
   environment:
     - BUCKET_NAME=my-bucket-name
     - CF_STORAGE_INTEGRATION=google
{% endraw %}
{% endhighlight %}

Here we execute the special `cf-docker-test-reporting` image as a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/). The important point is that this image will search for `allure-results` on its working directory. This is why we pass `/codefresh/volume/` as the working directory as this is the parent folder of the test results.

If you used another directory name then you can configure the test reporting step like this:

{% highlight yaml %}
{% raw %}
 unit_test_reporting_step:
   title: Generate test reporting
   image: codefresh/cf-docker-test-reporting
   working_directory: '${{CF_VOLUME_PATH}}/'
   environment:
     - ALLURE_DIR=my-own-allure-results-folder
     - BUCKET_NAME=my-bucket-name
     - CF_STORAGE_INTEGRATION=google
{% endraw %}
{% endhighlight %}


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

## Using the custom mode for generic reporting

If you don't want to use Allure or wish to create some other kind of report, you can use the alternative mode of the Codefresh reporting step.

Here is an example for a custom reporting via [Mocha](https://mochajs.org/). The reports are placed in the folder `/codefresh/volume/demochat/mochawesome-report`.


{% highlight yaml %}
{% raw %}
 unit_test_reporting_step:
   title: Upload Mocha test reports
   image: codefresh/cf-docker-test-reporting
   working_directory: /codefresh/volume/demochat/
   environment:
     - REPORT_DIR=mochawesome-report
     - REPORT_INDEX_FILE=mochawesome.html
     - BUCKET_NAME=my-bucket-name
     - CF_STORAGE_INTEGRATION=google
{% endraw %}
{% endhighlight %}

In the example above we define a non-allure report directory and also which file will serve as the index file. Here is the result:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/mocha-tests.png" 
url="/images/pipeline/test-reports/mocha-tests.png"
alt="Custom reporting" 
caption="Custom reporting"
max-width="70%"
%}

In a similar manner you can upload reports from any other custom tool you have in your pipeline.

If your report is only one file then simply use the `REPORT_INDEX_FILE` environment variable on its own like below:

{% highlight yaml %}
{% raw %}
 unit_test_reporting_step:
   title: Upload single html file report
   image: codefresh/cf-docker-test-reporting
   working_directory: /codefresh/volume/my-app/
   environment:
     - REPORT_INDEX_FILE=my-test-report/my-result.html
     - BUCKET_NAME=my-bucket-name
     - CF_STORAGE_INTEGRATION=google
{% endraw %}
{% endhighlight %}



### Cleaning the reports from the previous run 

In the most usual case, the tests will run, the results will be collected, they will be saved into a folder and then a report will be created by Codefresh.

If however something goes wrong with the actual tests, once the Codefresh reporting step runs it will actually pick the old reports (from the previous build). Remember that everything that is placed in the Codefresh volume not only is shared between build steps, but also persists between different builds of the same pipeline (for cache reasons).

If that is a problem for you, pass the extra `CLEAR_TEST_REPORT` environment variable to the reporting step. This deletes the previous test results once they are uploaded so they will not be available in the subsequent build.

Here is an example:

{% highlight yaml %}
{% raw %}
 unit_test_reporting_step:
   title: Upload Mocha test reports
   image: codefresh/cf-docker-test-reporting
   working_directory: /codefresh/volume/demochat/
   environment:
     - REPORT_DIR=mochawesome-report
     - REPORT_INDEX_FILE=mochawesome.html
     - CLEAR_TEST_REPORT=true
     - BUCKET_NAME=my-bucket-name
     - CF_STORAGE_INTEGRATION=google
{% endraw %}
{% endhighlight %}

>Notice that in the Allure reporting mode, the test results are automatically cleared by Codefresh. There is no need to define the `CLEAR_TEST_REPORT` variable by yourself.


## What to read next


* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)

