---
title: "Secrets Storage"
description: "Keep sensitive data on your favorite secret store provider"
group: configure-ci-cd-pipeline
toc: true
---

Codefresh has added the additional ability to resolve variables storing secrets from remote sources.

It allows the user to keep sensitive data on his/her favorite secret-store provider, and for Codefresh to request it during pipeline execution on user's demand.
Secret-Store is an additional context in Codefresh, which can be created, updated, deleted, etc, using Codefresh CLI: `codefresh create context secret-store --help`. 

At the moment, we only support two types: Kubernetes (SAAS version) and Runtime-Kubernetes (hybrid deployments).

> Note: This feature is for Enterprise accounts only.

## Prerequisites (for Kubernetes secret store)

- You need to have your Kubernetes cluster [connected to Codefresh]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/).
(this is only for Kubernetes type secret store, for runtime-kubernetes [hybrid installation], this is not required)

## Create a Secret

- Create your secret in Kubernetes, i.e.

```
kubectl create secret generic my-secret --from-literal=key1=supersecret
```

```
kubectl create configmap my-config-map --from-literal=key1=config1
```

## Kubernetes Secret Store (SAAS Version)

### Using the Codefresh UI

On the left-hand panel, navigate to **Account Settings** > **Integrations** > **Secret Store** and select **Configure**.

Click on **Add Provider** and select **Kubernetes secret store**.

For **Kubernetes** secret store, you will need to define out the following fields:

{% include 
image.html 
lightbox="true" 
file="/images/secrets-ui-view.png" 
url="/images/secrets-ui-view.png"
alt="Kubernetes Secret Store" 
caption="Kubernetes Secret Store" 
max-width="80%" 
%}

- Name: a unique name given to your context, which will be referenced in `codefresh.yaml` later.
- Cluster: the name of the cluster as it is configured in Codefresh
- Namespace: the namespace where the secret exists
- Resource name: the name of the secret

You can toggle between ConfigMap or Secret, and also toggle the accessibility for users on this account.

### Using the Codefresh CLI

To create a secret store context for **Kubernetes**, run: 

```
codefresh create context secret-store kubernetes "$NAME_IN_CODEFRESH" --cluster "$CLUSTER" --namespace "$NAMESPACE" --resource-type "$TYPE" --resource-name ”$NAME”
```

or, for our example:

```
codefresh create context secret-store kubernetes "test" --cluster "anna-demo@FirstKubernetes" --namespace "default" --resource-type secret --resource-name "my-secret"
```

Where:

- `$NAME_IN_CODEFRESH` is a unique name given to your context, which will be referenced in `codefresh.yaml` later.
- `$CLUSTER` is the name of the cluster as it is configured in Codefresh
- `$NAMESPACE` is the Kubernetes namespace 
- `$TYPE` is of either `secret` or `configmap`
  - if `secret`, data will be base64 decoded during resolution
  - if `configmap`, data will be replaced as is
- `$RESOURCE_NAME` is the name of the secret (optional)

## Runtime Secret Store (Hybrid Installation)

### Using the Codefresh UI

On the left-hand panel, navigate to **Account Settings** > **Integrations** > **Secret Store** and select **Configure**.

Click on **Add Provider** and select **Runtime secret store**.

For **Runtime** secret store, you need to define the following fields:

{% include 
image.html 
lightbox="true" 
file="/images/secrets-ui-view2.png" 
url="/images/secrets-ui-view2.png"
alt="Runtime Secret Store" 
caption="Runtime Secret Store" 
max-width="80%" 
%}

- Name: a unique name given to your context, which will be referenced in `codefresh.yaml` later.
- Resource name: the name of the secret
- Runtime environment: select from the dropdown any [runtime environments you have installed]({{site.baseurl}}/docs/enterprise/codefresh-runner/).

You can toggle between ConfigMap or Secret, and also toggle the accessibility for users on this account.

### Using the Codefresh CLI

To create a secret store context for **Runtime-Kubernetes** environments ([behind the firewall]({{site.baseurl}}/docs/enterprise/codefresh-runner/)), run:

```
codefresh create context secret-store kubernetes-runtime "$NAME_IN_CODEFRESH"  --runtime "$RUNTIME_NAME" --resource-type "$TYPE" --resource-name ”$NAME”
```

or, for our example:

```
codefresh create context secret-store kubernetes-runtime "test" --runtime "gke_firstkubernetes-176201_us-central1-a_anna-demo" --resource-type secret --resource-name "my-secret"
```

Where:

- `$NAME_IN_CODEFRESH` is a unique name given to your context, which will be referenced in `codefresh.yaml` later.
- `$CLUSTER` is the name of the cluster as it is configured in Codefresh
- `$NAMESPACE` is the Kubernetes namespace 
- `$TYPE` is of either `secret` or `configmap`
  - if `secret`, data will be base64 decoded during resolution
  - if `configmap`, data will be replaced as is
- `$RESOURCE_NAME` is the name of the secret (optional)
- `$RUNTIME_NAME` is the name of the run-time environment to be configured as secret store.  If not set, *any* runtime-environment will be considered.

## Usage

The syntax for using the secret is {% raw %}`${{secrets.NAME_IN_CODEFRESH.KEY}}`{% endraw %}.

> Note that if you did not include the resource-name as a part of your secret store context creation, the syntax for using your secret differs slightly:
The syntax is: {% raw %}${{secrets.NAME_IN_CODEFRESH.RESOURCE-NAME@KEY}}{% endraw %} The previous KEY portion is now made of two parts separated using @, where the left side is the name of the resource in the namespace, and the right side the key in that resource.

To use the secret in your pipeline, you have two options:

- Define it as a pipeline variable:

{% include 
image.html 
lightbox="true" 
file="/images/secrets-pipeline-var.png" 
url="/images/secrets-pipeline-var.png"
alt="Secrets Pipeline Variable" 
caption="Secrets stored in Pipeline Variable" 
max-width="80%" 
%}

`codefresh.yaml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  step:
    type: freestyle
    arguments:
      image: alpine
      commands:
        - echo $SECRET
{% endraw %}
{% endhighlight %}

- Or use it directly in your yaml

`codefresh.yaml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  step:
    type: freestyle
    arguments:
      image: alpine
      environment:
        - SECRET=${{secrets.test.key1}}
      commands:
        - echo $SECRET
{% endraw %}
{% endhighlight %}

## What to Read Next

* [Git triggers](git-triggers)
* [Running pipelines locally]({{site.baseurl}}/docs/configure-ci-cd-pipeline/running-pipelines-locally/)
* [Debugging Pipelines]({{site.baseurl}}/docs//yaml-examples/examples/trigger-a-k8s-deployment-from-docker-registry/)

