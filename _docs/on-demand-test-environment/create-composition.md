---
title: "Create composition"
description: "How to create environment configurations in Codefresh"

group: on-demand-test-environment
redirect_from:
  - /docs/on-demand-test-environment/
  - /docs/create-composition/
toc: true
---

Compositions can be launched as part of a unit test step, integration test step or for running an image for manual testing. You can create compositions from scratch or import an existing `docker-compose.yml` file.

## 1. Add a composition
From the left sidebar expand the *Docker Swarm* menu and click the **Compositions** sub menu. Then click the **ADD COMPOSITION** button.

{% include 
image.html 
lightbox="true" 
file="/images/9b3d250-codefresh_add_composition_first.png" 
url="/images/9b3d250-codefresh_add_composition_first.png"
alt="codefresh_add_composition_first.png" 
max-width="70%"
%}

## 2. Enter the name of composition
In the **Composition Name** text box, type a name for your composition and click __NEXT__.

{% include 
image.html 
lightbox="true" 
file="/images/0c12241-codefresh_name_composition.png" 
url="/images/0c12241-codefresh_name_composition.png"
alt="codefresh_name_composition.png" 
max-width="70%"
%}

## 3. Select Composition Starting Point
On this screen you can choose: __What type of composition would you like to create?__
* [**From file in repo**]({{site.baseurl}}/docs/on-demand-test-environment/create-composition/#31-from-file-in-repo) 
* [**From template**]({{site.baseurl}}/docs/on-demand-test-environment/create-composition/#32-from-template)
* [**Empty composition**]({{site.baseurl}}/docs/on-demand-test-environment/create-composition/#33-empty-composition) (Advanced)

Click **NEXT** for chosen way.

{% include 
image.html 
lightbox="true" 
file="/images/ed196d3-codefresh_method_compose.png" 
url="/images/ed196d3-codefresh_method_compose.png"
alt="codefresh_method_compose.png" 
max-width="70%"
%}

### 3.1 From file in repo
Start a new composition from a docker compose file in your repository.

{:start="1"}
1. In the search box, type the name of the repository.

{% include 
image.html 
lightbox="true" 
file="/images/10c1ff7-codefresh_compose_add.png" 
url="/images/10c1ff7-codefresh_compose_add.png"
alt="codefresh_compose_add.png" 
max-width="70%"
%}


{{site.data.callout.callout_info}}
##### Can't find your repository?
Try the **ADD BY URL** option.
{{site.data.callout.end}}

{% include 
image.html 
lightbox="true" 
file="/images/972337d-codefresh_compose_by_url.png" 
url="/images/972337d-codefresh_compose_by_url.png"
alt="codefresh_compose_by_url.png" 
max-width="70%"
%}

{:start="2"}
2. From the drop-down menu, select a branch for the first build.

{:start="3"}
3. Click **NEXT**.

{:start="4"}
4. Enter the path to `docker-compose.yml`
By default, Codefresh searches for your docker-compose.yml at the root level of your repository, by the name *docker-compose.yml*. If your docker-compose.yml is in sub-directory, provide the path as well (*./foo/bar/docker-compose.yml*).

{% include 
image.html 
lightbox="true" 
file="/images/dce8b4e-codefresh_path_docker_compose.png" 
url="/images/dce8b4e-codefresh_path_docker_compose.png"
alt="codefresh_path_docker_compose.png" 
max-width="70%"
%}

{:start="5"}
5. Click **NEXT**.

{{site.data.callout.callout_info}}
We don’t support the `build` property of Docker compose. We will replace it with images automatically by a pipeline that is automatically created.
{{site.data.callout.end}}

{% include 
image.html 
lightbox="true" 
file="/images/503fa16-codefresh_replace_build.png" 
url="/images/503fa16-codefresh_replace_build.png"
alt="codefresh_replace_build.png" 
max-width="70%"
%}

{:start="6"}
6. Click **CREATE**.

{% include 
image.html 
lightbox="true" 
file="/images/compositions/composition-list.png" 
url="/images/compositions/composition-list.png"
alt="Composition list" 
max-width="70%"
%}



Your composition is now ready and should appear in the Compositions list.

### 3.2 From template
If your repository doesn't include a `docker-compose.yml` file, you can use one of our templates to see how it works!

{:start="1"}
1. Choose the template.

{:start="2"}
2. Click **CREATE**.

{% include 
image.html 
lightbox="true" 
file="/images/bb380f7-codefresh_template_composition.png" 
url="/images/bb380f7-codefresh_template_composition.png"
alt="codefresh_template_composition.png" 
max-width="70%"
%}

You will see the Composition editor where you can change something and then launch this composition to see results. 

{% include 
image.html 
lightbox="true" 
file="/images/d8c8e2b-codefresh_template_compose_edit.png" 
url="/images/d8c8e2b-codefresh_template_compose_edit.png"
alt="codefresh_template_compose_edit.png" 
max-width="70%"
%}

{{site.data.callout.callout_info}}
Click on the rocket icon to launch this composition.
{{site.data.callout.end}}

### 3.3 Empty composition
If you chose the **Empty composition** you can now create a composition from scratch. You will see the following screen with an empty composition. 

{:start="1"}
1. To add a service, click the **Add Service** button.
You can add existing built services, or provide the name for Docker image that will be pulled from Docker registry.

{:start="2"}
2. (Optional) Click the **Edit** button to edit the content based on [Docker Compose YAML ](https://docs.docker.com/compose/compose-file/){:target="_blank"}.

{% include 
image.html 
lightbox="true" 
file="/images/327ce99-codefresh_empty_compose.png" 
url="/images/327ce99-codefresh_empty_compose.png"
alt="codefresh_empty_compose.png" 
max-width="70%"
%}

{:start="3"}

3. Click the **Save** icon on the upper right corner.

## Working with existing compositions

You can edit each composition you created (regardless of the original creation method) by clicking on its name from the compositions list.
You will see a yaml editor that allows you to edit the details of the composition.


{% include 
image.html 
lightbox="true" 
file="/images/0aa5fba-codefresh_first_composition.png" 
url="/images/0aa5fba-codefresh_first_composition.png"
alt="codefresh_first_composition.png" 
max-width="70%"
%}


Once you are ready click the small "rocket" button to launch your composition. This will create a temporary
test environment in your Codefresh account that you can use to inspect your application.
 
