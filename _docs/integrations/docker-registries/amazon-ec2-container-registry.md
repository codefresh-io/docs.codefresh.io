---
title: "Amazon EC2 Container Registry"
description: "Use the Amazon Docker Registry for pipeline integrations"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/aws/
  - /docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/
toc: true
---

## Set up ECR integration for IAM user

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Amazon ECR**.
1. Define the following:  
  * **Registry name**: A unique name for this configuration.
  * **Region**: AWS region. 
  * **Access Key ID**: Your AWS accessKeyId.
  * **Secret Access Key**: Your AWS accessKeyId.

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/add-amazon-ecr-registry.png" 
	url="/images/integrations/docker-registries/add-amazon-ecr-registry.png" 
	alt="Amazon EC2 Container Registry settings" 
  caption="Amazon EC2 Container Registry settings" 
	max-width="60%" %}

{:start="5"}
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.

Codefresh makes sure to automatically refresh the AWS token for you.

For more information on how to obtain the needed tokens, read the [AWS documentation](http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys){:target="_blank"}.

> Note:
  You must have an active registry set up in AWS.<br /><br />
  Amazon ECR push/pull operations are supported with two permission options: user-based and resource-based.


  * User-based permissions: User account must apply `AmazonEC2ContainerRegistryPowerUser` policy (or custom based on that policy).  
    For more information and examples, click [here](http://docs.aws.amazon.com/AmazonECR/latest/userguide/ecr_managed_policies.html){:target="_blank"}.
  * Resource-based permissions: Users with resource-based permissions must be allowed to call `ecr:GetAuthorizationToken` before they can authenticate to a registry, and push or pull any images from any Amazon ECR repository, than you need provide push/pull permissions to specific registry.  
  For more information and examples, click [here](http://docs.aws.amazon.com/AmazonECR/latest/userguide/RepositoryPolicies.html){:target="_blank"}.


## Set up ECR integration for service account

Setting up ECR integration for a service account applies to accounts with the Codefresh Runner installation. 

### Kubernetes service account setup
To use an IAM role, you must set up a Kubernetes service account, as described in the [AWS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html){:target="\_blank"}.  
You can define the service account at four different levels, based on the required priority. The levels are listed below in ascending order of priority:

* Runtime  
  The runtime level has the lowest priority.  Define it in the Runtime Specification under `runtimeScheduler > Cluster` (same level as `namespace`), and specify the service account. The key is `serviceAccount`. Use the default, and make sure you have the correct annotation added to the service account. Another option is to create a new service account with the proper permissions and annotations.

```yaml
runtimeScheduler:
  cluster:
    namespace: codefresh
    clusterProvider:
      accountId: 5c1658d1736122ee1114c842
      selector: docker-desktop
    serviceAccount: codefresh-engine

```

* Account  
  The Account-level service account has higher priority than the runtime-level service account.  To define the service account at the account level, turn on the setting as part of the integration as described below.

* Pipeline  
  The Pipeline-level service account has higher priority than the account-level service account. Define the service account as part of the pipeline's runtime settings (Pipeline > Settings > Runtime).

* Trigger  
  The Trigger-level service account has the highest priority. Define the service account as part of the trigger settings for the specific pipeline (Workflow > Triggers (modify or add) > Advanced Options).


### How to

**Before you begin**  
* Define a Kubernetes  service account for the runtime, account, pipeline, or pipeline-trigger

**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Amazon ECR**.
1. Do the following:  
  * **Registry name**: Enter a unique name for this configuration.
  * **Region**: Select the AWS region. 
  * Select **Resolve credentials from servce account**.

  The Access Key ID and Secret Access Key fields are disabled.

{% include image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/add-amazon-ecr-registry.png" 
	url="/images/integrations/docker-registries/add-amazon-ecr-registry.png" 
	alt="Amazon EC2 Container Registry settings" 
  caption="Amazon EC2 Container Registry settings" 
	max-width="60%" %}

{:start="5"}
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.



## Pushing Docker images to Amazon ECR

There are two ways to push images:

1. (Recommended) Using the YAML [push step]({{site.baseurl}}/docs/pipelines/steps/push/).  
1. Manually promoting manually an image  (described below)

For more details on how to push a Docker image in a pipeline see the [build and push example]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/).



### Manually promoting an image

<!-- may need to rewrite this -->

The **Images** view has an option to manually push images to a registry.
You need to specify the repository name as the name of your repository as set in ECR, as in the example below.

{% include image.html 
lightbox="true" 
file="/images/integrations/docker-registries/ecr/ecr-manual-promote-repo-name.png" 
url="/images/integrations/docker-registries/ecr/ecr-manual-promote-repo-name.png"
alt="Repository name in ECR"
caption ="Repository name in ECR"
max-width="40%"
%}

1. In the Codefresh UI, from Artifacts in the sidebar, select [**Images**](https://g.codefresh.io/2.0/images){:target="\_blank"}. 
1. Click **Promote**.

 {% include image.html 
lightbox="true" 
file="/images/integrations/docker-registries/ecr/ecr-manual-promote-button.png" 
url="/images/integrations/docker-registries/ecr/ecr-manual-promote-button.png"
alt="Promote image icon"
caption="Promote image icon"
max-width="40%"
%}

{:start="3"}
1. Do the following:
  * Enter the **Repository Name**.
  * Enter the **Tag**. Copy and paste the text after the  `:` in the Repository Name. For example, `repository-name:tag`.
  * From the **Registry** dropdown, select your ECR configuration.

{% include image.html 
lightbox="true" 
file="/images/integrations/docker-registries/ecr/ecr-manual-promote-settings.png" 
url="/images/integrations/docker-registries/ecr/ecr-manual-promote-settings.png"
alt="Image promotion settings"
caption="Image promotion settings"
max-width="40%"
%}   

{:start="4"}
3. Click **Promote**.


>It is possible to change the image name if you want, but make sure that the new name exists as a repository in ECR.


## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)  
[Push step]({{site.baseurl}}/docs/pipelines/steps/push/)  
[Building and pushing an image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  

