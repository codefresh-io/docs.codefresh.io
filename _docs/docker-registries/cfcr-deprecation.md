---
title: "Deprecation of the Codefresh Container Registry"
description: "Migrating images and pipelines to an external registry"
group: docker-registries
toc: true
---


| Important Date          | Codefresh Container Registry status                  |
| -------------- | ---------------------------- |
| 1st April 2020  | New build step and image API are available. |
| Now until July 1st 2020  | Fully functional (push/pull allowed) |
| July 1st  2020 | No pushes allowed. Registry becomes read-only|
| 15th July 2020   | Codefresh Container Registry is removed from service |



The Codefresh Container registry which is the built-in Docker registry that comes out of the box with all Codefresh accounts is being deprecated. The registry will become read-only on **July 1st 2020** and will be removed completely on **July 15th 2020**.

## Terminology for this document

{: .table .table-bordered .table-hover}

| Term          | Description                | 
| -------------- | ---------------------------- |
| Codefresh Container registry   | The built-in registry available to all accounts. This registry is decommissioned. |
| Caching registry   | Registry used for [caching]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/#docker-registry-caching). Currently served by the Codefresh registry|
| Default Registry   | Registry where pipelines auto-push their docker images |
| External Registry | Any other external registry which is linked to Codefresh such as ACR, GCR, ECR etc. |
| Image dashboard          | The [Image registry viewer]({{site.baseurl}}/docs/docker-registries/codefresh-registry/#viewing-your-docker-images). Currently shows images from Codefresh registry only|
| Pipeline Build step | The [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) that currently auto-pushes to the Codefresh Container registry |
| SAAS installation | The cloud version of Codefresh where everything is managed by Codefresh personnel |
| Hybrid installation | Codefresh installation where customers [use the Codefresh runner]({{site.baseurl}}/docs/enterprise/behind-the-firewall/) | 
| On-prem installation | Installation of Codefresh that is running fully on customer premises without any cloud interaction.


## Who is affected from the removal of the Codefresh Container registry

* If you running the on-prem version of Codefresh, there is no requirement to take immediate action. Your Codefresh account manager will let you know how you will upgrade to the next version.
* If you running the hybrid version of Codefresh, you are affected and you also need to decide which external registry you will use as caching registry
* If you are using the SAAS version of Codefresh, you are affected and need to select an external registry to use in your account.

In most cases migration is trivial, unless you are using solely the Codefresh Container registry for your artifact storage.

## Adopting an external Docker registry 

The migration effort depends on the usage of the Codefresh Container registry in your organization.

1. Customers who use exclusively an external registry and do not depend on the Codefresh Container registry will have to take no action.
1. Customers who use both the Codefresh Container registry as well as an external one will need to move all their critical workloads and pipelines to the external one
1. Customers who use the Codefresh Container registry for all their needs will need to evaluate and select and external Docker registry and connect it to Codefresh.

The first prerequisite is therefore to [select an external Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). You can use any popular cloud registry such as:

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


Summary of actions by customers

{: .table .table-bordered .table-hover}

| Migration Phase          | Action               | 
| -------------- | ---------------------------- |
| Now  | Investigate external Registry options. Replace Codefresh Container registry with an External Docker registry in all pipelines | 
| From April 1st to July 1st   | Choose default registry for auto-push and validate that all pipelines do NOT use the Codefresh Container registry. Setup meeting with CSM as needed|   
| July 1st   | No push allowed. Validate that no cluster, workflow or pipeline is still using the Codefresh Container registry. Confirm migration completion with Codefresh |  




## Phase A Migration actions until 1st April 2020

At this phase, customers that depend on the Codefresh Container registry should look at their pipelines and deployments and understand where the Codefresh Container registry is used. 


### Locating images from the Codefresh Container registry in clusters

The most critical action point is to locate docker images that reside in the Codefresh Container registry and are actually deployed in production clusters.

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

The deployment refers to an image to the Codefresh Container registry identified by the `r.cfcr.io` prefix. For Helm deployments, images may also be referenced in the Helm values file.

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

### Locating images from the Codefresh Container registry in pipelines

It is also possible that images from the Codefresh Container Registry are used as [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) directly in pipelines.

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

The second step in this pipeline is using an image from the registry as mentioned by `r.cfcr.io/kostis-codefresh/my-node-dev-image`. Image references like this will need to be changed to mention an external registry.

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

In this pipeline the last step is pushing a docker image to the internal Codefresh. You will need to change the `registry` property to the name of an external registry.

>Note the name `cfcr` shown above is just a convention. You can find the actual name given to the Codefresh Container Registry in the [Registry settings screen](https://g.codefresh.io/account-admin/account-conf/integration/registry). From the same screen you can also see the name of your external registry


### Promoting images from the Codefresh Container registry to an external ones.

Another migration step for this phase is to move all existing images from the Codefresh Container registry to the external one. You can use the [Image dashboard](https://g.codefresh.io/images/) to locate and analyze your existing Docker images. You can then migrate Docker images in 3 ways

1. If you know the pipeline that created this image, you can simply rerun the pipeline with a new push step
1. You can promote the image directly from the Codefresh Container Registry to your external one
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
* Change Kubernetes deployments and Helm releases to pull images from the external Registry instead of the Codefresh one
* Do not use Codefresh images in any pipeline (especially freestyle steps). Use images from the external registry only
* Change all pipeline push steps to use specifically the external Docker registry
* Promote essential images from the Codefresh Container registry to the external Docker registry
* No pipeline should push to the Codefresh Container registry.


## Phase B Migration actions until 1st July 2020

At that start of Phase B (1st April 2020) Codefresh will offer the following new features:

1. The ability to define a default registry for the build step to push to (currently the build step is always pushing to the Codefresh Container Registry) 
1. The ability to define an explicit registry in the build step (overriding the default)
1. The ability to disable the automatic push of the build step completely (currently a build will always push to the internal Codefresh Container registry)
1. The ability to define an explicit registry for [caching]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/)
1. A new image dashboard that will show docker images from all connected registries (and not just the Codefresh Container registry)

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

Here is a summary of customer actions at the end of 1st July 2020

* Setup a default registry in your Codefresh account for the registry that is used in push steps as well as caching
* Decide if you want your build steps to push automatically to the default registry or not
* Make sure that all your APIs calls or Codefresh CLI invocations mention images with an explicit Docker registry prefix


## Phase C Migration actions until 15th July 2020

At this phase, the Codefresh Container registry will become readonly. Pipelines will be able to pull from it, but all pushes are disallowed.

If you have performed all the migration steps explained in the previous phases, nothing will break. However if you still have push steps that refer to the Codefresh Container registry or have not selected yet a default registry, your pipelines will now *fail*.

This is also the last opportunity for migrating images from the Codefresh Container Registry to the external one.

### Summary of actions and results of migration phase C

Here is a summary of customer actions at the end of 15th July 2020

* Monitor your pipelines and make sure that they push to the external registry only
* Double-check your clusters and make sure that they pull from an external registry
* Check that caching works in your pipelines as well as Hybrid environments by making sure that the external Docker registry has enough capacity.

## Complete removal of the Codefresh Container registry on 15th July 2020

The Codefresh Container registry will be removed from service on 15th July 2020

* Pipelines that still pull from it will stop working
* Kubernetes clusters that will pull from it will have failed deployments

## Motivation behind the Registry removal

Codefresh was one of the [first solutions to include a built-in Registry](https://codefresh.io/docker-registry/free-private-docker-registry/). When this started it was a unique and important feature. But over time, it’s value has diminished as Docker registries have become common.

The Codefresh registry was always offered to all customers free of charge and without any (hard) storage limits. Behind the scenes, the Codefresh registry is based on Google storage (similar to GCR) but with some extra Codefresh modifications. For all intents and purposes the Codefresh registry was fully controlled by us in all aspects (domain prefix, authorization and authentication).

Four years ago, having a built-in private registry was a huge competitive advantage, that helped us make users familiar with Docker images.

Nowadays however, Docker (i.e. containers) are an established technology and many vendors offer [external Docker registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) that work perfectly fine with Codefresh pipelines. It therefore makes sense for us to focus on implementing brand new CI/CD features as we look into the future of the Kubernetes/Helm ecosystem.

## Customer usage of the Codefresh Registry

One of the factors in our decision for deprecation was customer usage of the registry. We saw that most of our customers are already using an external Docker registry in addition to the private one.

We support natively [promoting Docker images]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#promoting-docker-images) from the private Registry to an external one. This means that most of our customers will migrate their images to an external registry with minimum impact.

We are also contacting customers who exclusively use the Codefresh registry for all their deployments to offer them special assistance regarding the migration.

## Keeping the unique features of Codefresh regarding registries

The Codefresh container registry also had some extra features unique to Codefresh such as a [smart Docker image cache]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/#docker-registry-caching).

We know that these features are important to several customers and we wish to keep them. SAAS customers will get a caching registry out of the box. Customers with hybrid runtimes will still get caching from any external registry they connect, which in many cases will actually yield a performance improvement as well as improved security.

This way customers will still be able to enjoy fast builds and dynamic pipeline steps by using their own registry. Development for this new functionality is already underway.

## New features planned for Docker Registries

With the removal of the Codefresh registry we are also re-evaluating some long standing features and enhancements that we always wanted to add to the Codefresh registry and are now more useful in regards to the deprecation announcement.

First of all, we intend to make the registry view a universal dashboard that will be used for all external docker registries. Previously this dashboard only showed images in the Codefresh registry.

This means that customers who used both the Codefresh and an external registry had to visit two distinct places to see their images. One of the main goals of Codefresh however is the full visibility of all phases of the software life cycle within a single application and having two different places to look at Docker images goes against this goal.

In addition, we will offer more flexibility to customers regarding the auto-push of docker images to any external registry, as well as which external registry is considered the “default” for auto-pushes. Previously all these options were hardcoded and customers had zero flexibility on how to use the Codefresh registry.

In summary, even though we are deprecating the Codefresh registry, we are committed to making Codefresh the best solution for working with external Docker registries.

## Migration of images from the Codefresh container registry to the external one

Among other things, we will offer an automated way to migrate Docker images from the Codefresh registry to an external one. This way if a customer has Docker images which for some reason cannot be recreated by an existing pipeline (and therefore pushed to an external registry), they will all be migrated to an external Docker registry.

We will  also offer dedicated support and special assistance to customers who need help with the migration period or otherwise face significant impact from the deprecation of the private Registry

## Contact information 

Please do not hesitate to contact us with questions or concerns. We are here to help. Feel free to contact our special deprecation team at cfcr-removal@codefresh.io or your designated Codefresh account manager for more information.

## What to read next

* [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [Accessing a Docker registry from your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/)





