---
title: "Build an Image from a different Git repository"
description: "Build microservices from other repositories"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/build-an-image-from-a-different-git-repository/
toc: true
---

In most cases, your Codefresh pipeline checks out a single Git repository. Codefresh has great support also for [monorepos]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#using-the-modified-files-field-to-constrain-triggers-to-specific-folderfiles) if you have placed all your applications in a single repository.

A Codefresh pipeline is not really tied to a specific Git repository, which means that by [checking out multiple Git repositories]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/#cloning-multiple-repositories) you can build Docker images from other unrelated repositories in a single pipeline if you wish to do so.

## Building Docker images from other Git repositories


Here is a Codefresh pipeline that checks out two microservices from two different Git repositories.

{% include image.html 
lightbox="true" 
file="/images/examples/docker-build/build-from-other-git-repo.png" 
url="/images/examples/docker-build/build-from-other-git-repo.png" 
alt="Checkout and build docker images"
caption="Checkout and build docker images"
max-width="100%" 
%}

And here is the [pipeline definition]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/).

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - 'clone phase'
  - 'build phase'
steps:
  checkoutApp1:
    title: 'Cloning first repository...'
    type: git-clone
    repo: kostis-codefresh/example_nodejs_postgres
    revision: experiment1
    git: github
    stage: 'clone phase'
  checkoutApp2:
    title: 'Cloning second repository...'
    type: git-clone
    repo: kostis-codefresh/trivial-go-web
    revision: master
    git: github
    stage: 'clone phase'
  myFirstDockerImage:
    title: 'Building Microservice A'
    type: build
    dockerfile: Dockerfile
    image_name: my-nodejs-image
    tag: from-develop-branch
    working_directory: './example_nodejs_postgres'
    stage: 'build phase'   
  mySecondDockerImage:
    title: 'Building Microservice B'
    type: build
    dockerfile: Dockerfile
    working_directory: './trivial-go-web'
    image_name: my-app-image
    tag: from-master-branch
    stage: 'build phase'
{% endraw %}      
{% endhighlight %}

The pipeline first checks out two different Git repositories, which themselves contain Dockerfiles. Then it creates a Docker image for each one using the respective Dockerfile.

<!--check if this topic exists-->You can see both images in the [Docker image dashboard]({{site.baseurl}}/docs/docker-registries/#viewing-docker-images) .

{% include image.html 
lightbox="true" 
file="/images/examples/docker-build/two-docker-images.png" 
url="/images/examples/docker-build/two-docker-images.png" 
alt="Docker images from other Git repos"
caption="Docker images from other Git repos"
max-width="100%" 
%}


Notice that there are no explicit push steps in the pipeline, as all successful Codefresh pipelines automatically push to the private Docker registry.


## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/)  
[Build step in pipelines in pipelines]({{site.baseurl}}/docs/pipelines/steps/build/)  
[Build and Push an image]({{site.baseurl}}/docs/pipelines/examples/build-and-push-an-image/)  
[Parallel pipelines]({{site.baseurl}}/docs/pipelines/advanced-workflows/)  
