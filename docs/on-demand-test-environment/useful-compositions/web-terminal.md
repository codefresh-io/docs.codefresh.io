---
layout: docs
title: "Web terminal"
description: ""
group: on-demand-test-environment
sub_group: examples-compositions
# hack/workaround for sub elements, because parent has permalink
permalink: /docs/on-demand-test-environment/examples-compositions/web-terminal/ 
redirect_from:
  - /docs/web-terminal
  - /docs/web-terminal
toc: true
---
This example shows you how to access containers running in a Codefresh standup environment.

## Looking around
In the root of this repository you'll find a file named `docker-compose.yml`.
Here are the contents of this file:

  `Composition.yml`
{% highlight yaml %}
version: '3'
services:
  my-service:
    image: 'containers101/whomi:master'
    volumes:
      - my-service:/app
    ports:
      - '1337'
  terminal:
    image: 'containers101/cfterminal:master'
    ports:
      - '8000'
    volumes_from:
      - my-service
volumes:
  my-service:
    driver: local
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example 

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-web-termial){:target="_blank"} in Github and follow the instructions there.
{{site.data.callout.end}}
