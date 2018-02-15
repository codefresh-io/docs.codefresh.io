---
layout: docs
title: "Push Image to an AWS EC2 Container Registry"
description: ""
group: how-to-guides
redirect_from:
  - /docs/push-image-to-an-aws-ec2-container-registry
  - /docs/push-image-to-an-aws-ec2-container-registry
toc: true
old_url: /docs/push-image-to-an-aws-ec2-container-registry
---

{{site.data.callout.callout_info}}
##### Make sure the registry has been configured

See [how to]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/amazon-ec2-container-registry/){:target="_blank"} configure ECR registry in account management
{{site.data.callout.end}}

## Setup the registry for the pipeline
In this example, we use the repository [react starter kit](https://github.com/codefreshdemo/react-starter-kit){:target="_blank"}.

In the **Pipelines** view, you can configure to which registry the build image will be pushed to.

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

{{site.data.callout.callout_warning}}
Make sure the repository exist in ECR
{{site.data.callout.end}}

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

## Push image manually to ECR
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

{{site.data.callout.callout_warning}}
It is possible to change the images name, make sure that the new name exist as a repository in ECR
{{site.data.callout.end}}
