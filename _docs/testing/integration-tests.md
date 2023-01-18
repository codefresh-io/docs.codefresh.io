---
title: "Integration tests"
description: "Launch additional services in Codefresh pipelines"
group: testing
redirect_from:
  - /docs/testing/integration-tests/
  - /docs/integration-tests/
  - /docs/integration-test-script/
  - /docs/testing/run-unit-test-with-db-composition/
  - /docs/run-unit-test-with-db-composition/  
toc: true
---

Simple [unit tests]({{site.baseurl}}/docs/testing/unit-tests/) that rely only on the source code of the application, are very easy to execute in Codefresh, using only [freestyle steps]({{site.baseurl}}/docs/pipelines/steps/freestyle/). For integration tests however, you usually need to launch either the application itself, or one or more external services, such as a database.

Codefresh offers two ways of launching sidecar containers (similar to `docker compose`) within the pipeline:

1. [Compositions]({{site.baseurl}}/docs/pipelines/steps/composition/) is the old (but still supported) way
1. [Service containers]({{site.baseurl}}/docs/pipelines/service-containers/) is the new and more flexible way

For brand-new pipelines, we suggest you use service containers.  
They are much more flexible than compositions in these areas:
1. Guaranteeing the order of service launch and their dependencies (a feature that is not even offered by vanilla `docker compose`).
1. Using a special Docker image to preload data to a database, or otherwise initialize a service before running tests.
1. Attaching service containers to the whole pipeline instead of individual steps .
1. Auto-mounted Codefresh [shared volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) for freestyle steps (unlike compositions), making file access very easy. You can execute your tests from the Git repository that was cloned.

>This article explains how to run additional services that are automatically discarded once the pipeline has completed its run. If you are interested in temporary test environments, see the [preview environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/).

## How integration tests work in Codefresh

* Service containers and `docker compose`  
  Service containers work similar to `docker compose`. A set of containers are launched on the same network with configurable hostnames and ports. Once they are up, you decide what to do, with a freestyle step that is part of the network as well. In the most typical pipeline, you can use your existing testing framework, regardless of the programming language, in the same manner as you would run your tests locally.

* No hard-coded hostnames  
  A best practice is to make sure that the hostnames used by your integration tests to access external services are not hard-coded. Even though with Codefresh you can decide on the hostnames used in the pipeline, that is, the hostname of a MySQL or Redis instance, in the long run, it is better if you can choose that information freely without being limited to and by what is specified in the source code.

* No `localhost` for an API endpoint  
  Make sure that your tests do **NOT** use `localhost` for an API endpoint. This technique does not work with `docker compose`, and will not work with Codefresh either.  
  Instead, use the hostname defined in the `docker-compose/codefresh.yml` file. For example, if you launch a MySQL service at hostname `my_db`, then your tests should use `my_db:3306` as a target.  
  Even better, make the hostname completely configurable with an environment variable so that you can change it within the Codefresh pipeline at will.  
  Basically, make sure that your integration tests work fine with `docker compose` locally on your workstation, before converting them to a Codefresh pipeline.

>The services you launch in a Codefresh pipeline consume resources (memory/CPU) from the pipeline's runtime environment. The more services you launch, the less resources you have for the actual pipeline. We also suggest that you do **NOT** use service containers for load or performance testing. 

## Running integration tests directly from source code

The simplest way to run integration tests is to check out the source code of your tests and launch the services that they need.

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/from-source-code.png"
  url="/images/testing/integration-testing/from-source-code.png"
  alt="Testing directly from source code"
  caption="Testing directly from source code"
  max-width="70%"
%}

This is a very popular way of running integration tests but not the most flexible one. It works only when your tests have very simple requirements on their testing environment. It also doesn't make a clear distinction on source code that gets shipped to production with source code that is used only for testing. Make sure that you don't fall into the common trap of shipping testing tools with your Docker container in production.  

Here is the pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-npm-example"
    revision: "master"
    git: github
  my_deps:
    image: 'node:11'
    title: "Download Deps"
    commands:
      - 'npm install'
  my_tests:
    image: 'node:11'
    title: "Integration tests"
    commands:
      - 'npm test'
    services:
      composition:
        my_redis:
          image: 'redis:latest'
          ports:
            - 6379
{% endraw %}      
{% endhighlight %}

We suggest using this technique only if your application is not Dockerized yet, that is, you don't deploy it with a Docker image to production.

