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

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/architecture.png" 
url="/images/integrations/google-marketplace/architecture.png"
max-width="80%"
caption="Google Marketplace integration"
alt="Google Marketplace integration"
%}

The Codefresh UI is still hosted by Codefresh in a SAAS manner. The builds themselves however
run inside your own cluster.

The builder is responsible for executing all your builds and notifying the Codefresh GUI for their status. You can also access internal cluster resources that are normally not accessible to the SAAS hosted Codefresh builders.

You can still run builds in the Codefresh SAAS infrastructure if you wish so both approaches are valid at the same time.

## Usage and Billing

To start using the service you need to [enable billing](https://cloud.google.com/billing/docs/how-to/modify-project) in your Google Cloud account. Once that is done, Codefresh billing is integrated into your Google invoices. 

You will pay for the cluster resources to Google, plus the Codefresh builds. Codefresh does not collect any payment from you directly. Google cloud will invoice you for both the cluster infrastructure and the cluster usage. 

Current pricing for Codefresh builds is always shown in the [marketplace page](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh).


## Step 0 - Create a Codefresh access token

To start the installation process log into your Codefresh account a visit the [tokens](https://g.codefresh.io/account-conf/tokens) area by selecting *Integrations* from the left sidebar and then clicking on the *tokens* tab.

Then click the *generate* button to create a new token.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/generate-token.png" 
url="/images/integrations/google-marketplace/generate-token.png"
max-width="60%"
caption="Generating a Codefresh API token"
alt="Generating a Codefresh API token"
%}

You can give your token any name you wish so that you can remember its purpose. The token is tied to your Codefresh account and should be considered as sensitive information. After you copy the token there no way to get it back. Copy it into your clipboard.

With the token at hand we can go to the Google marketplace.

## Step 1 - Install the Codefresh application in your Google Cloud cluster

Navigate to [https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh) and select a Google project that has billing enabled from drop-down menu at the top of the page.

The click the *Configure* button:

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/configure-plan.png" 
url="/images/integrations/google-marketplace/configure-plan.png"
max-width="80%"
caption="Installing the Codefresh application"
alt="Installing the Codefresh application"
%}

On the next screen you define the general settings for the installation. These include

* The cluster that will be used for installation
* An existing or new namespace where the Codefresh builder will reside
* A name for your installation (arbitrary)
* Your Codefresh API token that you created in the previous section
* The selection of the account that will be used for the cluster management.

Once you set everything click the *Deploy* button and wait some minutes for the installation to take place

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/deploying.png" 
url="/images/integrations/google-marketplace/deploying.png"
max-width="80%"
caption="Deploying the Codefresh application"
alt="Deploying the Codefresh application"
%}

## Step 2 - Setup communication with Codefresh SAAS

The Codefresh application is now installed on your cluster. To finish the installation we need to make Codefresh SAAS aware of the new builder.

On the right hand side, a full command is shown that completes the installation.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/run-command.png" 
url="/images/integrations/google-marketplace/run-command.png"
max-width="80%"
caption="Endpoint command"
alt="Endpoint command"
%}

This command must be executed from a shell that has `kubectl` installed with the correct configuration for the cluster that was used for the installation. If you already have a local shell 
that points to your cluster, feel free to paste the command there and run it.

The easiest way to run it in any other case is via the Google shell. Click the *Activate Google shell* icon from the top right and wait a bit until the shell appears at the bottom part of the window

First you need to setup `kubectl` access. Run:

`Google shell`
{% highlight shell %}
{% raw %}
gcloud container clusters list
{% endraw %}
{% endhighlight %}

This will show you a list of your clusters. Find the one that has the Codefresh application and run:

`Google shell`
{% highlight shell %}
{% raw %}
gcloud container clusters get-credentials [my-cluster-name] --zone=[my-cluster-zone]
{% endraw %}
{% endhighlight %}

This will setup `kubectl` access. You can try running some command such as `kubectl get nodes` and `kubectl cluster-info` to verify that cluster communication is setup correctly.

Then run the full command. Here is an example:

`Google shell`
{% highlight shell %}
{% raw %}
$ APP="codefresh-kostis" NS="kostisdemo" ENDPOINT="$(kubectl cluster-info | head -1 | cut -d' ' -f6 | sed 's/\x1b[[0-9;]*m//g' | tr -d '\n' | base64)" && kubectl -n $NS get s
ecret $APP-secret -o yaml | sed -r "s/(kubeEndpoint: ).*$/\1$ENDPOINT/" | kubectl apply -f - && kubectl -n $NS delete pod -l app.kubernetes.io/name=$APP                                                                  
  
secret "codefresh-kostis-secret" configured
pod "codefresh-kostis-kube-agent-86dbcc67c4-9gqqb" deleted
{% endraw %}
{% endhighlight %}

Once the command is finished you can visit the Codefresh Kubernetes dashboard and you will see your Google cloud cluster already configured.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/cluster-details.png" 
url="/images/integrations/google-marketplace/cluster-details.png"
max-width="80%"
caption="Codefresh Kubernetes dashboard"
alt="Codefresh Kubernetes dashboard"
%}

The full integration is now ready and you can start running Codefresh pipelines in your own cluster.

## Step 3 - Start running pipelines

Now whenever you setup a Codefresh pipeline you can choose its execution environment. You can still use the Codefresh SAAS in addition to your own cluster.


## Removing the installation.

If you want to remove the Codefresh builder from your cluster, navigate to the "Applications" page in the Google Cloud console and click the delete button.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/removal.png" 
url="/images/integrations/google-marketplace/removal.png"
max-width="80%"
caption="Removing the Codefresh application"
alt="Removing the Codefresh application"
%}

You can install again the Codefresh builder from the [marketplace](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh).






