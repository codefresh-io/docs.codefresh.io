---
title: "Release Notes: April 2025"
description: ""
---
## Features & enhancements

### Configure your promotion settings easily using the JSON Path Selector with live preview

We’ve made configuring your promotion settings simpler, so you can get it right the first time without guesswork. 
Using our new preview window, you can now select JSON paths directly from your YAML files. Just point to the file, browse its structure, and the correct path is inserted for you—wildcards included. This takes the guesswork out of configuring your promotion settings. 

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/apr25/json-file-selector.png" 
   url="/images/whats-new/apr25/json-file-selector.png" 
   alt="JSON file selector for promotable properties" 
   caption="JSON file selector for promotable properties" 
   max-width="60%" 
   %}

[Find out more]({{site.baseurl}}/docs/gitops/products/promotion-version-properties/#autocomplete-and-path-selectors-for-json-files).

### Align your pipelines with your team’s delivery rhythm with smart promotion concurrency for products

Take full control over how releases are promoted across environments with two powerful concurrency modes now available per product.

##### Queue releases mode
Using the Queue Releases mode, only one release can run at a time for a product. If a new release is triggered while another is promoting, it will wait its turn until the current one finishes.

##### Terminate releases mode
With the Terminate releases mode, multiple releases can be promoted in parallel, but with a smart safeguard: If a new release starts promoting to an environment that’s already being updated for the product, the older release is automatically terminated in that environment.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/gitops-products/settings/promotion-concurrency.png" 
   url="/images/gitops-products/settings/promotion-concurrency.png" 
   alt="Promotion concurrency settings for products" 
   caption="Promotion concurrency settings for products" 
   max-width="60%" 
   %}

With smart promotion concurrency, you can:
* Stay safe in production with sequential releases 
* Move fast in dev while avoiding collisions 
* Adapt your promotion strategy per product

This makes it easier to align your GitOps pipelines with your team’s delivery rhythm.
[Find out more]({{site.baseurl}}/docs/products/promotion-concurrency/)}.

### Redesigned Products page for a more intuitive experience

Get faster access to key information and actions with our newly redesigned Products page! Better understand release activity and manage your products more efficiently.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/apr25/products-page.png" 
   url="/images/whats-new/apr25/products-page.png" 
   alt="New Products page" 
   caption="New Products page" 
   max-width="60%" 
   %}

Everything you need to know about the **latest release** is now available at a glance:
* Release date and version
* User who initiated the latest release
* Current release status
* Direct link to the release view

You also have a **direct link to Product Settings**—giving you quick access to configuration options you're likely to update frequently.

Explore the new Products page!



## Bug fixes

##### General
* Blank screen after login for invited users with SSO sync enabled.

##### Pipelines 
* Git trigger for "Release published" fires incorrectly when any release-related trigger is enabled. 
* Webhook events for Bitbucket ignored when pipeline trigger uses different Bitbucket integrations. 
<!--- * Postgres Connectivity Issues: Azure Compatibility & Networking (CR-28067)-->
* For GitHub, list of files modified by PR (pull request) does not include all modified files. 

##### GitOps
* For installations with existing Argo CD, applications added from Helm repository show Unknown status in GitOps Apps dashboard. 
* Unable to set up OAuth authentication for GitOps Runtime.
* Incorrect merge for promotable properties defined as an array (Products > Product Settings > Promotion Settings).

