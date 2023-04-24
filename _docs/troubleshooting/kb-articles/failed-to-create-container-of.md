---
title: "Error: Failed to create a container of"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

You have a freestyle step that is failing with the following error message:

```shell
[SYSTEM]                                                                 
  Message             Failed to run freestyle step: my_step
  Caused by           Failed to create a container of:
                      ...
```

## Details

You're duplicating a mount point (`${{CF_VOLUME_PATH}} = /codefresh/volume`).
For example:

{% raw %}

```yaml
my_step:
  image: my_image
  commands:
    - ls /codefresh/volume
    ...
  volumes:
    - '${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}' # this will make this step fail
```

{% endraw %}

The pipeline volume is automatically mounted in a freestyle step. And it's available at `/codefresh/volume` in the container used for the freestyle step.

Trying to mount something in that path would cause an error. This is the specific error that is happening behind the scenes:

```shell
Error: (HTTP code 400) unexpected - Duplicate mount point: /codefresh/volume
```

Remove the duplicated mount point definition.

Following the example presented in the `Cause` section, the step definition should look like this:

```yaml
my_step:
  image: my_image
  commands:
    - ls /codefresh/volume
    ...
```

If you need to mount a specific directory of your pipeline volume, you will need to mount it to **another path**. For example:

```yaml
my_step:
  image: my_image
  commands:
    - ls /codefresh/volume
    ...
  volumes:
    - './relative-dir/under-cf-volume:/absolute-path/for-the-dir'
```

> Note: the `...` represent other commands to be executed, or other fields for the freestyle step. They should not be part of the freestyle step definition

## Related Items

You can find more information about this topic in the following links:

* [Custom volumes]({{site.baseurl}}/docs/pipelines/steps/freestyle/#custom-volumes)
* [Simple volume example]({{site.baseurl}}/docs/pipelines/steps/freestyle/#simple-volume-example)
