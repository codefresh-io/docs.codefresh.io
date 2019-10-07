---
title: "Codefresh API"
description: "How to integrate Codefresh with other systems"
group: integrations
redirect_from:
  - /docs/codefresh-api/
toc: true
old_url: /docs/codefresh-api
---

Codefresh offers a comprehensive [API](https://en.wikipedia.org/wiki/Application_programming_interface) that you can use to integrate with any other application or solution you already have.

The full details of the API are documented at [https://g.codefresh.io/api/](https://g.codefresh.io/api/)

{% include image.html
lightbox="true"
file="/images/integrations/api/overview.png"
url="/images/integrations/api/overview.png"
alt="Using the Codefresh API"
max-width="70%"
%}

You can use the API in various ways:

* From your local workstation with any tool that speaks HTTP (such as [postman](https://github.com/postmanlabs), [httpie](https://httpie.org/), [curl](https://curl.haxx.se/) etc.).
* From another HTTP enabled system such as Jenkins. You can trigger Codefresh pipelines from Jenkins jobs.
* Using the [Codefresh command line interface](https://codefresh-io.github.io/cli/) which itself uses the API .
* Calling it programmatically from any other system. You can use your favorite programming language to make HTTP calls to Codefresh.


The Codefresh API is updated when new features are added in the Codefresh platform so you can expect any new functionality
to appear to the API as well.

## Ways to use the Codefresh API

There are several ways to use the API. Some of the most popular ones are:


1. Triggering builds from another system. You can start a Codefresh pipeline from any other internal system that you already have in your organization.
1. Getting the status of builds in another system. 
1. Creating pipelines externally. You don't have to use the Codefresh GUI to create pipelines. You can create them programmatically using your favorite template mechanism. You can reuse pipelines using your own custom implementation
if you have special needs in your organization.

You can browse the current API at [https://g.codefresh.io/api/](https://g.codefresh.io/api/).

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

Before you can use the API from your application you need an authentication key that will give programmatic access to Codefresh from an external application.

In order to create your own API key, click *User Settings* on the left sidebar and scroll down until you find the *API Keys* section.
Click the *generate* button and copy your key.

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

The following scopes are available:

* *Build* - Full access to all build information
* *Build Read* - Get all information from builds
* *Build Read status* - Get build status
* *Build Write* - Change Build information
* *Cluster* - Full access to Kubernetes cluster integrations
* *Cluster Read* - Read information from Kubernetes integrations
* *Cluster Write* - Change Kubernetes integrations
* *Pipeline* - Full access to pipelines
* *Pipeline Approve* - Ability to approve pipeline
* *Pipeline Read* - Read information from pipelines
* *Pipeline Run* - Execute/Run pipelines
* *Pipeline write* - Edit pipeline information
* *Project* - Full access to projects
* *Project Read* - Get information from projects
* *Project Write* - Change project information
* *Step-type* - Full access to steps
* *Step-type Read* - Read information from existing steps
* *Step-type Write* - Change/Edit custom steps.

Check that ones that you wish to use with this key

## Using the API Key with the Codefresh CLI

Once you have the key use it in the Codefresh Cli like this

{% highlight bash %}
codefresh auth create-context --api-key <your_key_here>
{% endhighlight %}

Now the Codefresh CLI is fully authenticated. The key is stored in `~/.cfconfig` so you only need to run this command once. The CLI
can also work with [multiple authentication contexts](https://codefresh-io.github.io/cli/authentication/) so it is possible to manage multiple Codefresh accounts at the same time.

## Example - Triggering pipelines

You can trigger any pipeline in Codefresh and even pass extra environment variables (even if they are not
declared in the UI)

Triggering a pipeline via the Codefresh CLI

{% highlight bash %}
codefresh run kostis-codefresh/nestjs-example/ci-build -b master -t nestjs-example-trigger-name
{% endhighlight %}

You can pass extra environment variables as well:
{% highlight bash %}
codefresh run kostis-codefresh/nestjs-example/ci-build -b master -t nestjs-example-trigger-name -v sample-var1=sample1 -v SAMPLE_VAR2=SAMPLE2
{% endhighlight %}

For the API you can trigger a pipeline by finding its serviceId from the UI

{% highlight bash %}
curl 'https://g.codefresh.io/api/builds/5b1a78d1bdbf074c8a9b3458' --compressed -H 'content-type:application/json; charset=utf-8' -H 'Authorization: <your_key_here>' --data-binary '{"serviceId":"5b1a78d1bdbf074c8a9b3458","type":"build","repoOwner":"kostis-codefresh","branch":"master","repoName":"nestjs-example"}'
{% endhighlight %}

You can also pass extra environment variables using an array

{% highlight bash %}
curl 'https://g.codefresh.io/api/builds/5b1a78d1bdbf074c8a9b3458' --compressed -H 'content-type:application/json; charset=utf-8' -H 'Authorization: <your_key_here>' --data-binary '{"serviceId":"5b1a78d1bdbf074c8a9b3458","type":"build","repoOwner":"kostis-codefresh","branch":"master","repoName":"nestjs-example","variables":{"sample-var1":"sample1","SAMPLE_VAR2":"SAMPLE2"}}'
{% endhighlight %}

## Example - getting status from builds

You can get the status of a build from the cli by using its ID:

{% highlight bash %}
codefresh get builds 5b4f927dc70d080001536fe3
{% endhighlight %}

Same thing with the API

{% highlight bash %}
curl -X GET --header "Accept: application/json" --header "Authorization: <your_key_here>" "https://g.codefresh.io/api/builds/5b4f927dc70d080001536fe3"
{% endhighlight %}

## Example - creating Codefresh pipelines externally

Codefresh has a great UI for creating pipelines for each of your projects. If you wish, you can also create pipelines
programmatically in an external manner. This allows you to use your own templating solution for re-using pipelines
and creating them from an external system.

First you need a yaml file that defines the pipeline. This is a pipeline [specification](https://codefresh-io.github.io/cli/pipelines/spec/).

>It is also very to create a a dummy pipeline in the Codefresh Web UI and then get its specification by running `codefresh get pipeline my-project/my-pipeline -o yaml > my-pipeline-spec.yml`

Here is an example

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

## Using Codefresh from within Codefresh

The Codefresh CLI is also packaged in a [Docker image on its own](https://hub.docker.com/r/codefresh/cli/). This makes it
very easy to use it from within Codefresh in a [free style step]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/).

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

Note that when you use the Codefresh CLI in a pipeline step, it is already configured, authenticated and ready for use.
No additional authentication is required.

## What to read next

* [Codefresh API documentation](https://g.codefresh.io/api/)
* [Codefresh CLI documentation](https://codefresh-io.github.io/cli/)
