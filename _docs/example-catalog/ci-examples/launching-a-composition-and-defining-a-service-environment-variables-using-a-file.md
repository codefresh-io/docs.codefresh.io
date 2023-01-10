---
title: "Use Docker compose"
description: "Launch a composition and define a service environment variable using a file"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/launching-a-composition-and-passing-a-service-environment-variable-using-a-file/
toc: true
old_url: /docs/launching-a-composition-and-passing-a-service-environment-variable-using-a-file
---
At times when launching a composition, you need to pass many environment variables to a specific service.
To do so, you can use `docker-compose 'env_file'` field on any service, and use files from the current working directory from which the composition is being launched.
This works for both `composition` and `launch-composition` step types.

>**Note**:  
  When launching a composition directly from the Compositions view, using `env_file` does not work as it is being launched in an empty working directory.  
  Consider moving the composition launch as part of a usual pipeline which will give you ability to use files from your cloned repository. 


## Examples
Compositions are launched within a working directory, which is the cloned repository by default.
This means that you can always reference an `env_file` just as would reference a `docker-compose` file.

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

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  