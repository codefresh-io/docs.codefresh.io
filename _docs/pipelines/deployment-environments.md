---
title: "Deployment environments"
description: "How to update the environment status from builds"
group: pipelines
toc: true
---

Codefresh includes an [Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/) to monitor your applications and the builds associated with them. You can access the dashboard by clicking on *Environments* in the left sidebar of the Codefresh UI.

{% include
image.html
lightbox="true"
file="/images/codefresh-yaml/environments/environments.png"
url="/images/codefresh-yaml/environments/environments.png"
alt="Environment Dashboards"
caption="Environment Dashboards"
max-width="80%"
%}

Currently two types of environments are supported (they look identical in the UI):
 * Helm releases
 * Plain Kubernetes deployments

In any pipeline that implements a deployment, you can add an extra `env` property to instruct Codefresh on which environments are affected by that build. The first time that you run the build, the environment GUI screen is automatically populated with an entry for that environment. Any subsequents builds with then update the environment entry with build and deployment status.

>You can also create an environment manually from the GUI and then a pipeline will update it automatically if *ALL* properties of the environment match those described in the pipeline YAML.


## Usage

Syntax for a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) that deploys to a Kubernetes environment:

  `YAML`
{% highlight yaml %}
{% raw %}
step_name:
  title: Step Title
  description: Step description
  image: image/id
  working_directory: ${{step_id}}
  commands: 
    - command1
    - command2
  env:
    name: my-prod-env
    endpoints:
    - name: app
      url: https://prod.example.com
    type: kubernetes
    change: code update
    filters:
    - cluster: my-cluster
      namespace: default    
{% endraw %}
{% endhighlight %}

Syntax for a freestyle step that deploys to a Helm environment:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
step_name:
  title: Step Title
  description: Step description
  image: image/id
  working_directory: ${{step_id}}
  commands: 
    - command1
    - command2
  env:
    name: my-stage-env
    endpoints:
    - name: app
      url: https://stage.example.com
    type: helm-release
    change: config map change
    filters:
    - cluster: my-cluster
      releaseName: istio
{% endraw %}            
{% endhighlight %}

You can also use environments in other Codefresh steps such as [deploy]({{site.baseurl}}/docs/pipelines/steps/deploy/). 

## Fields

{: .table .table-bordered .table-hover}
| Field         | Description         | 
| -------------| ------------------------|
| `name`      | Arbitrary name of the environment. It can be anything you want. It will appear in the Environment Dashboard GUI |       
| `endpoints`      | Array of `name`, `url` pairs that mark the application accessible endpoints of this environment (if any). They appear in the Environment GUI as links and allow you to quickly visit an environment with your browser. The endpoint value is a just a link/bookmark to the application endpoint that you want to associate with this environment. In most cases it is the load-balancer/ingress/Kubernetes service exposed by your application.|
| `type`      | Type of environment. Accepted values are either `kubernetes` or `helm-release` | 
| `change`      | Any text that you want to appear as a description on what the build did to an environment. You can use free text or any Codefresh [variable]({{site.baseurl}}/docs/pipelines/variables/) such `CF_COMMIT_MESSAGE` to get the commit message of the git trigger |
| `filters`      | An array of cluster characteristics so that Codefresh can pull live data from the cluster to display pod and deployment status. For a Kubernetes environment you enter `cluster`, `namespace` and for Helm environments you enter `cluster`, `releaseNames` |

