---
title: "Entity model"
description: ""
group: getting-started
toc: true
---

The Codefresh entity model is derived from these entity types:
* Codefresh account/user management entities 
* Argo ecosystem entities
* Workflow, runtime, and Git Source entities 
* Codefresh-specific entities such as pipelines, images, and applications



### Codefresh account/user management entities
The account/user management entity types includes entities that do not share a direct relationship to the Codefresh domain. These are enterprise-specific entities in standard SAAS solutions.

#### Account
Every user who signs in to Codefresh gets a private administrator user account.

If you received an invitation to Codefresh, instead of a private user account, you are added as a collaborator to the main account. Your permissions are based on those explicitly assigned to you.

The number of collaborators in an account is defined by the current plan associated with it.

#### User
A user in Codefresh is one who has completed the sign-up process, and can log in using authorized third-party systems such as:
* GitHub
* Bitbucket
* GitLab
* Azure
* Google

> If you configure SSO (Single Sign-On) for the account, the user can log in using only the configured SSO.

#### Billing
For details, please contact [Sales](mailto:sales@codefresh.io?subject=[Codefresh] Codefresh billing inquiry).

#### Single Sign-On (SSO)
Enterprise accounts can configure SSO. For details, see [Federated Single Sign-On (SSO) overview]({{site.baseurl}}/docs/administration/single-sign-on/).

#### Security configuration
Security settings include: 
* Inactivity timeout per collaborator account
* Domain restriction for invitations

### Argo ecosystem entities
Codefresh is built on top of the successful open source Argo project, and as such, supports all the native Argo project-entities.
You can apply every supported entity that exists in the open source projects to your Codefresh account.

### Workflow
Codefresh shows all the workflows executed with Argo Workflows.  
Workflows with pipelines display links to the pipelines. Users can terminate or retry a workflow, and view its logs.

### Runtime
A runtime represents an installation of Codefresh on the customer's K8s cluster, and contains all the components required to perform all tasks on the cluster.

Review [Codefresh architecture]({{site.baseurl}}/docs/getting-started/architecture/), and [runtime installation ]({{site.baseurl}}/docs/runtime/installation/).

### Git Source
A Git Source is a link to a Git repository that stores GitOps-controlled entities. You can create as many as Git Sources as you require.

To understand how to control Git Sources using GitOps, see [access control]({{site.baseurl}}/docs/administration/access-control/).

### Codefresh high-level entities
Codefresh creates high-level views that better represents, abstracts, and connects all the different entities in the Argo ecosystem.

#### CI/CD pipeline
A pipeline is a Codefresh-representation of Argo Events, comprising an Argo Events Sensor and Argo Events Triggers. Every trigger in a sensor becomes a different pipeline in Codefresh. The same sensor can be associated with multiple pipelines, if it has different trigger conditions.

A pipeline links to the following Argo Events entities:
* Sensor
* Event Source
* Workflow Template (or a cluster-level Workflow Template)

A pipeline also shows all the workflows created from the triggered event associated with that pipeline.

#### Image
An image represents a built artifact of a Docker image, reported to Codefresh using a dedicated interface.  

Users can use a predefined [Argo Workflow Template](https://codefresh.io/argohub/workflow-template/codefresh-csdp) to help with transferring the image information to Codefresh.

#### Application
A holistic view of all your Argo CD and Argo Rollouts deployments that link to the underlying artifacts and workflows.