See more examples with [MySQL]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mysql/), or [Postgres]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-postgres/).

## Running tests after launching the application

A better approach, that mimics what happens in reality, is to launch your application as a Docker image, and then run tests against it. This approach is only possible if you have adopted containers as deployment artifacts:

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/to-app.png"
  url="/images/testing/integration-testing/to-app.png"
  alt="Launching the application to be tested"
  caption="Launching the application to be tested"
  max-width="70%"
%}

This technique is only limited by your pipeline resources.  
If you have not adopted microservices, it might be difficult to launch a huge monolith as part of a Codefresh pipeline (remember that service containers use the same resources as the pipeline).  
But for simple applications, this method ensures that your tests actually hit the running application.

Here is the pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-java-example"
    revision: "master"
    git: github
  build_app_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-java-app"
    tag: "master"
    dockerfile: "Dockerfile"
  my_tests:
    image: 'maven:3.5.2-jdk-8-alpine'
    title: "Integration tests"
    commands:
      - 'mvn -Dmaven.repo.local=/codefresh/volume/m2_repository integration-test'
    services:
      composition:
        my_postgres:
          image: 'postgres:11.5'
          ports:
            - 5432
        app:
          image: '${{build_app_image}}'
          ports:
            - 8080      
{% endraw %}      
{% endhighlight %}

See more examples in [launching the application]({{site.baseurl}}/docs/example-catalog/ci-examples/run-integration-tests/), or [Postgres]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-postgres/).

## Using a custom test image

In all the previous examples, the integration tests ran in a public Dockerhub image that has the programming language/framework that your tests require. In more complex cases, you might need to create your own Docker image that contains exactly the tools that you wish.

In this case, you can create a special Docker image that will be used just for testing and nothing else.

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/special-image.png"
  url="/images/testing/integration-testing/special-image.png"
  alt="Using a dedicated testing image"
  caption="Using a dedicated testing image"
  max-width="70%"
%}

It is very easy to create a test image as part of a pipeline and then reference it for integration tests.  
Here is the pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-app-example"
    revision: "master"
    git: github
  build_app_image:
    title: "Building App Docker Image"
    type: "build"
    image_name: "my-web-app"
    tag: "master"
    dockerfile: "Dockerfile"    
  build_test_image:
    title: "Building Test Docker Image"
    type: "build"
    image_name: "my-test-image"
    tag: "master"
    dockerfile: "Dockerfile.testing"
  my_tests:
    image: '${{build_test_image}}'
    title: "Integration tests"
    commands:
      - 'sh ./my-tests.sh'
    services:
      composition:
        my_postgres:
          image: 'postgres:11.5'
          ports:
            - 5432
        app:
          image: '${{build_app_image}}'
          ports:
            - 8080      
{% endraw %}      
{% endhighlight %}

This is the recommended way to run integration tests in Codefresh. It creates a clear distinction between the source code that gets shipped to production and the source code that is needed only for tests. It also allows you to define what the test environment will look like (maybe you need multiple or exotic testing tools that are not available in Docker Hub).

See more examples using a separate testing image [for the application]({{site.baseurl}}/docs/example-catalog/ci-examples/run-integration-tests/) or [a MySQL instance]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mysql/).

## Integration tests for microservices

If you have enough pipeline resources, you can keep adding service containers that form a complex running environment. Service containers support [launch dependency order]({{site.baseurl}}/docs/pipelines/service-containers/#checking-readiness-of-a-service) as well as [post-launch phases]({{site.baseurl}}/docs/pipelines/service-containers/#preloading-data-to-databases), making them feasible for any complex infrastructure you have in mind.

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/complex-tests.png"
  url="/images/testing/integration-testing/complex-tests.png"
  alt="Microservice testing"
  caption="Microservice testing"
  max-width="70%"
%}

Here is the pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-app-example"
    revision: "master"
    git: github
  build_frontend_image:
    title: "Building Frontend Docker Image"
    type: "build"
    image_name: "my-web-app"
    working_directory: './frontend'
    tag: "master"
    dockerfile: "Dockerfile"
  build_backend_image:
    title: "Building Backend Docker Image"
    type: "build"
    image_name: "my-backend-app"
    working_directory: './backend'
    tag: "master"
    dockerfile: "Dockerfile"        
  build_test_image:
    title: "Building Test Docker Image"
    type: "build"
    image_name: "my-test-image"
    tag: "master"
    dockerfile: "Dockerfile.testing"
  my_tests:
    image: '${{build_test_image}}'
    title: "Integration tests"
    commands:
      - 'sh ./my-tests.sh'
    services:
      composition:
        my_postgres:
          image: 'postgres:11.5'
          ports:
            - 5432 
        redis_ds:
          image: 'redis:latest'
          ports:
            - 6379           
        backend:
          image: '${{build_backend_image}}'
          ports:
            - 9000
        frontend:
          image: '${{build_frontend_image}}'
          ports:
            - 8080            
{% endraw %}      
{% endhighlight %}

