---
title: "GitOps Amazon ECR integration"
description: "Integrate Amazon ECR with GitOps for image enrichment"
group: gitops-integrations
sub_group: container-registries
toc: true
---

Codefresh offers native support for interacting with Amazon ECR (Elastic Container Registry), enabling you to push, pull, and deploy container images seamlessly.  
For general information on container registry integrations for GitOps, see [Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).


## GitOps Amazon ECR integration options

You can set up the integration with Amazon ECR in one of two modes:
* **IAM (Identity and Access Management) role (dynamic integration)**  
  [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html){:target="\_blank"} roles provide temporary security credentials for applications and services to access AWS resources securely, that expire after a period of time.  
* **Access key and secret (static integration)**  
  Access keys consist of an access key ID and a secret access key, used to authenticate and authorize API requests to AWS services for a specific user.
  Unlike IAM roles, access keys are long-term credentials, without a default expiration date.

>**NOTE**  
Access Key integration requires Runtime version 0.1.27 or higher. 


Both IAM and access key modes use AWS Identity and Access Management (IAM) to create the integration with Amazon ECR.  
For detailed information, see [How Amazon Elastic Container Registry Works with IAM](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html){:target="\_blank"} and the [AWS security blog](https://aws.amazon.com/blogs/security/how-to-use-trust-policies-with-iam-roles/){:target="\_blank"}.

## Prerequisites

### Permissions for IAM Role and Access Key integrations

The IAM Role/Access Key user must have one of the following permissions:
* `AmazonEC2ContainerRegistryReadOnly` for read-only access to Amazon EC2 Container Registry repositories.
* `AmazonEC2ContainerRegistryFullAccess` for administrative access to Amazon ECR resources.
* `AmazonEC2ContainerRegistryPowerUser` for full access to Amazon EC2 Container Registry repositories, without permissions to delete repositories or make changes to policies.

If any of these permissions are not granted, images cannot be successfully reported from ECR.


### IAM Role integration

##### IAM Role for ECR integration  
Amazon ECR integration in Codefresh requires an Identity and Access Management (IAM) Role with permissions to the ECR registry.
For details, see [Create the ECR integration IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html){:target="\_blank"}.

##### Other IAM roles  
Once you have an ECR integration IAM Role, you can use a different IAM role if that Role can assume the ECR integration IAM Role.  
To use an IAM Role assigned to the Service Account used by app-proxy for example, the Role must be explicitly configured with a trust relationship to assume the ECR integration IAM Role - even if the other IAM Role is the ECR integration IAM Role.

For example:  
```yaml
{
  "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::XXXXX:role/eksctl-awscluster-ServiceRole-XXXXXX"  # IAM role for ECR integration
            },
    "Action": "sts:AssumeRole",
    "Condition": {}
}
```

### Access Key integration
You must generate an access key ID and the access secret for the IAM user, and download or copy them to a secure location.


>**NOTE**  
  The steps that follow describe access key generation through the AWS Management Console. 
  We assume that you have created the IAM user for whom to generate the access key. See [Creating an IAM user in your AWS account](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html){:target="\_blank"}.


1. Sign in to the AWS **Management Console**, and go to the IAM dashboard.
1. In the left pane, click **Users**, and select the IAM user for whom to generate an access key.
1. Click the **Security credentials** tab.
1. Below Access keys, click **Create access key**.
1. From Access key best practices & alternatives, select **Command Line Interface (CLI)**. 
1. Select **I understand the above recommendation...** and then click **Next**.
1. Enter an optional description and then click **Create access key**.
1. Click **Download .csv file**, or copy the **Access key ID**, and the **Secret access key** which is automatically generated to a secure location.  
  You will need to define them in the integration settings.
1. Click **Done**.



## Amazon ECR-GitOps integration settings in Codefresh
The table describes the arguments required for GitOps integrations with Amazon ECR in Codefresh.  

{: .table .table-bordered .table-hover}
| Setting    | Description     | 
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br>The integration resource is created in the Git repository with the shared configuration, within <code class="highlighter-rouge">resources</code>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <code class="highlighter-rouge">resources/all-runtimes-all-clusters/</code></li><li>Selected runtimes: Created in <code class="highlighter-rouge">resources/runtimes/<runtime-name></code></li></ul> You can reference the Docker Hub integration in the CI tool. {:/}|
| **IAM Role settings**       | IAM Role integration is not supported for Hosted GitOps Runtimes.{::nomarkdown}<ul><li><b>IAM Role</b>: The name of the IAM role you defined for ECR integration with the specific permissions for authentication to the ECR registry.</li><li><b>Region</b>: The geographic region hosting the container registry. Define the region nearest to you.</li></ul>{:/}|
| **Access Key settings**       | Access Key integration is supported for both Hosted and Hybrid GitOps Runtimes.{::nomarkdown}<ul><li><b>Access Key ID</b>: The access key generated for the IAM user, and paired with the <b>Secret Access Key</b> for authentication to the ECR registry.</li><li><b>Secret Access Key</b>: The secret access key generated for and paired with the <b>Access Key</b> for authentication to the ECR registry.</li><li><b>Region</b>: The geographic region hosting the ECR registry. Define the region nearest to you.</li></ul>{:/}|
| **Test connection**       | Click to verify that you can connect to the specified instance before you commit changes. |
   

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/aws/ecr-role-access-key-int-settings.png" 
   url="/images/integrations/aws/ecr-role-access-key-int-settings.png" 
   alt="Amazon ECR for image enrichment" 
   caption="Amazon ECR integration for image enrichment"
   max-width="50%" 
   %}
   
For how-to instructions, see [Configure container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#configure-container-registry-integrations-for-gitops-in-codefresh) and [Edit/delete container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#editdelete-container-registry-integrations-for-gitops).  


## Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  