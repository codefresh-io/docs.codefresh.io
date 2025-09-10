---
title: "Install GitOps Runtime in a Kubernetes namespace scope"
description: "Provision GitOps Runtimes with a new Argo CD installation in a dedicated Kubernetes namespace scope"
toc: true
---

# Install a GitOps Runtime in a Namespace

This guide explains how to install a Codefresh GitOps Runtime in **namespace scope** rather than cluster scope.  
This setup allows you to run multiple isolated runtimes in the same Kubernetes cluster, enabling team-level isolation while preventing cross-contamination of data, UI, and metrics.

---

## Prerequisites

- A Kubernetes cluster with access via `kubectl` and `helm`.
- Cluster administrator permissions (needed for the first runtime installation).
- Codefresh account with GitOps enabled.
- Runtime Helm chart version **0.24.0 or later** (multi-namespace supported).
- Unique values for each runtime:
  - `RELEASE_NAME`
  - `RUNTIME_NAME`
  - `NAMESPACE`
  - `INGRESS_HOST`

---

## Key Differences from Standard Install

- Each runtime runs in a **dedicated namespace**.
- Each runtime deploys its **own Argo CD instance**.
- Sealed Secrets are **not supported** in multi-runtime setups.
- Restricted Git Sources and some integrations (e.g., Jira, Docker registry) are not supported.
- The first runtime installed must also install CRDs and be marked as the **configuration runtime**. Additional runtimes skip CRD installation.

---

## Step 1. Prepare Value Files

You will need three values files:

### `multi-values.yaml`

This file configures namespace isolation and disables cluster-wide controllers:

```yaml
global:
  runtime:
    singleNamespace: true

argo-cd:
  createClusterRoles: false
  crds:
    install: false
  configs:
    params:
      application.namespaces: ""

argo-events:
  controller:
    rbac:
      namespaced: true

argo-workflows:
  crds:
    install: false
  singleNamespace: true
  createAggregateRoles: false
  controller:
    clusterWorkflowTemplates:
      enabled: false
  server:
    clusterWorkflowTemplates:
      enabled: false

argo-rollouts:
  enabled: false

sealed-secrets:
  enabled: false

tunnel-client:
  enabled: false

gitops-operator:
  crds:
    install: false
```

### `first-values.yaml`

Use this only for the **first runtime** in the cluster.  
It ensures CRDs are installed and marks the runtime as the configuration runtime.

```yaml
argo-cd:
  crds:
    install: true

argo-workflows:
  crds:
    install: true

argo-rollouts:
  installCRDs: true

gitops-operator:
  crds:
    install: true
```

### `values.yaml`

Your standard runtime values, including authentication (`userToken`) and ingress configuration.  
Example snippet:

```yaml
global:
  app-proxy:
    config:
      cors: "https://your-codefresh-url"
```

---

## Step 2. Export Environment Variables

Each runtime must use unique values:

{% highlight bash %}
export RELEASE_NAME=<RELEASE_NAME>
export RUNTIME_NAME=<RUNTIME_NAME>
export NAMESPACE=<RUNTIME_NAMESPACE>
export INGRESS_HOST=<INGRESS_HOST>
export CONTEXT=<KUBE_CONTEXT>
{% endhighlight %}

---

## Step 3. Install the Runtime

For the **first runtime** (with CRDs):

{% highlight bash %}
helm upgrade ${RELEASE_NAME}   --install   --namespace ${NAMESPACE}   --create-namespace   --kube-context ${CONTEXT}   --set global.runtime.name=${RUNTIME_NAME}   --set "global.runtime.ingress.hosts[0]=${INGRESS_HOST}"   -f values.yaml   -f multi-values.yaml   -f first-values.yaml   oci://quay.io/codefresh/gitops-runtime:0.24.0
{% endhighlight %}

For **additional runtimes** (skip CRDs):

{% highlight bash %}
helm upgrade ${RELEASE_NAME}   --install   --namespace ${NAMESPACE}   --create-namespace   --kube-context ${CONTEXT}   --set global.runtime.name=${RUNTIME_NAME}   --set "global.runtime.ingress.hosts[0]=${INGRESS_HOST}"   -f values.yaml   -f multi-values.yaml   oci://quay.io/codefresh/gitops-runtime:0.24.0
{% endhighlight %}

---

## Step 4. Verify Installation

1. Check that a new Argo CD instance is running in the target namespace:

   {% highlight bash %}
   kubectl get pods -n ${NAMESPACE}
   {% endhighlight %}

2. Confirm the runtime appears in the Codefresh UI.

3. Validate applications and clusters are isolated to the runtime namespace.

---

## Limitations

- **Secrets Management**: Sealed Secrets are not supported. Secrets cannot be managed via the UI in multi-runtime setups.
- **Restricted Git Source**: Disabled in cluster and UI. Attempting to configure RGS will not work.
- **Integrations**: Certain integrations (e.g., Jira, Docker registry) are not available.
- **Shared Components**: CRDs are cluster-wide; only the first runtime should install them.

---

## Next Steps

- [Manage GitOps Applications](../applications/overview.md)
- [Upgrade or Delete a Runtime](../runtime/runtime-upgrade-delete.md)
