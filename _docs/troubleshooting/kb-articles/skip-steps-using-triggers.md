# How-to: Skip steps in your pipeline using Triggers

#

## Overview

You have certain steps you want to skip over in certain circumstances. You are
using a single pipeline for multiple triggers, but need certain tasks split.

## Details

  1. Set a pipeline variable with a default value. For example, `SkipTest` set to `false`
  2. Select the Trigger (or create a new one) that you will use.
  3. Under "Advanced Options" locate Variables.
  4. Set a Variable with an appropriate name and value. For example, `SkipTest` set to `true`
  5. Add a condition to your step. In this case, we will only run this step if the variable `SkipTest` is true.

    
    
    when:
        condition:
          all:
            skipdeploy: '${{SkipTest}} == "true"'
    

_Notes_ Other options for skipping steps are available.

## Related Items

[API call for Pipelines](https://g.codefresh.io/api/#operation/pipelines-run)

[CLI call for Pipelines](https://codefresh-io.github.io/cli/pipelines/run-
pipeline/)

[More details on Conditionals](https://codefresh.io/docs/docs/codefresh-
yaml/conditional-execution-of-steps/)

