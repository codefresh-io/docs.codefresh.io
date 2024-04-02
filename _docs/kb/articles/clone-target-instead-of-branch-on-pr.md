---
title: "How To: Clone target instead of source branch for pull request"
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

This article describes how to clone the target instead of the source branch in a PR (pull request)-triggered build.

Typically, pipeline builds use the `CF_BRANCH` variable to reference the branch associated with a build triggered by a Git event. However, in the case of a build triggered by a PR, `CF_BRANCH` specifically references the source branch. To clone the _target branch_ instead of the _source branch_ during a merge, use the `CF_PULL_REQUEST_TARGET` variable, which specifically points to the target branch.



## How to

>**NOTE**  
`CF_BRANCH` is available only for PR-triggered builds. Updating its value to match `CF_PULL_REQUEST_TARGET` clones the target branch instead.  
If `CF_PULL_REQUEST_TARGET` is not present, the build  defaults to cloning the source branch.  

<!--- >>💡 The ability to override predefined variables such as `CF_BRANCH` was added recently and may be disabled for your account. If the approach described in this article does not work in your account, please [contact support](https://support.codefresh.io/hc/en-us/requests/new). -->

* Create a separate pipeline that uses {% raw %}`${{CF_PULL_REQUEST_TARGET}}`{% endraw %} instead of the standard {% raw %}`${{CF_BRANCH}}`{% endraw %}  
OR
* Add the following step before your `git-clone` step to check if `CF_PULL_REQUEST_TARGET` exists.   
  If it does, to assign its value to `CF_BRANCH`:

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


