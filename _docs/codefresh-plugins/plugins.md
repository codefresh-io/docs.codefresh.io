---
layout: docs
title: "Plugins"
description: ""
group: codefresh-plugins
redirect_from:
  - /docs/plugins
  - /docs/codefresh-plugins/
toc: true
---
Codefresh plug-ins are steps that can be added to the pipelines yamls and can help in easily crafting pipelines that execute common tasks like testing, security scanning, updating jira tickets etc.. 

Below you can find a list of plugins currently publicly available, we are working with the community to publish more steps so stay tuned. 

If you have a specific ask for a plug-in please email us at plugin-request@codefresh.io

### Stable

{: .table .table-bordered .table-hover .table-striped}
|-------------------------------------------------------------------------------------------+---------------------------------------------------------------------|
| Name                                                                                      | Description                                                         |
|-------------------------------------------------------------------------------------------|:--------------------------------------------------------------------|
| [Helm](https://github.com/codefresh-io/plugins/blob/master/plugins/helm/README.md)        | Build & Deploy a Helm chart |
| [Codefresh Cli](https://github.com/codefresh-io/plugins/blob/master/plugins/codefresh-cli/README.md)        | Operate on Codefresh resources                                         |
| [Slack](https://github.com/codefresh-io/plugins/blob/master/plugins/slack/README.md)                 | Send a custom slack message from the pipeline                       |
| [Deploy to ECS](https://github.com/codefresh-io/plugins/blob/master/plugins/ecs-deploy/README.md)                                  | Deploy a docker image to ECS |
| [Deploy Kompose](https://github.com/codefresh-io/plugins/blob/master/plugins/kompose/README.md)                              | Deploy Docker Compose to Kubernetes cluster with [Kubernetes Kompose](http://kompose.io/) |
| [GitHub PR](https://github.com/codefresh-io/plugins/blob/master/plugins/github-pr/README.MD)                             | Creates pull request to GitHub  
| [Jenkins](https://github.com/codefresh-io/plugins/blob/master/plugins/run-jenkins-job/README.md)     | Run a Jenkins job from codefresh pipeline                           |
| [DC/OS](https://github.com/codefresh-io/plugins/blob/master/plugins/dcos-app-deploy/README.md)                                   | Deploy application image to DC/OS cluster                           |
| [Interact with Jira](https://github.com/codefresh-io/plugins/blob/master/plugins/jira/README.md) | Interact with Jira from Codefresh pipelines                                      |
| [NPM](https://github.com/codefresh-io/plugins/blob/master/plugins/release-to-NPM/README.md)        | Release npm modules from a pipeline |
| [Twistlock](https://github.com/codefresh-io/plugins/tree/master/plugins/twistlock-scan)        | Security scanning of docker images using Twistlock |
| [Clair](https://github.com/codefresh-io/plugins/blob/master/plugins/clair/README.md)        | Security scanning of Docker images using Clair |
| [Import Docker Images](https://github.com/codefresh-io/plugins/blob/master/plugins/import-docker-images/README.md)        | Import Docker images metadata into Codefresh |


