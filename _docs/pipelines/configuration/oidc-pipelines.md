---
title: "OIDC in pipelines"
description: "Set up short-lived token authentication with OpenID Connect in Codefresh pipelines"
group: pipelines
toc: true
---

Codefresh pipelines often use different cloud providers to access their services and perform actions. Access to the cloud provider is controlled through credentials generally stored as secrets.

As an alternative to creating, storing, and using secrets, Codefresh pipelines support OIDC where access is governed through short-leved access token instead of long-lived secrets. These short-lived access or ID token remain alive and valid for the duration of the session or workflow, and automatically expires on completion. Bot SaaS and on-premises customers can get the access token from the cloud provider.
They can use them in Codefresh pipelines for authenication and authorization to perform the actions you need.

Codefresh is cloud-provider agnostic, with the only requirement being that the cloud provider supports OIDC. 

Theare are  steps to use

1. Set up Codefresh as an OIDC provider in the cloud provider platform.
1. Create the trust relationship between Codefresh OIDC and the cloud provider.
1. Use the dedicated Marketplace Codefresh step  to obtain the ID token from Codefresh OIDC
1. Perform actions on the cloud provider using the ID token for authentication and authorization.



## Set up OIDC and use it in for Codefresh pipelines




### Step 1: Add Codefresh as OIDC identity provider

OIDC settings:
1. Provider type: OIDC
1. Provider name: A meaningful name to identify this OIDC provider.
1. Provider URL: The URL of the OIDC provider's authorization server, where the identity provider issues ID tokens and handles user authentication. `https//oidc.codefresh.io
1.  Client ID: The Client ID for the Codefresh OIDC provider which is always, `https://g.codefresh.io`.  
    For on-premises, this is the URL of their codefresh instance, for example, ???





### Step 2: Establish trust and configure subject claims Codefresh OIDC identity provider

Once you've configured the OIDC settings, you need to establish trust between your cloud provider and the OIDC provider, in this case Codefresh OIDC. 

This typically involves assigning a role to Codefresh OIDC provider and defining the conditions for the audience (`aud`) and subject (`sub`) claims. 
Before grating the ID token, the cloud provider verifies that the audience and subject claims match those in the request bearer token.

The steps to establish the trust and the syntax for the subject claims vary depending on the cloud provider. 

 "sub" claim is a string value within the ID token that represents the unique identifier allowed to assume the role. 
 The syntext to create the subject claim is similar for all identity providers. For Codefresh in particular, the syntax is different according to the typf og trigger for the workflow:
 
 
{: .table .table-bordered .table-hover}
| Trigger type       | Subject claim syntax              | Example  |
| ------------------- | ---------------------------------|
| Cron               | `account:{accountId}:pipeline:{pipelineId}` |  `account:{accountId}:pipeline:{pipelineId}`
| Manual trigger<br>(when user runs pipeline manually)               | `account:{accountId}:pipeline:{pipelineId}` |
| Git push trigger   | `account:{accountId}:pipeline:{pipelineId}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}` |
| Git pull request (PR) trigger   | `account:{accountId}:pipeline:{pipelineId}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}:scm_pull_request_target_branch:{scmPullRequestTargetBranch}` |
| Manual Git push trigger<br>(when user runs pipeline manually to mimic a Git trigger)   | `account:{accountId}:pipeline:{pipelineId}:initiator:{initiatorUserName}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}` |

where:
`account` is the ID of the account allowed to assume the role.
`pipeline` is the ID of the pipeline allowed to assume the role.
`initiator` applies to manual trigger types, and is the username of the user who clicked Run to manually trigger the pipeline.
`scm_repo_url`, applies to Git push, PR, and manual trigger types, and is the Source Code Management Repository (SCM) URL that specifies the location or URL of the Git repository for the workflow.
`scm_user_name`, applies to Git push, PR, and manual trigger types, and is the name of the user who initiated the Git action on the URL specified by `scm_repo_url`.
`scm_ref`, applies to Git push, PR, and manual trigger types, and is the name of the branch or tag within the Git repository for which execute the workflow. For example, `main` or `v1.0.0.`.
`scm_pull_request_target_branch`, applies to Git PR trigger types, and is the target branch the PR should merge into. For example, `production`.

### Step 3: Add obtain-oidc-token step to pipeline workflow

The final step is to obtain the ID token from Codefresh OIDC provider. Codefresh makes this easy without requireing any configuration or passing parameters through a dedicated Marketplace step, the obtain-oidc-token step


* Dedicated Marketplace step
  Codefresh makes this easy by providing a dedicated step, the `obtain-oidc-token` step.  
  All you need to do is to add the step to  your Codefresh pipeline's workflow. 

  The step makes an API call to the Codefresh OIDC provider and gets an ID token from the same. The token is passed in the `ID_TOKEN` environment variable. 


* Custom step
 You can exlicitly add the command in a custom typed stp or freestyle step.

 the token from AWS Codefresh OIDC provider through the two environment variables: ACTIONS_ID_TOKEN_REQUEST_URL	The URL for GitHub's OIDC provider.
ACTIONS_ID_TOKEN_REQUEST_TOKEN	Bearer token for the request to the OIDC provider. 


## Codefresh OIDC for AWS (Amazon Web Services)

Example: Add Codefresh as OIDC identiity provider for AWS

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/iam-dashboard.png" 
url="/images/pipeline/oidc/iam-dashboard.png"
alt="Selecting IAM service" 
caption="Selecting IAM service"
max-width="50%"
%}

