---
title: "Build and Push to Docker registry"
description: ""
group: configure-ci-cd-pipeline
sub_group: pipelines-gui
redirect_from:
  - /docs/build-and-push-to-docker-registry/
  - /docs/pipelines-gui/build-and-push-to-docker-registry/
toc: true
---
Codefresh enables you to integrate with several Docker container registries. You can add new Docker registries on the **Integration page**. See [External Docker Registries]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/) to learn more about their configuration.

{{site.data.callout.callout_info}}
Fork this example to try it.  [https://github.com/codefreshdemo/demochat](https://github.com/codefreshdemo/demochat){:target="_blank"}
{{site.data.callout.end}}

{:start="1"}
1. Go to the **Pipelines** of the forked repository.

{:start="2"}
2. For `Repo's Dockerfile` specify the `Dockerfile.dev`

{:start="3"}
3. Select the registry from the added registries

{% include 
image.html 
lightbox="true" 
file="/images/e9db9ce-codefresh_build_push.png" 
url="/images/e9db9ce-codefresh_build_push.png"
alt="codefresh_build_push.png" 
max-width="40%"
caption="Build and Push to Dockerhub"
%}

{:start="4"}
4. Click __Save__ and __Build__

## Pushing to Docker Registry

{% include 
image.html 
lightbox="true" 
file="/images/0c5066b-codefresh_push_results.png" 
url="/images/0c5066b-codefresh_push_results.png"
alt="codefresh_build_push.png" 
max-width="40%"
caption="Pushing to Docker Registry"
%}

## What's next?
- [Build and Deploy to Kubernetes]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/pipelines-gui/continuous-delivery-gke-docker-swarm-amazon-ecs/)
