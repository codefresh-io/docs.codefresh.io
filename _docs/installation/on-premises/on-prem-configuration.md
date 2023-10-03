---
title: "Codefresh on-premises setup"
description: "Set up accounts and users in Codefresh after installing the on-premises platform"
group: installation
toc: true
---
After installing Codefresh on-premises successfully, before users can work magic with Codefresh pipelines, as the Codefresh account administrator you need to complete setup tasks, as described in this article.

The Codefresh Admin Management panel provides all the options you need for setup.


Review the options available in [Admin Management](#quick-reference-admin-management-settings) and [Account management](#quick-reference-account-settings), or continue with the steps below to complete the setup for Codefresh on-premises for your organization:
1. Sign in to Codefresh
1. Add a Codefresh account 
1. Invite a user to the Codefresh account
1. Enable features for the Codefresh account
1. Set login options for Codefresh account
1. Set the system type for Codefresh account






## On-premises account setup

### Step 1: Sign in to Codefresh
Sign in to Codefresh for the first time after on-premises platform installation with the default username and password.

1. In the **Sign In** page, click **Codefresh**.
1. Enter the default **Username** and **Password**. 
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
Before creating projects and pipelines, add Codefresh accounts for your organization.  

Only those settings required for initial set up are described here.  
For a description of all settings available for a Codefresh account, see [Quick reference: Account settings](#quick-reference-account-settings) in this article.

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
1. Click the **System Typee** column, and do the following:
  1. Select the System Type for the account:
    * **Classic**: Codefresh pipelines only.
    * **GitOps**: GitOps applications integrated with ArgoCD.
    * **Project One**: The New Codefresh Experience with Classic Pipelines and GitOps as a single module with a unified sidebar menu and shared administration and configuration. 
    * **GitOps + Classic**: Available as two different modules, with one of them active at any one time. You can toggle between the modules.
  1. Click **Save**.
1. Set the number of **Runtime Environments** for this account.
1. Set the number of **Parallel Builds**.
1. In the **Collaborators** column, click the **Edit** icon and increase the count to equal the number of users you plan on inviting to the account, and then click the **Save** icon. 
  You can always change this later.
1. If you have a Windows environment, set the number of **Nodes**.
1. To enable username-password login for the users in this account, set **User/Pass Enabled** to **ON**.
1. To disable users in this account from creating personal after first signing in to Codefresh, set **Disable Personal Account** to **ON**.
1. For Windows environments, set the **Codefresh Env** to use.
1. Continue with [Step 3: Invite a user to a Codefresh account](#step-3-invite-a-user-to-a-codefresh-account).

### Step 3: Invite a user to a Codefresh account

Invite one or more to the Codefresh account you created.  
The maximum number of users you can invite to your account depends on the number of Collaborators defined for the account. A Collaborator is a Codefresh user who can access the UI and perform actions.
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
    1. Send the link to the user, requesting the user to sign in to Codefresh with the link for the first time.
1. Continue with [Step 4: Enable features for the account](#step-4-enable-features-for-the-account).




### Step 4: Enable features for the account 
Enable features to open them for Codefresh accounts in your organization.  
This step describes how to enable features for a single account at a time.

>**NOTE**:  
To enable features selectively for specific accounts, or for all accounts in the organization, see [Codefresh on-premises feature management]({{site.baseurl}}/docs/installation/on-premises/on-prem-feature-management/).



#### Enable/disable features for a specific account

**Before you begin**  
Review [feature descriptions]()

**How to**  

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



#### Enable System Features  
System Features are generally for internal use. 
For convenience and ease of set up, _turn on ONLY the System Features listed in this section_. You can turn them on for all Codefresh accounts, if you have created more than one account.

>**IMPORTANT:**  
Codefresh strongly recommends against enabling the System Features not explicitly mentioned here, unless you are familiar with the implications of turning on each of the features.  
If you need to turn on a feature, we recommend to first contact Codefresh support. 

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



You have now created a Codefresh account, added one or more users the account, and enabled or disabled features for the account.
Review **What to do next** for next steps.

    

   
### What to do next
* Set the [options]({{site.baseurl}}/docs/administration/account-user-management/login-options/) to display in the Sign-In page
* Depending on the System Type activated, you are now ready to create:
  * [Projects and pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
  * Pipeline integrations for [Git providers]({{site.baseurl}}/docs/integrations/git-providers/), [Docker registries]({{site.baseurl}}/docs/integrations/docker-registries/) and more
  * [GitOps]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/) integrations for image enrichment
* [GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application)

See our quick starts for [CI/CD]({{site.baseurl}}/docs/quick-start/ci-quick-start/) and [GitOps]({{site.baseurl}}/docs/quick-start/gitops-quick-start/).


## Quick reference: Admin Management settings
The Admin Management panel is your one-stop location to set up Codefresh according to your requirements. 

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/admin-management-panel.png"
  url="/images/installation/on-prem-setup/admin-management-panel.png"
  alt="Admin Management options for Codefresh on-premises"
  caption="Admin Management options for Codefresh on-premises"
  max-width="60%"
    %}

The table describes the options in Admin Management relevant for Codefresh account administrators.  

{: .table .table-bordered .table-hover}
| Account Setting                     | Description            | 
| --------------              | --------------         | 
|**Users**     | The list of users added to the account. In addition to the personal and login information, you can see the roles assigned to the user, the accounts they belong to, their current status and most recent login. |  
|**Accounts**     | The configuration settings defined for the account.<br> See [Quick reference: Account settings](#quick-reference-account-settings).  | 
|**Nodes**     | Applicable only to Windows on-premises environments. The Docker nodes created for the account.  | 
|**IDPs**     | The SSO integrations set up in Codefresh.  | 
|**Runtime Environments**     | The predefined and user-defined Runtime Environments. {::nomarkdown}<ul><li><b>System</b>: The global Runtime Environments defined by Codefresh, available to your organization. When defining the account settings, you can select one of the predefined Runtime Environments for the account. </li><li><b>Account</b>: The Runtime Environments defined for the account.</li></ul>{:/}| 
|**Audit**     | The actions audited by Codefresh across all accounts in your organization, based on the API calls made to Codefresh. You can filter by Account, the type of Entity or Action, and Status. | 
|**Approvals**     | The Codefresh accounts deleted after approval of the delete request.<br>You can restore a deleted account through the **Restore Account** option.   | 
|**Features Management**     | The features to enable/disable for all or specific accounts in your organization. <br>See [Quick reference: On-premises feature list](on-prem-configuration/#quick-reference-on-premises-feature-list).  | 
|**Restore Account**     | The list of deleted accounts for your organization, and the option to restore them by clicking **Restore Account** in the Actions column.  | 



## Quick reference: Account settings

Here's an example of the Account settings page in Admin Management.

{% include image.html
  lightbox="true"
  file="/images/installation/on-prem-setup/admin-accounts-page.png"
  url="/images/installation/on-prem-setup/admin-accounts-page.png"
  alt="Settings for Codefresh accounts"
  caption="Settings for Codefresh accounts"
  max-width="60%"
    %}


The table describes the settings for available Codefresh accounts. 

>**NOTE**:  
Settings that are _not_ described in this table are not applicable to on-premises environments and can be ignored.


{: .table .table-bordered .table-hover}
| Account Setting                     | Description            | 
| --------------              | --------------         | 
|**Activated/Suspended/Increased attention**     | Automatically set and managed by Codefresh.  |  
|**Account name**     | The name of the account.<br>To change, click the **Edit** icon. |  
|**System type**     | The Codefresh module to activate for this account. Selecting a System Type switches the account to one of the following:<br>{::nomarkdown}<ul><li><b>Classic</b>: Codefresh pipelines only.</li><li><b>GitOps</b>: GitOps applications integrated with ArgoCD.</li><li><b>Project One</b>: The New Codefresh Experience with Classic Pipelines and GitOps as a single module with a unified sidebar menu and shared administration and configuration. <br>See <a href="https://codefresh.io/docs/docs/new-codefresh/enable-new-experience/">The New Codefresh Experience</a> and <a href="https://codefresh.io/docs/docs/new-codefresh/menu-navigation/">Menu Navigation</a>.</li><li><b>GitOps + Classic</b>: Available as two different modules, with one of them active at any one time. You can toggle between the modules.<br>See <a href="https://codefresh.io/docs/docs/getting-started/ci-codefresh/">Codefresh for CI</a> and <a href="https://codefresh.io/docs/docs/getting-started/cd-codefresh/">Codefresh for CD</a>.</li></ul>{:/}   | 
|**Creation date**     | The date the account was created. |  
|**Amount of admins**    | The number of users with administrator roles for this account. |  
|**Limit of environments**    | Leave as is.  |  
|**Parallel builds**    | The number of parallel Runner builds for pipelines. Generally unlimited for on-premises. |  
|**Nodes**    | Relevant for when Codefresh on-premises is installed on Windows. The number of console nodes you can connect to.   |  
|**User/pass enabled**    | Enable username-password combination as a login mechanism for users in this account. <br>When enabled, the Sign-In page displays **Codefresh** as a login option, and users can supply the username and password as login credentials. | 
|**Disable personal account**    | When enabled (recommended), prevents users from creating personal accounts after signing in to Codefresh for the first time on receiving invitations. |    
|**Data retention**    | The length of time in weeks for which to retain builds and logs for Codefresh pipelines. <!--- <br>The retention period can be set through the slider, or through environment variables. See [Retention policy for builds and logs in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#retention-policy-for-builds-and-logs){:target="\_blank"} and select the one according to the on-premises version installed. -->  |  
|**Collaborators**    | The number of users permitted for this account. A Collaborator is a Codefresh user who can access the UI. If you keep the count as one, Codefresh displays an error that you have reached the user limit and prevents you from inviting additional users.  | 
|**Runtime environments**    | Optional. The System Runtime Environments to select for this account. The System Runtime Environments are global Runtime Environments predefined by Codefresh. |  
|**Codefresh environments**    |Optional. For Windows environments, the Codefresh environment to select for the Windows nodes. |  
|**Actions**    | The actions available for the account, displayed by clicking the context menu to the right of the account:{::nomarkdown}<ul><li><b>Audit by account</b>: Takes you to the Audit page.<br>See <a href="https://codefresh.io/docs/docs/administration/account-user-management/audit/">Auditing actions in Codefresh</a>. </li><li><b>Invite user to account</b>: Opens the popup where you can specify the email of the user to invite to the account. To add the admin role for this user, select <b>Set the user as admin to this account</b>.</li><li><b>Assign new feature</b>: Displays the list of features where you can enable/disable specific features for this account. <br>See <a href="https://codefresh.io/docs/docs/installation/on-premises/on-prem-configuration/#quick-reference-on-premises-feature-list">Quick reference: On-premises feature list</a> in this article. </li><li>**Show account domains**: Restrict user invitations to specific email domains. Clicking <b>Add Domain</b> lets you add the email domains to allow.<br>See also <a href="https://codefresh.io/docs/docs/administration/account-user-management/add-users/#define-session-timeouts-and-domain-restrictions-for-user-accounts">Define session timeouts and domain restrictions for user accounts</a>.</li> {:/}| 



## Related articles
[On-premises feature management]({{site.baseurl}}/docs/installation/on-premises/on-prem-feature-management/)  
[Codefresh on-premises upgrade]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem-upgrade/)
