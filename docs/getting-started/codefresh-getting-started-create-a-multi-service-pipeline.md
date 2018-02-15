---
layout: docs
title: "Codefresh - Getting Started - Create a Multi-service Pipeline"
excerpt: ""
description: ""
excerpt: ""
group: getting-started
redirect_from:
  - /docs/codefresh-getting-started-create-a-multi-service-pipeline
toc: true
old_url: /docs/codefresh-getting-started-create-a-multi-service-pipeline
was_hidden: true
---
Welcome to Codefresh, the Docker-native CI/CD platform!
This getting started guide will show you how to configure a multi-service container-based CI/CD pipeline.

## What is a CI/CD pipeline?
Basically a pipeline automates steps in your software delivery process. A typical pipeline includes the following basic steps:
  * Build - initiates a build process, in which the code is turned into a compiled artifact and packaged in a Docker image. 
  * Test - runs unit tests inside the Docker container using any testing tool that supports your framework.  
  * Push - pushes the tested Docker Image to a Docker registry service, such as Docker Hub.  
  * Deploy - uploads the docker images to staging/production environment, such as ECS, Kubernetes. 

## What is a multi-service pipeline?
A multi-service pipeline is a CI/CD pipeline that includes multiple micro-services. These different micro-services may be running various parts of an application’s code and/or infrastructure services, such as a database service. The multi service pipeline is configured in Docker Compose, a tool for defining and running multi-container Docker applications. 

Once the pipeline is configured, any “commit” in one of the services will trigger the entire pipeline process, creating a Docker image, testing it, pushing it to the Docker registry, and finally uploading it to the staging/production environment.

*For single-service pipelines, on-demand dev and test environments, image management and other advanced features, please refer to the Codefresh documentation.* 

## What you need to get started:
  * A Github account (Codefresh also supports Bitbucket, but in the following example we will be using Github).
  * On Github, fork our Demo Chat project into your Github account (See <Forking the demo project> for instructions) 
  * A Docker Hub account.  

## 1. Add a Composition
Compositions are defined in a docker-compose format.

**To add a composition:**

1. In the **Compositions **page, click** Add Composition**.
