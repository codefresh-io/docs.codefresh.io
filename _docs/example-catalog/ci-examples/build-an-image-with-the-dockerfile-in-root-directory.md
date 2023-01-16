---
title: "Build an Image with the Dockerfile in root directory"
description: "Get started quickly with building Docker images"
group: example-catalog
sub_group: ci-examples
toc: true
---
Building a Docker image is one of the basic operations in Codefresh pipelines.

>The source code of the repository is at [https://github.com/codefreshdemo/cf-yml-example-build-dockerfile-inroot](https://github.com/codefreshdemo/cf-yml-example-build-dockerfile-inroot){:target="\_blank"}. Feel free to fork it if you want to follow along.

If you don't have a Codefresh account already, you can easily create a free one from the [sign-up page]({{site.baseurl}}/docs/administration/account-user-management/create-a-codefresh-account/).


## Building a Dockerfile from the root folder

By default, if you run a single command like the one below, Docker uses the Dockerfile of the current folder:

```
docker build . -t my-web-app
```

You can get the same result within a Codefresh pipeline:


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

You can also change the Docker build context by editing the `working_directory` property. By default, it looks at the root folder of the project, but any subfolder path is also valid.


## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Build step in pipelines]({{site.baseurl}}/docs/pipelines/steps/build/)  
[Build an Image by specifying the Dockerfile location]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-specify-dockerfile-location)  
[Build an Image from a different Git repository]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-from-a-different-git-repository)  
[Build and push an Image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image)  
[Build an Image with build arguments]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-with-build-arguments)
