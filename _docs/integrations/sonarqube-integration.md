---
title: "Sonarqube Integration"
description: "How to trigger a SonarQube Analysis from Codefresh"
group: integrations
toc: true
---

[SonarQube](https://www.sonarqube.org/) is a popular platform for Code Quality. It can be used for static and dynamic analysis of a codebase and can detect
common code issues such as bugs and vulnerabilities. 


{% include image.html 
lightbox="true" 
file="/images/integrations/sonarqube/sonarqube-logo.png" 
url="/images/integrations/sonarqube/sonarqube-logo.png" 
alt="SonarQube logo" 
max-width="40%" 
%}

There are many ways to perform an [analysis with SonarQube](https://docs.sonarqube.org/display/SCAN/Analyzing+Source+Code) but the easiest one would be to use the one that matches the build system of your application.

Since Docker images for all popular build systems already exist, Codefresh can easily start a code analysis by adding an additional step in the pipeline that runs the SonarQube scanner in the context of a Docker image.

## Prerequisites for SonarQube integration

Before starting an analysis you need to make sure that: 

 * You have an account on your SonarQube instance that can create new projects (and not just view them). Ask your SonarQube administrator if you are not sure about your privilages.
 * There is network connectivity between Codefresh and SonarQube. Codefresh needs to communicate with SonarQube in order to send the analysis results, so depending on your installation you might need to contact your network administrator

 SonarQube is also offered as a [Helm Chart](https://github.com/kubernetes/charts/tree/master/stable/sonarqube) so if you already have a Kubernetes cluster defined in Codefresh you can deploy SonarQube there as well. For *demonstration purposes only* it is also very easy to run SonarQube in a Codefresh Swarm demo environment.


## Getting a security token from SonarQube

First you need a security token to allow remote access to SonarQube. You can either create a new one or reuse an existing one. Security wise it is best if each project has its own token.

Login into SonarQube with your account and navigate to *Help -> Tutorials -> Analyze a new project* (click the question mark on the top right of the SonarQube interface.

{% include image.html 
lightbox="true" 
file="/images/integrations/sonarqube/generate-token.png" 
url="/images/integrations/sonarqube/generate-token.png" 
alt="SonarQube generate token" 
max-width="50%" 
%}

Enter a name for your project and click the generate button to obtain a token. This token will allow Codefresh to send information to SonarQube.

{% include image.html 
lightbox="true" 
file="/images/integrations/sonarqube/sonar-instructions.png" 
url="/images/integrations/sonarqube/sonar-instructions.png" 
alt="SonarQube analysis instructions" 
max-width="80%" 
%}

Then you can select the type of your project and SonarQube will present to you the exact commands you need to run in order to perform the analysis. Press the Copy button to copy them in your clipboard. We will use these commands later in the Codefresh Configuration.

## Running an analysis from Codefresh (built-in predefined steps)

If you are using the predefined Codefresh pipeline you just need to enter the SonarQube steps in your unit test stage.
Assuming that your project has already a Dockerfile that uses Maven to compile code, all you need to do is copy-paste the SonarQube commands into the Unit tests stage in Codefresh

{% include image.html 
lightbox="true" 
file="/images/integrations/sonarqube/simplified-codefresh-pipeline.png" 
url="/images/integrations/sonarqube/simplified-codefresh-pipeline.png" 
alt="SonarQube analysis for predefined Codefresh steps" 
max-width="80%" 
%}

The Sonar Maven plugin needs the same `pom.xml` file that is used for the main compilation so make sure that you run the command in the appropriate container folder that houses your application.



## Running an analysis from Codefresh (Custom YAML file)

If you are using a custom Codefresh YAML file, or if your container does not have access to Maven and other development tools, it is very easy to run the analysis using an external Maven Docker image.

Add another step in your pipeline that accesses a Maven image and runs the SonarQube steps. SonarQube requires access to the actual binaries (not just the source code) of the application to report code coverage. If your code is not already compiled by a previous pipeline step, you need to add an extra compilation step.

{% include image.html 
lightbox="true" 
file="/images/integrations/sonarqube/codefresh-yaml-sonar.png" 
url="/images/integrations/sonarqube/codefresh-yaml-sonar.png" 
alt="SonarQube analysis for custom Codefresh YAML" 
max-width="80%" 
%}

Here the `mvn package` command makes sure that SonarQube has access to both binaries and sources of the application.



## Viewing the SonarQube analysis

Regardless of the way that you start the SonarQube analysis, once the Codefresh build is started you can check the logs
and monitor the analysis progress.

{% include image.html 
lightbox="true" 
file="/images/integrations/sonarqube/analysis-log.png" 
url="/images/integrations/sonarqube/analysis-log.png" 
alt="SonarQube analysis" 
max-width="80%" 
%}

Once the analysis is complete you can visit the SonarQube dashboard and see the recent analysis of the project.

{% include image.html 
lightbox="true" 
file="/images/integrations/sonarqube/sonar-project.png" 
url="/images/integrations/sonarqube/sonar-project.png" 
alt="SonarQube project" 
max-width="80%" 
%}

Then you can drill down and view the various statistics.


{% include image.html 
lightbox="true" 
file="/images/integrations/sonarqube/sonar-analysis-details.png" 
url="/images/integrations/sonarqube/sonar-analysis-details.png" 
alt="SonarQube Analysis details" 
max-width="80%" 
%}