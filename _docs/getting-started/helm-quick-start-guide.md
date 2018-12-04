---
title: "Deployment to Kubernetes with Helm"
description: "Using the Helm package Manager in Codefresh"
group: getting-started
toc: true
---

In the [previous quick start guide]({{ site.baseurl }}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/) we have seen how you can deploy quickly an application directly to Kubernetes.
In this guide we will see how we can use [Helm](https://helm.sh/) for deployments and what facilities Codefresh offers to make
it easier to work with Helm packages.

Helm is a package manager for Kubernetes. It behaves similar to other package managers (yum, apt, npm, maven, pip, gems) but it works at the application level allowing you to deploy multiple manifests together. 

Helm offers several extra features on top of vanilla Kubernetes deployments, some of which are:

* The ability to group multiple Kubernetes manifests together and treat them as a single entity (for deployments, rollbacks, and storage). Groups of Manifests are called [Helm Charts](https://github.com/kubernetes/helm/blob/master/docs/charts.md).
* Built-in templating for Kubernetes manifests, putting an end to custom template systems that you might use for replacing things such as the Docker tag inside a manifest.
* The ability to create Charts of Charts which contain the templates as well as default values. This means
that you can describe the dependencies of an application in the service level and deploy everything at the same time.
* The ability to create catalogs of applications (Helm repositories) that function similar to traditional package repositories (think npm registry, cpan, maven central, ruby gems etc).


Codefresh has native support for Helm in a number of ways.

1. You can easily deploy existing Helm packages to your Kubernetes cluster overriding the default values
1. You can easily create new Helm packages and push them to a Helm repository
1. Like the [integrated Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) Codefresh also gives you an [integrated Helm Repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
1. You can see the Helm releases and even [perform rollbacks]({{site.baseurl}}/docs/new-helm/helm-releases-management/) from the Helm Dashboard
1. You can [browse Helm packages]({{site.baseurl}}/docs/new-helm/add-helm-repository/)  both from public repositories and your internal Helm repository


## Overview

In this guide we will see how you can 

1. deploy a Helm application with Codefresh in an automated manner
1. manage your Helm releases from within Codefresh
1. store a Helm package inside the integrated Codefresh repository



For simplicity reasons, we will use the [built-in Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) that is available to all Codefresh accounts. For your own application you can also integrate with any other [external Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).


## Prerequisites

It is assumed that:
  - you have already [added your K8s cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) into Codefresh
  - you have already an application that has a Dockerfile and a Helm chart
  - the server part of Helm is installed in your cluster (Tiller)
  - your cluster has pull access to the Codefresh registry. If not read the [previous guide]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/#giving-the-kubernetes-cluster-read-access-to-the-internal-codefresh-registry) or look at the [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/deploy-to-kubernetes/create-image-pull-secret/).

To verify that your cluster is setup for Helm select the *Helm Releases* item from the left sidebar. You should see the Helm releases in your cluster or an empty screen if you just started.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-dashboard.png" 
url="/images/getting-started/quick-start-helm/helm-dashboard.png" 
alt="Codefresh Helm releases" 
caption="Cluster with Helm installed (click image to enlarge)" 
max-width="70%" 
%}

If you want to follow along feel free to fork this [repository](https://github.com/codefresh-contrib/python-flask-sample-app) in your Git account.


## Deploying a Helm Release to your Kubernetes cluster

Codefresh provides a premade Docker image with Helm that you can use as a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) to perform a deployment.
At its most basic form you can put the following step in your [codefresh.yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file.

`YAML`
{% highlight yaml %}
{% raw %}
DeployMyChart:
  image: 'codefresh/cfstep-helm:2.9.1'
  environment:
    - CHART_REF=charts/python
    - RELEASE_NAME=mypython-chart-prod
    - KUBE_CONTEXT=myDemoAKSCluster
{% endraw %}
{% endhighlight %}

We use the `cfstep-helm` image to deploy a chart. There are 3 environment variables that are required. The `CHART_REF` points to the chart inside the git repository. The `RELEASE_NAME` defines the name of the deployment that will be created
in the cluster. And finally the `KUBE_CONTEXT` defines which cluster will be used. The name is the same as defined in Codefresh Integrations.

For the full list of variables and modes see the section [using Helm in Codefresh pipelines]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)

This step will deploy the Helm chart using the default values as found in `values.yaml` inside the chart folder. It would make sense to override the defaults using some parameters in the build. For example instead of tagging your docker image with the branch name (which is always the same for each build), you could tag it with the hash of the source revision which is one of the [offered variables]({{site.baseurl}}/docs/codefresh-yaml/variables/).

Thus the whole pipeline is the following:

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: kostis-codefresh/python-flask-sampleapp
    working_directory: ./
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
  DeployMyChart:
    image: 'codefresh/cfstep-helm:2.9.1'
    title: Deploying Helm chart
    environment:
      - CHART_REF=charts/python
      - RELEASE_NAME=mypython-chart-prod
      - KUBE_CONTEXT=myDemoAKSCluster
      - VALUE_image_pullPolicy=Always
      - VALUE_image_tag='${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
{% endraw %}
{% endhighlight %}

The two extra lines that start with `VALUE` override the default chart values. The underscores are replaced with dots.
Here we override the name of tag (to match the Docker image built in the previous step) and the pull policy.

If you look at the logs of the build job you will see the following:

```
helm upgrade mypython-chart-prod charts/python --install --force --reset-values --set image.pullPolicy=Always --set image.tag='with-helm-8b55cbc'
```

This is the easiest way to deploy to Kubernetes without having to manually change values in manifests, Helm and Codefresh
already take care of replacements using the built-in steps.

### Viewing Helm releases 

Once a Helm package is deployed in your Kubernetes cluster, Codefresh will show it under Helm releases.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-release.png" 
url="/images/getting-started/quick-start-helm/helm-release.png" 
alt="Codefresh Helm release" 
caption="A Helm release (click image to enlarge)" 
max-width="70%" 
%}

You can click on the release and get information regarding its chart, its revisions, changed files and the resulting manifests.

The build values that we defined in the `codefresh.yml` are shown here in a separate tab so it is very easy to 
verify the correct parameters.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-values.png" 
url="/images/getting-started/quick-start-helm/helm-values.png" 
alt="Codefresh Helm values" 
caption="Helm values (click image to enlarge)" 
max-width="70%" 
%}

