---
title: "Azure Docker registry"
description: "Use the Azure Docker Registry for pipeline integrations"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/docker-registries/external-docker-registries/azure-docker-registry/
toc: true
---
Configure [Azure Docker registry](https://docs.microsoft.com/en-us/azure/container-registry/){:target=\_blank"} for pipeline integrations.

## Configure Azure portal

1. Log in to the Azure Portal.
1. Click **Settings** and from the sidebar, select **Access Keys**.

 {% include 
image.html 
lightbox="true" 
file="/images/integrations/docker-registries/azure-registry-admin.png" 
url="/images/integrations/docker-registries/azure-registry-admin.png" 
alt="Docker credentials for the Azure registry" 
caption="Docker credentials for the Azure registry" 
max-width="80%" 
%}

{:start="3"}
1. For **Admin user**, click **Enable**. 
1. Change the username (optional), and make sure that you note down one of the passwords shown on the screen.

## Configure Azure Docker registry settings in Codefresh

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Other Registries**.
1. Define the following: 
  * **Registry Name**: Unique name for this configuration.
  * **Username**: Your Azure Registry username.
  * **Password**: Your Azure Registry password.
  * **Domain**: `<registry_name>.azurecr.io`.

{% include image.html 
	lightbox="true" 
file="/images/integrations/docker-registries/add-azure-registry.png" 
url="/images/integrations/docker-registries/add-azure-registry.png" 
alt="Adding the Azure Docker registry" 
caption="Adding the Azure Docker registry" 
max-width="60%" %}

{:start="5"}
1. To verify the connection details, click **Test connection**.
1. To apply the changes, click **Save**.

## Using the Azure Registry

You can now use the Azure Registry in your CI pipelines, either via the UI  or through the YAML [push step]({{site.baseurl}}/docs/pipelines/steps/push/) (recommended).

It is also possible to use the registry from the command line with:

```
docker login <registry_name>.azurecr.io -u <user_name> -p<password>
```

You can also inspect the pushed images either using Azure portal or with [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest){:target="\_blank"}

```
az acr repository list --name <registry_name> --output table
```


## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)   
[Building and pushing an image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  