---
title: "Build an Image - Specify Dockerfile Location"
description: "How to choose a Dockerfile to build with Codefresh pipelines"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/build-an-image-specify-dockerfile-location/
toc: true
---

Sometimes you have a project where the Dockerfile is **not** in the root folder of the project. Maybe the repository has multiple projects inside (each with its own Dockerfile) or you simply want to use a different folder for the Docker context

>The source code of the repository is located at [https://github.com/codefreshdemo/cf-example-dockerfile-other-location](https://github.com/codefreshdemo/cf-example-dockerfile-other-location). Feel free to fork it if you want to follow along.

If you don't already have a Codefresh account, you can easily create a free one from the [sign-up page]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/).


## Building a Dockerfile from a different folder

By default docker uses the Dockerfile of the current folder if you run a single command like:

```
docker build . -t my-web-app
```

If your Dockerfile is in another folder then you need to specify it explicitly with:

```
docker build . -t my-web-app -f subfolder/Dockerfile
```

Codefresh supports a similar syntax as well. The `dockerfile` property of the [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) can accept a full path.

Here is the full pipeline:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefreshdemo/cf-example-dockerfile-other-location'
    revision: 'master'
    git: github
  build_my_app:
    title: Building Node.Js Docker Image
    type: build
    image_name: my-app
    working_directory: '.'
    tag: 'master'
    dockerfile: docker/Dockerfile
{% endhighlight %}

This pipeline checks out the source code of the repository and then builds a dockerfile found at the subfolder `docker` while still keeping as Docker context the root directory.

{% include image.html 
lightbox="true" 
file="/images/examples/docker-build/build-spefify-dockerfile.png" 
url="/images/examples/docker-build/build-spefify-dockerfile.png" 
alt="Building a Docker image with specific Dockerfile"
caption="Building a Docker image with specific Dockerfile"
max-width="100%" 
%}

You could also change the Docker build context by editing the `working_directory` property. By default it is looking at the root folder of the project, but any subfolder path is also valid.

## What to read next

- [Pipeline Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)
- [Build an Image with the Dockerfile in Root Directory]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-dockerfile-in-root-directory/)
- [Build an Image from a Different Git Repository]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-from-a-different-git-repository)
- [Build and Push an Image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image)
- [Build an Image With Build Arguments]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-with-build-arguments)