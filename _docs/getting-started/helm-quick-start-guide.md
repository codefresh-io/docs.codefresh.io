---
title: "Deployment to Kubernetes with Helm"
description: "Using the Helm package Manager in Codefresh"
group: getting-started
toc: true
---

In the [previous quick start guide]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/) we have seen how you can deploy quickly an application directly to Kubernetes.
In this guide we will see how we can use [Helm](https://helm.sh/) for deployments and what facilities Codefresh offers to make
it easier to work with Helm packages.

Helm is a package manager for Kubernetes. It behaves similar to other package managers (yum, apt, npm, maven, pip, gems) but it works at the application level allowing you to deploy multiple manifests together. 

Helm offers several extra features on top of vanilla Kubernetes deployments, some of which are:

* The ability to group multiple Kubernetes manifests together and treat them as a single entity (for deployments, rollbacks, and storage). Groups of Manifests are called [Helm Charts](https://helm.sh/docs/topics/charts/).
* Built-in templating for Kubernetes manifests, putting an end to custom template systems that you might use for replacing things such as the Docker tag inside a manifest.
* The ability to create Charts of Charts which contain the templates as well as default values. This means
that you can describe the dependencies of an application in the service level and deploy everything at the same time.
* The ability to create catalogs of applications (Helm repositories) that function similar to traditional package repositories (think npm registry, cpan, maven central, ruby gems etc).


Codefresh has native support for Helm in a number of ways:

1. You can easily deploy existing Helm packages to your Kubernetes cluster overriding the default values.
1. You can easily create new Helm packages and push them to a Helm repository.
1. Codefresh gives you an [integrated Helm Repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/).
1. You can see the Helm releases and even [perform rollbacks]({{site.baseurl}}/docs/new-helm/helm-releases-management/) from the Helm Dashboard.
1. You can [browse Helm packages]({{site.baseurl}}/docs/new-helm/add-helm-repository/)  both from public repositories and your internal Helm repository.
1. You can see Helm releases in the [Environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)
1. You can promote Helm releases with the [Promotion dashboard]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/)


## Overview

In this guide we will see how you can:

1. Deploy a Helm application with Codefresh in an automated manner
1. Manage your Helm releases from within Codefresh
1. Store a Helm package inside the integrated Codefresh repository



For simplicity reasons, we will use the [default Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/#the-default-registry) that is setup globally in your Codefresh account. For your own application you can also use any other of your registries even if it is not the default.


## Prerequisites

It is assumed that:
  - You have already [added your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) into Codefresh
  - You have connected at least one [Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) in your Codefresh account
  - You have already an application that has a Dockerfile and a [Helm chart]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/#helm-setup) 
  - Your cluster has pull access to your default Docker registry. If not read the [previous guide]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/#deploying-a-docker-image-to-kubernetes-manually) or look at the [documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/deploy-to-kubernetes/create-image-pull-secret/)

If you want to follow along feel free to fork this [repository](https://github.com/codefresh-contrib/python-flask-sample-app) in your Git account and look at the [with-helm](https://github.com/codefresh-contrib/python-flask-sample-app/tree/with-helm) branch.

First, verify that your cluster is setup for Helm by selecting the *Helm Releases* item from the left sidebar. You should see the Helm releases in your cluster or an empty screen if you just started.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/empty-helm-cluster.png" 
url="/images/getting-started/quick-start-helm/empty-helm-cluster.png" 
alt="Empty Helm cluster" 
caption="Empty Helm cluster (click image to enlarge)" 
max-width="70%" 
%}


## Deploying a Helm Release to your Kubernetes cluster

Codefresh provides a special [Helm step](https://codefresh.io/steps/step/helm) that you can use to perform a deployment.
At its most basic form you can put the following step in your [codefresh.yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file.

`YAML`
{% highlight yaml %}
{% raw %}
deploy:
  type: helm
  arguments:
    action: install
    chart_name: test_chart
    release_name: first
    helm_version: 3.0.1
    kube_context: my-kubernetes-context
{% endraw %}
{% endhighlight %}

Under the hood, we use the `cfstep-helm` image to deploy a chart. There are 3 environment variables that are required. The `chart_name` points to the [chart inside the git repository](https://github.com/codefresh-contrib/python-flask-sample-app/tree/with-helm/charts/python). The `release_name` defines the name of the deployment that will be created
in the cluster. And finally, the `kube_context` defines which cluster will be used. The name is the same as defined in [Codefresh Integrations](https://g.codefresh.io/account-admin/account-conf/integration/kubernetes).

For the full list of variables and modes see the section [using Helm in Codefresh pipelines]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)

>Notice that we use Helm 3.x in the example above. If you still use Helm 2.x then select another tag of the `codefresh/cfstep-helm` image that matches your Tiller version. For example if you have installed Tiller 2.9.1 then you need to use the 2.9.1 version instead.

This step will deploy the Helm chart using the default values as found in `values.yaml` inside the chart folder. It would make sense to override the defaults using some parameters in the build. For example instead of tagging your docker image with the branch name (which is always the same for each build), you could tag it with the hash of the source revision which is one of the [offered variables]({{site.baseurl}}/docs/codefresh-yaml/variables/).

Thus, the whole pipeline is the following:

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - package
  - deploy  
steps:
  clone:
    title: Cloning main repository...
    type: git-clone
    arguments:
      repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
      revision: '${{CF_REVISION}}'
    stage: checkout
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    arguments:
      image_name: my-flask-app
      working_directory: ./python-flask-sample-app
      tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
      dockerfile: Dockerfile
    stage: package
  DeployMyChart:
    type: helm
    stage: deploy
    working_directory: ./python-flask-sample-app
    arguments:
      action: install
      chart_name: charts/python
      release_name: my-python-chart
      helm_version: 3.0.2
      kube_context: kostis-demo@FirstKubernetes
      custom_values:
      - 'buildID=${{CF_BUILD_ID}}'
      - 'image_pullPolicy=Always'
      - 'repository=r.cfcr.io/kostis-codefresh/my-flask-app'
      - 'image_tag=${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
      - 'image_pullSecret=codefresh-generated-r.cfcr.io-cfcr-default'
{% endraw %}
{% endhighlight %}

The `custom_values` override the [default chart values](https://github.com/codefresh-contrib/python-flask-sample-app/blob/with-helm/charts/python/values.yaml). The underscores are replaced with dots.
Here we override the name of tag (to match the Docker image built in the previous step) and the pull policy.

You can see the value replacements in the Helm logs inside the pipeline:

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-logs.png" 
url="/images/getting-started/quick-start-helm/helm-logs.png" 
alt="Helm Value replacement" 
caption="Helm Value replacement" 
max-width="100%" 
%}


This is the easiest way to deploy to Kubernetes without having to manually change values in manifests, Helm and Codefresh
already take care of replacements using the built-in steps.

### Viewing Helm releases 

Once a Helm package is deployed in your Kubernetes cluster, Codefresh will show it under [Helm releases]({{site.baseurl}}/docs/new-helm/helm-releases-management/).

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-release-details.png" 
url="/images/getting-started/quick-start-helm/helm-release-details.png" 
alt="Codefresh Helm release" 
caption="A Helm release (click image to enlarge)" 
max-width="90%" 
%}

If you don't see your release click on the gear icon on the top right of the cluster and make sure that you choose the correct Helm version along with the namespace of your application.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-version-selection.png" 
url="/images/getting-started/quick-start-helm/helm-version-selection.png" 
alt="Choosing a Helm version" 
caption="Choosing a Helm version (click image to enlarge)" 
max-width="50%" 
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

Codefresh allows you to do this right from the GUI. Select the History tab in the Helm release and from the list of revisions you can select any of them as the rollback target. Notice that rolling back will actually create a new revision. So, you can go backward and forward in time to any revision possible.




## Storing a Helm chart 

Codefresh includes a [built-in Helm repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/) that comes integrated to all accounts. You can use this repository
to store charts like any other public Helm repository. It is also possible to manually deploy applications from your repository.

To store a Helm chart, first of all you need to import the shared configuration that defines the integrated Helm Repository, or, you can define the repository URL directly.

Within the pipeline editor click the *Variables* taskbar on the right and click on the vertical ellipsis, select *Add Shared Configuration*. Then, select the shared configuration of the integrated Helm repository and add the variable to your pipeline.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/import-helm-repo-conf.png" 
url="/images/getting-started/quick-start-helm/import-helm-repo-conf.png" 
alt="Helm settings" 
caption="Import Helm repository configuration (click image to enlarge)" 
max-width="70%" 
%}

Once that is done you add or modify the deploy step in your `codefresh.yml` file:

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - package
  - deploy  
steps:
  clone:
    title: Cloning main repository...
    type: git-clone
    arguments:
      repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
      revision: '${{CF_REVISION}}'
    stage: checkout
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    working_directory: ${{clone}}
    arguments:
      image_name: my-flask-app
      tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
      dockerfile: Dockerfile
    stage: package
  deploy:
    title: Storing Helm chart
    type: helm
    stage: deploy
    working_directory: ./python-flask-sample-app
    arguments:
      action: push
      chart_name: charts/python
      helm_version: 3.0.2
      kube_context: 'mydemoAkscluster@BizSpark Plus'
{% endraw %}
{% endhighlight %}

We use the same `helm` step as before. But this time we define `push` as the action (the default is deploying a helm package). In this pipeline we only store the Helm chart in the internal repository.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-only-store.png" 
url="/images/getting-started/quick-start-helm/helm-only-store.png" 
alt="Storing the chart" 
caption="Storing the chart" 
max-width="100%" 
%}

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

You can also create a single pipeline that [both stores the chart as well as deploys it in a cluster]({{site.baseurl}}/docs/yaml-examples/examples/helm/).

## What to read next

* [Codefresh built-in Helm repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
* [Using Helm in a Pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
* [Helm pipeline example]({{site.baseurl}}/docs/yaml-examples/examples/helm/)
* [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)












