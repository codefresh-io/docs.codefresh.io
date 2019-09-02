---
title: "CI/CD pipeline Examples"
description: "A collection of examples for Codefresh pipelines"
group: yaml-examples
redirect_from:
  - /docs/examples-v01/
  - examples.html
  - /docs/catalog-examples/
toc: true
---
Codefresh enables you to define the steps of your pipeline in a [YAML file]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/). By default, the file is named `codefresh.yml`, and is located in the root directory of the repository.

## Programming Language specific

Codefresh is agnostic as far as programming languages are concerned. All major programming languages are supported:

- [Go Web App]({{site.baseurl}}/docs/learn-by-example/golang/golang-hello-world/) or [Go CLI]({{site.baseurl}}/docs/learn-by-example/golang/goreleaser) 
- [Spring Java app with Maven]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/) or [Gradle]({{site.baseurl}}/docs/learn-by-example/java/gradle/)
- Node [Express.js App]({{site.baseurl}}/docs/learn-by-example/nodejs/lets-chat/) or [React.js App]({{site.baseurl}}/docs/learn-by-example/nodejs/react/)
- [Php App]({{site.baseurl}}/docs/learn-by-example/php)
- [Python Django App]({{site.baseurl}}/docs/learn-by-example/python/django/)
- [Ruby On Rails App]({{site.baseurl}}/docs/learn-by-example/ruby/)
- [Scala App]({{site.baseurl}}/docs/learn-by-example/scala/scala-hello-world/)
- [Android (Mobile)]({{site.baseurl}}/docs/learn-by-example/mobile/android/)

## Checking out source code

You can checkout code from one or more repositories in any pipeline phase. Codefresh includes [built-in GIT integration]({{site.baseurl}}/docs/integrations/git-providers/) with all the popular GIT providers and can be used with [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) steps.

- [Cloning Git repositories using the built-in integration]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/)
- [Cloning Git repositories using manual Git commands]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout-custom/)
- [Checking out from Subversion, Perforce, Mercurial, etc ]({{site.baseurl}}/docs/yaml-examples/examples/non-git-checkout/)

## Build/Package

Codefresh has native support for [building]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) and [pushing]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) Docker containers.

- [Build an Image with the Dockerfile in Root Directory]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-dockerfile-in-root-directory/)
- [Build an Image by Specifying the Dockerfile Location]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-specify-dockerfile-location)
- [Build an Image from a Different Git Repository]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-from-a-different-git-repository)
- [Build and Push an Image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image)
- [Build an Image With Build Arguments]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-with-build-arguments)
- [Shared Volumes Between Builds]({{site.baseurl}}/docs/yaml-examples/examples/shared-volumes-between-builds)
- [Get Short SHA ID and Use it in a CI Process]({{site.baseurl}}/docs/yaml-examples/examples/get-short-sha-id-and-use-it-in-a-ci-process)


## Testing

Codefresh has support for both [unit]({{site.baseurl}}/docs/testing/unit-tests/) and [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) as well as [test reporting]({{site.baseurl}}/docs/testing/test-reports/).

- [Run Unit Tests]({{site.baseurl}}/docs/yaml-examples/examples/run-unit-tests) 
- [Run Unit Tests with Composition]({{site.baseurl}}/docs/yaml-examples/examples/run-unit-tests-with-composition) 

- [Run Integration Tests]({{site.baseurl}}/docs/yaml-examples/examples/run-integration-tests/) 
- [Run Integration Tests with Composition]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-composition/) 
- [Run Integration Tests with Database]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-database/) 
- [Run Integration Tests with MongoDB]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mongo/) 
- [Run Integration Tests with MySQL]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mysql/) 
- [Run Integration Tests with PostgreSQL]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-postgres/) 
- [Run Integration Tests with Redis]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-redis/) 

- [Shared volumes of service from composition step for other yml steps]({{site.baseurl}}/docs/yaml-examples/examples/shared-volumes-of-service-from-composition-step-for-other-yml-steps)
- [Launch Composition]({{site.baseurl}}/docs/yaml-examples/examples/launch-composition) 
- [Launching a Composition and Defining a Service Environment Variables using a file]({{site.baseurl}}/docs/yaml-examples/examples/launching-a-composition-and-defining-a-service-environment-variables-using-a-file) 
- [Populate a Database with Existing Data]({{site.baseurl}}/docs/yaml-examples/examples/populate-a-database-with-existing-data) 

## Deployment

Codefresh can deploy to any platform such as VMs, FTP/SSH/S3 sites, app servers but of course it has great support for [Kubernetes clusters]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) and [Helm releases]({{site.baseurl}}/docs/new-helm/helm-releases-management/):

- [Deploy Demochat to a Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-demochat-example/) 
- [Use kubectl as part of Freestyle step]({{site.baseurl}}/docs/yaml-examples/examples/use-kubectl-as-part-of-freestyle-step) 
- [Deploy with Helm]({{site.baseurl}}/docs/yaml-examples/examples/helm) 
- [Deploy with Terraform]({{site.baseurl}}/docs/yaml-examples/examples/terraform) 
- [Deploy with Pulumi]({{site.baseurl}}/docs/yaml-examples/examples/pulumi) 
- [Deploy to Nomad]({{site.baseurl}}/docs/yaml-examples/examples/nomad)

## Notifications

- [Sending the notification to Slack]({{site.baseurl}}/docs/yaml-examples/examples/sending-the-notification-to-slack)
