---
title: "macOS and iOS builds"
description: "Using Codefresh for Mac/iPhone applications"
group: incubation
redirect_from:
  - /docs/incubation/osx-ios-builds/
toc: true
---
  
Codefresh offers alpha support for macOS and/or iOS as a CI/CD environment. Access to the build environment is possible by invitation only. To run macOS/iOS pipelines in Codefresh, [open a free account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/) and then [contact sales](https://codefresh.io/contact-us/){:target="\_blank"} in order to enable this build environment type.

> macOS/iOS builds are only available for the SaaS platform. They are not available for the Hybrid platform at this time.

## Enabling macOS/iOS support

Once approved, you will get access to a special runtime environment that will run your macOS/iOS builds. To use this environment [create a new pipeline]({{site.baseurl}}/docs/pipelines/pipelines/) and select it in the pipeline settings screen.

{% include 
image.html 
lightbox="true" 
file="/images/incubation/osx-builds/osx-build-settings.png" 
url="/images/incubation/osx-builds/osx-build-settings.png"
alt="Running a pipeline on the macOS environment" 
caption="Running a pipeline on the macOS environment"
max-width="60%"
%}

The macOS runtime environment has Xcode already installed for your iOS and/or macOS builds.

## Building macOS/iOS applications with Codefresh

Once you assign the special macOS runtime to your pipeline, you can write your [Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/) as usual, keeping in mind the following points

* The git-clone step is available
* Freestyle steps must use the `freestyle-ssh` type
* The manual approval step is available
* All Docker-related pipeline steps such build, push, deploy, composition are **NOT** available.
* Parallel steps are supported
* Only one active build is supported at any given time.

As part of the alpha version the nodes that run your macOS builds are actual nodes (i.e. not containers), so all changes you make there are permanent. This is a temporary limitation of the current Alpha release and will not be present in the General Availability version of the build service.

## macOS build pipeline example

You can find a full Codefresh example at [https://github.com/alex-codefresh/osx-demo-webserver](https://github.com/alex-codefresh/osx-demo-webserver){:target="\_blank"}.

Create a pipeline for it with the following YAML content:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - 'Clone Repo'
  - 'Test & Build'
  - 'Approve'
  - 'Run the App'
  
steps:
  CloneRepo:
    type: git-clone
    repo: alex-codefresh/osx-demo-webserver
    git: github
    revision: master
    stage: 'Clone Repo'
  
  TestParallel:
    type: parallel
    stage: 'Test & Build'
    steps:
      RunTests:
        type: 'freestyle-ssh'
        description: 'Run dummy unit tests..'
        working_directory: '${{CloneRepo}}/GCDWebServer'
        commands:
          - ./Run-Tests.sh
        fail_fast: false   # ignore if the tests fail, just for the demo purposes
      BuildApp:
        type: 'freestyle-ssh'
        description: 'Build the application...'
        working_directory: '${{CloneRepo}}'
        
        commands:
          - xcodebuild -workspace DemoWebServer.xcworkspace -scheme DemoWebServer archive -archivePath ../build/DemoWebServer.xcarchive | xcpretty

  pending-approval:
    type: pending-approval
    description: 'Stop pipeline until approval. Just as an example'
    stage: 'Approve'
    fail_fast: true

  RunApp:
    type: 'freestyle-ssh'
    description: 'Run the built sample web-server binary on the same node'
    working_directory: '${{CloneRepo}}'
    stage: 'Run the App'
    commands:
      - killall DemoWebServer 2>/dev/null || echo "No instances currently running, continuing" #just in case there is instance already running
      - bash -c "../build/DemoWebServer.xcarchive/Products/Applications/DemoWebServer.app/Contents/MacOS/DemoWebServer &"
      - sleep 60
      - kill $(jobs -p) 2>/dev/null || exit 0
{% endraw %}
{% endhighlight %}

This pipeline clones the sample application, builds it with Xcode and then runs it. Notice that the run step
cleans up on its own (because macOS builds are not docker based so nothing is cleaned up automatically when the pipeline has finished).

Notice also that `freestyle-ssh` steps do not define a docker image (unlike normal [freestyle steps]({{site.baseurl}}/docs/pipelines/steps/freestyle/)).

The logs will show all build information:

{% include 
image.html 
lightbox="true" 
file="/images/incubation/osx-builds/osx-pipeline.png" 
url="/images/incubation/osx-builds/osx-pipeline.png"
alt="macOS build log" 
caption="macOS build log"
max-width="90%"
%}

Currently, we are working on offering configurable versions of Xcode, Swift, and macOS so that pipelines can define exactly what development environment they need. We also plan [fastlane](https://fastlane.tools/){:target="\_blank"} integration.

