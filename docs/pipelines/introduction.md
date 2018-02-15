---
layout: docs
title: "Introduction"
description: ""
group: pipelines
redirect_from:
  - /docs/pipeline
  - /docs/pipelines
toc: true
---
A pipeline defines the set of operations for a service, such as `Docker image build, push to Docker registry, integration tests, unit tests, deployment` and so on. You can trigger pipelines manually by clicking **BUILD**, or automatically by setting a webhook on your repository (see [setting pipeline's webhook](doc:configure-a-services-pipeline#section-enabling-auto-build-webhook-settings)). 

To navigate to the service's pipeline configuration page, click the **Pipeline** button for the service.

{% include 
image.html 
lightbox="true" 
file="/images/70646dc-codefresh_demochat_repo.png" 
url="/images/70646dc-codefresh_demochat_repo.png"
alt="codefresh_demochat_repo.png" 
max-width="40%"
%}

## Name Your Pipeline
In the **Name** text box, type a name for your pipeline. The default name for the pipeline is the name of the service.

{{site.data.callout.callout_info}}
##### NOTE: 

A service might have multiple pipelines. Each pipeline must have a unique name.
{{site.data.callout.end}}

{% include 
image.html 
lightbox="true" 
file="/images/29c73f5-codefresh_general_settings.png" 
url="/images/29c73f5-codefresh_general_settings.png"
alt="codefresh_general_settings.png" 
max-width="40%"
caption="Name of your pipeline"
%}
 
## YML settings
You can configure your pipeline to run according to the steps defined in a [codefresh.yml]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file. Toggle the **Use YML build** option to the on position to use YML file builds. For the `YML File Location` specify the path to the ```codefresh.yml``` of your repository. Go to [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) to learn more about how to configure your YML settings.

{% include 
image.html 
lightbox="true" 
file="/images/ac848ed-codefresh_yaml_option.png" 
url="/images/ac848ed-codefresh_yaml_option.png"
alt="codefresh_yaml_option.png" 
max-width="40%"
%}

## Enabling Auto Build / Webhook Settings
To automatically trigger your pipeline, set a webhook on your repository. On the pipeline configuration page, toggle the **ADD WEBHOOK** option to the on position.

You can define the webhook configuration to only trigger specific branches. Select the **CUSTOM REGEX** option at the **TRIGGER FLOW ON** field, and set a regular expression. Only branches that match the regular expression trigger the pipeline.

For example, if you want to trigger a build after commits to several branches, you can use the expression ```/branch1|branch2/gi```.
For a single branch, use the expression ```/branch/gi```.

{{site.data.callout.callout_info}}
##### NOTE: 

Only repository owners can set webhooks.
{{site.data.callout.end}}

{% include 
image.html 
lightbox="true" 
file="/images/2dcf5a8-codefresh_automated_build.png" 
url="/images/2dcf5a8-codefresh_automated_build.png"
alt="codefresh_automated_build.png" 
max-width="40%"
caption="Enabling Auto Build / Webhook Settings"
%}

## Badges
Badges are simple images that show you the last build status. They support both the pipeline and branch service status.
The badges can be embedded into your repository’s `readme.md` file.
Go to [Build badges]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/build-status/) to learn more about how to add the badges to your repository.

## Volume Image
Each of our pipelines uses a dedicated volume image. This volume allows us to speed up the build process. If the need arises you can access that volume to help you debug your build process.
Go to [Access and debug the pipeline volume image](doc:access-the-pipeline-volume-image)  to learn more about it.

## Name Your Docker Image
On the pipeline configuration page, in the **Image Name** text box, type a name for the Docker image that is built in the pipeline.
The image name must be in the format of ```REPO-OWNER/REPO-NAME```.

{% include 
image.html 
lightbox="true" 
file="/images/80d3927-codefresh_dockerimage_name.png" 
url="/images/80d3927-codefresh_dockerimage_name.png"
alt="codefresh_dockerimage_name.png" 
max-width="40%"
%}

****Default image's tag****
Codefresh assigns a default tag to the image name, based on the branch name. For example, if the pipeline was triggered by a change in the 'master' branch, the image's full name will be ```REPO-OWNER/REPO-NAME:master```.

## Dockerfile
A Dockerfile is a text document that contains all the commands a user can call from the command line to assemble an image. Dockerfile is used to instruct Docker how to build images automatically. 

If you **have a Dockerfile**  specify its path `Dockerfile` in your repository.

If you **don't a Dockerfile or a Codefresh YAML** then you can create one using Codefresh templates. Choose the `Codefresh template Dockerfile` and select a template. You can leave it as is or use it as a starting point.

{% include 
image.html 
lightbox="true" 
file="/images/d37452d-codefresh_dockerfile_path.png" 
url="/images/d37452d-codefresh_dockerfile_path.png"
alt="codefresh_dockerfile_path.png" 
max-width="40%"
%}

## Unit Test Script
This bash script is executed within a freshly created docker container that's derived from the image that you build. This means that on top your code, all tools and resources that are provided by the image you build are available to this script.
Here's the place to execute commands that unit test your code and your resources.
The exit code of your script determines the outcome of the test; Exiting with status code 0 will result in success, while exiting with code 1 and above will result in a failure.

Sometimes running unit tests require some additional services such as a Database (Mongo, MySql, Postgres etc) or third-party components like Redis, Memcache, etc.
Codefresh provides you an easy way to do this by using a Codefresh pipeline and docker-compose.
To run Unit Tests with a DB or other services you can create a composition and run your unit tests as part of it.

Go to [Unit Tests]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/)  to learn more about how to use it. Also, see how to run unit tests with composition: 
- [Unit Tests with Composition]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-composition/) 
- [Unit Test with Database]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-database/)

