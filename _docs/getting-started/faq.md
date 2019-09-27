---
title: "Frequently Asked Questions"
description: ""
group: getting-started
redirect_from:
  - /docs/kubernetes-frequently-asked-questions/
  - /docs/kubernetes-deployment-frequently-asked-questions/
  - /docs/faq/kubernetes-frequently-asked-questions/
---

This is a collection of common questions we get when people are trying Codefresh for the first time.

## General

**Q. What is Codefresh?**  
A. Codefresh is a [Continuous Integration/Delivery](https://en.wikipedia.org/wiki/Continuous_delivery) solution. It fetches code from your GIT repository and packages/compiles it. Then it deploys the final artifact to a target environment. This basic concept is implemented with [pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/).

**Q. Is there an on-premise version of Codefresh?**   
A. Yes. Codefresh is offered in [SAAS, Hybrid and on-premise modes]({{site.baseurl}}/docs/enterprise/installation-security/). Before you consider on-premise please look at the [hybrid mode first]({{site.baseurl}}/docs/enterprise/behind-the-firewall/). In this mode Codefresh runs the Web UI while you only maintain the build nodes behind the firewall.

**Q. Is Codefresh open-source?**   
A. The Web UI is not open source. All the [pipeline plugins](https://codefresh.io/steps/) and the [Codefresh Runner]({{site.baseurl}}/docs/enterprise/codefresh-runner/) are open-source. We also publish several open-source [components](https://github.com/codefresh-io), [examples](https://github.com/codefresh-contrib) and [demos](https://github.com/codefreshdemo/).

**Q. How is pricing structured?**      
A. Pricing is per concurrent build. In practice this means how many pull requests you can process *at the same time*. See the [pricing page](https://codefresh.io/pricing/) for more details.

**Q. Is there a pay as you go model?**     
A. We are always considering new pricing options. The pay as you go model has flaws as well. One of the big selling points of Codefresh is the different types of caches we employ in order to speed up builds. When a company charges for build minutes, it has no further motivation to cut down on build times. Several CI solutions offer no caching mechanisms, forcing you to download application dependencies on each build. Please contact us to discuss about pricing if this is your main blocker from adopting Codefresh.

**Q. How does the user limit work?**    
A. Unlike other CI solutions, the user limit in Codefresh plan does **not** refer to committers. It simply mentions how many people
have access to the Codefresh Web Interface. You could work in a company with 100 developers committing code in Git while only 2 people are actually logging in the Codefresh UI.

**Q. Does Codefresh offer infrastructure for running builds?**   
A. Yes, the cloud version of Codefresh is fully [SAAS](https://en.wikipedia.org/wiki/Software_as_a_service). You only need to open an account and all builds are running on our cloud. You can still use a [Codefresh runner]({{site.baseurl}}/docs/enterprise/codefresh-runner/), but this is completely optional.

**Q. Does Codefresh offer infrastructure for test environments?**  
A. Yes, each Codefresh account has access to [preview environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/) that are powered by Docker Swarm. You can also run [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) with Databases, Key-Value stores, message queues etc.

**Q. Does Codefresh offer infrastructure for production deployments?**  
A. No. You need to connect your own cloud provider either in the form of VMs, or Kubernetes cluster or Docker Swarm etc.

**Q. Can I deploy with Codefresh to non-Kubernetes targets?**  
A. Yes. Even though Codefresh has great support for Docker and Kubernetes, you can still use it to deploy plain VMs, JAR files, static websites, Wordpress instances, Database changesets etc.

## Competitors

**Q. How is Codefresh different that another CI solution?**  
A. This is a long discussion. The quick answer is :
1. Codefresh is a full CI/CD solution and not just CI
1. Codefresh has [several unique features]({{site.baseurl}}/({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/)) such as a distributed docker layer cache, an automounted shared volume, a private Docker registry and a private Helm repository.
1. Codefresh covers the full software lifecycle. You can see a release on the cluster dashboard, click on it, go to the docker image, click on it and go the build that created it, all from a single interface. Codefresh is batteries-included CI/CD

**Q. How is Codefresh different than Jenkins?**  
A. Codefresh is a superset of Jenkins. Jenkins is only CI. You need to write custom scripts or use another tool such as Ansible to deploy with Jenkins. See the [comparison matrix](https://codefresh.io/compare-codefresh-jenkins/) and the [detailed blog post](https://codefresh.io/continuous-deployment/codefresh-versus-jenkins/). There is also [a comparison with Jenkins X](https://codefresh.io/continuous-deployment/codefresh-versus-jenkins-x/). 

**Q. How is Codefresh different than my custom deployment scripts in bash/Ansible/Chef/Puppet/Python?**  
A. These scripts are custom made, complex to maintain and difficult to read. One of the reasons that developers and operators have difficulties in communication is the in-house nature of deployment scripts. Codefresh allows you to create standard declarative pipelines
where each step is a reusable Docker image.

## Integration features

**Q. Can Codefresh run a build on each push/commit?**  
A. Yes, this is one of the most basic functions of a CI system. See our [extensive git support]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/). You can also run builds in a [cron-like manner]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/cron-triggers/) or even from Docker push events from several popular Docker registries.

**Q. Can Codefresh build pull requests?**  
A. Yes, this is one of the most basic functions of a CI system. See our [extensive git support]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#pull-request-target-field-and-branch-name) and [built-in variables]({{site.baseurl}}/docs/codefresh-yaml/variables/#github-pull-request-variables).

**Q. Can Codefresh build applications in programming language X?**  
A. Yes, Codefresh is agnostic in this manner. The only requirement is that you have a Docker image with the compiler/framework/libraries of your programming language. See some examples for [Java]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/), [Go]({{site.baseurl}}/docs/learn-by-example/golang/golang-hello-world/), [Node.js]({{site.baseurl}}/docs/learn-by-example/nodejs/react/), [Ruby]({{site.baseurl}}/docs/learn-by-example/ruby/), [Php]({{site.baseurl}}/docs/learn-by-example/php/), [Python]({{site.baseurl}}/docs/learn-by-example/python/django/).

**Q. Can Codefresh build applications which are not Dockerized?**  
A. Yes. Even though Codefresh is especially powerful with containers, you can still use it for traditional applications which are not deployed in containers. Here is [an example with a plain Go executable]({{site.baseurl}}/docs/learn-by-example/golang/goreleaser/).

**Q. Can I run tests in my pipelines?**    
A. Codefresh supports all kinds of tests such as [unit tests]({{site.baseurl}}/docs/testing/unit-tests/) and [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) as well as [test reports]({{site.baseurl}}/docs/testing/test-reports/).

**Q. Does Codefresh support parallelism?**    
A. Yes, Codefresh supports both [parallel steps]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/) (parallelism within a pipeline) as well as [parallel pipelines]({{site.baseurl}}/docs/integrations/codefresh-api/#using-codefresh-from-within-codefresh).

**Q. Does Codefresh support preview environments for pull requests?**    
A. Yes, although notice that these [are powered by Docker swarm]({{site.baseurl}}/docs/getting-started/on-demand-environments/). If you want preview environments in a Kubernetes namespace you need to connect your own cluster.

**Q. Can I checkout code from non-git sources?**    
A. Yes, you can checkout code [from other source control systems]({{site.baseurl}}/docs/yaml-examples/examples/non-git-checkout/). 

**Q. Does Codefresh support git submodules?**    
A. Yes, there is a [git submodule plugin](https://codefresh.io/steps/step/git-submodules). 

**Q. Does Codefresh support git monorepos?**    
A. Yes, there is built-in support for [monorepos]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#monorepo-support-modified-files).

**Q. Does Codefresh support pipeline-as-code?**    
A. Yes, all pipelines can be stored in a git repository (the same one as the application code or a different one). You can also [create pipelines]({{site.baseurl}}/docs/integrations/codefresh-api/#example---creating-codefresh-pipelines-externally) programmatically with our [CLI](https://codefresh-io.github.io/cli/).

**Q. Does Codefresh support secrets?**    
A. For basic usage, feel free to use the [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) facility. For production grade security we suggest a dedicated solution such as [Hashicorp Vault](https://www.vaultproject.io/). We offer a [vault plugin](https://codefresh.io/steps/step/vault) for this purpose.

**Q. Can I call external service X in a pipeline?**    
A. Yes, everything that has an API or CLI can be called in a Codefresh pipeline (Artifactory/S3/Slack/Sonarqube/Twistlock/Codecov etc)


## Deployment features

**Q. Can I deploy to different environments (dev/staging/prod)?**    
A. Yes, you can even deploy in parallel to several environments. If you also use Helm you get a [nice graphical dashboard]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/).


**Q. Can I pause a pipeline and wait for approval before deploying to production?**    
A. Yes, there is a built-in [approval step]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/).

**Q. Can I deploy to non-Kubernetes targets?**    
A. Yes, you can deploy to a VM, an FTP site, an application server or even a behind-the-firewall [Nomad cluster]({{site.baseurl}}/docs/yaml-examples/examples/nomad/). You can deploy to anything that has an API or CLI. 

**Q. Does Codefresh support infrastructure as code?**    
A. Yes, there is nothing special to it. See the [Terraform]({{site.baseurl}}/docs/yaml-examples/examples/terraform/) and [Pulumi]({{site.baseurl}}/docs/yaml-examples/examples/pulumi/) examples.

**Q. Can I connect my own Docker registry instead of the internal one?**    
A. Yes, the [built-in Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) is automatically available to all pipelines, but you can still connect your [own external registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).

**Q. My Kubernetes cluster has automatic scaling/monitoring/logging. Will Codefresh have issues with it?**    
A. Codefresh is using the standard Kubernetes API available to all compliant Kubernetes distributions. After a deployment is finished, Codefresh does not tamper with the cluster in any way.

**Q. Do you support deployment to Kubernetes clusters on Azure, Amazon, etc?**  
A. Yes, we do! If your master node is publicly accessible you can access it as a custom provider, just follow the [cluster connection]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) instructions.
In addition, we have native integration with GKE, Azure, Amazon, and Digital Ocean. 
Native Integration with more cloud providers is coming soon.

**Q. Can I run Codefresh pipelines on my Kubernetes cluster?**  
You can but you don't need to. The SAAS version of Codefresh is fully managed and pipelines are running on the cloud.
You can run Codefresh pipelines on your own cluster using the [Codefresh Runner]({{site.baseurl}}/docs/enterprise/codefresh-runner/) in [Hybrid mode]({{site.baseurl}}/docs/enterprise/behind-the-firewall/). This is normally only needed if you want to access services behind your firewall. If you simply want to *deploy* to a Kubernetes cluster, the SAAS version of Codefresh is enough.


## Enterprise support

**Q. Does Codefresh support SSO?**    
A. Yes, we support several [popular SSO providers]({{site.baseurl}}/docs/enterprise/single-sign-on/).

**Q. Does Codefresh access control?**    
A. Yes, we support both UI and ABAC on [pipelines, projects and clusters]({{site.baseurl}}/docs/enterprise/access-control/).

**Q. Does Codefresh support auditing?**    
A. Yes, audit logs are  [built-in]({{site.baseurl}}/docs/enterprise/audit-logs/).

**Q. Do you offer professional services to help us migrate to containers/Kubernetes?**    
A. Yes, we do.

## What to read next

* [Your first CI/CD pipeline]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/)
* [How Codefresh pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Kubernetes Deployment tutorial]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)
* [Helm Deployment Tutorial tutorial]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/)

