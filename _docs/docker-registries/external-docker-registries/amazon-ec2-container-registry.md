---
title: "Amazon EC2 Container Registry"
description: "How to use the Amazon Docker Registry in Codefresh"
group: docker-registries
sub_group: external-docker-registries
redirect_from:
  - /docs/aws/
toc: true
---

First click *Configuration* from the left sidebar and then select the *Docker Registry* option under the *Integrations* tab.

To configure ECR first select **Amazon ECR** from the new registry drop down
and then provide the following

* Registry Name - A unique name for this configuration
* Access Key ID - AWS accessKeyId
* Secret Access Key - AWS accessKeyId
* Region - AWS region

{% include image.html lightbox="true" file="/images/artifacts/registry/add-amazon-ecr-registry.png" url="/images/artifacts/registry/add-amazon-ecr-registry.png" alt="Add Amazon EC2 Container Registry" max-width="60%" %}

Codefresh makes sure to automatically refresh the AWS token for you.

For more information on how to obtain the needed tokens read the [AWS documentation](http://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys){:target="_blank"}.

{{site.data.callout.callout_info}}
##### Note

You need to have an active registry all set up in AWS.<br /><br />
Amazon ECR Push/Pull operations can be provide by two permission options: user-based and resource-based.


1. User-based permissions: User account need to apply AmazonEC2ContainerRegistryPowerUser policy (or custom based on that policy).
More information and examples can be found [here](http://docs.aws.amazon.com/AmazonECR/latest/userguide/ecr_managed_policies.html)
1. For resource-based users require permissions to call ecr:GetAuthorizationToken before they can authenticate to a registry and push or pull any images from any Amazon ECR repository, than you need provide push/pull permissions to specific registry. More information and examples can be found [here](http://docs.aws.amazon.com/AmazonECR/latest/userguide/RepositoryPolicies.html){:target="_blank"}.
{{site.data.callout.end}}

## Pushing Docker images to Amazon ECR

There are 3 ways to push images 

1. Using the YAML [push step]({{ site.baseurl }}/docs/codefresh-yaml/steps/push-1/) (recommended)
1. Using the GUI pipeline (shown below)
1. Promoting manually an image (shown below)

An example repository can be found at [https://github.com/codefreshdemo/react-starter-kit](https://github.com/codefreshdemo/react-starter-kit)

### Pushing a Docker image via the Pipeline GUI

In the *Pipelines* view, you can configure to which registry the build image will be pushed to.

{:start="1"}
1. Select your repository

{% include image.html 
lightbox="true" 
file="/images/db8ba11-select_repo.png" 
url="/images/db8ba11-select_repo.png"
alt="select repo.png"
max-width="40%"
%}

{:start="2"}
2. Select the registry to where the build image will be pushed

>Make sure the repository exists in ECR


{% include image.html 
lightbox="true" 
file="/images/bf72fa4-save-reg.png" 
url="/images/bf72fa4-save-reg.png"
alt="save-reg.png"
max-width="40%"
%}

{:start="3"}
3. Save and build the pipeline

The image will be pushed to your registry. You can see the build log to for details.

### Manually promoting an image

The **Images** view has an option to manually push images to a registry.

{:start="1"}
1. Click on the **Promote** button

{% include image.html 
lightbox="true" 
file="/images/15695ce-promote.png" 
url="/images/15695ce-promote.png"
alt="promote.png"
max-width="40%"
%}

{:start="2"}
2. On the promotion dialog set
   - Repository Name - name of your repository as it set in ECR

{% include image.html 
lightbox="true" 
file="/images/7b7c876-ecr2.png" 
url="/images/7b7c876-ecr2.png"
alt="ecr2.png"
max-width="40%"
%}
   
   - Tag - select a tag (the tag will appear after the `:` e.g. `repository-name:tag`)
   - Registry - your ECR configuration

{% include image.html 
lightbox="true" 
file="/images/f2b0ec5-ecr3.png" 
url="/images/f2b0ec5-ecr3.png"
alt="ecr3.png"
max-width="40%"
%}   

{:start="3"}
3. Click the **Promote** button


>It is possible to change the image name if you want, but make sure that the new name exist as a repository in ECR




