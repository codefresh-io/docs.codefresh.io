---
title: "Codecov coverage reports"
description: "How to forward coverage reports to Codecov"
group: example-catalog
sub_group: ci-examples
toc: true
---

[Codecov account](https://codecov.io/){:target="\_blank"} is a code analysis tool with which users can group, merge, archive, and compare coverage reports. Code coverage describes which lines of code were executed by the test suite and which ones were not. However, this is not to be confused with a testing tool.

Analysis reports displayed within the Codecov dashboard:
{% include image.html 
lightbox="true" 
file="/images/testing/codecov/analysis-report.png" 
url="/images/testing/codecov/analysis-report.png" 
alt="Codecov UI Analysis reports" 
max-width="50%" 
%}

## Prerequisites for using Codecov

* A simple [Codefresh pipeline up and running](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
* A [Codecov account](https://codecov.io/){:target="\_blank"} (free or enterprise)
* A testing tool added to your project that produces coverage reports

Note that reports should ideally be written in .json, .xml, or txt. To be sure, please double check that your coverage [report format](https://docs.codecov.io/docs/supported-report-formats){:target="\_blank"} is supported. You can find a variety of examples for different programming languages and suggestions for respective testing tools in the [Codecov docs](https://docs.codecov.io/docs/supported-languages){:target="\_blank"}.

To test Codecov and follow along with the next section, you can clone our [Codecov sample app](https://github.com/codefresh-contrib/codecov-sample-app){:target="\_blank"}.

## Create a Codecov account

Once you sign up to Codecov, you can add a new repository. The UI will then provide you with an access token to the repository. While it is recommended that you take note of the token, you will still be able to access it within the **Settings** tap.

{% include image.html 
lightbox="true" 
file="/images/testing/codecov/codecov-interface.png" 
url="/images/testing/codecov/codecov-interface.png" 
alt="Codecov Project Repository UI" 
max-width="50%" 
%}

## Codefresh pipeline

In this case, we divided testing and connecting Codefresh to Codecov into two different steps. If they can be run within the same image, you could also connect them. 

**Testing step**
Runs the command(s) for our testing tool. This will generate the code coverage report upon running the pipeline. Please refer to the Codecov documentation for [supported testing frameworks](https://docs.codecov.io/docs/supported-report-formats){:target="\_blank"}. The [README of each example](https://docs.codecov.io/docs/supported-languages){:target="\_blank"} refers to possible frameworks that can be used.

In general, ensure that the framework you use for testing and generating code coverage reports:
* Produce code coverage reports in the supported file format
* Is compatible with the programming language that your program is written in

{% highlight yaml %}
{% raw %}
 test:
    title: "Running test"
    type: "freestyle" # Run any command
    image: "node:14.19.0" # The image in which command will be executed
    working_directory: "${{clone}}" # Running command where code cloned
    commands:
      - "npm install --save-dev jest"
      - "npx jest --coverage"
    stage: "test"
{% endraw %}
{% endhighlight %}

**Codecov step**

{% highlight yaml %}
{% raw %}
upload:
      title: "Running test"
      type: "freestyle" # Run any command
      image: "node:14.19.0" # The image in which command will be executed
      working_directory: "${{clone}}" # Running command where code cloned
      commands:
        - "ci_env=`curl -s https://codecov.io/env`"
        - "npm install codecov -g"
        - "codecov -t ${{CODECOV_TOKEN}} -f ./coverage/clover.xml"
      stage: "upload"
{% endraw %}
{% endhighlight %}

The commands run inside of the node Docker image:
* `ci_env= curl -s https://codecov.io/env`: Sets the CI environment variable to take note that we are using Codefresh
* `npm install codecov -g`: Installs the odecov CLI
* `codecov -t ${{CODECOV_TOKEN}} -f ./coverage/clover.xml`: Sets the Codevoc access token provided in the UI when we connect to a new Git repository and point to the file that contains our coverage report.

Once you run the pipeline, the steps will create the coverage report and forward it to Codecov.

{% include image.html 
lightbox="true" 
file="/images/testing/codecov/codecov-pipeline.png" 
url="/images/testing/codecov/codecov-pipeline.png" 
alt="Pipeline with codecov step" 
max-width="50%" 
%}

## View reports

You can view the updated coverage reports within the Codecov UI every time you make a commit and/or run the Codefresh pipeline directly.

{% include image.html 
lightbox="true" 
file="/images/testing/codecov/codecov-report.png" 
url="/images/testing/codecov/codecov-report.png" 
alt="Pipeline with codecov step" 
max-width="50%" 
%}

You can access further information on the coverage report by opening the link to the file displayed in the table.

{% include image.html 
lightbox="true" 
file="/images/testing/codecov/codecov-report-details.png" 
url="/images/testing/codecov/codecov-report-details.png" 
alt="Codecov report details" 
max-width="50%" 
%}

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Unit tests]({{site.baseurl}}/docs/testing/unit-tests/)  
[Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)  
[Sonarqube Integration]({{site.baseurl}}/docs/testing/sonarqube-integration/) 

