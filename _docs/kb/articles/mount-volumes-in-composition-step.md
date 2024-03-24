---
title: "How To: Mount volumes in a composition step where source is inside the Codefresh Volume"
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

This article describes how to mount a volume within a named Docker volume to overcome the Docker limitation. 

>**NOTE**  
This article is relevant when `docker-compose.yml` file in the `composition` step.




## Overview

Compositions steps can only mount {% raw %}`${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}`{% endraw %}.

If you need to mount `/codefresh/volume/<REPO>/<DIR>/` to `/<DIR>`, due to a Docker limitation, you cannot specify a directory inside a named Docker volume. See [here](https://github.com/moby/moby/issues/32582){:target="\_blank"}.

## How to

##### Scenario

* Sample data in Git repo must be mounted to `/database` directory. 
* The custom image needs access to `/database` for proper execution. 
* The Dockerfile already runs a script on container startup.

##### Sample `docker-compose.yml`

```yaml
version: '3.0' 
services: 
  database: 
    image: myimage:1.0.2 
    volumes: 
      - ./:/database
```

##### Sample `codefresh.yml`

{% raw %}

```yaml
version: 1.0

stages:
  - Clone
  - Build
  - Test

steps:

  main_clone:
    title: Cloning Repo
    type: git-clone
    stage: Clone
    arguments:
      repo: ${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}
      git: cf-support-bot
      revision: ${{CF_REVISION}}

  conform:
    title: Fix docker compose
    type: composition-editor:1.1.0
    stage: Build
    arguments:
      DIRECTORY: ${{CF_VOLUME_PATH}}/${{CF_REPO_NAME}}
      YAMLFILE: docker-compose.yml
      CONFORM_COMPOSITION: true
      KEYVALUE_PAIRS:
        - services.database.volumes.0=${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}
        - services.database.command=bash -c "ln -s ${{CF_VOLUME_PATH}}/${{CF_REPO_NAME}} /database && ./start.sh"

  composition:
    title: Running Composition
    type: composition
    stage: Test
    arguments:
      composition: docker-compose.yml
      composition_candidates:
        test_service:
          image: alpine
          command: sleep 20
          volumes:
            - ${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}
```
{% endraw %}

In the step `conform.arguments.KEYVALUE_PAIRS`:
* Volumes mount is replaced by {% raw %}`${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}`{% endraw %}.
* The command {% raw %}`bash -c "ln -s ${{CF_VOLUME_PATH}}/${{CF_REPO_NAME}}/<DIR>/ /database && ./start.sh"`{% endraw %}:
  * Symlinks the directory in the Git repo to the `/database` directory
  * Executes the script already in the container

Once this is done, `composition` steps will run and have the correct mounts and directories where needed.

## Related articles
[Composition steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/composition/)  
[Pipeline definitions YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  