{% include 
image.html 
lightbox="true" 
file="/images/3eb8b90-codefresh_unit_test_script.png" 
url="/images/3eb8b90-codefresh_unit_test_script.png"
alt="codefresh_unit_test_script.png" 
max-width="40%"
%}
 
## Push to Docker Registry
Codefresh enables you to integrate with several Docker container registries. You can add new Docker registry on the **Integration page**. 

{% include 
image.html 
lightbox="true" 
file="/images/9d1fbac-codefresh_push_docker_registry.png" 
url="/images/9d1fbac-codefresh_push_docker_registry.png"
alt="codefresh_push_docker_registry.png" 
max-width="40%"
%}

Go to [Docker Registry]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/) to learn more about how to configure it.

## Integration Tests
If your service is part of a micro-services type of application, Codefresh enables you to run your image as part of a composition, and then run your integration tests against it. There are two pre-requisites for this step:

**Pre-Requisites**
- Define a Composition.
- Create a Composition test image, which is a Docker image with the integration test’s execution engine and scripts.

Go to [Integration Tests]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/integration-tests/) to learn more about how to configure it.

{% include 
image.html 
lightbox="true" 
file="/images/1f97bd1-codefresh_integration_tests.png" 
url="/images/1f97bd1-codefresh_integration_tests.png"
alt="codefresh_integration_tests.png" 
max-width="40%"
%}

## Deploy Script
In the deploy section of the pipeline configuration page, you can set an automatic deployment bash script command to be executed when all previous steps in the pipeline are successfully completed or just use `Codefresh's Deploy Images` to deploy to:
- Docker Swarm
- Amazon  ECS
- Kubernetes

{% include 
image.html 
lightbox="true" 
file="/images/3d74965-codefresh_deploy_script.png" 
url="/images/3d74965-codefresh_deploy_script.png"
alt="codefresh_deploy_script.png" 
max-width="40%"
%}

## Environment Variables
You can define the environment variables available to your service when Codefresh creates a container from its Docker image. Also, you can make your variables encrypted.
To define the environment variables, navigate to the environment variables section on the pipeline configuration view.

{% include 
image.html 
lightbox="true" 
file="/images/bf9ecbb-codefresh_environment_variables.png" 
url="/images/bf9ecbb-codefresh_environment_variables.png"
alt="codefresh_environment_variables.png" 
max-width="40%"
%}

You can also configure environment variables in the [codefresh.yml]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)  file, by using {% raw %}```${{YOUR_ENV_VAR}}```{% endraw %}.
