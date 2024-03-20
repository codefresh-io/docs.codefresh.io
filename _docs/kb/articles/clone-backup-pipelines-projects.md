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


This article describes how to back up your pipelines or projects locally.

## How to

##### Prerequisite  
[Install the Codefresh CLI](https://codefresh-io.github.io/cli/installation/). 

##### Commands

**Back up the pipeline**

{% raw %}
```shell
codefresh get pip "<pipeline_name>" -o yaml >  <pipeline_backup_file>  
```
{% endraw %}

where:  
* `"<pipeline_name>"` is the name of the pipeline to back up.
* `<pipeline_backup_file>` is the name of the file to which to save the backed up pipeline.


**Export protected variables**  

{% raw %}

```shell
codefresh get pip "pipeline_name" --decrypt-variables -o yaml >  pipeline_backup_file
```

{% endraw %}


**Recreate a pipeline from a backup file**

{% raw %}

```shell
codefresh replace -f pipeline_backup_file
```

{% endraw %}


