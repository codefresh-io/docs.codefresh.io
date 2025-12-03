---
title: "Release Notes: Novembrer 2025"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### GitOps Cloud: Enhanced resource pruning information

We've improved the application sync dialog with new safeguards to provide better clarity and control when initiating a manual sync with pruning enabled.

{% include image.html lightbox="true" file="/images/whats-new/nov25/new-sync.png" url="/images/whats-new/novg25/new-sync.png" alt="Enhanced resource pruning information" caption="Enhanced resource pruning information
" max-width="60%" %} {% if page.collection == "posts" %}


**Sync dialog enhancements**

We've added key pieces of information and warnings directly to the initial Synchronization screen:

   * **Tooltip clarity**: We added a helpful tooltip to provide a concise explanation of resource pruning.
   * **Safety warning**: If you enable the Prune option, a clear warning message will now be displayed. This notifies you that the action deletes resources that are no longer defined in your source configuration.

**Resources highlighted for deletion**

In the next screen, where you select resources, GitOps Cloud now makes it easy to identify exactly what will be removed:

   * **Top visibility**: Resources marked for deletion (pruning) are now highlighted and automatically placed at the top of the resource list.
   * **Clear status**: You'll see an explicit **Requires pruning** badge next to the resource status, ensuring you know which items are targeted for removal.

**Final confirmation**

To provide a final check against unintended deletions:

   * **Visual alert**: If the sync action includes pruning **any resource**, the final **Synchronize** button will turn red. This serves as a strong visual cue to confirm that you are running a destructive operation.

These updates are designed to give you more control and confidence when managing your application synchronization.


### GitOps Cloud: New release of GitOps Runtime v0.25.0 

We’re excited to announce the release of GitOps Runtime v0.25.0 — another step forward in improving the stability and reliability of our platform. 

This release includes the following dependency update:

   * The Argo CD fork has been synchronized to OSS version 3.1.5, bringing compatibility improvements and alignment with upstream Argo CD.

There are some breaking changes planned for the *next* release, so we encourage you to read the release notes and prepare your deployments accordingly.

[Read the full release notes](https://github.com/codefresh-io/gitops-runtime-helm/releases/tag/0.25.0){:target=”\_blank”}.
