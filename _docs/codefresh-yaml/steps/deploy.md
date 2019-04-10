---
title: "Deploy"
description: "Deploying to Kubernetes from a Codefresh pipeline"
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/deploy/
toc: true
---
The *Deploy* step can be used as a step to deploy a pre-built Docker image to a cluster

This step allows to (re)deploy a kubernetes application in your cluster

If has two modes:

1. Using the `service` option. In this case it will redeploy to an [existing service/deployment in your cluster]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/) . Codefresh will
automatically update the service/deployment with the new docker image
1. Using the `file_path` option. In this case you provide your own Kubernetes manifest and Codefresh deploys it as-is. It is **your
own responsibility** to do [custom replacements]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/) here (for example using [awk](https://en.wikipedia.org/wiki/AWK), [sed](https://www.gnu.org/software/sed/manual/sed.html) or [yq](http://mikefarah.github.io/yq/)). For a full templating solution we also
suggest you look at [Helm]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/)

You need to define either one of these fields in the deploy step. If you define `service` you also can select the exact Docker image
with the `candidate` field (otherwise Codefresh will just reuse the docker image defined in the existing deployment)

## Usage

  `YAML`
{% highlight yaml %}    
  step_name:
    title: deploying to cluster
    type: deploy
    kind: kubernetes 
    ## cluster name as the shown in account's integration page
    cluster:  --my-cluster-name--
    # desired namespace
    namespace: default
    
    ## Two ways to distinguish which deployment YAML to deploy - service or file_path:    
    # The kubernetes service that associated with the deployment using selector
    service: --my-service--
    # Path to deployment.yml location inside the image volume
    file_path: ./deployment.yml
    # In seconds, how long the step will wait until the rolling update is complete (default is 120)
    timeout: '150'
    # Candidate is optional, if not specified will redeploy the same image that specified in the deployment file
    # When candidate exist it should have both: image and registry
    candidate:
      # The image that will replace the original deployment image 
      # The image that been build using Build step
      image: {% raw %}${{build_step}}{% endraw %}
      # The registry that the user's Kubernetes cluster can pull the image from
      # Codefresh will generate (if not found) secret and add it to the deployment so the Kubernetes master can pull it
      registry: dockerhub
    # Condition to run the step
    when:
      branch:
        only:
          - master
    on_success:
    ...
    on_fail:
    ...
    on_finish:
    ...
    retry:
    ...        
{% endhighlight %}

## Fields

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                        | Required/Optional/Default |
| ------------------------------------------ | ----------------------------------------------------------  -------- | ------------------------- |
| `title`                                    | The free-text display name of the step                               | Optional                  |
| `description`                              | A basic, free-text description of the step.                          | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `kind`                        | Currently only `kubernetes` is supported                | Required                   |
| `cluster`                        | Name of your K8s cluster as found in the dashboard               | Required                   |
| `namespace`                        | Namespace where the deployment will take place           | Required                   |
| `service`                        | Name of the existing service that will updated. You need to provide `service` OR `file_path`               | Required/Optional                   |
| `file_path`                        | A deployment manifest. You need to provide `service` OR `file_path`                | Required/Optional                  |
| `timeout`                        | Seconds to wait for the deployment to be completed. Default is 120 seconds               | Default                   |
| `candidate`                        | Docker image that will be deployed. Only valid if `service` is defined. Should contain `image` and name of registry as it appears in the [registry integration page]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).                | Optional                  |                  
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                        | Default                   |
| `when`                                     | Define a set of conditions which need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) article.          | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/).                                                                               | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

## Examples

Update an existing service using the same Docker image (tagged with branch)

`codefresh.yml`
{% highlight yaml %} 
{% raw %}
version: '1.0'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: python-flask-sample-app
    working_directory: ./
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}
    dockerfile: Dockerfile
  deploy_to_k8:
    title: deploying to cluster
    type: deploy
    kind: kubernetes 
    cluster:  myDemoAKSCluster
    namespace: demo
    service: my-python-app
{% endraw %}
{% endhighlight %}

Update an existing service using a different Docker image (tagged with git hash)

`codefresh.yml`
{% highlight yaml %} 
{% raw %}
version: '1.0'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: python-flask-sample-app
    working_directory: ./
    tag: ${{CF_SHORT_REVISION}}
    dockerfile: Dockerfile
  deploy_to_k8:
    title: deploying to cluster
    type: deploy
    kind: kubernetes 
    cluster:  myDemoAKSCluster
    namespace: demo
    service: my-python-app
    candidate:
      # The image that will replace the original deployment image 
      # The image that been build using Build step
      image: ${{MyAppDockerImage}}
      # The registry that the user's Kubernetes cluster can pull the image from
      # Codefresh will generate (if not found) secret and add it to the deployment so the Kubernetes master can pull it
      registry: cfcr
{% endraw %}
{% endhighlight %}


Deploy a custom Kuberentes Manifest as is. (Only a deployment will be created)

`codefresh.yml`
{% highlight yaml %} 
{% raw %}
version: '1.0'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: python-flask-sample-app
    working_directory: ./
    tag: ${{CF_BRANCH}}
    dockerfile: Dockerfile
  deploy_to_k8:
    title: deploying to cluster
    type: deploy
    kind: kubernetes 
    cluster:  myDemoAKSCluster
    namespace: demo
    file_path: ./deploy/deployment.yml
{% endraw %}
{% endhighlight %}

## Advanced Kubernetes deployments

If you find the deploy step limited, feel free to look at the other deployment options offered by Codefresh:

* [The cf-deploy-kubernetes step]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/) 
* [Custom kubectl commands]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/) 
* [Helm]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/) 

## What to read next
- [Kubernetes Quick start guide]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)  
- [Deploy to Kubernetes]({{site.baseurl}}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-beta/) 
- [Install HELM chart using Codefresh pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)


