---
title: "Amazon ECR Container Registry"
description: "Use the Amazon Docker Registry for pipeline integrations"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/aws/
  - /docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/
toc: true
---

Configure [Amazon ECR registries](https://docs.aws.amazon.com/ecr/){:target=\_blank"} for pipeline integrations.

ECR integrations can be set up for IAM (Identity and Access Management) users and for service accounts. Each type of integration has different prerequisities and requirements.

## IAM ECR integration for pipelines

Amazon ECR integration with IAM roles for push/pull operations are supported with two types of permissions: identity-based and resource-based.


* **Identity-based policies**  
  User account must apply `AmazonEC2ContainerRegistryPowerUser` policy, or a custom policy based on that policy.   
  For more information and examples, see [Amazon ECR identity-based policies](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies){:target="_blank"}.

* **Resource-based policy**  
  Users with resource-based policies must be allowed to call `ecr:GetAuthorizationToken` before they can authenticate to a registry.  
  To push or pull any images from any Amazon ECR repository, you must provide push/pull permissions to the specific registry.  
  For more information and examples, click [Amazon ECR resource-based policies](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-resource-based-policies){:target="_blank"}.


## Service account for authentication
Setting up ECR integration using service account credentials instead of access keys applies to accounts with the Codefresh Runner installed.

##### Kubernetes service account setup

To use an IAM role, you must set up a Kubernetes service account, as described in the [AWS Documentation](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html){:target="\_blank"}.  
You can define the service account at four different levels, based on the required priority.  
The levels are listed below in ascending order of priority:

* **Runtime**  
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

* **Account**  
  The account-level service account has higher priority than the runtime-level service account.   
  To define the service account at the account level, turn on the setting as part of the integration.

* **Pipeline**  (need to verify with Vadim)
  The pipeline-level service account has higher priority than the account-level service account.  
  Define the service account as part of the pipeline's runtime settings (Pipeline > Settings > Runtime).

* **Trigger**  ((need to verify with Vadim))
  The Trigger-level service account has the highest priority. Define the service account as part of the trigger settings for the specific pipeline (Workflow > Triggers (modify or add) > Advanced Options).


## Set up ECR integration for IAM user/service account
Set up ECR integration using access key or service account credentials to authenticate to the registry. This is an integration to a private ECR registry. 
If needed, define a [fallback registry]({{site.baseurl}}/docs/integrations/docker-registries/#define-fallback-registry), and a [global prefix]({{site.baseurl}}/docs/integrations/docker-registries/#using-an-optional-repository-prefix) for all Docker images, instead of defining it per pipeline. 

##### Before you begin
* Make sure you have an active registry set up in AWS


##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}.
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Amazon ECR**.
1. Define the following:
    * **Registry name**: A unique name for this integration.
    * **Region**: AWS region.
    * **Access Key ID** and **Secret Access Key**:  
      Disabled when service account credentials are used.  
      The public identifier (Access Key ID), and the private, secret component (Secret Access Key), for access to the registry. The Access Key ID is paired with the Secret Access Key to ensure the authenticity of the access request to the registry. 
    * **Resolve credentials from service account**:
      Disabled when access keys are used.
      Authenticate to the registry using the service account [configured for the pipeline]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#advanced-options-for-pipelines) in account-level settings.
    

      {% include image.html
        lightbox="true"
        file="/images/integrations/docker-registries/add-amazon-ecr-registry.png"
        url="/images/integrations/docker-registries/add-amazon-ecr-registry.png"
        alt="Amazon ECR Container Registry settings"
        caption="Amazon ECR Container Registry settings"
        max-width="60%" %}

{:start="5"}
1. If required, define the Advanced Options:
    * **Repository prefix**: The prefix, such as the name of the organization or repository, to use globally for your Docker images.
    * **Fallback registry**: The alternate registry to use if the pull operation from the default registry fails.
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.

Codefresh makes sure to automatically refresh the AWS token for you.
For more information on how to obtain the needed tokens, read the [AWS documentation](http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys){:target="_blank"}.



## Public ECR registry integration

Add a Public ECR integration through the **Other Registries** option for Docker registry providers.

### Step 1: Get username & password from AWS
Before creating a public ECR integration in Codefresh, get the AWS username and password from the AWS console.

1. Navigate to **Amazon ECR/Repositories/Public/$REPO**.
1. Click **View push commands** at the upper right.
1. In the next window note the first command that will print out the password.

      {% include image.html
        lightbox="true"
        file="/images/integrations/docker-registries/public-ecr-repo.png"
        url="/images/integrations/docker-registries/public-ecr-repo.png"
        alt="Public Amazon EC2 Container Registry Command"
        caption=""
        max-width="60%" %}

    OR
    Run the following command from the AWS Console:

      ```shell
      aws ecr-public get-login-password --region us-east-1
      ```
1. Note down the password.



### Step 2: Set up public ECR integration in Codefresh
1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}.
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Other Registries**.
1. Define the following:
    * **Registry name**: A unique name for this integration.
    * **Username**: Enter `AWS`.
    * **Password**: Enter the password you noted down in _step 1_.
    * **Domain**: The registry address, for example, `mydomain.com`.
1. If required, define the Advanced Options:
    * **Repository prefix**: The prefix, such as the name of the organization or repository, to use globally for your Docker images.
    * **Fallback registry**: The alternate registry to use if the pull operation from the default registry fails.
1. If the registry is behind a firewall, toggle **Installed behind a firewall** to ON. (to verify with Vadim) 
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.


## Pushing Docker images to Amazon ECR

There are two ways to push images:

1. (Recommended) Automatically through the YAML [push step]({{site.baseurl}}/docs/pipelines/steps/push/).  
  For more details on how to push a Docker image in a pipeline see the [build and push example]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/).
1. Manually promoting the image (described below)



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

1. Click **Promote**.

>**NOTE**  
You can change the image name if you want, but make sure that the new name exists as a repository in ECR.

## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries/)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)  
[Integrating with other Docker registries]({{site.baseurl}}/docs/integrations/docker-registries/other-registries/)  
[Push step]({{site.baseurl}}/docs/pipelines/steps/push/)  
[Building and pushing an image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  
