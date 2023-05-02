---
title: "How To: Create AWS ECR repository in pipeline"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

As part of your pipeline, you want to create an AWS ECR repository if none exists

## Details

Use the example below, substituting any variable with yours:

```yaml
create_repo_if_non_exists:
  image: garland/aws-cli-docker:latest
  commands:
    - aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
    - aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
    - aws configure set region $AWS_REGION
    - aws ecr describe-repositories --repository-names $CF_REPO_NAME || aws ecr create-repository --repository-name $CF_REPO_NAME
```
