---
title: "Codefresh for CI"
description: "See what Codefresh offers for Continuous integration (CI) with pipelines"
group: getting-started
toc: true
---

<!--Focus on: 
Building Docker images
Compiling code
Running unit tests
Running integration tests
Security scans
Code quality  -->

Codefresh is a Continuous Integration/Delivery solution. This article reviews main CI concepts and how Codefresh supports and implements them.



## Code compilation

The basic function of a CI system is to compile/package source code. As far as programming languages are concerned, Codefresh is language-agnostic. Codefresh works equally well with compiled languages (Java, Go, C/C++), as well as interpreted languages (Python, PHP, Ruby).

The only requirement is that you either use an existing Docker image as a step in your pipeline or create your own with the exact versions of tools that you need.

## Docker images
Building a Docker image from the source code is probably the most common and  basic requirement for a CI pipeline. In Codefresh you can build, push, and promote Docker images, using declarative YAML and credentials that are defined once stored centrally.

**Build and push image**  
Building a Dockerfile in a pipeline works in the same way as building the Dockerfile locally on your workstation. The `build` step in Codefresh enables you to build a Docker image in a completely declarative manner, and to automatically push it to your default Docker registry without any configuration.  

See:    
[Build and push Docker images]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  


**View image**  
The Images dashboard displays images from all registries connected to Codefresh. Every image is enriched with Git branch, Git hash and commit message, and any tags defined for the image. 

See:    
[Viewing Docker images]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#viewing-docker-images)



**Promote image**  
Promote an image by copying it from one registry to another. You can promote images either from the Codefresh UI, or automatically from pipelines by specifying an existing image in the pipeline step.

See:    
[Promoting Docker images]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#viewing-docker-images)




## Unit testing
Codefresh supports all testing frameworks, including mocking frameworks, for all popular programming languages. Easily run unit tests on the source code of the application for every commit or pull request (PR) through our freestyle step in pipelines. 

Run any type of unit tests in Codefresh pipelines, from smoke tests in a dockerfile, to tests with external or application images for simple applications, and evenrun them on a special testing image for complex applications.
You can create test reports and view them whenever you need. 

See:  
[Run unit tests example]({{site.baseurl}}/docs/example-catalog/ci-examples/run-unit-tests/)


## Integration testing
Compared to unit tests that run on the source code, integration tests run on the application itself. You need to either launch the application itself, or one or more external services such as a database.  
In Codefresh, you can launch these sidecar containers within the pipeline through compositions and service containers.


See:  
[Run integration tests example]({{site.baseurl}}/docs/example-catalog/ci-examples/run-integrations-tests/)

## Code quality coverage
Good quality code is central to any CI platform or tool. Codefresh integrates with the top code quality platforms/tools in the market to track code coverage, inspect code quailty, and generate code-coverage analysis reports. 

Implement code quality coverage in Codefresh pipelines through these steps: 
* Set up integrations with the platforms/tools (Coverall, SonarQube, Codecov, for example). 
* Copy and paste the ready-to-use step for your platform/tool into your pipeline from our [Plug-ins library](https://codefresh.io/steps/){:target="\_blank"}.
* Reference them by name in the pipeline step, and view the updated reports in the respective UIs.

See:  
[Code coverage examples]({{site.baseurl}}/docs/example-catalog/examples/#code-coverage-examples)

## Linting/validating

Linting and validation tools which perform static analysis on source code or other resources are also integral part of pipelines. Codefresh pipelines can use any linter tool that is bundled with a Docker image. Codefresh can also validate files that are not source-code, such as markup-language files (XML/YAML/JSON), infrastructure files (Terraform, or Kubernetes resource files).  

Most static analysis tools are CLI-based, and can be easily used in a Codefresh pipeline.

## Security scanning
Security scans are critical to deploying quality code. With Codefresh, in addition you can control when to implement the security scan, and then view the scan results in the Codefresh UI, without having to go to the security platform.  

**Security scan platforms**  
Codefresh can integrate with any security scanning platform that scans source code or Docker images for vulnerabilities. We already have ready-to-use Docker images for several security platforms such as Anchore, Aqua Security, Clair, Twistlock and WhiteSource. For the full list, visit our [Plug-ins library](https://codefresh.io/steps/){:target="\_blank"}.

**Scan timing in pipeline step**  
The security scan is implemented through a freestyle step, inserted anywhere in the pipeline. The fact that you can insert the step anywhere allows you to control when the scan is executed, for example, before the source code is packaged in a container, or before the container is stored in a registry or deployed to production, or any combination of these.

**View scan results**  
As with any scan, the final step is viewing the scan results. Make the scan results available in Codefresh release dashboards (Test Report button) by attaching analysis reports to the pipeline build. 

**Security annotations**  
Correlate the Docker images in Codefresh with the results of the security scanning platform by adding annotations for custom metatdata. For example, you can add annotations such as the number of issues or the URL of the full report.

See:  
[Security scanning tests]({{site.baseurl}}/docs/testing/security-scanning/)  
[Test reporting modes]({{site.baseurl}}/docs/testing/test-reports/)  
[Metadata in Docker images]({{site.baseurl}}/docs/pipelines//docker-image-metadata/) 


## Notifications
Codefresh supports status and event notifications, through email, Slack, and Jira.

**Pipeline build notifications**  
Every user can configure email notifications for pipeline builds, successful or failed builds. See [Email notifications for pipeline builds]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#email-notifications-for-pipeline-builds).   

**Slack notifications**  
Codefresh offers different levels of notifications for Slack. At the global level, Slack notifications are sent for all pipelines launched automatically through Git triggers. 
Our plugins enable granular notifications for specific pipelines.  

See [Slack notifications in Codefresh]({{site.baseurl}}/docs/integrations/notifications/slack-integration/), and [examples for Slack notification]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-slack/).

**Jira notifications**  
Codefresh integrates with Jira in several ways:
The standard integration provides the highest visibility into your GitOps deployments. Referencing the integration in your pipeline pulls in all the Jira information and enriches the image with the issue-tracking information.  
Our versatile [Jira Issue Manager](https://codefresh.io/steps/step/jira-issue-manager?__hstc=13221992.d6be31528e6c55e9c8e25cbf4f7ec143.1637822320970.1673765905554.1673785426249.294&__hssc=13221992.18.1673785426249&__hsfp=1203046529{:target="\_blank"} step can be used to create Jira issues, comment on existing Jira issues, change the status of an issue, and even add a description to your issue.  
 

See [Jira notifications in Codefresh]({{site.baseurl}}/docs/integrations/notifications/jira-integration/) and [examples for Jira notification]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-jira/).


## Continue with
[Codefresh for CD]({{site.baseurl}}/docs/getting-started/cd-codefresh/) 






