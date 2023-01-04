---
title: "HashiCorp Vault"
description: "Use secrets from Vault in Codefresh pipelines"
group: integrations
toc: true
---

Codefresh can use secrets from your HashiCorp Vault installation. This way you have full control over secret storage and rotation.

>This feature is for Enterprise accounts only.

## Prerequisites

* Up and running Vault instance  
  Codefresh supports HashiCorp Cloud Platform (HCP) Vault and self-managed Vault instances that run on the cloud, as well as behind the firewall (albeit with some differences in the authentication methods).

* [Authentication method](https://www.vaultproject.io/docs/auth){:target="\_blank"} to use.  
  Codefresh supports the following methods:

{: .table .table-bordered .table-hover}
| Method         | Notes |
|---|--- |
| [Username/Password](https://www.vaultproject.io/docs/auth/userpass){:target="\_blank"}|Available for SaaS and Hybrid versions |
| [Access Token](https://www.vaultproject.io/docs/auth/token){:target="\_blank"}|Available for SaaS and Hybrid versions |
| [Kubernetes](https://www.vaultproject.io/docs/auth/kubernetes){:target="\_blank"}|Only available with [Codefresh Runner installation]({{site.baseurl}}/docs/reference/behind-the-firewall/) |
| [Google Cloud Engine](https://www.vaultproject.io/docs/auth/gcp){:target="\_blank"}|Only available with [Codefresh Runner installation]({{site.baseurl}}/docs/reference/behind-the-firewall/) |
| [App Role](https://www.vaultproject.io/docs/auth/approle){:target="\_blank"}|Available for SaaS and Hybrid versions |

## Set up HashiCorp Vault integration in the Codefresh UI

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Secret Store** and then click **Configure**.
1. From the **Add Provider** dropdown, select **Hashicorp vault**.
1. Do the following:  
  * **Name**: A unique name for the integration which is referenced in `codefresh.yaml`.
  * If your Vault instance is behind a firewall, toggle **Vault is behind a firewall** to ON.  
  * To allow only Codefresh admins to change the Vault configuration, toggle **Allow access to all users** to OFF.
  > The other settings are specific to your [Vault authentication](https://www.vaultproject.io/docs/auth){:target="\_blank"} method. Refer to the  Vault documentation on how to get the required values.

{% include image.html
lightbox="true"
file="/images/integrations/hashicorp-vault/hashicorp-vault.png"
url="/images/integrations/hashicorp-vault/hashicorp-vault.png"
alt="HashiCorp-vault Secret"
caption="HashiCorp-vault Secret"
max-width="80%"
  %}

{:start="5"}
1. To apply the changes, click **Save**.


### Set up HashiCorp Vault integration via Codefresh CLI

You can also create Vault integrations with the [CLI](https://codefresh-io.github.io/cli/){:target="\_blank"}.

Use the [create context command](https://codefresh-io.github.io/cli/contexts/create-context/create-secret-store-context/hashicorp-vault/){:target="\_blank"}.

The options available are identical to the UI settings.  
For example, to create an integration with user/password authentication, you would run this command:

`codefresh create context secret-store hashicorp-vault <my-integration> --sharing-policy AccountAdmins -app-url <http://vault.example.com> --username <my-user> --password <my-password>`  
<!--- where:
* <my-integration> is the name of the integration which is referenced in `codefresh.yaml`.
* <my-integration> is the name of the integration which is referenced in `codefresh.yaml`.-->


### Using the HashiCorp Vault secret

To use the Vault secrets in pipelines, see our [secrets guide]({{site.baseurl}}/docs/pipelines/secrets-store/).  
Because a secret in Vault can contain multiple key-value pairs, you will need to put in the key name as well, according to the syntax `{secrets.vault-store-name.path/to/secret@key}`.

## Related articles
[Shared Configuration]({{site.baseurl}}/docs/pipelines/shared-configuration/)  
[Git integration for pipelines]({{site.baseurl}}/docs/integrations/git-providers/)    
[Kubernetes integration for pipelines]({{site.baseurl}}/docs/integrations/kubernetes/)  
[Container registry integration for pipelines]({{site.baseurl}}/docs/integrations/docker-registries/)  
