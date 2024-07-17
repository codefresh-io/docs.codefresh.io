---
title: "Service accounts"
description: "??"
group: administration
sub_group: account-user-management
toc: true
---

## Service accounts overview

A service account is an identity that provides automated processes, applications, and services with the necessary permissions to interact securely with your infrastructure. Unlike user accounts, service accounts are not tied to a specific individual. Instead, they are used to manage access and permissions programmatically, ensuring secure and efficient operations within your environment.

Coderfesh supports creating service accounts and assigning them to teams. In addition, each service account can hold any number of API keys 

Create a shared account not connected to a specific user in the orgnaization
The shared service user account is not connected to 
Create account-level API keys 


IRythm requested a feature for the ability to set account level api keys and/or service account-type users in Codefresh. One way to address this is the ability to create a shared service account user that's not tied to any specific person within their IDP, with a password that can be put into their internal system. CF's existing username/password auth method is not intended for SAAS use.

The other potential solution to this use case is the ability to create account-level API keys accessible by all admins, so that the CF API key being used for any integrations will not be affected by any specific user being disabled.

Service accounts are a special type of account that is intended to represent a non-human entity such as an application, API, or other service. These entities operate within the security context provided by the service account.


## Features of service accounts

Team assignment
Service accounts are assigned to teams instead of individual users. This feature removes the tie-in with any specific user.
It also complies with the RBAC access control for CI pipelines. 



Multiple API keys 
The same service account can have more than one API key. Every key can be defined with specific scopes. 


Non logins
Service accounts cannot be used to log in to Codefresh. 
They are also not included in the Collaborator 
Not included in count of collaborators



## Create service accounts
Create service accounts in Codefresh to manage processes, integrations, at the account level. 

Service accounts and teams
It is essential to assign teams to service accounts. Otherwise, RBAC access is disabled for these teams and for their users.  
See [Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control).



Service account creation is not supported via CLI and Terraform.

##### Before you begin
* [Create teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/#create-a-team-in-codefresh)

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Service Accounts**.
1. Click **Add Service Account**.
1. Do the following:
  1. **Name**: Enter a name for the service account according to the requirements.
  1. **Team**: Assign this service account to one or more of the teams available.
  1. **Assign Admin role..**: Optional. To 
SCREENSHOT

1. Continue with [Generating API keys](#generate-api-keys-for-service-accounts).



## Generate API keys for service accounts
Generate API keys for a service account after creating it. The procedure is similar to generating API keys for individual users.
There is no limit to the number of API keys you can generate for a single service account.

After generating API keys, you can modify scopes, or delete the API key.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Service Accounts**.
1. Select the service account for which to generate API keys.
1. Click **Generate API Key**.
1. In the Generate Codefresh API key form, do the following:
  1. Enter the **Key Name**.
  1. Click **Generate**.
    Codefresh generates the key and pastes it in the API Key field.
  1. If required, copy the key to the clipboard and save it in a safe location.

{:start="5"}
1. Select the required scopes. 
1. Click **OK**.


## View service accounts
The Service Accounts page shows the list of service accounts defined for the account. 

SCREENSHOT


{: .table .table-bordered .table-hover}
| Service Account Setting  | Description   |
| ------------------------| ---------------- |
| **Name**                | The name of the service account. <br>The **Admin** label to the right of the name indicates that the service account has been assigned an admin role. See ?? |
| **API Keys**            | The number of API keys assigned to the service account. <br>Selecting a service account displays the API keys generated for that account. Modify selected scopes by clicking Edit, or delete the API key. |
| **Teams**               | The names of the team(s) the service account is assigned to. <br>??? see ??? |
| **Status**               | Indicates if the service account is currently active (**Enabled**) or inactive (**Disabled**). NIMA: give me examples of one or two use cases when you would disable a service account |
| **Actions**               | The options available to manage the service account: {::nomarkdown}<ul><li><b>Edit</b>: Modify the settings of the service account, including adding/removing teams, enabling/disabling admin role.</li><li><b>Delete</b>: Delete the service account, including all the API keys defined for the account. This means that actions through the Codefresh API or CLI that require these keys will fail.</li></ul>{:/} |

## Manage service accounts


Edit service account settings




All service accounts for the account are listed in Account Settings. 
You can also view service accounts assigned to teams in Users > Teams > Service Accounts. ??

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Service Accounts**.


Enable/disable service sccounts

Assign service accounts to teams

Enable/disable admin roles for service accounts


