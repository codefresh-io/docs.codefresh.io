---
title: 
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

# How To: Mount volumes in a composition step where source is inside the
Codefresh Volume

#

## Overview

Compositions steps can only mount `${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}`,
but you need to mount `/codefresh/volume/<REPO>/<DIR>/` to `/<DIR>` . This is
a limitation of docker where you cannot specify a directory inside a named
docker volume [1].

**Note** : this is for using a `docker-compose.yml` file in the composition
step.

## Details

I have in my git rep sample data and need to mount this to the `/database`
directory. My custom image is expecting data to be in `/database` to be able
to run. My docker file already runs a script at startup when the container
starts.

Sample `docker-compose.yml`

    
    
    version: '3.0' 
    services: 
      database: 
        image: myimage:1.0.2 
        volumes: 
          - ./:/database
    

`Sample codefresh.yml`

    
    
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
        type: composition-editor
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
    

In the conform step, we are replacing the volumes mount to be
`${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}`. Then add a command of `bash -c "ln
-s ${{CF_VOLUME_PATH}}/${{CF_REPO_NAME}}/<DIR>/ /database && ./start.sh"`to
symlink the directory in my repo to the `/database`directory and then execute
my script that's already in the container. Once this is done, my composition
steps will run and have the correct mounts and directories where it is needed.

## Related Items

[1] <https://github.com/moby/moby/issues/32582>

