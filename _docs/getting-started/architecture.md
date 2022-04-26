---
title: "Architecture"
description: ""
group: getting-started
toc: true
---

The Codefresh solution is built around an enterprise version of the Argo ecosystem, that is fully GitOps-compliant, with industry-standard security.


{% include
image.html
lightbox="true"
file="/images/getting-started/architecture/simple-architecture.png"
url="/images/getting-started/architecture/simple-architecture.png"
alt="Codefresh architecture"
caption="Codefresh architecture"
max-width="100%"
%}

### Codefresh platform
The Codefresh platform is the SAAS component in the Codefresh solution. Located outside the firewall, it does not communicate directly with the other Codefresh components such as the Codefresh runtime, the organization system, and user systems behind the firewall.  

The platform:
* Securely stores and retrieves user entities
* Enforces the permissions model
* Controls authentication, user management, and billing

### Codefresh runtime
The Codefresh runtime is a logical box installed on the customer's K8s cluster. It houses the enterprise distribution of the Argo ecosystem and the Codefresh application proxy.  

The runtime:
* Ensures that the installation repository and the Git Sources are always in sync, and applies Git changes back to the cluster
* Receives events and information from the user's organization systems to execute workflows

### Codefresh application proxy
The Codefresh application proxy interfaces between users and organization systems behind the enterprise firewall. 

The application proxy:
* Gets permissions from the Codefresh platform for the required operations  
* Impersonates current user to perform operations
* Commits changes to Git repositories to make changes to GitOps-controlled entities
* Performs state-change operations to non-GitOps-controlled entities, for example, to Argo ecosystem components, such as terminating an Argo Workflow
* Retrieves a list of Git repositories for visualization in Codefresh client
