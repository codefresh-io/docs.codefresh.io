---
title: "Secrets"
description: "Learn how Codefresh stores secrets"
group: reference
redirect_from:
  - /csdp-docs/docs/reference/secrets/
toc: true
---


Codefresh provides out-of-the-box management for secrets, generally to store secrets for third-party integrations.  

For secure secret storage, every Codefresh runtime uses the [Bitnami Sealed Secrets controller](https://github.com/bitnami-labs/sealed-secrets){:target="_blank"} behind the scenes.
This controller is installed as part of the runtime and automatically managed by Codefresh.

## How Sealed Secrets work

Sealed Secrets are based on [public/private key encryption](https://en.wikipedia.org/wiki/Public-key_cryptography){:target="_blank"}. When the controller is installed, it gets a public and private key. The private key stays within the cluster. The public key can be given anywhere to encrypt secrets.  

Any kind of secret can be encrypted with the public key (also via the `kubeseal` executable), and then passed to the cluster for decryption when needed.  

For GitOps applications, encryption for secrets is critical, as it means that you can commit any kind of secret in Git as long as it is encrypted.  

Here's the event flow for Sealed Secrets:  

1. A secret is encrypted by an operator and/or developer with the `kubeseal` executable.
1. A custom Kubernetes resource called SealedSecret is created.
1. The secret is committed in Git.
1. During application deployment, the Codefresh runtime applies this secret to the cluster.
1. The Sealed Secret controller identifies the Sealed Secret object and decrypts it using the private key of the cluster.
1. The Sealed Secret is converted to a [standard Kubernetes secret](https://kubernetes.io/docs/concepts/configuration/secret/){:target="_blank"} inside the cluster.
1. It is then passed to the application like any other secret, as a mounted file or environment variable.
1. The application uses the secret in its decrypted form.

For more details, you can read our [blog post for sealed secrets](https://codefresh.io/blog/handle-secrets-like-pro-using-gitops/){:target="_blank"}.

## Configuring the Sealed Secrets controller

The Sealed Secret controller is fully managed by the Codefresh runtime, and secret encryption and decryption are fully automated.

> **Warning!** DO NOT tamper with the controller or its private/public keys in any way. 

The applications you deploy with Codefresh should also have no knowledge of the controller. All secrets that you need in your own applications should be accessed using the standard Kubernetes methods.

## Related articles 
[Set up a hosted (Hosted GitOps environment]({{site.baseurl}}/_docs/installation/gitops/hosted-runtime/)  
[Install hybrid runtimes]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/)  
[Image enrichment with integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview)  


