---
title: "What is Codefresh"
description: "Understand the features and benefits of Codefresh"
group: getting-started
toc: true
---

TBD


<!--- What's different in Codefresh when it comes to continuous integration (CI) and continuous delivery (CD)?
There is a long answer and a short one.

Let's start with the short answer: 

Codefresh:
* Is a _complete CI/CD solution_, and not just CI.
* Works with all major Git platforms and cloud providers. There is no lock-in with any particular vendor.
* Has pipelines with Has several unique features such as a distributed Docker layer cache, an auto-mounted shared volume, a private Docker registry and a private Helm repository.
* Built-in Kubernetes and Helm dashboards 
* Helm charts browser, and Helm environment board 

As you can see, Codefresh is turbo-charged CI/CD. We cover the full software lifecycle. View a release in the Kubernetes dashboard, click on it and go to the Docker image, click on the Docker image and go to the build that created it, all from a single interface. 


How does Codefresh do it?
Everything for CI/CD in Codefresh starts and ends with pipelines. In Codefresh, a pipeline can do pretty much anyhting, only CI, only CD, both CI and CD.

Your CI pipeline can compile and package code, build and push Docker images. The CD pipeline can deploy applications/artifacts to VMs, Kubernetes clusters, FTP sites, S3 buckets, and more. And yet another pipeline combines both integration and deployment for full CI/CD.
Other pipelines can run unit tests, integration tests, acceptance tests etc. CI/CD pipeline to create and deploy your applications, or a pipeline run any custom action, such as tests.





Completely programmatic approach
Unlike other CI/CD platforms which can be tightly coupled to a single Git provider, or a specific vendor or set of tools, Codefresh supports a fully programmtic implementation. Pipelines are create pipelines and define the pipeline’s steps, triggers, and variables.

Everything in the pipeline is defined as code and applied with the command line. Storing the definitions in a code repo ensures consistenct. Upscaling or expanind Doing so means we can create all of our pipelines in a consistent way and store those definitions in a code repository. Taking this one step step deeper, we could then create a bootstrap pipeline in Codefresh that generates pipelines when new definitions are added to this repo. See our previous post Programmatic Creation of Codefresh Pipelines (part 2) for more on this.


The Docker registry integrations and all cluster integrations are automatically available to all pipelines. You don’t need docker login commands or kubectl commands to set up a Kube context inside your pipeline.



Pipelines can Run unit tests, integration tests, acceptance tests etc.





Pipeline extras
We support all Git providers: Both on-premises and cloud 
provides a rich set of triggers: Trigger pipelines  on a schedule, from a push to a docker registry or from a push to a helm registry or from actions that happened in Git.
Has a rich, modern API With Codefresh, you can trigger a pipeline

Since Codefresh is decoupled from any single pipeline source, we provide a programmatic way to 


## CI/CD pipelines

As mentioned earlier, everything in Codefresh CI/CD starts and ends with pipelines. 
A Codefresh pipeline has two distinct aspects:

* Pipeline specifications
  Specifications define the pipeline:
  * Metadata such as name, project, tags, in Codefresh
  * Events that trigger the pipeline, such as webhooks, cron events, etc.
  * Steps to use for this pipeline (inline, from a repo, etc.)

* Pipeline steps
  Pipeline steps are essentially a collection of Docker images that define the:
  * Jobs to run
  * Sequence in which to run the jobs
  * CI and CD processes to implement

  Step types range from clone, build, deploy, and, a freestyle step when no size fits.  
  For ready-to-use collections of pipeline steps, check out our [Plugin marketplace](https://codefresh.io/steps/){:target="\_blank"}



To see how pipeline work, start with the [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/), or jump to [pipeline creation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/).

## Releases and dashboards
Dashboards are key to providing information at the right time and in 
perational Dashboards ~ Exposing the most commonly needed application and environmental information to developers so that they can troubleshoot without needing assistance from the DevOps teams; even in production

Analytical Dashboards ~ Developers often need to reach out to the DevOps team to get statistics and metrics around builds and deployments. Codefresh automatically generates DORA metrics as well as many other key indicators of build and deployment efficiency, which can be easily viewed in seconds by product owners and management alike.

## Integrations
For a seamless CI/CD experience, Codefresh has native integrations with alomst every major provider.
Easily connect Git providers, registry providers, storage providers, secret stores, and notification channels 

Docker registry and all cluster integrations are automatically available to all pipelines. You don’t need Docker login commands or `kubectl` commands to set up a Kube context inside your pipeline.

Go to Pipeline Integrations in the UI, and see how to 
## Where to go from here
Here are several links we think wouuld be useful t

### Quick starts
To get up and running, follow our quick starts. The quick start modules are a series of flows that guide you from setting up your first account in Codefresh, to creating a basic pipeline, and deploying to Kubernetes.
See XREF TBD 

### Example catalog
For those who are familiar with CI/CD, we have an extensive collection of examples, covering several CI and CD scenarios:
[CI examples]({{site.baseurl}}/docs/example-catalog/ci-examples/)
[CD examples]({{site.baseurl}}/docs/example-catalog/cd-examples/)

### Guides
And finally, if you want more meat, dive in to our detailed guides.
XREF TBD

-->