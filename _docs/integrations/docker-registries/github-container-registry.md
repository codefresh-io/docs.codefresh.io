---
title: "GitHub Container Registry"
description: "Push Docker images to GitHub Container Registry with pipeline integrations"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/integrations/docker-registries/github-packages/
toc: true
---

Configure [GitHub Container Registry](https://docs.github.com/en/free-pro-team@latest/packages/getting-started-with-github-container-registry){:target="\_blank"} as your Docker Registry, and use it in your Codefresh pipeline. 


The GitHub Container Registry allows you to host and manage Docker container images in your personal or organisation account on GitHub. One of the benefits is that permissions can be defined for the Docker image, independent of any repository. Thus, your repository could be private and your Docker image public.  
See GitHub documentation for more [information on permissions](https://docs.github.com/en/free-pro-team@latest/packages/managing-container-images-with-github-container-registry/configuring-access-control-and-visibility-for-container-images){:target="\_blank"}.

You can use the GitHub Container Registry manually or automate the process by connecting the registry to your Codefresh pipeline.


## Using the GitHub Container Registry

You will need the following
* A GitHub account with your GitHub username
* A personal access token
* The Docker image you want to push or use in your Codefresh pipeline

### Create a personal token

The username to the registry is the same as your GitHub username. 
For the password you need to [create a GitHub personal token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token){:target="\_blank"}.

When creating the personal token, you need to select at least the following scopes:

* `write:packages` 
* `read:packages`
* `delete:packages` 
* `repo` if your repository is private; if public, do not select

Once you create the token, note it down.

You can make sure that your token is valid by using it as a password on your local workstation with the Docker command:

```
docker login ghcr.io --username github-account
[Paste your GitHub token on this prompt]
```

**Important** Make sure that the URL is correct, otherwise, you will receive login errors later on. The github-account is your GitHub username.

### Tag and push your Docker image

After you are logged in, you can now tag and push your Docker image to the GitHub Container Registry. The first method is the manual setup with the Docker CLI, and the second one uses Codefresh to automate the process.

Use the following command to tag your Docker image:

```
docker tag image-id ghcr.io/github-account/image-name:image-version
```

For example:

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

## Set up GitHub Container Registry integration

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Other Registries**.
1. Define the following:  
  * **Registry name**: A unique name for this configuration.
  * **Username**: Your GitHub username.
  * **Password**: Your GitHub personal token.
  * **Domain**: `ghcr.io`.
  * Expand **Advanced Options** and define the [**Repository Prefix**]({{site.baseurl}}/docs/integrations/docker-registries/#using-an-optional-repository-prefix) as your GitHub username.

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/github/github-registry-codefresh.png" 
	url="/images/integrations/docker-registries/github/github-registry-codefresh.png" 
	alt="GitHub Container Registry settings"
	caption="GitHub Container Registry settings" 
	max-width="70%" 
%}

{:start="5"}
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.



## Pushing Docker image to registry

With the registry integration in place, you can now push a Docker image in any Codefresh pipeline, simply by mentioning the registry by name (`github-container-registry` in the example).

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


## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)  
[Push step]({{site.baseurl}}/docs/pipelines/steps/push/)  
[Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)  
