---
layout: docs
title: "Google Container Engine (GKE) - Kubernetes"
description: ""
group: deploy-your-containers
redirect_from:
  - /docs/google-container-engine-gke-kubernetes
toc: true
old_url: /docs/google-container-engine-gke-kubernetes
was_hidden: true
---
Google Container Engine is a powerful cluster manager and orchestration system for running your Docker containers built on Kubernetes. Deploying to GKE will follow the standard Kubernetes steps outlined below.
 
## Deploy to Kubernetes on Google Container Engine (GKE)
The deployment script makes the following assumptions about your application and Kubernetes configuration:

- The application is deployed using the Kubernetes deployment API (versus the the replication controller directly). For more information read http://kubernetes.io/docs/user-guide/deployments/
- The tested codebase has a yaml file that describes the Kubernetes deployment parameters and configuration of your application.
- At the moment, only the basic username/pass authentication is supported.

{{site.data.callout.callout_info}}
##### Try this example

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-deploy-kubernetes){:target="_blank"} in Github.
{{site.data.callout.end}}

{{site.data.callout.callout_info}}
Edit `codefresh.yml` and `deployment.yml.tmpl` files. Change `$docker-image` with the name of the docker image you would like to create.
{{site.data.callout.end}}

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'

steps:
  build:
    type: build
    working-directory: ${{initial-clone}}
    image-name: ncodefresh/cf-kubernetes-test
    tag: '${{CF_REVISION}}'

  push:
    type: push
    candidate: ${{build}}
    tag: ${{CF_BRANCH}}

  deploy-to-kubernetes-staging:
    image: codefreshio/kubernetes-deployer:master
    tag: latest
    working-directory: ${{initial-clone}}
    commands:
      - /deploy/bin/deploy.sh ./root
    environment:
      - ENVIRONMENT=${{ENVIRONMENT}}
      - KUBERNETES_USER=${{KUBERNETES_USER}}
      - KUBERNETES_PASSWORD=${{KUBERNETES_PASSWORD}}
      - KUBERNETES_SERVER=${{KUBERNETES_SERVER}}
      - DOCKER_IMAGE_TAG=${{CF_REVISION}}
{% endraw %}
{% endhighlight %}

  `deployment.yml.tmpl`
{% highlight yaml %}
{% raw %}
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: alpine-nginx
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: alpine-nginx
    spec:
      containers:
        - name: alpine-nginx
          image: $docker-image:$DOCKER_IMAGE_TAG
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
| `ENVIRONMENT`              | The name of the file with environment variables. Note, this file should be located in the folder 'environments' that is located by the same path like deployment.yml.tmpl. For this example use filename 'staging'.  |

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
file="/images/670df2f-codefresh_deploy_to_kubernetes.png" 
url="/images/670df2f-codefresh_deploy_to_kubernetes.png"
alt="codefresh_deploy_to_kubernetes"
max-width="40%" 
%}