In all cases the `cluster` name is the unique identifier of your cluster as seen in the [Kubernetes dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#work-with-your-services) screen. 

Also notice that the relationship between environments and builds are many to many. A single environment can be affected by different pipelines, and a single pipeline might deploy to multiple environments.

## Example for Kubernetes environment

A pipeline that deploys to a Kubernetes cluster:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - "clone"
  - "build"
  - "deploy"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    stage: "clone"
  BuildingDockerImage:
    stage: "build"
    title: Building Docker Image
    type: build
    image_name: goapp
    tag: '${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
  Deploy:
    stage: "deploy"
    title: Deploy to K8s
    type: deploy
    kind: kubernetes
    cluster: my-demo-k8s-cluster
    namespace: default
    service: goapp
    candidate:
      image: '${{BuildingDockerImage}}'
      registry: cfcr
    env:
      name: orders-prod
      endpoints:
      - name: Main
        url: http://40.113.201.163
      type: kubernetes
      change: Updated
      filters:
      - cluster: my-demo-k8s-cluster
        namespace: default      
{% endraw %}            
{% endhighlight %}


This pipeline is similar to the one described in the [Kubernetes quick start guide]({{site.baseurl}}/docs/quick-start/ci-quickstart/deploy-to-kubernetes/) but has an extra `env` block that defines:

* an environment called "orders-prod"
* a single application endpoint at 40.113.201.163 (Kubernetes service or ingress)
* a change entry with a freetext string "updated"
* on a cluster which is linked to Codefresh with the name `my-demo-k8s-cluster`
* monitoring pods and deployments found in the `default` namespace

Once the pipeline runs the following environment entry will appear in the environments screen:

{% include
image.html
lightbox="true"
file="/images/codefresh-yaml/environments/k8s-environment.png"
url="/images/codefresh-yaml/environments/k8s-environment.png"
alt="Kubernetes environment status"
caption="Kubernetes environment status"
max-width="100%"
%}

## Example for Helm environment

A pipeline that deploys a Helm release:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - "clone"
  - "build"
  - "deploy"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    stage: "clone"
  BuildingDockerImage:
    stage: "build"
    title: Building Docker Image
    type: build
    image_name: goapp
    tag: '${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile.multistage
  StoreChart:
    title: Storing Helm chart
    stage: "deploy"
    image: 'codefresh/cfstep-helm:2.14.1'
    environment:
      - ACTION=push
      - CHART_REF=charts/helm-example
      - CHART_REPO_URL=cm://h.cfcr.io/codefreshdemo/default
  DeployMyChart:
    image: 'codefresh/cfstep-helm:2.14.1'
    title: Deploying Helm chart
    stage: "deploy"
    environment:
      - CHART_REF=charts/helm-example
      - RELEASE_NAME=my-go-chart-prod
      - KUBE_CONTEXT=my-demo-k8s-cluster
      - VALUE_image_pullPolicy=Always
      - VALUE_image.repository=r.cfcr.io/codefreshdemo/go-app
      - VALUE_image.tag=${{CF_SHORT_REVISION}}
      - VALUE_replicaCount=3
      - VALUE_image_pullSecret=codefresh-generated-r.cfcr.io-cfcr-default
    env:
      name: load-testing
      endpoints:
      - name: Main
        url: http://40.113.201.163
      type: helm-release
      change: '${{CF_COMMIT_MESSAGE}}'
      filters:
      - cluster: my-demo-k8s-cluster
        releaseName: my-go-chart-prod

{% endraw %}            
{% endhighlight %}

This pipeline is similar to the one described in the [Helm quick start guide]({{site.baseurl}}/docs/quick-start/ci-quickstart/deploy-with-helm/) but has an extra `env` block that defines:

* an environment called "load testing"
* a single application endpoint at 40.113.201.163 (Kubernetes service or ingress)
* a change entry that is the same as the last commit message (`CF_COMMIT_MESSAGE` variable)
* on a cluster which is linked to Codefresh with the name `my-demo-k8s-cluster`
* monitoring a Helm release named `my-go-chart-prod` (the release was created in the `DeployMyChart` pipeline step )

Once the pipeline runs the following environment entry will appear in the environments screen:

{% include
image.html
lightbox="true"
file="/images/codefresh-yaml/environments/helm-environment.png"
url="/images/codefresh-yaml/environments/helm-environment.png"
alt="Helm environment status"
caption="Helm environment status"
max-width="100%"
%}

Every time that you run another build of the pipeline the environment status will be updated automatically.


## Related articles
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Managing Kubernetes clusters]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Connecting a Kubernetes cluster]({{site.baseurl}}/docs//integrations/kubernetes/#connect-a-kubernetes-cluster)  
[Helm Board]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/)  

