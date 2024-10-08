---
title: "How To: Enable debug mode when using Codefresh CLI"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines, CLI]
support-reviewed: 2023-04-18 LG
---

This article describes how to enable debug mode when using the Codefresh CLI for pipeline management.  
Enabling the `debug` mode provides detailed output helping you to understand the reasons for potential issues.  

Debig mode is useful when facing issues related to:
* Authentication
* Network access, such as connectivity to the Codefresh platform
* Delays or errors during command execution, as when running a pipeline locally

>**NOTE**  
Make sure you have the [latest version of the CLI](https://codefresh-io.github.io/cli/installation/){:target="\_blank"}.

## How to

1. Initialize the `DEBUG` environment variable:

    ```shell
    DEBUG=codefresh*
    ```

1. Run the Codefresh CLI command you want to debug.  
  For example:

    ```shell
    codefresh run my-project/my-pipeline --local
    ```

1. Analyze the output to identify issues.
   Below is an example of CLI command output in debug mode.

    ![Codefresh CLI debug output]({{site.baseurl}}/images/troubleshooting/cli-debug-mode.png)

{{site.data.callout.callout_tip}}
**TIP**  
If after analyzing the debug output you're unable to resolve the issue, please submit a ticket to Codefresh Support, including the output details. 
{{site.data.callout.end}}

## Related articles
[Codefresh CLI documentation](https://codefresh-io.github.io/cli/)

