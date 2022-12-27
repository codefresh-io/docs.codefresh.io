---
title: "Launch Compositions"
description: "Create a dynamic environment to preview your feature"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/launch-composition-1/
toc: true
---
Using this repository, we will help you get up to speed with basic functionality such as: building Docker images and launching compositions.
This project uses `Node JS` to build an application which will eventually become a distributable Docker image. 

## Looking around

In the root of this repository you'll find a file named `codefresh.yml`. This is our [pipeline definition]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/) and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
stages:
  - prepare
  - package
  - launch
steps:
    main_clone:
      title: 'Cloning main repository...'
      type: git-clone
      repo: codefreshdemo/cf-example-launch-composition
      revision: 'master'
      git: github
      stage: prepare
    build_image:
      title: Building Image
      type: build
      #Important: rename this image to to a valid repository in your registry. For example: myUserName/vote
      image_name: example-launch-compose
      #Dockerfile location should be relative to the working directory
      dockerfile: Dockerfile
      tag: master
      stage: package
    launch_composition:
      title: Launch Composition
      type: launch-composition
      composition:
        version: '2'
        services:
          app:
            image: example-launch-compose:master
            ports:
            - 3000
      environment_name: 'cf-example-launch-composition'
      entry_point: app
      fail_fast: false
      stage: launch 
{% endhighlight %}

The pipeline clones the source code, builds a docker image and then 
 [creates a preview environment]({{site.baseurl}}/docs/pipelines/steps/launch-composition/) with that image.


>**Your environments are limited** 
  Be aware that the number of environments you can run is limited. When using the same environment, define that the old one would terminate before launching the new environment. That way you can control the number of environments running in your account. 


### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-launch-composition){:target=\_blank"} in GitHub and follow the instructions there.


Here is the end result:

{% include image.html 
lightbox="true" 
file="/images/examples/composition/launch-composition-example.png" 
url="/images/examples/composition/launch-composition-example.png"
alt="Launch composition example"
caption="Launch composition example"
max-width="90%"
%}

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Unit tests]({{site.baseurl}}/docs/examples/example-catalog/ci-examples/run-integration-tests/)  
[Integration tests]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-database/)  
[Preview environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/)  