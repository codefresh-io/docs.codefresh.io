


## Step 1: Sign in to Codefresh
Sign in to Codefresh for the first time after on-premises platform installation.
  In the Sign In page, click Codefresh.
  Enter the default username and password. 
  Click Sign In.


## Step 2: Add an account 
Before creating projects and pipelines, set up Codefresh accounts for your organization.
1.  From your avatar dropdwon, select Admin Management.
1. From the sidebar, select Accpunts.
  The Accounts page displays two default accounts, the codefresh-system-account and the admin-cf account. 

  For a description of the fields in the Accounts page and what youc an do 
1. In the toolbar on the right, click the + icon.
1. In Create New Account, enter the account name and click Create.
  The new account is dsiplayed in the list of Accounts.
1. Set the system type
  Click the System Type column.
  Click the System Type you need, and then click Save.
1. Set the number of Runtime Environments for this account.
1. Set the number of Parallel Builds:
1. If you have a Windows environment, set the number of Nodes.
1. To enable username-Passowrd sign in for the users in this account, set User/Pass Enabled to ON.
1. To disable users in this account from using their personal accounts to sign in to Codefresh, set Disable Personal Account to ON.
1. For Windows environments, set the Codefresh Env to use.
   

## Step 3: Invite a user to Codefresh

The Uers page displays two default accounts, the codefresh-system user and the AdminCF user you used to sign in. 
1. Click Back to Application.
1. From your avatar dropdwon, select Account Settings.
1. Do the following:
  1. From the sidebar, select Users & Teams.
  1. Click Add User. Enter the email address of the user to add, and then click Invite.
1. Now go back to your avatar dropdwon and select Admin Management.
1. From the sidebar, select Accounts.
1. Click the context menu of the account to which to invite the user, and select Invite user into account.
1. Enter the email and click Add.
1. From the sidebar, select **Users** and click the login icon. to see options.
    - Select **Show invite link**
    - Copy link and share with user
    - Then go to the account and  and 

## Step 4: Set features for the account 
Enable the features for this account. Note that you can enable features for the account you are currently signed into, or for additional accounts. 
1. In Admin Management, from the sidebar, select **Feature Management**. 
1. To enable a feature for the account,  below **Enable**, toggle the required feature to **ON**. 
1. Optional ; to enable or disable the feature for specific accounts, click the **Edit** icon, and then select the accounts from the **Enable feature for** and **Disable feature for** lists, as required.

>**IMPORTANT**:  
System Features are generally for internal use.  
Codefresh strongly recommends against enables these features on your own unless you are familiar with the implications of each feature. We recommend doing so with Codefresh support as shpwn in the warning. 


## Step 5: Set login options for account
Control the login mechanisms available for users in this account, from among Git providers, IdPs, SSO providers, and Codefresh for username-password login.
By default, all mechanisms are enabled, and users will see all the options in the Sign-In page.  

To use Codefresh login, User/Pass must be enabled for the account. 









## Account settings
Several of the settings are intended for internal use only. 

{: .table .table-bordered .table-hover}
| Account Setting                     | Description            |  Comments | 
| --------------              | --------------         | ------- | 
|Activated/Suspended/Increased attention     | Automatically set and managed by Codefresh.  | N/A | 
|Account name     | The name of the account.<br>To change, click the Edit icon. |  | 
|System type     | The system type to toggle to:<br>{:nomarkdown}<ul><li>Classic: Codefresh pipelines only</li><li>GitOps: GitOps applications integrated with ArgoCD</li><li>Project One: The New Codefresh Experience with Classic Pipelines and GitOps available as a single modeul with no separatop. See more about .</li><li>GitOps + Classic: Available as two different modules, with one of them active at any one time. Can toggle between them but only is active  separate modules</li></ul>{:/}   |  | 
|Creation date     | The date the account was created. |  | 
|Amount of admins    | The number of users with administrator roles for this account. |  | 
|Support plan    | Automatically set and managed by Codefresh.  |  | 
|Wire transfer    | N/A Automatically set and managed by Codefresh.  |  | 
|Segment    | N/A Automatically set and managed by Codefresh. |  | 
|Limit of environments    | The number of Runtime Environments for this account. |  | 
|Parallel builds    | The number of concurrent builds permitted according to the CPU/Memory resource allocation. what is 1/1/1 Every size shows the licensed number of concurrent builds and the number actually running. with the Runtime Environment for the account ?? :{:nomarkdown}<ul><li>Small: Codefresh pipelines only</li>   |  | 
|Nodes    | Relevant for Windows platform installation. The   |  | 
|User/pass enabled    | Required to enable the username-password login mechanism for users in this account.  |  | 
|Disable personal account    | When enabled, recommended, disables sign for users with their personal accounts, and enforces sign in only with the company/organization account. |  | 
|Launch cluster    | ??? |  | 
|Data retention    | The length of time in weeks for which to retain builds and logs for Codefresh pipelines. The retention period can be set through the slider, or through environment variables. See [Retention policy for builds and logs in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#retention-policy-for-builds-and-logs){:target="\_blank"} and select the one according to the on-premises version installed.   |  | 
|Collaborators    | The number of external collaborators who can access and take actions on the Git repositories in your organization.|  | 
|Runtime environments    | N/A. Managed by Codefresh. |  | 
|Codefresh environments    | The environment to select for the Windows nodes. |  | 
|Actions    | Clicking the context menu to the right of the account, shows the following actions:{:nomarkdown}<ul><li>**Audit by account**: Takes you to the Audit page </li><li>**Invite user to account**: Opens the popup where you can specify the email of the user to invite to the account. To add the admin role for this user, select Set the user as admin to this account.</li><li>**Assign new feature**: Enable/disable features for this account. See ???  </li><li>**Show account domains**: View/add domains for the account. dding domains to an account refers to the process of associating specific web addresses with your Codefresh account. How does this interact with User Invitation - restrict users to  See ???  </li>|  | 


