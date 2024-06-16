---
title: "How To: Check out only pull request merge commit for target branch instead of HEAD"
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

This article describes how to check out only the merge commit of a PR (Pull Request) instead of the HEAD of the target branch.

When re-running a pipeline based on a PR, tests that passed the previous fails during the rerun.  
This can happen because the default behavior of the pipeline is to run based on a merge of the PR and the HEAD of the target branch. This behavior includes the latest changes to HEAD which may not have been present when the PR itself was created.

## Details

To only run the pipeline against the target branch as at the time of the PR, clone your repository using the exact SHA of the merge request.

When the pipeline is triggered by a PR, it has access to additional variables including `CF_PULL_REQUEST_MERGED_COMMIT_SHA`, which is the commit SHA on the base branch after the PR was merged.

Configure [conditional execution for the pipeline]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) to check if the `CF_PULL_REQUEST_MERGED_COMMIT_SHA` variable exists.  
Depending on result, execute one of two `git-clone` steps:
* If the variable exists, specify it in the `revision` field of your `git-clone` step. This ensures that your codebase is checked out to the state it was at the precise moment the PR was merged.
* If the variable does not exist, continue with your regular clone process.


## Related articles
[GitHub Pull Request variables]({{site.baseurl}}/docs/pipelines/variables/#github-pull-request-variables)  
[Check environment variable value or existence in conditionals]({{site.baseurl}}/docs/kb/articles/check-env-vars-in-conditionals)  
[Fields for `git-clone` step]({{site.baseurl}}/docs/pipelines/steps/git-clone/#fields)  
