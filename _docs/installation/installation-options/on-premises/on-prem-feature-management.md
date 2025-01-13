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

The table describes in alphabetical order, the features you can open for Codefresh accounts.  


{: .table .table-bordered .table-hover}
| Feature                     | Description            |  Default | Notes |
| --------------              | --------------         | ------- | ------- |
| `appDiffView`  |When enabled, and the application is out of sync, displays the differences for each resource in the application in either Compact or Split view modes.<br>See [Analyze out-of-sync applications with Diff View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#analyze-out-of-sync-applications-with-diff-view) | TRUE         |  |
| `abacAndRule`       | When enabled, supports creating ABAC rules for entities in Codefresh pipelines using "AND". <br>See [Configuring rules for access control in pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/#rules-for-access-control).| TRUE  |  |
|`abacRuntimeEnvironments`    | When enabled (the default), allows creating rules in **Permissions** which impacts options in <b>Pipeline > Settings > Build Runtime</b>: {::nomarkdown}<ul><li><b>Build Runtime Environment</b>: When enabled, allows restricting Runtime Environments available for pipelines based on tags. Restricted Runtime Environments are disabled in the Runtime Environments list for the pipeline/build run.</li><li><b>Pipeline</b> actions:<ul><li><b>Manage resources</b>: Select CPU, memory, and minimum disk space for the pipeline/build run.</li><li><b>Set runtime environment</b>: Select a Runtime Environment from those available in the Runtime Environments list for the pipeline/build run.</li><li><b>Set cloud builds</b>: Set Cloud build and select the resource size for the pipeline/build run.</li></ul></li></ul> {:/}| TRUE   | _Default changed to TRUE in v2.5_  |
|`abacHermesTriggers`       | When enabled, restricts access to the legacy version of Cron triggers for users without permissions to edit pipelines.| FALSE  |  |
|`abacUIEnforcement`        |  When enabled (the default), for Pipelines, prevents the user from selecting options and performing actions which are not permitted.| TRUE  | _Default changed to TRUE in v2.5_ |
|`abacV2UIEnforcement`        | When enabled (the default), for GitOps, prevents the user from selecting options and performing actions which are not permitted.| TRUE  | _Default changed to TRUE in v2.5_ |
| `accountInfoCopyButton`  | When enabled (the default), adds the account ID to the URL. When sharing the URL with the account information, recipients can seamlessly switch accounts.   | TRUE         | _Default changed to TRUE in v2.5_  |
| `accessibilityContrast` | When enabled, displays an icon in the Codefresh toolbar allowing you to control the contrast by selecting the option that best suits the logged in user:{::nomarkdown}<ul><li><b>Invert colors</b> and <b>Bold colors (saturate)</b>: Optimized for visually impaired users.</li><li><b>Smart Contrast</b>: Increases the contrast between the text and the background to the maximum possible.</li></ul>{:/}| FALSE  |  |
|`allowUserUpdateBoards`| When enabled, allows users without admin roles to update Helm boards. Users can install, promote, create, and update sections.<br>See [Promoting Helm environments]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/). |FALSE |  |
|`autoBuildSwitchAccount`      | When enabled, and a user accesses a build from a different account, automatically switches to the corresponding account instead of the user having to do so manually.  | FALSE         |  |
| `buildsTreeView`  | When enabled (the default), shows a visualization of the parent and child builds of pipelines.<br>See [Creating build views]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#creating-build-views). | TRUE  |  |
| `cronTriggersInPipelineSpec`         | When enabled, allows users to define Cron triggers in the pipeline YAMLs as a `spec.cronTriggers` array, instead of using a separate API.<br>See [Cron trigger specifications]({{site.baseurl}}/docs/integrations/codefresh-api/#cron-triggers).  | TRUE         |  |
|`csdpFilterAppsByGitPermissions`      | When enabled (the default), does not display the Git Sources and the Argo CD applications committed to these Git Sources for users without Git permissions or Git credentials for the same. <!--- add ref -->   | TRUE         |  |
| `currentStateNodeExpand`  | When enabled, dynamically expands the nodes in the Current State's Tree view (in the GitOps Apps dashboard) to display the complete content. | FALSE         | _New in v2.6_ |
| `delightedSurvey`            | When enabled, displays Delighted CX surveys in the Codefresh UI. <br>If there are security concerns because of outbound requests from clients, disable this Feature Flag.  | TRUE|  |
|`dindPodRequestsEqualLimits`   | When enabled, sets both the resource requests and limits for the pod to the same values.|FALSE |  |
|`disableWelcomeScreen` | When enabled, bypasses the Codefresh Welcome screen that requires the user to enter additional information on first sign-in. <br>Required mostly in on-premises environments, especially for LDAP, which has all login info already configured. | FALSE|  |
|`disableRolloutActionsWithoutRBAC` |Relevant to GitOps application deployments. <br>When enabled, disables rollback and rollout controls in the Timeline's tab's Rollout Player for the application. {::nomarkdown}<ul><li>Rollback for the selected Rollout. The <b>Choose version to Rollback</b> dropdown is disabled.<br>See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manually-rollback-completed-rollout-to-previous-revision">Manually rollback completed rollout to previous revision</a>. </li><li>The <b>Pause</b>, <b>Resume</b>, <b>Skip Step</b> and <b>Promote Full</b> controls in the Rollout Player are also disabled.<br>See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Manage an ongoing rollout with Rollout Player</a>.</li></ul>{:/} | FALSE |   |
| `disableInviteWelcomeMail`     | When enabled, does not send the Welcome email to users invited to an account.      | FALSE         |  |
|`forbidDecrypt` |When enabled, prevents users from decrypting secrets when running the `codefresh get context --decrypt` command. <br>Users can bypass this by running `--decrypt` with the built-in `CF_API_KEY` command that is injected into every build. |FALSE| . |
| `fullstory`                   | When enabled, allows Codefresh to track user activity in the Codefresh UI through Fullstory.<br>**NOTE**: When enabled for air-gapped environments, client attempts to communicate with a Fullstory service may result in network errors.| FALSE  |  |
| `genAICronExpression`       | When enabled, supports generating Cron expressions in the Codefresh UI using Generative AI.| FALSE  |   |
|`gerritIntegration`      | When enabled, enables Gerrit integration in Account settings. See also `supportGerrit`. <br>See [Gerrit as Git provider for pipelines]({{site.baseurl}}/docs/integrations/git-providers/#gerrit).    | FALSE         |  |
|`gitopsArgoCdRollback` |Relevant to GitOps application deployments.<br>When enabled, allows you to rollback active GitOps applications to previously deployed versions.<br>See [Rollback GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#rollback-gitops-applications).| FALSE |  |
| `gitopsAppGroups`       | When enabled, allows users to group GitOps applications by annotations, and view these applications in the Groups tab of the GitOps Apps dashboard. <br>See [Application Groups for GitOps applications]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/). | TRUE   |  |
| `gitopsOnboarding` | When enabled, enhances the onboarding user-experience.| FALSE  | _New in v2.6_ |
| `gitopsGroupsPage` | When enabled, on selecting **GitOps Apps** from the sidebar, opens the **Groups** tab instead of the Applications tab.| TRUE  | _New in v2.6_ |
| `gitopsEnvironments` | When enabled (the default), displays the Environments dashboard option in the sidebar, and enables users to manage environments.| TRUE  |_New in v2.6_ |
| `gitopsDynamicBreadcrumbs`     | When enabled (the default), supports rendering dynamic breadcrumbs for GitOps.   | TRUE         |  |
|`gitopsImageReporting` |Relevant to ProjectOne.<br>When enabled, reports images created with Codefresh Pipelines to the Images dashboard. <br>See [Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/).| FALSE |  |
| `hideCompositionsMenuItem`     | When enabled, does not show Compositions within Artifacts & Insights in the sidebar of the Codefresh UI. | FALSE  |
|`injectClusterListFromPipelineSettings` | When enabled, turns on the pipeline setting **Kubernetes cluster context pipeline injection** for the account. Individual users can then selectively inject clusters for pipelines from those to which they they access.<br><br> This feature requires the users to have the Update Cluster permission. If not granted, then this feature has no impact when enabled. <br>See [Enabling cluster-contexts for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#kubernetes-cluster-contexts-for-pipelines). | FALSE|   |
|`logMasking` |When enabled, secrets in build logs, both online and offline logs, are masked and replaced by asterisks. <br><br>This feature is currently available only for Enterprise customers. |FALSE|  |
| `modulesConfigurationPage`     | When enabled (the default), enables administrators to customize the modules and menu items displayed in the sidebar. | TRUE         |_New in v2.6_ |
| `multiSource`            | When enabled, supports displaying information for multi-source applications in the **GitOps Apps > Current State** tab, and in the **Product > Releases** tab.   | FALSE| _New in v2.6_ |
| `newVariablesConfiguration` | When enabled, displays the new revamped form to add and configure variables in projects, pipelines, and triggers. | TRUE         |  _New in v2.6_ |
| `newLogo`     | When enabled (the default), displays the new logo in the Codefresh platform. | TRUE         |  _New in v2.6_ |
|`parallelKubectlOperations` |When enabled, allows running parallel steps that includes `kubectl`. Especially Helm `install` and `deploy` steps that deploy to multiple clusters with `kubectl` in parallel. |FALSE|  |
| `pipelineCreditConsumption` | When enabled (the default), supports credit-consumption analytics for pipelines. | TRUE         |  |
| `pipelineScopes`      | When enabled, enables Codefresh administrators to configure the API scopes for pipelines at account level. All pipelines in the account inherit these scopes. Codefresh administrators can also override these scopes for individual pipelines.<br>See [Pipeline scopes]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#pipeline-scopes).  | TRUE         |  |
| `productCRD`  | When enabled (the default), allows creating a Custom Resource Definition (CRD) for the Product entity in GitOps.  | TRUE         | _Default changed to TRUE in v2.6_ |
| `promotionOrchestration` | When enabled (the default), allows promotion orchestration for products including product's releases API and promotion flow API.  | TRUE    | _Default changed to TRUE in v2.6_ |
|`promotionFlow` | When enabled (the default), allows you to drag an application in the GitOps Product dashboard from its current Environment to a different Environment and trigger a promotion flow.<br>See [Manually trigger promotions through drag-and-drop]({{site.baseurl}}/docs/promotions/trigger-promotions/#manually-trigger-promotions-through-drag-n-drop). | TRUE   | _Default changed to TRUE in v2.6_ |
| `promotionFlowsManagement`     | When enabled (the default), enables the administrator to add, edit, and delete Promotion Flows. <br>See [Configure Promotion Flows]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/).| TRUE         |_New in v2.6_ |
| `promotionPolicies`     | When enabled (the default), displays Promotion Policies in the sidebar. <br>See [Configure Promotion Policies]({{site.baseurl}}/docs/promotions/configuration/promotion-policy/). | TRUE         | _New in v2.6_ |
| `promotionWorkflows` | When enabled (the default), allows you create and run workflows when a promotion is triggered.<br>See [Configure Promotion Workflows]({{site.baseurl}}/docs/promotions/configuration/promotion-workflow/).| TRUE  |_Default changed to TRUE in v2.6_  |
| `promotionCommitStatuses`    | When enabled, the promotion mechanism reports the statuses of Git commits to Git providers. | FALSE   | _New in v2.6_ |
| `reportBuildStatusPerPipelineTriggerEvent`     | Currently supported for Bitbucket cloud.<br>When enabled, for builds with the same `pipelineId`, reports build statuses separately per `triggerId` and trigger event. | FALSE         |  |
|`restrictedGitSource` | When enabled, allows you to create a Restricted Git Source in addition to a standard Git Source. <br>See [Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/git-sources/).| FALSE         |   |
|`supportGerrit`      | When enabled, adds the capability to connect to Gerrit as a Git provider. <br>See [Gerrit as Git provider for pipelines]({{site.baseurl}}/docs/integrations/git-providers/#gerrit).     | FALSE         |  |
| `rolloutPlayerLiveState` | When enabled (the default), updates Rollout events directly from AppProxy for faster response times. | TRUE    |  |
| `runtimeEnvironmentTags` | When enabled, allows creating rules in **Permissions** for **Build Runtime Environments** to enable or disable the Runtime Environments available for assignment to pipelines based on tags. Restricted Runtime Environments will appear disabled in **Pipeline > Settings > Build Runtime**.| FALSE  |   |
| `serviceAccounts` | When enabled (the default), allows Codefresh administrators to create shared Service Accounts not associated with specific users for centralized access and permissions management. | TRUE         | _Default changed to TRUE in v2.5_  |
|`supportOpenIdConnectInBuilds`| When enabled (the default), supports OIDC in pipeline builds, including obtaining and using ID tokens to authenticate and authorize pipeline actions on cloud providers.<br>See [OpenID Connect for pipeline integrations]({{site.baseurl}}/docs/integrations/oidc-pipelines/). |TRUE|  |
| `stepTimeout`  | When enabled (the default), allows you to add the `timeout` flag with the `<duration>` and `<units>` to steps in pipelines. When added, the step terminates execution automatically if the step exceeds the duration of the specified timeout.<br> See [Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/) and browse the Field descriptions for any step type that is supported, [git-clone]({{site.baseurl}}/docs/pipelines/steps/git-clone/#fields) for example.  | TRUE         |  |
|`useLogsTimestamps` |When enabled, prepends the date and time to every line in the log. <br>This flag must be enabled to share URL for build logs.<br>When enabled, and you have build automation, you may need to adjust the regex for search as the line does not start with the log text.| FALSE|  | 
| `systemFonts`     | When enabled (the default), uses system fonts instead of custom fonts in the UI. | TRUE         | _New in v2.6_ |
| `useSeparatePlanner` |When enabled, uses the new version of the Planner for pipelines.  | FALSE    | _New in v2.6_ |
|`useRepoAndBranchesNextPagination`         | When enabled, when adding Triggers to pipeline workflows, the **Repository** dropdown displays repositories and branches in paginated format, with the Next button for navigating between pages.  | TRUE         | _Default changed to TRUE in v2.6_ |
| `yamlTreeJsonPathBuilder`     | When enabled, displays the YAML file in tree mode, allowing users to easily select an attribute and automatically generate a JSON path. Available in **Product > Settings > Promotion Settings**.   | TRUE         |  _New in v2.6_ |




## Related articles
[Codefresh on-premises installation]({{site.baseurl}}/docs/installation/on-premises/)  
[Codefresh on-premises upgrade]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem-upgrade/)  
[Codefresh on-premises account & user setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/)  