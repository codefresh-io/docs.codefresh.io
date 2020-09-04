---
title: "ArgoCD integration"
description: "How to connect Codefresh to your ArgoCD endpoint"
group: integrations
toc: true
---


Before you can use Codefresh and ArgoCD together, you need to connect your ArgoCD installation in your Codefresh account. This way Codefresh will send and receive information from your ArgoCD instance. 

## Connecting to your ArgoCD cluster

To configure the integration go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *ArgoCD*.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/integrations.png" 
  url="/images/integrations/argocd/integrations.png" 
  alt="Codefresh Account Integrations"
  caption="Codefresh Account Integrations"  
  max-width="80%"
 %}

Click the *Add Server* button from the drop-down menu.

## Connecting to an existing ArgoCD installation

To connect to an existing ArgoCD installation you need to use the [Codefresh CLI](https://codefresh-io.github.io/cli/). The Codefresh cli will install an agent in your cluster (in the same namespace that ArgoCD runs) that will handle all communication between ArgoCd and Codefresh.

You can [install the CLI](https://codefresh-io.github.io/cli/installation/) by following its documentation. Once it is installed you need to authenticate it with your Codefresh account [by creating an API token]({{site.baseurl}}/docs/enterprise/behind-the-firewall/).





## What to read next


