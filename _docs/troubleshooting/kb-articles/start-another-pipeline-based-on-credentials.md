# How-to: Start another pipeline based on condition

#

## Overview

As part of your pipeline, you want to start another pipeline based on
condition.

For example, you want to start child pipeline when one of the step fails.

## Details

Use the example below:

    
    
    run_tests:
       image: alpine:latest
       title: Run tests which could fail
       fail_fast: false #allow pipeline to keep running even if this step fails 
       commands:
         - exit 1 #simulate test fail
    
    run_pipeline:
      image: codefresh/cli
      title: Run pipeline
      commands:
        - codefresh run $PIPELINE_ID -t=$TRIGGER_NAME -b=master
      when:
        condition:
          all:
            myCondition: run_tests.result == 'failure'
    

## Related Items

[Running other steps](https://codefresh.io/docs/docs/codefresh-yaml/post-step-
operations/#running-other-steps)

[Conditional Execution of Steps](https://codefresh.io/docs/docs/codefresh-
yaml/conditional-execution-of-steps)

[Codefresh Run Pipeline](https://codefresh-io.github.io/cli/pipelines/run-
pipeline/)

