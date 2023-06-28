---
title: "Creating test reports"
description: "Create and view test reports in Codefresh"
group: testing
redirect_from:
  - /docs/configure-ci-cd-pipeline/test-reports/
toc: true
---

Codefresh offers the capability to store test results for every build and view them at any point in time.

Currently, Codefresh supports storing test reports in:  
* [Google buckets](https://cloud.google.com/storage/docs/key-terms#buckets){:target="\_blank"}
* [S3 buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html){:target="\_blank"}
* [Azure Storage](https://docs.microsoft.com/en-us/azure/storage/){:target="\_blank"}
* [MinIO objects](https://min.io/){:target="\_blank"}

## Test report modes

There are two modes for processing test reports in Codefresh, built-in and custom test reporting

1. **Built-in test reporting** based on the [Allure framework](https://qameta.io/allure-report/){:target="\_blank"}  
  Allure is an open-source test framework that can produce HTML reports, as in the example below.  
  For more details, see the [official Allure documentation](https://docs.qameta.io/allure/){:target="\_blank"}.   
  
  Allure supports popular testing frameworks such as:
  * Java/JUnit/TestNG/Cucumber
  * Python/pytest
  * JavaScript/Jasmine/Mocha
  * Ruby/Rspec
  * Groovy/Spock
  * .NET/Nunit/mstest
  * Scala/Scalatest
  * PHP/PhpUnit
  
{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/sample-test-report.png" 
url="/images/pipeline/test-reports/sample-test-report.png"
alt="Sample Allure test report" 
caption="Sample Allure test report"
max-width="70%"
%}

{:start="2"}
1. **Custom reporting** for any static website (HTML) content    
  If you use the custom reporting mode, you can select any kind of tool that you want, as long as it produces a static website in the end. You can also use the custom reporting mode for reports that are not test reports, such as security reports or quality reports.

## Connecting your storage account

As a first step, you need a cloud bucket to store your test results. You can use Google, AWS, Azure or MinIO for this purpose.  
Codefresh creates subfolders in the bucket with the names from every build ID. It will then upload the reports for that build to the respective folder. Multiple pipelines can use the same bucket.

1. In the Codefresh UI, on the toolbar, click the Settings icon, and then from the sidebar select **Pipeline Integrations**. 
1. Scroll down to **Cloud Storage**, and click **Configure**.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/cloud-storage-integrations.png" 
url="/images/pipeline/test-reports/cloud-storage-integrations.png"
alt="Cloud storage Integrations" 
caption="Cloud storage Integrations"
max-width="80%"
%}

{:start="3"}
1. Click **Add Cloud Storage**, and select your cloud provider for test report storage.
1. Continue to define cloud settings according to your cloud provider, as described in the sections that follow.

### Connecting a Google bucket

1. Create a bucket either from the Google cloud console or the `gsutil` command line tool.  
  See the [official documentation](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console){:target="\_blank"} for the exact details.
1. [Connect your storage account](#connecting-your-storage-account) for **Google Cloud Storage**.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/cloud-storage-google.png" 
url="/images/pipeline/test-reports/cloud-storage-google.png"
alt="Google cloud storage" 
caption="Google cloud storage"
max-width="80%"
%}

{:start="3"}
1. Define the settings: 
   * Select **OAuth2** as the connection method, which is the easiest way. 
   * Enter an arbitrary name for your integration.
   * Select **Allow access to read and write into storage** as Codefresh needs to both write to and read from the bucket. 
1. Click **Save**. 
1. When Codefresh asks for extra permissions from your Google account, accept the permissions. 

The integration is ready. You will use the name of the integration as an environment variable in your Codefresh pipeline.

> An alternative authentication method is to use **JSON Config** with a [Google service account key](https://console.cloud.google.com/apis/credentials/serviceaccountkey){:target="\_blank"}.  
  In that case, download the JSON file locally and paste its contents in the **JSON config** field.
  For more information, see the [official documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys){:target="\_blank"}. 

### Connecting an Amazon S3 bucket

**Create an S3 bucket with the required permissions**  
1. For AWS (Amazon Web Services), create an S3 bucket.  
  See the [official documentation](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html){:target="\_blank"} or the [CLI](https://docs.aws.amazon.com/cli/latest/reference/s3api/create-bucket.html){:target="\_blank"}. 
1. Define the IAM policy settings, as in this example:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::cf-backup*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::cf-backup*/*"
            ]
        }
    ]
}
```

1. Note down the **Access** and **Secret** keys. 



1. [Connect your storage account](#connecting-your-storage-account) for **Amazon Cloud Storage**.
1. Define the settings: 
   * Enter an arbitrary name for your integration.
   * Paste the **AWS Access Key ID** and **AWS Secret Access Key**. 
1. Click **Save**. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/cloud-storage-s3.png" 
url="/images/pipeline/test-reports/cloud-storage-s3.png"
alt="S3 cloud storage" 
caption="S3 cloud storage"
max-width="80%"
%}

You will use the name of the integration as an environment variable in your Codefresh pipeline.

You can also use any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets), as values, by clicking on the lock icon that appears next to field:  
* If you have already specified the resource field during secret definition, just enter the name of the secret directly in the text field, for example, `my-secret-key`.
* If you didn't include a resource name during secret creation, enter the full name in the field, for example, `my-secret-resource@my-secret-key`.

### Connecting Azure storage

1. For Azure, create a storage account.  
  See the [official documentation](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create){:target="\_blank"}.
1. Find one of the [two access keys](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage){:target="\_blank"} already created.
1. Note down the **Account Name** and **Access key for the account**. 
1. [Connect your storage account](#connecting-your-storage-account) for **Azure File/Blob Storage**.
1. Define the settings: 
   * Enter an arbitrary name for your integration.
   * Paste the **Azure Account Name** and **Azure Account Key**. 
1. Click **Save**. 


{% include
image.html
lightbox="true"
file="/images/pipeline/test-reports/cloud-storage-azure.png"
url="/images/pipeline/test-reports/cloud-storage-azure.png"
alt="Azure cloud storage"
caption="Azure cloud storage"
max-width="60%"
%}

You will use the name of the integration as an environment variable in your Codefresh pipeline.

You can also use any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets), as values, by clicking on the lock icon that appears next to field:  
* If you have already specified the resource field during secret definition, just enter the name of the secret directly in the text field, for example, `my-secret-key`.
* If you didn't include a resource name during secret creation, enter the full name in the field, for example, `my-secret-resource@my-secret-key`.

### Connecting MinIO storage

1. Configure the MinIO server. 
   See the [official documentation](https://docs.min.io/docs/minio-quickstart-guide.html){:target="\_blank"}.  
1. Copy the Access and Secret keys. define the settings for MinIO cloud storage in your Codefresh account.
1. [Connect your storage account](#connecting-your-storage-account) for ****MinIO Cloud Storage**.
1. Define the settings:
  * **NAME**: The name of the MinIO storage. Any name that is meaningful to you.
  * **ENDPOINT**: The URL to the storage service object.
  * **PORT**: Optional. The TCP/IP port number. If not defined, defaults to port `80` for HTTP, and `443` for HTTPS.
  * **Minio Access Key**: The ID that uniquely identifies your account, similar to a user ID. 
  * **Secret Minio Key**: The password of your account.
  * **Use SSL**: Select to enable secure HTTPS access. Not selected by default. 
1. Click **Save**. 

   {% include
image.html
lightbox="true"
file="/images/pipeline/test-reports/cloud-storage-minio.png"
url="/images/pipeline/test-reports/cloud-storage-minio.png"
alt="MinIO cloud storage"
caption="MinIO cloud storage"
max-width="60%"
%} 

### Integration example in Codefresh pipeline
See an example of the integration in a pipeline:  
```yaml
version: "1.0"
stages:
  - "clone"
  - "test"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "https://github.com/vadim-kharin-codefresh/test/"
    revision: "master"
    stage: "clone"
  unit_test_reporting_step:
    title: Upload Mocha test reports
    image: codefresh/cf-docker-test-reporting
    working_directory: "${{clone}}"
    stage: "test"
    environment:
        - REPORT_DIR=mochawesome-report
        - REPORT_INDEX_FILE=mochawesome.html
        - BUCKET_NAME=codefresh-test-reporting
        - CF_STORAGE_INTEGRATION=minio
        - CF_BRANCH_TAG_NORMALIZED=test
```


## Producing Allure test reports from Codefresh pipelines

In order to obtain test reports with Allure, the general process of a pipeline is the following:

1. Generate test results using Allure and store them in a folder named `allure-results` (which is the default name).
1. Copy this folder to the [Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) to make it available to the next pipeline step.
1. Use the special `cf-docker-test-reporting` pipeline step with a working directory for the folder that contains the `allure-results` subfolder.

Let's see these requirements in order:

### Collecting the Allure test results
 
The first step is to run your unit/integration tests using Allure to gather the results.  
The process is different for every programming language. Follow the [official Allure documentation](https://docs.qameta.io/allure/){:target="\_blank"}. You can also take a look at any of the [examples](https://github.com/allure-examples){:target="\_blank"}. 

By default, Allure creates a folder named `allure-results` containing all the tests. The Codefresh reporting step looks for that folder to upload it to the cloud storage. If you change the default name, then you also need to add an extra parameter in the Codefresh reporting step.

To pass the reports to the next step, you need to place them anywhere in the [Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) that is automatically shared between all Codefresh steps.

>You can also leave the test results in the project folder that was checked out from Git, as this folder is already inside the shared Codefresh volume.

Therefore, once you create the reports with your testing framework, make sure to copy them to `{% raw %}${{CF_VOLUME_PATH}}{% endraw %}` which is the [Codefresh variable]({{site.baseurl}}/docs/pipelines/variables/) that points to the shared volume.  

An example for Node tests would be the following:

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


Once the test results are collected, the next step is the same, regardless of your programming language and test framework.

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

Here, we execute the special `cf-docker-test-reporting` image as a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/). The important point is that this image searches for `allure-results` in its working directory. This is why we pass `/codefresh/volume/` as the working directory as this is the parent folder of the test results.

The required environment variables are:
 * `BUCKET_NAME`, the name of the bucket that you created in your cloud provider. Multiple pipelines can use the same bucket.
 * `CF_STORAGE_INTEGRATION`, the name of the cloud integration you created in the Codefresh UI.

If you used another directory name, you can configure the test reporting step to include `ALLURE_DIR`, as in the example below:

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


Once that is done, the results are uploaded to Codefresh infrastructure. You can access
the report for any build by clicking **Test Report** to the right of each build.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/test-report-button.png" 
url="/images/pipeline/test-reports/test-report-button.png"
alt="Test report button" 
caption="Test report button"
max-width="80%"
%}

Note that behind the scenes, Codefresh automatically handles Allure history for you. For each test run, Codefresh finds the historical results from previous runs, and recreates them. Codefresh handles all folders inside the storage bucket, so make sure not to tamper with them. Make sure also that the account/role you are using for the bucket has delete privileges.

## Using the custom mode for generic reporting

If you don't want to use Allure or wish to create some other kind of report, you can use the alternative mode for the Codefresh reporting step.

Here is an example for a custom reporting step via [Mocha](https://mochajs.org/){:target="\_blank"}. The reports are placed in the folder `/codefresh/volume/demochat/mochawesome-report`.


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

The environment variables are:
 * `BUCKET_NAME`, the name of the bucket that you created in your cloud provider.
 * `CF_STORAGE_INTEGRATION`, the name of the cloud integration you created in the Codefresh UI.
 * `REPORT_PATH`, the subfolder name in the bucket for each test report.
   * Data is saved to the bucket in following path: `{bucketName}/{pipelineId}/{REPORT_PATH}/{branchName}/{buildId}/`
 * `REPORT_DIR`, the name of the folder to be uploaded.
 * `REPORT_INDEX_FILE`, the name of file to serve as the index file.

In the above example, we define a non-Allure report directory and the file that serves as the index file.  
Here is the result:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/mocha-tests.png" 
url="/images/pipeline/test-reports/mocha-tests.png"
alt="Custom reporting" 
caption="Custom reporting"
max-width="70%"
%}

In a similar manner, you can upload reports from any other custom tool you have in your pipeline.

If your report is only one file, simply use the `REPORT_INDEX_FILE` environment variable on its own, as below:

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

In the typical scenario, the tests are run, the results are collected and saved in a folder, and then Codefresh creates the report.

If something goes wrong with the actual tests, once the Codefresh reporting step runs, it actually picks the old reports from the previous build. Remember that everything that is placed in the Codefresh volume is not only shared between build steps, but also persists between different builds of the same pipeline for caching purposes.

If that is a problem for you, pass the extra `CLEAR_TEST_REPORT` environment variable to the reporting step. This deletes the previous test results once uploaded, so are not available to the subsequent build.  

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

>In the Allure reporting mode, the test results are automatically cleared by Codefresh. There is no need to manually define the `CLEAR_TEST_REPORT` variable.

## Creating multiple reports

You can create multiple reports from a single pipeline. As an example, you can create
a single pipeline that creates two reports, one for code coverage, and the other one for security vulnerabilities.

To achieve this, you only need to repeat the variables mentioned in this article with an index number that matches them to the report, `REPORT_DIR.0`, `REPORT_DIR.1`, `REPORT_DIR.2` and so on.

The following variables can be indexed:
 * `REPORT_DIR`
 * `REPORT_INDEX_FILE`
 * `ALLURE_DIR`
 * `CLEAR_TEST_REPORT`
 * `REPORT_TYPE` (explained later on)

Here is an example of a pipeline that creates two reports, one for code coverage, and one for unit tests. Notice the index number (`.0` and `.1`) used in the variables.
 

{% highlight yaml %}
{% raw %}
 unit_test_reporting_step:
   title: Upload Mocha test reports
   image: codefresh/cf-docker-test-reporting
   working_directory: /codefresh/volume/demochat/
   environment:
      - BUCKET_NAME=codefresh-test-report
      - CF_STORAGE_INTEGRATION=testReporting
      - REPORT_DIR.0=coverage
      - REPORT_INDEX_FILE.0=lcov-report/index.html
      - REPORT_TYPE.0=coverage
      - ALLURE_DIR.1=allure-results
      - REPORT_TYPE.1=allure
{% endraw %}
{% endhighlight %}

This is the top-level HTML file created by the reporting step:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/multiple-test-reports.png" 
url="/images/pipeline/test-reports/multiple-test-reports.png"
alt="Multiple test reports" 
caption="Multiple test reports"
max-width="60%"
%}

The icons shown are specified by the `REPORT_TYPE` variable. The following options are possible: `allure, mocha, spock, coverage, junit, testng, cucumber, pytest, rspec, phpunit, nunit, spectest`.

If you don't provide a `REPORT_TYPE`, Codefresh uses a default icon.


## Getting results from tests that fail

By default, if unit tests fail, the pipeline stops execution. If you want the pipeline to keep running even if the tests fail,
add the [fail_fast property]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#execution-flow) to the pipeline and set it to `false`.  

Here is an example:

{% highlight yaml %}
{% raw %}
  RunMyUnitTests:
    image: node:latest
    title: Running my UnitTests 
    fail_fast: false
    commands:
    - npm run test
{% endraw %}
{% endhighlight %}

The pipeline continue its run, and any steps later in the pipeline that collect reports, also run as usual, with access to test results.

## Marking the whole pipeline as failed if tests failed

When you use the `fail_fast:false` property in your pipeline, the pipeline "succeeds" even if the tests fail, because test results are essentially ignored.

To fail the pipeline when tests fail, use [conditional execution]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/).

As the last step in your pipeline, add the following step:

{% highlight yaml %}
{% raw %}
  MarkMyPipelineStatus:
    image: alpine:latest
    title: Marking pipeline status
    commands:
    - echo "Unit tests failed"
    - exit 1
    when:
      condition:
        all:
          myCondition: RunMyUnitTests.result == 'failure'
{% endraw %}
{% endhighlight %}

This step checks the result of your unit tests, and stops the whole pipeline by exiting with an error, if the tests fail.
Replace `RunMyUnitTests` with the name of your step that runs unit tests. 

Here is a full pipeline example:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  RunMyUnitTests:
    image: alpine:latest
    title: Running my UnitTests that will fail
    fail_fast: false
    commands:
    - exit 1 #simulate test fail
  CollectingMyTestresults:
    image: alpine:latest
    title: Collecting test results
    commands:
    - echo "collecting/copy test results"  
  MarkMyPipelineStatus:
    image: alpine:latest
    title: Checking Unit test result
    commands:
    - echo "Unit tests failed, marking the whole pipeline as failed"
    - exit 1
    when:
      condition:
        all:
          myCondition: RunMyUnitTests.result == 'failure'
{% endraw %}
{% endhighlight %}

If you run this pipeline, you will see:

1. The `RunMyUnitTests` will fail but the pipeline will continue
1. The `CollectingMyTestresults` step will always run even if tests fail
1. The `MarkMyPipelineStatus` step will mark the whole pipeline as failed

## Running the test reporting step in parallel mode

Test reporting works well with the [parallel pipeline mode]({{site.baseurl}}/docs/pipelines/advanced-workflows/), where each step
is evaluated any time there is a change in the workflow. 

Here is how you can define the test reporting step to run regardless of pipeline result:

{% highlight yaml %}
{% raw %}
 unit_test_reporting_step:
   [...]
   when:
     condition:
       any:
         mySuccessCondition: workflow.status == 'success'
         myFailureCondition: workflow.status == 'failure'
{% endraw %}
{% endhighlight %}

See [handling errors in a pipeline]({{site.baseurl}}/docs/pipelines/advanced-workflows/#handling-error-conditions-in-a-pipeline) for more details.



## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Parallel workflows in pipelines]({{site.baseurl}}/docs/pipelines/advanced-workflows/)  

