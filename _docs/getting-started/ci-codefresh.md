---
title: "Codefresh for CI"
description: "Continuous integration (CI) with Codefresh pipelines"
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

Work in progress 


## Docker images
WBuilding a Docker image from the source code is probably the most common and  basic requirement for a CI pipeline. In Codefresh you can build, push, and promote Docker images, using declarative YAML and credentials that are defined once stored centrally.

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


## Code compilation
TBD

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



## Code quality coverage
Good quality code is central to any CI platform or tool. Codefresh integrates with the top code quality platforms/tools in the market to track code coverage, inspect code quailty, and generate code-coverage analysis reports. 

Three steps to 
* Set up integrations with the platforms/tools (Coverall, SonarQube, Codecov, for example). 
* Copy and paste the ready-to-use step for your platform/tool into your pipeline from our [Plug-ins library](https://codefresh.io/steps/){:target="\_blank"}.
* Reference them by name in the pipeline step, and view the updated reports in the respective UIs.

See:  
[Code coverage examples]({{site.baseurl}}/docs/example-catalog/examples/#code-coverage-examples)


