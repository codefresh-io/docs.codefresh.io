---
title: "How To: Access the Docker Daemon in a Codefresh build"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

This article describes how to access the Docker Daemon within a pipeline step for custom use cases.

## Docker Daemon access support

> Docker Daemon as only available on the **Hybrid Runtime** and **On-Prem** instances. Docker Daemon access is not supported on **SaaS Runtimes** for security Reasons.

Codefresh's built-in steps cover the most common uses-cases for access to the Docker Daemon:

* Build a Docker image: [Build step]({{site.baseurl}}/docs/pipelines/steps/build/)
* Push a Docker image: [Push step]({{site.baseurl}}/docs/pipelines/steps/push/)
* Run a Docker Composition: [Composition step]({{site.baseurl}}/docs/pipelines/steps/composition/) and [Service Containers]({{site.baseurl}}/docs/pipelines/service-containers/)

You may have custom use-cases when you need direct access to the Docker Daemon in your steps.  
For example:

* As part of your test-step you need to dynamically create new containers ([Testcontainers](https://www.testcontainers.org/) library)
* You need to run a composition and dynamically add to that composition a new container you'll create
* You need to send specific flags to your docker-build process

For all custom cases, you can access the Docker Daemon in your pipeline step by providing the correct configuration in `freestyle` and `composition` steps. <!--- and under certain circumstances -->.

## Direct access to Docker Daemon options

There are two main options to access the Docker Daemon in a pipeline step:

* **In a [`freestyle`]({{site.baseurl}}/docs/pipelines/steps/freestyle/) step**: By using an image with Docker installed, and mounting the required volumes (the Docker socket). In Hybrid Runtime Environments, these volumes are already mounted. You don't need to specify anything else.
* **In a [`composition`]({{site.baseurl}}/docs/pipelines/steps/composition/) step**: Similar to the `freestyle` step option, you'll need to use an image with Docker installed in one of the composition-services. And mount the corresponding volumes to that composition-service.

The following sections provide details on how to use each of the options.

### Accessing the Docker Daemon in a `freestyle` step

The following snippet shows an example of how to access the Docker Daemon in a `freestyle` step:

```yaml
docker_daemon_access:
  image: docker
  commands:
    - docker version
    - docker ps
    - docker run alpine ping 8.8.8.8 -c 4
    - docker build -t your/image -f yourDockerfile .
```  

### Accessing the Docker Daemon in a composition step

The following snippet shows an example of how to access the Docker Daemon in a `composition` step:

{% raw %}

```yaml
docker_daemon_access:
  title: composition style step
  type: composition
  composition:
    version: '2'
    services:
      docker_compose:
        image: docker/compose
        command: sh -c "docker-compose --version"
        volumes: # Volumes required to run DIND and to mount your Repository
          - /var/run/docker.sock:/var/run/docker.sock
          - /var/lib/docker:/var/lib/docker
          - ${{CF_VOLUME_NAME}}:/codefresh/volume
  composition_candidates:
    test_service:
      image: docker
      command: docker ps
      volumes: # Volumes required to run DIND and to mount your Repository
        - /var/run/docker.sock:/var/run/docker.sock
        - /var/lib/docker:/var/lib/docker
        - ${{CF_VOLUME_NAME}}:/codefresh/volume
```

{% endraw %}

* On-premises  
  This approach is supported out-of-the-box in on-premises environments.
* Hybrid REs  
  Docker socket mapping in `composition` is supported only when the concurrency is set to **all**.

A similar implementation can be achieved using **[Service Containers]({{site.baseurl}}/docs/pipelines/service-containers/)** :

{% raw %}

```yaml
docker_daemon_access_serv_cont:
  image: alpine
  commands:
    - echo testing
  services:
    composition:
      my_service:
        image: docker
        command: docker ps
        volumes: # Volumes required to run DIND and to mount your Repository
          - /var/run/docker.sock:/var/run/docker.sock
          - /var/lib/docker:/var/lib/docker
          - ${{CF_VOLUME_NAME}}:/codefresh/volume
```

{% endraw %}

{{site.data.callout.callout_tip}}
We encourage you to keep using our built-in steps as they cover almost all common use cases for access to the Docker Daemon.

Because the built-in steps support different levels of optimization, such as the Codefresh caching mechanism, their usage is directly related to the level of traceability. For example, the images you build in Codefresh using the `build` step  are reflected in the images view and other dashboards we provide.

Reserve directly accessing the Docker Dameon **for very specific use-cases.**

## Related Items

[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Caching in pipelines]({{site.baseurl}}/docs/pipelines/pipeline-caching/)  
