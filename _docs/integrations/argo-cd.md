---
title: "ArgoCD integration"
description: "How to connect Codefresh to your ArgoCD endpoint"
group: integrations
toc: true
---


Before you can use Codefresh and ArgoCD together, you need to connect your ArgoCD installation in your Codefresh account. This way Codefresh will send and receive information from your ArgoCD instance. 

{% include image.html 
  lightbox="true" 
  file="/images/guides/gitops/gitops-environment.png" 
  url="/images/guides/gitops/gitops-environment.png" 
  alt="GitOps deployments with Codefresh"
  caption="GitOps deployments with Codefresh"  
  max-width="100%"
 %}

## Connecting to your ArgoCD cluster

To configure the integration go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *ArgoCD*.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/integrations.png" 
  url="/images/integrations/argocd/integrations.png" 
  alt="Codefresh Account Integrations"
  caption="Codefresh Account Integrations"  
  max-width="100%"
 %}

Click the *Add Server* button from the drop-down menu.

## Connecting to an existing ArgoCD installation

To connect to an existing ArgoCD installation you need to use the [Codefresh CLI](https://codefresh-io.github.io/cli/). The Codefresh cli will install an agent in your cluster (in the same namespace that ArgoCD runs) that will handle all communication between ArgoCd and Codefresh.

You can [install the CLI](https://codefresh-io.github.io/cli/installation/) by following its documentation. Once it is installed you need to authenticate it with your Codefresh account [by creating an API token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions). Make sure that you choose all scopes if this is the first time you authenticate your CLI with Codefresh.

Once the CLI is authenticated, run the installation command:

```
codefresh install argocd-agent
```

>Please note that this command must be run from a workstation that has a kubeconfig context pointing to the ArgoCD cluster. You can also run it from your cloud console if you install codefresh CLI there.

Answer the questions asked by the wizard. These include:

 * The name of the integration (user-defined)
 * Your ArgoCD URL, username and password
 * The context and namespace in the cluster where ArgoCD is installed

```
kostis@cloudshell$ ./codefresh install argocd-agent
? Codefresh integration name argocd
? Argo host, example: https://example.com https://36.87.134.111/
? Argo username admin
? Argo password ******************************
Integration updated
? Select Kubernetes context gke_codefresh-support_us-central1-c_kostis-argo
? Select Kubernetes namespace argocd
argocd-agent "ClusterRole" already exists
argocd-agent "ClusterRoleBinding" already exists
argocd-agent "Deployment" already exists
argocd-agent "ServiceAccount" already exists
Argo agent installation finished successfully to namespace "argocd"
kostis@cloudshell$
```

Once the installation is complete, you should see the agent health status:

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/argocd-agent-health.png" 
  url="/images/integrations/argocd/argocd-agent-health.png" 
  alt="ArgoCD agent health"
  caption="ArgoCD agent health"  
  max-width="100%"
 %}



This concludes the basic integration. You can repeat the procedure for different ArgoCD installations by choosing a different 
name for the integration.

## Creating ArgoCD applications

In addition to the existing [Kubernetes/Helm environments]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/), you can now create ArgoCD applications via the Codefresh UI.

Visit your GitOps dashboard by clicking on *GitOps* from the left sidebar. The click the *Add App* button at the top right.

If you already have an application setup in ArgoCD, you can enter its project and name and Codefresh will automatically retrieve all information from the ArgoCD instance.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/argocd-existing-app.png" 
  url="/images/integrations/argocd/argocd-existing-app.png" 
  alt="Using an existing ArgoCD application in a Codefresh environment"
  caption="Using an existing ArgoCD application in a Codefresh environment"  
  max-width="60%"
 %}

You can also create a brand-new application with the *provision* option. In this dialog you can enter the exact same details that ArgoCD asks when creating a new application.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/argocd-provision-app.png" 
  url="/images/integrations/argocd/argocd-provision-app.png" 
  alt="Creating a new ArgoCD application in a Codefresh environment"
  caption="Creating a new ArgoCD application in a Codefresh environment"  
  max-width="60%"
 %}

Codefresh will communicate with ArgoCD via its API and pass all the relevant details.

The end result is a new entry for your ArgoCD application will now appear in the dashboard along with the sync status.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/argocd-environment.png" 
  url="/images/integrations/argocd/argocd-environment.png" 
  alt="ArgoCD environment status"
  caption="ArgoCD environment status"  
  max-width="80%"
 %}

To learn about the full GitOps support in Codefresh, see our [GitOps deployment guide]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/).

## What to read next

- [GitOps deployments]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
- [Environment Dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)
- [Codefresh CLI](https://codefresh-io.github.io/cli/) 
- [Kubernetes integration]({{site.baseurl}}/docs/integrations/kubernetes/) 


