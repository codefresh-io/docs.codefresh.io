---
title: "GitOps Amazon ECR integration"
description: ""
group: gitops-integrations
sub_group: container-registries
toc: true
---

Codefresh has native support to interact with Amazon ECR (Elastic Container Registry), and push, pull, and deploy images.  
For information on adding an Amazon ECR integration for GitOps in Codefresh, see [Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).


## GitOps Amazon ECR integration options

You can set up the integration with Amazon ECR in one of two modes:
* IAM (Identity and Access Management) role (dynamic integration)  
  [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html){:target="\_blank"} roles provide temporary security credentials for applications and services to access AWS resources securely, that expire after a period of time.  
* Access key and secret (static integration)  
  Access keys consist of an access key ID and a secret access key, which are used to authenticate and authorize API requests to AWS services for a specific user.
  Unlike IAM roles, access keys are long-term credentials, and don't have a default expiration date.

>Amazon ECR integration with IAM Role is supported only for Hybrid GitOps. Access Key integration is supported for both Hosted and Hybrid GitOps.


Both modes use AWS Identity and Access Management (IAM) to create the integration with Amazon ECR.  
For detailed information, see [How Amazon Elastic Container Registry Works with IAM](https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html){:target="\_blank"} and the [AWS security blog](https://aws.amazon.com/blogs/security/how-to-use-trust-policies-with-iam-roles/){:target="\_blank"}.

## Prerequisites


### IAM Role integration
Before you configure settings in Codefresh to integrate Amazon ECR:  
* [Create an IAM (Identity and Access Management) role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html){:target="\_blank"}  

Define the role in trusted relationships with `Effect: Allow` and  `Action: sts:AssumeRole` on the EKS cluster.  
For example:  
```yaml
{
  "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::XXXXX:role/eksctl-awscluster-ServiceRole-XXXXXX"
            },
        "Action": "sts:AssumeRole",
        "Condition": {}
}
```


### Access Key integration
You must generate an access key ID and the access secret for the IAM user, and download or copy them to a secure location.


>The steps that follow describe access key generation through the AWS Management Console. 
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
| **IAM Role settings**       | IAM Role integration is not supported for Hosted GitOps Runtimes.{::nomarkdown}<ul><li><b>IAM Role</b>: The name of the IAM role you defined with the specific permissions for authentication to the ECR registry.</li><li><b>Region</b>: The geographic region hosting the container registry. Define the region nearest to you.</li></ul>{:/}|
| **Access Key settings**       | Access Key integration is supported for both Hosted and Hybrid GitOps Runtimes.{::nomarkdown}<ul><li><b>Access Key ID</b>: The access key generated for the IAM user, and paired with the <b>Secret Access Key</b> for authentication to the ECR registry.</li><li><b>Secret Access Key</b>: The secret access key generated for and paired with the <b>Access Key</b> for authentication to the ECR registry.</li><li><b>Region</b>: The geographic region hosting the ECR registry. Define the region nearest to you.</li></ul>{:/}|
| **Test connection**       | Click to verify that you can connect to the specified instance before you commit changes. |
   

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/aws/aws-int-settings.png" 
   url="/images/integrations/aws/aws-int-settings.png" 
   alt="Amazon ECR for image enrichment" 
   caption="Amazon ECR for image enrichment"
   max-width="50%" 
   %}
   
For how-to instructions, see [Configure container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#configure-container-registry-integrations-for-gitops-in-codefresh) and [Edit/delete container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#editdelete-container-registry-integrations).  


## Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  