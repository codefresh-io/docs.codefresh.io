---
title: "Microsoft Azure"
description: "How to use Codefresh with Azure"
group: integrations
redirect_from:
  - /docs/microsoft-azure/
  - /docs/deploy-your-containers/microsoft-azure/
toc: true
---

Codefresh has native support for Azure in the following areas:

- [Integration with Azure Git]({{site.baseurl}}/docs/integrations/git-providers/#azure-devops)
- [Connecting to Azure registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/azure-docker-registry/)
- [Deploying to AKS]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#adding-aks-cluster)
- [Using Azure Storage for Test reports]({{site.baseurl}}/docs/testing/test-reports/#connecting-azure-storage)
- [Using Azure Storage for Helm charts]({{site.baseurl}}/docs/new-helm/add-helm-repository/#private-repository---azure)
- [Azure SSO]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-azure/)

## Using Azure Git repositories

Codefresh can easily checkout code from Azure Git repositories:

{% include 
image.html 
lightbox="true" 
file="/images/integrations/azure/azure-git-integration.png" 
url="/images/integrations/azure/azure-git-integration.png"
alt="Azure Git integration" 
caption="Azure Git integration"
max-width="70%"
%}

For more details see the [documentation page]({{site.baseurl}}/docs/integrations/git-providers/#azure-devops). Once your repository is connected you can use the [native clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) as well as [Git triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) like all other git providers.

## Using Azure Docker registries

Azure Docker registries are fully compliant with the Docker registry API that Codefresh follows. You can connect an Azure Registry like any [other Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).

{% 
	include image.html 
	lightbox="true" 
file="/images/artifacts/registry/add-azure-registry.png" 
url="/images/artifacts/registry/add-azure-registry.png" 
alt="Adding the Azure Docker registry" 
caption="Adding the Azure Docker registry" 
max-width="70%" 
%}

Once the registry is added you can the [standard push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) step in pipelines. See also the documentation page for [working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/).

## Deploying to Azure Kubernetes

Codefresh has native support for connecting an Azure cluster in the [cluster configuration screen]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/).

{% 
	include image.html 
	lightbox="true" 
file="/images/integrations/azure/aks-integration.png" 
url="/images/integrations/azure/aks-integration.png" 
alt="Connecting an Azure cluster" 
caption="Connecting an Azure cluster" 
max-width="40%" 
%}

Once the cluster is connected you can use any of the [available deployment options]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) for Kubernetes clusters. You also get access to all other Kubernetes dashboards such as the [cluster dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)  or the [environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/) .

## Storing test reports in Azure storage

Codefres has native support for test reports. You can store the reports on Azure storage.

{% include
image.html
lightbox="true"
file="/images/integrations/azure/azure-storage.png"
url="/images/integrations/azure/azure-storage.png"
alt="Azure cloud storage"
caption="Azure cloud storage"
max-width="60%"
%}

See the full documentation for [test reports]({{site.baseurl}}/docs/testing/test-reports/).

## Using Azure storage for storing Helm charts

You can connect Azure Storage as a Helm repository in the [integrations screen]({{site.baseurl}}/docs/new-helm/add-helm-repository/).

{% include
image.html
lightbox="true"
file="/images/integrations/azure/azure-helm-repo.png"
url="/images/integrations/azure/azure-helm-repo.png"
alt="Using Azure for Helm charts"
caption="Using Azure for Helm charts"
max-width="80%"
%}

Once you connect your Helm repository you can use it any [Codefresh pipeline with the Helm step]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/). 

## Azure Single Sign-on

You can use Azure Active Directory as an [SSO mechanism]({{site.baseurl}}/docs/enterprise/single-sign-on/) in Codefresh.

{% include 
image.html 
lightbox="true" 
file="/images/integrations/azure/azure-sso-integration.png" 
url="/images/integrations/azure/azure-sso-integration.png"
alt="Azure SSO integration" 
caption="Azure SSO integration"
max-width="70%"
%}

Once configuration is complete all Codefresh users can login using their Azure credentials instead of personal accounts.

## Traditional Azure deployments

For any other Azure deployment you can use the [Azure CLI from a Docker image](https://hub.docker.com/_/microsoft-azure-cli) in a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)

`YAML`
{% highlight yaml %}
{% raw %}
  create_my_vm:
    title: Creating a VM
    image: mcr.microsoft.com/azure-cli
    commands:
      - az vm create --resource-group TutorialResources --name TutorialVM1 --image UbuntuLTS --generate-ssh-keys     
{% endraw %}
{% endhighlight %}

For authentication see the [Microsoft documentation page](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli?view=azure-cli-latest)

 


## What to read next

- [Add your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
- [Manage your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
- [Cloning Git repositories]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/)
