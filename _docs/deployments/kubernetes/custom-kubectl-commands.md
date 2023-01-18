---
title: "Custom kubectl commands"
description: "Use kubectl in your Codefresh pipelines"
group: deployments
sub_group: kubernetes
redirect_from:
  - /docs/deploy-to-kubernetes/custom-kubectl-commands/
toc: true
---

As described in [Deployment options for Kubernetes]({{site.baseurl}}/docs/deployments/kubernetes/deployment-options-to-kubernetes/), Codefresh has built-in functionality for deploying to Kubernetes clusters.

For maximum flexibility with cluster deployments, you can run your own custom `kubectl` commands in a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).  
[Kubectl](https://kubernetes.io/docs/reference/kubectl/overview/){:target="\_blank"} is the command line interface for managing kubernetes clusters.

Codefresh automatically sets up your [config context](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/){:target="\_blank"} with your connected clusters.

The config context is automatically placed for you at the path of the [variable]({{site.baseurl}}/docs/pipelines/variables/) `$CF_KUBECONFIG_PATH`.
In the current Codefresh implementation, this expands to `/codefresh/volume/sensitive/.kube/config`, within the [shared step volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps).

When you use custom `kubectl` commands, it is your responsibility to template your manifests using any of the available options. To employ Codefresh for templating, it is better to use the dedicated [cf-deploy-kubernetes step]({{site.baseurl}}/docs/ci-cd-guides/kubernetes-templating/), which provides simple templating capabilities.

## Using the Codefresh kubectl image

Codefresh already offers a public Docker image with `kubectl` at [https://hub.docker.com/r/codefresh/kubectl/tags](https://hub.docker.com/r/codefresh/kubectl/tags){:target="\_blank"}. You can choose a specific version of `kubectl` with the appropriate tag or just select `latest` for the most up-to-date version.

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

If you run the pipeline, you can see the help options for `kubectl`.

## Getting a config context

The important thing to know when running custom `kubectl` commands is that Codefresh automatically sets up
your [kubeconfig files](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/){:target="\_blank"} for you with the cluster information present in [integrations]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster).

{% include image.html 
lightbox="true" 
file="/images/deployments/kubernetes/kube-context.png" 
url="/images/deployments/kubernetes/kube-context.png"
alt="Codefresh cluster names"
caption="Codefresh cluster names"
max-width="50%"
%}

If you run this pipeline, you will see the names of all your connected clusters:

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

With two sample clusters, the output of this pipeline is the following:

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

Let's see a full example. In this pipeline, we will create two Docker images and deploy them on two separate clusters, using custom `kubectl` commands. We will also use the [parallel capability]({{site.baseurl}}/docs/pipelines/advanced-workflows/) of Codefresh pipelines.

Here is the pipeline:

{% include image.html 
lightbox="true" 
file="/images/deployments/kubernetes/parallel-kubectl.png" 
url="/images/deployments/kubernetes/parallel-kubectl.png"
alt="Parallel kubectl deployment"
caption="Parallel kubectl deployment"
max-width="100%"
%}

And here is the complete `codefresh.yml`:

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

In the example above, we select one of the clusters in each deployment step, and then apply several Kubernetes manifests that constitute an application.

## Related articles
[Managing Kubernetes clusters]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Accessing a Docker registry from cluster]({{site.baseurl}}/docs/ci-cd-guides/access-docker-registry-from-kubernetes/)    










 