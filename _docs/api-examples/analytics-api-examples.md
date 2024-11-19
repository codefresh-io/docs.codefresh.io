---
title: "Analytics API"
description: ""
group: api
toc: true
---

The Analytics API is a REST API that allows programmatic access to pipeline performance metrics, enabling you to generate custom reports and insights.  
It leverages HTTP GET requests and returns data in JSON format, for seamless integration with your existing tools and systems.

The API enables you to extract KPI data on pipelines and pipeline builds at different levels.

Whether you're automating the collection of metrics for external dashboards or conducting in-depth analysis on pipeline efficiency, 
the API offers granular access to performance data. 
This ensures you can optimize pipeline configurations, identify bottlenecks, and drive continuous improvement within your workflows.




## Authorization
To make calls to the Analytics API, you need authorization through an API key passed in the header of the API request.  

>**NOTE**  
The user who generates the API token must be an account administrator.  
Currently, you do not need to select specific scopes for the API key.

##### How to get the API key
1. From your avatar dropdown in the Codefresh toolbar, select **User Settings**.
1. Do one of the following:
  * If you have an existing API key you have saved, use that key.
  * To generate a new API key, click **Generate**.
    1. In **Key Name**, type a new name for the API key. 
      This name is displayed in the UI with random numbers and letters.
    1. Click **Create**.
    1. Copy the API key to a handy location.


## Project and pipeline IDs
Endpoints require either the Project ID or the pipeline ID.

##### Get the project ID
1. In the Codefresh UI, from the sidebar select **Projects**.
1. Click the project with the ID to retrieve.
1. From the URL, copy the value of the `projectId` query parameter.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/analytics-api/project-id-in-url.png" 
	url="/images/analytics-api/project-id-in-url.png" 
	alt="Project ID in URL" 
	caption="Project ID in URL"
  max-width="60%" 
%}


##  Get all pipelines/pipelines by name

Retrieves a list of all pipelines in your account, or filters pipelines based on a specific name or partial name.  
Filtering by name returns pipelines whose names match or contain the specified text string.




### Endpoint

`GET https://g.codefresh.io/api/analytics/reports/pipelinesDropdown&filters={"name":[array<string>]}`




### Query parameters


{: .table .table-bordered .table-hover}
| Parameter    | Description     | Data Type | Required/Optional |
| ------------ | --------------  | ------    | ------------------|
| `filters`| `name`: The name of the pipeline or a part of the name by which to filter the pipelines.<br>For example, filtering by `name`=`e-to-e` retrieves all pipelines that include `e-to-e` in their names.  | [array<string>] | Optional |


### Request examples

##### For all pipelines

`GET https://g.codefresh.io/api/analytics/reports/pipelinesDropdown`

##### For pipeline by name

`GET https://g.codefresh.io/api/analytics/reports/pipelinesDropdown&filters={"name":[array<string>]}`


### Response
Here's an example of the response for a successful request.

For each pipeline, the response includes the following data:
* `id`: The ID of the pipeline, generated when the pipeline was created. 
* `pipelineName`: The full name of the pipeline, including the project name, in the format `"<project-name>/<pipeline-name>"`.
* `shortName`: The name of the pipeline, without the project name. 
* `isDeleted`: Indicates if the pipeline has been deleted from the account (`true`), or not (`false`).

