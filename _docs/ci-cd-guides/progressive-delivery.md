---
title: "Progressive Delivery"
description: "Learn how to perform zero downtime deployments with Argo Rollouts"
group: ci-cd-guides
toc: true
---

Progressive Delivery is the practice of deploying an application in a gradual manner allowing for minimum downtime and easy rollbacks. There are several forms of progressive delivery such as blue/green, canary, a/b and feature flags.


## How Blue Green deployments work

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

## Blue/Green Kubernetes Deployment with Argo Rollouts

Codefresh can easily integrate with [Argo Rollouts](https://argoproj.github.io/argo-rollouts/), a Kubernetes operator that natively covers blue/green deployments.

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


## Blue/Green deployment with manual approval

## Blue/Green deployment with smoke tests




## What to read next

* [Production/Staging deployments]({{site.baseurl}}/docs/ci-cd-guides/environment-deployments/)
* [GitOps Deployments]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
* [Pipelines for Microservices]({{site.baseurl}}/docs/ci-cd-guides/microservices/)





