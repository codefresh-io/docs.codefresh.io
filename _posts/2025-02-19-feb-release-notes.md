---
title: "Release Notes: February 2025"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements


### General: Increased limit for audit logs

Codefresh keeps a log of all actions that happen at all times based on API calls that reach Codefresh. These include UI actions from users, CLI invocations, and any external integration used with Codefresh. 

We have now increased the audit limit from 15,000 to 50,000, which means you can access more data on how you use your Codefresh account.  

[Find out more]({{site.baseurl}}/docs/administration/account-user-management/audit/).



### GitOps: GitHub status checks for Codefresh Promotions

We have introduced a new GitHub status check feature to make tracking your deployments more seamless and efficient. When you promote across environments, Codefresh will automatically report back a Git status check on any commits. 

* Status checks include a direct link to the release, so you can quickly view its progress.
* There’s no need to leave GitHub. You can stay updated on your release status without switching tools.
* If any issues arise, simply follow the link to troubleshoot effortlessly.



 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/feb25/whats-new-feb25-release-status-in-git.png" 
   url="/images/whats-new/feb25/whats-new-feb25-release-status-in-git.png" 
   alt="Promotion status check in GitHub" 
   caption="Promotion status check in GitHub" 
   max-width="60%" 
   %}
 

For details, see [Tracking releases for products]({{site.baseurl}}/docs/promotions/product-releases/).



## Bug fixes

##### Pipelines 
* `build` step fails to build ECR images when base image (`FROM`) is from a different AWS account.

##### GitOps
* `exec /bin/sh: argument list too long` validation error on upgrading GitOps Runtime.
* All clusters not displayed in the UI after upgrading GitOps Runtime to 14.1.
* Broken hyperlink to Shared Configuration Repository in the Upgrade Runtime panel.






