---
layout: docs
title: "Google Container Engine (GKE) - Kubernetes"
description: ""
group: deploy-your-containers
redirect_from:
  - /docs/kubernetes
toc: true
old_url: /docs/kubernetes
was_hidden: true
---

Google Container Engine is a powerful cluster manager and orchestration system for running your Docker containers built on Kubernetes. Deploying to GKE will follow the standard Kubernetes steps outlined below.
 
## Getting Started

The first step will be to make sure that your Kubernetes master is up.
Login to https://console.cloud.google.com with your Google Credentials.

Enter to Containers Engine and make sure you have created GKE cluster.

Get your cluster username and password from `GKE` &#8594; `Container Cluster` &#8594; `<your cluster>` &#8594; `show credentials`

To be able to test your deployment on local environment configure gcloud and kubectl utilities
[https://cloud.google.com/sdk/downloads](https://cloud.google.com/sdk/downloads){:target="_blank"}
[https://kubernetes.io/docs/tasks/kubectl/install/](https://kubernetes.io/docs/tasks/kubectl/install/){:target="_blank"}

To connect to your cluster from your machine:

  `command`
{% highlight text %}
{% raw %}

gcloud container clusters get-credentials <clusre-name>   --zone <gce-zone> --project <project-name>

{% endraw %}
{% endhighlight %}

For example:

  `command`
{% highlight text %}
{% raw %}

gcloud container clusters get-credentials kube-demo-oleg --zone asia-east1-b --project kuberentes

{% endraw %}
{% endhighlight %}

Then create deployment.yml for your app [http://kubernetes.io/docs/user-guide/deployments](http://kubernetes.io/docs/user-guide/deployments){:target="_blank"} and test it by running:

  `command`
{% highlight text %}
{% raw %}

kubectl apply -f deployment.yml

{% endraw %}
{% endhighlight %}
 
## Deploy to GKE from Codefresh pipeline
The deployment script makes the following assumptions about your application and Kubernetes configuration:

- The application is deployed using the Kubernetes deployment API (versus the the replication controller directly). For more information read [http://kubernetes.io/docs/user-guide/deployments/](http://kubernetes.io/docs/user-guide/deployments/){:target="_blank"}
- The tested codebase has a yaml file that describes the Kubernetes deployment parameters and configuration of your application.
- At the moment, only the basic username/pass authentication is supported.

{{site.data.callout.callout_info}}
##### Deploy to Kubernetes
[Source code](https://github.com/codefresh-io/cf-deploy-kubernetes){:target="_blank"}
{{site.data.callout.end}}

{{site.data.callout.callout_info}}
Edit `codefresh.yml` and `deployment.yml.tmpl` files.
{{site.data.callout.end}}

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'

steps:
  build:
    type: build
    dockerfile: Dockerfile
    image_name: myrepo/apisvc
    tag: '${{CF_BRANCH}}'
    
  push:
    type: push
    candidate: ${{build}}
    tag: ${{CF_BRANCH}}

  deploy-to-kubernetes:
    image: codefresh/cf-deploy-kubernetes:latest
    working-directory: ${{main_clone}}
    commands:
      - /cf-deploy-kubernetes deployment.yml.tmpl
    environment:
      - KUBERNETES_USER=${{KUBERNETES_USER}}
      - KUBERNETES_PASSWORD=${{KUBERNETES_PASSWORD}}
      - KUBERNETES_SERVER=${{KUBERNETES_SERVER}}
{% endraw %}
{% endhighlight %}

  `deployment.yml.tmpl`
{% highlight yaml %}
{% raw %}
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: api-svc
spec:
  replicas: 1
  template:
    metadata:
      annotations:
        revision: "{{CF_REVISION}}"
      labels:
        app: api-svc
    spec:
      containers:
        - name: apisvc
          image: myrepo/apisvc:{{CF_BRANCH}}
          ports:
            - containerPort: 80
              name: http
{% endraw %}
{% endhighlight %}

Set up the following environment variables to specify the Kubernetes cluster we'll use to deploy the project.

{: .table .table-bordered .table-hover}
| Variable                   | Description                                                              |
| -------------------------- | -------------------------------------------------------------------------|
| `KUBERNETES_USER`          | The user for the Kubernetes cluster. Mandatory.                          |
| `KUBERNETES_PASSWORD`      | The password for the Kubernetes cluster. Mandatory.                      |
| `KUBERNETES_SERVER`        | The server (HTTPS endpoint) of the Kubernetes cluster's API. Mandatory.  |

{:start="1"}
1. Run the build in Codefresh.io

{:start="2"}
2. Check that the deployment succeeded with kubectl:

  `command`
{% highlight text %}
{% raw %}

kubectl get pods -l app=alpine-nginx

{% endraw %}
{% endhighlight %}

{% include image.html 
lightbox="true" 
file="/images/6312f01-kube-deploy.png" 
url="/images/6312f01-kube-deploy.png"
alt="kube-deploy.png"
max-width="40%" 
%}
