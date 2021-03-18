---
title: "Progressive Delivery"
description: "Learn how to perform zero downtime deployments with Argo Rollouts"
group: ci-cd-guides
toc: true
---

Progressive Delivery is the practice of deploying an application in a gradual manner allowing for minimum downtime and easy rollbacks. There are several forms of progressive delivery such as blue/green, canary, a/b and feature flags.

Codefresh can easily integrate with [Argo Rollouts](https://argoproj.github.io/argo-rollouts/), a Kubernetes operator that natively covers progressive delivery deployment practices.

## Installing the Argo Rollouts operator to your cluster

To install Argo Rollouts follow the [installation instructions](https://argoproj.github.io/argo-rollouts/installation/). Essentially you need a terminal with `kubectl` access to your cluster.

```
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://raw.githubusercontent.com/argoproj/argo-rollouts/stable/manifests/install.yaml
```

You can optionally install the [CLI locally](https://github.com/argoproj/argo-rollouts/releases/latest) if you want to have more visibility in your deployments.


## Blue Green deployments 

Blue/Green deployments are one of the simplest ways to minimize deployment downtime. Blue/Green deployments are not specific to Kubernetes and can be used
even for traditional applications that reside on Virtual Machines.

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/how-blue-green-works.png" 
url="/images/guides/progressive-delivery/how-blue-green-works.png" 
alt="Blue/Green Deployments" 
caption="Blue/Green Deployments"
max-width="50%" 
%}

1. In the beginning all users of the application are routed to the current version (shown as blue color). A key point is that all traffic passes from a load balancer
1. A new version is deployed (shown as green color). This version does not receive any live traffic so all users are still served by the previous/stable version
1. Developers can test internally the new color and verify its correctness. If it is valid, traffic is switched to that new version
1. If everything goes well the old version is discarded completely. We are back to initial state (order of colors does not matter)

The major benefit of this pattern is that if at any point in time the new version has issues, all users can be switched back to the previous version (via the load balancer). Switching the load balancer is much faster than redeploying a new version, resulting in minimum disruption for existing users.

There are several variations of this pattern. In some cases the old color is never destroyed but keeps running in the background. You can also
keep even older versions online (maybe with a smaller footprint) allowing for easy switching to any previous application revision.

### Blue/Green Kubernetes Deployment with Argo Rollouts



Even though Argo Rollouts supports the basic blue/green pattern described in the previous section, it also offers a wealth of [customization options](https://argoproj.github.io/argo-rollouts/features/bluegreen/). One of the most important
additions is the ability to "test" the upcoming color by introducing a "preview" [Kubernetes service](https://kubernetes.io/docs/concepts/services-networking/service/), in addition to the service used for live traffic.
This preview service can be used by the team that performs the deployment to verify the new version before actually switching the traffic.


Here is the initial state of a deployment. The example uses 2 pods (shown as `xnsdx` and `jftql` in the diagram).

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/01_initial.png" 
url="/images/guides/progressive-delivery/01_initial.png" 
alt="Initial deployment. All services point to active version" 
caption="Initial deployment. All services point to active version"
max-width="90%" 
%}

There are two Kubernetes services . The `rollout-blue-gree-active` is capturing all live traffic from actual users of the application (internet traffic coming from `51.141.221.40`). There is also a secondary service 
called `rollout-bluegreen-preview`. Under normal circumstances it also points to the same live version.


Once a deployment starts a new "color" is created. In the example we have 2 new pods that represent the next version of the application to be deployed (shown as `9t67t` and `7vs2m`). 

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/02_two_colors.png" 
url="/images/guides/progressive-delivery/02_two_colors.png" 
alt="Deployment in progress. Active users see old version. Internal users preview new version" 
caption="Deployment in progress. Active users see old version. Internal users preview new version"
max-width="90%" 
%}

The important point here is the fact that the normal "active" service still points to the old version while the "preview" service points to the new pods. This means that all active users are still on the old/stable deployment while internal teams can use the "preview" service to test the new deployment. 

If everything goes well, the next version is promoted to be the active version.

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/03_switch_traffic.png" 
url="/images/guides/progressive-delivery/03_switch_traffic.png" 
alt="Next application version is promoted. All users see new version" 
caption="Next application version is promoted. All users see new version"
max-width="90%" 
%}

Here both services point to the new version. This is also the critical moment for all real users of the application, as they are now switched to use the new version of the application. The old version is still around but no traffic is sent to it.

Having the old version around is a great failsafe, as one can abort the deployment process and switch back all active users to the old deployment in the fastest way possible.

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/04_scale_down.png" 
url="/images/guides/progressive-delivery/04_scale_down.png" 
alt="Old application version is discarded. Only new version remains." 
caption="Old application version is discarded. Only new version remains."
max-width="90%" 
%}

