---
title: "Microsoft Azure pipeline integration"
description: "How to use Codefresh pipelines with Azure"
group: integrations
redirect_from:
  - /docs/microsoft-azure/
  - /docs/deploy-your-containers/microsoft-azure/
toc: true
---

Codefresh has native support for Azure in the following areas:

- [Integration with Azure Git]({{site.baseurl}}/docs/integrations/git-providers/#azure-devops)
- [Connecting to Azure registries]({{site.baseurl}}/docs/integrations/docker-registries/azure-docker-registry/)
- [Deploying to AKS]({{site.baseurl}}/docs/deployments/kubernetes/#adding-an-aks-cluster)  
- [Using Azure Storage for Test reports]({{site.baseurl}}/docs/testing/test-reports/#connecting-azure-storage)
- [Using Azure Storage for Helm charts]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/)  
- [Azure SSO]({{site.baseurl}}/docs/single-sign-on/sso-azure/)

## Using Azure Git repositories

Codefresh can easily check out code from Azure Git repositories:

{% include 
image.html 
lightbox="true" 
file="/images/integrations/azure/azure-git-integration.png" 
url="/images/integrations/azure/azure-git-integration.png"
alt="Azure Git integration" 
caption="Azure Git integration"
max-width="70%"
%}

For more details see the [documentation page]({{site.baseurl}}/docs/integrations/git-providers/#azure-devops). Once your repository is connected, you can use the [native clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) as well as [Git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) like all other git providers.

## Using Azure Docker registries

Azure Docker registries are fully compliant with the Docker registry API that Codefresh follows. You can connect an Azure Registry like any [other Docker registry]({{site.baseurl}}/docs/integrations/docker-registries/).

{% 
	include image.html 
	lightbox="true" 
file="/images/integrations/docker-registries/add-azure-registry.png" 
url="/images/integrations/docker-registries/add-azure-registry.png" 
alt="Adding the Azure Docker registry" 
caption="Adding the Azure Docker registry" 
max-width="70%" 
%}

Once the registry is added you can the [standard push step]({{site.baseurl}}/docs/pipelines/steps/push/) step in pipelines. 

## Deploying to Azure Kubernetes

Codefresh has native support for connecting an Azure cluster in the [cluster configuration screen]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster).

{% 
	include image.html 
	lightbox="true" 
file="/images/integrations/azure/aks-integration.png" 
url="/images/integrations/azure/aks-integration.png" 
alt="Connecting an Azure cluster" 
caption="Connecting an Azure cluster" 
max-width="40%" 
%}

Once the cluster is connected you can use any of the [available deployment options]({{site.baseurl}}/docs/deployments/kubernetes/deployment-options-to-kubernetes/) for Kubernetes clusters. You also get access to all other Kubernetes dashboards such as the [cluster dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  or the [environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/) .

## Storing test reports in Azure storage

Codefres has native support for test reports. You can store the reports on Azure storage.

{% include
image.html
lightbox="true"
file="/images/integrations/azure/azure-storage.png"
url="/images/integrations/azure/azure-storage.png"
alt="Azure cloud storage"
caption="Azure cloud storage"
max-width="50%"
%}

See the full documentation for [test reports]({{site.baseurl}}/docs/testing/test-reports/).

## Using Azure storage for storing Helm charts

You can connect Azure Storage as a Helm repository in the [integrations screen]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/).

{% include
image.html
lightbox="true"
file="/images/integrations/azure/azure-helm-repo.png"
url="/images/integrations/azure/azure-helm-repo.png"
alt="Using Azure for Helm charts"
caption="Using Azure for Helm charts"
max-width="80%"
%}

Once you connect your Helm repository you can use it any [Codefresh pipeline with the Helm step]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/). 

## Azure Single Sign-on

You can use Azure Active Directory as an [SSO mechanism]({{site.baseurl}}/docs/single-sign-on/) in Codefresh.

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

For any other Azure deployment you can use the [Azure CLI from a Docker image](https://hub.docker.com/_/microsoft-azure-cli){:target="\_blank"} in a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).

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

For authentication see the [Microsoft documentation page](https://docs.microsoft.com/en-us/cli/azure/authenticate-azure-cli?view=azure-cli-latest){:target="\_blank"}.

## Related articles
[Manage your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Cloning Git repositories]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/)  
