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




##  Get all pipelines/pipelines by name

Retrieve all the pipelines in your account, or filter by a pipeline name or part of the name to retrieve a specific set of pipelines.  
Filtering by a name retrieves those pipelines whose names match or contain the text in the filter string. 


### Headers
The API authorization token must be included in the header of the GET request. See [Authorization](#authorization).



### Endpoint

`GET https://g.codefresh.io/api/analytics/reports/pipelinesDropdown&filters={"name":["pipeline_name"]}`



### Query parameters

`

{: .table .table-bordered .table-hover}
| Setting    | Description     | Data Type | Required/Optional
| `name` | The name of the pipeline or a part of the name by which to filter the pipelines. For example, ??? retrieves only pipelines that match the whole name. `e-to-e` retrieves all pipelines that include `e-to-e` in their names.  | string | Optional |



#### Reponse
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












