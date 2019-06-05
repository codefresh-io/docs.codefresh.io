---
title: "Security Scanning"
description: "How to scan for vulnerabilities with Codefresh pipelines"
group: testing
toc: true
---

[SonarQube](https://www.sonarqube.org/) is a popular platform for Code Quality. It can be used for static and dynamic analysis of a codebase and can detect
common code issues such as bugs and vulnerabilities. 




## Security scanning strategies

Before starting an analysis you need to make sure that: 




## Existing security integrations

First you need a security token to allow remote access to SonarQube. You can either create a new one or reuse an existing one. Security wise it is best if each project has its own token.


## Security annotations

If you are using the predefined Codefresh pipeline you just need to enter the SonarQube steps in your unit test stage.
Assuming that your project has already a Dockerfile that uses Maven to compile code, all you need to do is copy-paste the SonarQube commands into the Unit tests stage in Codefresh

{% include image.html 
lightbox="true" 
file="/images/testing/security-scanning/security-annotations.png" 
url="/images/testing/security-scanning/security-annotations.png" 
alt="Security annotations" 
caption="Security annotations" 
max-width="80%" 
%}

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Parallel workflows]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)