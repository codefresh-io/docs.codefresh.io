---
title: "Deprecation of the Codefresh private Registry"
description: "Migrating images and pipelines to an external registry"
group: troubleshooting
toc: true
---


The private Codefresh registry which is the built-in Docker registry that comes out of the box with all Codefresh accounts is being deprecated. The registry will become read-only on **April 1st 2020** and will be removed completely on **15th April 2020**.

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
| Phase A   | Today - 15th March 2020 | Fully functional (push/pull allowed) |
| Phase B   | 15th March- 1st April 2020 |   Fully functional (push/pull allowed) |
| Phase C   | 1st April - 15th April 2020 |  No pushes are allowed. Registry is read-only |
|           | 15th April 2020 | Registry is removed from service |


## Phase A Migration actions until 15th of March 2020

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
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi
ingress:
  enabled: false
 {% endraw %}
{% endhighlight %}

In all these cases, deployment manifests should be changed to mention Docker images that are found in the external Docker registry

### Locating images from the private Codefresh registry in pipelines

TBD


### Promoting images from the private registry to an external ones.

TBD

### Summary of actions and results of migration phase A

TBD

## Phase B Migration actions until 1st April 2020

TBD

### Summary of actions and results of migration phase B

TBD

## Phase C Migration actions 15th April 2020

TBD

### Summary of actions and results of migration phase C

TBD

## Complete removal of the Codefresh private registry on 15th April 2020

TBD





