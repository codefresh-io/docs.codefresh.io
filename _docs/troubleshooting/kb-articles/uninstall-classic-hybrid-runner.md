---
title: "How To: Uninstall the Codefresh Runner"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Runtimes]
support-reviewed: 2023-04-18 LG
---

## Overview

When you need to uninstall the Codefresh Runner, this can be for complete
removal or remove it to re-install the components due to some issue.

## Details

Items to Delete:

  * Kubernetes Namespace
  * Codefresh Agent / Runner
  * Codefresh Runtime Environment
  * Codefresh Kubernetes Integration

We will need to remove the Codefresh Runner so they do not show in the
Codefresh UI. We will use the `codefresh runner delete` command [1]. Follow
the prompts to remove the agent and runtime. We may need to remove some
runtimes [2] from the agent if more than one is attached.

Once the command completes, we will need to delete the Kubernetes namespace
for the uninstalled Runner. The reason for this as there may be lingering
items, and deleting the namespace will delete everything under that namespace
[3].

Once that is done, we will need to clean up items in the Codefresh UI under
Account Settings. Navigate to the Codefresh Runner section to make sure the
Runner is not showing. If it is showing, we can delete it from here. Next, we
will navigate to the Runtime Environments. We will need to delete any
lingering Runtimes from the CLI commands. Finally, we will need to go to
Integrations > Kubernetes > Custom Provider and delete the added integration
from the install of the Runner. The integration will show `behind firewall`.

The above will make sure that the Codefresh Runner is completely uninstalled.
Also, this will make sure that you can re-install it without issues on the
same Kubernetes cluster and namespace.

## Related Items

[1] <https://codefresh-io.github.io/cli/runner/delete/>

[2] <https://codefresh-io.github.io/cli/runtime-environments/uninstall-
runtime-environment/>

[3] <https://kubernetes.io/docs/tasks/administer-cluster/namespaces/#deleting-
a-namespace>

