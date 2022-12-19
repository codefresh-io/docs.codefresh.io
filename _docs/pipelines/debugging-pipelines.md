---
title: "Debugging CI pipelines"
description: "Pause and inspect pipelines"
group: pipelines
toc: true
---

In addition to [running pipelines locally]({{site.baseurl}}/docs/pipelines/running-pipelines-locally/), Codefresh also allows you to debug pipelines by stopping their execution and inspecting manually their state (files, environment variables, tools etc.)


The Codefresh pipeline debugger works similar to your IDE debugger. You can place breakpoints on one or more pipeline steps and once the pipeline hits one of them, it will stop. You will then get a terminal like interface inside your pipeline step where you can run any commands that you wish in order to understand the state of the container.


{%
  include image.html
  lightbox="true"
  file="/images/pipeline/debug/debug-session.png"
  url="/images/pipeline/debug/debug-session.png"
  alt="A debugging session"
  caption="A debugging session"
  max-width="70%"
%}

There are several options for defining exactly when a step will stop.

## Entering the debugger mode

There are threes ways to enter the debugging mode in a pipeline. You can activate the debugging button when your run the pipeline:

{%
  include image.html
  lightbox="true"
  file="/images/pipeline/debug/run-pipeline-debug.png"
  url="/images/pipeline/debug/run-pipeline-debug.png"
  alt="Running a pipeline in debug mode"
  caption="Running a pipeline in debug mode"
  max-width="30%"
%}

Alternatively if a pipeline is already running normally, you can enter debugging mode by clicking on the bug icon on the top right.

{%
  include image.html
  lightbox="true"
  file="/images/pipeline/debug/enter-debug-mode.png"
  url="/images/pipeline/debug/enter-debug-mode.png"
  alt="Switching to debug mode"
  caption="Switching to debug mode"
  max-width="60%"
%}

You can restart a pipeline that has already finished in debug mode:

{%
  include image.html
  lightbox="true"
  file="/images/pipeline/debug/restart-in-debug.png"
  url="/images/pipeline/debug/restart-in-debug.png"
  alt="Restart in debug mode"
  caption="Restart in debug mode"
  max-width="70%"
%}

Now you are ready to place breakpoints in steps.


## Placing breakpoints

Once the debugging mode is active, all pipeline steps will get an extra breakpoint icon on the far right of their box.

{%
  include image.html
  lightbox="true"
  file="/images/pipeline/debug/breakpoint.png"
  url="/images/pipeline/debug/breakpoint.png"
  alt="A step breakpoint"
  caption="A step breakpoint"
  max-width="70%"
%}


You can click on this icon and define a breakpoint for this particular step. You have the following options

* *Before* - place a breakpoint before the step is initialized 
* *Override* - place a breakpoint after the step has initialized but before its execution ([freestyle steps]({{site.baseurl}}/docs/pipelines/steps/freestyle/))
* *After* - place a breaking point after the step has finished execution.

You can choose multiple debugging phases. In most cases the `Override` option is the most useful one. The `before` phase allows you to inspect
a pipeline step even before [service containers]({{site.baseurl}}/docs/pipelines/service-containers/) are up.

The `after` phase is useful if you want to verify files or variables after a step has finished its execution but before the next step starts. 


## Using the debugger terminal

Once the pipeline reaches a step that has a breakpoint, execution will pause and a new debugger terminal will become available:

{%
  include image.html
  lightbox="true"
  file="/images/pipeline/debug/debug-window.png"
  url="/images/pipeline/debug/debug-window.png"
  alt="The debugging terminal"
  caption="The debugging terminal"
  max-width="60%"
%}

You can now manually type commands to inspect your container. If your Codefresh plan has the basic debugging capabilities you can run the following commands:

