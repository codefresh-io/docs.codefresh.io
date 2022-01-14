---
title: "Architecture"
description: ""
group: getting-started
toc: true
---

CSDP architecture is built on the successfull classic Codefresh platform and re-uses heavy parts of the existing classic platform.

That being said CSDP has a complete different architecture in many of its concepts.

CSDP is heavily focused around making an enterprise version on top of argo echo system components and doing that in a fully GitOps approach way and in the most possible secured way in the industry.

{% include
image.html
lightbox="true"
file="/images/getting-started/architecture/architecture.png"
url="/images/getting-started/architecture/architecture.png"
alt="Architecture"
caption="Architecture"
max-width="100%"
%}

## CSDP Platform
The CSDP platform is the SAAS side of the solution, which is in charge of securely storing and retreiving the user entities.

The CSDP platform does not have direct communication with the account runtime or organization system, no direct communication is made and it is assumed that all the user systems are behind firewall.

the CSDP platform also control authentication, user management, billing, enforcement of permissions model.

## CSDP Runtime
A CSDP runtime is a logical box that is installed on the customer k8s cluster.

It contains all enterprise codefresh distribution of the argo echo system and the Codefresh application proxy

The CSDP runtime also receives events and information from your organization systems in order to execute workflows.

the CSDP runtime is in charge of making sure that your runtime installation repo and git sources are properly connected and applying changes correctly back to the cluster.

## CSDP Application Proxy
The CSDP application proxy is in charge of accepting traffic from users and performing behind the firewall operations like
* committing changes to git repositories to make changes to GitOps controlled entities
* making operations against the argo echo system components for non GitOps controlled operations like terminating an argo workflow
* retrieving a list of all your git repositories to be visualized in the clients

The CSDP application proxy also communicates with the CSDP platform in order to get permission to perform required operations.

The CSDP application proxy performs operations on git repository by impersonating with the current user that is performing the operations
