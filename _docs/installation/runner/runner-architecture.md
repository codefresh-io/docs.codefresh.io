---
title: "Runner architecture"
description: "Codefresh Runner components"
group: installation
toc: true
---

This article focuses on the architecture of the Codefresh Runner.


## Runner architecture

The diagram shows a high-level view of the Codefresh Runner and its components.


{% include
image.html
lightbox="true"
file="/images/runtime/architecture/arch-runner.png"
url="/images/runtime/architecture/arch-runner.png"
alt="Codefresh Runner architecture"
caption="Codefresh Runner architecture"
max-width="80%"
%}


The Codefresh Runner includes two main components:

### Runner Agent
The Codefresh Runner, often referred to as the Agent, is responsible for executing and managing tasks within the Runtime Environment. 
Main functions include:

Executing and terminating pipeline builds.
Creating and deleting necessary resources, such as engine and DinD pods, as well as DinD PVCs.

### Runtime Environment

The Runtime Environment is attached to the Codefresh Runner, and includes the following components:

**Volume Provisioner**  
The Volume Provisioner is the central component that controls all Codefresh services, and performs the following functions:
* Acts as a Persistent Volume (PV) Kubernetes controller 
* Manages DinD Persistent Volume Claim s(PVCs)
* Optimizes Docker caching volumes to enhance cache utilization for Codefresh builds


**Volume Cleaners**  
The Volume Cleaners are responsible for PV management based on the environment setup:
* LV-Monitor: Installed when local volumes are used to allocate disk space for PVs on the cluster nodes.
* DinD Volume Cleanup: Installed instead of the LV Monitor when local volumes are not used, to delete PVs according to retention policies. 


**Cluster Monitor**  
Optional. When installed, provides visibility on cluster resources in Codefresh, through the Kubernetes Services dashboard.


**App-Proxy**  
Another optional component, the App-Proxy serves as an extension to the Codefresh platform. Its purpose is to enable remote operations, such as displaying Git repositories for Git providers behind firewalls and creating webhooks, while maintaining security.


<!--- ### Clients

Codefresh offers a [public API]({{site.baseurl}}/docs/integrations/codefresh-api/), consumed both by the Web user interface and the [Codefresh CLI](https://codefresh-io.github.io/cli/){:target="\_blank"}. The API is also available for any custom integration with external tools or services.
-->




## Related articles  
[Runner installation for pipelines]({{site.baseurl}}/docs/installation/runner/install-codefresh-runner/)  
[GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/)

 
