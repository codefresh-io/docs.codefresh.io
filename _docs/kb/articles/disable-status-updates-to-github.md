---
title: "How To: Disable status updates to GitHub"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines, CLI, Settings]
support-reviewed: 2023-04-18 LG
---



This article describes how to stop status update from a pipeline to GitHub.

>**NOTE**  
Disabling status updates to GitHub is currently supported only via CLI for Codefresh pipelines.

## Before you begin 

* Install the CLI](https://codefresh-io.github.io/cli/installation/){:target="\_blank"}
* [Authenticate the CLI to your Codefresh account](https://codefresh-io.github.io/cli/authentication/){:target="\_blank"}

## How to

1. Export the full pipeline spec as a YAML file:  
   `codefresh get pipeline <project_name/pipeline_name> -o yaml > pipeline_name_spec.yaml` to
1. Below `spec`, add `options` and then add  `enableNotifications: false`, as in the example below.

    ```yaml
    version: '1.0'
    kind: pipeline
    metadata:
    spec:
      options:
        enableNotifications: false
    ```
1. Save the changes and close the YAML. 
5. Run the `codefresh replace pipeline -f pipeline_name_spec.yaml` to update your pipeline with the specifications from the YAML file.
