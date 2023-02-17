---
title: "CI Example catalog"
description: "A collection of CI examples for Codefresh pipelines"
group: example-catalog
redirect_from:
  - /docs/yaml-examples/examples/
  - /docs/learn-by-example/scala/
  - /docs/learn-by-example/python/
  - /docs/learn-by-example/nodejs/
  - /docs/learn-by-example/mobile/
  - /docs/learn-by-example/java/
  - /docs/learn-by-example/golang/
  - /docs/learn-by-example/cc/
  - /docs/examples-v01/
  - examples.html
  - /docs/catalog-examples/
  - /docs/examples/
  - /docs/pipelines-examples/  
  - /docs/pipelines/pipelines-examples/
toc: true
---
Codefresh enables you to define the steps of your pipeline in a [YAML file]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/). By default, the file is named `codefresh.yml`, and is located in the root directory of the repository.

### Programming-language specific examples

Codefresh is agnostic as far as programming languages are concerned. All major programming languages are supported:

- [Go Web App]({{site.baseurl}}/docs/example-catalog/ci-examples/golang-hello-world/) or [Go CLI]({{site.baseurl}}/docs/example-catalog/ci-examples/goreleaser) 
- [Spring Java app with Maven]({{site.baseurl}}/docs/example-catalog/ci-examples/spring-boot-2/) or [Gradle]({{site.baseurl}}/docs/example-catalog/ci-examples/gradle/). Also how to [upload JAR to Nexus/Artifactory]({{site.baseurl}}/docs/example-catalog/ci-examples/publish-jar/) 
- Node [Express.js App]({{site.baseurl}}/docs/example-catalog/ci-examples/lets-chat/) or [React.js App]({{site.baseurl}}/docs/example-catalog/ci-examples/react/)
- [Php App]({{site.baseurl}}/docs/example-catalog/ci-examples/php)
- [Python Django App]({{site.baseurl}}/docs/example-catalog/ci-examples/django/)
- [Ruby On Rails App]({{site.baseurl}}/docs/example-catalog/ci-examples/ruby)
- [C]({{site.baseurl}}/docs/example-catalog/ci-examples/c-make/) or [C++]({{site.baseurl}}/docs/example-catalog/ci-examples/cpp-cmake)
- [Rust]({{site.baseurl}}/docs/example-catalog/ci-examples/rust/) 
- [C# .NET core]({{site.baseurl}}/docs/example-catalog/ci-examples/dotnet/)
- [Scala App]({{site.baseurl}}/docs/example-catalog/ci-examples/scala-hello-world/)
- [Android (Mobile)]({{site.baseurl}}/docs/example-catalog/ci-examples/android/)
- [NodeJS + Angular2 + MongoDB]({{site.baseurl}}/docs/example-catalog/ci-examples/nodejs-angular2-mongodb/) 

### Source code checkout examples

You can check out code from one or more repositories in any pipeline phase. Codefresh includes [built-in GIT integration]({{site.baseurl}}/docs/integrations/git-providers/) with all the popular GIT providers and can be used with [git-clone]({{site.baseurl}}/docs/pipelines/steps/git-clone/) steps.

- [Cloning Git repositories using the built-in integration]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/)
- [Cloning Git repositories using manual Git commands]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout-custom/)
- [Checking out from Subversion, Perforce, Mercurial, etc]({{site.baseurl}}/docs/example-catalog/ci-examples/non-git-checkout/)

### Build/push examples

Codefresh has native support for [building]({{site.baseurl}}/docs/pipelines/steps/build/) and [pushing]({{site.baseurl}}/docs/pipelines/steps/push/) Docker containers.  
You can also compile traditional applications that are not Dockerized yet.

- [Build an Image with the Dockerfile in root directory]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-with-the-dockerfile-in-root-directory/)
- [Build an Image by specifying the Dockerfile location]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-specify-dockerfile-location)
- [Build an Image from a different Git repository]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-from-a-different-git-repository)
- [Build and Push an Image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image)
- [Build an Image with build arguments]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-with-build-arguments)
- [Share data between steps]({{site.baseurl}}/docs/example-catalog/ci-examples/shared-volumes-between-builds)
- [Upload or download from a Google Storage Bucket]({{site.baseurl}}/docs/example-catalog/ci-examples/uploading-or-downloading-from-gs/)
- [Get Short SHA ID and use it in a CI process]({{site.baseurl}}/docs/example-catalog/ci-examples/get-short-sha-id-and-use-it-in-a-ci-process)
- [Call a CD pipeline from a CI pipeline]({{site.baseurl}}/docs/example-catalog/ci-examples/call-child-pipelines)

### Unit and integration test examples

Codefresh has support for both [unit]({{site.baseurl}}/docs/testing/unit-tests/) and [integration]({{site.baseurl}}/docs/testing/integration-tests/) tests, as well as [test reporting]({{site.baseurl}}/docs/testing/test-reports/).

- [Run unit tests]({{site.baseurl}}/docs/example-catalog/ci-examples/run-unit-tests) 
- [Run integration tests]({{site.baseurl}}/docs/example-catalog/ci-examples/run-integration-tests/) 
- [Run integration tests with MongoDB]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mongo/) 
- [Run integration tests with MySQL]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mysql/) 
- [Run integration tests with PostgreSQL]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-postgres/) 
- [Run integration tests with Redis]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-redis/) 
- [Populate a database with existing data]({{site.baseurl}}/docs/example-catalog/ci-examples/populate-a-database-with-existing-data) 
- [Shared volumes of service from composition step for other yml steps]({{site.baseurl}}/docs/example-catalog/ci-examples/shared-volumes-of-service-from-composition-step-for-other-yml-steps)
- [Launch Composition]({{site.baseurl}}/docs/example-catalog/ci-examples/launch-composition) 
- [Launch Composition and define Service Environment variables using a file]({{site.baseurl}}/docs/example-catalog/ci-examples/launching-a-composition-and-defining-a-service-environment-variables-using-a-file) 
- [Run multiple kinds of unit tests using fan-in-fan-out parallel pipeline]({{site.baseurl}}/docs/example-catalog/ci-examples/fan-in-fan-out) 

### Code coverage examples

- [Run coverage reports with Codecov]({{site.baseurl}}/docs/example-catalog/ci-examples/codecov-testing) 
- [Run coverage reports with Coveralls]({{site.baseurl}}/docs/example-catalog/ci-examples/coveralls-testing) 
- [Run coverage reports with Codacy]({{site.baseurl}}/docs/example-catalog/ci-examples/codacy-testing) 

### Secrets examples

Codefresh can automatically export secret key-value pairs using the Vault plugin from the [Step Marketplace](https://codefresh.io/steps/step/vault){:target="\_blank"}.

- [Vault secrets in the Pipeline]({{site.baseurl}}/docs/example-catalog/ci-examples/vault-secrets-in-the-pipeline/)
- [Decryption with Mozilla SOPS]({{site.baseurl}}/docs/example-catalog/ci-examples/decryption-with-mozilla-sops/)
- [GitOps with Bitnami sealed secrets]({{site.baseurl}}/docs/example-catalog/cd-examples/gitops-secrets)

### Notification examples

- [Send notification to Slack]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-slack)
- [Send notification to Jira]({{site.baseurl}}/docs/example-catalog/ci-examples/sending-the-notification-to-jira)


