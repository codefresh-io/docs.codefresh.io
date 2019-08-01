---
title: "Codefresh Docker Registry"
description: "How to use the integrated Docker registry of your account"
group: docker-registries
redirect_from:
  - /docs/docker-registries/
  - /docs/codefresh-registry/
toc: true
---
When creating [a Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) you will automatically get access to your Codefresh Registry which stores and lets you distribute docker images.

All images built in Codefresh are automatically pushed to your Codefresh registry.

With the integrated Codefresh registry you will be able to:
- Control where your images are being stored
- Fully own your images distribution pipeline
- Integrate image storage and distribution into your in-house development workflow

Notice that despite the extra features, the Codefresh registry is using the official Docker registry API and is usable even outside of Codefresh, using any of your existing Docker tools.

All images stored in Codefresh registry are private by default. To access and push images you need to authenticate using a token (explained below).

## Viewing your Docker images

To see all images currently stored in the Codefresh Registry, select *Artifacts -> Images* from the left sidebar and you will see a sorted list of all images.

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/cfcr/codefresh-registry-list.png" 
	url="/images/artifacts/cfcr/codefresh-registry-list.png" 
	alt="Codefresh Registry Image List" 
	caption="Codefresh Registry Image List" 
	max-width="70%" 
%}

For each image you get some basic details such as the git branch, commit message and hash that created it, date of creation as well as all tags. You can click on any image and look at [its individual metadata]({{site.baseurl}}/docs/docker-registries/metadata-annotations/).

Notice that the last Docker image produced by any **successful** Codefresh pipeline will automatically be pushed to the Codefresh registry. This behavior is completely automated and requires zero configuration on your part.

>You can still use the [push pipeline step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) if you wish to customize the image details or want to use an [external registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) such as Azure, Google, Bintray etc.

On the top left of the screen you can find several filters that allow you to search for a specific subset of Docker images:

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/cfcr/codefresh-registry-filters.png" 
	url="/images/artifacts/cfcr/codefresh-registry-filters.png" 
	alt="Codefresh Registry Image filters" 
	caption="Codefresh Registry Image filters" 
	max-width="40%" 
%}

Filters include:

* Tagged/untagged images
* Base image name
* Git branch
* Tag
* Pipeline volumes

You can add multiple filters and they will work in an `AND` manner.

On the right side of the screen you also have a list of buttons for actions on each Docker image.
These are:

* Launching a Docker image as a [test environment]({{site.baseurl}}/docs/getting-started/on-demand-environments/)
* Promoting a Docker image (explained below)
* Looking at the docker commands that allow you to pull the image locally on your workstation
* Re-running the pipeline that created this image

## Promoting Docker images 

As we already mentioned, all successful Codefresh pipelines automatically push the Docker image they produced in the internal Codefresh registry.

You have the capability to "promote" any image of your choosing and push it to an external Registry that you have integrated into Codefresh (such as Azure, Google, Bintray etc)

To do this, first you need to connect at least one [external Codefresh registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).

Once that is done, click the *Promote* button for the image you wish to promote:

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/cfcr/docker-image-promotion.png" 
	url="/images/artifacts/cfcr/docker-image-promotion.png" 
	alt="Promoting a Docker image" 
	caption="Promoting a Docker image" 
	max-width="50%" 
%}

You will get a list of your external registries. Choose the target Registry and define the tag that you want to push. Then click the *Promote* button to "copy" this image from the Codefresh registry to the target Registry.

You can also do a promotion programmatically in a pipeline by using the [push  step]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/).



## Generate CFCR Login Token

You can use the internal Codefresh registry as is, for automatic pushing from your pipelines. For most production environments however, you will need to interface with it in an external manner. For these cases you need to authenticate to the Registry (as by default all Codefresh registry images are private).

First, you need a Codefresh API token. To get it, login into Codefresh and navigate to [User Settings](https://g.codefresh.io/user/settings). Generate a Codefresh Registry Access Token and copy this token to your clipboard.

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/cfcr/codefresh-registry-token.png" 
	url="/images/artifacts/cfcr/codefresh-registry-token.png" 
	alt="Codefresh Registry Access Token" 
	caption="Codefresh Registry Access Token" 
	max-width="50%" 
%}

