---
title: "Amazon Web Services (AWS) pipeline integration"
description: "How to use Codefresh with AWS"
group: integrations
toc: true
---

Codefresh has native support for AWS in the following areas:

- [Amazon container registries: ECR](#amazon-container-registries)
- [Amazon Kubernetes clusters: EKS](#amazon-kubernetes-clusters)
- Amazon S3 buckets:
  - [For Test reports](#amazon-s3-bucket-for-test-reports)
  - [For Helm charts](#amazon-s3-bucket-for-helm-charts)

See also [other Amazon deployments](#other-amazon-deployments).

## Amazon Container Registries

Amazon Container Registries are fully compliant with the Docker registry API that Codefresh follows. 

Codefresh supports integration with Amazon ECR.  
To connect, follow the instructions described in [Amazon EC2 Container Registry]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/).

Once the registry is added, you can use the [standard push step]({{site.baseurl}}/docs/pipelines/steps/push/) in your pipelines. See [working with Docker registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/) for more information.

## Amazon Kubernetes clusters

Codefresh has native support for connecting an EKS cluster through the integration options for Kubernetes in Pipeline Integrations.
See [Adding an EKS cluster]({{site.baseurl}}/docs/integrations/kubernetes/#adding-eks-cluster) in [Kubernetes pipeline integrations]({{site.baseurl}}/docs/integrations/kubernetes/).

<!-- ask Kostis which is correct? 
{% 
	include image.html 
	lightbox="true" 
file="/images/integrations/aws/aws-integration.png" 
url="/images/integrations/aws/aws-integration.png" 
alt="Connecting an Amazon cluster" 
caption="Connecting a Amazon cluster" 
max-width="40%" 
%}
-->
{% 
	include image.html 
	lightbox="true" 
file="/images/integrations/kubernetes/eks-cluster-option.png" 
url="/images/integrations/kubernetes/eks-cluster-option.png" 
alt="Connecting an Amazon EKS cluster" 
caption="Connecting a Amazon EKS cluster" 
max-width="40%" 
%}
Once the cluster is connected, you can use any of the [available deployment options]({{site.baseurl}}/docs/deployments/kubernetes/) for Kubernetes clusters. You also get access to all other Kubernetes dashboards such as the [cluster dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/) and the [environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/).

## Amazon S3 bucket for test reports

Codefresh has native support for storing test reports in different storage buckets, including Amazon's S3 storage bucket.
You can connect an Amazon S3 bucket storage account to Codefresh through the Cloud Storage options in Pipeline Integrations.  



{% include
image.html
lightbox="true"
file="/images/integrations/aws/amazon-storage.png"
url="/images/integrations/aws/amazon-storage.png"
alt="Amazon cloud storage"
caption="Amazon cloud storage"
max-width="60%"
%}

For detailed instructions, to set up an integration with your S3 storage account in Amazon in Codefresh, see [Cloud storage integrations for pipelines]({{site.baseurl}}/docs/integrations/cloud-storage/), and to create and store test reports through Codefresh pipelines, see [Creating test reports]({{site.baseurl}}/docs/testing/test-reports/). 

## Amazon S3 bucket for Helm charts

You can also connect an Amazon S3 bucket as a Helm repository through the Helm Repository integration options in Pipeline Integrations. 

For detailed instructions, see [Helm charts and repositories]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/).
Once you connect your Helm repository, you can use it any [Codefresh pipeline with the Helm step]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/). 


{% include
image.html
lightbox="true"
file="/images/integrations/aws/amazon-s3-helm-repo.png"
url="/images/integrations/aws/amazon-s3-helm-repo.png"
alt="Using Amazon for Helm charts"
caption="Using Amazon for Helm charts"
max-width="80%"
%}



## Other Amazon deployments

For any other Amazon deployment, you can use the [Amazon CLI from a Docker image](https://hub.docker.com/r/amazon/aws-cli){:target="\_blank"} in a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).

`YAML`
{% highlight yaml %}
{% raw %}
  create_a_vm:
    title: "Creating a Virtual machine"
    type: "freestyle"
    arguments:
      image: "amazon/aws-cli"
      commands:
        - aws ec2 run-instances --image-id ami-xxxxxxxx --count 1 --instance-type t2.micro --key-name MyKeyPair --security-group-ids sg-903004f8 --subnet-id subnet-6e7f829e  
{% endraw %}
{% endhighlight %}


## Related articles
[Add your cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster)  
[Manage your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Cloning Git repositories]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/)  

