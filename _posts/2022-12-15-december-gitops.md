---
title: "GitOps Release Notes: December 2022"
description: "Changelog and Release Notes For GitOps"
---

## Features & enhancements

### GitOps CLI version validation and upgrade

We have enhanced the user experience for CLI upgrades to make it intuitive and simple. No need to constantly check the CLI version to keep up with and get access to new features we are releasing.
Now the CLI automatically self-checks its version, and if a newer version is available, prints a banner with the notification that a new version is available, also including the upgrade command (`cf upgrade`).

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-dec22-cli-upgrade-banner.png"
 url="/images/whats-new/rel-notes-dec22-cli-upgrade-banner.png"
 alt="Upgrade banner for Codefresh CLI"
 caption="Upgrade banner for Codefresh CLI"
 max-width="60%"
%}

You can upgrade to a specific version, or download the latest version to an output folder to upgrade at your convenience.  

For details, see [Upgrade the Codefresh CLI]({{site.baseurl}}/docs/installation/gitops/upgrade-gitops-cli/).

### Tunnel-based as default runtime mode

In the previous release, we introduced the Tunnel-based option for Hybrid GitOps runtimes.
It is now configured as the default runtime mode for Hybrid GitOps. For silent installations, you don't need to specify an access mode. For Wizard-based install, when prompted to select the Access mode, select Tunnel-based.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-dec22-cli-access-mode.png"
 url="/images/whats-new/rel-notes-dec22-cli-access-mode.png"
 alt="Access mode in CLI Wizard"
 caption="Access mode in CLI Wizard"
 max-width="60%"
%}

Access mode selection is relevant only for new runtime installations. Upgrading existing runtimes does not change the access mode for those runtimes.

For details, see [Access mode in Runtime flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#runtime-flags).

### Git provider selection in CLI Wizard

When installing the Hybrid GitOps runtime, Codefresh automatically detects the Git provider based on the repository URL provided during the installation.
If Codefresh is unable to detect the Git provider, as for on-premises Git providers, you can now select the Git provider from the list.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-dec22-cli-git-provider-select.png"
 url="/images/whats-new/rel-notes-dec22-cli-git-provider-select.png"
 alt="Git provider selection CLI Wizard"
 caption="Git provider selection CLI Wizard"
 max-width="60%"
%}

### Reset shared configuration repo

Codefresh creates the shared configuration repository when you install the first Hybrid or Hosted GitOps runtime for your account, and then uses it for all runtimes you add to the same account.
You may want to re-initialize the shared configuration repository for your account to point to a different runtime environment. For example, when moving from evaluation to production environments.  

You can do so by first uninstalling existing runtimes in your account and then running the reset command. On the next runtime installation, Codefresh re-initializes the shared configuration repo to point to the new location.

>Reset shared configuration repo is supported from CLI v0.1.18 and higher.

For details, see [Reset shared configuration repository]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#reset-shared-configuration-repository-for-gitops-runtimes).

<!--### Rollout steps in Current State CR-15855
today users can access the rollouts steps only from the timeline view. We want users to be able to see it from the current state view as well, when clicking on a rollout. 
Add a tab to the rollout drawer with the "steps" -->

## Bug fixes

### Runtimes

* App-proxy fails to connect if `cfHost` ends with `/`.
* Missing Codefresh context generates segmentation violation error.
* Unclear error message when upgrading CLI to a version that does not exist.
* Bitbucket returns false in `isValid` field for expired runtime token.
* SIGSEGV on installing runtime with CLI version 01.17.

### Applications

* Image-applications of deleted application not removed from database.
* Incorrect results when filtering by Cluster in DORA dashboard.
* Incorrect time displayed in Lead Time For Changes in DORA dashboard.
* 'Git Source not found error' when trying to edit an application not based on a Git Source.
* Modified resource not displayed correctly in Application dashboard > Timeline tab.

### Others

* Integrations page remains indefinitely in loading state.
* Filtering Workflow Templates by Git Source does not work.
* Workflow Logs terminal flickers and self-refreshes constantly.
