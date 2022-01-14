---
title: "Entity model"
description: ""
group: getting-started
toc: true
---

CSDP entity model can be splited into 4 different categories

## CSDP account/user management
This category consists of all entities that you would normally find in a normal SAAS solution and does not have a direct relation to the domain of codefresh.

### Account
Every users that signs to CSDP will get an account that he will become its admin

In case you were invited to CSDP you will not have a private account rahter you will be added as a collaborator to the invited account and will get the permission that the invitee has assigned to you

An account can have a limited amount of collaborators according to the current plan that will be attached to it.

### User
A user of CSDP is a person that has performed the sign up process.

A user can login to the system using the various third party authorized systems
* github
* bitbucket
* gitlab
* azure
* google

It is possible to configure SSO on your account which in that case users will only be allowed to login using the configured SSO

### Billing
CSDP has yet to release an official pricing model. please contact our [Sales](mailto:sales@codefresh.io?subject=[CSDP] CSDP billing inquiry) for inquiry.

### single sign on
Enterprise accounts can configure SSO

### Security configuration
Security configurations that are possible to be applied to your account
* user session duration
* domain restriction for invited collaborators

## Argo echo system entities
CSDP is built on top of the successful open source argo project and as such supports all the native argo projects entities.
Every supported entity that exists in the open source projects can be applied to your CSDP account.

### Workflow
CSDP shows all the workflows that have been exexcuted on argo workflow.

In case that the workflow is associated with a pipeline that link will be shown, in cases where there is no link back to a pipeline, the workflow will be shown in it's native way

A full graph of the workflow is also represented and a user can perform all possible operations on the workflow (terminate, retry) and view its logs.

## Runtime
A runtime represents an installation of CSDP on a customer k8s cluster.

A runtime contains all the required components in order to perform all required tasks on the user end k8s.

Checkout the [architectural]({{site.baseurl}}/docs/getting-started/architecture/) diagram and overview for deeper explanation of the runtime architecture.

Checkout the full [runtime installation documentation]({{site.baseurl}}/docs/runtime/installation/) of the runtime 

### Git source
A git source is a link to a git repository in which you are intended to store all your GitOps controlled entities of CSDP.

You can create as many as required git sources.

Checkout the full [access controll documentation ]({{site.baseurl}}/docs/administration/access-control/) to better understand what exactly can be controlled via the GitOps approach/

## CSDP high level entities
CSDP creates high level views that better represents, abstracts and connects all the different argo echo system entities

### CI/CD pipeline
A pipeline is a break down of an argo events sensor triggers.

Each trigger in a sensor will become a pipeline.

The pipeline has a link to the following entities:
* argo events sensor
* argo events eventsource
* argo workflow workflowTemplates (or a cluster workflowTemplate)

A pipeline will also be able to show all the workflow that have been created due to the triggered event that is attached with the pipeline.

### Image
Image represents a docker image built artifact that is reported to CSDP using a dedicated interface that the CSDP platform provides

A user can easily use a premade [argo workflow template](https://codefresh.io/argohub/workflow-template/codefresh-csdp) that helps with transffering the image information back to CSDP.

### Application
A holistic view that shows all your argo cd and rollouts deployments that links back to the underlying artifacts and workflows.
