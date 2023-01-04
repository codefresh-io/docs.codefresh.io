---
title: "Amazon Web Services (AWS) pipeline integration"
description: "How to use Codefresh with AWS"
group: integrations
toc: true
---

Codefresh has native support for AWS in the following areas:

- [Connecting to Amazon registries]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/)
- [Deploying to Amazon EKS]({{site.baseurl}}/docs/integrations/kubernetes/#adding-eks-cluster)
- [Using Amazon S3 for Test reports]({{site.baseurl}}/docs/testing/test-reports/#connecting-an-s3-bucket)
- [Using Amazon S3 for Helm charts]({{site.baseurl}}/docs/deployments/helm/add-helm-repository/#private-repository---s3)


## Using Amazon ECR

Amazon Container Registries are fully compliant with the Docker registry API that Codefresh follows. Follow the instruction under [Amazon EC2 Container Registry]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) to connect.

Once the registry is added, you can use the [standard push step]({{site.baseurl}}/docs/pipelines/steps/push/) in your pipelines. See [working with Docker registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/) for more information.

## Deploying to Amazon Kubernetes

Codefresh has native support for connecting an EKS cluster in the [cluster configuration screen]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster).

{% 
	include image.html 
	lightbox="true" 
file="/images/integrations/aws/aws-integration.png" 
url="/images/integrations/aws/aws-integration.png" 
alt="Connecting an Amazon cluster" 
caption="Connecting a Amazon cluster" 
max-width="40%" 
%}

Once the cluster is connected, you can use any of the [available deployment options]({{site.baseurl}}/docs/deployments/kubernetes/deployment-options-to-kubernetes/) for Kubernetes clusters. You also get access to all other Kubernetes dashboards such as the [cluster dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/) and the [environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/).

## Storing test reports in Amazon S3 bucket

Codefresh has native support for test reports. You can store the reports on Amazon S3.

{% include
image.html
lightbox="true"
file="/images/integrations/aws/amazon-storage.png"
url="/images/integrations/aws/amazon-storage.png"
alt="Amazon cloud storage"
caption="Amazon cloud storage"
max-width="60%"
%}

See the full documentation for [test reports]({{site.baseurl}}/docs/testing/test-reports/).

## Using Amazon S3 for storing Helm charts

You can connect an Amazon S3 bucket as a Helm repository in the [integrations screen]({{site.baseurl}}/docs/deployments/helm/add-helm-repository/).

{% include
image.html
lightbox="true"
file="/images/integrations/aws/amazon-s3-helm-repo.png"
url="/images/integrations/aws/amazon-s3-helm-repo.png"
alt="Using Amazon for Helm charts"
caption="Using Amazon for Helm charts"
max-width="80%"
%}

Once you connect your Helm repository you can use it any [Codefresh pipeline with the Helm step]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/). 


## Traditional Amazon deployments

For any other Amazon deployment you can use the [Amazon CLI from a Docker image](https://hub.docker.com/r/amazon/aws-cli){:target="\_blank"} in a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/)

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

