---
title: "Google Marketplace integration"
description: "Learn how to run Codefresh pipelines inside your GKE cluster"
group: integrations
toc: true
---

Codefresh has partnered with [Google Cloud](https://cloud.google.com/){:target="\_blank"} and allows you to install a Codefresh pipeline builder within your own Kubernetes cluster.  
The integration is available in the Google Marketplace for Kubernetes apps at [https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh){:target="\_blank"}.

Once you configure Codefresh to use your own Kubernetes cluster for builds, you can enjoy all benefits of a **hybrid** installation as the Codefresh UI and management dashboards will still run in a SAAS manner, while the actual builds and pipelines will execute in your own cluster.

The major benefits are the following:

 * You define exactly what resources are used for your builds instead of relying on Codefresh infrastructure.
 * The management UI still runs in the Codefresh premises and is managed by the Codefresh team allowing you to focus on your builds.
 * The Codefresh builder has access to all private resources that run in your cluster so it is very easy to use resources that should not be exposed to the Internet for any reason.
 * Unified billing. You pay a single bill to Google that includes the price for your Kubernetes cluster as well as the Codefresh pipelines.


To start the integration, you need the following:

1. A [Google Cloud account](https://cloud.google.com/){:target="\_blank"} with billing enabled
1. A [GKE cluster](https://cloud.google.com/kubernetes-engine/docs/quickstart){:target="\_blank"} that will run all builds and pipelines
1. A [Codefresh account]({{site.baseurl}}/docs/administration/create-a-codefresh-account/) (creating an account is free, you pay only for builds)

Then visit the Codefresh GKE page at [https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh){:target="\_blank"}.

## Using Codefresh from the Google Marketplace

When you configure Codefresh integration from the Google Marketplace, a special Codefresh runner [is installed](https://github.com/codefresh-io/google-marketplace-integration){:target="\_blank"} in your own cluster.

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

The builder is responsible for executing all your builds and notifying the Codefresh UI of their status. You can also access internal cluster resources that are normally not accessible to the SAAS hosted Codefresh builders.

You can still run builds in the Codefresh SAAS infrastructure if you wish, and therefore both approaches are valid at the same time.

## Usage and billing

To start using the service, you need to [enable billing](https://cloud.google.com/billing/docs/how-to/modify-project){:target="\_blank"} in your Google Cloud account. Once that is done, Codefresh billing is integrated into your Google invoices. 

You will pay for the cluster resources to Google, plus the Codefresh builds. Codefresh does not collect any payment from you directly. Google Cloud will invoice you for both the cluster infrastructure and the cluster usage. 

Current pricing for Codefresh builds is always shown in the [marketplace page](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh){:target="\_blank"}.

## Install the Google Marketplace

### Step 1: Create a Codefresh API key

1. Log in to your Codefresh account, and from your avatar dropdown, select [**User Settings**](https://g.codefresh.io/user/settings){:target="\_blank"}.
1. Scroll down to  **API Keys**.
1. To create a new API key, click **Generate**, and do the following:
  * **Key Name**: Enter the name of the key, preferable one that will help you remember its purpose. The token is tied to your Codefresh account and should be considered sensitive information.
  * **Scopes**: Select _all_ the scopes.
1. Copy the token to your clipboard. 
1. Click **Create**.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/generate-token.png" 
url="/images/integrations/google-marketplace/generate-token.png"
max-width="40%"
caption="Generating a Codefresh API token"
alt="Generating a Codefresh API token"
%}


With the token at hand, we can go to the Google marketplace.

### Step 2: Install the Codefresh application in your Google Cloud cluster

1. Navigate to [https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh){:target="\_blank"}.
1. From the dropdown menu at the top of the page, select a Google project that has billing enabled.
1. Click **Configure**.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/configure-plan.png" 
url="/images/integrations/google-marketplace/configure-plan.png"
max-width="50%"
caption="Installing the Codefresh application"
alt="Installing the Codefresh application"
%}

{:start="4"}
1. Define the general settings for the installation.  
  These include:  
  * The cluster that will be used for installation
  * An existing or new namespace where the Codefresh builder will reside
  * A name for your installation (arbitrary choice)
  * Your Codefresh API token that you created in the previous section
  * The selection of the account that will be used for the cluster management.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/settings.png" 
url="/images/integrations/google-marketplace/settings.png"
max-width="50%"
caption="Codefresh installation settings"
alt="Codefresh installation settings"
%}

{:start="5"}
1. Note down the namespace you used, as it becomes important later on inside the Codefresh UI.
1. After defining all the settings, to install, click **Deploy**.  Wait for a few minutes for the installation complete.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/deploying.png" 
url="/images/integrations/google-marketplace/deploying.png"
max-width="50%"
caption="Deploying the Codefresh application"
alt="Deploying the Codefresh application"
%}

The Codefresh application is now installed on your cluster.

### Step 3: Set up communication with Codefresh SaaS

To finish the installation, we need to make Codefresh SaaS aware of the new builder.

1. On the right hand-side, copy the full command to complete the installation.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/run-command.png" 
url="/images/integrations/google-marketplace/run-command.png"
max-width="60%"
caption="Endpoint command"
alt="Endpoint command"
%}

This command must be executed from a shell that has `kubectl` installed with the correct configuration for the cluster that was used for the installation. If you already have a local shell that points to your cluster, feel free to paste the command there and run it.

The easiest way to run it in any other case is via the [Google shell](https://cloud.google.com/shell/docs/){:target="\_blank"}. Click the *Activate Google shell* icon from the top right and wait a bit until the shell appears at the bottom part of the window.

First you need to set up `kubectl` access. Run:

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

This will set up `kubectl` access. You can try running some command such as `kubectl get nodes` and `kubectl cluster-info` to verify that cluster communication is setup correctly.

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


Once the command is run, you can visit the [Codefresh Kubernetes dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/) and you will see your Google Cloud cluster already configured.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/cluster-details.png" 
url="/images/integrations/google-marketplace/cluster-details.png"
max-width="60%"
caption="Codefresh Kubernetes dashboard"
alt="Codefresh Kubernetes dashboard"
%}

The full integration is now ready, and you can start running Codefresh pipelines in your own cluster.

### Step 4: Start running pipelines

Now whenever you set up a [Codefresh pipeline]({{site.baseurl}}/docs/pipelines/pipelines/), you can choose its execution environment and point it to your own cluster with the Codefresh builder. 

>At this point if you have a Codefresh browser window open, make sure that you log out and then log in again so that the new UI options regarding your cluster become available.

Open any Codefresh pipeline and toggle the *Run on Environment* switch. Select the cluster and the namespace that you used for the installation in step 2.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/run-in-environment.png" 
url="/images/integrations/google-marketplace/run-in-environment.png"
max-width="60%"
caption="Running Pipelines in your cluster"
alt="Running Pipelines in your cluster"
%}


You can still use the Codefresh SAAS if you don't enable this switch. You can choose which pipelines
run in Codefresh SAAS and which use your cluster depending on your needs.


## Alternative installation from the command line

Instead of installing via the Google Cloud console, you can also install the Codefresh application using command line procedures. 

For this installation mode, see the [manual installation guide](https://github.com/codefresh-io/google-marketplace-integration/blob/master/README.md){:target="\_blank"}.

## Removing the installation

If you want to remove the Codefresh builder from your cluster, navigate to the "Applications" page in the Google Cloud console and click the Delete button.

{% include image.html 
lightbox="true" 
file="/images/integrations/google-marketplace/remove.png" 
url="/images/integrations/google-marketplace/remove.png"
max-width="60%"
caption="Removing the Codefresh application"
alt="Removing the Codefresh application"
%}

You can install the Codefresh builder again from the [marketplace](https://console.cloud.google.com/marketplace/details/codefresh-gke/codefresh){:target="\_blank"}.

## Related articles
[Manage your cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  








