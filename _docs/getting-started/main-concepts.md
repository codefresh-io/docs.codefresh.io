---
title: "Main concepts"
description: ""
group: getting-started
toc: true
---

### Built on top of the open source Argo
Codefresh maintains a [conformed](https://github.com/argoproj/argo-conformance-program) fork of the following Argo components, providing an enterprise-supported version of them:
* [Argo CD](https://github.com/argoproj/argo-cd): Declarative continuous deployment for Kubernetes.
* [Argo Rollouts](https://argoproj.github.io/argo-rollouts/): Progressive Delivery for Kubernetes.
* [Argo Workflows](https://github.com/argoproj/argo-workflows): Workflow engine for Kubernetes.
* [Argo Events](https://github.com/argoproj/argo-events): Event-driven workflow automation framework.

For details, see [Codefresh architecture]({{site.baseurl}}/docs/getting-started/architecture/).

### Hybrid behind firewall model
Codefresh performs an installation, called a Runtime, on the user's K8s cluster. The Runtime contains all required components for the Codefresh experience.  

For details, see [Codefresh architecture]({{site.baseurl}}/docs/getting-started/architecture/).

### GitOps native approach
Codefresh is built entirely on the heavily-adopted concept of GitOps. Read the detailed explanation on our [GitOps approach]({{site.baseurl}}/docs/getting-started/gitops/). <br>
Codefresh leverages Argo components (Argo CD and Argo Events), to have the entire desired state applied from Git to the user's K8s cluster, and also reported back to Codefresh platform. 

### Every state change operation in Codefresh is made via Git
Codefresh has taken the GitOps approach a step forward by making our entire entity model fully controlled by GitOps via Codefresh, meaning that the entire state of your account is maintained in Git. For details, see [entity model]({{site.baseurl}}/docs/getting-started/entity-model/).  

Codefresh provides a full front-end experience powered by a strong API layer (GraphQL), and every state change (via GraphQL mutation) actually performs a commit on behalf of the user to Git.

### Audit log derived from Git changelog
Codefresh has built its sophisticated but simple audit log on all operations to the system, for both the Git change and the log of API calls that have been made to the system.  
For details, see [audit]({{site.baseurl}}/docs/administration/audit/).

### Access control derived from Git permissions
Codefresh has built its sophisticated but simple access control model on top of the existing Git operations that are defined externally to the system. <br>
For details, see [access control]({{site.baseurl}}/docs/administration/access-control/).
