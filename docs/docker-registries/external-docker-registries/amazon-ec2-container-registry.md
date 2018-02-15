---
layout: docs
title: "Amazon EC2 Container Registry"
description: ""
group: docker-registries
sub_group: external-docker-registries
redirect_from:
  - /docs/aws
toc: true
---
To configure ECR first select **Amazon ECR** from the new registry drop down
and then provide the following

* Registry Name - A unique name for this configuration
* Access Key ID - AWS accessKeyId
* Secret Access Key - AWS accessKeyId
* Region - AWS region

{% include image.html lightbox="true" file="/images/6f9a8ef-add-ecr.png" url="/images/6f9a8ef-add-ecr.png" alt="Add Amazon EC2 Container Registry" max-width="45%" %}

Codefresh makes sure to automatically refresh the AWS token for you.

<div class="bd-callout bd-callout-info" markdown="1">
##### Where are my keys?

In case you don't know where to get this data from please follow this [link](http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys){:target="_blank"}.
</div>

<div class="bd-callout bd-callout-warning" markdown="1">
##### Note

You need to have an active registry all set up in AWS.<br /><br />
Amazon ECR Push/Pull operations can be provide by two permission options: user-based and resource-based.

{:start="1"}
1. User-based permissions: User account need to apply AmazonEC2ContainerRegistryPowerUser policy (or custom based on that policy).
More information and examples can be found [here](http://docs.aws.amazon.com/AmazonECR/latest/userguide/ecr_managed_policies.html)

{:start="2"}
2. For resource-based users require permissions to call ecr:GetAuthorizationToken before they can authenticate to a registry and push or pull any images from any Amazon ECR repository, than you need provide push/pull permissions to specific registry. More information and examples can be found [here](http://docs.aws.amazon.com/AmazonECR/latest/userguide/RepositoryPolicies.html){:target="_blank"}.
</div>

## Using in Codefresh.yaml (old way)
You can configure your `Codefresh.yaml` file directly by first providing
the following in the **Environment Variables** section of the Pipelines view

* AWS_REGISTRY - the registry url (including the repository name)
* AWS_ACCESS_KEY - your access key id
* AWS_SECRET_KEY - your secret key
* AWS_REGION - the region of your registry

and then you can reference those variables in your file like so

  `Codefresh.yaml`
{% highlight yaml %}
push_to_aws_ecr:
  type: push
  description: Free text description
  candidate: {% raw %}${{build_step}}{% endraw %}
  tag: {% raw %}${{CF_BRANCH}}{% endraw %}
  provider: 'ecr'
  registry: {% raw %}${{AWS_REGISTRY}}{% endraw %}
  accessKeyId: {% raw %}${{AWS_ACCESS_KEY}}{% endraw %}
  secretAccessKey: {% raw %}${{AWS_SECRET_KEY}}{% endraw %}
  region: {% raw %}${{AWS_REGION}}{% endraw %}
{% endhighlight %}

<div class="bd-callout bd-callout-warning" markdown="1">
##### See, the example how to push Image to an AWS EC2 Container Registry

[Push Image to an AWS EC2 Container Registry](doc:push-image-to-an-aws-ec2-container-registry)
</div>
