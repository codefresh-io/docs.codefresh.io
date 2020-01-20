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
	file="/images/artifacts/working-with-images/private-image-tag.png" 
	url="/images/artifacts/working-with-images/private-image-tag.png" 
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

To pull images from external registries you need to connect them first to Codefresh. This happens via the [external registry configuration screen]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). The credentials are defined centrally there
and then all pipelines are credential free.

To pull an image from an external registry, you simply mention the image by name as shown in the previous sections. Codefresh will use the domain prefix of each image to understand which integration it will use. It will then take care of all `docker login` and `docker pull` commands on its own behind the scenes.

For example if you have connected [Azure]({{site.baseurl}}/docs/docker-registries/external-docker-registries/azure-docker-registry/), [AWS]({{site.baseurl}}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/) and [Google]({{site.baseurl}}/docs/docker-registries/external-docker-registries/google-container-registry/) registries, you can pull 3 images for each in a pipeline like this:


 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  my_go_unit_tests:
    title: Running Go Unit tests
    image: 'us.gcr.io/project-k8s-sample-123454/my-golang-app:prod'
    commands:
      - go test -v
  my_mvn_unit_tests:
    title: Running Maven Unit tests
    image: '123456789012.dkr.ecr.us-west-2.amazonaws.com/my-java-app:latest'
    commands:
      - mvn test
  my_python_unit_tests:
    title: Running Python Unit tests
    image: 'my-azure-registry.azurecr.io/kostis-codefresh/my-python-app:master'
    commands:
      - python setup.py test        
{% endraw %}
{% endhighlight %}

Codefresh will automatically login to each registry using the credentials you have defined centrally and pull all the images. The same thing will happen with Dockerfiles that mention any valid docker image in their `FROM` directive.


## Pushing Docker images

Pushing to the built-in registry is completely automatic. All successful [build steps]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) automatically push the private Docker registry without any extra configuration.

To push to an external registry you only need to know how this registry is [linked into Codefresh]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) and more specifically what is unique name of the integration. You can see that name by visiting your [integrations screen](https://g.codefresh.io/account-admin/account-conf/integration/registry) or asking your Codefresh administrator.


{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/working-with-images/linked-docker-registries.png" 
	url="/images/artifacts/working-with-images/linked-docker-registries.png" 
	alt="Name of linked Docker Registries" 
	caption="Name of linked Docker Registries" 
	max-width="50%" 
%}

Once you know the registry identifier you can use it an [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) by mentioning the registry with that name:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
  build_image:
    title: Building my app image
    type: build
    image_name: my-app-image
    dockerfile: Dockerfile
    tag: 'master'
  push_to_registry:
    title: Pushing to Docker Registry 
    type: push
    #Name of the build step that is building the image
    candidate: '${{build_image}}'
    tag: '1.2.3'
    # Unique registry name
    registry: azure-demo       
{% endraw %}
{% endhighlight %}

Notice that
 * the `candidate` field of the push step mentions the name of the build step (`build_image`) that will be used for the image to be pushed
 * The registry is only identified by name (i.e. `azure-demo`). The domain and credentials are not part of the pipeline (they are already known to Codefresh by the Docker registry integration)

 You can also override the name of the image with any custom name. This way the push step can choose any image name regardless of what was used in the build step.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
  build_image:
    title: Building my app image
    type: build
    image_name: my-app-image
    dockerfile: Dockerfile
    tag: 'master'
  push_to_registry:
    title: Pushing to Docker Registry 
    type: push
    #Name of the build step that is building the image
    candidate: '${{build_image}}'
    tag: '1.2.3'
    # Unique registry name
    registry: azure-demo
    image_name: my-company/web-app       
{% endraw %}
{% endhighlight %}

Here the build step is creating an image named `my-app-image:master` but the push step will actually push it as `my-company/web-app:1.2.3`

For more examples such as using multiple tags, or pushing in parallel see the [push examples]({{site.baseurl}}/docs/codefresh-yaml/steps/push/#examples)

## Promoting Docker images

Apart from building and pushing a brand new docker image, you can also "promote" a docker image by copying it from one registry to another. This is accomplished by specifying an existing image in the `candidate` field of the push step.

For example:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
  promote_to_production_registry:
    title: Promoting to Azure registry 
    type: push
    candidate: r.cfcr.io/kostis-codefresh/my-app-image:master
    tag: '1.2.3'
    # Unique registry name
    registry: azure-demo      
{% endraw %}
{% endhighlight %}

In the example above we promote an image from the internal Codefresh registry to an external Azure registry (which is already setup as `azure-demo`).

You can also "promote" docker images within the same registry by simply creating new tags. 
For example:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
  promote_to_production:
    title: Marking image with prod tag
    type: push
    candidate: my-azure-registry.azurecr.io/kostis-codefresh/my-python-app:1.2.3
    tag: 'production'
    # Unique registry name
    registry: azure-demo      
{% endraw %}
{% endhighlight %}

In the example above the image `my-azure-registry.azurecr.io/kostis-codefresh/my-python-app:1.2.3` is re-tagged as `my-azure-registry.azurecr.io/kostis-codefresh/my-python-app:prod`. A very common pattern is to mark images with a special tag such as `prod` **after** the image has been deployed successfully.


## What to read next

* [Codefresh Registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/)
* [Push pipeline step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [Accessing Docker registry from your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/)
* [Build and Push an image example]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)

