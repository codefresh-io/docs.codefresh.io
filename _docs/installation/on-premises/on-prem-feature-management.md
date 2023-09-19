---
title: "Codefresh on-premises feature management"
description: "Enable/disable features for Codefresh accounts in your organization"
group: installation
toc: true
---

Codefresh account administrators can toggle specific features of the Codefresh platform on/off in on-premises environments. Feature management helps you to easily implement and manage functionality on an as- and when-needed basis. 

You can enable or disable features for:
1. A single account
1. Specific accounts
1. All accounts in the organization 




## Enable/disable features in on-premises platforms
Enable a feature for all accounts, or override the default setting and enable/disable the feature selectively for specific accounts. Account-level feature overrides are retained when you change the default setting for the feature. 
Review the [feature list](#on-premises-feature-list) to understand the implications of enabling a feature.

1. Sign in to Codefresh.
1. On the top-right, click your avatar and then select **Admin Panel**.
1. From the sidebar, click **Feature Management**. 
1. To enable a feature for _all accounts_ under **Enable**, toggle the required feature to **ON**. 
1. To enable or disable the feature for _a single account or for specific accounts_, click the **Edit** icon, and then select the accounts from the **Enable feature for** and **Disable feature for** lists, as required.

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-feature-management.png"
  url="/images/installation/on-prem-feature-management.png"
  alt="Enabling/disabling features for accounts"
  caption="Enabling/disabling features for accounts"
  max-width="60%"
    %}  


## On-premises feature list 

Here is an example of the Feature Management page in Admin Management for the organization. Any feature enabled or disabled in this page affects all Codefresh accounts in the organization.

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/feature-management.png"
  url="/images/installation/on-prem-setup/feature-management.png"
  alt="Feature Management for accounts"
  caption="Feature Management for accounts"
  max-width="60%"
    %}

The table describes the features you can open for Codefresh accounts, in alphabetical order. 

{: .table .table-bordered .table-hover}
| Feature                     | Description            |  Default | 
| --------------              | --------------         | ------- | 
|`abacHermesTriggers`| When enabled, restricts access to the legacy version of Cron triggers types for users without permissions to edit pipelines. |FALSE |
|`accessibilityContrast` |	When enabled, displays an icon in the Codefresh toolbar allowing users to control the contrast by selecting the option that best suits the user:{::nomarkdown}<ul><li><b>Invert colors</b> and <b>Bold colors (saturate)</b>: Optimized for visually impaired users.</li><li><b>Smart Contrast</b>: Increases the contrast between the text and the background to the maximum possible.</li></ul>{:/}|FALSE |
|`accountInfoCopyButton`| When enabled (the default), allows users to copy the URL including the account ID to share with other users . |TRUE |
|`allowUserUpdateBoards`| When enabled, allows users without admin roles to update Helm boards. Users can install, promote, create, and update sections.<br>See [Promoting Helm environments]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/). |FALSE |
|`cronTriggersInPipelineSpec`   | When enabled, allows users to define Cron triggers in the pipeline YAMLs as a spec.cronTriggers array, instead of using a separate API. <br>See [Cron (timer) triggers]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/). |FALSE |
|`disableWelcomeScreen`| When enabled, bypasses the Codefresh Welcome screen that requires the user to enter additional information on first sign-in. <br>Required mostly in on-premises environments, especially for LDAP, which has all login info already configured. | FALSE|
|`disableInviteWelcomeMail` | When enabled, does not send the Welcome email to invited users. Invited users can sign in directly according to the login mode defined for the account. | FALSE|
|`disableRolloutActionsWithoutRBAC` |Relevant to GitOps application deployments. <br>When enabled, disables rollback and rollout controls in the Timeline's tab's Rollout Player for the application. {::nomarkdown}<ul><li>Rollback for the selected Rollout. The <b>Choose version to Rollback</b> dropdown is disabled.<br>See [Manually rollback completed rollout to previous revision]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-rollback-completed-rollout-to-previous-revision). </li><li>The <b>Pause</b>, <b>Resume</b>, <b>Skip Step</b> and <b>Promote Full</b> controls in the Rollout Player are also disabled.<br>See [Manage an ongoing rollout with Rollout Player]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player).</li></ul>{:/} | FALSE |
|`forbidDecrypt` |When enabled, prevents users from decrypting secrets when running the `codefresh get context --decrypt` command. <br>Users can bypass this by running `--decrypt` with the built-in `CF_API_KEY` command that is injected into every build. |FALSE| 
|`gitopsArgoCdRollback` |Relevant to GitOps application deployments.<br>When enabled, allows you to rollback active GitOps applications to previously deployed versions.<br>See [Rollback GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#rollback-gitops-applications).| FALSE |
|`gitopsAppGroups`  | When enabled, allows users to group GitOps applications by annotations, and view these applications in the Groups tab of the GitOps Apps dashboard.<br>See [Application Groups for GitOps applications]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/). |FALSE |
|`gitopsImageReporting` |Relevant to ProjectOne.<br>When enabled, reports images created with Codefresh Pipelines to the Images dashboard. <br>See [Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/).| FALSE |
|`injectClusterListFromPipelineSettings` | When enabled, turns on the pipeline setting **Kubernetes cluster context pipeline injection** for the account. Individual users can then selectively inject clusters for pipelines from those to which they they access.<br><br> This feature requires the users to have the Update Cluster permission. If not granted, then this feature has no impact when enabled. <br>See [Enabling cluster-contexts for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#enabling-cluster-contexts-for-pipelines). | FALSE| 
|`parallelKubectlOperations` |When enabled, allows running parallel steps that includes `kubectl`. Especially Helm `install` and `deploy` steps that deploy to multiple clusters with `kubectl` in parallel. |FALSE|
|`logMasking` |When enabled, secrets in build logs, both online and offline logs, are masked and replaced by asterisks. <br><br>This feature is currently available only for Enterprise customers. |FALSE|
|`pipelineScopes` |When enabled, allows Codefresh administrators to define the scopes that pipelines can access at the account-level.<br>See [Configure pipeline scopes]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#configure-pipeline-scopes). |FALSE|
|`useLogsTimestamps` |When enabled, prepends the date and time to every line in the log. <br><br>When enabled, and you have build automation, you may need to adjust the regex for search as the line does not start with the log text.| FALSE| 


## Related articles
[Codefresh on-premises installation]({{site.baseurl}}/docs/installation/on-premises/)  
[Codefresh on-premises upgrade]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem-upgrade/)  
[Codefresh on-premises setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/)  