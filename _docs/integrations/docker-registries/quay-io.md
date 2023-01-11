---
title: "Quay.io"
description: "Use Quay registries with pipeline integration"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/quayio/
  - /docs/docker-registries/external-docker-registries/quay-io/
toc: true
---

Configure Quay as your Docker registry provider.  

## Set up Quay integration


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Other Registries**.
1. Define the following:  
  * **Registry name**: A unique name for this configuration.
  * **Username**: Your `Quay.io` username.
  * **Password**: Your `Quay.io` encrypted password.
  * **Domain**: `quay.io`.

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/add-quay-registry.png" 
	url="/images/integrations/docker-registries/add-quay-registry.png" 
	alt="Quay Docker registry settings" 
	caption="Quay Docker registry settings" 
	max-width="60%" %}`

{:start="5"}
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.


## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)  
[Push step]({{site.baseurl}}/docs/pipelines/steps/push/)  
[Building and pushing an image]({{site.baseurl}}/docs/yaml-examples/examples/build-and-push-an-image/)  