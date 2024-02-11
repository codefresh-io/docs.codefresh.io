---
title: "How To: External Secrets Operator with AWS Secrets Manager"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines, CLI]
support-reviewed: 2024-01-17 MB
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


You should now see this application when viewing the [application dashboard](https://g.codefresh.io/2.0/applications-dashboard/list).

### Usage

#### AWS Set Up

Now that we have the External Secrets Operator Installed, we can set up the Secret Store. First, we need to create an IAM Role for Service Accounts (IRSA) that is going to be used to access the secrets. You will need to create a role based on the [EKS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html). Below are the minimum permissions needed to access the secrets that start with `testing/`. You can edit the Resource section that suits your needs.

`JSON`
{% highlight json %}
{% raw %}
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
{% endraw %}
{% endhighlight %}


Once the IRSA is created, create a secret in AWS Secrets Manager (region us-east-1 in this example). Use the "Other type of Secret" when creating the secret. Add the key-value pairs that you want. When naming, use the prefix of `testing/` for this example. The rest of the options, use the defaults.

#### Adding Secrets to Git Source

Now that we have everything set up on AWS, time to create a Service Account, Secret Store, and External Secret. First, create a Directory in your Git Source Repo that's outside of the path for the Git Source. In this example, my Git Source path is `gitops/argocd` but my files will be located in `gitops/test-applications`.