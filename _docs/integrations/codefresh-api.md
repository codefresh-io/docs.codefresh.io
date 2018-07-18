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

The full details of the API are documented using [Swagger](https://swagger.io/) at [https://g.codefresh.io/api/](https://g.codefresh.io/api/)

{% include image.html 
lightbox="true" 
file="/images/integrations/api/overview.png" 
url="/images/integrations/api/overview.png" 
alt="Using the Codefresh API" 
max-width="70%" 
%}

You can use the API in various ways

* From your local workstation with any tool that speaks HTTP (such as [postman](https://github.com/postmanlabs), [httpie](https://httpie.org/), [curl](https://curl.haxx.se/) etc.)
* From another HTTP enabled system such as Jenkins. You can trigger Codefresh pipelines from Jenkins jobs
* Using the [Codefresh command line interface](https://codefresh-io.github.io/cli/) which itself uses the API 
* Calling it programmatically from any other system. You can use your favorite programming language to make HTTP calls to Codefresh

The Codefresh API is updated when new features are added in the Codefresh platform so you can expect any new functionality
to appear to the API as well.


## Ways to use the Codefresh API

There are several ways to use the API. Some of the most popular ones are:

1. Triggering builds from another system. You can start a Codefresh pipeline from any other internal system that you already have in your organization
1. Getting the status of builds in another system. 
1. Creating pipelines externally. You don't have to use the Codefresh GUI to create pipelines. You can create them programmatically using your favorite template mechanism. You can reuse pipelines using your own custom implementation
if you have special needs in your organization.

Before you can use the API from your application you need an authentication token that will give programmatic access to Codefresh from an external application.

## Authentication instructions

If you just want to play around with the API a token is already created for you in Swagger. You can make any call
interactively and see results right from the browser.

{% include image.html 
lightbox="true" 
file="/images/integrations/api/get-build.png" 
url="/images/integrations/api/get-build.png" 
alt="Interactive API requests" 
caption="Interactive API requests" 
max-width="70%" 
%}


You can also copy the `curl` command shown in the UI. It includes the token in the request.

If you want to create your own token then click *Configuration* on the left sidebar and select the *tokens* tab.
Click the *generate* button and copy your token. 


{% include image.html 
lightbox="true" 
file="/images/integrations/api/generate-token.png" 
url="/images/integrations/api/generate-token.png" 
alt="Generating a token for the API" 
caption="Generating a token for the API" 
max-width="70%" 
%}

From the same screen you can also revoke tokens if you don't need them anymore.

Then once you have the token use it in the Codefresh Cli like this

```
codefresh auth create-context --api-key <your_key_here>
```


Now the Codefresh CLI is fully authenticated. The key is stored in `~/.cfconfig` so you only need to run this command once. The CLI
can also work with [multiple authentication contexts](https://codefresh-io.github.io/cli/authentication/) so it is possible to manage multiple Codefresh accounts at the same time.


## Example - Triggering pipelines

You can trigger any pipeline in Codefresh and even pass extra environment variables (even if they are not
declared in the UI)

Triggering a pipeline via the Codefresh CLI

```
codefresh run kostis-codefresh/nestjs-example/ci-build -b master
```

You can pass extra environment variables as well:
```
codefresh run kostis-codefresh/nestjs-example/ci-build -b master -v sample-var1=sample1 -v SAMPLE_VAR2=SAMPLE2 
```

For the API you can trigger a pipeline by finding its serviceId from the UI

```
curl 'https://g.codefresh.io/api/builds/5b1a78d1bdbf074c8a9b3458' --compressed -H 'content-type:application/json; charset=utf-8' -H 'x-access-token: <your_token_here>' --data-binary '{"serviceId":"5b1a78d1bdbf074c8a9b3458","type":"build","repoOwner":"kostis-codefresh","branch":"master","repoName":"nestjs-example"}'
```

You can also pass extra environment variables using an array

```
curl 'https://g.codefresh.io/api/builds/5b1a78d1bdbf074c8a9b3458' --compressed -H 'content-type:application/json; charset=utf-8' -H 'x-access-token: <your_token_here>' --data-binary '{"serviceId":"5b1a78d1bdbf074c8a9b3458","type":"build","repoOwner":"kostis-codefresh","branch":"master","repoName":"nestjs-example","variables":{"sample-var1":"sample1","SAMPLE_VAR2":"SAMPLE2"}}'
```

The exact webhook can be easily found on the build settings for each pipeline.

{% include image.html 
lightbox="true" 
file="/images/integrations/api/webhook-url.png" 
url="/images/integrations/api/webhook-url.png" 
alt="Getting the webhook URL" 
caption="Getting the webhook URL" 
max-width="70%" 
%}


If you press the copy button you will have in your clipboard the whole request (including a token)

## Example - getting status from builds

You can get the status of a build from the cli by using its ID:

```
codefresh get builds 5b4f927dc70d080001536fe3
```

Same thing with the API

```
curl -X GET --header "Accept: application/json" --header "x-access-token: <your_token_here>" "https://g.codefresh.io/api/builds/5b4f927dc70d080001536fe3"
```




## Using Codefresh from within Codefresh

The Codefresh CLI is also packaged in a [Docker image on its own](https://hub.docker.com/r/codefresh/cli/). This makes it
very easy to use it from within Codefresh in a [free style step]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/).

For example you can easily call pipeline B from pipeline A  
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
      - 'codefresh run <pipeline_B> -b=${{CF_BRANCH}}'
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
