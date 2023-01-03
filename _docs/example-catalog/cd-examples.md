---
title: "CD examples for pipelines"
description: "A collection of CD examples for Codefresh pipelines"
group: example-catalog
toc: true
---
Codefresh enables you to define the steps of your pipeline in a [YAML file]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/). By default, the file is named `codefresh.yml`, and is located in the root directory of the repository.

This article focusses on CD examples for Codefresh pipelines.



## Preview environment examples

Codefresh can automatically launch environments (powered by Docker swarm) to [preview a Pull Reqest or feature]({{site.baseurl}}/docs/getting-started/on-demand-environments/). The definition of the environment can come from an [existing composition]({{site.baseurl}}/docs/testing/create-composition/), a docker-compose file or an inline YAML. Preview environments can be launched manually or [automatically from pipelines]({{site.baseurl}}/docs/pipelines/steps/launch-composition/).

- [MongoDB preload data]({{site.baseurl}}/docs/example-catalog/cd-examples/import-data-to-mongodb/) 
- [NodeJS + Angular2 + MongoDB]({{site.baseurl}}/docs/example-catalog/cd-examples/nodejs-angular2-mongodb/) 
- [NGINX Basic Auth]({{site.baseurl}}/docs/example-catalog/cd-examples/secure-a-docker-container-using-http-basic-auth/)
- [Spring Boot + Kafka + Zookeeper]({{site.baseurl}}/docs/example-catalog/cd-examples/spring-boot-kafka-zookeeper/)
- [Web terminal]({{site.baseurl}}/docs/example-catalog/cd-examples/web-terminal/)

## Deployment examples

Codefresh can deploy to any platform such as VMs, FTP/SSH/S3 sites, app servers, but of course it has great support for [Kubernetes clusters]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) and [Helm releases]({{site.baseurl}}/docs/new-helm/helm-releases-management/):

- [Deploy to a VM with packer]({{site.baseurl}}/docs/example-catalog/cd-examples/packer-gcloud/) 
- [Deploy to a VM with FTP]({{site.baseurl}}/docs/example-catalog/cd-examples/transferring-php-ftp)
- [Deploy to Tomcat using SCP]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-to-tomcat-via-scp)
- [Deploy Demochat to a Kubernetes cluster]({{site.baseurl}}/docs/cd-examples/deploy-to-kubernetes/codefresh-kubernetes-integration-demochat-example/) 
- [Use kubectl as part of freestyle step]({{site.baseurl}}/docs/example-catalog/cd-examples/use-kubectl-as-part-of-freestyle-step) 
- [Deploy with Kustomize]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-with-kustomize)
- [Deploy with Helm]({{site.baseurl}}/docs/example-catalog/cd-examples/helm) 
- [Deploy with Terraform]({{site.baseurl}}/docs/example-catalog/cd-examples/terraform) 
- [Deploy with Pulumi]({{site.baseurl}}/docs/example-catalog/cd-examples/pulumi) 
- [Deploy to Nomad]({{site.baseurl}}/docs/example-catalog/cd-examples/nomad)
- [Deploy to Heroku]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-to-heroku/)
- [Deploy to Docker swarm]({{site.baseurl}}/docs/example-catalog/cd-examples/docker-swarm/)
- [Deploy to Elastic Beanstalk]({{site.baseurl}}/docs/example-catalog/cd-examples/elastic-beanstalk/)
- [Deploy to Amazon ECS/Fargate]({{site.baseurl}}/docs/example-catalog/cd-examples/amazon-ecs/)


## Related articles
[CI examples for Codefresh pipelines]({{site.baseurl}}/docs/example-catalog/ci-examples)  
[GitOps examples]({{site.baseurl}}/docs/example-catalog/gitops-examples) 