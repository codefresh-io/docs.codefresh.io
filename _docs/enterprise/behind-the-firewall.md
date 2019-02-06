---
title: "Codefresh behind the firewall"
description: "How to run Codefresh pipelines in your own secure infrastructure"
group: enterprise
toc: true

---

As explained in the [installation page]({{site.baseurl}}/docs/enterprise/installation-security/) Codefresh offers 3 installation options SAAS, on-premise and Hybrid.
In this page we are going to describe the Hybrid option and all the advantages it offers.

## Running Codefresh in secure environments

Codefresh has an on-premise installation where the whole platform is installed in the customer premises. While
this solution is very effective as far as security is concerned, it places a lot of overhead on the customer as all updates
and improvements done in the platform must also be transferred to the customer premises.

The hybrid approach places only a Codefresh agent within customer premises while the UI (and management platform) stays in the Codefresh SAAS.

Here is the overall architecture:

{% include image.html
  lightbox="true"
  file="/images/enterprise/behind-the-firewall/architecture.png"
  url="/images/enterprise/behind-the-firewall/architecture.png"
  alt="Codefresh behind the firewall"
  caption="Codefresh behind the firewall"
  max-width="100%"
    %}   

The advantages for this scenario are multi-fold. Regarding platform maintenance:

 1. The heavy lifting for platform maintenance is still happening by Codefresh instead of the customer
 1. Updates to the UI, build engine, integrations etc are happening automatically without any customer involvement
 1. Actual builds are happening in the customer premises under fully controlled conditions
 1. The Codefresh agent is fully automated. It handles volume claims and build scheduling on its own within the Kubernetes cluster it is placed.

Regarding security of services:

 1. Pipelines can run in behind-the-firewall clusters with internal services
 1. Pipelines can use integrations (such as docker registries) that are private and secure
 1. Source code does not ever leaves the customer premises

Regarding firewall security:

 1. Communication between the Codefresh agent and Codefresh SAAS is uni-directional. The agent is polling the Codefresh platform for jobs. 
 1. Communication between the Codefresh agent and Codefresh SAAS is only outgoing. The Codefresh SAAS never connects to the customer network. No ports need to be open in the customer firewall for the agent to work.
 1. The Codefresh agent it fully open-source, so its code can by scrutinized by any stakeholder.



## Codefresh Agent installation

The Codefresh agent installer is available at [https://github.com/codefresh-io/venona](https://github.com/codefresh-io/venona). Venona is the name of the installer
that can be used to place the Codefresh agent in a Kubernetes cluster.

It is possible to install the Codefresh Agent in the same cluster that will run pipelines or in a different one.

### Prerequisites

Installation can happen from any workstation or laptop that has access (i.e. via `kubectl`) to the kubernetes cluster that will run Codefresh builds. 

