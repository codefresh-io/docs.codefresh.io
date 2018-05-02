---
title: "Managed Helm Repository"
description: ""
group: new-helm
toc: true
---

Codefresh provides fully managed, hosted Helm repositories for users.
A default managed repo is created automatically for every account.
The managed repo is private by default, allowing access only via Codefresh or using a Codefresh API token.

> You may be familiar with the popular open source Helm repository implementation called 'ChartMuseum' that Codefresh sponsors. Codefresh managed repositories are based on, and therefore compatible with ChartMuseum and it's unique features. For more info on ChartMuseum: [https://github.com/kubernetes-helm/chartmuseum](https://github.com/kubernetes-helm/chartmuseum). 


## Helm repository integration

Your managed Helm repo will appear under the Helm repositories integration section just like any other Helm repository you might have added. You can manage Helm repo connections under *Account settings -> Integrations -> Helm repositories*.  

Note that you cannot delete the out-of-the-box managed repo that is created for you.

## Chart Repository URL

You can find your managed repository URL in the Helm integration section. The URL will take the form of

`h.cfcr.io/<accountname>/<reponame>`

where the default repo name is called `default`.  

This URL serve the `index.yaml` that Helm cli expects, and also supports the ChartMuseum extended API, so you can push and delete charts as well.


## Using your Repo

### Prerequisites
- Codefresh CLI. Install with `npm install -g codefresh`. See [here](https://codefresh-io.github.io/cli) for more info
- Helm CLI. Please see [install instructions](https://docs.helm.sh/using_helm/#installing-helm)

### Setup 
Codefresh managed Helm repositories provide several features in addition to acting as a native Helm repository.

These additional features require using the ChartMuseum [helm-push](https://github.com/chartmuseum/helm-push) plugin. You can install it with:

```
helm plugin install https://github.com/chartmuseum/helm-push
```

This gives use the ability to push charts directly from Helm CLI, as well as the ability to use token-based authentication.

To authenticate to Codefresh via CLI, you can run

```
codefresh auth create-context --api-key=<token>
```

where `<token>` is a valid API Key obtained from the UI. For more instructions on how to obtain an API key, please see [here](https://codefresh-io.github.io/cli/getting-started/#authenticate).

Alternatively, you can set the `HELM_REPO_ACCESS_TOKEN` environment variable used by helm-push, which will take precedence over the authentication info set via CLI above:

```
export HELM_REPO_ACCESS_TOKEN=<token>
```


### Adding your repo as a local Helm repository
Run the following command to add your repo as a local Helm repository:

```
helm repo add codefresh cm://h.cfcr.io/<accountname>/<reponame>
```

From here you can download charts using commands such as `helm install` etc.

Notice the `cm://` protocol, which is used by the helm-push plugin to enable token-based authencation.

### Pushing a chart to your repo
Start with a directory containing a valid `Chart.yaml` file, such as `mychart/`.

To upload your chart to your managed repo, run the following command:

```
helm push mychart/ codefresh
```

If you wish to override the version defined in `Chart.yaml`, you can supply the `--version` flag:

```
helm push mychart/ --version="1.1.0" codefresh
```

In order to discover and download your newly added chart, update you local repositories:

```
helm repo update
helm search codefresh/
```

### Deleting a chart from your repo
In the occasion that you must delete a chart version from your repo, you can use the ChartMuseum REST API:

```
curl -X DELETE -v -H "Authorization: Bearer <token>" \
    https://h.cfcr.io/api/<accountname>/<reponame>/charts/mychart/1.1.0
```

## Repo access level

The managed Helm repository supports two modes of access level: Private and Public.

By default it is created as private which means read/write access is protected by Codefresh authentication.

You can switch the access level to Public which will make the repository accessibe to anonymous users only *for read operations*. Write operations always require authentication even when in Public mode.

### Setting access level

Use the Codefresh CLI to toggle access level on a managed repo:

```
codefresh patch helm-repo <reponame> --public=true   # Make Public
codefresh patch helm-repo <reponame> --public=false  # Make Private
```

For more info see the relevant section in the Codefresh CLI documentation: [https://codefresh-io.github.io/cli/helm-repos/update-helm-repo/](https://codefresh-io.github.io/cli/helm-repos/update-helm-repo/).

### Note on Public

If your repo is configured to be publicly accessible, you are not required to authenticate against Codefresh or install the helm-push plugin as described above (for read operations).

You do not need to use the special `cm://` protocol for adding your repo. You can add it using `https://`:

```
helm repo add codefresh https://h.cfcr.io/<accountname>/<reponame>
```

This URL can then be shared with others you wish to have access to your Helm charts.

## Use Codefresh CLI for advanced management

The Codefresh CLI can be used for advanced management of your managed repository. For more information on CLI support for Helm repos, see the 'Helm Repos' section in the CLI documentation: [https://codefresh-io.github.io/cli/helm-repos/](https://codefresh-io.github.io/cli/helm-repos/).

## Codefresh Helm dashboards

The Codefresh Helm Charts and Helm Releases dashboards are automatically configured to wotk with your default manged repo so you can easily install charts and manage releases. For more information see: [Install chart from Helm repository](https://codefresh.io/docs/docs/new-helm/add-helm-repository/#install-chart-from-your-helm-repository) and [Helm release management](https://codefresh.io/docs/docs/new-helm/helm-releases-management/) articles.


## Using in a Codefresh pipeline

The Codefresh Helm plugin automatically handles authentication for managed repositories. You can use the plugin as you usually would. For more information on the Codefresh Helm plugin, see [here](https://codefresh.io/docs/docs/new-helm/install-helm-chart-using-codefresh-pipeline/).