---
title: "How To: Clone or backup Pipelines or Projects"
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

You would like to back up your Pipelines or Projects locally.

## Details

You will need to have the [Codefresh CLI installed](https://codefresh-io.github.io/cli/installation/). When installed, run the following command:

{% raw %}

```shell
codefresh get pip "pipeline_name" -o yaml >  pipeline_backup_file
```

{% endraw %}

If you would like to export protected variables, run the following:

{% raw %}

```shell
codefresh get pip "pipeline_name" --decrypt-variables -o yaml >  pipeline_backup_file
```

{% endraw %}

To recreate a pipeline from a backup file, run the following command:

{% raw %}

```shell
codefresh replace -f pipeline_backup_file
```

{% endraw %}

## Related Items

[Codefresh CLI](https://codefresh-io.github.io/cli/installation/)
