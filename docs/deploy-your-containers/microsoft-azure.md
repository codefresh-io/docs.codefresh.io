---
layout: docs
title: "Microsoft Azure"
description: ""
group: deploy-your-containers
redirect_from:
  - /docs/microsoft-azure
toc: true
---

## Deploying Containers to Azure
**Docker Swarm**
At current, Azure Container Service supports legacy Docker Swarm (pre 1.12), which does not support Docker stack. To deploy to ACS with legacy Swarm from Codefresh [follow the documentation here](https://github.com/jldeen/codefresh/blob/master/Swarm.md){:target="_blank"}.

**Docker Swarm Mode**
DockerCE clusters (1.12+) on Azure Container Service are currently in preview and are not recommended for production environments. However, deploying with Codefresh is currently supported. Note: If you have a Swarm cluster deployed from Azure Container Service Engine or a [GitHub QuickStart 101 template](https://github.com/Azure/azure-quickstart-templates/tree/master/101-acsengine-swarmmode), swarm mode is supported as well. [Documentation can be found here](https://github.com/jldeen/codefresh/blob/master/Swarm-mode.md).

**Kubernetes** 
Deploying to Kubernetes on Microsoft Azure is currently supported with Codefresh's [universal Kubernetes support](https://docs.codefresh.io/docs/adding-non-gke-kubernetes-cluster).
