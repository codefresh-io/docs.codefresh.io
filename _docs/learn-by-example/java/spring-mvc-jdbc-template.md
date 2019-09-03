---
title: "Spring MVC JDBC Template"
description: "Create Docker image for Java"
excerpt: ""
group: learn-by-example
sub_group: java
redirect_from:
  - /docs/spring-mvc-jdbc-template/
  - /docs/java/spring-mvc-jdbc-template/
toc: true
---
Using this repository, we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `JAVA, SpringMVC, Tomcat, MySQL, Maven` to build an application which will eventually become a distributable Docker image.

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - test
  - package
steps:
    main_clone:
      title: 'Cloning main repository...'
      type: git-clone
      repo: codefreshdemo/cf-example-java-hello-world
      revision: 'master'
      git: github-1
      stage: prepare
    unit_test:
      title: Unit Tests
      image: maven:latest
      stage: test
      commands:
        - mvn -version
    build_image:
      title: Building Image
      type: build
      stage: package
      dockerfile: Dockerfile
      tag: master
      image_name: java-spring-mvc-jdbc
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-java-hello-world){:target="_blank"} in Github or this [__repository__](https://bitbucket.org/codefresh_io/cf-example-java-hello-world){:target="_blank"} in Bitbucket and follow the instructions there.
{{site.data.callout.end}}


## Gradle version

You can also see how to build this example with `Gradle`. 
Just go to the branch `gradle` of this repository and open the `Dockerfile.gradle` in this [__repository__](https://github.com/codefreshdemo/cf-example-java-hello-world/tree/gradle). 
To see how it works in Codefresh - add this repository to your account specifying the branch `gradle` and `codefresh.yml` as build method.


## Expected result

Here is the pipeline in action:


{% include image.html 
lightbox="true" 
file="/images/learn-by-example/java/spring-mvc-pipeline.png" 
url="/images/learn-by-example/java/spring-mvc-pipeline.png" 
alt="Spring MVC pipeline" 
caption="Spring MVC pipeline"
max-width="90%" 
%}


## What to read next

* [Spring Boot Maven example]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/)
* [Spring Boot Gradle example]({{site.baseurl}}/docs/learn-by-example/java/gradle/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)


