---
title: "How-to: Access the Docker Daemon in a Codefresh build"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

The general and most common uses-cases that require access to the Docker
Daemon are covered by [Codefresh-provided native
steps](https://codefresh.io/docs/docs/codefresh-yaml/steps/):

  * To build a Docker image: [Build step](https://codefresh.io/docs/docs/codefresh-yaml/steps/build/)
  * To push a Docker image: [Push step](https://codefresh.io/docs/docs/codefresh-yaml/steps/push/)
  * To run a Docker Composition: [Composition step](https://codefresh.io/docs/docs/codefresh-yaml/steps/composition/) and [Service Containers](https://codefresh.io/docs/docs/codefresh-yaml/service-containers/)

But there are still cases when you need direct access to the Docker Daemon in
your steps, for example:

  * As part of your test-step you need to dynamically create new containers (e.g.: [Testcontainers](https://www.testcontainers.org/) library)
  * You need to run a composition and dynamically add to that composition a new container you'll create
  * You need to send specific flags to your docker-build process

For all those cases (and any others), you're still able to access the Docker
Daemon on a step of your build, by providing the correct configuration (and
under certain circumstances).

## Details

There are two main options to access the Docker Daemon in a pipeline step:

  * **In a[freestyle](https://codefresh.io/docs/docs/codefresh-yaml/steps/freestyle/) step**: using an image with Docker installed, and mounting the required volumes (the Docker socket). In Hybrid REs, these volumes are already mounted. You don't need to specify anything else.
  * **In a[composition](https://codefresh.io/docs/docs/codefresh-yaml/steps/composition/) step**: same as with the freestyle option, you'll need to use an image with Docker installed in one of the composition-services. Also, you'll need to mount the corresponding volumes to that composition-service

In the following sections, we'll provide details on how to use each of the
options described above.

### Accessing the Docker Daemon in a freestyle step

The following snippet shows a step using this approach:

    
    
      docker_daemon_access:
        image: docker
        commands:
          - docker version
          - docker ps
          - docker run alpine ping 8.8.8.8 -c 4      
          - docker build -t your/image -f yourDockerfile . 
    

> **Note 1** : By default, and for security reasons, the Docker Daemon is not
> exposed to freestyle steps running on our SaaS environments. In other words,
> this approach **cannot** be used in our SaaS Runtime Environments.
>
> **Note 2** : There's still a way to use this approach in a RE **hosted by
> Codefresh**. For this option, you'll need a **dedicated Runtime
> Environment**.
>
> **Note 3** : This approach is **usable by default in Hybrid REs** (i.e.:
> Codefresh Runner REs). Since the REs is running in your infrastructure,
> access to the Docker Daemon in a freestyle step is enabled by default

### Accessing the Docker Daemon in a composition step

The following snippet shows a step using this approach:

    
    
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
    

> **Note 1** : This approach can be used in On-Prem out-of-the-box  
>  
>  **Note 2** : Docker socket mapping in composition can only be provided to
> customers that have **all** concurrency in **Hybrid REs** , or, in a
> **dedicated cluster** (provided by Codefresh)

A similar implementation can be achieved using **[Service
Containers](https://codefresh.io/docs/docs/codefresh-yaml/service-
containers/)** :

    
    
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
    

**_Note:_**

As mentioned at the beginning of this article, Codefresh covers the general
cases where access to the Docker Daemon is required (building a Docker image,
pushing a Docker image, etc). For all these common cases **we encourage you to
keep using our native steps**. Since they'll provide different levels of
optimization (e.g.: Codefresh-cache mechanism), also their usage is directly
related to the level of traceability you will get (e.g.: the images you build
in Codefresh using our docker-build step will be reflected in the images view
and other dashboards we provide).

This way of directly accessing the Docker Dameon should be **exclusively used
for very specific use-cases.**

## Related Items

  * [Build step](https://codefresh.io/docs/docs/codefresh-yaml/steps/build/)
  * [Composition step](https://codefresh.io/docs/docs/codefresh-yaml/steps/composition/)
  * [Push step](https://codefresh.io/docs/docs/codefresh-yaml/steps/push/)
  * [Service Containers](https://codefresh.io/docs/docs/codefresh-yaml/service-containers/)