* `cd, ls` to see files
* `printenv` to see environment variables
* `cat` to read files
* `top` to see what is running
* `export` and [cf_export]({{site.baseurl}}/docs/pipelines/variables/#using-cf_export-command) to create environment variables
* `exit` to finish the debugging session

If you have placed a breakpoint in the `override` phase of a freestyle step then the container image is the same as the one defined in the step. Therefore you can execute all tools that you have placed in the image (e.g. compilers, linters, test frameworks etc.)

In all cases the [shared Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) is automounted so you can examine your source code or any other intermediate artifacts placed in your project folder or the pipeline cache.

If the breakpoint is on a `before` or `after` phase, the command line terminal is powered by an [alpine](https://alpinelinux.org/) image. The image has already useful tools such as `wget`, `nc` and `vi`. If you have the advanced debugging capabilities in your Codefresh plan you can then install additional tools on your own directly in the terminal with [apk](https://wiki.alpinelinux.org/wiki/Alpine_Linux_package_management). Examples:

* `apk add curl`
* `apk add nano`
* `apk add go`
* `apk add python`

Use the command `apk search foo` to search for a package named foo.


## Resuming execution

Once you are happy with your debugging session, click the continue button to resume.

{%
  include image.html
  lightbox="true"
  file="/images/pipeline/debug/resume-button.png"
  url="/images/pipeline/debug/resume-button.png"
  alt="Continue execution button"
  caption="Continue execution button"
  max-width="60%"
%}

The pipeline will continue and then stop for the next breakpoint (if any). You can still revisit the debugger window for previous steps to see what debugging commands you had executed.

>Notice that to conserve resources, there is a 15 minute limit on each open debug session. If you don't resume the pipeline within 15 minutes after hitting a breakpoint the whole pipeline will stop with a timeout error.

It is important to understand that if you have chosen the `override` phase in a freestyle step, then the commands mentioned in the pipeline definition are completely ignored.

## Using the alternative debug window

If you enable the debugger on a freestyle step with the "override" option, Codefresh will install some extra tooling on the Docker image that is needed for the debugger itself.

By default, the internal debugger tooling is using node.js, so if your image is already based on Node.js, you might get version conflicts in your application.

You can enable an alternative debugger by passing the variable `DEBUGGER_RUNNER = 2` on the whole pipeline:

{%
  include image.html
  lightbox="true"
  file="/images/pipeline/debug/alternative-debugger.png"
  url="/images/pipeline/debug/alternative-debugger.png"
  alt="Enabling the Python based debugger"
  caption="Enabling the Python based debugger"
  max-width="60%"
%}

This debugger is based on Python instead of Node.js and it can work with both Python 2 and 3 Docker images.
This way the debugger tools will not affect your application. You can also use the same method in a specific freestyle step like this:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  hello_world_step:
    title: freestyle step
    image: node:11.1
    environment:
      - 'DEBUGGER_RUNNER=2'
{% endraw %}
{% endhighlight %}





## Inserting breakpoints in the pipeline definition

It is also possible to mention breakpoints in the Codefresh YAML instead of using the UI. Breakpoints mentioned in the `codefresh.yml` file have no effect when the pipeline is not running in Debug mode. You need to run the pipeline in debug mode in order for them to stop the pipeline.

Here is the syntax:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
  - test
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/python-flask-sample-app'
    revision: 'master'
    git: github
    stage: prepare
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: build
    image_name: my-app-image
    working_directory: ./
    tag: 'master'
    dockerfile: Dockerfile
    debug:
      phases:
        before: true
        after: false   
  MyUnitTests:
    title: Running Unit tests
    stage: test
    image: '${{MyAppDockerImage}}'
    debug:
      phases:
        before: false
        override: true
        after: false    
    commands:
      - python setup.py test  
{% endraw %}
{% endhighlight %}

Once you run this pipeline in debug mode, it will automatically have breakpoints in the respective steps (but you can still override/change them using the GUI).


## Troubleshooting

The debugger windows needs some extra tools in a docker image in order to work (such as the `bash` shell). Codefresh automatically installs these tools on your image without any configuration.

If you get the message *your linux distribution is not supported* please contact us so that we can examine your docker image and make sure it is compatible with the Codefresh debugger.


## Related articles
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in CI pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Running pipelines locally]({{site.baseurl}}/docs/pipelines/running-pipelines-locally/)  
