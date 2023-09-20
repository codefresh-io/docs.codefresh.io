---
title: "OIDC in pipelines"
description: "Set up short-lived token authentication with OpenID Connect in Codefresh pipelines"
group: pipelines
toc: true
---

Codefresh pipelines frequently interact with different cloud providers to access their services, resources, and execute tasks. Access to these cloud providers is generally controlled through long-lived secrets, defined, stored, and managed in Codefresh. 

With OIDC (OpenID Connect) tokens, Codefresh pipelines can authenticate directly with the cloud provider by exchanging the ID token during the session. The ID tokens remain valid only for the duration of your workflow build and automatically expire upon completion.

Whether you are a SaaS user or running Codefresh on-premises, you can obtain these ID tokens directly from your cloud provider, and use them in your pipelines to perform the actions you need.

**What are the benefits of OIDC ID tokens?**  
In Codefresh, cloud provider credentials are defined and stored as static credentials when setting up the integration with the provider, and then referenced in the pipeline through the integration name. 

With OIDC, Codefresh pipelines can utilize short-lived ID tokens for authentication during execution, instead of long-lived static credentials.
These ID tokens do not need to be stored and managed in Codefresh. See [OIDC ID tokens, standard & custom claims](#oidc-id-tokens-standard--custom-claims).

**How do you set up OIDC for Codefresh pipelines?**  
The bulk of the process to setup the OIDC ID token in Codefresh pipelines is on the cloud provider's platform.  
The setup requires configuring Codefresh as an OIDC provider, establishing the trust relationship, and defining the OIDC claims to enable secure authentication for the actions performed by the pipeline. 

The specific steps vary depending on the cloud provider. Codefresh is cloud-provider agnostic, with the only requirement being that the cloud provider supports OIDC. For detailed instructions, please refer to the documentation of your preferred cloud provider.

 
After setup, to use the ID token, on the Codefresh side, we have a dedicated Marketplace step. The step when added to the pipeline, obtains the ID token without any action required from you.

Review the [generic setup for OIDC](#oidc-setup-for-codefresh-pipelines), or follow the instructions in our example for [OIDC with AWS (Amazon Web Services)](#codefresh-oidc-for-aws). 

## OIDC ID tokens, standard & custom claims

The ID token is a JSON Web Token (JWT) which contains claims on the authentication and authorization of the user or resource.
The claim is a piece of information included in the ID token providing details about the identity, attributes, and other information for the cloud provider to authorize the access request.

### Claims & conditions

One of the key strengths of integrating OIDC into your Codefresh pipelines lies in the power of conditions defined through claims. Claims, which provide essential user information, offer far more than just identity verification. They allow you to introduce fine-grained access control based on entity attributes such as account and pipeline IDs, Git repositories and branches, and more.

By defining conditions through claims, you can ensure that only authorized resources within your organization have access. An example of a simple condition would be to allow access to all pipelines by account name or ID.
You can customize claims with simple or complex conditions.  

To enforce secure access, _you must configure at least one condition through a claim_. As cloud providers do not enforce conditions by default, without conditions in place, anyone can request an ID token and potentially perform actions.

### Standard OIDC claims

OIDC provides a list of common claims, as described in [standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims){:target="\_blank"}. 
Codefresh supports a subset of standard claims which are listed below. Generally, both the audience (`aud`) and the subject (`sub`) claims are used to authorize access.


* **audience (`aud`) claim**    
  The `aud` claim is the Client ID, which is the URL of the Codefresh platform instance.  
* **subject (`sub`) claim**   
  The `sub` claim is a string value concatenated from the different claims representing the precise authentication and authorization required for access. 
* **issuer (`iss`) claim**
  The OIDC provider that issued the token, and is always `https://oidc.codefresh.io`.
* **issued at (`iat`) claim**   
  The time when the ID token was issued.
* **exp (`iat`) claim**   
  The time when the ID token is set to expire.

The cloud provider verifies that the claims in the request token matches the claims defined in `aud` and the `sub` claims before issuing the ID token.
  

### Custom Codefresh claims
Codefresh provides custom claims as listed in the table below. The specific claims you would use are determined by the pipeline's trigger type, and change according to the workflow.  
Git triggers include several custom Source Code Management (SCM) claims to filter by repository, branch, and more. Use these claims to create conditions, as simple or as complex as you need to, for granular access control.  


| Custom Codefresh Claim   | Description                                                       |
| ----------------- | ----------------------------------------------------------------  |
| `account_id`  | The ID of the account authorized in the claim. For example, `5f30ebd30312313ae7008`. <br>Specifying the account ID restricts access to pipelines at the account-level.      |
| `account_name` | The name of the account authorized in the claim. For example, `dev-ops`. <br>Specifying the account name, similar to `account_id`, restricts access to pipelines at the account-level. |
| `pipeline_id` | The ID of the pipeline authorized in the claim. For example, `64f0c40800aafd1455566`. <br>Specifying the pipeline ID, restricts access to only builds from the pipeline with that ID.     |
| `pipeline_name` | The name of the pipeline authorized in the claim. For example, `oidc/git-run`. <br>Specifying the pipeline name, restricts access to only builds from the pipeline with that name.         |
| `workflow_id` | The ID of the specific workflow authorized in the claim. For example, `64f447c02199f903000gh20`. <br>Specifying the workflow ID restricts access to a single build with that ID.         |
| `initiator` | Applies to manual trigger types, and is the username of the user who clicked Run to manually trigger the pipeline. For example, `codefresh-user`.|
| `scm_repo_url`| Applies to Git push, PR, and manual trigger types. <br>The SCM URL specifying the Git repository's location. For example, `https://github.com/codefresh-user/oidc-test`. |
| `scm_user_name` | Applies to Git push, PR, and manual trigger types. <br>The SCM name of the user who initiated the Git action on the URL specified by `scm_repo_url`. For example, `codefresh-user`.|
| `scm_ref`  | Applies to Git push, PR, and manual trigger types. <br>The SCM name of the branch or tag within the Git repository for which the workflow should execute. For example, `main` or `v1.0.0`. |
| `scm_pull_request_target_branch` | Applies to Git PR trigger types. <br>The SCM target branch the pull request should merge into. For example, `production`.        |
| `sid` | A unique session identifier.         |

### Codefresh trigger types and corresponding claims

The table below lists the different types of Codefresh triggers, and the corresponding syntax for each part of the `sub` claim.

{: .table .table-bordered .table-hover}
| Trigger type       | Subject claim syntax              | Example  |
| ------------------- | ---------------------------------|
| Cron               | `account:{accountId}:pipeline:{pipelineId}` |  `account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e7` |
| Manual trigger<br>(when user runs pipeline manually)               | `account:{accountId}:pipeline:{pipelineId}:initiator{user}` |`account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:codefresh-user`|
| Git push trigger   | `account:{accountId}:pipeline:{pipelineId}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}` |`account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*:scm_repo_url:https://github.com/codefresh-io/production/:scm_user_name:codefresh-user:scm_ref:oidc/staging`|
| Git pull request (PR) trigger   | `account:{accountId}:pipeline:{pipelineId}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}:scm_pull_request_target_branch:{scmPullRequestTargetBranch}` |`account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*:scm_repo_url:https://github.com/codefresh-io/production/:scm_user_name:codefresh-user:scm_ref:oidc/staging:scm_pull_request_target_branch:oidc/production`
| Manual Git push trigger<br>(when user runs pipeline manually to mimic a Git trigger)   | `account:{accountId}:pipeline:{pipelineId}:initiator:{initiatorUserName}:scm_repo_url:{scmRepoUrl}:scm_user_name:{scmUserName}:scm_ref:{scmRefSuchAsBranchOrTag}` |`account:5f30ebd30312313ae7f17948:pipeline:64de5cd47626b3ca134e760a:*:scm_repo_url:https://github.com/codefresh-io/production/:scm_user_name:codefresh-user:scm_ref:oidc/staging`|

### Examples of ID token payload
Here is an example of the payload of an ID token issued by Codefresh as the OIDC provider with a combination of standard and custom claims.  
 

As you can see, the `sub` claim concatenates several of the custom claims for the Git trigger in this example.

```json
{
  "sub": "account:5f30ebd30312313ae7008:pipeline:64f0c40800aafd1455566:scm_repo_url:https://github.com/codefresh-user/oidc-test:scm_user_name:codefresh-user:scm_ref:codefresh-patch-3",
  "account_id": "5f30ebd30312313ae7008",
  "account_name": "codefresh-user",
  "pipeline_id": "64f0c40800aafd1455566",
  "pipeline_name": "oidc/git-run",
  "workflow_id": "64f447c02199f903000gh20",
  "scm_user_name": "codefresh-user",
  "scm_repo_url": "https://github.com/codefresh-user/oidc-test",
  "scm_ref": "codefresh-patch-3",
  "aud": "https://g.codefresh.io",
  "exp": 1693731108,
  "iat": 1693730808,
  "iss": "https://oidc.codefresh.io"
}
```
The standard claims include `sub` `aud`, `exp`, `iat` and `iss`.  

The custom claims include `account_id`, `account_name`, `pipeline_id`, `pipeline_name`, `workflow_id`, `scm_user_name`, `scm_repo_url` and `scm_ref`. The same claims are also part of the `sub` claim.

## OIDC setup for Codefresh pipelines

Here are the steps required for OIDC ID token usage in Codefresh pipelines:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/oidc-cf-config-flow.png" 
url="/images/pipeline/oidc/oidc-cf-config-flow.png"
alt="Configuration flow for OIDC ID token usage in Codefresh" 
caption="Configuration flow for OIDC ID token usage in Codefresh"
max-width="60%"
%}

1. Add Codefresh as an OIDC provider in the cloud provider platform
1. Create the trust relationship between Codefresh OIDC and the cloud provider
1. Use Codefresh's dedicated Marketplace step to obtain the ID token from Codefresh OIDC
1. Define the actions to be performed against the cloud provider

### Step 1: Add Codefresh as OIDC identity provider

The first step is to integrate Codefresh as an OIDC identity provider in the cloud provider platform. 

Make sure you define the following settings:

1. **Provider type**: OIDC
1. **Provider name**: A meaningful name to identify Codefresh as an OIDC provider.
1. **Provider URL**: The URL of the OIDC provider's authorization server, which is the Codefresh OIDC domain, `https//oidc.codefresh.io`. <!--- You can configure one provider URL -->
1.  **Client ID**: The URL of the Codefresh platform. For SaaS, `https://g.codefresh.io`.  
    For on-premises, this is the URL of your Codefresh instance, for example, `https://<my.company.com>/codefresh.io`.


### Step 2: Create trust and configure claims for Codefresh OIDC identity provider

Once you've added Codefresh as an OIDC provider, the next step is to establish trust between your cloud provider and the OIDC provider, Codefresh in our case. 

To create trust, define the claims, and configure the conditions for each claim.      

* For Codefresh pipelines, the claims depend on the type of trigger. 
* The syntax to create the `sub` claim is similar for all identity providers, and is a concatenation of different claims, separated by colons. These generally include the account, pipeline, initiator, and for Git triggers, SCM (Source Code Management) data such as the repo URL or branch, and for PRs, the target branch to merge to.

See [Custom Codefresh claims](#custom-codefresh-claims) and [Codefresh trigger types and corresponding claims](#codefresh-trigger-types-and-corresponding-claims) in this article.

>**WARNING**:  
It is essential that you configure _at least one condition_ to enforce secure access.  
As the cloud providers themselves do not enforce conditions by default, without conditions in place, anyone can request an ID token and potentially perform actions.


This completes the OIDC setup for Codefresh pipelines in the cloud provider.  
You can move on to the Codefresh platform to obtain and use the OIDC ID token in the pipeline workflow, as described in the steps that follow. 

### Step 3: Obtain OIDC ID token from OIDC provider

Obtain the ID token from the Codefresh OIDC provider to authenticate and authorize pipeline actions. Codefresh makes this simple by offering a dedicated Marketplace step, the `obtain-oidc-id-token` step, which you can seamlessly add to your pipeline, without the need for additional configuration or parameters on your part.



{% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/obtain-token-step-in-pipeline.png" 
url="/images/pipeline/oidc/obtain-token-step-in-pipeline.png"
alt="Obtain OIDC token step in Marketplace" 
caption="Obtain OIDC token step in Marketplace"
max-width="60%"
%}


**What does the `obtain-oidc-id-token` Marketplace step do?**  

The step:  

1. Makes an API call with `curl` to the Codefresh OIDC provider passing the `CF_OIDC_REQUEST_TOKEN` and the `CF_OIDC_REQUEST_URL`.  
  Example:  
  `curl -H "Authorization: $CF_OIDC_REQUEST_TOKEN" "$CF_OIDC_REQUEST_URL"`  
  where:  
    * `CF_OIDC_REQUEST_TOKEN` is the bearer token with the required claims.  
    * `CF_OIDC_REQUEST_URL` is the URL for which the ID token is requested. 
  
1. Gets the ID token in the `ID_TOKEN` environment variable.

>**TIP: Use API call in freestyle step**  
Instead of the predefined Marketplace step to obtain the OIDC ID token, you can insert the `curl` command in a freestyle step to get the same result.

<br><br>

**How to**  

* Add the step to your Codefresh pipeline's workflow.
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

### Step 4: Add steps to perform actions in the cloud provider
Add steps to the pipeline YAML to perform the required actions in the cloud provider. The specific steps required depend on the cloud provider you choose.  

For AWS, for example, you need a step to assume the required role and another step with the desired action to perform.

## Codefresh OIDC for AWS

This section walks you through setting up OIDC for Codefresh pipelines on AWS as an example.
For more information, see AWS documentation on [Creating OpenID Connect (OIDC) identity providers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html){:target="\_blank"} and [Creating a role for web identity or OpenID Connect Federation (console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html){:target="\_blank"}.

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
1. Continue with [Step 2 for AWS: Create a role to establish trust](#step-2-for-aws-create-a-role-to-establish-trust).

### Step 2 for AWS: Create a role to establish trust
Establish the trust relationship between Codefresh OIDC and AWS by defining a role and its permissions.  

For Codefresh, select the **Custom trust policy**. Custom trust policies are more flexible than other trust policies, as they allow you to configure complex conditions in the `subject` claim of the ID token allowed to assume the role. For example, you can specify both account and the pipeline IDs to restrict the claim to a specific account and to a specific pipeline.

Selecting Web identity as your trust policy, while allowing you to specify the identity providers from which to accept ID tokens, prevents you from configuring more granular control. You cannot restrict the claim to a specific account for example as with the Custom trusted entity.


**Before you begin**  
* Familiarize yourself with [Claims & conditions](#more-on-the-oidc-id-token) 

**How to**  
1. Make sure you are still in **Identity providers**.
1. Click **View provider**.  
  The information for Codefresh OIDC provider you added is displayed, including:  
  * ARN (Amazon Resource Name) associated with an identity provider
  * Audience which is the URL of the Codefresh platform instance


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
1. Replace the `sub` claims with the conditions you need for the specific `sub` claim according to the Codefresh trigger type. If there is more than one condition, separate them with colons.  
  See [Codefresh trigger types and corresponding claims](#codefresh-trigger-types-and-corresponding-claims).  
  In the example below, only ID tokens issued for account ID `5f30ebd30312313ae7f17948` and pipeline ID `64de5cd47626b3ca134e760a` will be allowed to assume the role.
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
1. Click **Next**, and then in the Add Permission page, click **Next** once again.
1. In the Role details page, enter a meaningful **Role name** to identify the role.
1. Click **Create role**.
1. Continue with [Step 3 for AWS: Specify permissions for the role to create a policy](#step-3-for-aws-specify-permissions-for-the-role-to-create-a-policy). 

### Step 3 for AWS: Specify permissions for the role to create a policy
Permissions define the actions permitted for this role with the cloud provider. Permissions differ according to the action needed. 

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


  {% include 
image.html 
lightbox="true" 
file="/images/pipeline/oidc/role-permissions-create-inline-policy.png" 
url="/images/pipeline/oidc/role-permissions-create-inline-policy.png"
alt="Add role permissions with Create inline policy" 
caption="Add role permissions with Create inline policy"
max-width="50%"
%}

{:start="5"}
1. Copy the ARN string for the role.  
  This step completes the setup for Codefresh as an OIDC provider for Amazon Web Services.
  The next steps are within Codefresh, to obtain the ID token and use it to perform actions in a Codefresh pipeline. 
1. Continue with [Step 4 for AWS: Add obtain ID token step to pipeline workflow](#step-4-for-aws-add-obtain-id-token-step-to-pipeline-workflow).


### Step 4 for AWS: Add obtain ID token step to pipeline workflow

The step obtains the ID token from Codefresh OIDC provider. Codefresh makes this easy with our dedicated Marketplace step, the `obtain-oidc-id-token` step.

1. Sign in to Codefresh.
1. Go to the pipeline with the workflow.
1. Add the step to your Codefresh pipeline's workflow.   
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
{:start="4"}
1. Continue with [Step 5 for AWS: Add actions to the pipeline workflow](#step-5-for-aws-add-actions-to-the-pipeline-workflow).



### Step 5 for AWS: Add actions to the pipeline workflow
This step illustrates how to use the ID token obtained in _step 4_ to assume the role and perform actions on AWS.

Add two steps to the pipeline:  
* `assume_role` step in which specify the ARN role and the session name through two variables that you'll add to the pipeline.
* `s3_list_objects` step which is the action you'll perform using the ID token from the previous _step 4 for AWS_.

<br><br>

**How to**  
* Paste the following into the pipeline editor, below the `obtain_id_token` step.

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
* Add the variables and values for `ROLE_ARN` and `ROLE_SESSION_NAME`:
    1. Click the **Variables** tab on the right. 
    1. Add these variables and values:
      * `BUCKET_NAME=<bucket-name>`, for example, `oidc-test1`.
      * `ROLE_ARN=arn:aws:iam::<role-name>`, for example, `arn:aws:iam::095585282052:role/cf-oidc-test1`.
      * `ROLE_SESSION_NAME`=<session-name>, for example, `oidc-session`.



The cloud provider uses the ID token to authenticate the claim and perform the action, listing the objects in the S3 bucket.


## Related articles
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/)  
[Variables in pipelines]({{site.baseurl}}/_docs/pipelines/variables/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
