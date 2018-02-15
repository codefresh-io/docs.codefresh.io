---
layout: docs
title: "Example - Deploy demochat to Kubernetes cluster"
description: ""
group: deploy-to-kubernetes
permalink: /:path/codefresh-kubernetes-integration-demochat-example/
redirect_from:
  - /docs/codefresh-kubernetes-integration-demochat-example
toc: true
---
In this example we will deploy our `demochat` application to Kubernetes. `demochat` requires two services to run
1. MongoDB
2. `demochat` webserver that is implemented in Node and can be found [here](https://github.com/containers101/demochat){:target="_blank"}

{:.text-secondary}
### We will do the following steps:
1. Build image for `demochat`
2. Deploy the `demochat` service to K8 cluster
3. Access running `demochat`
4. Automate `demochat` deployment using Codefresh pipeline

{{site.data.callout.callout_info}}
##### Demochat

Demochat repository can be found and forked from here: <br>
[https://github.com/containers101/demochat](https://github.com/containers101/demochat){:target="_blank"}
{{site.data.callout.end}}

{:.text-secondary}
### **Build image for Demochat**

1. Add your forked `demochat` repo (use the url above to find the repo).
2. Also, choose the branch for your first build (in this case `master`).
3. Select how you would like to setup your repository. In this case, our repo has a Dockerfile, so we'll select the middle option.
4. Clicking on `Build` button will trigger a regular build.
5. When the docker image will be created, go to the tab `Images` to find the image `containers101/demochat`

{{site.data.callout.callout_warning}}
More info about how to add, build and push docker image you can find in the readme of repository [https://github.com/containers101/demochat](https://github.com/containers101/demochat){:target="_blank"}
{{site.data.callout.end}}

{:.text-secondary}
### **Deploy the Demochat service to K8 cluster**

{:start="1"}
1. Go to the `Account Settings` &#8594; `Integration` &#8594; `Enable Kubernetes`

{:start="2"}
2. And then add the cluster

{% include image.html
lightbox="true"
file="/images/0e26729-codefresh_add_cluster.png"
url="/images/0e26729-codefresh_add_cluster.png"
alt="codefresh_add_cluster.png"
max-width="40%"
%}

{:start="3"}
3. Go to the tab `Kubernetes` and click on the button `Add New Service`

{:start="4"}
4. The `demochat` application uses the mongo, therefore we need to add `mongo` service with the following params (see the screenshots below).

{% include image.html
lightbox="true"
file="/images/10e6303-codefresh_mongo_service.png"
url="/images/10e6303-codefresh_mongo_service.png"
alt="codefresh_mongo_service.png"
max-width="40%"
%}

{:start="5"}
5. Then just click on the button `Deploy`

{:start="6"}
6. The mongo service will appear on your kubernetes dashboard

{:start="7"}
7. Click on the button `Add New Service` to create a Demochat service

{:start="8"}
8. Use the screenshot below to specify the parameters of Demochat service

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
file="/images/29fbc78-codefresh_configure_kubernates_service.png"
url="/images/29fbc78-codefresh_configure_kubernates_service.png"
alt="codefresh_configure_kubernates_service.png"
max-width="40%"
%}

{:.text-secondary}
### **Access Demochat**

On the `Kubernetes` tab you can see the `demochat` and `mongo` services.

{% include image.html
lightbox="true"
file="/images/2c78c74-codefresh_k8_services.png"
url="/images/2c78c74-codefresh_k8_services.png"
alt="codefresh_k8_services.png"
max-width="40%"
%}

{:.text-secondary}
### Demochat was successfully deployed!
You can see the external endpoints of this service  in the service view and access the application using its endpoint and port.

{% include image.html
lightbox="true"
file="/images/1f7db93-codefresh_external_endpoints.png"
url="/images/1f7db93-codefresh_external_endpoints.png"
alt="codefresh_external_endpoints.png"
max-width="40%"
%}

{% include image.html
lightbox="true"
file="/images/324f2ba-codefresh_demochat_endpoint.png"
url="/images/324f2ba-codefresh_demochat_endpoint.png"
alt="codefresh_demochat_endpoint.png"
max-width="40%"
%}

{:.text-secondary}
### **Automate Demochat deployment using Codefresh pipeline**

To configure the __Deploy Script__ in the pipeline you just need to go to the tab `Repositories` and click on the button `Pipelines` of the __demochat__ service.

{% include image.html
lightbox="true"
file="/images/cc66c8f-codefresh_demochat_repo.png"
url="/images/cc66c8f-codefresh_demochat_repo.png"
alt="codefresh_demochat_repo.png"
max-width="40%"
%}

On the next screen, you need to enable the `Push to Docker registry`. Just integrate with the docker registry that you use for images on the Integration page and then select this docker registry in the dropdown list of the push step.
This image will be used in the Deploy script.

{% include image.html
lightbox="true"
file="/images/10b3692-codefresh_push_step.png"
url="/images/10b3692-codefresh_push_step.png"
alt="codefresh_push_step.png"
max-width="40%"
%}

In the next step, you need to configure the __Deploy Script__

{:start="1"}
1. Choose the option __Kubernetes (Beta)__

{:start="2"}
2. Choose the cluster on which will be deployed the service

{:start="3"}
3. Choose the namespace

{:start="4"}
4. Select the service that will be redeployed

{:start="5"}
5. Select the branch as condition when the Deploy Script will be performed

{% include image.html
lightbox="true"
file="/images/9829274-codefresh_deploy_script.png"
url="/images/9829274-codefresh_deploy_script.png"
alt="codefresh_deploy_script.png"
max-width="40%"
%}

__Save__ and __Build__ the pipeline.

{% include image.html
lightbox="true"
file="/images/22cd0c7-codefresh_deploy_script_process.png"
url="/images/22cd0c7-codefresh_deploy_script_process.png"
alt="codefresh_deploy_script_process.png"
max-width="40%"
%}
