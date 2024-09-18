---
title: "Octopus Deploy pipeline integration"
description: "How to use Codefresh with Octopus Deploy to build, push, and create releases"
group: integrations
toc: true
---

# Integrating with Octopus Deploy
Codefresh pipelines allow you to customize steps to create, deploy and promote releases to your Octopus Deploy [environments](https://octopus.com/docs/infrastructure/environments/). The steps do this by running the [Octopus CLI](https://octopus.com/docs/octopus-rest-api/octopus-cli) inside a docker container.

Codefresh has several custom pipeline steps available for Octopus Deploy: 

- [Create a package](https://codefresh.io/steps/step/octopusdeploy-create-package)
- [Push a package](https://codefresh.io/steps/step/octopusdeploy-push-package)
- [Create a release](https://codefresh.io/steps/step/octopusdeploy-create-release)
- [Deploy a release](https://codefresh.io/steps/step/octopusdeploy-deploy-release)
- [Deploy a tenanted release](https://codefresh.io/steps/step/octopusdeploy%2Fdeploy-release-tenanted)
- [Run a runbook](https://codefresh.io/steps/step/octopusdeploy-run-runbook)
- [Push build information](https://codefresh.io/steps/step/octopusdeploy-push-build-information)


## Octopus Deploy step configuration

When creating a Codefresh Octopus Deploy pipeline, the details of an Octopus instance are required to run all Octopus Codefresh steps. The following can be added as pipeline variables within Codefresh:

| Variable name       | Description|
| ------------- | ------- |
| `OCTOPUS_URL` | The Octopus Server URL you wish to run your steps on |
| `OCTOPUS_API_KEY` | The Octopus Deploy API Key required for authentication |
| `OCTOPUS_SPACE` | The Space to run steps on |

This also requires an existing Octopus Deploy instance with a project and environment already created.

# Example Pipeline build

The following example demonstrates a Codefresh Pipeline build of an application sourced from GitHub and deployed via Octopus Deploy.

To build and deploy this application, you'll need the following steps:

- Clone the source code
- Create a package
- Push package to Octopus Deploy instance
- Create a release for an existing project (get started with the basics of [setting up a project](https://octopus.com/docs/projects/setting-up-projects))
- Deploy

Below is an example Codefresh Pipeline workflow which includes these steps:

<details>
  <summary>Click here to view the entire example build YAML</summary>

```yaml
version: "1.0"

stages:
  - "build and push"
  - "deploy"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    stage: "build and push"
    repo: <<YOUR REPO URL>>
    revision: "main"
    working_directory: "/codefresh/volume"
    credentials:
      username: ${{GITHUB_USERNAME}}
      password: ${{GITHUB_PASSWORD}}

  create-package:
    title: "Create package"
    type: octopusdeploy-create-package
    stage: "build and push"
    arguments:
      ID: "Hello"
      VERSION: "1.0.0-${{CF_BUILD_ID}}"
      BASE_PATH: "/codefresh/volume"
      OUT_FOLDER: "/codefresh/volume"

  push-package:
    title: "Push package"
    type: octopusdeploy-push-package
    stage: "build and push"
    arguments:
      OCTOPUS_API_KEY: ${{OCTOPUS_API_KEY}}
      OCTOPUS_URL: ${{OCTOPUS_URL}}
      OCTOPUS_SPACE: "Spaces-42"
      PACKAGES:
        - "/codefresh/volume/Hello.1.0.0-${{CF_BUILD_ID}}.zip"
      OVERWRITE_MODE: 'overwrite'

  create-release:
    type: octopusdeploy-create-release
    title: "Create release"
    stage: "deploy"
    arguments:
      OCTOPUS_API_KEY: ${{OCTOPUS_API_KEY}}
      OCTOPUS_URL: ${{OCTOPUS_URL}}
      OCTOPUS_SPACE: "Spaces-42"
      PROJECT: "Demo Project"
      RELEASE_NUMBER: "1.0.0-${{CF_BUILD_ID}}"
      PACKAGES:
       - "Hello:1.0.0-${{CF_BUILD_ID}}"
      RELEASE_NOTES: This is a release note

  deploy:
    type: octopusdeploy-deploy-release
    title: "Deploy release"
    stage: "deploy"
    arguments:
      OCTOPUS_API_KEY: ${{OCTOPUS_API_KEY}}
      OCTOPUS_URL: ${{OCTOPUS_URL}}
      OCTOPUS_SPACE: "Spaces-42"
      PROJECT: "Demo Project"
      RELEASE_NUMBER: "1.0.0-${{CF_BUILD_ID}}"
      ENVIRONMENTS:
        - "Development"
```
</details>

# Octopus Deploy steps

## Package artifacts

Create zip packages of your deployment artifacts by using the **octopusdeploy-create-package** step. Specify the files to include in each package, the location of those files and the details of the artifact to create.
This step returns a json object with property "Path".

## Push packages to Octopus Server

Once the artifacts are packaged, use the **octopusdeploy-push-package** step to push the packages to the Octopus Server built-in repository. This step has no output.

## Create a release

To create a release, use the **octopusdeploy-create-release** step. Provide the details for your Octopus instance, and the project you would like to create a release for. Optional arguments help to customize the creation of the release. You can specify version control details, select packages and provide release notes.
This step returns a json object with properties "Channel" and "Version" for the release that was created.

## Deploy a release

To deploy a release, use the **octopusdeploy-deploy-release** step. Provide details for your Octopus instance, and the project and release you want to deploy. Additionally, you can provide optional arguments to specify guided failure mode and variables.
This step returns a json array of created deployments, with properties "DeploymentId" and "ServerTaskId".

## Deploy a tenanted release

To deploy a tenanted release, use the **octopusdeploy-deploy-release-tenanted** step. Provide the details for your Octopus instance, and the tenants you want to deploy to. You will need to provide either tenants or tenant tags. To deploy an untenanted release, use the **octopusdeploy-deploy-release** step.
Optional arguments help to customize the deployment of the release. You can specify prompted variable values, tenants, tenant tags, and guided failure mode. This step returns a json array of created deployments, with properties "DeploymentId" and "ServerTaskId".

## Run a runbook

To run a runbook, use the **octopusdeploy-run-runbook** step. Provide the name of the runbook that you want to run, as well as the project and environment name(s). Optional arguments include variables to use within the runbook, the option to run for specific tenants or tenant tags, as well as the option to use guided failure mode.
This returns a json array of created runbook runs, with properties "RunbookRunId" and "ServerTaskId".

## Push build information

To push build information for a project, use the **octopusdeploy-push-build-information** step. Provide a list of packages that need build information, a build information json file and a version number. 

By default, the step will fail if build information already exists, but this can be configured using the `OVERWRITE_MODE` option ('fail', 'overwrite', or 'ignore').
Sample build information json file:

```json
{
  "BuildEnvironment": "BitBucket",
  "Branch": "main",
  "BuildNumber": "288",
  "BuildUrl": "https://bitbucket.org/octopussamples/petclinic/addon/pipelines/home#!/results/288",
  "VcsType": "Git",
  "VcsRoot": "http://bitbucket.org/octopussamples/petclinic",
  "VcsCommitNumber": "12345",
  "Commits":
  [
    {
      "Id": "12345",
      "Comment": "Sample commit message"
    }
  ]
}
```

This step has no output.
