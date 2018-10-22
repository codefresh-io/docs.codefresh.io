---
title: "Google Marketplace"
description: "Learn how to run Codefresh pipelines inside your GKE cluster"
group: integrations
toc: true
---

Codefresh has partnered with [Google Cloud](https://cloud.google.com/) and allows you to install a Codefresh pipeline builder inside your own Kubernetes cluster. The integration is available in the Google Marketplace for Kubernetes apps at [https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh)

Once you configure Codefresh to use your own Kubernetes cluster for builds you will enjoy all benefits of a **Hybrid** installation as the Codefresh UI and management dashboards will still run in a SAAS manner, while the actual builds and pipelines will execute in your own cluster.

The major benefits are the following:

 * You define exactly what resources are used for your builds instead of relying on Codefresh infrastructure
 * The management UI is still running on the  Codefresh premises and is managed by the Codefresh team allowing you to focus on your builds
 * The Codefresh builder can have access to all private resources that run in your cluster so it is very easy to use resources that should not be exposed to the Internet for any reason
 * Unified billing. You pay a single bill to Google that includes the price for your Kubernetes cluster as well as the Codefresh pipelines.


To start the integration you need the following

1. A [Google cloud account](https://cloud.google.com/) with billing enabled
1. A [GKE cluster](https://cloud.google.com/kubernetes-engine/docs/quickstart) that will run all builds and pipelines
1. A [Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) (creating an account is free, you pay only for builds)

Then visit the Codefresh GKE page at [https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh)

## Using Codefresh from the Google Marketplace

When you configure Codefresh integration from the Google Marketplace a special Codefresh runner [is installed](https://github.com/codefresh-io/google-marketplace-integration) in your own cluster.

IMAGE here

The Codefresh UI is still hosted by Codefresh in a SAAS manner. The builds themselves however
run inside your own cluster.

The builder is responsible for executing all your builds and notifying the Codefresh GUI for their status. You can also access internal cluster resources that are normally not accessible to the SAAS hosted Codefresh builders.

You can still run builds in the Codefresh SAAS infrastructure if you wish so both approaches are valid at the same time.

## Usage and Billing

To start using the service you need to [enable billing](https://cloud.google.com/billing/docs/how-to/modify-project) in your Google Cloud account. Once that is done, Codefresh billing is integrated into your Google invoices. 

You will pay for the cluster resources to Google, plus the Codefresh builds. Codefresh does not collect any payment from you directly. Google cloud will invoice you for both the cluster infrastructure and the cluster usage. 

Current pricing for Codefresh builds is always shown in the [marketplace page].(https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh)

## First time installation

## Upgrades and Maintenance 




