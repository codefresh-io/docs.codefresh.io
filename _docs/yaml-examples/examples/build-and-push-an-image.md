---
title: "Build and Push an Image"
description: "How to build Docker images and push them to registries with Codefresh"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/build-and-push-an-image/
toc: true
---

Building a Docker image and then pushing it to a registry is one of the most basic scenarios for creating a Pipeline.
In this example we will use a demo Node.js application that will be packaged in a Docker image.

>The source code of the repository is located at [https://github.com/codefreshdemo/cf-example-build-and-push](https://github.com/codefreshdemo/cf-example-build-and-push). Feel free to fork it if you want to follow along.

If you don't already have a Codefresh account, you can easily create a free one from the [sign-up page]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/).


## Building a Docker image and pushing it to the Codefresh registry

All Codefresh accounts come with a [private integrated Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/). The nice thing about this registry is that it is fully automated. All successful pipelines in Codefresh automatically push to that registry without any other configuration.

So in the most simple case, you only need a [single build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) and  Codefresh will automatically push the image for you!

Here is the full pipeline:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_image:
    title: Building Voting Image
    type: build
    image_name: my-voting-image
    dockerfile: Dockerfile
{% endhighlight %}

If you [create this pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) in Codefresh and run it you will see the automatic pushing of the image in the Codefresh registry:

```
The push refers to repository [r.cfcr.io/kostis-codefresh/my-voting-image]                                                                 
Layer '4624212f67bc' successfully pushed
Layer '573f5d62f821' successfully pushed    
Layer '573f5d62f821' successfully pushed
...
```

You can then visit the Codefresh Registry and view your image:

{% include image.html
  lightbox="true"
  file="/images/examples/push-to-private-registry.png"
  url="/images/examples/push-to-private-registry.png"
  alt="Pushing to the built-in registry"
  caption="Pushing to the built-in registry"
  max-width="70%"
    %}


That's it. Using the Codefresh Registry is very easy, and no extra configuration is needed.

## Building a Docker image and pushing it to an external registry.

You can also push your image to any [external Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). First you need to connect your external registry
in the integrations page. Here are the instructions for:

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
version: '1.0'
steps:
  build_image:
    title: Building Voting Image
    type: build
    image_name: my-voting-image
    dockerfile: Dockerfile
  push_to_registry:
    title: Pushing to Docker Registry 
    type: push
    #A candidate is the image that we want to push to registry
    candidate: {% raw %}'${{build_image}}'{% endraw %}
    # You can push the image with whatever tag you want. In our example we use CF_BRANCH that holds the git branch name
    tag: {% raw %}'${{CF_BRANCH}}'{% endraw %}
    registry: <your-registry-configuration-name>    
{% endhighlight %}

Codefresh has several other variables that can be used for tagging images. Other common examples that you can use are `CF_SHORT_REVISION` or `CF_BUILD_ID`. See the [variables page]({{site.baseurl}}/docs/codefresh-yaml/variables/) for more information.

## More options for push

Codefresh has several more options when it comes to pushing
 
* You can specify multiple tags to be pushed
* You can use directly ECR registries
* You can embed credentials in the push steps

See the [push step documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) for more details.






