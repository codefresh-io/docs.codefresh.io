---
title: "Hashicorp Vault"
description: "How to use secrets from Vault in your Codefresh pipelines"
group: integrations
toc: true
---

Codefresh can use secrets from your Hashicorp Vault installation. This way you have full control over secret storage and rotation.

`Note: This feature is for Enterprise accounts only.`

### Prerequisites

You need to have a vault instance up and running. Codefresh supports Vault instances that run on the cloud, as well as behind the firewall (albeit with some differences in the authentication methods).

You also need to decide what [authentication method](https://www.vaultproject.io/docs/auth) Codefresh will use. The following methods are supported:

---|---
[Username/Password](https://www.vaultproject.io/docs/auth/userpass)|Available in SaaS and Hybrid customers
[Access Token](https://www.vaultproject.io/docs/auth/token)|Available in SaaS and Hybrid customers
[Kubernetes](https://www.vaultproject.io/docs/auth/kubernetes)|Only available in [Hybrid installation]({{site.baseurl}}/docs/docs/administration/behind-the-firewall/)
[Google Cloud Engine](https://www.vaultproject.io/docs/auth/gcp)|Only available in [Hybrid installation]({{site.baseurl}}/docs/docs/administration/behind-the-firewall/)
[App Role]()|Available in SaaS and Hybrid customers

### Using the Codefresh UI

On the left-hand panel, navigate to **Account Settings** > **Integrations** > **Secret Store** and select **Configure**. 

Click on **Add Provider** and select **Hashicorp vault**. Toggle the “allow access to all users” button to the off position as you normally want only Codefresh admins to change vault configuration.

{% include image.html
lightbox="true"
file="/images/integrations/hashicorp-vault/hashicorp-vault.png"
url="/images/integrations/hashicorp-vault/hashicorp-vault.png"
alt="Hashicorp-vault Secret"
caption="Hashicorp-vault Secret"
max-width="80%"
  %}

Enter a name for your integration (you can have multiple vault integrations) unique to this configuration. Then choose if your vault instance is behind a firewall or not.

The rest of the options are specific to your [Vault authentication](https://www.vaultproject.io/docs/auth) method and you should consult the Vault documentation on how to obtain them.

### Using the Codefresh CLI

You can also create Vault integrations with the [CLI](https://codefresh-io.github.io/cli/) and more specifically with the [create context command](https://codefresh-io.github.io/cli/contexts/create-context/create-secret-store-context/hashicorp-vault/).

The available options are the same ones as found in the UI. For example, to create an integration with user/pass authentication the respective command is:

`codefresh create context secret-store hashicorp-vault my-integration --sharing-policy AccountAdmins -app-url http://vault.example.com --username my-user --password my-password`


### Using the Secrets

To use the vault secrets in pipelines see our [secrets guide]({{site.baseurl}}/docs/docs/configure-ci-cd-pipeline/secrets-store/). Note that because in Vault, a secret can contain multiple key-value pairs you will need to put in the key name as well. So the syntax will be `{secrets.vault-store-name.path/to/secret@key}`
