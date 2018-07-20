---
title: "Managed Helm Repository"
description: ""
group: new-helm
toc: true
---

Codefresh provides fully managed, hosted Helm repositories for users.
A default managed repo is created automatically for every account.
The managed repo is private by default, allowing access only via Codefresh or using a Codefresh API token.

> You may be familiar with the popular open source Helm repository implementation called 'ChartMuseum' that Codefresh sponsors.   Codefresh managed repositories are based on, and therefore compatible with ChartMuseum and it's unique features. For more info on ChartMuseum: [https://github.com/kubernetes-helm/chartmuseum](https://github.com/kubernetes-helm/chartmuseum). 

## Helm repository integration

Your managed helm repo will appear under the Helm repositories integration section just like any other Helm repository you might have added. You can manage Helm repo connections under *Account settings -> Integrations -> Helm repositories*.  

Note that you cannot delete the out-of-the-box managed repo that is created for you.

## Chart Repository URL

You can find your managed repository URL in the Helm integration section. The URL will take the form of: `cm://h.cfcr.io/<accountname>/<reponame>`, where the default repo is called `default`.  

## Codefresh Helm dashboards

The Codefresh Helm Charts and Helm Releases dashboards are automatically configured to work with your default managed repo so you can easily install charts and manage releases. For more information see: [Install chart from Helm repository]({{ site.baseurl }}/docs/new-helm/add-helm-repository/#install-chart-from-your-helm-repository) and [Helm release management]({{ site.baseurl }}/docs/new-helm/helm-releases-management/) articles.

## Use Codefresh CLI for advanced management

The Codefresh CLI can be used for advanced management of your managed repository. For more information on CLI support for Helm repos, see the 'Helm Repos' section in the CLI documentation: [https://codefresh-io.github.io/cli/helm-repos/](https://codefresh-io.github.io/cli/helm-repos/).

## Repo access level

The managed Helm repository supports two modes of access level: Private and Public.  
By default it is created as private which means read/write access is protected by Codefresh authentication.  
You can switch the access level to Public which will make the repository accessible to anonymous users only *for read operations*. write operations always require authentication even when in public access mode.

### Setting access level

Use the Codefresh CLI to toggle access level on a managed repo:

```bash
codefresh patch helm-repo mycfrepo -public
```

For more info see the relevant section in the Codefresh CLI documentation: [https://codefresh-io.github.io/cli/helm-repos/update-helm-repo/](https://codefresh-io.github.io/cli/helm-repos/update-helm-repo/).

## Working with Helm CLI

### Add a Public repo to Helm

If your repo is set to public access mode, you can use it just like any other HTTP Helm repository, so you can do:

```bash
helm repo add mycfrepo https://h.cfcr.io/<accountname>/<reponame>
```

### Add a Private repo to helm

If your repo is set to private access mode (by default it is), then the Helm client needs to authenticate with Codefresh. In order to authenticate, you can use ChartMuseum's 'Helm Push' plugin. This is a Helm CLI plugin that adds support for authentication, and chart manipulation on top of the basic Helm CLI functionality.

We highly recommend that you familiarize yourself with the Helm Push plugin, at: [https://github.com/chartmuseum/helm-push](https://github.com/chartmuseum/helm-push).  

#### Install the Helm Push plugin

```bash
helm plugin install https://github.com/chartmuseum/helm-push
```

#### Configure the Helm Push plugin

If you have the Codefresh CLI installed and configured, there's nothing you need to do. The Helm Push plugin will pick up your settings automatically.  
To learn about getting started with Codefresh CLI, see [here](https://codefresh-io.github.io/cli/getting-started/).  
To learn about manual authentication without depending on the Codefresh CLI, see [here](https://github.com/chartmuseum/helm-push#token).

#### Add the private repo

```bash
helm repo add chartmuseum cm://my.chart.repo.com
```

Notice the protocol is `cm://` instead of `https://` this indicates the custom authentication scheme supported by ChartMuseum Helm Push plugin.

## Using in a Codefresh pipeline

The Codefresh Helm plugin automatically handles authentication for managed repositories. You can use the plugin as you usually would. For more information on the Codefresh Helm plugin, see [here]({{ site.baseurl }}/docs/new-helm/using-helm-in-codefresh-pipeline/).