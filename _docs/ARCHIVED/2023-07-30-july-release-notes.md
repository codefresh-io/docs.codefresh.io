---
title: "Release Notes: July 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### GitOps: Helm installation for Hybrid GitOps
We are happy to announce that Helm-based installation for GitOps Runtimes is in GA (General Availability), and is now the default installation method for GitOps Runtimes.  

For customers with existing CLI-based Runtimes, we are preparing migration instructions to seamlessly switch to the new Helm setup. The legacy CLI-based installation for Hybrid GitOps Runtimes will be deprecated in the coming months.

For details, see [Hybrid GitOps Helm installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

### Multi-account sync for Okta with OIDC

Check out the latest enhancements to the integration settings for Okta with OIDC.

**Multi-account sync**  
Following the successful implementation of just-in-time provisioning support for Okta, we are taking it a step further by introducing multi-account sync for OIDC-Okta. This feature enables you to synchronize multiple Codefresh accounts in Okta simultaneously in Codefresh, ensuring a seamless SSO setup for enterprise customers.

With multi-account sync, you can easily select additional Codefresh accounts to sync with your Okta OIDC account in Codefresh. Codefresh validates admin privileges and access for each of the selected accounts, guaranteeing secure and reliable authentication. 

You have the flexibility to sync users in multiple ways: through the UI's `Auto-group sync`, performing on-demand synchronization through the CLI, or integrating sync into a Codefresh pipeline using the CLI synchronize command.

**Delete users removed during sync**  
We added an option to further streamline Okta SSO account and user management in Codefresh. You can now easily remove individual users who are deactivated in Okta from both the current account in Codefresh and any additional accounts defined in your current account.  
The Users list is updated accordingly, ensuring that both the Teams and Users lists are always organized.


 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/july23/rel-notes-july23-okta-new-settings.png" 
url="/images/whats-new/july23/rel-notes-july23-okta-new-settings.png" 
alt="Multi-account sync and remove deactivated users for Okta OIDC" 
caption="Multi-account sync and remove deactivated users for Okta OIDC" 
max-width="50%" 
%}

For details, see [Configure OIDC SSO settings for Okta in Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-okta/#how-to). 


### Pipelines: `hashtags` mapping for Gerrit
Continuing to extend our support for Gerrit with our latest update. In place of `change hashtags` in Gerrit, you can use Codefresh's `CF_PULL_REQUEST_LABELS` system variable.

For details, see [System variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/#system-variables).


### Global Search & Navigation for Argo CD applications
As part of our commitment to constantly empower our users through Global Search & Navigation, here's our latest enhancement: Search Argo CD Applications.  
Easily find the application you need by name, or explore the Applications category to find what you need. 

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/july23/rel-notes-july-23-search-apps.png" 
url="/images/whats-new/july23/rel-notes-july-23-search-apps.png" 
alt="Applications search in Global Search & Navigation" 
caption="Applications search in Global Search & Navigation" 
max-width="60%" 
%}

Stay tuned for more exciting updates!


### GitOps on-premises: MTLS for MongoDB and Redis

On-premises for GitOps supports MTLS (Mutual TLS) for MongoDB and Redis. This enhancement provides enhanced security and encryption capabilities for communication with Codefresh in on-premises environments. Administrators can customize the level of security according to their requirements. 

For details, see [External MongoDB with MTLS](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#external-mongodb-with-mtls){:target="\_blank"} and [External Redis with MTLS](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#external-redis-with-mtls){:target="\_blank"}.



## Bug fixes

### General
* Auto-sync option not available for Azure SSO.
* For an ECR integration, clicking **Test Connection** or **Commit** results in progress animations persisting instead of creating the integration. 


### Pipelines
* Invalid chart error on trying to access Codefresh Helm repository.
* Builds terminate unexpectedly without clear errors or from prolonged inactivity.
* DIND with service containers ignore IRSA account (IAM Roles for Service Accounts) set for hybrid runtime.
* Commit message passed through the system variable `CF_COMMIT_MESSAGE` is truncated and does not include the full content.
* Delay in start times for child pipelines triggered by parent pipeline including a large set of `codefresh-run` steps set to run in parallel.
* In Pipelines page, the context-menu for the last pipeline in the list does not display all available actions.
* Builds terminated because of pipeline policy leave running `dind` pods on runtime cluster. 
* In Pipelines dashboard (Home Dashboard), for a renamed pipeline, the Pipeline filter displays the original name instead of the new name. 


### GitOps
* **Save** button remains disabled when modifying fields for an existing Git Source.
* Applications show **Unknown** status in Codefresh, while they are **Healthy** in the Argo CD UI. 
* Commits to a second application in the same repository as another application, terminates the on-going rollout for the first application. 
* (On-premises) Unable to create Git Sources both from the Codefesh CLI and UI with Bitbucket Server.
* (On-premises) For Azure, auto-sync operations removes groups that were previously synced.



