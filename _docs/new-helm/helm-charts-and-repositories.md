---
title: "Helm Charts and repositories"
description: ""
group: new-helm
permalink: /:collection/new-helm/add-helm-repository/
redirect_from:
  - /docs/new-helm/
  - /docs/add-helm-repository/
toc: true
---
The "Helm Charts" page allows you to integrate with Helm repositories and Helm charts.

## Adding a Helm repository
By default, we show you charts from the [official Helm repository](https://github.com/kubernetes/charts){:target="_blank"} but you can easily add your own:

In the "Helm Charts" page, click on the "Add Repository" button on the top right.

In the dialog that opened, name your repository, and specify it's URL. The URL should not include the specific path to `index.yaml`
If your repository is publicly authenticated, click 'Save' and you are done. To add a private repository keep reading.

In addition to public repositories, we also support connecting to Helm repositories hosted on privated authenticated stores.

You connect to a private repository from the same dialog you would connect to a public one, by selecting any of the authentication options, like S3, or CGS.

The bucket URL should be provided with a protocol scheme relevant to the selected provider, for example for S3, the url would look like `s3://mybucketname`.

The rest of the required parameters varies based on the selected provider (see below)

Once connected, the private Helm repository context can be injected into pipelines by selecting "Import from shared configuration" (under "Environment Variables" section), and selecting the name of the repository.  
The repository settings will be injected as environment variables into the pipeline so you can use them as you wish. In addition, the Codefresh Helm step can use these settings to install charts. More info on the Codefresh Helm step can be found here: [https://github.com/codefresh-contrib/cfstep-helm](https://github.com/codefresh-contrib/cfstep-helm)

### Private repository - S3

- Add your S3 bucket URL in the follwing scheme: `s3://bucketname`.
- Supply the AWS authentication variables as you would for the AWS CLI, or the S3 plugin for Helm. See details here: [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)

Variables:

Name|Description
---|---
AWS_ACCESS_KEY_ID|ID of the key with permissions for the bucket
AWS_SECRET_ACCESS_KEY|Secret of the key with permissions for the bucket
AWS_DEFAULT_REGION|region where the bucket was created

### Private repository - GCS

- Add your GCS bucket URL in the follwing scheme: `gs://bucketname`.
- Supply the Google authentication variable as you would for the GCloud CLI, or the GCS plugin for Helm. See details here: [Creating Service Account](https://cloud.google.com/docs/authentication/getting-started)

Variables:

Name|Description
---|---
GOOGLE_APPLICATION_CREDENTIALS_JSON|The JSON content of the service account credentials

## Install chart from your Helm repository

In the "Helm Charts" page, locate the chart you would like to install, and click on the Install button

In the dialog that opened:
- Name your release and choose a version of the chart to install.
- Cluster information:
  - Select a Kubernetes cluster and namespace to install to. This should be pre-configured in the Kubernetes Integration, see [here]({{ site.baseurl }}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) 
  - optionally, select the namespace where Tiller is at
- Values:
  - The default values that was provided with the chart will show up, you can press the edit button to view and override them.
  - when the default values yaml was changed, it will be provided to helm install as a values file. You can revert back your overriding changed by clicking on the revert button (next to the edit button).
  - You can provide additional values files by opening the 'Import from configuration' drop down list, and selecting "Add new context of type: YAML". Insert your values YAML here, and save. The YAML will be saved for future usage so that next time simply select it from the drop down list.
  - additionally, you can override some values by adding them in the "Override set variables section"

> The order of values configurations matter for helm, values provided last overrides values provided earlier. In the Chart Install wizard values are provided in the following order:
1. Default Values in the chart (implicitly part of the chart)
2. Overidden default values (provided as values file, provided only if edited by the user)
3. Supplied values files from Yaml Shared Configuration
4. Override variables are provided as `--set` arguments

Finally click on Install. You can observe the newly installed release on the "Helm Releases" page
