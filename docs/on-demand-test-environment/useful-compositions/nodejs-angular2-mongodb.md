---
layout: docs
title: "NodeJS + Angular2 + MongoDB"
description: ""
group: on-demand-test-environment
sub_group: examples-compositions
# hack/workaround for sub elements, because parent has permalink
permalink: /docs/on-demand-test-environment/examples-compositions/nodejs-angular2-mongodb/ 
redirect_from:
  - /docs/nodejs-angular2-mongodb
  - /docs/nodejs-angular2-mongodb
toc: true
---
This tutorial will walk you through the process of adding the following:

- Build client
- Build server
- Launch composition

## Looking around
In the root of this repository you'll find a file named `docker-compose.yml`.
Let's quickly review the contents of this file:

  `docker-compose.yml`
{% highlight yaml %}
{% raw %}
version: '3'
services:
  mongodb:
    image: mongo
    ports:
      - 28017
  server:
    image: ${{build_server}}
    environment:
      - MONGO_URI=mongodb://mongodb/exampleDb
    links:
      - mongodb
    ports:
      - 9000
  client:
    image: ${{build_client}}
    ports:
      - 3000
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example 

Just head over to the example [__repository__](https://github.com/codefreshdemo/nodejs-angular2-mongo){:target="_blank"} in Github and follow the instructions there.
{{site.data.callout.end}}

