---
title: "SonarQube scanning"
description: "Trigger a SonarQube Analysis from Codefresh"
group: testing
redirect_from:
  - /docs/integrations/sonarqube-integration/
toc: true
---

[SonarQube](https://www.sonarqube.org/){:target="\_blank"} is a popular platform for Code Quality. It can be used for static and dynamic analysis of a codebase to detect common code issues such as bugs and vulnerabilities. 


{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/sonarqube-logo.png" 
url="/images/testing/sonarqube/sonarqube-logo.png" 
alt="SonarQube logo" 
max-width="40%" 
%}

There are many ways to perform an [analysis with SonarQube](https://docs.sonarqube.org/latest/setup/overview/){:target="\_blank"}, but the easiest way is to use one that matches the build system of your application.

This article shows how to use the [SonarQube plugin](https://codefresh.io/steps/step/sonar-scanner-cli){:target="\_blank"} on Codefresh from the plugin directory. Once it is set up, your code is automatically analysed everytime your pipeline runs.  

## Prerequisites for SonarQube scanning

Before starting an analysis, you need to have a:

 * Simple [Codefresh pipeline up and running]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/)
 * SonarQube account (Developer, Enterprise, or on the [SonarCloud](https://sonarcloud.io/){:target="\_blank"})

## Get a security token from SonarQube

To use the SonarQube plugin, you need to provide your login credentials in your Codefresh pipeline or generate a security token. We recommend the latter. You can either create a new token or reuse an existing one. Security-wise, it is best if each project has its own token.

1. Log in into your account in SonarQube.
1. Navigate to **USER > MY ACCOUNT**, which is on the top-right corner of your profile. 
1. Select the **Security** tab, and generate the security token. 
1. Save the token where you can access it again easily.

{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/generate-token.png" 
url="/images/testing/sonarqube/generate-token.png" 
alt="SonarQube generate token" 
max-width="50%" 
%}

## Set up sonar-project.properties file

Set up a `sonar-project.properties` file in our root directry. This is needed as not all environment variables are currently [automatically defined](https://github.com/SonarSource/sonar-scanner-cli-docker/pull/50){:target="\_blank"} in the SonarScanner. 

1. Create a `sonar-project.properties` file.
1. Add the following values:

{% highlight yaml %}
# must be unique in a given SonarQube instance
sonar.projectKey=a unique project key
 
# project name
sonar.projectName=your project's name
{% endhighlight %}

The file is needed to run the SonarQube plugin.

**Language-specific settings**  
Note that projects using specific languages may require additional configuration. For more information, see the appropriate language page in the [Sonarqube documentation](https://docs.sonarqube.org/latest/analysis/languages/overview/){:target="\_blank"}.


## Run an analysis from the Codefresh Plugin

If you are using the predefined Codefresh pipeline, you just need to look-up SonarQube under `STEPS` and you will find the custom plugin.

{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/simplified-codefresh-pipeline.png" 
url="/images/testing/sonarqube/simplified-codefresh-pipeline.png" 
alt="SonarQube analysis for predefined Codefresh steps" 
max-width="80%" 
%}

* Select the `sonar-scanner-cli`
* Copy and past the step to your pipeline
* Customise the values within the step as follows:
  * `SONAR_HOST_URL: 'https://sonarcloud.io/'` # this is the URL to SonarCloud, if applicable, please replace it with the Server URL
  * `SONAR_LOGIN: username` or access token (generated above)
  * `SONAR_PASSWORD: password` if username is used
  * `SONAR_PROJECT_BASE_DIR: set working directory for analysis`
  * `SONAR_SCANNER_CLI_VERSION: latest`
* Save and run your pipeline.  


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

## View the SonarQube analysis

Once the Codefresh build starts, check the logs and monitor the progress of the analysis.

{% include image.html 
lightbox="true" 
file="/images/testing/sonarqube/analysis-log.png" 
url="/images/testing/sonarqube/analysis-log.png" 
alt="SonarQube analysis" 
max-width="80%" 
%}

Once the analysis is complete, go to the SonarQube dashboard and see the recent analysis of the project.

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

## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Unit testing]({{site.baseurl}}/docs/testing/unit-tests/)  
[Integration testing]({{site.baseurl}}/docs/testing/integration-tests/)  
