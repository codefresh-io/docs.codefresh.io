---
title: "GitOps quick starts"
description: ""
group: quick-start
toc: true
---

Check out our GitOps quick starts to get up and running with GitOps in Codefresh.  

The quick start guides you through:
* Provisioning GitOps Runtimes
* Creating and deploying an application


## Provision GitOps Runtimes
Based on your deployment model, start by provisioning the Hosted or Hybrid GitOps Runtime. Hosted and Hybrid GitOps Runtimes can co-exist with each other.


### Hosted 
Hosted GitOps Runtimes are hosted on a Codefresh cluster and managed by Codefresh. You need to provision your Hosted Runtime once for your account.  

1. [Provision a Hosted GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/install-hosted)  
  Provision the Hosted GitOps Runtime with a single click, and complete the setup for your hosted environment.  

{::nomarkdown}
<br>
{:/}

### Hybrid
Hybrid GitOps Runtimes are hosted on a customer cluster and managed by the customer. You can provision multiple Hybrid GitOps Runtimes in the same account.  

1. [Prepare for Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/quick-start/gitops-quick-start/verify-requirements)  
  Verify your environment matches the requirements for installing a Hybrid GitOps Runtime.
1. [Install the Hybrid GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime)  
  Install the Hybrid GitOps Runtime through Helm.

## Create a Codefresh account
[Create an account in Codefresh]({{site.baseurl}}/docs/quick-start/create-codefresh-account/) in which to create pipelines.


## Deploy an application

1. [Create an application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-ui)  
  Create the `codefresh-guestbook` application in the Codefresh UI.
1. [Create and commit resources for application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-specs)  
  Create rollout and service resources, and commit these resources to deploy the `codefresh-guestbook` application.
1. [Update the image tag for application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-rollout)  
  Update the image for the `codefresh-guestbook` application to trigger a rollout.