After some time (the exact amount is [configurable in Argo Rollouts](https://argoproj.github.io/argo-rollouts/features/bluegreen/#scaledowndelayseconds)) the old version is scaled down completely (to preserve resources). We are now back 
to the same configuration as the initial state, and the next deployment will follow the same sequence of events.


### The example application

You can find an example application at [https://github.com/codefresh-contrib/argo-rollout-blue-green-sample-app](https://github.com/codefresh-contrib/argo-rollout-blue-green-sample-app) that also includes simple integration tests.

Notice that the first deployment of your application will NOT follow the blue/green deployment process as there is no "previous" color. So you need to deploy it at least
once.

```
git clone https://github.com/codefresh-contrib/argo-rollout-blue-green-sample-app.git
cd argo-rollout-blue-green-sample-app
kubectl create ns blue-green
kubectl apply -f ./blue-green-manual-approval -n blue-green
```

You can then monitor what argo rollouts is doing with the following command:

```
kubectl argo rollouts get rollout spring-sample-app-deployment --watch -n blue-green
```

### Blue/Green deployment with manual approval

A quick way to use blue/green deployments is by simply inserting [an approval step]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/) before the traffic switch step.
This will pause the pipeline and the developers or QA can test the next version on their own before any real users are redirected to it.

Here is an example pipeline:

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/approval-pipeline.png" 
url="/images/guides/progressive-delivery/approval-pipeline.png" 
alt="Manual approval before traffic switch" 
caption="Manual approval before traffic switch"
max-width="100%" 
%}

This pipeline does the following:

1. [Clones]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/) the source code of the application
1. [Builds]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/) a docker image
1. [Deploys]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/) the application by updating the Kubernetes manifests. Argo Rollouts sees the new manifest and creates a new "color" for the next version
1. The pipeline is paused and waits for an [approval/rejection]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/#getting-the-approval-result) by a human user. 
1. If the pipeline is approved the new color is promoted and becomes the new active version
1. If the pipeline is rejected the new color is discarded the all live users are not affected in any way

Here is the [pipeline definition]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/):

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - prepare
  - build
  - deploy 
  - finish   
steps:
  clone:
    type: "git-clone"
    stage: prepare
    description: "Cloning main repository..."
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: "${{CF_BRANCH}}"
  build_app_image:
    title: Building Docker Image
    type: build
    stage: build
    image_name: kostiscodefresh/argo-rollouts-blue-green-sample-app
    working_directory: "${{clone}}" 
    tags:
    - "latest"
    - '${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
  start_deployment:
    title: Deploying new color
    stage: deploy
    image: codefresh/cf-deploy-kubernetes:master
    working_directory: "${{clone}}"
    commands:
      - /cf-deploy-kubernetes ./blue-green-manual-approval/service.yaml 
      - /cf-deploy-kubernetes ./blue-green-manual-approval/service-preview.yaml   
      - /cf-deploy-kubernetes ./blue-green-manual-approval/rollout.yaml   
    environment:
      - KUBECONTEXT=mydemoAkscluster@BizSpark Plus
      - KUBERNETES_NAMESPACE=blue-green 
  wait_for_new_color:
    fail_fast: false
    type: pending-approval
    title: Is the new color ok?
    stage: deploy  
  promote_color:
    title: Switching traffic to new color
    stage: finish
    image: kostiscodefresh/kubectl-argo-rollouts:latest
    commands:
      - /app/kubectl-argo-rollouts-linux-amd64 promote spring-sample-app-deployment -n blue-green --context "mydemoAkscluster@BizSpark Plus"
    when:
      steps:
      - name: wait_for_new_color
        on:
        - approved 
  abort_deployment:
    title: Keeping the existing color
    stage: finish
    image: kostiscodefresh/kubectl-argo-rollouts:latest
    commands:
      - /app/kubectl-argo-rollouts-linux-amd64 argo rollouts undo spring-sample-app-deployment -n blue-green --context "mydemoAkscluster@BizSpark Plus" 
    when:
      steps:
      - name: wait_for_new_color
        on:
        - denied         
{% endraw %}
{% endhighlight %} 

Just before the approval you can optionally execute the Argo Rollouts CLI to see what is happening behind the scenes:

```
kubectl argo rollouts get rollout spring-sample-app-deployment --watch -n blue-green
```

It should show the new color come up (but not accepting any traffic).

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/monitor-argo-rollouts.png" 
url="/images/guides/progressive-delivery/monitor-argo-rollouts.png" 
alt="Argo Rollouts CLI" 
caption="Argo Rollouts CLI"
max-width="100%" 
%}

After the deployment has finished, the old pods will be destroyed after 30 seconds (this is the default value of Argo Rollouts).



### Blue/Green deployment with smoke tests

