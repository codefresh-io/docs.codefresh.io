---
layout: docs
title: "Deploy"
description: ""
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/deploy
toc: true
---
Deploy step can be used as a step to deploy build image to user's cluster

## Deploy to Kubernetes cluster hosted in Google cloud

{{site.data.callout.callout_info}}
##### Example
In this example will show you how to build image, push it to your registry and then deploy it to Kubernetes cluster 
{{site.data.callout.end}}

  `YAML`
{% highlight yaml %}
version: '1.0'
steps:
  
  build_step:
    title: building image
    type: build
    image_name: --image-name--
  
  step_name:
    type: push
    title: Step Title
    candidate:{% raw %}${{build_step}}{% endraw %}
    tag: {% raw %}${{CF_BRANCH}}{% endraw %}
    image_name: --image-name--
    registry: dockerhub
    
  deploy_to_k8:
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
    timeout: 150
    # Canidate is optional, if not spesified will redeploy the same image that spesified in the deployment file
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
{% endhighlight %}

## Related topics
- [Use kubectl as part of Freestyle step]({{ site.baseurl }}/docs/yaml-examples/examples/use-kubectl-as-part-of-freestyle-step/) 
- [Deploy to Kubernetes]({{ site.baseurl }}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-beta/) 
- [Install HELM chart using Codefresh pipeline]({{ site.baseurl }}/docs/new-helm/install-helm-chart-using-codefresh-pipeline/)
