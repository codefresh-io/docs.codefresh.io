---
title: "Secrets Storage"
description: "Keep sensitive data on your favorite secret store provider"
group: configure-ci-cd-pipeline
toc: true
---

Codefresh has added the additional ability to resolve variables storing secrets from remote sources.

It allows the user to keep sensitive data on his/her favorite secret-store provider, and for Codefresh to request it during pipeline execution on user's demand.
Secret-Store is an additional context in Codefresh, which can be created, updated, deleted, etc, using Codefresh CLI: `codefresh create context secret-store --help`. 

At the moment, we only support two types: Kubernetes and Runtime-Kubernetes.

> Note: This functionality is currently only available through the Codefresh CLI.  UI coming soon.

## Prerequisites

- You need to have your Kubernetes cluster [connected to Codefresh]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/).

## Step 1: Create a Secret

- Create your secret in Kubernetes, i.e.

```
kubectl create secret generic my-secret --from-literal=key1=supersecret
```

```
kubectl create configmap my-config-map --from-literal=key1=config1
```

## Step 2: Create a Secret Store Context using the Codefresh CLI

To create a secret store context for **Kubernetes**, run: 

```
codefresh create context secret-store kubernetes "$NAME_IN_CODEFRESH" --cluster "$CLUSTER" --namespace "$NAMESPACE" --resource-type "$TYPE" --resource-name ”$NAME”
```

or, for our example:

```
codefresh create context secret-store kubernetes "test" --cluster "anna-demo@FirstKubernetes" --namespace "default" --resource-type secret --resource-name "my-secret"
```

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
- `$RESOURCE_NAME` is the name of the secret
- `$RUNTIME_NAME` is the name of the run-time environment to be configured as secret store.  If not set, any runtime-environment will be considered.

## Usage

The syntax for using the secret is {% raw %}`${{secrets.NAME_IN_CODEFRESH.KEY}}`{% endraw %}.

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

