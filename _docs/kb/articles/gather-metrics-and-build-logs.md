---
title: "How To: Gather Codefresh-related metrics and build logs"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [CLI, API, Pipelines]
support-reviewed: 2023-04-18 LG
---

This article describes useful API calls to retrieve information on a pipeline build and its steps. It also describes the fields included as part of the response to those calls - to be used as-is or how to infer new metrics from the values.

## Calls for pipeline build information

We will explore three main calls to programmatically get information about the build:
* General build information  
  `codefresh get build <BUILD_ID>` (could be changed to an API call, since that one has more information)
* Build and steps information  
  `GET /api/workflow/<BUILD_ID/context-revision`
* Logs  
  `GET https://g.codefresh.io/api/progress/<PROGRESS_ID>`  
  This GET call also includes resource-consumption metrics. As they are not Prometheus-based, they are not accurate for specific step types, such as the build-step.


## Usage script for CLI/API calls

The following script is a suggestion on how to use the different CLI and API calls available.

The idea is to run this asynchronously. For example, using a cron-trigger in a pipeline in Codefresh to execute the pipeline daily.

You can also use the same calls to incorporate the process of pushing metrics into your monitoring platform, as part of the build itself. For example, in a hook, at the end of the pipeline.

```shell
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
```

### Script response
This script generates a JSON file per build with the following structure:

```json
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
```

The table describes the fields in the JSON response. 

{: .table .table-bordered .table-hover}
| Field            | Description                                                                                                    |
|------------------|--------------------------------------------------------------------------------------------------------------|
| `created`        | The timestamp indicating when the build was created (submitted). Example: `2021-05-17T21:31:35.779Z`.           |
| `started`        | The timestamp indicating when the build started execution, that is the start of the Initializing Process. Example: `2021-05-17T21:31:47.742Z`. |
| `finished`       | The timestamp indicating when the build completed execution. Example: `2021-05-17T21:32:21.435Z`. |
| `totalTime`      | The duration of the build, in HH:MM:SS, from `created` to `finished`.|
| `buildTime`      | The duration of the build, in HH:MM:SS, from `started` to `finished`. |
| `status`         | The status of the build. See [Viewing status for pipeline builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-status-for-pipeline-builds).|
| `pipeline-name`  | The full name of the pipeline .|
| `repository`     | The name of the repo associated with the build execution. This will only be different to `/` if a git-trigger is used to trigger a build. |
| `webhook`        | The boolean indication indicating if the build was triggered by a webhook, sent by a git-provider, for example or not.|
| `pipeline-Id`    | The ID of the pipeline for the build run. |
| `stateYaml`      | The object representing the last state of the build, containing detailed information about the build and its steps.<br> When the build doesn’t have a State YAML, as when it was terminated before it could start, the value of this field will be an empty Object: `{}`. |


#### State YAML

The State YAML of the build is represented in the `stateYaml` field of each JSON file.  
It includes several fields, but the most relevant one is the `context` element.

##### Context (`stateYaml.context`)
* `workflowMetadata`: contains general information about the workflow (the build)
* `stepsMetadata`: contains information about every step executed in the build

##### Workflow Metadata (`workflowMetadata`)

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

##### Steps Metadata (`stepsMetadata`)

This object has N Objects within, each representing a step in the build.  
The key of each object within `stepsMetadata` is the name of the step.

In general, each object within `stepsMetadata` include:

* `type`: The step type. Possible values: `freestyle`, `build`, `push`, `parallel`, etc (anything you put in `type` when defining your step.
* `result`:
* `status`: Same as `result`
* `totalTime`


{{site.data.callout.callout_tip}}
**TIP**  
The key `Initializing Process` representing the pipeline initialization stage has these values: `startTimestamp`, `status`, `finishTimestamp` and `totalTime`.  
The key `Initializing` can be ignored.
{{site.data.callout.end}}



### Example of a build JSON created by the script

```json
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
```

## Get build logs

Generally, `State YAML` provides the information you need.  
If you also need to push the build logs, we have these calls to help.

**Get build logs by `BUILD_ID`**:

```shell
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
```

This call results in a `<BUILD_ID>.json` file with the following structure:

```json
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
```

where:  
* `steps` is an array of steps, with each element including a `logs` array.
* The `logs` array includes the log content for a step, a line per array element.


{{site.data.callout.callout_tip}}
**TIP**  
The calls above are only valid for _completed_ successful, failure, or terminated builds.
You can use the script at the beginning of this article to iterate over all the builds over a time frame and get the logs from them.
{{site.data.callout.end}}