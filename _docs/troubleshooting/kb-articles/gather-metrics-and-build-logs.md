---
title: 
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

# How To: Gather Codefresh Related Metrics and Build Logs

#

## Overview

This document summarizes some API calls that can be useful to get information
about a build and its steps.

It also describes the fields included as part of the response to those calls
to be used as-is or to infer new metrics out of those values.

## Details:

We’ll explore three main calls to programmatically get information about the
build:

  * General build information: `codefresh get build <BUILD_ID>` (could be changed to an API call, since that one has more information)

  * Build and Steps information: `GET /api/workflow/<BUILD_ID/context-revision`

  * Logs: `GET https://g.codefresh.io/api/progress/<PROGRESS_ID>` (this one also has resource-consumption metrics, but they are not Prometheus-based, thus, for some steps, such as the build-step, they are not accurate)

The following script is a suggestion on how to use the different CLI and API
calls available

The idea is to run this in an asynchronous fashion. For example, using a cron-
trigger in a pipeline in Codefresh, to execute the pipeline every day.

The same calls can be used if you want to incorporate the process of pushing
metrics into your monitoring platform, as part of the build itself (e.g., in a
hook, at the end of the pipeline)

    
    
    #!/bin/bash
    
    # Script expects these env vars to be set
    # API_KEY --> can be taken from ~/.cfconfig file
    # START_DATE --> as "YYYY-MM-DD"
    # END_DATE --> as "YYYY-MM-DD"
    
    API_KEY="60d7bc98dabf78f109a24e97.xyz"
    START_DATE="2021-05-01"
    END_DATE="2021-05-02"
    
    # echo Date range: ${START_DATE} to ${END_DATE}
    
    PAGE=1
    while [ $PAGE -gt 0 ]
    do
        BUILDS=$(codefresh get builds --from=${START_DATE} --to=${END_DATE} --page ${PAGE} --limit 100 -o json)
        if [ "$BUILDS" = "[]" ] ; then PAGE=0 ; else ((PAGE++)) ; fi
    
        # Dealing with an array of builds, or a single build
        BUILD_IDS=$(echo $BUILDS | jq -r '.[].id') || BUILD_IDS=$(echo $BUILDS | jq -r '.id')
        for BUILD_ID in ${BUILD_IDS}
        do
            BUILD_INFO=$(jq --arg BUILD_ID "${BUILD_ID}" '.[] | select(.id==$BUILD_ID)' <<< "${BUILDS}") || BUILD_INFO=$(jq --arg BUILD_ID "${BUILD_ID}" '. | select(.id==$BUILD_ID)' <<< "${BUILDS}")
            # Extracting just the last State YAML, since that's the relevant one
            BUILD_STATE_YAML=$(curl -X GET -H "Authorization: ${API_KEY}" --silent https://g.codefresh.io/api/workflow/${BUILD_ID}/context-revision 2>/dev/null | jq -c '.[-1]')
            if [ "$BUILD_STATE_YAML" = "null" ] ; then BUILD_STATE_YAML='{}' ;  fi
            # Adding State YAML to Build Info, in a single JSON
            jq --argjson BUILD_STATE_YAML "$BUILD_STATE_YAML" '. += {"stateYaml":$BUILD_STATE_YAML}' <<< "${BUILD_INFO}" > ${BUILD_ID}.json
            jq '.created + " - Build ID: " + .id + " - Pipeline: " + ."pipeline-name" ' -r <<< ${BUILD_INFO}
        done
    done
    

This script will generate a JSON file per build, with the following structure:

    
    
    {
      "id": "60a2e0b79b9d1df6a24607f1",
      "created": "2021-05-17T21:31:35.779Z",
      "started": "2021-05-17T21:31:47.742Z",
      "finished": "2021-05-17T21:32:21.435Z",
      "totalTime": "00:00:45",
      "buildTime": "00:00:33",
      "status": "success",
      "pipeline-name": "Plugins/test-sonar-plugin",
      "repository": "/",
      "webhook": false,
      "progress": "60a2e0b79b9d1d0e8b4607ef",
      "pipeline-Id": "60a2de7ce254622694ce7f84",
      "stateYaml": {...} // State YAML will be detailed later
    }
      

Description of each field:

  * `created`: timestamp indicating when the build was created (“submitted“). Example: `2021-05-17T21:31:35.779Z`

  * `started`: timestamp indicating when the build was started (the Initializing Process started). Example: `2021-05-17T21:31:47.742Z`

  * `finished`: timestamp indicating when the build was started. Example: `2021-05-17T21:32:21.435Z`

  * `totalTime`: duration (in HH:MM:SS) of the build from `created` to `finished`

  * `buildTime`: duration (in HH:MM:SS) of the build from `started` to `finished`

  * `status`: status of the build (error, success, etc)

  * `pipeline-name`: Full name of the pipeline

  * `repository`: Name of the repo associated with the build execution. This will only be different to `/` if a git-trigger is used to trigger a build.

  * `webhook`: boolean indicating if the build was triggered by a webhook (sent by a git-provider, for example) or not.

  * `pipeline-Id`: the ID of the pipeline for the build

  * `stateYaml`: Object representing the last State of the build. It contains detailed information about the build and its steps. When the build doesn’t have a State YAML (e.g., the build was terminated before it could start), the value of this field will be an empty Object: `{}`.

### State YAML

The State YAML of the build is represented in the `stateYaml` field of each
JSON file.

It’s composed of several fields, but the most relevant one is the `context`
element.

#### Context (`stateYaml.context`)

  * `workflowMetadata`: contains general information about the workflow (the build)

  * `stepsMetadata`: contains information about every step executed in the build

#### Workflow Metadata (`workflowMetadata`)

  * `startTimestamp`: when the build process started. The next action is the execution of the pre-steps. Example: `2021-05-17T21:31:47.481Z`

  * `preStepsStartTimestamp`: once the build starts, it first executes the “preSteps“ (including the “Initializing Process“ step). This field is the timestamp when those pre-steps start. The next action would be the execution of the actual build-steps. Example: `2021-05-17T21:31:48.118Z`. Relative position in time: `startTimestamp`< `preStepsStartTimestamp`

  * `preStepsFinishTimestamp`: timestamp indicating the end of the pre-steps of the build. Example: `2021-05-17T21:31:57.764Z`. Relative position in time: `preStepsStartTimestamp`<`preStepsFinishTimestamp`

  * `preStepsTotalTime`: Integer. Duration in milliseconds of the pre-steps

  * `preStepsStatus`: Status of the pre-steps. Possible values: `success`, `failure`

  * `result`: Final status of the build. Possible values: `success`, `failure`, `terminated`

  * `status`: Same as `result`

  * `mode`: Execution mode for the build. Possible values: `sequential` or `parallel`. 

  * `finishTimestamp`: timestamp indicating when the workflow is finished. Relative position in time: `preStepsFinishTimestamp`<`finishTimestamp`

  * `totalTime`: Integer. Duration in milliseconds of the build. This contemplates the time from the moment the pre-steps started to the moment the last step is executed. This doesn’t include the time the build was waiting to start (pending), nor the time the **post** -steps of the build. Example: `33708`

#### Steps Metadata (`stepsMetadata`)

This object will have N Objects inside of it. Each of them representing a step
in the build.

The key of each object inside `stepsMetadata` will be the name of the step.

In general, each object inside the `stepsMetadata` field will have:

  * `type`: the type of the step. Possible values: `freestyle`, `build`, `push`, `parallel`, etc (anything you put in `type` when defining your step

  * `result`:

  * `status` : same as `result`

  * `totalTime`

Some clarification: the key `Initializing Process` is the one representing the
Initializing Process, and it will only have `startTimestamp`, `status`,
`finishTimestamp` and `totalTime`.

There’s a key called `Initializing` , it could be ignored.

### Example of a build JSON created by the script

    
    
    {
      "id": "60a2e0b79b9d1df6a24607f1",
      "created": "2021-05-17T21:31:35.779Z",
      "started": "2021-05-17T21:31:47.742Z",
      "finished": "2021-05-17T21:32:21.435Z",
      "totalTime": "00:00:45",
      "buildTime": "00:00:33",
      "status": "success",
      "pipeline-name": "Plugins/test-sonar-plugin",
      "repository": "/",
      "webhook": false,
      "progress": "60a2e0b79b9d1d0e8b4607ef",
      "pipeline-Id": "60a2de7ce254622694ce7f84",
      "stateYaml": {
        "_id": "60a2e0ef1007507f2ad0b293",
        "context": {
          "workflowMetadata": {
            "startTimestamp": "2021-05-17T21:31:47.481Z",
            "preStepsStartTimestamp": "2021-05-17T21:31:48.118Z",
            "flow-logger-id": "60a2e0b79b9d1d0e8b4607ef_1621287108328",
            "preStepsFinishTimestamp": "2021-05-17T21:31:57.764Z",
            "preStepsTotalTime": 10283,
            "preStepsStatus": "success",
            "result": "success",
            "status": "success",
            "mode": "sequential",
            "finishTimestamp": "2021-05-17T21:32:21.189Z",
            "totalTime": 33708,
            "postStepsStartTimestamp": "2021-05-17T21:32:21.189Z",
            "finishTimestamp-system": "2021-05-17T21:32:23.710Z",
            "postStepsFinishTimestamp": "2021-05-17T21:32:23.710Z",
            "postStepsTotalTime": 2521,
            "postStepsStatus": "failure"
          },
          "stepsMetadata": {
            "Initializing Process": {
              "startTimestamp": "2021-05-17T21:31:48.127Z",
              "status": "success",
              "finishTimestamp": "2021-05-17T21:31:57.750Z",
              "totalTime": 9623
            },
            "Initializing": {
              "containerId": "9410a0f611af04de66d4b7d672d9df177bb168dadfb09a093556bccaf8e75f85"
            },
            "test": {
              "type": "sonar-quality-gates-checker:0.1.1",
              "result": "success",
              "status": "success",
              "startTimestamp": "2021-05-17T21:31:58.315Z",
              "maxAttempts": 1,
              "currentAttempt": 1,
              "finishTimestamp": "2021-05-17T21:32:11.298Z",
              "totalTime": 12983
            },
            "testOutput": {
              "type": "freestyle",
              "result": "success",
              "status": "success",
              "startTimestamp": "2021-05-17T21:32:12.278Z",
              "maxAttempts": 1,
              "currentAttempt": 1,
              "containerId": "d87b8a0e739d1a0e6860f9037c83c25ec3a814b357110f580c468a2e8f6084df",
              "workingDirectory": "/codefresh/volume",
              "finishTimestamp": "2021-05-17T21:32:20.594Z",
              "totalTime": 8316
            }
          }
        },
        "metadata": {
          "account": "5b042094a7b403000120b521",
          "process": "60a2e0b79b9d1df6a24607f1",
          "description": "Workflow post operations completed",
          "revision": 6,
          "annotations": {
            "event": "workflow.finish-system",
            "final": true
          }
        }
      }
    }
    

### Getting the build logs

Most of the time the information provided by the State YAML is enough, but if
you require to push the logs of builds as well, then, this call(s) may help
you.

To get the logs of a build `BUILD_ID`, you need to:

    
    
    BUILD_ID=123xyz
    
    echo "- BUILD: $BUILD_ID"
    # printf "\tGetting the Progress ID: "
    PROGRESS_ID=$(curl --silent \
        -X GET \
        -H "Authorization: ${API_KEY}" \
        "https://g.codefresh.io/api/builds/${BUILD_ID}" \
        | jq -r .progress )
    # echo $PROGRESS_ID
    
    # printf "\tGetting the Temporary Logs URL: "
    LOGS_URL=$(curl --silent \
        -X GET \
        -H "Authorization: ${API_KEY}" \
        "https://g.codefresh.io/api/progress/${PROGRESS_ID}" \
        | jq -r .location.url )
    # echo $LOGS_URL
    
    printf "\tDownloading logs to ${BUILD_ID}.json \n"
    curl --silent $LOGS_URL --output ${BUILD_ID}.json
    

The `<BUILD_ID>.json` file will have the following structure:

    
    
    ...
    steps:
      0:
        logs:
        name:
        status:
      1:
        logs:
        name:
        status:
      ...
      N:
        ...
        

`steps` is an array of Steps, and each of the elements has a `logs` array.

The `logs` array has the content of the logs for a step in specific (a line
per array element).

It’s important to mention that the calls above are only valid for builds that
have already been finished (successful, failure, terminated)

You can use the script suggested at the beginning of this document to iterate
over all the builds on a timeframe and get the logs from them.

