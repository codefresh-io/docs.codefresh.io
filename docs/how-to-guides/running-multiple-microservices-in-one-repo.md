---
layout: docs
title: "Running multiple microservices in one repo"
description: ""
group: how-to-guides
redirect_from:
  - /docs/running-multiple-microservices-in-one-repo
  - /docs/running-multiple-microservices-in-one-repo
toc: true
old_url: /docs/running-multiple-microservices-in-one-repo
was_hidden: true
---
You can define CI/CD for multiple micro-services in a single repository by using the [```codefresh.yml``` file]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) or the Codefresh UI.

## Define CI/CD for Multiple micro-services in one repository through UI

If don't want to use the codefresh.yml you can define each of micro-services through pipelines. Just go to the pipelines of service that contains the microservices and configure pipeline for each microservice.

{{site.data.callout.callout_info}}
Change the path to build context of your microservice
{{site.data.callout.end}}
 
{% include image.html 
lightbox="true" 
file="/images/fd23238-codefresh_service-1.png" 
url="/images/fd23238-codefresh_service-1.png"
alt="codefresh_service-1.png"
max-width="40%"
%}

If you don't have that service you can try to do it using our example.

[![codefreshdemo/cf-example-multiple-microservices](https://assets-cdn.github.com/favicon.ico) codefreshdemo/cf-example-multiple-microservices](https://github.com/codefreshdemo/cf-example-multiple-microservices){:target="_blank"}

## Define CI/CD for Multiple micro-services in one repository through YML
The each of micro-services has the own Dockerfile. You just need to specify the build context path using ```working_directory```

  `codefresh.yaml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  build-service-1:
    type: build
    working_directory: ${{main_clone}}/cf-example-build-and-push
    description: UC - build step
    image_name: codefreshdemo/service-1
    dockerfile: Dockerfile
    tag: ${{CF_BRANCH}}

  unit-test-service-1:
    image: node:latest
    working_directory: ${{main_clone}}/cf-example-build-and-push
    commands:
      - echo test1
      - pwd

  build-service-2:
    type: build
    working_directory: ${{main_clone}}/cf-example-build-arguments
    description: UC - build step
    image_name: codefreshdemo/service-2
    dockerfile: Dockerfile
    tag: ${{CF_BRANCH}}

  unit-test-service-2:
    image: node:latest
    working_directory: ${{main_clone}}/cf-example-build-arguments
    commands:
      - echo test2
      - pwd
{% endraw %}
{% endhighlight %}

Try the following example to see how it works. Just ADD SERVICE and then go to pipelines to switch on "Use YML build", then SAVE and BUILD this service.

{% include image.html 
lightbox="true" 
file="/images/640a46f-codefresh_yml_builds.png" 
url="/images/640a46f-codefresh_yml_builds.png"
alt="codefresh_yml_builds.png"
max-width="40%"
%}

[![codefreshdemo/cf-example-multiple-microservices](https://assets-cdn.github.com/favicon.ico) codefreshdemo/cf-example-multiple-microservices](https://github.com/codefreshdemo/cf-example-multiple-microservices){:target="_blank"}
