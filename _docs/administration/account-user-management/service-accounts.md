---
title: "Create service accounts"
description: "Manage access and permissions with service accounts"
group: administration
sub_group: account-user-management
toc: true
---

## Service accounts overview

A service account is an identity that provides automated processes, applications, and services with the necessary permissions to interact securely with your infrastructure. Unlike user accounts, service accounts are not tied to a specific individual. Instead, they are used to manage access and permissions programmatically, ensuring secure and efficient operations within your environment.

Coderfesh supports creating service accounts and assigning them to teams. See [Create service accounts](#create-service-accounts).  
Each service account can hold multiple API keys, making it easy to manage access for different purposes. See [Generate API keys for service accounts](#generate-api-keys-for-service-accounts).

## Key features of service accounts

* **Team assignment**  
  Service accounts are assigned to teams instead of individual users, removing any tie-in with a specific user and complying with RBAC (Role-Based Access Control) for CI pipelines.

* **Multiple API keys**  
  A single service account can have multiple API keys, each defined with specific scopes, providing fine-grained access control.

* **Non-login accounts**
  Service accounts cannot be used to log in to Codefresh, and are also not included in the collaborator count.



## Create service accounts
Create service accounts in Codefresh to manage processes, integrations, at the account level.  
Assign teams to service accounts to ensure RBAC access for those teams and their users (see [Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control)).  
Note that service account creation is not supported via CLI and Terraform.


##### Before you begin
* Make sure you have created one or more [teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/#create-a-team-in-codefresh)

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Service Accounts**.
1. Click **Add Service Account**.
1. Do the following:
    1. **Name**: Enter a name for the service account according to the requirements.
    1. **Team**: Assign this service account to one or more of the teams available.
    1. **Assign Admin role..**: Optional. Automatically assign admin permissions to this service account.  

SCREENSHOT  

{:start="4"}
1. Continue with [Generating API keys](#generate-api-keys-for-service-accounts).



## Generate API keys for service accounts
Generate API keys for a service account after creating it. The procedure is similar to generating API keys for individual users.
There is no limit to the number of API keys you can generate for a single service account.

After generating API keys, you can modify the scopes defined for the key, or delete the API key.

{{site.data.callout.callout_tip}}
**TIP**  
The **API Key** scopes are relevant only to service accounts and define the permissions to manage the API keys assigned to those accounts.
{{site.data.callout.end}}

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


{{site.data.callout.callout_tip}}
**TIP**  
You can also view service accounts assigned to teams in **Users > Teams > Service Accounts**.
{{site.data.callout.end}}


SCREENSHOT


{: .table .table-bordered .table-hover}
| Service Account Setting  | Description   |
| ------------------------| ---------------- |
| **Name**                | The name of the service account. <br>The **Admin** label to the right of the name indicates that the service account has been assigned an admin role. See ?? |
| **API Keys**            | The number of API keys assigned to the service account. <br>Selecting a service account displays the API keys generated for that account. Modify selected scopes by clicking Edit, or delete the API key. |
| **Teams**               | The names of the teams the service account is assigned to. <!--- <br>??? see ???--> |
| **Status**               | Indicates if the service account is currently active (**Enabled**) or inactive (**Disabled**). NIMA: give me examples of one or two use cases when you would disable a service account |
| **Actions**               | The options available to manage the service account through its context menu: {::nomarkdown}<ul><li><b>Edit</b>: Modify the settings of the service account, including adding/removing teams, enabling/disabling admin role.</li><li><b>Delete</b>: Delete the service account, including all the API keys defined for the account. This means that actions through the Codefresh API or CLI that require these keys will fail.</li></ul>{:/} |


## Related articles
[Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/)


