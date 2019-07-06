---
title: "Steps"
description: "Learn the types of Pipeline steps"
group: codefresh-yaml
redirect_from:
  - /docs/steps/
toc: true
---

Codefresh [pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/) are composed of a series of steps. 

You can create your own pipelines by writing a  [codefresh.yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file that describes your pipeline. This file can then be version controlled on its own (pipeline as code).

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/stages/complex-pipeline.png" 
url="/images/codefresh-yaml/stages/complex-pipeline.png"
alt="Pipeline steps" 
caption="Pipeline steps"
max-width="80%"
%}

## Built-in steps

The steps offered by Codefresh are:

* [Git clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
* [Freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
* [Build]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)
* [Push]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
* [Composition]({{site.baseurl}}/docs/codefresh-yaml/steps/composition/)
* [Launch test environment]({{site.baseurl}}/docs/codefresh-yaml/steps/launch-composition/)
* [Deploy]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/)
* [Approval]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/)

**Git clone** steps allow you to checkout code in your pipeline from any internal or external repository. Existing accounts that still use repositories instead of [projects]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-concepts) have an implicit clone step in the pipelines. 

**Freestyle** steps are the cornerstone of Codefresh pipelines. They allow you to run any command within the context of a Docker container. A lot of Codefresh optimizations such as the [shared docker volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) are designed specifically for freestyle steps.
Freestyle steps are a secure replacement for `docker run` commands.

**Build** steps are the main way where you get access to the Docker daemon (Docker as a service) in Codefresh pipelines. Build steps take as input any Dockerfile and run it on the cloud in a similar manner to what you do on your workstation. Build steps automatically push the result to the [internal Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) (no need for docker login commands). Codefresh also comes with a global Docker cache that automatically gets attached to all build nodes. Build steps are a secure replacement for `docker build` commands.

**Push** steps allow you to push and tag your docker images (created by the build step) in any [external Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). Push steps are *not* needed at all if you work with only the internal Codefresh registry. Push steps are a secure replacement for the `docker tag` and `docker push` commands.

**Composition** steps allow you to run multiple services together in the Codefresh infrastructure and execute unit tests or other commands against them. They are discarded once a pipeline finishes. Composition steps are a secure replacement for `docker-compose` definitions.

**Launch test environment** steps behave similar to compositions, but they persist after the pipeline ends. This is a great way to create preview environment from your pull requests and send to colleagues.

**Deploy steps** allow to [perform Kubernetes deployments]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) in a declarative manner. They embody the Continuous Deployment aspect of Codefresh.

**Approval steps** allow you to pause pipelines, and wait for human intervention before resuming. They allow you to embrace the concepts of Continuous Delivery.

>Note that Codefresh also supports [parallel workflows]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/) as well as running pipelines [locally on your workstation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/running-pipelines-locally/).

## Step directory

In the case of freestyle steps we also offer a [plugin marketplace](https://steps.codefresh.io/) with several existing plugins for popular integrations.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/plugin-directory.png" 
url="/images/pipeline/plugin-directory.png"
alt="Codefresh steps directory" 
caption="Codefresh steps directory" 
max-width="80%" 
%}

Codefresh steps can be 

* private (visible only to you and your team) or public (visible to everybody via the marketplace)
* official (supported by the Codefresh team) or community based
* ready for production or still incubating.

You can use any your pipelines any of the public steps already in the marketplace, any steps created by your team and any steps that you create for yourself.

## Using custom pipeline steps

When you create a pipeline you will have access to two categories of steps

* public steps that exist in the marketplace.
* steps that you or your team have created (visible only to you)

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/steps/choose-step.png" 
url="/images/codefresh-yaml/steps/choose-step.png"
alt="Choosing a custom step" 
caption="Choosing a custom step" 
max-width="60%" 
%}

To use a step, first click on the pipeline section where you want to insert the step.
You will get a new dialog with all the details of the step along with a live preview of the exact
[yaml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) that will be inserted in your pipeline.

For all steps you can define

* The title of the text (which will also be visible in the pipeline UI)
* A freetext description 
* The [stage]({{site.baseurl}}/docs/codefresh-yaml/stages/) that will contain the step.

The rest of the fields are specific to each step. See the documentation of each step in order to understand what each field should contain. There are fields for each step that are marked as required and are essential for the step to work. These are marked with an asterisk.

Once a step is added to the pipeline, you are fee to change the resulting yaml even further by just typing in the pipeline editor.

## Creating your own step

