---
title: "Building Docker images"
description: "Create Docker images from Dockerfiles"
group: ci-cd-guides
redirect_from:
  - /docs/ci-cd-guides/building-docker-images/
toc: true
---

Codefresh has first-class Docker build support. You can build Docker images in your pipeline in a declarative manner using the [build step]({{site.baseurl}}/docs/pipelines/steps/build/).

>If your application is not deployed as a Docker image, see the [basic compilation/packaging guide]({{site.baseurl}}/docs/ci-cd-guides/packaging-compilation/) instead.

Building a Dockerfile in a pipeline works the same way as building the Dockerfile locally on your workstation.  
Your Dockerfile should be valid, and follow all the best practices such as:  
* Dockerfiles should be self-contained
* You should not have actions with side effects inside Dockerfiles
* You should have a proper `.dockerignore` file to minimize the Docker context size
* Dockerfile directives should be placed according to best practices for caching 

For more details, see also the [Caching in pipelines]({{site.baseurl}}/docs/pipelines/pipeline-caching/#distributed-docker-layer-caching).
 At the very least, you should understand and use [Docker multistage builds](https://docs.docker.com/develop/develop-images/multistage-build/){:target="\_blank"} (although Codefresh supports all kinds of Dockerfiles natively). Basically, if your Dockerfile is already optimized on your local workstation, it should also be optimized for Codefresh.

Codefresh uses the standard Docker daemon (or optionally Buildkit) behind the scenes, so if your Dockerfile has issues when you try to build it locally, it will have the same issues in a pipeline.

## Docker packaging strategies

There are many ways to create a Dockerfile, and most organizations typically follow a different path depending on the type of application they package.  
Brand-new applications are very easy to package into multistage Dockerfiles, while legacy/existing applications are adapted to dockerfiles that package an existing artifact.

We suggest spending some more time and creating multistage builds for all applications (even legacy ones).  
Explaining all virtues of multistage Docker builds is outside the scope of this article but in summary, multistage builds:

1. Are self-contained and self-describable
1. Result in a very small Docker image
1. Can be easily built by all project stakeholders, even non-developers
1. Are very easy to understand and maintain
1. Do not require a development environment, apart from the source code itself
1. Can be packaged with very simple pipelines, not only in Codefresh, but in other CI systems as well

Multi-stage builds are also essential in organizations that employ multiple programming languages. The ease of building a Docker image by anyone without the need for JDK/Node/Python/etc. cannot be overstated.

## Production-ready Docker images with multistage builds

If you have a multistage Dockerfile, then the respective pipeline in Codefresh is straightforward. You only need two pipeline steps:

1. A clone step to check out the source code
1. A build step to create the Docker image

For example, here is a [Java dockerfile]({{site.baseurl}}/docs/example-catalog/ci-examples/spring-boot-2/#spring-boot-2-and-docker-multi-stage-builds):

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
COPY pom.xml /tmp/
RUN mvn -B dependency:go-offline -f /tmp/pom.xml -s /usr/share/maven/ref/settings-docker.xml
COPY src /tmp/src/
WORKDIR /tmp/
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package

FROM java:8-jre-alpine

EXPOSE 8080

RUN mkdir /app
COPY --from=MAVEN_TOOL_CHAIN /tmp/target/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/spring-boot-application.jar"]

{% endraw %}
{% endhighlight %}

The Codefresh pipeline that builds this Dockerfile is the following:

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
    revision: master
    git: github     
  build_app_image:
    title: Building Docker Image
    type: build
    stage: build
    image_name: spring-boot-2-sample-app
    working_directory: ./
    tag: 'multi-stage'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

The beauty of this pipeline is that it is *exactly the same* for all multistage Dockerfiles regardless of the programming language that you use. So even if the Dockerfile was packaging a Node or Go application, the pipeline is oblivious to it.

{% include image.html 
lightbox="true" 
file="/images/guides/build-docker-images/multi-stage-pipeline.png" 
url="/images/guides/build-docker-images/multi-stage-pipeline.png" 
alt="Multi-stage Docker builds" 
caption="Multi-stage Docker builds"
max-width="100%" 
%}

You can find multistage build examples for other programming languages in the [example section]({{site.baseurl}}/docs/example-catalog/examples/).


## Creating self-contained Docker images 

Even though multistage Dockerfiles are the optimal way to build Docker images, Codefresh still supports "plain" Dockerfiles which do not have multiple stages.

As an example, this Dockerfile for a Python application is created from a single parent image (although we use the slim variant to make the final image size smaller).

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM python:3.6-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN pip install --upgrade pip
COPY requirements.txt /code/

RUN pip install -r requirements.txt
COPY . /code/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
{% endraw %}
{% endhighlight %}


This Dockerfile can be built in the same way as a multistage one. We still need two pipeline steps, one to check out the code and another to build the Docker image.

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
    repo: 'codefreshdemo/cf-example-python-django'
    revision: master
    git: github  
  build_my_image:
    title: Building Docker Image
    stage: build
    type: build
    image_name: my-django-image
    working_directory: ./
    tag: master
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}    

The pipeline is similar to the previous one, so you can handle multistage and non-multistage builds in the same manner in Codefresh pipelines.

{% include image.html 
lightbox="true" 
file="/images/guides/build-docker-images/non-multi-stage-pipeline.png" 
url="/images/guides/build-docker-images/non-multi-stage-pipeline.png" 
alt="Non Multi-stage Docker builds" 
caption="Non Multi-stage Docker builds"
max-width="100%" 
%}

It is important however to note that the Dockerfile is still self-contained. It depends only on the source code of the application and all instructions needed to package the code are included in the Dockerfile itself.



## Packaging existing artifacts in Docker images

An alternative way to create Docker images is to just package an existing artifact or application which is created earlier in the CI process.

>Though this is a very popular way to create Dockerfiles, and Codefresh supports it, we do **NOT** recommend writing Dockerfiles like this. Please learn about Docker multistage builds if you are not familiar with them.

You can see this pattern in all kinds of Dockerfiles that assume the application is already there (or that dependencies are already downloaded). Here is a [Dockerfile that packages an existing JAR]({{site.baseurl}}/docs/example-catalog/ci-examples/spring-boot-2/#spring-boot-2-and-docker-package-only) file.

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM java:8-jre-alpine

EXPOSE 8080

RUN mkdir /app
COPY target/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/spring-boot-application.jar"]

HEALTHCHECK --interval=1m --timeout=3s CMD wget -q -T 3 -s http://localhost:8080/actuator/health/ || exit 1
{% endraw %}
{% endhighlight %}

If you have Dockerfiles like this you need to enrich the basic pipeline shown in the previous sections and run a freestyle step that prepares the artifact **BEFORE** building the Docker image. Read more about [freestyle steps in the basic CI process]({{site.baseurl}}/docs/ci-cd-guides/packaging-compilation/).


There are several disadvantages to these kinds of Dockerfiles:

* The Dockerfile is not self-contained anymore. You need to manually run some other command before actually running the Docker build
* A person who wants to build the Docker image on their workstation is also forced to have a full dev environment (e.g. the JDK or Node.js)
* The version of a development tool is specified twice (one in the Dockerfile and one in the CI/CD system)

Here is the Codefresh pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - compile
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/spring-boot-2-sample-app'
    revision: master
  run_unit_tests:
    title: Compile/Unit test
    stage: compile
    image: 'maven:3.5.2-jdk-8-alpine'
    commands:
      - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository package      
  build_app_image:
    title: Building Docker Image
    type: build
    stage: build
    image_name: spring-boot-2-sample-app
    working_directory: ./
    tag: 'non-multi-stage'
    dockerfile: Dockerfile.only-package
{% endraw %}
{% endhighlight %}  

This pipeline has an intermediate [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) that runs a specific version of Maven/JDK to create the JAR file. The JAR file is then available to the next step via [the Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps).

{% include image.html 
lightbox="true" 
file="/images/guides/build-docker-images/package-only-pipeline.png" 
url="/images/guides/build-docker-images/package-only-pipeline.png" 
alt="Package only Docker builds" 
caption="Package only Docker builds"
max-width="100%" 
%}

In the example above, you can see that the version of JDK/JRE is mentioned twice (one in the pipeline and one in the Dockerfile). If developers decide to upgrade to Java 11, they need to change both places (and in big companies pipelines are usually managed by operators). If this was a multistage build then a developer could simply change just the Dockerfile and be certain that the pipeline is "upgraded" as well.

We find that similar workflows are from legacy CI solutions that are VM-based. Codefresh is a container-native solution, so if you have the opportunity you should create your pipelines from scratch when switching to Docker-based pipelines.


## Avoiding non-standard Dockerfiles

We already established in the previous section that Dockerfiles should be self-contained. Another best practice is to make sure that all actions inside a Dockerfile are idempotent.

There are several Dockerfiles that attempt to mimic a CI/CD system and perform non-standard actions such as:

* Performing Git commits or other Git actions
* Cleaning up or tampering with database data
* Calling other external services with POST/PUT operations

Not only does this make the pipeline much more complex (because retrying the pipeline now has consequences), but you also need to pass special credentials in the Dockerfile itself via the pipeline, making the pipeline even more complicated.

You should avoid these kinds of directives inside a Dockerfile and simplify it so that all actions inside it are repeatable and non-destructive.  
A Dockerfile should mainly:

* Clone extra source code (if needed)
* Download dependencies
* Compile/package code
* Process/Minify/Transform local resources
* Run scripts and edit files on the container filesystem only

As an example **TO AVOID**, this Dockerfile is also trying to run a SonarQube analysis

`Dockerfile`
{% highlight docker %}
{% raw %}
FROM newtmitch/sonar-scanner AS sonar
COPY src src
RUN sonar-scanner
FROM node:11 AS build
WORKDIR /usr/src/app
COPY . .
RUN yarn install \
 yarn run lint \
 yarn run build \
 yarn run generate-docs
{% endraw %}
{% endhighlight %}

This Dockerfile has the following issues:

* It can run only where a SonarQube installation is available
* It needs extra credentials for the SonarQube instance
* If the SonarQube installation has issues, then the application build will also fail

The proper way to build this Dockerfile is to make it package just the application:

`Dockerfile`
{% highlight docker %}
{% raw %}
FROM node:11 AS build
WORKDIR /usr/src/app
COPY . .
RUN yarn install \
 yarn run lint \
 yarn run build \
 yarn run generate-docs
{% endraw %}
{% endhighlight %}

And then move the SonarQube part to the actual pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - sonar
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'my-github-repo/my-node-app'
    revision: master
  run_sonarqube:
    title: Run SonarQube Analysis
    stage: sonar
    image: 'newtmitch/sonar-scanner'
    environment:
    - SONAR_TOKEN=my-sonar-token
    commands:
      - cd src
      - sonar-scanner     
  build_app_image:
    title: Building Docker Image
    type: build
    stage: build
    image_name: my-node-image
    working_directory: ./
    tag: 'master'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}  

This makes the Docker build step as simple as possible.

For more Docker best practices see our [Docker anti-patterns blog post](https://codefresh.io/containers/docker-anti-patterns/){:target="\_blank"}.

## Pushing Docker images

The build step in Codefresh is very smart and automatically also pushes your Docker image to your [default Docker registry]({{site.baseurl}}/docs/integrations/docker-registries/#default-registry).


{% include image.html 
lightbox="true" 
file="/images/guides/build-docker-images/automatic-docker-push.png" 
url="/images/guides/build-docker-images/automatic-docker-push.png" 
alt="Automatic Docker push" 
caption="Automatic Docker push"
max-width="80%" 
%}

Thus, if you run any of the above pipelines you can see the image created in the Docker image dashboard.


{% include image.html 
lightbox="true" 
file="/images/guides/build-docker-images/docker-image-dashboard.png" 
url="/images/guides/build-docker-images/docker-image-dashboard.png" 
alt="Docker image dashboard" 
caption="Docker image dashboard"
max-width="80%" 
%}

For more details on how to push Docker images see the [working with Docker registries page]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/).

## Running Docker images

You can run Docker images inside a Codefresh pipeline using freestyle steps. You can use the freestyle step to run either an existing image from a private or public registry or even a Docker image that was created in the pipeline itself.

This is a [very common pattern in Codefresh]({{site.baseurl}}/docs/pipelines/steps/freestyle/#dynamic-freestyle-steps) and works by simply mentioning the name of the build step that created the image.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'my-github-repo/my-helper-project'
    revision: master
  my_testing_tools:
    title: Building Docker Image
    type: build
    image_name: my-own-testing-framework
  run_tests:
    title: Running Unit tests
    image: ${{my_testing_tools}}
    commands: 
      - ./my-unit-tests.sh 
{% endraw %} 
{% endhighlight %}

For more details see [dynamic build tools]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#creating-docker-images-dynamically-as-build-tools), and [context variables]({{site.baseurl}}/docs/pipelines/variables/#context-related-variables)



## Related articles
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Build step in pipelines]({{site.baseurl}}/docs/pipelines/steps/build/)  






