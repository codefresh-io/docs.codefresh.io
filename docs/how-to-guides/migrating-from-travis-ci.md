---
layout: docs
title: "Migrating from Travis CI"
description: ""
group: how-to-guides
redirect_from:
  - /docs/migrating-from-travis
  - /docs/migrating-from-travis
toc: true
old_url: /docs/migrating-from-travis
was_hidden: true
---
So, you’ve decided to try Codefresh? Welcome on board!

We’ll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

{{site.data.callout.callout_info}}
##### Repository

Fork this [__repository__](https://github.com/codefreshdemo/demochat){:target="_blank"} to compare the Travis CI and Codefresh.
{{site.data.callout.end}}

## Looking into .travis.yml

In the root of this repository you'll find a file named `.travis.yml` this is Travis build descriptor and it describes the different steps that comprise general process (install, script, etc). Let's quickly review the contents of this file:

  `.travis.yml`
{% highlight yaml %}
{% raw %}
sudo: false

language: node_js

node_js:
    - "7"

before_install:
    - export PORT=5000

services:
    - mongodb

install:
    - npm install

before_script:
    - npm install -g mocha
    - npm install -g istanbul
    - npm install -g gulp
    - npm install -g debug

script:
    - gulp test
{% endraw %}
{% endhighlight %}

{% include image.html
lightbox="true"
file="/images/94376d0-travis-ci-build.png"
url="/images/94376d0-travis-ci-build.png"
alt="94376d0-travis-ci-build.png"
max-width="40%"
%}

## Looking into codefresh.yml
In this file, we will look at on `build, freestyle, composition` steps to see how to use them to build, test and deploy your repository.
See more details about codefresh.yml steps [_here_]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:

  build_step:
    type: build
    dockerfile: Dockerfile
    image-name: demochat
    tag: ${{CF_BRANCH}}

  unit_tests:
    image: ${{build_step}}
    fail-fast: false
    commands:
      - npm install
      - gulp test

  integration_step:
    type: composition
    composition:
      version: '2'
      services:
        app:
          image: ${{build_step}}
          links:
            - mongo
          ports:
            - 5000
        mongo:
          image: mongo
    composition-candidates:
      main:
        image: nhoag/curl
        command: bash -c "sleep 30 && curl http://app:5000/" | echo 'works'

  deploy_to_ecs:
      image: codefresh/cf-deploy-ecs
      commands:
        - cfecs-update --image-name demochat --image-tag ${{CF_BRANCH}} eu-west-1 demochat-cluster demochat-webapp
      environment:
        - AWS_ACCESS_KEY_ID=${{AWS_ACCESS_KEY_ID}}
        - AWS_SECRET_ACCESS_KEY=${{AWS_SECRET_ACCESS_KEY}}
      when:
        branch:
          only:
            - master
{% endraw %}
{% endhighlight %}

{% include image.html
lightbox="true"
file="/images/9fc17cc-codefresh_processes.png"
url="/images/9fc17cc-codefresh_processes.png"
alt="codefresh_processes.png"
max-width="40%"
%}

## Getting Started

Let's start to do the first actions with `.travis.yml` example. This file tells Travis CI that this project is written in PHP, and to test Test.php with `phpunit` against PHP versions 5.6, 7.0

  `.travis.yml`
{% highlight yaml %}
{% raw %}
language: php
php:
- 5.6
- 7.0
script: phpunit Test.php
{% endraw %}
{% endhighlight %}

In `Codefresh` you can use the [freestyle step]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/) to describe it.

{{site.data.callout.callout_info}}
Note, in Codefresh you can run [Unit tests]({{ site.baseurl }}/docs/yaml-examples/examples/run-unit-tests-with-composition) and [Integration tests]({{ site.baseurl }}/docs/yaml-examples/examples/run-integration-tests) as separate steps of codefresh.yml
{{site.data.callout.end}}

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
unit_tests_5.6:
    image: php:5.6
    commands:
      - phpunit Test.php
unit_tests_7.0:
    image: php:7.0
    commands:
      - phpunit Test.php
{% endraw %}
{% endhighlight %}

In case if you want to run your tests in parallel you need to create two `codefresh.yml` files

  `codefresh.5.6.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  unit_tests:
    image: php:5.6
    commands:
      - phpunit Test.php
{% endraw %}
{% endhighlight %}

  `codefresh.7.0.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  unit_tests:
    image: php:7.0
    commands:
      - phpunit Test.php
{% endraw %}
{% endhighlight %}