Keep in mind that extra services use memory from the pipeline itself, so if you follow this route, make sure that the pipeline runs in the appropriate runtime environment.

## Running service containers for the whole pipeline

In most cases service containers should be only attached to the pipeline step that uses them.

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/single-scope.png"
  url="/images/testing/integration-testing/single-scope.png"
  alt="Service containers for individual steps"
  caption="Service containers for individual steps"
  max-width="60%"
%}

Doing so not only helps with pipeline resources (as service containers are discarded when they are not needed), but also allows you to mix and match different service containers for different steps.

Here is an example pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-app-example"
    revision: "master"
    git: github
  build_backend_image:
    title: "Building Backend Docker Image"
    type: "build"
    image_name: "my-backend-app"
    working_directory: './backend'
    tag: "master"
    dockerfile: "Dockerfile"
  backend_tests:
    image: 'maven:3.5.2-jdk-8-alpine'
    title: "Running Backend tests"
    commands:
      - 'mvn -Dmaven.repo.local=/codefresh/volume/m2_repository integration-test'
    services:
      composition:         
        backend:
          image: '${{build_backend_image}}'
          ports:
            - 9000     
  build_frontend_image:
    title: "Building Frontend Docker Image"
    type: "build"
    image_name: "my-web-app"
    working_directory: './frontend'
    tag: "master"
    dockerfile: "Dockerfile"            
  my_tests:
    image: 'node:11'
    title: "Running front-end tests"
    commands:
      - 'npm test'
    services:
      composition:
        frontend:
          image: '${{build_frontend_image}}'
          ports:
            - 8080            
{% endraw %}      
{% endhighlight %}

In some cases however, you would like to execute multiple steps with integration tests that share the same environment. In this case
you can also launch service containers at the beginning of the pipeline to make them available to all pipeline steps:

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/multi-scope.png"
  url="/images/testing/integration-testing/multi-scope.png"
  alt="Service containers for the whole pipeline"
  caption="Service containers for the whole pipeline"
  max-width="60%"
%}

You can use this technique by putting the service container definition [at the root of the pipeline]({{site.baseurl}}/docs/pipelines/service-containers/#running-services-for-the-duration-of-the-pipeline) instead of within specific step.  

Here is an example that follows this technique:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_database
  composition:
    my-redis-ds:
      image: redis:latest
      ports:
        - 6379
    my_postgres:
      image: 'postgres:11.5'
      ports:
        - 5432
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-app-example"
    revision: "master"
    git: github
  build_app_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-web-app"
    tag: "master"
    dockerfile: "Dockerfile"
  my_api_tests:
    image: '${{build_app_image}}'
    title: "Running API tests"
    commands:
      - 'npm run test'
  my_fuzzy_tests:
    image: 'node:11'
    title: "Fuzzy testing"
    commands:
      - 'npm run fuzzy-tests' 
  my_e2e_tests:
    image: cypress/base
    title: "Running E2E tests"
    commands:
      - 'cypress run'     
{% endraw %}      
{% endhighlight %}

The Redis and PostgreSQL instances are now available to all pipeline steps. Read all about test results and graphs in [test reports]({{site.baseurl}}/docs/testing/test-reports/).


## Creating test reports

All the techniques shown above are also applicable to test reports.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/sample-test-report.png" 
url="/images/pipeline/test-reports/sample-test-report.png"
alt="Sample Allure test report" 
caption="Sample Allure test report"
max-width="70%"
%}


## Related articles  
[Service containers]({{site.baseurl}}/docs/testing/unit-tests/)  
[Run integration tests with MongoDB]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mongo/)    
[Run integration tests with MySQL]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mysql/)  
[Run integration tests with PostgreSQL]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-postgres/)  
[Run integration tests with Redis]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-redis/)  
[Run unit tests]({{site.baseurl}}/docs/example-catalog/ci-examples/run-unit-tests)
