---
title: "Release Notes: February 2026"
description: "Release Notes for Classic Pipelines and GitOps"
---

## Features & enhancements

### Classic Pipelines

#### API token authentication for Bitbucket Cloud integrations

Bitbucket is deprecating App passwords in favor of API tokens, and OAuth2 connections to Bitbucket Cloud share a single API rate limit across all Codefresh accounts that use them.

You can now connect a Bitbucket Cloud Git integration with an API token. The Bitbucket Git integration has a new **API Token** tab where you enter your Bitbucket account email and an API token. Codefresh verifies that the token has the required scopes before saving the integration.

To use it, add or edit your Bitbucket integration in **Pipeline Integrations → Git** and select the **API Token** tab. For the list of required scopes and how to create the token, see [Bitbucket API token]({{site.baseurl}}/docs/integrations/git-providers/#api-token).

### GitOps

#### View permission for applications in ABAC rules

GitOps ABAC rules for applications now support the **View** action. Use it to control which applications a team can see in the GitOps Apps dashboard. Applications that a user is not allowed to view are filtered out of the tree view and card view, and navigating to a restricted application shows a no application found error.

The View permission is enforced for all application queries. By default, rules allow all users to see all applications, and account administrators are never restricted. Update your GitOps Runtime to version 0.29.0 or later for the permission to work correctly.

For details, see [ABAC for GitOps applications]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/#applications).

## Bug fixes

### Classic Pipelines

#### Webhook secrets of existing Git triggers were exposed in the UI

After you created a new Git trigger for a pipeline, the webhook secret and endpoint URL of the other Git triggers on the same pipeline were displayed in the UI until you refreshed the page. The pipeline API responses also included the secrets of all the triggers.

Trigger secrets are now masked in these responses, so they are visible only when you first configure a trigger.

#### Users without admin permissions could decrypt pipeline variables

Any user with read access to a pipeline could decrypt its encrypted variables through the API or the Codefresh CLI, for example with `codefresh get pipeline <name> --decrypt`. In addition, for accounts that restrict decryption to administrators, non-admin users could not load repository information for Git integrations that run through `cap-app-proxy`, and received a `Decrypting is not allowed` error when configuring or viewing a pipeline YAML from a repository.

Decryption of variables is now limited to account administrators. For other users, the variables stay encrypted, and requests no longer fail with an error.

#### Conditional expressions were silently truncated to 1024 characters

Step conditional expressions longer than 1024 characters were cut off before variable interpolation. A truncated expression was invalid, for example, with an unclosed parenthesis, so the condition was ignored with an error such as `Unclosed ( at character 1024`.

The maximum length of a conditional expression is now 12,000 characters. Codefresh validates the length both in the pipeline definition and during the build, before and after variable interpolation, so an expression that is too long is reported instead of being cut off. For details, see [Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/).

#### Misleading warning in the advanced options of a trigger

In the **More options** of a Classic trigger, the warning said that disabling "Ignore Docker engine cache" or "Reset pipeline volume" might make builds slower, which is the opposite of what happens. The warning was also displayed below the reporting notification option, which implied that this option affects build speed.

The warning now says that enabling one of the options might make builds slower, and is displayed right below **Reset pipeline volume**.

#### Random `failed to write subtree controllers` errors in `dind` pods

In some builds, `dind` pods logged the error `failed to write subtree controllers [cpuset cpu io memory hugetlb pids misc]`. When it occurred, build metrics shown in the UI and reported through OpenTelemetry were affected. It was caused by a race condition on nodes that use cgroup v2: if side processes of the `dind` entrypoint started late, the controllers required for step containers could not be enabled.

The `dind` image now moves its init process and all subprocesses to a dedicated cgroup at the very beginning of its startup. The fix is available in `dind` 29.2.0-3.0.11 and in Classic Runtime 10.0.1.

#### SSH clone failed in the `git-clone` step

Cloning a repository over SSH failed with `ssh-keyscan: command not found` and exit code 127. It is fixed now.
