---
title: "ArgoCD Integration"
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

## Creating your ArgoCD integration in Codefresh

To configure the integration go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *GitOps*.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/integrations.png" 
  url="/images/integrations/argocd/integrations.png" 
  alt="Codefresh Account Integrations"
  caption="Codefresh Account Integrations"  
  max-width="100%"
 %}

Click the *Add GitOps Provider* button from the drop-down menu and follow the on-screen instructions.

To connect to an existing ArgoCD installation you need to use the [Codefresh CLI](https://codefresh-io.github.io/cli/). The Codefresh cli will install an agent in your cluster (in the same namespace that ArgoCD runs) that will handle all communication between ArgoCd and Codefresh.

You can [install the CLI](https://codefresh-io.github.io/cli/installation/) by following its documentation. Once it is installed you need to authenticate it with your Codefresh account [by creating an API token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions). Make sure that you choose all scopes if this is the first time you authenticate your CLI with Codefresh.

Once the CLI is authenticated, run the installation command:

```
codefresh install gitops argocd-agent
```

>Please note that this command must be run from a workstation that has a kubeconfig context pointing to the ArgoCD cluster. You can also run it from your cloud console if you install codefresh CLI there.

Answer the questions asked by the wizard. These include:

 * The name of the integration (user-defined)
 * Your ArgoCD URL, username and password (you can also use [an auth token](https://argoproj.github.io/argo-cd/operator-manual/user-management/) instead of password)
 * The context and namespace in the cluster where ArgoCD is installed
 * If you want to automatically import your ArgoCD applications to Codefresh

```
codefresh install gitops argocd-agent
This installer will guide you through the Codefresh ArgoCD installation agent to integrate your ArgoCD with Codefresh
? Select Kubernetes context mydemoAkscluster
? Codefresh integration name argocd
? Choose an authentication method Username and password
? Argo username admin
? Argo password *****************************

Testing requirements
--------------------
√ checking argocd credentials...
√ checking argocd projects accessibility...
√ checking argocd applications accessibility...
--------------------

? Select Git/GithubApp context (Please create a dedicated context for the agent to  avoid hitting the Github rate limits or use github app integration) github-1
? Select argocd sync behavior please Import all existing Argo applications to Codefresh
? Enable auto-sync of applications, this will import all existing applications and update Codefresh in the future Yes

Installation options summary:
    1. Kubernetes Context:
    2. Kubernetes Namespace: argocd
    3. Git Integration: github-1
    4. Codefresh Host: https://g.codefresh.io
    5. ArgoCD Host: https://52.154.209.119
    6. ArgoCD Username: admin
    7. ArgoCD Password: ******
    8. Enable auto-sync of applications: Yes
    9. HTTP proxy: none
    10. HTTPS proxy: none

Argo agent installation finished successfully to namespace "argocd"
Gitops view: "https://g.codefresh.io/gitops"
Documentation: "https://codefresh.io/docs/docs/ci-cd-guides/gitops-deployments/"
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

Visit your GitOps dashboard by clicking on *GitOps* from the left sidebar. The click the *Add Application* button at the top right.

If you already have an application setup in ArgoCD, you can enter its project and name and Codefresh will automatically retrieve all information from the ArgoCD instance.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/argocd-existing-app.png" 
  url="/images/integrations/argocd/argocd-existing-app.png" 
  alt="Using an existing ArgoCD application in a Codefresh environment"
  caption="Using an existing ArgoCD application in a Codefresh environment"  
  max-width="60%"
 %}

You can also create a brand-new application with the *provision* option. In this dialog you can enter the exact same details that [ArgoCD asks when creating a new application](https://argoproj.github.io/argo-cd/getting_started/#6-create-an-application-from-a-git-repository).

{% include image.html 
  lightbox="true" 
  file="/images/integrations/argocd/argocd-provision-app.png" 
  url="/images/integrations/argocd/argocd-provision-app.png" 
  alt="Creating a new ArgoCD application in a Codefresh environment"
  caption="Creating a new ArgoCD application in a Codefresh environment"  
  max-width="60%"
 %}

The options are:

* Name - User defined name of the Codefresh environment dashboard
* Project - A way to [group/secure applications](https://argoproj.github.io/argo-cd/user-guide/projects/). Choose default if you have only one project in ArgoCD.
* Application - name of application 
* Manual/automatic sync - If automatic when a git commit happens, a deployment will automatically take place.
* Use schema - Kubernetes manifests will be checked for correctness before deployed to the cluster
* source repository - Git repository that holds your Kubernetes manifests
* revision - Revision to be checked out when a deployment happens
* path - folder inside the Git repository that should be searched for manifests (if your Git repo has multiple applications). Use `./` if all your manifests are in the root folder.
* cluster - Kubernetes cluster when deployment will take place
* namespace - Kubernetes namespace where the application will be deployed to
* directory recurse - whether to check all folders in the Git repository for manifests in a recursive way.

For a sample application you can use the [https://github.com/codefresh-contrib/gitops-kubernetes-configuration](https://github.com/codefresh-contrib/gitops-kubernetes-configuration) repository (or even fork it on your own GitHub account first).

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

## Uninstall the gitops agent

You can uninstall the gitops agent with :

```
codefresh uninstall gitops argocd-agent
```

Note this will only uninstall the Codefresh agent. Your Argo CD installation
will remain unaffected.

## What to read next

- [GitOps deployments]({{site.baseurl}}/docs/ci-cd-guides/gitops-deployments/)
- [Environment Dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)
- [Codefresh CLI](https://codefresh-io.github.io/cli/) 
- [Kubernetes integration]({{site.baseurl}}/docs/integrations/kubernetes/) 


