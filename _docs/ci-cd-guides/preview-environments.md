---
title: "Preview Environments"
description: "Deploy Pull Requests to cluster namespaces"
group: ci-cd-guides
toc: true
---

In the [previous guide]({{site.baseurl}}/docs/ci-cd-guides/environment-deployments/) we have seen how you can handle deployments to predefined environments (QA/Staging/production).

Another type of environments that you should manage is dynamic temporary environments for each pull request. For this type
of environments it is best if you create dynamically an environment when a Pull Request is created and tear it down when the Pull Request is closed.

{% include image.html
lightbox="true"
file="/images/guides/preview-environments/dynamic-environments.png"
url="/images/guides/preview-environments/dynamic-environments.png"
alt="Dynamic Test environments"
caption="Dynamic Test environments"
max-width="90%"
%}

This way each developer is working in isolation and can test their feature on its own. This pattern comes in contrast with  the traditional way of reusing static preexisting environments.

{% include image.html 
lightbox="true"
file="/images/guides/preview-environments/static-environments.png"
url="/images/guides/preview-environments/static-environments.png"
alt="Traditional static environments"
caption="Traditional static environments"
max-width="90%"
%}

With Kubernetes you don't need to book and release specific test environments any more. Testing environments should
be handled in a transient way.

## Preview environments with Kubernetes

## The example application

## Creating preview environments for each pull request

## Cleaning up temporary environments


## What to read next

* [How Codefresh pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
* [Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)





