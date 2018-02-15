---
layout: docs
title: "Let's Chat"
description: ""
excerpt: ""
group: learn-by-example
sub_group: nodejs
redirect_from:
  - /docs/lets-chat
  - /docs/lets-chat/
toc: true
---

Let’s Chat is self-hosted chat app for small to big teams.
This tutorial will walk you through the process of adding the following:
- `Build step` - that will build docker image for your let’s chat app
- `Push to registry step` - that will push your image to docker hub
- `Unit Test step` - A freestyle step that runs the unit test of the demo chat after the build
- `Composition step` - This step will run a composition which use your chat image from the build step, docker image of curl and check if your application is responsive. It will do so by printing "works" if a curl command to our app at port 5000 succeed.
 
## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:

  build_step:
    type: build
    dockerfile: Dockerfile
    image-name: codefreshdemo/lets-chat
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
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/demochat){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
