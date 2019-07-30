---
title: "Spring Boot 2"
description: "Create Docker images for Spring/Maven"
excerpt: ""
group: learn-by-example
sub_group: java
redirect_from:
  - /docs/spring-boot-2/
  - /docs/java/spring-boot-2/
toc: true
---

Spring Boot is quickly becoming a very popular choice for building Java back-end applications, and is a bit different compared to traditional application servers, since it includes a servlet container in the final JAR file allowing
for self-contained Java Archives (JAR files).

Codefresh can easily handle Spring Boot applications that are dockerized either in the traditional way or using multi-stage builds.

## The example Java project

You can see the example project at [https://github.com/codefresh-contrib/spring-boot-2-sample-app](https://github.com/codefresh-contrib/spring-boot-2-sample-app). The repository contains a Spring Boot 2 project built with Maven with the following goals

* `mvn package` creates a jar file that can be run on its own (exposes port 8080). It also runs unit tests.
* `mvn verify` runs integration tests as well. The application is launched locally as part of the Maven lifecycle.

Once launched the application presents a simple message at localhost:8080 and also at the various `/actuator/health` endpoints. You can use the standard `spring-boot:run` command to run it locally (without Docker).

## Spring Boot 2 and Docker

A Dockerfile is also provided at the same repository. It uses the base JRE image and just copies the JAR file inside the container.

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM java:8-jre-alpine

EXPOSE 8080

RUN mkdir /app
COPY target/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/spring-boot-application.jar"]

{% endraw %}
{% endhighlight %}

This means that _before_ building the Docker image, the compilation step (`mvn package`) is expected to be finished already. Therefore, in the `codefresh.yml` file we need at least two steps. The first one should prepare the JAR file and the second
one should create the Docker image.

### Create a CI pipeline for Spring

The repository also contains a premade [Codefresh YAML file]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) that you can use as a starting point in your own Spring Boot 2 projects.

Here are the full contents of the file.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - test
  - integration
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/spring-boot-2-sample-app'
    revision: master
    git: github
  MyUnitTests:
    title: Compile/Unit test
    stage: test
    image: 'maven:3.5.2-jdk-8-alpine'
    commands:
      - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository package
  Integration:
    title: Integration test
    stage: integration
    image: maven:3.5.2-jdk-8-alpine
    commands:
     - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository verify      
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: build
    image_name: spring-boot-2-sample-app
    working_directory: ./
    tag: 'non-multi-stage'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

The pipeline starts by checking out the code using a [git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/). The next two steps are [freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/), while the last one is a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/).

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/java/spring-boot-steps.png" 
url="/images/learn-by-example/java/spring-boot-steps.png" 
alt="Spring boot pipeline"
caption="Spring boot pipeline"
max-width="80%" 
%}

After checking out the code we use the standard [Maven Docker image](https://hub.docker.com/_/maven/) to compile the Spring Boot source code and create a JAR file. We also pass a parameter that changes the Maven cache location folder. The reason for this parameter is that the default Maven location is `/root/.m2` which is defined as a volume (and thus discarded after each build).

### Caching the Maven dependencies

Codefresh is smart enough that [caches automatically]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#how-caching-works-in-codefresh) for us the workspace of a build (`/codefresh/volume`). This works great for build tools that keep their cache in the project folder, but not for Maven/Gradle which keep their cache externally. By changing the location of the Maven use on the project folder (the `m2_repository` name is arbitrary) we make sure that Codefresh will cache automatically the Maven libraries resulting in much faster builds.

The next step is similar to the previous one, but this time we run integration tests. We define again a custom cache folder so when you run the build you will see that Maven will automatically pick the cache from the previous step. All Codefresh steps in a pipeline [run on the same workspace]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps), so the build results from one step are visible to the next.

>Notice that because the [Maven lifecycle](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html) also executes the previous steps in a build, the `mvn verify` command essentially will run `mvn package` as well. In theory we could just have the _Integration_ step in this pipeline on its own. That step would build the code, run unit and integration tests all in one stage. For demonstration purposes however, we include two steps so that you can see the correct usage of Maven cache.

