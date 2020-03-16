---
title: "Deprecation of the Codefresh private Registry"
description: "Migrating images and pipelines to an external registry"
group: troubleshooting
toc: true
---


The private Codefresh registry which is the built-in Docker registry that comes out of the box with all Codefresh accounts is being deprecated. The registry will become read-only on **April 15th 2020** and will be removed completely on **1st May 2020**.

## Adopting an external Docker registry 

The migration effort depends on the usage of the private Codefresh registry in your organization.

1. Customers who use exclusively an external registry and do not depend on the Codefresh registry will have to take no action.
1. Customers who use both the Codefresh registry as well as an external one will need to move all their critical workloads and pipelines to the external one
1. Customers who use the private Codefresh registry for all their needs will need to evaluate and select and external Docker registry and connect it to Codefresh.

The first prerequisite is therefore to [select an external Registry]({{site.baseurl}}/docker-registries/external-docker-registries/). You can use any popular cloud registry such as:

  * [Docker Hub]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/)
  * [Azure Container Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/azure-docker-registry/)
  * [Google Container Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/google-container-registry/)
  * [Amazon EC2 Container Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/)
  * [Bintray.io/Artifactory]({{site.baseurl}}/docs/docker-registries/external-docker-registries/bintray-io/)
  * [Quay.io]({{site.baseurl}}/docs/docker-registries/external-docker-registries/quay-io/)

It is also possible to connect any other cloud or hosted registry that follows the V2 Docker registry protocol.

Some examples of self-hosted registries are:

