---
title: "CD example catalog"
description: "A collection of CD examples for Codefresh pipelines"
group: example-catalog
toc: true
---

Continuous Delivery/Deployment ideally includes already
Continuous Integration and builds upon it.


### Preview environment examples

Codefresh can automatically launch environments (powered by Docker swarm) to [preview a Pull Request or feature]({{site.baseurl}}/docs/quick-start/ci-quick-start/on-demand-environments/). The definition of the environment can come from an [existing composition]({{site.baseurl}}/docs/testing/create-composition/), a docker-compose file or an inline YAML. Preview environments can be launched manually or [automatically from pipelines]({{site.baseurl}}/docs/pipelines/steps/launch-composition/).

- [NGINX Basic Auth]({{site.baseurl}}/docs/example-catalog/cd-examples/secure-a-docker-container-using-http-basic-auth/)
- [Spring Boot + Kafka + Zookeeper]({{site.baseurl}}/docs/example-catalog/cd-examples/spring-boot-kafka-zookeeper/)
- [Web terminal]({{site.baseurl}}/docs/example-catalog/cd-examples/web-terminal/)

### Deployment examples

Codefresh can deploy to any platform such as VMs, FTP/SSH/S3 sites, app servers, but of course it has great support for [Kubernetes clusters]({{site.baseurl}}/docs/deployments/kubernetes/) and [Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/):

- [Deploy to a VM with packer]({{site.baseurl}}/docs/example-catalog/cd-examples/packer-gcloud/) 
- [Deploy to a VM with FTP]({{site.baseurl}}/docs/example-catalog/cd-examples/transferring-php-ftp)
- [Deploy to Tomcat using SCP]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-to-tomcat-via-scp) 
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


### Secrets examples

Codefresh can automatically export secret key-value pairs using the Vault plugin from the [Step Marketplace](https://codefresh.io/steps/step/vault){:target="\_blank"}.
- [GitOps with Bitnami sealed secrets]({{site.baseurl}}/docs/example-catalog/cd-examples/gitops-secrets)