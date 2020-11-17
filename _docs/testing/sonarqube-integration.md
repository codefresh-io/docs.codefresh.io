---
title: "SonarQube Scanning"
description: "How to trigger a SonarQube Analysis from Codefresh"
group: testing
redirect_from:
  - /docs/integrations/sonarqube-integration/
toc: true
---

[SonarQube](https://www.sonarqube.org/) is a popular platform for Code Quality. It can be used for static and dynamic analysis of a codebase and can detect common code issues such as bugs and vulnerabilities. 


{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/sonarqube-logo.png" 
url="/images/testing/sonarqube/sonarqube-logo.png" 
alt="SonarQube logo" 
max-width="40%" 
%}

There are many ways to perform an [analysis with SonarQube](https://docs.sonarqube.org/latest/setup/overview/) but the easiest one would be to use the one that matches the build system of your application.

This section shows how to use the [SonarQube plugin](https://codefresh.io/steps/step/sonar-scanner-cli) on Codefresh from the plugin directory. Once set-up your code will automatically be analysed everytime your pipeline runs.  

## Prerequisites for SonarQube integration

Before starting an analysis, you need to make sure that:

 * You have at least a simple [Codefresh pipeline up and running](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
 * You have a SonarQube account (Developer, Enterprise, or on the [SonarCloud](https://sonarcloud.io/))

## Getting a security token from SonarQube

To use the SonarQube plugin, you will need to provide your login credentials in your Codefresh Pipeline or you generate a security token. We recommend the latter. You can either create a new one or reuse an existing one. Security wise it is best if each project has its own token.

Login into SonarQube with your account and navigate to *USER -> MY ACCOUNT*, which is on the top right corner of your profile. Next, select the *Security* tap and generate the security token. Save the token somewhere where you will be able to access it again easily.

{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/generate-token.png" 
url="/images/testing/sonarqube/generate-token.png" 
alt="SonarQube generate token" 
max-width="50%" 
%}

## Setting up your sonar-project.properties file

Not all environment variables are currently [automatically defined](https://github.com/SonarSource/sonar-scanner-cli-docker/pull/50) in the SonarScanner. Thus, we have to set-up a `sonar-project.properties` file in our root directry.

Please create the file and add the following values

{% highlight yaml %}
# must be unique in a given SonarQube instance
sonar.projectKey=a unique project key
 
# organization name
sonar.organization=your organisation name
{% endhighlight %}

The file is needed to run the SonarQube plugin.

## Running an analysis from the Codefresh Plugin

If you are using the predefined Codefresh pipeline you just need to look-up SonarQube under `STEPS` and you will find the custom plugin.

{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/simplified-codefresh-pipeline.png" 
url="/images/testing/sonarqube/simplified-codefresh-pipeline.png" 
alt="SonarQube analysis for predefined Codefresh steps" 
max-width="80%" 
%}

* Select the `sonar-scanner-cli`
* Copy and past the step to your pipeline

Please customise the values within the step as follows:
* SONAR_HOST_URL: 'https://sonarcloud.io/' # this is the URL to SonarCloud, if applicable, please replace it with the Server URL
* SONAR_LOGIN: username or access token (generated above)
* SONAR_PASSWORD: password if username is used
* SONAR_PROJECT_BASE_DIR: set working directory for analysis
* SONAR_SCANNER_CLI_VERSION: latest

Here is our example step:

{% highlight yaml %}
 sonarqube:
    type: "sonar-scanner-cli"
    stage: "push"
    arguments:
      SONAR_HOST_URL: 'https://sonarcloud.io/' # replace with your host url
      SONAR_LOGIN: "insert access token" # replace with your access token
      SONAR_PROJECT_BASE_DIR: "/codefresh/volume/sonarqube-example" #r eplace with your working directory
      SONAR_SCANNER_CLI_VERSION: "latest"
{% endhighlight %}

Once the values are specified, save and run your pipeline.

## Viewing the SonarQube analysis

Once the Codefresh build is started you can check the logs and monitor the analysis progress.

{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/analysis-log.png" 
url="/images/testing/sonarqube/analysis-log.png" 
alt="SonarQube analysis" 
max-width="80%" 
%}

Once the analysis is complete you can visit the SonarQube dashboard and see the recent analysis of the project.

{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/sonar-project.png" 
url="/images/testing/sonarqube/sonar-project.png" 
alt="SonarQube project" 
max-width="80%" 
%}

Then you can drill down and view the various statistics.

{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/sonar-analysis-details.png" 
url="/images/testing/sonarqube/sonar-analysis-details.png" 
alt="SonarQube Analysis details" 
max-width="80%" 
%}

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Unit tests]({{site.baseurl}}/docs/testing/unit-tests/)
* [Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)
