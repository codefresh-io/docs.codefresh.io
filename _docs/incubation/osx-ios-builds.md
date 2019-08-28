---
title: "MacOSX and iOS builds"
description: "Using Codefresh for Mac/iPhone applications"
group: incubation
toc: true
---
  
Codefresh is offering alpha support for MacOS and/or iOS as a CI/CD environment. Access to the build environment is possible after invite only. To run MacOS/iOS pipelines in Codefresh, [open a free account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) and then [contact sales](https://codefresh.io/contact-sales/) in order to enable this build environment type.

## Enabling MacOS/iOS support

Once approved, you will get access to a special runtime environment environment that will run your MacOS/iOS builds. To use this environment [create a new pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) and select it in the pipeline settings screen.

{% include 
image.html 
lightbox="true" 
file="/images/incubation/osx-builds/osx-build-settings.png" 
url="/images/incubation/osx-builds/osx-build-settings.png"
alt="Running a pipeline on the OSX environment" 
caption="Running a pipeline on the OSX environment"
max-width="60%"
%}

The OSX runtime environment has all the necessary tools (e.g. xcode) already installed for your iOS and/or macOS builds.

## Building MacOS/iOS applications with Codefresh

Once you assign the special MacOS runtime to your pipeline, you can write your [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) as usual, keeping in mind the following points

* The git-clone step is available
* Freestyle steps must use the `freestyle-ssh` type
* The manual approval step is available
* All Docker-related pipeline steps such build, push, deploy, composition are **NOT** available.
* Parallel steps are supported

As part of the alpha version the nodes that run your MacOS builds are actual nodes (i.e. not containers), so all changes you make there are permanent (unlike docker based builds, where everything runs in an isolated docker container that is discarded after the build has finished).

## MacOS build pipeline example

You can find a full Codefresh example at [https://github.com/alex-codefresh/osx-demo-webserver](https://github.com/alex-codefresh/osx-demo-webserver).

Create a pipeline for it with the following YAML content:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  CloneRepo:
    type: git-clone
    repo: alex-codefresh/osx-demo-webserver
    git: github
    revision: master
  
  RunTests:
    type: 'freestyle-ssh'
    working_directory: '${{CloneRepo}}/GCDWebServer'
    commands:
      - ./Run-Tests.sh
    fail_fast: false
  
  BuildApp:
    type: 'freestyle-ssh'
    working_directory: '${{CloneRepo}}'
    commands:
      - xcodebuild -workspace DemoWebServer.xcworkspace -scheme DemoWebServer archive -archivePath build/DemoWebServer.xcarchive | xcpretty
    
  RunApp:
    type: 'freestyle-ssh'
    working_directory: '${{CloneRepo}}'
    commands:
      - killall DemoWebServer 2>/dev/null || echo "No instances currently running, continuing" #just in case there is instance already running
      - bash -c "build/DemoWebServer.xcarchive/Products/Applications/DemoWebServer.app/Contents/MacOS/DemoWebServer &"
      - sleep 60
      - kill $(jobs -p) 2>/dev/null || exit 0
{% endraw %}
{% endhighlight %}

This pipeline clones the sample application, builds it with xcode and then runs it. Notice that the run step
cleans up on its own (because MacOSX builds are not docker based so nothing is cleaned up automatically when the pipeline has finished).

Notice also that `freestyle-ssh` steps do not define a docker image (unlike normal freestyle steps).

The logs will show all build information:

{% include 
image.html 
lightbox="true" 
file="/images/incubation/osx-builds/osx-pipeline.png" 
url="/images/incubation/osx-builds/osx-pipeline.png"
alt="OSX build log" 
caption="OSX build log"
max-width="90%"
%}

Currently, we are working on offering configurable versions of Xcode, Swift, and OSX so that pipelines can define exactly what development environment they need. We also plan [fastlane](https://fastlane.tools/) integration.

