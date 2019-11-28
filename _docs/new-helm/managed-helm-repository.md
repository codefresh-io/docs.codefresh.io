---
title: "Managed Helm Repository"
description: "How to to use the Codefresh integrated Helm repository"
group: new-helm
toc: true
---

Codefresh provides fully managed, hosted Helm repositories for users.
A default managed repo is created automatically for every account and you can add other [external Helm repositories]({{site.baseurl}}/docs/new-helm/add-helm-repository/) as well.

The built-in Helm repo is private by default, allowing access only via Codefresh or using a Codefresh API token. 

> You may be familiar with the popular open source Helm repository implementation called 'ChartMuseum' that Codefresh sponsors.   Codefresh managed repositories are based on, and therefore compatible with ChartMuseum and its unique features. For more info on ChartMuseum: [https://github.com/kubernetes-helm/chartmuseum](https://github.com/kubernetes-helm/chartmuseum). 

## Helm repository integration

Your managed helm repo will appear under the Helm repositories integration section just like any other Helm repository you might have added. You can manage Helm repo connections under *Account settings -> Integrations -> Helm repositories*. 

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/private-helm-repo/managed-helm-repo.png" 
url="/images/kubernetes-helm/private-helm-repo/managed-helm-repo.png"
alt="Codefresh built-in Helm repository" 
caption="Codefresh built-in Helm repository" 
max-width="50%" 
%} 

Note that you cannot delete the out-of-the-box managed repo that is created for you.

## Chart Repository URL

You can find your managed repository URL in the Helm integration section. The URL will take the form of: `cm://h.cfcr.io/<accountname>/<reponame>`, where the default repo is called `default`.  

## Codefresh Helm dashboards

The Codefresh Helm Charts and Helm Releases dashboards are automatically configured to work with your default managed repo so you can easily install charts and manage releases. For more information see: [Install chart from Helm repository]({{site.baseurl}}/docs/new-helm/add-helm-repository/#install-chart-from-your-helm-repository) and [Helm release management]({{site.baseurl}}/docs/new-helm/helm-releases-management/) articles.

## Use Codefresh CLI for advanced management

The Codefresh CLI can be used for advanced management of your managed repository. For more information on CLI support for Helm repos, see the 'Helm Repos' section in the CLI documentation: [https://codefresh-io.github.io/cli/helm-repos/](https://codefresh-io.github.io/cli/helm-repos/).

Using the Codefresh CLI you can manage the managed Helm repo without logging in the Codefresh UI.

## Repo access level

The managed Helm repository supports two modes of access level: *Private* and *Public*.  

By default, it is created as private which means read/write access is protected by Codefresh authentication.  

You can switch the access level to Public which will make the repository accessible to anonymous users only *for read operations*. write operations always require authentication even when in public access mode. Be very careful when you make your repo public, as the whole world will be able to access your charts. We recommend this settings only for quick demos and POCs.

### Setting access level

Use the Codefresh CLI to toggle access level on a managed repo:

{% highlight bash %}
codefresh patch helm-repo mycfrepo -public
{% endhighlight %}

For more info see the relevant section in the Codefresh CLI documentation: [https://codefresh-io.github.io/cli/helm-repos/update-helm-repo/](https://codefresh-io.github.io/cli/helm-repos/update-helm-repo/).

## Working with Helm CLI

The private Helm repository offered by Codefresh is a standard Helm repo and will work with the vanilla Helm executable even outside of the Codefresh UI. We generally suggest you use the private [Helm repo from Codefresh pipelines]({{site.baseurl}}/docs/yaml-examples/examples/helm/) but using it from your workstation is also possible.

### Add a Public repo to Helm

If your repo is set to public access mode, you can use it just like any other HTTP Helm repository, so you can do:

{% highlight bash %}
helm repo add mycfrepo https://h.cfcr.io/<accountname>/<reponame>
{% endhighlight %}

### Add a Private repo to helm

If your repo is set to private access mode (by default it is), then the Helm client needs to authenticate with Codefresh. In order to authenticate, you can use ChartMuseum's 'Helm Push' plugin. This is a Helm CLI plugin that adds support for authentication, and chart manipulation on top of the basic Helm CLI functionality.

We highly recommend that you familiarize yourself with the Helm Push plugin, at: [https://github.com/chartmuseum/helm-push](https://github.com/chartmuseum/helm-push).  

#### Install the Helm Push plugin

{% highlight bash %}
helm plugin install https://github.com/chartmuseum/helm-push
{% endhighlight %}

#### Configure the Helm Push plugin

If you have the Codefresh CLI installed and configured, there's nothing you need to do. The Helm Push plugin will pick up your settings automatically.  
To learn about getting started with Codefresh CLI, see [here](https://codefresh-io.github.io/cli/getting-started/).  
To learn about manual authentication without depending on the Codefresh CLI, see [here](https://github.com/chartmuseum/helm-push#token).

#### Add the private repo

{% highlight bash %}
helm repo add mycfrepo cm://h.cfcr.io/kostis-codefresh/default
{% endhighlight %}

Notice the protocol is `cm://` instead of `https://` this indicates the custom authentication scheme supported by ChartMuseum Helm Push plugin.

## Using in a Codefresh pipeline

The Codefresh Helm plugin automatically handles authentication for managed repositories. You can use the plugin as you usually would. For more information on the Codefresh Helm plugin, see [here]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/).

## Removing a Helm chart from a private Codefresh repository

You can delete a Helm chart from your own Helm repository with the following HTTP call.

{% highlight bash %}
curl -X DELETE -v -H "Authorization: Bearer <api-key>" https://h.cfcr.io/api/<codefresh-account-name>/<codefresh-helm-repo-name>/charts/<chart-name>/<chart-version>
{% endhighlight %}

Replace values in `<>` with your own (also removing `<>` in the process).

Generate an api key from [https://g.codefresh.io/user/settings](https://g.codefresh.io/user/settings) as explained in the [API page]({{site.baseurl}}/docs/integrations/codefresh-api/).