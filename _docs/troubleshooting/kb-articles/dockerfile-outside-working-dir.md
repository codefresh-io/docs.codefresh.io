---
title: "How To: Specify a Dockerfile outside of the working directory in the build step"
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

With the build step, the 'dockerfile' parameter allows you to specify the path
to the Dockerfile. Currently the way it works, Codefresh appends the file path
to the 'working_directory' parameter. For example, when specifying an absolute
path, it will append to the 'working_directory'. The below example is trying
to access the Dockerfile at the root of my git repository.

    
    
    Docker_Build:  
      title: Building docker image  
      type: build  
      stage: Build  
      working_directory: ${{Clone_Step}}/myapp  
      arguments:  
        image_name: ${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}  
        tag: main  
        dockerfile: ${{CF_VOLUME_PATH}}/${{CF_REPO_NAME}}/Dockerfile

The directory path of the Dockerfile will be
'/codefresh/volume/myrepo/myapp/codefresh/volume/myrepo/'.

## Details

Instead of specifying the absolute path, you will need to use the special
Linux directory of `../` to get outside of the working directory. In the
example above, the Dockerfile was at the root of the git repository. Below is
an example of how to access that directory and the Dockerfile.

    
    
    Docker_Build:  
      title: Building docker image  
      type: build  
      stage: Build  
      working_directory: ${{Clone_Step}}/myapp  
      arguments:  
        image_name: ${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}  
        tag: main  
        dockerfile: ../Dockerfile

The directory path of the Dockerfile will technically be
'/codefresh/volume/myrepo/myapp/../', but essentially accessing the file
'/codefresh/volume/myrepo/Dockerfile'. You will need to add '../' as many
directories above the working directory as need to get to the directory path
of Dockerfile. Also, '../mydocker/Dockerfile' is acceptable if it is in a
different directory.

