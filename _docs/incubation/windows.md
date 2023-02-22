---
title: "Windows Containers Support Overview"
description: "Using Docker on Windows in Codefresh"
group: incubation
redirect_from:
  - /docs/incubation/windows/
  - /docs/windows/
  - /docs/incubation/windows-beta/
toc: true
---
  
Codefresh pipelines have the option to support Windows based containers.

If you have projects in your organization based on the .NET Framework or are in transition from Windows to Linux based projects and still need to have CI/CD pipelines for Windows containers, you’ll now be able to achieve this by using Codefresh.

> Note: To enable Windows builds on your Codefresh account please [contact sales](https://codefresh.io/contact-us/){:target="\_blank"}

Once approved, you will get access to a new runtime environment on a dedicated Windows Server version 1709 VM. This means that you will be able to run both Windows and Linux/x86 builds from the same Codefresh account by choosing the appropriate [pipeline settings]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings).


> Note: For .NET Core projects you can use a standard Linux based Codefresh account. See [our example]({{site.baseurl}}/docs/example-catalog/ci-examples/dotnet/).
Codefresh Windows pipelines support the following Codefresh steps:
**Clone**, **Build**, **Push**, **Composition**, **Deploy** and **Freestyle**.
Please refer to our [steps documentation]({{site.baseurl}}/docs/pipelines/steps/) to learn more about each of them.


## Example

In this example we'll perform the following steps:
    
- Clone our git repository and build a .NET Framework image.
    
- Run our dotnet unit tests and according to the results annotate the image accordingly.
    
- Push to Dockerhub if our tests have passed.

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

## Related articles
[Introduction to pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/) 
[Installation options]({{site.baseurl}}/docs/installation/installation-options/)
