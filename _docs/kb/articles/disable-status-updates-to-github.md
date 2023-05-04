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

## Overview

You need to option to stop status update to github from a pipeline

## Details

To disable status updates to Github, please follow these steps (it's currently supported only via CLI):

1. Install the Codefresh CLI: <https://codefresh-io.github.io/cli/installation/>

2. Authenticate the CLI to your Codefresh account: <https://codefresh-io.github.io/cli/authentication/>

3. Run `codefresh get pipeline <project_name/pipeline_name> -o yaml > pipeline_name_spec.yaml` to export the full pipeline spec as a YAML file

4. Add the options section under `spec`, set `enableNotifications: false` and save the changes. The updated YAML should look like this:

    ```yaml
    version: '1.0'
    kind: pipeline
    metadata:
    spec:
      options:
        enableNotifications: false
    ```

5. Run the `codefresh replace pipeline -f pipeline_name_spec.yaml` to update your pipeline from the YAML file
