---
layout: docs
title: "Setting up environment variables"
excerpt: ""
description: ""
excerpt: ""
group: getting-started
redirect_from:
  - /docs/setting-up-environment-variables
toc: true
old_url: /docs/setting-up-environment-variables
was_hidden: true
---

{{site.data.callout.callout_success}}
Environment variables are a set of dynamic named values that can affect the way running processes will behave on a computer. They are part of the environment in which a process runs. 
{{site.data.callout.end}}

## You can set your service to run with environment variables with 3 different ways:
* From composition: [read more](https://docs.docker.com/compose/environment-variables)
* For example:

  `YAML`
{% highlight yaml %}
{% raw %}
version: '2'
services:
  web:
    image: my-image
    environment:
      - ENV_1=SOME_VALUE
{% endraw %}
{% endhighlight %}

* From pipeline configuration

{% include image.html 
lightbox="true" 
file="/images/5251676-Screen_Shot_2016-11-17_at_09.05.30.png" 
url="/images/5251676-Screen_Shot_2016-11-17_at_09.05.30.png"
alt="Screen Shot 2016-11-17 at 09.05.30.png"
max-width="40%"
%}
