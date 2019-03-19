---
title: "Running custom kubectl commands"
description: "How to use kubectl in your Codefresh pipelines"
group: deploy-to-kubernetes
toc: true
---

As explained in the [deployment options page]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/), Codefresh has several built-in facilities for deploying to Kubernetes clusters.

If you wish you can still run your own custom `kubectl` commands in a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) for maximum flexibility on cluster deployments. [Kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) is the command line interface for managing kubernetes clusters.

Codefresh helps you even in this scenario by automatically setting up your [config context](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/) with your [connected clusters]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/).

The config context is automatically placed for you at the path of the [variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) `$CF_KUBECONFIG_PATH`.
In the current Codefresh implementation this expands to `/codefresh/volume/sensitive/.kube/config`, inside the [shared step volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps).

## Using the Codefresh kubectl image

Codefresh already offers a public docker image with kubectl at [https://hub.docker.com/r/codefresh/kubectl/tags](https://hub.docker.com/r/codefresh/kubectl/tags). You can choose a specific version of `kubectl` with the appropriate tag or just select `latest` of the most up-to-date version.

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  MyCustomKubectlCommands:
    title: Running Kubectl
    image: codefresh/kubectl:1.13.3
    commands: 
      - echo $CF_KUBECONFIG_PATH
      - kubectl help
{% endraw %}
{% endhighlight %}

If you run the pipeline you will see the help options for `kubectl`.

## Getting a config context

The important thing to know when running custom `kubectl` commands is that Codefresh is automatically setting up
your [kubeconfig files](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for you with the cluster information present in [integrations]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)

{% include image.html 
lightbox="true" 
file="/images/kubernetes/custom-kubectl/kube-context.png" 
url="/images/kubernetes/custom-kubectl/kube-context.png"
alt="Codefresh cluster names"
caption="Codefresh cluster names"
max-width="50%"
%}

If you run this pipeline, you will see the names of all your connected clusters

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  MyCustomKubectlCommands:
    title: Running Kubectl
    image: codefresh/kubectl
    commands: 
      - kubectl config get-contexts
{% endraw %}
{% endhighlight %}

With two sample clusters the output of this pipeline is the following:

```
Running freestyle step: Running Kubectl
Pulling image codefresh/kubectl:latest
Status: Image is up to date for codefresh/kubectl:latest
NAME                              CLUSTER                           AUTHINFO                          NAMESPACE
gke-kostisdemo-codefresh-kostis   gke-kostisdemo-codefresh-kostis   gke-kostisdemo-codefresh-kostis   default
kostis-demo@FirstKubernetes       kostis-demo@FirstKubernetes       kostis-demo@FirstKubernetes       default
   
```          

You can modify the current config context and run any `kubectl` command you want applied to that context. The next pipeline will print all the nodes of the first cluster:

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  MyCustomKubectlCommands:
    title: Running Kubectl
    image: codefresh/kubectl
    commands: 
      - kubectl config get-contexts
      - kubectl config use-context "gke-kostisdemo-codefresh-kostis"
      - kubectl get nodes
{% endraw %}
{% endhighlight %}

## Example of parallel deployment with kubectl

Let's see a full example. In this pipeline we are going to create two docker images and deploy them into two separate clusters, using custom `kubectl` commands. We are going also to use the [parallel capability]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/) of Codefresh pipelines.

Here is the pipeline:

{% include image.html 
lightbox="true" 
file="/images/kubernetes/custom-kubectl/parallel-kubectl.png" 
url="/images/kubernetes/custom-kubectl/parallel-kubectl.png"
alt="Parallel kubectl deployment"
caption="Parallel kubectl deployment"
max-width="100%"
%}

and here is the full `codefresh.yml`.

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'

stages:
- build
- deploy

steps:
  BuildingApps:
    type: parallel
    stage: 'build'
    steps:
      BuildingApp1:
        title: Building App 1
        type: build
        stage: build
        image_name: nestjs-app
        working_directory: ./my-nestjs-project/
        dockerfile: Dockerfile
      BuildingApp2:
        title: Building App 2
        type: build
        stage: build
        image_name: rails
        working_directory: ./my-rails-project/
        dockerfile: Dockerfile
  DeployingApps:
    type: parallel
    stage: 'deploy'
    steps:
      DeployApp1:
        title: Deploying App 1
        stage: deploy
        image: codefresh/kubectl
        working_directory: ./my-nestjs-project/
        commands: 
          - kubectl config get-contexts
          - kubectl config use-context "gke-kostisdemo-codefresh-kostis"
          - kubectl apply -f service.yml deployment.yml
      DeployApp2:
        title: Deploying App 2
        stage: deploy
        image: codefresh/kubectl
        working_directory: ./my-rails-project/
        commands: 
          - kubectl config get-contexts
          - kubectl config use-context "kostis-demo@FirstKubernetes"  
          - kubectl apply -f service.yml deployment.yml configmap.yml
{% endraw %}
{% endhighlight %}

In this example above we select the one of the clusters on each deployment step, and then apply several Kubernetes manifests that constitute an application.

## What to read next

* [Connnecting to your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
* [Managing your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
* [Accessing a docker registry]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/)









 