```json
{
    "data": [
        {
            "id": "61a893f69ff69e2cf086f12d",
            "pipelineName": "NimaCFProject/BasicPipeline",
            "shortName": "basicpipeline",
            "isDeleted": false
        },
        {
            "id": "632afb121899584bf3ec14f8",
            "pipelineName": "default/NimaCronLink",
            "shortName": "nimacronlink",
            "isDeleted": false
        },
        {
            "id": "6372180f39b06e632745555d",
            "pipelineName": "test",
            "shortName": "test",
            "isDeleted": true
        },
        {
            "id": "639ede86ec4d257410904ba7",
            "pipelineName": "NimaCFProject/StepTest",
            "shortName": "steptest",
            "isDeleted": false
        },
        {
            "id": "63b58656e8dad136b2a74927",
            "pipelineName": "my-first-project/My Pipeline",
            "shortName": "my pipeline",
            "isDeleted": true
        },
        {
            "id": "641fe3c0ba826b3e53d3bbbd",
            "pipelineName": "TestTags",
            "shortName": "testtags",
            "isDeleted": false
        },
        {
            "id": "641fe485ba826b8fe8d3bbbe",
            "pipelineName": "MyPipelines",
            "shortName": "mypipelines",
            "isDeleted": false
        },
        {
            "id": "6423edc4dbc27269e2693bb6",
            "pipelineName": "NimaCFProject/Restart",
            "shortName": "restart",
            "isDeleted": false
        },
        {
            "id": "642578967afcb3664998231a",
            "pipelineName": "AnnotatePipeline",
            "shortName": "annotatepipeline",
            "isDeleted": false
        },
        {
            "id": "64cb4160795de76fcd8b5b29",
            "pipelineName": "MyPipelines template",
            "shortName": "mypipelines template",
            "isDeleted": false
        },
        {
            "id": "66f246ff58c8309825491a5a",
            "pipelineName": "Marvel/smoke-tests",
            "shortName": "smoke-tests",
            "isDeleted": false
        }
    ]
    },

    "timeDimensions": {}
```

### 
Here's an example of the 

```
{"statusCode":400,"message":"no changes found between source and destination applications","error":"Bad Request"}
```

## Get average build duration
Retrieves the average execution duration of pipeline builds for the specified time frame.  
The average (mean) duration is calculated by dividing the total execution time by the number of builds, providing an overall measure of pipeline performance.

You can filter build data either by a project, a specific pipeline, status, or by the favorites tag.

### Endpoint
`GET https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=<yyyy-mm-dd>&dateRange=<yyyy-mm-dd>?granularity=<granularity>?filters={"filter-type":[array<string>]}`



### Query parameters

{: .table .table-bordered .table-hover}
| Setting    | Description     | Data Type | Required/Optional|
| -----------|-----------------|-----------|------------------|
| `dateRange` | The time frame for which to generate the report, from a minimum of one day to a maximum of six months. The start and end dates must be in `yyyy-mm-dd` (ISO 8601) formats. For example, `dateRange=2024-09-05&dateRange=2024-09-01`. <!--- `dateRange` | The custom or fixed time frame for which to generate the report. {::nomarkdown}<ul><li><b>Custom</b>: Requires the start and end dates in <code class="highlighter-rouge">yyyy-mm-dd</code> (ISO 8601) formats, separated by <code class="highlighter-rouge">&</code>. For example, <code class="highlighter-rouge">dateRange=2024-09-05dateRange=2024-09-01</code>.</li><li><b>Today</b>: <code class="highlighter-rouge">today</code></li><li><b>Last 7 days</b>: The previous seven days starting from today in encoded format. For example, <code class="highlighter-rouge">last%207%20days%20</code>.</li><li><b>Last 30 days</b>: The previous 30 days starting from today in encoded format. For example, <code class="highlighter-rouge">last%2030%20days%20</code>.</li></ul>{:/} -->|  string | Required |
| `granularity` | The level of detail or resolution at which to present the data in the report. The `granularity` levels depend on the `dateRange` defined. {::nomarkdown}<ul><li><b>0 days to 6 months</b>: No granularity. This means that data is aggregated for the entire time frame. </li><li><b> 1 to 4 days</b>: <code class="highlighter-rouge">hour</code>.</li><li><b>1 day to 3 months</b>: <code class="highlighter-rouge">day</code></li><li><b>Up to 6 months</b>: <code class="highlighter-rouge">week</code> <!--- or <code class="highlighter-rouge">month</code>-->.</li></ul>{:/} | string | Optional |
| `filters` | The filters by which to narrow the scope of the build data. Can be any of the following: 
|  | `projectId`: The ID/IDs of the project(s) with the pipeline builds for which to include data. To include data for specific pipelines, omit this filter and use `pipelineId` instead.  | array | Optional |
|  | `pipelineId`: The ID/IDs of the pipeline(s) for which to include data. To include data for all pipeline builds in a project, omit this filter, and use `projectId` instead.  | array | Optional |
|  | `status`: The build statuses by which to filter pipelines. <br>Can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">success</code>: Pipelines with builds that completed successfully.</li><li><code class="highlighter-rouge">error</code>: Pipelines with builds that failed due to errors in the pipeline specifications or with failed steps.</li><li><code class="highlighter-rouge">terminated</code>: Pipelines with builds terminated by the system according to the policy defined in the pipeline's settings. See <a href="https://codefresh.io/docs/docs/pipelines/pipelines/#policies">Build termination in pipeline policies</a>.</li></ul>{:/}  | array | Optional |
|  |  `isFavorites`: Include only projecs or pipelines that have been starred as favorites. By default (`false`), returns all pipelines. <br>Can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>: Not the default. Returns only projects or pipelines tagged as favorites.</li><li><code class="highlighter-rouge">false</code>: The default, returns all pipelines.</li> </ul>{:/} Remember to define value without quotes.| boolean | Optional |