{:start="3"}
1. From the sidebar, select **Identity providers**, and then click **Add provider**.
1. In the Add an Identity Provider form, do the following:
  1. Select Provider type as **OpenID Connect**.
  1. Enter a meaningful name for the Provider.
  1. Click **Get thumbprint**.
  1. In the **Audience** field, enter the client ID for Codefresh:
    For SaaS customers, this is `https://g.codefresh.io`.  
    For on-premises, this is the URL of their codefresh instance, for example, ???
  1. Click **Add provider**.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/add-cf-identity-provider.png" 
url="/images/pipeline/oidc/add-cf-identity-provider.png"
alt="Add Codefresh as OIDC identity provider" 
caption="Add Codefresh as OIDC identity provider"
max-width="50%"
%}

{:start="5"}
1. Continue with [Assign a role to Codefresh OIDC identity provider]???

### Step 2 for AWS: Create  a role and define permissions
<!--- o use OIDC in Codefresh pipelines, select the Custom trust policy. Custom trust policies are more flexible than other trust policies, in that you can configure complex conditions required for the `subject` claim of the ID token allowed to assume the role. For example, specifying both account and the pipeline IDs to restrict the claim to a specific account and a specific pipeline.

electing **Web identity** for example, as your trusted entity type, allows you to specify the identity providers from which to accept ID tokens, but prevents you from configuring more granular control sucha ss  ausch accepting tokens from a specific account, or from a specific account and a specific pipeline.


**Before you begin**  
* Familiarize yourself with [Subject claim definition syntax](#subject-claims)  
S
**How to**  
1. Make sure you are still in **Identity providers**.
1. Click **View provider**.  
  The information for Codefresh OIDC provider you added is displayed, including: 
  ARN (Amazon Resource Name) associated with an identity provider
  Audience which is the URL of the Codefresh platform instance


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/assign-role-for-cf.png" 
url="/images/pipeline/oidc/assign-role-for-cf.png"
alt="Codefresh OIDC identity provider information" 
caption="Codefresh OIDC identity provider information"
max-width="50%"
%}

{:start="3"}
1. Click **Assign role**, select **Create a new role**, and then click **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/create-new-role-for-cf.png" 
url="/images/pipeline/oidc/create-new-role-for-cf.png"
alt="Create new role for Codefresh OIDC" 
caption="Create new role for Codefresh OIDC"
max-width="50%"
%}

{:start="4"}
1. From the Trusted entity types displayed, select **Custom trust policy**.
   The default custom trust policy is displayed.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/custom-trust-policy.png" 
url="/images/pipeline/oidc/custom-trust-policy.png"
alt="Sample Custom trust policy with `audience` and `subject` claims" 
caption="Sample Custom trust policy with `subject` claim"
max-width="50%"
%}

{:start="5"}
1. Replace the `sub` claims with the conditions you need for the specific `sub` claim according to the Codefresh trigger type. If there is more than one condition, separate them with colons.  See ???  
  In the example below, only ID tokens issues for account ID `5f30ebd30312313ae7f17948` and pipeline ID `64de5cd47626b3ca134e760a` will be allowed to assume the role.with this:
```yaml
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": {
				"Federated": "arn:aws:iam::095585282052:oidc-provider/oidc.codefresh.io" # role created 
			},
			"Action": "sts:AssumeRoleWithWebIdentity",
			"Condition": {
				"StringEquals": {
					"oidc.codefresh.io:aud": "https://g.codefresh.io" # stay
				},
				"StringLike": {
				    "oidc.codefresh.io:sub": "account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*" ## change according to the trigger type
				}
			}
		}
	]
}
``` 
{:start="6"}
1. Click **Next**.
1. In the Add Permission page, click **Next**.
1. In the Role details page, enter a meaningful **Role name** to identify the role.
1. Click **Create role**.
1. Continue with [Specify permissions for the role to create a policy](???)  

### Step 3 for AWS: Specify permissions for the role to create a policy
Permissions define the actions permitted for this role with the cloud provider. Permissions differ according to the action needed. For example, the actions to to list the objects 

1. From the sidebar, select **Roles**.
1. Search for the role you created.
1. In the Permissions tab, click **Add permissions**, and then select **Create inline policy**.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/role-permissions-create-inline-policy.png" 
url="/images/pipeline/oidc/role-permissions-create-inline-policy.png"
alt="Add role permissions with Create inline policy" 
caption="Add role permissions with Create inline policy"
max-width="50%"
%}

{:start="4"}
1. In the Specify permissions page, do the following:
  1. Click **JSON**.
  1. Click **Add new statement**, and select the statements required for the action you wish to perform on the cloud provider.  
    In the example, for S3 services, you would select S3 from the list of services, and to allow these actions such as adding and listing objects, you would add these statements to the Policy Editor  `AllowReadWriteAccess` and `AllowListAccess`.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/role-permissions-create-inline-policy.png" 
url="/images/pipeline/oidc/role-permissions-create-inline-policy.png"
alt="Add role permissions with Create inline policy" 
caption="Add role permissions with Create inline policy"
max-width="50%"
%}
{:start="3"}
  1. Click **Next**.
  1. In Policy details, enter a meaningful **Policy name** to identify the policy with the required permissions, and click **Create policy**.


  {% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/role-permissions-create-inline-policy.png" 
url="/images/pipeline/oidc/role-permissions-create-inline-policy.png"
alt="Add role permissions with Create inline policy" 
caption="Add role permissions with Create inline policy"
max-width="50%"
%}

{:start="2"}
1. Copy the ARN string for the role.

This completes the setup for Codefresh OIDC provider in the cloud provider, in tbis case for Amazon Web Services.

The next steps are get and use the OIDC toekn in a Codefresh pipeline. -->










### AWS: 