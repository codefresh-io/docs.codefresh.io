---
title: "Compile and package an Android application"
description: "Using Codefresh pipelines"
group: example-catalog 
sub_group: ci-examples
redirect_from:
  - /docs/learn-by-example/mobile/android/
toc: true
---

Android applications use Java/Gradle for their build system. Because Codefresh already supports [Gradle]({{site.baseurl}}/docs/example-catalog/ci-examples/gradle/), it is also very easy to build Android projects.

Any Gradle command can run inside a Docker image that contains the Android SDK. As an example, we will use a [Nextcloud](https://hub.docker.com/r/nextcloudci/android){:target="\_blank"} image from Dockerhub.


## The example project

You can see the example project at [https://github.com/codefresh-contrib/android-sample-app](https://github.com/codefresh-contrib/android-sample-app){:target="\_blank"}. The repository contains a Hello World Android project with the following tasks:

* `./gradlew test` runs unit tests
* `./gradlew build` builds the application


## Create a CI pipeline that compiles/releases Android

In most cases you would create a similar pipeline to a Gradle project.

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/mobile/android-ci-pipeline.png" 
url="/images/learn-by-example/mobile/android-ci-pipeline.png" 
alt="Building and Testing an Android app"
caption="Building and Testing an Android app"
max-width="80%" 
%}

Here is the [full pipeline](https://github.com/codefresh-contrib/android-sample-app/blob/master/codefresh.yml){:target="\_blank"} that uses a Docker image with the Android SDK in order to run Gradle.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - test
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/android-sample-app'
    revision: master
    git: github
  TestIt:
    title: Running Tests
    stage: test
    image: nextcloudci/android:android-48
    commands:
     - chmod +x ./gradlew
     - ./gradlew test --no-daemon --gradle-user-home=/codefresh/volume/.gradle
  BuildIt:
    title: Packaging Android App
    stage: build
    image: nextcloudci/android:android-48
    commands:
     - ./gradlew build  --no-daemon --gradle-user-home=/codefresh/volume/.gradle
{% endraw %}
{% endhighlight %}

This pipeline clones the source code, runs unit tests and finally builds the Android application. 

Codefresh is smart enough that [caches automatically]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#how-caching-works-in-codefresh) for us the workspace of a build (`/codefresh/volume`). This works great for build tools that keep their cache in the project folder, but not for Maven/Gradle which keep their cache externally. By changing the location of the Gradle cache we make sure that Codefresh will cache automatically the Gradle libraries resulting in much faster builds.



## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  

