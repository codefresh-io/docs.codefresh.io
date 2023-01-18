---
title: "Creating compositions"
description: "Create environment configurations in Codefresh"
group: testing 
redirect_from:
  - /docs/testing/create-composition/
  - /docs/on-demand-test-environment/
  - /docs/create-composition/
  - /docs/on-demand-test-environment/create-composition/
  - /docs/share-environment-with-your-test
  - /docs/share-environment-with-your-test/
  - /docs/on-demand-test-environment/share-environment-with-your-test
  - /docs/on-demand-test-environment/share-environment-with-your-test/ 
  - /docs/on-demand-test-environment/share-your-environment-with-your-team/
  - /docs/on-demand-test-environment/test-your-feature/
  - /docs/test-your-feature/  
toc: true
---

Compositions can be launched as part of a unit test step, an integration test step, or to run an image for manual testing. You can create compositions from scratch or import an existing `docker-compose.yml` file.

## Create composition
1. In the Codefresh UI, from the Artifacts section in the sidebar, click [**Compositions**](https://g.codefresh.io/compositions){:target="\_blank"}.
1. Click **Create Composition**.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/add-composition-first.png" 
url="/images/testing/compositions/add-composition-first.png"
alt="Add composition" 
captiom="Add composition" 
max-width="70%"
%}

{:start="3"}
1.In the **Composition Name** text box, type a name for your composition, and click **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/composition-name.png" 
url="/images/testing/compositions/composition-name.png"
alt="Composition name" 
caption="Composition name" 
max-width="70%"
%}

{:start="4"}
1. Select the type of composition to create:  
  * **From file in repo**: Start a new composition from a Docker Compose file in your repository.
  * **From template**: Use a template as a starting point for the composition, if your repository doesn't include a `docker-compose.yml` file.
  * **Empty composition**: Create a composition from scratch.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/composition-method.png" 
url="/images/testing/compositions/composition-method.png"
alt="Composition starting point" 
caption="Composition starting point" 
max-width="70%"
%}

{:start="5"}
1. Click **Next**, and continue with one of the following:
  * [From file in repo**](#from-file-in-repo) 
  * [From template](#from-template)
  * [Empty composition](#empty-composition) (Advanced)


### From file in repo
Start a new composition from a Docker Compose file in your repository.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/composition-file-in-repo.png" 
url="/images/testing/compositions/composition-file-in-repo.png"
alt="Add composition from file in repo" 
caption="Add composition from file in repo" 
max-width="70%"
%}

1. To search for the repo, in the search box, type the name of the repository.  
  OR  
  Click **Add by URL**, and then enter the URL of the repo.  
1. From the **Branch** dropdown, select a branch for the first build.
1. Click **Next**.
1. Enter the path to `docker-compose.yml`.  
  By default, Codefresh searches for your `docker-compose.yml` at the root level of your repository, for the name _`docker-compose.yml`_. If your `docker-compose.yml` is in a subdirectory, provide the path as well, for example, `./foo/bar/docker-compose.yml`.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/path-to-docker-compose.png" 
url="/images/testing/compositions/path-to-docker-compose.png"
alt="Path to Compose file" 
caption="Path to Compose file" 
max-width="70%"
%}

{:start="5"}
1. Click **Next**.
  >We don’t support the `build` property of Docker Compose. We will replace it with images automatically using a pipeline that is automatically created.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/replace-build.png" 
url="/images/testing/compositions/replace-build.png"
alt="Replacing build with image" 
caption="Replacing build with image" 
max-width="70%"
%}

{:start="6"}
1. Click **Create**.
  Once ready, your composition is displayed in the Compositions list.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/composition-list.png" 
url="/images/testing/compositions/composition-list.png"
alt="Composition list" 
caption="Composition list" 
max-width="70%"
%}



### From template
If your repository doesn't include a `docker-compose.yml` file, use one of our templates to see how it works.


1. Choose the template.
1. Click **Create**.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/compose-from-template-select-template.png" 
url="/images/testing/compositions/compose-from-template-select-template.png"
alt=" Select composition template" 
caption=" Select composition template"
max-width="70%"
%}

  You will see the Composition editor, where you can tweak the template as needed, and then launch the composition to see results. 

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/compose-from-template-edit.png" 
url="/images/testing/compositions/compose-from-template-edit.png"
alt="Edit selected template" 
caption="Edit selected template" 
max-width="70%"
%}

> To launch this composition, click the rocket icon.


### Empty composition
Create a composition from scratch. 


1. To add a service, click the **Add Service** button.  
  You can add existing services, or provide the name for the Docker image to be pulled from the Docker registry.

  {% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/empty-composition.png" 
url="/images/testing/compositions/empty-composition.png"
alt="Empty composition" 
caption="Empty composition" 
max-width="70%"
%}

{:start="2"}
1. (Optional) Click **Edit**, and modify the content based on [Docker Compose YAML ](https://docs.docker.com/compose/compose-file/){:target="_blank"}.
1. Click **Save** on the upper-right corner.



## Working with existing compositions

You can edit any composition you created, regardless of the method used to create it, by selecting it from the Compositions list.
Edit as needed in the YAML editor.


{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/existing-composition.png" 
url="/images/testing/compositions/existing-composition.png"
alt="Edit existing composition" 
caption="Edit existing composition" 
max-width="70%"
%}

## Manually launching compositions

When you are ready with the composition, launch it to inspect your application. Launching a composition creates a temporary
test environment in your Codefresh account that you can use to inspect your application.

1. In the Codefresh UI, from the Artifacts section in the sidebar, click [**Compositions**](https://g.codefresh.io/compositions){:target="\_blank"}.
1. From the list, select the composition to launch.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/composition-list.png" 
url="/images/testing/compositions/composition-list.png"
alt="Composition list" 
caption="Composition list" 
max-width="70%"
%}

{:start="3"}
1. Click the **Launch** icon.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/composition-launch-button.png" 
url="/images/testing/compositions/composition-launch-button.png"
alt="Launch composition" 
caption="Launch composition" 
max-width="70%"
%}

{:start="4"}
1. To verify that the launch completed successfully, review the log.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/composition-launch-log.png" 
url="/images/testing/compositions/composition-launch-log.png"
alt="Composition log" 
caption="Composition log" 
max-width="70%"
%}

## Sharing the environment URL

View a record for the running environment and all containers for the environment in the Running Compositions tab.

1. In the Codefresh UI, from the Artifacts section in the sidebar, click [**Compositions**](https://g.codefresh.io/compositions){:target="\_blank"}.
1. Click **Running Compositions**.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/environment-running.png" 
url="/images/testing/compositions/environment-running.png"
alt="environment-running.png" 
max-width="70%"
caption="Active test environments"
alt="Active test environments"
%}

{:start="3"}
1. To share your environment with your team, click the **Hashtag** icon.

{% include 
image.html 
lightbox="true" 
file="/images/testing/compositions/share-environment-link.png" 
url="/images/testing/compositions/share-environment-link.png"
alt="Link for sharing environment" 
caption="Link for sharing environment" 
max-width="70%"
%}

## Related articles
[Unit tests]({{site.baseurl}}/docs/testing/unit-tests/)   
[Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)    
[Creating test reports]({{site.baseurl}}/docs/testing/test-reports/)  
