---
title: "How To: Clone target instead of source branch on pull request"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

In most cases, builds will use the variable `CF_BRANCH` to reference thebranch associated with a git triggered build.

In a pull request triggered build, `CF_BRANCH` specifically refers to the
source branch, and another variable `CF_PULL_REQUEST_TARGET` refers to the
target branch. You may need to use the target branch instead in your merge
build.

## Details

* Create a separate pipeline that uses {% raw %}`${{CF_PULL_REQUEST_TARGET}}`{% endraw %} instead of the standard {% raw %}`${{CF_BRANCH}}`{% endraw %} or
* Add the following step before your clone step to check if `CF_PULL_REQUEST_TARGET` exists, and if it does assign its value to `CF_BRANCH`:

    {% raw %}

    ```yaml
    update_branch_var:
      type: freestyle
      description: "Updating clone branch var to PR target branch"
      stage: 'clone'
      arguments:
        image: 'alpine:3.8'
        commands:
          - cf_export CF_BRANCH='${{CF_PULL_REQUEST_TARGET}}'
        when:
          condition:
            all:
              whenTargetExists: 'includes("{{CF_PULL_REQUEST_TARGET}}", "{{CF_PULL_REQUEST_TARGET}}") == false'
    ```

    {% endraw %}  

>_Note:_
>
>`CF_BRANCH` is the source branch in a PR-initiated build. By updating its value to the value of `CF_PULL_REQUEST_TARGET` the target will be pulled instead. This variable only exists for PR triggered builds, and if not present the build will clone the source branch instead.
