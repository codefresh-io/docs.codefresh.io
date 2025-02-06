---
title: "Managing service accounts"
description: "Manage access and permissions with service accounts"
toc: true
---

## Service accounts

A service account is an identity that provides automated processes, applications, and services with the necessary permissions to interact securely with your infrastructure. Service accounts can manage access and permissions programmatically, ensuring secure and efficient operations within your environment.

Coderfesh supports creating service accounts and assigning them to teams with RBAC (Role-Based Access Control) compliance for CI pipelines. See [Create service accounts](#create-service-accounts).  

Each service account can hold multiple API keys, making it easy to manage access for different purposes. See [Generate API keys for service accounts](#generate-api-keys-for-service-accounts).


## Create service accounts
Create service accounts in Codefresh to manage processes, integrations, at the account level.  
Assign teams to service accounts to ensure RBAC access for those teams and their users (see [Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control)).  

Note that service account creation is not supported via CLI and Terraform.


##### Before you begin
* Create one or more [teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/#create-a-team-in-codefresh)

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Service Accounts**.
1. Click **Add Service Account**.
1. Do the following:
    1. **Name**: Enter a name for the service account according to the requirements.
    1. **Team**: Assign this service account to one or more of the teams available.
    1. **Assign Admin role to service account**: Optional. Automatically assign admin permissions to this service account.  

{% include image.html 
lightbox="true" 
file="/images/administration/service-accounts/add-service-account.png" 
url="/images/administration/service-accounts/add-service-account.png"
alt="Add service account"
caption="Add service account"
max-width="60%"
%}

{:start="4"}
1. Continue with [Generate API keys for service accounts](#generate-api-keys-for-service-accounts).



## Generate API keys for service accounts
Generate API keys for a service account after creating it. The procedure is similar to how individual users can generate API keys.  
There is no limit to the number of API keys you can generate for a single service account.

After generating API keys, you can modify the scopes defined for the API key, or delete it.


1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar select **Service Accounts**.
1. Select the service account for which to generate API keys.
1. Click **Generate API Key**.
1. In the Generate Codefresh API key form, do the following:
    1. Enter the **Key Name**.
    1. Click **Generate**.
      Codefresh generates the key and pastes it in the API Key field.
    1. If required, copy the key to the clipboard and save it in a safe location.

{% include image.html 
lightbox="true" 
file="/images/administration/service-accounts/api-keys-service-account.png" 
url="/images/administration/service-accounts/api-keys-service-account.png"
alt="API keys for service account"
caption="API keys for service account"
max-width="60%"
%}

{:start="5"}
1. Select the required scopes. 
1. Click **OK**.


## View service accounts
The Service Accounts page shows the list of service accounts defined for the account. 


{% include image.html 
lightbox="true" 
file="/images/administration/service-accounts/service-account-list.png" 
url="/images/administration/service-accounts/service-account-list.png"
alt="Service account list"
caption="Service account list"
max-width="90%"
%}


{: .table .table-bordered .table-hover}
| Service Account Setting  | Description   |
| ------------------------| ---------------- |
| **Name**                | The name of the service account. <br>The **Admin** label to the right of the name indicates that the service account has been assigned an admin role.  |
| **API Keys**            | The number of API keys assigned to the service account. <br>Selecting a service account displays the API keys generated for that account. Modify selected scopes by clicking Edit, or delete the API key. |
| **Teams**               | The names of the teams the service account is assigned to.  |
| **Status**               | Indicates if the service account is currently active (**Enabled**) or inactive (**Disabled**). You may want to disable a service account to invalidate its API keys without having to remove the service account, and simply reenable when needed. |
| **Actions**               | The options available to manage the service account through its context menu: {::nomarkdown}<ul><li><b>Edit</b>: Modify the settings of the service account, including adding/removing teams, enabling/disabling admin role.</li><li><b>Delete</b>: Delete the service account, including all the API keys defined for the account. This means that actions through the Codefresh API or CLI that require these keys will fail.</li></ul>{:/} |

{% if page.layout != "argohub" %}
## Authenticating to Amazon ECR with service account

Authenticate to Amazon ECR registries with credentials from the service account instead of the Access Key ID and Secret Access Key.  
This allows pipelines to seamlessly authenticate to Amazon ECR via service account credentials, enhancing security and simplifying access management.

There are two requirements:
1. Set the option to authenticate via service accounts at the account level for pipelines. See [Advanced options for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#advanced-options-for-pipelines).
1. Configure Amazon ECR integration to use service account credentials. See [Amazon ECR Container Registry pipeline integration]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/).
{% endif %}

## Related articles
{% if page.layout != "argohub" %}
[Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/)  
[Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
{% endif %}
{% if page.layout == "argohub" %}
[Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
{% endif %}



