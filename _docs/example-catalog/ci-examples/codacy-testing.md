---
title: "Codacy coverage reports"
description: "How to forward coverage reports to Codacy"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/yaml-examples/examples/codacy-testing/
toc: true
---

[Codacy](https://www.codacy.com/){:target="\_blank"} is a code review tool that allows automatic analysis, code coverage tracking, and extensive reports, for you and your team to improve your code quality over time. 

Analysis reports displayed within Codacy dashboard:
{% include image.html 
lightbox="true" 
file="/images/testing/codacy/codacy-report.png" 
url="/images/testing/codacy/codacy-report.png"
alt="Codacy UI with coverage reports" 
max-width="100%" 
%}

## Prerequisites for using Codacy
* A simple [Codefresh pipeline, up and running]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/)
* A [Codacy account](https://www.codacy.com/){:target="\_blank"} (free, pro or enterprise)
* A testing tool added to your project that produces coverage reports

Codacy supports over [30 different language integrations](https://docs.codacy.com/getting-started/supported-languages-and-tools/){:target="\_blank"}. Depending on the programming language used, it requires little to no set-up.

You could try it out by cloning our [node example application](https://github.com/codefresh-contrib/codacy-sample-app){:target="\_blank"} that utilises [jest](https://jestjs.io/){:target="\_blank"}.

## Create an account with Codacy
Codacy has a free version, a pro version, and an on-premises version. The latter two have a free trial, which allows you to test all features over the course of two weeks. You can sign-up via GitHub, Bitbucket, or GitLab.

When you log into Codacy for the first time, it will ask you to provide access to a repository. At this stage, Codacy will not download any code from your repository but merely access its names. You can then either provide access to selective repositories or your entire git account.

{% include image.html 
lightbox="true" 
file="/images/testing/codacy/codacy-add-repo.png" 
url="/images/testing/codacy/codacy-add-repo.png" 
alt="Add repository to codacy" 
max-width="80%" 
%}

## Generate Project API token
To use Codacy, we need a project API token. To generate the token, select your project => go to settings => integrations => add integration => select “Project API”. Make sure that you select the API token from here and not your general project settings.

{% include image.html 
lightbox="true" 
file="/images/testing/codacy/create-api-token.png" 
url="/images/testing/codacy/create-api-token.png" 
alt="Create Project API token" 
max-width="80%" 
%}

## Codefresh pipeline

If the project you want to use Codacy in does not have a pipeline, [create a new pipeline]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/).

{% include image.html 
lightbox="true" 
file="/images/testing/codacy/create-codacy-pipeline.png" 
url="/images/testing/codacy/create-codacy-pipeline.png" 
alt="Create Codacy Pipeline" 
max-width="80%" 
%}

**Setting-up step**

This step is based on our [TypeScript application](https://github.com/codefresh-contrib/codacy-sample-app){:target="\_blank"}. Before we set up our pipeline, we will add our Project API token as our environment variable. Note that we have specified our token in the variables section on the right, as displayed in the following screenshot.

{% include image.html 
lightbox="true" 
file="/images/testing/codacy/codacy-variable.png" 
url="/images/testing/codacy/codacy-variable.png"
alt="Provide Codacy ENV variable" 
max-width="80%" 
%}

Once the variable is called through the [Codefresh YAML syntax]({{site.baseurl}}/docs/pipelines/variables/), it automatically uses the value provided within the variables section. If you are using this example as your pipeline, please delete anything in your pipeline. We can then add the following pipeline to our Inline YAML within the Workflow section in our UI:

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
    repo: "anais-codefresh/codacy-sample-app"
    # CF_BRANCH value is auto set when pipeline is triggered
    # Learn more at codefresh.io/docs/docs/pipelines/variables/
    revision: "${{CF_BRANCH}}"
    git: "github"
    stage: "clone"

  build:
    title: "Building Docker image"
    type: "build"
    image_name: "anaisurlichs/codacy-sample-app"
    working_directory: "${{clone}}"
    tag: "${{CF_BRANCH_TAG_NORMALIZED}}"
    dockerfile: "Dockerfile"
    stage: "build"
    registry: "dockerhub"

  tests:
      title: "Running test"
      type: "freestyle"
      working_directory: '${{clone}}'
      arguments:
        image: 'node:15.2'
        commands:
          - "npm install --save-dev jest"
          - "npm run test"
      stage: "test"
         
  codacy:
        title: "Pushing reports to codacy"
        type: "freestyle"
        working_directory: '${{clone}}'
        arguments:
          image: 'alpine:3.8'
          commands:
            - "export CODACY_PROJECT_TOKEN=${{CODACY_PROJECT_TOKEN}}"
            - "wget -qO - https://coverage.codacy.com/get.sh | sh"
        stage: "test"
{% endraw %}
{% endhighlight %}

The last two steps, ’tests’ and ’codacy’, are used to run our tests, create our coverage reports and forward those to Codacy. If you are using your own project and existing pipeline, add those two steps to your pipeline. In case you are using your own application, make sure to adapt the commands within the test step to run the tests of your application. Additionally, ensure that both the ’repo’ and the ’image_name’ point to your integrations.

Once you run the pipeline, the steps will create the coverage report and forwards it to Codacy.

{% include image.html 
lightbox="true" 
file="/images/testing/codacy/codacy-pipeline.png" 
url="/images/testing/codacy/codacy-pipeline.png" 
alt="Pipeline with Codacy step" 
max-width="80%" 
%}

## View reports

You can view the updated coverage reports within Codacy's UI every time you make a commit and/or run the Codefresh pipeline directly.

{% include image.html 
lightbox="true" 
file="/images/testing/codacy/codacy-report.png" 
url="/images/testing/codacy/codacy-report.png"
alt="Codacy UI Analysis Dashboard" 
max-width="80%" 
%}

You can access further information on the coverage report by opening the file tab and accessing a specific file from your repository.

{% include image.html 
lightbox="true" 
file="/images/testing/codacy/file-analysis.png" 
url="/images/testing/codacy/file-analysis.png" 
alt="Codacy report details" 
max-width="90%" 
%}

## Related articles
[CI pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Unit tests]({{site.baseurl}}/docs/testing/unit-tests/)  
[Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)  
[SonarQube Integration]({{site.baseurl}}/docs/testing/sonarqube-integration/)   
