---
title: "Support Ticket Examples"
description: "Easily create support tickets for bugs & feature requests using our templates"
group: kb
toc: true
kb: false
ht: false
common: false
categories: []
support-reviewed: 2023-08-11 LG
---

## Overview

Use the example templates below to create support tickets for bugs/issues, feature requests, or general questions you might have.

## Support Template: Issues/bugs

Use the following template to create a support ticket for bugs/issues.

>### What is currently happening?
>
>A sentence or two that describes what's happening now.
>
>### What are the expected results?
>
>A sentence or two that describes what you expected to happen.
>
>### Details
>
>A detailed description of this issue.
>
>Please see [Additional Information for Issues/Bugs](#additional-information-for-issuesbugs)
>
>### How to reproduce
>
>A step-by-step guide on how to reproduce this issue.
>
>### Impact
>
>Describe the business impact of this issue.

### Additional Information for Issues/Bugs

To troubleshoot issues or bugs effectively, Codefresh Support requires detailed description of the issue which includes the following information:

#### UI issues: Slowness and others

1. Codefresh **usernames** and **number** of affected users.
1. **Link to UI** page being accessed.
1. **Action** being performed.
1. **Timestamp** of incident.
1. Does the issue persist in **another browser** or in **incognito mode**?
1. Do you use a **VPN/proxy** to access the page?
1. **HAR file** (a log of network requests during the incident). [HAR File Guide](https://codefresh.io/docs/docs/kb/articles/data-needed-ui-issues/).
1. **Screenshots** or **videos** showing the behavior.
   - Please include the **full** browser window in the screenshot/video.

#### Functional errors

1. Exact **error messages** received.
1. Failed **build IDs** (1-3 examples).
1. Does the issue persist after a **new run**, not just a restart?
1. Were **any changes** recently made to the pipeline?
1. **Last successful execution** and when the issue first occurred.
1. Details on the **affected pipelines** (e.g., how many, names, etc.).
1. Codefresh **runner version and setup** (e.g., SaaS, hybrid, or on-prem).
1. **User impersonation**.
   - Support may sometimes need to impersonate your user to understand and troubleshoot the issue. To enable impersonation for your user, please navigate to [User Settings](https://g.codefresh.io/user/settings){:target="\_blank"}. Under the Security section, select the checkbox for `Allow Codefresh support team to login as my user (all the operations made by the team will be audited)` and save the settings. Please let support know if you have enabled impersonation.
1. **Engine and DIND logs** for the failed build:
   - While the build is running, navigate to the cluster, and locate the pods named `engine-[buildID]` and `dind-[buildID]`.
   - Save those logs to a file and attach them to the ticket.
   - Alternatively, you can use the [Codefresh Support Package](https://github.com/codefresh-support/codefresh-support-package){:target="\_blank"} to collect the required data *while the affected build is running and the error message is received*.
1. **Helm values file** (to identify overrides such as images or other configurations).

#### Scalability and resource management

1. Codefresh **runner version and setup** (e.g., SaaS, hybrid, or on-prem).
1. **Helm values file** to identify overrides such as images or other configurations.
1. **Nodes** overview. Description of the node.
1. **Events** from the namespace.
1. **Runner** pod logs.
1. **Volume-provisioner** pod logs.
1. **Ebs-csi pod logs**: If there are volume issues and you're using `ebs-csi`, check Ebs-csi pods logs in the `kube-system` namespace.

> Alternatively, to collect the data for 3 through 6, use the [Codefresh Support Package](https://github.com/codefresh-support/codefresh-support-package){:target="\_blank"}.

#### Security concerns

1. **Report from the security team/tool**, if any.
1. Description of the potential data loss or **security vulnerability**.
1. The **CVE and the specific image** it pertains to.
1. **Logs or evidence** highlighting inconsistencies or failures.

## Support Template: Feature requests

Use the following template to submit feature requests.

<!-- markdownlint-disable MD024-->

>### Details
>
>Describe your feature request.
>
>### Current Workflow
>
>Describe the current process / workaround you have in place due to this feature not being implemented yet.
>
>### Impact
>
>Describe why you need this feature and the impact of this feature request when implemented.

<!-- markdownlint-enable MD024-->

## Support Template: General

Use this template for general questions you have, not related to an issue or feature request.

>### Question
>
>Add your question here.
>
>### Context
>
>Add background information on your question. Add links or any details that will help us to understand the question above.

## Related articles

[Common Issues]({{site.baseurl}}/docs/kb/common-issues/)
