---
title: "Github Docker Registry"
description: "Learn how to push Docker images as Github packages"
group: integrations
sub_group: docker-registries
toc: true
---

[GitHub Packages](https://github.com/features/packages) is an artifact storage solution that among other formats, can also be used as a Docker registry.
Since the API follows the standard Registry protocol, you can connect the GitHub Docker Registry as a Docker registry in Codefresh and push images from your Codefresh pipelines

## GitHub registry naming restrictions

Notice that unlike other Docker registries that you might be familiar with, GitHub Docker images have specific naming restrictions. This happens because all Docker images are placed under a specific Git repository (instead of being placed in a generic Docker registry for your whole GitHub account).

Docker images pushed as GitHub packages

1. Are available at the domain `docker.pkg.github.com`
1. Must have as first prefix your GitHub username
1. Must have as second prefix an **existing** Git Repository in your GitHub account.

Therefore if you already have a Git repository called `super-git-project` under your `joe` account, some examples of valid Docker names are:

```
docker.pkg.github.com/joe/super-git-project/my-docker-image:1.0
docker.pkg.github.com/joe/super-git-project/my-second-docker-image:latest
docker.pkg.github.com/joe/super-git-project/my-third-docker-image:34ae34f
```

If you don't follow this naming pattern, your push will be rejected.


## Creating a personal token

The username to the registry is the same as your GitHub username. For the password you need to [create a GitHub personal token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

You need to select at least the following scopes:

* `write:packages` 
* `read:packages`
* `delete:packages` 
* `repo` (if your repository is private)

Once you create the token, note it down.

You can make sure that your token is valid by using it as password on your local workstation with the docker command:

```
docker login docker.pkg.github.com --username kostis-codefresh 
[Paste your GitHub token on this prompt]
docker tag go-sample-app docker.pkg.github.com/kostis-codefresh/trivial-go-web/go-sample-app:1.0
docker push docker.pkg.github.com/kostis-codefresh/trivial-go-web/go-sample-app:1.0
[...image layers are pushed here...]
```

And then you will see the Docker image in the packages section of your repository.

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/github/manual-docker-push.png" 
	url="/images/integrations/docker-registries/github/manual-docker-push.png" 
	alt="Pushing a Docker image manually to GitHub packages"
	caption="Pushing a Docker image manually to GitHub packages" 
	max-width="100%" 
%}

Now that you have verified your token we can connect the registry to Codefresh

## Connecting the GitHub registry to Codefresh

Go the [Registry integration screen]({{site.baseurl}}/docs/integrations/docker-registries/) at [https://g.codefresh.io/account-admin/account-conf/integration/registryNew](https://g.codefresh.io/account-admin/account-conf/integration/registryNew) and add a new Registry by choosing [other Registries]({{site.baseurl}}/docs/integrations/docker-registries/other-registries/) from the drop-down menu.


{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/github/github-registry-codefresh.png" 
	url="/images/integrations/docker-registries/github/github-registry-codefresh.png" 
	alt="Entering GitHub Registry details"
	caption="Entering GitHub Registry details" 
	max-width="100%" 
%}

Enter your details:

* Registry Name - a unique name for this configuration (arbitrary name)
* Username - your GitHub username.
* Password - your GitHub personal token
* Domain - `docker.pkg.github.com`
* [Repository Prefix]({{site.baseurl}}/docs/integrations/docker-registries/#using-an-optional-repository-prefix) - your GitHub username (after expanding the *Advanced Options* sections)

Click the *Test Connection* button and apply your changes if you get a success message.

## Pushing a Docker image as a GitHub package

With the registry integration in place, you can now push a Docker image in any Codefresh pipeline, simply by mentioning the registry by name (`github-packages` in my example).

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/github/github-packages-pipeline.png" 
	url="/images/integrations/docker-registries/github/github-packages-pipeline.png" 
	alt="Codefresh pipeline for GitHub packages"
	caption="Codefresh pipeline for GitHub packages"
	max-width="100%" 
%}

Here is the definition of the Codefresh pipeline.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
- 'my build phase'
- 'my push phase'
steps:
  clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    arguments:
      repo: kostis-codefresh/trivial-go-web
      revision: master
      git: github
  MyAppDockerImage:
    title: Building Docker Image
    stage: 'my build phase'
    type: build
    working_directory: ${{clone}}
    arguments:
      image_name: my-app-image
      dockerfile: Dockerfile
  pushToMyRegistry:
    stage: 'my push phase'
    type: push
    title: Pushing to a registry
    candidate: ${{MyAppDockerImage}}
    tags: 
    - ${{CF_SHORT_REVISION}}
    - latest
    - 2.0.0
    registry: github-packages
    image_name: trivial-go-web/my-go-app
{% endraw %}
{% endhighlight %}

Notice:

* The `registry: github-packages` property in the `pushToMyRegistry` step
* The fact that we push multiple Docker tags in a single step
* The prefix `image_name: trivial-go-web/my-go-app` so that the final image is compliant with GitHub naming.

After the pipeline has finished the Docker tags can also be seen in the GitHub package section of the repository.


{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/github/multiple-docker-tags.png" 
	url="/images/integrations/docker-registries/github/multiple-docker-tags.png" 
	alt="Pushing different Docker tags"
	caption="Pushing different Docker tags"
	max-width="100%" 
%}

You can now treat this registry like any other Codefresh registry.


## What to read next

* [Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)
* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)