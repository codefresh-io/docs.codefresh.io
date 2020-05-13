---
title: "Deploy to Kubernetes with Kustomize"
description: "Deploy your services to Kubernetes using Kustomize"
group: yaml-examples
sub_group: examples
toc: true
---

[Kustomize]((https://kustomize.io)) is a tool included with kubectl 1.14 that "lets you customize raw, template-free YAML files for multiple purposes, leaving the original YAML untouched and usable as is."

It is important to note that Kustomize differs from Helm, in that it is not a templating engine, but an overlay engine.  With Helm, you create a template file and the templating engine replaces all placeholders within that template with their actual values.  

Kustomize takes a different approach, so it is hard to compare the two.  Kustomize is more of an overlay engine, as opposed to a templating engine.  You create a base configuration and overlays.  Your overlays contain a *kustomization.yaml* file, and any variants/changes are applied over top of the base configuration.  Kustomize does not use templates at all.  If you wish to use a templating mechanism, the recommended course of action is still to use Helm.

## The Example Application

You can find the example project on [Github](https://github.com/codefresh-contrib/kustomize-sample-apps/tree/master/examples/helloWorld).

The repository contains a [base](https://github.com/codefresh-contrib/kustomize-sample-apps/blob/master/docs/glossary.md#base) and two [overlays](https://github.com/codefresh-contrib/kustomize-sample-apps/blob/master/docs/glossary.md#overlay), one for a staging environment and one for production.

The base service will display a ["Good Morning!"](https://github.com/codefresh-contrib/kustomize-sample-apps/blob/6dd378db22b0e8e671159fafbe8c12145512acf8/examples/helloWorld/base/configMap.yaml#L6) message.  We will overlay on top of the manifests a different greeting for the staging environment, ["Have a pineapple!"](https://github.com/codefresh-contrib/kustomize-sample-apps/blob/6dd378db22b0e8e671159fafbe8c12145512acf8/examples/helloWorld/overlays/staging/map.yaml#L6)

In addition, the staging environment will [enable a risky feature](https://github.com/codefresh-contrib/kustomize-sample-apps/blob/6dd378db22b0e8e671159fafbe8c12145512acf8/examples/helloWorld/overlays/staging/map.yaml#L7) that is not enabled in production.

Finally, the number of replicas in the production environment will be [scaled up to 10](https://github.com/codefresh-contrib/kustomize-sample-apps/blob/6dd378db22b0e8e671159fafbe8c12145512acf8/examples/helloWorld/overlays/production/deployment.yaml#L6). 

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A Kubernetes cluster [connected to your Codefresh account]({{site.baeurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)

### Create the Pipeline 

This pipeline will have two stages: clone and kustomize.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-kustomize-pipeline.png" 
url="/images/examples/deployments/k8s-kustomize-pipeline.png" 
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line editor of the Codefresh UI.  It will automatically clone the project for you.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
# More examples of Codefresh YAML can be found at
# https://codefresh.io/docs/docs/yaml-examples/examples/

version: "1.0"
# Stages can help you organize your steps in stages

stages:
  - clone
  - kustomize

steps:
  clone:
    title: Cloning main repository...
    type: git-clone
    stage: clone
    arguments:
      repo: codefresh-contrib/kustomize-sample-apps
      git: github
      revision: master

  kustomize:
    title: Kustomize
    type: freestyle
    stage: kustomize
    working_directory: ${{clone}}/examples/helloWorld
    arguments:
      image: codefresh/kubectl:1.14.9
      commands:
        - kubectl config use-context anna-sandbox@codefresh-support
        - 'sed -i.bak ''s/app: hello/app: my-hello/'' base/kustomization.yaml'
        - kubectl apply -k base
        - kubectl apply -k overlays/staging
        - kubectl apply -k overlays/production
{% endraw %}
{% endhighlight %}

The above pipeline does the following:

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that:
  - Uses kubectl to connect to our Kubernetes cluster we have integrated with Codefresh
  - Modifies the app label to my-hello in our base kustomization file
  - Deploys all 3 services to our Kubernetes cluster using kustomize (the -k flag)
  
After you run this pipeline, your deployments will be visible from the [Kuebrnetes dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#accessing-the-kubernetes-dashboard).

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-kustomize-dashboard.png" 
url="/images/examples/deployments/k8s-kustomize-dashboard.png" 
alt="Codefresh Kubernetes Deployments"
caption="Codefresh Kubernetes Deployments"
max-width="100%" 
%}

## What to Read Next

- [Git-clone Step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
- [Deployment options to Kubernetes]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes)
