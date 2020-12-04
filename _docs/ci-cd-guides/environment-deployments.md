---
title: "Production and Staging deployments"
description: "Learn how to deploy to different environments from Codefresh pipelines"
group: ci-cd-guides


toc: true
---

The Helm example app


{% include image.html 
lightbox="true" 
file="/images/guides/promotion/different-settings.png" 
url="/images/guides/promotion/different-settings.png" 
alt="Settings per environment" 
caption="Settings per environment"
max-width="50%" 
%}

cd /helm-promotion-sample-app/chart
helm install example-staging sample-app -n staging -f values-staging.yaml
helm install example-qa sample-app -n qa -f values-qa.yaml

helm install example-prod sample-app -n production -f values-prod.yaml

 kubectl create ns production

 kubectl create ns staging

kubectl create ns qa

kubectl get svc -A

helm uninstall example-staging  -n staging
helm uninstall example-prod  -n production
helm uninstall example-qa  -n qa



Basic pipeline with master and !not master

Environment dashboard

Basic pipeline with approval

Parallel deployment

Different pipelines

Helm promotion board manual

Helm promotion board automated




## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)





