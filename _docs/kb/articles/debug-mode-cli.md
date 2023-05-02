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

## Overview

When you're running commands using Codefresh CLI you may face some issues related to:

* Authentication problems
* Network-related issues (e.g.: trying to reach Codefresh platform)
* Delays or errors executing a command (e.g.: running a pipeline locally)

By enabling the `debug` mode when using the Codefresh CLI, you will get more verbose output, which will help you to understand where and when a potential issue is happening.

## Details

1. Enable the `debug` mode for the Codefresh CLI: to do so, you need to initialize the `DEBUG` environment variable as follows:

    ```shell
    DEBUG=codefresh*
    ```

2. Run the Codefresh CLI command you would like to debug. For example:

    ```shell
    codefresh run my-project/my-pipeline --local
    ```

    (or any other Codefresh CLI command)

3. You will get an output similar to this:

    ![Codefresh CLI debug output]({{site.baseurl}}/images/troubleshooting/cli-debug-mode.png)

>**_Note:_**
>
>If after reviewing the output provided by the debug mode you're still unable to fix the issue, please include that output in a ticket. That way the Support Team will be able to help you.

## Related Items

* [Codefresh CLI documentation](https://codefresh-io.github.io/cli/)
* [Codefresh CLI Installation and upgrade process](https://codefresh-io.github.io/cli/installation/) (it's important to keep your Codefresh CLI up to date)
