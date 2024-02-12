---
title: "Secrets for GitOps"
description: "Learn how Codefresh stores secrets for GitOps"
group: security
redirect_from:
  - /docs/reference/secrets/ 
toc: true
---

Codefresh provides out-of-the-box management for secrets, generally to store secrets for third-party integrations.  


For secure secret storage, every Codefresh GitOps Runtime uses the [Bitnami Sealed Secrets Controller](https://github.com/bitnami-labs/sealed-secrets){:target="_blank"} behind the scenes.
This Controller is installed as part of the Runtime and automatically managed by Codefresh.


## How Sealed Secrets work

Sealed Secrets operate using [public/private key encryption](https://en.wikipedia.org/wiki/Public-key_cryptography){:target="_blank"}.  
The Controller manages a public and a private key. The private key stays within the cluster. The public key can be distributed anywhere to encrypt secrets.  

Any kind of secret encrypted with the public key (or via the `kubeseal` executable), can be passed to the cluster for decryption when needed.

Codefresh employs a mechanism to consistently apply Sealed Secrets across multiple clusters in the same account, in complete alignment with the GitOps paradigm. 
It also facilitates sharing the public and private keys between the Codefresh platform and the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/runtime-architecture/gitops/shared-configuration/) 
in the user's GitOps Runtime environment.

##### Sealed Secrets mechanism in Codefresh   
1. The Sealed Secrets Controller generates both the public and private keys.
1. Codefresh creates a `ConfigMap` resource representing these keys, and enables their sharing across clusters.  
  The `ConfigMap` contains the public key of the `SealedSecret`.
1. The `ConfigMap` resource is committed to Git. When the `ConfigMap` is synced to the cluster from the Shared Configuration Repo by its Argo CD application, 
the App-proxy reconciles the `ConfigMap`, transforming it into a sealing key secret. 
1. When requested by an application:
  * The Sealed Secret Controller identifies and decrypts the Sealed Secret object using the private key specific to the cluster.
  * Transforms the decrypted Sealed Secret into a [standard Kubernetes secret](https://kubernetes.io/docs/concepts/configuration/secret/){:target="_blank"} within the cluster.
1. The application receives the decrypted secret just as any other secret, either as a mounted file or environment variable, and uses the secret in its decrypted form.

For more details, you can read our [blog post for sealed secrets](https://codefresh.io/blog/handle-secrets-like-pro-using-gitops/){:target="_blank"}.

## Configuring the Sealed Secrets Controller

The Sealed Secrets Controller is fully managed by the Codefresh GitOps Runtime, and encryption and decryption of secrets are fully automated.

{{site.data.callout.callout_warning}}
**WARNING**  
DO NOT tamper with the Controller or its private/public keys in any way. 
{{site.data.callout.end}}

The applications you deploy with Codefresh should also have no knowledge of the Controller. All secrets that you need in your own applications should be accessed using the standard Kubernetes methods.

## Related articles 
[Verifying authenticity of Codefresh artifacts]({{site.baseurl}}/docs/security/codefresh-signed-artifacts/)  
[Git tokens for GitOps]({{site.baseurl}}/docs/security/git-tokens/)  
[Set up a Hosted GitOps environment]({{site.baseurl}}/docs/installation/runtime-architecture/gitops/hosted-runtime/)  
[Install Hybrid GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/)  







