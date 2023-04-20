---
title: "How-to: Stop monitoring a child pipeline once a step is reached"
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

When running child builds from within a Codefresh build, sometimes you only
need to monitor the progress of the child build up to a certain point, and
don't want the calling step to wait until the entire child build is done
before proceeding.

For instance, you may need the parent pipeline to wait for some steps in a
child build to finish, but don't want the parent build to then wait for an
approval step in the child to complete before moving on.

You can potentially run the child pipeline in detached mode with the `DETACH:
true` argument (or `-d` option, if you are directly running the `codefresh
run` CLI command). This way the parent pipeline will just start the child
build and move on. But running with detached mode means that the parent build
will not monitor the progress of the child build at all, which will cause
issues if you still need things to run in a certain order.

## Details

If possible for your pipeline, the best approach would be to split off one
additional pipeline from the child pipeline for every step that the top-level
parent does not need to wait on, to be called by the child pipeline in
detached mode. The top level parent build would wait for the child build to
execute the first set of steps, the child build calls the grandchild in
detached mode and immediately end, and the top level parent then resumes
without waiting for steps in the grandchild to complete.

If this is not feasible given the structure of your pipeline, you can set up a
freestyle step to start a child build using the `codefresh run` CLI command,
then parse this command's output for specific key words that mark the build
reaching a certain state. Once a match has been found in the output, terminate
the command so that the step can exit and the build can move on to the next
step. The child build will continue running in the meantime.

This step will start a child build from the pipeline `test/test_approval`,
wait for it to run until it reaches an approval step, then exit and move on to
the rest of the pipeline.

    
    
    steps:
      run:
        title: "Run Child PIpeline"
        type: "freestyle"
        image: "codefresh/cli:latest"
        commands:
          - "{ codefresh run test/test_approval & echo $! > pid; } | { grep -m1 'Pending approval step reached, pausing workflow' && kill -9 $(cat pid) && rm pid; }"
    

You can modify this command to stop monitoring on specific steps by changing
the match string. For example, running `grep` for the string `Step: run_test`
will stop the monitoring once the child build has reached the step `run_test`.

_Notes_ This second approach does require making assumptions about the build's
status based purely on console log output. Be careful that the string you're
matching for is truly unique to the state you're watching for, and the same
string is not duplicated elsewhere in the build. Likewise, if the log output
for the state you're watching for changes in any way, the match string will
need to be updated.

This step will exit with status "success" once a match in the output is found.

If the child pipeline fails before this calling step stops monitoring, then
this calling step will exit with status "failure."

Because we are directly calling the CLI instead of using the plugin step, this
method loses the link that would normally be able take you from the parent
build to the child build, and makes them more difficult to track and manage.

