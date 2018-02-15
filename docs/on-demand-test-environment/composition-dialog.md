---
layout: docs
title: "Create composition"
description: ""
excerpt: "Composition can be launched as part of unit test step, integration test or for running an image for manual testing. Also based on your `docker-compose.yml` automatically can be created services that were described in this file.\nBelow how to create a composition."
group: on-demand-test-environment
permalink: /:path/composition-dialog/
redirect_from:
  - /docs/composition-dialog
  - /docs/on-demand-test-environment
  - /docs/composition-dialog
  - /docs/on-demand-test-environment/
toc: true
---

## 1. Add a composition
Click the **Composition** view icon in the left pane, and click the **ADD COMPOSITION** button.

{% include 
image.html 
lightbox="true" 
file="/images/9b3d250-codefresh_add_composition_first.png" 
url="/images/9b3d250-codefresh_add_composition_first.png"
alt="codefresh_add_composition_first.png" 
max-width="40%"
%}

## 2. Enter the name of composition
In the **Composition Name** text box, type a name for your composition and click __NEXT__

{% include 
image.html 
lightbox="true" 
file="/images/0c12241-codefresh_name_composition.png" 
url="/images/0c12241-codefresh_name_composition.png"
alt="codefresh_name_composition.png" 
max-width="40%"
%}

## 3. Select Composition Starting Point
On this screen you can choose: __What type of composition would you like to create?__
* [**From file in repo**]({{ site.baseurl }}/docs/on-demand-test-environment/composition-dialog/#31-from-file-in-repo) 
* [**From template**]({{ site.baseurl }}/docs/on-demand-test-environment/composition-dialog/#32-from-template)
* [**Empty composition**]({{ site.baseurl }}/docs/on-demand-test-environment/composition-dialog/#33-empty-composition)

Click **NEXT** for chosen way.

{% include 
image.html 
lightbox="true" 
file="/images/ed196d3-codefresh_method_compose.png" 
url="/images/ed196d3-codefresh_method_compose.png"
alt="codefresh_method_compose.png" 
max-width="40%"
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
max-width="40%"
%}

{{site.data.callout.callout_info}}
##### Don't see your private repositories?
Try the following:
* Started your free trial, so you can add private repositories.
* If the free trial finished you can upgrade your account or contact us to extend the free trial.
* [Visit our Troubleshooting Center](doc:introduction-3)
{{site.data.callout.end}}

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
max-width="40%"
%}

{:start="2"}
2. From the drop-down menu, select a branch for the first build.

{:start="3"}
3. Click **NEXT**.

{:start="4"}
4. Enter the path to `docker-compose.yml`
By default, Codefresh searches for your docker-compose.yml at the root level of your repository, by the name *docker-compose.yml*. In case that your docker-compose.yml is in sub-directory, provide the path as well (*./foo/bar/docker-compose.yml*).

{% include 
image.html 
lightbox="true" 
file="/images/dce8b4e-codefresh_path_docker_compose.png" 
url="/images/dce8b4e-codefresh_path_docker_compose.png"
alt="codefresh_path_docker_compose.png" 
max-width="40%"
%}

{:start="5"}
5. Click **NEXT**

{{site.data.callout.callout_info}}
We don’t support `build` property of compose. We will replace it with images built by pipeline that automatically created. <br>
Also in case if you have `build` property in your docker-compose.yml will be created a repository with pipeline for step that contains `build` property.
{{site.data.callout.end}}

{% include 
image.html 
lightbox="true" 
file="/images/503fa16-codefresh_replace_build.png" 
url="/images/503fa16-codefresh_replace_build.png"
alt="codefresh_replace_build.png" 
max-width="40%"
%}

{:start="6"}
6. Click **CREATE**

{% include 
image.html 
lightbox="true" 
file="/images/aae9a21-codefresh_compose_repo_created.png" 
url="/images/aae9a21-codefresh_compose_repo_created.png"
alt="codefresh_compose_repo_created.png" 
max-width="40%"
%}

Now you can choose what to do next: **BUILD IMAGES** or **CONFIGURE COMPOSITION**
In case if you chose **CONFIGURE COMPOSITION** you will see the following screen where you will be able to edit your composition and then launch if all necessary images was created.

{% include 
image.html 
lightbox="true" 
file="/images/0aa5fba-codefresh_first_composition.png" 
url="/images/0aa5fba-codefresh_first_composition.png"
alt="codefresh_first_composition.png" 
max-width="40%"
%}

In case if you chose **BUILD IMAGES** all pipelines from added repository will be triggered to create a necessary images.

### 3.2 From template
If your repository doesn't include docker-compose.yml, you can use one of our templates to see how it works!

{:start="1"}
1. Choose the template

{:start="2"}
2. Click **CREATE**

{% include 
image.html 
lightbox="true" 
file="/images/bb380f7-codefresh_template_composition.png" 
url="/images/bb380f7-codefresh_template_composition.png"
alt="codefresh_template_composition.png" 
max-width="40%"
%}

You will see the editor of composition where you can change something and then launch this composition to see results. 

{% include 
image.html 
lightbox="true" 
file="/images/d8c8e2b-codefresh_template_compose_edit.png" 
url="/images/d8c8e2b-codefresh_template_compose_edit.png"
alt="codefresh_template_compose_edit.png" 
max-width="40%"
%}

{{site.data.callout.callout_info}}
Click on the rocket icon to launch this composition.
{{site.data.callout.end}}

### 3.3 Empty composition
If you chose the **Empty composition** you want to create a composition from scratch. You will see the following screen with empty composition. 

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
max-width="40%"
%}

{:start="3"}
3. Click the **Save** icon on the upper right corner

{{site.data.callout.callout_info}}
Click on the rocket icon to launch this composition.
{{site.data.callout.end}}
 
