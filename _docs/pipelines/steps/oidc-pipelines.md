---
title: "OIDC in pipelines"
description: "Set up short-lived token authentication with OpenID Connect in Codefresh pipelines"
group: pipelines
toc: true
---

Codefresh pipelines frequently interact with various cloud providers to access their services and execute tasks. Access to these cloud providers has been controlled through long-lived secrets, stored securely, but often requiring more management.

As an alternative to secrets, Codefresh pipelines can authenticate via OIDC (OpenID Connect), which utilizes short-lived access tokens instead of long-lived secrets. These tokens, often referred to as ID tokens, are valid only for the duration of your session or workflow and automatically expire upon completion.

Whether you are a SaaS user or running Codefresh on-premises, you can obtain these access tokens directly from your cloud provider, and use them in your pipelines to perform the actions you need.

The bulk of the OIDC setup process for Codefresh pipelines is on the cloud provider platform. It requires configuring Codefresh as an OIDC provider, establishing the trust relationship, and defining the OIDC claims to enable secure authentication for the actions performed by the pipeline. 

The specific steps vary depending on the cloud provider. Codefresh is cloud-provider agnostic, with the only requirement being that the cloud provider supports OIDC. For detailed instructions, please refer to the documentation of your preferred cloud provider.

 On the Codefresh side, we have a dedicated Marketplace step, which when added to the pipeline obtains the ID token you need without any action required from you.

Review the [generic setup for OIDC](#oidc-setup-for-codefresh-pipelines), or follow the instructions in our example for [OIDC with AWS (Amazon Web Services)](#codefresh-oidc-for-aws). 






## OIDC setup for  Codefresh pipelines

Here are the steps for OIDC usage in Codefresh pipelines:

DIAGRAM TBD

1. Add Codefresh as an OIDC provider in the cloud provider platform
1. Create the trust relationship between Codefresh OIDC and the cloud provider
1. Use the dedicated Marketplace Codefresh step to obtain the ID token from Codefresh OIDC

<!--- Perform actions on the cloud provider using the ID token for authentication and authorization.  -->

### Step 1: Add Codefresh as OIDC identity provider

The first step is to integrate Codefresh as an OIDC identity provider in the cloud provider platform. 

Make sure you define the following settings:

1. **Provider type**: OIDC
1. **Provider name**: A meaningful name to identify this OIDC provider.
1. **Provider URL**: The URL of the OIDC provider's authorization server, which is the Codefresh OIDC domain, `https//oidc.codefresh.io`. You can configure one provider URL
1.  **Client ID**: The URL of the Codefresh platform. For SaaS, `https://g.codefresh.io`.  
    For on-premises, this is the URL of your Codefresh instance, for example, `https://<my.company.com>/codefresh.io`.





### Step 2: Establish trust and configure subject claims Codefresh OIDC identity provider

Once you've added Codefresh as an OIDC provider, the next step is to establish trust between your cloud provider and the OIDC provider, Codefresh in this case. 

Establishing trust typically involves assigning a role to the Codefresh OIDC provider, and defining the conditions for the claims supported by the OIDC protocol and required for Codefresh pipelines.  

The claim is a piece of information included in the ID token providing details about the identity, attributes, and other information for the cloud provider to authorize the access request.
See the full list of [standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims){:target="\_blank"}. 

For Codefresh, we'll focus on two of the standard claims, the audience (`aud`) and the subject (`sub`) claims. 
* audience (`aud`) claim 
  The Before granting the ID token, the cloud provider verifies that the audience claim match those in the request bearer token through the `aud` claim. This is the Client ID, which is the URL of the Codefresh platform.

* subject (`sub`) claim  
  `sub` claim is a string value within the ID token that represents the unique identifier allowed to assume the role. 
 The syntax to create the subject claim is similar for all identity providers, and is a concatenation of different identifiers. These generally include, the Account, Pipeline, Initiator, Value, Subject, and for Git triggers, Source Code Management (SCM) data such as the repo URL or branch, and the target branch to merge to for PRs.

  The table below lists the different types of Codefresh triggers, and the corresponding syntax for the `sub` claim.
 
 
{: .table .table-bordered .table-hover}
| Trigger type       | Subject claim syntax              | Example  |
| ------------------- | ---------------------------------|
| Cron               | `account:{accountId}:pipeline:{pipelineId}` |  `account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*` |
| Manual trigger<br>(when user runs pipeline manually)               | `account:{accountId}:pipeline:{pipelineId}` |`account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*`|
| Git push trigger   | `account:{accountId}:pipeline:{pipelineId}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}` |`account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*:scm_repo_url:https://github.com/codefresh-io/production/:scm_user_name:codefresh-user:scm_ref:oidc/staging`|
| Git pull request (PR) trigger   | `account:{accountId}:pipeline:{pipelineId}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}:scm_pull_request_target_branch:{scmPullRequestTargetBranch}` |`account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*:scm_repo_url:https://github.com/codefresh-io/production/:scm_user_name:codefresh-user:scm_ref:oidc/staging:scm_pull_request_target_branch:oidc/production`
| Manual Git push trigger<br>(when user runs pipeline manually to mimic a Git trigger)   | `account:{accountId}:pipeline:{pipelineId}:initiator:{initiatorUserName}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}` |`account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*:scm_repo_url:https://github.com/codefresh-io/production/:scm_user_name:codefresh-user:scm_ref:oidc/staging`|

where:
`account` is the ID of the account allowed to assume the role.
`pipeline` is the ID of the pipeline allowed to assume the role.
`initiator` applies to manual trigger types, and is the username of the user who clicked Run to manually trigger the pipeline.
`scm_repo_url`, applies to Git push, PR, and manual trigger types, and is the Source Code Management Repository (SCM) URL that specifies the location or URL of the Git repository for the workflow.
`scm_user_name`, applies to Git push, PR, and manual trigger types, and is the name of the user who initiated the Git action on the URL specified by `scm_repo_url`.
`scm_ref`, applies to Git push, PR, and manual trigger types, and is the name of the branch or tag within the Git repository for which execute the workflow. For example, `main` or `v1.0.0.`.
`scm_pull_request_target_branch`, applies to Git PR trigger types, and is the target branch the PR should merge into. For example, `production`.

### Step 3: Add obtain-oidc-token step to pipeline workflow

The final step is to obtain the ID token from Codefresh OIDC provider. Codefresh makes this easy without requireing any configuration or passing parameters through a dedicated Marketplace step, the `obtain-oidc-token step`.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/obtain-token-step-in-pipeline.png" 
url="/images/pipeline/oidc/obtain-token-step-in-pipeline.png"
alt="Obtain OIDC token step in Marketplace" 
caption="Obtain OIDC token step in Marketplace"
max-width="60%"
%}

