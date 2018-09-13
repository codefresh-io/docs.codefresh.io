---
title: "Bintray.io"
description: "Adding Jfrog Bintray to Codefresh and using it as a registry."
group: docker-registries
sub_group: external-docker-registries
redirect_from:
  - /docs/bitrayio/
toc: true
---



>Passing Codefresh metadata to Bintray is supported through Grafeas. More info is available [in this blogpost](https://codefresh.io/blog/write-this-down-grafeas/){:target="_blank"}.


To configure Bintray.io first select **Other Registries** from the new registry drop down and then provide the following

* Registry Name - A unique name for this configuration
* Username - Your Bintray.io username
* API Key - Your Bintray.io API key
* Domain - Your Bintray.io registry address e.g. `docker-new-repository.bintray.io`

{% include image.html lightbox="true" file="/images/artifacts/registry/add-bintray-registry.png" url="/images/artifacts/registry/add-bintray-registry.png" alt="Add Bintray.io Registry" max-width="60%" %}

## Finding your API key

{:start="1"}
1. Go to your Bitray.io profile

{:start="2"}
2. Select **API Key** from the side menu
{% include image.html lightbox="true" file="/images/da3579e-bintray-api-key.png" url="/images/da3579e-bintray-api-key.png" alt="Bintray.io API key" max-width="60%" %}

## Finding your registry domain"

{:start="1"}
1. Navigate to your bintray.com repository (or add a new one)

{:start="2"}
2. Click the **SET ME UP!** button
{% include image.html lightbox="true" file="/images/f0dcfc3-set-me-up.png" url="/images/f0dcfc3-set-me-up.png" alt="Bintray.io SET ME UP" max-width="45%" %}

{:start="3"}
3. Copy the registry address
{% include image.html lightbox="true" file="/images/9e068f4-bintray-domain.png" url="/images/9e068f4-bintray-domain.png" alt="Bintray.io registry address" max-width="45%" %}

## Basic metadata

Codefresh will automatically set some version attributes in Bintray every time you upload a Docker image.

{% 
	include image.html lightbox="true" 
	file="/images/artifacts/registry/bintray-metadata.png" 
	url="/images/artifacts/registry/bintray-metadata.png" 
	alt="Basic Bintray metadata" 
	caption="Basic Bintray metadata" 
	max-width="50%" 
	%}

