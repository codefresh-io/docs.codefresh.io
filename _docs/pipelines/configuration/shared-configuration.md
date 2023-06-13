---
title: "Shared configuration for pipelines"
description: "How to keep your pipelines DRY"
group: pipelines
sub_group: configuration
redirect_from:
  - /docs/configure-ci-cd-pipeline/shared-configuration/
toc: true
---
  
After creating several pipelines in Codefresh, you will start to notice several common values between them. Common examples are access tokens, environment URLs, configuration properties etc.

Codefresh allows you to create those shared values in a central place and then reuse them in your pipelines
avoiding the use of copy-paste.

You can share:

* Environment parameters (easy)
* Helm values (easy)
* Any kind of YAML data (advanced)



## Creating shared configuration contexts

Create one or more shared configuration contexts at the account-level to use in pipelines.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select [**Shared Configuration**](https://g.codefresh.io/account-admin/account-conf/shared-config){:target="\_blank"}.
1. Click **Add Configuration Context** and select the type of shared configuration context to add.
1. Enter a name for the shared configuration context and click **Save**.
1. Add one or more variables in Key = Value format.
1. To allow access to all users, toggle **Allow access to all users** ON.
1. Click **Save**.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/shared-configuration.png" 
url="/images/pipeline/shared-configuration/shared-configuration.png"
alt="Creating shared configuration contexts" 
caption="Creating shared configuration contexts"
max-width="50%"
%}

You can create four types of shared configuration contexts:

* **Shared Configuration**: for environment variables
* **Shared Secret**: for encrypted environment variables of sensitive data (access tokens, etc.) 
* **YAML**: for Helm values or any other generic information
* **Secret YAML**: for above, but encrypts the contents

>RBAC is supported for all types of shared configurations. 

You can create as many shared snippets as you want (with unique names).

### Using external secrets as values

Note that the default "shared secrets" and "secret yaml" entities use the built-in secret storage of Codefresh. You can also
use any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets), by using the normal entities and then clicking on the lock icon that appears.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/shared-conf-secret-integration.png" 
url="/images/pipeline/shared-configuration/shared-conf-secret-integration.png"
alt="Using external secrets in shared configuration values" 
caption="Using external secrets in shared configuration values"
max-width="50%"
%}

If you have already specified the resource field during secret definition the just enter on the text field the name of the secret directly, i.e. `my-secret-key`.
If you didn't include a resource name during secret creation then enter the full name in the field like `my-secret-resource@my-secret-key`.

### Level of access

For each set of values you can toggle the level of access by [non-admin users]({{site.baseurl}}/docs/administration/access-control/#users-and-administrators). If it is off, users will **not** be able to use the [CLI](https://codefresh-io.github.io/cli/) or [API]({{site.baseurl}}/docs/integrations/codefresh-api/)
to access these [values](https://codefresh-io.github.io/cli/contexts/). If it is on, all users from all your Codefresh teams will be able to access this set of values
with CLI commands or API calls.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/shared-config-access.png" 
url="/images/pipeline/shared-configuration/shared-config-access.png"
alt="Allow access to non-admin users" 
caption="Allow access to non-admin users"
max-width="60%"
%}

We recommend that you disable access for all values of type *shared secret* and *secret YAML* unless your organization has different needs.



## Using shared environment variables

Each pipeline has a set of environment variables that can be defined in the *Workflow* screen.
To import a shared configuration open the pipeline editor, and from the tabs on the right side select *VARIABLES*. Then click the gear icon to *Open Advanced Options*:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/environment-variables.png" 
url="/images/pipeline/shared-configuration/environment-variables.png"
alt="Pipeline environment variables" 
caption="Pipeline environment variables"
max-width="50%"
%}

To use your shared configuration, click the *Import from shared configuration* button and select the snippet from the list:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/import-variables.png" 
url="/images/pipeline/shared-configuration/import-variables.png"
alt="Importing shared configuration" 
caption="Importing shared configuration"
max-width="50%"
%}

