---
title: "Helm Integration"
description: "Manage Helm releases and repositories with Codefresh pipelines"
group: integrations
toc: true
---

Codefresh is one of the few DevOps platforms with native support for Helm releases and deployments.
In addition to the [built-in Helm repository]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/) available to all Codefresh accounts,you can add any external Helm repository to Codefresh through integrations.

Native support for Helm in Codefresh includes:  
 * A pipeline [step for deploying Helm applications]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)
 * A dashboard for your [Helm charts]({{site.baseurl}}/docs/deployments/helm/add-helm-repository/)
 * A dashboard for your [Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/)
 * A dashboard for [promoting Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/) between different environments
 * A dashboard for [Helm environments]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)

The built-in Helm repository is production ready. You can start using Helm right away with your Codefresh account,
even if you don't have an external Helm repository. See our [quick start guide for Helm]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/) or the [complete Helm example]({{site.baseurl}}/docs/example-catalog/cd-examples/helm/).  

For each Helm integration, you can toggle the level of access by [non-admin users]({{site.baseurl}}/docs/administration/access-control/#users-and-administrators). 

## Set up external Helm integration

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Helm** and then click **Configure**.
1. From the **Add Helm Repository** dropdown, select the type of external Helm repository:
  * [Azure Registry](#azure-registry-helm-repository-settings)
  * [Azure Regsitry MI](#azure-registry-with-managed-identity-mi-helm-repository-settings)
  * [Azure Registry SP](#azure-registry-with-service-principal-sp-helm-repository-settings)
  * [Codefresh](#helm-repository-from-another-codefresh-account)
  * [Google Cloud Storage](#google-cloud-storage-gcs-helm-repository-settings)
  * [HTTP Basic Authentication](#http-basic-authentication-settings)
  * [Amazon AWS S3](#amazon-aws-s3-helm-repository-settings)


1. To restrict access to only Codefresh admins, toggle **Allow access to all users** to OFF.
  >When access is restricted, users **cannot** use the [CLI](https://codefresh-io.github.io/cli/){:target="\_blank"} or [API]({{site.baseurl}}/docs/integrations/codefresh-api/) to [programmatically access this Helm repository](https://codefresh-io.github.io/cli/contexts/){:target="\_blank"}.  
   Otherwise, all users from all your Codefresh teams will be able to access this Helm repository with CLI commands or API calls.



### HTTP Basic Authentication settings

You can connect to your external repository with HTTP Basic authentication.  
The table below describes the settings.

Setting|Description
---|---
**Helm Repository Name**|The unique name of integration which is used to reference the integration in `codefresh.yaml`
**Repository URL**|The URL to the Helm repository with `http://` protocol prefix.
**Helm Repo Username**|The username to authenticate with.
**Helm Repo Password**|The password for the username provided.

### Amazon AWS S3 Helm repository settings 

You can connect to Amazon AWS S3 Helm repository. Supply the AWS authentication credentials as you would for the AWS CLI, or the S3 plugin for Helm. For details, see [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html){:target="\_blank"}.

The table below describes the settings.

Setting|Description
---|---
**Helm Repository Name**|The unique name of integration which is used to reference the integration in `codefresh.yaml`
**Helm Repository URL**|The URL to the Helm repository in the format `s3://bucketname`.
**AWS Access Key ID**|The ID of the key with permissions to the S3 bucket.
**AWS Secret Access Key**|The Secret of the key with permissions to the S3 bucket.
**AWS Default Region**|The region where the S3 bucket is located.


### Google Cloud Storage (GCS) Helm repository settings 

You can connect to a Google Cloud Storage (GCS) Helm repository. Supply the GCS authentication credentials as you would for the GCloud CLI, or the GCS plugin for Helm. For details, see [Creating Service Account](https://cloud.google.com/docs/authentication/getting-started){:target="\_blank"}{:target="\_blank"}.

The table below describes the settings.

Setting|Description
---|---
**Helm Repository Name**|The unique name for the Helm repository integration which is used to reference the integration in `codefresh.yaml`
**Helm Repository URL**|The URL to the Helm repository in the format `gs://bucketname`.
**Google Application Credentials JSON**|The JSON content with the credentials of the service account.



### Azure Registry Helm repository settings

**Prerequsities**  
1. [Create the Helm repository](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-helm-repos){:target="\_blank"} in Azure.
1. Click **Authenticate**. 
1. In the permissions dialog, to allow Codefresh to access the Azure services, click **Accept**.

>Make sure that you are using an organizational/company Azure account, and not a personal one. We are currently working with Microsoft to improve this integration.

**Settings**  


{% include image.html 
lightbox="true" 
file="/images/integrations/helm/select-azure-helm-repository.png" 
url="/images/integrations/helm/select-azure-helm-repository.png" 
alt="Selecting an Azure Helm repository"
caption="Selecting an Azure Helm repository" 
max-width="70%" 
%}

Setting|Description
---|---
**Subscriptions**|Select your Azure subscription.
**Registry**|The Helm repository to connect to.

>If you are already authenticated to Azure, and cannot find your Helm repository in the list, try revoking access, and authenticating again.


### Azure Registry with Service Principal (SP) Helm repository settings

An alternative method of adding an Azure Helm repository is by using a service principal. 

**Prerequsities**  
* [Create a service principal in the Azure portal](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal){:target="\_blank"}.



**Settings**
1. Click **Authenticate**.
1.  Enter the following:
  * **Client ID**
  * **Tenant**
  * **Client secret**

{% include image.html
lightbox="true"
file="/images/integrations/helm/add-azure-helm-spn.png"
url="/images/integrations/helm/add-azure-helm-spn.png"
alt="Azure Service Service Principal details"
caption="Azure Service Principal details"
max-width="60%"
  %}

1.Click **Authenticate**. Assuming that the authentication is successful, you can view your available Azure registries that can be used as a Helm repository.


<!--- ### Azure Registry with Managed Identity (ID) Helm repository settings

An alternative method of adding an Azure Helm repository is by using a managed identity. 

**Prerequsities**  
* [Create a service principal in the Azure portal](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal){:target="\_blank"}.



**Settings**
1. Click **Authenticate**.
1.  Enter the following:
  * **Client ID**
  * **Pod Identity Name**

Change
{% include image.html
lightbox="true"
file="/images/integrations/helm/add-azure-helm-spn.png"
url="/images/integrations/helm/add-azure-helm-spn.png"
alt="Azure Service Service Principal details"
caption="Azure Service Principal details"
max-width="60%"
  %}

1.Click **Authenticate**. Assuming that the authentication is successful, you can view your available Azure registries that can be used as a Helm repository.  -->


### Helm repository from another Codefresh account

You also add the private Helm repository of another Codefresh user as your integration.

>We **don't** recommend sharing the Codefresh Helm repository between accounts. The built-in Helm repository of each account is best used as a private Helm repository of that account. See more details on [how to make your private Helm public]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/#repo-access-level).

The table below describes the settings. 

Setting|Description
---|---
**Helm Repository Name**|The unique name for the Helm repository integration which is used to reference the integration in `codefresh.yaml`
**Helm Repository URL**|The URL to the Helm repository in the format `cm://repository-name`.
**CF API Key**|A token [to access the other Codefresh account]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions).


## Related articles
[Private external Helm repositories]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/)  
[How to use Helm in a Codefresh pipeline]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)  
[Managing Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/)  
[Helm best practices]({{site.baseurl}}/docs/deployments/helm/helm-best-practices/)  

