---
title: "Codefresh on-premises setup"
description: "Set up accounts and users in Codefresh after installing the on-premises platform"
group: installation
toc: true
---
After installing Codefresh on-premises successfully, before users can create projects and pipelines, you need to complete setup tasks, as described in this article.

The Codefresh Admin Management panel provides all the options you need for setup. Review the [options available in Admin Management](#quick-reference-codefresh-admin-management-settings), or continue with the steps below to complete the setup for Codefresh on-premises for your organization:
1. Sign in to Codefresh
1. Add a Codefresh account 
1. Invite a user to the Codefresh account
1. Enable features for the Codefresh account
1. Set login options for Codefresh account
1. Set the system type for Codefresh account






## On-premises account and user setup

### Step 1: Sign in to Codefresh
Sign in to Codefresh for the first time after on-premises platform installation. You will sign in with the default username and password.

1. In the **Sign In** page, click **Codefresh**.
1. Enter the default **Username** `AdminCF` and **Password**, also `AdminCF`. 
1. Click **Sign In**.

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/sign-in-cf-admin.png"
  url="/images/installation/on-prem-setup/sign-in-cf-admin.png"
  alt="Signing in to Codefresh after platform installation"
  caption="Signing in to Codefresh after platform installation"
  max-width="50%"
    %}  

{:start="4"}
1. Continue with [Step 2: Add a Codefresh account](#step-2-add-a-codefresh-account).


### Step 2: Add a Codefresh account 
Before creating projects and pipelines, set up Codefresh accounts for your organization.  

Only those settings required for initial set up are described here.  
For a description of all options for Accounts, see [Quick reference: Account settings](#quick-reference-account-settings) in this article.

1. From your avatar dropdown, select **Admin Management**.

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/select-admin-panel.png"
  url="/images/installation/on-prem-setup/select-admin-panel.png"
  alt="Admin Management for on-premises"
  caption="Admin Management for on-premises"
  max-width="50%"
    %} 

{:start="2"}
1. From the sidebar, select **Accounts**.  
  The Accounts page displays two default accounts, the `codefresh-system-account` and the `admin-cf account`. 
 
 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/admin-accounts-page.png"
  url="/images/installation/on-prem-setup/admin-accounts-page.png"
  alt="Account setup and management for on-premises"
  caption="Account setup management for on-premises"
  max-width="60%"
    %} 

{:start="3"}
1. In the toolbar on the right, click the **+** icon.
1. In **Create New Account**, enter the account name and click **Create**.  
  The new account is displayed in the list of Accounts.
1. Click the **System Type** column, select the System Type you need, and then click **Save**.
1. Set the number of **Runtime Environments** for this account.
1. Set the number of **Parallel Builds**.
1. In the **Collaborators** column, click the **Edit** icon and increase the count to equal the number of users you plan on inviting to the account, and then click the **Save** icon. 
  You can always change this later.
1. If you have a Windows environment, set the number of **Nodes**.
1. To enable username-password login for the users in this account, set **User/Pass Enabled** to **ON**.
1. To disable users in this account from using their personal accounts to sign in to Codefresh, set **Disable Personal Account** to **ON**.
1. For Windows environments, set the **Codefresh Env** to use.
1. Continue with [Step 3: Invite a user to a Codefresh account](#step-3-invite-a-user-to-a-codefresh-account).

### Step 3: Invite a user to a Codefresh account

Invite users to the Codefresh account you created.  
The maximum number of users you can invite to your account depends on the number of Collaborators defined for the account.
Once users are invited, their statuses remain as Pending until they accept the invitations.



1. From the account's context menu, select **Invite user into account**.

 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/user-invite-to-account.png"
  url="/images/installation/on-prem-setup/user-invite-to-account.png"
  alt="Invite user to Codefresh account"
  caption="Invite user to Codefresh account"
  max-width="60%"
    %} 

{:start="2"}
1. Enter the user's email address and click **Add**.

  {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/invite-user-to-account.png"
  url="/images/installation/on-prem-setup/invite-user-to-account.png"
  alt="Sending the invite to the user"
  caption="Sending the invite to the user"
  max-width="60%"
    %} 

  The Users list displays the predefined `codefresh-system` and the `AdminCF` users, and the user you invited. 
  * The username is automatically generated by Codefresh.
  * The Email column shows the email address.
  * The Status column shows Pending. 

 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/users-page-with-new-user.png"
  url="/images/installation/on-prem-setup/users-page-with-new-user.png"
  alt="Newly invited user with Pending status"
  caption="Newly invited user with Pending status"
  max-width="60%"
    %}

{:start="3"}
1. Optional. To enable username-password login for the user, complete these additional steps:
  1. Click the icon to the left of the username, and select **Show Invite Link**.
  1. Copy the link from the popup that appears and click **OK**.
  1. Send the link to the user, requesting the user to sign in with the link for the first time.
