---
title: "Release Notes: March 2025"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements


### GitOps: Simplified Runtime installation with the installation wizard
Our new installation wizard, designed for ease of use and maximum visibility into every step, makes installing a GitOps Runtime simple, intuitive, and quick.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/mar25/runtime-install-wizard-new-argo-cd.png" 
   url="/images/whats-new/mar25/runtime-install-wizard-new-argo-cd.png" 
   alt="New Runtime installation wizard" 
   caption="New Runtime installation wizard" 
   max-width="60%" 
   %}

##### Key features
* **Installation and configuration** steps are clearly defined, so you can complete the entire setup from the same location.
* **Guided experience** that walks you through each step.
* **Inline parameter descriptions** so you always know what to define.
* **Automatic progress saving** so you can stop anytime and resume exactly where you left off.

##### Installation
Install a Runtime in three simple steps:
* Define a repository in your Git provider account to store shared configuration settings.
* Review and define installation parameters, which are automatically populated in the install command.
* Run the install command in your terminal.

##### Configuration
Configuration steps are clearly defined, making the set up process easy to complete.
* **Define Git credentials**, with the option to use the same token for both the Runtime and user authentication. Required scopes are detailed to ensure the correct permissions.
* **Configure as an Argo CD Application** to take full advantage of GitOps.
* **Add a Git source** to the Runtime so you’re ready to create applications


### GitOps: Bring your own Argo CD
We’ve made it easy to connect existing Argo CD infrastructure with GitOps Cloud.
The agent lets you bring your own Argo CD instance, which works in plug-and-play mode. You install it in minutes, and if you change your mind you can also remove it without affecting your existing Argo CD instance. 

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/mar25/runtime-install-wizard-existing-argo-cd.png" 
   url="/images/whats-new/mar25/runtime-install-wizard-existing-argo-cd.png" 
   alt="Installing GitOps Runtime connecting to existing Argo CD" 
   caption="Installing GitOps Runtime connecting to existing Argo CD" 
   max-width="60%" 
   %}

If you don’t want to bring your own Argo CD instance, that’s no problem. You can still choose the GitOps Runtime to manage all Argo services in one bundle with our easy installation process. 

For details, see [Installing Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).


### Pipelines: Easily add secret variables

We've introduced a simpler and more secure way to add secret variables in your pipelines, making it faster and safer to manage sensitive data. Before this update, adding a secret required creating a standard variable, temporarily exposing the value, and manually encrypting it, increasing the risk of accidental exposure.

With this update, you can define a secret variable upfront, so it's automatically encrypted from the start. Now, when clicking "Add", you can create a regular variable or secret variable directly in the UI.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/whats-new/mar25/variable-secret.png" 
   url="/images/whats-new/mar25/variable-secret.png" 
   alt="Adding secret variables" 
   caption="Adding secret variables" 
   max-width="60%" 
   %}

This update brings:
* One-step secret creation: No need to manually encrypt after adding a variable.
* Improved security: Secrets are encrypted automatically, reducing exposure risks.
* More intuitive workflow: Easily distinguish between regular and secret variables


For details, see [User-defined variables]({{site.baseurl}}/docs/pipelines/variables/#user-defined-variables).

### Prevent conflicts from overridden variables

We’ve introduced a smarter way to manage variables across shared configurations, projects, pipelines, and triggers.  
Previously, it was easy to unintentionally override a project-level variable at the pipeline level—without realizing it. Now, you get a warning when creating a variable that already exists at a higher level, helping you make safer, more informed decisions.

* Smart conflict detection: See a warning when you try to define a variable that already exists at a higher scope. 
* Safer collaboration: Reduce accidental overrides and keep pipelines in sync with shared variables. 
* Better visibility: Understand when you're about to break the connection to a higher-level variable. 

For details, see [Order of precedence for user-defined variables]({{site.baseurl}}/docs/pipelines/variables/#order-of-precedence-for-user-defined-variables).

## Bug fixes

##### Pipelines 


##### GitOps
* Typo in parameter name in the `values.yaml` file of the `gitops-runtime chart`.

