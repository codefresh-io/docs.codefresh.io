---
title: "Analytics API"
description: ""
group: api
toc: true
---



The Analytics API uses HTTP POST requests with JSON arguments and JSON responses. ????


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




##  Get list of pipelines /pipelinesDropdown

Gets the list of pipelines - max number? what are the default settings?
by pipeline name or ID.


### Headers
The API authorization token must be included in the header of the API request. See [Authorization](#authorization).

```
content-type: application/json
Authorization: <TOKEN>
```

### Request body 

For a description of the fields, see [Request parameters](#request-parameters).



### Request example

The request is an HTTP GET request.

```
GET https://g.codefresh.io/api/analytics/reports/pipelinesDropdown
```
### Response example

#### Success
Here's an example of the response for a successful request.

For each pipeline, the following data is returned.
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
            "isDeleted": false
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
            "isDeleted": false
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
            "id": "64cb42f2993fc4da530b8756",
            "pipelineName": "mu",
            "shortName": "mu",
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

#### Failure
Here's an example of the 

```
{"statusCode":400,"message":"no changes found between source and destination applications","error":"Bad Request"}
```

##  Get list of pipeline by name 

Get the list of pipelines that correspond to the name passed as the query parameter.
You can either pass the complete name of the pipeline or a partial name. In which case, returns all pipelines including those characters.
by pipeline name or ID.


### Headers
The API authorization token must be included in the header of the API request. See [Authorization](#authorization).

```
content-type: application/json
Authorization: <TOKEN>
```

### Request body 

For a description of the fields, see [Request parameters](#request-parameters).



### Request example

The request is an HTTP GET request.

```
GET https://g.codefresh.io/api/analytics/reports/pipelinesDropdown/?filters={"name":["<pipeline-name>"]}
```
### Response example

#### Success
Here's an example of the response for a successful request.

For each pipeline, the following data is returned.
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
            "isDeleted": false
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
            "isDeleted": false
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
            "id": "64cb42f2993fc4da530b8756",
            "pipelineName": "mu",
            "shortName": "mu",
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

#### Failure
Here's an example of the 

```
{"statusCode":400,"message":"no changes found between source and destination applications","error":"Bad Request"}
```




## POST    `/promotions/pullRequest`

Promotes the application from the source environment to the destination or target environment through a `pull request`  as the promotion action.

### `pullRequest` request body

```
{
        "srcAppId": {
            "runtime": "<runtime name>",
            "namespace": "<namespace>",
            "name": "<source-application-name>"
        },
        "destAppId": {
            "runtime": "<runtime-name>",
            "namespace": "<namespace>",
            "name": "<destination-application-name>"
        },
        "head": "<branch-of-destination-application>",
        "title": "<pr-title>",
        "description": "<pr-description",
        "commitMessage": "<commit-message-when-empty-uses-title>",
        "commitDescription": "<commit-description>",
    }"
```

### `pullRequest` request example
The request is formatted in curl.

```
curl -X POST https://codefresh-hosted-gitops-runtime.com/api/promotions/pullRequest \
    --header "content-type: application/json" \
    --header "Authorization: 214ffb**************" \
    --data "{
        \"srcAppId\": {
            \"runtime\": \"codefresh\",
            \"namespace\": \"membership-staging\",
            \"name\": \"membership-staging\"
        },
        \"destAppId\": {
            \"runtime\": \"codefresh\",
            \"namespace\": \"membership-prod\",
            \"name\": \"membership-prod\"
        },
        \"head\": \"main\",
        \"title\": \"Merge new-accounts\",
        \"description\": \"Added new accounts and git sources\",
        \"commitMessage\": \"Merge new-accounts\",
        \"commitDescription\": \"Approved new accounts and git sources\",
    }"

```
### `pullRequest` response example

#### Success
TBD


#### Failure
TBD



## Request query parameters

{: .table .table-bordered .table-hover}
| Parameter    | Description     | 
| ----------  |  -------- | 
| `dateRange`       | The time frame for which to send report data. This can be in the from-to format for a custom time frame, or a predefined fixed range.<br>For from-to date ranges, the format is `yyyy-mm-dd`. For example, `?dateRange=2024-04-30&dateRange=2023-08-01`. The from date must be earlier than the to date. <br>For fixed date ranges, use one of the following:<br>- `today`: Today's date.<br>- `Last 7 days`:  <br>- `Last 30 days`: `dateRange=last%203%20month` (NIMA: need to find what are the fixed date ranges supported and how to add them?)|
| `filter`       |     |
| `granularity`       |     |
 

<table class="table table-bordered table-hover" style="width: 100%;">
  <colgroup>
    <col style="width: 10%;">
    <col style="width: 70%;">
    <col style="width: 10%;">
    <col style="width: 10%;">
  </colgroup>
  <thead>
    <tr>
      <th style="width: 10%;">Parameter</th>
      <th style="width: 70%;">Description</th>
      <th style="width: 10%;">Data Type</th>
      <th style="width: 10%;">Required/Optional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4"><code class="highlighter-rouge">dateRange</code></td>
      <td colspan="3">The application in the source environment to promote through the <code class="highlighter-rouge">runtime</code>, <code class="highlighter-rouge">namespace</code>, and <code class="highlighter-rouge">name</code> key-value pairs.</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">srcAppId.runtime</code>: The name of the GitOps Runtime associated with the source application.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">srcAppId.namespace</code>: The namespace where the source application is deployed.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">srcAppId.name</code>: The name of the source application to be promoted.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td rowspan="4"><code class="highlighter-rouge">destAppId</code></td>
      <td colspan="3">The application in the destination environment to be promoted through the <code class="highlighter-rouge">runtime</code>, <code class="highlighter-rouge">namespace</code>, and <code class="highlighter-rouge">name</code> key-value pairs.</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">destAppId.runtime</code>: The name of the GitOps Runtime associated with the application in the destination environment.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">destAppId.namespace</code>: The namespace in the destination environment where the application being promoted is deployed.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">destAppId.name</code>: The name of the application in the destination environment to be promoted.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">message</code></td>
      <td>Applies to <code class="highlighter-rouge">commit</code> promotion actions.<br>The commit message to associate for the commit promotion action.(limits)</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">head</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>The branch of the application in the destination environment on which to open the PR.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">title</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>The title of the pull request.</td>
      <td>String</td>
      <td>Required</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">description</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>Additional information describing the pull request.</td>
      <td>String</td>
      <td>Optional</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">commitMessage</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>The commit message when the pull request is approved.<br>If omitted, uses <code class="highlighter-rouge">title</code> instead. </td>
      <td>String</td>
      <td>Optional</td>
    </tr>
    <tr>
      <td><code class="highlighter-rouge">commitDescription</code></td>
      <td>Applies to <code class="highlighter-rouge">pull request</code> promotion actions.<br>Additional information on the commit message when the pull request is approved. </td>
      <td>String</td>
      <td>Optional</td>
    </tr>
  </tbody>
</table>






