---
layout: docs
title: "Codefresh Docker Registry"
description: ""
group: docker-registries
redirect_from:
  - /docs/codefresh-registry
  - /docs/codefresh-registry/
  - /docs/docker-registries/
toc: true
---
When creating Codefresh account you will automatically get access to your Codefresh Registry which stores and lets you distribute docker images.

All images built in Codefresh are automatically pushed to your Codefresh registry.

With Codefresh registry you will be able to:
- Control where your images are being stored
- Fully own your images distribution pipeline
- Integrate image storage and distribution into your in-house development workflow

See bellow, how to use CFCR locally to push/pull/search images.

## Generate CFCR Login Token

First, you will need a Codefresh API token. To get it, login into Codefresh and navigate to `User Settings`. Generate Codefresh Registry Access Token and copy this token from there.

{% include image.html lightbox="true" file="/images/ef442a8-Pasted_image_at_2017_07_02_10_59_AM.png" url="/images/ef442a8-Pasted_image_at_2017_07_02_10_59_AM.png" alt="Codefresh Registry Access Token" max-width="65%" %}

## Use Codefresh Registry Locally

By default, all CF users have permissions to `push`, `pull` and `search` Docker images in every user CF account.

  `Text`
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

## Use Codefresh Registry in codefresh

To integrate with Codefresh Registry, first select **Codefresh Registry** from the new registry drop down and then provide the following

* Registry Name - A unique name for this configuration
* Username - Your username in Codefresh
* Access token - Your generated access token

{% include image.html lightbox="true" file="/images/541c633-codefresh_cfcr_registry.png" url="/images/541c633-codefresh_cfcr_registry.png" alt="Codefresh cfcr registry" max-width="65%" %}

__Images built in Codefresh__

- All images built in Codefresh are automatically pushed to the Codefresh registry after the build.
- Distinguishing between images which were pushed to the registry and old images which were not pushed (Turquoise tags for new and Grey tags for old).
- To push the old images to the Codefresh Registry you can do it on the tab Images, just click on the button `Promote image` and specify the image name in the format `r.cfcr.io/<ACCOUNT>/<IMAGE>`

## Pull image from Codefresh Registry

In the tab  __Images__ for each image, you can find the command to pull this image from Codefresh Registry.

{% include image.html lightbox="true" file="/images/265ae4b-codefresh_images_pull_img.png" url="/images/265ae4b-codefresh_images_pull_img.png" alt="Codefresh Pull Images" max-width="65%" %}

__Login To CFCR__
In order to pull images from Codefresh's registry you must first login. Use this Docker command to authenticate.

  `docker login`
{% highlight terminal %}
docker login -u <USERNAME> -p <ACCESS_TOKEN> r.cfcr.io
{% endhighlight %}

__Pull Docker Image__
Use this Docker pull command to download the image[](ni)

  `docker pull`
{% highlight terminal %}
docker pull r.cfcr.io/<ACCOUNT>/<IMAGE>:<TAG>
{% endhighlight %}

### See also
[Kubernetes: Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/){:target="_blank"}
