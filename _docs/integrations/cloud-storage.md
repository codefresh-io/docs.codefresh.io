---
title: "Cloud Storage pipeline integrations"
description: "How to use Codefresh with Cloud Storage providers"
group: integrations
toc: true
---

Codefresh integrations with cloud storage providers provide a convenient solution for storing test reports. 
With Codefresh, you can easily configure your pipelines to store test reports in your preferred Cloud Storage provider, such as Amazon S3, Google Cloud Storage, Azure, and MinIO. 

For every cloud storage provider, you need to first create a storage bucket in your storage provider account, connect the account with Codefresh to create an integration, and configure your pipelines to [create and upload test reports]({{site.baseurl}}/docs/testing/test-reports/).

## Connecting your storage account to Codefresh

When you connect your storage provider account to Codefresh, Codefresh creates subfolders in the storage bucket for every build, with the build IDs as folder names. Test reports generated for a build are uploaded to the respective folder. The same bucket can store test reports from multiple pipeline builds.

1. In the Codefresh UI, on the toolbar, click the Settings icon, and then from the sidebar select **Pipeline Integrations**. 
1. Scroll down to **Cloud Storage**, and click **Configure**.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/cloud-storage-integrations.png" 
url="/images/pipeline/test-reports/cloud-storage-integrations.png"
alt="Cloud storage Integrations" 
caption="Cloud storage Integrations"
max-width="80%"
%}

{:start="3"}
1. Click **Add Cloud Storage**, and select your cloud provider for test report storage.
1. Define settings for your cloud storage provider, as described in the sections that follow.

## Connecting a Google bucket

**In Google**  

1. Create a bucket either from the Google cloud console or the `gsutil` command line tool.  
  See the [official documentation](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console){:target="\_blank"} for the exact details.

**In Codefresh**  
1. [Connect your storage account](#connecting-your-storage-account) and select **Google Cloud Storage**.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/cloud-storage-google.png" 
url="/images/pipeline/test-reports/cloud-storage-google.png"
alt="Google cloud storage" 
caption="Google cloud storage"
max-width="80%"
%}

{:start="2"}
1. Define the settings: 
   * Select **OAuth2** as the connection method, which is the easiest way. 
   * Enter an arbitrary name for your integration.
   * Select **Allow access to read and write into storage** as Codefresh needs to both write to and read from the bucket. 
1. Click **Save**. 
1. When Codefresh asks for extra permissions from your Google account, accept the permissions. 

The integration is ready. You will use the name of the integration as an environment variable in your Codefresh pipeline.

> **NOTE**:  
  An alternative authentication method is to use **JSON Config** with a [Google service account key](https://console.cloud.google.com/apis/credentials/serviceaccountkey){:target="\_blank"}.  
  In that case, download the JSON file locally and paste its contents in the **JSON config** field.
  For more information, see the [official documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys){:target="\_blank"}. 

## Connecting an Amazon S3 bucket

**Create an S3 bucket in AWS (Amazon Web Services)**  

1. Create an S3 bucket in AWS.  
  See the [official documentation](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html){:target="\_blank"}, or use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/s3api/create-bucket.html){:target="\_blank"}. 
1. Define the necessary IAM (Identity and Access Management) policy settings.  
  Here's an example IAM policy that you can use as a reference:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::cf-backup*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::cf-backup*/*"
            ]
        }
    ]
}
```
 

**Define S3 settings in Codefresh**   
1. Select **Amazon Cloud Storage** as your [Cloud Storage provider](#connecting-your-storage-account).
1. Define the settings: 
   * Enter an arbitrary name for your integration.
   * Paste the **AWS Access Key ID** and **AWS Secret Access Key**. 
1. Click **Save**. 

For more information on how to obtain the **Access Key** and **Secret Access Key**, check the [AWS documentation](http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys).


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/cloud-storage-s3.png" 
url="/images/pipeline/test-reports/cloud-storage-s3.png"
alt="S3 cloud storage" 
caption="S3 cloud storage"
max-width="80%"
%}

After setting up and verifying the S3 bucket integration, you can use:
* The name of the integration as an environment variable in your Codefresh pipeline.
* Any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets), as values, by clicking on the lock icon that appears next to field:  
  * If you have already specified the resource field during secret definition, just enter the name of the secret directly in the text field, for example, `my-secret-key`.
  * If you didn't include a resource name during secret creation, enter the full name in the field, for example, `my-secret-resource@my-secret-key`.

## Connecting Azure Blob/File storage

**Create a storage account in Azure**  

1. For Azure, create a storage account.  
  See the [official documentation](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create){:target="\_blank"}.
1. Find one of the [two access keys](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage){:target="\_blank"} already created.
1. Note down the **Account Name** and **Access key for the account**. 

**Define Azure settings in Codefresh**  
1. Select **Azure File/Blob Storage** as your [Cloud Storage provider](#connecting-your-storage-account).
1. Define the settings: 
   * Enter an arbitrary name for your integration.
   * Paste the **Azure Account Name** and **Azure Account Key**. 
1. Click **Save**. 


{% include
image.html
lightbox="true"
file="/images/pipeline/test-reports/cloud-storage-azure.png"
url="/images/pipeline/test-reports/cloud-storage-azure.png"
alt="Azure cloud storage"
caption="Azure cloud storage"
max-width="60%"
%}

After setting up and verifying the Azure File/Blob integration, you can use:
* The name of the integration as an environment variable in your Codefresh pipeline.
* Any [external secrets that you have defined]({{site.baseurl}}/docs/integrations/secret-storage/) (such as Kubernetes secrets), as values, by clicking on the lock icon that appears next to field:  
  * If you have already specified the resource field during secret definition, just enter the name of the secret directly in the text field, for example, `my-secret-key`.
  * If you didn't include a resource name during secret creation, enter the full name in the field, for example, `my-secret-resource@my-secret-key`.


## Connecting MinIO storage

**Create a storage account in MinIO**  
1. Configure the MinIO server. 
   See the [official documentation](https://docs.min.io/docs/minio-quickstart-guide.html){:target="\_blank"}.  
1. Copy the Access and Secret keys.

**Set up a MinIO integration in Codefresh**  

1. Select **MinIO Cloud Storage** as your [Cloud Storage provider](#connecting-your-storage-account).
1. Define the settings:
  * **NAME**: The name of the MinIO storage. Any name that is meaningful to you.
  * **ENDPOINT**: The URL to the storage service object.
  * **PORT**: Optional. The TCP/IP port number. If not defined, defaults to port `80` for HTTP, and `443` for HTTPS.
  * **Minio Access Key**: The ID that uniquely identifies your account, similar to a user ID. 
  * **Secret Minio Key**: The password of your account.
  * **Use SSL**: Select to enable secure HTTPS access. Not selected by default. 
1. Click **Save**. 

   {% include
image.html
lightbox="true"
file="/images/pipeline/test-reports/cloud-storage-minio.png"
url="/images/pipeline/test-reports/cloud-storage-minio.png"
alt="MinIO cloud storage"
caption="MinIO cloud storage"
max-width="60%"
%} 


## Related articles
[Amazon Web Services (AWS) pipeline integration]({{site.baseurl}}/docs/integrations/amazon-web-services/)  
[Microsoft Azure pipeline integration]({{site.baseurl}}/docs/integrations/microsoft-azure/)  
[Google Cloud pipeline integration]({{site.baseurl}}/docs/integrations/google-cloud/)  
[Creating test reports]({{site.baseurl}}/docs/testing/test-reports/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/) 