---
title: "Service Containers"
description: "How to use sidecar services in your pipelines"
group: codefresh-yaml
toc: true
---

Sometimes you wish to run sidecar containers in a pipeline that offer additional services for your builds. The most common scenario is launching services such as databases in order to accommodate [integration tests]({{site.baseurl}}/docs/testing/integration-tests/). Or you might wish to launch the application itself in order to run integration tests **against** it as part of the pipeline.

>Note that while [composition steps]({{site.baseurl}}/docs/codefresh-yaml/steps/composition/) are still supported, the recommended way to run integrations tests going forward is with service containers.

Codefresh includes a handy mechanism (based on Docker compose) that can help you run sidecar containers along your main pipeline. Here is a very simple example.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_database
  composition:
    my-redis-db-host:
      image: redis:latest
      ports:
        - 6379     
steps:
  my_integration_tests:
    image: my-app-image
    title: Running integration tests
    commands:
      - npm run test
    services:
      - my_database
{% endraw %}      
{% endhighlight %}

This pipeline will run integration tests during the freestyle step called `my_integration_tests` and at that point a Redis instance will be available at hostname `my-redis-db-host` and port 6379. Note how in this example, the service container is placed at the root of the pipeline (as opposed to inside a specific step).  This ensures that the Redis instance is running for [the duration of the pipeline]({{site.baseurl}}/docs/codefresh-yaml/service-containers/#running-services-for-the-duration-of-the-pipeline).


## Viewing Service containers

The service containers have their own output tab in Codefresh UI

{% include image.html
  lightbox="true"
  file="/images/codefresh-yaml/services/services-tab.png"
  url="/images/codefresh-yaml/services/services-tab.png"
  alt="Output tab from extra services"
  caption="Output tab from extra services"
  max-width="100%"
    %} 

This way it is very easy to differentiate between the output logs of the step itself and its supporting container services.


## Launching multiple sidecar containers

Like Docker compose it is possible to launch multiple services this way. For example, let's say that a Java application needs both Redis and MongoDB during integration tests. Here is the respective pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_extra_services
  composition:
    my-redis-db-host:
      image: redis:latest
      ports:
        - 6379   
    my-mongo-db-host:
      image: mongo:latest
      ports:
        - 27017 
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-java-app"
    git: github
    revision: "master"
  my_tests:
    image: maven:3.5.2-jdk-8-alpine
    title: "Running Integration tests"
    commands:
      - 'mvn integration-test'
{% endraw %}      
{% endhighlight %}

The Redis instance will be available through the networks at `my-redis-db-host:6379` while the MongoDB instance will run at `my-mongo-db-host:27017`.

Instead of mentioning all your services directly in the YAML file you might also reuse an existing composition you have already defined in Codefresh by mentioning it by name.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_extra_services
  composition: redis_and_mongo
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-java-app"
    revision: "master"
    git: github
  my_tests:
    image: maven:3.5.2-jdk-8-alpine
    title: "Unit tests"
    commands:
      - 'mvn integration-test'
{% endraw %}      
{% endhighlight %}

This pipeline mentions an existing composition called `redis_and_mongo`:

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/existing-composition.png" 
url="/images/codefresh-yaml/existing-composition.png"
alt="Using an existing composition" 
caption="Using an existing composition"
max-width="70%"
%}

This makes very easy to reuse compositions that you have already defined for other reasons [in the Codefresh UI](https://codefresh.io/docs/docs/testing/create-composition/).


## Running services for the duration of the pipeline

Notice that unlike compositions, the services defined in the root of the pipeline yaml are present for the **whole** pipeline duration. They are available in all pipeline steps. This can be seen in the following example:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_database
  composition:
    my-redis-db-host:
      image: redis:latest
      ports:
        - 6379
steps:
  my_first_step:
    image: alpine:latest
    title: Storing Redis data
    commands:
      - apk --update add redis
      - redis-cli -u redis://my-redis-db-host:6379 -n 0 LPUSH mylist "hello world"  
      - echo finished
    services:
      - my_database
  my_second_step:
    image: alpine:latest
    commands:
      - echo "Another step in the middle of the pipeline"    
  my_third_step:
    image: alpine:latest
    title: Reading Redis data
    commands:
      - apk --update add redis
      - redis-cli -u redis://my-redis-db-host:6379 -n 0 LPOP mylist 
    services:
      - my_database      
{% endraw %}      
{% endhighlight %}

This pipeline:

1. Starts a single Redis instance
1. Saves some data in the first step on the pipeline
1. Runs an unrelated step (that itself is not using the redis instance)
1. Reads the data saved in the third steps

If you run this pipeline you will see that that data read in the third step of the pipeline was the same one as the data saved in the first step.

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/redis-example.png" 
url="/images/codefresh-yaml/redis-example.png"
alt="Redis read/write example" 
caption="Redis read/write example"
max-width="90%"
%}