Using manual approval before promoting the new version is a great starting point. To truly achieve continuous deployment one should automate the testing process
and eliminate the human approval.

There are many approaches on testing a release and each organization will have a different set of "tests" that verify the next version of the software. Argo Rollouts
has [several integrations](https://argoproj.github.io/argo-rollouts/features/analysis/) either with metric providers or [simple Kubernetes jobs](https://argoproj.github.io/argo-rollouts/analysis/job/) that can run integration tests or collect metrics and decide if the next color should be promoted or not.

Another alternative is to simply execute [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) from within Codefresh. This is great if your integration tests need access to the source code or other
external services that are accessible only to Codefresh.

We can modify the previous pipeline to include automated smoke tests that are already part of the [example application](https://github.com/codefresh-contrib/argo-rollout-blue-green-sample-app/blob/main/src/test/java/sample/actuator/HealthIT.java).

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/smoke-tests-pipeline.png" 
url="/images/guides/progressive-delivery/smoke-tests-pipeline.png" 
alt="Smoke tests before traffic switch" 
caption="Smoke tests before traffic switch"
max-width="100%" 
%}

This pipeline does the following:

1. [Clones]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/) the source code of the application
1. [Builds]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/) a docker image
1. [Deploys]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/) the application by updating the Kubernetes manifests. Argo Rollouts sees the new manifest and creates a new "color" for the next version
1. Runs integration tests against the "preview" service created by Argo Rollouts. Live users are still on the previous/stable version of the application. 
1. If smoke tests pass the new color is promoted and becomes the new active version
1. If smoke tests fail the new color is discarded the all live users are not affected in any way

Here is the [pipeline definition]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/):

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - prepare
  - build
  - deploy 
  - finish   
steps:
  clone:
    type: "git-clone"
    stage: prepare
    description: "Cloning main repository..."
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: "${{CF_BRANCH}}"
  build_app_image:
    title: Building Docker Image
    type: build
    stage: build
    image_name: kostiscodefresh/argo-rollouts-blue-green-sample-app
    working_directory: "${{clone}}" 
    tags:
    - "latest"
    - '${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
  start_deployment:
    title: Deploying new color
    stage: deploy
    image: codefresh/cf-deploy-kubernetes:master
    working_directory: "${{clone}}"
    commands:
      - /cf-deploy-kubernetes ./blue-green-manual-approval/service.yaml 
      - /cf-deploy-kubernetes ./blue-green-manual-approval/service-preview.yaml   
      - /cf-deploy-kubernetes ./blue-green-manual-approval/rollout.yaml   
    environment:
      - KUBECONTEXT=mydemoAkscluster@BizSpark Plus
      - KUBERNETES_NAMESPACE=blue-green 
  run_integration_tests:
    title: Smoke tests
    stage: deploy
    image: maven:3.5.2-jdk-8-alpine
    working_directory: "${{clone}}" 
    fail_fast: false
    commands:
     - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository verify -Dserver.host=http://13.86.102.74  -Dserver.port=80
  promote_color:
    title: Switching traffic to new color
    stage: finish
    image: kostiscodefresh/kubectl-argo-rollouts:latest
    commands:
      - /app/kubectl-argo-rollouts-linux-amd64 promote spring-sample-app-deployment -n blue-green --context "mydemoAkscluster@BizSpark Plus"
    when:
      steps:
      - name: run_integration_tests
        on:
        - success 
  abort_deployment:
    title: Keeping the existing color
    stage: finish
    image: kostiscodefresh/kubectl-argo-rollouts:latest
    commands:
      - /app/kubectl-argo-rollouts-linux-amd64 argo rollouts undo spring-sample-app-deployment -n blue-green --context "mydemoAkscluster@BizSpark Plus" 
    when:
      steps:
      - name: run_integration_tests
        on:
        - failure         
{% endraw %}
{% endhighlight %} 

You can optionally execute the Argo Rollouts CLI to see what is happening behind the scenes:

```
kubectl argo rollouts get rollout spring-sample-app-deployment --watch -n blue-green
```

>Notice that for simplicity reasons we have hardcoded the loadbalancer for the preview service at 13.86.102.74. In a real application you would have a DNS name such as `preview.example.com` or use another `kubectl command` to fetch the endpoint of the loadbalancer dynamically. Also our integration tests assume that the application is already deployed once they run. If your application takes too much time to deploy, you need to make sure that it is up before the tests actually run


The end result is the a continuous deployment pipeline where all release candidates that don't pass tests never reach production.

## What to read next

* [Production/Staging deployments]({{site.baseurl}}/docs/ci-cd-guides/environment-deployments/)
* [GitOps Deployments]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
* [Pipelines for Microservices]({{site.baseurl}}/docs/ci-cd-guides/microservices/)





