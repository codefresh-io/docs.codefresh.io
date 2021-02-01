---
title: "Helm Integration"
description: "Manage Helm releases and repositories with Codefresh"
group: integrations
toc: true
---

Codefresh is one of the few devops platforms that has native support for Helm releases and deployments. This includes

 * A [built-in Helm repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/) for all Codefresh accounts
 * The ability to add any external Helm repository in addition to the built-in one (this page)
 * A pipeline [step for deploying Helm applications]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
 * A dashboard for looking at your [Helm charts]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
 * A dashboard for looking at your [Helm releases]({{site.baseurl}}/docs/new-helm/helm-releases-management/)
 * A dashboard for [promoting Helm releases]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/) between different environments
 * A dashboard for [Helm environments]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)

Note that the built-in Helm repository is production ready. You can start using Helm right away with your Codefresh account
even if you don't have an external Helm repository. See our [quick start guide for Helm]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/) or the [full Helm example]({{site.baseurl}}/docs/yaml-examples/examples/helm/).

## General Helm configuration

To configure your external Helm repositories go to your Account Configuration, by clicking on *Account Settings* on the left sidebar. On the first section called *Integrations* click the *Configure* button next to *Helm*.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/codefresh-integrations.png" 
  url="/images/integrations/codefresh-integrations.png" 
  alt="Codefresh Account Integration" 
  caption="Codefresh Account Integration" 
  max-width="80%" %}

Add a new Helm repository configuration from the drop down.

{% include image.html 
  lightbox="true" 
  file="/images/integrations/helm/add-helm-repository.png" 
  url="/images/integrations/helm/add-helm-repository.png" 
  alt="Add Helm Repository" 
  caption="Add Helm Repository" 
  max-width="40%"
%}

Each configuration must be given a unique name, which you can later reference in a codefresh.yml file.


{% include image.html 
  lightbox="true" 
  file="/images/integrations/helm/helm-access.png" 
  url="/images/integrations/helm/helm-access.png" 
  alt="Define user access" 
  caption="Define user access" 
  max-width="80%"
%}

For each Helm integration you can toggle the level of access by [non-admin users]({{site.baseurl}}/docs/administration/access-control/#users-and-administrators). If it is off, users will **not** be able to use the [CLI](https://codefresh-io.github.io/cli/) or [API]({{site.baseurl}}/docs/integrations/codefresh-api/)
to access this [Helm repository programmatically](https://codefresh-io.github.io/cli/contexts/). If it is on, all users from all your Codefresh teams will be able to access this Helm repository
with CLI commands or API calls.

### Private Helm repository - HTTP 

You can connect to your repository using HTTP Basic authentication:

- Add your repo URL as usually with HTTP protocol.
- Supply the User and Password for HTTP Basic authentication.

Variables:

Name|Description
---|---
REPOSITORY NAME|Give a unique name to this integration
REPOSITORY URL|Location of the Helm repository
HELMREPO_USERNAME|The username to authenticate with
HELMREPO_PASSWORD|The password for the username provided

### Private Helm repository - S3 

- Add your S3 bucket URL in the following scheme: `s3://bucketname`.
- Supply the AWS authentication variables as you would for the AWS CLI, or the S3 plugin for Helm. See details here: [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

Variables:

Name|Description
---|---
REPOSITORY NAME|Give a unique name to this integration
REPOSITORY URL|Location of the Helm repository with format `s3://bucketname`
AWS_ACCESS_KEY_ID|ID of the key with permissions for the bucket
AWS_SECRET_ACCESS_KEY|Secret of the key with permissions for the bucket
AWS_DEFAULT_REGION|region where the bucket was created

### Private Helm repository - GCS 

- Add your GCS bucket URL in the following scheme: `gs://bucketname`.
- Supply the Google authentication variable as you would for the GCloud CLI, or the GCS plugin for Helm. See details here: [Creating Service Account](https://cloud.google.com/docs/authentication/getting-started).

Variables:

Name|Description
---|---
REPOSITORY NAME|Give a unique name to this integration
REPOSITORY URL|Location of the Helm repository with format `gs://bucketname`.
GOOGLE_APPLICATION_CREDENTIALS_JSON|The JSON content of the service account credentials

### Private Helm repository - Azure 

First make sure that you [create the Helm repository](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-helm-repos) in Azure.

Then click *Authenticate*. You will get a permissions dialog for allowing Codefresh to access
the Azure services. Click *Accept*.

>Make sure that you are using an organizational/company Azure account and not a personal one. We are currently working with Microsoft to improve this integration.

{% include image.html 
lightbox="true" 
file="/images/integrations/helm/select-azure-helm-repository.png" 
url="/images/integrations/helm/select-azure-helm-repository.png" 
alt="Selecting an Azure Helm repository"
caption="Selecting an Azure Helm repository" 
max-width="70%" 
%}

Select your Azure subscription on the left drop-down menu and your Helm repository on the right drop-down menu.

>If you are already authenticated to Azure, and cannot find your Helm repository in the list, try revoking access and authenticating again.

The Azure Helm integration is now ready.

### Private Helm repository - Azure with service principal

An alternative method of adding an Azure Helm repository is by using a service principal. First follow the [instructions for creating a service principal in the Azure portal](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal).

Then from the drop-down menu select *Azure Registry SP*. Click the *Authenticate button* and enter the following details:

* `Client ID`
* `Tenant`
* `Client secret`

{% include image.html
lightbox="true"
file="/images/integrations/helm/add-azure-helm-spn.png"
url="/images/integrations/helm/add-azure-helm-spn.png"
alt="Azure Service principal details"
caption="Azure Service principal details"
max-width="60%"
  %}

Click the *Save* button once finished. Assuming that the authentication is successful you will see your available Azure registries that can be used as a Helm repository.

### Private Helm repository from another Codefresh account

You also add the private Helm repository of another Codefresh user as your integration:


Name|Description
---|---
REPOSITORY NAME|Give a unique name to this integration
REPOSITORY URL|Location of the Helm repository with format `cm://repository-name`.
CF API KEY|A token in [order to access the other Codefresh account]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions).

Note that we **don't** recommend using this practice (sharing the Codefresh Helm repository between accounts). The built-in Helm repository of each account is best used as a private Helm repository of that account. See
more details on [how to make your private Helm public]({{site.baseurl}}/docs/new-helm/managed-helm-repository/#repo-access-level).



## What to Read Next

* [Your private Helm repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
* [How to use Helm in a Codefresh pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
* [Managing Helm releases]({{site.baseurl}}/docs/new-helm/helm-releases-management/)
* [Helm best practices]({{site.baseurl}}/docs/new-helm/helm-best-practices/)