### Request examples

##### With date range and no granularity and filters

Retrieves the average build duration for all builds within the specified date range. Because granularity is not specified, the build data is aggregated for the date range.

`GET https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=2024-09-01&dateRange=2024-09-30`




##### With date range filtered by project ID
Retrieves the average build duration for all pipeline builds associated with the specified project ID within the date range.

`GET https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=2024-09-01&dateRange=2024-09-3301&filters={"projectId":["argo"]}`



#### With date range filtered by pipeline ID

Retrieves the average build duration for all builds associated with the specified pipeline ID within the date range.


##### With date range filtered by build status

Retrieves the average build duration for pipeline builds with a status of success within the specified date range.

`GET https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=2024-09-01:2024-09-05&&filters={"status":["success"]}`



##### With date range and all filters

Retrieves the daily average build duration for builds with:
* `status`=`success`
* Belonging to project with `projectId` ??
* With  pipeline ID pipeline-456
* Tagged as favorites
The data is grouped by daily granularity.

`GET https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=2024-01-01&dateRange=2024-01-31&granularity=day&filters={"status":["success"],"projectId":["project-123"],"pipelineId":["pipeline-456"],"favorite":["true"]}`


### Response 

Here's an example of a successful response.


```json
{
    "data": [
        {
            "totalBuilds": "4",
            "successfulBuilds": "4",
            "successRate": 100,
            "totalDuration": 72922,
            "initializingDuration": 19224,
            "runningDuration": 53698,
            "pendingApprovalDuration": 0,
            "pendingConcurrencyDuration": 0,
            "delayDuration": 0
        }
    ],
    "timeDimensions": {
        "dateRange": [
            "2024-09-01T00:00:00.000",
            "2024-09-20T23:59:59.999"
        ]
    }
}
```


The report includes the following fields:
* `totalBuilds`: The total number of pipeline builds that match the date range, the granularity, and other filters defined. 
* `successfulBuilds`: The total number of pipeline builds that match the `status` filter if defined. When no `status` filters are defined, the report includes the number of successful builds. .
* `totalDuration`: The average time, in seconds, for a pipeline build to complete execution, calculated from the total number of builds that match the date range, the granularity, and other filters defined. 
* `initializingDuration`: The average time, in seconds, for a pipeline build to complete the initialization phase of its execution.
* `runningDuration`: The average time, in seconds, that a pipeline build was in phase running.
* `pendingApprovalDuration`: The average time, in seconds, that a pipeline build was pending approval, meaning that execution was suspended until manual approval.
* `pendingConcurrencyDuration`: The average time, in seconds, that a pipeline build was pending execution due to the concurrency limits configured for the pipelines. Builds with concurrency limits at the pipeline, trigger, and branch levels are included in the calculation.
* `delayDuration`: The average time, in seconds, that a pipeline build was delayed from execution due to concurrency or license limits configured for the pipelines. 
* `timeDimensions.dateRange`: The start and end dates for which the report was generated.





