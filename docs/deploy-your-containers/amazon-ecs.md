---
layout: docs
title: "Amazon ECS"
description: ""
group: deploy-your-containers
redirect_from:
  - /docs/amazon-ecs
  - /docs/deploy-your-containers
toc: true
---
## Deploy Codefresh to Amazon ECS Service

{:.text-secondary}
### Prerequisites

{:start="1"}
1. Configure an ECS Cluster with at least one running instance.

{:start="2"}
2. Configure an ECS Service and Task Definition with a reference to **the image that you are going to build and push.** See [the official amazon docs](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html){:target="_blank"} for more details.

{:start="3"}
3. Verify you have AWS Credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY), with following privileges:

  `JSON`
{% highlight json %}
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
{% endhighlight %}

{:.text-secondary}
### Deployment with Codefresh.yml
The ```codefresh.yml``` file runs the ```codefresh/cf-deploy-ecs``` image with the ```cfecs-update``` command.

{:start="1"}
1. Add encrypted environment variables for AWS credentials (see the pipeline "General " tab)

{% highlight text %}
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY 
{% endhighlight %}
         
{:start="2"}
2. Configure Codefresh to access Amazon docker registry on the [Integration page](https://g.codefresh.io/account/integration/registry){:target="_blank"}. The Task Definition you are deploying to must be able to access the registry as well.

{:start="3"}
3. Describe your push step so that the image is pushed into the configured registry.

{:start="4"}
4. Add a [free-style step](https://docs.codefresh.io/docs/freestyle) that uses our "cf-deploy-ecs" image.

{:start="5"}
5. Specify the command "cfecs-update" to be executed with following parameters:

{% highlight text %}
   1) `--image-name`
   2) `--image-tag`
   3) `aws region`
   4) `ecs cluster`
   5) `ecs-service-names`. 
{% endhighlight %}
         
Note that the **`--image-name`** and **`--image-tag`** pair should comprise the **full name** of the image that was pushed to the registry (including the registry name) in order to be correctly referred by the corresponding Task Definition.

  `YAML`
{% highlight json %}
{% raw %}
# codefresh.yml example with deploy to ecs step
version: '1.0'

steps:
  build-step:
    type: build
    image-name: repo/image:tag  # this is the name of the image that will be stored locally in the Codefresh registry

  # in this step below you are pushing the image to Amazon so it can be used by your Task Definition
 
 push to registry: 
    type: push
    candidate: ${{build-step}}
    tag: ${{CF_BRANCH}}
    registry: MyAmazonDCR   #name of the registry configured on the Integration page

 deploy to ecs:
    image: codefresh/cf-deploy-ecs    # the name of the Codefresh docker image (not your image)
    commands:
      - cfecs-update --image-name <image-fullname-without-tag> --image-tag '${{CF_BRANCH}}' <aws-region> <ecs-cluster-name> <ecs-service-name>
  *     environment:
      - AWS_ACCESS_KEY_ID=${{AWS_ACCESS_KEY_ID}}
      - AWS_SECRET_ACCESS_KEY=${{AWS_SECRET_ACCESS_KEY}}

    when:
      branch:
        only:
          - master
{% endraw %}
{% endhighlight %}

{:.text-secondary}
### Deploy from a Pipeline's UI deploy step

{:start="1"}
1. Select **Codefresh's Deploy Images** in the pipeline's and select `codefresh/cf-deploy-ecs:latest`.

{:start="2"}
2. As a deploy command use `cfecs-update <aws-region> <ecs-cluster-name> <ecs-service-name>` and replace `<aws-region>`, `≤ecs-cluster>`, and `≤service-names≥` with the right region, cluster name and service name from your ECS account.
For more information on how to use the Codefresh's ECS update check the image's page on [GitHub](https://github.com/codefresh-io/cf-deploy-ecs).

{:start="3"}
3.  Add encrypted environment variables for AWS credentials.
     * `AWS_ACCESS_KEY_ID`
     * `AWS_SECRET_ACCESS_KEY` 

**Notice:** The UI deploy step will run on any build. Make sure that your automated builds run only on a specific branch trigger.

{% include 
image.html 
lightbox="true" 
file="/images/6ec9666-Image.png" 
url="/images/6ec9666-Image.png"
alt="Image.png" 
max-width="40%"
caption="Set the deploy image and script"
%}

{% include 
image.html 
lightbox="true" 
file="/images/2e0e73d-image2.png" 
url="/images/2e0e73d-image2.png"
alt="image2.png" 
max-width="40%"
caption="Set the environment variable"
%}

{:.text-secondary}
### Deployment Flow

{:start="1"}
1. Get the ECS service by specified `aws-region`, `ecs-cluster`, and `service-names`.

{:start="2"}
2. Create a new revision from the current task definition of the service. If `--image-name` and `--image-tag` are provided, replace the image tag.

{:start="3"}
3. Run the `update-service` command with the new task definition revision.

{:start="4"}
4. Wait for the deployment to complete. 
   By default, service deployment is no run with the `--no-wait` command.
    * Deployment is successfully completed if runningCount == desiredCount for PRIMARY deployment - see `aws ecs describe-service`
    * The `cfecs-update` command exits with a timeout error if after --timeout (default = 900s) `runningCount` does not equal `desiredCount`
    * The `cfecs-update` exits with an error if --max-failed (default = 2) or more ECS tasks were stopped with error for the task definition that you are deploying.
      ECS continuously retries failed tasks.

{:.text-secondary}
### Usage with Docker

{% highlight bash %}
{% raw %}

docker run --rm -it -e AWS_ACCESS_KEY_ID=**** -e AWS_SECRET_ACCESS_KEY=**** codefresh/cf-ecs-deploy cfecs-update [options] <aws-region> <ecs-cluster-name> <ecs-service-name>

{% endraw %}
{% endhighlight %}


  `cfecs-update -h`
{% highlight bash %}
{% raw %}


usage: cfecs-update [-h] [-i IMAGE_NAME] [-t IMAGE_TAG] [--wait | --no-wait]
                    [--timeout TIMEOUT] [--max-failed MAX_FAILED] [--debug]
                    region_name cluster_name service_name

Codefresh ECS Deploy

positional arguments:
  region_name           AWS Region, ex. us-east-1
  cluster_name          ECS Cluster Name
  service_name          ECS Service Name

optional arguments:
  -h, --help            show this help message and exit
  --wait                Wait for deployment to complete (default)
  --no-wait             No Wait for deployment to complete
  --timeout TIMEOUT     deployment wait timeout (default 900s)
  --max-failed MAX_FAILED
                        max failed tasks to consider deployment as failed
                        (default 2)
  --debug               show debug messages

  -i IMAGE_NAME, --image-name IMAGE_NAME
                        Image Name in ECS Task Definition to set new tag
  -t IMAGE_TAG, --image-tag IMAGE_TAG
                        Tag for the image

{% endraw %}
{% endhighlight %}