This means that you can easily use the extra services in different steps of a single pipeline, without relaunching them each time (which is what happens with composition steps).

## Using sidecar services in specific steps

It is important to understand that any services you launch in a pipeline, are sharing its memory. If for example your pipeline has 4GBs of memory and your service (e.g. a mongdb instance) consumes 1GB, then you only have 3GB available for the actual pipeline.

It is therefore possible to a assign a service to a specific step if you don't wish to have it running for the duration of the whole pipeline:

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
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-java-app"
    dockerfile: "Dockerfile"
    tag: latest
  my_unit_tests:
    image: '${{build_image}}'
    title: "Unit tests"
    commands:
      - 'echo start testing my app'
    services:
      composition:
        my_redis_service:
          image: 'redis:latest'
          ports:
            - 6379
  my_integration_tests:
    image: '${{build_image}}'
    title: "Integration tests"
    commands:
      - 'echo start testing my app'
    services:
      composition:
        my_mongo_Service:
          image: 'mongo:latest'
          ports:
            - 27017  
{% endraw %}      
{% endhighlight %}

In this pipeline, the Redis instance is only launched during the Unit test step, while the MongoDB service is active only during integration tests. 

You can also use a `docker-compose.yml` file that you might have in your git repository.

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
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-java-app"
    dockerfile: "Dockerfile"
    tag: latest
  my_unit_tests:
    image: '${{build_image}}'
    title: "Unit tests"
    commands:
      - 'echo start testing my app'
    services:
      composition:
        my_redis_service:
          image: 'redis:latest'
          ports:
            - 6379
  my_integration_tests:
    image: '${{build_image}}'
    title: "Integration tests"
    commands:
      - 'echo start testing my app'
    services:
      composition: 'docker-compose.yml'
{% endraw %}      
{% endhighlight %}

