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

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/01_initial.png" 
url="/images/guides/progressive-delivery/01_initial.png" 
alt="Blue/Green Deployments" 
caption="Blue/Green Deployments"
max-width="90%" 
%}

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/02_two_colors.png" 
url="/images/guides/progressive-delivery/02_two_colors.png" 
alt="Blue/Green Deployments" 
caption="Blue/Green Deployments"
max-width="90%" 
%}

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/03_switch_traffic.png" 
url="/images/guides/progressive-delivery/03_switch_traffic.png" 
alt="Blue/Green Deployments" 
caption="Blue/Green Deployments"
max-width="90%" 
%}

{% include image.html 
lightbox="true" 
file="/images/guides/progressive-delivery/04_scale_down.png" 
url="/images/guides/progressive-delivery/04_scale_down.png" 
alt="Blue/Green Deployments" 
caption="Blue/Green Deployments"
max-width="90%" 
%}


## Blue/Green deployment with manual approval

## Blue/Green deployment with smoke tests




## What to read next

* [Production/Staging deployments]({{site.baseurl}}/docs/ci-cd-guides/environment-deployments/)
* [GitOps Deployments]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
* [Pipelines for Microservices]({{site.baseurl}}/docs/ci-cd-guides/microservices/)





