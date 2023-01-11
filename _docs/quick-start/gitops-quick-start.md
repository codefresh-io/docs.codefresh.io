---
title: "GitOps quick starts"
description: ""
group: quick-start
toc: true
---

Check out our GitOps quick starts to get up and running with GitOps in Codefresh.  

The quick start guides you through:
* Provisioning runtimes
* Creating and deploying an application


## Provision runtimes
Based on your deployment model, start by provisioning the hosted or hybrid runtime. Hosted and hybrid runtimes can co-exist with each other.


### Hosted 
Hosted runtimes are hosted on a Codefresh cluster and managed by Codefresh. You need to provision your hosted runtime once for your account.  

1. [Provision a hosted runtime]({{site.baseurl}}/docs/quick-start/gitops-quickstart/install-hosted)  
  Provision the hosted runtime with a single click, and complete the setup for your hosted environment.  

{::nomarkdown}
<br>
{:/}

### Hybrid
Hybrid runtimes are hosted on a customer cluster and managed by the customer. You can provision multiple hybrid runtimes in the same account.  

1. [Prepare for hybrid runtime installation]({{site.baseurl}}/docs/quick-start/gitops-quickstart/verify-requirements)  
  Verify your environment matches the requirements for installing Codefresh runtime.
1. [Install hybrid runtime]({{site.baseurl}}/docs/quick-start/gitops-quickstart/runtime)  
  Install the Codefresh runtime by downloading the CLI, installing the runtime, and validate successful installation in the UI

## Deploy an application

1. [Create an application]({{site.baseurl}}/docs/quick-start/gitops-quickstart/create-app-ui)  
  Create the `codefresh-guestbook` application in the Codefresh UI.
1. [Create and commit resources for application]({{site.baseurl}}/docs/quick-start/gitops-quickstart/create-app-specs)  
  Create rollout and service resources, and commit these resources to deploy the `codefresh-guestbook` application.
1. [Update the image tag for application]({{site.baseurl}}/docs/quick-start/gitops-quickstart/create-rollout)  
  Update the image for the `codefresh-guestbook` application to trigger a rollout.

<!--- ### Trigger/create a Delivery Pipeline 
> Available for hybrid deployments.

1. [Trigger the Hello World example pipeline]({{site.baseurl}}/docs/getting-started/quick-start/hello-world)  
  Configure the Git event to trigger the demo pipeline. 
1. [Create a basic CI delivery pipeline]({{site.baseurl}}/docs/getting-started/quick-start/create-ci-pipeline)  
  Create a new CI delivery pipeline in Codefresh. -->

