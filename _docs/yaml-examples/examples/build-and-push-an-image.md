---
title: "Build and Push an Image"
description: "How to build Docker images and push them to registries with Codefresh"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/build-and-push-an-image/
  - /docs/docker-registries/push-image-to-a-docker-registry/ 
toc: true
---

Building a Docker image and then pushing it to a registry is one of the most basic scenarios for creating a Pipeline.
In this example we will use a demo Node.js application that will be packaged in a Docker image.

>The source code of the repository is located at [https://github.com/codefreshdemo/cf-example-build-and-push](https://github.com/codefreshdemo/cf-example-build-and-push). Feel free to fork it if you want to follow along.

If you don't already have a Codefresh account, you can easily create a free one from the [sign-up page]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/).


## Building a Docker image

In the most simple case, you only need a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) to build the image.

Here is the most basic pipeline that clones a repo and builds an image:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
- checkout
- build
steps:
  clone:
    title: Cloning main repository...
    type: git-clone
    stage: checkout
    repo: 'codefreshdemo/cf-example-build-and-push'
    revision: 'master'
    git: github
  build_my_app:
    title: Building Node.Js Docker Image
    type: build
    stage: build
    image_name: my-node-js-app
    working_directory: {{clone}}
    tag: 'master'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

## Building a Docker image and pushing it to a registry.

You can push your image to any [Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). First you need to connect your external registry in the integrations page. Here are the instructions for:

  * [Docker Hub]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/)
  * [Google Container Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/google-container-registry/)
  * [Amazon EC2 Container Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/)
  * [Bintray.io]({{site.baseurl}}/docs/docker-registries/external-docker-registries/bintray-io/)
  * [Quay.io]({{site.baseurl}}/docs/docker-registries/external-docker-registries/quay-io/)
  * [Other Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/other-registries/)

Once that is done, you only need to add a [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) in your pipeline and use the registry name of your integration.

Here is the full example:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
- checkout
- build
- push
steps:
  clone:
    title: Cloning main repository...
    type: git-clone
    stage: checkout
    repo: 'codefreshdemo/cf-example-build-and-push'
    revision: 'master'
    git: github
  build_my_app:
    title: Building Node.Js Docker Image
    type: build
    stage: build
    image_name: my-node-js-app
    working_directory: {{clone}}
    tag: 'master'
    dockerfile: Dockerfile
  push_to_my_registry:
    stage: 'push'
    type: push
    title: Pushing to a registry
    candidate: ${{build_my_app}}
    tag: 'v1.0.0'
    registry: dockerhub
    image_name: kkapelon/my-node-js-app
{% endraw %}    
{% endhighlight %}

Here we use a specific tag - `v1.0.0` but 
Codefresh has several other variables that can be used for tagging images. Common examples that you can use are `CF_BRANCH_TAG_NORMALIZED`, `CF_SHORT_REVISION` or `CF_BUILD_ID`. See the [variables page]({{site.baseurl}}/docs/codefresh-yaml/variables/) for more information.

{% include image.html
  lightbox="true"
  file="/images/examples/docker-build/build-and-push-pipeline.png"
  url="/images/examples/docker-build/build-and-push-pipeline.png"
  alt="Pushing image to external registry"
  caption="Pushing image to external registry"
  max-width="100%"
    %}


If you run the pipeline the Docker image will be pushed *both* to the private Docker regisry (by the build step) *and* the external docker registry (by the push step)


## More options for push

Codefresh has several more options when it comes to pushing:
 
* You can specify multiple tags to be pushed
* You can use directly ECR registries
* You can embed credentials in the push steps

See the [push step documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) for more details.

## What to read next

- [Pipeline Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)
- [Pipeline Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
- [Build an Image with the Dockerfile in Root Directory]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-dockerfile-in-root-directory/)
- [Build an Image by Specifying the Dockerfile Location]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-specify-dockerfile-location)
- [Build an Image from a Different Git Repository]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-from-a-different-git-repository)
- [Build an Image With Build Arguments]({{site.baseurl}}/docs/yaml-examples/examples/build-an-image-with-build-arguments)






