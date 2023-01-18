---
title: "Bintray.io/Artifactory"
description: "Use JFrog Bintray/Artifactory with pipeline integrations "
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/integrations/docker-registries/bintray-io/
  - /docs/bitrayio/
  - /docs/docker-registries/external-docker-registries/bintray-io/
toc: true
---

Configure JFrog Bintray/Artifactory as your Docker registry provider.  
You need to get the API key for your profile, and the correct  registry domain.  

>Passing Codefresh metadata to Bintray is supported through Grafeas. More info is available in this [blogpost](https://codefresh.io/blog/write-this-down-grafeas/){:target="_blank"}.

## Set up Bintray integration

**Before you begin**  
* [Find your API key](#find-your-api-key)
* [Find your regsitry domain](#find-your-registry-domain)

**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **JFrog Bintray**.
1. Define the following:  
  * **Registry name**: A unique name for this configuration.
  * **Username**: Your Bintray.io/Artifactory username.
  * **API key**: The Bintray.io/Artifactory API key you retrieved from your profile.
  * **Domain**: Your Bintray.io registry address, for example, `docker-new-repository.bintray.io`, or Artifactory registry address, for example `my-company-docker-snapshot.jfrog.io`.

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/add-bintray-registry.png" 
	url="/images/integrations/docker-registries/add-bintray-registry.png" 
	alt="JFrog Bintray registry settings" 
    caption="JFrog Bintray registry settings" 
	max-width="70%" %}

{:start="5"}
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.


## Getting Bintray.io settings

To obtain Bintray.io information, follow the steps.

### Find your API key

1. Go to your Bitray.io profile.
1. Select **API Key** from the side menu.

{% include image.html 
lightbox="true" 
file="/images/integrations/docker-registries/bintray/bintray-api-key.png" 
url="/images/integrations/docker-registries/bintray/bintray-api-key.png" 
alt="Bintray.io API key" 
caption="Bintray.io API key"
max-width="60%" %}

### Find your registry domain

1. Navigate to your bintray.com repository, or add a new one.
1. Click **SET ME UP!**.
{% include image.html lightbox="true" file="/images/integrations/docker-registries/bintray/bintray-set-me-up.png" url="/images/integrations/docker-registries/bintray/bintray-set-me-up.png" alt="Bintray.io SET ME UP" caption="Bintray.io SET ME UP" max-width="45%" %}

{:start="3"}
1. Copy the registry address.
{% include image.html lightbox="true" file="/images/integrations/docker-registries/bintray/bintray-domain.png" url="/images/integrations/docker-registries/bintray/bintray-domain.png" alt="Bintray.io registry address" caption="Bintray.io registry address" max-width="45%" %}

### Basic metadata upload

Codefresh automatically sets some version attributes in Bintray every time you upload a Docker image.

{% 
	include image.html lightbox="true" 
	file="/images/integrations/docker-registries/bintray/bintray-metadata.png" 
	url="/images/integrations/docker-registries/bintray/bintray-metadata.png" 
	alt="Basic Bintray metadata" 
	caption="Basic Bintray metadata" 
	max-width="50%" 
	%}

## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)  
[Push step]({{site.baseurl}}/docs/pipelines/steps/push/)  
[Building and pushing an image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  