#### Failure
Here's an example of the 

```
{"statusCode":400,"message":"no changes found between source and destination applications","error":"Bad Request"}
```


## Get build duration by median percentile (P50)
Retrieves the median (P50) success rate and execution duration for pipeline builds.  
The median, or 50th percentile, is a key measure for understanding typical build times, as it represents the middle value of all build durations.  

This metric helps you assess the overall performance without being skewed by outliers, such as exceptionally fast or slow builds.



### Endpoint

`GET https://g.codefresh.io/api/analytics/reports/buildP50Duration&dateRange=`



### Query parameters
{: .table .table-bordered .table-hover}
| Setting    | Description     | Data Type | Required/Optional|
|`dateRange` | The time frame for which to generate the report, from a minimum of one day to a maximum of six months. The start and end dates must be in `yyyy-mm-dd` (ISO 8601) formats. For example, `dateRange=2024-09-05&dateRange=2024-10-30`. | string | Required |
|`granularity` | The level of detail or resolution at which to present the data in the report. The `granularity` levels depend on the `dateRange` defined. {::nomarkdown}<ul><li><b>Up to 6 months</b>: No granularity. This means that data is aggregated for the entire time frame.</li><li><b> 1 to 4 days</b>: <code class="highlighter-rouge">hour</code>.</li><li><b>1 day to 3 months</b>: <code class="highlighter-rouge">day</code></li><li><b>Up to 6 months</b>: <code class="highlighter-rouge">week</code> or <code class="highlighter-rouge">month</code>.</li></ul>{:/} | string | Optional |
| `filters` | The filters by which to narrow the scope of the build data. Can be any of the following: 
|  | `projectId`: The ID/IDs of the project(s) with the pipeline builds for which to include data. To include data for specific pipelines, omit this filter and use `pipelineId` instead.  | array | Optional |
|  | `pipelineId`: The ID/IDs of the pipeline(s) for which to include data. To include data for all pipeline builds in a project, omit this filter, and use `projectId` instead.  | array | Optional |
|  | `status`: The build statuses by which to filter pipelines. <br>Can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">error</code>: Pipelines with builds that failed due to errors in the pipeline specifications or with failed steps.</li><li><code class="highlighter-rouge">success</code>: Pipelines with builds that completed successfully.</li><li><code class="highlighter-rouge">terminated</code>: Pipelines with builds terminated by the system according to the policy defined in the pipeline's settings. See <a href="https://codefresh.io/docs/docs/pipelines/pipelines/#policies">Build termination in pipeline policies</a>.</li></ul>{:/}  | array | Optional |
|  |  `isFavorites`: Include only project or pipelines that have been starred as favorites.  (NIMA: what is the default)| boolean | Optional |


### Request examples

##### With date range

`GET https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=2024-09-01&dateRange=2024-09-05`

<!--- ##### With fixed date range

`GET https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=last%2030%20days`
-->

##### With date range filtered by project ID



##### With date range filtered by pipeline ID


##### With date range filtered by build status

GET `https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=2024-09-01:2024-09-05&filters={"pipelineId":["648821e8bb1ff22b3e31f64c"]}`

##### With date range and all filters


### Response 

Here's an example of a successful response.


TBD 



