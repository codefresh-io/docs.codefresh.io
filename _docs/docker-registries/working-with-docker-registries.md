---
title: "Working with Docker Registries"
description: "How to push, pull and tag Docker images in Codefresh pipelines"
group: docker-registries
toc: true
---

Codefresh contains first class Docker registry support. This means that you don't need to manually write `docker login` and `docker pull/push` commands inside pipelines. You use instead declarative YAML and all credential configuration is configured centrally once.

## Pulling Docker images

Pulling Docker images in Codefresh is completely automatic. You only need to mention a Docker image by name and Codefresh will automatically pull it for you and use it in a pipeline. 

### Pulling public images

To pull a public image from Dockerhub or other public registry you simply mention the name of the image and tag that you want to use. For example:

```yaml
CollectAllMyDeps:
  title: Install dependencies
  image: python:3.6.4-alpine3.6
  commands:
    - pip install .
```

This [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) will pull from Dockerhub the image `python:3.6.4-alpine3.6` and then run the command `pip install .` inside it. You can see the image get pulled in the [Codefresh pipeline log]({{site.baseurl}}/docs/configure-ci-cd-pipeline/monitoring-pipelines/).

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/working-with-images/pull-public-image.png" 
	url="/images/artifacts/working-with-images/pull-public-image.png" 
	alt="Pulling a public image" 
	caption="Pulling a public image" 
	max-width="70%" 
%}

The image will also be cached in the [image cache]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/#distributed-docker-image-caching) without any other configuration.

Codefresh will also automatically pull for you any images mentioned in Dockerfiles (i.e. the `FROM` directive) as well as [service containers](docs/codefresh-yaml/service-containers/).


### Pulling private images

To pull a private image from the [internal Codefresh registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/), again you mention the image by name and tag. In order for Codefresh to understand that you are talking about a private image you need to prepend the `r.cfcr.io` prefix along with your username.

The full image name will be in the form:

```
r.cfcr.io/<ACCOUNT>/<IMAGE>:<TAG>
```

You can find the full name of any docker image by visiting your registry and looking at the URL field of any tag:

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/cfcr/remove-image-tag.png" 
	url="/images/artifacts/cfcr/remove-image-tag.png" 
	alt="Looking at tag of a private image" 
	caption="Looking at tag of a private image"
	max-width="65%" 
%}

Note however that because the Codefresh registry is fully automated (successful pipelines automatically push there), you very rarely need to pull private images by name as you can simply mention their step name, as explained in the next section.

### Pulling images that were just built in the same pipeline

The Codefresh private registry is deeply integrated into Codefresh pipelines and pulls/pushes to it happen in a transparent manner. In most scenarios (such as [unit tests]({{site.baseurl}}/docs/testing/unit-tests/)) you mention private Docker images there were also built in the same pipeline.

In that case, as a shortcut Codefresh allows you to simply [mention the name]({{site.baseurl}}/docs/codefresh-yaml/variables/#context-related-variables) of the respective [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/).

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/python-flask-sample-app'
    revision: 'master'
    git: github
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-app-image
    working_directory: ./
    tag: 'master'
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    image: '${{MyAppDockerImage}}'
    commands:
      - python setup.py test
  
{% endraw %}
{% endhighlight %}

In this pipeline Codefresh:

1. Checks out source code with the [git-clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. Builds a docker image that gets named `r.cfcr.io/kostis-codefresh/my-app-image:master`
1. Automatically pushes the image to the private docker registry (notice the lack of `docker push` commands)
1. In the next step automatically pulls that image and runs `python setup.py test` inside it. Again notice the lack of `docker pull` commands.

The important line here is the following:

{% highlight yaml %}
{% raw %}
    image: ${{MyAppDockerImage}}
{% endraw %}    
{% endhighlight %}

This says to Codefresh "in this step please use the Docker image that was built in the step named `MyAppDockerImage`".

You can see the automatic pull inside the Codefresh logs.

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/working-with-images/pull-private-image.png" 
	url="/images/artifacts/working-with-images/pull-private-image.png" 
	alt="Auto-Pulling a private image" 
	caption="Auto-Pulling a private image" 
	max-width="70%" 
%}


Therefore in most cases you don't need to specifically mention `r.cfcr.io` inside your pipelines (only in Dockerfiles).



### Pulling images from external registries



## Pushing Docker images

### Using multiple tags

### Pushing images in parallel

## Promoting Docker images

### Tagging images after deployment

### See also

* [Codefresh Registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/)
* [Push pipeline step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [Accessing Docker registry from your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/)

