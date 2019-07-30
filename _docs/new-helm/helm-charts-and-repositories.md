---
title: "Helm Charts and repositories"
description: "How to use external Helm repositories in Codefresh pipelines"
group: new-helm
permalink: /:collection/new-helm/add-helm-repository/
redirect_from:
  - /docs/new-helm/
  - /docs/add-helm-repository/
toc: true
---
The "Helm Charts" page allows you to integrate with external Helm repositories and Helm charts. Note that all Codefresh accounts already include a [built-in Helm repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/). Using external Helm repositories is optional.

## Adding an external Helm repository
By default, we show you charts from the [official Helm repository](https://github.com/kubernetes/charts){:target="_blank"} but you can easily add your own:

In the "Helm Charts" page, click on the "Add Repository" button on the top right.

In the dialog that opened, name your repository, and specify it's URL. The URL should not include the specific path to `index.yaml`

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/add-helm-repository.png" 
url="/images/kubernetes-helm/add-helm-repository.png" 
alt="Adding a Helm repository"
caption="Adding a Helm repository" 
max-width="50%" 
%}

If your repository doesn't require authentication, click 'Save' and you are done. To add an authenticated repository keep reading.

In addition to public repositories, we also support connecting to Helm repositories hosted on private authenticated stores.

You connect to a private repository from the same dialog you would connect to a public one, by selecting any of the authentication options, like S3, or CGS.

The bucket URL should be provided with a protocol scheme relevant to the selected provider, for example for S3, the URL would look like `s3://mybucketname`.

The rest of the required parameters varies based on the selected provider (see below)


### Private repository - HTTP

You can connect to your repository using HTTP Basic authentication.

- Add your repo URL as usually with HTTP protocol
- Supply the User and Password for HTTP Basic authentication.

Variables:

Name|Description
---|---
HELMREPO_USERNAME|The username to authenticate with
HELMREPO_PASSWORD|The password for the username provided

### Private repository - S3

- Add your S3 bucket URL in the following scheme: `s3://bucketname`.
- Supply the AWS authentication variables as you would for the AWS CLI, or the S3 plugin for Helm. See details here: [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

Variables:

Name|Description
---|---
AWS_ACCESS_KEY_ID|ID of the key with permissions for the bucket
AWS_SECRET_ACCESS_KEY|Secret of the key with permissions for the bucket
AWS_DEFAULT_REGION|region where the bucket was created

### Private repository - GCS

- Add your GCS bucket URL in the following scheme: `gs://bucketname`.
- Supply the Google authentication variable as you would for the GCloud CLI, or the GCS plugin for Helm. See details here: [Creating Service Account](https://cloud.google.com/docs/authentication/getting-started)

Variables:

Name|Description
---|---
GOOGLE_APPLICATION_CREDENTIALS_JSON|The JSON content of the service account credentials


### Private repository - Azure

First make sure that you [create the Helm repository](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-helm-repos) in Azure

Then click *Authenticate*. You will get a permissions dialog for allowing Codefresh to access
the Azure services. Click *Accept*.

>Make sure that you are using an organizational/company Azure account and not a personal one. We are currently working with Microsoft to improve this integration.

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/azure-helm-integration.png" 
url="/images/kubernetes-helm/azure-helm-integration.png" 
alt="Selecting an Azure Helm repository"
caption="Selecting an Azure Helm repository" 
max-width="70%" 
%}

Select your Azure subscription on the left drop-down menu and your Helm repository on the right drop-down menu.

>If you are already authenticated to Azure, and cannot find your Helm repository in the list, try revoking access and authenticating again.

The Azure Helm integration is now ready.


## Using a Helm Repository in a Codefresh pipeline

Once connected, the private Helm repository context can be injected into pipelines by selecting "Import from shared configuration" (under "Environment Variables" section) and selecting the name of the repository.  
The repository settings will be injected as environment variables into the pipeline so you can use them as you wish. 

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/connect-helm-repo.png" 
url="/images/kubernetes-helm/connect-helm-repo.png" 
alt="Connecting a Helm repository in the pipeline"
caption="Connecting a Helm repository in the pipeline" 
max-width="70%" 
%}

If you are using the Helm step, it will use these settings to connect to your authenticated repository automatically. More info on the Codefresh Helm step can be found in the [Helm Usage Guide]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/).

## Install chart from your Helm repository

In the "Helm Charts" page, locate the chart you would like to install, and click on the Install button

In the dialog that opened:
- Name your release and choose a version of the chart to install.
- Cluster information:
  - Select a Kubernetes cluster and namespace to install to. This should be pre-configured in the Kubernetes Integration, see [here]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) 
  - optionally, select the namespace where Tiller is at
- Values:
  - The default values that was provided with the chart will show up, you can press the edit button to view and override them.
  - when the default values yaml was changed, it will be provided to helm install as a values file. You can revert back your overriding changed by clicking on the revert button (next to the edit button).
  - You can provide additional values files by opening the 'Import from configuration' drop down list and selecting "Add new context of type: YAML". Insert your values YAML here and save. The YAML will be saved for future usage so that next time simply select it from the drop-down list.
  - additionally, you can override some values by adding them in the "Override set variables section"

> The order of values configurations matter for helm, values provided last overrides values provided earlier. In the Chart Install wizard values are provided in the following order:
1. Default Values in the chart (implicitly part of the chart)
2. Overridden default values (provided as values file, provided only if edited by the user)
3. Supplied values files from Yaml Shared Configuration
4. Override variables are provided as `--set` arguments

Finally click on Install. You can observe the newly installed release on the "Helm Releases" page.

You can also install Helm releases from [any Helm environment board]({{site.baseurl}}/docs/new-helm/helm-environment-promotion).


## What to read next

* [Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
* [Helm Dashboard]({{site.baseurl}}/docs/new-helm/helm-releases-management)
* [Helm Promotion boards]({{site.baseurl}}/docs/new-helm/helm-environment-promotion)


