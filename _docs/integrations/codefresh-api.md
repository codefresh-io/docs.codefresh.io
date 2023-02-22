---
title: "Codefresh API pipeline integration"
description: "Integrate Codefresh CI pipelines with other systems"
group: integrations
redirect_from:
  - /docs/codefresh-api/
toc: true
---

Codefresh offers a comprehensive API that you can use to integrate with any other application or solution you already have.

The full details of the API are documented at [https://g.codefresh.io/api/](https://g.codefresh.io/api/){:target="\_blank"}.

{% include image.html
lightbox="true"
file="/images/integrations/api/overview.png"
url="/images/integrations/api/overview.png"
alt="Using the Codefresh API"
max-width="70%"
%}

You can use the API in various ways:

* From your local workstation, with any tool that speaks HTTP (such as [postman](https://github.com/postmanlabs){:target="\_blank"}, [httpie](https://httpie.org/){:target="\_blank"}, [curl](https://curl.haxx.se/){:target="\_blank"} etc.).
* From another HTTP-enabled tool such as Jenkins. For example, you can trigger [Codefresh pipelines from Jenkins jobs]({{site.baseurl}}/docs/integrations/jenkins-integration/#calling-codefresh-pipelines-from-jenkins-jobs).
* Through the [Codefresh command line interface](https://codefresh-io.github.io/cli/){:target="\_blank"} which itself uses the API.
* Calling it programmatically from any other system. You can use your favorite programming language to make HTTP calls to Codefresh.


The Codefresh API is updated when new features are added in the Codefresh platform so you can expect any new functionality
to appear in the API as well.

## Ways to use the Codefresh API

There are several ways to use the API. Some of the most popular ones are:


1. Triggering builds from another system. You can start a Codefresh pipeline from any other internal system that you already have in your organization.
1. Getting the status of builds in another system. 
1. Creating pipelines externally. You don't have to use the Codefresh UI to create pipelines. You can create them programmatically using your favorite template mechanism. You can reuse pipelines using your own custom implementation if you have special needs in your organization.

You can browse the current API at [https://g.codefresh.io/api/](https://g.codefresh.io/api/){:target="\_blank"}.

{% include image.html
lightbox="true"
file="/images/integrations/api/codefresh-api-example.png"
url="/images/integrations/api/codefresh-api-example.png"
alt="Browsing the Codefresh API"
caption="Browsing the Codefresh API"
max-width="70%"
%}

For each call you will also see an example with `curl`.

## Authentication instructions


1. Log in to your Codefresh account, and from your avatar dropdown, select [**User Settings**](https://g.codefresh.io/user/settings){:target="\_blank"}.
1. Scroll down to  **API Keys**.
1. To create a new API key, click **Generate**, and do the following:
  * **Key Name**: Enter the name of the key, preferable one that will help you remember its purpose. The token is tied to your Codefresh account and should be considered sensitive information.
  * **Scopes**: Select the required [access scopes](#access-scopes).
1. Copy the token to your clipboard. 
1. Click **Create**.

{% include image.html
lightbox="true"
file="/images/integrations/api/generate-token.png"
url="/images/integrations/api/generate-token.png"
alt="Generating a key for the API"
caption="Generating a key for the API"
max-width="70%"
%}


From the same screen you can also revoke keys if you don't need them anymore.

### Access scopes

The following resources can be targeted with the API:

* *Agent* - Used for [Codefresh Runner installation]({{site.baseurl}}/docs/installation/behind-the-firewall/)
* *Audit* - Read [Audit logs]({{site.baseurl}}/docs/administration/account-user-management/audit/)
* *Build* - Get/change [build status]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)
* *Cluster* - [Access control]({{site.baseurl}}/docs/administration/account-user-management/access-control/) for [Kubernetes clusters]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)
* *Environments-v2* - Read/Write [Environment Dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/) information
* *GitHub Actions* - Run [GitHub Actions inside Codefresh pipelines]({{site.baseurl}}/docs/integrations/github-actions/)
* *Pipeline* - [Access control]({{site.baseurl}}/docs/administration/account-user-management/access-control/) for [pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)
* *Repos* - Refers to [Git repositories]({{site.baseurl}}/docs/integrations/git-providers/)
* *Step Type* - Refers to [custom pipeline steps]({{site.baseurl}}/docs/pipelines/steps/#creating-a-typed-codefresh-plugin)


The scopes available for each resource differ according to the type of resource.


## Using the API Key with the Codefresh CLI

Once you have the key, use it in the Codefresh CLI:

{% highlight bash %}
codefresh auth create-context <context-name> --api-key <your_key_here>
{% endhighlight %}

Now the Codefresh CLI is fully authenticated. The key is stored in `~/.cfconfig` so you only need to run this command once. The CLI
can also work with [multiple authentication contexts](https://codefresh-io.github.io/cli/authentication/){:target="\_blank"} so you can manage multiple Codefresh accounts at the same time.

## Example: Triggering pipelines

You can trigger any pipeline in Codefresh and even pass extra environment variables (even if they are not
declared in the UI).

Triggering a pipeline via the Codefresh CLI:

{% highlight bash %}
codefresh run kostis-codefresh/nestjs-example/ci-build -b master -t nestjs-example-trigger-name
{% endhighlight %}

You can pass extra environment variables as well:
{% highlight bash %}
codefresh run kostis-codefresh/nestjs-example/ci-build -b master -t nestjs-example-trigger-name -v sample-var1=sample1 -v SAMPLE_VAR2=SAMPLE2
{% endhighlight %}

For the API, you can trigger a pipeline by finding its `serviceId` from the UI

{% highlight bash %}
curl 'https://g.codefresh.io/api/builds/5b1a78d1bdbf074c8a9b3458' --compressed -H 'content-type:application/json; charset=utf-8' -H 'Authorization: <your_key_here>' --data-binary '{"serviceId":"5b1a78d1bdbf074c8a9b3458","type":"build","repoOwner":"kostis-codefresh","branch":"master","repoName":"nestjs-example"}'
{% endhighlight %}

You can also pass extra environment variables using an array

{% highlight bash %}
curl 'https://g.codefresh.io/api/builds/5b1a78d1bdbf074c8a9b3458' --compressed -H 'content-type:application/json; charset=utf-8' -H 'Authorization: <your_key_here>' --data-binary '{"serviceId":"5b1a78d1bdbf074c8a9b3458","type":"build","repoOwner":"kostis-codefresh","branch":"master","repoName":"nestjs-example","variables":{"sample-var1":"sample1","SAMPLE_VAR2":"SAMPLE2"}}'
{% endhighlight %}

## Example: Getting status from builds

You can get the status of a build from the CLI by using the build ID:

{% highlight bash %}
codefresh get builds 5b4f927dc70d080001536fe3
{% endhighlight %}

Same thing with the API:

{% highlight bash %}
curl -X GET --header "Accept: application/json" --header "Authorization: <your_key_here>" "https://g.codefresh.io/api/builds/5b4f927dc70d080001536fe3"
{% endhighlight %}

## Example: Creating Codefresh pipelines externally

Codefresh has a great UI for creating pipelines for each of your projects. If you wish, you can also create pipelines
programmatically in an external manner. This allows you to use your own templating solution for re-using pipelines
and creating them from an external system.

First you need a YAML file that defines the pipeline. This is a pipeline [specification](#full-pipeline-specification).

>It is also very easy to create a a dummy pipeline in the Codefresh UI and then get its specification by running `codefresh get pipeline my-project/my-pipeline -o yaml > my-pipeline-spec.yml`

Here is an example:

`Pipeline Spec`
{% highlight yaml %}
{% raw %}
version: '1.0'
kind: pipeline
metadata:
  name: my-project/my-basic-pipeline
  description: my description
  labels:
    key1: value1
    key2: value2
  deprecate:
    applicationPort: '8080'
  project: my-project
spec:
  triggers:
    - type: git
      provider: github
      name: my-trigger
      repo: kostis-codefresh/nestjs-example
      events:
        - push
      branchRegex: /./
  contexts: []
  variables:
    - key: PORT
      value: 5000
      encrypted: false
    - key: SECRET
      value: "secret-value"
      encrypted: true
  steps:
    main_clone:
      title: Cloning main repository...
      type: git-clone
      repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
      revision: '${{CF_REVISION}}'
      git: github-1
    PrintFileList:
      title: Listing files
      image: 'alpine:latest'
      commands:
        - ls -l
  stages: []
{% endraw %}
{% endhighlight %}

Save this spec into a file with an arbitrary name like `my-pipeline-spec.yml`. First create the new project (if it doesn't exist already):

{% highlight bash %}
codefresh create project my-project
{% endhighlight %}

Then you can create the pipeline with the cli

{% highlight bash %}
codefresh create pipeline -f my-pipeline-spec.yml
{% endhighlight %}

And your pipeline will be available in the GUI

{% include image.html
lightbox="true"
file="/images/integrations/api/creation-of-pipeline.png"
url="/images/integrations/api/creation-of-pipeline.png"
alt="Created Pipeline"
caption="New pipeline created"
max-width="70%"
%}

Notice that you must prefix the name of the pipeline with your username and repository so that it becomes
visible in the GUI under the correct project.

## Full pipeline specification

If you don't want to create a pipeline from an existing one, you can also create your own YAML from scratch.  
The following sections contain an explanation of the fields. 
> Codefresh automatically generates additional fields, usually fields with dates and internal ID numbers. While you cannot edit these fields, you can view them by exporting the pipeline.

### Top level fields

{: .table .table-bordered .table-hover}
| Field name          | Parent field                 | Type                  | Value |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| `version`       |  | string | Always `'1.0'` |
| `kind`       |  | string | Always `pipeline` |
| `metadata`       |  | object | Holds various meta-information  |
| `spec`       |  | object | Holds the pipeline definition and other related information |


### Metadata fields

{: .table .table-bordered .table-hover}
| Field name          | Parent field                 | Type                  | Value |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| `name`       |  `metadata` | string | the full pipeline name should be formatted `project_name/pipeline_name` |
| `project`       | `metadata`  | string | the project that contains this pipeline |
| `originalYamlString`       | `metadata` | string | the full contents of the pipeline editor. Only kept for archival purposes |
| `labels`       |  `metadata` | object | Holds the `tags` array |
| `tags`       |  `labels` | array | A list of [access control tags]({{site.baseurl}}/docs/administration/account-user-management/access-control/#marking-pipelines-with-policy-attributes) for this pipeline |
| `description`       |  `metadata` | string | Human readable description of the pipeline |
| `isPublic `       |  `metadata` | boolean | If true, the pipeline logs [will be public]({{site.baseurl}}/docs/pipelines/configuration/build-status/) even for non-authenticated users |
| `template `       |  `metadata` | boolean | If true, this pipeline will be listed as a template when creating a new pipeline |

Example of metadata:

`Pipeline Spec`
{% highlight yaml %}
{% raw %}
version: '1.0'
kind: pipeline
metadata:
  name: project_name/pipeline_name
  project: project_name
  labels:
    tags:
      - tag1
      - tag2
  description: pipeline description here
  isPublic: false
  template:
    isTemplate: false
{% endraw %}
{% endhighlight %}

### Spec fields

{: .table .table-bordered .table-hover}
| Field name          | Parent field                 | Type                  | Value |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| `steps`       | `spec`  | object | The [pipeline steps]({{site.baseurl}}/docs/pipelines/steps/) to be executed |
| `stages`       | `spec` | array | The [pipeline stages]({{site.baseurl}}/docs/pipelines/stages/) for a better visual overview |
| `variables`       |  `spec` | array | List of variables defined in the pipeline itself |
| `contexts`       |  `spec` | array | Variable sets imported from [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/) |
| `runtimeEnvironment`       |  `spec` | array | where to execute this pipeline |
| `terminationPolicy `       |  `spec` | array | Termination settings of this pipeline |
| `concurrency `       |  `spec` | number | How many instances of this pipeline [can run at the same time]({{site.baseurl}}/docs/pipelines/pipelines/#policies) | 
| `triggerConcurrency `       |  `spec` | number | How many instances of this pipeline can run at the same time per trigger  |
| `branchConcurrency `       |  `spec` | number | How many instances of this pipeline can run at the same time per branch  |
| `externalResources `       |  `spec` | array | Optional external files available to this pipeline |
| `triggers`       |  `spec` | array | a list of [Git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) that affect this pipeline |
| `options`       |  `spec` | object | Extra options for the pipeline |
| `enableNotifications`       |  `options` | boolean | if false the pipeline will not send notifications to [Slack]({{site.baseurl}}/docs/integrations/notifications/slack-intergration/) and status updates back to the Git provider |

### Pipeline variables

The `variables` array has entries with the following fields:

{: .table .table-bordered .table-hover}
| Field name          | Parent field                 | Type                  | Value |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| `key`       | `variables`  | string | Name of the variable |
| `value`       | `variables` | string | Raw value |
| `encrypted`       |  `variables` | boolean | if true the value is stored encrypted |

Example of variables:

`Pipeline Spec`
{% highlight yaml %}
{% raw %}
  variables:
    - key: my-key
      value: my-value
      encrypted: false
    - key: my-second-variable
      value: '*****'
      encrypted: true
{% endraw %}
{% endhighlight %}

Encrypted variables cannot be read back by exporting the pipeline.

### Runtime environment

The `runtimeEnvironment` selects the cluster that will execute the pipeline (mostly useful for organizations using the [Codefresh Runner]({{site.baseurl}}/docs/installation/codefresh-runner/))

{: .table .table-bordered .table-hover}
| Field name          | Parent field                 | Type                  | Value |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| `name`       | `runtimeEnvironment`  | string | Name the environment as connected by the runner |
| `cpu`       | `runtimeEnvironment` | string | CPU share using Kubernetes notation |
| `memory`       |  `runtimeEnvironment` | string | memory share using Kubernetes notation |
| `dindStorage`       |  `runtimeEnvironment` | string | storage size using Kubernetes notation |


Example of metadata:

`Pipeline Spec`
{% highlight yaml %}
{% raw %}
runtimeEnvironment:
    name: my-aws-runner/cf
    cpu: 2000m
    memory: 800Mi
    dindStorage: nullGi
{% endraw %}
{% endhighlight %}

<!-- ### Termination policy

The `terminationPolicy` decides what happens when too many instances of the same pipeline run at the same time

{: .table .table-bordered .table-hover}
| Field name          | Parent field                 | Type                  | Value |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| `event`       | `variables`  | string | Name the environment as connected by the runner |
| `type`       | `variables` | string | CPU share using Kubernetes notation |
| `memory`       |  `variables` | boolean | memory share using Kubernetes notation |
| `dindStorage`       |  `variables` | boolean | storage sizew using Kubernetes notation | -->

### External resources

The `externalResources` field is an array of objects that hold [external resource information]({{site.baseurl}}/docs/pipelines/pipelines/#external-resources).

{: .table .table-bordered .table-hover}
| Field name          | Parent field                 | Type                  | Value |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| `type`       | `externalResources`  | string | Only `git` is supported |
| `source`       | `externalResources` | string | Source folder or file path in Git repo |
| `context`       |  `externalResources` | string | Name of Git provider to be used |
| `destination`       |  `externalResources` | string | Target folder or file path to be copied to |
| `isFolder`       |  `externalResources` | boolean | if true path is a folder, else it is a single file |
| `repo`       |  `externalResources` | string | git repository name for the trigger. should be in format of `git_repo_owner/git_repo_name` |
| `revision`       |  `externalResources` | string | branch name or git hash to checkout |


`Pipeline Spec`
{% highlight yaml %}
{% raw %}
externalResources:
    - type: git
      source: /src/sample/venonalog.json
      context: my-github-integration
      destination: codefresh/volume/helm-sample-app/
      isFolder: false
      repo: codefresh-contrib/helm-sample-app
      revision: master
{% endraw %}
{% endhighlight %}      

### Git triggers

The `triggers` field is an array of objects that hold [Git trigger information]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) with the following fields.

{: .table .table-bordered .table-hover}
| Field name          | Parent field                 | Type                  | Value |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| `name`       |  `triggers` | string | user defined trigger name |
| `type`       | `triggers`  | string | Always `git` |
| `repo`       | `triggers` | string | git repository name for the trigger. should be in format of `git_repo_owner/git_repo_name` |
| `events`       |  `triggers` | array | All possible values are documented later. The possible values depend on Git provider |
| `pullRequestAllowForkEvents`       |  `triggers` | boolean | If this trigger is also applicable to Git forks |
| `commentRegex`       |  `triggers` | string | Only activate trigger if regex expression matches PR comment |
| `branchRegex `       |  `triggers` | string | Only activate trigger if regex expression/string matches branch |
| `branchRegexInput `       |  `triggers` | string | Defines what type of content is in `branchRegex`. Possible values are `regex`, `multiselect`, `multiselect-exclude` | 
| `provider `       |  `triggers` | string | Name of provider as found in Git integrations |
| `modifiedFilesGlob `       |  `triggers` | string | Only activate trigger if changed files match glob expression |
| `disabled `       |  `triggers` | boolean | if true, trigger will never be activated  |
| `options `       |  `triggers` | array | Choosing [caching behavior]({{site.baseurl}}/docs/pipelines/pipeline-caching/) of this pipeline |
| `noCache `       |  `options` | boolean | if true, docker layer cache is disabled |
| `noCfCache `       |  `options` | boolean | if true, extra Codefresh caching is disabled |
| `resetVolume `       |  `options` | boolean | if true, all files on volume will be deleted before each execution |
| `context `       |  `triggers` | string | Name of git context to use |
| `contexts`       |  `spec` | array | Variable sets imported from [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/) |
| `variables`       |  `triggers` | array | Override variables that were defined in the pipeline level |
| `runtimeEnvironment`       |  `triggers` | array | Override the runtime environment that was defined in the pipeline level |

The possible values for the `events` array are the following (only those supported by the Git provider can be actually used)

 * `push.heads` - for push commit
 * `push.tags` - for push tag event
 * `pullrequest` - any pull request event
 * `pullrequest.opened` - pull request opened
 * `pullrequest.closed` - pull request closed
 * `pullrequest.merged` - pull request merged
 * `pullrequest.unmerged-closed` - pull request closed (not merged)
 * `pullrequest.reopened` - pull request reopened
 * `pullrequest.edited` - pull request edited
 * `pullrequest.assigned` - pull request assigned
 * `pullrequest.unassigned` - pull request unassigned
 * `pullrequest.reviewRequested` - pull request review requested
 * `pullrequest.reviewRequestRemoved` - pull request review request removed
 * `pullrequest.labeled` - pull request labeled
 * `pullrequest.unlabeled` - pull request unlabeled
 * `pullrequest.synchronize` - pull request synchronized
 * `pullrequest.commentAdded` - pull request comment added
 * `release` - Git release event

The `variables` and `runtimeEnvironment` fields have exactly the same format as in the parent pipeline fields but values defined in the trigger will take higher priority.

Full example:

`Pipeline Spec`
{% highlight yaml %}
{% raw %}
triggers:
    - name: guysalton-codefresh/helm-sample-app
      type: git
      repo: guysalton-codefresh/helm-sample-app
      events:
        - push.heads
        - pullrequest.commentAdded
      pullRequestAllowForkEvents: true
      commentRegex: /.*/gi
      branchRegex: /^((master|develop)$).*/gi
      branchRegexInput: regex
      modifiedFilesGlob: /project1/**
      provider: github
      disabled: false
      options:
        noCache: false
        noCfCache: false
        resetVolume: false
      verified: true
      context: guyGithub
      contexts:
        - artifactory
      variables:
        - key: key
          value: '*****'
          encrypted: true
      runtimeEnvironment:
        name: docker-desktop/cf
        cpu: 400m
        memory: 800Mi
        dindStorage: nullGi
{% endraw %}
{% endhighlight %}  


## Using Codefresh from within Codefresh

The Codefresh CLI is also packaged as a [Docker image on its own](https://hub.docker.com/r/codefresh/cli/){:target="\_blank"}. This makes it
very easy to use it from within Codefresh in a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).

For example, you can easily call pipeline B from pipeline A  
with the following step:

`codefresh.yml` of pipeline A
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  myTriggerStep:
    title: triggering another pipeline
    image: codefresh/cli
    commands:
      - 'codefresh run <pipeline_B> -b=${{CF_BRANCH}}' -t <pipeline-b-trigger-name>
    when:
      condition:
        all:
          validateTargetBranch: '"${{CF_PULL_REQUEST_TARGET}}" == "production"'
          validatePRAction: '''${{CF_PULL_REQUEST_ACTION}}'' == ''opened'''
{% endraw %}
{% endhighlight %}

This step only calls pipeline B when a pull request is opened for the branch named `production`.

Note that when you use the Codefresh CLI in a pipeline step, it is already configured, authenticated, and ready for use.
No additional authentication is required.

## Related articles
[Codefresh API documentation](https://g.codefresh.io/api/){:target="\_blank"}    
[Codefresh CLI documentation](https://codefresh-io.github.io/cli/){:target="\_blank"}  
  