Note that in this case the `docker-compose.yml` file must mention [specific images](https://docs.docker.com/compose/compose-file/#image) (and not use [build properties](https://docs.docker.com/compose/compose-file/#build)).


## Launching a custom service

So far all the examples of extra services used predefined docker images (i.e. Redis and Mongo). You are free however to launch any custom docker image you have already created or even the main application of the pipeline.

This happens by mentioning a build step as a service image. Here is an example:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-back-end"
    revision: "master"
    git: github
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-backend-app"
    tag: latest
    dockerfile: "Dockerfile"
  run_integration_tests:
    title: Test backend
    image: 'my-front-end:latest'
    commands:
      - 'curl my_backend_app:8080'
      - 'echo Backend is up. Starting tests'
      - npm run integration-test
    services:
      composition:
        my_backend_app:
          image: '${{build_image}}'
          ports:
            - 8080
{% endraw %}      
{% endhighlight %}

Here a Dockerfile for a backend application is built on the spot and then is launched as sidecar container in the next step (with a hostname of `my_backend_app`). Notice that the `image` property in the sidecar service actually refers to a [Codefresh variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) that holds the name of the build step.

We then run a `curl` command against the sidecar container to verify the correct health of the application. This is a great way to run integration tests against multiple micro-services.


## Checking readiness of a service

When you launch multiple services in your pipelines, you don't know exactly when they will start. Maybe they will be ready once you expect them, but maybe they take too long to start. For example if you use a MySQL database in your integration tests, your integration tests need to know that the database is actually up before trying to use it.

This is the same issue that is present in [vanilla Docker compose](https://docs.docker.com/compose/startup-order/). You can use solutions such as [wait-for-it](https://github.com/vishnubob/wait-for-it) to overcome this limitation, but Codefresh offers a better way in the form of *service readiness*.

With a readiness block you can guarantee that a sidecar service will be actually up before the pipeline will continue. Here is an example:


 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-back-end"
    revision: "master"
    git: github
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-backend-app"
    tag: latest
    dockerfile: "Dockerfile"
  run_integration_tests:
    title: Test backend
    image: 'my-front-end:latest'
    commands:
      # Backend is certainly up at this point.
      - npm run integration-test
    services:
      composition:
        my_backend_app:
          image: '${{build_image}}'
          ports:
            - 8080
      readiness:
        image: 'byrnedo/alpine-curl'
        timeoutSeconds: 30
        commands:
          - "curl my_backend_app:8080"       
{% endraw %}      
{% endhighlight %}


This is an improvement over the previous example because the healthcheck of the back-end is managed by Codefresh. The added `readiness` block makes sure that the back-end service is actually up before the integration tests start by using a `curl` command to check that `my_backend_app:8080` is up and running. Codefresh will run the commands defined in the `readiness` in a loop until they succeed. You are free to use any of your favorite commands there (ping, curl, nc etc) that check one or more services. We also define a timeout for the healthcheck. The `readiness` block supports the following options:

* `periodSeconds`: How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
* `timeoutSeconds`: Number of seconds after which the probe times out. Defaults to 10 seconds. Minimum value is 1.
* `successThreshold`: Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for readiness. Minimum value is 1.
* `failureThreshold`: failureThreshold times before giving up. In case of readiness probe the Pod will be marked Unready. Defaults to 3. Minimum value is 1

If you know already how [Kubernetes readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/) work, then these settings will be very familiar to you.

Here is another example where we use the `pg_isready` command to make sure that a PostgreSQL database is ready to accept connections
before we run the integration tests.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-rails-app"
    revision: "master"
    git: github
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-rails-app"
    tag: "latest"
    dockerfile: "Dockerfile"
  run_integration_tests:
    image: '${{build_image}}'
    commands:
      # PostgreSQL is certainly up at this point
      - rails db:migrate
      - rails test
    services:
      composition:
        my_postgresql_db:
          image: postgres:latest
          ports:
            - 5432 
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: 'postgres:latest'
        commands:
          - "pg_isready -h my_postgresql_db"   
{% endraw %}      
{% endhighlight %}

In summary `readiness` make sure that your services are actually up before you use them in a Codefresh pipeline.

## Preloading data to databases

A very common scenario when using databases in integration tests is the need to preload some test data in the database.
While you could do that in a normal pipeline step, sidecar services have a special `setup` block for this purpose. This way not only you can make sure that the database is up (using the `readiness` property explained in the previous section) but also that it is preloaded with the correct data.

To use this capability add a `setup` block in your pipeline service container:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-rails-app"
    revision: "master"
    git: github
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-rails-app"
    tag: "latest"
    dockerfile: "Dockerfile"
  run_integration_tests:
    image: '${{build_image}}'
    commands:
      # PostgreSQL is certainly up at this point and has the correct data
      - rails test
    services:
      composition:
        my_postgresql_db:
          image: postgres:latest
          ports:
            - 5432 
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: 'postgres:latest'
        commands:
          - "pg_isready -h my_postgresql_db"   
      setup:
        image: 'postgres:latest'
        commands:
          - "wget my-staging-server.exaple.com/testdata/preload.sql"
          - "psql -h my_postgresql_db < testdata/preload.sql" 
{% endraw %}      
{% endhighlight %}

Notice that in that case the sequence of events is the following

1. Codefresh will launch the container image(s) mentioned in the composition block
1. The `readiness` block will run until the service image is ready to accept connections
1. The `setup` block will run and preload data or setup any custom commands you have placed in the property
1. The actual pipeline step will now run with the service container attached in the same network.

## Accessing containers via localhost

Ideally, your application should be able to access other services by other DNS names that are fully configurable (this is a very good practice for [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) as well).

Sometimes, however, and especially in legacy applications, your application might be hardcoded to look at other services at `localhost`.
In that case, you can use the attribute `shared_host_network: true` on the services definition. Now all linked containers can access each other's services via localhost. Here is an example:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  my_first_step:
    image: goodsmileduck/redis-cli
    title: Storing Redis data
    commands:
      - apk add curl
      - 'redis-cli -u redis://localhost:6379 -n 0 LPUSH mylist "hello world"'
      - 'curl http://localhost:80'
      - echo finished
    services:
      shared_host_network: true
      composition:
        my_redis_service:
          image: 'redis:latest'
        my_nginx:
          image: nginx
{% endraw %}      
{% endhighlight %}

You can also do the same thing with top level services:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
services:
  name: my_database
  shared_host_network: true
  composition:
    my_redis_service:
      image: 'redis:latest'
    my_nginx:
      image: nginx
steps:
  my_first_step:
    image: goodsmileduck/redis-cli
    title: Storing Redis data
    commands:
      - apk add curl
      - 'redis-cli -u redis://localhost:6379 -n 0 LPUSH mylist "hello world"'
      - 'curl http://localhost:80'
      - echo finished
    services:
      - my_database
{% endraw %}      
{% endhighlight %}

Note: we do recommend you only use this option as a last resort. You should not hardcode "localhost" as a requirement in your services as
it adds extra constraints with integration tests (and especially with dynamic test environments).


## Limitations 

Service containers are not compatible with [custom pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/#limitations-of-custom-plugins).




## What to read next

* [Unit tests]({{site.baseurl}}/docs/testing/unit-tests/)
* [Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)
* [Integration test with database]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-database/)
* [Creating Compositions]({{site.baseurl}}/docs/on-demand-test-environment/create-composition/)








