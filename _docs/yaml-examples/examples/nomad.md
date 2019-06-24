---
title: "Deploy to Nomad"
description: "Deploy Docker images to a Nomad cluster with Codefresh"
group: yaml-examples
sub_group: examples
toc: true
---

Even though Codefresh has great support for Kubernetes and Helm deployments, there is no lock-in on using just Kubernetes. Codefresh can deploy on any infrastructure.


[Nomad](https://www.nomadproject.io/) is an alternative scheduling platform from Hashicorp. It supports docker containers (like Kubernetes) but you can also use Nomad to schedule VMs, Java apps, Go apps or any other standalone executable. 

There are several public Docker image with Nomad, so it is very easy to use Codefresh pipelines to deploy to a Nomad cluster.

 
{% include image.html 
lightbox="true" 
file="/images/examples/nomad/nomad-ci-pipeline.png" 
url="/images/examples/nomad/nomad-ci-pipeline.png" 
alt="Deploying to Nomad with Codefresh"
caption="Deploying to Nomad with Codefresh"
max-width="80%" 
%}

In this example we are going to use the image at [https://hub.docker.com/r/djenriquez/nomad](https://hub.docker.com/r/djenriquez/nomad).

## The example Nomad project

You can see the example project at [https://github.com/codefresh-contrib/nomad-sample-app](https://github.com/codefresh-contrib/nomad-sample-app). The repository contains a simple job specification that deploys a docker container on nomad cluster.


Here is the whole job file:

 `docker-job.hcl`
{% highlight hcl %}
{% raw %}
job "example-job" {
  # Specify this job should run in the region named "us". Regions
  # are defined by the Nomad servers' configuration.
  #region = "us"

  # Spread the tasks in this job between us-west-1 and us-east-1.
  datacenters = ["dc1"]

  # Run this job as a "service" type. Each job type has different
  # properties. See the documentation below for more examples.
  type = "service"

  # Specify this job to have rolling updates, two-at-a-time, with
  # 30 second intervals.
  update {
    stagger      = "30s"
    max_parallel = 1
  }

  # A group defines a series of tasks that should be co-located
  # on the same client (host). All tasks within a group will be
  # placed on the same host.
  group "example-group" {
    # Specify the number of these tasks we want.
    count = 3

    # Create an individual task (unit of work). This particular
    # task utilizes a Docker container to front a web application.
    task "example-task" {
      # Specify the driver to be "docker". Nomad supports
      # multiple drivers.
      driver = "docker"

      # Configuration is specific to each driver.
      config {
        image = "r.cfcr.io/$CF_ACCOUNT/$CF_REPO_NAME:$CF_BRANCH_TAG_NORMALIZED"

        auth {
          username = "$CF_ACCOUNT"
          password = "$CFCR_LOGIN_TOKEN"
          server_address  = "r.cfcr.io"
        }

        port_map {
          http = 8080
        }
      }

      # The service block tells Nomad how to register this service
      # with Consul for service discovery and monitoring.
      service {
        # This tells Consul to monitor the service on the port
        # labelled "http". Since Nomad allocates high dynamic port
        # numbers, we use labels to refer to them.
        port = "http"

        check {
          type     = "http"
          path     = "/"
          interval = "10s"
          timeout  = "2s"
        }
      }

      # Specify the maximum resources required to run the task,
      # include CPU, memory, and bandwidth.
      resources {
        cpu    = 500 # MHz
        memory = 128 # MB

        network {
          mbits = 100

         
          port "http" {}
      

         
        }
      }
    }
  }
}

{% endraw %}
{% endhighlight %}

Notice that the job specification has several [Codefresh variables]({{site.baseurl}}/docs/codefresh-yaml/variables/) embedded. We will use [envsubst](https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html) in our pipeline to replace
them with the correct values.

## Prerequisites

You need to create a Codefresh account and have a Nomad cluster running. You need to decide on how Codefresh will communicate
with the nomad cluster. In this simple example we just use the `NOMAD_ADDR` variable to point the nomad client to our cluster. In a production environment you should use proper [ACL](https://www.nomadproject.io/guides/security/acl.html) and [certificate](https://www.nomadproject.io/guides/security/securing-nomad.html) variables as well.


In this example the Nomad cluster is already setup on a VM at Google cloud. 

You also need to create a [token for the Codefresh registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/#generate-cfcr-login-token) so that Nomad can pull your private images on the cluster. You can also use an [external Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) with Nomad.

## Create a CI/CD pipeline for Nomad deployments

Here is the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "deploy"
steps:
  main_clone:
    type: "git-clone"
    title: "Clone main repository..."
    repo: "codefresh-contrib/nomad-sample-app"
    revision: "${{CF_BRANCH}}"
    stage: "clone"
  build:
    title: "Building Docker Image"
    type: "build"
    image_name: "nomad-sample-app"
    tag: "${{CF_BRANCH_TAG_NORMALIZED}}"
    dockerfile: "Dockerfile"
    stage: "build"
  prepareJob:
    title: "Preparing Nomad job"
    image: bhgedigital/envsubst
    stage: deploy
    commands:
      - envsubst < docker-job.hcl > docker-job-export.hcl
      - cat docker-job-export.hcl
  runJob:
    title: "Deploying Nomad job"
    image: djenriquez/nomad
    stage: deploy
    commands:
      - nomad run docker-job-export.hcl  
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. Uses a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) to create a Docker image for a simple Go application. The image is automatically pushed to the private Codefresh registry
1. Runs `envsubst` to replace all variables in the job spec. These include:
   * the Registry token so that Nomad can access the Codefresh registry
   * The docker image name and tag to be deployed
1. Runs the job with another [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) (i.e. Deploys the image to Nomad)


Run the pipeline and see your deployment succeed.

Here are the environment variables defined for this pipeline.

{% include image.html 
lightbox="true" 
file="/images/examples/nomad/nomad-variables.png" 
url="/images/examples/nomad/nomad-variables.png" 
alt="Pipeline variables for Nomad deployments"
caption="Pipeline variables for Nomad deployments"
max-width="50%" 
%}


The `NOMAD_ADDR` variable is holding the URL of the cluster. The `CFCR_LOGIN_TOKEN` variable holds authentication for the Codefresh Docker registry. 

## Verify the deployment

Nomad also comes with its own UI that can show you the result of a deployment.

{% include image.html 
lightbox="true" 
file="/images/examples/nomad/nomad-ui-deployment.png" 
url="/images/examples/nomad/nomad-ui-deployment.png" 
alt="Nomad UI deployment"
caption="Nomad UI deployment"
max-width="80%" 
%}

You can also use [Terraform]({{site.baseurl}}/docs/yaml-examples/examples/terraform/) in Codefresh pipelines.

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)