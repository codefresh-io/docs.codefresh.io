---
layout: docs
title: "Selenium test"
description: ""
excerpt: ""
group: learn-by-example
sub_group: golang
redirect_from:
  - /docs/selenium-test
  - /docs/general/selenium-test
  - /docs/general/selenium-test
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `JavaScript, Selenium, Protractor` to build an application which will eventually become a distributable Docker image.
 
## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  build_image:
    title: Building Image
    type: build
    dockerfile: Dockerfile
    image_name: codefresh/selenium-test

  unit_test:
    title: Unit Tests
    type: composition
    composition:
      version: '2'
      services:
        selenium:
          image: selenium/standalone-chrome:2.46.0
          ports:
            - 4444:4444
    composition_candidates:
      test:
        image: ${{build_image}}
        volumes:
          - /dev/shm:/dev/shm
        environment:
          GITHUB_ACCOUNT: ${{GITHUB_ACCOUNT}}
          GITHUB_PASSWORD: ${{GITHUB_PASSWORD}}
          URL: 'https://codefresh.io'
          SUITE: 'login'
        command: bash -c '/protractor/run-tests.sh'
    on_success:
      metadata:
        set:
          - ${{build_image.imageId}}:
            - CF_QUALITY: true
    on_fail:
      metadata:
        set:
          - ${{build_image.imageId}}:
            - CF_QUALITY: false
{% endraw %}
{% endhighlight %}

{% include image.html 
lightbox="true" 
file="/images/d0cb57c-codefresh_selenium_env_vars.png" 
url="/images/d0cb57c-codefresh_selenium_env_vars.png" 
alt="codefresh selenium env vars" 
max-width="40%" 
%}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-selenium-test){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
