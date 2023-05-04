---
title: "How To: Check out only the PR merge commit, and not the HEAD of the target branch"
description:
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-05-04 LG
---

## Overview

Sometimes, when you re-run a pipeline based on a PR you might find your tests that passed the first time failing the second time. This can happen because the default behavior of your pipeline is to run based on a merge of the PR and the HEAD of the target branch - so it includes the latest changes to HEAD that may not have present when the PR itself was first made.

## Details

If you want a pipeline to only run against the target branch as it was at the time of the pull request, you can clone your repository using the exact SHA of the merge request.

When Codefresh is triggered by a Pull Request, your pipeline will have access to some additional variables [1]. This includes CF_PULL_REQUEST_MERGED_COMMIT_SHA, which is the commit SHA on the base branch after the pull request was merged.

You can set up your pipeline to test and see if this variable exists [2], and depending on it's existence do two different clone steps. One clone as your existing clone if the variable is not there, or a second clone step if it is that uses CF_PULL_REQUEST_MERGED_COMMIT_SHA in the `revision` field of your clone step [3] to check out your codebase as it was at the exact moment of the PR with the PR merged into it.

## Related Items

[1] <https://codefresh.io/docs/docs/pipelines/variables/#github-pull-request-variables>

[2] <https://codefresh.io/docs/docs/kb/articles/check-env-vars-in-conditionals/>

[3] <https://codefresh.io/docs/docs/pipelines/steps/git-clone/#fields>
