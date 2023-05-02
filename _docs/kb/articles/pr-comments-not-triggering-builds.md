---
title: Pull Request Comments are not triggering a build
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

A user leaves a Pull Request comment which is expected to trigger a pipeline, but it does not.

## Details

Only comments made by a repository owner or collaborators are accepted. Other users such as Team users will not trigger these builds.

## Related Items

[Support for building pull requests from forks]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#support-for-building-pull-requests-from-forks)

[Pull request not building]({{site.baseurl}}/docs/troubleshooting/kb-articles/pr-not-building/)