Now go to the pipelines of the repository and set the path to certain codefresh.yml for each of pipelines. `Add webhook` if you want to start the build automatically after commit and push.

{% include image.html
lightbox="true"
file="/images/aaa0cc6-codefresh_pipelines.png"
url="/images/aaa0cc6-codefresh_pipelines.png"
alt="codefresh_pipelines.png"
max-width="40%"
%}

## The Build Lifycycle: Installing packages
In Codefresh we use the following steps to describe the flow

- Build
- Push
- Git Clone
- Composition
- Launch Composition

{{site.data.callout.callout_info}}
##### More information

[Codefresh YAML Steps]({{ site.baseurl }}/docs/codefresh-yaml/steps/)
{{site.data.callout.end}}

Using the steps above we can easily replace the commands that are used in Travis

`before_install, install, before_script, script, after_success / after_failure, before_deploy, deploy, after_deploy, after_script`

For instance, if you want to install something in your image you can describe it in Dockerfile using the command `RUN:`

  `Dockerfile`
{% highlight docker %}
{% raw %}
FROM ubuntu:14.04

RUN apt-get update

# Add oracle java 8 repository
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
RUN apt-get -y install software-properties-common
RUN add-apt-repository -y ppa:webupd8team/java
RUN apt-get update
RUN apt-get install -y oracle-java8-installer maven wget
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /var/cache/oracle-jdk8-installer
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# Install Maven, wget
RUN apt-get -y install maven wget
{% endraw %}
{% endhighlight %}

or you can install all necessary dependencies before running your test script.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
unit_tests:
    image: php:5.6
    working_directory: ${{main_clone}}
    commands:
      - install-dependencies.sh
      - phpunit Test.php
{% endraw %}
{% endhighlight %}

## Expression Condition: Skipping the step, Building specific branches
For instance, to skip the `install` in Travis you use `install: true`
We suggest you describe the condition when you want to skip the certain step.

{% highlight yaml %}
{% raw %}
when:
    branch:
        only:
          - master
{% endraw %}
{% endhighlight %}

{% highlight yaml %}
{% raw %}
when:
    branch:
        ignore:
          - master
          - develop
{% endraw %}
{% endhighlight %}

{% highlight yaml %}
{% raw %}
when:
    condition:
        all:
          noSkipCiInCommitMessage: 'includes(lower("${{CF_COMMIT_MESSAGE}}"), "skip ci") == false'
          masterBranch: '"${{CF_BRANCH}}" == "master"'
{% endraw %}
{% endhighlight %}

