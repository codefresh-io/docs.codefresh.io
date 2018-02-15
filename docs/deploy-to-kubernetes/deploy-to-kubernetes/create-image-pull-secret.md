---
layout: docs
title: "Create Image pull secret"
description: ""
group: deploy-to-kubernetes
sub_group: deploy-to-kubernetes
redirect_from:
  - /docs/create-image-pull-secret
  - /docs/create-image-pull-secret/
  - /docs/create-image-pull-secret/
toc: true
old_url: /docs/create-image-pull-secret
was_hidden: true
---
Image pull secret is required to pull images from private registry. This secret shall be created for each namespace.

## Create image pull secret in Google Cloud shell

This is an example of creating a pull secret to Codefresh registry. You can use the same command to any other private registry (just update registry server).

Run the following script locally on your Kubernetes cluster (where you are about to add your service) and then enter 'cfcr' in the pull secret field. You should do this for each of your namespaces.

  `Shell`
{% highlight sh %}
{% raw %}

export DOCKER_REGISTRY_SERVER=r.cfcr.io
export DOCKER_USER=YOUR_USERNAME
export DOCKER_PASSWORD=YOUR_REGISTRY_PASSWORD
export DOCKER_EMAIL=YOUR_EMAIL

kubectl create secret docker-registry cfcr\
 --docker-server=$DOCKER_REGISTRY_SERVER\
 --docker-username=$DOCKER_USER\
 --docker-password=$DOCKER_PASSWORD\
 --docker-email=$DOCKER_EMAIL
{% endraw %}
{% endhighlight %}
