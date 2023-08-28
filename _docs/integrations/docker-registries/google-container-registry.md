---
title: "Google Container Registry (GCR)"
description: "Use GCR with pipeline integrations"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/google-cloud-registry/
  - /docs/docker-registries/external-docker-registries/google-container-registry/
toc: true
---
Configure GCR (Google Container Registry) as your Docker registry provider.  

## Set up GCR integration

**Before you begin**  
* [Generate a JSON key file](#generate-a-json-key-file)

**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Google Container Registry**.
1. Define the following:  
  * **Registry name**: A unique name for this configuration.
  * **Domain**: Select the domain. Make sure the _domain does not include suffixes such as the URL path_. Configuring the domain as `us.gcr.io/my_org` is incorrect and will cause builds to fail. 
  * **JSON Keyfile**: The content of the generated JSON key file. 


{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/google-gcr-registry-settings.png" 
	url="/images/integrations/docker-registries/google-gcr-registry-settings.png" 
	alt="Google Container Registry (GCR) settings" 
  caption="Google Container Registry (GCR) settings" 
	max-width="60%" %}`

{:start="5"}
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.


## Generate a JSON key file
The JSON key file holds your credentials for a given [service account](https://cloud.google.com/compute/docs/access/service-accounts){:target="\_blank"}.  
To generate your key file follow these instructions:

1. Go to your [Cloud Platform Console Credentials](https://console.cloud.google.com/apis/credentials){:target="\_blank"}  page.
1. Select the project that you're creating credentials for.
1. To set up a new service account, click **Create credentials**, and then select Service account key.
1. Choose the service account to use for the key.
1. Choose to download the service account's public/private key as a JSON file.

You can find the complete guide [here](https://support.google.com/cloud/answer/6158849#serviceaccounts){:target="\_blank"}.

## Working with multiple projects

If you have more than one repository/project in Google cloud, you can connect multiple GCR registries and define one as the "primary" for the `gcr.io` domain.

This means that every time Codefresh needs to pull an image it will use that integration. If you wish to use another project for pulling images,
you can use the `registry_context` property as described in [working with multiple registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain).


## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)  
[Push step]({{site.baseurl}}/docs/pipelines/steps/push/)  
[Building and pushing an image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  