Once you click *Add* the values from the shared configuration will be appended to the ones
you have in your pipelines. In case of similar values the shared configuration will follow the [precedence rules]({{site.baseurl}}/docs/pipelines/variables/#user-provided-variables).



## Using shared Helm values

To use a shared YAML snippet for Helm values you can install a new Helm chart either from the:

* [Helm chart list]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/)
* [Helm environment board]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/)

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

From the same dialog you can also create a brand-new shared configuration snippet of type YAML.
Not only it will be used for this Helm chart, but it will be added in your global shared configuration as well.

## Using values from the Shared Configuration in your Helm step

Additionally, you can define shared variables in your account settings and reuse those across your Helm steps, and specifically, in your [custom Helm values]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/).

Under *Account Setting* > *Shared Configuration*, add the variable to your shared configuration. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/helm-shared-variables.png" 
url="/images/pipeline/shared-configuration/helm-version-shared.png"
alt="Adding shared configuration variables" 
caption="Adding shared configuration variables"
max-width="50%"
%}

Go to the workflow of the Codefresh pipeline to which you want to add the variable. Then select *variables* from the right sidebar. *Open advanced configuration* and select *Import from shared configuration*. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/environment-variables.png" 
url="/images/pipeline/shared-configuration/environment-variables.png"
alt="Pipeline environment variables" 
caption="Pipeline environment variables"
max-width="50%"
%}

This will allow you to add shared variables. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/shared-helm-variables.png" 
url="/images/pipeline/shared-configuration/shared-helm-variables.png"
alt="Shared helm variable" 
caption="Shared helm variable"
max-width="50%"
%}

Add the shared variables to your Helm step:

{% highlight shell %}
{% raw %}
deploy:
  type: "helm"
  working_directory: "./react-article-display"
  stage: "deploy"
  arguments:
    action: "install"
    chart_name: "charts/example-chart"
    release_name: "test-chart"
    helm_version: "${{HELM_VERSION}}"
    kube_context: "anais-cluster@codefresh-sa"
  custom_values:
        - 'pullPolicy=${{PULL_POLICY}}'
{% endraw %}
{% endhighlight %}

The shared variables can now be used across your pipelines. 

## Sharing any kind of YAML data in pipelines

All the snippets from shared configuration are also available as context in the [Codefresh CLI](https://codefresh-io.github.io/cli/contexts/).

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

Let's say that you have a YAML segment with the following content:

{% highlight yaml %}
favorite:
  drink: coffee
  food: pizza
{% endhighlight %}

Here is a pipeline step that reads the YAML snippet and extracts a value:

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

## Manipulating shared configuration programmatically

You can also manipulate shared configurations programmatically via the [Codefresh CLI](https://codefresh-io.github.io/cli/){:target="\_blank"} and the [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/).

For example, you can reference one or more shared configuration contexts directly in the YAML using `spec.contexts` as described below.

If you have a shared configuration named `test-hello` that includes the variable `test=hello`, you can add `spec.contexts.test-hello` to the pipeline YAML, and then reference this variable in the pipeline as you would any other variable.

{% highlight shell %}
{% raw %}
version: "1.0"
kind: pipeline
metadata:
  name: default/test-shared-config-from-pipe-spec
spec:
  contexts:
    - test-hello
  steps:
    test:
      image: alpine
      commands:
        - echo ${{test}} # should output "hello"
{% endraw %}
{% endhighlight %}



For detailed information on how to create/update/delete shared configuration contexts via the CLI, see [Contexts](https://codefresh-io.github.io/cli/contexts/){:target="\_blank"}.

For information on all the options available in the _full Codefresh YAML_, see [Full pipeline specifications]({{site.baseurl}}/docs/integrations/codefresh-api/#full-pipeline-specification).



## Related articles
[Variables]({{site.baseurl}}/docs/pipelines/variables/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Pipeline steps]({{site.baseurl}}/docs/pipelines/steps/)  

