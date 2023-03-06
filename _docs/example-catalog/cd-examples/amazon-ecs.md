---
title: "Amazon ECS/Fargate"
description: "Use Codefresh to deploy Docker containers to ECS/Fargate"
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/yaml-examples/examples/amazon-ecs/
  - /docs/amazon-ecs/
  - /docs/deploy-your-containers/
  - /docs/deploy-your-containers/amazon-ecs/
  - /v1.0/docs/amazon-ecs/
toc: true
---
Codefresh can deploy to any ECS or Fargate cluster created in Amazon.

{% include image.html 
lightbox="true" 
file="/images/examples/amazon-ecs/ecs-pipeline-deployment.png" 
url="/images/examples/amazon-ecs/ecs-pipeline-deployment.png" 
alt="Deploying to Amazon ECS"
caption="Deploying to Amazon ECS"
max-width="100%" 
%}

## Prerequisites


1. Configure an ECS (or Fargate) Cluster with at least one running instance.
1. Configure an ECS Service and Task Definition with a reference to **the image that you are going to build and push.** See [the official amazon docs](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html){:target="\_blank"} for more details.
1. Connect your [ECR to Codefresh]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) so that it can be used by name in Codefresh pipelines.
1. Verify you have AWS Credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`), with the following privileges:

  `JSON`
{% highlight json %}
{% raw %}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1479146904000",
      "Effect": "Allow",
      "Action": [
        "ecs:DescribeServices",
        "ecs:DescribeTaskDefinition",
        "ecs:DescribeTasks",
        "ecs:ListClusters",
        "ecs:ListServices",
        "ecs:ListTasks",
        "ecs:RegisterTaskDefinition",
        "ecs:UpdateService"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
{% endraw %}
{% endhighlight %}



## Create a CI/CD pipeline for ECS/Fargate

Here is the complete pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - "clone"
  - "build"
  - "deploy"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    stage: "clone"
    git: github
  BuildingDockerImage:
    stage: "build"
    title: Building Docker Image
    type: build
    image_name: ${{IMAGE}}
    tag: '${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile.multistage
  Push:
    title: "Pushing image to ECR"
    stage: "deploy"
    type: "push"
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    registry: "ecr"
    candidate: "${{BuildingDockerImage}}"
  DeployToFargate:
    stage: "deploy"
    image: codefreshplugins/cf-deploy-ecs
    commands:
      - cfecs-update ${{REGION}} ${{ECS_CLUSTER_NAME}} ${{ECS_SERVICE_NAME}} --image-name ${{IMAGE_PREFIX}}/${{IMAGE}} --image-tag '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    environment:
      - AWS_ACCESS_KEY_ID=${{AWS_ACCESS_KEY_ID}}
      - AWS_SECRET_ACCESS_KEY=${{AWS_SECRET_ACCESS_KEY}}

{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/)
1. Uses a [build step]({{site.baseurl}}/docs/pipelines/steps/build/) to create a Docker image
1. Uses a [push step]({{site.baseurl}}/docs/pipelines/steps/push/) to push the docker image to ECR. The registry was previously [connected to Codefresh]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) with the `ecr` identifier.
1. Runs `codefreshplugins/cf-deploy-ecs` to perform the actual deployment


The pipeline needs [environment variables]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings) that hold all the required parameters.

{% include image.html 
lightbox="true" 
file="/images/examples/amazon-ecs/ecs-variables.png" 
url="/images/examples/amazon-ecs/ecs-variables.png" 
alt="ECS environment variables"
caption="ECS environment variables"
max-width="80%" 
%}

         

         
Note that the **`--image-name`** and **`--image-tag`** pair should comprise the **full name** of the image that was pushed to the registry (including the registry name) in order to be correctly referred by the corresponding Task Definition.

 

## Deployment Flow

The `codefreshplugins/cf-deploy-ecs` step performs the following:


1. Gets the ECS service by specified `aws-region`, `ecs-cluster`, and `service-names`.
1. Creates a new revision from the current task definition of the service. If `--image-name` and `--image-tag` are provided, it replaces the image tag.
1. Runs the `update-service` command with the new task definition revision.
1. Waits for the deployment to complete. 
    * Deployment is successfully completed if `runningCount == desiredCount` for PRIMARY deployment - see `aws ecs describe-services`
    * The `cfecs-update` command exits with a timeout error if after --timeout (default = 900s) `runningCount` does not equal `desiredCount`
    * The `cfecs-update` exits with an error if --max-failed (default = 2) or more ECS tasks were stopped with error for the task definition that you are deploying.      ECS continuously retries failed tasks.

You can also find the same step in the form of a [Codefresh plugin](https://codefresh.io/steps/step/ecs-deploy){:target="\_blank"}.

## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[External registries]({{site.baseurl}}/docs/integrations/docker-registries/)


