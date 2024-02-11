---
title: "Codefresh on-premises feature management"
description: "Enable/disable features for Codefresh accounts in your organization"
group: installation
redirect_from:
  - /docs/installation/on-premises/on-prem-feature-management/
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

## System Features
System Features are generally only for internal use, and should not be changed. For more information, see [Enable System Features]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/#enable-system-features).

{{site.data.callout.callout_warning}}
**IMPORTANT**  
Codefresh _strongly recommends against enabling System Features_ unless you are familiar with the implications of turning on a System Feature. <br> 
If you need to turn on a System Feature, we recommend to first contact Codefresh support.
{{site.data.callout.end}}


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
| `abacAndRule`       | When enabled, supports creating ABAC rules for entities in Codefresh pipelines using "AND". <br>See [Configuring rules for access control in pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/#rules-for-access-control).| TRUE  |
|`abacHermesTriggers`       | When enabled, restricts access to the legacy version of Cron triggers for users without permissions to edit pipelines.| FALSE  |
| `accountInfoCopyButton`  | When enabled, the account ID is added to the URL. When sharing the URL with the account information, recipients can seamlessly switch accounts.   | FALSE         |
| `accessibilityContrast` | When enabled, displays an icon in the Codefresh toolbar allowing you to control the contrast by selecting the option that best suits the logged in user:{::nomarkdown}<ul><li><b>Invert colors</b> and <b>Bold colors (saturate)</b>: Optimized for visually impaired users.</li><li><b>Smart Contrast</b>: Increases the contrast between the text and the background to the maximum possible.</li></ul>{:/}| FALSE         |
|`allowUserUpdateBoards`| When enabled, allows users without admin roles to update Helm boards. Users can install, promote, create, and update sections.<br>See [Promoting Helm environments]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/). |FALSE |
| `cronTriggersInPipelineSpec`         | When enabled, allows users to define Cron triggers in the pipeline YAMLs as a `spec.cronTriggers` array, instead of using a separate API.<br>See [Cron trigger specifications]({{site.baseurl}}/docs/integrations/codefresh-api/#cron-triggers).  | TRUE         |
|`csdpFilterAppsByGitPermissions`      | When enabled (the default), does not display the Git Sources and the Argo CD applications committed to these Git Sources for users without Git permissions or Git credentials for the same. <!--- add ref -->   | TRUE         |
|`dindPodRequestsEqualLimits`   | When enabled, sets both the resource requests and limits for the pod to the same values.|FALSE |
|`disableWelcomeScreen` | When enabled, bypasses the Codefresh Welcome screen that requires the user to enter additional information on first sign-in. <br>Required mostly in on-premises environments, especially for LDAP, which has all login info already configured. | FALSE|
|`disableRolloutActionsWithoutRBAC` |Relevant to GitOps application deployments. <br>When enabled, disables rollback and rollout controls in the Timeline's tab's Rollout Player for the application. {::nomarkdown}<ul><li>Rollback for the selected Rollout. The <b>Choose version to Rollback</b> dropdown is disabled.<br>See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manually-rollback-completed-rollout-to-previous-revision">Manually rollback completed rollout to previous revision</a>. </li><li>The <b>Pause</b>, <b>Resume</b>, <b>Skip Step</b> and <b>Promote Full</b> controls in the Rollout Player are also disabled.<br>See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Manage an ongoing rollout with Rollout Player</a>.</li></ul>{:/} | FALSE |
| `disableInviteWelcomeMail`     | When enabled, does not send the Welcome email to users invited to an account.      | FALSE         |
|`forbidDecrypt` |When enabled, prevents users from decrypting secrets when running the `codefresh get context --decrypt` command. <br>Users can bypass this by running `--decrypt` with the built-in `CF_API_KEY` command that is injected into every build. |FALSE|
| `genAICronExpression`       | When enabled, supports generating Cron expressions in the Codefresh UI using Generative AI.| FALSE  |
|`gerritIntegration`      | When enabled, enables Gerrit integration in Account settings. See also `supportGerrit`. <br>See [Gerrit as Git provider for pipelines]({{site.baseurl}}/docs/integrations/git-providers/#gerrit).    | FALSE         |
|`gitopsArgoCdRollback` |Relevant to GitOps application deployments.<br>When enabled, allows you to rollback active GitOps applications to previously deployed versions.<br>See [Rollback GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#rollback-gitops-applications).| FALSE |
| `gitopsAppGroups`       | When enabled, allows users to group GitOps applications by annotations, and view these applications in the Groups tab of the GitOps Apps dashboard. <br>See [Application Groups for GitOps applications]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/). | TRUE   |
|`gitopsImageReporting` |Relevant to ProjectOne.<br>When enabled, reports images created with Codefresh Pipelines to the Images dashboard. <br>See [Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/).| FALSE |
| `hideCompositionsMenuItem`     | When enabled, does not show Compositions within Artifacts & Insights in the sidebar of the Codefresh UI. | FALSE  |
|`injectClusterListFromPipelineSettings` | When enabled, turns on the pipeline setting **Kubernetes cluster context pipeline injection** for the account. Individual users can then selectively inject clusters for pipelines from those to which they they access.<br><br> This feature requires the users to have the Update Cluster permission. If not granted, then this feature has no impact when enabled. <br>See [Enabling cluster-contexts for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#kubernetes-cluster-contexts-for-pipelines). | FALSE| 
|`logMasking` |When enabled, secrets in build logs, both online and offline logs, are masked and replaced by asterisks. <br><br>This feature is currently available only for Enterprise customers. |FALSE|
|`parallelKubectlOperations` |When enabled, allows running parallel steps that includes `kubectl`. Especially Helm `install` and `deploy` steps that deploy to multiple clusters with `kubectl` in parallel. |FALSE|
| `pipelineScopes`      | When enabled, enables Codefresh administrators to configure the API scopes for pipelines at account level. All pipelines in the account inherit these scopes. Codefresh administrators can also override these scopes for individual pipelines.<br>See [Pipeline scopes]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#pipeline-scopes).  | TRUE         |
|`promotionFlow` | New feature currently in development.<br>When enabled, allows you to drag an application in the GitOps Product dashboard from its current Environment to a different Environment and trigger a promotion flow. | FALSE         |
| `promotionWorkflows` | New feature currently in development.<br>When enabled, allows you create and run workflows when a promotion is triggered. | FALSE         |
|`restrictedGitSource` | When enabled, allows you to create a Restricted Git Source in addition to a standard Git Source. <br>See [Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)| FALSE         |
|`supportGerrit`      | When enabled, adds the capability to connect to Gerrit as a Git provider. <br>See [Gerrit as Git provider for pipelines]({{site.baseurl}}/docs/integrations/git-providers/#gerrit).     | FALSE         |
|`supportOpenIdConnectInBuilds`| When enabled (the default), supports OIDC in pipeline builds, including obtaining and using ID tokens to authenticate and authorize pipeline actions on cloud providers.<br>See [OpenID Connect for pipeline integrations]({{site.baseurl}}/docs/integrations/oidc-pipelines/). |TRUE|
| `stepTimeout`  | When enabled (the default), allows you to add the `timeout` flag with the `<duration>` and `<units>` to steps in pipelines. When added, the step terminates execution automatically if the step exceeds the duration of the specified timeout.<br> See [Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/) and browse the Field descriptions for any step type that is supported, [git-clone]({{site.baseurl}}/docs/pipelines/steps/git-clone/#fields) for example.  | TRUE         |
|`useLogsTimestamps` |When enabled, prepends the date and time to every line in the log. <br>This flag must be enabled to share URL for build logs.<br>When enabled, and you have build automation, you may need to adjust the regex for search as the line does not start with the log text.| FALSE| 
|`useRepoAndBranchesNextPagination`         | When enabled, when adding Triggers to pipeline workflows, the **Repository** dropdown  displays repositories and branches in paginated format, with the Next button for navigating between pages.  | FALSE         |




## Related articles
[Codefresh on-premises installation]({{site.baseurl}}/docs/installation/on-premises/)  
[Codefresh on-premises upgrade]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem-upgrade/)  
[Codefresh on-premises setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/)  