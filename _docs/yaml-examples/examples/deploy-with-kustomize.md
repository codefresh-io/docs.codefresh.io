---
title: "Deploy to Kubernetes with Kustomize"
description: "Deploy your services to Kubernetes using Kustomize"
group: yaml-examples
sub_group: examples
toc: true
---

[Kustomize](https://kustomize.io) is a tool included with kubectl 1.14 that "lets you customize raw, template-free YAML files for multiple purposes, leaving the original YAML untouched and usable as is."

Kustomize is more of an overlay engine, as opposed to a templating engine.  You create a base configuration and overlays.  Your overlays contain a *kustomization.yaml* file, and any variants/changes are applied over top of the base configuration.  Kustomize does not use templates at all.  

While it is good for simple scenarios, we suggest that you use Helm for managing your Kubernetes applications.  Helm is a full package manager for Kubernetes manifests that also provides templating capabilities.  See [this example]({{site.baseurl}}/docs/yaml-examples/examples/helm/) for more information.

## The Example Application

You can find the example project on [GitHub](https://github.com/codefresh-contrib/kustomize-sample-app).

The sample application is a simple Spring Boot web app, that displays an environment variable, `MY_MYSQL_DB` on the page:

```java
public class HelloController {

	String my_sql_db = System.getenv("MY_MYSQL_DB");

	@RequestMapping("/")
	public String index() {
		return my_sql_db;
	}
```

The project contains a [base](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/glossary.md#base) and two [overlays](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/glossary.md#overlay), one for a staging environment and one for production.

The base manifest holds a dummy variable for `MY_MYSQL_DB` which will be overlayed once we call the kustomize command in our pipeline.

`base/deployment.yaml`
```yaml
...
        env:
        - name: MY_MYSQL_DB
          valueFrom:
            configMapKeyRef:
              name: the-map
              key: mysqlDB
```

We will overlay on top of the manifests a different value for `MY_MYSQL_DB` for the staging environment and production environment.  

`overlays/staging/config-map.yaml`
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: the-map
data:
  mysqlDB: "staging-mysql.example.com:3306"
```

`overlays/production/config-map.yaml`
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: the-map
data:
  mysqlDB: "prod-mysql.example.com:3306"
```

In addition, for the production environment, the number of replicas will be overlayed to 3 instead of 1 (as [defined in the base deployment](https://github.com/codefresh-contrib/kustomize-sample-app/blob/32e683f82940de0bf2de2da40fa6b150e2b24b23/base/deployment.yaml#L8)).

`overlays/production/deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: the-deployment
spec:
  replicas: 3
```

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A Kubernetes cluster [connected to your Codefresh account](https://codefresh.io/docs/docs/deploy-to-kubernetes/add-kubernetes-cluster/)

## Create the Staging Environment Pipeline 

This pipeline will have two stages: clone and deploy.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-kustomize-staging-pipeline.png" 
url="/images/examples/deployments/k8s-kustomize-staging-pipeline.png" 
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line pipeline editor of the Codefresh UI. However, make sure to replace the context with your own that you integrated with Codefresh. It will automatically clone the project for you and deploy.

`staging-codefresh.yml`
{% highlight yaml %}
{% raw %}
# More examples of Codefresh YAML can be found at
# https://codefresh.io/docs/docs/yaml-examples/examples/

version: "1.0"
# Stages can help you organize your steps in stages

stages:
  - clone
  - deploy

steps:
  clone:
    title: Cloning main repository...
    type: git-clone
    stage: clone
    arguments:
      repo: https://github.com/codefresh-contrib/kustomize-sample-app.git
      git: github
      revision: master

  deploy:
    title: Deploying to Staging using Kustomize...
    type: freestyle
    stage: deploy
    working_directory: ${{clone}}
    arguments:
      image: codefresh/kubectl:1.14.9
      commands:
        - kubectl config use-context anna-sandbox@codefresh-support
        - kubectl apply -k overlays/staging
{% endraw %}
{% endhighlight %}

The above pipeline does the following:

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that:
  - Uses kubectl to connect to our Kubernetes cluster we have integrated with Codefresh
  - Using Kustomize (the -k flag), deploys the application as a staging environment with the appropriate value for `MY_MYSQL_DB` as defined in our configMap

>Note that if you are using kubectl prior to 1.14, you can use the following command to deploy with Kustomize: 
>`kustomize build overlays/production | kubectl apply -f`

## Create the Production Environment Pipeline 

Likewise, this pipeline will have two stages: clone and deploy.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-kustomize-prod-pipeline.png" 
url="/images/examples/deployments/k8s-kustomize-prod-pipeline.png" 
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line editor of the Codefresh UI and remember to replace the context again with your own. Click Save and Run and it will automatically clone the project for you.

`prod-codefresh.yml`
{% highlight yaml %}
{% raw %}
# More examples of Codefresh YAML can be found at
# https://codefresh.io/docs/docs/yaml-examples/examples/

version: "1.0"
# Stages can help you organize your steps in stages

stages:
  - clone
  - deploy

steps:
  clone:
    title: Cloning main repository...
    type: git-clone
    stage: clone
    arguments:
      repo: https://github.com/codefresh-contrib/kustomize-sample-app.git
      git: github
      revision: master

  deploy:
    title: Deploying to Production using Kustomize...
    type: freestyle
    stage: deploy
    working_directory: ${{clone}}
    arguments:
      image: codefresh/kubectl:1.14.9
      commands:
        - kubectl config use-context anna-sandbox@codefresh-support
        - kubectl apply -k overlays/production
{% endraw %}
{% endhighlight %}

The above pipeline does the following:

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that:
  - Uses kubectl to connect to our Kubernetes cluster we have integrated with Codefresh
  - Using Kustomize (the -k flag), deploys the application as a production environment with the appropriate value for `MY_MYSQL_DB` as defined in our configMap

>Note that if you are using kubectl prior to 1.14, you can use the following command to deploy with Kustomize: 
>`kustomize build overlays/production | kubectl apply -f`

## Verification

After you run these pipelines, your deployments will be visible from the [Kubernetes dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#accessing-the-kubernetes-dashboard).

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-kustomize-dashboard.png" 
url="/images/examples/deployments/k8s-kustomize-dashboard.png" 
alt="Codefresh Kubernetes Deployments"
caption="Codefresh Kubernetes Deployments"
max-width="100%" 
%}

You can test that the application deployed correctly to both environments by accessing the endpoints:

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-kustomize-staging-endpoint.png" 
url="/images/examples/deployments/k8s-kustomize-staging-endpoint.png" 
alt="Staging endpoint"
caption="Staging endpoint"
max-width="100%" 
%}

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-kustomize-prod-endpoint.png" 
url="/images/examples/deployments/k8s-kustomize-prod-endpoint.png" 
alt="Production endpoint"
caption="Production endpoint"
max-width="100%" 
%}


## What to Read Next

- [Git-clone Step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
- [Deployment options to Kubernetes]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes)
- [Running custom kubectl commands]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/)
- [Deploy with Helm]({{site.baseurl}}/docs/yaml-examples/examples/helm/)
