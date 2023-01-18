---
title: "Simple Kubernetes templating"
description: "Use templates in your Kubernetes manifests"
group: ci-cd-guides
redirect_from:
  - /docs/deploy-to-kubernetes/kubernetes-templating/
toc: true
---

Once you start working with Kubernetes you will see the need for using templates in Kubernetes manifests for common parameters such as:

* The docker image name of a deployment
* The docker image tag of a deployment
* Number of replicas
* Service labels
* Configmaps and other settings

Kubernetes does not provide any templating mechanism on its own. Deployed manifests are expected to be static yaml files. An external solution is needed if you want to pass parameters in your manifests.

The proper way to handle templates is within [Helm]({{site.baseurl}}/docs/quick-start/ci-quickstart/deploy-with-helm/) . Helm is the package manager for Kubernetes and also includes templating capabilities.

To use templates without using Helm, there are several templating solutions available including [Kustomize](https://github.com/kubernetes-sigs/kustomize){:target="\_blank"} from Google. 

Codefresh also includes its own simple templating mechanism that has built-in integration with all [pipeline variables]({{site.baseurl}}/docs/pipelines/variables/) as we will explain in this page.

## Using the Codefresh deploy image

Codefresh offers a public docker image at [https://hub.docker.com/r/codefresh/cf-deploy-kubernetes/tags/](https://hub.docker.com/r/codefresh/cf-deploy-kubernetes/tags/){:target="\_blank"} for easy templating of Kubernetes manifests. The source code of the image is at [https://github.com/codefresh-io/cf-deploy-kubernetes](https://github.com/codefresh-io/cf-deploy-kubernetes){:target="\_blank"}. This image can be used in a freestyle step like this:

`YAML`
{% highlight yaml %}
{% raw %}
  MyDeploy:
    title: K8s Deploy
    image: codefresh/cf-deploy-kubernetes:master
    commands:
      - /cf-deploy-kubernetes deployment.yml    
    environment:
      - KUBECONTEXT=my-cluster-name
      - KUBERNETES_NAMESPACE=my-namespace
{% endraw %}
{% endhighlight %}

The step accepts the following environment variables:

* `KUBECONTEXT`: Corresponds to the name of a cluster added to codefresh.
* `KUBERNETES_NAMESPACE`: The namespace to which to deploy.
* `KUBECTL_ACTION`: An action for `kubectl <action>`. Valid values are `apply|create|replace` (default is `apply`).
* `KUBERNETES_DEPLOYMENT_TIMEOUT`: The duration to wait for a successful deployment before failing the build (defaults to 120 secs).

The step will deploy your deployment to the cluster specified by the context and namespace given. The name of the context is the name of your cluster as seen in the [Kubernetes dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#work-with-your-services).

Before the deployment takes place, all Codefresh variables found in the `deployment.yml` file in the form of {% raw %}`{{MY_VARIABLE}}`{% endraw %} will be automatically replaced with their current values.

Here is an example manifest:

`Kubernetes manifest`
{% highlight yaml %}
{% raw %}
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: my-demo-app
  annotations:
    branch: {{CF_BRANCH_TAG_NORMALIZED}}
    source-repository: {{CF_REPO_NAME}}  
spec:
  replicas: 4
  template:
    metadata:
      labels:
        name: my-demo-app
        app: my-demo-app
    spec:
      containers:
      - name: my-demo-app
        image: r.cfcr.io/{{CF_ACCOUNT}}/my-sample-application:{{CF_SHORT_REVISION}}
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
{% endraw %}
{% endhighlight %}

In this case the image will get the replacement for your Codefresh account name and the tag will use the git revision. Metadata annotations are also defined with value from the branch name and the git repository name.

Notice that the variables are declared as  {% raw %}`{{MY_VARIABLE}}`{% endraw %} form and **NOT** {% raw %}`${{MY_VARIABLE}}`{% endraw %} which is how they are used inside the [Codefresh yaml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) definition.


## Creating custom manifest replacements

Apart from the built-in [Codefresh variables]({{site.baseurl}}/docs/pipelines/variables/) you can also create any variable on your own using the same replacement syntax.  

Here is an example manifest.

`Kubernetes manifest`
{% highlight yaml %}
{% raw %}
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: my-demo-app
  annotations:
    source-repository: {{CF_REPO_NAME}}
    branch: {{CF_BRANCH_TAG_NORMALIZED}}
    custom-label: {{MY_CUSTOM_LABEL}}
spec:
  replicas: {{MY_REPLICA_NUMBER}}
  template:
    metadata:
      labels:
        name: my-demo-app
        app: my-demo-app
    spec:
      containers:
      - name: my-demo-app
        image: r.cfcr.io/{{CF_ACCOUNT}}/my-sample-application:{{CF_SHORT_REVISION}}
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
      imagePullSecrets:
        - name: {{PULL_SECRET}}
{% endraw %}
{% endhighlight %}

Here you can see custom variables for an annotation, the replica number and the pull secret (in addition with the standard variables).
You can provide the values for your custom variables as environment parameters in the freestyle step.

`codefresh.yaml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-sample-application
    tag: '${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
  MyDeploy:
    title: K8s Deploy
    image: codefresh/cf-deploy-kubernetes:master
    commands:
      - /cf-deploy-kubernetes deployment.yml  
    environment:
      - KUBECONTEXT=k8s-demo@Google
      - KUBERNETES_NAMESPACE=my-namespace
      - MY_CUSTOM_LABEL=build-id-${{CF_BUILD_ID}} 
      - MY_REPLICA_NUMBER=3 
      - PULL_SECRET=codefresh-generated-r.cfcr.io-cfcr-my-namespace
{% endraw %}
{% endhighlight %}

In the environment section you can see the values for the custom variables. We set the replica number to 3, a full string for the pull secret and a concatenated string for the annotation.

## Using replacements in multiple manifests

By default, the deploy step will only do replacements in a single manifest. If you have multiple Kubernetes manifests you can merge all of them in a single file, or use multiple times the deploy commands like this:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
  MyDeploy:
    title: K8s Deploy
    image: codefresh/cf-deploy-kubernetes:master
    commands:
      - /cf-deploy-kubernetes deployment.yml
      - /cf-deploy-kubernetes service.yml 
      - /cf-deploy-kubernetes config-map.yml                 
    environment:
      - KUBECONTEXT=my-cluster-name
      - KUBERNETES_NAMESPACE=my-namespace
      - MY_REPLICA_NUMBER=3
      - KUBERNETES_DEPLOYMENT_TIMEOUT=360
{% endraw %}
{% endhighlight %}

Variable replacements will happen in all manifests before they are deployed.


## Using Unix command line tools for templates

It is also perfectly possible to use any Unix templating or text editing tool such as `sed` or `awk` to perform text replacements in Kubernetes manifests.

As a very simple example you could a replacement with the following [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) in your Codefresh pipeline. 

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  my_replacement:
    image: alpine
    commands:
    # replace every ${TAG} with current TAG variable value
    - sed -i 's/${TAG}/${{TAG}}/g' my-k8s-deployment.yaml  
{% endraw %}
{% endhighlight %}

## Related articles
[Connnecting to your cluster]({{site.baseurl}}/docs/deployments/kubernetes/add-kubernetes-cluster/)  
[Managing your cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Accessing a docker registry]({{site.baseurl}}/docs/deployments/access-docker-registry-from-kubernetes/)  
[Running custom kubectl commands]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/)  








 