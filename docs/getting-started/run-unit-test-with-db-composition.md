---
layout: docs
title: "Run Unit Test with DB / Composition"
excerpt: ""
description: ""
excerpt: ""
group: getting-started
redirect_from:
  - /docs/run-unit-test-with-db-composition
toc: true
old_url: /docs/run-unit-test-with-db-composition
was_hidden: true
---
To run Unit Test with composition

{:start="1"}
1. Check the "Run with composition" option and select the composition you wish to run your image in while running the Unit Tests.

{% include image.html 
lightbox="true" 
file="/images/f97b857-Screen_Shot_2016-11-10_at_10.16.52_AM.png" 
url="/images/f97b857-Screen_Shot_2016-11-10_at_10.16.52_AM.png"
alt="Screen Shot 2016-11-10 at 10.16.52 AM.png"
max-width="40%"
%}

{:start="2"}
2. Now select the candidate service from your composition which Codefresh will use to run your unit tests on. Notice that the image of that candidate will be replaced with the built image from the previous step

{% include image.html 
lightbox="true" 
file="/images/4204fb0-Screen_Shot_2016-11-10_at_10.22.36_AM.png" 
url="/images/4204fb0-Screen_Shot_2016-11-10_at_10.22.36_AM.png"
alt="Screen Shot 2016-11-10 at 10.22.36 AM.png"
max-width="40%"
%}

Composition are set in the Composition module.

## **Dependencies and execution order**
Please note, you can use the "depends_on" option in the compose file to force starting the db container before the test container such as the example below
  
  `Text`
{% highlight yaml %}
{% raw %}
version: '2'
services:
  test:
    image: 'containers101/demochat:master'
    ports:
      - 5000
    depends_on:
      - mongo
  mongo:
    image: mongo
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### *depends_on* doesn't guarantee that db is "ready"

*depends_on* will not wait for db to be “ready” before starting the test service - only until they have been started. If you need to wait for a db to be ready, see [Controlling startup order](https://docs.docker.com/compose/startup-order/){:target="_blank"} for more on this problem and strategies for solving in docker compose. 
{{site.data.callout.end}}
