---
title: "Using a managed Helm repository"
description: "Use the Codefresh integrated Helm repository"
group: deployments
sub_group: helm
redirect_from:
  - /docs/new-helm/managed-helm-repository/
toc: true
---

Codefresh provides fully managed, hosted Helm repositories for users.
While we automatically create a default managed repo for every Codefresh account, you can also add [external Helm repositories]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/).

The built-in Helm repo that Codefresh creates, is private by default, allowing access only via Codefresh or via a Codefresh API token. 

> Tip:  
  You may be familiar with the popular open source Helm repository implementation called 'ChartMuseum', that Codefresh sponsors. Codefresh-managed repositories are based on, and therefore compatible with, ChartMuseum and its unique features. For details, see [ChartMuseum](https://github.com/kubernetes-helm/chartmuseum){:target="\_blank"}. 

## View Helm repository integrations

The Codefresh-managed Helm repo is displayed with other Helm repositories you have added to Helm integrations. 

>You cannot delete the built-in Helm repo that Codefresh creates for you.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Pipeline Integrations**.
1. Scroll to **Helm Repositories**, and then click **Configure**.  
  All the Helm integrations you set up are displayed. 

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/managed-helm-repo.png"
url="/images/deployments/helm/managed-helm-repo.png"
alt="Codefresh built-in Helm repository" 
caption="Codefresh built-in Helm repository" 
max-width="50%" 
%} 


## Get the chart repository URL
Get the chart repository URL for any Helm integration.  
The URL is in the format: `cm://h.cfcr.io/<accountname>/<reponame>`, where the default repo is `default`.  

* From the list of Helm integrations, select the integration and then click the **Edit** icon on the left.
  The Helm Repository URL field displays the chart URL.

## Codefresh Helm dashboards

The Helm Charts and Helm Releases dashboards are automatically configured to work with your default managed repo to easily install charts and manage releases.  
For more information, see [install chart from a Helm repository]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/#install-chart-from-your-helm-repository) and [Managing Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/).

## Use Codefresh CLI for advanced Helm repo management

The Codefresh CLI supports advanced management options for your managed repository,  without having to log in to the Codefresh UI.  
For more information on CLI support for Helm repos, see the [CLI documentation on Helm Repos](https://codefresh-io.github.io/cli/helm-repos/){:target="\_blank"}.


## Set access level for managed repo

The managed Helm repository supports two modes of access: 
* Private
* Public  

By default, the managed Helm repo is created with `Private` access, meaning that read/write access is protected by Codefresh authentication.  

You can switch the access level to `Public`, which will make the repository accessible to anonymous users only *for read operations*. Write operations, even in public access mode, always require authentication.  
Be very careful when you make your repo public, as the whole world will be able to access your charts. We recommend this setting only for quick demos and POCs.

**How to**  

* Use the Codefresh CLI to toggle access level on a managed repo:

{% highlight bash %}
codefresh patch helm-repo mycfrepo -public
{% endhighlight %}

For more info, see the relevant section in the [Codefresh CLI documentation](https://codefresh-io.github.io/cli/helm-repos/update-helm-repo/){:target="\_blank"}.

## Working with Helm CLI

The private Helm repository offered by Codefresh is a standard Helm repo and will work with the vanilla Helm executable even outside of the Codefresh UI.  
We suggest using the private [Helm repo from Codefresh pipelines]({{site.baseurl}}/docs/example-catalog/cd-examples/helm/), but you can also use it from your workstation.

### Add a Public repo to Helm

If your repo is set to `public` access mode, you can use it just like any other HTTP Helm repository.  
You can:

{% highlight bash %}
helm repo add mycfrepo https://h.cfcr.io/<accountname>/<reponame>
{% endhighlight %}

### Add a Private repo to Helm

If your repo is set to `private` access mode, the default, then the Helm client needs to authenticate with Codefresh.  
To authenticate, you can use ChartMuseum's 'Helm Push' CLI plugin which adds support for authentication and chart manipulation on top of the basic Helm CLI functionality.

We highly recommend that you familiarize yourself with the [Helm Push plugin](https://github.com/chartmuseum/helm-push){:target="\_blank"}.  

#### Install the Helm Push plugin

{% highlight bash %}
helm plugin install https://github.com/chartmuseum/helm-push
{% endhighlight %}

#### Configure the Helm Push plugin

If you have the Codefresh CLI installed and configured, there's nothing you need to do. The Helm Push plugin picks up your settings automatically.  
To learn about getting started with Codefresh CLI, see [CLI getting started](https://codefresh-io.github.io/cli/getting-started/).  
To learn about manual authentication without depending on the Codefresh CLI, see [here](https://github.com/chartmuseum/helm-push#token).

#### Add the private repo

{% highlight bash %}
helm repo add mycfrepo cm://h.cfcr.io/kostis-codefresh/default
{% endhighlight %}

Notice the protocol is `cm://` instead of `https://`. This indicates the custom authentication scheme supported by ChartMuseum Helm Push plugin.

## Using in a Codefresh pipeline

The Codefresh Helm plugin automatically handles authentication for managed repositories. You can use the plugin as you usually would. For more information, see the [Codefresh Helm plugin]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/).

## Removing a Helm chart from a private Codefresh repository

You can delete a Helm chart from your own Helm repository with the following HTTP call.

{% highlight bash %}
curl -X DELETE -v -H "Authorization: Bearer <api-key>" https://h.cfcr.io/api/<codefresh-account-name>/<codefresh-helm-repo-name>/charts/<chart-name>/<chart-version>
{% endhighlight %}

Replace values in `<>` with your own (also removing `<>` in the process).

Generate an API key from the Codefresh UI:
* From your avatar dropdown, select [**User Settings**](https://g.codefresh.io/user/settings){:target="\_blank"}.  See [Codefresh API integration]({{site.baseurl}}/docs/integrations/codefresh-api/).

## Related articles
[Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)  
[Helm integration]({{site.baseurl}}/docs/integrations/helm/)  
[Managing Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management)  