1. Continue with [Step 4: Enable features for the account](#step-4-enable-features-for-the-account).




### Step 4: Enable features for the account 
Enable features to open them for Codefresh accounts in your organization.  
You can either enable features for a single account at a time, selectively for multiple accounts, or for all accounts. 

**Enable/disable features for a specific account**  
1. Make sure you are in **Admin Management**.
1. From the sidebar, select **Accounts**.
1. To filter the feature list, from the **All** dropdown list, select the category you want to see. 

 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/enable-features-for-account-accounts.png"
  url="/images/installation/on-prem-setup/enable-features-for-account-accounts.png"
  alt="Enable features for a specific Codefresh account"
  caption="Enable features for a specific Codefresh account"
  max-width="60%"
    %}

{:start="4"}
1. To enable a feature for the account, below **Enable**, toggle the required feature to **ON**. 
1. Continue with [Step 5: (Optional) Set login options for account](#step-5-optional-set-login-options-for-account).

**Enable/disable features for all accounts**  
If you have created more than one Codefresh account for your organization, you can enable features for all the accounts.

1. Make sure you are in **Admin Management**.
1. From the sidebar, click **Feature Management**. 
1. To enable a feature for all the accounts, under **Enable**, toggle the required feature to **ON**. 
1. Continue with [Step 5: (Optional) Set login options for account](#step-5-optional-set-login-options-for-account).

**Enable System Features**    
System Features are generally for internal use. 
For convenience and ease of set up, _turn on ONLY the System Features listed in this section_. You can turn them on for all Codefresh accounts, if you have created more than one account.

>**IMPORTANT:**  
Codefresh strongly recommends against enabling the System Features not explicitly mentioned here, unless you are familiar with the implications of turning on each of the features.  
If you need to turn on a feature, we recommend contacting Codefresh support. 

1. Make sure you are in **Admin Management**.
1. From the sidebar, click **Feature Management**. 
1. Toggle **System Features** on the top right to **ON**.
1. In the Search Features field, search for the following features in turn, and then toggle **Enabled** to **ON** for each of them:
  * `ssoManagement`: Enables user login with SSO provider integrations set up in Codefresh.
  * `teamsManagement`: Enables the account administrator to create teams, and assign users in an account to one or more teams.
  * `emailDomainManagement`: Enables restricting user invitations to the domains defined.

 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/enable-system-features.png"
  url="/images/installation/on-prem-setup/enable-system-features.png"
  alt="Enable system features for a Codefresh account"
  caption="Enable system features for a Codefresh account"
  max-width="60%"
    %}

{:start="5"}
1. Continue with [Step 5: (Optional) Set login options for account](#step-5-optional-set-login-options-for-account).

    
### Step 5: (Optional) Set login options for account
Control the login mechanisms available for users in this account, from among Git providers, IdPs, SSO providers, and Codefresh for username-password login.
By default, all login mechanisms are enabled, and users will see all the options in the Sign-In page. 

 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/default-sign-in-accnt-user.png"
  url="/images/installation/on-prem-setup/default-sign-in-accnt-user.png"
  alt="Default Sign-In page with all login options"
  caption="Default Sign-In page with all login options"
  max-width="50%"
    %}

>**NOTES**:  
To login via SSO or LDAP, you must first set up an integration with an [SSO provider]({{site.baseurl}}/docs/administration/single-sign-on/) or [LDAP]({{site.baseurl}}/docs/administration/single-sign-on/ldap/).  
To use Codefresh login, User/Pass must be enabled for the account, as described in [Quick reference: Account settings](#quick-reference-account-settings) in this article. 

1. Make sure you are in **Admin Management**.
1. From the sidebar, select **Login Options**.
1. If needed, disable one or more login options for the account.

 {% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/login-options.png"
  url="/images/installation/on-prem-setup/login-options.png"
  alt="Login options for account"
  caption="Login options for account"
  max-width="60%"
    %} 

{:start="4"}
1. Continue with [Step 6: Set the System Type for Codefresh account](#step-6-set-the-system-type-for-codefresh-account).

### Step 6: Set the System Type for Codefresh account
Select the Codefresh module to activate for users in the account. By default, the System Type is set to Classic, which activates the Codefresh pipelines module. 
For more information on System Types, see [Quick reference: Account settings](#quick-reference-account-settings) in this article.


1. Make sure you are in **Admin Management**.
1. From the sidebar, select **Accounts**. 
1. Select the row with the account for which to change the system type, and click the **System Type** column.

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/select-system-type.png"
  url="/images/installation/on-prem-setup/select-system-type.png"
  alt="System Types for Codefresh accounts"
  caption="System Types for Codefresh accounts"
  max-width="50%"
    %} 

{:start="4"}
1. Select the System Type to activate:  
  * **Classic**: Codefresh pipelines only.
  * **GitOps**: GitOps applications integrated with ArgoCD.
  * **Project One**: The New Codefresh Experience with Classic Pipelines and GitOps as a single module with a unified sidebar menu and shared administration and configuration. 
  * **GitOps + Classic**: Available as two different modules, with one of them active at any one time. You can toggle between the modules.
   
### What to do next
Depending on the System Type activated, you are now ready to create:
* Projects
* Pipelines
* Integrations for pipelines, GitOps
* Applications

See our [CI/CD]({{site.baseurl}}/docs/quick-start/ci-quick-start/) and [GitOps]({{site.baseurl}}/docs/quick-start/gitops-quick-start/) quick starts.

## Quick reference: Codefresh Admin Management settings

## Quick reference: Account settings

Here's an example of the Account settings page in Admin Management.

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/admin-accounts-page.png"
  url="/images/installation/on-prem-setup/admin-accounts-page.png"
  alt="Codefresh account settings"
  caption="Codefresh account settings"
  max-width="60%"
    %}


The table describes the settings for available Codefresh accounts. Several settings are intended for internal use only and indicated as such. 


{: .table .table-bordered .table-hover}
| Account Setting                     | Description            | 
| --------------              | --------------         | 
|**Activated/Suspended/Increased attention**     | Automatically set and managed by Codefresh.  |  
|**Account name**     | The name of the account.<br>To change, click the **Edit** icon. |  
|**System type**     | The Codefresh module to activate for this account. Selecting a System Type switches the account to one of the following:<br>{:nomarkdown}<ul><li><b>Classic</b>: Codefresh pipelines only.</li><li><b>GitOps</b>: GitOps applications integrated with ArgoCD.</li><li><b>Project One</b>: The New Codefresh Experience with Classic Pipelines and GitOps as a single module with a unified sidebar menu and shared administration and configuration. <br>See [The New Codefresh Experience]({{site.baseurl}}/docs/new-codefresh/enable-new-experience/) and [Menu Navigation]({{site.baseurl}}/docs/new-codefresh/menu-navigation/).</li><li><b>GitOps + Classic</b>: Available as two different modules, with one of them active at any one time. You can toggle between the modules.<br>See [Codefresh for CI]({{site.baseurl}}/docs/getting-started/ci-codefresh/) and [Codefresh for CD]({{site.baseurl}}/docs/getting-started/cd-codefresh/).</li></ul>{:/}   | 
|**Creation date**     | The date the account was created. |  
|**Amount of admins**    | The number of users with administrator roles for this account. |  
|**Support plan**    | Leave as is. Managed by Codefresh.  |  
|**Wire transfer**    | Leave as is. Managed by Codefresh.  |  
|**Segment**    | Leave as is. Managed by Codefresh. | 
|**Limit of environments**    | The number of Runtime Environments for this account. |  
|**Parallel builds**    | The number of concurrent builds permitted according to the CPU/Memory resource allocation. what is 1/1/1 Every size shows the licensed number of concurrent builds and the number actually running. with the Runtime Environment for the account ?? :{:nomarkdown}<ul><li>Small: Codefresh pipelines only</li> <br>You can also set this as part of account-level settings for pipelines. See   |  | 
|**Nodes**    | Relevant for when Codefresh on-premises is installed on Windows. The   |  | 
|**User/pass enabled**    | Enable username-password combination as a login mechanism for users in this account. <br>When enabled, the Sign-In screen displays **Codefresh** as a login option, and users can supply the username and password as login credentials. | 
|**Disable personal account**    | When enabled (recommended), prevents users from logging in with their personal accounts, and allows login only with the company/organization account. | 
|**Launch cluster**    | ??? |   
|**Data retention**    | The length of time in weeks for which to retain builds and logs for Codefresh pipelines. <br>The retention period can be set through the slider, or through environment variables. See [Retention policy for builds and logs in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#retention-policy-for-builds-and-logs){:target="\_blank"} and select the one according to the on-premises version installed.   |  
|**Collaborators**    | The number of users permitted for this account. If you keep the count as one, Codefresh displays an error that you have reached the user limit and prevents you from inviting additional users.  | 
|**Runtime environments**    | Leave as is. Managed by Codefresh. |  
|**Codefresh environments**    | The environment to select for the Windows nodes. |  
|**Actions**    | The actions available for the account, displayed by clicking the context menu to the right of the account:{:nomarkdown}<ul><li><b>Audit by account</b>: Takes you to the Audit page.<br>See ??? </li><li><b>Invite user to account</b>: Opens the popup where you can specify the email of the user to invite to the account. To add the admin role for this user, select <b>Set the user as admin to this account</b>.</li><li><b>Assign new feature</b>: Displays the list of features where you can enable/disable specific features for this account. <br>See [Quick reference: On-premises feature list](#quick-reference-on-premises-feature-list) in this article. </li><li>**Show account domains**: Restrict user invitations to specific email domains. Clicking <b>Add Domain</b> lets you add the email domains to allow.<br>See also [Define session timeouts and domain restrictions for user accounts]({{site.baseurl}}/docs/administration/account-user-management/add-users/#define-session-timeouts-and-domain-restrictions-for-user-accounts).</li>| 



## Quick reference: On-premises feature list

Here is an example of the Feature Management page in Admin Management. 

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
[On-premises installation]({{site.baseurl}}docs/installation/on-premises/)  
