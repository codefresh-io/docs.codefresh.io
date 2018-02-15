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
| [Helm](https://github.com/codefresh-io/cf-plugin-helm)                                    | Build & Deploy a Helm chart                                         |
| [Slack](https://github.com/codefresh-io/plugins/tree/master/stable/slack)                 | Send a custom slack message from the pipeline                       |
| [Jenkins](https://github.com/codefresh-io/plugins/tree/master/stable/run-jenkins-job)     | Run a Jenkins job from codefresh pipeline                           |
| [ECS](https://github.com/codefresh-io/cf-deploy-ecs.git)                                  | Deploy a docker image to ECS                                        |
| [Kompose](https://github.com/codefresh-io/cf-kompose-plugin)                              | Deploy Docker Compose to Kubernetes cluster with Kubernetes Kompose |
| [GitHub PR](https://github.com/codefresh-io/github-pr-plugin)                             | Creates pull request to GitHub                                      |
| [DC/OS](https://github.com/codefresh-io/cf-deploy-dcos)                                   | Deploy application image to DC/OS cluster                           |
| [Codefresh CLI](https://github.com/codefresh-io/plugins/tree/master/stable/codefresh-cli) | Operate on Codefresh resources                                      |
|-------------------------------------------------------------------------------------------+---------------------------------------------------------------------|

### Incubator

{: .table .table-bordered .table-hover .table-striped}
|-------------------------------------------------------------------------------------------+---------------------------------------------------------------------|
| Name                                                                                      | Description                                                         |
|-------------------------------------------------------------------------------------------|:--------------------------------------------------------------------|
| [Import Docker Images](https://github.com/codefresh-io/cf-import-image)                   | Import Docker images metadata into Codefresh                        |
|-------------------------------------------------------------------------------------------+---------------------------------------------------------------------|
