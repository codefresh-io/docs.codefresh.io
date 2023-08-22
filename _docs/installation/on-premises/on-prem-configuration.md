

Sign in to Codefresh
  As default user
  Create your user 

Add an account 
  - Name 
  - Set the system type
  - Enable username/password login for the user
  - Disable personal account-based login 

Add a user to an account
    - Invite user: Got to context menu for account
    - select Invite user into account
    - Enter the email and click Add.
    - From the sidebar, select **Users** and click the login icon. to see options.
    - Select **Show invite link**
    - Copy link and share with user
    - Then go to the account and  and 

Set features for the account 
   - Access - two options
   - 

- Login options for a user
   Control the login mechanisms available for the user.
    - Git provider
    - Codefresh for Username/password login mechanism
    - SSO - IdP
- enable new experience




## Add an account in Codefresh

1. Sign in to Codefresh.
1. On the top-right, click your avatar and then select **Admin Panel**.
1. On the sidebar, click **Accounts**.
1. Click the **+** icon on the top-left.
Enter the account name and click **Create**.


### Account settings
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
|User/pass enabled    | Required to enable username-password login mechanisme for users in this account.  |  | 
|Disable personal account    | When enabled, recommended, enforces that the user can log in only with the compnay/organization account, and not with their personal accounts. |  | 
|Launch cluster    | ??? |  | 
|Data retention    | The length of time in weeks for which to retain builds and logs for Codefresh pipelines. The retention period can be set through the slider, or through environment variables. See [Retention policy for builds and logs in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#retention-policy-for-builds-and-logs){:target="\_blank"} and select the one according to the on-premises version installed. b  set through is set  |  | 
|Collaborators    | The number of outside collaborators who can access and take actions on the Git repositories in your organization.|  | 
|Runtime environments    | N/A. Managed by Codefresh. |  | 
|Codefresh environments    | The environment to select for the Windows nodes. |  | 
|Actions    | Clicking the context menu to the right of the account, shows the following actions:{:nomarkdown}<ul><li>**Audit by account**: Takes you to the Audit page </li><li>**Invite user to account**: Opens the popup where you can specify the email of the user to invite to the account. To add the admin role for this user, select Set the user as admin to this account.</li><li>**Assign new feature**: Enable/disable features for this account. See ??? This is a quick method to assign a new feature that has been released  you to the Audit page </li>|  | 


