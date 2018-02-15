---
layout: docs
title: "Continuous Delivery - GKE, Docker SWARM, Amazon ECS"
description: ""
group: pipelines
sub_group: pipeline-examples
# hack/workaround for sub elements, because parent has permalink
permalink: /docs/pipelines/pipeline-examples/build-and-deploy-to-kubernetes/
redirect_from:
  - /docs/build-and-deploy-to-kubernetes
toc: true
---
Using Codefresh's Deploy Images you can easily deploy to

- [Google Container Engine (GKE) - Kubernetes]({{ site.baseurl }}/docs/deploy-your-containers/google-container-engine-gke-kubernetes/) {doc:kubernetes}
- [Docker SWARM]({{ site.baseurl }}/docs/deploy-your-containers/docker-swarm/)
- [Amazon ECS]({{ site.baseurl }}/docs/deploy-your-containers/amazon-ecs/)

## To add deploy step

{:start="1"}
1. Go to the **Pipelines** of the forked repository.

{:start="2"}
2. Configure the path to Dockerfile and build context.

{:start="3"}
3. Scroll to the `Deploy Script`

{{site.data.callout.callout_info}}
Use command below to deploy compose application to kubernetes. Make sure you change the path of 'deployment.yml' to the path in your repository.
{{site.data.callout.end}}

  `deploy command`
{% highlight bash %}
/cf-deploy-kubernetes deployment.yml
{% endhighlight %}

{% include 
image.html 
lightbox="true" 
file="/images/2c403af-codefresh_deploy_to_k8.png" 
url="/images/2c403af-codefresh_deploy_to_k8.png"
alt="codefresh_deploy_to_k8.png" 
max-width="40%"
caption="Deploy to K8"
%}

{:start="4"}
4. Provide the required Environment Variables:
- `KUBERNETES_USER` - The user for the Kubernetes cluster.
- `KUBERNETES_PASSWORD` - The password for the Kubernetes cluster.
- `KUBERNETES_SERVER` - The server (HTTPS endpoint) of the Kubernetes cluster's API

{% include 
image.html 
lightbox="true" 
file="/images/12a7122-codefresh_env_vars.png" 
url="/images/12a7122-codefresh_env_vars.png"
alt="codefresh_env_vars.png" 
max-width="40%"
caption="Environment Variables"
%}

{{site.data.callout.callout_info}}
Read more about how to obtain the kubernetes credentials and using the codefresh deploy here: [https://docs.codefresh.io/docs/kubernetes](https://docs.codefresh.io/docs/kubernetes)
{{site.data.callout.end}}

{:start="5"}
5. Click __Save__ and __Build__

## What's next?
- [Define your build flow using the Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
- [Invite your team members]({{ site.baseurl }}/docs/invite-your-team-member) 
- [Learn by example using NodeJS](doc:nodejs) 
- [Learn by example using Python](doc:python)
- [Learn by example using Java](doc:java)
