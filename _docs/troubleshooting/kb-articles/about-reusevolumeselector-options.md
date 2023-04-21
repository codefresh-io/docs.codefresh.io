---
title: About reuseVolumeSelector options
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Runtimes]
support-reviewed: 2023-04-18 LG
---

## Overview

The behavior of how the volumes are reused depends on volume selector configuration.

`reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName'`

That means that a determined volume can be used by any pipeline of your account.

`reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'`

That means that a determined PV can be used only by a specific pipeline.

## Details

For approach _codefresh-app,io.codefresh.accountName_ :

* Benefit: less PVs --> lower cost (since any PV can be used by any pipeline, then, the cluster would need to keep less PVs in its pool of PVs for Codefresh)
* Downside: since the PV can be used by any pipeline, then, the PVs could have assets and info from different pipelines, thus reducing the probability of cache,

For approach _codefresh-app,io.codefresh.accountName,pipeline_id_ :

* Benefit: more probability of cache (no "spam" from other pipelines)
* Downside: more PVs to keep (higher cost)

### How-to change the reuseVolumeSelector in your Runtime Environment

To make the changes in your Runtime Environment, you will need to use the
[Codefresh CLI.](https://codefresh-io.github.io/cli/installation/)

1. Get your Runtime Environment:

    ```shell
    codefresh get re <name> -o yaml > spec.yaml
    ```

1. Modify the reuseVolumeSelector in the the downloaded file, in the example
below we change it to per-pipeline mode:

    ``` yaml
    ...  
    pvcs:  
        dind:  
            ...  
            reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName, **pipeline_id** '  
            ...
    ```

1. Patch your RE using the following CLI command:  

    ```shell
    codefresh patch re -f spec.yaml
    ```

## Related items

[Volume Reusage Policy]({{site.baseurl}}/docs/installation/codefresh-runner/#volume-reuse-policy)