The report includes the following fields:
* `time`: The granularity defined for the report according to the date range defined.
* `totalBuilds`: The total number of pipeline builds that match the specified date range, granularity, and any additional filters defined. 
* `successfulBuilds`: The total number of pipeline builds that match the `status` filter if defined. If a `status` filter is not defined, this represents the total number of successful builds.
* `successRate`: The percentage of builds that completed successfully, out of the total number of builds.
* `totalDuration`: The average duration, in seconds, for 50% of the pipeline builds to complete, calculated from the total number of builds that match the date range, granularity, and any additional filters defined. 
* `initializingDuration`: The average time, in seconds, for 50% of the pipeline builds to complete the initialization phase of execution.
* `runningDuration`: The average time, in seconds, for which 50% of the pipeline builds were in the running phase.
* `pendingApprovalDuration`: The average time, in seconds, during which 50% of the pipeline builds were pending manual approval, suspending execution.
* `pendingConcurrencyDuration`: The average time, in seconds, during which 50% of the pipeline builds were suspended specifically due to the concurrency limits configured for the pipelines 
at the pipeline, trigger, and branch levels.
* `delayDuration`: The average time, in seconds, for which 50% of the pipeline builds were delayed due to concurrency or license limits configured for the pipelines. 
* `timeDimensions.dateRange`: The start and end dates defining the time frame for which the report is generated.





#### Failure
Here's an example of the 

```

```


## Get build duration by 90th percentile (P90)

Retrieves the success rate and execution duration for the 90th percentile (P90) of pipeline builds.  
The 90th percentile indicates the upper limit within which 90% of builds are completed. 

This metric is useful for identifying performance issues that affect the slowest 10% of builds, enabling you to focus on optimizing these outliers.



### Endpoint

`GET https://g.codefresh.io/api/analytics/reports/buildP90Duration&dateRange=`



### Query parameters
{: .table .table-bordered .table-hover}
| Setting    | Description     | Data Type | Required/Optional|
|`dateRange` | The time frame for which to generate the report, from a minimum of one day to a maximum of six months. The start and end dates must be in `yyyy-mm-dd` (ISO 8601) formats. For example, `dateRange=2024-09-05dateRange=2024-09-01`. | string | Required |
|`granularity` | The level of detail or resolution at which to present the data in the report. The `granularity` levels depend on the `dateRange` defined. {::nomarkdown}<ul><li><b>Up to 6 months</b>: No granularity.</li><li><b> 1 to 4 days</b>: <code class="highlighter-rouge">hour</code>.</li><li><b>1 day to 3 months</b>: <code class="highlighter-rouge">day</code></li><li><b>Up to 6 months</b>: <code class="highlighter-rouge">week</code> or <code class="highlighter-rouge">month</code>.<br>When omitted, the default granularity of ???? is used.</li></ul>{:/} | string | Optional |
| `filters` | The filters by which to narrow the scope of the build data. Can be any of the following: 
|  | `projectId`: The ID/IDs of the project(s) with the pipeline builds for which to include data. To include data for specific pipelines, omit this filter and use `pipelineId` instead.  | array | Optional |
|  | `pipelineId`: The ID/IDs of the pipeline(s) for which to include data. To include data for all pipeline builds in a project, omit this filter, and use `projectId` instead.  | array | Optional |
|  | `status`: The build statuses by which to filter pipelines. <br>Can be one of the following: {::nomarkdown}<ul><li><code class="highlighter-rouge">error</code>: Pipelines with builds that failed due to errors in the pipeline specifications or with failed steps.</li><li><code class="highlighter-rouge">succeeded</code>: Pipelines with builds that completed successfully.</li><li><code class="highlighter-rouge">terminated</code>: TPipelines with builds terminated by the system according to the policy defined in the pipeline's settings. See <a href="https://codefresh.io/docs/docs/pipelines/pipelines/#policies">Build termination in pipeline policies</a>.</li></ul>{:/}  | array | Optional |
|  |  `isFavorites`: Include only project or pipelines that have been starred as favorites.  (NIMA: what is the default)| boolean | Optional |