* Add the step to your Codefresh pipeline's workflow.   
  The step makes an API call to the Codefresh OIDC provider and gets an ID token from the same. The token is passed in the `ID_TOKEN` environment variable. 

```yaml
version: '1.0'
steps:
  obtain_id_token:
    title: Obtain ID Token
    type: obtain-oidc-id-token
  print_output: 
    title: Printing output from previous step
    image: alpine
    commands:
      - echo $ID_TOKEN
      - 'echo ${{steps.obtain_id_token.output.ID_TOKEN}}'
```

### Step 4: ????

## Codefresh OIDC for AWS

This section details the steps for OIDC setup on AWS  Add Codefresh as OIDC identiity provider for AWS

### Step 1 for AWS: Add Codefresh as an OIDC provider

1. Log in to AWS.
1. Search for IAM and go to the IAM dashboard.

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

### Step 2 for AWS: Create a role and define permissions
Establish the trust relationship between Codefresh OIDC and AWS by defining a role and its permissions.  

For Codefresh, select the Custom trust policy. Custom trust policies are more flexible than other trust policies, as they allow you to configure complex conditions in the `subject` claim of the ID token allowed to assume the role. For example, specifying both account and the pipeline IDs to restrict the claim to a specific account and to a specific pipeline.

Selecting Web identity as your trust policy, while also allowing you to specify the identity providers from which to accept ID tokens, prevents you from configuring more granular control. You cannot restrict the claim to a specific account as with the Custom trusted entity.


**Before you begin**  
* Familiarize yourself with [Subject claim definition syntax](#subject-claims)  

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
1. Continue with [Step 3 for AWS: Specify permissions for the role to create a policy](???)  

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

This step completes the setup for Codefresh as an OIDC provider for Amazon Web Services.

The next steps are on the codefresh end, obtainget and use the OIDC toekn in a Codefresh pipeline. -->




### Step 4 for AWS: Add obtain-oidc-token step to pipeline workflow

The step is to obtain the ID token from Codefresh OIDC provider. Codefresh makes this easy without requireing any configuration or passing parameters through a dedicated Marketplace step, the `obtain-oidc-token step`.

1. Sign in to Codefresh.
1. Go to the pipeline with the workflow.
1. Add the step to  your Codefresh pipeline's workflow.   
  The step makes an API call to the Codefresh OIDC provider and gets an ID token from the same. The token is passed in the `ID_TOKEN` environment variable. 

```yaml
version: '1.0'
steps:
  obtain_id_token:
    title: Obtain ID Token
    type: obtain-oidc-id-token
  print_output: 
    title: Printing output from previous step
    image: alpine
    commands:
      - echo $ID_TOKEN
      - 'echo ${{steps.obtain_id_token.output.ID_TOKEN}}'
```
1. Continu



### Step 5 for AWS: 
This step illustrates how to use the ID token obtained in step ?? to assume the role and perform actions.
Add two steps to the pipeline:
assume_role step in which specify the  ARN role and the session name through two variables that you'll add to the pipeline.
s3_list_objects step which is the action you'll perform using the ID token from the previous ste.


1. Paste the following into the pipeline editor, below the `obtain_id_token` step.
```yaml
assume_role:
    title: Assume Role
    type: aws-sts-assume-role-with-web-identity
    arguments:
      ROLE_ARN: ${{ROLE_ARN}}
      ROLE_SESSION_NAME: ${{ROLE_SESSION_NAME}}

  s3_list_objects:
    title: s3_list_objects
    image: amazon/aws-cli
    commands: 
      - aws s3 ls "s3://$BUCKET_NAME/"
```
1. Add the variables and values for `ROLE_ARN` and `ROLE_SESSION_NAME`:
  1. Click the **Variables** tab on the right. 
  1. Add these variables and values:
      * `BUCKET_NAME=<bucket-name>`, for example, `oidc-test1`.
      * `ROLE_ARN=arn:aws:iam::<role-name>`, for example, `arn:aws:iam::095585282052:role/cf-oidc-test1`.
      *  `ROLE_SESSION_NAME`=<session-name>, for example, `oidc-session`.




  Codefresh uses the ID token to authenticate the claim and perform the action, listing the objects in the S3 bucket.



