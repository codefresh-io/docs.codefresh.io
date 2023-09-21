---
title: "Codefresh on-premises feature management"
description: "Enable/disable features in the Codefresh platform"
group: installation
toc: true
---

Codefresh platform/system administrators can toggle specific features of the Codefresh platform in on-premises environments. Feature management helps you to easily implement and manage functionality on an as- and when-needed basis. 

## Manage features in on-premises platforms
Enable a feature for all accounts, or override the default setting and enable/disable the feature selectively for specific accounts. The overrides are retained when you change the default setting for the feature. 
Review the [feature list](#on-premises-feature-list) to understand the implications of enabling a feature.

1. Sign in to Codefresh.
1. On the top-right, click your avatar and then select **Admin Panel**.
1. From the sidebar, click **Feature Management**. 
1. To enable a feature for all accounts under **Enable**, toggle the required feature to **ON**. 
1. To enable or disable the feature for specific accounts, click the **Edit** icon, and then select the accounts from the **Enable feature for** and **Disable feature for** lists, as required.

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-feature-management.png"
  url="/images/installation/on-prem-feature-management.png"
  alt="Enabling/disabling features for accounts"
  caption="Enabling/disabling features for accounts"
  max-width="60%"
    %}  


## On-premises feature list 


{: .table .table-bordered .table-hover}
| Feature                     | Description            |  Default | 
| --------------              | --------------         | ------- | 
| `abacHermesTriggers`       | When enabled, restricts access to the legacy version of Cron triggers for users without permissions to edit pipelines.| FALSE  |
| `accountInfoCopyButton`  | When enabled (the default), the account ID is added to the URL. When sharing the URL with the account information, recipients can seamlessly switch accounts.                                                     | TRUE         |
| `accessibilityContrast` | When enabled, displays an icon in the Codefresh toolbar allowing you to control the contrast by selecting the option that best suits the logged in user:{::nomarkdown}<ul><li><b>Invert colors</b> and <b>Bold colors (saturate)</b>: Optimized for visually impaired users.</li><li><b>Smart Contrast</b>: Increases the contrast between the text and the background to the maximum possible.</li></ul>{:/}| FALSE         |
|`allowUserUpdateBoards`| When enabled, allows users without admin roles to update Helm boards. Users can install, promote, create, and update sections.<br>See [Promoting Helm environments]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/). |FALSE |
| `cronTriggersInPipelineSpec`         | When enabled, allows users to define Cron triggers in the pipeline YAMLs as a `spec.cronTriggers` array, instead of using a separate API.<br>See [Pipelines: Enhanced version of Cron triggers](#pipelines-enhanced-version-of-cron-triggers) in this article.  | FALSE         |
|`dindPodRequestsEqualLimits`   | When enabled, sets both the resource requests and limits for the pod to the same values.|FALSE |
|`disableWelcomeScreen` | When enabled, bypasses the Codefresh Welcome screen that requires the user to enter additional information on first sign-in. <br>Required mostly in on-premises environments, especially for LDAP, which has all login info already configured. | FALSE|
|`disableRolloutActionsWithoutRBAC` |Relevant to GitOps application deployments. <br>When enabled, disables rollback and rollout controls in the Timeline's tab's Rollout Player for the application. {::nomarkdown}<ul><li>Rollback for the selected Rollout. The <b>Choose version to Rollback</b> dropdown is disabled.<br>See [Manually rollback completed rollout to previous revision]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-rollback-completed-rollout-to-previous-revision). </li><li>The <b>Pause</b>, <b>Resume</b>, <b>Skip Step</b> and <b>Promote Full</b> controls in the Rollout Player are also disabled.<br>See [Manage an ongoing rollout with Rollout Player]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player).</li></ul>{:/} | FALSE |
| `disableInviteWelcomeMail`     | When enabled, does not send the Welcome email to users invited to an account.      | FALSE         |
|`gerritIntegration`      | When enabled, enables Gerrit integration in Account settings. <br>See [Gerrit as Git provider for Pipelines and GitOps](#gerrit-as-git-provider-for-pipelines-and-gitops) in this article.    | FALSE         |
|`forbidDecrypt` |When enabled, prevents users from decrypting secrets when running the `codefresh get context --decrypt` command. <br>Users can bypass this by running `--decrypt` with the built-in `CF_API_KEY` command that is injected into every build. |FALSE| 
|`gitopsArgoCdRollback` |Relevant to GitOps application deployments.<br>When enabled, allows you to rollback active GitOps applications to previously deployed versions.<br>See [Rollback GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#rollback-gitops-applications).| FALSE |
| `gitopsAppGroups`       | When enabled, allows users to group GitOps applications by annotations, and view these applications in the Groups tab of the GitOps Apps dashboard. <br>See [GitOps: Application Groups in GitOps Apps dashboard](#gitops-application-groups-in-gitops-apps-dashboard) in this article. | FALSE   |
|`gitopsImageReporting` |Relevant to ProjectOne.<br>When enabled, reports images created with Codefresh Pipelines to the Images dashboard. <br>See [Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/).| FALSE |
|`injectClusterListFromPipelineSettings` | When enabled, turns on the pipeline setting **Kubernetes cluster context pipeline injection** for the account. Individual users can then selectively inject clusters for pipelines from those to which they they access.<br><br> This feature requires the users to have the Update Cluster permission. If not granted, then this feature has no impact when enabled. <br>See [Enabling cluster-contexts for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#enabling-cluster-contexts-for-pipelines). | FALSE| 
|`logMasking` |When enabled, secrets in build logs, both online and offline logs, are masked and replaced by asterisks. <br><br>This feature is currently available only for Enterprise customers. |FALSE|
|`parallelKubectlOperations` |When enabled, allows running parallel steps that includes `kubectl`. Especially Helm `install` and `deploy` steps that deploy to multiple clusters with `kubectl` in parallel. |FALSE|
| `pipelineScopes`      | When enabled, enables Codefresh administrators to configure the API scopes for pipelines at account level. All pipelines in the account inherit these scopes. Codefresh administrators can also override these scopes for individual pipelines.<br>See [Pipelines: Access control for endpoints](#pipelines-access-control-for-endpoints) in this article.    | FALSE         |
|`supportGerrit`      | When enabled, adds the capability to connect to Gerrit as a Git provider. <br>See [Gerrit as Git provider for Pipelines and GitOps](#gerrit-as-git-provider-for-pipelines-and-gitops) in this article.    | FALSE         |
|`supportOpenIdConnectInBuilds`| When enabled (the default), supports OIDC in pipeline builds, including obtaining and using ID tokens to authenticate and authorize pipeline actions on cloud providers.<br>See [Pipelines: OPenID Connect (OIDC) integration](#pipelines-openid-connect-oidc-integration) in this article. |TRUE|
|`useLogsTimestamps` |When enabled, prepends the date and time to every line in the log. <br><br>When enabled, and you have build automation, you may need to adjust the regex for search as the line does not start with the log text.| FALSE| 




## Related articles
[Codefresh on-premises]({{site.baseurl}}/docs/installation/on-premises/)  