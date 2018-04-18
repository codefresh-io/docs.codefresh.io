---
title: "Accessing Codefresh Docker registry from your Kubernetes cluster"
description: ""
group: deploy-to-kubernetes
redirect_from:
  - /docs/access-codefresh-docker-registry-from-kubernetes/
toc: true
---
Please see [Kubernetes: Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/){:target="_blank"}.

When creating a Kubernetes Secret using instructions found in the link above:
- the Docker server to use is **r.cfcf.io**
- the username is your Codefresh username
- the password is a valid [CFCR Login Token]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/#generate-cfcr-login-token).

Be sure to create the Secret in the namespace in which your application will run.
