---
title: "Build an Image with the Dockerfile in Root Directory"
description: "Get started quickly with building Docker images"
group: yaml-examples
sub_group: examples
permalink: /:collection/yaml-examples/examples/build-an-image-dockerfile-in-root-directory/
redirect_from:
  - /docs/build-an-image-dockerfile-in-root-directory/
  - /docs/deploy-to-kubernetes/get-ready-to-deploy/build-an-image/
toc: true
---
Building a Docker image is one of the basic operations in Codefresh pipelines.

>The source code of the repository is located at [https://github.com/codefreshdemo/cf-yml-example-build-dockerfile-inroot](https://github.com/codefreshdemo/cf-yml-example-build-dockerfile-inroot). Feel free to fork it if you want to follow along.

If you don't already have a Codefresh account, you can easily create a free one from the [sign-up page]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/).


## Building a Dockerfile from the root folder

By default docker uses the Dockerfile of the current folder if you run a single command like:

```
docker build . -t my-web-app
```

The same thing can also be achieved within a Codefresh pipeline:


  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefreshdemo/cf-yml-example-build-dockerfile-inroot'
    revision: 'master'
    git: github
  build_my_app:
    title: Building Node.Js Docker Image
    type: build
    image_name: my-app
    working_directory: '${{main_clone}}'
    tag: 'master'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

This pipeline checks out the source code of the repository and then builds a dockerfile found at the root folder of the project.

{% include image.html 
lightbox="true" 
file="/images/examples/docker-build/build-dockerfile-root.png" 
url="/images/examples/docker-build/build-dockerfile-root.png" 
alt="Building a Docker image with a default Dockerfile"
caption="Building a Docker image with a default Dockerfile"
max-width="100%" 
%}

You could also change the Docker build context by editing the `working_directory` property. By default it is looking at the root folder of the project, but any subfolder path is also valid.

## What to read next

- [Pipeline Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)
- [Build an Image by Specifying the Dockerfile Location]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-specify-dockerfile-location)
- [Build an Image from a Different Git Repository]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-from-a-different-git-repository)
- [Build and Push an Image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image)
- [Build an Image With Build Arguments]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-with-build-arguments)