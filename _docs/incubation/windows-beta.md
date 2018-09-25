---
title: "Windows Containers Support Overview (Beta)"
description: "Using Docker on Windows in Codefresh"
group: incubation
redirect_from:
  - /docs/windows/
toc: true
---
  
> Note: To learn more regarding how to participate in our beta release please [contact sales](https://codefresh.io/contact-sales/)

Codefresh pipelines have the option to support Windows based containers.
If you have projects in your organisation based on the  .NET Framework or are in transition from Windows to Linux based projects and still need to have CI/CD pipelines for Windows containers, you’ll now be able to achieve this by using Codefresh.

As part of the beta program Codefresh will supply you with an account which will be able to support Windows pipelines and a dedicated Windows Server version 1709 VM which Codefresh will host for you. 
Please keep in mind that this account will only be able to run Windows containers based pipelines, you’ll still have the full option to switch to your regular Codefresh account that supports Linux containers based pipelines.

Codefresh Windows pipeline supports the following Codefresh steps:
**Clone**, **Build**, **Push**, **Composition**, **Deploy** and **Freestyle**.
Please refer to our [steps documentation](https://codefresh.io/docs/docs/codefresh-yaml/steps/) to learn more about each of them.


## Example

In this example we’ll perform the following steps:
    
- Clone our git repository and build a .NET Framework image.
    
- Run our dotnet unit tests and according to the results annotate the image accordingly.
    
- Push to dockerhub if our tests have passed.

```yaml
version: '1.0'
steps:
  
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: codefresh/dotnetapp
    working_directory: ./samples/dotnetapp
    tag: '{% raw %}${{CF_BRANCH_TAG_NORMALIZED}}{% endraw %}'
    dockerfile: Dockerfile
 
  RunningUnitTests:
    title: Running Unit Tests
    image: '{% raw %}${{BuildingDockerImage}}{% endraw %}'
    command: dotnet test
    on_success:
      metadata:
        set:
          - '{% raw %}${{BuildingDockerImage.imageId}}{% endraw %}':
              - CF_QUALITY: true
              - repo_owner: '{% raw %}${{CF_REPO_OWNER}}{% endraw %}'
              - repo_name: '{% raw %}${{CF_REPO_NAME}}{% endraw %}'
              - branch_name: '{% raw %}${{CF_BRANCH}}{% endraw %}'
              - commit_author: '{% raw %}${{CF_COMMIT_AUTHOR}}{% endraw %}'
              - commit_url: '{% raw %}${{CF_COMMIT_URL}}{% endraw %}'
              - commit_message: '{% raw %}${{CF_COMMIT_MESSAGE}}{% endraw %}'
    on_fail:
      metadata:
        set:
          - '{% raw %}${{BuildingDockerImage.imageId}}{% endraw %}':
              - CF_QUALITY: false
  
  PushingToDockerRegistry:
    title: Pushing to Docker Registry
    type: push
    candidate: '{% raw %}${{BuildingDockerImage}}{% endraw %}'
    tag: '{% raw %}${{CF_BRANCH_TAG_NORMALIZED}}{% endraw %}'
    registry: dockerhub

``` 