You can create multiple tokens for different uses. From the same screen you can also revoke any existing token if it is not used anymore or has been compromised.

## Use Codefresh Registry Locally

By default, all Codefresh users have permissions to `push`, `pull` and `search` Docker images in every user Codefresh account. Once you have your token you can use any Docker command from your local workstation.

 
{% highlight bash %}
# login to CFCR
docker login r.cfcr.io -u CF_USER_NAME -p CFCR_LOGIN_TOKEN
{% endhighlight %}
{% highlight bash %}
# push Docker image
docker push r.cfcr.io/CF_ACCOUNT/ANY_IMAGE:ANY_TAG
{% endhighlight %}
{% highlight bash %}
# pull Docker image
docker pull r.cfcr.io/CF_ACCOUNT/ANY_IMAGE:ANY_TAG
{% endhighlight %}

{: .table .table-bordered .table-hover}
| `CF_USER_NAME`             | Your username in Codefresh                                 |
| `CFCR_LOGIN_TOKEN`         | CFCR Login Token that was generated in the previous step   |
| `CF_ACCOUNT`               | Name of your account in Codefresh                          |
| `ANY_IMAGE`                | Image name                                                 |
| `ANY_TAG`                  | Tag of your image                                          |

Notice that any images you push externally in this manner will NOT appear in the Codefresh UI.  They are still present in the registry (and you can pull them with the respective Docker commands), but they are not visible in the Image list in your Codefresh UI.

>Part of the rationale actually relates to security. The only images we show in the UI are ones that were built with Codefresh. Building images locally doesn't follow best practices since those images can contain anything and aren't tied to source code. 


## Use Codefresh Registry in Codefresh

To integrate with Codefresh Registry (e.g. for [deploying to a Kubernetes cluster]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)), first 
go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. 
On the first section called *Integrations* click the *Configure* button next to *Docker Registry*.

Finally click *Add Registry* and select *Codefresh Registry* from the new registry drop down and then provide the following:

* Registry Name - a unique name for this configuration.
* Username - your username in Codefresh.
* Access token - your generated access token.

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/cfcr/codefresh-registry.png" 
	url="/images/artifacts/cfcr/codefresh-registry.png" 
	alt="Codefresh Docker registry registry" 
	max-width="65%" 
%}

__Images built in Codefresh__

- All images built in Codefresh are automatically pushed to the Codefresh registry after the build.
- Distinguishing between images which were pushed to the registry and old images which were not pushed (Turquoise tags for new and Grey tags for old).
- To push the old images to the Codefresh Registry you can do it on the tab Images, just click on the button `Promote image` and specify the image name in the format `r.cfcr.io/<ACCOUNT>/<IMAGE>`.

## Pull image from Codefresh Registry

In the tab  __Images__ for each image, you can find the command to pull this image from Codefresh Registry.

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/cfcr/copy-image.png" 
	url="/images/artifacts/cfcr/copy-image.png" 
	alt="Codefresh Docker registry registry" 
	max-width="65%" 
%}

__Login To CFCR__
In order to pull images from Codefresh's registry you must first login. Use this Docker command to authenticate.

  `docker login`
{% highlight bash %}
docker login -u <USERNAME> -p <ACCESS_TOKEN> r.cfcr.io
{% endhighlight %}

__Pull Docker Image__
Use this Docker pull command to download the image

  `docker pull`
{% highlight bash %}
docker pull r.cfcr.io/<ACCOUNT>/<IMAGE>:<TAG>
{% endhighlight %}

## Remove images from Codefresh Registry

The Codefresh Registry is fully managed for you and the amount of space it consumes does not affect you in any way (Codefresh pricing does not depend on the space you consume for Docker images).

If you still want to remove an image from the respective view you can just untag it.

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/cfcr/remove-image-tag.png" 
	url="/images/artifacts/cfcr/remove-image-tag.png" 
	alt="Removing image from Codefresh registry" 
	caption="Removing image from Codefresh registry"
	max-width="65%" 
%}

Once you remove all of its tags, the image will not be shown in the internal Codefresh registry list.

### See also

* [Push pipeline step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [Accessing Docker registry from your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/)

