---
title: "Build and push an Image"
description: "Build Docker images and push them to registries with Codefresh"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/yaml-examples/examples/build-and-push-an-image/
  - /docs/build-and-push-an-image/
  - /docs/docker-registries/push-image-to-a-docker-registry/ 
toc: true
---

Building a Docker image and then pushing it to a registry is one of the most basic scenarios for creating a pipeline.
In this example we will use a demo Node.js application that will be packaged in a Docker image.

The source code of the repository is at [https://github.com/codefreshdemo/cf-example-build-and-push](https://github.com/codefreshdemo/cf-example-build-and-push){:target="\_blank"}. Feel free to fork it if you want to follow along.

If you don't have a Codefresh account already, you can easily create a free one from the [sign-up page]({{site.baseurl}}/docs/administration/account-user-management/create-a-codefresh-account/).


## Building and push Docker image to default registry

Building a Docker image with Codefresh is easy, and only requires a simple step. In addition, all successful pipelines in Codefresh automatically push to [your default Docker registry]({{site.baseurl}}/docs/integrations/docker-registries/#the-default-registry), without  additional configuration, if you have one.

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

## Building and pushing Docker image to _any registry_.

<!---check link-->You can push your image to any [registry]({{site.baseurl}}/docs/integrations/docker-registries/). 

* First you need to connect your external registry in the integrations page. Here are the instructions for:

  * [Docker Hub]({{site.baseurl}}/docs/integrations/docker-registries/docker-hub/)
  * [Google Container Registry]({{site.baseurl}}/docs/integrations/docker-registries/google-container-registry/)
  * [Amazon EC2 Container Registry]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/)
  * [Bintray.io]({{site.baseurl}}/docs/integrations/docker-registries/bintray-io/)
  * [Quay.io]({{site.baseurl}}/docs/integrations/docker-registries/quay-io/)
  * [Other Registries]({{site.baseurl}}/docs/integrations/docker-registries/other-registries/)

* Then add a [push step]({{site.baseurl}}/docs/pipelines/steps/push/) in your pipeline and use the registry name of your integration.

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
Codefresh has several variables that you can use to tag images. Common examples are `CF_BRANCH_TAG_NORMALIZED`, `CF_SHORT_REVISION` or `CF_BUILD_ID`. Read more on [variables]({{site.baseurl}}/docs/pipelines/variables/).

{% include image.html
  lightbox="true"
  file="/images/examples/docker-build/build-and-push-pipeline.png"
  url="/images/examples/docker-build/build-and-push-pipeline.png"
  alt="Pushing image to external registry"
  caption="Pushing image to external registry"
  max-width="100%"
    %}


If you run the pipeline, the Docker image is pushed *both* to the private Docker regisry (by the build step) *and* the external docker registry (by the push step).


## More options for pushing images

Codefresh has several options when it comes to pushing images:
 
* You can specify multiple tags to be pushed
* You can use directly ECR registries
* You can embed credentials in the push steps

Read more in [push steps]({{site.baseurl}}/docs/pipelines/steps/push/) in pipelines.


## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Build an Image with the Dockerfile in root directory]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-with-the-dockerfile-in-root-directory/)  
[Build an Image by specifying the Dockerfile location]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-specify-dockerfile-location)  
[Build an Image from a different Git repository]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-from-a-different-git-repository)  
[Build an Image With Build arguments]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-with-build-arguments)

