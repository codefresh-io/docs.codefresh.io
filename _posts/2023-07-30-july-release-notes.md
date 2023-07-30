---
title: "Release Notes: July 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### GitOps: Helm installation for Hybrid GitOps
We are happy to announce the completion of our transition to Helm for GitOps Runtimes. Helm is now the default installation method.

The legacy CLI-based installation for Hybrid GitOps will be permanently deprecated in the coming month.

For customers with existing CLI-based Runtimes, we are preparing migration instructions to seamlessly switch to the new Helm setup. 

And, we have a much-requested installation enhancement on the horizon: Side-by-Side installation featuring Native Argo CD & GitOps. 
Stay tuned for updates!

To recap, see [Hybrid GitOps Helm installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

### Multi-account sync for Okta with OIDC

**Multi-account sync**

Following the successful implementation of just-in-time provisioning support for Okta, we are taking it a step further by introducing multi-account sync for OIDC-Okta. This feature enables you to synchronize multiple Codefresh accounts in Okta simultaneously in Codefresh, ensuring a seamless SSO setup for enterprise customers.

With multi-account sync, you can easily select additional Codefresh accounts to sync with your Okta OIDC account in Codefresh. Codefresh validates admin privileges and access for each of the selected accounts, guaranteeing secure and reliable authentication. 

You have the flexibility to sync users in multiple ways: through the UI's `Auto-group sync`, performing on-demand synchronization through the CLI, or integrating sync into a Codefresh pipeline using the CLI synchronize command.



**Delete users removed during sync**

We added an option to further streamline Okta SSO account and user management in Codefresh. You can now can easily remove individual users who are deactivated in Okta, not only from the current account but from additional accounts you have defined in your current account.  
The Users list is updated, keeping both the Teams and Users lists always organized.

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/july23/rel-notes-jul23-okta-new-settings.png" 
url="/images/whats-new/july23/rel-notes-jul23-okta-new-settings.png" 
alt="Multi-account sync and remove deactivated users for Okta OIDC" 
caption="Multi-account sync and remove deactivated users for Okta OIDC" 
max-width="60%" 
%}

For details, see [Configure OIDC SSO settings for Okta in Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-okta/#how-to). 


### Pipelines: `hastags` mapping for Gerrit
Continuing to extend our support for Gerrit with our latest update. In place of `change hashtags` in Gerrit, you can use Codefresh's `CF_PULL_REQUEST_LABELS` system variable.

For details, see [System variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/#system-variables).


### Global Search & Navigation for GitOps applications
As part of our commitment to constantly empower our users through Global Search & Navigation, here's our latest enhancement: Search GitOps Applications.  
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

On-premises for GitOps supports MTLS (Mutual TLS) for Redis and MongoDB. This enhancement provides enhanced security and encryption capabilities for Redis data communication with Codefresh in on-premises environments. Administrators can customize the level of security according to their requirements. 

For details, see [External MongoDB with MTLS](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#external-mongodb-with-mtls){:target="\_blank"} and [External Redis with MTLS](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#external-redis-with-mtls){:target="\_blank"}.



## Bug fixes

### General

### Pipelines
* `codefresh-run` step results in failed pipelines
* Running an OSX (Mac OS X) build in pipeline remains in initialization phase.
Clicking Save in Shared Configuration Settings does not work. (CR-19546 - need to verify if this is customer facing? shows regression)???
* Commit message passed through the system variable `CF_COMMIT_MESSAGE` is truncated and does not include the full content.
* Delay in start times for child pipelines triggered by parent pipeline including a large set of `codefresh-run` steps set to run in parallel.
Unable to save new integration account for Okta (CR-19667 - this is for Classic so should it be documented for projectone?)??
* In Pipelines page, the context-menu for the last pipeline in the list does not display all available actions.
* Builds terminated by pipeline policy leave running `dind` pods on runtime cluster. (CR-11485)

### GitOps

* **Save** button remains disabled when modifying fields for an existing Git Source.
* Applications show **Unknown** status in Codefresh, while they are **Healthy** in the Argo CD UI. (CR-19442)
* New release triggered for an application with an on-going rollout, terminates previous release, while  and changes the new release  Progressing. terminated by new releasen. On-going Rollout for Current Version is temterminated due to a new commit in another application, and shows an inconsistent state (CR-19416 - Olek)
* Current release of application remains stuck indefinitely at **Progressing**. (olek)
* Rollouts in Progressing  do not have links to Rollout Analysis and Rollout Player in the Timeline tab.  (CR-19405)
* For an ECR integration, progress animations persist when clicking **Test Connection** or **Commit**. (CR-19124)
* In Pipelines Dashboard, the Pipeline filter displays the original name instead of the new name for the renamed pipeline. (CR-18929)
* (On-premises) Unable to create Git Sources both from the Codefesh CLI and UI with BitBucket Server.
* (On-premises) For Azure, auto-sync operations removes groups that were previously synced.
Auto-sync option not available for Azure SSO (CR-18200)???