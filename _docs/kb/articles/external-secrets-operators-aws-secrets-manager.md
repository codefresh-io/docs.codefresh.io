---
title: "How To: External Secrets Operator with AWS Secrets Manager"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: true
categories: [Ops, Runtimes]
support-reviewed: 2024-01-07 LG
---

## Overview

This article explains how to install and use the [External Secrets Operator](https://external-secrets.io/latest/) with [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/).

### Pre-Reqs

- GitOps Runtime Installed
- A Git Source is added to the Runtime
  - Usage in this doc has it pointing to the path of `gitops/argocd`
- AWS Account

## Details

### Installation

First, you need to install the External Secrets Operator. To do that, we are going to add an Application to your Git Source. Create a file in your Git Source called `external-secrets-operator.yaml` and use the below application to install. Once done, save, commit, and push to your repo.

{% raw %}

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: external-secrets-operator
  finalizers:
    - resources-finalizer.argocd.argoproj.io/foreground
spec:
  project: default
  source:
    repoURL: https://charts.external-secrets.io
    targetRevision: 0.9.11 # make sure to change this to the version you need
    chart: external-secrets
  destination:
    name: in-cluster
    namespace: external-secrets # you can use any namespace
  syncPolicy:
    automated:
      prune: false
      selfHeal: false
      allowEmpty: false
    syncOptions:
      - PrunePropagationPolicy=foreground
      - Replace=false
      - PruneLast=false
      - Validate=true
      - CreateNamespace=true
      - ApplyOutOfSyncOnly=false
      - ServerSideApply=true
      - RespectIgnoreDifferences=false
```

{% endraw %}

You should now see this application when viewing the [application dashboard](https://g.codefresh.io/2.0/applications-dashboard/list).

### Usage

#### AWS Set Up

Now that we have the External Secrets Operator Installed, we can set up the Secret Store. First, we need to create an IAM Role for Service Accounts (IRSA) that is going to be used to access the secrets. You will need to create a role based on the [EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html). Below are the minimum permissions needed to access the secrets that start with `testing/`. You can edit the Resource section that suits your needs.

{% raw %}

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetResourcePolicy",
                "secretsmanager:GetSecretValue",
                "secretsmanager:DescribeSecret",
                "secretsmanager:ListSecretVersionIds"
            ],
            "Resource": [
                "arn:aws:secretsmanager:us-east-1:<ACCOUNT_ID>>:secret:testing/*"
            ]
        }
    ]
}
```

{% endraw %}

Once the IRSA is created, create a secret in AWS Secrets Manager (region us-east-1 in this example). Use the "Other type of Secret" when creating the secret. Add the key-value pairs that you want. When naming, use the prefix of `testing/` for this example. The rest of the options, use the defaults.

#### Adding Secrets to Git Source

Now that we have everything set up on AWS, time to create a Service Account, Secret Store, and External Secret. First, create a Directory in your Git Source Repo that's outside of the path for the Git Source. In this example, my Git Source path is `gitops/argocd` but my files will be located in `gitops/test-applications`.

{% raw %}

```shell
├── gitops
│   ├── argocd
│   │   └── external-secrets-operator.yaml
│   ├── test-applications
```

{% endraw %}

Inside test-applications directory create a file called `secret-store.yaml`.  Here we will create a Service Account and Secret Store config.  The SecretStore will allow us to access AWS Secrets Manager and use the Service Account to make the API Calls to AWS.

{% raw %}

```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: secretstore-sample # the name you want to call the Secret Store
spec:
  provider:
    aws:
      service: SecretsManager # Specifing AWS Scret Manager
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: aws-secret-store # use an SA with IRSA to gain access to the Secrets.
---
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME> # The Role that you created to have access to Secrets Manager 
  name: aws-secret-store
```

{% endraw %}

Now create another file called `external-secret.yaml` in the testing-applications directory.  This is where we are going to use to generate a kubernets secret.  We will define a refresh interval so the screte is up to date in the cluster, how to access the secret via the Secret Store, the name of the scret in AWS Secret Manager, and what to name the k8s secret kind once retrieved.

{% raw %}

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: example-secret
spec:
  refreshInterval: 1h # allows us to update secret if values change
  secretStoreRef:
    kind: SecretStore
    name: secretstore-sample # name of the secret store so we can access AWS Secret Manager
  target:
    name: my-secret  # name of the k8s Secret to be created. aka kind: Secert
    creationPolicy: Owner
  dataFrom:
  - extract:
      key: testing/my-secret  # name of the secret from AWS Secret Manager
      conversionStrategy: Default
      decodingStrategy: None
      metadataPolicy: None
```

{% endraw %}

#### Adding Application for Example

Now we have the information, we are going to add another application under `gitops/argocd` to simulate an application that needs a secret.  Create a file called `test-application.yaml` with the following values.

{% raw %}

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: test-application
  finalizers:
    - resources-finalizer.argocd.argoproj.io/foreground
  annotations:
    codefresh.io/app-group: example
spec:
  project: default
  source:
    path: gitops/test-applications
    repoURL: https://github.com/OWNER/REPO.git # replace with your repo URL
    targetRevision: main
  destination:
    name: in-cluster
    namespace: testing
  syncPolicy:
    automated:
      prune: false
      selfHeal: false
      allowEmpty: false
    syncOptions:
      - PrunePropagationPolicy=foreground
      - Replace=false
      - PruneLast=false
      - Validate=true
      - CreateNamespace=true
      - ApplyOutOfSyncOnly=false
      - ServerSideApply=true
      - RespectIgnoreDifferences=false
```

{% endraw %}

This application is going to be deployed in the `testing` namespace. All the items before are name-spaced specific and can be reused in different namespaces. Now save, commit, and push these items to your git repo.

#### Verification

Now you should see the Application in your dashboard. You should see a k8s secret that has all the key-value pairs that you created in AWS Secrets Manager. You can run the following command to verify it's there.

{% raw %}

```shell
kubectl get secrets -n testing my-secret -o yaml
```

{% endraw %}

You should see something similar below for your secret.

{% raw %}

```yaml
apiVersion: v1
data:
  domain: EXAMPLEguaW8=
  email: EXAMPLEguaW8=
  token: EXAMPLEguaW8=
immutable: false
kind: Secret
metadata:
  annotations:
    argocd.argoproj.io/tracking-id: test-application:external-secrets.io/ExternalSecret:testing/example-secret
    reconcile.external-secrets.io/data-hash: 77cc2a82549cebdce8da1382d888f919
  creationTimestamp: "2024-02-07T19:36:49Z"
  labels:
    app.kubernetes.io/instance: test-application
    reconcile.external-secrets.io/created-by: 1cef718909ba30c1b96f7026c513b567
  name: my-secret
  namespace: testing
  ownerReferences:
  - apiVersion: external-secrets.io/v1beta1
    blockOwnerDeletion: true
    controller: true
    kind: ExternalSecret
    name: example-secret
    uid: dfb6d035-2e76-419b-b287-b2e98d6cb8af
  resourceVersion: "47288"
  uid: 99ef0789-4d70-486f-b846-9c9ef685612c
type: Opaque
```

{% endraw %}

## Related Items

- [Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)
- [Create Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source)
