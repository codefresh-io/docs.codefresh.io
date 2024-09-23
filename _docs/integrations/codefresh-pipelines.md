---
title: "Octopus Deploy pipeline integration"
description: "How to use Codefresh with Octopus Deploy to create, deploy, and promote releases"
group: integrations
toc: true
---


Octopus Deploy is a sophisticated, best-of-breed continuous delivery (CD) platform for modern software teams. Octopus offers powerful release orchestration, deployment automation, and runbook automation, while handling the scale, complexity and governance expectations of even the largest organizations with the most complex deployment challenges. [Read more](https://octopus.com/docs){:target="\_blank"}. 

Integrating Octopus Deploy with Codefresh allows you to create, deploy, and promote releases to your Octopus Deploy [environments](https://octopus.com/docs/infrastructure/environments/) through Codefresh pipelines.

For Octopus Deploy and Codefresh integration, you need:
* An Octopus Deploy instance, including spaces, environments, and projects 
* An API token from your Octopus Deploy account
* Custom Octopus Deploy steps 

Our [example pipeline](#example-codefresh-pipeline-with-octopus-deploy-steps) illustrates how to use custom Octopus Deploy steps.  

See [Octopus Deploy instance information in Codefresh pipelines](#octopus-deploy-instance-information-in-codefresh-pipelines) and [Octopus Deploy steps in Codefresh pipelines](#octopus-deploy-steps-in-codefresh-pipelines). 

You can also find these steps in the [Codefresh Marketplace](https://codefresh.io/steps/){:target="\_blank"}.


## Example Codefresh pipeline with Octopus Deploy steps 

The following is an example of a Codefresh pipeline that builds an application sourced from GitHub, and deploys it via Octopus Deploy.

The pipeline includes the following steps:

- Clone the source code 
- Create a package
- Push package to Octopus Deploy instance
- Create a release for an existing project 
- Deploy the release



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





## Octopus Deploy instance information in Codefresh pipelines
To run Octopus Deploy steps in a Codefresh pipeline, you need the details of an existing Octopus instance, with a project, a predefined environment, and deployment process. 
The table describes the instance fields you need to define.

| Octopus instance variable       | Description|
| ------------- | ------- |
| `OCTOPUS_URL`     | The Octopus Server URL on which to run your Octopus Deploy steps. See |
| `OCTOPUS_API_KEY` | The Octopus Deploy API Key required for authentication. Use an existing key or create a new API key. See [Creating an API Key](https://octopus.com/docs/octopus-rest-api/how-to-create-an-api-key#HowtocreateanAPIkey-CreatinganAPIkey){:target="\_blank"}. |
| `OCTOPUS_SPACE`   | The Space in which to run steps. See [Spaces](https://octopus.com/docs/administration/spaces){:target="\_blank"}.|
|`PROJECT`           | The Octopus Deploy project to which to deploy the release. See [setting up a project](https://octopus.com/docs/projects/setting-up-projects){:target="\_blank"}.|



## Octopus Deploy steps in Codefresh pipelines 

These are the custom Octopus Deploy steps included in the example Codefresh pipeline to create and deploy releases with Octopus Deploy.
More steps that you can include are described in [Optional Octopus Deploy steps in Codefresh pipelines](#optional-octopus-deploy-steps-in-codefresh-pipelines).


### Create package artifacts

Use the `octopusdeploy-create-package` step to create zip packages of your deployment artifacts. Specify the files to include in each package, the location of those files and the details of the artifact to create.
This step returns a json object with property `Path`.push packaged artifacts to the Octopus Server's built-in repository. 

{: .table .table-bordered .table-hover}
| Octopus Deploy Step |  Input parameters | Output parameters
| ----------          |  ---------------------| ---------------------|  
`octopusdeploy-create-package` | {::nomarkdown}<ul><li><code class="highlighter-rouge">ID</code>: The ID of the package to create.</li><li><code class="highlighter-rouge">VERSION</code>: The version of the package in the format, <code class="highlighter-rouge">"version-${{CF_BUILD_ID}}</code>, for example, <code class="highlighter-rouge">"1.0.0-${{CF_BUILD_ID}}"</code>.</li><li><code class="highlighter-rouge">BASE_PATH</code>: The folder in which to create the package artifacts. Set to <code class="highlighter-rouge">"/codefresh/volume"</code>.<li><code class="highlighter-rouge">OUT_FOLDER</code>: The folder in which to save the artifacts, set to  <code class="highlighter-rouge">"/codefresh/volume"</code></li></ul>{:/}| JSON object with property `Path`|



### Push packages to Octopus Server

Use the `octopusdeploy-push-package` step to push packaged artifacts to the Octopus Server's built-in repository. 

{: .table .table-bordered .table-hover}
| Octopus Deploy Step |  Input parameters | Output parameters
| ----------          |  ---------------------| ---------------------|  
`octopusdeploy-push-package` | {::nomarkdown}<ul><li><code class="highlighter-rouge">OCTOPUS_URL</code>, <code class="highlighter-rouge">OCTOPUS_API_KEY</code>, and <code class="highlighter-rouge">OCTOPUS_SPACE</code>: The Octopus instance details to add to the step as variables.</li><li><code class="highlighter-rouge">PACKAGES</code>: The package or list of packages to push to the built-in repository. For example, <code class="highlighter-rouge">"/codefresh/volume/Hello.1.0.0-${{CF_BUILD_ID}}.zip"</code>.</li><li><code class="highlighter-rouge">OVERWRITE_MODE</code>: Set to <code class="highlighter-rouge">overwrite</code> to replace existing packages with the same names with the package or packages in <code class="highlighter-rouge">PACKAGES</code>.</li></ul>{:/}| N/A |

### Create a release

Use the `octopusdeploy-create-release` step to create a release for a project.  

{: .table .table-bordered .table-hover}
| Octopus Deploy Step |  Input parameters | Output parameters
| ----------          |  ---------------------| ---------------------|  
|`octopusdeploy-create-release`  | {::nomarkdown}<ul><li><code class="highlighter-rouge">OCTOPUS_URL</code>, <code class="highlighter-rouge">OCTOPUS_API_KEY</code>, and <code class="highlighter-rouge">OCTOPUS_SPACE</code>: The Octopus instance details to add to the step as variables.</li><li><code class="highlighter-rouge">PROJECT</code>: The project for which to create the release. For example, <code class="highlighter-rouge">"Demo Project"</code>.</li><li><code class="highlighter-rouge">RELEASE_NUMBER</code>: Optional. The version of the release, which is concatenated from the release version and the <code class="highlighter-rouge">{CF_BUILD_ID}}</code> variable. </li><li><code class="highlighter-rouge">PACKAGES</code>: Optional. The name of the package or list of packages to include in the release. The format is <code class="highlighter-rouge">"<release-name>:<release-version>-${{CF_BUILD_ID}}"</code>. </li></ul>{:/} | JSON object with the `Channel` and `Version` for the release. |

### Deploy a release

Use the `octopusdeploy-deploy-release` step to deploy a release. If needed, provide optional parameters to specify guided failure mode and variables.  
For a tenanted release, see [Deploy a tenanted release](#deploy-a-tenanted-release).

{: .table .table-bordered .table-hover}
| Octopus Deploy Step |  Input parameters | Output parameters
| ----------          |  ---------------------| ---------------------|  
|`octopusdeploy-deploy-release`  |{::nomarkdown}<ul><li><code class="highlighter-rouge">OCTOPUS_URL</code>, <code class="highlighter-rouge">OCTOPUS_API_KEY</code>, and <code class="highlighter-rouge">OCTOPUS_SPACE</code>: The Octopus instance details to add to the step as variables.</li><li><code class="highlighter-rouge">PROJECT</code>: The project for which to deploy the release. For example, <code class="highlighter-rouge">"Demo Project"</code>.</li>li><code class="highlighter-rouge">RELEASE_NUMBER</code>: Optional. The version of the release, which is concatenated from the release version and the <code class="highlighter-rouge">{CF_BUILD_ID}}</code> variable. </li><li><code class="highlighter-rouge">ENVIRONMENTS</code>: Required. The name of the predefined environment or list of environments to which to deploy the release. For example, <code class="highlighter-rouge">"Development"</code>. </li></ul> {:/} | JSON array of deployments created, each with `DeploymentId` and `ServerTaskId`. |

## Optional Octopus Deploy steps in Codefresh pipelines 

### Deploy a tenanted release

To deploy a tenanted release, use the `octopusdeploy-deploy-release-tenanted` step. Define the tenants to deploy to using either tenants or tenant tags.  
For an untenanted release, see [Deploy a release](#deploy-a-release).

Customize the deployment of the tenanted release with prompted variable values, tenants, tenant tags, and guided failure mode. This step returns a json array of created deployments, with properties `DeploymentId` and `ServerTaskId`.

### Run a runbook

To run a runbook, use the `octopusdeploy-run-runbook` step.  

The step requires the name of the runbook to run, the project and environment name(s). Optional arguments include variables to use within the runbook, the option to run for specific tenants or tenant tags, as well as the option to use guided failure mode.

The step returns a JSON array of created runbook runs, with properties `RunbookRunId` and `ServerTaskId`.

### Push build information

To push build information for a project, use the `octopusdeploy-push-build-information` step. Provide a list of packages that need build information, a build information json file and a version number. 

By default, if build information already exists the step will fail. You can change the default behavior by changing `OVERWRITE_MODE` from `fail` to `overwrite` or `ignore`.

Sample build information JSON file: 

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

## Related articles
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/)  
[Marketplace: Octopus Deploy Create package](https://codefresh.io/steps/step/octopusdeploy-create-package){:target="\_blank"}  
[Marketplace: Octopus Deploy Push package](https://codefresh.io/steps/step/octopusdeploy-push-package){:target="\_blank"}  
[Marketplace: Octopus Deploy Create release](https://codefresh.io/steps/step/octopusdeploy-create-release){:target="\_blank"}  
[Marketplace: Octopus Deploy Deploy release](https://codefresh.io/steps/step/octopusdeploy-deploy-release){:target="\_blank"}  
[Marketplace: Octopus Deploy Deploy tenanted release](https://codefresh.io/steps/step/octopusdeploy%2Fdeploy-release-tenanted){:target="\_blank"}  
[Marketplace: Octopus Deploy Run a runbook](https://codefresh.io/steps/step/octopusdeploy-run-runbook){:target="\_blank"}  
[Marketplace: Octopus Deploy Push build information](https://codefresh.io/steps/step/octopusdeploy-push-build-information){:target="\_blank"}  



















