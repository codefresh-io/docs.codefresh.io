---
title: "Amazon Web Services"
description: "How to use Codefresh with AWS"
group: integrations
toc: true
---

Codefresh has native support for AWS in the following areas:

- [Connecting to Amazon registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/)
- [Deploying to Amazon EKS]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#adding-eks-cluster)
- [Using Amazon S3 for Test reports]({{site.baseurl}}/docs/testing/test-reports/#connecting-an-s3-bucket)


## Using Amazon ECR

Amazon Container registries are fully compliant with the Docker registry API that Codefresh follows. You can connect GCR like any [other Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/).

{% 
	include image.html 
	lightbox="true" 
file="/images/artifacts/registry/add-amazon-ecr-registry.png" 
url="/images/artifacts/registry/add-amazon-ecr-registry.png" 
alt="Connecting to ECR" 
caption="Connecting to ECR" 
max-width="70%" 
%}

Once the registry is added you can the [standard push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) step in pipelines. See also the documentation page for [working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/).

## Deploying to Amazon Kubernetes

Codefresh has native support for connecting a EKS cluster in the [cluster configuration screen]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/).

{% 
	include image.html 
	lightbox="true" 
file="/images/integrations/aws/aws-integration.png" 
url="/images/integrations/aws/aws-integration.png" 
alt="Connecting an Amazon cluster" 
caption="Connecting a Amazon cluster" 
max-width="40%" 
%}

Once the cluster is connected you can use any of the [available deployment options]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) for Kubernetes clusters. You also get access to all other Kubernetes dashboards such as the [cluster dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)  or the [environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/) .

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


## Traditional Amazon deployments

For any other Amazon deployment you can use the [Amazon CLI from a Docker image](https://hub.docker.com/r/amazon/aws-cli) in a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)

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


## What to read next

- [Add your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
- [Manage your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
- [Cloning Git repositories]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/)
