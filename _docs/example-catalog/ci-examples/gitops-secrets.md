---
title: "Secrets with GitOps"
description: "Store secrets in Git with Bitnami sealed secrets"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/yaml-examples/examples/gitops-secrets/
toc: true
---

## Prerequisites

- A [Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/)
- A Kubernetes cluster
- The [Codefresh GitOps agent]({{site.baseurl}}/docs/integrations/argocd/) installed on the cluster

## Using the Bitnami Sealed secrets controller

If you follow [GitOps](https://codefresh.io/gitops/){:target="\_blank"}, then you should already know that everything should be placed under source control, and Git is to be used as the single source of truth.

This presents a challenge with secrets that are needed by the application, as they must never be stored in Git in clear text under any circumstance.

To solve this issue, we can use the [Bitnami Sealed secrets controller](https://github.com/bitnami-labs/sealed-secrets){:target="\_blank"}. This is a Kubernetes controller that can be used to encrypt/decrypt your application secrets in a secure way.

The order of events is the following:

1. You install the Bitnami Sealed secrets controller in the cluster. It generates a public and private key. The private key stays in the cluster and is never revealed.
1. You take a raw secret and use the `kubeseal` utility to encrypt it. Encryption happens with the public key of the cluster that you can give to anybody.
1. The encrypted secrets are stored in Git. There are safe to be committed and nobody can decrypt them without direct access to the cluster
1. During runtime you deploy the sealed secret like any other Kubernetes manifest. The controller converts them to [plain Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/){:target="\_blank"} on the fly using the private key of the cluster
1. Your application reads the secrets like any other Kubernetes secret. Your application doesn't need to know anything about the sealed secrets controller or how the encryption decryption works.


To use the controller first install it in your cluster:

```
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm repo update
helm install sealed-secrets-controller sealed-secrets/sealed-secrets
```

By default, the controller is installed at the `kube-system` namespace. The namespace
and release names are important, since if you change the defaults, you need to set them up
with `kubeseal` as well, as you work with secrets.

Download the `kubeseal` CLI:
```
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.16.0/kubeseal-linux-amd64 -O kubeseal
sudo install -m 755 kubeseal /usr/local/bin/kubeseal
```

## Example application

You can find the example project at [https://github.com/codefresh-contrib/gitops-secrets-sample-app](https://github.com/codefresh-contrib/gitops-secrets-sample-app){:target="\_blank"}.

It is a web application that prints out several secrets which are [read from the filesystem](https://github.com/codefresh-contrib/gitops-secrets-sample-app/blob/main/settings.ini){:target="\_blank"}:

`settings.ini`
```ini
[security]
# Path to key pair
private_key = /secrets/sign/key.private
public_key= /secrets/sign/key.pub

[paypal]
paypal_url = https://development.paypal.example.com
paypal_cert=/secrets/ssl/paypal.crt

[mysql]
db_con= /secrets/mysql/connection
db_user = /secrets/mysql/username
db_password = /secrets/mysql/password
```

The application itself knows nothing about Kubernetes secrets, mounted volumes or any other cluster resource. It only reads its own filesystem at `/secrets`

This folder is populated inside the pod with [secret mounting](https://github.com/codefresh-contrib/gitops-secrets-sample-app/blob/main/safe-to-commit/manifests/deployment.yml){:target="\_blank"}:

```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gitops-secrets-deploy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gitops-secrets-app
  template:
    metadata:
      labels:
        app: gitops-secrets-app
    spec:
      containers:
      - name: gitops-secrets-app
        image: docker.io/kostiscodefresh/gitops-secrets-sample-app:latest 
        imagePullPolicy: Always   
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: mysql
          mountPath: "/secrets/mysql"
          readOnly: true     
        - name: paypal
          mountPath: "/secrets/ssl"
          readOnly: true              
        - name: sign-keys
          mountPath: "/secrets/sign/"
          readOnly: true   
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
      volumes:
      - name: mysql
        secret:
          secretName: mysql-credentials
      - name: paypal
        secret:
          secretName: paypal-cert         
      - name: sign-keys
        projected:
          sources:
            - secret:
               name: key-private 
            - secret:
               name: key-public    
           
```

This way there is a clear separation of concerns.



You can find the secrets themselves at [https://github.com/codefresh-contrib/gitops-secrets-sample-app/tree/main/never-commit-to-git/unsealed_secrets](https://github.com/codefresh-contrib/gitops-secrets-sample-app/tree/main/never-commit-to-git/unsealed_secrets){:target="\_blank"}. There are encoded with base64 so they are **NOT** safe to commit in Git.

>Note that for demonstration purposes, the Git repository contains raw secrets so that you can encrypt them yourself. In a production application, the Git repository must only contain sealed/encrypted secrets.

## Preparing the secrets

The critical point of this application is to encrypt all the secrets and place them in Git.
By default, the sealed secrets controller encrypts a secret according to a specific namespace (this behavior is configurable), so you need to decide in advance which namespace wil host the application.

Then encrypt all secrets as below:

```
kubectl create ns git-secrets
cd safe-to-commit/sealed_secrets
kubeseal -n git-secrets < ../../never-commit-to-git/unsealed_secrets/db-creds.yml > db-creds.json
kubeseal -n git-secrets < ../../never-commit-to-git/unsealed_secrets/key-private.yml > key-private.json
kubeseal -n git-secrets  < ../../never-commit-to-git/unsealed_secrets/key-public.yml > key-public.json
kubeseal -n git-secrets < ../../never-commit-to-git/unsealed_secrets/paypal-cert.yml > paypal-cert.json
kubectl apply -f . -n git-secrets

```

You now have encrypted your plain secrets. These files are safe to commit to Git.
You can see that they have been converted automatically to plain secrets with the command:

```
kubectl get secrets -n git-secrets
```

## Manually deploying the application

Note that the application requires all secrets to be present:

```
cd safe-to-commit/manifests
kubectl apply -f . -n git-secrets
```

You can now visit the application url to see how it has access to all the secrets.


## Deploying the application with Codefresh GitOps

Of course the big advantage of having everything committed into Git, is the ability to adopt GitOps
for the whole application (including secrets).

This means that you can simply [point Codefresh GitOps to your repository]({{site.baseurl}}/docs/integrations/argocd/#creating-argocd-applications) and have the application
automatically deploy in the cluster.

{% include image.html 
lightbox="true" 
file="/images/examples/sealed-secrets/add-app.png" 
url="/images/examples/sealed-secrets/add-app.png"
alt="Creating a GitOps application"
caption="Creating a GitOps application"
max-width="50%"
%}

You can then see the application in the GitOps dashboard:

{% include image.html 
lightbox="true" 
file="/images/examples/sealed-secrets/current-state.png" 
url="/images/examples/sealed-secrets/current-state.png"
alt="GitOps dashboard"
caption="GitOps dashboard"
max-width="90%"
%}

If you visit its URL you will see the secrets being loaded:

{% include image.html 
lightbox="true" 
file="/images/examples/sealed-secrets/app-secrets.png" 
url="/images/examples/sealed-secrets/app-secrets.png"
alt="Application using secrets"
caption="Application using secrets"
max-width="90%"
%}


>Note that for simplicity reasons the same Git repository holds both the application source code and its
manifests. In an actual application, you should have two Git repositories (one of the source code only and one of the manifests).


## Related articles
[CI pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Codefresh GitOps]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)  
[Using secrets]({{site.baseurl}}/docs/pipelines/configuration/secrets-store/)  
[Secrets with Mozilla Sops]({{site.baseurl}}/docs/example-catalog/ci-examples/decryption-with-mozilla-sops/)  
[Vault Secrets in the Pipeline]({{site.baseurl}}/docs/example-catalog/ci-examples/vault-secrets-in-the-pipeline/)  

