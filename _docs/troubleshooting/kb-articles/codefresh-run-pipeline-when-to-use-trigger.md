# How-to: CLI Codefresh Run Pipeline and when to use the -t (trigger) option

#

## Overview

Determining which options and flags to use when using the Codefresh Run
Pipeline CLI command to start a Pipeline.

## Details

When your workflow is configured like this: ![CLI Configuration
Example](https://support.codefresh.io/hc/article_attachments/360015560120/cli-
codefresh-run-when-to-use-t_image-01.png)

You want to run this pipeline from CLI, you have to provide both the branch
name (-b) as well as the trigger name (-t). Without a trigger specified,
Codefresh does not know from which branch it should start the build.

`codefresh run $PIPELINE_NAME -b=$BRANCH_NAME -t=$TRIGGER_NAME -d`

## Related Items

[Codefresh Run Pipeline](https://codefresh-io.github.io/cli/pipelines/run-
pipeline/)

