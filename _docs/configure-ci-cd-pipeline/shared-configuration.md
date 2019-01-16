---
title: "Shared configuration"
description: "How to keep your pipelines DRY"
group: configure-ci-cd-pipeline
toc: true
---
  
After creating several pipelines in Codefresh you will start to notice several common values between them. Common examples are access tokens, environment urls, configuration properties e.t.c.

Codefresh allows you to create those shared values in a central place and then reuse them in your pipelines
avoiding the use of copy-paste.

You can share:

* Environment parameters (easy)
* Helm values (easy)
* Any kind of YAML data (advanced)


## Creating shared configuration

From the left sidebar click *Account settings* to enter your global settings. Then choose *Shared Configuration* from the left menu.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/shared-configuration.png" 
url="/images/pipeline/shared-configuration/shared-configuration.png"
alt="Creating shared configuration snippets" 
caption="Creating shared configuration snippets"
max-width="50%"
%}

You can create two types of shared configuration:

* Shared configuration/ Shared secret
* yaml/ secret yaml

The shared configuration is for environment variables. The secret variant is the same thing but with encrypted values for sensitive data (such as access tokens).

The shared yaml is for Helm value or any other generic information. The secret yaml encrypts the contents.

You can create as many shared snippets as you want (with unique names).

## Using shared environment variables

Each pipeline has a set of environment variables that can be defined in its configuration screen.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/environment-variables.png" 
url="/images/pipeline/shared-configuration/environment-variables.png"
alt="Pipeline environment variables" 
caption="Pipeline environment variables"
max-width="50%"
%}

To use your shared configuration, click the import button and select the snippet from the list:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/import-variables.png" 
url="/images/pipeline/shared-configuration/import-variables.png"
alt="Importing shared configuration" 
caption="Importing shared configuration"
max-width="50%"
%}

Once you click *Select* the values from the shared configuration will be appended to the ones
you have in your pipelines. In case of similar values the shared configuration will follow the [precedence rules]({{site.baseurl}}/docs/codefresh-yaml/variables/#user-provided-variables).


## Using shared Helm values

To use a shared YAML snippet for Helm values you can install a new Helm chart either from

* The [Helm chart list]({{site.baseurl}}/docs/new-helm/add-helm-repository/#install-chart-from-your-helm-repository)
* The [Helm environment board]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/#moving-releases-between-environments)

In both cases, when you see the Helm installation dialog you can import any of your YAML snippets
to override the default chart values.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/helm-import.png" 
url="/images/pipeline/shared-configuration/helm-import.png"
alt="Importing Helm values" 
caption="Importing Helm values"
max-width="50%"
%}

From the same dialog you can also create a brand new shared configuration snippet of type YAML.
Not only it will be used for this Helm chart, but it will be added in your global shared configuration as well.

## Sharing any kind of YAML data in pipelines

All the snippets from shared configuration are also available as context in the [Codefresh CLI](https://codefresh-io.github.io/cli/contexts/)

This means that you can manipulate them programmatically and read their values in the pipeline in any way you see fit.

If for example you have a shared configuration named `my-global-config` you can easily read its contents programmatically using the CLI:

{% highlight shell %}
$codefresh get context my-global-config --output=yaml

apiVersion: v1
kind: context
metadata:
  default: false
  system: false
  name: my-global-config
type: config
spec:
  type: config
  data:
    foo: bar
{% endhighlight %}

### Example - custom value manipulation

Let's say that you have a YAML segment with the following contents:

{% highlight yaml %}
favorite:
  drink: coffee
  food: pizza
{% endhighlight %}

Here is a pipeline step that is reading the yaml snippet and extracts a value

  `YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
 MyFavoriteFoodStep:
    title: Favorite food
    image: codefresh/cli
    commands:
      - echo I love eating $(codefresh get context my-food-values --output=json | jq -r '.spec.data.favorite.food')
{% endraw %}
{% endhighlight %}     

Once the pipeline runs, you will see in the logs: 

```
I love eating pizza
```


## What to read next

* [Variables]({{site.baseurl}}/docs/codefresh-yaml/variables/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)

