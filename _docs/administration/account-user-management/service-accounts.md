---
title: "Service accounts"
description: "??"
group: administration
sub_group: account-user-management
toc: true
---

## Service accounts overview

A service account is an identity that provides automated processes, applications, and services with the necessary permissions to interact with your infrastructure securely. Unlike user accounts, service accounts are not tied to a specific individual. Instead, they are used to manage access and permissions programmatically, ensuring secure and efficient operations within your environment.

There are two ways of implementing service accounts in Codefresh:

Create a shared account not connected to a specific user in the orgnaization
The shared service user account is not connected to 
Create account-level API keys 


IRythm requested a feature for the ability to set account level api keys and/or service account-type users in Codefresh. One way to address this is the ability to create a shared service account user that's not tied to any specific person within their IDP, with a password that can be put into their internal system. CF's existing username/password auth method is not intended for SAAS use.

The other potential solution to this use case is the ability to create account-level API keys accessible by all admins, so that the CF API key being used for any integrations will not be affected by any specific user being disabled.

Service accounts are a special type of account that is intended to represent a non-human entity such as an application, API, or other service. These entities operate within the security context provided by the service account.


## Features of service accounts

Can be assigned roles: admin or user what is the significance? use cases

Can be assigned to teams

Can be assigned API keys 
Best practice: Use diifferent api keys without any overlap??

Cannot be used for logins
Not included in count of collaborators

Service acocunts with API keys or can exist without? what default permissions do 

## Create service accounts
Create service accounts in the Codefresh UI to manage processes, integrations, at the account level. 

The name of teh service account must be unique. Optionally, you assign teams and the admin role to the service account.

Currently, you can create service accounts only in the Codefresh UI. CLI and Terraform are not supproted for service accounts.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Service Accounts**.
1. Click **Add Service Account**.
1. Do the following:
  1. **Name**: Enter a name for the service account (max characters, allowed characters).
  1. **Team**: Optional. Assign this service account to one or more teams.
  1. **Assign Admin role..**: Optional. To ???


## Manage service accounts


Edit service account settings

### View service accounts
If you havve created service accounts, the Service Accounts page shows the list defined for the account. 

??? shows the 


{: .table .table-bordered .table-hover}
| Service Account Setting  | Description   |
| ------------------------| ---------------- |
| **Name**                | The name of the service account. <br>The **Admin** label to the right of the name indicates that the service account has been assigned an admin role. See ?? |
| **API Keys**            | The number of API keys assigned to the service account. <br>To see the keys and their scopes, see ??? |
| **Teams**               | The names of the team(s) the service account is assigned to. <br>??? see ??? |
| **Status**               | Indicates if the service account is currently active (**Enabled**) or inactive (**Disabled**). |
| **Actions**               | The options available to manage the service account: {::nomarkdown}<ul><li><b>Edit</b>: Modify the settings of the service account, including adding/removing teams, enabling/disabling admin role.</li><li><b>Delete</b>: Delete the service account, including all the API keys defined for the account. This means that actions through the Codefresh API or CLI that require these keys will fail.</li></ul>{:/} |


All service accounts for the account are listed in Account Settings. 
You can also view service accounts assigned to teams in Users > Teams > Service Accounts. ??

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Service Accounts**.


Enable/disable service sccounts

Assign service accounts to teams

Enable/disable admin roles for service accounts


