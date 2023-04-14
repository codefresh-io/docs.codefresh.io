# How-to: Using one pipeline with different paths for releases

#

## Overview

You have a pipeline that covers push, pull requests, and/or releases, but need
to run only specific certain steps.

## Details

There are a number of different paths to solving this. Two potential
solutions:

### Shared Pipeline

  * Use a generic pipeline which is only called from other pipelines - one pipeline for push, one for pull requests, etc. This is the preferred method where there are numerous differences and only a small overlap. To see more of this, please [see this article](https://support.codefresh.io/knowledge/articles/360015541779/en-us?brand_id=360000863253).

  * Set environment variables based on triggers, and use conditionals to determine which ones to run. This is the preferred method when the majority of the steps are the same.

  1. Create a trigger that acts only on push requests.
  2. Under "Advanced Options", find "Build Variables" and add a variable. Name it `GIT_EVENT` and set its value to `push`.
  3. Save this trigger.
  4. Create a new trigger that acts only on pull requests.
  5. Under "Advanced Options", find "Build Variables" and add a variable. Name it `GIT_EVENT` and set its value to `pull`.

![Setting a
variable](https://support.codefresh.io/hc/article_attachments/360016054779/set-
variable.png)

With this done, you are now able to make use of conditionals in your steps to
control which steps are run. You can also use scripts with `if` statements
inside your freestyle steps to.

## Related Items

[How-to: Start another pipeline based on
condition](https://support.codefresh.io/knowledge/articles/360015541779/en-
us?brand_id=360000863253)

[More details on conditionals](https://codefresh.io/docs/docs/codefresh-
yaml/conditional-execution-of-steps/)

