---
title: "GitOps deployments"
description: "Learn how to deploy with Codefresh and ArgoCD"
group: ci-cd-guides
toc: true
---

Apart from traditional push-based Helm deployments, Codefresh can also be used for GitOps deployments. GitOps deployments are powered by [ArgoCD](https://argoproj.github.io/argo-cd/) so you need an active ArgoCD installation in your cluster to take advantage of the GitOps dashboard in Codefresh.

## Connecting ArgoCD and Codefresh

Follow the instructions for [connecting ArgoCD to Codefresh](({{site.baseurl}}/docs/docs/integrations/argo-cd/)) and creating a GitOps application

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/argocd-provision-app.png" 
  url="/images/integrations/argocd/argocd-provision-app.png" 
  alt="Creating a new ArgoCD application in a Codefresh environment"
  caption="Creating a new ArgoCD application in a Codefresh environment"  
  max-width="40%"
 %}

 Once you connect your application you will see it under in the [Environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/) in the Codefresh UI.

## Working with the GitOps dashboard


{% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/gitops-environment.png" 
  url="/images/guides/gitops/gitops-environment.png" 
  alt="ArgoCD environment status"
  caption="ArgoCD environment status"  
  max-width="80%"
 %}

{% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/out-of-sync.png" 
  url="/images/guides/gitops/out-of-sync.png" 
  alt="Out of sync status"
  caption="Out of sync status"  
  max-width="80%"
 %}

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/image-annotations.png" 
  url="/images/guides/gitops/image-annotations.png" 
  alt="Enriched Docker image"
  caption="Enriched Docker image"  
  max-width="80%"
 %}




## Creating a basic CI pipeline for GitOps

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/basic-ci-pipeline.png" 
  url="/images/guides/gitops/basic-ci-pipeline.png" 
  alt="Basic CI pipeline"
  caption="Basic CI pipeline"  
  max-width="80%"
 %}

## Creating a basic CD pipeline for GitOps

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/argo-sync-pipeline.png" 
  url="/images/guides/gitops/argo-sync-pipeline.png" 
  alt="Basic CD pipeline"
  caption="Basic CD pipeline"  
  max-width="80%"
 %}

## Rolling back Git versions

 {% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/rollback.png" 
  url="/images/guides/gitops/rollback.png" 
  alt="Rolling back to a previous version"
  caption="Rolling back to a previous version"  
  max-width="80%"
 %}

## Fully automated GitOps deployments





## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [ArgoCD integration]({{site.baseurl}}/docs/docs/integrations/argo-cd/)
* [Environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)
* [Helm promotions]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/)





