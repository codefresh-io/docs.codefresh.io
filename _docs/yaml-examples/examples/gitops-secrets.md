---
title: "Using secrets with GitOps"
description: "Store secrets in Git with Bitnami sealed secrets"
group: yaml-examples
sub_group: examples
toc: true
---

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A Kubernetes cluster
- The [Codefresh GitOps agent]({{site.baseurl}}/docs/integrations/argo-cd/) installed on the cluster

## The Example  Application

You can find the example project at [https://github.com/codefresh-contrib/gitops-secrets-sample-app](https://github.com/codefresh-contrib/gitops-secrets-sample-app).

>Note that for demonstration reasons the Git repository contains raw secrets so that you can encrypt them yourself. In a production application the Git repository must only contain sealed/encrypter secrets


## Deploying the application with Codefresh GitOps

>Note that for simplicity reasons the same Git repository holds both the application source code and its
manifests. In a real application you should have two Git repositories (one of the source code only and one of the manifests).




## What to Read Next

- [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
- [Using secrets]({{site.baseurl}}/docs/configure-ci-cd-pipeline/secrets-store/)
- [Secrets with Mozilla Sops]({{site.baseurl}}/docs/yaml-examples/examples/decryption-with-mozilla-sops/)
- [Vault Secrets in the Pipeline]({{site.baseurl}}/docs/yaml-examples/examples/vault-secrets-in-the-pipeline/)

