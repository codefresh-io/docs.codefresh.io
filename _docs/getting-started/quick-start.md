---
title: "Quick start"
description: ""
group: getting-started
toc: true
---

Check out our quick start tutorial to get up and running in the Codefresh platform with hosted or hybrid runtimes.  

The tutorial is divided into these sections:
* Provisioning runtimes
* Creating and deploying an application
* Triggering and creating a Delivery Pipeline

Each section indicates the runtime environment it is relevant to.  

### Provision runtimes
Based on your deployment model, start by provisioning the hosted or hybrid runtime. Hosted and hybrid runtimes can co-exist with each other.

* Hosted runtimes: Hosted on a Codefresh cluster and managed by Codefresh. You need to provision your hosted runtime once for your account.
* Hybrid runtimes: Hosted on a customer cluster and managed by the customer. You can provision multiple hybrid runtimes in the same account.

{::nomarkdown}
<br>
{:/}

#### Hosted 
1. [Provision a hosted runtime]({{site.baseurl}}/docs/getting-started/quick-start/install-hosted)  
  Provision the hosted runtime with a single click, and complete the setup for your hosted environment.  

{::nomarkdown}
<br>
{:/}

#### Hybrid
1. [Prepare for hosted runtime installation]({{site.baseurl}}/docs/getting-started/quick-start/verify-requirements)  
  Verify your environment matches the requirements for installing Codefresh runtime.
1. [Install hybrid runtime]({{site.baseurl}}/docs/getting-started/quick-start/runtime)  
  Install the Codefresh runtime by downloading the CLI, installing the runtime, and validate successful installation in the UI

### Deploy an application

1. [Create resources for codefresh-guestbook application]({{site.baseurl}}/docs/getting-started/quick-start/create-app-specs)  
  Create rollout, service, and analysis template resources prior to creating the `codefresh-guestbook` application.
1. [Create the codefresh-guestbook application]({{site.baseurl}}/docs/getting-started/quick-start/create-app-ui)  
  Create the `codefresh-guestbook` application in the Codefresh UI.
1. [Update the image tag for codefresh-guestbook]({{site.baseurl}}/docs/getting-started/quick-start/create-app-ui)  
  Update the image for the `codefresh-guestbook` application to trigger a rollout.

### Trigger/create a Delivery Pipeline 
> Available for hybrid deployments.

1. [Trigger the Hello World example pipeline]({{site.baseurl}}/docs/getting-started/quick-start/hello-world)  
  Configure the Git event to trigger the demo pipeline. 
1. [Create a basic CI delivery pipeline]({{site.baseurl}}/docs/getting-started/quick-start/create-ci-pipeline)  
  Create a new CI delivery pipeline in Codefresh.

