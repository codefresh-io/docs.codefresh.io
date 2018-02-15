---
layout: docs
title: "Spring MVC JDBC Template"
description: ""
excerpt: ""
group: learn-by-example
sub_group: java
redirect_from:
  - /docs/spring-mvc-jdbc-template
  - /docs/java/spring-mvc-jdbc-template
  - /docs/java/spring-mvc-jdbc-template/
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `JAVA, SpringMVC, Tomcat, MySQL, Maven` to build an application which will eventually become a distributable Docker image.

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'

steps:

    unit_test:
      title: Unit Tests
      image: maven:latest
      commands:
        - mvn -version

    build_image:
      title: Building Image
      type: build
      dockerfile: Dockerfile
      image_name: codefresh/java-spring-mvc-jdbc

    launch_composition:
      title: Launch Composition
      type: launch-composition
      composition: docker-compose.yml
      environment_name: 'java-spring-mvc-jdbc'
      entry_point: tomcat
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-java-hello-world){:target="_blank"} in Github or this [__repository__](https://bitbucket.org/codefresh_io/cf-example-java-hello-world){:target="_blank"} in Bitbucket and follow the instructions there.
{{site.data.callout.end}}

{{site.data.callout.callout_warning}}
##### Gradle

Also, you can see how to build this example with `Gradle`. 
Just go to the branch `gradle` of this repository and open the `Dockerfile.gradle` in this [__repository__](https://github.com/codefreshdemo/cf-example-java-hello-world/tree/gradle){:target="_blank"}. 
To see how it works in Codefresh - add this repository to your account specifying the branch `gradle` and `codefresh.yml` as build method.
{{site.data.callout.end}}

## Expected result

{% include image.html 
lightbox="true" 
file="/images/685c48a-codefresh_java_results.png" 
url="/images/685c48a-codefresh_java_results.png" 
alt="codefresh java example" 
max-width="40%" 
%}

{% include image.html 
lightbox="true" 
file="/images/c9c1b87-codefresh_results_tomcat_app.png" 
url="/images/c9c1b87-codefresh_results_tomcat_app.png" 
alt="codefresh results tomcat app" 
max-width="40%" 
%}
