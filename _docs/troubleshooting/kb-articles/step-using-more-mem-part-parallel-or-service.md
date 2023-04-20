---
title: A step uses more than expected memory when part of parallel steps or services
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

A step that is expected to not use much memory uses more.

## Details

The step is not the only one using memory, parallel steps and/or services will
be using memory at the same time.

Confirm that all parallel steps or services are relevant to this step and
disable the ones that aren't, or if there are any pipeline-level services that
don't need to be running for the duration of the whole pipeline.

Consider increasing the size of your instance, if all steps are required.
Consider splitting these steps into multiple smaller, sequential groups of
parallel steps; or splitting them into child pipelines with their own separate
sets of resources from the parent.

_Notes_

The yellow warning banner does not necessarily mean there's an issue with the
build, and instead only serves as a warning.

The red "out of memory" error banner will display if your build has used >90%
of allocated memory and failed. Since OOM failures can often result in
unexpected error patterns, Codefresh will display this warning if the build
failed on any error at >90% memory usage, not just on explicit memory errors.
Because of this, it is possible in some cases that builds displaying this
error banner actually failed from reasons other than memory.