You also visit the main Kubernetes dashboard and view the services/pods/deployments that comprise the helm release.


### Rolling back a Helm release

Another big advantage of Helm is the way it gives you easy rollbacks for free. If you make some commits in your project Helm will keep the same deployment and add new revisions on it.

You can easily rollback to any previous version without actually re-running the pipeline.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-rollback.png" 
url="/images/getting-started/quick-start-helm/helm-rollback.png" 
alt="Helm rollback" 
caption="Helm rollback (click image to enlarge)" 
max-width="70%" 
%}

The server part of Helm keeps a history of all releases and knows the exact contents of each respective Helm package.

Codefresh allows you to do this right from the GUI. Select the History tab in the Helm release and from the list of revisions you can select any of them as the rollback target. Notice that rolling back will actually create a new revision. So you can go backward and forward in time to any revision possible.




## Storing a Helm chart 

Codefresh includes a built-in Helm repository that comes integrated to all accounts. You can use this repository
to store charts like any other public Helm repository. It is also possible to manually deploy applications from your repository.

To store a Helm chart, first of all you need to import the shared configuration that defines the integrated Helm Repository.

Go to the *Environment Variables* section in your build and select *Import from shared configuration*. Find the details
of the integrated Helm repository.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/import.png" 
url="/images/getting-started/quick-start-helm/import.png" 
alt="Helm settings" 
caption="Import Helm repository configuration (click image to enlarge)" 
max-width="70%" 
%}

Once that is done you add the following step in your `codefresh.yml` file:

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: kostis-codefresh/python-flask-sampleapp
    working_directory: ./
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
  StoreChart:
    title: Storing Helm chart
    image: 'codefresh/cfstep-helm:2.9.1'
    environment:
      - ACTION=push
      - CHART_REF=charts/python
{% endraw %}
{% endhighlight %}

We use the same `cfstep-helm` as before. But this time we define `push` as the action (the default is deploying a helm package).

Once the pipeline finishes, you can see your chart in the *Helm charts* part in the left sidebar.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-repo.png" 
url="/images/getting-started/quick-start-helm/helm-repo.png" 
alt="Helm settings" 
caption="Import Helm repository configuration (click image to enlarge)" 
max-width="70%" 
%}

There is even an install button if you want to deploy manually the chart. Codefresh will allow to enter your own values
in that case and also select your target cluster.



## What to read next

* [Codefresh built-in Helm repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
* [Using Helm in a Pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
* [Internal Docker Registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)