The Spring Boot 2 project is setup so that the `verify` phase automatically starts the application, runs the integration tests and stops it. This is defined in the [pom.xml](https://github.com/codefresh-contrib/spring-boot-2-sample-app/blob/master/pom.xml#L81) with the standard Maven lifecycle bindings.

The last step is a Docker build. We name our image **spring-boot-2-sample-app** and tag it with a string `non-multi-stage` but of course you can use any other tag name that you wish.

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/java/spring-boot-docker-image.png" 
url="/images/learn-by-example/java/spring-boot-docker-image.png" 
alt="Spring Boot Docker image" 
caption="Spring Boot Docker image"
max-width="80%" 
%}

Once the pipeline is finished you will see the Spring Boot 2 Docker image in the [Codefresh Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) (or any other registry that you have linked within Codefresh).

## Spring Boot 2 and Docker (multi-stage builds)

Docker added [multi-stage builds](https://blog.docker.com/2017/07/multi-stage-builds/) at version 17.05. With multi-stage builds a Docker build can use one base image for compilation/packaging/unit tests and a different one that will hold the runtime of the application. This makes the final image more secure and smaller in size (as it does not contain any development/debugging tools).

In the case of Java, multistage builds allow for the compilation itself to happen during the build process, even though the final Docker image will not contain a full JDK.

The example project has a second branch called `multi-stage-docker` that contains the same source code but a different Dockerfile and codefresh.yml.

Here is the multi-stage build definition:

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
COPY pom.xml /tmp/
RUN mvn -B dependency:go-offline -f /tmp/pom.xml -s /usr/share/maven/ref/settings-docker.xml
COPY src /tmp/src/
WORKDIR /tmp/
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml verify

FROM java:8-jre-alpine

EXPOSE 8080

RUN mkdir /app
COPY --from=MAVEN_TOOL_CHAIN /tmp/target/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/spring-boot-application.jar"]

{% endraw %}
{% endhighlight %}

This docker build does the following:

1. Starts from the standard Maven Docker image
1. Copies only the `pom.xml` file inside the container
1. Runs a mvn command to download all dependencies found in the `pom.xml`
1. Copies the rest of the source code in the container
1. Compiles the code, runs unit tests and then integration tests (with `mvn verify`)
1. Discards the Maven image with all the compiled classes/unit test results etc.
1. Starts again from the JRE image and copies **only** the JAR file created before

The order of the steps is tuned so that it takes advantage of the layer caching built-in to Docker.
If you change something in the source code Docker already has a layer with Maven dependencies so they
will not be re-downloaded again. Only if you change the `pom.xml` file itself, Docker will start again from the lowest layer.

Again, we define a custom location for the Maven cache (using the `settings-docker.xml` file). This way the Maven dependencies are placed inside the container and they will be cached automatically with the respective layer (Read more about this technique [at the official documentation](https://github.com/carlossg/docker-maven#packaging-a-local-repository-with-the-image)).

### Create a CI pipeline for Spring (multi-stage Docker builds)

Because in multi-stage builds Docker itself handles most of the build process, moving the project to Codefresh is straightforward. We just need [a single step](https://github.com/codefresh-contrib/spring-boot-2-sample-app/blob/multi-stage-docker/codefresh.yml) that creates the Docker image after checking out the code.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/spring-boot-2-sample-app'
    revision: multi-stage-docker
    git: github
  BuildingDockerImage:
    title: Building Docker Image
    stage: build
    type: build
    image_name: spring-boot-2-sample-app
    working_directory: ./
    tag: 'multi-stage'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

This will compile/test/package the Spring Boot application and create a Docker image. Codefresh is automatically caching
Docker layers (it uses the Docker image of a previous build as a cache for the next) and therefore builds will become
much faster after the first one finishes.


## What to read next

* [Gradle example]({{site.baseurl}}/docs/learn-by-example/java/gradle/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)



