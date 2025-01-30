---
title: "Release Notes: January 2025"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements


### GitOps: Argo CD upgraded to v2.13

Codefresh GitOps now uses Argo CD v2.13, the latest version from Argo CD. You can take advantage of the latest features and bug fixes Argo CD 2.13 as detailed in the [release notes](https://github.com/argoproj/argo-cd/releases/tag/v2.13.0-rc1){:target="\_blank"}. 
This [blog post](https://blog.argoproj.io/argo-cd-v2-13-release-candidate-6cf5c98cc312){:target="\_blank"} summarizes what's new in this release. 


### GitOps: Settings for Promotion Flows

We have introduced settings for Promotion Flows to give you greater control and flexibility in managing them.
When creating a Promotion Flow, you can define several settings, including the Flow Timeout and Version. 

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/jan25/promotion-flow-settings.png" 
   url="/images/whats-new/jan25/promotion-flow-settings.png" 
   alt="Settings for Promotion Flows" 
   caption="Settings for Promotion Flows" 
   max-width="60%" 
   %}

   * **Flow Timeout**: Ensures Promotion Flows don’t run indefinitely by setting a maximum duration for execution. If a Flow exceeds this duration, it is automatically terminated.  
     **Why is this useful?**  
      * Manual approval delays: In PR-driven flows, the timeout automatically terminates the Flow if required approvals aren’t provided within the defined time frame.  
      * Misconfigured tests: Prevents new Promotion Flows from running indefinitely due to errors in testing configurations. 
    The default timeout, if not explicitly set, is 1 day (24 hours).
  * **Version**: Allows you to indicate changes to the same Promotion Flow. 

For details, see [Create a Promotion Flow]({{site.baseurl}}/docs/promotions/promotion-flow/#create-a-promotion-flow).


### GitOps: Product Releases enhancements
We've made several improvements to the Product Releases page enhancing traceability and clarity.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/jan25/product-releases.png" 
   url="/images/whats-new/jan25/product-releases.png" 
   alt="Product > Releases page" 
   caption="Product > Releases page" 
   max-width="60%" 
   %}

* **Date**: The Release ID has been replaced with the date when the release was initiated, making it easier to track when each release occurred. Failed releases now show a tooltip with a summary of the reason for the failure, improving troubleshooting.
* **Initiator**: The name of the user who initiated the Promotion Flow that triggered the release is now displayed, helping with better accountability.
* **Version**: The version defined in the Promotion Flow settings is now also shown on the Product Releases page, providing more context and consistency for each release.

For details, see [Tracking releases for products]({{site.baseurl}}/docs/promotions/product-releases/).


### GitOps: Free Hosted Runtimes
Codefresh no longer offers _free_ Hosted GitOps Runtimes.  
If you're interested in our paid options, please contact our sales team at `sales@codefresh.io` for details.


## Bug fixes

##### Pipelines 
* Builds frozen at the initialization phase when connecting to Vault secret store.
* Build fails with `manifest unknown` error when referencing or including v1.0.12  of `jira-issue-manager` step.

##### GitOps
* Discrepancy between memory defined for build and actual memory allocated.







