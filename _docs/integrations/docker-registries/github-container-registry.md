---
title: "GitHub Container Registry"
description: "Learn how to push Docker images to your GitHub Container Registry"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/integrations/docker-registries/github-packages/
toc: true
---

You can use [GitHub Container Registry](https://docs.github.com/en/free-pro-team@latest/packages/getting-started-with-github-container-registry) as your Docker Registry in your Codefresh pipeline. 

## Overview: GitHub Container Registry

The GitHub Container Registry allows you to host and manage your Docker container images in your personal or organisation account on GitHub. One of the benefits is that permissions can be defined for the Docker image independent from any repository. Thus, your repository could be private and your Docker image public. More [information on permissions](https://docs.github.com/en/free-pro-team@latest/packages/managing-container-images-with-github-container-registry/configuring-access-control-and-visibility-for-container-images) are on the GitHub documentation.

The next sections will look at
* How to use The GitHub Container Registry manually
* Automating the process by connecting the Registry to your Codefresh Pipeline

## Using The GitHub Container Registry

You will need the following
* A GitHub account (your GitHub username)
* A personal access token
* The Docker image that you want to push (or use in your Codefresh Pipeline).

## Creating a personal token

The username to the registry is the same as your GitHub username. For the password you need to [create a GitHub personal token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

When creating the personal token, you need to select at least the following scopes:

* `write:packages` 
* `read:packages`
* `delete:packages` 
* `repo` (if your repository is private; do not select if it is public)

Once you create the token, note it down.

You can make sure that your token is valid by using it as password on your local workstation with the docker command:

```
docker login ghcr.io --username github-account
[Paste your GitHub token on this prompt]
```

**Important** Make sure that the URL is correct, otherwise, you will receive login errors later on. The github-account is your GitHub username.

## Tag and push your Docker image

After you are logged in, you can now tag and push your Docker image to the GitHub Container Registry. We will show you two ways to do so. The first one is the manual set-up with the Docker CLI, the second one uses Codefresh to automate the process.

Use the following command to tag your Docker image

```
docker tag image-id ghcr.io/github-account/image-name:image-version
```

For example

```
docker tag 5e369524eecb ghcr.io/anais-codefresh/react-example:1.0
```

You can find your image-id by running:

```
docker images
```

Once pushed, you will see the Docker image in the packages section of your repository.
If you want, you can connect the Docker image to a repository [using the GitHub interface](https://docs.github.com/en/free-pro-team@latest/packages/managing-container-images-with-github-container-registry/connecting-a-repository-to-a-container-image) or by adding a label to your Dockerfile.

```
LABEL org.opencontainers.image.source https://github.com/OWNER/REPO
```

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/github/manual-docker-push.png" 
	url="/images/integrations/docker-registries/github/manual-docker-push.png" 
	alt="Pushing a Docker image manually to GitHub packages"
	caption="Pushing a Docker image manually to GitHub packages" 
	max-width="100%" 
%}

Now that you have verified your token, we can connect the registry to Codefresh.

## Connecting the GitHub registry to Codefresh

Go the [Registry integration screen]({{site.baseurl}}/docs/integrations/docker-registries/) at [https://g.codefresh.io/account-admin/account-conf/integration/registryNew](https://g.codefresh.io/account-admin/account-conf/integration/registryNew) and add a new Registry by choosing [other Registries]({{site.baseurl}}/docs/integrations/docker-registries/other-registries/).

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
* Username - your GitHub username
* Password - your GitHub personal token
* Domain - `ghcr.io`
* [Repository Prefix]({{site.baseurl}}/docs/integrations/docker-registries/#using-an-optional-repository-prefix) - your GitHub username (after expanding the *Advanced Options* sections)

Click the *Test Connection* button and apply your changes if you get a success message.

## Pushing Docker image to registry

With the registry integration in place, you can now push a Docker image in any Codefresh pipeline, simply by mentioning the registry by name (`github-container-registry` in my example).

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/github/github-registry-pipeline.png" 
	url="/images/integrations/docker-registries/github/github-registry-pipeline.png" 
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
  - "clone"
  - "build"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "anais-codefresh/react-article-display"
    revision: "${{CF_BRANCH}}"
    git: "github"
    stage: "clone"

  build:
    title: "Building Docker image"
    type: "build"
    image_name: "react-article-display"
    working_directory: "${{clone}}"
    tags: 
      - "${{CF_BRANCH_TAG_NORMALIZED}}"
      - "2.0.0"
    dockerfile: "Dockerfile"
    stage: "build"
    registry: "github-container-registry"
{% endraw %}
{% endhighlight %}

Notice:

* The `registry: github-container-registry` property in the `build` step, which is the name of the registry that you set-up in the previous step
* The fact that we push multiple Docker tags in a single step; you can define all tags in the `build` step.

After the pipeline has finished the Docker tags can also be seen in the GitHub packages section of the repository.

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
