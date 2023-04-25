---
title: "How-to: Use Testcontainers Library in a Codefresh Pipeline"
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

Testcontainers is a library, for Java, that allows you to run your tests interacting with Docker containers, by using the `docker-java` client library. More information on its official site: [testcontainers.org](https://www.testcontainers.org/).

Besides the ability to run a Gradle/Maven process in your pipeline, to effectively use Testcontainers in Codefresh, you'll need to provide direct access to the Docker Daemon, so it can perform its internal operations (creating the containers, getting network information from them, executing commands in the running containers, among other common actions).

## Details

As mentioned above, the main prerequisite to fulfill is access to the Docker Daemon. To know how to do that in Codefresh, please take a look at this article: [How-to: Access the Docker Daemon in a Codefresh build]({{site.baseurl}}/docs/troubleshooting/kb-articles/docker-daemon-access/).

Once you have cleared that pre-requisite, the next step is to simply run that Gradle /Maven build, that will use Testcontainers as part of its tasks.

### The basic use-case

Assuming you already have a repository with the tests you want to execute using Testcontainers, and a Codefresh pipeline with a git-trigger pointing to that repo, then, a step to execute the tests would be something like this:

{% raw %}

```yaml
using_testcontainers:
  image: gradle:6.7.1
  working_directory: ${{clone}}
  commands:
    - gradle test --no-daemon --build-cache --gradle-user-home=${{CF_VOLUME_PATH}}/.gradle -Dmaven.repo.local=${{CF_VOLUME_PATH}}/m2
```

{% endraw %}

> **Note** : the step above is being executed on a Hybrid RE (Runner RE), where access to the Docker Daemon is enabled by default. If you're using a SaaS RE (hosted by Codefresh), you can use a `composition` step. Look for the article mentioned above for more details on how to access the Docker Daemon in Codefresh.

### Dealing with Private Docker Images

When you use freestyle steps, or compositions, Codefresh automatically deals with the operations required to pull the private image(s), from the corresponding registry, referenced in the `image` field of the freestyle step, or in the composition-services.

When using Testcontainers, that library will rely on the configured access at the client. That means, that Codefresh won't be the one pulling the private images, that operation is delegated to Testcontainers.

Also for freestyle-steps **there's no** Docker configuration that makes the registries you have configured in Codefresh, available for that step.

There are different approaches to deal with this:

#### OPTION 1 - Create and use a`config.json` file for Docker, to be used by Testcontainers

You can create a `config.json` file, with the required credentials:

Example `config.json` file:

```json
{"auths":{"https://index.docker.io/v1/":{"auth":"dXNlcjpwYXNz","email":"email@example.com"}}}
```  

> **Note** : the content of `auth` is the `user:password` base64-encoded

This `config.json` file can be created during pipeline execution, and then define a reference to it, so Testcontainers can use those creds and auth to the registry.

For example:

{% raw %}

```yaml
creating_docker_config:
  image: alpine
  commands:
    - echo  ${DOCKER_CONFIG} > ${{CF_VOLUME_PATH}}/config.json
```

{% endraw %}

In this case, `DOCKER_CONFIG` is a variable, its content is the JSON object specified above.

This variable can be defined using encrypted pipeline variables, or encrypted shared configs. But you can create that file in any other way that is convenient for you.

Then, you'll need to configure the `DOCKER_CONFIG` environment variable in the step that will execute the `gradle test` command, so it points to the directory that contains the `config.json` file created in the previous step.

For example:

{% raw %}

```yaml
using_testcontainers:
  image: gradle:6.7.1
  working_directory: ${{clone}}
  commands:
    - gradle test --no-daemon --build-cache --gradle-user-home=${{CF_VOLUME_PATH}}/.gradle -Dmaven.repo.local=${{CF_VOLUME_PATH}}/m2
  environment:
    - DOCKER_CONFIG=${{CF_VOLUME_PATH}}
```

{% endraw %}

This will instruct `testcontainers` to use that `config.json` file, so it'sable to pull the private images available on the configured registry.

#### OPTION 2 - Pre-pull the images

A simpler option could be to just pre-pull the images before the step that executes the `gradle test` command.

This will delegate the logic behind pulling a private image to Codefresh, and once the image has been pulled, it will available in the local Docker-storage, and Testcontainers won't need to pull it again, thus, it won't face any authorization issue.

A way to pull an image is simply using a _"dummy"_ freestyle step:

```yaml
pulling_image:
  image: my_private/image:x.y
  commands:
    - exit 0
```

If you need to pull multiple private images for your Testcontainers tests, then, instead of defining N freestyle steps (one per image), you can use a _"dummy"_ composition. Each of the composition-services will have as `image` the private image you need to pull. Codefresh will be in charge of pulling each of the images that are used in that composition.

You can define and use that composition in the same step you execute the `grade test` command, by using our [Service Containers feature]({{site.baseurl}}/docs/pipelines/service-containers/#using-sidecar-services-in-specific-steps). For example:

{% raw %}

```yaml
using_testcontainers:
  image: gradle:6.7.1
  working_directory: ${{clone}}
  commands:
  - gradle test --no-daemon --build-cache --gradle-user-home=${{CF_VOLUME_PATH}}/.gradle -Dmaven.repo.local=${{CF_VOLUME_PATH}}/m2
  services:
    composition:
      my_private_image_1:
        image: my_private/image:x.y
        entrypoint: sh -c "exit 0"
      my_private_image_2:
        image: my_private/image-two:z.w
        entrypoint: sh -c "exit 0"
```

{% endraw %}

Take into consideration that Service Containers also supports a reference to a `docker-compose.yml` file. If you can dynamically modify that file, adding the private images you'll need, then, in the `services.composition` field, you can just reference that `docker-compose.yml` file. That way you don't need to hardcode each of the images in the composition, for that step.

> **Note** : this way of pre-pulling images using service-containers is only valid when using Hybrid REs, since the main step will automatically have access to the Docker Daemon. If you're running in a SaaS RE, then, you can use one of the other alternatives to access the Docker Daemon. For example, using a `composition` step you can define each of the composition-services to be an image to be pulled, and the `composition_candidates` could be the service that will run the Testcontainers tests, and the one with access to the Docker Daemon.

The benefit of this approach (" _pre-pulling the images_ "), over Option 1, is that you don't need to worry about authentication to the registry, Codefresh will automatically handle that, based on the registry integrations you have already added to Codefresh.

Also, this approach addresses one of the limitations of Option 1: it can deal with private images from multiple registries. Codefresh will be the one pulling from each of the appropriate registries, leaving the image in the Local Docker-storage.

>**_General Notes_** During the examples described here, only Gradle was mentioned, but the process is very similar if Maven is used.

## Related Items

* [How-to: Access the Docker Daemon in a Codefresh build]({{site.baseurl}}/docs/troubleshooting/kb-articles/docker-daemon-access/)
* [Testcontainers.org](https://www.testcontainers.org/)
* [Using Private Images in Testcontainers](https://www.testcontainers.org/modules/docker_compose/#using-private-repositories-in-docker-compose)