{: .table .table-bordered .table-hover}
| Condition                                                                                                                                                                                                | Description                                                                                                     |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------|
| {::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">when</span><span class="pi">:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="na">branch</span><span class="pi">:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="na">only</span><span class="pi">:</span><br><span class="pi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span class="s">master</span></code></pre></figure>{:/}                                                                                                                                 | Only execute the step for the `master` branch                                                                     |
| {::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">when</span><span class="pi">:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="na">branch</span><span class="pi">:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="na">ignore</span><span class="pi">:</span><br><span class="pi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span class="s">master</span><br><span class="pi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span> <span class="s">develop</span></code></pre></figure>{:/}                                                                                                                                 | Ignore the develop branch and master branch                                                                     |
| {::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">when</span><span class="pi">:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span class="na">condition</span><span class="pi">:</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="na">all</span><span class="pi">:</span><br><span class="na">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;noSkipCiInCommitMessage</span><span class="pi">:</span> <span class="s1">'</span><span class="s">includes(lower("${{CF_COMMIT_MESSAGE}}"),</span><span class="nv"> </span><span class="s">"skip</span><span class="nv"> </span><span class="s">ci")</span><span class="nv"> </span><span class="s">==</span><span class="nv"> </span><span class="s">false'</span><br><span class="na">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;masterBranch</span><span class="pi">:</span> <span class="s1">'</span><span class="s">"${{CF_BRANCH}}"</span><span class="nv"> </span><span class="s">==</span><span class="nv"> </span><span class="s">"master"'</span></code></pre></figure>{:/}   | Execute if the string `[skip ci]` is not part of the main repository commit message AND if the branch is `master` |

{{site.data.callout.callout_info}}
##### More information about conditions?

[Expression Condition Syntax]({{ site.baseurl }}/docs/codefresh-yaml/expression-condition-syntax/)
[Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/)
{{site.data.callout.end}}

## Breaking the build
If any of the commands in the first four stages of the build lifecycle return a non-zero exit code, the build is broken.
In Travis you can use the `after_success, after_failure, after_script` to execute post operations.
In Codefresh we have the similar post-step operations `on_success, on_finish, on_fail`.

Or you can just add the capability `fail_fast: false` to skip step if it failed and continue performing the following steps.

{{site.data.callout.callout_info}}
##### More information about post-step operations

[Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/) 
{{site.data.callout.end}}

## Environment variables
Travis and Codefresh have the similar syntax to describe the environment variables.

  `.travis.yml`
{% highlight yaml %}
{% raw %}
language: ruby
rvm:
- 1.9.3
env:
- DB=mongodb
{% endraw %}
{% endhighlight %}

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
step_name:
  image: zedtux/ruby-1.9.3
  environment:
    - DB=mongodb
{% endraw %}
{% endhighlight %}

Note: Codefresh allows to use encrypted variables.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
step_name:
  image: zedtux/ruby-1.9.3
  environment:
    - ENCR_VAR=${{ENCR_VAR}}
{% endraw %}
{% endhighlight %}

{% include image.html 
lightbox="true" 
file="/images/bb55c94-codefresh-encr_vars.png" 
url="/images/bb55c94-codefresh-encr_vars.png"
alt="codefresh-encr_vars.png"
max-width="40%"
%}

{{site.data.callout.callout_info}}
##### See which user provided variables exist in Codefresh

[User provided variables]({{ site.baseurl }}/docs/codefresh-yaml/variables/)
{{site.data.callout.end}}

## Push to docker registry

  `.travis.yml`
{% highlight yaml %}
{% raw %}
after_success:
  - if [ "$TRAVIS_BRANCH" == "master" ]; then
    docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    docker push USER/REPO;
    fi
{% endraw %}
{% endhighlight %}

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
  build_step_name:
    type: build
    image-name: USER/REPO
    dockerfile: Dockerfile
    tag: latest

  push_to_dockerhub:
    type: push
    title: Step Title
    description: Free text description
    candidate: ${{build_step_name}}
    tag: latest
    credentials:
      username: ${{DOCKER_USERNAME}}
      password: ${{DOCKER_PASSWORD}}
    when:
      branch:
        only:
          - master
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### More about push step

[Push step]({{ site.baseurl }}/docs/codefresh-yaml/steps/push-1/)
{{site.data.callout.end}}

## Deploy on example of AWS Elastic Beastalk
To deploy to AWS Elastic Beastalk need to use the following step in Travis and Codefresh

  `.travis.yml`
{% highlight yaml %}
{% raw %}
deploy:
  provider: elasticbeanstalk
  access_key_id: <access-key-id>
  secret_access_key:
    secure: "Encypted <secret-access-key>="
  region: "us-east-1"  
  app: "example-app-name"
  env: "example-app-environment"
{% endraw %}
{% endhighlight %}

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
deploy-to-beanstalk:
    image: garland/aws-cli-docker:latest
    commands:
     - sh -c  "aws configure set region '${{AWS_REGION}}' && aws elasticbeanstalk update-environment --environment-name '${{AWS_ENV_NAME}}' --version-label '${{AWS_VERSION}}' "
    when:
      condition:
        all:
          masterBranch: "'${{CF_BRANCH}}' == '${{AWS_BRANCH}}'"
{% endraw %}
{% endhighlight %}

In the pipeline of repository, need to provide the following environment variables

{% include image.html 
lightbox="true" 
file="/images/60d70d4-codefresh_eb_env_vars.png" 
url="/images/60d70d4-codefresh_eb_env_vars.png"
alt="codefresh_eb_env_vars.png"
max-width="40%"
%}

## Command line client

{: .table .table-bordered .table-hover}
| Travis                                                                                        | Codefresh                                                                                             |
|:----------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------|
| [Travis command line client](https://github.com/travis-ci/travis.rb#readme){:target="_blank"} | [Codefresh command line client](https://www.npmjs.com/package/@codefresh-io/cf-cli){:target="_blank"} |

See our [examples]({{ site.baseurl }}/docs/learn-by-example/general/): how to use Codefresh command line as step of codefresh.yml

## Validating yml files

{: .table .table-bordered .table-hover}
| Travis                                                                                         | Codefresh                                                                                                      |
|:-----------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------|
| [Validating .travis.yml files](https://docs.travis-ci.com/user/travis-lint/){:target="_blank"} | [Validating codefresh.yml files](https://www.npmjs.com/package/@codefresh-io/yaml-validator){:target="_blank"} |
