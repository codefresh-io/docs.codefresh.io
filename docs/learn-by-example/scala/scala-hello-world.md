---
layout: docs
title: "Scala: Hello World"
description: ""
excerpt: ""
group: learn-by-example
sub_group: scala
redirect_from:
  - /docs/scala-hello-world
  - /docs/scala-hello-world/
toc: true
---

So, you’ve decided to try Codefresh? Welcome on board!

We’ll help you get up to speed with basic functionality such as: compiling, building Docker images and launching.

This project uses `Scala` to build an application which will eventually become a distributable Docker image.
 
## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  generate_dockerfile:
    image: noamt/pre-cached-sbt
    working_directory: ${{main_clone}}
    commands:
      - sbt -mem 4096 clean compile package
      - sbt docker:stage

  build_step:
    type: build
    image_name: codefresh/example-scala
    working_directory: ${{main_clone}}/service/target/docker/stage
    dockerfile: Dockerfile
    tag: ${{CF_BRANCH}}

  launch_composition:
    title: Launch Composition
    type: launch-composition
    composition: docker-compose.yml
    environment_name: 'scala-example'
    entry_point: scala
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-scala-hello-world){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}

{% include image.html 
lightbox="true" 
file="/images/4a8bdf1-codefresh_scala_example.png" 
url="/images/4a8bdf1-codefresh_scala_example.png" 
alt="codefresh scala example" 
max-width="40%" 
%}