### Request examples

##### With date range

`GET https://g.codefresh.io/api/analytics/reports/buildP90Duration?dateRange=2024-09-01&dateRange=2024-09-05`

<!--- ##### With fixed date range

`GET https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=last%2030%20days`
-->

##### With date range filtered by project ID



##### With date range filtered by pipeline ID


##### With date range filtered by build status

GET `https://g.codefresh.io/api/analytics/reports/buildAvgDuration?dateRange=2024-09-01:2024-09-05&filters={"pipelineId":["648821e8bb1ff22b3e31f64c"]}`

##### With date range and all filters


### Response 

Here's an example of a successful response.


TBD 



The report includes the following fields:
* `time`: The granularity defined for the report according to the date range defined.
* `totalBuilds`: The total number of pipeline builds that match the specified date range, granularity, and any additional filters defined. 
* `successfulBuilds`: The total number of pipeline builds that match the `status` filter if defined. If a `status` filter is not defined, this represents the total number of successful builds.
* `successRate`: The percentage of builds that completed successfully, out of the total number of builds.
* `totalDuration`: The average duration, in seconds, for 50% of the pipeline builds to complete, calculated from the total number of builds that match the date range, granularity, and any additional filters defined. 
* `initializingDuration`: The average time, in seconds, for 50% of the pipeline builds to complete the initialization phase of execution.
* `runningDuration`: The average time, in seconds, for which 50% of the pipeline builds were in the running phase.
* `pendingApprovalDuration`: The average time, in seconds, during which 50% of the pipeline builds were pending manual approval, suspending execution.
* `pendingConcurrencyDuration`: The average time, in seconds, during which 50% of the pipeline builds were suspended specifically due to the concurrency limits configured for the pipelines 
at the pipeline, trigger, and branch levels.
* `delayDuration`: The average time, in seconds, for which 50% of the pipeline builds were delayed due to concurrency or license limits configured for the pipelines. 
* `timeDimensions.dateRange`: The start and end dates defining the time frame for which the report is generated.





#### Failure



## Get average duration of pipelines
Retrieves a list of pipelines along with their average execution duration.  
The average (mean) duration is calculated by dividing the total execution time by the number of pipeline runs, providing an overall assessment of pipeline performance.



## Get pipelines with median (P50) duration
Retrieves a list of pipelines based on their median (P50) execution duration.  
The P50 duration represents the time within which 50% of pipeline executions are completed, highlighting typical pipeline performance. 

This metrics is useful to analyze typical pipeline performance while excluding extreme outliers.



## Get pipelines with 90th percentitle (P90) median duration
Retrieves a list of pipelines based on their 90th percentile (P90) execution duration.  
The P90 represents the time within which 90% of pipeline executions are completed, highlighting the upper range of build durations while excluding the slowest 10%.  

This metric is useful for identifying and addressing performance issues that affect a small minority of pipeline executions.


## Error types

The Analytics API can return the following error types. Each error includes an HTTP status code, error type, description, and examples of possible causes.

| **HTTP Status Code** | **Error Type**    | **Description**    | **Examples**  |
|-------------|---------------------------|---------------------|------------------------------------------------------------|
| `400` | **BadRequestError**    | The request is invalid due to incorrect parameters or structure.   | - Invalid report name. <br> - Invalid combination of request parameters: "Passed structure is invalid - Time dimensions are not supported for target report: `{reportName}`". <br> - Invalid filter request parameter: "Filter by account ID is not allowed by user params." |
| `403`  | **AuthError**        | The user is not authorized to perform the requested operation.  | - Permission denied.   |
| `432`    | **ReportExecutionError**  | The requested report is still being processed; the request must be resent with the same parameters.  | - `Analytics report not finished yet - please try again.`                                                    |
| `500`      | **InternalServerError**   | An internal error occurred, preventing the report from being generated.    | - `Could not get analytics report - the report doesn’t contain data.``  |