* The [official registry](https://github.com/docker/distribution) by Docker
* [Nexus](https://www.sonatype.com/nexus-repository-sonatype) by Sonatype
* [Harbor](https://goharbor.io/) by VMware
* [Portus](http://port.us.org/) by Suse
* [Container Registry](https://www.alibabacloud.com/product/container-registry) by Alibaba
* [Openshift registry](https://www.openshift.com/) by Redhat
* [Kraken](https://github.com/uber/kraken) by Uber
* [Proget](https://inedo.com/proget) by Inedo


## Migration schedule


{: .table .table-bordered .table-hover}

| Migration Phase          | Date/Milestone                | Codefresh private Registry status                  |
| -------------- | ---------------------------- |-------------------------|
| Phase A   | Today - 1st April 2020 | Fully functional (push/pull allowed) |
| Phase B   | 1st April- 15th April 2020 |   New build step and image API are available. |
| Phase C   | 15th April - 1st May 2020 |  No pushes are allowed. Registry becomes read-only |
|           | 1st May 2020 | Registry is removed from service |


## Phase A Migration actions until 1st April 2020

At this phase, customers that depend on the private Codefresh should look at their pipelines and deployments and understand where the private Codefresh registry is used. 


### Locating images from the private Codefresh registry in clusters

The most critical action point is to locate docker images that reside in the Codefresh registry and are actually deployed in production clusters.

Here is an example of a Kubernetes deployment manifest.

`example-deployment.yaml`
{% highlight yaml %}
{% raw %}
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: vote
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: vote
    spec:
      containers:
      - image: r.cfcr.io/dockersamples/examplevotingapp:production
        name: vote
{% endraw %}
{% endhighlight %}

The deployment refers to an image to the private Codefresh registry identified by the `r.cfcr.io` prefix. For Helm deployments, images may also be referenced in the Helm values file.

`values.yaml`
{% highlight yaml %}
{% raw %}
replicaCount: 1
image:
  pullPolicy: IfNotPresent
  repository: r.cfcr.io/kostis-codefresh/helm-sample-app-go
service:
  name: my-example-helm-app
  type: LoadBalancer
  externalPort: 80
  internalPort: 8080
 {% endraw %}
{% endhighlight %}

In all these cases, deployment manifests should be changed to mention Docker images that are found in the external Docker registry.

### Locating images from the private Codefresh registry in pipelines

It is also possible that images from the private Registry are used as [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) directly in pipelines.

Here is an example:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - test
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/react-sample-app'
    revision: master
    git: github
  my_unit_tests:
    title: Unit test
    stage: test
    image: r.cfcr.io/kostis-codefresh/my-node-dev-image:9.0
    commands:
      - yarn install
      - yarn test
{% endraw %}
{% endhighlight %}

The second step in this pipeline is using an image from the private registry as mentioned by `r.cfcr.io/kostis-codefresh/my-node-dev-image`. Image references like this will need to be changed to mention an external registry.

Explicit [push steps]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) must also change to refer to an external registry:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
- checkout
- build
- push
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    stage: checkout
    repo: 'codefreshdemo/cf-example-build-and-push'
    revision: 'master'
    git: github
  build_my_app:
    title: Building Node.Js Docker Image
    type: build
    stage: build
    image_name: my-node-js-app
    working_directory: '.'
    tag: 'master'
    dockerfile: Dockerfile
  push_to_my_registry:
    stage: 'push'
    type: push
    title: Pushing to internal registry
    candidate: ${{build_my_app}}
    tag: 'v1.0.0'
    registry: cfcr
{% endraw %}
{% endhighlight %}

In this pipeline the last step is pushing a docker image to the internal Codefresh. You will need to change the `registry` property to the nane of an external registry.

>Note the name `cfcr` shown above is just a convention. You can find the actual name given to the private Codefresh in the [Registry settings screen](https://g.codefresh.io/account-admin/account-conf/integration/registry). From the same screen you can also see the name of your external registry


### Promoting images from the private registry to an external ones.

Another migration step for this phase is to move all existing images from the private Codefresh registry to the external one. You can use the [Image dashboard](https://g.codefresh.io/images/) to locate and analyze your existing Docker images. You can then migrate Docker images in 3 ways

1. If you know the pipeline that created this image, you can simply rerun the pipeline with a new push step
1. You can promote the image directly from the private Registry to your external one
1. You can perform mass migration with a migration script

The first case is linked with the push steps mentioned in the previous section.

If your existing pipeline pushes to cfcr:

{% highlight yaml %}
{% raw %}
  push_to_my_registry:
    stage: 'push'
    type: push
    title: Pushing to internal registry
    candidate: ${{build_my_app}}
    tag: 'v1.0.0'
    registry: cfcr
{% endraw %}
{% endhighlight %}

then you can simply change the `registry` property to your external registry and re-run the pipeline.

{% highlight yaml %}
{% raw %}
  push_to_my_registry:
    stage: 'push'
    type: push
    title: Pushing to external registry
    candidate: ${{build_my_app}}
    tag: 'v1.0.0'
    registry: my-external-registry
{% endraw %}
{% endhighlight %}

Note that `my-external-registry` is just the unique name assigned to your registry from the [Registry settings screen](https://g.codefresh.io/account-admin/account-conf/integration/registry).

You can also promote images from the [manually from the UI]({{site.baseurl}}/docs/docker-registries/codefresh-registry/#promoting-docker-images) or with a [pipeline]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#promoting-docker-images).

If you wish to perform migration of Docker images in a batch manner, you can also use the [migration script offered by Codefresh](https://github.com/codefresh-io/cfcr-migration).




### Summary of actions and results of migration phase A

Here is a summary of customer actions at the end of 1st April 2020

* You need to evaluate external Docker registry services and connect at least one in your Codefresh account
* Change Kubernetes deployments and Helm releases to pull images from the external Registry instead of the private one
* Do not use private Codefresh images in any pipeline (especially freestyle steps). Use images from the external registry only
* Change all pipeline push steps to use specifically the external Docker registry
* Promote essential images from the internal registry to the external Docker registry
* No pipeline should push to the internal Codefresh registry.


## Phase B Migration actions until 15th April 2020

At that start of Phase B (1st April 2020) Codefresh will offer the following new features:

1. The ability to define a default registry for the build step to push to (currently the build step is always pushing to the private Registry) 
1. The ability to define an explicit registry in the build step (overriding the default)
1. The ability to disable the automatic push of the build step completely (currently a build will always push to the internal Codefresh registry)
1. The ability to define an explicit registry for [caching]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/)
1. A new image dashboard that will show docker images from all connected registries (and not just the private Codefresh registry)

### Using a default registry for pipelines

Once these features are available for customers, you need to inspect your pipelines and make sure you:

1. Set as default registry in your Codefresh account the external one
1. Set as default caching registry in your Codefresh account the external one  (or in your Hybrid Codefresh runner)
1. If you have more than one external registries, override the default one in any build steps that you want to use another registry other than the default (if this scenario is useful to you)
1. Disable auto-push on pipelines that don't need it if they also have a push step.

For the second point here is the syntax for the new build step:


{% highlight yaml %}
{% raw %}
 build_step:
    type: build
    stage: build
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}
    image_name: codefresh/cf-api
    registry: my-external-registry
{% endraw %}
{% endhighlight %}

For the third point, here is the syntax for disabling auto-push

{% highlight yaml %}
{% raw %}
 build_step:
    type: build
    stage: build
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}
    image_name: codefresh/cf-api
    disablePush: true
{% endraw %}
{% endhighlight %}

This way you get maximum flexibility on what build and push steps are doing in your pipelines.

### Using the new Docker image dashboard/API

The Codefresh CLI as well as the Codefresh UI will now show images for all external registries. This means that all Docker images in pipelines and/or scripts will need to have an explicit prefix in order for Codefresh to understand which external registry they belong to (if you have more than one).

If you don't have a prefix, Codefresh will assume that this image refers to Dockerhub.

You will need to 

* Check all custom scripts you have that use Codefresh CLI and make sure that images mentioned refer to your external registry
* Check any API integrations you have created with the Codefresh Image API and make sure that images mentioned refer to your external registry




### Summary of actions and results of migration phase B

Here is a summary of customer actions at the end of 15th March 2020

* Setup a default registry in your Codefresh account for the registry that is used in push steps as well as caching
* Decide if you want your build steps to push automatically to the default registry or not
* Make sure that all your APIs calls or Codefresh CLI invocations mention images with an explicit Docker registry prefix


## Phase C Migration actions until 1st May 2020

At this phase, the private Codefresh registry will become readonly. Pipelines will be able to pull from it, but all pushes are disallowed.

If you have performed all the migration steps explained in the previous phases, nothing will break. However if you still have push steps that refer to the internal registry or have not selected yet a default registry, your pipelines will now *fail*.

This is also the last opportunity for migrating images from the private Registry to the external one.

### Summary of actions and results of migration phase C

Here is a summary of customer actions at the end of 1st May 2020

* Monitor your pipelines and make sure that they push to the external registry only
* Double-check your clusters and make sure that they pull from an external registry
* Check that caching works in your pipelines as well as Hybrid environments by making sure that the external Docker registry has enough capacity.

## Complete removal of the Codefresh private registry on 1st May 2020

The private Docker registry will be removed from service on 1st May 2020

* Pipelines that still pull from it will stop working
* Kubernetes clusters that will pull from it will have failed deployments

## What to read next

* [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [Accessing a Docker registry from your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/)





