---
title: "Example - Deploy demochat to Kubernetes cluster"
description: "An end-to-end example for Kubernetes deployment"
group: deploy-to-kubernetes
permalink: /:collection/deploy-to-kubernetes/codefresh-kubernetes-integration-demochat-example/
toc: true
---
In this example we will deploy our `demochat` application to Kubernetes. `demochat` requires two services to run:

1. MongoDB
1. `demochat` webserver that is implemented in Node and can be found at [https://github.com/containers101/demochat](https://github.com/containers101/demochat)

We will perfom the following steps:

1. Build the Docker image for `demochat`
1. Deploy the `demochat` service to a Kubernetes cluster
1. Access the running `demochat` service
1. Automate `demochat` deployment using a Codefresh pipeline

{{site.data.callout.callout_info}}
##### Demochat source code

The Demochat repository can be found and forked from here: <br>
[https://github.com/containers101/demochat](https://github.com/containers101/demochat){:target="_blank"}
{{site.data.callout.end}}

{:.text-secondary}

## Building the Docker image for Demochat

Become familiar with basic Codefresh pipelines as explained in the [quick start guide]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/) and then:

1. Add your forked `demochat` repo in Codefresh (use the url above to find the repo).
1. Choose the branch for your first build (in this case `master`).
1. Select how you would like to setup your repository. In this case, our repo already has a Dockerfile, so we will select the middle option.
1. Clicking on `Build` button will trigger a regular build.
1. When the docker image will be created, go to the tab `Images` to find the image `containers101/demochat`

{{site.data.callout.callout_warning}}
More info about how to add, build and push docker image you can find in the readme of repository [https://github.com/containers101/demochat](https://github.com/containers101/demochat){:target="_blank"}
{{site.data.callout.end}}

{:.text-secondary}

## Deploying the Demochat service to a Kubernetes cluster

{:start="1"}
1. Go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *Kubernetes*.

{:start="2"}
2. [Add your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/).

{% include image.html
  lightbox="true"
  file="/images/integrations/codefresh-integrations.png"
  url="/images/integrations/codefresh-integrations.png"
  alt="Codefresh integrations"
  max-width="60%"
    %}

{:start="3"}
3. Exit your account settings and then select `Kubernetes` from the left sidebar to access your [Kubernetes dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/). Click on the button `Add New Service`.

{:start="4"}
4. The `demochat` application uses a Mongo database, therefore we need to add a `mongo` service with the following params (see the screenshot below).

{% include image.html
lightbox="true"
file="/images/kubernetes/demo/mongo-service.png"
url="/images/kubernetes/demo/mongo-service.png"
alt="Deploy mongo service"
caption="Deploy mongo service"
max-width="50%"
%}

{:start="5"}
5. Then just click on the button `Deploy`.

{:start="6"}
6. The mongo service will appear on your Kubernetes dashboard.

{:start="7"}
7. Click on the button `Add New Service` to create a Demochat service.

{:start="8"}
8. Use the screenshot below to specify the parameters of Demochat service.

{: .table .table-bordered .table-hover}
| Parameter          | Value                                     |
|:-------------------|:------------------------------------------|
| **CLUSTER**        | choose one of your clusters               |
| **NAMESPACE**      | choose the namespace in the dropdown list |
| **SERVICE NAME**   | Demochat                                  |
| **REPLICAS**       | 1                                         |
| **EXPOSE PORT**    | 5000                                      |
| **IMAGE**          | containers101/demochat                    |
| **INTERNAL PORTS** | 5000                                      |

{% include image.html
lightbox="true"
file="/images/kubernetes/demo/configure-service.png"
url="/images/kubernetes/demo/configure-service.png"
alt="Configure mongo service"
caption="Configure mongo service"
max-width="50%"
%}


## Accessing the Demochat service

On the `Kubernetes` tab you can see the `demochat` and `mongo` services.

{% include image.html
lightbox="true"
file="/images/kubernetes/demo/services.png"
url="/images/kubernetes/demo/services.png"
alt="Kubernetes Services"
caption="Kubernetes Services"
max-width="70%"
%}


The Demochat application is now successfully deployed!
You can see the external endpoints of this service in the service view and access the application using its endpoint and port.

{% include image.html
lightbox="true"
file="/images/1f7db93-codefresh_external_endpoints.png"
url="/images/1f7db93-codefresh_external_endpoints.png"
alt="codefresh_external_endpoints.png"
max-width="50%"
%}

Click on the external endpoint and your browser window will open to show the running application.

{% include image.html
lightbox="true"
file="/images/324f2ba-codefresh_demochat_endpoint.jpg"
url="/images/324f2ba-codefresh_demochat_endpoint.jpg"
alt="codefresh_demochat_endpoint.png"
max-width="50%"
%}


## Automating Demochat deployment using Codefresh pipelines

For automated Kubernetes deployments check the documentation for

1. The dedicated [deploy step]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/) in a pipeline. 
1. The [cf-deploy-kubernetes step]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/) in a pipeline. This can also perform simple templating on Kubernetes manifests.
1. Using a [freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) step with [custom kubectl commands]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/).
1. Using The Helm package manager. See the [Helm quick start guide]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/).

## What to read next

- [Deploy to Kubernetes - quick start]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)
- [Deploying to Kubernetes with Helm]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/)
- [Manage your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