You can use the [Codefresh CLI](https://codefresh-io.github.io/cli/) and more specifically the [step-type resource](https://codefresh-io.github.io/cli/steps/) to create your own step. Each Codefresh step is composed from two parts.

1. The step description in the special yaml syntax for describing Codefresh steps
1. A Docker images that implements the step (optional)

The easiest way to create your own step is to start by using the definition of an existing step.

{% highlight bash %}
codefresh get step-type vault -o yaml > vault-step.yml
{% endhighlight %}

Here is the resulting yaml:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
kind: step-type
metadata:
  name: vault
  isPublic: true
  description: >-
    The plugin exports KV pairs from Hashicorp Vault to Codefresh pipeline ENV
    variables
  sources:
    - 'https://github.com/codefresh-io/steps/tree/master/incubating/vault'
  stage: incubating
  maintainers:
    - name: Alexander Aladov
  categories:
    - featured
  official: false
  tags: []
  icon:
    type: svg
    url: 'https://cdn.jsdelivr.net/gh/codefresh-io/steps/incubating/vault/icon.svg'
    background: '#FFFFFF'
  examples:
    - description: example-1
      workflow:
        version: '1.0'
        steps:
          Vault_to_Env:
            title: Importing vault values
            type: vault
            arguments:
              VAULT_ADDR: '${{VAULT_ADDR}}'
              VAULT_PATH: '${{VAULT_PATH}}'
              VAULT_AUTH_TOKEN: '${{VAULT_AUTH_TOKEN}}'
              VAULT_CLIENT_CERT_BASE64: '${{VAULT_CLIENT_CERT_BASE64}}'
              VAULT_CLIENT_KEY_BASE64: '${{VAULT_CLIENT_KEY_BASE64}}'
  created_at: '2019-07-03T14:57:02.057Z'
  updated_at: '2019-07-06T13:27:09.518Z'
  id: 5d1cc23ea7e22e40227ea75d
spec:
  arguments: |-
    {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "additionalProperties": false,
        "patterns": [],
        "required": [
          "VAULT_ADDR",
          "VAULT_PATH",
          "VAULT_AUTH_TOKEN"
        ],
        "properties": {
            "VAULT_ADDR": {
                "type": "string",
                "description": "Vault server URI. Example: https://vault.testdomain.io:8200 (required)"
            },
            "VAULT_PATH": {
                "type": "string",
                "description": "Path to secrets in vault. Example: secret/codefreshsecret (required)"
            },
            "VAULT_AUTH_TOKEN": {
                "type": "string",
                "description": "Vault authentication token (required)"
            },
            "VAULT_CLIENT_CERT_BASE64": {
                "type": "string",
                "description": "Base64 encoded client cerificate"
            },
            "VAULT_CLIENT_KEY_BASE64": {
                "type": "string",
                "description": "Base64 encoded client key"
            }
        }
    }
  steps:
    main:
      name: vault
      image: codefreshplugins/vault
      environment:
        - 'VAULT_ADDR=${{VAULT_ADDR}}'
        - 'VAULT_PATH=${{VAULT_PATH}}'
        - 'VAULT_AUTH_TOKEN=${{VAULT_AUTH_TOKEN}}'
        - 'VAULT_CLIENT_CERT_BASE64=${{VAULT_CLIENT_CERT_BASE64}}'
        - 'VAULT_CLIENT_KEY_BASE64=${{VAULT_CLIENT_KEY_BASE64}}'


{% endraw %}
{% endhighlight %}

For each step you define the following sections

* metadata to describe the characteristics of the step
* the description of its arguments
* the implementation (i.e. what yaml gets inserted in the pipline)

For the metadata section note the following:

* `isPublic` decides if this step is visible only to your and your team, or visible to all (in the marketplace)
* The `name` of the step must be prefixed with your codefresh username. Steps created by the Codefresh team are on the root level of the hierarchy (without prefix). This is the same pattern that Dockerhub is using for images.
* `stage` shown if this step is ready for production or still incubating. This is just an indication to users. It doesn't affect the implementation of the step in any way
* `icon`. Ideally you provide a transparent svg so that the icon is scalable. The icon for a step is used both in the marketplace as well as the pipeline view. You can also select a default background to be used. Alternatively you can define jpg/png icons for large/medium/small sizes. We suggest the svg approach
* the `examples` section will be shown in the marketplace as documentation for your step

For the argument section we follow the [JSON Schema](http://json-schema.org/learn/miscellaneous-examples.html). You can use the [Schema generator](https://jsonschema.net/) to easily create a schema. Currently only the inputs for a step are modelled inside the step definition.

The final part is the implementation. Here you can define exactly that yaml that this step will insert in the pipeline. You can use any of the built-in steps in Codefresh and even add multiple steps.

Once you are done with your step, use the codefresh CLI to upload it to the marketplace. If you want the step to be available only to you and your team make sure that the property `isPublic` is false (and then it will not be shown in the marketplace).

{% highlight bash %}
codefresh create step-type kostis-codefresh/sample -f my-custom-step.yml
{% endhighlight %}

If you want to remove your step from the marketplace, you can delete it

{% highlight bash %}
codefresh delete step-type kostis-codefresh/sample
{% endhighlight %}

## What to read next

* [Introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
* [Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)
* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)

