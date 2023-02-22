---
title: "Codefresh for CI"
description: "See what Codefresh offers for Continuous integration (CI) with pipelines"
group: getting-started
toc: true
---

Codefresh is a Continuous Integration/Delivery solution. This article reviews main concepts around CI, and how Codefresh supports and implements them.  

For a review of CD concepts, see [Codefresh for CD]({{site.baseurl}}/docs/getting-started/cd-codefresh/).



## Code compilation

The basic function of a CI system is to compile/package source code. Codefresh is language-agnostic as far as programming languages are concerned. Codefresh works equally well with compiled languages (Java, Go, C/C++), as well as interpreted languages (Python, PHP, Ruby).

The only requirement is that you either use an existing Docker image as a step in your pipeline or create your own with the exact versions of tools that you need.

You can find several Docker images for all popular programming languages or you can create your own if you use an exotic programming language.

## Docker images

Building a Docker image from the source code is probably the most common and basic requirement for a CI pipeline. In Codefresh, you can build, push, and promote Docker images, using declarative YAML and credentials that are defined once and stored centrally for reuse.

**Build and push image**  
Building a Dockerfile in a pipeline works in the same way as building the Dockerfile locally on your workstation. The `build` step in Codefresh enables you to build a Docker image in a completely declarative manner, and to automatically push it to your default Docker registry without any additional configuration.  

See:    
[Build and push Docker images]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  


**View image**  
The Images dashboard displays images from all registries connected to Codefresh. Every image is enriched with Git branch, Git hash and commit message, and other tags defined for the image. 

See:    
[Viewing Docker images]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#viewing-docker-images)



**Promote image**  
Promote images either from the Codefresh UI, or automatically from pipelines by specifying an existing image in the pipeline step. Promote an image by copying it from one registry to another. 

See:    
[Promoting Docker images]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#viewing-docker-images)




## Unit testing
Codefresh supports all testing frameworks, including mock-frameworks, for all popular programming languages. Easily run unit tests on the source code of the application for every commit or pull request (PR) through our `freestyle` pipeline step. 

Run any type of unit tests in Codefresh pipelines, from smoke tests in a dockerfile, to tests with external or application images for simple applications, and on a special testing image for complex applications.
Create test reports and view them whenever you need. 

See:  
[Run unit tests example]({{site.baseurl}}/docs/example-catalog/ci-examples/run-unit-tests/)


## Integration testing
Compared to unit tests that run on the source code, integration tests run on the application itself. You need to either launch the application itself, or one or more external services such as a database.  

In Codefresh, you can launch these sidecar containers within the pipeline through compositions and service containers.


See [Run integration tests example]({{site.baseurl}}/docs/example-catalog/ci-examples/run-integration-tests/).

## Code quality/coverage
Good quality code is central to any CI platform or tool. Codefresh integrates with the top code quality platforms/tools in the market to track code coverage, inspect code quality, and generate code-coverage analysis reports. 

Implement code quality coverage in Codefresh pipelines through these steps: 
* Set up integrations with the platforms/tools (Coverall, SonarQube, Codecov, for example). 
* Copy and paste the ready-to-use step for your platform/tool into your pipeline from our [Plug-ins library](https://codefresh.io/steps/){:target="\_blank"}.
* Reference them by name in the pipeline step, and view the updated reports in the respective UIs.

See [Code coverage examples]({{site.baseurl}}/docs/example-catalog/examples/#code-coverage-examples).  

## Linting/validating

Linting and validation tools which perform static analysis on source code or other resources are also integral parts of pipelines. Codefresh pipelines can use any linter tool that is bundled with a Docker image. 

Codefresh can also validate files that are not source-code, such as markup-language files (XML/YAML/JSON), and infrastructure files (Terraform, or Kubernetes resource files).  

As most static analysis tools are CLI-based, they can be easily used in a Codefresh pipeline.

## Security scanning
Security scans are critical to deploying quality code. Codefresh allows you to also control when to implement the security scan, and then view the scan results in the Codefresh UI, without having to go to the security platform.  

**Security scan platforms**  
Codefresh can integrate with any security scanning platform that scans source code or Docker images for vulnerabilities. We already have ready-to-use Docker images for several security platforms such as Anchore, Aqua Security, Clair, Twistlock and WhiteSource. For the full list, visit our [Plug-ins library](https://codefresh.io/steps/){:target="\_blank"}.

**Scan at any point**  
The security scan is implemented through a `freestyle` step, inserted anywhere in the pipeline. The fact that you can insert the step anywhere in the pipeline allows you to control when the scan is executed, for example, before the source code is packaged in a container, or before the container is stored in a registry or deployed to production, or any combination of the two.  

**View scan results**  
As with any scan, the final step is viewing the scan results. Attaching analysis reports to the pipeline build makes the scan results available in Codefresh release dashboards. 

**Security annotations**  
Correlate the Docker images in Codefresh with the results of the security scanning platform by adding annotations for custom metadata. For example, you can add annotations such as the number of issues or the URL of the full report.

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

See [Slack notifications in Codefresh]({{site.baseurl}}/docs/integrations/notifications/slack-intergration/), and [examples for Slack notification]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-slack/).

**Jira notifications**  
Codefresh integrates with Jira in several ways:
The standard integration provides the highest visibility into your GitOps deployments. Referencing the integration in your pipeline pulls in all the Jira information and enriches the image with the issue-tracking information.  

Our versatile [Jira Issue Manager](https://codefresh.io/steps/step/jira-issue-manager){:target="\_blank"} step can be used to create Jira issues, comment on existing Jira issues, change the status of an issue, and even add a description to your issue.  
 

See [Jira notifications in Codefresh]({{site.baseurl}}/docs/integrations/notifications/jira-integration/) and [examples for Jira notification]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-jira/).


## Related articles
[Codefresh for CD]({{site.baseurl}}/docs/getting-started/cd-codefresh/)  
[Codefresh for GitOps]({{site.baseurl}}/docs/getting-started/gitops-codefresh/)  
[Concepts in Codefresh]({{site.baseurl}}/docs/getting-started/concepts/)  






