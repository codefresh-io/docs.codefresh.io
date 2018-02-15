---
layout: docs
title: "Launching a composition and defining a service environment variables using a file"
description: ""
group: how-to-guides
redirect_from:
  - /docs/launching-a-composition-and-passing-a-service-environment-variable-using-a-file
  - /docs/launching-a-composition-and-passing-a-service-environment-variable-using-a-file
toc: true
old_url: /docs/launching-a-composition-and-passing-a-service-environment-variable-using-a-file
---
Sometimes when launching a composition there is a need to pass many environment variables to a specific service.
In order to do that you can use docker-compose 'env_file' field on any service and use files from the current working directory from which the composition is being launched.
This will work for both 'composition' and 'launch-composition' step types.

{{site.data.callout.callout_info}}
##### Using env_file will not work in case you are launching a composition directly from the Compositions view because it is being launched in an empty working directory.

Consider moving the composition launch as part of a usual pipeline which will give you ability to use files from your cloned repository. 
{{site.data.callout.end}}

## Examples
Compositions are being launch inside a working directory, which is the cloned repository by default.
This means that you can always reference an 'env_file' exactly like you would reference a docker-compose file.

  `Inline Composition`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:

  inline_composition:
    title: Launch inline composition
    type: launch-composition
    environment_name: 'environment name'
    composition: 
      version: '3'
      services:
        service:
          image: alpine
          env_file: ./env-file
{% endraw %}
{% endhighlight %}


  `Composition from file`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:

  composition_from_file:
    title: Launch composition from file
    type: launch-composition
    composition: './docker-compose.yml'
    environment_name: 'environment name'
{% endraw %}
{% endhighlight %}
